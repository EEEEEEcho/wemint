var o = getApp();

Page({
    pageurl: "",
    url: !1,
    onLoad: function(o) {
        this.setData({
            queryparams: o
        }), this.getCouponData(o.id);
    },
    data: {
        queryparams: {},
        couponInfo: {},
        couponUrl: ""
    },
    getCouponData: function(e) {
        var n = this;
        o.sendRequest({
            url: "/index.php?c=front/WxApp/ShopApi&a=getCouponWriteOffrCode&ID=" + e,
            method: "GET",
            success: function(o) {
                if (o.success) {
                    var e = o.info.couponInfo || {}, t = o.info.couponItemInfo;
                    if (e.EndTime = t.ExTime, e.Code = t.Code, e.CanUseWeek) {
                        var a = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ], u = e.CanUseWeek.split(",").sort(function(o, e) {
                            return o > e ? 1 : -1;
                        }), i = "逢";
                        u.forEach(function(o, e) {
                            i += a[o], e < u.length - 1 && (i += "、");
                        }), e.CanUseWeekText = i;
                    }
                    n.setData({
                        couponInfo: e || {},
                        couponUrl: o.info.qrCodeUrl
                    });
                }
            },
            fail: function(o) {
                console.log("getCouponWriteOffrCode fail");
            }
        });
    },
    goProductList: function() {
        wx.navigateTo({
            url: "/pages/shop/productlist?couponId=" + this.data.queryparams.id
        });
    }
});