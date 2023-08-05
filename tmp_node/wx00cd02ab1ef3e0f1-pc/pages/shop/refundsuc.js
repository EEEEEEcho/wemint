var e = getApp();

require("../../components/utils/imgutil.js");

Page({
    isloading: !1,
    bannerLoaded: !1,
    url: !1,
    onShareAppMessage: function() {
        return e.shareAppMessage({
            url: this.url,
            title: this.data.productInfo.Name
        });
    },
    onLoad: function(a) {
        var r = this;
        r.url = e.getPageUrl(r, a), e.registerGlobalFunctions(r), this.setData({
            queryparams: a
        }), this.loadrefundsreson();
    },
    data: {
        currentTab: 0,
        baseUrl: e.globalData.cdnBaseUrl
    },
    loadrefundsreson: function() {
        var a = this;
        if (!a.isloading) {
            a.isloading = !0;
            var r = 0, t = 0;
            a.data.queryparams.orderid && (r = a.data.queryparams.orderid), a.data.queryparams.pkey && (t = a.data.queryparams.pkey), 
            e.sendRequest({
                url: "/index.php?c=Front/WxApp/ShopApi&a=rdetail&orderid=" + r + "&pkey=" + t,
                method: "GET",
                success: function(e) {
                    a.isloading = !1, e.success ? a.setData({
                        refundsuc: e.msg
                    }) : console.log("getProductInfo fail：" + e.msg);
                },
                fail: function(e) {
                    a.isloading = !1, console.log("getProductInfo fail");
                }
            });
        }
    },
    fromsubmit: function(a) {
        var r = a.detail.value.refundsOrderID, t = a.detail.value.refundsPKey, s = a.detail.value.refundsReason, n = a.detail.value.DeliveryGood, o = a.detail.value.refundsEdit;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=Apply&refundsOrderID=" + r + "&refundsPKey=" + t + "&refundsReason=" + s + "&DeliveryGood=" + n + "&edit=" + o,
            method: "GET",
            success: function(e) {
                return console.log(e), !1;
            },
            fail: function(e) {
                that.isloading = !1, console.log("getProductInfo fail");
            }
        });
    },
    navbarTap: function(e) {
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        });
    }
});