function t(t, e) {
    wx.request({
        url: a.localUrl + "mobileXcx/getSmsCode",
        data: {
            mobile: t
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            e(t.data);
        }
    });
}

var a = require("../../utils/main.js"), e = getApp();

Page({
    data: {
        sendmsg: "classCurr_view_but",
        getmsg: "获取验证码",
        timer: 1,
        code: "",
        mobile: "",
        sendCode: "",
        cpc_card: ""
    },
    onLoad: function(t) {},
    inputMobile: function(t) {
        this.setData({
            mobile: t.detail.value
        });
    },
    inputSendCode: function(t) {
        this.setData({
            sendCode: t.detail.value
        });
    },
    inputCard: function(t) {
        this.setData({
            cpc_card: t.detail.value
        });
    },
    binding: function() {
        var t = e.globalData.openId, o = this;
        0 == this.data.cpc_card.length ? this.setData({
            focus1: !0
        }) : wx.request({
            url: a.localUrl + "mobileXcx/bindingOpenId",
            data: {
                crm_code: a.crm_code,
                openId: t,
                type: 1,
                mobile: o.data.mobile,
                sms_code: o.data.sendCode,
                card_code: o.data.cpc_card
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t.data), "000" != t.data.succeed ? wx.showToast({
                    title: t.data.sucInfo,
                    icon: "none",
                    duration: 2e3
                }) : (null != t.data.dataInfo.cpc && (e.globalData.cpc = t.data.dataInfo.cpc), wx.navigateTo({
                    url: "../stu/home/home"
                }));
            }
        });
    },
    sendmessg: function(a) {
        var e = this;
        if (0 == this.data.mobile.length) this.setData({
            focus1: !0
        }); else if (1 == e.data.timer) {
            t(e.data.mobile, function(t) {
                console.log(t.dataInfo.code), e.setData({
                    code: t.dataInfo.code
                });
            }), e.data.timer;
            var o = 60;
            e.setData({
                sendmsg: "sendmsgafter"
            });
            var n = setInterval(function() {
                e.setData({
                    getmsg: o + "s后重发",
                    timer: 0
                }), --o < 0 && (e.data.timer = 1, clearInterval(n), e.setData({
                    sendmsg: "classCurr_view_but",
                    getmsg: "获取验证码",
                    timer: 1
                }));
            }, 1e3);
        }
    }
});