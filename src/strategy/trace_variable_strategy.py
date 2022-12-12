from src.path.trace import Trace
from src.path.path import *
from loguru import logger
import src.utils.utils as utils


def find_trace(param_set: set, node: dict):
    trace = Trace()
    node_type = node['type']
    if node_type == 'FunctionExpression':
        function_expression_exam(trace, node, param_set)
    elif node_type == 'VariableDeclaration':
        variable_declaration_exam(trace, node, param_set)
    elif node_type == 'IfStatement':
        if_statement_exam(trace, node, param_set)
    elif node_type == 'ForStatement':
        for_statement_exam(trace, node, param_set)
    elif node_type == 'WhileStatement':
        while_statement_exam(trace, node, param_set)
    elif node_type == 'SwitchStatement':
        switch_statement_exam(trace, node, param_set)
    elif node_type == 'ExpressionStatement':
        expression_statement_exam(trace, node, param_set)
    elif node_type == 'CallExpression':
        call_expression_exam(trace, node, param_set)
    return trace


def function_expression_exam(trace: Trace, function_expression: dict, param_set: set):
    trace.route_type = FunctionPath()
    trace.route_type.function_name = function_expression['id']
    block_statement = function_expression['body']
    if 'params' in function_expression and function_expression['params']:
        for param in function_expression['params']:
            if param['type'] == 'Identifier':
                param_identifier = param['name']
                if param_identifier in param_set:
                    trace.route_type.param = param_identifier
                    trace.is_path = True
            elif param['type'] == 'MemberExpression':
                param_identifier = utils.restore_ast_node(param)
                if member_identifier_check(param_identifier, param_set):
                    trace.route_type.param = param_identifier
                    trace.is_path = True
                    param_set.add(param_identifier)
            elif param['type'] == 'CallExpression':
                call_function_name = get_call_function_name(param)
                if member_identifier_check(call_function_name, param_set):
                    trace.is_path = True
                    param_set.add(call_function_name)
                    trace.route_type.param = call_function_name
    block_statement_exam(trace, block_statement, param_set)


def variable_declaration_exam(trace: Trace, variable_declaration_node: dict, param_set: set):
    if 'declarations' in variable_declaration_node:
        trace.route_type = VariableDeclarationPath()
        for declaration in variable_declaration_node['declarations']:
            new_trace = Trace()
            variable_declarator_exam(new_trace, declaration, param_set)
            if new_trace.is_path:
                trace.is_path = True
                trace.next.append(new_trace)


def variable_declarator_exam(trace: Trace, variable_declarator_node: dict, param_set: set):
    variable_name = variable_declarator_node['id']['name']
    variable_init = variable_declarator_node['init']
    trace.route_type = VariableDeclaratorPath()
    if variable_init and 'type' in variable_init:
        init_type = variable_init['type']
        if init_type == 'Identifier':
            right_value = variable_init['name']
            if right_value and right_value in param_set:
                param_set.add(variable_name)
                trace.is_path = True
                trace.route_type.left = variable_name
                trace.route_type.right = right_value
        elif init_type == 'MemberExpression':
            right_value = utils.restore_ast_node(variable_init)
            if member_identifier_check(right_value, param_set):
                if variable_name:
                    param_set.add(variable_name)
                    trace.is_path = True
                    trace.route_type.left = variable_name
                    trace.route_type.right = right_value
        elif init_type == 'CallExpression':
            call_expression = variable_init
            call_function_name = get_call_function_name(call_expression)
            if member_identifier_check(call_function_name, param_set):
                call_expression_code = utils.restore_ast_node(call_expression)
                if variable_name:
                    param_set.add(variable_name)
                    trace.is_path = True
                    trace.route_type.left = variable_name
                    trace.route_type.right = call_expression_code
            else:
                new_trace = find_trace(param_set, variable_init)
                if new_trace.is_path:
                    trace.is_path = True
                    trace.next.append(new_trace)


