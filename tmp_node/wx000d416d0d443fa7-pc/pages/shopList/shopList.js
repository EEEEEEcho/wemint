require("../../utils/server"), require("../../config.js");

Page({
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "店铺列表"
        }), this.setData({
            listId: t.ListId
        }), this.getInitData(t), this.sendSortArg();
    },
    onReachBottom: function() {
        var t = this.data.page + 1;
        this.sendSortArg(t);
    },
    data: {
        imgUrls: [ "../../images/banner.jpg" ],
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3
    },
    getInitData: function(t) {
        var a = wx.getStorageSync("bannerImg").imgSrc;
        this.setData({
            imgUrls: a
        });
    },
    sendSortArg: function(t) {
        t || (t = 1);
        var a = {
            sortTypeNum: 0,
            page: t,
            sortid: this.data.listId
        };
        this.setData({
            sortList: a,
            page: t
        });
    }
});