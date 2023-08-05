var a = require("../../utils/main.js"), t = getApp();

Page({
    data: {
        phone: "",
        password: "",
        focus1: !1,
        focus2: !1
    },
    phoneInput: function(a) {
        this.setData({
            phone: a.detail.value
        });
    },
    passwordInput: function(a) {
        this.setData({
            password: a.detail.value
        });
    },
    binding: function() {
        var n = t.globalData.openId;
        if (0 == this.data.phone.length || 0 == this.data.password.length) 0 == this.data.phone.length ? this.setData({
            focus1: !0
        }) : 0 == this.data.password.length && this.setData({
            focus2: !0
        }); else {
            var o = this;
            wx.request({
                url: a.localUrl + "mobileXcx/bindingOpenId",
                data: {
                    crm_code: a.crm_code,
                    openId: n,
                    type: 0,
                    account_code: o.data.phone,
                    account_pwd: o.data.password
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(a) {
                    "000" != a.data.succeed ? wx.showToast({
                        title: a.data.sucInfo,
                        icon: "none",
                        duration: 2e3
                    }) : (null != a.data.dataInfo.tea && (t.globalData.teacher = a.data.dataInfo.tea), 
                    wx.reLaunch({
                        url: "../teacher/home/home"
                    }));
                }
            });
        }
    },
    onLoad: function(a) {
        this.setData({
            userInfo: t.globalData.userInfo
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});