var conf = require("../conf.js");

/**
 *空判断
 */ function isEmpty(obj) {
    if (typeof obj == "undefined" || !obj && typeof obj != "undefined" && obj != 0) {
        return true;
    }
    for (var i in obj) {
        return false;
    }
    return true;
}

/**获取请求 地址
 * route 接口 
 */ function getUrl(route) {
    var str = "" + conf.ppbaseDomain;
    if (str.charAt(str.length - 1) != "/" && str.charAt(str.length - 1) != "\\" && route.charAt(0) != "/" && route.charAt(0) != "\\") str = str + "/";
    return str + ("" + route);
}

/**post 请求数据
 * url 请求地址
 * data 提交数据
 * success 成功调用方法
 * fail 失败调用方法
 * complete 异常调用方法
 */ function requestPost(url, data, _success, _fail, _complete) {
    wx.request({
        url: getUrl(url),
        data: data,
        method: "POST",
        // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        // 设置请求的 header
        success: function success(res) {
            if (typeof _success == "function" || res.statusCode == 200) {
                _success(res);
            } else {
                console.log("POST请求成功！");
                console.log(JSON.stringify(res));
            }
        },
        fail: function fail(res) {
            if (typeof _fail == "function") {
                _fail(res);
            } else {
                console.log("POST请求失败！");
                console.log(res);
            }
        },
        complete: function complete() {
            if (typeof _complete == "function") {
                _complete();
            } else {
                console.log("POST请求结束！");
            }
        }
    });
}

module.exports = {
    requestPost: requestPost,
    isEmpty: isEmpty,
    getUrl: getUrl
};