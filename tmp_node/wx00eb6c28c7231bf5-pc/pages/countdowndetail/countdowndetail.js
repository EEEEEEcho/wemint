function t(t) {
    return parseInt(t / 86400) + "天" + parseInt(t % 86400 / 3600) + "时" + parseInt(t % 3600 / 60) + "分" + parseInt(t % 3600 % 60) + "秒";
}

function e(a, o) {
    a.setData({
        StartClock: t(o)
    }), o <= 0 ? a.setData({
        StartClock: "",
        CountDownStatus: "Normal"
    }) : setTimeout(function() {
        e(a, o -= 1);
    }, 1e3);
}

function a(e, o) {
    e.setData({
        EndClock: t(o)
    }), o <= 0 ? e.setData({
        EndClock: "",
        CountDownStatus: "ActivityEnd"
    }) : setTimeout(function() {
        a(e, o -= 1);
    }, 1e3);
}

var o = getApp(), n = require("../wxParse/wxParse.js");

Page({
    data: {
        CountDownId: 0,
        MaxCount: 0,
        CountDownStatus: "",
        StartDate: "",
        EndDate: "",
        NowTime: "",
        ProductId: 0,
        ProductName: "",
        MetaDescription: "",
        ShortDescription: "",
        ShowSaleCounts: "",
        MarketPrice: "",
        IsfreeShipping: "",
        MaxSalePrice: "",
        MinSalePrice: "",
        ProductImgs: "",
        SkuItemList: "",
        Skus: "",
        Freight: "",
        Coupons: "",
        ShowPrice: "",
        backShow: "none",
        SkuShow: "none",
        couponShow: "none",
        skuImg: "",
        skuPrice: 0,
        skuStock: 0,
        selectedSku: "",
        selectedSkuContent: "",
        buyAmount: 1,
        selectedskuList: [],
        activeDateMsg: "",
        StartClock: "",
        EndClock: ""
    },
    onLoad: function(t) {
        var u = this, i = t.id;
        o.getOpenId(function(t) {
            wx.request({
                url: o.getUrl("GetCountDownProductDetail"),
                data: {
                    openId: t,
                    countDownId: i
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var o = t.data.Data, i = o.MetaDescription;
                        if (null != i && void 0 != i && n.wxParse("metaDescription", "html", i, u), o.NowTime < o.StartDate) {
                            var s = new Date(o.NowTime), c = (r = new Date(o.StartDate)).getTime() - s.getTime();
                            e(u, d = c / 1e3);
                        }
                        if (o.NowTime > o.StartDate && o.NowTime < o.EndDate) {
                            var s = new Date(o.NowTime), r = new Date(o.EndDate), d = (c = r.getTime() - s.getTime()) / 1e3;
                            a(u, d);
                        }
                        var l = "";
                        0 == o.SkuItemList.length && (l = o.Skus[0].SkuId), u.setData({
                            CountDownId: o.CountDownId,
                            MaxCount: o.MaxCount,
                            CountDownStatus: o.CountDownStatus,
                            StartDate: o.StartDate,
                            EndDate: o.EndDate,
                            NowTime: o.NowTime,
                            ProductId: o.ProductId,
                            ProductName: o.ProductName,
                            ShortDescription: o.ShortDescription,
                            ShowSaleCounts: o.ShowSaleCounts,
                            MarketPrice: o.MarketPrice,
                            IsfreeShipping: o.IsfreeShipping,
                            MaxSalePrice: o.MaxSalePrice,
                            MinSalePrice: o.MinSalePrice,
                            ProductImgs: o.ProductImgs,
                            SkuItemList: o.SkuItemList,
                            Skus: o.Skus,
                            Freight: o.Freight,
                            Coupons: o.Coupons,
                            ShowPrice: o.MaxSalePrice == o.MinSalePrice ? o.MinSalePrice : o.MinSalePrice + "～" + o.MaxSalePrice,
                            skuImg: o.ThumbnailUrl60,
                            skuPrice: o.MinSalePrice,
                            skuStock: o.Stock,
                            selectedSku: l,
                            selectedSkuContent: "",
                            buyAmount: 1
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
    onShareAppMessage: function() {
        return {
            title: "限时抢购" + this.ProductName,
            path: "",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    getCoupon: function(t) {
        var e = t.currentTarget.id;
        o.getOpenId(function(t) {
            wx.request({
                url: o.getUrl("UserGetCoupon"),
                data: {
                    openId: t,
                    couponId: e
                },
                success: function(t) {
                    "OK" == t.data.Status ? wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && that.setData({
                                backShow: "none",
                                couponShow: "none"
                            });
                        }
                    }) : "NOUser" == t.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : (that.setData({
                        backShow: "none",
                        couponShow: "none"
                    }), wx.showToast({
                        title: t.data.Message
                    }));
                }
            });
        });
    },
    clickCouponList: function(t) {
        var e = this;
        void 0 != e.data.Coupons && null != e.data.Coupons && "" != e.data.Coupons && e.data.Coupons.length > 0 ? this.setData({
            backShow: "",
            couponShow: ""
        }) : wx.showToast({
            title: "暂时没有可以领取的优惠券",
            icon: "loading"
        });
    },
    onCouponHide: function(t) {
        this.setData({
            backShow: "none",
            couponShow: "none"
        });
    },
    clickSku: function(t) {
        this.setData({
            backShow: "",
            SkuShow: ""
        });
    },
    clickback: function(t) {
        this.setData({
            backShow: "none",
            SkuShow: "none",
            couponShow: "none"
        });
    },
    onSkuHide: function(t) {
        this.setData({
            backShow: "none",
            SkuShow: "none"
        });
    },
    changeAmount: function(t) {
        var e = this, a = parseInt(t.detail.value), o = e.data.MaxCount;
        if (o > e.data.skuStock && (o = e.data.skuStock), isNaN(a) || a > o || a <= 0) return e.setData({
            buyAmount: o
        }), void wx.showModal({
            title: "提示",
            content: "请输入正确的数量,不能大于最大抢购数量和商品库存或者小于等于0",
            showCancel: !1
        });
        this.setData({
            buyAmount: a
        });
    },
    reduceAmount: function(t) {
        var e = this.data.buyAmount;
        (e -= 1) <= 0 || this.setData({
            buyAmount: e
        });
    },
    addAmount: function(t) {
        var e = this.data.buyAmount;
        (e += 1) > this.data.MaxCount || this.setData({
            buyAmount: e
        });
    },
    commitBuy: function(t) {
        for (var e = !0, a = 0; a < this.data.selectedskuList.length; a++) if (void 0 == this.data.selectedskuList[a] || "" == this.data.selectedskuList[a] || null == this.data.selectedskuList[a]) {
            e = !1;
            break;
        }
        if (this.data.selectedskuList.length == this.data.SkuItemList.length && e) if (this.data.buyAmount <= 0) wx.showModal({
            title: "提示",
            content: "请输入要购买的数量",
            showCancel: !1
        }); else {
            var o = this.data.buyAmount, n = this.data.selectedSku, u = this.data.CountDownId;
            wx.redirectTo({
                url: "../submitorder/submitorder?productsku=" + n + "&buyamount=" + o + "&frompage=countdown&countdownid=" + u
            });
        } else wx.showModal({
            title: "提示",
            content: "请选择规格",
            showCancel: !1
        });
    },
    onSkuClick: function(t) {
        var e = t.target.dataset.indexcount, a = t.target.id, o = t.target.dataset.skuvalue, n = new Object();
        n.valueid = a, n.value = o;
        var u = this.data.selectedskuList;
        u[e] = n;
        var i = "", s = this.data.SkuItemList;
        s.length, u.length;
        for (var c = this.data.ProductId, r = 0; r < u.length; r++) {
            var d = u[r];
            void 0 != d && (i += "" == i ? d.value : "," + d.value, c += "_" + d.valueid);
        }
        s[e];
        for (var l = 0; l < s[e].AttributeValue.length; l++) s[e].AttributeValue[l].ValueId == a ? s[e].AttributeValue[l].UseAttributeImage = "selected" : s[e].AttributeValue[l].UseAttributeImage = "False";
        for (var h = this.data.Skus, S = null, k = 0; k < h.length; k++) if (c == h[k].SkuId) {
            S = h[k];
            break;
        }
        this.setData({
            selectedskuList: u,
            selectedSku: c,
            selectedSkuContent: i,
            SkuItemList: s
        }), null != S && (this.setData({
            skuPrice: S.ActivityPrice,
            skuStock: S.ActivityStock
        }), "" != S.ThumbnailUrl40 && null != S.ThumbnailUrl40 && this.setData({
            skuImg: S.ThumbnailUrl40
        }));
    }
});