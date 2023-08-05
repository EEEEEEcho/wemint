var t = getApp(), i = require("../../common.js");

Page({
    data: {
        activityTime: {
            day: "0",
            hour: "0",
            minute: "0",
            second: "0"
        },
        acitityState: !1,
        notListFlag: !1,
        fullReduction: null,
        baseUrl: t.globalData.siteBaseUrl,
        activityBase: null,
        activityDiscounts: null,
        activityDiscountsSate: !1,
        productPage: "1",
        pageCount: null,
        activityID: "",
        productList: [],
        productListArr: [],
        minThreshold: null,
        EnableFree: null,
        fullGiftFlag: !1,
        activityNoscrollState: !1
    },
    onLoad: function(t) {
        if (t.scene) {
            var a = {};
            decodeURIComponent(t.scene).split("&").map(function(t, i) {
                if (-1 !== t.indexOf("=")) {
                    var e = t.split("=");
                    a[e[0]] = e[1];
                }
                if (-1 !== t.indexOf("_")) {
                    var o = t.split("_");
                    a[o[0]] = o[1];
                }
            }), t = a;
        }
        i.setPopupFromShare(), this.loadactivityList(t.id), this.setData({
            activityID: t.id
        }), this.loadactivityProductList();
    },
    loadactivityList: function(i) {
        var a = this, e = this;
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/FullReduction&a=getActivityBase&ActivityId=" + i,
            method: "GET",
            success: function(i) {
                if (i.success) {
                    wx.setNavigationBarTitle({
                        title: i.activityBase.Title
                    });
                    var o = [], n = !1, s = !1, c = !1, u = 0;
                    i.activityDiscounts.forEach(function(t) {
                        t.DecreaseAmount && (t.DecreaseAmount = parseInt(t.DecreaseAmount), c = !0), t.Discount && (t.Discount = parseInt(t.Discount) / 10, 
                        c = !0), t.Threshold && (t.Threshold = parseInt(t.Threshold), o.push(t.Threshold)), 
                        "1" == t.EnableFreePostage && (n = !0, u = t.Threshold), t.list && (s = !0);
                    });
                    for (var l = 0; l < o.length; l++) o[l] < u && "1" == i.activityDiscounts[l].EnableFreePostage && (u = o[l]);
                    e.setData({
                        activityBase: i.activityBase,
                        activityDiscounts: i.activityDiscounts,
                        minThreshold: u,
                        EnableFree: n,
                        fullGiftFlag: s,
                        activityDiscountsSate: c
                    }), e.countTdown(i.activityBase.activityTime);
                } else a.isloading = !1, t.showModal({
                    title: "提示",
                    content: i.msg
                });
            },
            fail: function(i) {
                this.isloading = !1, t.showModal({
                    title: "提示",
                    content: i.msg
                });
            }
        });
    },
    countTdown: function(t) {
        var i = this, a = t;
        clearInterval(i.data.fullReduction), i.data.fullReduction = setInterval(function() {
            if (--a < 0) clearInterval(i.data.fullReduction); else {
                var t = i.forMatterTime(a), e = t.days, o = t.hours, n = t.minutes, s = t.seconds;
                i.setData({
                    activityTime: {
                        day: e,
                        hour: o,
                        minute: n,
                        second: s
                    }
                });
            }
        }, 1e3);
    },
    loadactivityProductList: function() {
        var i = this, a = this;
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/FullReduction&a=getActivityProductList&ActivityId=" + a.data.activityID + "&page=" + a.data.productPage,
            method: "GET",
            success: function(e) {
                e.success ? (e.data.list.forEach(function(t) {
                    i.data.productListArr.push(t);
                }), a.setData({
                    productList: i.data.productListArr,
                    pageCount: e.data.pageCount
                })) : (i.isloading = !1, t.showModal({
                    title: "提示",
                    content: e.msg
                }));
            },
            fail: function(i) {
                this.isloading = !1, t.showModal({
                    title: "提示",
                    content: i.msg
                });
            }
        });
    },
    activityNavTo: function(t) {
        var i = this, a = t.currentTarget.dataset.linkid;
        wx.navigateTo({
            url: "/pages/shop/productdetail?id=" + a + "&ActivityID=" + i.data.activityID + "&fullID=1"
        });
    },
    goProductDetails: function(t) {
        var i = t.currentTarget.dataset.productid;
        wx.navigateTo({
            url: "/pages/shop/productdetail?id=" + i
        });
    },
    loadMore: function() {},
    onReady: function() {},
    activityStateTrue: function() {
        this.setData({
            acitityState: !0,
            activityNoscrollState: !0
        });
    },
    activityStateFalse: function() {
        this.setData({
            acitityState: !1,
            activityNoscrollState: !1
        });
    },
    goToHomeIndex: function() {
        wx.reLaunch({
            url: "/pages/shop/index"
        });
    },
    forMatterTime: function(t) {
        var i = parseInt(t / 60 / 60 / 24 % 24, 10), a = parseInt(t / 60 / 60 % 24, 10), e = parseInt(t / 60 % 60, 10), o = parseInt(t % 60, 10);
        return a = this.checkTime(a), e = this.checkTime(e), o = this.checkTime(o), {
            days: i,
            hours: a,
            minutes: e,
            seconds: o
        };
    },
    checkTime: function(t) {
        return t < 10 && (t = "0" + t), t;
    },
    PullloadData: function(t) {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        Number(this.data.productPage) + 1 > this.data.pageCount ? this.setData({
            notListFlag: !0
        }) : (this.data.productPage++, this.loadactivityProductList());
    },
    onShareAppMessage: function() {}
});