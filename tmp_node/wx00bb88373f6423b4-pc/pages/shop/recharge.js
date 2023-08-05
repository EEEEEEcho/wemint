var t = getApp(), e = require("../../config.js");

Page({
    data: {
        codee: 0,
        money: 0,
        buttonClicked: !1,
        moneyNum: 0
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            codee: e.options.codee ? e.options.codee : 0
        });
    },
    onShow: function() {},
    onShareAppMessage: function() {},
    moneyInput: function(t) {
        var e = this, o = t.detail.value;
        e.data.moneyNum;
        this.setData({
            moneyNum: o
        });
    },
    formSubmit: function(o) {
        var n = o.detail.value.money, a = this;
        if (a.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            a.setData({
                buttonClicked: !1
            });
        }, 500), 0 != a.data.moneyNum && a.data.moneyNum >= .01) {
            !function(o, n) {
                "1" != e.SKIP_WXPAY ? t.wxPay(0, {
                    money: n,
                    success: function() {
                        wx.navigateBack({
                            delta: 2
                        });
                    },
                    fail: function(e) {
                        console.log(e), t.showModal({
                            title: "提示",
                            content: "支付失败"
                        });
                    }
                }) : funcPayOrder(o);
            }(0, n);
        } else t.showModal({
            title: "提示",
            content: "请输入正确的充值金额",
            showCancel: !1
        });
    }
});