var t = getApp(), a = require("../../wxParse/wxParse.js");

Page({
    data: {
        itemData: {}
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: "详情页面"
        });
    },
    onLoad: function(t) {
        var a = this;
        a.setData({
            id: t.id
        }), a.loadNewsDetail();
    },
    loadNewsDetail: function() {
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/News/detail",
            method: "post",
            data: {
                id: e.data.id
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (1 == t.data.status) {
                    var i = t.data.info, o = (i.title, i.content);
                    a.wxParse("content", "html", o, e, 3), e.setData({
                        itemData: i,
                        bannerItem: i.img_arr,
                        commodityAttr: t.data.commodityAttr,
                        attrValueList: t.data.attrValueList
                    });
                } else wx.showToast({
                    title: t.data.err,
                    duration: 2e3
                });
            },
            error: function(t) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    }
});