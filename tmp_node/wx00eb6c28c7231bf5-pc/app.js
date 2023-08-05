App({
    onLaunch: function() {},
    getUserInfo: function(e) {
        var t = this;
        t.globalData.userInfo ? ("function" == typeof e && e(t.globalData.userInfo), wx.hideNavigationBarLoading()) : (wx.showNavigationBarLoading(), 
        t.getOpenId(function(o) {
            wx.request({
                url: t.getUrl("LoginByOpenId"),
                data: {
                    openId: o
                },
                success: function(o) {
                    "OK" == o.data.Status ? (t.globalData.userInfo = o.data.Data, "function" == typeof e && e(t.globalData.userInfo)) : wx.navigateTo({
                        url: "../login/login"
                    });
                },
                complete: function() {
                    wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
                }
            });
        }));
    },
    getOpenId: function(e) {
        var t = this;
        "" != t.globalData.openId && void 0 != t.globalData.openId ? "function" == typeof e && e(t.globalData.openId) : wx.login({
            success: function(o) {
                o.code ? wx.request({
                    url: t.getUrl("GetOpenId"),
                    data: {
                        appid: t.globalData.appId,
                        secret: t.globalData.secret,
                        js_code: o.code
                    },
                    success: function(o) {
                        void 0 != o.data && void 0 != o.data.openid && (t.globalData.openId = o.data.openid, 
                        "function" == typeof e && e(t.globalData.openId));
                    }
                }) : console.log("获取用户登录态失败！" + o.errMsg);
            }
        });
    },
    getWxUserInfo: function(e) {
        var t = this;
        t.globalData.wxUserInfo ? "function" == typeof e && e(t.globalData.wxUserInfo) : wx.login({
            success: function(o) {
                if (o.code) {
                    var a = o.code;
                    wx.getUserInfo({
                        success: function(o) {
                            wx.request({
                                url: t.getUrl("GetOpenId"),
                                data: {
                                    appid: t.globalData.appId,
                                    secret: t.globalData.secret,
                                    js_code: a
                                },
                                success: function(a) {
                                    if (void 0 != a.data && void 0 != a.data.openid) {
                                        var n = {
                                            openId: a.data.openid,
                                            nikeName: o.userInfo.nickName,
                                            unionId: "",
                                            headImage: o.userInfo.avatarUrl,
                                            encryptedData: o.encryptedData,
                                            session_key: a.data.session_key,
                                            iv: o.iv
                                        };
                                        t.globalData.wxUserInfo = n, "function" == typeof e && e(t.globalData.wxUserInfo);
                                    }
                                }
                            });
                        }
                    });
                } else console.log("获取用户登录态失败！" + o.errMsg);
            }
        });
    },
    setUserInfo: function(e) {
        this.globalData.userInfo = e;
    },
    orderPay: function(e, t, o) {
        var a = this;
        a.getOpenId(function(n) {
            wx.request({
                url: a.getUrl("GetPayParam"),
                data: {
                    openId: n,
                    orderId: e
                },
                success: function(e) {
                    if ("OK" == e.data.Status) {
                        var a = e.data.Data;
                        wx.requestPayment({
                            timeStamp: a.timeStamp,
                            nonceStr: a.nonceStr,
                            package: "prepay_id=" + a.prepayId,
                            signType: "MD5",
                            paySign: a.sign,
                            success: function(e) {
                                wx.showModal({
                                    title: "提示",
                                    content: "支付成功！",
                                    showCancel: !1,
                                    success: function(e) {
                                        e.confirm && wx.redirectTo({
                                            url: "../orderlist/orderlist?status=" + t
                                        });
                                    }
                                });
                            },
                            fail: function(e) {
                                wx.showModal({
                                    title: "提示",
                                    content: "支付失败！",
                                    showCancel: !1,
                                    success: function(e) {
                                        o || e.confirm && wx.redirectTo({
                                            url: "../orderlist/orderlist?status=" + t
                                        });
                                    }
                                });
                            }
                        });
                    } else wx.showModal({
                        title: "提示",
                        content: e.data.Message,
                        showCancel: !1,
                        success: function(e) {
                            o || e.confirm && wx.redirectTo({
                                url: "../orderlist/orderlist?status=" + t
                            });
                        }
                    });
                }
            });
        });
    },
    getRequestUrl: "https://shop.f10086.net",
    getUrl: function(e) {
        return "https://shop.f10086.net/API/WeChatApplet.ashx?action=" + e;
    },
    globalData: {
        appId: "wx00eb6c28c7231bf5",
        secret: "048bd17cb4f0e4ab76ea95df89245794",
        userInfo: null,
        openId: "",
        wxUserInfo: null,
        loginByOpenId: "LoginByOpenId",
        loginByUserName: "LoginByUserName",
        quickLogin: "QuickLogin",
        getIndexData: "GetIndexData",
        GetIndexProductData: "GetIndexProductData",
        getProducts: "GetProducts",
        getProductDetail: "GetProductDetail",
        getCountDownProductDetail: "GetCountDownProductDetail",
        userGetCoupon: "UserGetCoupon",
        loadCoupon: "LoadCoupon",
        getUserShippingAddress: "GetUserShippingAddress",
        addShippingAddress: "AddShippingAddress",
        updateShippingAddress: "UpdateShippingAddress",
        setDefaultShippingAddress: "SetDefaultShippingAddress",
        delShippingAddress: "DelShippingAddress",
        orderList: "OrderList",
        closeOrder: "CloseOrder",
        finishOrder: "FinishOrder",
        getLogistic: "GetLogistic",
        getPayParam: "GetPayParam",
        getShoppingCart: "GetShoppingCart",
        sumbitOrder: "SumbitOrder",
        getRegionsOfProvinceCity: "GetRegionsOfProvinceCity",
        getRegions: "GetRegions",
        getAllCategories: "GetAllCategories",
        loadOrderProduct: "GetOrderProduct",
        loadReview: "LoadReview"
    }
});