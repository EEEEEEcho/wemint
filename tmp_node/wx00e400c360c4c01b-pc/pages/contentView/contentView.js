Page({
    data: {
        model: {}
    },
    onLoad: function(n) {
        var o = JSON.parse(n.model);
        this.setData({
            model: o
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