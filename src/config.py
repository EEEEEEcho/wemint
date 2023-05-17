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
    'maxconnections': 10,  # 连接池允许的最大连接数
    'mincached': 4,  # 初始化时连接池中至少创建的空闲的连接，0表示不创建
    'maxcached': 0,  # 连接池中最多闲置的连接，0表示不限制，连接使用完成后的空闲连接保留数。
    'maxusage': 5,  # 每个连接最多被重复使用的次数，None表示不限制
    'blocking': True  # 连接池中如果没有可用连接后是否阻塞等待，
}