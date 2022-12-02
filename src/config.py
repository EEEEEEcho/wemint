import os

import loguru

PROJECT_ABSOLUTE_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# PACKAGES_CATALOG = 'E:/WorkSpace/wxapp-echo/src/sources/'
# 共20766个包
# 剩余12681个包时，终止了一次,此次终止发现了很多反编译之后非正常格式的包，可以考虑以此为分界线


# 扫描完5624个代码包之后，中断了一次，中断之后统计记录结果，发现有3412个代码包有密钥泄露问题。
# 扫描完5660个代码包之后, 中断了一次
# 扫描完7950个代码包之后，中断了一次，中断之后统计记录结果，发现有3546个代码包有密钥泄露问题。
# 扫描完10611个代码包之后，中断了一次，中断之后统计记录结果，发现有3727个代码包有密钥泄露问题。
# PACKAGES_CATALOG = 'F:/3w/filter_files/'
PACKAGES_CATALOG = PROJECT_ABSOLUTE_PATH + os.sep + '/test_wxapkgs/'

ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={}&secret={}'

BASIC_INFORMATION_URL = 'https://api.weixin.qq.com/datacube/getweanalysisappiddailysummarytrend?access_token={}'

UNPACK_COMMAND = 'node ' + PROJECT_ABSOLUTE_PATH + os.sep + 'wxappUnpacker/wuWxapkg.js {}'

DB_CONFIG = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'root',
    'passwd': 's814466057',
    'db': 'taint_db',
    'charset': 'utf8',
    'maxconnections': 10,  # 连接池允许的最大连接数
    'mincached': 4,  # 初始化时连接池中至少创建的空闲的连接，0表示不创建
    'maxcached': 0,  # 连接池中最多闲置的连接，0表示不限制，连接使用完成后的空闲连接保留数。
    'maxusage': 5,  # 每个连接最多被重复使用的次数，None表示不限制
    'blocking': True  # 连接池中如果没有可用连接后是否阻塞等待，
    # True 等待，让用户等待，尽可能的成功； False 不等待然后报错，尽快告诉用户错误，例如抢购，不成功就提示
}