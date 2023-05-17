import copy

from path.trace import Trace
from path.path import *
from utils.page_data import PageData
from pojo.source_api import source_api
from loguru import logger
import utils.utils as utils


def find_trace(param_set: set, node: dict, page_data: PageData, page_function_table: dict,
               need_new_param: bool = True):
    trace = Trace()
    if 'type' in node and node['type']:
        node_type = node['type']
        if node_type == 'FunctionExpression':
            function_expression_exam(trace, node, param_set, page_data, page_function_table, need_new_param)
        elif node_type == 'VariableDeclaration':
            variable_declaration_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'VariableDeclarator':
            variable_declarator_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'IfStatement':
            if_statement_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'ForStatement' or node_type == 'ForInStatement':
            for_statement_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'WhileStatement':
            while_statement_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'SwitchStatement':
            switch_statement_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'ExpressionStatement':
            expression_statement_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'CallExpression':
            call_expression_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'ArrowFunctionExpression':
            arrow_function_exam(trace, node, param_set, page_data, page_function_table, need_new_param)
        elif node_type == 'ObjectExpression' or node_type == 'ArrayExpression':
            trace.route_type = ObjectExpressionPath()
            object_expression_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'UpdateExpression':
            update_expression_exam(trace, node, param_set, page_data)
        elif node_type == 'ConditionalExpression':
            conditional_expression_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'UnaryExpression':
            unary_expression_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'LogicalExpression':
            logical_expression_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'ReturnStatement':
            return_expression_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'SequenceExpression':
            sequence_expression_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'AssignmentExpression':
            assign_expression_analysis(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'BinaryExpression':
            binary_expression_exam(trace, node, param_set, page_data, page_function_table)
        elif node_type == 'MemberExpression':
            trace.route_type = Path("MemberExpression")
        elif node_type == 'Literal':
            trace.route_type = Path('Literal')
        elif node_type == 'Identifier':
            trace.route_type = Path('Identifier')
        elif node_type == 'NewExpression':
            trace.route_type = Path('New Object')
        elif node_type == 'EmptyStatement':
            trace.route_type = Path("EmptyStatement")
        elif node_type == 'BreakStatement':
            trace.route_type = Path("BreakStatement")
        else:
            logger.error('Find Trace Error Type: {}'.format(node_type))
    else:
        trace.route_type = Path("None Type Path")
    return trace


def function_expression_exam(trace: Trace, function_expression: dict, param_set: set, page_data: PageData,
                             page_function_table: dict, need_new_param: bool,
                             arguments_position_list: list = None):
    trace.route_type = FunctionPath()
    if function_expression['id'] and 'name' in function_expression['id']:
        trace.route_type.function_name = function_expression['id']['name']
    else:
        trace.route_type.function_name = 'Anonymous Function'
    block_statement = function_expression['body']
    if need_new_param:
        # 如果是事件函数，那么肯定要分析参数列表
        new_param_set = utils.create_param_set(function_expression, arguments_position_list)
    else:
        # 否则压根不需要分析参数，只找敏感API即可
        new_param_set = set()
    trace.route_type.params.extend(new_param_set)
    if 'params' in function_expression and function_expression['params']:
        for param in function_expression['params']:
            suspicious_node_exam(trace, param, param_set, page_data, page_function_table)
    block_statement_exam(trace, block_statement, new_param_set, page_data, page_function_table)
    # block_statement_exam(trace, block_statement, param_set, page_data, page_function_table)

    # if new_param_set and len(new_param_set) > 0:
    #     block_statement_exam(trace, block_statement, new_param_set, page_data, page_function_table)
    # else:
    #     block_statement_exam(trace, block_statement, param_set, page_data, page_function_table)


def arrow_function_exam(trace: Trace, arrow_function_expression: dict, param_set: set, page_data: PageData,
                        page_function_table: dict, need_new_param: bool):
    trace.route_type = FunctionPath()
    if 'id' in arrow_function_expression and arrow_function_expression['id']:
        if 'name' in arrow_function_expression['id'] and arrow_function_expression['id']['name']:
            trace.route_type.function_name = arrow_function_expression['id']['name']
    else:
        trace.route_type.function_name = 'Arrow Function'
    if 'params' in arrow_function_expression and arrow_function_expression['params']:
        for param in arrow_function_expression['params']:
            suspicious_node_exam(trace, param, param_set, page_data, page_function_table)
    if need_new_param:
        new_param_set = utils.create_param_set(arrow_function_expression)
    else:
        new_param_set = param_set
    if 'body' in arrow_function_expression and arrow_function_expression['body']['type'] == 'BlockStatement':
        block_statement = arrow_function_expression['body']
        block_statement_exam(trace, block_statement, new_param_set, page_data, page_function_table)


def suspicious_node_exam(trace: Trace, suspicious_node: dict, param_set: set, page_data: PageData,
                         page_function_table: dict, variable_name=None, need_new_param: bool = True):
    node_type = suspicious_node['type']
    route_type = type(trace.route_type)
    if node_type == 'Identifier':
        variable_value = suspicious_node['name']
        if variable_value in param_set or page_data.contains(variable_value):
            trace.is_path = True
            if route_type == VariableDeclaratorPath or route_type == AssignPath:
                param_set.add(variable_name)
                trace.route_type.left = variable_name
                if 'this.data' in variable_name:
                    page_data.add(variable_name)
                trace.route_type.right = variable_value
            elif route_type == CallExpressionPath or route_type == FunctionPath:
                trace.route_type.params.append(variable_value)
            elif route_type == ConditionalExpressionPath:
                trace.route_type.conditional_list.append(variable_value)
            elif route_type == UnaryExpressionPath:
                trace.route_type.variable = variable_value
            else:
                logger.error('Error Route Type : {}'.format(route_type))
    elif node_type == 'MemberExpression':
        variable_value = utils.restore_ast_node(suspicious_node)
        if member_identifier_check(variable_value, param_set) \
                or page_data.contains(variable_value) or variable_value in source_api['object_api']:
            # param_set.add(variable_value)
            trace.is_path = True
            if route_type == VariableDeclaratorPath or route_type == AssignPath:
                param_set.add(variable_name)
                trace.route_type.left = variable_name
                if 'this.data' in variable_name:
                    page_data.add(variable_name)
                trace.route_type.right = variable_value
            elif route_type == CallExpressionPath or route_type == FunctionPath:
                trace.route_type.params.append(variable_value)
            elif route_type == ConditionalExpressionPath:
                trace.route_type.conditional_list.append(variable_value)
            elif route_type == UnaryExpressionPath:
                trace.route_type.variable = variable_value
            else:
                logger.error('Error Route Type : {}'.format(route_type))
    elif node_type == 'CallExpression':
        variable_value = get_call_function_name(suspicious_node)  # call_function_name
        if member_identifier_check(variable_value, param_set) \
                or page_data.contains(variable_value) or variable_value in source_api['object_api']:
            # param_set.add(variable_value)
            trace.is_path = True
            if route_type == VariableDeclaratorPath or route_type == AssignPath:
                param_set.add(variable_name)
                trace.route_type.left = variable_name
                if 'this.data' in variable_name:
                    page_data.add(variable_name)
                trace.route_type.right = variable_value
            elif route_type == CallExpressionPath or route_type == FunctionPath:
                trace.route_type.params.append(variable_value)
            elif route_type == ConditionalExpressionPath:
                trace.route_type.conditional_list.append(variable_value)
            elif route_type == UnaryExpressionPath:
                trace.route_type.variable = variable_value
            else:
                logger.error('Error Route Type : {}'.format(route_type))
        new_trace = find_trace(param_set, suspicious_node, page_data, page_function_table)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)
    elif node_type == 'BinaryExpression':
        if binary_expression_exam(trace, suspicious_node, param_set, page_data, page_function_table):
            trace.is_path = True
            variable_value = utils.restore_ast_node(suspicious_node)
            # param_set.add(variable_value)
            if route_type == VariableDeclaratorPath or route_type == AssignPath:
                param_set.add(variable_name)
                trace.route_type.left = variable_name
                if 'this.data' in variable_name:
                    page_data.add(variable_name)
                trace.route_type.right = variable_value
            elif route_type == CallExpressionPath or route_type == FunctionPath:
                trace.route_type.params.append(variable_value)
            elif route_type == ConditionalExpressionPath:
                trace.route_type.conditional_list.append(variable_value)
            elif route_type == UnaryExpressionPath:
                trace.route_type.variable = variable_value
            else:
                logger.error('Error Route Type : {}'.format(route_type))
    elif node_type == 'ThisExpression':
        if not page_data.is_empty():
            param_set.add(variable_name)
    else:
        new_trace = find_trace(param_set, suspicious_node, page_data, page_function_table,
                               need_new_param)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)


