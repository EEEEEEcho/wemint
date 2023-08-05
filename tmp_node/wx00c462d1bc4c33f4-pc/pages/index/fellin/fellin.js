var e, t = require("../../../utils/util.js"), o = getApp(), n = o.globalData.httpUrl;

o.globalData.testhttpUrl;

Page({
    data: {
        tableNum: "",
        minute: "",
        hotline: "",
        address: "",
        startTime: "",
        endTime: ""
    },
    onLoad: function(o) {
        e = this, t.getShareInfos(e, n), e.setData({
            queuingNumber: !0
        }), t.setStoreInfo(e), t.setUserId(e), t.setCompanyId(e, o), wx.getStorage({
            key: "storeId",
            success: function(t) {
                e.setData({
                    storeId: t.data
                }), wx.request({
                    url: n + "skstoremodel/findStoreById",
                    data: {
                        storeId: t.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        e.setData({
                            hotline: t.data.storeInfoTelephoneNum,
                            address: t.data.storeInfoAddress,
                            startTime: t.data.storeInfoBusinessStartTime,
                            endTime: t.data.storeInfoBusinessEndTime
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "storeId",
            success: function(t) {
                wx.getStorage({
                    key: "openId",
                    success: function(o) {
                        wx.request({
                            url: n + "skordermodel/findlPersonNumLineUp",
                            data: {
                                storeId: t.data,
                                openId: o.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                e.setData({
                                    tableNum: t.data.personNum,
                                    minute: t.data.lineUpTime
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
        e = this, wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    t.conSocket(e.data);
                }
            });
        }), wx.onSocketMessage(function(o) {
            console.log("收到服务器内容："), console.log(o), "skip" == o.data && e.onLoad(), t.getTkInfos(e, o);
        });
    },
    onHide: function() {},
    onUnload: function() {},
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
    queuingNumber: function() {
        e.data.queuingNumber && (e.setData({
            queuingNumber: !1
        }), wx.getStorage({
            key: "openId",
            success: function(t) {
                wx.getStorage({
                    key: "storeId",
                    success: function(o) {
                        wx.request({
                            url: n + "skordermodel/insertLineUp",
                            data: {
                                storeId: o.data,
                                openId: t.data,
                                wechatUserId: e.data.userId
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(e) {
                                wx.setStorage({
                                    key: "waitId",
                                    data: e.data.id
                                }), wx.redirectTo({
                                    url: "../fellin/queuingNumber/queuingNumber"
                                });
                            }
                        });
                    }
                });
            }
        }));
    }
});