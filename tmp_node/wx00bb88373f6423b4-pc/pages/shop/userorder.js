var t = getApp();

require("../../config.js");

Page({
    isloading: !1,
    onShareAppMessage: function() {
        return t.shareAppMessage();
    },
    onLoad: function(a) {
        var e = this;
        t.getPageUrl(this, a), t.registerGlobalFunctions(this), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    imgWidth: (t.windowWidth - 39) / 2,
                    scrollHeight: t.windowHeight - 44
                });
            }
        }), this.setData({
            queryparams: a
        }), this.loadOrder(!0), this.getBalanceNumber();
    },
    changeData: function() {
        this.loadOrder(!0);
    },
    backtrack: function() {
        var t = getCurrentPages();
        if (console.log(t), t.length > 1) {
            var a = t[t.length - 2];
            a && a.changeData([]);
        }
    },
    data: {
        integralFlag: !1,
        paymentPlugShow: !1,
        paymentFlag: 1,
        scrollCurrent: 0,
        balanceNumber: 0,
        falgAjax: !0,
        classid: 0,
        pagesize: 6,
        balanceflagNum: !1,
        recordcount: 99,
        orderlist: [],
        sortcol: "",
        sort: "",
        hasorder: !0,
        baseUrl: t.globalData.cdnBaseUrl,
        animationData: {},
        show: !0,
        plugNavFlag: !0,
        imgWidth: 0,
        status: "",
        orderid: 0,
        curOrderId: "",
        buttonClicked: !1
    },
    changePaymentWay: function(t) {
        this.data.balanceNumber - this.data.TotalMoeny < 0 || this.setData({
            paymentFlag: t.currentTarget.dataset.paymentflag
        });
    },
    closePaymentPlug: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "您确定要放弃支付吗？",
            success: function(a) {
                a.confirm ? t.setData({
                    paymentPlugShow: !1,
                    curOrderId: ""
                }) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    showPaymentPlug: function(t) {
        this.getBalanceNumber();
        var a = t.currentTarget.dataset.orderid, e = t.currentTarget.dataset.totalmoney;
        this.setData({
            paymentPlugShow: !0,
            balanceflagNum: this.data.balanceNumber - this.data.TotalMoeny < 0,
            paymentFlag: this.data.balanceNumber - this.data.TotalMoeny > 0 ? "1" : "2",
            curOrderId: a,
            TotalMoeny: e
        });
    },
    getBalanceNumber: function() {
        var a = this;
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/BaseApi&a=getBalance",
            method: "POST",
            success: function(t) {
                t.success && a.setData({
                    balanceNumber: t.balance
                });
            },
            fail: function(a) {
                t.showModal({
                    title: "提示",
                    content: "操作失败：" + a
                });
            }
        });
    },
    loadOrder: function(a) {
        var e = this;
        if (!e.isloading) {
            e.isloading = !0, a && (e.data.recordcount = 99, e.data.orderlist = []);
            var r = e.data.recordcount, o = e.data.orderlist.length;
            if (r > o && this.data.falgAjax) {
                this.setData({
                    falgAjax: !1
                });
                var n = Math.ceil(o / e.data.pagesize) + 1;
                e.data.queryparams.keyword && e.data.queryparams.keyword;
                e.data.queryparams.status && (e.data.status = e.data.queryparams.status), e.data.sortcol && "&sortcol=" + e.data.sortcol + "&sort=" + e.data.sort, 
                t.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=UserOrders&page=" + n + "&pagesize=" + e.data.pagesize + "&Status=" + e.data.status,
                    method: "GET",
                    success: function(a) {
                        if (e.isloading = !1, a.success) {
                            for (var r = 0; r < a.orderinfo.length; r++) 1 == a.orderinfo[r].Status || 7 == a.orderinfo[r].Status || 2 == a.orderinfo[r].Status ? a.orderinfo[r].show = !1 : a.orderinfo[r].show = !0, 
                            e.data.orderlist.push(a.orderinfo[r]), e.setData({
                                TotalMoeny: a.orderinfo[r].TotalMoeny
                            });
                            e.setData({
                                orederlist: e.data.orderlist,
                                Count: a.list.CountAll,
                                recordcount: a.recordcount,
                                hasorder: e.data.orderlist.length > 0,
                                falgAjax: !0,
                                siteID: t.globalData.baseInfo.SiteID,
                                orderstatus: a.OrderStatus
                            }), e.data.queryparams.status = null;
                        } else console.log("getProductList fail：" + a.msg), 1 == a.needLogin && wx.reLaunch({
                            url: "/pages/company/mycenter"
                        });
                    },
                    fail: function(t) {
                        e.isloading = !1, console.log("getProductList fail");
                    }
                });
            }
        }
    },
    onchangeOrder: function(t) {
        if (this.data.status == t.currentTarget.dataset.status) return !1;
        this.setData({
            status: t.currentTarget.dataset.status,
            scrollCurrent: 0
        }), this.isloading = !1, this.loadOrder(!0);
    },
    goOrderdetail: function(t) {
        var a = this;
        if (a.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            a.setData({
                buttonClicked: !1
            });
        }, 500), a.data.orderid == t.currentTarget.dataset.orderid) return !1;
        var e = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "orderdetail?id=" + e
        });
    },
    goOrderdetails: function(t) {
        var a = this;
        if (a.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            a.setData({
                buttonClicked: !1
            });
        }, 500), a.data.orderid == t.currentTarget.dataset.orderid) return !1;
        var e = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../purchaseLimitOrder/orderDetail?id=" + e
        });
    },
    goKuaidiUrl: function(t) {
        var a = t.currentTarget.dataset.company, e = t.currentTarget.dataset.postid;
        wx.navigateTo({
            url: "kuaidi100?company=" + a + "&postid=" + e
        });
    },
    ConfirmReceive: function(a) {
        var e = this, r = a.currentTarget.dataset.orderid, o = a.detail.formId;
        return wx.showModal({
            title: "提示",
            content: "确定收货吗？",
            success: function(a) {
                a.confirm ? t.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=ConfirmReceiving&orderid=" + r + "&formid=" + o,
                    method: "GET",
                    success: function(t) {
                        e.isloading = !1, t.success ? e.loadOrder(!0) : console.log("getProductList fail：" + t.msg);
                    },
                    fail: function(t) {
                        e.isloading = !1, console.log("getProductList fail");
                    }
                }) : a.cancel && console.log("用户点击取消");
            }
        }), !1;
    },
    Gopay: function(a) {
        var e = this.data.curOrderId, r = a.detail.formId, o = this, n = function(a) {
            var e = function() {
                o.loadOrder(!0), wx.navigateTo({
                    url: "orderdetail?id=" + a
                });
            };
            t.sendRequest({
                url: "/index.php?c=front/WxApp/ShopApi&a=payOrder",
                method: "POST",
                data: {
                    OrderID: a,
                    formid: r
                },
                success: function(a) {
                    a.success ? (o.loadOrder(!0), t.showModal({
                        title: "提示",
                        content: "支付成功",
                        confirm: e
                    })) : t.showModal({
                        title: "提示",
                        content: "支付失败：" + a.msg
                    });
                },
                fail: function(a) {
                    t.showModal({
                        title: "提示",
                        content: "支付失败：" + a
                    }), o.loadOrder(!0);
                }
            });
        };
        !function(a) {
            "1" === o.data.paymentFlag ? (o.setData({
                paymentPlugShow: !1
            }), n(a)) : "2" === o.data.paymentFlag && t.wxPay(a, {
                success: function() {
                    funcOnPaySuccess(a);
                },
                fail: function(t) {
                    wx.redirectTo({
                        url: "orderdetail?id=" + a
                    });
                }
            });
        }(e);
    },
    DeleteOrder: function(a) {
        var e = this, r = {
            orderid: a
        };
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=delOrder",
            method: "POST",
            data: r,
            success: function(a) {
                a.success ? e.loadOrder(!0) : t.showModal({
                    title: "提示",
                    content: "操作失败：" + a.msg
                });
            },
            fail: function(a) {
                t.showModal({
                    title: "提示",
                    content: "操作失败：" + a
                });
            }
        });
    },
    delCartItem: function(t) {
        var a = this, e = t.currentTarget.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确定删除吗？",
            success: function(t) {
                t.confirm ? a.DeleteOrder(e) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    DelOrder: function(a) {
        var e = this, r = a.currentTarget.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确定取消订单吗？",
            success: function(a) {
                a.confirm ? t.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=cancelOrder&orderid=" + r,
                    method: "GET",
                    success: function(t) {
                        this.isloading = !1, t.success ? e.loadOrder(!0) : console.log("getProductList fail：" + t.msg);
                    },
                    fail: function(t) {
                        this.isloading = !1, console.log("getProductList fail");
                    }
                }) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    onOrderListScroll: function(t) {
        this.loadOrder();
    },
    navBtnShowAndHide: function() {
        var t = !this.data.plugNavFlag;
        this.setData({
            plugNavFlag: t
        });
    }
});