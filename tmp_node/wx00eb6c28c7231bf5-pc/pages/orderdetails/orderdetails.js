var t = getApp();

Page({
    data: {
        OrderInfo: null,
        LogisticsData: null,
        SendGifts: null
    },
    onLoad: function(e) {
        var a = this, o = e.orderid;
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("GetOrderDetail"),
                data: {
                    openId: e,
                    orderId: o
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var e = t.data.Data, o = "";
                        "" != e.LogisticsData && (o = JSON.parse(e.LogisticsData));
                        var r = "";
                        for (var n in e.Gifts) r.length > 0 && (r += ","), r += e.Gifts[n].GiftName + "×" + e.Gifts[n].Quantity;
                        a.setData({
                            OrderInfo: e,
                            SendGifts: r,
                            LogisticsData: o
                        });
                    } else "NOUser" == t.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            });
        });
    },
    goToProductDetail: function(t) {
        var e = this, a = t.currentTarget.dataset.productid;
        e.data.OrderInfo.CountDownId > 0 ? wx.redirectTo({
            url: "../countdowndetail/countdowndetail?id=" + e.data.OrderInfo.CountDownId
        }) : wx.redirectTo({
            url: "../productdetail/productdetail?id=" + a
        });
    },
    orderPay: function(e) {
        var a = e.currentTarget.dataset.orderid;
        t.orderPay(a, 0, !1);
    },
    orderFinish: function(e) {
        var a = e.currentTarget.dataset.orderid;
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("FinishOrder"),
                data: {
                    openId: e,
                    orderId: a
                },
                success: function(t) {
                    "OK" == t.data.Status ? wx.showModal({
                        title: "提示",
                        content: "确认收货成功！",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateTo({
                                url: "../orderlist/orderlist?status=0"
                            });
                        }
                    }) : "NOUser" == t.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateTo({
                                url: "../orderlist/orderlist?status=0"
                            });
                        }
                    });
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});