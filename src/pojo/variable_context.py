class VariableContext:

    def __init__(self, scope: str, name: str = None):
        # Current context level.
        self.scope = scope
        # Current context name.
        self.name = name
        # Variable table.
        self.variable_table = dict()
        # Child context.
        self.children = None
        # Sibling context
        self.brother = None
        # Parent context.
        self.father = None
