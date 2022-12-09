from src.pojo.trace import Trace
from loguru import logger
import src.strategy.common_node_strategy as cns


def find_trace(param_set: set, node: dict):
    trace = Trace()
    node_type = node['type']
    if node_type == 'FunctionExpression':
        function_expression_exam(trace, node, param_set)
    elif node_type == 'VariableDeclaration':
        variable_declaration_exam(trace, node, param_set)
    elif node_type == 'IfStatement':
        pass
    return trace
    # q = list()
    # q.append(function_node)
    # param_name_set = set()
    # param_name_set.add(param_name)
    #
    # while len(q) > 0:
    #     node = q.pop(0)
    #     node_type = node['type']
    #     if node_type == 'FunctionExpression':
    #         function_expression_exam(q, trace, node, param_name_set)
    #     elif node_type == 'VariableDeclaration':
    #         variable_declaration_exam(trace, node, param_name_set)
    #     elif node_type == 'ExpressionStatement':
    #         expression_statement_exam(q, trace, node, param_name_set)
    #     elif node_type == 'IfStatement':
    #         pass
    #
    # logger.info(trace)


def function_expression_exam(trace: Trace, function_expression: dict, param_set: set):
    trace.route_type = 'Function Param'
    trace.trace_info = function_expression['id']
    block_statement = function_expression['body']
    if 'params' in function_expression and function_expression['params']:
        for param in function_expression['params']:
            if param['type'] == 'Identifier':
                param_identifier = param['name']
                if param_identifier in param_set:
                    trace.is_path = True
            elif param['type'] == 'MemberExpression':
                param_identifier = cns.member_expression_analysis(param)
                if param_identifier in param_set:
                    trace.is_path = True
    if 'body' in block_statement:
        for block_node in block_statement['body']:
            node_trace = find_trace(param_set, block_node)
            if node_trace.is_path:
                trace.is_path = True
                trace.next.append(node_trace)


def variable_declaration_exam(trace: Trace, variable_declaration_node: dict, param_set: set):
    if 'declarations' in variable_declaration_node:
        for declaration in variable_declaration_node['declarations']:
            variable_name = declaration['id']['name']
            variable_init = declaration['init']
            if variable_init and 'type' in variable_init:
                init_type = variable_init['type']
                right_value = None
                if init_type == 'Identifier':
                    right_value = variable_init['name']
                elif init_type == 'MemberExpression':
                    right_value = cns.member_expression_analysis(variable_init)
                if right_value in param_set:
                    trace.route_type = "Assign"
                    trace.trace_info = variable_name
                    param_set.add(variable_name)
                    trace.is_path = True


def variable_declarator_exam(trace: Trace, variable_declarator_node: dict, param_set: set):
    variable_name = variable_declarator_node['id']['name']
    variable_init = variable_declarator_node['init']
    if variable_init and 'type' in variable_init:
        init_type = variable_init['type']
        right_value = None
        if init_type == 'Identifier':
            right_value = variable_init['name']
        elif init_type == 'MemberExpression':
            right_value = cns.member_expression_analysis(variable_init)

        if right_value in param_set:
            next_trace = Trace()
            next_trace.route_type = "Assign"
            next_trace.trace_info = variable_name
            param_set.add(variable_name)
            trace.next.append(next_trace)

    # if 'body' in block_statement and block_statement['body']:
    #     q = list()
    #     q.append(block_statement)
    #     while len(q) > 0:
    #         node = q.re
    #     block_body = block_statement['body']
    #     if len(block_body) > 0:
    #         q = list()
    #         q.append(block_body[0])
    #
    #         for node in block_body:


def expression_statement_exam(bfs_queue: list, trace: Trace, expression_statement: dict, param_name_set: set):
    if 'expression' in expression_statement:
        expression = expression_statement['expression']
        if expression and 'type' in expression:
            expression_type = expression['type']
            if expression_type == 'AssignmentExpression':
                pass
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


def call_expression_exam(bsf_queue: list, trace: Trace, call_expression: dict, param_name_set: set):
    pass


def if_statement_exam(bsf_queue: list, trace: Trace, if_statement: dict, param_name_set: set):
    if 'consequent' in if_statement:
        if if_statement['consequent'] and \
                'type' in if_statement['consequent']:
            if if_statement['consequent']['type'] == 'BlockStatement':
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
