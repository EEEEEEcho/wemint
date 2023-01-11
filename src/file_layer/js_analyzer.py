import src.strategy.common_node_strategy as cns
import src.utils.analysed_file as af
import src.utils.circle_set as cs
import os
from src.pojo.file_context import FileContext
from src.pojo.scope_enum import Scope
from src.pojo.miniprogram import MiniProgram
from src.utils import utils
from loguru import logger


def analysis(js_file_path: str, mini_program: MiniProgram) -> FileContext:
    file_context = FileContext(Scope.FILE, js_file_path)
    ast_json = utils.generate_ast(js_file_path)

    if ast_json is not None:
        if 'config.js' in js_file_path:
            config_analysis(ast_json, file_context, mini_program)
        else:
            file_level_analysis(ast_json, file_context, mini_program)
    return file_context


def file_level_analysis(ast_json: dict, file_context: FileContext, mini_program: MiniProgram):
    expression_list = []
    for item in ast_json['body']:
        if item['type'] == 'VariableDeclaration':
            for variable_declarator in item['declarations']:
                if variable_declarator['id']['type'] == 'Identifier':
                    variable_name = variable_declarator['id']['name']
                    file_context.variable_table[variable_name] = variable_declarator
        elif item['type'] == 'FunctionDeclaration':
            function_name = item['id']['name']
            file_context.function_table[function_name] = item
        elif item['type'] == 'ExpressionStatement':
            if 'expression' in item:
                expression_list.append(item)
                find_page_obj(item['expression'], file_context)

    variable_table_analysis(file_context, mini_program)
    function_declaration_analysis(file_context, mini_program)
    if file_context.page_object is not None:
        # 正确拿到了page
        page_object_analysis(file_context, mini_program)
    else:
        # js文件损坏严重，直接舍弃掉page作用域
        for expression in expression_list:
            cns.expression_statement_analysis(expression, file_context, mini_program)


def variable_table_analysis(file_context: FileContext, mini_program: MiniProgram):
    for variable_declarator_name, variable_declarator in file_context.variable_table.items():
        variable_init = variable_declarator['init']
        if variable_init and 'type' in variable_init:
            declarator_type = variable_init['type']
            if declarator_type == 'CallExpression':
                if 'callee' in variable_init and variable_init['callee']:
                    if 'name' in variable_init['callee'] and variable_init['callee']['name']:
                        callee_name = variable_init['callee']['name']
                        if callee_name == 'require' or callee_name == 'getApp':
                            brother_analysis(variable_declarator, file_context, mini_program)
                    else:
                        cns.call_expression_analysis(variable_declarator['init'], file_context, mini_program)
            else:
                cns.variable_declarator_analysis(variable_declarator, file_context, mini_program)


def function_declaration_analysis(file_context: FileContext, mini_program: MiniProgram):
    for function_declaration in file_context.function_table.values():
        cns.function_declaration_analysis(function_declaration, file_context, mini_program)


def page_object_analysis(file_context: FileContext, mini_program: MiniProgram):
    page_object = file_context.page_object
    page_obj_context = FileContext(Scope.OBJECT)
    page_obj_context.father = file_context
    page_obj_context.name = "Page"
    file_context.children = page_obj_context
    if page_object and "properties" in page_object:
        for obj_property in page_object['properties']:
            property_name = obj_property['key']['name']
            if obj_property['value']['type'] == 'ObjectExpression':
                page_obj_context.const_variable_table[property_name] \
                    = cns.object_node_analysis(obj_property['value'], page_obj_context, mini_program)
            elif obj_property['value']['type'] == 'FunctionExpression':
                obj_property['value']['id'] = dict()
                obj_property['value']['id']['name'] = property_name
                page_obj_context.function_table[property_name] = obj_property['value']
                cns.function_declaration_analysis(obj_property['value'], page_obj_context, mini_program)


def config_analysis(ast_json: dict, file_context: FileContext, mini_program: MiniProgram):
    object_list = []
    cns.find_object_from_ast(ast_json, object_list)
    for obj in object_list:
        ans = cns.object_node_analysis(obj, file_context, mini_program)
        mini_program.secret_leak_checker.do_check(ans)
        file_context.variable_table.update(ans)


def brother_analysis(variable_declarator: dict, file_context: FileContext, mini_program: MiniProgram):
    variable_name = variable_declarator['id']['name']
    callee_name = variable_declarator['init']['callee']['name']
    brother_path = None
    if callee_name == 'require':
        relative_path = variable_declarator['init']['arguments'][0]['value']
        brother_path = utils.get_brother_path(file_context.name, relative_path)

    if callee_name == 'getApp':
        brother_path = mini_program.path + os.sep + 'app.js'

    if brother_path:
        if not af.contains(brother_path):
            cs.increase(brother_path)
            if cs.can_analysis(brother_path):
                brother_context = analysis(brother_path, mini_program)
                if callee_name == 'getApp':
                    af.set_context(brother_path, brother_context.children)
                else:
                    af.set_context(brother_path, brother_context)
                cs.remove(brother_path)
            else:
                cs.decrease(brother_path)
                return
        file_context.brother_table[variable_name] = af.get_context(brother_path)


def app_js_analysis(app_js_path: str, mini_program: MiniProgram):
    app_js_context = analysis(app_js_path, mini_program)
    af.set_context(app_js_path, app_js_context.children)
    if app_js_context.children is not None:
        mini_program.secret_leak_checker.check_object(app_js_context.children.const_variable_table)


def find_page_obj(expression: dict, file_context: FileContext):
    if 'type' in expression and expression['type']:
        expression_type = expression['type']
        call_expression = None
        if expression_type == 'SequenceExpression':
            for seq_expression in expression['expressions']:
                if 'type' in seq_expression and seq_expression['type'] == 'CallExpression':
                    call_expression = seq_expression

        elif expression_type == 'CallExpression':
            call_expression = expression

        elif expression_type == 'AssignmentExpression':
            left = expression['left']
            right = expression['right']
            if left['type'] == 'CallExpression':
                call_expression = left
            elif right['type'] == 'CallExpression':
                call_expression = right

        if call_expression and 'callee' in call_expression:
            callee = call_expression['callee']
            if callee and 'type' in callee and callee['type'] == 'Identifier':
                callee_name = callee['name']
                if callee_name == 'Page' or callee_name == 'App':
                    for argument in call_expression['arguments']:
                        if 'type' in argument and argument['type'] == 'ObjectExpression':
                            if 'properties' in argument and len(argument['properties']) > 0:
                                file_context.page_object = argument
                                break


# # todo: 只存常量表？
if __name__ == '__main__':
    # base_path = r'F:\wxapp-analyzer\testfile'
    base_path = r'E:\WorkSpace\wxapp-analyzer\testfile'

    # path = r'F:\wxapp-analyzer\testfile\pages\register.js'
    # path = r'E:\WorkSpace\wxapp-analyzer\testfile\pages\register.js'
    path = r'E:\WorkSpace\wxapp-analyzer\testfile\pages\index.js'
    mp = MiniProgram(base_path, 'test')
    context = analysis(path, mp)
    # logger.info(context.const_variable_table)
    # # logger.info(context)
    # logger.info(context.children.const_variable_table)
    mp.backend_checker.analysis()
    logger.info(mp.backend_checker)