def function_arguments_check(arguments: list, param_set: set, page_data: PageData):
    position_list = list()
    for i, argument in enumerate(arguments):
        argument_type = argument['type']
        argument_value = None
        if argument_type == 'Identifier':
            argument_value = argument['name']
        elif argument_type == 'MemberExpression' or 'BinaryExpression' or 'ThisExpression':
            argument_value = utils.restore_ast_node(argument)
        elif argument_type == 'CallExpression':
            argument_value = get_call_function_name(argument)

        if argument_value:
            if argument_value in param_set or page_data.contains(argument_value) \
                    or member_identifier_check(argument_value, param_set):
                position_list.append(i)
    return position_list


def conditional_expression_exam(trace: Trace, conditional_expression: dict, param_set: set, page_data: PageData,
                                page_function_table: dict):
    trace.route_type = ConditionalExpressionPath()
    if 'consequent' in conditional_expression and conditional_expression['consequent']:
        suspicious_node_exam(trace, conditional_expression['consequent'], param_set, page_data, page_function_table)
    if 'alternate' in conditional_expression and conditional_expression['alternate']:
        suspicious_node_exam(trace, conditional_expression['alternate'], param_set, page_data, page_function_table)


# def member_expression_exam(trace: Trace, member_expression: dict, param_set: set, page_data: PageData,
#                            page_function_table: dict):
#     variable_value = utils.restore_ast_node(member_expression)

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

