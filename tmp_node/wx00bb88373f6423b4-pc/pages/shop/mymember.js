var a = getApp();

Page({
    onLoad: function(e) {
        this.data.level = e.level, a.getPageUrl(this, e), a.registerGlobalFunctions(this), 
        this.setData({
            queryparams: e
        });
    },
    onShow: function(a) {
        this.loadDeam();
    },
    data: {
        myteam: [],
        level: "",
        baseUrl: a.globalData.cdnBaseUrl
    },
    loadDeam: function() {
        var e = this;
        if (!e.isloading) {
            e.isloading = !0;
            var t = 0;
            e.data.queryparams.userid && (t = e.data.queryparams.userid), a.sendRequest({
                url: "/index.php?c=front/WxApp/FenXiao&a=getMemberFenXiaoDetail&userid=" + t,
                method: "GET",
                data: {},
                success: function(a) {
                    if (e.isloading = !1, a.success) {
                        var t = a.data.user.HeadImgUrl;
                        t ? /^https*:\/\//.test(t) || (t = e.baseUrl + t) : t = "../../images/touxiang.jpg", 
                        a.data.user.HeadImgUrl = t, e.setData({
                            myteam: a.data.user,
                            myteams: a.data.list
                        });
                    } else console.log("getMemberFenXiaoDetail fail：" + a.msg);
                },
                fail: function(a) {
                    e.isloading = !1, console.log("getMemberFenXiaoDetail fail");
                }
            });
        }
    },
    getteam: function(a) {
        var e = a.currentTarget.dataset.UserID;
        wx.navigateTo({
            url: "mymember?userid=" + e
        });
    }
});