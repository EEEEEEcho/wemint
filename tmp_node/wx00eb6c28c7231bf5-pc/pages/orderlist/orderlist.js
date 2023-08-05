var t = getApp();

Page({
    data: {
        Status: 0,
        OrderList: null,
        AllActive: "active",
        WaitPayActive: "",
        WaitSendActive: "",
        WaitReceiveActive: "",
        PageIndex: 1,
        PageSize: 10
    },
    onLoad: function(t) {
        var e = t.status;
        "" != t.status && void 0 != t.status || (e = 0);
        var a = this;
        a.loadData(e, a, !1);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        var t = this, e = t.data.PageIndex + 1;
        t.setData({
            PageIndex: e
        }), t.loadData(t.data.Status, t, !0);
    },
    closeOrder: function(e) {
        var a = this, r = e.target.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确定要取消订单吗？",
            success: function(e) {
                e.confirm && t.getOpenId(function(e) {
                    wx.request({
                        url: t.getUrl("CloseOrder"),
                        data: {
                            openId: e,
                            orderId: r
                        },
                        success: function(t) {
                            "OK" == t.data.Status ? wx.showModal({
                                title: "提示",
                                content: t.data.Message,
                                showCancel: !1,
                                success: function(t) {
                                    t.confirm && wx.navigateTo({
                                        url: "../orderlist/orderlist?status=" + a.data.Status
                                    });
                                }
                            }) : "NOUser" == t.data.Message ? wx.redirectTo({
                                url: "../login/login"
                            }) : wx.showModal({
                                title: "提示",
                                content: t.data.Message,
                                showCancel: !1
                            });
                        }
                    });
                });
            }
        });
    },
    orderPay: function(e) {
        var a = this, r = e.currentTarget.dataset.orderid;
        t.orderPay(r, a.data.Status, !0);
    },
    orderFinish: function(e) {
        var a = this, r = e.currentTarget.dataset.orderid;
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("FinishOrder"),
                data: {
                    openId: e,
                    orderId: r
                },
                success: function(t) {
                    "OK" == t.data.Status ? wx.showModal({
                        title: "提示",
                        content: "确认收货成功！",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateTo({
                                url: "../orderlist/orderlist?status=" + a.data.Status
                            });
                        }
                    }) : "NOUser" == t.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1
                    });
                }
            });
        });
    },
    onTabClick: function(t) {
        var e = this, a = t.currentTarget.dataset.status;
        e.setData({
            PageIndex: 1
        }), e.loadData(a, e, !1);
    },
    showLogistics: function(t) {
        var e = t.currentTarget.dataset.orderid;
        wx.redirectTo({
            url: "../logistics/logistics?orderid=" + e
        });
    },
    goToOrderDetail: function(t) {
        var e = t.currentTarget.dataset.orderid;
        wx.redirectTo({
            url: "../orderdetails/orderdetails?orderid=" + e
        });
    },
    RefundOrder: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.money;
        wx.redirectTo({
            url: "../ApplyRefund/ApplyRefund?orderid=" + e + "&&m=" + a
        });
    },
    ReturnsOrder: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.skuId, r = t.currentTarget.dataset.skuname, i = t.currentTarget.dataset.num, s = t.currentTarget.dataset.money;
        wx.redirectTo({
            url: "../ApplyReturns/ApplyReturns?orderid=" + e + "&&skuId=" + a + "&&pro=" + r + "&&num=" + i + "&&m=" + s
        });
    },
    loadData: function(e, a, r) {
        this.pageActive(e, a), t.getOpenId(function(i) {
            wx.request({
                url: t.getUrl("OrderList"),
                data: {
                    openId: i,
                    status: e,
                    pageIndex: a.data.PageIndex,
                    pageSize: a.data.PageSize
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var i = t.data.Data;
                        if (r) {
                            var s = a.data.OrderList;
                            s.push.apply(s, i), a.setData({
                                OrderList: s
                            });
                        } else a.setData({
                            Status: e,
                            OrderList: i
                        });
                    } else "NOUser" == t.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            });
        });
    },
    pageActive: function(t, e) {
        0 == t ? e.setData({
            AllActive: "active",
            WaitPayActive: "",
            WaitSendActive: "",
            WaitReceiveActive: ""
        }) : 1 == t ? e.setData({
            AllActive: "",
            WaitPayActive: "active",
            WaitSendActive: "",
            WaitReceiveActive: ""
        }) : 2 == t ? e.setData({
            AllActive: "",
            WaitPayActive: "",
            WaitSendActive: "active",
            WaitReceiveActive: ""
        }) : 3 == t && e.setData({
            AllActive: "",
            WaitPayActive: "",
            WaitSendActive: "",
            WaitReceiveActive: "active"
        });
    }
});