var t = getApp(), e = require("../../config.js");

Page({
    isloading: !1,
    onShareAppMessage: function() {
        return t.shareAppMessage();
    },
    onLoad: function(e) {
        var a = this;
        t.getPageUrl(this, e), t.registerGlobalFunctions(this), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    imgWidth: (t.windowWidth - 39) / 2,
                    scrollHeight: t.windowHeight
                });
            }
        }), this.setData({
            queryparams: e
        }), this.loadOrder(!0);
    },
    onShow: function() {
        this.loadOrder(!0);
    },
    changeData: function() {
        this.loadOrder(!0);
    },
    backtrack: function() {
        var t = getCurrentPages();
        if (console.log(t), t.length > 1) {
            var e = t[t.length - 2];
            e && e.changeData([]);
        }
    },
    data: {
        scrollCurrent: 0,
        falgAjax: !0,
        classid: 0,
        pagesize: 6,
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
        orderid: 0
    },
    loadOrder: function(e) {
        var a = this;
        if (!a.isloading) {
            a.isloading = !0, e && (a.data.recordcount = 99, a.data.orderlist = []);
            var r = a.data.recordcount, o = a.data.orderlist.length;
            if (r > o && this.data.falgAjax) {
                this.setData({
                    falgAjax: !1
                });
                var s = Math.ceil(o / a.data.pagesize) + 1;
                a.data.queryparams.keyword && a.data.queryparams.keyword;
                a.data.queryparams.status && (a.data.status = a.data.queryparams.status), a.data.sortcol && "&sortcol=" + a.data.sortcol + "&sort=" + a.data.sort, 
                console.log(a.data.status), t.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=refundlist&page=" + s + "&pagesize=" + a.data.pagesize,
                    method: "GET",
                    success: function(e) {
                        a.isloading = !1, e.success ? (console.log(e.list.RefundList), a.setData({
                            refundslist: e.list.RefundList,
                            Count: e.list.CountAll,
                            recordcount: e.recordcount,
                            hasorder: a.data.orderlist.length > 0,
                            falgAjax: !0,
                            siteID: t.globalData.baseInfo.SiteID,
                            orderstatus: e.OrderStatus
                        }), a.data.queryparams.status = null) : (console.log("getProductList fail：" + e.msg), 
                        1 == e.needLogin && wx.reLaunch({
                            url: "/pages/company/mycenter"
                        }));
                    },
                    fail: function(t) {
                        a.isloading = !1, console.log("getProductList fail");
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
        if (this.data.orderid == t.currentTarget.dataset.orderid) return !1;
        var e = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "orderdetail?id=" + e
        });
    },
    goRufundswuliu: function(t) {
        var e = t.currentTarget.dataset.pkey;
        wx.navigateTo({
            url: "refundswuliu?pkey=" + e
        });
    },
    goKuaidiUrl: function(t) {
        var e = t.currentTarget.dataset.company, a = t.currentTarget.dataset.postid;
        wx.navigateTo({
            url: "kuaidi100?company=" + e + "&postid=" + a
        });
    },
    goRefund: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.pkey, r = t.currentTarget.dataset.status, o = t.currentTarget.dataset.RefundProStatus;
        1 == r && !o || 1 == r && 2 == o ? wx.navigateTo({
            url: "refundsuc?orderid=" + e + "&pkey=" + a
        }) : 2 == r && !o || 2 == r && 0 == o ? wx.navigateTo({
            url: "refundfail?orderid=" + e + "&pkey=" + a
        }) : wx.navigateTo({
            url: "refund?orderid=" + e + "&pkey=" + a
        });
    },
    ConfirmReceive: function(e) {
        var a = this, r = e.currentTarget.dataset.orderid;
        return wx.showModal({
            title: "提示",
            content: "确定收货吗？",
            success: function(e) {
                e.confirm ? t.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=ConfirmReceiving&orderid=" + r,
                    method: "GET",
                    success: function(t) {
                        a.isloading = !1, t.success ? a.loadOrder(!0) : console.log("getProductList fail：" + t.msg);
                    },
                    fail: function(t) {
                        a.isloading = !1, console.log("getProductList fail");
                    }
                }) : e.cancel && console.log("用户点击取消");
            }
        }), !1;
    },
    Gopay: function(a) {
        var r = this, o = function(e) {
            var a = function() {
                console.log(r), r.loadOrder(!0), wx.navigateTo({
                    url: "orderdetail?id=" + e
                });
            };
            t.sendRequest({
                url: "/index.php?c=front/WxApp/ShopApi&a=payOrder",
                method: "POST",
                data: {
                    OrderID: e
                },
                success: function(e) {
                    e.success ? t.showModal({
                        title: "提示",
                        content: "交费成功",
                        confirm: a
                    }) : t.showModal({
                        title: "提示",
                        content: "交费失败：" + e.msg
                    });
                },
                fail: function(e) {
                    t.showModal({
                        title: "提示",
                        content: "交费失败：" + e
                    }), r.loadOrder(!0);
                }
            });
        };
        !function(a) {
            "1" != e.SKIP_WXPAY ? t.wxPay(a, {
                success: function() {
                    o(a);
                },
                fail: function(t) {
                    r.loadOrder(!0);
                }
            }) : o(a);
        }(a.currentTarget.dataset.orderid);
    },
    DeleteOrder: function(e) {
        var a = this, r = {
            orderid: e
        };
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=delOrder",
            method: "POST",
            data: r,
            success: function(e) {
                e.success ? a.loadOrder(!0) : t.showModal({
                    title: "提示",
                    content: "操作失败：" + e.msg
                });
            },
            fail: function(e) {
                t.showModal({
                    title: "提示",
                    content: "操作失败：" + e
                });
            }
        });
    },
    delCartItem: function(t) {
        var e = this, a = t.currentTarget.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确定删除吗？",
            success: function(t) {
                t.confirm ? e.DeleteOrder(a) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    DelOrder: function(e) {
        var a = this, r = e.currentTarget.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确定取消订单吗？",
            success: function(e) {
                e.confirm ? t.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=cancelOrder&orderid=" + r,
                    method: "GET",
                    success: function(t) {
                        this.isloading = !1, t.success ? a.loadOrder(!0) : console.log("getProductList fail：" + t.msg);
                    },
                    fail: function(t) {
                        this.isloading = !1, console.log("getProductList fail");
                    }
                }) : e.cancel && console.log("用户点击取消");
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