# def param_list_exam(trace: Trace, param_list: list,param_set: set):
#     for param in param_list:
#         if param['type'] == 'Identifier':
#             param_identifier = param['name']
#             if param_identifier in param_set:


def unary_expression_exam(trace: Trace, conditional_expression: dict, param_set: set, page_data: PageData,
                          page_function_table: dict):
    trace.route_type = UnaryExpressionPath()
    if 'operator' in conditional_expression:
        trace.route_type.operator = conditional_expression['operator']
    if 'argument' in conditional_expression and conditional_expression['argument']:
        suspicious_node_exam(trace, conditional_expression['argument'], param_set, page_data, page_function_table)


def variable_declaration_exam(trace: Trace, variable_declaration_node: dict, param_set: set, page_data: PageData,
                              page_function_table: dict):
    trace.route_type = VariableDeclarationsPath()
    if 'declarations' in variable_declaration_node:
        for declaration in variable_declaration_node['declarations']:
            next_trace = find_trace(param_set, declaration, page_data, declaration)
            # variable_declarator_exam(trace, declaration, param_set, page_data, page_function_table)
            if next_trace.is_path:
                trace.is_path = True
                trace.next.append(next_trace)


def variable_declarator_exam(trace: Trace, variable_declarator_node: dict, param_set: set, page_data: PageData,
                             page_function_table: dict):
    variable_id = variable_declarator_node['id']
    variable_id_type = variable_id['type']
    if variable_id_type == 'Identifier':
        variable_name = variable_id['name']
        variable_init = variable_declarator_node['init']
        trace.route_type = VariableDeclaratorPath()
        if variable_init and 'type' in variable_init:
            suspicious_node_exam(trace, variable_init, param_set, page_data, page_function_table, variable_name)
    elif variable_id_type == 'ObjectPattern':
        for prop in variable_id['properties']:
            variable_name = prop['key']['name']
            variable_init = variable_declarator_node['init']
            trace.route_type = VariableDeclaratorPath()
            if variable_init and 'type' in variable_init:
                suspicious_node_exam(trace, variable_init, param_set, page_data, page_function_table, variable_name)


