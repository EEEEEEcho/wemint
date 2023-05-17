from Crypto.Protocol.KDF import PBKDF2
from Crypto.Hash import SHA1
from Crypto.Cipher import AES
from loguru import logger
import re
import config as config
import utils.utils as utils
import os

# 微信小程序包 自定义标识
WXAPKG_FLAG = 'V1MMWX'
WXAPKG_FLAG_LEN = len(WXAPKG_FLAG)


def decompile_app(package_path):
    success_flg = True
    command = config.UNPACK_COMMAND.format(package_path)
    execute_flg, execute_result = utils.execute_cmd(command)
    # 执行出错，那么检查出错是不是解密造成的，如果是，就再一次解密，然后重新做一次反编译
    if execute_flg is False:
        if "Magic number is not correct" in execute_result:
            logger.error("{} decompile fail, need decrypt".format(package_path))
            match = re.search("(wx[a-z0-9A-Z]{16})", package_path)
            if match:
                # 小程序的文件名中有小程序的ID，才能进行解密
                decrypt_flg = decrypt_app(package_path, match.group(0))
                if decrypt_flg:
                    logger.info("{} decrypt success".format(package_path))
                    # 如果解密成功,再试一次反编译
                    re_execute_flg, re_execute_result = utils.execute_cmd(command)
                    if re_execute_flg is False:
                        logger.error("{} failed to recompile after decryption".format(package_path))
                    return re_execute_flg
                else:
                    logger.info("{} decrypt fail".format(package_path))
                    return False
            # 遍历完出错结果也没有找到是解密造成的，那就是错了。
            success_flg = False
            logger.error("{} decompile fail".format(package_path))
        else:
            logger.error(execute_result)
            success_flg = False
    else:
        logger.info("{} decrypt success".format(package_path))
    return success_flg


    # if execute_flg is False and "Magic number is not correct" in execute_result:
    #     logger.error("{} decompile fail, need decrypt".format(package_path))
    #     match = re.search("(wx[a-z0-9A-Z]{16})", package_path)
    #     if match:
    #         # 小程序的文件名中有小程序的ID，才能进行解密
    #         decrypt_flg = decrypt_app(package_path, match.group(0))
    #         if decrypt_flg:
    #             logger.info("{} decrypt success".format(package_path))
    #             # 如果解密成功,再试一次反编译
    #             re_execute_flg, re_execute_result = utils.execute_cmd(command)
    #             if re_execute_flg is False:
    #                 logger.error("{} failed to recompile after decryption".format(package_path))
    #             return re_execute_flg
    #         else:
    #             logger.info("{} decrypt fail".format(package_path))
    #             return False
    #     # 遍历完出错结果也没有找到是解密造成的，那就是错了。
    #     success_flg = False
    #     logger.error("{} decompile fail".format(package_path))
    # else:
    #     logger.info("{} decrypt success".format(package_path))
    # return success_flg


def decrypt_app(app_name, appid):
    return decrypt(appid, app_name, app_name)


def decrypt(wxid, input_file, output_file):
    return decrypt_by_salt_and_iv(wxid, input_file, output_file, 'saltiest', 'the iv: 16 bytes')


def decrypt_by_salt_and_iv(wxid, input_file, output_file, salt, iv):
    try:
        key = PBKDF2(wxid.strip().encode('utf-8'), salt.encode('utf-8'), 32, count=1000, hmac_hash_module=SHA1)
        # 读取加密的内容
        if not os.path.exists(input_file):
            logger.error("{} is not exist", input_file)
            return False
        with open(input_file, mode='rb') as f:
            data_byte = f.read()
        if data_byte[0:WXAPKG_FLAG_LEN].decode("utf-8") != WXAPKG_FLAG:
            logger.info('{} The file does not need to be decrypted, or it is not a wxapkg encryption package',
                        input_file)
            return False
        # 初始化密钥
        cipher = AES.new(key, AES.MODE_CBC, iv.encode('utf-8'))
        # 解密头部1024个字节
        origin_data = cipher.decrypt(data_byte[WXAPKG_FLAG_LEN: 1024 + WXAPKG_FLAG_LEN])
        # 初始化xor密钥, 解密剩余字节
        xor_key = 0x66
        if len(wxid) >= 2:
            xor_key = ord(wxid[len(wxid) - 2])
        af_data = data_byte[1024 + WXAPKG_FLAG_LEN:]
        out = bytearray()
        for i in range(len(af_data)):
            out.append(af_data[i] ^ xor_key)
        origin_data = origin_data[0:1023] + out
        # 保存解密后的数据
        with open(output_file, mode='wb') as f:
            f.write(origin_data)
        return True
    except Exception as e:
        logger.error(e)
        return False
