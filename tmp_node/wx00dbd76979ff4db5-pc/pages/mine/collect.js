var t = getApp(), a = t.globalData.rootPath;

Page({
    data: {
        path: a
    },
    onLoad: function(o) {
        var n = this;
        wx.request({
            url: a + "/admin/xcx/user",
            data: {
                openid: t.globalData.openid
            },
            method: "POST",
            success: function(t) {
                console.log(t);
                var o = t.data.id;
                wx.request({
                    url: a + "/admin/xcx/collectlist",
                    data: {
                        uid: o
                    },
                    method: "POST",
                    success: function(t) {
                        console.log(t), n.setData({
                            list: t.data.list
                        });
                    }
                });
            }
        });
    },
    detail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/cars/detail?id=" + a
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