Page({
    data: {
        ID: "",
        CreateTime: "",
        Seller: "",
        OrderNo: "",
        Quantity: "",
        OrderDetails: {},
        StatusStr: 0,
        PayMoney: 0
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        });
        var e = this, n = getApp().globalData, o = t.OrderID, a = n.apiurl + "order/info/get";
        wx.request({
            url: a,
            data: {
                OrderId: o
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var n = t.data.content;
                e.setData({
                    OrderNo: n.OrderNo,
                    Quantity: n.Quantity,
                    PayMoney: n.PayMoney,
                    Seller: n.Seller,
                    StatusStr: n.StatusStr,
                    OrderDetails: n.OrderDetails,
                    ID: n.ID,
                    CreateTime: n.CreateTime
                }), wx.hideLoading();
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "获取订单详情失败",
                    duration: 2e3
                });
            },
            complete: function() {}
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