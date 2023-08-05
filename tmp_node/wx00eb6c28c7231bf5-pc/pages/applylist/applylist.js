var a = getApp();

Page({
    data: {
        pageIndex: 1,
        pageSize: 10,
        AfterList: null
    },
    onLoad: function(a) {
        var t = this;
        t.loadData(t, !1);
    },
    loadData: function(t, e) {
        a.getOpenId(function(n) {
            wx.request({
                url: a.getUrl("GetAllAfterSaleList"),
                data: {
                    openId: n,
                    pageIndex: t.data.PageIndex,
                    pageSize: t.data.PageSize
                },
                success: function(a) {
                    if ("OK" == a.data.Status) {
                        var n = a.data.Data;
                        if (e) {
                            var o = t.data.AfterList;
                            o.push.apply(o, n), t.setData({
                                AfterList: o
                            });
                        } else t.setData({
                            AfterList: n
                        });
                    } else "NOUser" == a.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: a.data.Message,
                        showCancel: !1,
                        success: function(a) {
                            a.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            });
        });
    },
    applydetail: function(a) {
        var t = a.currentTarget.dataset.type, e = a.currentTarget.dataset.id;
        0 == t ? wx.navigateTo({
            url: "../refunddetail/refunddetail?id=" + e
        }) : wx.navigateTo({
            url: "../returndetail/returndetail?id=" + e
        });
    },
    SendGood: function(a) {
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.skuId;
        wx.navigateTo({
            url: "../applysendgood/applysendgood?id=" + t + "&&skuId=" + e
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