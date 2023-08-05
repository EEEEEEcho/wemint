var t, e = require("../../../utils/util.js"), o = getApp().globalData.httpUrl;

Page({
    data: {
        coupones: [],
        useFlg: !1,
        nowData: e.formatDate(new Date())
    },
    trimString: function(t) {
        var e = t.split("")[0].split("-");
        return e[0] + e[1] + e[2];
    },
    trimString1: function(t) {
        var e = t.split("年"), o = e[1].split("月"), a = o[1].split("日");
        return e[0] + o[0] + a[0];
    },
    trimString2: function(t) {
        var e = t.split("/"), o = e[2].split(" ");
        return e[0] + e[1] + o[0];
    },
    onLoad: function(a) {
        t = this, e.getShareInfos(t, o), e.setStoreInfo(t), wx.getStorage({
            key: "userId",
            success: function(a) {
                wx.getStorage({
                    key: "companyId",
                    success: function(n) {
                        t.setData({
                            companyId: n.data
                        }), wx.getStorage({
                            key: "storeId",
                            success: function(s) {
                                t.setData({
                                    storeId: s.data
                                }), wx.request({
                                    url: o + "skcouponmodel/selCouponByReceive",
                                    data: {
                                        userId: a.data,
                                        companyId: n.data,
                                        applyStoreId: s.data
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(o) {
                                        console.log(o.data);
                                        var a = o.data;
                                        for (var n in a) if ("DATE_TYPE_FIX_TERM" == a[n].validityType) {
                                            var s = a[n].receiveTime.split(" ")[0], i = new Date(s), c = new Date(s);
                                            c.setDate(i.getDate() + 1 * a[n].validityBegin), a[n].validityBegin = e.formatDate(c);
                                            var r = new Date(c);
                                            r.setDate(c.getDate() + 1 * a[n].validityEnd), a[n].validityEnd = e.formatDate(r);
                                        }
                                        t.setData({
                                            coupones: o.data
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
        t.setData({
            displa: !1
        });
    },
    onShow: function() {
        t = this, wx.onSocketMessage(function(o) {
            console.log("===========接收到服务器信息=============="), console.log(o.data), e.getTkInfos(t, o);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(t) {
                    e.conSocket(t.data);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        e.closeSock();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), t = this, setTimeout(function() {
            t.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: t.data.shareTitle,
            desc: "",
            imageUrl: t.data.shareImgUrl,
            path: "/pages/index/index?storeId=" + t.data.storeId + "&companyId=" + t.data.companyId,
            success: function(t) {
                console.log("转发成功");
            },
            fail: function(t) {
                console.log("转发失败");
            }
        };
    }
});