def expression_statement_exam(trace: Trace, expression_statement: dict, param_set: set, page_data: PageData,
                              page_function_table: dict):
    if 'expression' in expression_statement:
        expression = expression_statement['expression']
        if expression and 'type' in expression:
            expression_type = expression['type']
            if expression_type == 'AssignmentExpression':
                assign_expression_analysis(trace, expression, param_set, page_data, page_function_table)
            elif expression_type == 'UpdateExpression':
                update_expression_exam(trace, expression, param_set, page_data)
            elif expression_type == 'ConditionalExpression':
                conditional_expression_exam(trace, expression, param_set, page_data, page_function_table)
            elif expression_type == 'AwaitExpression':
                await_expression_exam(trace, expression, param_set, page_data, page_function_table)
            elif expression_type == 'CallExpression':
                call_expression_exam(trace, expression, param_set, page_data, page_function_table)
            elif expression_type == 'SequenceExpression':
                sequence_expression_exam(trace, expression, param_set, page_data, page_function_table)
            elif expression_type == 'LogicalExpression':
                logical_expression_exam(trace, expression, param_set, page_data, page_function_table)
            elif expression_type == 'BinaryExpression':
                binary_expression_exam(trace, expression, param_set, page_data, page_function_table)
            else:
                new_trace = find_trace(param_set, expression, page_data, page_function_table)
                if new_trace.is_path:
                    trace.is_path = True
                    trace.next.append(new_trace)


def call_expression_exam(trace: Trace, call_expression: dict, param_set: set, page_data: PageData,
                         page_function_table: dict):
    callee = call_expression['callee']
    arguments = call_expression['arguments']
    call_function_name = utils.restore_ast_node(callee)
    if call_function_name:
        trace.route_type = CallExpressionPath()
        trace.route_type.callee = call_function_name
        # 提取回调函数
        call_back_functions = extract_call_back_function(arguments)
        # 然后分析其余参数
        for argument in arguments:
            suspicious_node_exam(trace, argument, param_set, page_data, page_function_table, need_new_param=False)
        # 如果是敏感API，那么开始分析回调函数
        if call_function_name in source_api['callback_api'] and call_back_functions and len(call_back_functions) > 0:
            for call_back_function in call_back_functions:
                # 不用在这里创建，因为在function那里还会创建一次
                # branch_param_set = utils.create_param_set(call_back_function)
                branch_trace = find_trace(param_set, call_back_function, page_data,
                                          page_function_table, True)
                if branch_trace.is_path:
                    trace.is_path = True
                    trace.next.append(branch_trace)
        # 如果是调用本页面中的其他函数
        if 'this' in call_function_name:
            # 首先分析是不是this.setData
            if call_function_name == 'this.setData':
                # 如果是，开始对传入其中的Object的对象进行分析，检查传入的参数中是否有敏感数据
                for argument in arguments:
                    if argument['type'] == 'ObjectExpression':
                        tmp_trace = Trace()
                        tmp_trace.route_type = ObjectExpressionPath()
                        obj_argument = object_expression_exam(tmp_trace, argument, param_set, page_data,
                                                              page_function_table)
                        for key in obj_argument.keys():
                            page_data.add('this.data.' + key)
            else:
                # 否则，提取函数名称，检查是否为其他成员函数的调用
                other_call = call_function_name.split('.')[1]
                if other_call in page_function_table:
                    # 如果是，开始提取其中的参数，看是否为敏感数据，如果是，构造参数位置列表，提取对应参数
                    arguments_position_list = function_arguments_check(arguments, param_set, page_data)
                    other_function = page_function_table[other_call]
                    other_trace = Trace()
                    function_expression_exam(other_trace, other_function, set(), page_data,
                                             page_function_table, True, arguments_position_list)
                    if other_trace.is_path:
                        trace.is_path = True
                        trace.next.append(other_trace)

        # if (trace.route_type.params is None or len(trace.route_type.params) == 0) and trace.is_path:
        #     trace.route_type.params = True


