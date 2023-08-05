var a, t = require("../../../../../utils/util.js"), e = getApp().globalData.httpUrl;

Page({
    data: {
        foodRatedBeanList: [],
        evaluates: [],
        starUrl1: [],
        starUrl2: [],
        starUrl3: [],
        starUrl4: [],
        point1: "5",
        point2: "5",
        point3: "5",
        point4: "5",
        sayMore: "",
        time: "",
        points: 0,
        titleIndex: 0,
        clickable: !0,
        foods: []
    },
    onLoad: function(o) {
        a = this, t.getShareInfos(a, e), t.setCompanyId(a, o), t.setStoreId(a), wx.getStorage({
            key: "orderType",
            success: function(t) {
                wx.getStorage({
                    key: "orderId",
                    success: function(o) {
                        wx.request({
                            url: e + "skordermodel/getOrderById",
                            data: {
                                id: o.data,
                                orderType: t.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                a.setData({
                                    foods: t.data.foodList
                                });
                            }
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "foodInfo",
            success: function(t) {
                a.setData({
                    foods: t.data.foodList
                }), a.initStar(), a.setInitZyc(), a.setFoodRatedBeanList();
            }
        });
        var r = t.formatTime(new Date());
        a.setData({
            time: r
        });
    },
    onReady: function() {},
    closeTk: function() {
        a.setData({
            displa: !1
        });
    },
    onShow: function() {
        a = this, wx.onSocketMessage(function(e) {
            console.log("===========接收到服务器信息=============="), console.log(e.data), t.getTkInfos(a, e);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(a) {
                    t.conSocket(a.data);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        t.closeSock();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), a = this, setTimeout(function() {
            a.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: a.data.shareTitle,
            desc: "",
            imageUrl: a.data.shareImgUrl,
            path: "/pages/index/index?storeId=" + a.data.storeId + "&companyId=" + a.data.companyId,
            success: function(a) {
                console.log("转发成功");
            },
            fail: function(a) {
                console.log("转发失败");
            }
        };
    },
    setFoodRatedBeanList: function() {
        for (var t in a.data.foods) {
            var e = a.data.foodRatedBeanList, o = [], r = [];
            o[t] = a.data.foods[t].foodId, r[t] = 0;
            var s = {
                foodId: o[t],
                foodEvaluation: r[t]
            };
            e.push(s), a.setData({
                foodRatedBeanList: e
            });
        }
    },
    setInitZyc: function() {
        var t = [], e = [], o = [], r = [], s = [], n = [], d = [];
        for (var i in a.data.foods) t[i] = "../../../../../images/unlikek.png", e[i] = "../../../../../images/likek.png", 
        o[i] = "#3d3d3d", r[i] = "#3d3d3d", s[i] = "#9a9a9a", n[i] = "#9a9a9a", d[i] = !0;
        a.setData({
            unlikeUrls: t,
            likeUrls: e,
            zanColors: o,
            caiColors: r,
            zanWordColors: s,
            caiWordColors: n,
            clickAbles: d
        });
    },
    zan: function(t) {
        var e = t.currentTarget.dataset.zanIndex, o = a.data.likeUrls, r = a.data.caiColors, s = a.data.caiWordColors, n = a.data.zanColors, d = a.data.zanWordColors, i = a.data.clickAbles, l = a.data.foodRatedBeanList;
        i[e] && (o[e] = "../../../../../images/likem.png", r[e] = "#3d3d3d", s[e] = "#9a9a9a", 
        n[e] = "#ffbf21", d[e] = "#3a4342", i[e] = !0, l[e].foodEvaluation = "0", a.setData({
            foodRatedBeanList: l,
            likeUrls: o,
            zanColors: n,
            zanWordColors: d,
            caiColors: r,
            caiWordColors: s,
            clickAbles: i
        }));
    },
    cai: function(t) {
        var e = t.currentTarget.dataset.caiIndex, o = a.data.unlikeUrls, r = a.data.zanColors, s = a.data.zanWordColors, n = a.data.caiColors, d = a.data.caiWordColors, i = a.data.clickAbles, l = a.data.foodRatedBeanList;
        i[e] && (o[e] = "../../../../../images/unlikem.png", r[e] = "#3d3d3d", s[e] = "#9a9a9a", 
        n[e] = "#494949", d[e] = "#666", i[e] = !0, l[e].foodEvaluation = "1", a.setData({
            foodRatedBeanList: l,
            unlikeUrls: o,
            zanColors: r,
            zanWordColors: s,
            caiColors: n,
            caiWordColors: d,
            clickAbles: i
        }));
    },
    submitEval: function() {
        wx.setStorage({
            key: "remarke",
            data: a.data.sayMore
        }), wx.getStorage({
            key: "orderType",
            success: function(t) {
                wx.getStorage({
                    key: "orderId",
                    success: function(o) {
                        wx.getStorage({
                            key: "storeId",
                            success: function(r) {
                                wx.getStorage({
                                    key: "userId",
                                    success: function(s) {
                                        wx.request({
                                            url: e + "skordermodel/insertStoreRated",
                                            method: "POST",
                                            data: {
                                                orderId: o.data,
                                                orderType: t.data,
                                                storeId: r.data,
                                                createUserId: s.data,
                                                remarke: a.data.sayMore,
                                                serviceStartLevel: a.data.point3,
                                                sendSartLevel: a.data.point4,
                                                environmentStartLevel: a.data.point1,
                                                foodStartLevel: a.data.point2,
                                                foodRatedBeanList: JSON.stringify(a.data.foodRatedBeanList)
                                            },
                                            header: {
                                                "content-type": "application/x-www-form-urlencoded"
                                            },
                                            success: function(t) {
                                                wx.setStorage({
                                                    key: "point",
                                                    data: a.data.point1
                                                }), wx.redirectTo({
                                                    url: "../evaluatedOrder/evaluatedOrder"
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
    sayMore: function(t) {
        a.setData({
            sayMore: t.detail.value
        });
    },
    pingjia: function(t) {
        var e = t.currentTarget.dataset.titleIndex + 1, o = t.currentTarget.dataset.point + 1;
        1 != e ? (2 == e && (a.setData({
            point2: o
        }), a.justPoint1()), 3 == e && (a.setData({
            point3: o
        }), a.justPoint1()), 4 == e && (a.setData({
            point4: o
        }), a.justPoint1()), a.makeStar(e, o)) : wx.showToast({
            title: "总评价不可点"
        });
    },
    justPoint1: function() {
        var t = 1 * a.data.point2 + 1 * a.data.point3 + 1 * a.data.point4;
        console.log("calc:" + t);
        var e = (t / 3).toFixed(0);
        console.log("point1:" + e);
        var o = a.data.starUrl1;
        o = a.star(o, e), a.setData({
            point1: e,
            starUrl1: o
        });
    },
    initStar: function() {
        var t = a.data.evaluates, e = a.data.starUrl1, o = a.data.starUrl2, r = a.data.starUrl3, s = a.data.starUrl4;
        e = a.star(e, 5), o = a.star(o, 5), r = a.star(r, 5), s = a.star(s, 5);
        for (var n = 0; n < 4; n++) {
            if (0 == n) {
                d = {
                    title: "满意度评分",
                    starUrl: e
                };
                t[0] = d;
            }
            if (1 == n) {
                d = {
                    title: "菜 品 评 分",
                    starUrl: o
                };
                t[1] = d;
            }
            if (2 == n) {
                d = {
                    title: "服 务 评 分",
                    starUrl: r
                };
                t[2] = d;
            }
            if (3 == n) {
                var d = {
                    title: "配 送 评 分",
                    starUrl: s
                };
                t[3] = d;
            }
        }
        a.setData({
            evaluates: t,
            starUrl1: e,
            starUrl2: o,
            starUrl3: r,
            starUrl4: s
        });
    },
    star: function(a, t) {
        for (var e = 0; e < 5; e++) a[e] = e < t ? {
            star: "../../../../../images/star.png"
        } : {
            star: "../../../../../images/emptyStar.png"
        };
        return a;
    },
    makeStar: function(t, e) {
        var o = a.data.evaluates, r = a.data.starUrl1, s = a.data.starUrl2, n = a.data.starUrl3, d = a.data.starUrl4;
        1 == t && (r = a.star(r, e)), 2 == t && (s = a.star(s, e)), 3 == t && (n = a.star(n, e)), 
        4 == t && (d = a.star(d, e));
        for (var i = 0; i < 4; i++) {
            if (0 == i) {
                l = {
                    title: "满意度评分",
                    starUrl: r
                };
                o[0] = l;
            }
            if (1 == i) {
                l = {
                    title: "菜 品 评 分",
                    starUrl: s
                };
                o[1] = l;
            }
            if (2 == i) {
                l = {
                    title: "服 务 评 分",
                    starUrl: n
                };
                o[2] = l;
            }
            if (3 == i) {
                var l = {
                    title: "配 送 评 分",
                    starUrl: d
                };
                o[3] = l;
            }
        }
        a.setData({
            evaluates: o,
            starUrl1: r,
            starUrl2: s,
            starUrl3: n,
            starUrl4: d
        });
    }
});