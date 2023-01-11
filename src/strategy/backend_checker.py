class BackendChecker:
    sensitive_api = {
        "exec", "send", "cat", "eval", "process", "chmod", "GET", "get", "execSync", "echo",
        "WebSocket", "Date", "Client", "BroadcastChannel"
    }

    def __init__(self):
        self.dangerous_api = list()
        self.key_params = list()
        self.description = None
        self.dangerous_cmd = list()

    def check_callee_name(self, callee_name: str):
        if callee_name in BackendChecker.sensitive_api:
            self.dangerous_api.append(callee_name)

    def add_param(self, param: str):
        self.key_params.append(param)

    def analysis(self):
        if "Content-Sec-Policy" in self.key_params:
            if "exec" in self.dangerous_api and "send" in self.dangerous_api:
                self.description = "express中间件调用exec函数执行远程命令"
        elif "cat .env" in self.key_params:
            if "exec" in self.dangerous_api:
                self.description = "执行exec获取.env环境信息"
        elif "USERNAME" in self.key_params and "admin" in self.key_params and "/usr/bin" in self.key_params:
            if "process" in self.dangerous_api:
                self.description = "npm获取用户名等敏感信息"
        else:
            if "eval" in self.dangerous_api:
                self.description = "eval函数计算以字符串表示的JavaScript代码并返回其完成值,可能造成任意代码执行"
            elif "execSync" in self.dangerous_api:
                for key_param in self.key_params:
                    if type(key_param) is str and "echo" in key_param:
                        self.description = "用敏感路径替换读取的url获取敏感信息"
            elif "exec" in self.dangerous_api:
                for param in self.key_params:
                    if type(param) is str and "chmod" in param:
                        for other_param in self.key_params:
                            if type(other_param) is str and "shell.elf" in other_param:
                                self.description = "在electron上嵌入shell执行恶意软件"
            else:
                for key_param in self.key_params:
                    if key_param.startswith("http") and key_param.endswith(".jpg"):
                        if "GET" in self.dangerous_api:
                            self.description = "加载恶意URL中的jpg图片并读取其中内容执行恶意代码"
                    if key_param.startswith("http") and key_param.endswith(".exe"):
                        if "GET" in self.dangerous_api:
                            self.description = "加载恶意URL执行恶意exe文件"

    def check_dangerous_cmd(self, param: str):
        if type(param) is str and 'cmd.exe' in param:
            self.dangerous_cmd.append(param)

    def __repr__(self):
        return str(self.__dict__)