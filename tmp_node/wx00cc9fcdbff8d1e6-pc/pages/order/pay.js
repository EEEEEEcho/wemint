var t = getApp();

Page({
    data: {
        itemData: {},
        userId: 0,
        paytype: "weixin",
        remark: "",
        cartId: 0,
        addrId: 0,
        btnDisabled: !1,
        productData: [],
        address: {},
        total: 0,
        vprice: 0,
        vid: 0,
        addemt: 1,
        vou: []
    },
    onLoad: function(a) {
        var e = t.d.userId;
        this.setData({
            cartId: a.cartId,
            userId: e
        }), this.loadProductDetail();
    },
    loadProductDetail: function() {
        var a = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Payment/buy_cart",
            method: "post",
            data: {
                cart_id: a.data.cartId,
                uid: a.data.userId
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var e = t.data.adds;
                if (e) {
                    var r = e.id;
                    a.setData({
                        address: e,
                        addrId: r
                    });
                }
                a.setData({
                    addemt: t.data.addemt,
                    productData: t.data.pro,
                    total: t.data.price,
                    vprice: t.data.price,
                    vou: t.data.vou
                });
            }
        });
    },
    remarkInput: function(t) {
        this.setData({
            remark: t.detail.value
        });
    },
    getvou: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.price, r = this.data.vprice, d = parseFloat(r) - parseFloat(e);
        this.setData({
            total: d,
            vid: a
        });
    },
    createProductOrderByWX: function(t) {
        this.setData({
            paytype: "weixin"
        }), this.createProductOrder();
    },
    createProductOrderByXX: function(t) {
        return this.setData({
            paytype: "cash"
        }), wx.showToast({
            title: "线下支付开通中，敬请期待!",
            duration: 3e3
        }), !1;
    },
    createProductOrder: function() {
        this.setData({
            btnDisabled: !1
        });
        var a = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Payment/payment",
            method: "post",
            data: {
                uid: a.data.userId,
                cart_id: a.data.cartId,
                type: a.data.paytype,
                aid: a.data.addrId,
                remark: a.data.remark,
                price: a.data.total,
                vid: a.data.vid
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var e = t.data;
                if (1 == e.status) {
                    if ("cash" == e.arr.pay_type) return wx.showToast({
                        title: "请自行联系商家进行发货!",
                        duration: 3e3
                    }), !1;
                    "weixin" == e.arr.pay_type && a.wxpay(e.arr);
                } else wx.showToast({
                    title: "下单失败!",
                    duration: 2500
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "网络异常！err:createProductOrder",
                    duration: 2e3
                });
            }
        });
    },
    wxpay: function(a) {
        wx.request({
            url: t.d.ceshiUrl + "/Api/Wxpay/wxpay",
            data: {
                order_id: a.order_id,
                order_sn: a.order_sn,
                uid: this.data.userId
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (1 == t.data.status) {
                    var a = t.data.arr;
                    wx.requestPayment({
                        timeStamp: a.timeStamp,
                        nonceStr: a.nonceStr,
                        package: a.package,
                        signType: "MD5",
                        paySign: a.paySign,
                        success: function(t) {
                            wx.showToast({
                                title: "支付成功!",
                                duration: 2e3
                            }), setTimeout(function() {
                                wx.navigateTo({
                                    url: "../user/dingdan?currentTab=1&otype=deliver"
                                });
                            }, 2500);
                        },
                        fail: function(t) {
                            wx.showToast({
                                title: t,
                                duration: 3e3
                            });
                        }
                    });
                } else wx.showToast({
                    title: t.data.err,
                    duration: 2e3
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！err:wxpay",
                    duration: 2e3
                });
            }
        });
    }
});