import os
import utils.utils as utils
import utils.analysed_file as af
from pojo.miniprogram import MiniProgram
from pojo.scope_enum import Scope


def add_brother_to_context(context, mini_program: MiniProgram):
    brother_path = mini_program.path + os.sep + 'app.js'
    tmp_context = context
    while tmp_context.father:
        tmp_context = tmp_context.father
    if 'getApp' in tmp_context.brother_table:
        return
    else:
        if not af.contains(brother_path):
            import file_layer.taint_analyzer as ja
            file_context = ja.analysis(brother_path, mini_program)
            af.set_context(brother_path, file_context)
        tmp_context.brother_table.update({'getApp': af.get_context(brother_path)})


def find_context(variable_name: str, context):
    tmp_context = context
    variable_value = None
    while tmp_context:
        if variable_name not in tmp_context.const_variable_table:
            tmp_context = tmp_context.father
        else:
            variable_value = tmp_context.const_variable_table[variable_name]
            break
    return utils.recast_type(variable_value)


def find_bother(variable_name: str, context):
    if context.scope == Scope.FILE and variable_name in context.brother_table:
        if context.brother_table[variable_name] is not None:
            return context.brother_table[variable_name].const_variable_table
    if (context.scope == Scope.FILE_FUNCTION or context.scope == Scope.OBJECT) \
            and variable_name in context.father.brother_table:
        if context.father.brother_table[variable_name] is not None:
            return context.father.brother_table[variable_name].const_variable_table
    if context.scope == Scope.OBJECT_FUNCTION and variable_name in context.father.father.brother_table:
        if context.father.father.brother_table[variable_name] is not None:
            return context.father.father.brother_table[variable_name].const_variable_table
    return None


def search_identifier(variable_name: str, context):
    if variable_name is None:
        return None

    if '.' in variable_name:
        variable_list = variable_name.split('.')
        variable_value = None
        value_table = find_context(variable_list[0], context)
        if value_table is not None:
            variable_value = analysis_identifier(variable_list,value_table)
        value_table = find_bother(variable_list[0], context)
        if value_table is not None and type(value_table) is dict:
            variable_value = analysis_identifier(variable_list,value_table)
        return variable_value
    else:
        variable_value = find_context(variable_name, context)
        if variable_value is not None:
            return variable_value
        variable_value = find_bother(variable_name, context)
        if variable_value is not None:
            return variable_value
        return None


def get_value_from_dict(variable_list: list, value_table: dict):
    variable_value = None
    for i in range(1, len(variable_list)):
        if variable_list[i] in value_table:
            variable_value = value_table[variable_list[i]]
            if variable_value is None:
                return None
            value_table = variable_value
        else:
            break
    return variable_value


def analysis_identifier(variable_list: list, value_table):
    variable_value = None
    for i in range(1, len(variable_list)):
        if type(value_table) is dict and variable_list[i] in value_table:
            variable_value = value_table[variable_list[i]]
            if variable_value is None:
                return None
            value_table = variable_value
        elif type(value_table) is list:
            if type(variable_list[i]) is int and int(variable_list[i]) < len(value_table):
                variable_value = value_table[int(variable_list[i])]
                if variable_value is None:
                    return None
                value_table = variable_value
        else:
            break
    return variable_value
