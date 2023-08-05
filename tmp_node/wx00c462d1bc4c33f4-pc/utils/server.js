function t() {
    var t = {};
    return 1 === arguments.length && "string" != typeof arguments[0] ? t = arguments[0] : (t.url = arguments[0], 
    "object" === e(arguments[1]) ? (t.data = arguments[1], t.success = arguments[2]) : t.success = arguments[1]), 
    0 !== t.url.indexOf("https://") && (t.url = "https://wxapp.im20.com.cn" + t.url), 
    t;
}

function o(t, o) {
    o.method = t, o.header = {
        "content-type": "application/json"
    }, wx.request(o);
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

module.exports = {
    getJSON: function() {
        o("GET", t.apply(this, arguments));
    },
    postJSON: function() {
        o("POST", t.apply(this, arguments));
    },
    sendTemplate: function(t, o, e, n) {
        var s = getApp();
        this.getJSON({
            url: "/WxAppApi/sendTemplate",
            data: {
                rd_session: s.rd_session,
                form_id: t,
                data: o
            },
            success: e,
            fail: n
        });
    }
};