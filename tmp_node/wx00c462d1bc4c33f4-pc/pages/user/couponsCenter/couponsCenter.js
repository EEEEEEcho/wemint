var e, t = require("../../../utils/util.js"), o = getApp().globalData.httpUrl;

Page({
    data: {
        coupones: [],
        geted: !1,
        receive: !1,
        nowDate: t.formatDate(new Date())
    },
    trimString: function(e) {
        var t = e.split("年"), o = t[1].split("月"), n = o[1].split("日");
        return t[0] + "-" + o[0] + "-" + n[0];
    },
    trimString1: function(e) {
        var t = e.split("年"), o = t[1].split("月"), n = o[1].split("日");
        return t[0] + o[0] + n[0];
    },
    trimString2: function(e) {
        var t = e.split("/"), o = t[2].split(" ");
        return t[0] + t[1] + o[0];
    },
    fixNull: function(e) {
        return null == e && (e = 0), e;
    },
    fixNulls: function(e) {
        return null == e && (e = ""), e;
    },
    onLoad: function(n) {
        e = this, t.getShareInfos(e, o), t.setCompanyId(e, n), t.setStoreId(e), t.setStoreInfo(e), 
        1 == e.data.geted && (e.setData({
            geted: !1,
            receive: !1
        }), wx.showModal({
            title: "恭喜",
            content: "已领取一张优惠券"
        })), wx.getStorage({
            key: "userId",
            success: function(t) {
                wx.getStorage({
                    key: "storeId",
                    success: function(n) {
                        wx.getStorage({
                            key: "companyId",
                            success: function(a) {
                                wx.request({
                                    url: o + "skcouponmodel/selCouponByApply",
                                    data: {
                                        userId: t.data,
                                        applyStoreId: n.data,
                                        companyId: a.data
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(t) {
                                        console.log(t.data);
                                        var o = t.data;
                                        e.setData({
                                            coupones: o
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
    getIt: function(t) {
        console.log(t.detail.formId);
        var n = t.detail.formId, a = t.currentTarget.dataset.cardId, s = t.currentTarget.dataset.putId, c = t.currentTarget.dataset.voucherrestrictId;
        e.data.receive || (console.log(e.data.receive), e.setData({
            receive: !0
        }), wx.getStorage({
            key: "userId",
            success: function(t) {
                var r = t.data;
                wx.getStorage({
                    key: "storeId",
                    success: function(t) {
                        var d = t.data;
                        wx.request({
                            url: o + "skcouponmodel/alreadyReceivedNumber",
                            data: {
                                userId: r,
                                putId: s,
                                cardId: a
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                console.log("剩余优惠卷领取数量" + t.data.number), t.data.number < c && (console.log("剩余优惠卷领取数量" + t.data.number), 
                                wx.request({
                                    url: o + "skcouponmodel/voucher",
                                    data: {
                                        userId: r,
                                        putId: s,
                                        cardId: a,
                                        storeId: d,
                                        formId: n
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(t) {
                                        e.setData({
                                            geted: !0
                                        }), e.onLoad();
                                    }
                                }));
                            }
                        });
                    }
                });
            }
        }));
    }
});