def get_call_function_name(call_expression: dict):
    if 'callee' in call_expression:
        return utils.restore_ast_node(call_expression['callee'])
    return None


def if_statement_exam(trace: Trace, if_statement: dict, param_set: set, page_data: PageData,
                      page_function_table: dict):
    if 'consequent' in if_statement:
        trace.route_type = Path('If Consequent')
        if if_statement['consequent'] and \
                'type' in if_statement['consequent']:
            if if_statement['consequent']['type'] == 'BlockStatement':
                block_statement = if_statement['consequent']
                block_statement_exam(trace, block_statement, param_set, page_data, page_function_table)
            if if_statement['consequent']['type'] == 'IfStatement':
                if_statement_exam(trace, if_statement['consequent'], param_set, page_data, page_function_table)
    if 'alternate' in if_statement:
        trace.route_type = Path('If Alternate')
        if if_statement['alternate'] and \
                'type' in if_statement['alternate']:
            if if_statement['alternate']['type'] == 'BlockStatement':
                block_statement = if_statement['alternate']
                block_statement_exam(trace, block_statement, param_set, page_data, page_function_table)
            if if_statement['alternate']['type'] == 'IfStatement':
                if_statement_exam(trace, if_statement['alternate'], param_set, page_data, page_function_table)


def block_statement_exam(trace: Trace, block_statement: dict, param_set: set, page_data: PageData,
                         page_function_table: dict):
    if 'body' in block_statement:
        for block_node in block_statement['body']:
            node_trace = find_trace(param_set, block_node, page_data, page_function_table)
            if node_trace.is_path:
                trace.is_path = True
                trace.next.append(node_trace)


def for_statement_exam(trace: Trace, for_statement: dict, param_set: set, page_data: PageData,
                       page_function_table: dict):
    trace.route_type = Path('For Loop')
    if 'body' in for_statement and for_statement['body']['type'] == 'BlockStatement':
        block_statement_exam(trace, for_statement['body'], param_set, page_data, page_function_table)


def while_statement_exam(trace: Trace, while_statement: dict, param_set: set, page_data: PageData,
                         page_function_table: dict):
    trace.route_type = Path('While Loop')
    if 'body' in while_statement and while_statement['body']['type'] == 'BlockStatement':
        block_statement_exam(trace, while_statement['body'], param_set, page_data, page_function_table)


def switch_statement_exam(trace: Trace, switch_statement: dict, param_set: set, page_data: PageData,
                          page_function_table: dict):
    for case_node in switch_statement['cases']:
        fake_block = {'body': []}
        for consequent in case_node['consequent']:
            fake_block['body'].append(consequent)
        block_statement_exam(trace, fake_block, param_set, page_data, page_function_table)


def assign_expression_analysis(trace: Trace, assign_expression: dict, param_set: set, page_data: PageData,
                               page_function_table: dict):
    trace.route_type = AssignPath()
    if 'left' in assign_expression and 'right' in assign_expression:
        left_type = assign_expression['left']['type']
        variable_name = None
        if left_type == 'Identifier':
            variable_name = assign_expression['left']['name']
        elif left_type == 'MemberExpression':
            variable_name = utils.restore_ast_node(assign_expression['left'])

        if variable_name:
            suspicious_node_exam(trace, assign_expression['right'], param_set, page_data,
                                 page_function_table, variable_name)


def update_expression_exam(trace: Trace, update_expression: dict, param_set: set, page_data: PageData):
    if 'argument' in update_expression and 'operator' in update_expression:
        if update_expression['argument'] and 'type' in update_expression['argument']:
            trace.route_type = UpdateExpressionPath()
            # variable_name = update_expression['argument']['name']
            update_operator = update_expression['operator']
            argument_type = update_expression['type']
            if argument_type == 'Identifier':
                argument_literal = update_expression['argument']['name']
                if argument_literal in param_set or page_data.contains(argument_literal):
                    trace.is_path = True
                    trace.route_type.identifier = argument_literal
            else:
                argument_literal = utils.restore_ast_node(update_expression['argument'])
                if member_identifier_check(argument_literal, param_set) \
                        or page_data.contains(argument_literal) or argument_literal in source_api['object_api']:
                    trace.is_path = True
                    trace.route_type.identifier = argument_literal
            trace.route_type.operate = update_operator


