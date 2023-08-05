function t(t, e, a) {
    wx.showLoading({
        title: "加载中...",
        mask: !0
    });
    var i = getApp().globalData, n = wx.getStorageSync("openId"), c = t.data.PageSize, o = i.apiurl + "order/info/list";
    wx.request({
        url: o,
        data: {
            openId: n,
            orderStatus: e,
            pageIndex: a,
            pageSize: c
        },
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            if (e.data.content.length < c) return t.data.IsLastPage = !0, t.setData({
                OrderList: e.data.content
            }), wx.hideLoading(), wx.showToast({
                title: "已到底",
                duration: 2e3
            }), !1;
            t.setData({
                OrderList: e.data.content
            }), wx.hideLoading();
        },
        fail: function() {
            wx.hideLoading(), wx.showToast({
                title: "获取列表失败",
                duration: 2e3
            });
        },
        complete: function() {}
    });
}

Page({
    data: {
        active1: !0,
        active2: !1,
        active3: !1,
        active4: !1,
        active5: !1,
        active6: !1,
        PageIndex: 1,
        PageSize: 3,
        OrderStatus: "All",
        OrderList: {},
        IsLastPage: !1
    },
    tabchang1: function() {
        this.setData({
            active1: !0,
            active2: !1,
            active3: !1,
            active4: !1,
            active5: !1,
            active6: !1,
            PageIndex: 1,
            OrderStatus: "All"
        }), t(this, this.data.OrderStatus, 1);
    },
    tabchang2: function() {
        this.setData({
            active1: !1,
            active2: !0,
            active3: !1,
            active4: !1,
            active5: !1,
            active6: !1,
            PageIndex: 1,
            OrderStatus: "WaitPay"
        }), t(this, this.data.OrderStatus, 1);
    },
    tabchang3: function() {
        this.setData({
            active1: !1,
            active2: !1,
            active3: !0,
            active4: !1,
            active5: !1,
            active6: !1,
            PageIndex: 1,
            OrderStatus: "WaitDeliver"
        }), t(this, this.data.OrderStatus, 1);
    },
    tabchang4: function() {
        this.setData({
            active1: !1,
            active2: !1,
            active3: !1,
            active4: !0,
            active5: !1,
            active6: !1,
            PageIndex: 1,
            OrderStatus: "WaitReceipt"
        }), t(this, this.data.OrderStatus, 1);
    },
    tabchang5: function() {
        this.setData({
            active1: !1,
            active2: !1,
            active3: !1,
            active4: !1,
            active5: !0,
            active6: !1,
            PageIndex: 1,
            OrderStatus: "WaiteValuate"
        }), t(this, this.data.OrderStatus, 1);
    },
    tabchang6: function() {
        this.setData({
            active1: !1,
            active2: !1,
            active3: !1,
            active4: !1,
            active5: !1,
            active6: !0,
            PageIndex: 1,
            OrderStatus: "Refund"
        }), t(this, this.data.OrderStatus, 1);
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        if ("" == wx.getStorageSync("UserInfo")) return wx.redirectTo({
            url: "/pages/login/login"
        }), !1;
        var e = this, a = e.data.OrderStatus, i = wx.getStorageSync("OrderStatusUserInfo");
        "0" == i ? (e.setData({
            active1: !0,
            active2: !1,
            active3: !1,
            active4: !1,
            active5: !1,
            active6: !1
        }), a = "All") : "1" == i ? (e.setData({
            active1: !1,
            active2: !0,
            active3: !1,
            active4: !1,
            active5: !1,
            active6: !1
        }), a = "WaitPay") : "2" == i ? (e.setData({
            active1: !1,
            active2: !1,
            active3: !0,
            active4: !1,
            active5: !1,
            active6: !1
        }), a = "WaitDeliver") : "3" == i ? (e.setData({
            active1: !1,
            active2: !1,
            active3: !1,
            active4: !0,
            active5: !1,
            active6: !1
        }), a = "WaitReceipt") : "4" == i ? (e.setData({
            active1: !1,
            active2: !1,
            active3: !1,
            active4: !1,
            active5: !0,
            active6: !1
        }), a = "WaiteValuate") : "5" == i && (e.setData({
            active1: !1,
            active2: !1,
            active3: !1,
            active4: !1,
            active5: !1,
            active6: !0
        }), a = "Refund"), t(this, a, 1);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        if (1 == this.data.PageIndex) return t(this, this.data.OrderStatus, 1), wx.showToast({
            title: "已到顶",
            duration: 2e3
        }), !1;
        this.data.IsLastPage = !1, t(this, this.data.OrderStatus, --this.data.PageIndex);
    },
    onReachBottom: function() {
        if (this.data.IsLastPage) return wx.showToast({
            title: "已到底",
            duration: 2e3
        }), !1;
        t(this, this.data.OrderStatus, ++this.data.PageIndex);
    },
    onShareAppMessage: function() {},
    onCancelOrder: function(e) {
        var a = getApp().globalData.apiurl + "order/info/cancel", i = e.target.id, n = this;
        wx.showModal({
            title: "确认取消",
            content: "确定取消订单吗？",
            success: function(e) {
                e.confirm && wx.request({
                    url: a,
                    data: {
                        orderId: i
                    },
                    method: "GET",
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        wx.showToast({
                            title: "确认取消成功",
                            duration: 2e3
                        }), t(n, n.data.OrderStatus, 1);
                    },
                    fail: function() {
                        wx.showToast({
                            title: "确认取消失败",
                            duration: 2e3
                        });
                    },
                    complete: function() {}
                });
            }
        });
    },
    onDeleteOrder: function(e) {
        var a = getApp().globalData.apiurl + "order/info/delete", i = e.target.id, n = this;
        wx.showModal({
            title: "确认删除",
            content: "确定删除订单吗？",
            success: function(e) {
                e.confirm && wx.request({
                    url: a,
                    data: {
                        orderId: i
                    },
                    method: "GET",
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        wx.showToast({
                            title: "确认删除成功",
                            duration: 2e3
                        }), t(n, n.data.OrderStatus, 1);
                    },
                    fail: function() {
                        wx.showToast({
                            title: "确认删除失败",
                            duration: 2e3
                        });
                    },
                    complete: function() {}
                });
            }
        });
    },
    onApplyRefund: function(e) {
        var a = getApp().globalData.apiurl + "order/info/refund", i = e.target.id, n = this;
        wx.showModal({
            title: "确认退款",
            content: "确定申请退款吗？",
            success: function(e) {
                e.confirm && wx.request({
                    url: a,
                    data: {
                        orderId: i
                    },
                    method: "GET",
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        wx.showToast({
                            title: "退款申请成功",
                            duration: 2e3
                        }), t(n, n.data.OrderStatus, 1);
                    },
                    fail: function() {
                        wx.showToast({
                            title: "退款申请失败",
                            duration: 2e3
                        });
                    },
                    complete: function() {}
                });
            }
        });
    },
    onReceiveOrder: function(e) {
        var a = getApp().globalData.apiurl + "order/info/receive", i = e.target.id, n = this;
        wx.showModal({
            title: "确认消费",
            content: "确定确认消费吗？",
            success: function(e) {
                e.confirm && wx.request({
                    url: a,
                    data: {
                        orderId: i
                    },
                    method: "GET",
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        wx.showToast({
                            title: "确认消费成功",
                            duration: 2e3
                        }), t(n, n.data.OrderStatus, 1);
                    },
                    fail: function() {
                        wx.showToast({
                            title: "确认消费失败",
                            duration: 2e3
                        });
                    },
                    complete: function() {}
                });
            }
        });
    },
    onRedirectToOrderInfo: function(t) {
        wx.navigateTo({
            url: "/pages/orderDetails/orderDetails?OrderID=" + t.currentTarget.id
        });
    },
    onGoPay: function(t) {
        wx.navigateTo({
            url: "/pages/submitOrder2/submitOrder2?OrderID=" + t.currentTarget.id,
            complete: function(t) {
                wx.setStorageSync("OrderStatusUserInfo", 1);
            }
        });
    }
});