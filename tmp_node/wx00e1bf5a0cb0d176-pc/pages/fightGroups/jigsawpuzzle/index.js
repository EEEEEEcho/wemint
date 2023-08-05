var a = getApp(), t = (require("../../../components/utils/util.js"), require("../../shop/ShopUtil.js"), 
require("../../../common.js"));

Page({
    url: !1,
    onShareAppMessage: function() {
        return a.shareAppMessage("/pages/fightGroups/jigsawpuzzle");
    },
    data: {
        baseUrl: a.globalData.siteBaseUrl,
        pintuanCategory: [],
        currentIndex: 0,
        startTime: 0,
        endTime: 0,
        categoryState: 0,
        currentPinTuanId: 0,
        interval: null,
        kaiTuanTime: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        pinTuanProducts: [],
        pinTuanProByCate: {},
        scrollHeight: 0,
        page: 1,
        reload: !0,
        showNoMore: !1,
        buttonClicked: !1,
        pullDownRefreshFlag: !0
    },
    onLoad: function(a) {
        var e = this;
        e.getScrollHeight(), e.loadBasePinTuanMsg(), t.setPopupFromShare(), e.setData({
            queryparams: a
        });
    },
    onPullDownRefresh: function() {
        var a = this;
        a.data.pullDownRefreshFlag && (console.log(a.data), a.setData({
            pullDownRefreshFlag: !1
        }), a.data.pullDownRefreshFlag = !1, a.data.queryparams.refresh = !0, setTimeout(function() {
            a.onLoad(a.data.queryparams), a.setData({
                pullDownRefreshFlag: !0
            }), wx.stopPullDownRefresh();
        }, 1500));
    },
    onShow: function() {},
    getScrollHeight: function() {
        this.setData({
            scrollHeight: wx.getSystemInfoSync().windowHeight
        });
    },
    initBaseInfo: function() {
        var a = this;
        a.data.currentPinTuanId = a.data.pintuanCategory[0].id, a.pinTuanColByCate(a.data.currentPinTuanId);
        var t = a.data.pintuanCategory[0].remain_start_time, e = a.data.pintuanCategory[0].remain_end_time, n = a.data.pintuanCategory[0].status;
        2 == n ? (a.setData({
            categoryState: n
        }), clearInterval(a.data.interval), a.data.interval = setInterval(function() {
            --e <= 0 && (e = 0, a.loadBasePinTuanMsg(), console.log("111"), clearInterval(a.data.interval)), 
            a.forMatterTime(e);
        }, 1e3)) : 1 == n && (a.setData({
            categoryState: n
        }), clearInterval(a.data.interval), a.data.interval = setInterval(function() {
            --t <= 0 && (t = 0, a.loadBasePinTuanMsg(), clearInterval(a.data.interval)), a.forMatterTime(t);
        }, 1e3));
    },
    pinTuanColByCate: function(t) {
        var e = this;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/pintuan&a=getProductsList&pintuan_id=" + t + "&page=1",
            method: "GET",
            success: function(a) {
                a.success ? (e.setData({
                    pinTuanProByCate: {
                        id: t,
                        data: a.data
                    }
                }), e.data.pinTuanProducts.push({
                    id: e.data.pintuanCategory[0].id,
                    data: a.data
                })) : console.log("getpinTuanColByCate fail：" + a.msg), e.data.pinTuanProByCate.data.length <= 2 ? e.setData({
                    proOnly: !0
                }) : e.setData({
                    proOnly: !1
                });
            },
            fail: function(a) {
                console.log("getpinTuanColByCate fail");
            }
        });
    },
    loadBasePinTuanMsg: function() {
        var t = this;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/pintuan&a=getCategory",
            method: "GET",
            success: function(a) {
                if (a.success) {
                    for (var e = 0; e < a.data.length; e++) a.data[e].name.length > 4 && (a.data[e].name = a.data[e].name.substring(0, 4));
                    t.data.pintuanCategory = a.data, t.setData({
                        pintuanCategory: a.data
                    }), 0 !== a.data.length && t.initBaseInfo();
                } else console.log("getPintuanCategory fail：" + a.msg);
            },
            fail: function(a) {
                console.log("getPintuanCategory fail");
            }
        });
    },
    forMatterTime: function(a) {
        var t = parseInt(a / 60 / 60 / 24, 10), e = parseInt(a / 60 / 60 % 24, 10), n = parseInt(a / 60 % 60, 10), r = parseInt(a % 60, 10);
        t = this.checkTime(t), e = this.checkTime(e), n = this.checkTime(n), r = this.checkTime(r), 
        this.setData({
            kaiTuanTime: {
                days: t,
                hours: e,
                minutes: n,
                seconds: r
            }
        });
    },
    checkTime: function(a) {
        return a < 10 && (a = "0" + a), a;
    },
    hasCategoryPro: function(a) {
        for (var t = 0; t < this.data.pinTuanProducts.length; t++) if (this.data.pinTuanProducts[t].id == a) return !1;
        return !0;
    },
    changeCategory: function(t) {
        var e = this;
        e.setData({
            reload: !0
        });
        var n = t.currentTarget.dataset.index, r = t.currentTarget.dataset.id;
        e.hasCategoryPro(r) && a.sendRequest({
            url: "/index.php?c=Front/WxApp/pintuan&a=getProductsList&pintuan_id=" + r + "&page=1",
            method: "GET",
            success: function(a) {
                if (a.success) {
                    e.data.pinTuanProducts.push({
                        id: r,
                        data: a.data
                    });
                    for (var t = 0; t < e.data.pinTuanProducts.length; t++) e.data.pinTuanProducts[t].id == r && e.setData({
                        pinTuanProByCate: {
                            id: r,
                            data: e.data.pinTuanProducts[t].data
                        }
                    });
                } else console.log("getpinTuanColByCate fail：" + a.msg);
            },
            fail: function(a) {
                console.log("getpinTuanColByCate fail");
            }
        }), a.sendRequest({
            url: "/index.php?c=Front/WxApp/pintuan&a=getCategory",
            method: "GET",
            success: function(a) {
                if (a.success) {
                    for (var t = 0; t < a.data.length; t++) a.data[t].name.length > 4 && (a.data[t].name = a.data[t].name.substring(0, 4));
                    e.data.pintuanCategory = a.data, e.setData({
                        pintuanCategory: a.data
                    });
                } else console.log("getPintuanCategory fail：" + a.msg);
                e.data.pinTuanProByCate.data.length <= 2 ? e.setData({
                    proOnly: !0
                }) : e.setData({
                    proOnly: !1
                });
            },
            fail: function(a) {
                console.log("getPintuanCategory fail");
            }
        });
        for (var i = 0; i < e.data.pinTuanProducts.length; i++) e.data.pinTuanProducts[i].id == r && (e.data.pinTuanProducts[i].data.length <= 2 ? e.setData({
            proOnly: !0
        }) : e.setData({
            proOnly: !1
        }), e.setData({
            pinTuanProByCate: {
                id: r,
                data: e.data.pinTuanProducts[i].data
            }
        }));
        var o = Math.ceil(e.data.pinTuanProByCate.data.length / 5);
        e.setData({
            page: o
        });
        var s = e.data.pintuanCategory[n].remain_start_time, u = e.data.pintuanCategory[n].remain_end_time, d = e.data.pintuanCategory[n].status;
        2 == d ? (e.setData({
            categoryState: d
        }), clearInterval(e.data.interval), e.data.interval = setInterval(function() {
            --u <= 0 && (u = 0, e.loadBasePinTuanMsg(), console.log("333"), clearInterval(e.data.interval)), 
            e.forMatterTime(u);
        }, 1e3)) : 1 == d && (e.setData({
            categoryState: d
        }), clearInterval(e.data.interval), e.data.interval = setInterval(function() {
            --s <= 0 && (s = 0, e.loadBasePinTuanMsg(), console.log("444"), clearInterval(e.data.interval)), 
            e.forMatterTime(s);
        }, 1e3)), e.setData({
            currentIndex: n
        });
    },
    showTime: function(a, t, e, n) {
        var r = this;
        if (a > e) r.setData({
            categoryState: 0
        }), r.getTimeMsgNoStart(a, e); else if (t > e && e > a) r.setData({
            categoryState: 1
        }), r.getTimeMsgStarting(t, e); else if (e > t) {
            r.setData({
                categoryState: 2
            });
            for (var i = 0; i < r.data.pintuanCategory.length; i++) r.data.pintuanCategory[i].id == n && r.data.pintuanCategory.splice(i, 1);
            var o = r.data.pintuanCategory;
            r.setData({
                pintuanCategory: o
            }), clearInterval(r.data.interval);
        }
    },
    morePinTuanPro: function() {
        var t = this, e = t.data.pinTuanProByCate.id, n = t.data.reload, r = Math.ceil(t.data.pinTuanProByCate.data.length / 5) + 1;
        n && (t.setData({
            reload: !1
        }), a.sendRequest({
            url: "/index.php?c=Front/WxApp/pintuan&a=getProductsList&pintuan_id=" + e + "&page=" + r,
            method: "GET",
            success: function(a) {
                if (a.success) if (0 != a.data.length) {
                    for (var n = 0; n < t.data.pinTuanProducts.length; n++) t.data.pinTuanProducts[n].id == e && (t.data.pinTuanProducts[n].data = t.data.pinTuanProducts[n].data.concat(a.data), 
                    t.setData({
                        pinTuanProducts: t.data.pinTuanProducts
                    }));
                    t.setData({
                        pinTuanProByCate: {
                            id: e,
                            data: t.data.pinTuanProByCate.data.concat(a.data)
                        },
                        reload: !0,
                        pinTuanProducts: t.data.pinTuanProducts
                    });
                } else t.setData({
                    reload: !1,
                    showNoMore: !0
                }); else console.log("getpinTuanColByCate fail：" + a.msg);
            },
            fail: function(a) {
                console.log("getpinTuanColByCate fail");
            }
        }));
    },
    onReachBottom: function() {
        this.morePinTuanPro();
    },
    goPinTuanProDetail: function(a) {
        var t = this;
        t.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            t.setData({
                buttonClicked: !1
            });
        }, 500), wx.navigateTo({
            url: "../productdetail/index?id=" + a.currentTarget.dataset.id + "&pintuan_id=" + t.data.pinTuanProByCate.id + "&buycount=" + a.currentTarget.dataset.buycount + "&img=" + a.currentTarget.dataset.img + "&price=" + a.currentTarget.dataset.price + "&storenum=" + a.currentTarget.dataset.storenum + "&proid=" + a.currentTarget.dataset.proid
        });
    },
    goProductDetail: function(a) {
        var t = this;
        t.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            t.setData({
                buttonClicked: !1
            });
        }, 500), wx.navigateTo({
            url: "../../shop/productdetail?id=" + a.currentTarget.dataset.proid
        });
    }
});