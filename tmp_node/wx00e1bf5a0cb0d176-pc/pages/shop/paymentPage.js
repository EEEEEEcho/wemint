var a = getApp();

Page({
    data: {
        baseUrl: a.globalData.siteBaseUrl,
        ismember: !0,
        admin_id: 0,
        store_id: 0,
        money: "",
        moneyTip: "0.00",
        canInput: !0,
        successFlag: !1,
        markShow: !1,
        couponinfoFlag: !1,
        couponList: [],
        useCouponID: "",
        integralEnable: !1,
        integralState: !1,
        resData: null,
        available: "",
        availableMax: "",
        Deductible: "",
        moneyMax: 0,
        moneyMaxNum: 0,
        processing: !0,
        otherSuccessFlag: !1
    },
    onLoad: function(t) {
        this.setData({
            admin_id: t.a || 0,
            store_id: t.s || 0,
            money: t.m || "",
            moneyTip: t.m || "0.00",
            canInput: t.m > 0
        }), a.doAfterUserInfoAuth({
            success: this.loginSuccessCallback
        });
    },
    getUserInfo: function(a) {
        console.log(a);
    },
    moneyInput: function(a) {
        var t = this, e = {
            ItemID: -1,
            Title: ""
        };
        this.setData({
            couponTitleText: e,
            useCouponID: ""
        });
        var n = a.detail.value;
        n > 1e7 ? t.setData({
            money: "" + a.detail.value.slice(0, 7),
            moneyTip: "" + a.detail.value.slice(0, 7)
        }) : n.split(".")[1] ? n.split(".")[1].length > 2 ? "." == n.split("")[0] ? t.setData({
            money: "0." + n.split(".")[1].slice(0, 2),
            moneyTip: "0." + n.split(".")[1].slice(0, 2)
        }) : t.setData({
            money: n.split(".")[0] + "." + n.split(".")[1].slice(0, 2),
            moneyTip: n.split(".")[0] + "." + n.split(".")[1].slice(0, 2)
        }) : "." == n.split("")[0] ? t.setData({
            money: "0." + n.split(".")[1].slice(0, 2),
            moneyTip: "0." + n.split(".")[1].slice(0, 2)
        }) : t.setData({
            money: n,
            moneyTip: n
        }) : "." === n.split("")[0] ? t.setData({
            money: "0.",
            moneyTip: "0."
        }) : t.setData({
            money: "" + n.slice(0, 7),
            moneyTip: "" + n.slice(0, 7)
        }), "" === n && t.setData({
            moneyTip: "0.00"
        }), t.CalculationIntegral();
    },
    changeNum: function(a) {
        return a += "", /^0+/.test(a) && (a = a.replace(/^0+/, "")), /\./.test(a) || (a += ".00"), 
        /\./.test(a) && (a += "00"), /^\./.test(a) && (a = "0" + a, a = (a += "00").match(/\d+\.\d{2}/)[0]), 
        /\.\d/.test(a) && (a = (a += "0").match(/\d+\.\d{2}/)[0]), a;
    },
    pay: function() {
        var t = this, e = t.data.money, n = /^\d*[.]?\d{0,2}$/;
        if ("" !== e) if (n.test(e)) if (e <= 0) a.showModal({
            title: "提示",
            content: "限输入大于零的金额！"
        }); else {
            var o = t.changeNum(t.data.money.replace(/[^0-9|\.]/g, "")), i = t.changeNum(t.data.moneyTip.replace(/[^0-9|\.]/g, "")), s = "";
            s = t.data.integralState ? "1" : "0", t.setData({
                money: o,
                moneyTip: i
            }), a.sendRequest({
                url: "/index.php?c=Front/WxApp/BaseApi&a=wxPayCode",
                method: "POST",
                data: {
                    admin_id: this.data.admin_id,
                    store_id: this.data.store_id,
                    money: o,
                    coupon_item_id: this.data.useCouponID,
                    point: this.data.available,
                    point_money: this.data.Deductible,
                    use_point: s
                },
                success: function(e) {
                    if (e.success) {
                        if (e.data.pay_way && "balance" == e.data.pay_way) {
                            var n = {
                                order_no: e.data.order_no
                            };
                            return void t.saveWxPayCode(n);
                        }
                        var o = e.data.config, i = e.data.order_no;
                        wx.requestPayment({
                            timeStamp: o.timeStamp,
                            nonceStr: o.nonceStr,
                            package: o.package,
                            signType: o.signType,
                            paySign: o.paySign,
                            success: function(a) {
                                var e = {
                                    order_no: i
                                };
                                t.saveWxPayCode(e);
                            },
                            fail: function() {
                                a.sendRequest({
                                    url: "/index.php?c=Front/WxApp/BaseApi&a=cancelPay",
                                    method: "POST",
                                    data: {
                                        order_no: i
                                    },
                                    success: function(t) {
                                        t.success || a.showModal({
                                            title: "提示",
                                            content: "" + t.msg
                                        });
                                    },
                                    fail: function(a) {
                                        console.log("cancelPay fail" + a);
                                    }
                                });
                            }
                        });
                    } else a.showModal({
                        title: "提示",
                        content: "" + e.msg
                    });
                },
                fail: function() {}
            });
        } else a.showModal({
            title: "提示",
            content: "限输入两位小数或整数！"
        }); else a.showModal({
            title: "提示",
            content: "请输入金额"
        });
    },
    saveWxPayCode: function(t) {
        var e = this;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/BaseApi&a=saveWxPayCode",
            data: t,
            method: "POST",
            success: function(t) {
                t.success ? (a.showToast({
                    title: "支付成功",
                    icon: "success"
                }), e.setData({
                    pay_amount: t.data.pay_amount,
                    store_name: t.data.store_name,
                    pay_date: t.data.pay_date,
                    otherSuccessFlag: !0,
                    processing: !1,
                    payParam: {
                        orderMoney: t.data.pay_amount,
                        payScenes: 2,
                        id: t.data.orderID,
                        payToken: t.data.payToken
                    }
                }), setTimeout(function() {
                    e.setData({
                        markShow: !0
                    }), e.calActivePayGift({
                        payGiftToken: t.data.payToken,
                        payScenes: 2,
                        orderID: t.data.orderID
                    });
                }, 500)) : a.showModal({
                    title: "提示",
                    content: "" + t.msg
                });
            }
        });
    },
    calActivePayGift: function(t) {
        var e = this;
        a.sendRequest({
            url: "/index.php?c=Front/PayGift/PayGift&a=calActivePayGift",
            method: "POST",
            data: {
                payGiftToken: t.payGiftToken,
                payScenes: 2,
                orderID: t.orderID
            },
            success: function(t) {
                t.success ? e.setData({
                    payConfig: t.data
                }) : a.showModal({
                    title: "提示",
                    content: t.msg
                });
            }
        });
    },
    receive: function() {
        var t = this;
        a.sendRequest({
            url: "/index.php?c=Front/PayGift/PayGift&a=receivePayGift",
            method: "POST",
            data: {
                payGiftToken: t.data.payParam.payToken,
                orderID: t.data.payParam.id
            },
            success: function(e) {
                e.success ? (t.setData({
                    isSelect: !0
                }), wx.showToast({
                    title: "领取成功",
                    icon: "none",
                    duration: 1500
                })) : a.showModal({
                    title: "提示",
                    content: e.msg
                });
            }
        });
    },
    viewOrder: function() {
        var a = this;
        wx.redirectTo({
            url: "../order/orderdetails/index?id=" + a.data.payParam.id + "&getproducttype=" + a.data.payParam.getproducttype
        });
    },
    tolastPageFn: function() {
        this.setData({
            otherSuccessFlag: !1,
            isSelect: !1,
            money: "",
            moneyTip: "0.00"
        });
    },
    toIndex: function() {
        wx.switchTab({
            url: "/pages/shop/index"
        });
    },
    loginSuccessCallback: function() {
        this.scanWxPayCode(), this.showIntegral();
    },
    showCouponinfoPlug: function() {
        this.setData({
            couponinfoFlag: !this.data.couponinfoFlag
        });
    },
    getCouponsList: function() {
        var t = this;
        return "" === this.data.money ? (a.showModal({
            title: "提示",
            content: "请输入金额！"
        }), !1) : t.data.couponMoney == t.data.money ? (t.setData({
            couponinfoFlag: !0
        }), !1) : void a.sendRequest({
            url: "/index.php?c=Front/WxApp/BaseApi&a=getWxPayCodeCoupons",
            method: "POST",
            data: {
                money: this.data.money
            },
            success: function(a) {
                if (t.setData({
                    couponinfoFlag: !0,
                    couponMoney: t.data.money
                }), a.success) {
                    var e = a.data.match_list;
                    e.forEach(function(a) {
                        a.canUse = !0;
                    }), 0 === e.length ? t.setData({
                        canNoChooseToast: !0
                    }) : t.setData({
                        canNoChooseToast: !1
                    });
                    var n = a.data.no_match_list, o = e.concat(n);
                    o.forEach(function(a) {
                        0 == a.Type ? a.Amount = (a.Amount / 10).toString().replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, "") : a.Amount = a.Amount.replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, ""), 
                        a.OrderMoney = a.OrderMoney.replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, ""), a.ExTime = a.ExTime.split(" ")[0];
                    }), t.setData({
                        couponList: o
                    });
                } else console.log("getCouponList fail" + a.msg);
            }
        });
    },
    onCouponChange: function(t) {
        var e = this, n = t.currentTarget.dataset.type, o = t.currentTarget.dataset.itemid, i = t.currentTarget.dataset.amount, s = t.currentTarget.dataset.idx, c = {};
        if (s > -1) {
            var d = this.data.couponList[s];
            if (e.data.money < parseFloat(d.OrderMoney)) return void a.showModal({
                title: "提示",
                content: "请重新选择优惠券！"
            });
            var l = "";
            l = 0 === Number(d.OrderMoney) ? "减" + d.Amount + "元" : "消费满" + d.OrderMoney + "元减" + d.Amount + "元", 
            c = {
                ItemID: d.ItemID,
                Title: "0" === d.Type ? d.Amount + "折" : l
            };
        } else c = {
            ItemID: -1,
            Title: "不使用优惠券"
        };
        this.setData({
            couponTitleText: c,
            couponinfoFlag: !this.data.couponinfoFlag,
            useCouponID: -1 !== c.ItemID ? c.ItemID : ""
        }), this.setData({
            UseCouponInfo: {
                Type: n,
                ItemID: o,
                Amount: i
            }
        }), this.calWxPayCodeMoney();
    },
    canNoChoose: function() {
        this.data.canNoChooseToast ? a.showToast({
            title: "暂无优惠券可以使用哦~",
            icon: "none"
        }) : a.showToast({
            title: "此优惠券不可用",
            icon: "none"
        });
    },
    calWxPayCodeMoney: function() {
        var t = this;
        if (0 === this.data.money) return !1;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/BaseApi&a=calWxPayCodeMoney",
            method: "POST",
            data: {
                money: this.data.money,
                coupon_item_id: t.data.useCouponID
            },
            success: function(a) {
                if (a.success) {
                    var e = parseFloat(a.data.payMoney).toFixed(2);
                    t.setData({
                        moneyTip: e,
                        integralState: !1
                    }), t.CalculationIntegral();
                } else console.log("calFail" + a.msg);
            }
        });
    },
    scanWxPayCode: function() {
        if (0 === this.data.admin_id) return !1;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/BaseApi&a=scanWxPayCode",
            method: "POST",
            data: {
                admin_id: this.data.admin_id,
                store_id: this.data.store_id,
                money: this.data.money
            },
            success: function(a) {}
        });
    },
    selectIntegral: function() {
        var t = this;
        if ("" === t.data.money) return a.showModal({
            title: "提示",
            content: "请输入金额！"
        }), !1;
        var e = 0;
        (e = t.data.integralState ? Number(t.data.moneyTip) + Number(t.data.Deductible) : Number(t.data.moneyTip) - Number(t.data.Deductible)) > 0 && e < 1 && (e = Math.round(100 * e) / 100), 
        t.setData({
            integralState: !t.data.integralState,
            moneyTip: t.changeNum(e)
        });
    },
    showIntegral: function() {
        var t = this, e = t.data.money;
        "" == e && (e = 0), a.sendRequest({
            url: "/index.php?c=Front/WxApp/BaseApi&a=getWxPayCodePoint",
            method: "POST",
            hideLoading: !0,
            data: {
                money: e
            },
            success: function(a) {
                if (a.success) {
                    var e;
                    e = 0 == a.data.configList.JiFenCheckstandDayScaleMax ? Number(a.data.pointTotal) : Number(a.data.configList.JiFenCheckstandDayScaleMax) - Number(a.data.usedPoint), 
                    t.setData({
                        resData: a.data,
                        availableMax: e,
                        integralEnable: a.data.configList.EnableCheckstandJiFenOut
                    }), t.CalculationIntegral();
                }
            }
        });
    },
    CalculationIntegral: function() {
        var a, t = this, e = t.data.moneyTip * (t.data.resData.configList.JiFenCheckstandScaleMax / 100), n = Math.ceil(t.changeNum(e) * Number(t.data.resData.configList.JiFenCheckstandScaleOut));
        if (n >= t.data.availableMax && 0 != t.data.resData.configList.JiFenCheckstandDayScaleMax) {
            var o = (n = Math.ceil(t.data.availableMax)) / Number(t.data.resData.configList.JiFenCheckstandScaleOut);
            o < e && (e = o);
        }
        if (n >= t.data.resData.pointTotal) {
            var i = (n = Math.ceil(t.data.resData.pointTotal)) / Number(t.data.resData.configList.JiFenCheckstandScaleOut);
            i < e && (e = i);
        }
        (t.changeNum(e) <= 0 || e <= 0 || t.changeNum(n) <= 0 || n <= 0) && (e = 0, n = 0), 
        t.setData({
            available: n,
            Deductible: t.changeNum(e)
        }), t.data.integralState && ((a = Number(t.data.moneyTip) - Number(t.data.Deductible)) > 0 && a < 1 && (a = Math.round(100 * a) / 100), 
        t.setData({
            moneyTip: t.changeNum(a)
        }));
    }
});