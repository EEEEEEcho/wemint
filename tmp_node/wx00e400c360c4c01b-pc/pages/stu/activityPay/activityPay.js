function a(a, e) {
    wx.request({
        url: o.localUrl + "mobileXcx/stuActivityById",
        data: {
            id: a
        },
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            e(a.data.dataInfo.act);
        }
    });
}

function e(a, e) {
    wx.request({
        url: o.localUrl + "mobileXcx/getSmsCode",
        data: {
            mobile: a
        },
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            e(a.data);
        }
    });
}

function t(a, e) {
    wx.requestPayment({
        timeStamp: a.data.timeStamp,
        nonceStr: a.data.nonceStr,
        package: a.data.package,
        signType: "MD5",
        paySign: a.data.paySign,
        success: function(a) {
            console.log(a), e(!0);
        },
        fail: function(a) {
            console.log("支付失败"), console.log(a), e(!1);
        },
        complete: function() {
            console.log("pay complete");
        }
    });
}

var o = require("../../../utils/main.js"), n = require("../../../utils/util.js"), c = getApp();

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
    onLoad: function(e) {
        var t = this;
        a(e.id, function(a) {
            var e = "";
            a.ca_type;
            1 && (e = "购买人姓名"), 2 && (e = "报名人姓名"), t.setData({
                model: a,
                userName: c.globalData.cpc.name,
                mobile: c.globalData.cpc.mobile,
                pay_user: e
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
    inputUser: function(a) {
        this.setData({
            userName: a.detail.value
        });
    },
    inputMobile: function(a) {
        this.setData({
            mobile: a.detail.value
        });
    },
    inputSendCode: function(a) {
        this.setData({
            sendCode: a.detail.value
        });
    },
    sendmessg: function(a) {
        var t = this;
        if (0 == this.data.mobile.length) this.setData({
            focus1: !0
        }); else if (1 == t.data.timer) {
            e(t.data.mobile, function(a) {
                console.log(a.dataInfo.code), t.setData({
                    code: a.dataInfo.code
                });
            }), t.data.timer;
            var o = 60;
            t.setData({
                sendmsg: "sendmsgafter"
            });
            var n = setInterval(function() {
                t.setData({
                    getmsg: o + "s后重发",
                    timer: 0
                }), --o < 0 && (t.data.timer = 1, clearInterval(n), t.setData({
                    sendmsg: "classCurr_view_but",
                    getmsg: "获取验证码",
                    timer: 1
                }));
            }, 1e3);
        }
    },
    onPayCao: function(a) {
        var e = this;
        0 == this.data.userName.length || 0 == this.data.mobile.length ? 0 == this.data.userName.length ? this.setData({
            focus3: !0
        }) : 0 == this.data.mobile.length && this.setData({
            focus1: !0
        }) : wx.request({
            url: o.localUrl + "mobileXcx/onPayCao",
            data: {
                crm_code: o.crm_code,
                school_code: c.globalData.cpc.school_code,
                openId: c.globalData.openId,
                cpc_id: c.globalData.cpc.id,
                csc_id: c.globalData.csc.id,
                ca_id: e.data.model.id,
                user_name: e.data.userName,
                user_mobile: e.data.mobile
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                "000" == a.data.succeed && wx.request({
                    url: o.localUrl + "mobileXcx/wxPay",
                    data: {
                        openid: c.globalData.openId,
                        title: e.data.model.title,
                        catId: a.data.dataInfo.catId
                    },
                    method: "GET",
                    success: function(a) {
                        console.log(a), t(a, function(a) {
                            a ? e.cancel() : wx.showToast({
                                title: "支付失败",
                                icon: "loading",
                                duration: 2e3
                            });
                        });
                    }
                });
            }
        });
    },
    onPayCas: function(a) {
        var e = this;
        0 == this.data.userName.length || 0 == this.data.mobile.length ? 0 == this.data.userName.length ? this.setData({
            focus3: !0
        }) : 0 == this.data.mobile.length && this.setData({
            focus1: !0
        }) : wx.request({
            url: o.localUrl + "mobileXcx/onPayCas",
            data: {
                crm_code: o.crm_code,
                openId: c.globalData.openId,
                school_code: c.globalData.cpc.school_code,
                cpc_id: c.globalData.cpc.id,
                ca_id: e.data.model.id,
                user_name: e.data.userName,
                user_mobile: e.data.mobile
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                "000" == a.data.succeed && (1 == e.data.model.is_pay ? wx.request({
                    url: o.localUrl + "mobileXcx/wxPay",
                    data: {
                        openid: c.globalData.openId,
                        title: e.data.model.title,
                        catId: a.data.dataInfo.catId
                    },
                    method: "GET",
                    success: function(a) {
                        console.log(a), t(a, function(a) {
                            a ? e.cancel() : wx.showToast({
                                title: "支付失败",
                                icon: "loading",
                                duration: 2e3
                            });
                        });
                    }
                }) : e.cancel());
            }
        });
    },
    sendMessage: function(a, e, t) {
        wx.request({
            url: o.localUrl + "mobileXcx/accessToken",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                var c = o.data.dataInfo.accessToken;
                console.log(c);
                var s = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + c, i = {
                    touser: e,
                    template_id: "Fs6nTh5OLSjL_F_iznhmRA5fGcYot3liXH39xeeEWNE",
                    page: "/pages/stu/myActivity/myActivity",
                    form_id: a,
                    data: {
                        keyword1: {
                            value: t,
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
                    url: s,
                    data: i,
                    method: "POST",
                    success: function(a) {
                        console.log("push msg"), console.log(a);
                    },
                    fail: function(a) {
                        console.log("push err"), console.log(a);
                    }
                });
            }
        });
    }
});