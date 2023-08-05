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
    onLoad: function(t) {
        var a = this;
        a.url = e.getPageUrl(a, t), e.registerGlobalFunctions(a), this.setData({
            queryparams: t
        }), this.loadrefundsreson();
    },
    data: {
        currentInpOne: "",
        currentInpTwo: "",
        currentTab: 0,
        baseUrl: e.globalData.cdnBaseUrl,
        disabled: !0,
        logistics: ""
    },
    loadrefundsreson: function() {
        var t = this;
        if (!t.isloading) {
            t.isloading = !0;
            var a = 0;
            t.data.queryparams.pkey && (a = t.data.queryparams.pkey), e.sendRequest({
                url: "/index.php?c=Front/WxApp/ShopApi&a=rdetail&pkey=" + a,
                method: "GET",
                success: function(e) {
                    t.isloading = !1, e.success ? t.setData({
                        businessinfo: e.msg
                    }) : console.log("getProductInfo fail：" + e.msg);
                },
                fail: function(e) {
                    t.isloading = !1, console.log("getProductInfo fail");
                }
            });
        }
    },
    bindinput: function(e) {
        var t = e.detail.value;
        "1" === e.currentTarget.dataset.currentinp ? t.length ? this.setData({
            currentInpOne: t
        }) : this.setData({
            logistics: t,
            disabled: !0
        }) : "2" === e.currentTarget.dataset.currentinp && (t.length ? this.setData({
            currentInpTwo: t
        }) : this.setData({
            currentInpTwo: t,
            disabled: !0
        }));
    },
    fromsubmit: function(t) {
        var a = 0, s = 0, r = this;
        r.data.queryparams.pkey && (s = r.data.queryparams.pkey);
        var a = t.detail.value.orderid, s = t.detail.value.pkey, n = t.detail.value.tracking;
        console.log(n);
        var i = t.detail.value.logistics;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=ApplyAddition&OrderID=" + a + "&Pkey=" + s + "&Tracking=" + n + "&Logistics=" + i,
            method: "GET",
            success: function(e) {
                r.isloading = !1, e.success ? wx.redirectTo({
                    url: "refund?orderid=" + a + "&pkey=" + s
                }) : console.log("getProductInfo fail：" + e.msg);
            },
            fail: function(e) {
                r.isloading = !1, console.log("getProductInfo fail");
            }
        });
    },
    navbarTap: function(e) {
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        });
    }
});