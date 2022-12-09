from src.strategy.secret_leak_strategy import SecretLeakChecker
from src.strategy.backend_checker import BackendChecker
from src.utils import utils
from loguru import logger
import os
import json


class MiniProgram:

    def __init__(self, base_path: str, name: str):
        self.base_path = base_path
        # 小程序名称
        self.name = name
        # 小程序代码所在目录
        self.path = base_path + os.sep + self.name
        # 密钥泄露问题
        self.secret_leak_checker = SecretLeakChecker()
        # 后门问题
        self.backend_checker = BackendChecker()
        self.pages = list()
        self.parse_app_json()

    def parse_app_json(self):
        json_path = self.base_path + '/' + self.name + '/' + 'app.json'
        if not os.path.exists(json_path):
            logger.error("{}'s app json file doesn't exist".format(self.name))
            return
        try:
            with open(json_path, encoding='utf-8') as f:
                app_json_file = json.load(f)
        except Exception as e:
            logger.error(e)
            error_str = e.__str__()
            if "Extra data" in e.__str__():
                re_write_flg = utils.re_write_json(json_path, error_str)
                if re_write_flg:
                    try:
                        with open(json_path, encoding='utf-8') as f:
                            app_json_file = json.load(f)
                    except Exception as e:
                        logger.error(e)
                        logger.error("{}'s app json file re_write also disrupted".format(self.name))
                        return
                else:
                    logger.error("{}'s app json file re_write also fail".format(self.name))
                    return
            else:
                logger.error("{}'s app json file is disrupted!!".format(self.name))
                return

        if app_json_file is not None:
            if "pages" in app_json_file:
                for page in app_json_file["pages"]:
                    self.pages.append(os.sep + page)
        else:
            raise RuntimeError(json_path + " doesn't exist")
