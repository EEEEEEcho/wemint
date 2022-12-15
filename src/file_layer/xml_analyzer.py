from bs4 import BeautifulSoup
from loguru import logger
from src.pojo.miniprogram import MiniProgram
from src.utils.page_data import PageData
import js_analyzer as ja
import src.strategy.trace_variable_strategy as tvs
import os

analyzed_tag = {
    'input'
}


def find_event_element(xml_path: str):
    element_event_map = dict()
    if os.path.exists(xml_path):
        soup = BeautifulSoup(open(xml_path, encoding="utf-8"), "html.parser")
        elements = soup.findAll()
        for element in elements:
            # if element.name == 'form':
            #     for attr in element.attrs.keys():
            #         if 'bind' or 'catch' in attr:
            #             element_event_map[element]
            logger.info(element.name)
            for attr in element.attrs.keys():
                if 'bind' in attr or 'catch' in attr:
                    element_event_map[element] = element[attr]
                    if element.name == 'form' and attr == 'catchsubmit':
                        break

    return element_event_map


def trace_param(function_node: dict):
    if 'params' in function_node:
        param_node = function_node['params'][0]
        if 'type' in param_node and param_node['type'] == 'Identifier':
            param_name = param_node['name']


js_path = r'E:\WorkSpace\wxapp-analyzer\testfile\pages\input\input.js'
base_path = r'E:\WorkSpace\wxapp-analyzer\testfile'
mp = MiniProgram(base_path, 'test')
context = ja.analysis(js_path, mp)
eve_map = find_event_element(r'E:\WorkSpace\wxapp-analyzer\testfile\pages\input\input.wxml')
page_data = PageData()
logger.info(eve_map.values())
for element, event in eve_map.items():
    if event in context.children.function_table:
        context.children.function_table[event]['id'] = event
        param_set = {'e.detail.value'}
        trace = tvs.find_trace(param_set, context.children.function_table[event], page_data)
        logger.info(trace)
        logger.info(param_set)

logger.info(page_data.container)
