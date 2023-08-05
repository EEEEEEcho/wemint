Page({
    data: {},
    calling: function() {
        wx.makePhoneCall({
            phoneNumber: "18670142616"
        });
    },
    calling1: function() {
        wx.makePhoneCall({
            phoneNumber: "18670142616"
        });
    },
    touchEnd: function(n) {
        wx.navigateBack({
            delta: 1
        });
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});