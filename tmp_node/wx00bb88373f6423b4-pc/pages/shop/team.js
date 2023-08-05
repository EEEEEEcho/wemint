var t = getApp();

Page({
    onLoad: function(a) {
        this.loadData(), t.getPageUrl(this, a), t.registerGlobalFunctions(this);
    },
    onShow: function() {
        this.loadData();
    },
    data: {
        myteam: {},
        showLevel: 0
    },
    loadData: function() {
        var a = this;
        a.isloading || (a.isloading = !0, t.sendRequest({
            url: "/index.php?c=front/WxApp/FenXiao&a=getMemberStatistics",
            method: "GET",
            success: function(t) {
                a.isloading = !1, t.success ? a.setData({
                    myteam: t.data,
                    showLevel: parseInt(t.data.showLevel)
                }) : console.log("getMemberStatistics fail：" + t.msg);
            },
            fail: function(t) {
                a.isloading = !1, console.log("getMemberStatistics fail");
            }
        }));
    }
});