def expression_statement_exam(trace: Trace, expression_statement: dict, param_set: set):
    if 'expression' in expression_statement:
        expression = expression_statement['expression']
        if expression and 'type' in expression:
            expression_type = expression['type']
            if expression_type == 'AssignmentExpression':
                assign_expression_analysis(trace, expression, param_set)
            elif expression_type == 'UpdateExpression':
                pass
            elif expression_type == 'ConditionalExpression':
                pass
            elif expression_type == 'AwaitExpression':
                pass
            elif expression_type == 'CallExpression':
                pass
            elif expression_type == 'SequenceExpression':
                pass
            elif expression_type == 'LogicalExpression':
                pass


def call_expression_exam(trace: Trace, call_expression: dict, param_set: set):
    callee = call_expression['callee']
    arguments = call_expression['arguments']
    call_function_name = utils.restore_ast_node(callee)

    if call_function_name and member_identifier_check(call_function_name, param_set):
        trace.route_type = 'Call Function'
        # for argument in arguments:
        #     if argument['type'] == 'Literal':
        #         literal_value = argument['value']
        #         mini_program.secret_leak_checker.check_literal(literal_value)
        #         mini_program.backend_checker.add_param(literal_value)
        #     elif argument['type'] == 'TemplateLiteral':
        #         template_literal_analysis(argument, context, mini_program)
        #     elif argument['type'] == 'ObjectExpression' or argument['type'] == 'ArrayExpression':
        #         object_value = object_node_analysis(argument, context, mini_program)
        #         mini_program.secret_leak_checker.check_object(object_value)
        #     elif argument['type'] == 'BinaryExpression':
        #         object_value = binary_expression_analysis(argument, context)
        #         mini_program.secret_leak_checker.check_literal(object_value)
        #         mini_program.backend_checker.add_param(object_value)
        #     elif argument['type'] == 'ArrowFunctionExpression':
        #         arrow_function_analysis(argument, context, mini_program)
        #     elif argument['type'] == 'CallExpression':
        #         call_expression_analysis(argument, context, mini_program)
        #     elif argument['type'] == 'FunctionExpression':
        #         function_declaration_analysis(argument, context, mini_program)
        #     elif argument['type'] == 'ArrowFunctionExpression':
        #         arrow_function_analysis(argument, context, mini_program)
        #     else:
        #         continue


def get_call_function_name(call_expression: dict):
    if 'callee' in call_expression:
        return utils.restore_ast_node(call_expression['callee'])
    return None


def if_statement_exam(trace: Trace, if_statement: dict, param_set: set):
    if 'consequent' in if_statement:
        trace.route_type = 'If Consequent'
        if if_statement['consequent'] and \
                'type' in if_statement['consequent']:
            if if_statement['consequent']['type'] == 'BlockStatement':
                block_statement = if_statement['consequent']
                block_statement_exam(trace, block_statement, param_set)
            if if_statement['consequent']['type'] == 'IfStatement':
                if_statement_exam(trace, if_statement['consequent'], param_set)
    if 'alternate' in if_statement:
        trace.route_type = 'If Alternate'
        if if_statement['alternate'] and \
                'type' in if_statement['alternate']:
            if if_statement['alternate']['type'] == 'BlockStatement':
                block_statement = if_statement['consequent']
                block_statement_exam(trace, block_statement, param_set)
            if if_statement['alternate']['type'] == 'IfStatement':
                if_statement_exam(trace, if_statement['consequent'], param_set)


def block_statement_exam(trace: Trace, block_statement: dict, param_set: set):
    if 'body' in block_statement:
        for block_node in block_statement['body']:
            node_trace = find_trace(param_set, block_node)
            if node_trace.is_path:
                trace.is_path = True
                trace.next.append(node_trace)

    # for node in block_statement['body']:
    #     node_type = node['type']
    #     if node_type == 'VariableDeclaration':
    #         for variable_declarator in node['declarations']:
    #             variable_declarator_exam(trace, variable_declarator, param_set)
    #     elif node_type == 'IfStatement':
    #         if_statement_analysis(node, context, mini_program)
    #     elif node_type == 'ForStatement':
    #         for_statement_analysis(node, context, mini_program)
    #     elif node_type == 'WhileStatement':
    #         while_statement_analysis(node, context, mini_program)
    #     elif node_type == 'FunctionDeclaration':
    #         function_declaration_analysis(node, context, mini_program)
    #     elif node_type == 'SwitchStatement':
    #         switch_statement_analysis(node, context, mini_program)
    #     elif node_type == 'ExpressionStatement':
    #         expression_statement_analysis(node, context, mini_program)
    #     elif node_type == 'ReturnStatement':
    #         return_statement_analysis(node, context, mini_program)
    #     else:
    #         continue


