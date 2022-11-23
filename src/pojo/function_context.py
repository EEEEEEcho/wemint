from src.pojo.scope_enum import Scope


class FunctionContext:

    def __init__(self, scope: Scope, name: str = None):
        # 当前上下文等级
        self.scope = scope
        # 当前上下文名字
        self.name = name
        # 当前上下文是否分析过
        self.analyzed = False
        # 变量表
        self.variable_table = dict()
        # 参数表
        self.arguments_table = dict()
        # 常量表
        self.const_variable_table = dict()
        # 父上下文
        self.father = None
