var a = getApp();

require("../../components/utils/imgutil.js");

Page({
    isloading: !1,
    bannerLoaded: !1,
    url: !1,
    onShareAppMessage: function() {
        return a.shareAppMessage({
            url: this.url,
            title: this.data.productInfo.Name
        });
    },
    onLoad: function(t) {
        var s = this;
        s.url = a.getPageUrl(s, t), a.registerGlobalFunctions(s), this.setData({
            queryparams: t,
            hasrefunds: "",
            kuaididata: ""
        }), this.loadkuadi();
    },
    data: {
        classid: 0,
        currentTab: 0,
        baseUrl: a.globalData.cdnBaseUrl
    },
    loadkuadi: function() {
        var t = this;
        if (!t.isloading) {
            t.isloading = !0;
            var s = "", i = "";
            t.data.queryparams.company && (s = t.data.queryparams.company), t.data.queryparams.postid && (i = t.data.queryparams.postid), 
            a.sendRequest({
                url: "/index.php?c=Front/WxApp/ShopApi&a=KuaiDi100&type=" + s + "&postid=" + i,
                method: "GET",
                success: function(a) {
                    t.isloading = !1, t.setData({
                        kuaididata: a.data
                    }), a.success || console.log("getProductList fail：" + a.msg);
                },
                fail: function(a) {
                    t.isloading = !1, console.log("getProductList fail");
                }
            });
        }
    },
    navbarTap: function(a) {
        this.setData({
            currentTab: a.currentTarget.dataset.idx
        });
    }
});