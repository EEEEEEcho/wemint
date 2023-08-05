var t = getApp();

require("../../components/utils/imgutil.js");

Page({
    isloading: !1,
    url: !1,
    onShareAppMessage: function() {
        return t.shareAppMessage({
            url: this.url,
            title: this.data.newsInfo.Title
        });
    },
    onLoad: function(a) {
        var e = this;
        e.url = t.getPageUrl(e, a), t.registerGlobalFunctions(e), this.setData({
            queryparams: a
        }), this.loadNotice();
    },
    data: {
        baseUrl: t.globalData.siteBaseUrl,
        plugNavFlag: !0
    },
    loadNotice: function() {
        var a = this;
        if (!a.isloading) {
            a.isloading = !0;
            a.data.queryparams.id && a.data.queryparams.id, t.sendRequest({
                url: "/index.php?c=Front/WxApp/ServiceApi&a=getNotice",
                method: "GET",
                success: function(e) {
                    a.isloading = !1, e.success ? (wx.setNavigationBarTitle({
                        title: e.notice.Title
                    }), t.WxParse.wxParse("NoticeDetail", "html", e.notice.Detail, a, 5), a.setData({
                        notice: e.notice
                    })) : console.log("getNotice fail：" + e.msg);
                },
                fail: function(t) {
                    a.isloading = !1, console.log("getNotice fail");
                }
            });
        }
    },
    navBtnShowAndHide: function() {
        var t = !this.data.plugNavFlag;
        this.setData({
            plugNavFlag: t
        });
    }
});