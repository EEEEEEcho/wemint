var n = require("../../utils/wxapp.js");

Page({
    data: {
        couponsConfigId: "",
        merchantConfigId: "",
        smallOpenId: "",
        projectUrl: n.projectUrl
    },
    onLoad: function(n) {
        console.log(n), this.setData({
            couponsConfigId: n.couponsConfigId,
            merchantConfigId: n.merchantConfigId,
            smallOpenId: n.smallOpenId
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});