from Crypto.Protocol.KDF import PBKDF2
from Crypto.Hash import SHA1
from Crypto.Cipher import AES
from loguru import logger
import re
import config as config
import utils.utils as utils
import os

WXAPKG_FLAG = 'V1MMWX'
WXAPKG_FLAG_LEN = len(WXAPKG_FLAG)


def decompile_app(package_path):
    success_flg = True
    command = config.UNPACK_COMMAND.format(package_path)
    execute_flg, execute_result = utils.execute_cmd(command)
    if execute_flg is False:
        if "Magic number is not correct" in execute_result:
            logger.error("{} decompile fail, need decrypt".format(package_path))
            match = re.search("(wx[a-z0-9A-Z]{16})", package_path)
            if match:
                decrypt_flg = decrypt_app(package_path, match.group(0))
                if decrypt_flg:
                    logger.info("{} decrypt success".format(package_path))
                    re_execute_flg, re_execute_result = utils.execute_cmd(command)
                    if re_execute_flg is False:
                        logger.error("{} failed to recompile after decryption".format(package_path))
                    return re_execute_flg
                else:
                    logger.info("{} decrypt fail".format(package_path))
                    return False
            success_flg = False
            logger.error("{} decompile fail".format(package_path))
        else:
            logger.error(execute_result)
            success_flg = False
    else:
        logger.info("{} decrypt success".format(package_path))
    return success_flg


def decrypt_app(app_name, appid):
    return decrypt(appid, app_name, app_name)


def decrypt(wxid, input_file, output_file):
    return decrypt_by_salt_and_iv(wxid, input_file, output_file, 'saltiest', 'the iv: 16 bytes')


def decrypt_by_salt_and_iv(wxid, input_file, output_file, salt, iv):
    try:
        key = PBKDF2(wxid.strip().encode('utf-8'), salt.encode('utf-8'), 32, count=1000, hmac_hash_module=SHA1)
        if not os.path.exists(input_file):
            logger.error("{} is not exist", input_file)
            return False
        with open(input_file, mode='rb') as f:
            data_byte = f.read()
        if data_byte[0:WXAPKG_FLAG_LEN].decode("utf-8") != WXAPKG_FLAG:
            logger.info('{} The file does not need to be decrypted, or it is not a wxapkg encryption package',
                        input_file)
            return False
        cipher = AES.new(key, AES.MODE_CBC, iv.encode('utf-8'))
        origin_data = cipher.decrypt(data_byte[WXAPKG_FLAG_LEN: 1024 + WXAPKG_FLAG_LEN])
        xor_key = 0x66
        if len(wxid) >= 2:
            xor_key = ord(wxid[len(wxid) - 2])
        af_data = data_byte[1024 + WXAPKG_FLAG_LEN:]
        out = bytearray()
        for i in range(len(af_data)):
            out.append(af_data[i] ^ xor_key)
        origin_data = origin_data[0:1023] + out
        with open(output_file, mode='wb') as f:
            f.write(origin_data)
        return True
    except Exception as e:
        logger.error(e)
        return False
