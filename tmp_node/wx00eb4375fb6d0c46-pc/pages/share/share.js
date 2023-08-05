getApp();

Page({
    data: {
        shareUrl: ""
    },
    onLoad: function(n) {
        console.log(n), this.setData({
            shareUrl: n.shareUrl
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});