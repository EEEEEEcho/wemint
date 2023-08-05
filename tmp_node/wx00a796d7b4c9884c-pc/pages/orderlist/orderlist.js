var e = getApp();

Page({
    data: {
        url: e.page.url,
        userid: "",
        order: [],
        checkinfo: "",
        orderid: "",
        order_sn: ""
    },
    orderShow: function(e) {
        console.log(e.currentTarget.dataset.id);
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../ordershow/ordershow?id=" + t
        });
    },
    topChange: function(e) {
        console.log(e.currentTarget.dataset.can), e.currentTarget.dataset.checkinfo ? (this.setData({
            checkinfo: e.currentTarget.dataset.checkinfo
        }), this.getOrder()) : (this.setData({
            checkinfo: ""
        }), this.getOrderAll());
    },
    pay: function(t) {
        this.setData({
            order_sn: t.currentTarget.dataset.sn
        }), wx.request({
            url: e.page.url + "/wx/Wxpay.php",
            method: "post",
            data: {
                order_sn: this.data.order_sn,
                uid: this.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                if (console.log(e), 1 == e.data.status) {
                    var t = e.data.arr;
                    wx.requestPayment({
                        timeStamp: t.timeStamp,
                        nonceStr: t.nonceStr,
                        package: t.package,
                        signType: "MD5",
                        paySign: t.paySign,
                        success: function(e) {
                            wx.showToast({
                                title: "支付成功!",
                                duration: 2e3
                            }), setTimeout(function() {
                                wx.navigateTo({
                                    url: "../order/order?nav=1"
                                });
                            }, 3e3);
                        },
                        fail: function(e) {
                            wx.showToast({
                                title: e,
                                icon: "none",
                                duration: 3e3
                            });
                        }
                    });
                } else wx.showToast({
                    title: e.data.err,
                    icon: "none",
                    duration: 2e3
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "网络异常！",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    confirm_goods: function(t) {
        var o = this;
        o.setData({
            orderid: t.currentTarget.dataset.id
        }), wx.request({
            url: e.page.url + "/wx/member.php?act=confirm_goods",
            method: "post",
            data: {
                orderid: o.data.orderid,
                userid: o.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e), 0 == e.data ? (wx.showToast({
                    title: "确认收货成功",
                    duration: 2e3,
                    icon: "success"
                }), o.getOrder()) : wx.showToast({
                    title: "确认收货失败",
                    duration: 2e3,
                    icon: "none"
                });
            }
        });
    },
    reject: function(t) {
        var o = this;
        o.setData({
            orderid: t.currentTarget.dataset.id
        }), wx.request({
            url: e.page.url + "/wx/member.php?act=reject_save",
            method: "post",
            data: {
                orderid: o.data.orderid,
                userid: o.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e), 0 == e.data ? (wx.showToast({
                    title: "申请退货成功",
                    duration: 2e3,
                    icon: "none"
                }), o.getOrder()) : wx.showToast({
                    title: "申请退货失败",
                    duration: 2e3,
                    icon: "none"
                });
            }
        });
    },
    refund: function(t) {
        var o = this;
        o.setData({
            orderid: t.currentTarget.dataset.id
        }), wx.request({
            url: e.page.url + "/wx/member.php?act=refund_save",
            method: "post",
            data: {
                orderid: o.data.orderid,
                userid: o.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e), 0 == e.data ? (wx.showToast({
                    title: "申请退款成功",
                    duration: 2e3,
                    icon: "success"
                }), o.getOrder()) : wx.showToast({
                    title: "申请退款失败",
                    duration: 2e3,
                    icon: "none"
                });
            }
        });
    },
    onLoad: function(e) {
        var t = this;
        wx.getStorage({
            key: "userid",
            success: function(o) {
                console.log(o), t.setData({
                    userid: o.data
                }), e.checkinfo ? (t.setData({
                    checkinfo: e.checkinfo
                }), t.getOrder()) : t.getOrderAll();
            }
        });
    },
    getOrder: function() {
        var t = this;
        wx.request({
            url: e.page.url + "/wx/member.php?act=order",
            method: "post",
            data: {
                checkinfo: t.data.checkinfo,
                userid: t.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e.data), t.setData({
                    order: e.data.order
                });
            }
        });
    },
    getOrderAll: function() {
        var t = this;
        console.log(t.data.checkinfo), wx.request({
            url: e.page.url + "/wx/member.php?act=order",
            method: "post",
            data: {
                userid: t.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e.data), t.setData({
                    order: e.data.order
                });
            }
        });
    },
    cancel: function(t) {
        var o = this;
        o.setData({
            orderid: t.currentTarget.dataset.id
        }), wx.showModal({
            title: "提示",
            content: "你确认取消订单吗",
            success: function(t) {
                t.confirm && wx.request({
                    url: e.page.url + "/wx/member.php?act=quxiao",
                    method: "post",
                    data: {
                        orderid: o.data.orderid
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        console.log(e.data), 0 == e.data ? (wx.showToast({
                            title: "取消成功",
                            icon: "success",
                            duration: 1e3
                        }), o.getOrderAll()) : wx.showToast({
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
        }), console.log(o.data.orderid);
    },
    view_moneysure: function() {
        var e = this.data.code;
        console.log("code是" + e), wx.request({
            url: url + "wx/pay_wx.php",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                code: e
            },
            method: "POST",
            success: function(e) {
                console.log(e.data), wx.requestPayment({
                    appId: e.data.appId,
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: "MD5",
                    paySign: e.data.paySign,
                    success: function(e) {
                        wx.showToast({
                            title: "支付成功"
                        }), console.log(e);
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarTitle({
            title: e.globalData.title
        }), this.data.checkinfo ? this.getOrder() : this.getOrderAll();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});