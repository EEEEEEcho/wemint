from enum import Enum


class Scope(Enum):
    FILE = 1
    FILE_FUNCTION = 2
    OBJECT = 3
    OBJECT_FUNCTION = 4
