function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var s = t(require("../../../store")), e = t(require("../../../utils/create")), a = require("../../../utils/stringUtil"), o = require("../../../api/apiInstance"), d = getApp();

(0, e.default)(s.default, {
    properties: {},
    data: {
        navH: d.globalData.navH,
        status: d.globalData.status,
        cartPage: "订单详情",
        payCarts: [],
        selectAddress: {},
        showAddress: {},
        allNum: 0,
        copyAllPrice: 0,
        allPrice: 0,
        cardCodes: [],
        couponCodes: [],
        couponIsIntercept: !1,
        cardIsIntercept: !1,
        goodsInfo: "",
        useCouponText: "可使用抵用劵",
        useCardText: "可使用购物卡",
        isShowLoad: !1,
        type: 1,
        deliveryShow: !1,
        groupUuid: ""
    },
    onLoad: function(t) {
        void 0 !== t.groupUuid && this.setData({
            groupUuid: t.groupUuid
        }), 2 == this.store.data.payCarts[0].goods[0].type ? this.setData({
            type: 2
        }) : this.getGoodsInfo(), this.getCartsPriceNumber(), "{}" != JSON.stringify(this.store.data.selectAddress) ? (this.setData({
            showAddress: this.store.data.selectAddress
        }), 1 == this.data.type && this.getCalculate()) : this.getAddress();
    },
    onShow: function() {
        this.getDisCountText(), this.calculateFee(), "{}" != JSON.stringify(this.store.data.selectAddress) && "" != this.store.data.selectAddress && this.setData({
            showAddress: this.store.data.selectAddress
        });
    },
    onUnload: function() {
        this.store.data.cardCodes = [], this.store.data.couponCodes = [], this.store.data.cardIsIntercept = !1, 
        this.store.data.couponIsIntercept = !1, this.update();
    },
    onDeliveryShow: function(t) {
        this.setData({
            deliveryShow: !0
        });
    },
    getAddress: function() {
        var t = this, s = {
            accesstoken: this.store.data.userInfo.accesstoken
        };
        (0, o.getAddressDefault)(s, function(s) {
            1 === s.errcode && (t.setData({
                showAddress: s.data
            }), null != t.data.showAddress && "" != t.data.showAddress && 1 == t.data.type && t.getCalculate());
        });
    },
    getDisCountText: function() {
        this.store.data.couponCodes.length > 0 ? this.data.useCouponText = "已使用" + this.store.data.couponCodes.length + "张抵用劵" : this.data.useCouponText = "可使用抵用劵", 
        this.store.data.cardCodes.length > 0 ? this.data.useCardText = "已使用" + this.store.data.cardCodes.length + "张购物卡" : this.data.useCardText = "可使用购物卡", 
        this.store.data.couponIsIntercept && (this.data.useCardText = "不可使用购物卡"), this.store.data.cardIsIntercept && (this.data.useCouponText = "不可使用抵用劵"), 
        this.setData({
            useCardText: this.data.useCardText,
            useCouponText: this.data.useCouponText
        });
    },
    getCartsPriceNumber: function() {
        for (var t = 0, s = 0, e = 0; e < this.store.data.payCarts.length; e++) for (var a = this.store.data.payCarts[e], o = 0; o < a.goods.length; o++) {
            var d = a.goods[o];
            s += d.num, 1 == d.payType ? t += d.salesPrice * d.num : 0 == d.depositRatio ? t += d.depositAmount * d.num : t += d.salesPrice * d.num * d.depositRatio / 100;
        }
        this.data.copyAllPrice = t / 100, this.setData({
            allNum: s,
            allPrice: t / 100
        });
    },
    getCalculate: function() {
        var t = this, s = this.data.showAddress.province + this.data.showAddress.city + this.data.showAddress.area + this.data.showAddress.addressDetail, e = {
            accesstoken: this.store.data.userInfo.accesstoken,
            address: s,
            goodsInfo: this.data.goodsInfo
        };
        (0, o.getOrderCalculate)(e, function(s) {
            if (1 === s.errcode) {
                for (var e = 0; e < t.store.data.payCarts.length; e++) {
                    var a = t.store.data.payCarts[e].shopUuid;
                    t.store.data.payCarts[e].freight = s.data[a];
                }
                t.update();
            }
        });
    },
    getGoodsInfo: function() {
        for (var t = [], s = 0; s < this.store.data.payCarts.length; s++) for (var e = this.store.data.payCarts[s], a = 0; a < e.goods.length; a++) {
            var o = e.goods[a], d = {};
            d.goodsUuid = o.goodsUuid, d.num = o.num, d.skuUuid = o.skuUuid, t.push(d);
        }
        this.setData({
            goodsInfo: JSON.stringify(t)
        });
    },
    onAddress: function() {
        wx.navigateTo({
            url: "/pages/mine/address/address?isSelect=1"
        });
    },
    calculateFee: function() {
        if (null != this.data.showAddress && "" != this.data.showAddress) if (0 != this.store.data.couponCodes.length || 0 != this.store.data.cardCodes.length) {
            var t = this;
            wx.login({
                success: function(s) {
                    t.toPay(s.code, !0);
                }
            });
        } else this.setData({
            allPrice: this.data.copyAllPrice
        });
    },
    onBuyerInput: function(t) {
        var s = t.currentTarget.dataset.index;
        this.store.data.payCarts[s].remark = t.detail.value, this.update();
    },
    onSubmit: function() {
        if (null != this.data.showAddress && "" != this.data.showAddress) {
            var t = this;
            wx.login({
                success: function(s) {
                    2 == t.data.type ? t.toFreePay(s.code) : t.toPay(s.code, !1);
                }
            });
        } else wx.showToast({
            title: "请设置您的收货信息",
            icon: "none",
            duration: 3e3
        });
    },
    toPay: function(t, s) {
        var e = this;
        this.setData({
            isShowLoad: !0
        });
        var d = this.data.showAddress.province + this.data.showAddress.city + this.data.showAddress.area + this.data.showAddress.addressDetail, r = {
            accesstoken: this.store.data.userInfo.accesstoken,
            name: this.data.showAddress.name,
            mobile: this.data.showAddress.mobile,
            address: d,
            source: 4,
            channel: "WX_MINI",
            goodsInfo: this.data.goodsInfo,
            code: t
        };
        s && (r.calculateFee = 1), this.store.data.couponCodes.length > 0 && (r.couponCodes = JSON.stringify(this.store.data.couponCodes)), 
        this.store.data.cardCodes.length > 0 && (r.cardCodes = JSON.stringify(this.store.data.cardCodes));
        for (var i = {}, n = 0; n < this.store.data.payCarts.length; n++) {
            var u = this.store.data.payCarts[n];
            null != u.remark && "" != u.remark && (i[u.shopUuid] = u.remark);
        }
        "{}" != JSON.stringify(i) && (r.remark = JSON.stringify(i)), (0, o.getOrderAdd)(r, function(t) {
            1 === t.errcode ? s ? e.setData({
                allPrice: t.data.payFee / 100
            }) : (0, a.prePay)(t.data, function() {
                wx.showToast({
                    title: "支付成功",
                    icon: "none",
                    duration: 3e3
                }), e.setData({
                    isShowLoad: !1
                }), wx.redirectTo({
                    url: "/pages/order/orderList/orderList?orderStatus=3&goodType=1"
                });
            }, function() {
                wx.showToast({
                    title: "支付失败",
                    icon: "none",
                    duration: 3e3
                }), e.setData({
                    isShowLoad: !1
                }), wx.redirectTo({
                    url: "/pages/order/orderList/orderList?orderStatus=1&goodType=1"
                });
            }) : e.setData({
                isShowLoad: !1
            });
        });
    },
    toFreePay: function(t) {
        var s = this;
        this.setData({
            isShowLoad: !0
        });
        var e = this.data.showAddress.province + this.data.showAddress.city + this.data.showAddress.area + this.data.showAddress.addressDetail, d = {
            accesstoken: this.store.data.userInfo.accesstoken,
            name: this.data.showAddress.name,
            mobile: this.data.showAddress.mobile,
            address: e,
            source: 4,
            channel: "WX_MINI",
            goodsUuid: this.store.data.payCarts[0].goods[0].goodsUuid,
            skuUuid: this.store.data.payCarts[0].goods[0].skuUuid,
            code: t
        };
        "" != this.data.groupUuid ? (d.groupUuid = this.data.groupUuid, d.createGroup = 0) : d.createGroup = 1;
        for (var r = 0; r < this.store.data.payCarts.length; r++) {
            var i = this.store.data.payCarts[r];
            null != i.remark && "" != i.remark && (d.remark = i.remark);
        }
        (0, o.getExemptAdd)(d, function(t) {
            1 === t.errcode ? (0, a.prePay)(t.data, function() {
                wx.showToast({
                    title: "支付成功",
                    icon: "none",
                    duration: 3e3
                }), s.setData({
                    isShowLoad: !1
                });
                var e = getCurrentPages(), a = e[e.length - 2];
                void 0 !== a.data.groupUuid && a.refreshGroup(), wx.redirectTo({
                    url: "/pages/order/orderDetail/orderDetail?orderUuid=" + t.data.optional.orderUuid + "&goodType=2&isShareGroup=true"
                });
            }, function() {
                wx.showToast({
                    title: "支付失败",
                    icon: "none",
                    duration: 3e3
                }), s.setData({
                    isShowLoad: !1
                }), wx.redirectTo({
                    url: "/pages/order/orderList/orderList?orderStatus=1&goodType=2"
                });
            }) : s.setData({
                isShowLoad: !1
            });
        });
    },
    toPage: function(t) {
        var s = "";
        switch (t.currentTarget.dataset.type) {
          case "优惠券":
            s = "/pages/mine/useCoupon/useCoupon?goodsInfo=" + this.data.goodsInfo;
            break;

          case "折扣卡":
            s = "/pages/mine/useDiscount/useDiscount?goodsInfo=" + this.data.goodsInfo;
        }
        wx.navigateTo({
            url: s
        });
    }
});