def await_expression_exam(trace: Trace, await_expression: dict, param_set: set, page_data: PageData,
                          page_function_table: dict):
    trace.route_type = AwaitExpressionPath()
    if 'argument' in await_expression:
        new_trace = find_trace(param_set, await_expression['argument'], page_data, page_function_table)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)


def sequence_expression_exam(trace: Trace, sequence_expression: dict, param_set: set, page_data: PageData,
                             page_function_table: dict):
    trace.route_type = SequenceExpressionPath()
    for expression in sequence_expression['expressions']:
        expression_statement = dict()
        expression_statement['type'] = 'ExpressionStatement'
        expression_statement['expression'] = expression
        new_trace = find_trace(param_set, expression, page_data, page_function_table)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)
        # expression_statement_exam(trace, expression_statement, param_set, page_data, page_function_table)


def logical_expression_exam(trace: Trace, logical_expression: dict, param_set: set, page_data: PageData,
                            page_function_table: dict):
    trace.route_type = LogicalExpressionPath()
    if 'left' in logical_expression:
        expression_statement = dict()
        expression_statement['type'] = 'ExpressionStatement'
        expression_statement['expression'] = logical_expression['left']
        new_trace = find_trace(param_set, expression_statement, page_data, page_function_table)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)

    if 'right' in logical_expression:
        expression_statement = dict()
        expression_statement['type'] = 'ExpressionStatement'
        expression_statement['expression'] = logical_expression['right']
        new_trace = find_trace(param_set, expression_statement, page_data, page_function_table)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)


def binary_expression_exam(trace: Trace, binary_expression: dict, param_set: set, page_data: PageData,
                           page_function_table: dict):
    if binary_expression['type'] == 'Literal':
        return False
    elif binary_expression['type'] == 'Identifier':
        value_name = binary_expression['name']
        return value_name in param_set or page_data.contains(value_name)
    elif binary_expression['type'] == 'MemberExpression':
        value_name = utils.restore_ast_node(binary_expression)
        return member_identifier_check(value_name, param_set) \
               or page_data.contains(value_name) \
               or value_name in source_api['object_api']
    elif binary_expression['type'] == 'CallExpression':
        call_expression = binary_expression
        call_function_name = get_call_function_name(call_expression)
        new_trace = find_trace(param_set, call_expression, page_data, page_function_table)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)
        return member_identifier_check(call_function_name, param_set) \
               or page_data.contains(call_function_name) \
               or call_function_name in source_api['object_api']
    elif binary_expression['type'] == 'BinaryExpression':
        return binary_expression_exam(trace, binary_expression['left'], param_set, page_data, page_function_table) \
               or binary_expression_exam(trace, binary_expression['right'], param_set, page_data, page_function_table)
    elif binary_expression['type'] == 'UnaryExpression':
        unary_expression_exam(trace, binary_expression, param_set, page_data, page_function_table)
    else:
        logger.error('Binary Expression Type Error: {}'.format(binary_expression['type']))
        return False


def return_expression_exam(trace: Trace, return_expression: dict, param_set: set, page_data: PageData,
                           page_function_table: dict):
    trace.route_type = ReturnExpressionPath()
    if 'argument' in return_expression and return_expression['argument']:
        new_trace = find_trace(param_set, return_expression['argument'], page_data, page_function_table)
        if new_trace.is_path:
            trace.is_path = True
            trace.next.append(new_trace)


