function t() {
    var t = {};
    return 1 === arguments.length && "string" != typeof arguments[0] ? t = arguments[0] : (t.url = arguments[0], 
    "object" === n(arguments[1]) ? (t.data = arguments[1], t.header = arguments[3], 
    t.success = arguments[2]) : t.success = arguments[1]), 0 !== t.url.indexOf("https://") && (t.url = p + t.url), 
    t;
}

function o(t, o) {
    o.method = t, o.header = {
        "content-type": "json"
    }, wx.request(o);
}

function e(t, o) {
    o.method = t, wx.request(o);
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = require("../config").resToken, i = require("../config").from_type, s = require("../config").version, p = "https://waimai.3cfood.com";

module.exports = {
    getJSON: function() {
        o("GET", t.apply(this, arguments));
    },
    postJSON: function() {
        o("POST", t.apply(this, arguments));
    },
    getApiJSON: function() {
        e("GET", t.apply(this, arguments));
    },
    postApiJSON: function() {
        e("POST", t.apply(this, arguments));
    },
    resToken: r,
    from_type: i,
    version: s,
    serverUrl: p,
    picUrl: "https://up-img.0xiao.cn"
};