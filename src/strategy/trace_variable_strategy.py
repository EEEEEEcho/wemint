from src.path.trace import Trace
from src.path.path import *
from src.utils.page_data import PageData
from loguru import logger
import src.utils.utils as utils


def find_trace(param_set: set, node: dict, page_data: PageData):
    trace = Trace()
    node_type = node['type']
    if node_type == 'FunctionExpression':
        function_expression_exam(trace, node, param_set, page_data)
    elif node_type == 'VariableDeclaration':
        variable_declaration_exam(trace, node, param_set, page_data)
    elif node_type == 'VariableDeclarator':
        variable_declarator_exam(trace, node, param_set, page_data)
    elif node_type == 'IfStatement':
        if_statement_exam(trace, node, param_set, page_data)
    elif node_type == 'ForStatement':
        for_statement_exam(trace, node, param_set, page_data)
    elif node_type == 'WhileStatement':
        while_statement_exam(trace, node, param_set, page_data)
    elif node_type == 'SwitchStatement':
        switch_statement_exam(trace, node, param_set, page_data)
    elif node_type == 'ExpressionStatement':
        expression_statement_exam(trace, node, param_set, page_data)
    elif node_type == 'CallExpression':
        call_expression_exam(trace, node, param_set, page_data)
    elif node_type == 'ArrowFunctionExpression':
        arrow_function_exam(trace, node, param_set, page_data)
    elif node_type == 'ObjectExpression' or node_type == 'ArrayExpression':
        trace.route_type = ObjectExpressionPath()
        object_expression_exam(trace, node, param_set, page_data)
    elif node_type == 'Literal':
        trace.route_type = Path('Literal')
    elif node_type == 'ReturnStatement':
        pass
    else:
        logger.error('Find Trace Error Type: {}'.format(node_type))
    return trace


def function_expression_exam(trace: Trace, function_expression: dict, param_set: set, page_data: PageData):
    trace.route_type = FunctionPath()
    trace.route_type.function_name = function_expression['id']
    block_statement = function_expression['body']
    if 'params' in function_expression and function_expression['params']:
        for param in function_expression['params']:
            suspicious_node_exam(trace, param, param_set, page_data)
        # param_list_exam(trace, function_expression['params'], param_set)
    block_statement_exam(trace, block_statement, param_set, page_data)


def arrow_function_exam(trace: Trace, arrow_function_expression: dict, param_set: set, page_data: PageData):
    trace.route_type = FunctionPath()
    trace.route_type.function_name = 'Arrow Function'
    if 'params' in arrow_function_expression and arrow_function_expression['params']:
        for param in arrow_function_expression['params']:
            suspicious_node_exam(trace, param, param_set, page_data)
        # param_list_exam(trace, arrow_function_expression['params'], param_set)
    if 'body' in arrow_function_expression and arrow_function_expression['body']['type'] == 'BlockStatement':
        block_statement = arrow_function_expression['body']
        block_statement_exam(trace, block_statement, param_set, page_data)


def suspicious_node_exam(trace: Trace, suspicious_node: dict, param_set: set, page_data: PageData, variable_name=None):
    node_type = suspicious_node['type']
    route_type = type(trace.route_type)
    if node_type == 'Identifier':
        variable_value = suspicious_node['name']
        if variable_value in param_set or page_data.contains(variable_value):
            trace.is_path = True
            if route_type == VariableDeclaratorPath or route_type == AssignPath:
                param_set.add(variable_name)
                logger.info(param_set)
                trace.route_type.left = variable_name
                if 'this.data' in variable_name:
                    page_data.add(variable_name)
                trace.route_type.right = variable_value
            elif route_type == CallExpressionPath or route_type == FunctionPath:
                trace.route_type.param = variable_value
            else:
                logger.error('Error Route Type : {}'.format(route_type))
    elif node_type == 'MemberExpression':
        variable_value = utils.restore_ast_node(suspicious_node)
        if member_identifier_check(variable_value, param_set) or page_data.contains(variable_value):
            param_set.add(variable_value)
            trace.is_path = True
            if route_type == VariableDeclaratorPath or route_type == AssignPath:
                param_set.add(variable_name)
                trace.route_type.left = variable_name
                if 'this.data' in variable_name:
                    page_data.add(variable_name)
                trace.route_type.right = variable_value
            elif route_type == CallExpressionPath or route_type == FunctionPath:
                trace.route_type.param = variable_value
            else:
                logger.error('Error Route Type : {}'.format(route_type))
    elif node_type == 'CallExpression':
        variable_value = get_call_function_name(suspicious_node)  # call_function_name
        if member_identifier_check(variable_value, param_set) or page_data.contains(variable_value):
            param_set.add(variable_value)
            trace.is_path = True
            if route_type == VariableDeclaratorPath or route_type == AssignPath:
                param_set.add(variable_name)
                trace.route_type.left = variable_name
                if 'this.data' in variable_name:
                    page_data.add(variable_name)
                trace.route_type.right = variable_value
            elif route_type == CallExpressionPath or route_type == FunctionPath:
                trace.route_type.param = variable_value
        new_trace = find_trace(param_set, suspicious_node, page_data)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)
    elif node_type == 'BinaryExpression':
        if binary_expression_exam(trace, suspicious_node, param_set, page_data):
            trace.is_path = True
            variable_value = utils.restore_ast_node(suspicious_node)
            param_set.add(variable_value)
            if route_type == VariableDeclaratorPath or route_type == AssignPath:
                param_set.add(variable_name)
                trace.route_type.left = variable_name
                if 'this.data' in variable_name:
                    page_data.add(variable_name)
                trace.route_type.right = variable_value
            elif route_type == CallExpressionPath or route_type == FunctionPath:
                trace.route_type.param = variable_value
    elif node_type == 'ThisExpression':
        if not page_data.is_empty():
            param_set.add(variable_name)
    else:
        new_trace = find_trace(param_set, suspicious_node, page_data)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)


