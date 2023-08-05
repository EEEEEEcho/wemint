import os
import sys
import utils.analysed_file as af
from loguru import logger
from file_layer import taint_analyzer
from file_layer import dataflow_analyzer
from pojo.miniprogram import MiniProgram
import time
import utils.package_decoder as pd
import utils.utils as util
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
    util.dump_json(source_path, mini_program.secret_leak_checker)
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
    logger.exception(e)