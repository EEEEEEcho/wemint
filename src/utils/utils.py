from loguru import logger
import config as config
import os
import subprocess
import json
import re
import copy

request_methods = {'request'}
navigation_methods = {
    'switchTab', 'reLaunch', 'redirectTo', 'navigateTo', 'navigateBack',  # 路由
    'openEmbeddedMiniProgram', 'navigateToMiniProgram', 'navigateBackMiniProgram', 'exitMiniProgram',  # 跳转
    'updateShareMenu', 'showShareMenu', 'showShareImageMenu', 'shareVideoMessage', 'shareFileMessage',  # 转发
    'onCopyUrl', 'offCopyUrl', 'hideShareMenu', 'getShareInfo', 'authPrivateMessage'
}


def generate_ast(file_path):
    if not os.path.exists(file_path):
        logger.error('Error! {} not exist'.format(file_path))
        return None
    js_util_path = config.PROJECT_ABSOLUTE_PATH + '/js_utils/get-ast.js'
    command = 'node {} {}'.format(js_util_path, file_path)
    execute_cmd(command)
    ast_path = file_path.split('.js')[0] + '-ast.json'
    if not os.path.exists(ast_path):
        logger.error('AST {} is not exist'.format(ast_path))
        return None
    else:
        try:
            with open(ast_path, 'r', encoding="utf-8") as f:
                json_file = json.loads(f.read())
                return json_file
        except Exception as e:
            logger.error('AST {} parse error'.format(ast_path))
            logger.error(e)
            return None


def execute_cmd(command):
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    stdout, stderr = process.communicate()
    code = process.returncode
    out_str = None
    if stdout is not None:
        out_str = stdout.decode('utf-8')
    return code == 0, out_str


def get_brother_path(now_path: str, other_path: str):
    base_path = os.path.dirname(now_path)
    while other_path.startswith('../') or other_path.startswith('./'):
        if other_path.startswith('./'):
            other_path = other_path.replace('./', '', 1)
        elif other_path.startswith('../'):
            other_path = other_path.replace('../', '', 1)
            base_path = os.path.dirname(base_path)
    if other_path.startswith('/'):
        other_path.replace('/', '', 1)
    if other_path.endswith('.js'):
        other_path = other_path.split(".js")[0]
    return base_path + '/' + other_path + '.js'


def recast_type(variable):
    if variable is None:
        return None
    try:
        variable = int(variable)
    except (ValueError, TypeError) as e:
        try:
            variable = float(variable)
        except (ValueError, TypeError) as e:
            return variable
    return variable


def calculate_value(left_value, ops, right_value):
    if left_value is None:
        return recast_type(right_value)
    if right_value is None:
        return recast_type(left_value)

    if type(left_value) == str and type(right_value) == str:
        if ops == '+':
            return left_value + right_value
    else:
        if type(left_value) == str:
            left_value = "'" + left_value + "'"
        if type(right_value) == str:
            right_value = "'" + right_value + "'"

        expression = '"' + str(left_value) + ' ' + ops + ' ' + str(right_value) + '"'
        js_util_path = config.PROJECT_ABSOLUTE_PATH + '/js_utils/eval_util.js'
        _, ans = execute_cmd('node {} {}'.format(js_util_path, expression))
        res = ans.split("\n")
        variable_value = res[0]
        variable_type = res[1]
        if variable_type == 'number':
            return recast_type(variable_value)
        elif variable_type == 'string':
            return str(variable_value)
        return None


def execute_assign_operate(pre_value, operator, update_value):
    if operator == "=":
        return update_value
    if operator == "+=":
        return calculate_value(pre_value, "+", update_value)
    if operator == "-=":
        return calculate_value(pre_value, "-", update_value)
    if operator == "*=":
        return calculate_value(pre_value, "*", update_value)
    if operator == "/=":
        return calculate_value(pre_value, "/", update_value)
    if operator == "^=":
        return calculate_value(pre_value, "^", update_value)
    if operator == "&=":
        return calculate_value(pre_value, "&", update_value)
    if operator == "|=":
        return calculate_value(pre_value, "|", update_value)


def re_write_json(json_path: str, error_str: str):
    match = re.search(".*line (\\d+).*", error_str)
    line_num = -1
    try:
        if match:
            line_num = int(match.group(1)) - 1
        if line_num > 0:
            with open(json_path, 'r+', encoding='utf-8') as f:
                f_list = f.readlines()
            logger.info(f_list[line_num])
            f_list[line_num] = f_list[line_num].replace("}", ",", 1)
            logger.info(f_list[line_num])
            with open(json_path, 'w+', encoding='utf-8') as f:
                f.writelines(f_list)
            logger.info("{} rewrite success".format(json_path))
            return True
    except Exception as e:
        logger.error(e)
        logger.info("{} rewrite fail".format(json_path))
        return False


def restore_ast_node(ast_node: dict):
    js_util_path = config.PROJECT_ABSOLUTE_PATH + "/js_utils/restore-ast.js"
    tmp_node_path = config.TMP_NODE_PATH
    with open(tmp_node_path, 'w') as f:
        f.write(json.dumps(ast_node))
    command = 'node {} {}'.format(js_util_path, tmp_node_path)
    _, code_str = execute_cmd(command)
    if code_str != "Error":
        return code_str.strip()
    return None


def create_param_set(function_node: dict, argument_position_list: list = None):
    param_set = set()
    if argument_position_list is not None:
        if function_node['params'] and len(function_node['params']) > 0:
            params = copy.deepcopy(function_node['params'])
            for position in argument_position_list:
                param = params[position]
                if param['type'] == 'Identifier':
                    param_set.add(param['name'])
                    param_set.add(param['name'] + '.')
                    # del function_node['params'][position]
            function_node['params'] = list(filter(lambda i: function_node['params'].index(i)
                                                            not in argument_position_list, function_node['params']))
    else:
        function_node_params = function_node['params']
        for param in function_node_params[:]:
            if param['type'] == 'Identifier':
                param_set.add(param['name'])
                param_set.add(param['name'] + '.')
                function_node_params.remove(param)
    return param_set


def dump_json(source_path, obj):
    result_dict = json.dumps(obj.to_dict())
    with open(source_path + os.sep + 'check_report.json', 'w') as f:
        json.dump(result_dict, f)
