var o = require("../../utils/wxapp.js");

Page({
    data: {
        merchantConfigId: "",
        promoteId: "",
        openId: "",
        projectUrl: o.projectUrl
    },
    onLoad: function(o) {
        this.setData({
            merchantConfigId: o.merchantConfigId,
            promoteId: o.promoteId,
            openId: o.openId
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