# def param_list_exam(trace: Trace, param_list: list, param_set: set):
#     for param in param_list:
#         if param['type'] == 'Identifier':
#             param_identifier = param['name']
#             if param_identifier in param_set:
#                 trace.route_type.param = param_identifier
#                 trace.is_path = True
#         elif param['type'] == 'MemberExpression':
#             param_identifier = utils.restore_ast_node(param)
#             if member_identifier_check(param_identifier, param_set):
#                 trace.route_type.param = param_identifier
#                 trace.is_path = True
#                 param_set.add(param_identifier)
#         elif param['type'] == 'CallExpression':
#             call_function_name = get_call_function_name(param)
#             if member_identifier_check(call_function_name, param_set):
#                 trace.route_type.param = call_function_name
#                 trace.is_path = True
#                 param_set.add(call_function_name)
#             else:
#                 new_trace = find_trace(param_set, param)
#         else:
#             new_trace = find_trace(param_set, param)
#             if new_trace.is_path:
#                 trace.is_path = True
#                 trace.next.append(new_trace)


def variable_declaration_exam(trace: Trace, variable_declaration_node: dict, param_set: set, page_data: PageData):
    if 'declarations' in variable_declaration_node:
        # trace.route_type = VariableDeclarationPath()
        for declaration in variable_declaration_node['declarations']:
            # new_trace = Trace()
            variable_declarator_exam(trace, declaration, param_set, page_data)
            # if new_trace.is_path:
            #     trace.is_path = True
            #     trace.next.append(new_trace)


def variable_declarator_exam(trace: Trace, variable_declarator_node: dict, param_set: set, page_data: PageData):
    variable_id = variable_declarator_node['id']
    variable_id_type = variable_id['type']
    if variable_id_type == 'Identifier':
        variable_name = variable_id['name']
        variable_init = variable_declarator_node['init']
        trace.route_type = VariableDeclaratorPath()
        if variable_init and 'type' in variable_init:
            suspicious_node_exam(trace, variable_init, param_set, page_data, variable_name)
    elif variable_id_type == 'ObjectPattern':
        for prop in variable_id['properties']:
            variable_name = prop['key']['name']
            variable_init = variable_declarator_node['init']
            trace.route_type = VariableDeclaratorPath()
            if variable_init and 'type' in variable_init:
                suspicious_node_exam(trace, variable_init, param_set, page_data, variable_name)


def expression_statement_exam(trace: Trace, expression_statement: dict, param_set: set, page_data: PageData):
    if 'expression' in expression_statement:
        expression = expression_statement['expression']
        if expression and 'type' in expression:
            expression_type = expression['type']
            if expression_type == 'AssignmentExpression':
                assign_expression_analysis(trace, expression, param_set, page_data)
            elif expression_type == 'UpdateExpression':
                update_expression_exam(trace, expression, param_set, page_data)
            elif expression_type == 'ConditionalExpression':
                conditional_expression_exam(trace, expression, param_set, page_data)
            elif expression_type == 'AwaitExpression':
                await_expression_exam(trace, expression, param_set, page_data)
            elif expression_type == 'CallExpression':
                call_expression_exam(trace, expression, param_set, page_data)
            elif expression_type == 'SequenceExpression':
                sequence_expression_exam(trace, expression, param_set, page_data)
            elif expression_type == 'LogicalExpression':
                logical_expression_exam(trace, expression, param_set, page_data)
            else:
                logger.error('Expression Type Error: {}'.format(expression_type))


