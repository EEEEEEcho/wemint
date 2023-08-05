var a = getApp();

Page({
    data: {
        pageSize: 10,
        pageIndex: 1,
        CountDownList: null
    },
    onLoad: function(a) {
        this.loadData(this, !1);
    },
    loadData: function(t, n) {
        wx.showNavigationBarLoading(), wx.request({
            url: a.getUrl("GetCountDownList"),
            data: {
                pageIndex: t.data.pageIndex,
                pageSize: t.data.pageSize
            },
            success: function(a, n) {
                if ("OK" == a.data.Status) {
                    var o = a.data.Data;
                    if (n) {
                        var e = t.data.CountDownList;
                        e.push.apply(e, o), t.setData({
                            CountDownList: e
                        });
                    } else t.setData({
                        CountDownList: o
                    });
                } else wx.showModal({
                    title: "提示",
                    content: a.data.Message,
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            },
            complete: function() {
                wx.hideNavigationBarLoading();
            }
        });
    },
    BuyCountDown: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../countdowndetail/countdowndetail?id=" + t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        var a = this.data.pageIndex;
        this.setData({
            pageIndex: a++
        }), this.loadData(this, !0);
    }
});