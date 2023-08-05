function e(e, a) {
    wx.request({
        url: t.localUrl + "mobileXcx/getSmsCode",
        data: {
            mobile: e
        },
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            a(e.data);
        }
    });
}

var t = require("../../../utils/main.js"), a = getApp();

Page({
    data: {
        sendmsg: "classCurr_view_but",
        getmsg: "获取验证码",
        timer: 1,
        code: "",
        mobile: "",
        sendCode: ""
    },
    onLoad: function(e) {
        var t = e.id, a = e.mobile;
        this.setData({
            id: t,
            mobile: a
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
    sendmessg: function(t) {
        var a = this;
        if (0 == this.data.mobile.length) this.setData({
            focus1: !0
        }); else if (1 == a.data.timer) {
            e(a.data.mobile, function(e) {
                console.log(e.dataInfo.code), a.setData({
                    code: e.dataInfo.code
                });
            }), a.data.timer;
            var i = 60;
            a.setData({
                sendmsg: "sendmsgafter"
            });
            var s = setInterval(function() {
                a.setData({
                    getmsg: i + "s后重发",
                    timer: 0
                }), --i < 0 && (a.data.timer = 1, clearInterval(s), a.setData({
                    sendmsg: "classCurr_view_but",
                    getmsg: "获取验证码",
                    timer: 1
                }));
            }, 1e3);
        }
    },
    editMobile: function() {
        var e = this;
        0 == this.data.mobile.length ? 0 == this.data.mobile.length && this.setData({
            focus1: !0
        }) : wx.request({
            url: t.localUrl + "mobileXcx/editTeacher",
            data: {
                tId: e.data.id,
                mobile: e.data.mobile
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                wx.showToast({
                    title: "成功",
                    icon: "success",
                    duration: 2e3,
                    mask: !0
                }), setTimeout(function() {
                    var t = getCurrentPages(), i = t[t.length - 2];
                    i.data.teacher.mobile = e.data.mobile, a.globalData.teacher = i.data.teacher, i.onLoad(), 
                    wx.navigateBack();
                }, 2e3);
            }
        });
    }
});