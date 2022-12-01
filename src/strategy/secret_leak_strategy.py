import re


class SecretLeakChecker:

    def __init__(self):
        self.check_flg = False
        self.appid = None
        self.secret = None
        self.access_token = None
        self.secret_set = set()
        self.appid_set = set()

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

    def __repr__(self):
        return str(self.__dict__)