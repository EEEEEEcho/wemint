import collections
import random
from loguru import logger
import src.config as config
import os
import subprocess
import json
import re

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