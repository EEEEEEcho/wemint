var t = getApp();

Page({
    data: {
        orderId: 0,
        orderData: {},
        proData: []
    },
    onLoad: function(t) {
        this.setData({
            orderId: t.orderId
        }), this.loadProductDetail();
    },
    loadProductDetail: function() {
        var a = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Order/order_details",
            method: "post",
            data: {
                order_id: a.data.orderId
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (1 == t.data.status) {
                    var r = t.data.pro, d = t.data.ord;
                    a.setData({
                        orderData: d,
                        proData: r
                    });
                } else wx.showToast({
                    title: t.data.err,
                    duration: 2e3
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    }
});