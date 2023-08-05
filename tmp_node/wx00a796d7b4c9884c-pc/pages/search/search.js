Page({
    data: {
        keyword: ""
    },
    searchInp: function(n) {
        this.setdata({
            keyword: n.detail.value
        });
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarTitle({
            title: app.globalData.title
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});