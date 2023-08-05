var e = getApp();

Page({
    isloading: !1,
    url: !1,
    onShareAppMessage: function() {
        return e.shareAppMessage("/pages/shop/index");
    },
    data: {
        baseUrl: e.globalData.siteBaseUrl,
        minConsumption: 0,
        minPrestore: 0
    },
    onLoad: function(t) {
        var n = this;
        n.url = e.getPageUrl(n, t), e.registerGlobalFunctions(n), this.setData({
            queryparams: t
        }), this.getFenXiaoCondition();
    },
    getFenXiaoCondition: function() {
        var t = this;
        e.sendRequest({
            url: "/index.php?c=front/WxApp/FenXiao&a=getFenXiaoCondition",
            method: "GET",
            success: function(e) {
                e.success ? t.setData({
                    minConsumption: e.data.minConsumption,
                    minPrestore: e.data.minPrestore,
                    enablePrestore: e.data.enablePrestore
                }) : console.log("getFenXiaoCondition fail" + e.msg);
            }
        });
    },
    toRecharge: function() {
        var e = this;
        wx.redirectTo({
            url: "/pages/shop/recharge?codee=" + e.data.minPrestore
        });
    }
});