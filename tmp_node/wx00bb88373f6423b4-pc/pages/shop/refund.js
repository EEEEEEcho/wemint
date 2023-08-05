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
        var s = this;
        s.url = e.getPageUrl(s, t), e.registerGlobalFunctions(s), this.setData({
            queryparams: t
        }), this.loadrefundsreson();
    },
    data: {
        currentTab: 0,
        baseUrl: e.globalData.cdnBaseUrl,
        ismodify: !1,
        isImg: !1
    },
    loadrefundsreson: function() {
        var t = this;
        if (!t.isloading) {
            t.isloading = !0;
            var s = 0, a = 0;
            t.data.queryparams.orderid && (s = t.data.queryparams.orderid), t.data.queryparams.pkey && (a = t.data.queryparams.pkey), 
            e.sendRequest({
                url: "/index.php?c=Front/WxApp/ShopApi&a=rdetail&orderid=" + s + "&pkey=" + a,
                method: "GET",
                success: function(s) {
                    if (t.isloading = !1, s.success) {
                        var a = "";
                        0 == s.msg.Status && null == s.msg.RefundProStatus ? a = "申请退款" : 1 == s.msg.Status && null == s.msg.RefundProStatus ? a = "退款完成" : 2 == s.msg.Status && null == s.msg.RefundProStatus ? a = "退款失败" : 0 == s.msg.Status && 0 == s.msg.RefundProStatus ? a = "申请退货" : 0 == s.msg.Status && 1 == s.msg.RefundProStatus ? a = "同意退货, 等待买家退货" : 0 == s.msg.Status && 2 == s.msg.RefundProStatus ? a = "已退货, 等待处理" : 1 == s.msg.Status && 2 == s.msg.RefundProStatus ? a = "退货完成" : 2 == s.msg.Status && 0 == s.msg.RefundProStatus && (a = "退货失败"), 
                        0 == s.msg.Status && 2 == s.msg.RefundProStatus && (t.ismodify = !0), null != s.msg.RefundProStatus && (t.isImg = !0), 
                        t.setData({
                            refundsuc: s.msg,
                            refundstext: a,
                            refundimg: s.msg.RefundImg,
                            refundimgth: s.msg.RefundImg.length,
                            siteID: e.globalData.baseInfo.SiteID
                        });
                    } else console.log("getProductInfo fail：" + s.msg);
                },
                fail: function(e) {
                    t.isloading = !1, console.log("getProductInfo fail");
                }
            });
        }
    },
    fromsubmit: function(t) {
        var s = t.detail.value.refundsOrderID, a = t.detail.value.refundsPKey, u = t.detail.value.refundsReason, r = t.detail.value.DeliveryGood, n = t.detail.value.refundsEdit;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=Apply&refundsOrderID=" + s + "&refundsPKey=" + a + "&refundsReason=" + u + "&DeliveryGood=" + r + "&edit=" + n,
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
    },
    goRufundswuliu: function(e) {
        var t = e.currentTarget.dataset.pkey;
        wx.redirectTo({
            url: "refundswuliu?pkey=" + t
        });
    }
});