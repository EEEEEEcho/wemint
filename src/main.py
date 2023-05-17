import os
import sys
import utils.analysed_file as af
from loguru import logger
from file_layer import taint_analyzer
from file_layer import dataflow_analyzer
from pojo.miniprogram import MiniProgram
import time
import utils.package_decoder as pd
import getopt


def start_analysis(source_path: str):
    logger.info("Start analyzing the {}".format(source_path))
    program_name = source_path.split(os.sep)[-1]
    base_path = source_path.split(program_name)[0]
    start_time = time.time()
    mini_program = MiniProgram(base_path, program_name)
    taint_analyzer.app_js_analysis(source_path + os.sep + 'app.js', mini_program)
    for page in mini_program.pages:
        js_path = mini_program.path + os.sep + page + '.js'
        xml_path = mini_program.path + os.sep + page + '.wxml'
        js_context = taint_analyzer.analysis(js_path, mini_program)
        dataflow_analyzer.analysis(js_context, xml_path, page)
    af.clear()
    mini_program.secret_leak_checker.do_verify()
    logger.info(mini_program.secret_leak_checker)
    end_time = time.time()
    logger.info("Total Consume {}".format(end_time - start_time))


opts, args = getopt.getopt(sys.argv[1:], 'p:s:', ['package=', 'source='])
try:
    for opt_name, file_path in opts:
        logger.info(file_path)
        if not os.path.exists(file_path):
            raise Exception("{} not found !!".format(file_path))
        if opt_name in ('-s', '--source') and os.path.isdir(file_path):
            start_analysis(file_path)
        elif opt_name in ('-p', '--package') and file_path.endswith('.wxapkg'):
            compile_success = pd.decompile_app(file_path)
            if compile_success:
                file_path = file_path.split('.wxapkg')[0]
                start_analysis(file_path)
        else:
            raise Exception("Wrong input format！")
except Exception as e:
    logger.error(e)

# def main():
# packages_catalog = config.PACKAGES_CATALOG
# package_list = os.listdir(packages_catalog)
# count = 0
# leak_count = 0
# total_time = 0
# try:
#     for package in package_list:
#         logger.info("start process the {} program".format(count))
#         package_path = packages_catalog + package
#         if not os.path.exists(package_path):
#             logger.error("{} not found !! ".format(package_path))
#             continue
#         if os.path.isdir(package_path) or not package_path.endswith('.wxapkg'):
#             logger.error("{} is not a package".format(package_path))
#             continue
#
#         compile_flg = package_decoder.decompile_app(package_path)
#         if compile_flg:
#             program_name = package.split('.wxapkg')[0]
#             logger.info("start analyze {} ".format(program_name))
#             base_path = packages_catalog
#             start_time = time.time()
#             mini_program = MiniProgram(base_path, program_name)
#             taint_analyzer.app_js_analysis(mini_program.path + os.sep + 'app.js', mini_program)
#             for page_name in mini_program.pages:
#                 js_path = mini_program.path + os.sep + page_name + '.js'
#                 xml_path = mini_program.path + os.sep + page_name + '.wxml'
#                 js_context = taint_analyzer.analysis(js_path, mini_program)
#                 dataflow_analyzer.analysis(js_context, xml_path, page_name)
#             # 清空已分析的文件
#             af.clear()
#             ent_time = time.time()
#             total_time += ent_time - start_time
#             count += 1
#             mini_program.secret_leak_checker.do_verify()
#             logger.info(mini_program.secret_leak_checker)
#             if mini_program.secret_leak_checker.access_token is not None:
#                 leak_count += 1
# except Exception as e:
#     logger.error(e)
# logger.info('Secret 泄露的数量{}'.format(leak_count))
# logger.info('分析总数{}'.format(count))
# logger.info('总时间{}'.format(total_time))
# logger.info('平均时间{}'.format(total_time / count))

# start = time.time()
# # base_path = r'F:/DataFlow/'
# # program_name = r'wx6b75078563b749b0'
# base_path = r'E:/WorkSpace/wxapp-analyzer/compare/'
# program_name = r'wxquestionprogram'
# mini_program = MiniProgram(base_path, program_name)
# taint_analyzer.app_js_analysis(mini_program.path + os.sep + 'app.js', mini_program)
# for page_name in mini_program.pages:
#     try:
#         logger.info("start analysis {} ".format(page_name))
#         js_path = mini_program.path + os.sep + page_name + '.js'
#         xml_path = mini_program.path + os.sep + page_name + '.wxml'
#         # json_path = mini_program.path + os.sep + page_name + '.json'
#
#         js_context = taint_analyzer.analysis(js_path, mini_program)
#         dom_set = dataflow_analyzer.analysis(js_context, xml_path, page_name)
#         # component_path_list = component_analyzer.find_component_list(json_path, dom_set)
#         # logger.info(component_path_list)
#         # for component_path in component_path_list:
#         #     js_analyzer.analysis(component_path, mini_program)
#     except Exception as e:
#         logger.exception(e)

# for component_path in component_path_list:

# 清空已分析的文件
# af.clear()
# mini_program.secret_leak_checker.do_verify()
# logger.info(mini_program.secret_leak_checker)
# end = time.time()
# logger.info("Total Consume {}".format(end - start))

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


# if __name__ == '__main__':
#     main()