def call_expression_exam(trace: Trace, call_expression: dict, param_set: set, page_data: PageData):
    callee = call_expression['callee']
    arguments = call_expression['arguments']
    call_function_name = utils.restore_ast_node(callee)
    if call_function_name:
        if call_function_name == 'this.setData':
            for argument in arguments:
                if argument['type'] == 'ObjectExpression':
                    tmp_trace = Trace()
                    tmp_trace.route_type = ObjectExpressionPath()
                    obj_argument = object_expression_exam(tmp_trace, argument, param_set, page_data)
                    for key in obj_argument.keys():
                        page_data.add('this.data.' + key)
        trace.route_type = CallExpressionPath()
        trace.route_type.callee = call_function_name
        for argument in arguments:
            suspicious_node_exam(trace, argument, param_set, page_data)
        if trace.route_type.params is None and trace.is_path:
            trace.route_type.params = True


def get_call_function_name(call_expression: dict):
    if 'callee' in call_expression:
        return utils.restore_ast_node(call_expression['callee'])
    return None


def if_statement_exam(trace: Trace, if_statement: dict, param_set: set, page_data: PageData):
    if 'consequent' in if_statement:
        trace.route_type = Path('If Consequent')
        if if_statement['consequent'] and \
                'type' in if_statement['consequent']:
            if if_statement['consequent']['type'] == 'BlockStatement':
                block_statement = if_statement['consequent']
                block_statement_exam(trace, block_statement, param_set, page_data)
            if if_statement['consequent']['type'] == 'IfStatement':
                if_statement_exam(trace, if_statement['consequent'], param_set, page_data)
    if 'alternate' in if_statement:
        trace.route_type = Path('If Alternate')
        if if_statement['alternate'] and \
                'type' in if_statement['alternate']:
            if if_statement['alternate']['type'] == 'BlockStatement':
                block_statement = if_statement['alternate']
                block_statement_exam(trace, block_statement, param_set, page_data)
            if if_statement['alternate']['type'] == 'IfStatement':
                if_statement_exam(trace, if_statement['alternate'], param_set, page_data)


def block_statement_exam(trace: Trace, block_statement: dict, param_set: set, page_data: PageData):
    if 'body' in block_statement:
        for block_node in block_statement['body']:
            node_trace = find_trace(param_set, block_node, page_data)
            if node_trace.is_path:
                trace.is_path = True
                trace.next.append(node_trace)


def for_statement_exam(trace: Trace, for_statement: dict, param_set: set, page_data: PageData):
    trace.route_type = Path('For Loop')
    if 'body' in for_statement and for_statement['body']['type'] == 'BlockStatement':
        block_statement_exam(trace, for_statement['body'], param_set, page_data)


def while_statement_exam(trace: Trace, while_statement: dict, param_set: set, page_data: PageData):
    trace.route_type = Path('While Loop')
    if 'body' in while_statement and while_statement['body']['type'] == 'BlockStatement':
        block_statement_exam(trace, while_statement['body'], param_set, page_data)


def switch_statement_exam(trace: Trace, switch_statement: dict, param_set: set, page_data: PageData):
    for case_node in switch_statement['cases']:
        fake_block = {'body': []}
        for consequent in case_node['consequent']:
            fake_block['body'].append(consequent)
        block_statement_exam(trace, fake_block, param_set, page_data)


def assign_expression_analysis(trace: Trace, assign_expression: dict, param_set: set, page_data: PageData):
    trace.route_type = AssignPath()
    if 'left' in assign_expression and 'right' in assign_expression:
        left_type = assign_expression['left']['type']
        variable_name = None
        if left_type == 'Identifier':
            variable_name = assign_expression['left']['name']
        elif left_type == 'MemberExpression':
            variable_name = utils.restore_ast_node(assign_expression['left'])

        if variable_name:
            suspicious_node_exam(trace, assign_expression['right'], param_set, page_data, variable_name)


