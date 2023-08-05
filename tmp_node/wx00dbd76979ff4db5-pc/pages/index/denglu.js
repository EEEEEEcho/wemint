var t = getApp(), a = t.globalData.rootPath;

Page({
    data: {
        path: a,
        text: "获取验证码",
        second: 60,
        phone: "",
        sendphone: "",
        yzm: ""
    },
    onLoad: function(e) {
        wx.hideShareMenu();
        var n = this;
        wx.request({
            url: a + "/admin/xcx/user",
            data: {
                openid: t.globalData.openid
            },
            method: "POST",
            success: function(t) {
                console.log(t), n.setData({
                    user: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
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
    input3: function(t) {
        var a = t.detail.value;
        void 0 == a ? this.setData({
            tuijian: ""
        }) : this.setData({
            tuijian: a
        });
    },
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
        var e = this;
        wx.request({
            url: a + "/admin/zwapi/sendMessage",
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
                }), e.setData({
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
        var e = this, n = e.data.sendphone, o = e.data.yzm.replace(/(^\s*)|(\s*$)/g, ""), i = e.data.tuijian;
        return "" == e.data.phone ? (wx.showToast({
            title: "请输入手机号码",
            icon: "none",
            duration: 1e3,
            mask: !0
        }), !1) : /^1[34578]\d{9}$/.test(e.data.phone) ? "" == o ? (wx.showToast({
            title: "请输入手机验证码",
            icon: "none",
            duration: 1e3,
            mask: !0
        }), !1) : n != e.data.phone ? (wx.showToast({
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
            url: a + "/admin/zwapi/bindphone",
            data: {
                openid: t.globalData.openid,
                phone: n,
                yzm: o,
                tuijian: i
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
                    wx.switchTab({
                        url: "/pages/index/index"
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