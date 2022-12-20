from loguru import logger
from bs4 import BeautifulSoup
from src.utils.page_data import PageData
from graphviz import Digraph
import src.strategy.trace_variable_strategy as tvs
import src.utils.painter as painter
import os
import copy

analyzed_tag = {
    'input'
}


def find_event_element(xml_path: str):
    element_event_map = dict()
    if os.path.exists(xml_path):
        soup = BeautifulSoup(open(xml_path, encoding="utf-8"), "html.parser")
        elements = soup.findAll()
        for element in elements:
            for attr in element.attrs.keys():
                if 'bind' in attr or 'catch' in attr:
                    element_event_map[element] = element[attr]
                    if element.name == 'form' and attr == 'catchsubmit':
                        break

    return element_event_map


# def trace_param(function_node: dict):
#     if 'params' in function_node:
#         param_node = function_node['params'][0]
#         if 'type' in param_node and param_node['type'] == 'Identifier':
#             param_name = param_node['name']


# js_path = r'E:\WorkSpace\wxapp-analyzer\testfile\pages\input\input.js'
# base_path = r'E:\WorkSpace\wxapp-analyzer\testfile'
# mp = MiniProgram(base_path, 'test')
# context = ja.analysis(js_path, mp)
# eve_map = find_event_element(r'E:\WorkSpace\wxapp-analyzer\testfile\pages\input\input.wxml')
# page_data = PageData()
# logger.info(eve_map.values())
# for element, event in eve_map.items():
#     if event in context.children.function_table:
#         context.children.function_table[event]['id'] = event
#         param_set = {'e.detail'}
#         trace = tvs.find_trace(param_set, context.children.function_table[event], page_data)
#         logger.info(trace)
#         logger.info(param_set)
#
# logger.info(page_data.container)


def analysis(context, xml_path: str, page_name):
    eve_map = find_event_element(xml_path)
    page_data = PageData()
    for element, event in eve_map.items():
        if event in context.children.function_table:
            context.children.function_table[event]['id'] = event
            param_set = create_param_set(context.children.function_table[event])
            original_set = copy.deepcopy(param_set)
            trace = tvs.find_trace(param_set, context.children.function_table[event], page_data)
            trace.route_type.params = ",".join(original_set)
            if trace.is_path:
                painter.paint_trace(trace, xml_path, page_name, event)
    page_data.clear()


def create_param_set(function_node: dict):
    param_set = set()
    for param in function_node['params']:
        if param['type'] == 'Identifier':
            param_set.add(param['name'] + '.detail')
    return param_set
