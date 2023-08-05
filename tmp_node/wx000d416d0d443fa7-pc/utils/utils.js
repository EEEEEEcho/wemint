function e(e) {
    return new Promise(function(e, n) {
        wx.login({
            success: function(n) {
                var a = {};
                a.code = n.code, wx.setStorageSync("token", o.resToken), t(a).then(function(t) {
                    e(2850868796 == t ? "hypocrisy" : "really");
                });
            },
            fail: function(e) {
                wx.hideLoading(), wx.showToast({
                    title: e.errMsg,
                    icon: "none",
                    duration: 3e3
                });
            }
        });
    });
}

function t(t) {
    return new Promise(function(a, i) {
        var r = {
            code: t.code,
            spread_token: o.resToken,
            app_id: o.appId,
            app_sec: o.appSecret
        };
        o.resToken;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), n.getApiJSON("/api/Common/userLogin", r, function(t) {
            1e3 == t.data.code ? (wx.setStorageSync("authorization", "Bearer " + t.data.data.token), 
            wx.setStorageSync("isAuth", t.data.data.is_auth), wx.setStorageSync("openId", t.data.data.openid), 
            a(t.data.data.contact_qq)) : 1004 == t.data.code ? (wx.hideLoading(), wx.showModal({
                title: "登录失败",
                content: t.data.msg,
                success: function(t) {
                    t.confirm ? e() : t.cancel;
                }
            })) : getApp().showAndHideToast(t.data.msg);
        });
    });
}

var o = require("../config"), n = require("./server");

module.exports = {
    login: e
};