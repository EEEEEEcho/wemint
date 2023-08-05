var e = getApp();

Page({
    data: {
        disabled: !0,
        userName: "",
        password: ""
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    bindUserNameInput: function(e) {
        this.setData({
            userName: e.detail.value
        });
    },
    bindPwdInput: function(e) {
        this.setData({
            password: e.detail.value
        }), this.data.userName.length > 0 && this.data.password.length > 0 ? this.setData({
            disabled: !1
        }) : this.setData({
            disabled: !0
        });
    },
    loginbyUser: function(a) {
        var n = this.data.userName, t = this.data.password;
        t.length < 6 ? wx.showModal({
            title: "提示",
            content: "密码长度不能少于6位",
            showCancel: !1
        }) : (wx.showLoading({
            title: "正在登陆"
        }), e.getWxUserInfo(function(a) {
            wx.request({
                url: e.getUrl("LoginByUserName"),
                data: {
                    openId: a.openId,
                    userName: n,
                    password: t,
                    nickName: a.nikeName,
                    unionId: a.unionId,
                    encryptedData: a.encryptedData,
                    session_key: a.session_key,
                    iv: a.iv
                },
                success: function(a) {
                    "OK" == a.data.Status && (wx.hideLoading(), e.setUserInfo(a.data.Data), wx.switchTab({
                        url: "../home/home"
                    }));
                }
            });
        }));
    },
    onGotUserInfo: function(a) {
        var n = {};
        n.userInfo = a.detail.userInfo;
        var t = this;
        wx.login({
            success: function(a) {
                if (a.code) {
                    var s = a.code;
                    wx.request({
                        url: e.getUrl("GetOpenId"),
                        data: {
                            appid: e.globalData.appId,
                            secret: e.globalData.secret,
                            js_code: s
                        },
                        success: function(a) {
                            if (void 0 != a.data && void 0 != a.data.openid) {
                                var s = {
                                    openId: a.data.openid,
                                    nikeName: n.userInfo.nickName,
                                    unionId: "",
                                    headImage: n.userInfo.avatarUrl,
                                    encryptedData: n.encryptedData,
                                    session_key: a.data.session_key,
                                    iv: n.iv
                                };
                                e.globalData.wxUserInfo = s, t.loginwxuser(e.globalData.wxUserInfo);
                            }
                        }
                    });
                } else console.log("获取用户登录态失败！" + a.errMsg);
            }
        });
    },
    loginwxuser: function(a) {
        wx.request({
            url: e.getUrl("QuickLogin"),
            data: {
                openId: a.openId,
                nickName: a.nikeName,
                unionId: a.unionId,
                headImage: a.headImage,
                encryptedData: a.encryptedData,
                session_key: a.session_key,
                iv: a.iv
            },
            success: function(a) {
                "OK" == a.data.Status && (e.setUserInfo(a.data.Data), wx.switchTab({
                    url: "../home/home"
                }));
            }
        });
    },
    quickLogin: function(a) {
        e.getWxUserInfo(function(a) {
            wx.request({
                url: e.getUrl("QuickLogin"),
                data: {
                    openId: a.openId,
                    nickName: a.nikeName,
                    unionId: a.unionId,
                    headImage: a.headImage,
                    encryptedData: a.encryptedData,
                    session_key: a.session_key,
                    iv: a.iv
                },
                success: function(a) {
                    "OK" == a.data.Status && (e.setUserInfo(a.data.Data), wx.switchTab({
                        url: "../home/home"
                    }));
                }
            });
        });
    }
});