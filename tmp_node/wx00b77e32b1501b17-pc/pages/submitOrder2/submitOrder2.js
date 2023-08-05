function a(a) {
    wx.showToast({
        title: "加载中...",
        icon: "loading"
    }), wx.request({
        url: e.globalData.apiurl + "order/info/get",
        data: {
            orderId: a.data.orderId
        },
        method: "GET",
        success: function(t) {
            if (wx.hideToast(), 1200 == t.data.code) {
                var e = t.data.content;
                a.setData({
                    orderMoney: e.PayMoney
                });
            } else wx.showModal({
                content: t.data.msg,
                showCancel: !1,
                confirmText: "确定"
            });
        }
    });
}

function t(a) {
    wx.request({
        url: e.globalData.apiurl + "pay/order/notify",
        data: {
            orderId: a.data.orderId
        },
        method: "GET",
        success: function(t) {
            1200 == t.data.code ? wx.redirectTo({
                url: "/pages/paySucceed/paySucceed?OrderID=" + a.data.orderId
            }) : wx.showModal({
                content: t.data.msg,
                showCancel: !1,
                confirmText: "确定"
            });
        }
    });
}

var e = getApp();

Page({
    data: {
        beusedPay: !1,
        orderId: "",
        orderMoney: "0.00",
        popin: !1,
        clickNum: 0
    },
    gopay: function(a) {
        var o = wx.getStorageSync("openId"), n = this;
        0 == n.data.clickNum && (n.setData({
            clickNum: 1
        }), wx.request({
            url: e.globalData.apiurl + "pay/order/gopay",
            data: {
                OrderId: this.data.orderId,
                OpenId: o
            },
            method: "POST",
            success: function(a) {
                if (wx.hideToast(), 1200 == a.data.code) {
                    var e = a.data.content;
                    wx.requestPayment({
                        timeStamp: e.timeStamp,
                        nonceStr: e.nonceStr,
                        package: e.package,
                        signType: e.signType,
                        paySign: e.paySign,
                        success: function(a) {
                            t(n), console.log(a);
                        },
                        fail: function(a) {
                            wx.showToast({
                                title: "支付出现错误！",
                                duration: 2e3
                            });
                        },
                        complete: function(a) {
                            n.setData({
                                clickNum: 0
                            });
                        }
                    });
                } else n.setData({
                    clickNum: 0
                }), wx.showModal({
                    content: a.data.msg,
                    showCancel: !1,
                    confirmText: "确定"
                });
            },
            fail: function(a) {
                n.setData({
                    clickNum: 0
                });
            }
        }));
    },
    onLoad: function(t) {
        this.setData({
            orderId: t.OrderID,
            clickNum: 0
        }), a(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});