from src.pojo.miniprogram import MiniProgram
from src.pojo.function_context import FunctionContext
from loguru import logger
import src.strategy.context_operation as co
import src.utils.utils as utils


def variable_declaration_analysis(variable_declaration: dict, context, mini_program: MiniProgram):
    for declaration in variable_declaration['declarations']:
        if declaration['type'] == 'VariableDeclarator':
            variable_name = declaration['id']['name']
            variable_init = declaration['init']
            if variable_init is not None and \
                    variable_name is not None:
                # 文本
                if variable_init['type'] == 'Literal':
                    variable_value = variable_init['value']
                    context.variable_table[variable_name] = variable_value
                # 赋值
                elif variable_init['type'] == 'Identifier':
                    value_identifier = variable_init['name']
                    variable_value = co.search_identifier(value_identifier, context)
                    context.variable_table[variable_name] = variable_value
                # 表达式
                elif variable_init['type'] == 'BinaryExpression':
                    variable_value = binary_expression_analysis(variable_init, context)
                    context.variable_table[variable_name] = variable_value
                # 对象
                elif variable_init['type'] == 'ObjectExpression':
                    variable_value = object_node_analysis(variable_init, context)
                    context.variable_table[variable_name] = variable_value
                elif variable_init['type'] == 'MemberExpression':
                    value_identifier = member_expression_analysis(variable_init)
                    if value_identifier is not None:
                        # 如果是通过直接使用getApp()方式调用的，那么就要给其最顶层的FileContext添加app.js的brother
                        if value_identifier.startswith('getApp'):
                            # pass
                            co.add_brother_to_context(context, mini_program)
                        variable_value = co.search_identifier(value_identifier, context)
                        # taint_type = key_leak.taint_match(variable_value)
                        # scope_check(scope, mini_program, variable_name, variable_value, taint_type)
                #


def expression_statement_analysis(expression_statement: dict, context, mini_program: MiniProgram):
    expression = expression_statement['expression']
    expression_type = expression['type']
    function_node_list = []
    # 直接的函数调用
    if expression_type == 'CallExpression':
        call_expression_analysis(expression, function_node_list, context, mini_program)
    # 条件表达式
    elif expression_type == 'ConditionalExpression':
        condition_expression_analysis(expression, function_node_list, context, mini_program)
    # 一行多个调用表达式
    elif expression_type == 'SequenceExpression':
        sequence_expression_analysis(expression, function_node_list, context, mini_program)
    return function_node_list


def call_expression_analysis(call_expression: dict, node_list: list, context, mini_program: MiniProgram):
    pass
    # if call_expression['callee']['type'] == 'MemberExpression':
    #     if 'object' in call_expression['callee'] and 'property' in call_expression['callee']:
    #         if 'name' in call_expression['callee']['object'] and 'name' in call_expression['callee']['property']:
    #             obj_name = call_expression['callee']['object']['name']
    #             func_name = call_expression['callee']['property']['name']
    #             if obj_name == 'wx' and func_name in utils.request_methods:
    #                 # 找到了request函数，在这里只分析属性
    #                 if 'arguments' in call_expression:
    #                     for argument in call_expression['arguments']:
    #                         if argument['type'] == 'ObjectExpression':
    #                             key_leak.appid_secret_analysis(argument, context, mini_program, scope)
    #     if 'arguments' in call_expression:
    #         for argument in call_expression['arguments']:
    #             if argument['type'] == 'ObjectExpression':
    #                 # 在这里只提取参数中传递的回调函数，并不分析属性
    #                 function_node_analysis(argument, node_list)


def find_object_from_ast(tree, object_list: list):
    ret = []
    if type(tree) == list:
        for el in tree:
            if el.get('type'):
                ret.append(el)
                if 'type' in el and el['type'] == 'ObjectExpression':
                    object_list.append(el)
                ret += find_object_from_ast(el, object_list)
    elif type(tree) == dict:
        for k, v in tree.items():
            if type(v) == dict and v.get('type'):
                if 'type' in v and v['type'] == 'ObjectExpression':
                    object_list.append(v)
                ret.append(v)
                ret += find_object_from_ast(v, object_list)
            if type(v) == list:
                ret += find_object_from_ast(v, object_list)
    return ret