def object_expression_exam(trace: Trace, obj_expression: dict, param_set: set, page_data: PageData,
                           page_function_table: dict):
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
                if member_identifier_check(variable_value, param_set) \
                        or page_data.contains(variable_value) \
                        or variable_value in source_api['object_api']:
                    trace.is_path = True
                    trace.route_type.key = i
                    trace.route_type.value = variable_value
                    param_set.add(variable_value)
            elif node_type == 'CallExpression':
                variable_value = get_call_function_name(element)  # call_function_name
                li.append(variable_value)
                if member_identifier_check(variable_value, param_set) \
                        or page_data.contains(variable_value) \
                        or variable_value in source_api['object_api']:
                    trace.is_path = True
                    trace.route_type.key = i
                    trace.route_type.value = variable_value
                    param_set.add(variable_value)
                new_trace = find_trace(param_set, element, page_data, page_function_table)
                if new_trace.is_path:
                    trace.is_path = True
                    trace.next.append(new_trace)
            elif node_type == 'BinaryExpression':
                if binary_expression_exam(trace, element, param_set, page_data, page_function_table):
                    trace.is_path = True
                    variable_value = utils.restore_ast_node(element)
                    param_set.add(variable_value)
                    li.append(variable_value)
                    trace.is_path = True
                    trace.route_type.key = i
                    trace.route_type.value = variable_value
            elif node_type == 'ObjectExpression' or node_type == 'ArrayExpression':
                li.append(object_expression_exam(trace, element, param_set, page_data, page_function_table))
            else:
                new_trace = find_trace(param_set, element, page_data, page_function_table)
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
                    if variable_value in param_set \
                            or page_data.contains(variable_value):
                        trace.is_path = True
                        trace.route_type.param_map[key] = variable_value
                        param_set.add(variable_value)
                elif node_type == 'MemberExpression':
                    variable_value = utils.restore_ast_node(prop['value'])
                    ret[key] = variable_value
                    if member_identifier_check(variable_value, param_set) \
                            or page_data.contains(variable_value) \
                            or variable_value in source_api['object_api']:
                        trace.is_path = True
                        trace.route_type.param_map[key] = variable_value
                        param_set.add(variable_value)
                elif node_type == 'CallExpression':
                    variable_value = get_call_function_name(prop['value'])  # call_function_name
                    ret[key] = variable_value
                    if member_identifier_check(variable_value, param_set) \
                            or page_data.contains(variable_value) \
                            or variable_value in source_api['object_api']:
                        trace.is_path = True
                        trace.route_type.param_map[key] = variable_value
                        param_set.add(variable_value)
                    new_trace = find_trace(param_set, prop['value'], page_data, page_function_table)
                    if new_trace.is_path:
                        trace.is_path = True
                        trace.next.append(new_trace)
                elif node_type == 'BinaryExpression':
                    if binary_expression_exam(trace, prop['value'], param_set, page_data, page_function_table):
                        trace.is_path = True
                        variable_value = utils.restore_ast_node(prop['value'])
                        ret[key] = variable_value
                        trace.is_path = True
                        trace.route_type.param_map[key] = variable_value
                        param_set.add(variable_value)
                elif node_type == 'ArrayExpression' or node_type == 'ObjectExpression':
                    ret[key] = object_expression_exam(trace, prop['value'], param_set, page_data, page_function_table)
                else:
                    new_trace = find_trace(param_set, prop['value'], page_data, page_function_table)
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


def extract_call_back_function(arguments: list):
    call_back_functions = list()
    for argument in arguments:
        if argument['type'] == 'ObjectExpression':
            if 'properties' in argument:
                properties = argument['properties']
                for prop in properties[:]:
                    if 'key' in prop and prop['key'] \
                            and 'type' in prop['key'] and prop['key']['type'] == 'Identifier':
                        call_back_function_name = prop['key']['name']
                        prop_value = prop['value']
                        if 'type' in prop_value and \
                                (prop_value['type'] == 'FunctionExpression'
                                 or prop_value['type'] == 'ArrowFunctionExpression'):
                            prop_value['id'] = dict()
                            prop_value['id']['name'] = call_back_function_name
                            call_back_functions.append(prop_value)
                            properties.remove(prop)
    return call_back_functions
