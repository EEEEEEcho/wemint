App({
    d: {
        hostUrl: "https://td.sjmd.com.cn/index.php",
        hostImg: "http://img.ynjmzb.net",
        hostVideo: "http://zhubaotong-file.oss-cn-beijing.aliyuncs.com",
        userId: 1,
        appId: "wx0ae34c824634696e",
        appKey: "484a8ffcf3d68f51ad6271bd67cbfe98",
        ceshiUrl: "https://td.sjmd.com.cn/index.php"
    },
    onLaunch: function() {
        var e = wx.getStorageSync("logs") || [];
        e.unshift(Date.now()), wx.setStorageSync("logs", e), this.getUserInfo();
    },
    getUserInfo: function(e) {
        var o = this;
        this.globalData.userInfo ? "function" == typeof e && e(this.globalData.userInfo) : wx.login({
            success: function(t) {
                var n = t.code;
                wx.getUserInfo({
                    success: function(t) {
                        o.globalData.userInfo = t.userInfo, "function" == typeof e && e(o.globalData.userInfo),
                        o.getUserSessionKey(n);
                    },
                    fail: function(e) {
                        console.log(e);
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
                    title: "网络异常2！err:getsessionkeys",
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
                var n = t.ID;
                if (!n) return wx.showToast({
                    title: "登录失败！",
                    duration: 3e3
                }), !1;
                e.d.userId = n;
            },
            fail: function(e) {
                wx.showToast({
                    title: "网络异常1！err:authlogin",
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
});