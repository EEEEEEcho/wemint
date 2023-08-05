function t(t, i) {
    wx.request({
        url: e.localUrl + "mobileXcx/stuActivityById",
        data: {
            id: t
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            i(t.data.dataInfo.act);
        }
    });
}

var e = require("../../../utils/main.js"), i = require("../../../wxParse/wxParse.js");

getApp();

Page({
    data: {
        screenWidth: 0,
        screenHeight: 0,
        imgwidth: 0,
        imgheight: 0,
        model: {}
    },
    onLoad: function(e) {
        var a = this;
        t(e.id, function(t) {
            console.log(t), a.setData({
                model: t
            }), i.wxParse("article", "html", t.content, a, 5);
        });
    },
    imageLoad: function(t) {
        var e = 750 / (t.detail.width / t.detail.height);
        this.setData({
            imgwidth: 750,
            imgheight: e
        });
    },
    activityReport: function(t) {
        wx.navigateTo({
            url: "../activityReport/activityReport?id=" + this.data.model.id + "&report_content=" + this.data.model.report_content
        });
    },
    backLoad: function() {
        var e = this;
        t(e.data.model.id, function(t) {
            e.setData({
                model: t
            }), i.wxParse("article", "html", t.content, e, 5);
        });
    }
});