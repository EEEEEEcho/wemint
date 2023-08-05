getApp();

Page({
    data: {
        openid: "",
        order_no: "",
        type: ""
    },
    onLoad: function(e) {
        var t = this;
        t.setData({
            order_no: e.order_no,
            type: e.type
        }), wx.login({
            success: function(e) {
                console.log(e), wx.request({
                    url: getApp().globalData.url + "index.php/Welcome/GetSessionKey",
                    method: "POST",
                    data: {
                        code: e.code
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        console.log(e), t.setData({
                            openid: e.data.openid,
                            session_key: e.data.session_key
                        }), wx.request({
                            url: getApp().globalData.url + "index.php/Welcome/SPPay",
                            method: "POST",
                            data: {
                                openid: t.data.openid,
                                order_no: t.data.order_no,
                                type: t.data.type
                            },
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(e) {
                                wx.requestPayment({
                                    timeStamp: e.data.timeStamp,
                                    nonceStr: e.data.nonceStr,
                                    package: e.data.package,
                                    signType: e.data.signType,
                                    paySign: e.data.paySign,
                                    success: function(e) {
                                        1 == e.type ? wx.redirectTo({
                                            url: "https://test.izhixiu.cn/zxshop_xiaojie/front/zhima_wed/zhimakoudai/service_order_list.html"
                                        }) : 2 == e.type ? wx.redirectTo({
                                            url: "https://test.izhixiu.cn/zxshop_xiaojie/front/zhima_wed/zhimakoudai/commodity_order_list.html"
                                        }) : 3 == e.type ? wx.redirectTo({
                                            url: "https://test.izhixiu.cn/zxshop_xiaojie/front/zhima_wed/zhimakoudai/personalcenter.html"
                                        }) : 4 == e.type ? wx.redirectTo({
                                            url: "https://test.izhixiu.cn/zxshop_xiaojie/front/zhima_wed/zhimakoudai/application.html"
                                        }) : 5 == e.type && wx.redirectTo({
                                            url: "https://test.izhixiu.cn/zxshop_xiaojie/front/zhima_wed/zhimakoudai/commodity_order_list.html"
                                        }), wx.showToast({
                                            title: "支付成功",
                                            icon: "success",
                                            duration: 2e3
                                        });
                                    },
                                    fail: function(e) {},
                                    complete: function() {}
                                });
                            }
                        });
                    }
                });
            },
            error: function(e) {
                console.log(11111);
            }
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