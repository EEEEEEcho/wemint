Page({
    data: {
        backUrl: "pages/index/index"
    },
    onLoad: function(n) {
        n.backUrl && this.setData({
            backUrl: n.backUrl
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onGotUserInfo: function(n) {
        var o = this;
        getApp().getUnionId(function() {
            wx.redirectTo({
                url: "/" + o.data.backUrl
            });
        });
    }
});