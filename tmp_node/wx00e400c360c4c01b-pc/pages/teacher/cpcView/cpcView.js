function c(c, n) {
    wx.request({
        url: t.localUrl + "mobileXcx/cpcView",
        data: {
            cpc_id: c
        },
        header: {
            "content-type": "application/json"
        },
        success: function(c) {
            n(c.data.dataInfo);
        }
    });
}

var t = require("../../../utils/main.js");

require("../../../utils/util.js"), getApp();

Page({
    data: {
        cpc: [],
        csccbList: {},
        cpctrList: {}
    },
    onLoad: function(t) {
        var n = this;
        c(t.cpc_id, function(c) {
            n.setData({
                cpc: c.pojo,
                csccbList: c.csccbList,
                cpctrList: c.cpctrList
            });
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