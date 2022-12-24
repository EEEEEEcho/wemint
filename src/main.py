import config
import os
import utils.analysed_file as af
from loguru import logger
from src.utils import package_decoder
from src.pojo.miniprogram import MiniProgram
from src.file_layer import js_analyzer
from src.file_layer import xml_analyzer
from src import test


def main():
    # packages_catalog = config.PACKAGES_CATALOG
    # package_list = os.listdir(packages_catalog)
    # count = 0
    # leak_count = 0
    # for package in package_list:
    #     logger.info("start process the {} program".format(count))
    #     package_path = packages_catalog + package
    #     if not os.path.exists(package_path):
    #         logger.error("{} not found !! ".format(package_path))
    #         continue
    #     if os.path.isdir(package_path) or not package_path.endswith('.wxapkg'):
    #         logger.error("{} is not a package".format(package_path))
    #         continue
    #
    #     compile_flg = package_decoder.decompile_app(package_path)
    #     if compile_flg:
    #         program_name = package.split('.wxapkg')[0]
    #         logger.info("start analyze {} ".format(program_name))
    #         base_path = packages_catalog
    #         mini_program = MiniProgram(base_path, program_name)
    #         js_analyzer.app_js_analysis(mini_program.path + os.sep + 'app.js', mini_program)
    #         for page_name in mini_program.pages:
    #             js_path = mini_program.path + os.sep + page_name + '.js'
    #             xml_path = mini_program.path + os.sep + page_name + '.wxml'
    #             js_context = js_analyzer.analysis(js_path, mini_program)
    #             xml_analyzer.analysis(js_context, xml_path)
    #         # 清空已分析的文件
    #         af.clear()
    #         mini_program.secret_leak_checker.do_verify()
    #         logger.info(mini_program.secret_leak_checker)
    #         if mini_program.secret_leak_checker.access_token is not None:
    #             leak_count += 1
    # logger.info(leak_count)

    base_path = r'E:\WorkSpace\wxapp-analyzer\tmp_dir'
    program_name = r'\wechat-weapp-movie-master'
    mini_program = MiniProgram(base_path, program_name)
    js_analyzer.app_js_analysis(mini_program.path + os.sep + 'app.js', mini_program)
    for page_name in mini_program.pages:
        js_path = mini_program.path + os.sep + page_name + '.js'
        xml_path = mini_program.path + os.sep + page_name + '.wxml'
        js_context = js_analyzer.analysis(js_path, mini_program)
        xml_analyzer.analysis(js_context, xml_path, page_name)
    # 清空已分析的文件
    af.clear()
    mini_program.secret_leak_checker.do_verify()
    logger.info(mini_program.secret_leak_checker)


    # try:
    #     package_path = packages_catalog + package
    #     if not os.path.exists(package_path):
    #         logger.error("{} not found !! ".format(package_path))
    #         continue
    #     if os.path.isdir(package_path) or not package_path.endswith('.wxapkg'):
    #         logger.error("{} is not a package".format(package_path))
    #         continue
    #
    #     compile_flg = package_decoder.decompile_app(package_path)
    #     if compile_flg:
    #         program_name = package.split('.wxapkg')[0]
    #         logger.info("start analyze {} ".format(program_name))
    #         base_path = packages_catalog
    #         mini_program = MiniProgram(base_path, program_name)
    #         for page_name in mini_program.pages:
    #             js_path = mini_program.path + os.sep + page_name + '.js'
    #             js_analyzer.analysis(js_path, mini_program)
    #         # 清空已分析的文件
    #         af.clear()
    #         mini_program.secret_leak_checker.do_verify()
    #         if mini_program.secret_leak_checker.access_token is not None:
    #             leak_count += 1
    # except Exception as e:
    #     logger.error(e.with_traceback())
    #     logger.error("{} analyzed failed".format(package))
    # count += 1
    # logger.info("count : {}".format(leak_count))


if __name__ == '__main__':
    main()
