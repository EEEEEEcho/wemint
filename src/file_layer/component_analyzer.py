import os
import json
from src.utils import utils
from loguru import logger

analyzed_components = set()


def find_component_list(json_path: str, dom_set: set):
    ans_list = list()
    if not os.path.isfile(json_path):
        logger.error('{} does not exist'.format(json_path))
        return ans_list
    with open(json_path, encoding='utf-8') as f:
        json_file = json.load(f)
    if 'usingComponents' in json_file:
        for key, value in json_file["usingComponents"].items():
            if key in dom_set:
                component_path = utils.get_brother_path(json_path, value)
                if component_path not in analyzed_components:
                    ans_list.append(component_path)
                    analyzed_components.add(component_path)
    return ans_list
