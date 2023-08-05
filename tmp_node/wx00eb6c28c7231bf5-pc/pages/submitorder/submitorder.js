var t = getApp();

Page({
    data: {
        ProductSku: "",
        BuyAmount: 0,
        FromPage: "",
        CountdownId: "",
        ShipAddressId: "",
        ShippingAddressInfo: null,
        ProductInfo: null,
        ProductAmount: 0,
        OrderFreight: 0,
        DefaultCouponCode: "",
        DefaultCouponPrice: 0,
        CouponList: null,
        PickerArray: [],
        FullDiscount: 0,
        FullFreeFreight: !1,
        SelectedCouponIndex: 0,
        MaxUsePoint: 0,
        MaxPointDiscount: 0,
        MyPoints: 0,
        ShoppingDeduction: 0,
        CanPointUseWithCoupon: !1,
        PointDeductionRate: 0,
        DeductionPoints: 0,
        PointsDiscount: 0,
        Remark: "",
        couponShow: "none",
        backShow: "none",
        pointDiscountShow: !1,
        OrderTotalPrice: 0
    },
    onLoad: function(o) {
        var a = this, n = o.productsku, e = o.buyamount, i = o.frompage, u = o.countdownid, d = o.shipaddressid;
        t.getOpenId(function(o) {
            wx.request({
                url: t.getUrl("GetShoppingCart"),
                data: {
                    openId: o,
                    productSku: n,
                    fromPage: i,
                    countDownId: u,
                    buyAmount: e,
                    shipAddressId: d
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        for (var o = t.data.Data, s = [], r = 0; r < o.CouponList.length; r++) s[r] = o.CouponList[r].CouponName + " " + o.CouponList[r].Price;
                        a.setData({
                            ProductSku: n,
                            BuyAmount: e,
                            FromPage: i,
                            CountdownId: u,
                            ShipAddressId: d,
                            ShippingAddressInfo: o.DefaultShippingAddress,
                            ProductInfo: o.ProductItems,
                            ProductAmount: o.ProductAmount,
                            OrderFreight: o.OrderFreight,
                            DefaultCouponCode: o.DefaultCouponCode,
                            DefaultCouponPrice: o.DefaultCouponPrice,
                            CouponList: o.CouponList,
                            FullDiscount: o.FullDiscount,
                            FullFreeFreight: o.FullFreeFreight,
                            MaxUsePoint: o.MaxUsePoint,
                            MaxPointDiscount: o.MaxPointDiscount,
                            ShoppingDeduction: o.ShoppingDeduction,
                            CanPointUseWithCoupon: o.CanPointUseWithCoupon,
                            PointDeductionRate: o.PointDeductionRate,
                            MyPoints: o.MyPoints,
                            PickerArray: s
                        }), a.CalcMaxUsePoints(), a.CalcOrderTotalPrice();
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
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    gotoAddress: function() {
        wx.redirectTo({
            url: "../choiceaddress/choiceaddress?productsku=" + this.data.ProductSku + "&buyamount=" + this.data.BuyAmount + "&frompage=" + this.data.FromPage + "&countdownid=" + this.data.CountdownId + "&shipaddressid=" + this.data.ShipAddressId
        });
    },
    clickCouponList: function(t) {
        var o = this;
        void 0 != o.data.CouponList && null != o.data.CouponList && o.data.CouponList.length > 0 ? this.setData({
            couponShow: "",
            backShow: ""
        }) : wx.showToast({
            title: "暂时没有可以领取的优惠券",
            icon: "loading"
        });
    },
    getCouponBaseId: function(t) {
        for (var o = this, a = 0; a < o.data.CouponList.length; a++) if (this.data.CouponList[a].CouponId == t) return a;
        return -1;
    },
    setCoupon: function(t) {
        var o = this, a = (t.currentTarget.id, t.currentTarget.dataset.num);
        if (a >= 0) {
            var n = o.data.CouponList[a];
            o.setData({
                DefaultCouponCode: n.ClaimCode,
                DefaultCouponPrice: n.Price,
                SelectedCouponIndex: a,
                couponShow: "none",
                backShow: "none"
            });
        }
        o.CalcMaxUsePoints(), o.CalcOrderTotalPrice();
    },
    onCouponHide: function(t) {
        this.setData({
            backShow: "none",
            couponShow: "none"
        });
    },
    cancelCoupon: function(t) {
        var o = this;
        o.setData({
            DefaultCouponCode: "",
            DefaultCouponPrice: 0,
            SelectedCouponIndex: -1,
            couponShow: "none",
            backShow: "none"
        }), o.CalcMaxUsePoints(), o.CalcOrderTotalPrice();
    },
    bindPickerChange: function(t) {
        var o = this, a = t.detail.value, n = o.data.CouponList[a];
        o.setData({
            DefaultCouponCode: n.ClaimCode,
            DefaultCouponPrice: n.Price,
            SelectedCouponIndex: a
        });
    },
    bindRemarkInput: function(t) {
        this.setData({
            Remark: t.detail.value
        });
    },
    ChkUsePoint: function(t) {
        var o = this;
        o.CalcMaxUsePoints(), t.detail.value ? o.setData({
            DeductionPoints: o.data.MaxUsePoint,
            PointsDiscount: parseFloat(o.data.MaxPointDiscount),
            pointDiscountShow: !0
        }) : o.setData({
            DeductionPoints: 0,
            PointsDiscount: 0,
            pointDiscountShow: !1
        }), o.CalcOrderTotalPrice();
    },
    UsePointNumber: function(t) {
        var o = this, a = !0;
        o.CalcMaxUsePoints();
        var n = parseInt(t.detail.value);
        if (o.data.CanPointUseWithCoupon || couponCode && couponCode.length > 0 && (a = !1), 
        o.data.MyPoints < 1 && (a = !1), isNaN(n) && (a = !1), a) {
            var e = n;
            e > o.data.MaxUsePoint && (e = o.data.MaxUsePoint), e > o.data.MyPoints && (e = o.data.MyPoints);
            var i = (e / o.data.ShoppingDeduction).toFixed(2);
            i = parseFloat(i), o.setData({
                DeductionPoints: e,
                PointsDiscount: i
            });
        } else n = 0, o.setData({
            DeductionPoints: 0,
            PointsDiscount: 0
        });
        o.CalcOrderTotalPrice();
    },
    CalcMaxUsePoints: function() {
        var t = this, o = t.data.ProductAmount - t.data.FullDiscount;
        (o -= t.data.DefaultCouponPrice) < 0 && (o = 0);
        var a = parseInt(t.data.PointDeductionRate * o * t.data.ShoppingDeduction / 100);
        a > t.data.MyPoints && (a = t.data.MyPoints);
        var n = a / t.data.ShoppingDeduction;
        n = parseFloat(n.toFixed(2));
        var e = t.data.DeductionPoints;
        e > a && (e = a);
        var i = t.data.PointsDiscount;
        i > n && (i = n), t.setData({
            MaxPointDiscount: n,
            MaxUsePoint: a,
            PointsDiscount: i,
            DeductionPoints: e
        });
    },
    CalcOrderTotalPrice: function() {
        var t = this, o = t.data.ProductAmount - t.data.FullDiscount;
        o -= t.data.DefaultCouponPrice, (o -= t.data.PointsDiscount) < 0 && (o = 0), o += t.data.OrderFreight, 
        o = parseFloat(o.toFixed(2)), t.setData({
            OrderTotalPrice: o
        });
    },
    submitOrder: function(o) {
        var a = this;
        void 0 == a.data.FromPage && (a.data.FromPage = ""), (a.data.FromPage && a.data.BuyAmount <= 0 || "" == a.data.ProductSku || void 0 == a.data.ProductSku) && wx.showModal({
            title: "提示",
            content: "参数错误",
            showCancel: !1,
            success: function(t) {
                t.confirm && wx.switchTab({
                    url: "../home/home"
                });
            }
        }), null != a.data.ShippingAddressInfo && void 0 != a.data.ShippingAddressInfo ? t.getOpenId(function(n) {
            wx.request({
                url: t.getUrl("SubmitOrder"),
                data: {
                    openId: n,
                    fromPage: a.data.FromPage,
                    shippingId: a.data.ShippingAddressInfo.ShippingId,
                    couponCode: a.data.DefaultCouponCode,
                    countDownId: a.data.CountdownId,
                    buyAmount: a.data.BuyAmount,
                    productSku: a.data.ProductSku,
                    remark: a.data.Remark,
                    deductionPoints: a.data.DeductionPoints,
                    formId: o.detail.formId
                },
                success: function(o) {
                    if ("OK" == o.data.Status) if (o.data.OrderTotal > 0) {
                        var a = o.data.OrderId;
                        t.orderPay(a, 0, !1);
                    } else wx.redirectTo({
                        url: "../orderlist/orderlist?status=2"
                    }); else wx.showModal({
                        title: "提示",
                        content: o.data.Message,
                        showCancel: !1
                    });
                }
            });
        }) : wx.showModal({
            title: "提示",
            content: "请选择收货地址",
            showCancel: !1
        });
    }
});