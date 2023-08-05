var a = require("../../utils/server"), e = (require("../../config.js"), {});

Page({
    data: {
        chargeMoney: 0,
        chargeMoneyLog: []
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "我的余额"
        }), e = {
            authorization: wx.getStorageSync("authorization")
        };
        var o = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), a.postApiJSON("/api/userInfo/getUserCardLog", {}, function(a) {
            1e3 == a.data.code ? (a.data.data.length < 1 ? o.setData({
                chargeMoney: 0
            }) : o.setData({
                chargeMoney: a.data.data[0].free_money
            }), wx.hideLoading()) : (wx.hideLoading(), getApp().showAndHideToast(a.data.msg));
        }, e);
    }
});