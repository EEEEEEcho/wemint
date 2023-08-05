import os

import loguru

PROJECT_ABSOLUTE_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PACKAGES_CATALOG = PROJECT_ABSOLUTE_PATH + os.sep + '/wxapkgs/'

ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={}&secret={}'

BASIC_INFORMATION_URL = 'https://api.weixin.qq.com/datacube/getweanalysisappiddailysummarytrend?access_token={}'

UNPACK_COMMAND = 'node ' + PROJECT_ABSOLUTE_PATH + os.sep + 'wxappUnpacker/wuWxapkg.js {}'

TMP_NODE_PATH = PROJECT_ABSOLUTE_PATH + os.sep + '/tmp_node/tmp_node.json'

DB_CONFIG = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'root',
    'passwd': 'XpQde!@',
    'db': 'taint_db',
    'charset': 'utf8',
    'maxconnections': 10,
    'mincached': 4,
    'maxcached': 0,
    'maxusage': 5,
    'blocking': True
}