var t = require("../../utils/config.js"), o = getApp();

Page({
    data: {
        CouponName: "",
        Price: 0,
        LimitText: "",
        CanUseProducts: "",
        CouponsDate: "",
        CouponId: ""
    },
    onLoad: function(e) {
        var n = this, a = e.id, n = this;
        o.getOpenId(function(e) {
            var s = {
                openId: e,
                couponId: a
            };
            t.httpGet(o.getUrl(o.globalData.loadCouponDetails), s, n.getCouponsData);
        });
    },
    getCouponsData: function(t) {
        var o = this;
        if ("NOUser" == t.Message) wx.redirectTo({
            url: "../login/login"
        }); else if ("OK" == t.Status) {
            var e = t.Data, n = e.StartTime.substring(0, 10).replace("-", "."), a = e.ClosingTime.substring(0, 10).replace("-", "."), s = "";
            s = e.CanUseProducts && e.CanUseProducts > 0 ? "部分商品可用" : "全场通用";
            var i = "";
            i = e.OrderUseLimit > 0 ? "订单满" + e.OrderUseLimit.toFixed(2) + "元可用" : "订单金额无限制", 
            o.setData({
                CouponName: e.CouponName,
                Price: e.Price,
                LimitText: i,
                CanUseProducts: s,
                CouponsDate: n + "~" + a,
                CouponId: e.CouponId
            });
        } else wx.showModal({
            title: "提示",
            content: result.data.Message,
            showCancel: !1,
            success: function(t) {
                t.confirm && wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    GetCoupon: function() {
        var t = this.data.CouponId;
        "" == t || parseInt(t) <= 0 ? wx.showModal({
            title: "提示",
            content: "领取的优惠券不存在",
            showCancel: !1,
            success: function(t) {
                t.confirm && wx.navigateBack({
                    delta: 1
                });
            }
        }) : o.getOpenId(function(e) {
            wx.request({
                url: o.getUrl("UserGetCoupon"),
                data: {
                    openId: e,
                    couponId: t
                },
                success: function(t) {
                    "OK" == t.data.Status ? wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1
                    }) : "NO" == t.data.Status ? wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1
                    }) : "NOUser" == t.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : (that.setData({
                        backShow: "none",
                        couponShow: "none"
                    }), wx.showToast({
                        title: t.data.Message
                    }));
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});