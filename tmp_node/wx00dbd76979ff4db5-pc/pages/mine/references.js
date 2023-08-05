var n = getApp(), a = n.globalData.rootPath;

Page({
    data: {},
    onLoad: function(e) {
        wx.hideShareMenu();
        var o = this;
        wx.request({
            url: a + "/admin/xcx/user",
            data: {
                openid: n.globalData.openid
            },
            method: "POST",
            success: function(n) {
                console.log(n);
                var e = n.data.references;
                wx.request({
                    url: a + "/admin/xcx/references",
                    data: {
                        tuijian: e
                    },
                    method: "POST",
                    success: function(n) {
                        console.log(n), n.data ? o.setData({
                            name: n.data
                        }) : o.setData({
                            name: "无"
                        });
                    }
                });
            }
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