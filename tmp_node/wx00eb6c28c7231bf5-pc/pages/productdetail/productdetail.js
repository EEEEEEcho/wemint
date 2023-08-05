var t = getApp(), e = require("../wxParse/wxParse.js");

Page({
    data: {
        ProductId: 0,
        ProductName: "",
        MetaDescription: "",
        ShortDescription: "",
        ShowSaleCounts: "",
        Weight: "",
        MarketPrice: "",
        IsfreeShipping: "",
        MaxSalePrice: "",
        MinSalePrice: "",
        ProductImgs: "",
        SkuItemList: "",
        Skus: "",
        Freight: "",
        Coupons: "",
        Promotes: null,
        ShowPromotesText: "",
        IsUnSale: "",
        ShowPrice: "",
        backShow: "none",
        SkuShow: "none",
        couponShow: "none",
        promoteShow: "none",
        skuImg: "",
        skuPrice: 0,
        skuStock: 0,
        selectedSku: "",
        selectedSkuContent: "",
        buyAmount: 1,
        selectedskuList: [],
        isbuy: !0
    },
    onPullDownRefresh: function() {
        var t = this;
        t.loadData(t);
    },
    onLoad: function(t) {
        var e = t.id, o = this;
        o.setData({
            ProductId: e
        }), o.loadData(o);
    },
    onShareAppMessage: function() {
        return {
            title: this.ProductName,
            path: "",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    loadData: function(o) {
        wx.showNavigationBarLoading(), t.getOpenId(function(a) {
            wx.request({
                url: t.getUrl("GetProductDetail"),
                data: {
                    openId: a,
                    productId: o.data.ProductId
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var a = t.data.Data, n = a.MetaDescription;
                        null != n && void 0 != n && e.wxParse("metaDescription", "html", n, o);
                        var s = "";
                        0 == a.SkuItemList.length && (s = a.Skus[0].SkuId);
                        var i = "";
                        if (a.Promotes && a.Promotes.ActivityCount && a.Promotes.ActivityCount > 0) for (var u in a.Promotes) {
                            var c = a.Promotes[u];
                            if (c instanceof Array) for (var r in c) {
                                var l = c[r];
                                l && l.ActivityName && l.ActivityName.length > 0 && (i.length > 0 && (i += ","), 
                                i += l.ActivityName);
                            }
                        }
                        o.setData({
                            ProductId: a.ProductId,
                            ProductName: a.ProductName,
                            ShortDescription: a.ShortDescription,
                            ShowSaleCounts: a.ShowSaleCounts,
                            Weight: a.Weight,
                            MarketPrice: a.MarketPrice,
                            IsfreeShipping: a.IsfreeShipping,
                            MaxSalePrice: a.MaxSalePrice,
                            MinSalePrice: a.MinSalePrice,
                            ProductImgs: a.ProductImgs,
                            SkuItemList: a.SkuItemList,
                            Skus: a.Skus,
                            Freight: a.Freight,
                            Coupons: a.Coupons,
                            Promotes: a.Promotes,
                            ShowPromotesText: i,
                            IsUnSale: a.IsUnSale,
                            ShowPrice: a.MaxSalePrice == a.MinSalePrice ? a.MinSalePrice : a.MinSalePrice + "～" + a.MaxSalePrice,
                            skuImg: a.ThumbnailUrl60,
                            skuPrice: a.MinSalePrice,
                            skuStock: a.Stock,
                            selectedSku: s,
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
                },
                complete: function() {
                    wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    getCoupon: function(e) {
        var o = this, a = e.currentTarget.id;
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("UserGetCoupon"),
                data: {
                    openId: e,
                    couponId: a
                },
                success: function(t) {
                    "OK" == t.data.Status ? wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && o.setData({
                                backShow: "none",
                                couponShow: "none"
                            });
                        }
                    }) : "NOUser" == t.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : (o.setData({
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
    clickPromoteList: function(t) {
        var e = this.data.Promotes;
        e && e.ActivityCount && e.ActivityCount > 0 ? this.setData({
            backShow: "",
            promoteShow: ""
        }) : wx.showToast({
            title: "暂时没有进行中的满额优惠活动",
            icon: "loading"
        });
    },
    clickSku: function(t) {
        this.setData({
            backShow: "",
            SkuShow: "",
            isbuy: !0
        });
    },
    addShopCart: function(t) {
        this.setData({
            backShow: "",
            SkuShow: "",
            isbuy: !1
        });
    },
    clickback: function(t) {
        this.setData({
            backShow: "none",
            SkuShow: "none",
            couponShow: "none",
            promoteShow: "none"
        });
    },
    onCouponHide: function(t) {
        this.setData({
            backShow: "none",
            couponShow: "none"
        });
    },
    onPromoteHide: function(t) {
        this.setData({
            backShow: "none",
            promoteShow: "none"
        });
    },
    onSkuHide: function(t) {
        this.setData({
            backShow: "none",
            SkuShow: "none"
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
        (e += 1) > this.data.skuStock || this.setData({
            buyAmount: e
        });
    },
    changeAmount: function(t) {
        var e = parseInt(t.detail.value), o = this.data.skuStock;
        isNaN(e) || e > o || e <= 0 ? wx.showModal({
            title: "提示",
            content: "请输入正确的数量,不能大于库存或者小于等于0",
            showCancel: !1
        }) : this.setData({
            buyAmount: e
        });
    },
    commitBuy: function(t) {
        for (var e = !0, o = 0; o < this.data.selectedskuList.length; o++) if (void 0 == this.data.selectedskuList[o] || "" == this.data.selectedskuList[o] || null == this.data.selectedskuList[o]) {
            e = !1;
            break;
        }
        if (this.data.selectedskuList.length == this.data.SkuItemList.length && e) if (this.data.buyAmount <= 0) wx.showModal({
            title: "提示",
            content: "请输入要购买的数量",
            showCancel: !1
        }); else {
            var a = this.data.buyAmount, n = this.data.selectedSku;
            wx.redirectTo({
                url: "../submitorder/submitorder?productsku=" + n + "&buyamount=" + a + "&frompage=signbuy"
            });
        } else wx.showModal({
            title: "提示",
            content: "请选择规格",
            showCancel: !1
        });
    },
    addSku: function(e) {
        for (var o = this, a = !0, n = 0; n < this.data.selectedskuList.length; n++) if (void 0 == this.data.selectedskuList[n] || "" == this.data.selectedskuList[n] || null == this.data.selectedskuList[n]) {
            a = !1;
            break;
        }
        if (this.data.selectedskuList.length == this.data.SkuItemList.length && a) if (this.data.buyAmount <= 0) wx.showModal({
            title: "提示",
            content: "请输入要购买的数量",
            showCancel: !1
        }); else {
            var s = this.data.buyAmount, i = this.data.selectedSku;
            t.getOpenId(function(e) {
                wx.request({
                    url: t.getUrl("addToCart"),
                    data: {
                        openId: e,
                        SkuID: i,
                        Quantity: s
                    },
                    success: function(t) {
                        "OK" == t.data.Status ? wx.showModal({
                            title: "提示",
                            content: "加入购物车成功",
                            showCancel: !1,
                            success: function(t) {
                                t.confirm && o.setData({
                                    backShow: "none",
                                    SkuShow: "none"
                                });
                            }
                        }) : "NOUser" == t.data.Message ? wx.redirectTo({
                            url: "../login/login"
                        }) : wx.showModal({
                            title: "提示",
                            content: t.data.ErrorResponse.ErrorMsg,
                            showCancel: !1,
                            success: function(t) {
                                t.confirm && wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    },
                    complete: function() {}
                });
            });
        } else wx.showModal({
            title: "提示",
            content: "请选择规格",
            showCancel: !1
        });
    },
    onSkuClick: function(t) {
        var e = t.target.dataset.indexcount, o = t.target.id, a = t.target.dataset.skuvalue, n = new Object();
        n.valueid = o, n.value = a;
        var s = this.data.selectedskuList;
        s[e] = n;
        var i = "", u = this.data.SkuItemList;
        u.length, s.length;
        for (var c = this.data.ProductId, r = 0; r < s.length; r++) {
            var l = s[r];
            void 0 != l && (i += "" == i ? l.value : "," + l.value, c += "_" + l.valueid);
        }
        u[e];
        for (var d = 0; d < u[e].AttributeValue.length; d++) u[e].AttributeValue[d].ValueId == o ? u[e].AttributeValue[d].UseAttributeImage = "selected" : u[e].AttributeValue[d].UseAttributeImage = "False";
        for (var h = this.data.Skus, S = null, k = 0; k < h.length; k++) if (c == h[k].SkuId) {
            S = h[k];
            break;
        }
        this.setData({
            selectedskuList: s,
            selectedSku: c,
            selectedSkuContent: i,
            SkuItemList: u
        }), null != S && (this.setData({
            skuPrice: S.SalePrice,
            skuStock: S.Stock
        }), "" != S.ThumbnailUrl40 && null != S.ThumbnailUrl40 && this.setData({
            skuImg: S.ThumbnailUrl40
        }));
    }
});