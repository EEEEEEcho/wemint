import src.strategy.common_node_strategy as cns
import src.utils.analysed_file as af
import os
from src.pojo.file_context import FileContext
from src.pojo.function_context import FunctionContext
from src.pojo.scope_enum import Scope
from src.pojo.miniprogram import MiniProgram
from src.utils import utils
from loguru import logger


def analysis(js_file_path: str, mini_program: MiniProgram) -> FileContext:
    file_context = FileContext(Scope.FILE, js_file_path)
    ast_json = utils.generate_ast(js_file_path)

    if ast_json is not None:
        if 'config.js' in js_file_path:
            config_analysis(ast_json, file_context)
        else:
            file_level_analysis(ast_json, file_context, mini_program)
    return file_context


def file_level_analysis(ast_json: dict, file_context: FileContext, mini_program: MiniProgram):
    for item in ast_json['body']:
        if item['type'] == 'VariableDeclaration':
            for variable_declarator in item['declarations']:
                variable_name = variable_declarator['id']['name']
                file_context.variable_table[variable_name] = variable_declarator
        elif item['type'] == 'FunctionDeclaration':
            function_name = item['id']['name']
            file_context.function_table[function_name] = item
        elif item['type'] == 'ExpressionStatement':
            if item['expression']['type'] == 'CallExpression' and len(item['expression']['arguments']) == 1:
                page_obj = item['expression']['arguments'][0]
                if page_obj['type'] == 'ObjectExpression':
                    file_context.page_object = page_obj
                elif page_obj['type'] == 'SequenceExpression':
                    for expression in page_obj['expressions']:
                        if expression['type'] == 'AssignmentExpression':
                            file_context.page_object = expression['right']
                        elif expression['type'] == 'ObjectExpression':
                            file_context.page_object = expression

    variable_table_analysis(file_context, mini_program)
    function_declaration_analysis(file_context, mini_program)


def variable_table_analysis(file_context: FileContext, mini_program: MiniProgram):
    for variable_declarator_name, variable_declarator in file_context.variable_table.items():
        variable_init = variable_declarator['init']
        if variable_init:
            declarator_type = variable_init['type']
            if declarator_type == 'CallExpression' and \
                    (variable_init['callee']['name'] == 'require' or variable_init['callee']['name'] == 'getApp'):
                brother_analysis(variable_declarator, file_context, mini_program)
            else:
                cns.variable_declarator_analysis(variable_declarator, file_context, mini_program)


def function_declaration_analysis(file_context: FileContext, mini_program: MiniProgram):
    for function_declaration in file_context.function_table.values():
        cns.function_declaration_analysis(function_declaration, file_context, mini_program)
        # if file_context.scope == Scope.FILE:
        #     scope_value = Scope.FILE_FUNCTION
        # else:
        #     scope_value = Scope.OBJECT_FUNCTION
        # function_context = FunctionContext(scope_value, function_name)
        # function_context.father = file_context
        # cns.function_declaration_analysis(function_declaration, file_context, mini_program)


def page_obj_analysis(file_context: FileContext, page_object: dict):
    """
    文件中Page对象级别的上下文分析
    :param file_context:
    :param page_object:
    :return:
    """
    page_context = FileContext(Scope.OBJECT)
    page_context.father = file_context
    # todo: 这里先定义成一个固定值，其实最好的办法是他在项目中的路由名
    page_context.name = "Page"
    if 'properties' in page_object:
        for _property in page_object['properties']:
            if _property['value']['type'] == 'ObjectExpression':
                variable_name = _property['key']['name']
                variable_value = cns.object_node_analysis(_property['value'], page_context)
                page_context.variable_table[variable_name] = variable_value
            elif _property['value']['type'] == 'Literal':
                variable_name = _property['key']['name']
                variable_value = _property['value']['value']
                page_context.variable_table[variable_name] = variable_value
            elif _property['value']['type'] == 'FunctionExpression':
                if _property['value']['body']['type'] == 'BlockStatement':
                    function_name = _property['key']['name']
                    function_context = FileContext(Scope.OBJECT_FUNCTION)
                    function_context.name = function_name
                    function_context.father = page_context
                    logger.info(function_name)
        return page_context


def config_analysis(ast_json: dict, file_context: FileContext):
    object_list = []
    cns.find_object_from_ast(ast_json, object_list)
    for obj in object_list:
        ans = cns.object_node_analysis(obj, file_context)
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
            brother_context = analysis(brother_path, mini_program)
            if callee_name == 'getApp':
                af.set_context(brother_path, brother_context.children)
            else:
                af.set_context(brother_path, brother_context)
        file_context.brother_table[variable_name] = af.get_context(brother_path)


# base_path = r'F:\wxapp-analyzer\testfile'
base_path = r'E:\WorkSpace\wxapp-analyzer\testfile'

# path = r'F:\wxapp-analyzer\testfile\pages\register.js'
path = r'E:\WorkSpace\wxapp-analyzer\testfile\pages\register.js'
mp = MiniProgram(base_path, 'test')
context = analysis(path, mp)
# logger.info(context.const_variable_table)
# # logger.info(context)

# todo: 只存常量表？
