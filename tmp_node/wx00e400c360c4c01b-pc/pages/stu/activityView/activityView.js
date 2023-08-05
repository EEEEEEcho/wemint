function t(t, e) {
    wx.request({
        url: i.localUrl + "mobileXcx/stuActivityById",
        data: {
            id: t
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            e(t.data.dataInfo.act);
        }
    });
}

var i = require("../../../utils/main.js"), e = require("../../../wxParse/wxParse.js");

getApp();

Page({
    data: {
        screenWidth: 0,
        screenHeight: 0,
        imgwidth: 0,
        imgheight: 0,
        isPay: !0
    },
    onLoad: function(i) {
        var a = this, n = i.id, o = i.isPay;
        this.setData({
            isPay: o
        }), t(n, function(t) {
            a.setData({
                model: t
            }), e.wxParse("article", "html", t.content, a, 5);
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.model.title
        };
    },
    imageLoad: function(t) {
        var i = 750 / (t.detail.width / t.detail.height);
        this.setData({
            imgwidth: 750,
            imgheight: i
        });
    },
    pay: function(t) {
        i.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../activityPay/activityPay?id=" + this.data.model.id
        });
    }
});