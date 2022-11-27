from src.pojo.miniprogram import MiniProgram
from src.pojo.function_context import FunctionContext
from src.pojo.block_context import BlockContext
from src.pojo.scope_enum import Scope
from loguru import logger
import src.strategy.context_operation as co
import src.utils.utils as utils


def variable_declarator_analysis(variable_declarator: dict, context, mini_program: MiniProgram):
    """
    todo: 规则定义，风险检测
    :param variable_declarator:
    :param context:
    :param mini_program:
    :return:
    """
    # todo:对变量名字的校验？
    variable_name = variable_declarator['id']['name']
    variable_init = variable_declarator['init']
    variable_type = variable_init['type']
    variable_value = None
    if variable_type == 'Literal':
        # todo: 对变量值的校验
        variable_value = variable_init['value']
    elif variable_type == 'Identifier':
        variable_identifier = variable_init['name']
        variable_value = co.search_identifier(variable_identifier, context)
    elif variable_type == 'ObjectExpression' or variable_type == 'ArrayExpression':
        variable_value = object_node_analysis(variable_init, context)
    elif variable_type == 'MemberExpression':
        # todo:校验？
        variable_identifier = member_expression_analysis(variable_init)
        if variable_identifier is not None:
            if 'getApp' in variable_identifier:
                co.add_brother_to_context(context, mini_program)
        variable_value = co.search_identifier(variable_identifier, context)
        # 如果找不到值，那就以调用形式出现吧
        if variable_value is None:
            variable_value = variable_identifier
    elif variable_type == 'BinaryExpression':
        variable_value = binary_expression_analysis(variable_init, context)
    context.const_variable_table[variable_name] = variable_value


def block_statement_analysis(block_statement: dict, context, mini_program: MiniProgram):
    for node in block_statement['body']:
        node_type = node['type']
        if node_type == 'VariableDeclaration':
            for variable_declarator in node['declarations']:
                variable_declarator_analysis(variable_declarator, context, mini_program)
        elif node_type == 'IfStatement':
            if_statement_analysis(node, context, mini_program)
        elif node_type == 'ForStatement':
            for_statement_analysis(node, context, mini_program)
        elif node_type == 'WhileStatement':
            while_statement_analysis(node, context, mini_program)
        elif node_type == 'FunctionDeclaration':
            function_declaration_analysis(node, context, mini_program)
        elif node_type == 'SwitchStatement':
            switch_statement_analysis(node, context, mini_program)
        elif node_type == 'ExpressionStatement':
            expression_statement_analysis(node, context, mini_program)
        else:
            continue
    # 测试上下文分析情况的语句
    logger.info(context.const_variable_table)


def if_statement_analysis(if_statement: dict, context, mini_program: MiniProgram):
    # if语句的两端都需要进行分析
    if 'consequent' in if_statement:
        if if_statement['consequent'] and \
                'type' in if_statement['consequent']:
            if if_statement['consequent']['type'] == 'BlockStatement':
                block_context = BlockContext(Scope.BLOCK)
                block_context.father = context
                block_statement_analysis(if_statement['consequent'], block_context, mini_program)
            if if_statement['consequent']['type'] == 'IfStatement':
                if_statement_analysis(if_statement['consequent'], context, mini_program)

    if 'alternate' in if_statement:
        if if_statement['alternate'] and \
                'type' in if_statement['alternate']:
            if if_statement['alternate']['type'] == 'BlockStatement':
                block_context = BlockContext(Scope.BLOCK)
                block_context.father = context
                block_statement_analysis(if_statement['alternate'], block_context, mini_program)
            if if_statement['alternate']['type'] == 'IfStatement':
                if_statement_analysis(if_statement['alternate'], context, mini_program)


def for_statement_analysis(for_statement: dict, context, mini_program: MiniProgram):
    # for循环，只分析循环体中的语句
    if 'body' in for_statement and for_statement['body']['type'] == 'BlockStatement':
        block_context = BlockContext(Scope.BLOCK)
        block_context.father = context
        block_statement_analysis(for_statement['body'], block_context, mini_program)


def while_statement_analysis(while_statement: dict, context, mini_program: MiniProgram):
    # while循环，只分析循环体中的语句
    if 'body' in while_statement and while_statement['body']['type'] == 'BlockStatement':
        block_context = BlockContext(Scope.BLOCK)
        block_context.father = context
        block_statement_analysis(while_statement['body'], block_context, mini_program)


def function_declaration_analysis(function_declaration: dict, context,
                                  mini_program: MiniProgram):
    if context.scope == Scope.FILE:
        scope_value = Scope.FILE_FUNCTION
        function_context_name = function_declaration['id']['name']
        function_context = FunctionContext(scope_value, function_context_name)
    elif context.scope == Scope.OBJECT:
        scope_value = Scope.OBJECT_FUNCTION
        function_context_name = function_declaration['id']['name']
        function_context = FunctionContext(scope_value, function_context_name)
    else:
        scope_value = Scope.BLOCK
        function_context = BlockContext(scope_value)
    function_context.father = context
    # 形参列表
    for param in function_declaration['params']:
        if param['type'] == 'Identifier':
            function_context.arguments_table[param['name']] = None
    # 分析函数中的节点
    if 'body' in function_declaration and function_declaration['body']['type'] == 'BlockStatement':
        block_statement = function_declaration['body']
        block_statement_analysis(block_statement, function_context, mini_program)


