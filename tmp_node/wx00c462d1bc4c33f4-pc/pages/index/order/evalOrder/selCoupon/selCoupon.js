var e, o = require("../../../../../utils/util.js"), t = getApp().globalData.httpUrl;

Page({
    data: {
        coupones: [],
        useFlg: !1,
        nowData: o.formatDate(new Date())
    },
    trimString: function(e) {
        var o = e.split("年"), t = o[1].split("月"), a = t[1].split("日");
        return o[0] + "-" + t[0] + "-" + a[0];
    },
    trimString1: function(e) {
        var o = e.split("年"), t = o[1].split("月"), a = t[1].split("日");
        return o[0] + t[0] + a[0];
    },
    trimString2: function(e) {
        var o = e.split("/"), t = o[2].split(" ");
        return o[0] + o[1] + t[0];
    },
    huoqu: function(o) {
        var t = o.currentTarget.dataset.index, a = e.data.coupones[t].couponName, n = e.data.coupones[t].derateMoney, c = e.data.coupones[t].cardId, s = e.data.coupones[t].code, d = e.data.coupones[t].miniMoney, r = e.data.coupones[t].couponType;
        wx.setStorage({
            key: "couponInfo",
            data: {
                couponName: a,
                derateMoney: n,
                couponId: c,
                code: s,
                miniMoney: d,
                couponType: r
            }
        }), wx.getStorage({
            key: "wmFlg",
            success: function(e) {
                wx.getStorage({
                    key: "dcFlg",
                    success: function(o) {
                        wx.getStorage({
                            key: "ydFlg",
                            success: function(a) {
                                if (o.data || a.data || e.data) wx.getStorage({
                                    key: "orderId",
                                    success: function(e) {
                                        wx.getStorage({
                                            key: "orderType",
                                            success: function(o) {
                                                wx.redirectTo({
                                                    url: "../../../../index/order/evalOrder/evalOrder?orderId=" + e.data + "&orderType=" + o.data
                                                });
                                            }
                                        });
                                    }
                                }); else {
                                    var n = getCurrentPages();
                                    console.log("获取父类======>" + n);
                                    var c = n[n.length - 1];
                                    console.log("获取上一级类======>" + c.data.useFlg);
                                    var s = n[n.length - 2];
                                    console.log("获取上一级类======>" + s.data.couponName), s.setData({
                                        couponName: c.data.coupones[t].couponName,
                                        selectedCoupon: c.data.coupones[t].couponName,
                                        coupon: !0,
                                        card: !1,
                                        couponType: c.data.coupones[t].couponType,
                                        yhprice: c.data.coupones[t].derateMoney,
                                        derateMoney: c.data.coupones[t].derateMoney,
                                        couponId: c.data.coupones[t].cardId,
                                        code: c.data.coupones[t].code,
                                        miniMoney: c.data.coupones[t].miniMoney,
                                        clickedCoupon: !0
                                    }), s.back(), wx.navigateBack({
                                        delta: "1"
                                    });
                                }
                                wx.setStorage({
                                    key: "couponFlg",
                                    data: "1"
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    onLoad: function(a) {
        e = this, o.getShareInfos(e, t), o.setStoreInfo(e), o.setCompanyId(e, a), wx.getStorage({
            key: "userId",
            success: function(a) {
                wx.getStorage({
                    key: "companyId",
                    success: function(n) {
                        wx.getStorage({
                            key: "storeId",
                            success: function(c) {
                                e.setData({
                                    storeId: c.data
                                }), wx.request({
                                    url: t + "skcouponmodel/selCouponByReceive",
                                    data: {
                                        userId: a.data,
                                        companyId: n.data,
                                        applyStoreId: c.data
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(t) {
                                        console.log(t.data);
                                        var a = t.data;
                                        for (var n in a) if ("DATE_TYPE_FIX_TERM" == a[n].validityType) {
                                            var c = a[n].receiveTime.split(" ")[0], s = new Date(c), d = new Date(c);
                                            d.setDate(s.getDate() + 1 * a[n].validityBegin), a[n].validityBegin = o.formatDate(d);
                                            var r = new Date(d);
                                            r.setDate(d.getDate() + 1 * a[n].validityEnd), a[n].validityEnd = o.formatDate(r);
                                        }
                                        e.setData({
                                            coupones: t.data
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
        e = this, wx.onSocketMessage(function(t) {
            console.log("===========接收到服务器信息=============="), console.log(t.data), o.getTkInfos(e, t);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    o.conSocket(e.data);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        o.closeSock(), wx.getStorage({
            key: "orderId",
            success: function(e) {
                wx.getStorage({
                    key: "orderType",
                    success: function(o) {
                        wx.navigateTo({
                            url: "evalOrder/evalOrder?orderId=" + e.data + "&orderType=" + o.data
                        });
                    }
                });
            }
        });
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
    }
});