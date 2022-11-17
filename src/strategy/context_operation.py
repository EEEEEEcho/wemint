import src.utils.utils as utils
import src.utils.analysed_file as af
from src.pojo.miniprogram import MiniProgram
from src.pojo.scope_enum import Scope


def add_brother_to_context(context, mini_program: MiniProgram):
    brother_path = mini_program.base_path + '/' + mini_program.name + '/' + 'app.js'
    tmp_context = context
    while tmp_context.father:
        tmp_context = tmp_context.father
    # 如果已经分析过了，就不分析了
    if 'getApp' in tmp_context.brother:
        return
    else:
        # 没有分析过，那么进行分析
        if not af.contains(brother_path):
            import src.file_layer.js_analyzer as ja
            # 全局文件中也没有
            file_context = ja.analysis(brother_path, mini_program)
            af.set_context(brother_path, file_context)
        tmp_context.brother.update({'getApp': af.get_context(brother_path)})


def find_father(variable_name: str, context):
    tmp_context = context
    variable_value = None
    while tmp_context:
        if variable_name not in tmp_context.variable_table:
            tmp_context = tmp_context.father
        else:
            variable_value = tmp_context.variable_table[variable_name]
            break
    return utils.recast_type(variable_value)


def find_bother(variable_name: str, context):
    if context.scope == Scope.FILE and variable_name in context.brother:
        if context.brother[variable_name] is not None:
            return context.brother[variable_name].variable_table
    if (context.scope == Scope.FILE_FUNCTION or context.scope == Scope.OBJECT) \
            and variable_name in context.father.brother:
        if context.father.brother[variable_name] is not None:
            return context.father.brother[variable_name].variable_table
    if context.scope == Scope.OBJECT_FUNCTION and variable_name in context.father.father.brother:
        if context.father.father.brother[variable_name] is not None:
            return context.father.father.brother[variable_name].variable_table
    return None


def search_identifier(variable_name: str, context):
    """
    根据变量名在缓存、父级作用域和兄弟作用域中寻找
    todo: 缓存
    :param variable_name:
    :param context:
    :return:
    """
    if variable_name is None:
        return None

    if '.' in variable_name:
        # 是一个字典类型的调用
        variable_list = variable_name.split('.')

        # value_table = find_storage(variable_list[0])
        # if value_table is not None:
        #     return get_variable_value(variable_list, value_table)

        value_table = find_father(variable_list[0], context)
        if value_table is not None and type(value_table) is dict:
            return get_variable_value(variable_list, value_table)

        value_table = find_bother(variable_list[0], context)
        if value_table is not None and type(value_table) is dict:
            return get_variable_value(variable_list, value_table)

        return None
    else:
        # variable_value = find_storage(variable_name)
        # if variable_value is not None:
        #     return variable_value
        variable_value = find_father(variable_name, context)
        if variable_value is not None:
            return variable_value
        variable_value = find_bother(variable_name, context)
        if variable_value is not None:
            return variable_value
        return None


def get_variable_value(variable_list: list, value_table: dict):
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

