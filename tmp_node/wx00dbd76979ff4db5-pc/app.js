App({
    onLaunch: function() {
        var e = wx.getStorageSync("logs") || [];
        e.unshift(Date.now()), wx.setStorageSync("logs", e);
    },
    globalData: {
        rootPath: "https://yachebao.shundaoyun.com",
        openid: "",
        appid: "wx00dbd76979ff4db5",
        secret: "4e91e4ee3d58f7fe57f04df02be571c9"
    }
});