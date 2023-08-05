function e(e, t) {
    wx.request({
        url: o.localUrl + "mobileXcx/stuActivityById",
        data: {
            id: e
        },
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            t(e.data.dataInfo.act);
        }
    });
}

function t(e, t) {
    wx.request({
        url: o.localUrl + "mobileXcx/getSmsCode",
        data: {
            mobile: e
        },
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            t(e.data);
        }
    });
}

function a(e, t) {
    wx.requestPayment({
        timeStamp: e.data.timeStamp,
        nonceStr: e.data.nonceStr,
        package: e.data.package,
        signType: "MD5",
        paySign: e.data.paySign,
        success: function(e) {
            console.log(e), console.log("支付成功"), t(!0);
        },
        fail: function(e) {
            console.log("支付失败"), console.log(e), t(!1);
        },
        complete: function() {
            console.log("pay complete");
        }
    });
}

var o = require("../../../utils/main.js"), n = require("../../../utils/util.js"), s = getApp();

Page({
    data: {
        hidden: !0,
        nocancel: !1,
        pay_user: "",
        sendmsg: "classCurr_view_but",
        getmsg: "获取验证码",
        timer: 1,
        code: "",
        userName: "",
        mobile: "",
        sendCode: ""
    },
    onLoad: function(t) {
        var a = this;
        e(t.id, function(e) {
            var t = "";
            e.ca_type;
            1 && (t = "购买人姓名"), 2 && (t = "报名人姓名"), a.setData({
                model: e,
                pay_user: t
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    cancel: function() {
        this.setData({
            hidden: !1
        });
    },
    confirm: function() {
        this.setData({
            hidden: !0
        }), wx.navigateBack();
    },
    inputUser: function(e) {
        this.setData({
            userName: e.detail.value
        });
    },
    inputMobile: function(e) {
        this.setData({
            mobile: e.detail.value
        });
    },
    inputSendCode: function(e) {
        this.setData({
            sendCode: e.detail.value
        });
    },
    sendmessg: function(e) {
        var a = this;
        if (0 == this.data.mobile.length) this.setData({
            focus1: !0
        }); else if (1 == a.data.timer) {
            t(a.data.mobile, function(e) {
                console.log(e.dataInfo.code), a.setData({
                    code: e.dataInfo.code
                });
            }), a.data.timer;
            var o = 60;
            a.setData({
                sendmsg: "sendmsgafter"
            });
            var n = setInterval(function() {
                a.setData({
                    getmsg: o + "s后重发",
                    timer: 0
                }), --o < 0 && (a.data.timer = 1, clearInterval(n), a.setData({
                    sendmsg: "classCurr_view_but",
                    getmsg: "获取验证码",
                    timer: 1
                }));
            }, 1e3);
        }
    },
    onPayCas: function(e) {
        var t = this;
        0 == this.data.userName.length || 0 == this.data.mobile.length ? 0 == this.data.userName.length ? this.setData({
            focus3: !0
        }) : 0 == this.data.mobile.length && this.setData({
            focus1: !0
        }) : wx.request({
            url: o.localUrl + "mobileXcx/onPayCas",
            data: {
                crm_code: o.crm_code,
                school_code: o.crm_code,
                openId: s.globalData.openId,
                ca_id: t.data.model.id,
                user_name: t.data.userName,
                user_mobile: t.data.mobile
            },
            header: {
                "content-type": "application/json"
            },
            success: function(n) {
                "000" == n.data.succeed && (1 == t.data.model.is_pay ? wx.request({
                    url: o.localUrl + "mobileXcx/wxPay",
                    data: {
                        openid: s.globalData.openId,
                        title: t.data.model.title,
                        catId: n.data.dataInfo.catId
                    },
                    method: "GET",
                    success: function(o) {
                        console.log(o), a(o, function(a) {
                            a ? (t.sendMessage(e.detail.formId, s.globalData.openId, t.data.model.title), t.cancel()) : wx.showToast({
                                title: "支付失败",
                                icon: "loading",
                                duration: 2e3
                            });
                        });
                    }
                }) : t.cancel());
            }
        });
    },
    sendMessage: function(e, t, a) {
        wx.request({
            url: o.localUrl + "mobileXcx/accessToken",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                var s = o.data.dataInfo.accessToken;
                console.log(s);
                var i = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + s, c = {
                    touser: t,
                    template_id: "Fs6nTh5OLSjL_F_iznhmRA5fGcYot3liXH39xeeEWNE",
                    page: "/pages/tourist/myActivity/myActivity",
                    form_id: e,
                    data: {
                        keyword1: {
                            value: a,
                            color: "#172177"
                        },
                        keyword2: {
                            value: n.formatTime(new Date()),
                            color: "#9b9b9b"
                        },
                        keyword3: {
                            value: "活动购买成功,如有疑问请联系我们。",
                            color: "#9b9b9b"
                        }
                    }
                };
                wx.request({
                    url: i,
                    data: c,
                    method: "POST",
                    success: function(e) {
                        console.log("push msg"), console.log(e);
                    },
                    fail: function(e) {
                        console.log("push err"), console.log(e);
                    }
                });
            }
        });
    }
});