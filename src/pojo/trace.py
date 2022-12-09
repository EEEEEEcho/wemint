class Trace:

    def __init__(self):
        self.route_type = None
        self.trace_info = None
        self.is_source = False
        self.is_sink = False
        self.is_path = False
        self.next = list()

    def __repr__(self):
        return str(self.__dict__)