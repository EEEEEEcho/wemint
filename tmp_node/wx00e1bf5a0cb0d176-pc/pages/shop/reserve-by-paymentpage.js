var e = getApp();

require("../../common.js");

Page({
    isloading: !1,
    url: !1,
    data: {
        balanceNumber: "0",
        payway: 1,
        baseUrl: e.globalData.siteBaseUrl,
        couponinfoFlag: !1,
        couponList: [],
        useCouponID: "",
        canBeat: !0,
        wxPay: !1
    },
    onLoad: function(a) {
        var t = this;
        t.url = e.getPageUrl(t, a), e.registerGlobalFunctions(t), t.setData({
            queryparams: a
        }), t.loadServiceInfo(), t.getBalanceNumber(), 1 === parseInt(e.globalData.baseInfo.EnableWxPay) ? t.setData({
            wxPay: !0
        }) : t.setData({
            payway: 3
        });
    },
    onShow: function() {},
    loadServiceInfo: function() {
        var a = this;
        if (!a.isloading) {
            a.isloading = !0;
            var t = 0, o = "", n = JSON.parse(a.data.queryparams.data);
            n.colServiceID && (t = n.colServiceID), "" !== a.data.useCouponID && (o = a.data.useCouponID), 
            e.sendRequest({
                url: "/index.php?c=Front/WxApp/ServiceApi&a=calServiceMoney&serviceId=" + t + "&couponId=" + o,
                method: "GET",
                success: function(e) {
                    a.isloading = !1, e.success ? a.setData({
                        totalMoney: e.data.money,
                        payMoney: e.data.payMoney
                    }) : console.log("getServiceInfo fail：" + e.msg);
                },
                fail: function(e) {
                    a.isloading = !1, console.log("getServiceInfo fail" + e);
                }
            });
        }
    },
    getBalanceNumber: function() {
        var a = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/BaseApi&a=getBalance",
            method: "POST",
            success: function(e) {
                e.success && (0 != e.balance ? a.setData({
                    balanceNumber: e.balance.toFixed(2)
                }) : a.setData({
                    balanceflagNum: !0
                }));
            },
            fail: function(a) {
                e.showModal({
                    title: "提示",
                    content: a
                });
            }
        });
    },
    onPayWayChange: function(e) {
        this.data.balanceNumber - this.data.payMoney < 0 || this.setData({
            payway: e.currentTarget.dataset.val
        });
    },
    showCouponinfoPlug: function() {
        this.setData({
            couponinfoFlag: !this.data.couponinfoFlag
        });
    },
    onCouponChange: function(a) {
        var t = this, o = (a.currentTarget.dataset.type, a.currentTarget.dataset.itemid, 
        a.currentTarget.dataset.amount, a.currentTarget.dataset.idx), n = {};
        if (o > -1) {
            var s = this.data.couponList[o];
            if (t.data.money < parseFloat(s.OrderMoney)) return void e.showModal({
                title: "提示",
                content: "请重新选择优惠券！"
            });
            n = {
                ItemID: s.ItemID,
                Title: "0" === s.Type ? s.Amount / 10 + "折" : "消费满" + s.OrderMoney + "元减" + s.Amount + "元"
            };
        } else n = {
            ItemID: -1,
            Title: "不使用优惠券"
        };
        this.setData({
            couponTitleText: n,
            couponinfoFlag: !this.data.couponinfoFlag,
            useCouponID: -1 !== n.ItemID ? n.ItemID : ""
        }), this.loadServiceInfo();
    },
    canNoChoose: function() {
        this.data.canNoChooseToast ? e.showToast({
            title: "暂无优惠券可以使用哦~",
            icon: "none"
        }) : e.showToast({
            title: "此优惠券不可用",
            icon: "none"
        });
    },
    getCouponsList: function() {
        var a = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/ServiceApi&a=getServiceCoupons",
            method: "POST",
            data: {
                money: this.data.totalMoney
            },
            success: function(e) {
                if (a.setData({
                    couponinfoFlag: !0
                }), e.success) {
                    var t = e.data.match_list;
                    0 === t.length ? a.setData({
                        canNoChooseToast: !0
                    }) : a.setData({
                        canNoChooseToast: !1
                    });
                    var o = e.data.no_match_list, n = t.concat(o);
                    n.forEach(function(e) {
                        0 == e.Type ? e.Amount = (e.Amount / 10).toString().replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, "") : e.Amount = e.Amount.replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, ""), 
                        e.OrderMoney = e.OrderMoney.replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, ""), e.ExTime = e.ExTime.split(" ")[0], 
                        a.data.totalMoney < parseFloat(e.OrderMoney) ? e.canUse = !1 : e.canUse = !0;
                    }), a.setData({
                        couponList: n
                    });
                } else console.log("getCouponList fail" + e.msg);
            }
        });
    },
    pay: function() {
        var a = this, t = a.data.queryparams;
        if (a.data.canBeat) {
            a.setData({
                canBeat: !1
            });
            var o = JSON.parse(a.data.queryparams.data);
            o.payType = a.data.payway, o.Remark = "", o.CouponID = a.data.useCouponID, e.sendRequest({
                url: "/index.php?c=Front/WxApp/ServiceApi&a=saveReserveNew",
                method: "POST",
                data: o,
                success: function(n) {
                    if (n.success) if (n.data.config) {
                        var s = n.data.config;
                        wx.requestPayment({
                            timeStamp: s.timeStamp,
                            nonceStr: s.nonceStr,
                            package: s.package,
                            signType: s.signType,
                            paySign: s.paySign,
                            success: function(s) {
                                e.sendRequest({
                                    url: "/index.php?c=Front/WxApp/ServiceApi&a=successPay",
                                    method: "POST",
                                    data: {
                                        order_no: n.data.order_no
                                    },
                                    success: function(n) {
                                        a.setData({
                                            canBeat: !0
                                        }), n.success ? (a.getBuried({
                                            serviceID: o.colServiceID,
                                            serviceName: t.serviceName,
                                            serviceImg: t.serviceImg
                                        }), setTimeout(function() {
                                            e.showModal({
                                                title: "提示",
                                                content: "预约成功，请在 会员中心->我的预约 里查看预约详情",
                                                confirmText: "查看详情",
                                                confirm: function() {
                                                    wx.redirectTo({
                                                        url: "myreserve"
                                                    });
                                                }
                                            });
                                        }, 1e3)) : e.showModal({
                                            title: "提示",
                                            content: "" + n.msg
                                        });
                                    },
                                    fail: function() {
                                        a.setData({
                                            canBeat: !0
                                        });
                                    }
                                });
                            },
                            fail: function(t) {
                                e.sendRequest({
                                    url: "/index.php?c=Front/WxApp/ServiceApi&a=cancelPay",
                                    method: "POST",
                                    data: {
                                        order_no: n.data.order_no
                                    },
                                    success: function(t) {
                                        a.setData({
                                            canBeat: !0
                                        }), t.success || e.showModal({
                                            title: "提示",
                                            content: "" + t.msg
                                        });
                                    },
                                    fail: function() {
                                        a.setData({
                                            canBeat: !0
                                        });
                                    }
                                }), "requestPayment:fail no permission" == t.errMsg ? e.showModal({
                                    title: "提示",
                                    content: "支付失败：小程序微信支付未开通"
                                }) : e.showModal({
                                    title: "提示",
                                    content: "支付失败：" + t.errMsg
                                });
                            }
                        });
                    } else a.getBuried({
                        serviceID: o.colServiceID,
                        serviceName: t.serviceName,
                        serviceImg: t.serviceImg
                    }), a.setData({
                        canBeat: !0
                    }), e.showModal({
                        title: "提示",
                        content: "预约成功，请在 会员中心->我的预约 里查看预约详情",
                        confirmText: "查看详情",
                        confirm: function() {
                            wx.redirectTo({
                                url: "myreserve"
                            });
                        }
                    }); else e.showModal({
                        title: "提示",
                        content: "" + n.msg
                    }), a.setData({
                        canBeat: !0
                    });
                },
                fail: function(e) {
                    a.setData({
                        canBeat: !0
                    }), console.log("pay fail" + e);
                }
            });
        }
    },
    getBuried: function(a) {
        var t = wx.getStorageSync("businessCardInfo");
        if (t && t.admin) {
            var o = {
                tbUserID: e.globalData.WebUserID,
                tbType: "22",
                tbTypeID: a.serviceID,
                tbTypeName: a.serviceName,
                tbTypeImg: a.serviceImg,
                tbBusinessCardID: wx.getStorageSync("otherMemberCardId") ? wx.getStorageSync("otherMemberCardId") : 0
            };
            e.buried(o, function(e) {});
        } else {
            var n = {
                tbUserID: e.globalData.WebUserID,
                tbType: "22",
                tbTypeID: a.colServiceID,
                tbTypeName: a.serviceName,
                tbTypeImg: a.serviceImg,
                tbBusinessCardID: wx.getStorageSync("businessCardId") ? wx.getStorageSync("businessCardId") : 0
            };
            e.buried(n, function(e) {});
        }
    }
});