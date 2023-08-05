var t = getApp();

require("../../utils/common.js");

Page({
    data: {
        winWidth: 0,
        winHeight: 0,
        currentTab: 0,
        isStatus: "pay",
        page: 0,
        refundpage: 0,
        orderList0: [],
        orderList1: [],
        orderList2: [],
        orderList3: [],
        orderList4: []
    },
    onLoad: function(t) {
        this.initSystemInfo(), this.setData({
            currentTab: parseInt(t.currentTab),
            isStatus: t.otype
        }), 4 == this.data.currentTab ? this.loadReturnOrderList() : this.loadOrderList();
    },
    getOrderStatus: function() {
        return 0 == this.data.currentTab ? 1 : 2 == this.data.currentTab ? 2 : 3 == this.data.currentTab ? 3 : 0;
    },
    removeOrder: function(e) {
        var a = this, r = e.currentTarget.dataset.orderId;
        wx.showModal({
            title: "提示",
            content: "你确定要取消订单吗？",
            success: function(e) {
                e.confirm && wx.request({
                    url: t.d.ceshiUrl + "/Api/Order/orders_edit",
                    method: "post",
                    data: {
                        id: r,
                        type: "cancel"
                    },
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        1 == t.data.status ? (wx.showToast({
                            title: "操作成功！",
                            duration: 2e3
                        }), a.loadOrderList()) : wx.showToast({
                            title: t.data.err,
                            duration: 2e3
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "网络异常！",
                            duration: 2e3
                        });
                    }
                });
            }
        });
    },
    recOrder: function(e) {
        var a = this, r = e.currentTarget.dataset.orderId;
        wx.showModal({
            title: "提示",
            content: "你确定已收到宝贝吗？",
            success: function(e) {
                e.confirm && wx.request({
                    url: t.d.ceshiUrl + "/Api/Order/orders_edit",
                    method: "post",
                    data: {
                        id: r,
                        type: "receive"
                    },
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        1 == t.data.status ? (wx.showToast({
                            title: "操作成功！",
                            duration: 2e3
                        }), a.loadOrderList()) : wx.showToast({
                            title: t.data.err,
                            duration: 2e3
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "网络异常！",
                            duration: 2e3
                        });
                    }
                });
            }
        });
    },
    loadOrderList: function() {
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Order/index",
            method: "post",
            data: {
                uid: t.d.userId,
                order_type: e.data.isStatus,
                page: e.data.page
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                t.data.status;
                var a = t.data.ord;
                switch (e.data.currentTab) {
                  case 0:
                    e.setData({
                        orderList0: a
                    });
                    break;

                  case 1:
                    e.setData({
                        orderList1: a
                    });
                    break;

                  case 2:
                    e.setData({
                        orderList2: a
                    });
                    break;

                  case 3:
                    e.setData({
                        orderList3: a
                    });
                    break;

                  case 4:
                    e.setData({
                        orderList4: a
                    });
                }
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    loadReturnOrderList: function() {
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Order/order_refund",
            method: "post",
            data: {
                uid: t.d.userId,
                page: e.data.refundpage
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data.ord;
                1 == t.data.status ? e.setData({
                    orderList4: e.data.orderList4.concat(a)
                }) : wx.showToast({
                    title: t.data.err,
                    duration: 2e3
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    initSystemInfo: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    winWidth: e.windowWidth,
                    winHeight: e.windowHeight
                });
            }
        });
    },
    bindChange: function(t) {
        this.setData({
            currentTab: t.detail.current
        });
    },
    swichNav: function(t) {
        var e = this;
        if (e.data.currentTab === t.target.dataset.current) return !1;
        var a = t.target.dataset.current;
        switch (e.setData({
            currentTab: parseInt(a),
            isStatus: t.target.dataset.otype
        }), e.data.currentTab) {
          case 0:
            !e.data.orderList0.length && e.loadOrderList();
            break;

          case 1:
            !e.data.orderList1.length && e.loadOrderList();
            break;

          case 2:
            !e.data.orderList2.length && e.loadOrderList();
            break;

          case 3:
            !e.data.orderList3.length && e.loadOrderList();
            break;

          case 4:
            e.data.orderList4.length = 0, e.loadReturnOrderList();
        }
    },
    payOrderByWechat: function(e) {
        var a = e.currentTarget.dataset.orderId, r = e.currentTarget.dataset.ordersn;
        if (!r) return wx.showToast({
            title: "订单异常!",
            duration: 2e3
        }), !1;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Wxpay/wxpay",
            data: {
                order_id: a,
                order_sn: r,
                uid: t.d.userId
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (1 == t.data.status) {
                    var e = t.data.arr;
                    wx.requestPayment({
                        timeStamp: e.timeStamp,
                        nonceStr: e.nonceStr,
                        package: e.package,
                        signType: "MD5",
                        paySign: e.paySign,
                        success: function(t) {
                            wx.showToast({
                                title: "支付成功!",
                                duration: 2e3
                            }), setTimeout(function() {
                                wx.navigateTo({
                                    url: "../user/dingdan?currentTab=1&otype=deliver"
                                });
                            }, 3e3);
                        },
                        fail: function(t) {
                            wx.showToast({
                                title: t,
                                duration: 3e3
                            });
                        }
                    });
                } else wx.showToast({
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
    }
});