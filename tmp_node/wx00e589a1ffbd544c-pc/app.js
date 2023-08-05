App({
    onHide: function() {
        this.data.webShowed = !1;
    },
    data: {
        webShowed: !1
    },
    onLaunch: function() {
        var e = this, t = wx.getStorageSync("logs") || [];
        t.unshift(Date.now()), wx.setStorageSync("logs", t), wx.login({
            success: function(e) {}
        }), wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(t) {
                        e.globalData.userInfo = t.userInfo, e.userInfoReadyCallback && e.userInfoReadyCallback(t);
                    }
                });
            }
        });
    },
    globalData: {
        url: "https://fx.izhixiu.cn/zxshop_jimi/",
        weburl: "https://fx.izhixiu.cn/zxshop_jimi/front/zhima_wed/index/homepage.html",
        appid: "wx00e589a1ffbd544c",
        secret: "025d08d857421e0408eb7812c6f2494c"
    }
});