def update_expression_exam(trace: Trace, update_expression: dict, param_set: set, page_data: PageData):
    if 'argument' in update_expression and 'operator' in update_expression:
        if update_expression['argument'] and 'name' in update_expression['argument']:
            trace.route_type = UpdateExpressionPath()
            variable_name = update_expression['argument']['name']
            update_operator = update_expression['operator']
            if variable_name in param_set:
                trace.is_path = True
                trace.route_type.identifier = variable_name
                trace.route_type.operate = update_operator


def conditional_expression_exam(trace: Trace, conditional_expression: dict, param_set: set, page_data: PageData):
    trace.route_type = ConditionalExpressionPath()
    if 'consequent' in conditional_expression:
        new_trace = find_trace(param_set, conditional_expression['consequent'], page_data)
        if new_trace.is_path:
            trace.route_type.consequent = new_trace
            trace.is_path = True

    if 'alternate' in conditional_expression:
        new_trace = find_trace(param_set, conditional_expression['alternate'], page_data)
        if new_trace.is_path:
            trace.route_type.alternate = new_trace
            trace.is_path = True


def await_expression_exam(trace: Trace, await_expression: dict, param_set: set, page_data: PageData):
    trace.route_type = AwaitExpressionPath()
    if 'argument' in await_expression:
        new_trace = find_trace(param_set, await_expression['argument'], page_data)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)


def sequence_expression_exam(trace: Trace, sequence_expression: dict, param_set: set, page_data: PageData):
    for expression in sequence_expression['expressions']:
        expression_statement = dict()
        expression_statement['expression'] = expression
        expression_statement_exam(trace, expression_statement, param_set, page_data)


def logical_expression_exam(trace: Trace, logical_expression: dict, param_set: set, page_data: PageData):
    # todo?
    trace.route_type = LogicalExpressionPath()
    if 'left' in logical_expression:
        expression_statement = dict()
        expression_statement['expression'] = logical_expression['left']
        new_trace = find_trace(param_set, expression_statement, page_data)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)

    if 'right' in logical_expression:
        expression_statement = dict()
        expression_statement['expression'] = logical_expression['right']
        new_trace = find_trace(param_set, expression_statement, page_data)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)


def binary_expression_exam(trace: Trace, binary_expression: dict, param_set: set, page_data: PageData):
    if binary_expression['type'] == 'Literal':
        return False
    elif binary_expression['type'] == 'Identifier':
        value_name = binary_expression['name']
        return value_name in param_set or page_data.contains(value_name)
    elif binary_expression['type'] == 'MemberExpression':
        value_name = utils.restore_ast_node(binary_expression)
        return member_identifier_check(value_name, param_set) or page_data.contains(value_name)
    elif binary_expression['type'] == 'CallExpression':
        call_expression = binary_expression
        call_function_name = get_call_function_name(call_expression)
        new_trace = find_trace(param_set, call_expression, page_data)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)
        return member_identifier_check(call_function_name, param_set) or page_data.contains(call_function_name)
    elif binary_expression['type'] == 'BinaryExpression':
        return binary_expression_exam(trace, binary_expression['left'], param_set, page_data) \
               or binary_expression_exam(trace, binary_expression['right'], param_set, page_data)
    else:
        logger.error('Binary Expression Type Error: {}'.format(binary_expression['type']))
        return False


