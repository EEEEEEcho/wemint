var e, t = require("../../../../utils/util.js"), o = getApp().globalData.httpUrl;

Page({
    data: {
        orders: [],
        seconds: "",
        minute: "",
        second: "",
        date: "",
        time: "",
        tableType: "",
        mealsNumber: "",
        contants: "",
        contantsTel: "",
        textDesc: "",
        phone: "111",
        address: "111",
        receipted: "1",
        waitReceitName: "等待商家接单"
    },
    onLoad: function(a) {
        if (e = this, t.getShareInfos(e, o), t.setCompanyId(e, a), t.setStoreInfo(e), e.setData({
            sign: !0
        }), a.orderId) {
            var r = a.orderId;
            a.orderType;
            wx.request({
                url: o + "skordermodel/getOrderById",
                data: {
                    orderType: "Y",
                    id: r
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    wx.setStorage({
                        key: "orderId",
                        data: t.data.id
                    });
                    var o = t.data.reservedEstimatedTime.split(" "), a = o[0], r = o[1];
                    e.setData({
                        date: a,
                        time: r,
                        tableType: t.data.tableName,
                        mealsNumber: t.data.reservedCount,
                        contants: t.data.reservedName,
                        contantsTel: t.data.reservedPhoneNum,
                        textDesc: t.data.orderRemarke,
                        orderCreateTimes: t.data.orderCreateTimes,
                        receipted: t.data.orderState
                    });
                }
            });
        }
        wx.getStorage({
            key: "storeId",
            success: function(t) {
                e.setData({
                    storeId: t.data
                }), wx.request({
                    url: o + "skstoremodel/findStoreById",
                    data: {
                        storeId: t.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        e.setData({
                            phone: t.data.storeInfoTelephoneNum,
                            address: t.data.storeInfoAddress
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
                                    success: function(r) {
                                        wx.getStorage({
                                            key: "orderContractName",
                                            success: function(d) {
                                                wx.getStorage({
                                                    key: "orderContractTel",
                                                    success: function(s) {
                                                        wx.getStorage({
                                                            key: "orderDesc",
                                                            success: function(n) {
                                                                e.setData({
                                                                    date: t.data,
                                                                    time: o.data,
                                                                    tableType: a.data,
                                                                    mealsNumber: r.data,
                                                                    contants: d.data,
                                                                    contantsTel: s.data,
                                                                    textDesc: n.data
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
                });
            }
        }), e.checkOrderStatus(), "2" != e.data.receipted ? wx.getStorage({
            key: "orderId",
            success: function(t) {
                console.log("预定单id====》" + t.data), wx.request({
                    url: o + "skordermodel/getOrderById",
                    data: {
                        orderType: "Y",
                        id: t.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        console.log(t.data.orderCreateTimes);
                        var a = new Date(t.data.orderCreateTimes.replace(/-/g, "/")).getTime() / 1e3, r = 600 - (new Date().getTime() / 1e3 - a).toFixed(0);
                        if (r > 0) {
                            var d = r, s = d - 60 * Math.floor(d / 60), n = Math.floor(d / 60);
                            e.setData({
                                seconds: d,
                                minute: n,
                                second: s
                            });
                            e.countDown();
                        } else e.setData({
                            minute: 0,
                            second: 0,
                            waitReceitName: "订单已取消"
                        }), wx.getStorage({
                            key: "orderId",
                            success: function(e) {
                                wx.showModal({
                                    title: "提示",
                                    content: "因规定时间内商户没有确认接单，该预定信息自动取消！",
                                    success: function(t) {
                                        wx.request({
                                            url: o + "skordermodel/updReservedOrder",
                                            data: {
                                                orderState: "5",
                                                id: e.data
                                            },
                                            method: "POST",
                                            header: {
                                                "content-type": "application/x-www-form-urlencoded"
                                            },
                                            success: function(e) {
                                                wx.navigateBack({
                                                    delta: 2
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
        }) : wx.redirectTo({
            url: "../Receipt/Receipt"
        });
    },
    countDown: function() {
        var e = this;
        if (e.data.sign) {
            var t = e.data.seconds, a = e.data.minute, r = e.data.second;
            if (t > 0) var d = setTimeout(function() {
                r = (t -= 1) - 60 * Math.floor(t / 60), a = Math.floor(t / 60), e.setData({
                    seconds: t,
                    minute: a,
                    second: r
                });
                e.countDown();
            }, 1e3); else console.log("========订单已取消============="), clearTimeout(d), t = 0, 
            e.setData({
                seconds: t,
                minute: 0,
                second: 0,
                waitReceitName: "订单已取消"
            }), wx.getStorage({
                key: "orderId",
                success: function(e) {
                    wx.showModal({
                        title: "提示",
                        content: "因规定时间内商户没有确认接单，该预定信息自动取消！",
                        success: function(t) {
                            wx.request({
                                url: o + "skordermodel/updReservedOrder",
                                data: {
                                    orderState: "5",
                                    id: e.data
                                },
                                method: "POST",
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                success: function() {
                                    wx.switchTab({
                                        url: "../../index"
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    back: function() {
        wx.getStorage({
            key: "orderId",
            success: function(t) {
                wx.request({
                    url: o + "skordermodel/updReservedOrder",
                    data: {
                        id: t.data,
                        orderState: "5",
                        storeId: e.data.storeId
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        wx.navigateBack();
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
        e = this, console.log("关闭当前页面"), wx.onSocketMessage(function(o) {
            console.log("收到服务器内容："), console.log(o), wx.getStorage({
                key: "orderId",
                success: function(e) {
                    console.log("订单id=======>" + e.data), "receipt" == o.data && wx.redirectTo({
                        url: "../Receipt/Receipt?orderState=2&orderId=" + e.data
                    }), "reject" == o.data && wx.redirectTo({
                        url: "../Receipt/Receipt?orderState=6&orderId=" + e.data
                    });
                }
            }), t.getTkInfos(e, o);
        }), wx.onSocketClose(function(o) {
            wx.getStorage({
                key: "userId",
                success: function(e) {
                    t.conSocket(e.data), wx.onSocketOpen(function(e) {
                        console.log("WebSocket连接已打开！"), console.log(e);
                    }), wx.onSocketError(function(e) {
                        console.log("WebSocket连接打开失败，请检查！"), console.log(e);
                    });
                }
            }), e.onShow();
        });
    },
    onHide: function() {},
    onUnload: function() {
        console.log("页面关闭"), (e = this).setData({
            sign: !1
        });
    },
    onPullDownRefresh: function() {
        e.checkOrderStatus(), wx.getStorage({
            key: "orderId",
            success: function(t) {
                console.log("订单id=======>" + t.data), "2" == e.data.receipted ? wx.redirectTo({
                    url: "../Receipt/Receipt?orderState=2&orderId=" + t.data
                }) : "6" == e.data.receipted && wx.redirectTo({
                    url: "../Receipt/Receipt?orderState=6&orderId=" + t.data
                });
            }
        });
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
    checkOrderStatus: function() {
        e = this, wx.getStorage({
            key: "orderId",
            success: function(t) {
                wx.request({
                    url: o + "skordermodel/getOrderById",
                    data: {
                        orderType: "Y",
                        id: t.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        wx.setStorage({
                            key: "orderId",
                            data: t.data.id
                        }), e.setData({
                            receipted: t.data.orderState
                        });
                    }
                });
            }
        });
    }
});