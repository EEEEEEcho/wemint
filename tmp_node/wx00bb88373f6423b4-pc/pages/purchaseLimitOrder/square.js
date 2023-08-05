function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = getApp(), s = require("../../components/picker_datetime.js"), r = require("../shop/AddrManage.js"), n = require("../../components/city-picker.js"), d = require("../../config.js");

Page((a = {
    queryparams: {},
    datetimePicker: null,
    addrManage: null,
    cityPicker: null,
    productSubtotal: 0,
    baseUrl: e.globalData.cdnBaseUrl,
    attrImg: "",
    skuStr: "",
    onShareAppMessage: function() {
        return e.shareAppMessage("/pages/shop/index");
    },
    navigateBackFunc: function(t) {
        var a = getCurrentPages(), e = a[a.length - 2];
        e && e.setData({
            backselectFlag: t
        });
    },
    shoxCouponinfoPlug: function() {
        this.setData({
            couponinfoFlag: !this.data.couponinfoFlag,
            textareaFlag: !this.data.textareaFlag
        });
    },
    onLoad: function(t) {
        e.getPageUrl(this, t), e.registerGlobalFunctions(this), this.data.queryparams = t, 
        this.loadSquareInfo(), this.datetimePicker = new s.pickerDatetime({
            page: this,
            animation: "slide",
            duration: 200
        }), this.navigateBackFunc(!0), this.addrManage = new r({
            page: this,
            onSelected: this.onAddrManageClick
        }), this.cityPicker = new n(), this.getBalanceNumber();
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
        baseUrl: e.globalData.cdnBaseUrl,
        UseJiFen: 0,
        pickupType: 1,
        freight: 0,
        requestCount: 0
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
        var t = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/BaseApi&a=getBalance",
            method: "POST",
            success: function(a) {
                a.success && t.setData({
                    balanceNumber: a.balance
                });
            },
            fail: function(t) {
                e.showModal({
                    title: "提示",
                    content: "操作失败：" + t
                });
            }
        });
    },
    loadSquareInfo: function() {
        var t = this, a = "", s = "";
        "undefined" == this.data.queryparams.sku_status ? (a = "&sku_status=0", this.data.queryparams.sku_status = 0) : a = "&sku_status=" + this.data.queryparams.sku_status, 
        "undefined" == this.data.queryparams.sku_id ? (s = "&sku_id=0", this.data.queryparams.sku_id = 0) : s = "&sku_id=" + this.data.queryparams.sku_id, 
        e.sendRequest({
            url: "/index.php?c=front/WxApp/SecKill&a=comfirmOrder&ms_id=" + this.data.queryparams.ms_id + "&ms_product_id=" + this.data.queryparams.ms_product_id + "&ms_product_num=" + this.data.queryparams.ms_product_num + a + s,
            method: "GET",
            success: function(a) {
                200 != a.code ? e.showModal({
                    title: "提示",
                    content: "操作失败：" + a.msg
                }) : (delete a.success, delete a.msg, t.setData({
                    squareInfo: a.data.product,
                    productSubtotal: a.data.product_subtotal,
                    freight: a.data.product.freight_fee,
                    msPrice: a.data.product.ms_price,
                    num: a.data.product.num,
                    skuStr: a.data.product.sku_str,
                    TotalMoney: a.data.product_subtotal + a.data.freight_fee,
                    attrImg: t.data.queryparams.attrImg
                }), t.getDefaultAddr());
            },
            fail: function(t) {
                e.showModal({
                    title: "提示",
                    content: "操作失败：" + t
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
        var t = this;
        e.sendRequest({
            url: "/index.php?c=front/Useraddr&a=GetDefaultAddr",
            method: "POST",
            success: function(a) {
                if (a.success) {
                    if (t.setData({
                        defaultAddr: a.addr
                    }), a.addr) {
                        var s = a.addr.District;
                        t.getFreightByAddr(s), t.addrManage.setCurrentAddrId(a.addr.ID);
                    }
                } else e.showModal({
                    title: "提示",
                    content: "操作失败：" + a.msg
                });
            },
            fail: function(t) {
                e.showModal({
                    title: "提示",
                    content: "操作失败：" + t
                });
            }
        });
    },
    getFreightByAddr: function(t) {
        var a = this;
        e.sendRequest({
            url: "/index.php?c=front/WxApp/ShopApi&a=calShopCartFreightMoney&district=" + t + "&pkeys=" + a.queryparams.pkeys,
            method: "POST",
            hideLoading: !0,
            success: function(t) {
                t.success ? (a.data.squareInfo.freight = t.freight, a.setData({
                    freight: t.freight
                })) : e.showModal({
                    title: "提示",
                    content: "操作失败：" + t.msg
                });
            },
            fail: function(t) {
                e.showModal({
                    title: "提示",
                    content: "操作失败：" + t
                });
            }
        });
    }
}, t(a, "getFreightByAddr", function(t) {
    var a = this;
    e.sendRequest({
        url: "/index.php?c=front/WxApp/SecKill&a=deliveryFee&district_id=" + t + "&products_str=" + this.data.squareInfo.product_id + "|" + this.data.queryparams.ms_product_num,
        method: "GET",
        hideLoading: !0,
        success: function(t) {
            200 == !t.code ? e.showModal({
                title: "提示",
                content: "操作失败：" + t.msg
            }) : a.setData({
                freight: t.data.freight_fee
            });
        },
        fail: function(t) {
            e.showModal({
                title: "提示",
                content: "操作失败：" + t
            });
        }
    });
}), t(a, "changePickupType", function(t) {
    var a = t.currentTarget.dataset.type;
    this.setData({
        pickupType: parseInt(a)
    });
}), t(a, "onOrderSubmit", function(t) {
    var a = this;
    if (this.data.defaultAddr) {
        var s = t.detail.value, r = (this.cityPicker.getDistrictCodeByName(this.data.defaultAddr.ProvinceName, this.data.defaultAddr.CityName, this.data.defaultAddr.DistrictName), 
        {});
        a.setData({
            fromId: t.detail.formId
        }), r.ms_id = this.data.queryparams.ms_id, r.ms_product_id = this.data.queryparams.ms_product_id, 
        r.ms_product_num = this.data.queryparams.ms_product_num, r.sku_id = this.data.queryparams.sku_id, 
        r.sku_status = this.data.queryparams.sku_status, r.address_id = this.data.defaultAddr.ID, 
        r.remark = s.Memo, a.navigateBackFunc(!1), e.sendRequest({
            url: "/index.php?c=front/WxApp/SecKill&a=createOrder",
            method: "POST",
            data: r,
            success: function(t) {
                200 != t.code ? e.showModal({
                    title: "提示",
                    content: "操作失败：" + t.msg
                }) : (a.requestOrder(t.data.unique_id), wx.setStorage({
                    key: "ms_productLog_id",
                    data: t.data.ms_productLog_id
                }));
            },
            fail: function(t) {
                e.showModal({
                    title: "提示",
                    content: "操作失败：" + t
                });
            }
        });
    } else e.showModal({
        title: "提示",
        content: "请选择地址..."
    });
}), t(a, "funcPayOrder", function(t) {
    var a = this;
    e.sendRequest({
        url: "/index.php?c=front/WxApp/ShopApi&a=payOrder",
        method: "POST",
        data: {
            OrderID: t,
            formid: a.data.fromId
        },
        success: function(e) {
            e.success ? a.setData({
                showSuccessPlug: !0,
                paymentPlugShow: !1,
                orderId: t
            }) : wx.redirectTo({
                url: "../orderDetail?id=" + t
            });
        },
        fail: function(e) {
            wx.reLaunch({
                url: "../orderDetail?id=" + t
            }), a.setData({
                paymentPlugShow: !1
            });
        }
    });
}), t(a, "funcOnPaySuccess", function(t) {
    this.funcPayOrder(t);
}), t(a, "funcOnSaveSuccess", function(t) {
    var a = this;
    "1" != d.SKIP_WXPAY ? "1" === a.data.paymentFlag ? (a.setData({
        paymentPlugShow: !1
    }), a.funcPayOrder(t)) : "2" === a.data.paymentFlag && e.wxPay(t, {
        success: function() {
            a.funcOnPaySuccess(t);
        },
        fail: function(s) {
            e.showModal({
                title: "提示",
                content: "支付失败" + s.errMsg
            }), wx.reLaunch({
                url: "userorder"
            }), wx.redirectTo({
                url: "../orderDetail?id=" + t
            }), a.setData({
                paymentPlugShow: !1
            });
        }
    }) : a.funcOnPaySuccess(t);
}), t(a, "requestOrder", function(t) {
    var a = this;
    e.sendRequestSecOrder({
        url: "/index.php?c=Front/WxApp/SecKill&a=getOrderResult&unique_id=" + t,
        method: "GET",
        success: function(s) {
            wx.showLoading({
                title: "正在抢购中",
                mask: !0
            }), 200 != s.code ? (console.log(a.data.requestCount), a.data.requestCount = a.data.requestCount + 1, 
            a.data.requestCount < 11 ? setTimeout(function() {
                a.requestOrder(t);
            }, 1e3) : a.data.requestCount < 21 ? setTimeout(function() {
                a.requestOrder(t);
            }, 2e3) : a.data.requestCount < 31 ? setTimeout(function() {
                a.requestOrder(t);
            }, 3e3) : (e.showModal({
                title: "提示",
                content: "订单请求失败"
            }), a.data.requestCount = 0, a.setData({
                paymentPlugShow: !1
            }), wx.hideLoading())) : (a.data.requestCount = 0, a.data.orderId = s.data.orderId, 
            wx.hideLoading(), a.showPaymentPlug());
        },
        fail: function(t) {
            e.showModal({
                title: "提示",
                content: "订单请求失败"
            });
        }
    });
}), t(a, "showLoading", function(t) {
    wx.showLoading({
        title: "正在抢购中",
        mask: !0
    });
}), t(a, "goOrderdetail", function() {
    wx.redirectTo({
        url: "./orderDetail?id=" + this.data.orderId
    });
}), t(a, "onPay", function() {
    this.funcOnSaveSuccess(this.data.orderId);
}), a));