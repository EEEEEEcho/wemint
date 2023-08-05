var n = getApp();

Page({
    data: {
        language: {}
    },
    onLoad: function(o) {
        this.setData({
            language: n.globalData.language
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});