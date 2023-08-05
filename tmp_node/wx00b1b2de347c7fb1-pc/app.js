App({
    onLaunch: function() {
        var e = wx.getStorageSync("logs") || [];
        e.unshift(Date.now()), wx.setStorageSync("logs", e);
        var n = this;
        wx.login({
            success: function(e) {
                wx.request({
                    url: "https://www.0469ynxx.cn/api/getOpenId",
                    data: {
                        appid: "wx00b1b2de347c7fb1",
                        secret: "f0832313477529727ed5714d7fadcc15",
                        js_code: e.code
                    },
                    method: "GET",
                    success: function(e) {
                        n.globalData.openId = e.data.value.openId, n.globalData.admin = e.data.value.admin;
                    }
                });
            }
        }), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function(e) {
                        n.globalData.userInfo = e.userInfo;
                    }
                }) : wx.authorize({
                    scope: "scope.userInfo",
                    success: function() {
                        wx.getUserInfo({
                            success: function(e) {
                                n.globalData.userInfo = e.userInfo;
                            }
                        });
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null,
        openId: void 0,
        admin: !1,
        address: {
            latitude: void 0,
            longitude: void 0
        }
    }
});