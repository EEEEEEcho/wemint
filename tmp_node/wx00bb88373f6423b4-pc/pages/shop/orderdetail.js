var t = getApp(), a = (require("../../components/utils/imgutil.js"), require("../../common.js"));

Page({
    isloading: !1,
    bannerLoaded: !1,
    url: !1,
    onShareAppMessage: function() {
        return t.shareAppMessage({
            url: this.url,
            title: this.data.productInfo.Name
        });
    },
    onLoad: function(e) {
        var n = this;
        n.url = t.getPageUrl(n, e), t.registerGlobalFunctions(n), a.initCommonModules(), 
        this.setData({
            queryparams: e,
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
            var a = t[t.length - 2];
            a && a.changeData([]);
        }
    },
    data: {
        pintuan_group_id: "",
        currentTab: 0,
        baseUrl: t.globalData.cdnBaseUrl,
        shows: !0
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
        var a = t.currentTarget.dataset.orderid;
        this.setData({
            paymentPlugShow: !0,
            balanceflagNum: this.data.balanceNumber - this.data.TotalMoeny < 0,
            paymentFlag: this.data.balanceNumber - this.data.TotalMoeny > 0 ? "1" : "2",
            curOrderId: a
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
    loadOrder: function() {
        var a = this;
        if (!a.isloading) {
            a.isloading = !0;
            var e = 0;
            a.data.queryparams.id && (e = a.data.queryparams.id), t.sendRequest({
                url: "/index.php?c=Front/WxApp/ShopApi&a=OrderDetail&ID=" + e,
                method: "GET",
                success: function(e) {
                    if (a.isloading = !1, e.success) {
                        0 == e.data.Status && (e.data.Status = "未付款"), (1 == e.data.Status && -1 == e.data.OrderType || 7 == e.data.Status && -1 == e.data.OrderType) && (e.data.Status = "等待卖家发货"), 
                        (1 == e.data.Status && 1 == e.data.groupp_Status || 7 == e.data.Status && 1 == e.data.groupp_Status) && (e.data.Status = "已付款，未成团"), 
                        (1 == e.data.Status && 2 == e.data.groupp_Status || 7 == e.data.Status && 2 == e.data.groupp_Status) && (e.data.Status = "已成团，等待卖家发货"), 
                        3 != e.data.Status && 8 != e.data.Status || (e.data.Status = "等待买家收货"), 2 == e.data.Status && (e.data.Status = "已完成"), 
                        6 == e.data.Status && (e.data.Status = "退款完成"), 9 == e.data.Status && (e.data.Status = "未取货"), 
                        4 == e.data.Status && (e.data.Status = "交易关闭"), 1 == e.data.Status && 23 == e.data.OrderType && (e.data.Status = "等待买家收货");
                        for (var n = 0; n < e.data.ProductList.length; n++) e.data.ProductList[n].RefundStatus ? e.data.ProductList[n].hasrefunds = !0 : e.data.ProductList[n].hasrefunds = !1;
                        a.setData({
                            orderinfo: e.data,
                            siteID: t.globalData.baseInfo.SiteID,
                            pintuan_group_id: e.data.pintuan_group_id
                        });
                    } else console.log("getProductInfo fail：" + e.msg);
                },
                fail: function(t) {
                    a.isloading = !1, console.log("getProductInfo fail");
                }
            });
        }
    },
    goRefunds: function(t) {
        var a = t.currentTarget.dataset.orderid, e = t.currentTarget.dataset.pkey;
        wx.navigateTo({
            url: "refundreson?orderid=" + a + "&pkey=" + e
        });
    },
    goRefundsuc: function(t) {
        var a = t.currentTarget.dataset.orderid, e = t.currentTarget.dataset.pkey;
        wx.navigateTo({
            url: "refundsuc?orderid=" + a + "&pkey=" + e
        });
    },
    goRefundfail: function(t) {
        var a = t.currentTarget.dataset.orderid, e = t.currentTarget.dataset.pkey;
        wx.navigateTo({
            url: "refundfail?orderid=" + a + "&pkey=" + e
        });
    },
    goRefundsWuliu: function(t) {
        var a = t.currentTarget.dataset.pkey;
        wx.navigateTo({
            url: "refundswuliu?pkey=" + a
        });
    },
    ConfirmReceive: function(a) {
        var e = this, n = a.currentTarget.dataset.orderid, r = a.detail.formId;
        return wx.showModal({
            title: "提示",
            content: "确定收货吗？",
            success: function(a) {
                a.confirm ? t.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=ConfirmReceiving&orderid=" + n + "&formid=" + r,
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
    goKuaidiUrl: function(t) {
        var a = t.currentTarget.dataset.company, e = t.currentTarget.dataset.postid;
        wx.navigateTo({
            url: "kuaidi100?company=" + a + "&postid=" + e
        });
    },
    DelOrder: function(a) {
        var e = a.currentTarget.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确定取消订单吗？",
            success: function(a) {
                a.confirm ? t.sendRequest({
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
                }) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    goPinTuanDetail: function(t) {
        t.currentTarget.dataset.group;
        var a = this;
        a.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            a.setData({
                buttonClicked: !1
            });
        }, 500), wx.navigateTo({
            url: "../fightGroups/fightgroups?pintuan_group_id=" + a.data.pintuan_group_id
        });
    },
    Gopay: function(a) {
        var e = this.data.curOrderId, n = a.detail.formId, r = this, o = function(a) {
            var e = function() {
                r.loadOrder(!0), wx.navigateTo({
                    url: "orderdetail?id=" + a
                });
            };
            t.sendRequest({
                url: "/index.php?c=front/WxApp/ShopApi&a=payOrder",
                method: "POST",
                data: {
                    OrderID: a,
                    formid: n
                },
                success: function(a) {
                    a.success ? (r.loadOrder(!0), t.showModal({
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
                    }), r.loadOrder(!0);
                }
            });
        };
        !function(a) {
            "1" === r.data.paymentFlag ? (r.setData({
                paymentPlugShow: !1
            }), o(a)) : "2" === r.data.paymentFlag && t.wxPay(a, {
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
    navbarTap: function(t) {
        this.setData({
            currentTab: t.currentTarget.dataset.idx
        });
    }
});