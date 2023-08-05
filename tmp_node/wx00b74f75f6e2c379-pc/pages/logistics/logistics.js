var app = getApp();

Page({
    data: {
        ExpressCompanyName: "",
        ShipOrderNumber: "",
        ShipTo: "",
        CellPhone: "",
        Address: "",
        LogisticsData: null
    },
    onLoad: function onLoad(options) {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this;
        var orderid = options.orderid;
        app.getOpenId(function(openid) {
            wx.request({
                url: app.getUrl("Order/GetExpressInfo"),
                data: {
                    openId: openid,
                    orderId: orderid
                },
                success: function success(result) {
                    if (result.data.Status == "OK") {
                        var r = result.data.Data;
                        var newList = r.LogisticsData;
                        that.setData({
                            ExpressCompanyName: r.ExpressCompanyName,
                            ShipOrderNumber: r.ShipOrderNumber,
                            ShipTo: r.ShipTo,
                            CellPhone: r.CellPhone,
                            Address: r.Address,
                            LogisticsData: newList.traces
                        });
                    } else if (result.data.Message == "NOUser") {
                        wx.navigateTo({
                            url: "../login/login"
                        });
                    } else {
                        wx.showModal({
                            title: "提示",
                            content: result.data.Message,
                            showCancel: false,
                            success: function success(res) {
                                if (res.confirm) {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                }
                            }
                        });
                    }
                }
            });
        });
    },
    onReady: function onReady() {
        // 页面渲染完成
    },
    onShow: function onShow() {
        // 页面显示
    },
    onHide: function onHide() {
        // 页面隐藏
    },
    onUnload: function onUnload() {
        // 页面关闭
    }
});