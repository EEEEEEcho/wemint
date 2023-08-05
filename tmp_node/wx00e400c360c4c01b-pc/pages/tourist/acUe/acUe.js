var a = require("../../../utils/main.js"), t = require("../../../wxParse/wxParse.js"), o = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var e = this;
        wx.request({
            url: a.localUrl + "mobileXcx/initialization",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                o.globalData.menuList = a.data.dataInfo.menuList, o.globalData.posterList = a.data.dataInfo.posterList, 
                o.globalData.qrcode = a.data.dataInfo.qrcode, o.globalData.mobile = a.data.dataInfo.phone, 
                o.globalData.acList = a.data.dataInfo.acList;
            }
        });
        for (var i = o.globalData.acList, l = n.alias, s = 0; s < i.length; s++) i[s][0] == l && null != i[s][1] && t.wxParse("aboutus", "html", i[s][1], e, 5);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});