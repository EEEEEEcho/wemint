var t = getApp();

Page({
    data: {
        url: t.page.url,
        id: "",
        userid: "",
        order: [],
        goods: []
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            id: t.id
        }), wx.getStorage({
            key: "userid",
            success: function(t) {
                e.setData({
                    userid: t.data
                }), e.orderDetail();
            }
        });
    },
    orderDetail: function() {
        var e = this;
        wx.request({
            url: t.page.url + "/wx/member.php?act=ordercontent",
            method: "post",
            data: {
                userid: e.data.userid,
                orderid: e.data.id
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t), e.setData({
                    order: t.data.order,
                    goods: t.data.goodslist,
                    totalprice: parseFloat(t.data.order.orderamount) + parseFloat(t.data.order.quan) - parseFloat(t.data.order.cost)
                });
            },
            error: function(t) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            },
            complete: function() {}
        });
    },
    cancel: function(e) {
        var o = this;
        o.setData({
            orderid: e.currentTarget.dataset.id
        }), wx.showModal({
            title: "提示",
            content: "你确认取消订单吗",
            success: function(e) {
                e.confirm && wx.request({
                    url: t.page.url + "/wx/member.php?act=quxiao",
                    method: "post",
                    data: {
                        orderid: o.data.orderid
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        console.log(t.data), 0 == t.data ? (wx.showToast({
                            title: "取消成功",
                            icon: "success",
                            duration: 1e3
                        }), o.orderDetail()) : wx.showToast({
                            title: "取消失败",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3,
                    icon: "none"
                });
            }
        });
    },
    confirm_goods: function(e) {
        var o = this;
        o.setData({
            orderid: e.currentTarget.dataset.id
        }), console.log(o.data.orderid), console.log(o.data.userid), wx.request({
            url: t.page.url + "/wx/member.php?act=confirm_goods",
            method: "post",
            data: {
                orderid: o.data.orderid,
                userid: o.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t), 0 == t.data ? (wx.showToast({
                    title: "确认收货成功",
                    duration: 2e3,
                    icon: "none"
                }), o.orderDetail()) : wx.showToast({
                    title: "确认收货失败",
                    duration: 2e3,
                    icon: "none"
                });
            }
        });
    },
    reject: function(e) {
        var o = this;
        o.setData({
            orderid: e.currentTarget.dataset.id
        }), wx.request({
            url: t.page.url + "/wx/member.php?act=reject_save",
            method: "post",
            data: {
                orderid: o.data.orderid,
                userid: o.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t), 0 == t.data ? (wx.showToast({
                    title: "申请退货成功",
                    duration: 2e3,
                    icon: "success"
                }), o.orderDetail()) : wx.showToast({
                    title: "申请退货失败",
                    duration: 2e3,
                    icon: "none"
                });
            }
        });
    },
    refund: function(e) {
        var o = this;
        o.setData({
            orderid: e.currentTarget.dataset.id
        }), wx.request({
            url: t.page.url + "/wx/member.php?act=refund_save",
            method: "post",
            data: {
                orderid: o.data.orderid,
                userid: o.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t), 0 == t.data ? (wx.showToast({
                    title: "申请退款成功",
                    duration: 2e3,
                    icon: "success"
                }), o.orderDetail()) : wx.showToast({
                    title: "申请退款失败",
                    duration: 2e3,
                    icon: "none"
                });
            }
        });
    },
    pay: function(e) {
        this.setData({
            order_sn: e.currentTarget.dataset.sn
        }), wx.request({
            url: t.page.url + "/wx/Wxpay.php",
            method: "post",
            data: {
                order_sn: this.data.order_sn,
                uid: this.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (console.log(t), 1 == t.data.status) {
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
                                    url: "../orderlist/orderlist?checkinfo=1"
                                });
                            }, 3e3);
                        },
                        fail: function(t) {
                            wx.showToast({
                                title: 1,
                                icon: "none",
                                duration: 3e3
                            });
                        },
                        complete: function(t) {
                            console.log(t), wx.showToast({
                                title: "取消支付",
                                icon: "none",
                                duration: 3e3
                            }), wx.navigateTo({
                                url: "../orderlist/orderlist?checkinfo=0"
                            });
                        }
                    });
                } else wx.showToast({
                    title: 2,
                    icon: "none",
                    duration: 2e3
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "网络异常！",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarTitle({
            title: t.globalData.title
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});