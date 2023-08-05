var e, o = require("../../../../utils/util.js"), t = getApp().globalData.httpUrl;

getApp().globalData.pdhttpUrl;

Page({
    data: {
        tableNum: "",
        minute: "",
        minute1: 0,
        yournumber: "",
        hotline: "",
        address: "",
        startTime: "",
        endTime: "",
        cancelqueen: "取消排队"
    },
    cancelQueen: function() {
        wx.getStorage({
            key: "storeId",
            success: function(o) {
                wx.request({
                    url: t + "skordermodel/updLineUp",
                    data: {
                        id: e.data.id,
                        state: "C",
                        storeId: o.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        wx.switchTab({
                            url: "../../../index/index"
                        });
                    }
                });
            }
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), e.onShow(), setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500);
    },
    onLoad: function(n) {
        e = this, o.getShareInfos(e, t), o.setStoreInfo(e), o.setCompanyId(e, n), wx.getStorage({
            key: "storeId",
            success: function(o) {
                e.setData({
                    storeId: o.data
                }), wx.request({
                    url: t + "skstoremodel/findStoreById",
                    data: {
                        storeId: o.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(o) {
                        e.setData({
                            hotline: o.data.storeInfoTelephoneNum,
                            address: o.data.storeInfoAddress,
                            startTime: o.data.storeInfoBusinessStartTime,
                            endTime: o.data.storeInfoBusinessEndTime
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "storeId",
            success: function(o) {
                wx.getStorage({
                    key: "openId",
                    success: function(n) {
                        wx.request({
                            url: t + "skordermodel/findlPersonNumLineUp",
                            data: {
                                storeId: o.data,
                                openId: n.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(o) {
                                e.setData({
                                    tableNum: o.data.personNum,
                                    minute: o.data.lineUpTime,
                                    lineupInfoNo: o.data.lineupInfoNo,
                                    id: o.data.id
                                });
                                var t = o.data.lineupInfoCreateTime;
                                e.setData({
                                    lineupInfoCreateTime: t
                                }), e.timeFn(t);
                            }
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "waitId",
            success: function(o) {
                e.setData({
                    yournumber: o.data
                });
            }
        });
    },
    onReady: function() {
        e.soketClose();
    },
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.onSocketMessage(function(t) {
            console.log("收到服务器内容："), console.log(t), "call" == t.data && wx.playBackgroundAudio({
                dataUrl: "http://qiniu.shoukaikeji.com/FpjDaduPdlFmEGKCz39hd_wu-p8k",
                success: function(e) {
                    console.log("======success======="), console.log(e);
                },
                fail: function(e) {
                    console.log("======fail======="), console.log(e);
                }
            }), "skip" != t.data && "repast" != t.data || wx.navigateBack({}), o.getTkInfos(e, t);
        });
    },
    onHide: function() {
        e.soketClose();
    },
    onUnload: function() {
        e.soketClose();
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
    soketClose: function() {
        wx.getStorage({
            key: "userId",
            success: function(e) {
                wx.getStorage({
                    key: "connectedSocket",
                    success: function(t) {
                        t.data ? (console.log("=========已有socket不连接========="), wx.setStorage({
                            key: "connectedSocket",
                            data: !0
                        })) : (o.conSocket(e.data), wx.onSocketOpen(function(e) {
                            console.log("WebSocket连接已打开！"), console.log(e), wx.setStorage({
                                key: "connectedSocket",
                                data: !0
                            });
                        }), wx.onSocketError(function(e) {
                            console.log("WebSocket连接打开失败，请检查！"), console.log(e), wx.setStorage({
                                key: "connectedSocket",
                                data: !1
                            });
                        }));
                    }
                });
            }
        });
    },
    countUp: function() {
        var o = e.data.minute1;
        setTimeout(function() {
            o += 1, e.setData({
                minute1: o
            });
            e.countUp();
        }, 6e4);
    },
    timeFn: function(o) {
        console.log("排队时间 ===>" + o.replace(/-/g, "/"));
        var t = new Date(o.replace(/-/g, "/"));
        console.log("dateBegin ===>" + t);
        var n = new Date();
        console.log("dateEnd ===>" + n), console.log("dateEnd.getTime() ===>" + n.getTime()), 
        console.log("dateBegin.getTime() ===>" + t.getTime());
        var a = n.getTime() - t.getTime();
        a < 0 && (a = 0), console.log("dateDiff ===>" + a);
        var s = Math.floor(a / 864e5);
        console.log("dayDiff ===>" + s);
        var c = a % 864e5;
        console.log("leave1 ===>" + c);
        var i = Math.floor(c / 36e5);
        console.log("hours ===>" + i);
        var l = c % 36e5;
        console.log("leave2 ===>" + l);
        var d = Math.floor(l / 6e4), r = l % 6e4, u = Math.round(r / 1e3);
        console.log(" 相差 " + s + "天 " + i + "小时 " + d + " 分钟" + u + " 秒"), console.log(a + "时间差的毫秒数", s + "计算出相差天数", c + "计算天数后剩余的毫秒数", i + "计算出小时数", d + "计算相差分钟数", u + "计算相差秒数");
        var g = Math.floor(c / 6e4);
        e.setData({
            minute1: g
        }), setTimeout(function() {
            var t = new Date(o.replace(/-/g, "/")), n = new Date().getTime() - t.getTime(), a = Math.floor(n / 864e5), s = n % 864e5, c = Math.floor(s / 36e5), i = s % 36e5, l = Math.floor(i / 6e4), d = i % 6e4, r = Math.round(d / 1e3);
            console.log(" 相差 " + a + "天 " + c + "小时 " + l + " 分钟" + r + " 秒"), console.log(n + "时间差的毫秒数", a + "计算出相差天数", s + "计算天数后剩余的毫秒数", c + "计算出小时数", l + "计算相差分钟数", r + "计算相差秒数");
            var u = Math.floor(s / 6e4);
            e.setData({
                minute1: u
            });
            e.timeFn(e.data.lineupInfoCreateTime);
        }, 6e4);
    }
});