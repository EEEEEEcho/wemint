var e, t = require("../../../../../utils/util.js"), o = getApp().globalData.httpUrl;

Page({
    data: {
        httpUrl: o,
        selectedCoupon: "测试的假券",
        orderPayStyle: "支付订单",
        remarke: "",
        coupon: "选择优惠券",
        wmFlg: !0,
        dcFlg: !0,
        ydFlg: !0,
        point: 0,
        foods: [],
        receiveUser: "某某某",
        receiveAddr: "中国地球",
        storeInfo: {}
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
        console.log(a.comment), "1" == a.comment && e.setData({
            comment: !0
        }), wx.getStorage({
            key: "couponInfo",
            success: function(t) {
                e.setData({
                    couponName: t.data.couponName,
                    derateMoney: t.data.derateMoney
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
            key: "remarke",
            success: function(t) {
                null != t.data && void 0 != t.data && "" != t.data ? e.setData({
                    remarke: t.data
                }) : e.setData({
                    remarke: "无评论"
                });
            }
        }), wx.getStorage({
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
            key: "point",
            success: function(t) {
                for (var o = [], a = 0; a < 5; a++) o[a] = "../../../../../images/emptyStar.png";
                console.log(t.data);
                for (var n = 0; n < t.data; n++) o[n] = "../../../../../images/star.png";
                e.setData({
                    starUrls: o
                });
            }
        }), wx.getStorage({
            key: "orderId",
            success: function(t) {
                e.setData({
                    orderId: t.data
                }), wx.getStorage({
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
                                var o = t.data.storeRatedRemarke;
                                "" != o && null != o && void 0 != o || (o = "无评论"), e.setData({
                                    foodInfo: t.data,
                                    storeRatedRemarke: o
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
    resume: function(e) {
        wx.switchTab({
            url: "../../../../index/index"
        });
    }
});