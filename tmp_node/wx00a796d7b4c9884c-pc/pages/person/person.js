var e = getApp(), t = 60;

Page({
    data: {
        hidden: !1,
        mobile: "",
        userid: "",
        style: "",
        sms_code: "",
        sms_mobile: "",
        code: "",
        msg: "获取验证码",
        disabled: ""
    },
    mobileInput: function(e) {
        this.setData({
            mobile: e.detail.value
        });
    },
    codeInput: function(e) {
        this.setData({
            code: e.detail.value
        });
    },
    onLoad: function(e) {
        var t = this;
        wx.getStorage({
            key: "userid",
            success: function(e) {
                t.setData({
                    userid: e.data
                }), t.getMobile();
            }
        });
    },
    getMobile: function() {
        var t = this;
        console.log(t.data.userid), wx.request({
            url: e.page.url + "/wx/member.php?act=getMobile",
            method: "post",
            data: {
                userid: t.data.userid
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e), "" != e.data.mobile && null != e.data.mobile ? t.setData({
                    mobile: e.data.mobile,
                    style: "disabled",
                    hidden: !0
                }) : t.setData({
                    style: "",
                    hidden: !1
                });
            }
        });
    },
    submit: function() {
        var t = this, a = t.data.mobile, o = t.data.code, s = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        wx.getStorage({
            key: "sms_mobile",
            success: function(i) {
                t.setData({
                    sms_mobile: i.data
                }), wx.getStorage({
                    key: "sms_code",
                    success: function(i) {
                        return t.setData({
                            sms_code: i.data
                        }), "" == a ? (wx.showToast({
                            title: "请输入手机号",
                            icon: "loading",
                            duration: 1e3
                        }), !1) : s.test(a) ? "" == o ? (wx.showToast({
                            title: "请输入验证码",
                            icon: "loading",
                            duration: 1e3
                        }), !1) : void (a == t.data.sms_mobile && o == t.data.sms_code ? wx.request({
                            url: e.page.url + "/wx/member.php?act=mobile_update",
                            method: "post",
                            data: {
                                userid: t.data.userid,
                                mobile: a
                            },
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            success: function(e) {
                                console.log(e), 0 == e.data.code ? (wx.showToast({
                                    title: e.data.msg,
                                    duration: 2e3,
                                    icon: "success"
                                }), t.setData({
                                    style: "disabled",
                                    hidden: !0
                                }), wx.setStorage({
                                    key: "mobile",
                                    data: t.data.mobile
                                }), wx.navigateBack({})) : wx.showToast({
                                    title: e.data.msg,
                                    duration: 2e3,
                                    icon: "none"
                                });
                            }
                        }) : wx.showToast({
                            title: "验证码错误",
                            duration: 2e3,
                            icon: "none"
                        })) : (wx.showToast({
                            title: "手机号码错误",
                            icon: "loading",
                            duration: 1e3
                        }), !1);
                    }
                });
            }
        });
    },
    send_sms: function() {
        var a = this, o = a.data.mobile;
        return "" == o ? (wx.showToast({
            title: "请输入手机号",
            icon: "loading",
            duration: 1e3
        }), !1) : /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(o) ? void wx.request({
            url: e.page.url + "wx/member.php?act=send_sms",
            method: "get",
            data: {
                mobile: o
            },
            headers: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                console.log(e), function e(a) {
                    if (0 == t) return a.setData({
                        msg: "获取验证码",
                        disabled: ""
                    }), void (t = 60);
                    a.setData({
                        msg: "重新发送(" + t + ")",
                        last_time: t,
                        disabled: "disabled"
                    }), t--, setTimeout(function() {
                        e(a);
                    }, 1e3);
                }(a), 200 == e.data.success ? (wx.setStorage({
                    key: "sms_code",
                    data: e.data.code
                }), wx.setStorage({
                    key: "sms_mobile",
                    data: e.data.mobile
                })) : wx.showToast({
                    title: e.data.msg,
                    duration: 2e3,
                    icon: "none"
                });
            }
        }) : (wx.showToast({
            title: "手机号码错误",
            icon: "loading",
            duration: 1e3
        }), !1);
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarTitle({
            title: e.globalData.title
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});