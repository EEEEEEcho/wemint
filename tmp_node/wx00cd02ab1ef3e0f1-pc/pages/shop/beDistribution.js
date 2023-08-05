var e = getApp();

Page({
    isloading: !1,
    url: !1,
    onShareAppMessage: function() {
        return e.shareAppMessage("/pages/shop/index");
    },
    data: {
        minConsumption: 0,
        minPrestore: 0
    },
    onLoad: function(n) {
        var o = this;
        o.url = e.getPageUrl(o, n), e.registerGlobalFunctions(o), this.setData({
            queryparams: n
        }), this.getFenXiaoCondition();
    },
    onShow: function() {},
    getFenXiaoCondition: function() {
        var n = this;
        e.sendRequest({
            url: "/index.php?c=front/WxApp/FenXiao&a=getFenXiaoCondition",
            method: "GET",
            success: function(e) {
                e.success ? (console.log(e), n.setData({
                    minConsumption: e.data.minConsumption,
                    minPrestore: e.data.minPrestore,
                    enablePrestore: e.data.enablePrestore
                })) : console.log("getFenXiaoCondition fail" + e.msg);
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