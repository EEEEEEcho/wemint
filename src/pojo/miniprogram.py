from src.strategy.secret_leak_strategy import SecretLeakChecker
from loguru import logger
import os
import json


class MiniProgram:

    def __init__(self, path: str, name: str):
        # 小程序代码所在目录
        self.path = path
        # 小程序名称
        self.name = name
        # 密钥泄露问题
        self.secret_leak_checker = SecretLeakChecker()
