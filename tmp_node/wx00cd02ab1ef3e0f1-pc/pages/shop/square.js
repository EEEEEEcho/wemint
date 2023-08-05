var e = getApp(), t = require("../../components/picker_datetime.js"), a = require("AddrManage.js"), n = require("../../components/city-picker.js");

require("../../config.js");

Page({
    queryparams: {},
    datetimePicker: null,
    addrManage: null,
    cityPicker: null,
    onShareAppMessage: function() {
        return e.shareAppMessage("/pages/shop/index");
    },
    navigateBackFunc: function(e) {
        var t = getCurrentPages(), a = t[t.length - 2];
        a && a.setData({
            backselectFlag: e
        });
    },
    showCouponinfoPlug: function() {
        this.setData({
            couponinfoFlag: !this.data.couponinfoFlag,
            textareaFlag: !this.data.textareaFlag
        });
    },
    onLoad: function(i) {
        e.getPageUrl(this, i), e.registerGlobalFunctions(this), this.queryparams = i, this.loadSquareInfo(), 
        this.datetimePicker = new t.pickerDatetime({
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
        baseUrl: e.globalData.cdnBaseUrl,
        UseJiFen: 0,
        pickupType: 1
    },
    getIntegralSelec: function() {
        this.setData({
            integralFlag: !this.data.integralFlag
        });
    },
    changePaymentWay: function(e) {
        this.data.balanceNumber - this.data.TotalMoney < 0 || this.setData({
            paymentFlag: e.currentTarget.dataset.paymentflag
        });
    },
    closePaymentPlug: function() {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "您确定要放弃支付吗？",
            success: function(t) {
                t.confirm ? e.setData({
                    paymentPlugShow: !1
                }) : t.cancel && console.log("用户点击取消");
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
            success: function(e) {
                e.success && t.setData({
                    balanceNumber: e.balance
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
        var t = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getSquareInfo&pkeys=" + t.queryparams.pkeys,
            method: "POST",
            success: function(a) {
                if (console.log(a), a.success) {
                    delete a.success, delete a.msg;
                    var n = a.ordermoney + a.freight;
                    parseInt(a.JiFenScaleOut) > 0 && parseInt(a.JiFenAutoOut) > 0 && (n -= a.jifenmoney), 
                    a.maxJifen = a.jifen, a.maxJifenMoney = a.jifenmoney, t.setData({
                        squareInfo: a,
                        TotalMoney: n.toFixed(2),
                        freight: a.freight,
                        showPickupType: 0
                    }), t.getDefaultAddr();
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
    reCalMoney: function() {
        var e = this.data.squareInfo.ordermoney;
        if (this.data.UseCouponInfo && parseInt(this.data.UseCouponInfo.ItemID) > 0) {
            (e -= 1 == this.data.UseCouponInfo.Type ? this.data.UseCouponInfo.Amount : e * (1 - this.data.UseCouponInfo.Amount / 100).toFixed(2)) < 0 && (e = 0);
        }
        var t = 0, a = 0, n = e - this.data.squareInfo.maxJifenMoney;
        n >= 0 ? (a = this.data.squareInfo.maxJifenMoney, t = this.data.squareInfo.maxJifen) : t = (a = e) * this.data.squareInfo.JiFenScaleOut, 
        t = Math.ceil(t), this.data.squareInfo.jifen = t, this.data.squareInfo.jifenmoney = parseFloat(a).toFixed(2), 
        (this.data.UseJiFen || 1 == this.data.squareInfo.JiFenAutoOut) && (n >= 0 ? e -= a : e = 0), 
        2 != this.data.pickupType && (e += this.data.squareInfo.freight), this.setData({
            squareInfo: this.data.squareInfo,
            TotalMoney: e.toFixed(2) < 0 ? 0 : e.toFixed(2)
        });
    },
    onUseJiFenChange: function(e) {
        this.data.UseJiFen = 0 == this.data.UseJiFen ? 1 : 0, this.reCalMoney();
    },
    onCouponChange: function(e) {
        var t = e.currentTarget.dataset.type, a = e.currentTarget.dataset.itemid, n = e.currentTarget.dataset.amount, i = e.currentTarget.dataset.idx, s = {};
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
                Type: t,
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
    onLbsShopChange: function(e) {
        var t = e.currentTarget.dataset.lbsname, a = e.currentTarget.dataset.lbsid;
        this.setData({
            LbsShopName: t,
            LbsShopId: a
        });
    },
    onLbsShopOK: function(t) {
        this.data.LbsShopId ? this.setData({
            showLbsShop: !1
        }) : e.showModal({
            title: "提示",
            content: "请选择门店"
        });
    },
    onTimeSure: function() {
        var t = this.data.squareInfo.ShopPickupStartTime.split(/[年月日时点:\s\-]+/), a = new Date(t[0], parseInt(t[1]) - 1, t[2], t[3], t[4]), n = this.data.PickupTime.split(/[年月日时点:\s\-]+/);
        if (new Date(n[0], parseInt(n[1]) - 1, n[2], n[3], n[4]) < a) {
            e.showModal({
                title: "提示",
                content: "取货时间必须大于" + t[0] + "-" + t[1] + "-" + t[2] + " " + t[3] + ":" + t[4]
            });
            var i = t[0] + "年" + t[1] + "月" + t[2] + "日 " + t[3] + ":" + t[4];
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
    onAddrManageClick: function(e) {
        var t = this, a = t.cityPicker.getDistrictCodeByName(e.ProvinceName, e.CityName, e.DistrictName);
        t.getFreightByAddr(a), t.setData({
            defaultAddr: e
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
                        var n = t.cityPicker.getDistrictCodeByName(a.addr.ProvinceName, a.addr.CityName, a.addr.DistrictName);
                        t.getFreightByAddr(n), t.addrManage.setCurrentAddrId(a.addr.ID);
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
                }), a.reCalMoney()) : e.showModal({
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
    },
    changePickupType: function(e) {
        var t = e.currentTarget.dataset.type;
        this.setData({
            pickupType: parseInt(t)
        }), this.reCalMoney();
    },
    onOrderSubmit: function(t) {
        var a = this;
        if (this.data.defaultAddr) {
            var n = t.detail.value, i = this.cityPicker.getDistrictCodeByName(this.data.defaultAddr.ProvinceName, this.data.defaultAddr.CityName, this.data.defaultAddr.DistrictName), s = {};
            a.setData({
                fromId: t.detail.formId
            }), s.PickupAddressID = n.LbsID ? n.LbsID : 0, s.pickupTime = this.data.PickupTime ? this.data.PickupTime : "", 
            s.pickUserName = n.Contact ? n.Contact : "", s.pickUserPhone = n.Mobile ? n.Mobile : "", 
            s.getProductType = this.data.pickupType, s.userAddrID = this.data.defaultAddr.ID, 
            s.district = i, s.Remark = n.Memo ? n.Memo : "", s.UseJiFen = this.data.UseJiFen, 
            s.CouponID = this.data.UseCouponInfo ? this.data.UseCouponInfo.ItemID : 0, s.pkeys = this.queryparams.pkeys, 
            a.navigateBackFunc(!1);
            var o = function(t) {
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
                            url: "orderdetail?id=" + t
                        });
                    },
                    fail: function(e) {
                        wx.reLaunch({
                            url: "orderdetail?id=" + t
                        });
                    }
                });
            }, r = function(e) {
                o(e);
            }, d = function(t) {
                "1" === a.data.paymentFlag ? (a.setData({
                    paymentPlugShow: !1
                }), o(t)) : "2" === a.data.paymentFlag && e.wxPay(t, {
                    success: function() {
                        r(t);
                    },
                    fail: function(e) {
                        wx.redirectTo({
                            url: "orderdetail?id=" + t
                        });
                    }
                });
            };
            s.useNewCreateOrder = 1, e.sendRequest({
                url: "/index.php?c=front/WxApp/ShopApi&a=saveCartOrder",
                method: "POST",
                data: s,
                success: function(t) {
                    console.log(t), t.success ? d(t.OrderID) : e.showModal({
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
        } else e.showModal({
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