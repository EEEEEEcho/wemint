require("../../../utils/wx_x_config.js");

var e, r = require("../../../utils/util.js"), t = getApp().globalData.httpUrl;

Page({
    data: {
        refundresult: "",
        disp1: !1,
        disp2: !1,
        disp3: !1,
        heightFlg: "",
        overflowFlg: "auto",
        bohuiReason: "无理由",
        clicked: 0,
        noMore: !1,
        clicked1: 0,
        noMore1: !1,
        clicked2: 0,
        noMore2: !1,
        currentTab: 0,
        httpUrl: t
    },
    onLoad: function(a) {
        (e = this).setData({
            refundresult: ""
        }), r.getShareInfos(e, t), r.setUserId(e), r.setCompanyId(e, a), r.setStoreInfo(e), 
        wx.setStorage({
            key: "couponInfo",
            data: ""
        }), wx.setStorage({
            key: "couponFlg",
            data: "0"
        }), wx.setStorage({
            key: "couponId",
            data: ""
        }), wx.getStorage({
            key: "storeId",
            success: function(r) {
                e.setData({
                    storeId: r.data
                }), wx.getStorage({
                    key: "userId",
                    success: function(t) {
                        console.log("userId:" + t.data), console.log("storeId:" + r.data), e.getReservedOrderList(t.data, r.data), 
                        e.getOrderList(t.data, r.data), e.getTakeOutList(t.data, r.data);
                    },
                    fail: function(e) {
                        console.log("========userId fail=======");
                    }
                });
            },
            fail: function(e) {
                console.log("========storeId fail=======");
            }
        });
    },
    goToDetaY: function(r) {
        wx.setStorage({
            key: "couponInfo",
            data: ""
        });
        var t = r.currentTarget.dataset.orderId, a = r.currentTarget.dataset.orderState;
        wx.setStorage({
            key: "orderId",
            data: t
        }), wx.setStorage({
            key: "orderType",
            data: "Y"
        }), wx.setStorage({
            key: "wmFlg",
            data: !1
        }), wx.setStorage({
            key: "dcFlg",
            data: !1
        }), wx.setStorage({
            key: "ydFlg",
            data: !0
        }), "1" == a ? (console.log("已提交"), wx.navigateTo({
            url: "../destine/waitReceipt/waitReceipt?orderId=" + t + "&orderType=Y&orderState=1"
        })) : "2" == a ? (console.log("已接单"), e.editOrder(r)) : "4" == a ? wx.navigateTo({
            url: "evalOrder/evalOrder?orderId=" + t + "&orderType=Y&orderState=4"
        }) : "5" == a ? wx.showModal({
            title: "提示",
            content: "订单已取消"
        }) : "6" == a ? wx.navigateTo({
            url: "../destine/Receipt/Receipt?orderId=" + t + "&orderType=Y&orderState=6"
        }) : "9" == a ? e.checkOrder(r) : "10" == a || "11" == a ? wx.navigateTo({
            url: "evalOrder/evaluatedOrder/evaluatedOrder?orderId=" + t + "&orderType=Y&orderState=" + a
        }) : "11" == a ? e.getPayBackInfo(r) : "12" == a ? e.resumePayBack(r) : "13" == a ? e.bohuiReason(r) : "14" == a ? e.payBack(r) : wx.navigateTo({
            url: "evalOrder/evalOrder?orderId=" + t + "&orderType=Y"
        });
    },
    goToDetaD: function(r) {
        wx.setStorage({
            key: "couponInfo",
            data: ""
        }), wx.setStorage({
            key: "dcFlg",
            data: !0
        }), wx.setStorage({
            key: "ydFlg",
            data: !1
        }), wx.setStorage({
            key: "wmFlg",
            data: !1
        }), wx.setStorage({
            key: "orderType",
            data: "D"
        });
        var t = r.currentTarget.dataset.dcBeizhu;
        wx.setStorage({
            key: "dcBeizhu",
            data: t
        });
        var a = r.currentTarget.dataset.id, o = r.currentTarget.dataset.orderState;
        "9" == o ? e.checkOrder(r) : "6" == o ? wx.navigateTo({
            url: "evalOrder/bohuiOrder/bohuiOrder?orderId=" + a + "&orderType=D&orderState=6"
        }) : "11" == o ? e.getPayBackInfo(r) : "12" == o ? e.resumePayBack(r) : "13" == o ? e.bohuiReason(r) : "14" == o ? e.payBack(r) : wx.navigateTo({
            url: "evalOrder/evalOrder?orderId=" + a + "&orderType=D"
        });
    },
    goToDetaW: function(r) {
        var t = r.currentTarget.dataset.id, a = r.currentTarget.dataset.orderState;
        if (console.log("=====orderState========"), console.log(a), "9" == a) e.evalOrder(r); else {
            if ("3" == a) return void console.log("配送中");
            "6" == a ? wx.navigateTo({
                url: "evalOrder/bohuiOrder/bohuiOrder?orderId=" + t + "&orderType=W&orderState=6"
            }) : "11" == a ? e.getPayBackInfo(r) : "12" == a ? e.resumePayBack(r) : "13" == a ? e.bohuiReason(r) : "14" == a ? e.payBack(r) : (wx.setStorage({
                key: "couponInfo",
                data: ""
            }), wx.navigateTo({
                url: "evalOrder/submitOrder/submitOrder?orderId=" + t + "&orderType=W"
            }));
        }
    },
    getReservedOrderList: function(r, a) {
        console.log("预定"), wx.request({
            url: t + "skordermodel/selReservedOrderWX",
            data: {
                wechatUserId: r,
                storeId: a
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(r) {
                e.setData({
                    onClickFlag: !0,
                    orders: r.data.data
                });
                var t = r.data.data, a = [], o = [], d = !1;
                if (t.length >= 5) {
                    for (var n = 0; n < 5; n++) a[n] = t[n], 1 * a[n].orderReceivablePrice > 1 * a[n].orderRealPrice ? o[n] = 1 * a[n].orderReceivablePrice - 1 * a[n].orderRealPrice : o[n] = 0;
                    d = !1;
                } else {
                    for (var s = 0; s < t.length; s++) a[s] = t[s], 1 * a[s].orderReceivablePrice > 1 * a[s].orderRealPrice ? o[s] = 1 * a[s].orderReceivablePrice - 1 * a[s].orderRealPrice : o[s] = 0;
                    d = !0;
                }
                e.setData({
                    infos21: a,
                    noMore: d,
                    orderYHYprice21: o
                });
            }
        });
    },
    getOrderList: function(r, a) {
        wx.request({
            url: t + "skordermodel/selOrderInfoWX",
            data: {
                wechatUserId: r,
                storeId: a
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(r) {
                e.setData({
                    onClickFlag: !0,
                    orders1: r.data.data
                });
                var t = r.data.data, a = [], o = [], d = !1;
                if (t.length >= 5) {
                    for (var n = 0; n < 5; n++) a[n] = t[n], 1 * a[n].orderReceivablePrice > 1 * a[n].orderRealPrice ? o[n] = 1 * a[n].orderReceivablePrice - 1 * a[n].orderRealPrice : o[n] = 0;
                    d = !1;
                } else {
                    for (var s = 0; s < t.length; s++) a[s] = t[s], 1 * a[s].orderReceivablePrice > 1 * a[s].orderRealPrice ? o[s] = 1 * a[s].orderReceivablePrice - 1 * a[s].orderRealPrice : o[s] = 0;
                    d = !0;
                }
                e.setData({
                    infos22: a,
                    noMore1: d,
                    orderYHDprice22: o
                });
            }
        });
    },
    getTakeOutList: function(r, a) {
        console.log("外卖"), wx.request({
            url: t + "skordermodel/selTakeOutOrderWX",
            data: {
                wechatUserId: r,
                storeId: a
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(r) {
                console.log("我是外卖订单"), console.log(r.data), e.setData({
                    onClickFlag: !0,
                    orders2: r.data.data
                });
                var t = r.data.data, a = [], o = [], d = !1;
                if (t.length >= 5) {
                    for (var n = 0; n < 5; n++) a[n] = t[n], 1 * a[n].orderReceivablePrice > 1 * a[n].orderRealPrice ? o[n] = 1 * a[n].orderReceivablePrice - 1 * a[n].orderRealPrice : o[n] = 0;
                    console.log("woshi jiage chajia"), console.log(o), d = !1;
                } else {
                    for (var s = 0; s < t.length; s++) a[s] = t[s], 1 * a[s].orderReceivablePrice > 1 * a[s].orderRealPrice ? o[s] = 1 * a[s].orderReceivablePrice - 1 * a[s].orderRealPrice : o[s] = 0;
                    console.log("woshi jiage chajia22"), console.log(o), d = !0;
                }
                e.setData({
                    infos23: a,
                    noMore2: d,
                    orderYHprice23: o
                });
            }
        });
    },
    swiperTab: function(r) {
        var t = r.detail.current;
        wx.getStorage({
            key: "storeId",
            success: function(r) {
                wx.getStorage({
                    key: "userId",
                    success: function(a) {
                        "0" == t ? e.getReservedOrderList(a.data, r.data) : "1" == t ? e.getOrderList(a.data, r.data) : e.getTakeOutList(a.data, r.data);
                    },
                    fail: function(e) {
                        console.log("========userId fail=======");
                    }
                });
            },
            fail: function(e) {
                console.log("========storeId fail=======");
            }
        }), (e = this).setData({
            currentTab: r.detail.current
        }), console.log(r);
    },
    clickTab: function(r) {
        console.log(r);
        var t = r.currentTarget.dataset.orderName;
        if (wx.getStorage({
            key: "storeId",
            success: function(r) {
                wx.getStorage({
                    key: "userId",
                    success: function(a) {
                        "reserve" == t ? e.getReservedOrderList(a.data, r.data) : "order" == t ? e.getOrderList(a.data, r.data) : e.getTakeOutList(a.data, r.data);
                    },
                    fail: function(e) {
                        console.log("========userId fail=======");
                    }
                });
            },
            fail: function(e) {
                console.log("========storeId fail=======");
            }
        }), this.data.currentTab === r.target.dataset.current) return !1;
        e.setData({
            currentTab: r.target.dataset.current
        });
    },
    onReady: function() {},
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.onSocketMessage(function(t) {
            console.log("===========接收到服务器信息=============="), console.log(t.data), "skip" != t.data && "repast" != t.data && "send" != t.data || e.onLoad(), 
            r.getTkInfos(e, t);
        }), e.onLoad(), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    r.conSocket(e.data);
                }
            });
        }), console.log("===order sonShow===");
    },
    onHide: function() {},
    onUnload: function() {
        r.closeSock();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), e = this, setTimeout(function() {
            e.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {
        0 == e.data.currentTab ? e.getMore() : 1 == e.data.currentTab ? e.getMore1() : 2 == e.data.currentTab && e.getMore2();
    },
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
    checkOrder: function(r) {
        var a = r.currentTarget.dataset.id, o = r.currentTarget.dataset.currentTab;
        0 == o ? (e.setData({
            orderType: "Y",
            orderId: a
        }), wx.setStorage({
            key: "orderType",
            data: "Y"
        }), wx.setStorage({
            key: "orderId",
            data: a
        })) : 1 == o ? (e.setData({
            orderType: "D",
            orderId: a
        }), wx.setStorage({
            key: "orderType",
            data: "D"
        }), wx.setStorage({
            key: "orderId",
            data: a
        })) : (console.log(a), e.setData({
            orderType: "W",
            orderId: a
        }), wx.setStorage({
            key: "orderType",
            data: "W"
        }), wx.setStorage({
            key: "orderId",
            data: a
        }), wx.setStorage({
            key: "wmFlg",
            data: !0
        }), wx.setStorage({
            key: "dcFlg",
            data: !1
        }), wx.setStorage({
            key: "ydFlg",
            data: !1
        })), wx.request({
            url: t + "skordermodel/getOrderById",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                id: a,
                orderType: e.data.orderType
            },
            success: function(e) {
                wx.setStorage({
                    key: "foodInfo",
                    data: e.data
                }), wx.navigateTo({
                    url: "evalOrder/checkOrder/checkOrder"
                });
            }
        });
    },
    payBack: function(r) {
        var a = r.currentTarget.dataset.id, o = r.currentTarget.dataset.currentTab;
        if (0 == o) {
            e.setData({
                orderType: "Y",
                orderId: a
            });
        } else if (1 == o) {
            e.setData({
                orderType: "D",
                orderId: a
            });
        } else {
            e.setData({
                orderType: "W",
                orderId: a
            });
        }
        wx.request({
            url: t + "skordermodel/getOrderById",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                id: a,
                orderType: e.data.orderType
            },
            success: function(r) {
                console.log(e.data.orderType);
                var t = r.data.orderRealPrice, o = r.data.orderPayType, d = r.data.orderNum;
                wx.getStorage({
                    key: "userName",
                    success: function(r) {
                        wx.getStorage({
                            key: "storeId",
                            success: function(n) {
                                e.setData({
                                    orderNum: d,
                                    orderId: a,
                                    orderType: e.data.orderType,
                                    orderPayType: o,
                                    payBackMoney: t,
                                    userName: r.data,
                                    storeId: n.data,
                                    disp1: !0,
                                    heightFlg: "auto",
                                    overFlowFlg: "hidden"
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    evalOrder: function(r) {
        var a = r.currentTarget.dataset.id, o = r.currentTarget.dataset.currentTab;
        0 == o ? (e.setData({
            orderType: "Y",
            orderId: a
        }), wx.setStorage({
            key: "orderType",
            data: "Y"
        }), wx.setStorage({
            key: "orderId",
            data: a
        })) : 1 == o ? (e.setData({
            orderType: "D",
            orderId: a
        }), wx.setStorage({
            key: "orderType",
            data: "D"
        }), wx.setStorage({
            key: "orderId",
            data: a
        })) : (console.log(a), e.setData({
            orderType: "W",
            orderId: a
        }), wx.setStorage({
            key: "orderType",
            data: "W"
        }), wx.setStorage({
            key: "orderId",
            data: a
        })), wx.request({
            url: t + "skordermodel/getOrderById",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                id: a,
                orderType: e.data.orderType
            },
            success: function(e) {
                wx.setStorage({
                    key: "foodInfo",
                    data: e.data
                }), wx.navigateTo({
                    url: "evalOrder/evaluation/evaluation"
                });
            }
        });
    },
    payOrder: function(e) {
        var r = e.currentTarget.dataset.id, t = e.currentTarget.dataset.currentTab, a = void 0, o = void 0, d = void 0, n = void 0;
        0 == t ? (a = "Y", o = !1, d = !1, n = !0, console.log(a)) : 1 == t ? (console.log("我是点餐"), 
        a = "D", o = !1, d = !0, n = !1, console.log(a)) : (console.log("我是外卖"), a = "W", 
        o = !1, d = !1, n = !1, console.log(a)), wx.setStorage({
            key: "couponInfo",
            data: ""
        }), wx.setStorage({
            key: "orderId",
            data: r
        }), wx.setStorage({
            key: "orderType",
            data: a
        }), wx.setStorage({
            key: "wmFlg",
            data: o
        }), wx.setStorage({
            key: "dcFlg",
            data: d
        }), wx.setStorage({
            key: "ydFlg",
            data: n
        }), wx.navigateTo({
            url: "evalOrder/evalOrder?orderId=" + r + "&orderType=" + a
        });
    },
    editOrder: function(e) {
        e.currentTarget.dataset.item;
        var r = e.currentTarget.dataset.id, t = e.currentTarget.dataset.currentTab, a = void 0, o = e.currentTarget.dataset.orderState, d = void 0, n = void 0, s = void 0;
        0 == t ? (a = "Y", d = !1, n = !1, s = !0) : 1 == t ? (a = "D", d = !1, n = !0, 
        s = !1) : (a = "W", d = !0, n = !1, s = !1), wx.setStorage({
            key: "orderType",
            data: a
        }), wx.setStorage({
            key: "wmFlg",
            data: d
        }), wx.setStorage({
            key: "dcFlg",
            data: n
        }), wx.setStorage({
            key: "ydFlg",
            data: s
        }), console.log(a + o), "Y" == a && "1" == o ? wx.navigateTo({
            url: "../destine/destine?orderId=" + r + "&editType=N"
        }) : wx.navigateTo({
            url: "../takeOut/takeOut?flag=" + a + "&orderId=" + r + "&editType=N"
        });
    },
    cancelOrder: function(r) {
        console.log("========cancelOrder======="), console.log(r);
        var a = r.currentTarget.dataset.currentTab, o = r.currentTarget.dataset.id, d = void 0;
        0 == a ? ("Y", d = t + "skordermodel/updReservedOrder") : 1 == a ? ("D", d = t + "skordermodel/updOrderInfo") : ("W", 
        d = t + "skordermodel/updTakeOutOrder"), wx.request({
            url: d,
            data: {
                orderState: "5",
                id: o
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(r) {
                e.onLoad();
            }
        });
    },
    getMore: function() {
        if (1 != e.data.noMore) {
            var r = e.data.infos21, t = e.data.clicked, a = !1;
            if (10 + 10 * (t += 1) <= e.data.orders.length) {
                for (var o = 0; o < 10 + 10 * t; o++) r[o] = e.data.orders[o];
                a = !1;
            } else {
                for (var d = 0; d < e.data.orders.length; d++) r[d] = e.data.orders[d];
                a = !0;
            }
            e.setData({
                infos21: r,
                clicked: t,
                noMore: a
            });
        } else wx.showToast({
            title: "无更多信息",
            icon: "loading",
            duration: 1e3
        });
    },
    getMore1: function() {
        if (1 != e.data.noMore1) {
            var r = e.data.infos22, t = e.data.clicked1, a = !1;
            if (10 + 10 * (t += 1) <= e.data.orders1.length) {
                for (var o = 0; o < 10 + 10 * t; o++) r[o] = e.data.orders1[o];
                a = !1;
            } else {
                for (var d = 0; d < e.data.orders1.length; d++) r[d] = e.data.orders1[d];
                a = !0;
            }
            e.setData({
                infos22: r,
                clicked1: t,
                noMore1: a
            });
        } else wx.showToast({
            title: "无更多信息",
            icon: "loading",
            duration: 1e3
        });
    },
    getMore2: function() {
        if (1 != e.data.noMore2) {
            var r = e.data.infos23, t = e.data.clicked2, a = !1;
            if (10 + 10 * (t += 1) <= e.data.orders2.length) {
                for (var o = 0; o < 10 + 10 * t; o++) r[o] = e.data.orders2[o];
                a = !1;
            } else {
                for (var d = 0; d < e.data.orders2.length; d++) r[d] = e.data.orders2[d];
                a = !0;
            }
            e.setData({
                infos23: r,
                clicked2: t,
                noMore2: a
            });
        } else wx.showToast({
            title: "无更多信息",
            icon: "loading",
            duration: 1e3
        });
    },
    submitPayBack: function() {
        "" != e.data.refundresult ? (e.setData({
            disp1: !1,
            heightFlg: "",
            overflowFlg: "auto"
        }), wx.request({
            url: t + "skmembermodel/insterRefunInfoWX",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                orderid: e.data.orderId,
                refundmoney: e.data.payBackMoney,
                refundperson: e.data.userId,
                refundresult: e.data.refundresult,
                orderType: e.data.orderType,
                storeId: e.data.storeId,
                refundType: e.data.orderPayType
            },
            success: function(r) {
                wx.showModal({
                    title: "申请已提交",
                    content: "",
                    success: function(r) {
                        e.onLoad();
                    }
                });
            }
        })) : wx.showModal({
            title: "请输入退款原因",
            content: ""
        });
    },
    getReason: function(r) {
        e.setData({
            refundresult: r.detail.value
        });
    },
    resume: function() {
        e.setData({
            disp1: !1,
            disp2: !1,
            disp3: !1,
            heightFlg: "",
            overFlowFlg: "auto",
            refundresult: ""
        });
    },
    contact: function() {
        console.log("==========绑定打电话功能=========="), wx.getStorage({
            key: "storeInfo",
            success: function(e) {
                console.log("========联系电话========="), console.log(e.data.storeInfoTelephoneNum), 
                null != e.data.storeInfoTelephoneNum && "" != e.data.storeInfoTelephoneNum && void 0 != e.data.storeInfoTelephoneNum && "undefined" != e.data.storeInfoTelephoneNum && "null" != e.data.storeInfoTelephoneNum || wx.showModal({
                    title: "无联系电话",
                    content: ""
                }), wx.makePhoneCall({
                    phoneNumber: e.data.storeInfoTelephoneNum
                });
            }
        });
    },
    resumePayBack: function(r) {
        wx.showModal({
            title: "即将取消退款",
            content: "",
            success: function(a) {
                if (a.confirm) {
                    var o = r.currentTarget.dataset.id, d = r.currentTarget.dataset.currentTab;
                    0 == d ? (e.setData({
                        orderType: "Y",
                        orderId: o
                    }), wx.setStorage({
                        key: "orderType",
                        data: "Y"
                    }), wx.setStorage({
                        key: "orderId",
                        data: o
                    })) : 1 == d ? (e.setData({
                        orderType: "D",
                        orderId: o
                    }), wx.setStorage({
                        key: "orderType",
                        data: "D"
                    }), wx.setStorage({
                        key: "orderId",
                        data: o
                    })) : (e.setData({
                        orderType: "W",
                        orderId: o
                    }), wx.setStorage({
                        key: "orderType",
                        data: "W"
                    }), wx.setStorage({
                        key: "orderId",
                        data: o
                    }), wx.setStorage({
                        key: "wmFlg",
                        data: !0
                    }), wx.setStorage({
                        key: "dcFlg",
                        data: !1
                    }), wx.setStorage({
                        key: "ydFlg",
                        data: !1
                    })), wx.request({
                        url: t + "skmembermodel/cancelRefunInfoWX",
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            orderid: e.data.orderId,
                            orderType: e.data.orderType
                        },
                        success: function(r) {
                            "000001" != r.data.message ? e.onLoad() : wx.showModal({
                                title: "退款正在途中",
                                content: "不可取消退款"
                            });
                        }
                    });
                }
            }
        });
    },
    getPayBackInfo: function(r) {
        var a = r.currentTarget.dataset.id;
        wx.getStorage({
            key: "storeId",
            success: function(r) {
                wx.request({
                    url: t + "skmembermodel/selRefundInfo",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        orderid: a,
                        storeId: r.data
                    },
                    success: function(r) {
                        var t = r.data.data[0];
                        e.setData({
                            disp3: !0,
                            orderNum: t.orderNum,
                            payBackMoney: t.refundmoney,
                            refundresult: t.refundresult
                        }), console.log("=======查看退款订单========"), console.log(r.data);
                    }
                });
            }
        });
    },
    bohuiReason: function(r) {
        var a = r.currentTarget.dataset.id;
        e.setData({
            disp2: !0
        }), wx.getStorage({
            key: "storeId",
            success: function(r) {
                wx.request({
                    url: t + "skmembermodel/selRefundInfo",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        orderid: a,
                        storeId: r.data
                    },
                    success: function(r) {
                        var t = r.data.data[0];
                        console.log("=======查看驳回原因========"), console.log(r.data.data[0]), e.setData({
                            orderNum: t.orderNum,
                            payBackMoney: t.refundmoney,
                            bohuiReason: t.rejectreson
                        });
                    }
                });
            }
        });
    }
});