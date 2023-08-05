App({
    page: {
        url: "https://mqjcc.baidu0351.cn/",
        userid: "",
        style: "",
        code: "",
        appid: "wx00a796d7b4c9884c",
        secret: "e661c3682129dc0333bfc4289f594091"
    },
    onLaunch: function() {
        var e = this, t = wx.getStorageSync("logs") || [];
        t.unshift(Date.now()), wx.setStorageSync("logs", t), wx.showShareMenu(), wx.request({
            url: e.page.url + "/wx/index.php?act=title",
            method: "post",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t), e.globalData.title = t.data.title, console.log(e.globalData.title);
            }
        });
    },
    globalData: {
        userInfo: null,
        openid: "",
        is_mobile: "",
        offline_pay: "",
        cid: 0
    }
});