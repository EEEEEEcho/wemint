function t(t) {
    for (var o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = [], a = t.getMonth() + 1, r = 1 == a ? 12 : a - 1, i = 12 == a ? 1 : a + 1, u = t.getFullYear(), s = 12 == r ? u - 1 : u, l = 1 == i ? u + 1 : u, c = t.getDay(), d = t.getDate(), p = d - c; p > 0; ) p -= 7;
    for (var h = e(s, r) + p, g = 0, f = Math.abs(p); g < f; g++) (y = {}).year = s, 
    y.month = r, y.day = h, y.type = -1, y.dateShow = 1 == h ? r + "月" : h, h++, n.push(y);
    for (var m = e(u, a), g = 1; g <= m; g++) (y = {}).year = u, y.month = a, y.day = g, 
    y.type = o ? 1 == g ? 1 : 2 : g == d ? 1 : 2, y.dateShow = 1 == g ? a + "月" : g, 
    n.push(y);
    for (var v = m - d + c; v > 0; ) v -= 7;
    for (var g = 1, f = Math.abs(v); g <= f; g++) {
        var y = {};
        y.year = l, y.month = i, y.day = g, y.type = -1, y.dateShow = 1 == g ? i + "月" : g, 
        n.push(y);
    }
    return n;
}

function e(t, e) {
    return new Date(t, e, 0).getDate();
}

var o = "https://lmbc.songguo100.net/", n = require("qiniuUploader");

module.exports = {
    initThisMonthDates: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, o = new Date();
        return t(new Date(o.setMonth(o.getMonth() + e)));
    },
    initNextMonthDates: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, o = new Date();
        return t(new Date(o.setMonth(o.getMonth() + 1 + e)), !0);
    },
    initRowList: function(t) {
        for (var e = [], o = 0; o < t; o++) e.push(o);
        return e;
    },
    formatLocation: function(t, e) {
        return "string" == typeof t && "string" == typeof e && (t = parseFloat(t), e = parseFloat(e)), 
        t = t.toFixed(2), e = e.toFixed(2), {
            longitude: t.toString().split("."),
            latitude: e.toString().split(".")
        };
    },
    initQiniu: function() {
        wx.request({
            url: o + "mobileXcx/getQNToken",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t.data.dataInfo.token);
                var e = {
                    region: "ECN",
                    uptokenURL: "https://up.qbox.me/api/uptoken",
                    uptoken: t.data.dataInfo.token,
                    domain: "http://img.songguo100.net/",
                    shouldUseQiniuFileName: !1
                };
                n.init(e);
            }
        }), console.log("");
    },
    collectFomrId: function(t, e) {
        wx.request({
            url: o + "mobileXcx/collectFomrId",
            data: {
                formId: t,
                time: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {}
        });
    }
}, module.exports.localUrl = o, module.exports.crm_code = "crm0000";