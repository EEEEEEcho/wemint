from src.path.trace import Trace
from graphviz import Digraph
from loguru import logger
import json

t = "{'route_type': {'description': 'FunctionCall', 'function_name': 'login', 'param': None}, 'is_path': True, " \
    "'next': [{'route_type': {'description': 'If Alternate'}, 'is_path': True, 'next': [{'route_type': {" \
    "'description': 'VariableDeclarator', 'left': 'phoneNumber', 'right': 'this.data.phoneNumber'}, 'is_path': True, " \
    "'next': []}, {'route_type': {'description': 'VariableDeclarator', 'left': 'password', " \
    "'right': 'this.data.password'}, 'is_path': True, 'next': []}, {'route_type': {'description': 'AwaitExpression'}, " \
    "'is_path': True, 'next': [{'route_type': {'description': 'CallExpression', 'callee': 'utils.Http.asyncRequest', " \
    "'params': True}, 'is_path': True, 'next': [{'route_type': {'description': 'ObjectExpression', 'param_map': {" \
    "'phoneNumber': 'phoneNumber', 'password': 'password'}}, 'is_path': True, 'next': []}]}]}]}]} "
trace_json = eval(t)


def paint_trace(trace: Trace, xml_path: str, page_name: str, function_name: str):
    # logger.info(trace)
    # digraph = Digraph(comment=page_name + ' Data Flow')
    digraph = Digraph(comment=page_name + ' ' + function_name + ' Data Flow')
    dfs(trace, digraph)
    # digraph.render('./test.gv', view=True)
    digraph.render(xml_path.split('.wxml')[0] + '-' + function_name + '-dataflow', view=False)


def dfs(trace: Trace, digraph: Digraph):
    logger.info(trace)
    if trace.is_path:
        digraph.node(name=trace.route_type.get_description(), label=trace.route_type.get_description(),
                     color='blue')
        if trace.next:
            for next_trace in trace.next:
                dfs(next_trace, digraph)
                digraph.edge(trace.route_type.get_description(), next_trace.route_type.get_description())

# paint_trace(trace_json, 'HHHHH')
# digraph = Digraph(comment=' Data Flow')
# digraph.node(name="{'description': 'FunctionCall', 'function_name': 'login', 'param': None}",
#              label="{'description': 'FunctionCall', 'function_name': 'login', 'param': None}",
#              shape='rectangle',
#              color='blue')
# digraph.render('./test.gv', view=True)
