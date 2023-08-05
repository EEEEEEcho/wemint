var a = require("../../wxParse/wxParse.js"), t = getApp().globalData.rootPath;

Page({
    data: {},
    onLoad: function(o) {
        var e = o.id, n = this;
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), wx.request({
            url: t + "/admin/xcx/newsdetail",
            data: {
                id: e
            },
            method: "POST",
            success: function(t) {
                console.log(t);
                var o = String(t.data.content);
                n.setData({
                    list: t.data,
                    nodes: o
                }), a.wxParse("datas", "html", o, n, 5), wx.hideToast();
            }
        });
    },
    onReady: function() {},
    onShow: function() {}
});