function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../../../../store")), e = a(require("../../../../../utils/create")), i = require("../../../../../api/apiInstance.js"), n = getApp();

(0, e.default)(t.default, {
    properties: {},
    data: {
        cartPage: "绑定支付宝",
        navH: n.globalData.navH,
        status: n.globalData.status,
        isShowInterval: !1,
        intervalValue: 59,
        aliAccountInfomation: {},
        alipayName: "",
        alipayAccount: "",
        alipayCode: "",
        interval: null
    },
    onLoad: function() {
        "支付宝账号" != this.store.data.aliAccountInfomation.aliAccountNo && this.setData({
            alipayName: this.store.data.aliAccountInfomation.aliAccountName,
            alipayAccount: this.store.data.aliAccountInfomation.aliAccountNo
        });
    },
    getValidatePayId: function(a) {
        var t = !1;
        if ("" != a && void 0 !== a) {
            var e = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/, i = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+){0,4}@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+){0,4}$/;
            11 == a.length ? e.test(a) ? t = !0 : (wx.showToast({
                title: "请输入正确的账号",
                icon: "none",
                duration: 1500
            }), t = !1) : i.test(a) ? t = !0 : (wx.showToast({
                title: "请输入正确的账号",
                icon: "none",
                duration: 1500
            }), t = !1);
        }
        return t;
    },
    getPayRealName: function(a) {
        this.setData({
            alipayName: a.detail.value
        });
    },
    getAlipayAccount: function(a) {
        this.setData({
            alipayAccount: a.detail.value
        });
    },
    getCode: function(a) {
        this.setData({
            alipayCode: a.detail.value
        });
    },
    getValidateCode: function() {
        var a = this;
        if (this.getValidatePayId(this.data.alipayAccount)) {
            var t = {
                mobile: this.store.data.userInfo.mobile
            };
            (0, i.getValidateCode)(t, function(t) {
                1 == t.errcode && (a.setData({
                    isShowInterval: !0
                }), a.data.interval = setInterval(function() {
                    var t = a.data.intervalValue;
                    t--, a.setData({
                        intervalValue: t
                    }), 0 == a.data.intervalValue && (clearInterval(a.data.interval), a.setData({
                        isShowInterval: !1,
                        intervalValue: 59
                    }));
                }, 1e3));
            });
        }
    },
    bindAlipay: function() {
        var a = this;
        if ("" != this.data.alipayName) if ("" != this.data.alipayAccount) if ("" != this.data.alipayCode) {
            if (this.getValidatePayId(this.data.alipayAccount)) {
                var t = {
                    accesstoken: this.store.data.userInfo.accesstoken,
                    aliAccountName: this.data.alipayName,
                    aliAccountNo: this.data.alipayAccount,
                    verCode: this.data.alipayCode
                };
                (0, i.getUserDisBinging)(t, function(t) {
                    if (1 == t.errcode) {
                        var e = {
                            bindingAli: 1,
                            aliAccountName: a.data.alipayName,
                            aliAccountNo: a.data.alipayAccount
                        };
                        a.store.data.aliAccountInfomation = e, a.update(), wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        } else wx.showToast({
            title: "请输入验证码",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "请输入支付宝账号",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "请输入真实姓名",
            icon: "none",
            duration: 1500
        });
    },
    onUnload: function() {
        clearInterval(this.data.interval);
    }
});