App({
    onLaunch: function() {
        var e = this, o = wx.getStorageSync("logs") || [];
        o.unshift(Date.now()), wx.setStorageSync("logs", o), wx.login({
            success: function(o) {
                console.log("wx.login=>"), console.log(o);
                var t = o.code;
                e.loadinfo(t);
            }
        });
    },
    loadinfo: function(e) {
        var o = getApp().globalData.BaseHost, t = getApp().globalData.appid, a = getApp().globalData.secret;
        wx.request({
            url: o + "xs/getWXuserInfoServlet",
            method: "POST",
            data: {
                code: e,
                appid: t,
                secret: a
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log(e), wx.setStorageSync("openid", e.data.openid);
            }
        });
    },
    globalData: {
        userInfo: null,
        appid: "wx00eee55cb54466c6",
        secret: "89d5c0baeb2b3f1325b4b59e9a74b3bc",
        BaseHost: "https://xcx.hrbrainbow.com/Givee01/"
    }
});