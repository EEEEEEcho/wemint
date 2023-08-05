function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = getApp(), r = (require("../../components/utils/imgutil.js"), require("../../common.js"));

Page((e = {
    isloading: !1,
    bannerLoaded: !1,
    url: !1,
    onShareAppMessage: function() {
        return a.shareAppMessage({
            url: this.url,
            title: this.data.productInfo.Name
        });
    },
    onLoad: function(t) {
        var e = this;
        e.url = a.getPageUrl(e, t), a.registerGlobalFunctions(e), r.initCommonModules(), 
        this.setData({
            queryparams: t,
            hasrefunds: ""
        }), this.loadOrder();
    },
    onShow: function() {
        this.loadOrder();
    },
    onPageScroll: function() {},
    changeData: function(t) {
        this.loadOrder();
    },
    backtrack: function() {
        var t = getCurrentPages();
        if (t.length > 1) {
            var e = t[t.length - 2];
            e && e.changeData([]);
        }
    },
    data: {
        currentTab: 0,
        baseUrl: a.globalData.cdnBaseUrl,
        shows: !0,
        intervalTime: {
            minutes: 0,
            seconds: 0
        },
        interval: null
    },
    loadOrder: function() {
        var t = this;
        if (!t.isloading) {
            t.isloading = !0;
            var e = 0;
            t.data.queryparams.id && (e = t.data.queryparams.id), a.sendRequest({
                url: "/index.php?c=Front/WxApp/ShopApi&a=OrderDetail&ID=" + e,
                method: "GET",
                success: function(e) {
                    if (t.isloading = !1, e.success) {
                        0 == e.data.Status && (e.data.Status = "未付款"), 1 != e.data.Status && 7 != e.data.Status || (e.data.Status = "等待卖家发货"), 
                        3 != e.data.Status && 8 != e.data.Status || (e.data.Status = "等待买家收货"), 2 == e.data.Status && (e.data.Status = "已完成"), 
                        6 == e.data.Status && (e.data.Status = "退款完成"), 9 == e.data.Status && (e.data.Status = "未取货"), 
                        4 == e.data.Status && (e.data.Status = "交易关闭");
                        for (var r = 0; r < e.data.ProductList.length; r++) e.data.ProductList[r].RefundStatus ? e.data.ProductList[r].hasrefunds = !0 : e.data.ProductList[r].hasrefunds = !1;
                        t.setData({
                            orderinfo: e.data,
                            siteID: a.globalData.baseInfo.SiteID
                        });
                        var n = e.data.OrderLeftTime;
                        t.data.interval = setInterval(function() {
                            --n <= 0 && (n = 0, clearInterval(t.data.interval)), t.forMatterTime(n);
                        }, 1e3);
                    } else console.log("getProductInfo fail：" + e.msg);
                },
                fail: function(e) {
                    t.isloading = !1, console.log("getProductInfo fail");
                }
            });
        }
    },
    forMatterTime: function(t) {
        var e = parseInt(t / 60 % 60, 10), a = parseInt(t % 60, 10);
        e = this.checkTime(e), a = this.checkTime(a), this.setData({
            intervalTime: {
                minutes: e,
                seconds: a
            }
        });
    },
    checkTime: function(t) {
        return t < 10 && (t = "0" + t), t;
    },
    goRefunds: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.pkey;
        wx.navigateTo({
            url: "../shop/refundreson?orderid=" + e + "&pkey=" + a
        });
    },
    goRefundsuc: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.pkey;
        wx.navigateTo({
            url: "../shop/refundsuc?orderid=" + e + "&pkey=" + a
        });
    },
    goRefundfail: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.pkey;
        wx.navigateTo({
            url: "../shop/refundfail?orderid=" + e + "&pkey=" + a
        });
    },
    goRefundsWuliu: function(t) {
        var e = t.currentTarget.dataset.pkey;
        wx.navigateTo({
            url: "../shop/refundswuliu?pkey=" + e
        });
    },
    ConfirmReceive: function(t) {
        var e = this, r = t.currentTarget.dataset.orderid, n = t.detail.formId;
        return wx.showModal({
            title: "提示",
            content: "确定收货吗？",
            success: function(t) {
                t.confirm ? a.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=ConfirmReceiving&orderid=" + r + "&formid=" + n,
                    method: "GET",
                    success: function(t) {
                        e.isloading = !1, t.success ? e.loadOrder(!0) : console.log("getProductList fail：" + t.msg);
                    },
                    fail: function(t) {
                        e.isloading = !1, console.log("getProductList fail");
                    }
                }) : t.cancel && console.log("用户点击取消");
            }
        }), !1;
    },
    goKuaidiUrl: function(t) {
        var e = t.currentTarget.dataset.company, a = t.currentTarget.dataset.postid;
        wx.navigateTo({
            url: "../shop/kuaidi100?company=" + e + "&postid=" + a
        });
    },
    DelOrder: function(t) {
        var e = t.currentTarget.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确定取消订单吗？",
            success: function(t) {
                t.confirm ? a.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=cancelOrder&orderid=" + e,
                    method: "GET",
                    success: function(t) {
                        this.isloading = !1, t.success ? wx.reLaunch({
                            url: "userorder?status=0"
                        }) : console.log("getProductList fail：" + t.msg);
                    },
                    fail: function(t) {
                        this.isloading = !1, console.log("getProductList fail");
                    }
                }) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    Gopay: function(t) {
        var e = this, r = t.currentTarget.dataset.orderid;
        console.log(r);
        var n = function(t) {
            a.sendRequest({
                url: "/index.php?c=front/WxApp/ShopApi&a=payOrder",
                method: "POST",
                data: {
                    OrderID: t
                },
                success: function(t) {
                    t.success ? a.showModal({
                        title: "提示",
                        content: "交费成功"
                    }) : a.showModal({
                        title: "提示",
                        content: "交费失败：" + t.msg
                    }), e.backtrack(), wx.navigateTo({
                        url: "userorder"
                    });
                },
                fail: function(t) {
                    a.showModal({
                        title: "提示",
                        content: "交费失败：" + t
                    }), wx.reLaunch({
                        url: "userorder"
                    });
                }
            });
        }, o = function(t) {
            n(t);
        };
        !function(t) {
            a.wxPay(t, {
                success: function() {
                    o(t);
                },
                fail: function(t) {
                    e.loadOrder(!0);
                }
            });
        }(r);
    },
    navbarTap: function(t) {
        this.setData({
            currentTab: t.currentTarget.dataset.idx
        });
    },
    showPaymentPlug: function(t) {
        this.getBalanceNumber();
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.totalmoney;
        t.currentTarget.dataset.ordertype;
        this.setData({
            paymentPlugShow: !0,
            balanceflagNum: this.data.balanceNumber - this.data.TotalMoeny < 0,
            paymentFlag: this.data.balanceNumber - this.data.TotalMoeny > 0 ? "1" : "2",
            curOrderId: e,
            TotalMoeny: a
        });
    },
    getBalanceNumber: function() {
        var t = this;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/BaseApi&a=getBalance",
            method: "POST",
            success: function(e) {
                e.success && t.setData({
                    balanceNumber: e.balance
                });
            },
            fail: function(t) {
                a.showModal({
                    title: "提示",
                    content: "操作失败：" + t
                });
            }
        });
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
            success: function(e) {
                e.confirm ? t.setData({
                    paymentPlugShow: !1,
                    curOrderId: ""
                }) : e.cancel && console.log("用户点击取消");
            }
        });
    }
}, t(e, "Gopay", function(t) {
    var e = this.data.curOrderId, r = t.detail.formId, n = this.data.queryparams.orderType, o = this, s = function(e) {
        var s = function() {
            o.loadOrder(!0), 22 == n ? wx.redirectTo({
                url: "../purchaseLimitOrder/orderDetail?id=" + e + "&orderType=" + t.currentTarget.dataset.ordertype
            }) : wx.redirectTo({
                url: "orderdetail?id=" + e
            });
        };
        a.sendRequest({
            url: "/index.php?c=front/WxApp/ShopApi&a=payOrder",
            method: "POST",
            data: {
                OrderID: e,
                formid: r
            },
            success: function(t) {
                t.success ? (o.loadOrder(!0), a.showModal({
                    title: "提示",
                    content: "支付成功",
                    confirm: s
                })) : a.showModal({
                    title: "提示",
                    content: "支付失败：" + t.msg
                });
            },
            fail: function(t) {
                a.showModal({
                    title: "提示",
                    content: "支付失败：" + t
                }), o.loadOrder(!0);
            }
        });
    };
    !function(t) {
        "1" === o.data.paymentFlag ? (o.setData({
            paymentPlugShow: !1
        }), s(t)) : "2" === o.data.paymentFlag && a.wxPay(t, {
            success: function() {
                funcOnPaySuccess(t);
            },
            fail: function(e) {
                wx.redirectTo({
                    url: "orderdetail?id=" + t
                });
            }
        });
    }(e);
}), t(e, "DeleteOrder", function(t) {
    var e = this, r = {
        orderid: t
    };
    a.sendRequest({
        url: "/index.php?c=Front/WxApp/ShopApi&a=delOrder",
        method: "POST",
        data: r,
        success: function(t) {
            t.success ? e.loadOrder(!0) : a.showModal({
                title: "提示",
                content: "操作失败：" + t.msg
            });
        },
        fail: function(t) {
            a.showModal({
                title: "提示",
                content: "操作失败：" + t
            });
        }
    });
}), e));