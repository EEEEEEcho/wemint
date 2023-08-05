App({
    d: {
        hostUrl: "https://jszb.xihewh.com",
        hostImg: "https://jszb.xihewh.com",
        hostVideo: "https://jszb.xihewh.com",
        appId: " \twx00cc9fcdbff8d1e6",
        appKey: "1a0ad61d08d0f10ce7373017542141d6",
        ceshiUrl: "https://jszb.xihewh.com"
    },
    onLaunch: function() {
        var e = wx.getStorageSync("logs") || [];
        e.unshift(Date.now()), wx.setStorageSync("logs", e), this.getUserInfo();
    },
    getUserInfo: function(e) {
        var o = this;
        this.globalData.userInfo ? "function" == typeof e && e(this.globalData.userInfo) : wx.login({
            success: function(t) {
                var s = t.code;
                wx.getUserInfo({
                    success: function(t) {
                        o.globalData.userInfo = t.userInfo, "function" == typeof e && e(o.globalData.userInfo), 
                        o.getUserSessionKey(s);
                    }
                });
            }
        });
    },
    getUserSessionKey: function(e) {
        var o = this;
        wx.request({
            url: o.d.ceshiUrl + "/Api/Login/getsessionkey",
            method: "post",
            data: {
                code: e
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var t = e.data;
                if (0 == t.status) return wx.showToast({
                    title: t.err,
                    duration: 2e3
                }), !1;
                o.globalData.userInfo.sessionId = t.session_key, o.globalData.userInfo.openid = t.openid, 
                o.onLoginUser();
            },
            fail: function(e) {
                wx.showToast({
                    title: "网络异常！err:getsessionkeys",
                    duration: 2e3
                });
            }
        });
    },
    onLoginUser: function() {
        var e = this, o = e.globalData.userInfo;
        wx.request({
            url: e.d.ceshiUrl + "/Api/Login/authlogin",
            method: "post",
            data: {
                SessionId: o.sessionId,
                gender: o.gender,
                NickName: o.nickName,
                HeadUrl: o.avatarUrl,
                openid: o.openid
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(o) {
                var t = o.data.arr;
                if (1 != o.data.status) return wx.showToast({
                    title: o.data.err,
                    duration: 3e3
                }), !1;
                e.globalData.userInfo.id = t.ID, e.globalData.userInfo.NickName = t.NickName, e.globalData.userInfo.HeadUrl = t.HeadUrl;
                var s = t.ID;
                if (!s) return wx.showToast({
                    title: "登录失败！",
                    duration: 3e3
                }), !1;
                e.d.userId = s;
            },
            fail: function(e) {
                wx.showToast({
                    title: "网络异常！err:authlogin",
                    duration: 2e3
                });
            }
        });
    },
    getOrBindTelPhone: function(e) {
        this.globalData.userInfo.tel || wx.navigateTo({
            url: "pages/binding/binding"
        });
    },
    globalData: {
        userInfo: null
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    }
}), wx.getSetting({
    success: function(e) {
        e.authSetting["scope.writePhotosAlbum"] || wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: function() {
                console.log("授权成功");
            }
        });
    }
});