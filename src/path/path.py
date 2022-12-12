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
