var e = require("wxapp.js");

module.exports = {
    getAppData: function(t, n, r) {
        return new Promise(function(s) {
            var o = e.projectUrl + "/miniProgram/getAppData?appid=" + t + "&secret=" + n + "&js_code=" + r;
            wx.request({
                url: o,
                success: function(e) {
                    var t = {};
                    t.openId = e.data.openid, t.session_key = e.data.session_key, wx.setStorageSync("user", t), 
                    s(t);
                }
            });
        });
    },
    reqPost: function(e, t, n) {
        return new Promise(function(r) {
            wx.request({
                url: e,
                data: t,
                header: {
                    "content-type": n
                },
                method: "POST",
                success: function(e) {
                    r(e);
                },
                fail: function(e) {
                    r(e);
                }
            });
        });
    },
    reqGet: function(e) {
        return new Promise(function(t) {
            wx.request({
                url: e,
                method: "GET",
                success: function(e) {
                    t(e);
                },
                fail: function(e) {
                    t(e);
                }
            });
        });
    }
};