def for_statement_exam(trace: Trace, for_statement: dict, param_set: set):
    trace.route_type = 'For Loop'
    if 'body' in for_statement and for_statement['body']['type'] == 'BlockStatement':
        block_statement_exam(trace, for_statement['body'], param_set)


def while_statement_exam(trace: Trace, while_statement: dict, param_set: set):
    trace.route_type = 'While Loop'
    if 'body' in while_statement and while_statement['body']['type'] == 'BlockStatement':
        block_statement_exam(trace, while_statement['body'], param_set)


def switch_statement_exam(trace: Trace, switch_statement: dict, param_set: set):
    for case_node in switch_statement['cases']:
        fake_block = {'body': []}
        for consequent in case_node['consequent']:
            fake_block['body'].append(consequent)
        block_statement_exam(trace, fake_block, param_set)


def assign_expression_analysis(trace: Trace, assign_expression: dict, param_set: set):
    trace.route_type = AssignPath()
    if 'left' in assign_expression and 'right' in assign_expression:
        left_type = assign_expression['left']['type']
        variable_name = None
        if left_type == 'Identifier':
            variable_name = assign_expression['left']['name']
        elif left_type == 'MemberExpression':
            variable_name = utils.restore_ast_node(assign_expression['left'])

        right_type = assign_expression['right']['type']
        if right_type == 'CallExpression':
            call_expression = assign_expression['right']
            call_function_name = get_call_function_name(call_expression)
            if member_identifier_check(call_function_name, param_set):
                call_expression_code = utils.restore_ast_node(call_expression)
                if variable_name:
                    param_set.add(variable_name)
                    trace.is_path = True
                    trace.route_type.left = variable_name
                    trace.route_type.right = call_expression_code
            else:
                new_trace = find_trace(param_set, assign_expression['right'])
                if new_trace.is_path:
                    trace.is_path = True
                    trace.next.append(new_trace)
        elif right_type == 'Identifier':
            right_name = assign_expression['right']['name']
            if member_identifier_check(right_name, param_set):
                if variable_name:
                    param_set.add(variable_name)
                    trace.is_path = True
                    trace.route_type.left = variable_name
                    trace.route_type.right = right_name
        elif right_type == 'MemberExpression':
            right_name = utils.restore_ast_node(assign_expression['right'])
            if member_identifier_check(right_name, param_set):
                if variable_name:
                    param_set.add(variable_name)
                    trace.is_path = True
                    trace.route_type.left = variable_name
                    trace.route_type.right = right_name
        else:
            logger.error('AssignExpression Type: {}'.format(right_type))


def member_identifier_check(member_identifier: str, param_set: set):
    for param in param_set:
        if param and type(param) is str:
            if member_identifier and type(member_identifier) is str:
                if member_identifier.startswith(param):
                    return True
    return False


def member_expression_str(member_expression: dict):
    pass


class Node:

    def __init__(self, content):
        self.content = content
        self.left = None
        self.right = None


root = Node("root")
left_node = Node("left")
right_node = Node("right")
left_left_node = Node("left_left")
left_right_node = Node("left_right")
right_left_node = Node("right_left")
right_right_node = Node("right_right")
right_right_left_node = Node("right_right_left")
right_right_right_node = Node("right_right_right")

root.left = left_node
root.right = right_node

left_node.left = left_left_node
left_node.right = left_right_node

right_node.left = right_left_node
right_node.right = right_right_node

right_right_node.left = right_right_left_node
right_right_node.right = right_right_right_node


def walk(root: Node):
    new_trace = Trace()
    new_trace.trace_info = root.content
    if root.content == 'right_right_right' or root.content == 'right':
        new_trace.is_sink = True
    if root.left:
        left_trace = walk(root.left)
        if left_trace.is_sink:
            new_trace.is_sink = True
            new_trace.next.append(left_trace)
    if root.right:
        right_trace = walk(root.right)
        if right_trace.is_sink:
            new_trace.is_sink = True
            new_trace.next.append(right_trace)
    return new_trace

# walk_trace = walk(root)
# logger.info(walk_trace)
