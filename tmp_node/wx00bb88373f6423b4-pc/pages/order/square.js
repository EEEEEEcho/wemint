var t = getApp(), a = require("../../components/picker_datetime.js"), e = require("../shop/AddrManage.js"), i = require("../../components/city-picker.js");

require("../../config.js");

Page({
    queryparams: {},
    datetimePicker: null,
    addrManage: null,
    cityPicker: null,
    productSubtotal: 0,
    baseUrl: t.globalData.cdnBaseUrl,
    attrImg: "",
    skuStr: "",
    onShareAppMessage: function() {
        return t.shareAppMessage("/pages/shop/index");
    },
    navigateBackFunc: function(t) {
        var a = getCurrentPages(), e = a[a.length - 2];
        e && e.setData({
            backselectFlag: t
        });
    },
    showCouponinfoPlug: function() {
        this.setData({
            couponinfoFlag: !this.data.couponinfoFlag,
            textareaFlag: !this.data.textareaFlag
        });
    },
    onLoad: function(n) {
        t.getPageUrl(this, n), t.registerGlobalFunctions(this), this.data.queryparams = n, 
        this.loadSquareInfo(), this.datetimePicker = new a.pickerDatetime({
            page: this,
            animation: "slide",
            duration: 200
        }), this.navigateBackFunc(!0), this.addrManage = new e({
            page: this,
            onSelected: this.onAddrManageClick
        }), this.cityPicker = new i(), this.getBalanceNumber();
    },
    data: {
        integralFlag: !1,
        paymentPlugShow: !1,
        paymentFlag: 1,
        noSuccessText: "",
        showSuccessPlug: !1,
        textareaFlag: !1,
        successFlag: !0,
        balanceNumber: 0,
        showLbsShop: !1,
        couponTitleText: {
            ItemID: -1,
            Title: "不使用优惠券"
        },
        balanceflagNum: !1,
        hasproduct: !0,
        couponinfoFlag: !1,
        baseUrl: t.globalData.cdnBaseUrl,
        UseJiFen: 0,
        pickupType: 1,
        freight: 0,
        ActivityID: ""
    },
    getIntegralSelec: function() {
        this.setData({
            integralFlag: !this.data.integralFlag
        });
    },
    changePaymentWay: function(t) {
        this.data.balanceNumber - this.data.TotalMoney < 0 || this.setData({
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
                    paymentPlugShow: !1
                }) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    showPaymentPlug: function() {
        this.setData({
            paymentPlugShow: !0,
            balanceflagNum: this.data.balanceNumber - this.data.TotalMoney < 0,
            paymentFlag: this.data.balanceNumber - this.data.TotalMoney > 0 ? "1" : "2"
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
    loadSquareInfo: function() {
        var a = this;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=comfirmOrder&pintuan_id=" + this.data.queryparams.pintuan_id + "&pintuan_product_id=" + this.data.queryparams.pintuan_product_id + "&pintuan_product_num=" + this.data.queryparams.pintuan_product_num + "&sku_id=" + this.data.queryparams.sku_id,
            method: "GET",
            success: function(e) {
                e.success ? (delete e.success, delete e.msg, a.setData({
                    squareInfo: e.data.product,
                    productSubtotal: e.data.product_subtotal,
                    freight: e.data.product.freight_fee,
                    pintuanPrice: e.data.product.pintuan_price,
                    num: a.data.queryparams.pintuan_product_num,
                    skuStr: e.data.product.sku_str,
                    TotalMoney: (e.data.product_subtotal + e.data.freight_fee).toFixed(2),
                    attrImg: a.data.queryparams.attrImg,
                    ActivityID: e.data.ActivityID
                }), a.getDefaultAddr()) : t.showModal({
                    title: "提示",
                    content: "操作失败：" + e.msg
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
    showAddrManage: function() {
        this.setData({
            showAddrManage: !0,
            textareaFlag: !this.data.textareaFlag
        }), this.addrManage.loadUserAddrList();
    },
    hideAddrManage: function() {
        this.setData({
            showAddrManage: !1,
            textareaFlag: !this.data.textareaFlag
        });
    },
    onAddrManageClick: function(t) {
        var a = this, e = a.cityPicker.getDistrictCodeByName(t.ProvinceName, t.CityName, t.DistrictName);
        a.getFreightByAddr(e), a.setData({
            defaultAddr: t
        });
    },
    getDefaultAddr: function() {
        var a = this;
        t.sendRequest({
            url: "/index.php?c=front/Useraddr&a=GetDefaultAddr",
            method: "POST",
            success: function(e) {
                if (e.success) {
                    if (a.setData({
                        defaultAddr: e.addr
                    }), e.addr) {
                        var i = e.addr.District;
                        a.getFreightByAddr(i), a.addrManage.setCurrentAddrId(e.addr.ID);
                    }
                } else t.showModal({
                    title: "提示",
                    content: "操作失败：" + e.msg
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
    getFreightByAddr: function(a) {
        var e = this;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=deliveryFee&district_id=" + a + "&products_str=" + this.data.squareInfo.product_id + "|" + this.data.queryparams.pintuan_product_num + "&ActivityID=" + e.data.ActivityID,
            method: "GET",
            hideLoading: !0,
            success: function(a) {
                if (a.success) {
                    var i = (e.data.productSubtotal + a.data.freight_fee).toFixed(2);
                    e.setData({
                        freight: a.data.freight_fee,
                        TotalMoney: i
                    });
                } else t.showModal({
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
    changePickupType: function(t) {
        var a = t.currentTarget.dataset.type;
        this.setData({
            pickupType: parseInt(a)
        });
    },
    onOrderSubmit: function(a) {
        var e = this;
        if (this.data.defaultAddr) {
            a.detail.value, this.cityPicker.getDistrictCodeByName(this.data.defaultAddr.ProvinceName, this.data.defaultAddr.CityName, this.data.defaultAddr.DistrictName);
            var i = {};
            e.setData({
                fromId: a.detail.formId
            }), i.pintuan_id = this.data.queryparams.pintuan_id, i.pintuan_product_id = this.data.queryparams.pintuan_product_id, 
            i.pintuan_product_num = this.data.queryparams.pintuan_product_num, i.sku_id = this.data.queryparams.sku_id, 
            i.address_id = this.data.defaultAddr.ID, i.remark = this.data.queryparams.remark, 
            i.pintuan_group_id = this.data.queryparams.pintuan_group_id, console.log(this.data.queryparams.pintuan_group_id), 
            e.navigateBackFunc(!1);
            var n = function(a) {
                t.sendRequest({
                    url: "/index.php?c=front/WxApp/ShopApi&a=payOrder",
                    method: "POST",
                    data: {
                        OrderID: a,
                        formid: e.data.fromId
                    },
                    success: function(t) {
                        t.success ? e.setData({
                            showSuccessPlug: !0,
                            paymentPlugShow: !1,
                            orderId: a
                        }) : wx.redirectTo({
                            url: "../shop/orderdetail?id=" + a
                        });
                    },
                    fail: function(t) {
                        wx.reLaunch({
                            url: "../shop/orderdetail?id=" + a
                        }), e.setData({
                            paymentPlugShow: !1
                        });
                    }
                });
            }, r = function(t) {
                n(t);
            }, d = function(a) {
                "1" === e.data.paymentFlag ? (e.setData({
                    paymentPlugShow: !1
                }), n(a)) : "2" === e.data.paymentFlag && t.wxPay(a, {
                    success: function() {
                        r(a);
                    },
                    fail: function(t) {
                        wx.reLaunch({
                            url: "userorder"
                        }), wx.redirectTo({
                            url: "../shop/orderdetail?id=" + a
                        }), e.setData({
                            paymentPlugShow: !1
                        });
                    }
                });
            };
            t.sendRequest({
                url: "/index.php?c=front/WxApp/pintuan&a=createOrder",
                method: "POST",
                data: i,
                success: function(a) {
                    a.success ? (d(a.data.OrderID), wx.setStorage({
                        key: "pintuan_group_id",
                        data: a.data.pintuan_group_id
                    })) : t.showModal({
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
        } else t.showModal({
            title: "提示",
            content: "请选择地址..."
        });
    },
    goOrderdetail: function() {
        wx.redirectTo({
            url: "../shop/orderdetail?id=" + this.data.orderId
        });
    }
});