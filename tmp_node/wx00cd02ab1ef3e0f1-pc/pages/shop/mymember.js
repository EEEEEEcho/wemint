var e = getApp();

Page(function(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}({
    onLoad: function(a) {
        console.log(a), this.data.level = a.level, e.getPageUrl(this, a), e.registerGlobalFunctions(this), 
        this.setData({
            queryparams: a
        }), console.log(a);
    },
    onShow: function(e) {
        this.loadDeam();
    },
    data: {
        myteam: [],
        level: "",
        baseUrl: e.globalData.cdnBaseUrl
    },
    loadDeam: function() {
        var a = this;
        if (!a.isloading) {
            a.isloading = !0;
            var t = 0;
            a.data.queryparams.userid && (t = a.data.queryparams.userid), console.log(t), e.sendRequest({
                url: "/index.php?c=front/WxApp/FenXiao&a=getMemberFenXiaoDetail&userid=" + t,
                method: "GET",
                data: {},
                success: function(e) {
                    if (a.isloading = !1, e.success) {
                        var t = e.data.user.HeadImgUrl;
                        t ? /^https*:\/\//.test(t) || (t = a.baseUrl + t) : t = "../../images/touxiang.jpg", 
                        e.data.user.HeadImgUrl = t, a.setData({
                            myteam: e.data.user,
                            myteams: e.data.list
                        });
                    } else console.log("getMemberFenXiaoDetail fail：" + e.msg);
                },
                fail: function(e) {
                    a.isloading = !1, console.log("getMemberFenXiaoDetail fail");
                }
            });
        }
    },
    getteam: function() {}
}, "getteam", function(e) {
    var a = e.currentTarget.dataset.UserID;
    wx.navigateTo({
        url: "mymember?userid=" + a
    });
}));