def object_expression_exam(trace: Trace, obj_expression: dict, param_set: set, page_data: PageData):
    if obj_expression['type'] == 'ArrayExpression':
        li = []
        for i, element in enumerate(obj_expression['elements']):
            node_type = element['type']
            if node_type == 'Identifier':
                variable_value = element['name']
                li.append(variable_value)
                if variable_value in param_set or page_data.contains(variable_value):
                    trace.is_path = True
                    trace.route_type.key = i
                    trace.route_type.value = variable_value
            elif node_type == 'MemberExpression':
                variable_value = utils.restore_ast_node(element)
                li.append(variable_value)
                if member_identifier_check(variable_value, param_set) or page_data.contains(variable_value):
                    trace.is_path = True
                    trace.route_type.key = i
                    trace.route_type.value = variable_value
                    param_set.add(variable_value)
            elif node_type == 'CallExpression':
                variable_value = get_call_function_name(element)  # call_function_name
                li.append(variable_value)
                if member_identifier_check(variable_value, param_set) or page_data.contains(variable_value):
                    trace.is_path = True
                    trace.route_type.key = i
                    trace.route_type.value = variable_value
                    param_set.add(variable_value)
                new_trace = find_trace(param_set, element, page_data)
                if new_trace.is_path:
                    trace.is_path = True
                    trace.next.append(new_trace)
            elif node_type == 'BinaryExpression':
                if binary_expression_exam(trace, element, param_set, page_data):
                    trace.is_path = True
                    variable_value = utils.restore_ast_node(element)
                    param_set.add(variable_value)
                    li.append(variable_value)
                    trace.is_path = True
                    trace.route_type.key = i
                    trace.route_type.value = variable_value
            elif node_type == 'ObjectExpression' or node_type == 'ArrayExpression':
                li.append(object_expression_exam(trace, element, param_set, page_data))
            else:
                new_trace = find_trace(param_set, element, page_data)
                if new_trace.is_path:
                    trace.is_path = True
                    trace.next.append(new_trace)
        return li
    elif obj_expression['type'] == 'ObjectExpression':
        ret = {}
        for prop in obj_expression['properties']:
            if prop['type'] == 'Property':
                if prop['key']['type'] == 'Literal':
                    key = prop['key']['value']
                else:
                    key = prop['key']['name']

                node_type = prop['value']['type']
                if node_type == 'Identifier':
                    variable_value = prop['value']['name']
                    ret[key] = variable_value
                    if variable_value in param_set or page_data.contains(variable_value):
                        trace.is_path = True
                        trace.route_type.param_map[key] = variable_value
                        param_set.add(variable_value)
                elif node_type == 'MemberExpression':
                    variable_value = utils.restore_ast_node(prop['value'])
                    ret[key] = variable_value
                    if member_identifier_check(variable_value, param_set) or page_data.contains(variable_value):
                        trace.is_path = True
                        trace.route_type.param_map[key] = variable_value
                        param_set.add(variable_value)
                elif node_type == 'CallExpression':
                    variable_value = get_call_function_name(prop['value'])  # call_function_name
                    ret[key] = variable_value
                    if member_identifier_check(variable_value, param_set) or page_data.contains(variable_value):
                        trace.is_path = True
                        trace.route_type.param_map[key] = variable_value
                        param_set.add(variable_value)
                    new_trace = find_trace(param_set, prop['value'],page_data)
                    if new_trace.is_path:
                        trace.is_path = True
                        trace.next.append(new_trace)
                elif node_type == 'BinaryExpression':
                    if binary_expression_exam(trace, prop['value'], param_set, page_data):
                        trace.is_path = True
                        variable_value = utils.restore_ast_node(prop['value'])
                        ret[key] = variable_value
                        trace.is_path = True
                        trace.route_type.param_map[key] = variable_value
                        param_set.add(variable_value)
                elif node_type == 'ArrayExpression' or node_type == 'ObjectExpression':
                    ret[key] = object_expression_exam(trace, prop['value'], param_set, page_data)
                else:
                    new_trace = find_trace(param_set, prop['value'], page_data)
                    if new_trace.is_path:
                        trace.is_path = True
                        trace.next.append(new_trace)
        return ret
    return None


def member_identifier_check(member_identifier: str, param_set: set):
    for param in param_set:
        if param and type(param) is str:
            if member_identifier and type(member_identifier) is str:
                if member_identifier.startswith(param):
                    return True
    return False


# class Node:
#
#     def __init__(self, content):
#         self.content = content
#         self.left = None
#         self.right = None
#
#
# root = Node("root")
# left_node = Node("left")
# right_node = Node("right")
# left_left_node = Node("left_left")
# left_right_node = Node("left_right")
# right_left_node = Node("right_left")
# right_right_node = Node("right_right")
# right_right_left_node = Node("right_right_left")
# right_right_right_node = Node("right_right_right")
#
# root.left = left_node
# root.right = right_node
#
# left_node.left = left_left_node
# left_node.right = left_right_node
#
# right_node.left = right_left_node
# right_node.right = right_right_node
#
# right_right_node.left = right_right_left_node
# right_right_node.right = right_right_right_node

# def walk(root: Node):
#     new_trace = Trace()
#     new_trace.trace_info = root.content
#     if root.content == 'right_right_right' or root.content == 'right':
#         new_trace.is_sink = True
#     if root.left:
#         left_trace = walk(root.left)
#         if left_trace.is_sink:
#             new_trace.is_sink = True
#             new_trace.next.append(left_trace)
#     if root.right:
#         right_trace = walk(root.right)
#         if right_trace.is_sink:
#             new_trace.is_sink = True
#             new_trace.next.append(right_trace)
#     return new_trace

# walk_trace = walk(root)
# logger.info(walk_trace)

# path = VariableDeclaratorPath()
# print(type(path))
# print(type(path) == VariableDeclaratorPath)
