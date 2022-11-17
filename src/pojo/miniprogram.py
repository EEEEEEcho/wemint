from loguru import logger
import os
import json


class MiniProgram:

    def __init__(self, base_path: str, name: str):
        # 文件路径名
        self.base_path = base_path
        # 小程序名称
        self.name = name

