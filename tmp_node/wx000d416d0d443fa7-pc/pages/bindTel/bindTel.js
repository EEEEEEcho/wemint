var t = require("../../utils/server"), e = require("../../config.js");

require("../../utils/utils.js"), wx.getStorageSync("authorization");

Page({
    data: {
        inputTel: "",
        inputCode: "",
        userType: 2,
        hadSend: !1,
        sixSeconds: 61
    },
    onLoad: function(e) {
        var a = this;
        wx.setNavigationBarTitle({
            title: "绑定手机"
        }), wx.showLoading({
            title: "加载中"
        }), t.getApiJSON("/api/auth/getImageVerify", function(t) {
            1e3 == t.data.code ? (a.setData({
                codeImgSrc: t.data.data.image,
                vid: t.data.data.vid,
                imgCode: t.data.data.code
            }), wx.hideLoading()) : (wx.hideLoading(), getApp().showAndHideToast(t.data.msg));
        });
    },
    changeCodeImg: function(e) {
        var a = this;
        t.getApiJSON("/api/auth/getImageVerify", function(t) {
            1e3 == t.data.code && a.setData({
                codeImgSrc: t.data.data.image,
                vid: t.data.data.vid,
                imgCode: t.data.data.code
            }), getApp().showAndHideToast(t.data.msg);
        });
    },
    sendTelCode: function(e) {
        var a = this, i = this.data.inputTel, d = this.data.inputImgCode;
        if ("" != i) if (11 == i.split("").length) if (d == this.data.imgCode) {
            var s = {
                tel: i,
                vid: a.data.vid,
                image_code: d,
                mess_type: 1,
                terminal: 1
            };
            t.getApiJSON("/api/auth/sendMessage", s, function(t) {
                a.btnFalse(), 1e3 == t.data.code ? getApp().showAndHideToast("发送成功") : getApp().showAndHideToast(t.data.msg);
            });
        } else getApp().showAndHideToast("验证码输入错误"); else getApp().showAndHideToast("请输入正确的11位手机号"); else getApp().showAndHideToast("请输入手机号");
    },
    getUserTel: function(t) {
        this.setData({
            inputTel: t.detail.value
        });
    },
    getUserImgCode: function(t) {
        this.setData({
            inputImgCode: t.detail.value
        });
    },
    getUserCode: function(t) {
        this.setData({
            inputCode: t.detail.value
        });
    },
    submitInfo: function(a) {
        var i = this, d = this.data.inputTel, s = this.data.inputCode, o = this.data.inputImgCode;
        if ("" != d) if (11 == d.split("").length) if (o == this.data.imgCode) {
            var n = wx.getStorageSync("openId"), g = {
                tel: d,
                tel_code: s,
                spread_token: e.resToken,
                user_type: i.data.userType,
                openid: n
            };
            wx.showLoading({
                title: "绑定中",
                mask: !0
            }), t.postApiJSON("/wap/userWx/userBindTel", g, function(t) {
                1e3 == t.data.code ? (wx.hideLoading(), getApp().showAndHideToast("绑定成功"), wx.setStorageSync("authorization", t.data.data.token), 
                wx.setStorageSync("isAuth", !0), wx.navigateBack({
                    delta: 2
                })) : (wx.hideLoading(), getApp().showAndHideToast(t.data.msg));
            });
        } else getApp().showAndHideToast("验证码输入错误"); else getApp().showAndHideToast("请输入正确的11位手机号"); else getApp().showAndHideToast("请输入手机号");
    },
    btnFalse: function() {
        this.data.sixSeconds <= 0 ? this.setData({
            hadSend: !1
        }) : 61 == this.data.sixSeconds ? (this.setData({
            hadSend: !0,
            sixSeconds: this.data.sixSeconds - 1
        }), setTimeout(this.btnFalse, 1e3)) : (this.setData({
            sixSeconds: this.data.sixSeconds - 1
        }), setTimeout(this.btnFalse, 1e3));
    }
});