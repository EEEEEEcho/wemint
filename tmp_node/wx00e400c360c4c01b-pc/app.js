require("utils/main.js");

App({
    onLaunch: function() {
        var e = this, s = wx.getStorageSync("logs") || [];
        s.unshift(Date.now()), wx.setStorageSync("logs", s), wx.login({
            success: function(e) {}
        }), wx.getSetting({
            success: function(s) {
                s.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(s) {
                        e.globalData.userInfo = s.userInfo, e.userInfoReadyCallback && e.userInfoReadyCallback(s);
                    }
                });
            }
        });
    },
    globalData: {
        appid: "wx00e400c360c4c01b",
        secret: "556339e67e91261e74bc92c9d0527c23",
        menuList: [],
        userInfo: null,
        teacher: {},
        cpc: {},
        csc: {},
        openId: "",
        posterList: [],
        acList: [],
        qrcode: "",
        mobile: "0531—87969509"
    }
});