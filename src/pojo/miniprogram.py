from loguru import logger
import os
import json


class MiniProgram:

    def __init__(self, path: str, name: str):
        # 小程序代码所在目录
        self.path = path
        # 小程序名称
        self.name = name

