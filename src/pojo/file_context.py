from src.pojo.scope_enum import Scope


class FileContext:

    def __init__(self, scope: Scope, name=None):
        # 当前上下文等级
        self.scope = scope
        # 当前上下文名字
        self.name = name
        # 兄弟上下文, key为该对象引用的文件的名称, value为该对象引用的context
        self.brother_table = dict()
        # 变量表
        self.variable_table = dict()
        # 函数表
        self.function_table = dict()
        # 页面对象
        self.page_object = None
        # 分析出的常量表
        self.const_variable_table = dict()
        # 子上下文
        self.children = None
        # 父上下文
        self.father = None

    def __repr__(self):
        return str(self.__dict__)
