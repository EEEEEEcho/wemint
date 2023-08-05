from path.trace import Trace
from graphviz import Digraph


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
    digraph = Digraph(comment=page_name + ' ' + function_name + ' Data Flow')
    dfs(trace, digraph)
    digraph.render(xml_path.split('.wxml')[0] + '-' + function_name + '-dataflow', view=False)


def dfs(trace: Trace, digraph: Digraph):
    if trace.is_path and trace.route_type:
        digraph.node(name=trace.id, label=trace.route_type.get_description(),
                     color='blue')
        if trace.next:
            for next_trace in trace.next:
                dfs(next_trace, digraph)
                digraph.edge(trace.id, next_trace.id)
