var e, t = require("../../../utils/util.js"), a = getApp().globalData.httpUrl;

Page({
    data: {
        clicked: 0,
        noMore: !1,
        grade1: "",
        grade2: "",
        grade3: "",
        grade4: "",
        grade5: "",
        discusses: [],
        discussStar: 0,
        starUrls: []
    },
    fixNull: function(e) {
        return null == e && (e = 0), e;
    },
    fixNulls: function(e) {
        return null == e && (e = ""), e;
    },
    getDetail: function(t) {
        var a = t.currentTarget.dataset.index, o = e.data.infos2[a].storeRatedFoodStartLevel, r = t.currentTarget.dataset.orderId, s = t.currentTarget.dataset.orderType;
        "Y" == s ? (wx.setStorage({
            key: "ydFlg",
            data: !0
        }), wx.setStorage({
            key: "dcFlg",
            data: !1
        }), wx.setStorage({
            key: "wmFlg",
            data: !1
        })) : "D" == s ? (wx.setStorage({
            key: "ydFlg",
            data: !1
        }), wx.setStorage({
            key: "dcFlg",
            data: !0
        }), wx.setStorage({
            key: "wmFlg",
            data: !1
        })) : "W" == s && (wx.setStorage({
            key: "ydFlg",
            data: !1
        }), wx.setStorage({
            key: "dcFlg",
            data: !1
        }), wx.setStorage({
            key: "wmFlg",
            data: !0
        })), "" == o && (o = 0);
        var d = e.data.infos2[a].storeRatedRemarke;
        "" == d && (d = "无评论"), wx.setStorage({
            key: "remarke",
            data: d
        }), wx.setStorage({
            key: "point",
            data: o
        }), wx.setStorage({
            key: "orderId",
            data: r
        }), wx.setStorage({
            key: "orderType",
            data: s
        }), wx.navigateTo({
            url: "../../index/order/evalOrder/evaluatedOrder/evaluatedOrder?comment=1"
        });
    },
    onLoad: function(o) {
        e = this, t.getShareInfos(e, a), t.setCompanyId(e, o), t.setStoreId(e), t.setStoreInfo(e), 
        wx.getStorage({
            key: "storeId",
            success: function(t) {
                wx.request({
                    url: a + "skstoremodel/getStoreRatedByStoreId",
                    data: {
                        storeRatedStoreInfoStoreId: t.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        e.setData({
                            grade1: e.fixNull(t.data.comprehensiveStartLevel),
                            grade2: e.fixNull(t.data.storeRatedFoodStartLevel),
                            grade3: e.fixNull(t.data.storeRatedServiceStartLevel),
                            grade4: e.fixNull(t.data.storeRatedEnvironmentStartLevel),
                            grade5: e.fixNull(t.data.storeRatedSendSartLevel)
                        });
                    }
                }), wx.request({
                    url: a + "skstoremodel/getListStoreRatedByStoreId",
                    data: {
                        storeRatedStoreInfoStoreId: t.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        e.setData({
                            discusses: t.data
                        });
                        var a = t.data, o = e.data.starUrls;
                        for (var r in a) o[r] = e.setStart(a[r].storeRatedFoodStartLevel);
                        e.setData({
                            starurls: o
                        });
                        var s = [], d = !1;
                        if (a.length >= 10) {
                            for (var n = 0; n < 10; n++) s[n] = a[n];
                            d = !1;
                        } else {
                            for (var l = 0; l < a.length; l++) s[l] = a[l];
                            d = !0;
                        }
                        e.setData({
                            infos2: s,
                            noMore: d
                        });
                    }
                });
            }
        });
    },
    setStart: function(e) {
        for (var t = {}, a = 0; a < 5; a++) t[a] = a <= e - 1 ? {
            starurl: "../../../images/star.png"
        } : e - a > 0 && e - a < 1 ? {
            starurl: "../../../images/halfStar.png"
        } : {
            starurl: "../../../images/emptyStar.png"
        };
        return t;
    },
    getMore: function() {
        if (1 != e.data.noMore) {
            var t = e.data.infos2, a = e.data.clicked, o = !1;
            if (10 + 10 * (a += 1) <= e.data.discusses.length) {
                for (var r = 0; r < 10 + 10 * a; r++) t[r] = e.data.discusses[r];
                o = !1;
            } else {
                for (var s = 0; s < e.data.discusses.length; s++) t[s] = e.data.discusses[s];
                o = !0;
            }
            e.setData({
                infos2: t,
                clicked: a,
                noMore: o
            });
        } else wx.showToast({
            title: "无更多信息",
            icon: "loading",
            duration: 1e3
        });
    },
    onReady: function() {},
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.onSocketMessage(function(a) {
            console.log("===========接收到服务器信息=============="), console.log(a.data), t.getTkInfos(e, a);
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
    onReachBottom: function() {
        e.getMore();
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
    }
});