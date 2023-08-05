function o(o) {
    wx.request({
        url: n.globalData.apiurl + "order/info/get",
        data: {
            orderId: o.data.orderId
        },
        method: "GET",
        success: function(n) {
            1200 == n.data.code ? o.setData({
                payMoney: n.data.content.pay_money
            }) : console.log("加载失败");
        }
    });
}

var n = getApp();

Page({
    data: {
        orderId: "",
        payMoney: "0.00"
    },
    onLoad: function(n) {
        this.setData({
            orderId: n.OrderID
        }), o(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});