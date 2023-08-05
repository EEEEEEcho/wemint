var e = getApp(), t = require("../../common.js"), a = require("./ShopUtil.js");

Page({
    data: {},
    onLoad: function(o) {
        var s = this, i = function() {
            t.registerGlobalVar("ShopUtil", a), t.registerGlobalFunc(), t.loadPageModules(o), 
            s.isLogin();
        };
        e.globalData.WebUserID ? i() : e.login({
            success: i,
            fail: i,
            forcereg: i
        });
    },
    onPageScroll: function() {},
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