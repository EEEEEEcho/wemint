var e = getApp(), t = require("../../common.js"), a = require("./ShopUtil.js");

Page({
    data: {},
    onLoad: function(s) {
        var i = this, o = function() {
            t.registerGlobalVar("ShopUtil", a), t.registerGlobalFunc(), t.loadPageModules(s), 
            i.isLogin();
        };
        e.globalData.WebUserID ? o() : e.login({
            success: o,
            fail: o,
            forcereg: o
        });
    },
    onShareAppMessage: function() {
        return e.shareAppMessage(this.url);
    },
    isLogin: function() {
        setTimeout(function() {
            e.globalData.WebUserID || a.showRegUI();
        }, 2e3);
    },
    phoneConfirm: function(e) {
        var t = this, a = "";
        t.setData({
            phoneNumber: e.detail.value
        }), a = e.detail.value, /^1\d{10}$/.test(a) ? t.setData({
            tips: ""
        }) : t.setData({
            tips: "请输入正确的手机号码!"
        });
    }
});