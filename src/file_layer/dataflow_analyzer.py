from loguru import logger
from bs4 import BeautifulSoup
from src.utils.page_data import PageData
from src.pojo.miniprogram import MiniProgram
from src.utils import utils
import src.strategy.trace_variable_strategy as tvs
import src.file_layer.taint_analyzer as ja
import src.utils.painter as painter
import os
import copy


# analyzed_tag = {
#     'input'
# }


def find_event_element(xml_path: str):
    element_event_map = dict()
    dom_set = set()
    if os.path.exists(xml_path):
        soup = BeautifulSoup(open(xml_path, encoding="utf-8"), "html.parser")
        elements = soup.findAll()
        for element in elements:
            dom_set.add(element.name)
            for attr in element.attrs.keys():
                if 'bind' in attr or 'catch' in attr:
                    element_event_map[element] = element[attr]
                    if element.name == 'form' and attr == 'catchsubmit':
                        break

    return element_event_map, dom_set


def analysis(context, xml_path: str, page_name):
    eve_map, dom_set = find_event_element(xml_path)
    logger.info(eve_map.values())
    page_data = PageData()
    mark_set = set()
    for element, event in eve_map.items():
        if context.children:
            if event in context.children.function_table and event not in mark_set:
                mark_set.add(event)
                context.children.function_table[event]['id'] = dict()
                context.children.function_table[event]['id']['name'] = event
                trace = tvs.find_trace(set(), context.children.function_table[event], page_data,
                                       context.children.function_table, True)
                if trace.is_path:
                    painter.paint_trace(trace, xml_path, page_name, event)
        else:
            break
    if context.children:
        for event, func in context.children.function_table.items():
            if event not in mark_set:
                function_ast = func
                function_ast['id'] = dict()
                function_ast['id']['name'] = event
                trace = tvs.find_trace(set(), function_ast, page_data, context.children.function_table, False)
                if trace.is_path:
                    painter.paint_trace(trace, xml_path, page_name, event)
    page_data.clear()
    mark_set.clear()
    return dom_set


# js_path = r'E:\WorkSpace\wxapp-analyzer\testfile\pages\input\input.js'
# base_path = r'E:\WorkSpace\wxapp-analyzer\testfile'
# mp = MiniProgram(base_path, 'test')
# context = ja.analysis(js_path, mp)
#
# analysis(context, r'E:\WorkSpace\wxapp-analyzer\testfile\pages\input\input.wxml', 'pages/input/input')

# eve_map = find_event_element(r'E:\WorkSpace\wxapp-analyzer\testfile\pages\input\input.wxml')
# page_data = PageData()
# logger.info(eve_map.values())
# for element, event in eve_map.items():
#     if event in context.children.function_table:
#         context.children.function_table[event]['id'] = event
#         param_set = create_param_set(context.children.function_table[event])
#         original_set = copy.deepcopy(param_set)
#         trace = tvs.find_trace(param_set, context.children.function_table[event], page_data)
#         logger.info(trace)
#         logger.info(param_set)
#
# logger.info(page_data.container)
