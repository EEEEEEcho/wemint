var t = getApp(), e = t.globalData.rootPath;

Page({
    data: {
        text: "获取验证码",
        second: 60,
        phone: "",
        sendphone: "",
        yzm: ""
    },
    onLoad: function(t) {},
    timeout: function() {
        var t = this;
        t.setData({
            text: t.data.second,
            second: t.data.second - 1
        }), setTimeout(function() {
            t.data.second > 0 ? t.timeout() : t.setData({
                text: "获取验证码",
                second: 60
            });
        }, 1e3);
    },
    input: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    input2: function(t) {
        this.setData({
            yzm: t.detail.value
        });
    },
    onReady: function() {},
    onShow: function() {},
    getYzm: function() {
        var t = this.data.phone.replace(/(^\s*)|(\s*$)/g, "");
        if ("" == t) return wx.showToast({
            title: "请输入手机号码",
            icon: "none",
            duration: 1e3,
            mask: !0
        }), !1;
        if (!/^1[34578]\d{9}$/.test(t)) return wx.showToast({
            title: "手机号码格式不正确",
            icon: "none",
            duration: 1e3,
            mask: !0
        }), !1;
        this.timeout();
        var o = this;
        wx.request({
            url: e + "/admin/zwapi/sendMessage",
            data: {
                tel: t
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t), 1 == t.data.code ? (wx.showToast({
                    title: t.data.info,
                    icon: "success",
                    duration: 1e3,
                    mask: !0
                }), o.setData({
                    sendphone: t.data.phone
                })) : wx.showToast({
                    title: t.data.info,
                    icon: "none",
                    duration: 1e3,
                    mask: !0
                });
            }
        });
    },
    bindphone: function() {
        var o = this, a = o.data.sendphone, n = o.data.yzm.replace(/(^\s*)|(\s*$)/g, "");
        return "" == o.data.phone ? (wx.showToast({
            title: "请输入手机号码",
            icon: "none",
            duration: 1e3,
            mask: !0
        }), !1) : /^1[34578]\d{9}$/.test(o.data.phone) ? "" == n ? (wx.showToast({
            title: "请输入手机验证码",
            icon: "none",
            duration: 1e3,
            mask: !0
        }), !1) : a != o.data.phone ? (wx.showToast({
            title: "输入手机号码与验证手机号码不匹配",
            icon: "none",
            duration: 1e3,
            mask: !0
        }), !1) : (wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), void wx.request({
            url: e + "/admin/xcx/bindphone",
            data: {
                openid: t.globalData.openid,
                phone: a,
                yzm: n,
                tuijian: ""
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                1 == t.data.code ? (wx.showToast({
                    title: t.data.info,
                    icon: "success",
                    duration: 1e3,
                    mask: !0
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1e3)) : wx.showToast({
                    title: t.data.info,
                    icon: "none",
                    duration: 1e3,
                    mask: !0
                });
            }
        })) : (wx.showToast({
            title: "手机号码格式不正确",
            icon: "none",
            duration: 1e3,
            mask: !0
        }), !1);
    }
});