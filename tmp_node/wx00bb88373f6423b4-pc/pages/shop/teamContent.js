function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = getApp();

Page((t = {
    onLoad: function(e) {
        this.data.level = e.level, a.getPageUrl(this, e), a.registerGlobalFunctions(this), 
        this.loadDeam();
    },
    onShow: function(e) {
        this.loadDeam();
    },
    data: {
        myteam: [],
        level: "",
        scrollCurrent: 0,
        scrollHeight: a.windowHeight * a.pixelRatio - 70,
        baseUrl: a.globalData.cdnBaseUrl
    },
    loadDeam: function() {
        var e = this;
        e.isloading || (e.isloading = !0, a.sendRequest({
            url: "/index.php?c=front/WxApp/FenXiao&a=getMemberListByLevel&level=" + e.data.level,
            method: "GET",
            data: {},
            success: function(t) {
                if (e.isloading = !1, t.success) {
                    if (t.data.list) for (var a = 0; a < t.data.list.length; a++) {
                        var l = t.data.list[a].HeadImgUrl;
                        l ? /^https*:\/\//.test(l) || (l = e.baseUrl + l) : l = "../../images/touxiang.jpg", 
                        t.data.list[a].HeadImgUrl = l;
                    }
                    e.setData({
                        myteam: t.data.list,
                        myteams: t.data,
                        myteamslength: t.data.list.length - 1,
                        level: e.data.level,
                        hastaem: t.data.list.length > 0
                    });
                } else console.log("getMemberListByLevel fail：" + t.msg);
            },
            fail: function(t) {
                e.isloading = !1, console.log("getMemberListByLevel fail");
            }
        }));
    },
    getteam: function() {}
}, e(t, "getteam", function(e) {
    var t = e.currentTarget.dataset.userid;
    wx.navigateTo({
        url: "mymember?userid=" + t
    });
}), e(t, "onOrderListScroll", function(e) {
    this.loadDeam();
}), t));