def condition_expression_analysis(condition_expression: dict, node_list: list, context,
                                  mini_program: MiniProgram):
    test = condition_expression['test']
    consequent = condition_expression['consequent']
    alternate = condition_expression['alternate']
    if test['type'] == 'CallExpression':
        call_expression_analysis(test, node_list, context, mini_program)
    if consequent['type'] == 'CallExpression':
        call_expression_analysis(consequent, node_list, context, mini_program)
    if alternate['type'] == 'CallExpression':
        call_expression_analysis(alternate, node_list, context, mini_program)


# def function_node_analysis(objection_expression: dict, node_list: list):
#     for prop in objection_expression['properties']:
#         if prop['value']['type'] == 'FunctionExpression':
#             node_list.append(prop['value'])
#         elif prop['value']['type'] == 'ObjectExpression':
#             function_node_analysis(prop['value'], node_list)


def member_expression_analysis(member_expression: dict):
    obj = member_expression['object']
    prop = member_expression['property']
    if obj['type'] == 'Identifier':
        if 'name' in obj and 'name' in prop:
            return obj['name'] + '.' + prop['name']
        elif 'name' in obj:
            return obj['name']
        elif 'name' in prop:
            return prop['name']
        else:
            return None
    elif obj['type'] == 'CallExpression':
        if 'callee' in obj and 'name' in obj['callee'] and \
                'name' in prop:
            return obj['callee']['name'] + '.' + prop['name']
        else:
            return None
    elif obj['type'] == 'MemberExpression':
        value = member_expression_analysis(obj)
        if value is not None and 'name' in prop:
            return value + '.' + prop['name']
        elif value is not None:
            return value
        elif 'name' in prop:
            return prop['name']
        else:
            return None
    return None


def sequence_expression_analysis(sequence_expression: dict, node_list: list, context,
                                 mini_program: MiniProgram):
    for expression in sequence_expression['expressions']:
        if expression['type'] == 'CallExpression':
            call_expression_analysis(expression, node_list, context, mini_program)


def binary_expression_analysis(bi_expression, file_function_context):
    try:
        if bi_expression['type'] == 'Literal':
            return utils.recast_type(bi_expression['value'])
        elif bi_expression['type'] == 'Identifier':
            value_name = bi_expression['name']
            return co.find_father(value_name, file_function_context)
        elif bi_expression['type'] == 'BinaryExpression':
            ops = bi_expression['operator']
            return utils.calculate_value(binary_expression_analysis(bi_expression['left'],
                                                                    file_function_context),
                                         ops,
                                         binary_expression_analysis(bi_expression['right'],
                                                                    file_function_context))
        else:
            return None
    except Exception as e:
        logger.error(e)
        return None


def object_node_analysis(obj_expression: dict, context):
    if obj_expression['type'] == 'ArrayExpression':
        li = []
        for element in obj_expression['elements']:
            if element['type'] == 'Literal':
                li.append(element['value'])
            elif element['type'] == 'Identifier':
                identifier_value = co.search_identifier(element['name'], context)
                li.append(identifier_value)
            elif element['type'] == 'MemberExpression':
                identifier = member_expression_analysis(element['value'])
                identifier_value = co.search_identifier(identifier, context)
                li.append(identifier_value)
            elif element['type'] == 'ObjectExpression':
                li.append(object_node_analysis(element, context))
            elif element['type'] == 'ArrayExpression':
                li.append(object_node_analysis(element, context))
        return li
    elif obj_expression['type'] == 'ObjectExpression':
        ret = {}
        for prop in obj_expression['properties']:
            if prop['key']['type'] == 'Literal':
                key = prop['key']['value']
            else:
                key = prop['key']['name']
            if prop['value']['type'] == 'Literal':
                ret[key] = prop['value']['value']
            elif prop['value']['type'] == 'Identifier':
                identifier_value = co.search_identifier(prop['value']['name'], context)
                ret[key] = identifier_value
            elif prop['value']['type'] == 'BinaryExpression':
                binary_value = binary_expression_analysis(prop['value'], context)
                ret[key] = binary_value
            elif prop['value']['type'] == 'MemberExpression':
                identifier = member_expression_analysis(prop['value'])
                identifier_value = co.search_identifier(identifier, context)
                ret[key] = identifier_value
            elif prop['value']['type'] == 'ArrayExpression':
                ret[key] = object_node_analysis(prop['value'], context)
            elif prop['value']['type'] == 'ObjectExpression':
                ret[key] = object_node_analysis(prop['value'], context)
        return ret
    return None


def function_declaration_analysis(function_declaration: dict,function_context: FunctionContext,file_func_dict: dict):
    pass
