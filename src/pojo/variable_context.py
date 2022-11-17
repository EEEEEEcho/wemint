class VariableContext:

    def __init__(self, scope: str, name: str = None):
        # 当前上下文等级
        self.scope = scope
        # 当前上下文名字
        self.name = name
        # 变量表
        self.variable_table = dict()
        # 子上下文
        self.children = None
        # 兄弟上下文
        self.brother = None
        # 父上下文
        self.father = None
