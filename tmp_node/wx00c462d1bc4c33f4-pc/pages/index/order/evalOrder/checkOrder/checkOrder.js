var e, t = require("../../../../../utils/util.js"), o = getApp().globalData.httpUrl;

Page({
    data: {
        orderStyle: "",
        selectedCoupon: "",
        coupon: "",
        wmFlg: !0,
        dcFlg: !0,
        ydFlg: !0,
        httpUrl: o,
        storeInfo: []
    },
    onLoad: function(a) {
        e = this, t.getShareInfos(e, o), t.setCompanyId(e, a), t.setStoreId(e), t.setStoreInfo(e), 
        wx.getStorage({
            key: "wmFlg",
            success: function(t) {
                wx.getStorage({
                    key: "dcFlg",
                    success: function(o) {
                        wx.getStorage({
                            key: "ydFlg",
                            success: function(a) {
                                e.setData({
                                    wmFlg: t.data,
                                    dcFlg: o.data,
                                    ydFlg: a.data
                                });
                            }
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "ydFlg",
            success: function(t) {
                wx.getStorage({
                    key: "dcFlg",
                    success: function(a) {
                        wx.getStorage({
                            key: "wmFlg",
                            success: function(r) {
                                1 == t.data ? (console.log("走预定"), wx.getStorage({
                                    key: "orderId",
                                    success: function(t) {
                                        wx.getStorage({
                                            key: "orderType",
                                            success: function(a) {
                                                wx.request({
                                                    url: o + "skordermodel/getOrderById",
                                                    method: "POST",
                                                    header: {
                                                        "content-type": "application/x-www-form-urlencoded"
                                                    },
                                                    data: {
                                                        id: t.data,
                                                        orderType: a.data
                                                    },
                                                    success: function(t) {
                                                        var o = t.data.orderPayType, a = "";
                                                        "W" == o ? a = "微信支付" : "B" == o && (a = "余额支付");
                                                        var r = t.data.reservedEstimatedTime.split(" "), d = r[0], s = r[1];
                                                        e.setData({
                                                            orderInfo: t.data,
                                                            orderStyle: a,
                                                            orderDate: d,
                                                            orderTime: s,
                                                            orderTable: t.data.tableName,
                                                            orderPersonNumber: t.data.reservedCount,
                                                            orderContractName: t.data.reservedName,
                                                            orderContractTel: t.data.reservedPhoneNum
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                })) : 1 == a.data ? (console.log("走点餐"), wx.getStorage({
                                    key: "orderId",
                                    success: function(t) {
                                        wx.getStorage({
                                            key: "orderType",
                                            success: function(a) {
                                                wx.request({
                                                    url: o + "skordermodel/getOrderById",
                                                    method: "POST",
                                                    header: {
                                                        "content-type": "application/x-www-form-urlencoded"
                                                    },
                                                    data: {
                                                        id: t.data,
                                                        orderType: a.data
                                                    },
                                                    success: function(t) {
                                                        var o = t.data.orderPayType, r = "";
                                                        "W" == o ? r = "微信支付" : "B" == o && (r = "余额支付");
                                                        var d = t.data.vipCoupontype, s = t.data.vipDerateMoney, n = t.data.orderRealPrice, c = "", i = a.data.storeInfoDeliveryPrice, u = a.data.storeInfoBoxPrice;
                                                        c = "4" == d ? s : ((1 * n - 1 * i - 1 * u) * s / 10 * (10 - s) / 10).toFixed(2), 
                                                        e.setData({
                                                            orderInfo: t.data,
                                                            orderStyle: r,
                                                            deskNum: t.data.orderTableId,
                                                            derateMoney: c
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                })) : 1 == r.data && (console.log("走外卖"), wx.getStorage({
                                    key: "orderId",
                                    success: function(t) {
                                        wx.getStorage({
                                            key: "orderType",
                                            success: function(a) {
                                                wx.request({
                                                    url: o + "skordermodel/getOrderById",
                                                    method: "POST",
                                                    header: {
                                                        "content-type": "application/x-www-form-urlencoded"
                                                    },
                                                    data: {
                                                        id: t.data,
                                                        orderType: a.data
                                                    },
                                                    success: function(t) {
                                                        wx.getStorage({
                                                            key: "storeInfo",
                                                            success: function(o) {
                                                                var a = t.data.orderPayType, r = "";
                                                                "W" == a ? r = "微信支付" : "B" == a && (r = "余额支付");
                                                                var d = t.data.vipCoupontype, s = t.data.vipDerateMoney, n = t.data.orderRealPrice, c = "", i = o.data.storeInfoDeliveryPrice, u = o.data.storeInfoBoxPrice;
                                                                c = "4" == d ? s : ((1 * n - 1 * i - 1 * u) * s / 10 * (10 - s) / 10).toFixed(2), 
                                                                e.setData({
                                                                    orderInfo: t.data,
                                                                    orderStyle: r,
                                                                    beizhu: t.data.orderRemarke,
                                                                    wechatUserAddressAddress: t.data.wechatUserAddressAddress,
                                                                    wechatUserAddressFullAddress: t.data.wechatUserAddressFullAddress,
                                                                    wechatUserAddressReceiverName: t.data.wechatUserAddressReceiverName,
                                                                    wechatUserAddressReceiverPhoneNum: t.data.wechatUserAddressReceiverPhoneNum,
                                                                    derateMoney: c
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }));
                            }
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.onSocketMessage(function(o) {
            console.log("===========接收到服务器信息=============="), console.log(o.data), t.getTkInfos(e, o);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    t.conSocket(e.data);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        t.closeSock();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), e = this, setTimeout(function() {
            e.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: e.data.shareTitle,
            desc: "",
            imageUrl: e.data.shareImgUrl,
            path: "/pages/index/index?storeId=" + e.data.storeId + "&companyId=" + e.data.companyId,
            success: function(e) {
                console.log("转发成功");
            },
            fail: function(e) {
                console.log("转发失败");
            }
        };
    },
    toPingjia: function() {
        wx.redirectTo({
            url: "../evaluation/evaluation"
        });
    }
});