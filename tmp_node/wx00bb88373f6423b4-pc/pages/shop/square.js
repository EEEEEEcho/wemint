var t = getApp(), e = require("../../components/picker_datetime.js"), a = require("AddrManage.js"), n = require("../../components/city-picker.js");

require("../../config.js");

Page({
    queryparams: {},
    datetimePicker: null,
    addrManage: null,
    cityPicker: null,
    baseUrl: t.globalData.cdnBaseUrl,
    onShareAppMessage: function() {
        return t.shareAppMessage("/pages/shop/index");
    },
    navigateBackFunc: function(t) {
        var e = getCurrentPages(), a = e[e.length - 2];
        a && a.setData({
            backselectFlag: t
        });
    },
    showCouponinfoPlug: function() {
        this.setData({
            couponinfoFlag: !this.data.couponinfoFlag,
            textareaFlag: !this.data.textareaFlag
        });
    },
    onLoad: function(i) {
        t.getPageUrl(this, i), t.registerGlobalFunctions(this), this.queryparams = i, this.loadSquareInfo(), 
        this.datetimePicker = new e.pickerDatetime({
            page: this,
            animation: "slide",
            duration: 200
        }), this.navigateBackFunc(!0), this.addrManage = new a({
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
        baseUrl: t.globalData.cdnBaseUrl,
        UseJiFen: 0,
        pickupType: 1
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
            success: function(e) {
                e.confirm ? t.setData({
                    paymentPlugShow: !1
                }) : e.cancel && console.log("用户点击取消");
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
        var e = this;
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/BaseApi&a=getBalance",
            method: "POST",
            success: function(t) {
                t.success && e.setData({
                    balanceNumber: t.balance
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
    loadSquareInfo: function() {
        var e = this;
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getSquareInfo&pkeys=" + e.queryparams.pkeys,
            method: "POST",
            success: function(a) {
                if (a.success) {
                    delete a.success, delete a.msg;
                    var n = a.ordermoney + a.freight;
                    parseInt(a.JiFenScaleOut) > 0 && parseInt(a.JiFenAutoOut) > 0 && (n -= a.jifenmoney), 
                    a.maxJifen = a.jifen, a.maxJifenMoney = a.jifenmoney, e.setData({
                        squareInfo: a,
                        TotalMoney: n.toFixed(2),
                        freight: a.freight,
                        showPickupType: 0
                    }), e.getDefaultAddr();
                } else t.showModal({
                    title: "提示",
                    content: "操作失败：" + a.msg
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
    reCalMoney: function() {
        var t = this.data.squareInfo.ordermoney;
        if (this.data.UseCouponInfo && parseInt(this.data.UseCouponInfo.ItemID) > 0) {
            (t -= 1 == this.data.UseCouponInfo.Type ? this.data.UseCouponInfo.Amount : t * (1 - this.data.UseCouponInfo.Amount / 100).toFixed(2)) < 0 && (t = 0);
        }
        var e = 0, a = 0, n = t - this.data.squareInfo.maxJifenMoney;
        n >= 0 ? (a = this.data.squareInfo.maxJifenMoney, e = this.data.squareInfo.maxJifen) : e = (a = t) * this.data.squareInfo.JiFenScaleOut, 
        e = Math.ceil(e), this.data.squareInfo.jifen = e, this.data.squareInfo.jifenmoney = parseFloat(a).toFixed(2), 
        (this.data.UseJiFen || 1 == this.data.squareInfo.JiFenAutoOut) && (n >= 0 ? t -= a : t = 0), 
        2 != this.data.pickupType && (t += this.data.squareInfo.freight), this.setData({
            squareInfo: this.data.squareInfo,
            TotalMoney: t.toFixed(2) < 0 ? 0 : t.toFixed(2)
        });
    },
    onUseJiFenChange: function(t) {
        this.data.UseJiFen = 0 == this.data.UseJiFen ? 1 : 0, this.reCalMoney();
    },
    onCouponChange: function(t) {
        var e = t.currentTarget.dataset.type, a = t.currentTarget.dataset.itemid, n = t.currentTarget.dataset.amount, i = t.currentTarget.dataset.idx, s = {};
        if (i > -1) {
            var o = this.data.squareInfo.coupons[i];
            s = {
                ItemID: o.ItemID,
                Title: "0" === o.Type ? o.Amount / 10 + "折" : "订单满" + o.OrderMoney + "元减" + o.Amount + "元"
            };
        } else s = {
            ItemID: -1,
            Title: "不使用优惠券"
        };
        this.setData({
            couponTitleText: s,
            couponinfoFlag: !this.data.couponinfoFlag,
            textareaFlag: !this.data.textareaFlag
        }), this.setData({
            UseCouponInfo: {
                Type: e,
                ItemID: a,
                Amount: n
            }
        }), this.reCalMoney();
    },
    changeShowLbsShop: function() {
        this.setData({
            showLbsShop: !0
        });
    },
    onLbsShopChange: function(t) {
        var e = t.currentTarget.dataset.lbsname, a = t.currentTarget.dataset.lbsid;
        this.setData({
            LbsShopName: e,
            LbsShopId: a
        });
    },
    onLbsShopOK: function(e) {
        this.data.LbsShopId ? this.setData({
            showLbsShop: !1
        }) : t.showModal({
            title: "提示",
            content: "请选择门店"
        });
    },
    onTimeSure: function() {
        var e = this.data.squareInfo.ShopPickupStartTime.split(/[年月日时点:\s\-]+/), a = new Date(e[0], parseInt(e[1]) - 1, e[2], e[3], e[4]), n = this.data.PickupTime.split(/[年月日时点:\s\-]+/);
        if (new Date(n[0], parseInt(n[1]) - 1, n[2], n[3], n[4]) < a) {
            t.showModal({
                title: "提示",
                content: "取货时间必须大于" + e[0] + "-" + e[1] + "-" + e[2] + " " + e[3] + ":" + e[4]
            });
            var i = e[0] + "年" + e[1] + "月" + e[2] + "日 " + e[3] + ":" + e[4];
            this.setData({
                PickupTime: i
            });
        }
    },
    showTimeSelector: function() {
        this.datetimePicker.setPicker("PickupTime", {
            onBeforeSure: this.onTimeSure
        }, this.data.squareInfo.ShopPickupStartTime);
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
        var e = this, a = e.cityPicker.getDistrictCodeByName(t.ProvinceName, t.CityName, t.DistrictName);
        e.getFreightByAddr(a), e.setData({
            defaultAddr: t
        });
    },
    getDefaultAddr: function() {
        var e = this;
        t.sendRequest({
            url: "/index.php?c=front/Useraddr&a=GetDefaultAddr",
            method: "POST",
            success: function(a) {
                if (a.success) {
                    if (e.setData({
                        defaultAddr: a.addr
                    }), a.addr) {
                        var n = e.cityPicker.getDistrictCodeByName(a.addr.ProvinceName, a.addr.CityName, a.addr.DistrictName);
                        e.getFreightByAddr(n), e.addrManage.setCurrentAddrId(a.addr.ID);
                    }
                } else t.showModal({
                    title: "提示",
                    content: "操作失败：" + a.msg
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
    getFreightByAddr: function(e) {
        var a = this;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/ShopApi&a=calShopCartFreightMoney&district=" + e + "&pkeys=" + a.queryparams.pkeys,
            method: "POST",
            hideLoading: !0,
            success: function(e) {
                e.success ? (a.data.squareInfo.freight = e.freight, a.setData({
                    freight: e.freight
                }), a.reCalMoney()) : t.showModal({
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
    changePickupType: function(t) {
        var e = t.currentTarget.dataset.type;
        this.setData({
            pickupType: parseInt(e)
        }), this.reCalMoney();
    },
    onOrderSubmit: function(e) {
        var a = this;
        if (this.data.defaultAddr) {
            var n = e.detail.value, i = this.cityPicker.getDistrictCodeByName(this.data.defaultAddr.ProvinceName, this.data.defaultAddr.CityName, this.data.defaultAddr.DistrictName), s = {};
            a.setData({
                fromId: e.detail.formId
            }), s.PickupAddressID = n.LbsID ? n.LbsID : 0, s.pickupTime = this.data.PickupTime ? this.data.PickupTime : "", 
            s.pickUserName = n.Contact ? n.Contact : "", s.pickUserPhone = n.Mobile ? n.Mobile : "", 
            s.getProductType = this.data.pickupType, s.userAddrID = this.data.defaultAddr.ID, 
            s.district = i, s.Remark = n.Memo ? n.Memo : "", s.UseJiFen = this.data.UseJiFen, 
            s.CouponID = this.data.UseCouponInfo ? this.data.UseCouponInfo.ItemID : 0, s.pkeys = this.queryparams.pkeys, 
            a.navigateBackFunc(!1);
            var o = function(e) {
                t.sendRequest({
                    url: "/index.php?c=front/WxApp/ShopApi&a=payOrder",
                    method: "POST",
                    data: {
                        OrderID: e,
                        formid: a.data.fromId
                    },
                    success: function(t) {
                        t.success ? a.setData({
                            showSuccessPlug: !0,
                            paymentPlugShow: !1,
                            orderId: e
                        }) : wx.redirectTo({
                            url: "orderdetail?id=" + e
                        });
                    },
                    fail: function(t) {
                        wx.reLaunch({
                            url: "orderdetail?id=" + e
                        });
                    }
                });
            }, r = function(t) {
                o(t);
            }, d = function(e) {
                "1" === a.data.paymentFlag ? (a.setData({
                    paymentPlugShow: !1
                }), o(e)) : "2" === a.data.paymentFlag && t.wxPay(e, {
                    success: function() {
                        r(e);
                    },
                    fail: function(t) {
                        wx.redirectTo({
                            url: "orderdetail?id=" + e
                        });
                    }
                });
            };
            s.useNewCreateOrder = 1, t.sendRequest({
                url: "/index.php?c=front/WxApp/ShopApi&a=saveCartOrder",
                method: "POST",
                data: s,
                success: function(e) {
                    e.success ? d(e.OrderID) : t.showModal({
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
        } else t.showModal({
            title: "提示",
            content: "请选择地址..."
        });
    },
    goOrderdetail: function() {
        wx.redirectTo({
            url: "orderdetail?id=" + this.data.orderId
        });
    }
});