import re
from src import config
from loguru import logger
import requests
import json


class SecretLeakChecker:

    def __init__(self):
        self.check_flg = False
        self.appid = None
        self.secret = None
        self.access_token = None
        self.secret_set = set()
        self.appid_set = set()
        self.visit_total = 0
        self.share_pv = 0
        self.share_uv = 0

    def check_callee_name(self, callee_name: str):
        self.check_flg = callee_name == 'wx.request'

    def do_check(self, value):
        if type(value) is str:
            self.check_literal(value)
        if type(value) is dict or type(value) is list:
            self.check_object(value)

    def check_literal(self, literal_value: str):
        if type(literal_value) is str:
            if 'http' in literal_value:
                url_match = re.findall("[?&]([^?&#]+)=([^?&#]+)", literal_value)
                for match_group in url_match:
                    appid_match = re.search(".*(wx[0-9a-z]{16}).*", match_group[1])
                    if appid_match:
                        appid = appid_match.group(1)
                        self.appid_set.add(appid)
                    secret_match = re.search(".*([0-9a-z]{32}).*", match_group[1])
                    if secret_match:
                        secret = secret_match.group(1)
                        self.secret_set.add(secret)
            else:
                appid_match = re.search(".*(wx[0-9a-z]{16}).*", literal_value)
                if appid_match:
                    appid = appid_match.group(1)
                    self.appid_set.add(appid)
                secret_match = re.search(".*([0-9a-z]{32}).*", literal_value)
                if secret_match:
                    secret = secret_match.group(1)
                    self.secret_set.add(secret)

    def check_object(self, object_value):
        if type(object_value) == list:
            for el in object_value:
                el_type = type(el)
                if el_type is str:
                    self.check_literal(el)
                elif el_type is dict or el_type is list:
                    self.check_object(el)
        elif type(object_value) == dict:
            for k, v in object_value.items():
                if type(v) is str:
                    self.check_literal(v)
                elif type(v) is dict or type(v) is list:
                    self.check_object(v)

    def do_verify(self):
        for appid in self.appid_set:
            for secret in self.secret_set:
                token_url = config.ACCESS_TOKEN_URL.format(appid, secret)
                response = requests.get(token_url)
                if response.status_code == 200:
                    json_response = json.loads(response.text)
                    if 'access_token' in json_response:
                        access_token = json_response['access_token']
                        logger.info(
                            "Successfully obtained token {}".format(access_token))
                        self.access_token = access_token
                        basic_information_url = config.BASIC_INFORMATION_URL.format(access_token)
                        body_data = {
                            "begin_date": "20221001",
                            "end_date": "20221001"
                        }
                        response = requests.post(basic_information_url, data=json.dumps(body_data))
                        if response.status_code == 200:
                            json_response = json.loads(response.text)
                            if 'list' in json_response:
                                data_information = json_response['list'][0]
                                logger.info(
                                    "Successfully obtained basic information {}".format(data_information))
                                self.appid = appid
                                self.secret = secret
                                self.visit_total = data_information['visit_total']
                                self.share_pv = data_information['share_pv']
                                self.share_uv = data_information['share_uv']
                                return
                            else:
                                logger.error("Request for {}'s basic information failed")
                    else:
                        logger.error("Request for token failed")

    def __repr__(self):
        return str(self.__dict__)
