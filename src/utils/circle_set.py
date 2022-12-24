circle_set = dict()


def contains(file_name: str) -> bool:
    return file_name in circle_set


def increase(file_name: str):
    if file_name in circle_set:
        circle_set[file_name] += 1
    else:
        circle_set[file_name] = 1


def can_analysis(file_name: str):
    return circle_set[file_name] == 1


def remove(file_name: str):
    del circle_set[file_name]


def decrease(file_name: str):
    if circle_set[file_name] > 1:
        circle_set[file_name] -= 1


def clear():
    circle_set.clear()
