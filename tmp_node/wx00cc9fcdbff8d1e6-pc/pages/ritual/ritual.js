var t = getApp();

Page({
    data: {
        vou: []
    },
    getvou: function(o) {
        var e = o.currentTarget.dataset.vid, a = t.d.userId;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Voucher/get_voucher",
            method: "post",
            data: {
                vid: e,
                uid: a
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                1 == t.data.status ? wx.showToast({
                    title: "领取成功！",
                    duration: 2e3
                }) : wx.showToast({
                    title: t.data.err,
                    duration: 2e3
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    onLoad: function(o) {
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Voucher/index",
            method: "post",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var o = t.data.vou;
                e.setData({
                    vou: o
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