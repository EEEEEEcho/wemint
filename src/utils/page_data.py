class PageData:

    def __init__(self):
        self.container = set()

    def contains(self, param):
        return param in self.container

    def add(self, param):
        self.container.add(param)

    def remove(self, param):
        self.container.remove(param)

    def clear(self):
        self.container.clear()