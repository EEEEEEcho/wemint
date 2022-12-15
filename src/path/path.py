class Path:

    def __init__(self, description: str):
        self.description = description

    def __repr__(self):
        return str(self.__dict__)


class AssignPath(Path):
    def __init__(self, left: str = None, right: str = None):
        super().__init__('Assignment')
        self.left = left
        self.right = right

    def __repr__(self):
        return str(self.__dict__)


class FunctionPath(Path):
    def __init__(self, function_name: str = None, param: str = None):
        super().__init__('FunctionCall')
        self.function_name = function_name
        self.param = param

    def __repr__(self):
        return str(self.__dict__)


class VariableDeclarationPath(Path):
    def __init__(self):
        super().__init__('VariableDeclaration')


class VariableDeclaratorPath(Path):

    def __init__(self,left: str = None, right: str = None):
        super().__init__('VariableDeclarator')
        self.left = left
        self.right = right

    def __repr__(self):
        return str(self.__dict__)


class CallExpressionPath(Path):

    def __init__(self, callee_name: str = None, params: str = None):
        super().__init__('CallExpression')
        self.callee = callee_name
        self.params = params

    def __repr__(self):
        return str(self.__dict__)


class UpdateExpressionPath(Path):

    def __init__(self, identifier: str = None, operate: str = None):
        super().__init__('UpdateExpression')
        self.identifier = identifier
        self.operate = operate

    def __repr__(self):
        return str(self.__dict__)


class ConditionalExpressionPath(Path):

    def __init__(self):
        super().__init__('ConditionalExpression')
        self.consequent = None
        self.alternate = None

    def __repr__(self):
        return str(self.__dict__)


class AwaitExpressionPath(Path):

    def __init__(self):
        super().__init__('AwaitExpression')

    def __repr__(self):
        return str(self.__dict__)


class LogicalExpressionPath(Path):

    def __init__(self):
        super().__init__('LogicalExpression')
        self.left = None
        self.right = None

    def __repr__(self):
        return str(self.__dict__)


class ObjectExpressionPath(Path):

    def __init__(self):
        super().__init__('ObjectExpression')
        self.param_map = dict()

    def __repr__(self):
        return str(self.__dict__)