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
        var e = this;
        e.url = a.getPageUrl(e, t), a.registerGlobalFunctions(e), this.setData({
            queryparams: t,
            hasrefunds: "",
            info: ""
        }), this.loadmyinfomation();
    },
    data: {
        classid: 0,
        currentTab: 0,
        baseUrl: a.globalData.cdnBaseUrl
    },
    loadmyinfomation: function() {
        var t = this;
        t.isloading || (t.isloading = !0, a.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getMyCenterData",
            method: "GET",
            success: function(a) {
                1 == a.needLogin ? wx.reLaunch({
                    url: "/pages/company/mycenter"
                }) : (t.isloading = !1, t.setData({
                    info: a.info
                })), a.success || console.log("getProductList fail：" + a.msg);
            },
            fail: function(a) {
                t.isloading = !1, console.log("getProductList fail");
            }
        }));
    },
    navbarTap: function(a) {
        this.setData({
            currentTab: a.currentTarget.dataset.idx
        });
    }
});