var e, t = require("../../../../../utils/util.js"), o = getApp().globalData.httpUrl;

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
        e = this, t.getShareInfos(e, o), t.setStoreInfo(e), t.setCompanyId(e, a);
        a.orderState;
        var n = a.orderId;
        wx.getStorage({
            key: "orderType",
            success: function(t) {
                e.setData({
                    orderId: n,
                    orderType: t.data
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
                                var o = t.data.orderRefuseRemark;
                                null != o && void 0 != o && "" != o || (o = "无理由"), e.setData({
                                    jiedanStatu: "您的订单已被商家拒绝",
                                    orderState: "6",
                                    reason: o
                                });
                            }
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
        });
    },
    directOrder: function(t) {
        wx.setStorage({
            key: "wmFlg",
            data: !1
        }), wx.setStorage({
            key: "dcFlg",
            data: !1
        }), wx.setStorage({
            key: "orderType",
            data: e.data.orderType
        }), wx.redirectTo({
            url: "../../takeOut/takeOut?orderId=" + e.data.orderId
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