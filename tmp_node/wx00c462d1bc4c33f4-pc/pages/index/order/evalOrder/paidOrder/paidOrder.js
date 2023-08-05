var e, t = require("../../../../../utils/util.js"), o = getApp().globalData.httpUrl;

Page({
    data: {
        orderStyle: "微信支付",
        selectedCoupon: "",
        coupon: "选择优惠券",
        wmFlg: !0,
        dcFlg: !0,
        ydFlg: !0,
        httpUrl: o,
        storeInfo: []
    },
    choseTxtColor: function(e) {
        var t = e.currentTarget.dataset.id;
        this.setData({
            id: t
        });
    },
    selCoupon: function() {
        wx.navigateTo({
            url: "../selCoupon/selCoupon"
        });
    },
    onLoad: function(a) {
        e = this, t.getShareInfos(e, o), t.setCompanyId(e, a), t.setStoreId(e), t.setStoreInfo(e), 
        wx.getStorage({
            key: "couponInfo",
            success: function(t) {
                var o = t.data.couponType, a = t.data.couponName;
                if ("4" == o) e.setData({
                    couponName: a,
                    derateMoney: t.data.derateMoney,
                    couponType: o
                }); else if ("2" == o) {
                    var n = t.data.derateMoney;
                    wx.getStorage({
                        key: "foodInfo",
                        success: function(t) {
                            var s = t.data.orderRealPrice;
                            n = (s - n * s / 10).toFixed(2), e.setData({
                                couponName: a,
                                derateMoney: n,
                                couponType: o
                            });
                        }
                    });
                }
            }
        }), wx.getStorage({
            key: "derateMoney",
            success: function(t) {
                e.setData({
                    derateMoney: t.data
                });
            }
        }), wx.getStorage({
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
                                console.log(t.data), e.setData({
                                    orderInfo: t.data
                                });
                                t.data;
                                var o = t.data.orderPayType;
                                "B" == o ? e.setData({
                                    orderStyle: "余额支付"
                                }) : "W" == o && e.setData({
                                    orderStyle: "微信支付"
                                });
                            }
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "orderDate",
            success: function(t) {
                wx.getStorage({
                    key: "orderTime",
                    success: function(o) {
                        wx.getStorage({
                            key: "orderTable",
                            success: function(a) {
                                wx.getStorage({
                                    key: "orderPersonNumber",
                                    success: function(n) {
                                        wx.getStorage({
                                            key: "orderContractName",
                                            success: function(s) {
                                                wx.getStorage({
                                                    key: "orderContractTel",
                                                    success: function(c) {
                                                        e.setData({
                                                            orderDate: t.data,
                                                            orderTime: o.data,
                                                            orderTable: a.data,
                                                            orderPersonNumber: n.data,
                                                            orderContractName: s.data,
                                                            orderContractTel: c.data
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "deskNum",
            success: function(t) {
                e.setData({
                    deskNum: t.data
                });
            }
        }), wx.getStorage({
            key: "beizhu",
            success: function(t) {
                e.setData({
                    beizhu: t.data
                });
            }
        }), wx.getStorage({
            key: "receiverNotes",
            success: function(t) {
                e.setData({
                    receiverNotes: t.data
                });
            }
        }), wx.getStorage({
            key: "foodInfo",
            success: function(t) {
                e.setData({
                    foodInfo: t.data
                });
            }
        }), wx.getStorage({
            key: "wmFlg",
            success: function(t) {
                console.log("外卖订单不评价" + t.data), wx.getStorage({
                    key: "dcFlg",
                    success: function(o) {
                        console.log("外卖订单不评价" + o.data), wx.getStorage({
                            key: "ydFlg",
                            success: function(a) {
                                console.log("外卖订单不评价" + a.data), e.setData({
                                    wmFlg: t.data,
                                    dcFlg: o.data,
                                    ydFlg: a.data
                                });
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