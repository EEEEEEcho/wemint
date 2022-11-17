from src.pojo.file_context import FileContext

analysed = dict()


def contains(file_name: str) -> bool:
    return file_name in analysed


def get_context(file_name: str) -> FileContext:
    return analysed[file_name]


def set_context(file_name: str, context: FileContext):
    analysed[file_name] = context


def clear():
    analysed.clear()
