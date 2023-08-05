var n = require("../../utils/wxapp.js");

Page({
    data: {
        indicatorDots: !1,
        vertical: !1,
        autoplay: !1,
        circular: !0,
        interval: 2e3,
        duration: 500,
        previousMargin: 50,
        nextMargin: 50,
        time: new Date().getTime(),
        projectUrl: n.projectUrl,
        openId: wx.getStorageSync("user").openId
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