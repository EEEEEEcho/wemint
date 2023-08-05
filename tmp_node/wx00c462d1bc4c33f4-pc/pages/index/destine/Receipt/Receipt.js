var e, t = require("../../../../utils/util.js"), o = getApp().globalData.httpUrl;

Page({
    data: {
        seconds: "",
        minute: "",
        hour: "",
        second: "",
        date: "",
        time: "",
        tableType: "",
        mealsNumber: "",
        contants: "",
        contantsTel: "",
        textDesc: "",
        jiedanStatu: "",
        reason: ""
    },
    onLoad: function(a) {
        e = this, t.getShareInfos(e, o), t.setStoreInfo(e), t.setCompanyId(e, a), e.setData({
            sign: !0
        });
        var r = a.orderState;
        "2" == r ? (e.setData({
            jiedanStatu: "商家已接单",
            orderState: "2"
        }), console.log("预订单id======>" + a.orderId), wx.setStorage({
            key: "orderId",
            data: a.orderId
        }), e.reservedEstimated()) : "6" == r && wx.getStorage({
            key: "orderId",
            success: function(t) {
                wx.request({
                    url: o + "skordermodel/getOrderById",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        id: t.data,
                        orderType: "Y"
                    },
                    success: function(t) {
                        var o = t.data.orderRefuseRemark;
                        null != o && void 0 != o && "" != o || (o = "无理由"), e.setData({
                            jiedanStatu: "您的订单已被商家拒绝",
                            orderState: "6",
                            reason: o
                        });
                    }
                });
            }
        }), wx.getStorage({
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
                                            success: function(n) {
                                                wx.getStorage({
                                                    key: "orderContractTel",
                                                    success: function(s) {
                                                        wx.getStorage({
                                                            key: "orderDesc",
                                                            success: function(d) {
                                                                e.setData({
                                                                    date: t.data,
                                                                    time: o.data,
                                                                    tableType: a.data,
                                                                    mealsNumber: r.data,
                                                                    contants: n.data,
                                                                    contantsTel: s.data,
                                                                    textDesc: d.data
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
        });
    },
    countDown: function() {
        var e = this;
        if (e.data.sign) {
            var t = e.data.seconds, a = e.data.hour, r = e.data.minute, n = e.data.second;
            if (t > 0) var s = setTimeout(function() {
                n = (t -= 1) - 60 * Math.floor(t / 60), r = Math.floor((t - 3600 * Math.floor(t / 3600)) / 60), 
                a = Math.floor(t / 3600), e.setData({
                    seconds: t,
                    hour: a,
                    minute: r,
                    second: n
                });
                e.countDown();
            }, 1e3); else e.setData({
                hour: 0,
                minute: 0,
                second: 0
            }), clearTimeout(s), t = 0, wx.getStorage({
                key: "orderId",
                success: function(e) {
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
                            wx.showModal({
                                title: "提示",
                                content: "订单已自动取消",
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
    reservedEstimated: function() {
        wx.getStorage({
            key: "orderId",
            success: function(t) {
                console.log(t.data), wx.request({
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
                        console.log("预计到店时间 ==> " + t.data.reservedEstimatedTime);
                        var a = new Date(t.data.reservedEstimatedTime.replace(/-/g, "/")).getTime() / 1e3;
                        console.log("预计到店时间转换=====》" + a);
                        var r = new Date().getTime() / 1e3;
                        console.log("获取当前时间=====》" + r.toFixed(0));
                        var n = (1 * a.toFixed(0) - 1 * r.toFixed(0) + 3600).toFixed(0);
                        if (console.log("获取当前时间=====》" + n), n > 0) {
                            var s = n, d = s - 60 * Math.floor(s / 60), c = Math.floor(s - 3600 * Math.floor(s / 3600)) / 60, u = Math.floor(s / 3600);
                            e.setData({
                                seconds: s,
                                minute: c,
                                second: d,
                                hour: u
                            });
                            e.countDown();
                        } else e.setData({
                            hour: 0,
                            minute: 0,
                            second: 0
                        }), wx.getStorage({
                            key: "orderId",
                            success: function(e) {
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
                                        wx.showModal({
                                            title: "提示",
                                            content: "订单已自动取消",
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
                });
            }
        });
    },
    back: function() {
        wx.getStorage({
            key: "orderId",
            success: function(e) {
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
                        wx.redirectTo({
                            url: "../../destine/destine"
                        });
                    }
                });
            }
        });
    },
    directOrder: function(e) {
        wx.setStorage({
            key: "wmFlg",
            data: !1
        }), wx.setStorage({
            key: "dcFlg",
            data: !1
        }), wx.setStorage({
            key: "orderType",
            data: "Y"
        }), wx.getStorage({
            key: "orderId",
            success: function(e) {
                wx.redirectTo({
                    url: "../../takeOut/takeOut?orderId=" + e.data
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
        });
    },
    onHide: function() {},
    onUnload: function() {
        console.log("预定接单页面关闭"), (e = this).setData({
            sign: !1
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), e = this, !_This.data.oUInfo.unionId && getApp().getUserData(function(t) {
            e.fGetCUserInfo(t.unionId), e.setData({
                oUInfo: t
            });
        }), setTimeout(function() {
            e.pullRefresh();
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
    }
});