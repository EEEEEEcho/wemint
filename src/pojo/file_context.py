from pojo.scope_enum import Scope


class FileContext:

    def __init__(self, scope: Scope, name=None):
        # Current context level.
        self.scope = scope
        # Current context name.
        self.name = name
        # Sibling contexts," where the key is the name of the file that the object references,
        # and the value is the context to which the object refers.
        self.brother_table = dict()
        # Variable table.
        self.variable_table = dict()
        # Function table.
        self.function_table = dict()
        # Page object.
        self.page_object = None
        # Analyzed constant table.
        self.const_variable_table = dict()
        # Child context.
        self.children = None
        # Parent context.
        self.father = None

    def __repr__(self):
        return str(self.__dict__)