def function_expression_analysis(property_name: str, function_expression: dict,
                                 context, mini_program: MiniProgram):

    obj_function_context = FunctionContext(Scope.OBJECT_FUNCTION, property_name)
    obj_function_context.father = context
    # 形参列表
    for param in function_expression['params']:
        if param['type'] == 'Identifier':
            obj_function_context.arguments_table[param['name']] = None





def switch_statement_analysis(switch_statement: dict, context,
                              mini_program: MiniProgram):
    for case_node in switch_statement['cases']:
        fake_block = {'body': []}
        for consequent in case_node['consequent']:
            fake_block['body'].append(consequent)
        block_context = BlockContext(Scope.BLOCK)
        block_context.father = context
        block_statement_analysis(fake_block, block_context, mini_program)
        # logger.info(block_context.const_variable_table)


def expression_statement_analysis(expression_statement: dict, context, mini_program: MiniProgram):
    if 'expression' in expression_statement:
        expression = expression_statement['expression']
        expression_type = expression['type']
        if expression_type == 'AssignmentExpression':
            assign_expression_analysis(expression_statement['expression'], context, mini_program)
        elif expression_type == 'UpdateExpression':
            update_expression_analysis(expression_statement['expression'], context, mini_program)
        elif expression_type == 'CallExpression':
            call_expression_analysis(expression_statement['expression'], context, mini_program)


def assign_expression_analysis(assign_expression: dict, context, mini_program: MiniProgram):
    # 对赋值表达式进行封装，封装为一个VariableDeclaration,进行分析
    if 'left' in assign_expression and 'right' in assign_expression:
        variable_name = assign_expression['left']['name']
        if variable_name in context.const_variable_table:
            pre_variable_value = context.const_variable_table[variable_name]
            variable_declarator = dict()
            variable_declarator['id'] = dict()
            variable_declarator['id']['name'] = variable_name
            variable_declarator['init'] = assign_expression['right']
            variable_declarator_analysis(variable_declarator, context, mini_program)
            assign_operator = assign_expression['operator']
            now_value = context.const_variable_table[variable_name]
            final_value = utils.execute_assign_operate(pre_variable_value, assign_operator, now_value)
            context.const_variable_table[variable_name] = final_value


def update_expression_analysis(update_expression: dict, context, mini_program: MiniProgram):
    if 'argument' in update_expression and 'operator' in update_expression:
        variable_name = update_expression['argument']['name']
        update_operator = update_expression['operator']
        if variable_name in context.const_variable_table:
            variable_value = context.const_variable_table[variable_name]
            if update_operator == "++" and type(variable_value) is int:
                context.const_variable_table[variable_name] = variable_value + 1
            if update_operator == "--" and type(variable_value) is int:
                context.const_variable_table[variable_name] = variable_value - 1


# def expression_statement_analysis(expression_statement: dict, context, mini_program: MiniProgram):
#     expression = expression_statement['expression']
#     expression_type = expression['type']
#     function_node_list = []
#     # 直接的函数调用
#     if expression_type == 'CallExpression':
#         call_expression_analysis(expression, function_node_list, context, mini_program)
#     # 条件表达式
#     elif expression_type == 'ConditionalExpression':
#         condition_expression_analysis(expression, function_node_list, context, mini_program)
#     # 一行多个调用表达式
#     elif expression_type == 'SequenceExpression':
#         sequence_expression_analysis(expression, function_node_list, context, mini_program)
#     return function_node_list


def call_expression_analysis(call_expression: dict, context, mini_program: MiniProgram):
    pass


# def call_expression_analysis(call_expression: dict, node_list: list, context, mini_program: MiniProgram):
#     pass
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
    # let n = 'name';let name = dict[n] 这种情况不好分析,后续想办法
    obj = member_expression['object']
    prop = member_expression['property']
    if obj['type'] == 'Identifier':
        if 'name' in obj:
            if 'name' in prop:
                return obj['name'] + '.' + str(prop['name'])
            if 'value' in prop:
                return obj['name'] + '.' + str(prop['value'])
            return obj['name']
        elif 'name' in prop:
            return prop['name']
        elif 'value' in prop:
            return prop['value']
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
        if value is not None:
            if 'name' in prop:
                return value + '.' + str(prop['name'])
            if 'value' in prop:
                return value + '.' + str(prop['value'])
            return value
        elif 'name' in prop:
            return prop['name']
        elif 'value' in prop:
            return prop['value']
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
            return co.find_context(value_name, file_function_context)
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
