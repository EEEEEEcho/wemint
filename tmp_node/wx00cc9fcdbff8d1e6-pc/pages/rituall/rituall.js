var t = getApp();

Page({
    data: {
        vou: []
    },
    like: function(t) {
        console.log(t.currentTarget.dataset.title), wx.navigateTo({
            url: "../index/detail?title=" + t.currentTarget.dataset.title,
            success: function(t) {},
            fail: function() {},
            complete: function() {}
        });
    },
    onLoad: function(e) {
        var o = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/User/voucher",
            method: "post",
            data: {
                uid: t.d.userId
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var e = t.data.nouses;
                1 == t.data.status ? o.setData({
                    vou: e
                }) : wx.showToast({
                    title: t.data.err,
                    duration: 2e3
                });
            },
            error: function(t) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});