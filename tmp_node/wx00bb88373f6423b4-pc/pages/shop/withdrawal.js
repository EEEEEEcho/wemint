function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = getApp();

Page({
    onShareAppMessage: function() {
        return t.shareAppMessage("/pages/shop/index");
    },
    data: {
        status: 0,
        chooseType: 1,
        flag: !0,
        flag2: !1,
        flag3: !1,
        overmoney: "",
        flag4: !1,
        flag5: !1,
        flag6: !1,
        flag7: !1,
        maxWithdrawMoney: "",
        percent: "",
        bank: "",
        bankImg: "",
        weixinflag: !1,
        zhifubaoflag: !1,
        bankflag: !1,
        flag8: !1,
        buttonClicked: !1
    },
    onLoad: function(a) {
        var t = this;
        this.setData({
            status: t.options.status ? t.options.status : 0
        }), this.loadwithdrawal();
    },
    onShow: function() {
        var a = this, t = (a.data.bank, wx.getStorageSync("orderBank"));
        "" != t && this.setData({
            bank: t.name,
            bankImg: t.code
        }), wx.removeStorageSync("orderBank"), 3 == a.data.chooseType && (1 == a.data.moneyflag && 1 == a.data.accountflag && 1 == a.data.accountNameflag && void 0 != a.data.bankImg ? this.setData({
            flag5: !0
        }) : this.setData({
            flag5: !1
        })), 2 == a.data.chooseType && (1 == a.data.moneyflag && 1 == a.data.accountflag && 1 == a.data.accountNameflag ? this.setData({
            flag5: !0
        }) : this.setData({
            flag5: !1
        })), 1 == a.data.chooseType && (1 == a.data.moneyflag ? this.setData({
            flag5: !0
        }) : this.setData({
            flag5: !1
        }));
    },
    loadwithdrawal: function() {
        var e = this;
        if (console.log(e.options.status), 1 == e.options.status) o = 2; else var o = 3;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/Withdraw&a=getData",
            method: "GET",
            data: {
                type: o
            },
            success: function(t) {
                if (t.success) {
                    var o, s = t.data, n = (e.data.percent, .01 * t.data.feeRatio);
                    e.setData((o = {
                        maxWithdrawMoney: s.maxWithdrawMoney,
                        overmoney: s.maxWithdrawMoneyPerTime,
                        minWithdrawMoneyPerTime: s.minWithdrawMoneyPerTime,
                        progressTime: s.progressTime,
                        feeRatio: s.feeRatio,
                        cycleCalType: s.cycleCalType,
                        timesInCycle: s.timesInCycle,
                        percent: n
                    }, a(o, "progressTime", s.progressTime), a(o, "withdrawMoneyMustBeInteger", s.withdrawMoneyMustBeInteger), 
                    a(o, "allowWays", s.allowWays), a(o, "minWithdrawMoneyPerTime", s.minWithdrawMoneyPerTime), 
                    o));
                    var i = e.data.allowWays.split(",");
                    e.setData({
                        way: i
                    });
                    for (var l = 0; l < e.data.way.length; l++) 1 == e.data.way[l] ? e.setData({
                        weixinflag: !0,
                        chooseType: 1
                    }) : 2 == e.data.way[l] ? e.setData({
                        zhifubaoflag: !0,
                        chooseType: 2
                    }) : 3 == e.data.way[l] && e.setData({
                        bankflag: !0,
                        chooseType: 3
                    });
                    return e.data.way;
                }
                console.log("getWithdrawal fail" + t.msg);
            }
        });
    },
    inputPrice: function(a) {
        var t = this, e = a.detail.value;
        t.setData({
            moneyNum: a.detail.value
        });
        var o = "";
        o = (t.data.moneyNum * t.data.percent).toFixed(2), t.setData({
            serviceCharge: o
        }), "" != e ? this.setData({
            moneyflag: !0
        }) : this.setData({
            moneyflag: !1
        }), "" != e && e <= t.data.maxWithdrawMoney && e >= t.data.minWithdrawMoneyPerTime && e <= t.data.overmoney ? t.setData({
            flag: !1,
            flag2: !0,
            flag3: !1,
            flag8: !1,
            flag7: !1
        }) : "" != e && e > t.data.maxWithdrawMoney && e <= t.data.overmoney ? t.setData({
            flag: !1,
            flag2: !1,
            flag3: !0,
            flag8: !1,
            flag7: !1
        }) : "" != e && e > t.data.overmoney ? t.setData({
            flag: !1,
            flag2: !1,
            flag3: !1,
            flag8: !1,
            flag7: !0
        }) : "" != e && e < t.data.minWithdrawMoneyPerTime ? t.setData({
            flag: !1,
            flag2: !1,
            flag3: !1,
            flag8: !0,
            flag7: !1
        }) : t.setData({
            flag: !0,
            flag2: !1,
            flag3: !1,
            flag8: !1,
            flag7: !1
        }), 1 === t.data.chooseType && (e > 0 && e <= t.data.overmoney ? t.setData({
            flag5: !0
        }) : t.setData({
            flag5: !1
        })), 2 !== t.data.chooseType && 3 !== t.data.chooseType || (1 == t.data.moneyflag && 1 == t.data.accountflag && 1 == t.data.accountNameflag ? this.setData({
            flag5: !0
        }) : this.setData({
            flag5: !1
        }));
    },
    alipay: function(a) {
        var t = this, e = a.detail.value;
        "" != e ? this.setData({
            alipay: e,
            accountflag: !0
        }) : this.setData({
            accountflag: !1
        }), 1 == t.data.moneyflag && 1 == t.data.accountflag && 1 == t.data.accountNameflag ? this.setData({
            flag5: !0
        }) : this.setData({
            flag5: !1
        });
    },
    alipayName: function(a) {
        var t = this, e = a.detail.value;
        "" != e ? this.setData({
            alipayName: e,
            accountNameflag: !0
        }) : this.setData({
            accountNameflag: !1
        }), 1 == t.data.moneyflag && 1 == t.data.accountflag && 1 == t.data.accountNameflag ? this.setData({
            flag5: !0
        }) : this.setData({
            flag5: !1
        });
    },
    bankcard: function(a) {
        var t = this, e = a.detail.value;
        "" != e ? this.setData({
            cardNum: e,
            accountflag: !0
        }) : this.setData({
            accountflag: !1
        }), 1 == t.data.moneyflag && 1 == t.data.accountflag && 1 == t.data.accountNameflag && void 0 != t.data.bankImg ? this.setData({
            flag5: !0
        }) : this.setData({
            flag5: !1
        });
    },
    personName: function(a) {
        var t = this, e = a.detail.value;
        "" != e ? this.setData({
            personName: e,
            accountNameflag: !0
        }) : this.setData({
            accountNameflag: !1
        }), 1 == t.data.moneyflag && 1 == t.data.accountflag && 1 == t.data.accountNameflag && void 0 != t.data.bankImg ? this.setData({
            flag5: !0
        }) : this.setData({
            flag5: !1
        });
    },
    widthdrawalExplain: function(a) {
        this.setData({
            flag4: !0
        });
    },
    sureClose: function(a) {
        this.setData({
            flag4: !1
        });
    },
    chooseType: function(a) {
        this.setData({
            flag6: !0
        });
    },
    confirm: function(a) {
        this.setData({
            flag6: !1
        });
    },
    chooseway: function(a) {
        var t = this, e = (t.data.alipay, t.data.alipayName, t.data.moneyNum, t.data.cardNum, 
        t.data.personName, t.data.chooseType, t.data.accountflag, t.data.accountNameflag, 
        parseInt(a.currentTarget.dataset.idx));
        1 === e ? this.setData({
            chooseType: 1,
            flag6: !1,
            flag5: !1,
            accountflag: !1,
            accountNameflag: !1,
            moneyNum: "",
            alipay: "",
            alipayName: "",
            cardNum: "",
            personName: ""
        }) : 2 === e ? this.setData({
            chooseType: 2,
            flag6: !1,
            flag5: !1,
            accountflag: !1,
            accountNameflag: !1,
            moneyNum: "",
            alipay: "",
            alipayName: "",
            cardNum: "",
            personName: ""
        }) : 3 == e && this.setData({
            chooseType: 3,
            flag6: !1,
            flag5: !1,
            accountflag: !1,
            accountNameflag: !1,
            moneyNum: "",
            alipay: "",
            alipayName: "",
            cardNum: "",
            personName: ""
        });
    },
    formSubmit: function(a) {
        var e = this;
        if (e.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            e.setData({
                buttonClicked: !1
            });
        }, 500), 1 == e.options.status) o = 2; else var o = 3;
        var s = e.data.chooseType;
        if (1 === s) n = {
            type: o,
            withdrawWay: s,
            money: e.data.moneyNum
        }; else if (2 === s) n = {
            type: o,
            withdrawWay: s,
            money: e.data.moneyNum,
            account: e.data.alipay,
            accountName: e.data.alipayName
        }; else if (3 === s) var n = {
            type: o,
            withdrawWay: s,
            money: e.data.moneyNum,
            account: e.data.cardNum,
            accountName: e.data.personName,
            bank: e.data.bankImg
        };
        t.sendRequest({
            url: "/index.php?c=front/WxApp/Withdraw&a=submitWithdraw",
            method: "POST",
            data: n,
            success: function(a) {
                a.success ? (console.log(a), wx.showModal({
                    title: "",
                    content: "将在" + e.data.progressTime + "个工作日内处理",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && wx.redirectTo({
                            url: "/pages/shop/record?status=" + e.data.status
                        });
                    }
                })) : t.showModal({
                    title: "提示",
                    content: a.msg,
                    showCancel: !1
                });
            }
        });
    },
    chooseBank: function(a) {
        var t = this;
        t.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            t.setData({
                buttonClicked: !1
            });
        }, 500), wx.navigateTo({
            url: "/pages/shop/chooseBank"
        });
    },
    buttonClicked: function() {
        var a = this;
        a.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            a.setData({
                buttonClicked: !1
            });
        }, 500);
    }
});