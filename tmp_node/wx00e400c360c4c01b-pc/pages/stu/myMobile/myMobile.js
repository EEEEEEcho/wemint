function t(t, a) {
    wx.request({
        url: e.localUrl + "mobileXcx/getSmsCode",
        data: {
            mobile: t
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            a(t.data);
        }
    });
}

var e = require("../../../utils/main.js"), a = getApp();

Page({
    data: {
        sendmsg: "classCurr_view_but",
        getmsg: "获取验证码",
        timer: 1,
        code: "",
        mobile: "",
        sendCode: ""
    },
    onLoad: function(t) {
        var e = t.id, a = t.mobile;
        this.setData({
            id: e,
            mobile: a
        });
    },
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
    sendmessg: function(e) {
        var a = this;
        if (0 == this.data.mobile.length) this.setData({
            focus1: !0
        }); else if (1 == a.data.timer) {
            t(a.data.mobile, function(t) {
                console.log(t.dataInfo.code), a.setData({
                    code: t.dataInfo.code
                });
            }), a.data.timer;
            var s = 60;
            a.setData({
                sendmsg: "sendmsgafter"
            });
            var i = setInterval(function() {
                a.setData({
                    getmsg: s + "s后重发",
                    timer: 0
                }), --s < 0 && (a.data.timer = 1, clearInterval(i), a.setData({
                    sendmsg: "classCurr_view_but",
                    getmsg: "获取验证码",
                    timer: 1
                }));
            }, 1e3);
        }
    },
    editMobile: function() {
        var t = this;
        0 == this.data.mobile.length || 0 == this.data.sendCode.length ? 0 == this.data.mobile.length ? this.setData({
            focus1: !0
        }) : 0 == this.data.sendCode.length && this.setData({
            focus2: !0
        }) : t.data.sendCode != t.data.code ? wx.showToast({
            title: "验证码不正确",
            icon: "none",
            duration: 2e3,
            mask: !0
        }) : wx.request({
            url: e.localUrl + "mobileXcx/editCpc",
            data: {
                cpcId: t.data.id,
                mobile: t.data.mobile
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                wx.showToast({
                    title: "成功",
                    icon: "success",
                    duration: 2e3,
                    mask: !0
                }), setTimeout(function() {
                    var e = getCurrentPages(), s = e[e.length - 2];
                    s.data.cpc.mobile = t.data.mobile, a.globalData.cpc = s.data.cpc, s.onLoad(), wx.navigateBack();
                }, 2e3);
            }
        });
    }
});