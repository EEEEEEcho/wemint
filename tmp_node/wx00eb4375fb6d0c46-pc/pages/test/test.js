require("../../utils/wxapp.js"), require("../../utils/wxcomm.js"), getApp();

Page({
    data: {
        title: "",
        imageUrl: "",
        url: "",
        shareMode: "",
        notice: ""
    },
    onLoad: function(e) {
        console.log(e), this.setData({
            title: e.title,
            imageUrl: e.imgUrl,
            url: e.url,
            notice: e.notice,
            shareMode: e.shareMode
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: this.data.title,
            path: "/pages/share/share?shareUrl=" + this.data.url,
            imageUrl: this.data.imageUrl
        };
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});