function t(t) {
    wx.showToast({
        title: "加载中...",
        icon: "loading"
    }), wx.request({
        url: o.globalData.apiurl + "user/goods/get",
        data: {
            GoodsID: t.data.GoodsID
        },
        method: "GET",
        success: function(o) {
            if (wx.hideToast(), 1200 == o.data.code) {
                var e = o.data.content;
                e.details && a.wxParse("content", "html", e.details, t, 5), t.setData({
                    goodsinfo: e
                });
            } else console.log("加载失败"), wx.showToast({
                title: "加载失败",
                duration: 2e3
            });
        }
    });
}

var a = require("../../wxParse/wxParse.js"), o = getApp();

o.globalData.apiurl;

Page({
    data: {
        tab: [ {
            id: "0",
            text: "商品详情",
            selected: !0
        } ],
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        goodsinfo: null,
        GoodsID: 0
    },
    changetab: function(t) {
        for (var a = t.currentTarget.id, o = this.data.tab, e = o.length, s = 0; s < e; s++) o[s].id == a ? (o[s].selected = !0, 
        1 == a && 1 == PageIndex && QueryCommentList(this)) : o[s].selected = !1;
        this.setData({
            tab: o
        });
    },
    onLoad: function(a) {
        this.setData({
            GoodsID: a.GoodsID
        }), t(this);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});