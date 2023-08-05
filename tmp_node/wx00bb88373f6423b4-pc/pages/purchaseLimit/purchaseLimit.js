var t = getApp();

require("../../components/utils/imgutil.js"), require("../../components/utils/util.js"), 
require("../shop/ShopUtil.js");

Page({
    url: !1,
    onShareAppMessage: function() {
        return t.shareAppMessage("/pages/purchaseLimit/purchaseLimit");
    },
    data: {
        baseUrl: t.globalData.siteBaseUrl,
        page: 1,
        reload: !0,
        showNoMore: !1,
        buttonClicked: !1,
        currentIndex: "",
        categoryStatus: "",
        interval: null,
        SecondKillTime: {
            hours: 0,
            minutes: 0,
            seconds: 0,
            remaining_time: 0
        },
        offsetDis: 0,
        categoryList: [],
        productListByCate: {},
        secKillProducts: []
    },
    onLoad: function() {
        var t = this;
        t.getScrollHeight(), t.loadBaseSecKillMsg();
    },
    onShow: function() {},
    getScrollHeight: function() {
        this.setData({
            scrollHeight: wx.getSystemInfoSync().windowHeight
        });
    },
    initBaseInfo: function() {
        var t = this;
        t.data.currentPinTuanId = t.data.pintuanCategory[0].id, t.pinTuanColByCate(t.data.currentPinTuanId);
        var a = t.data.pintuanCategory[0].remain_start_time, e = t.data.pintuanCategory[0].remain_end_time, i = t.data.pintuanCategory[0].status;
        2 == i ? (t.setData({
            categoryState: i
        }), clearInterval(t.data.interval), t.data.interval = setInterval(function() {
            --e <= 0 && (e = 0, t.loadBasePinTuanMsg(), clearInterval(t.data.interval)), t.forMatterTime(e);
        }, 1e3)) : 1 == i && (t.setData({
            categoryState: i
        }), clearInterval(t.data.interval), t.data.interval = setInterval(function() {
            --a <= 0 && (a = 0, t.loadBasePinTuanMsg(), clearInterval(t.data.interval)), t.forMatterTime(a);
        }, 1e3));
    },
    loadBaseSecKillMsg: function() {
        var a = this;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/SecKill&a=getCategory",
            method: "GET",
            success: function(t) {
                if (200 != t.code) console.log("getSecKillCategory fail：" + t.msg); else {
                    for (var e = 0; e < t.data.categoryList.length; e++) t.data.categoryList[e].remain_start_time > Math.ceil(new Date().getTime() / 1e3) ? t.data.categoryList[e].status = 1 : t.data.categoryList[e].remain_start_time < Math.ceil(new Date().getTime() / 1e3) && t.data.categoryList[e].remain_end_time > Math.ceil(new Date().getTime() / 1e3) ? t.data.categoryList[e].status = 2 : t.data.categoryList[e].remain_end_time < Math.ceil(new Date().getTime() / 1e3) && (t.data.categoryList[e].status = 3);
                    a.setData({
                        categoryList: t.data.categoryList
                    }), a.getInitMsg();
                }
            },
            fail: function(t) {
                console.log("getSecKillCategory fail");
            }
        });
    },
    forMatterTime: function(t) {
        var a = parseInt(t / 60 / 60 % 24, 10), e = parseInt(t / 60 % 60, 10), i = parseInt(t % 60, 10);
        a = this.checkTime(a), e = this.checkTime(e), i = this.checkTime(i), this.setData({
            SecondKillTime: {
                hours: a,
                minutes: e,
                seconds: i
            }
        });
    },
    checkTime: function(t) {
        return t < 10 && (t = "0" + t), t;
    },
    hasCategoryPro: function(t) {
        for (var a = 0; a < this.data.secKillProducts.length; a++) if (this.data.secKillProducts[a].id == t) return !1;
        return !0;
    },
    moreSecKillPro: function() {
        var a = this, e = a.data.productListByCate.id, i = a.data.reload, r = Math.ceil(a.data.productListByCate.data.length / 20) + 1;
        i && (a.setData({
            reload: !1
        }), t.sendRequest({
            url: "/index.php?c=front/WxApp/SecKill&a=getProductsList&activeId=" + e + "&page=" + r,
            method: "GET",
            success: function(t) {
                if (4800 == t.code || 5806 == t.code) console.log("getSecKillColByCate fail：" + t.msg), 
                a.setData({
                    reload: !1,
                    showNoMore: !0
                }); else if (0 != t.data.result.length) {
                    for (r = 0; r < t.data.result.length; r++) {
                        t.data.result[r].status = a.data.categoryStatus;
                        var i = t.data.result[r];
                        0 == i.amount ? (i.remainPercent = "100%", i.progressLen = 208) : (i.remainPercent = Math.floor((i.productQuantity - i.amount) / i.productQuantity * 100) + "%", 
                        i.progressLen = (i.productQuantity - i.amount) / i.productQuantity * 208);
                    }
                    for (var r = 0; r < a.data.secKillProducts.length; r++) a.data.secKillProducts[r].id == e && (a.data.secKillProducts[r].data = a.data.secKillProducts[r].data.concat(t.data.result), 
                    a.setData({
                        secKillProducts: a.data.secKillProducts
                    }));
                    a.setData({
                        productListByCate: {
                            id: e,
                            data: a.data.productListByCate.data.concat(t.data.result)
                        },
                        reload: !0,
                        secKillProducts: a.data.secKillProducts
                    });
                }
            },
            fail: function(t) {
                console.log("getSecKillColByCate fail");
            }
        }));
    },
    changeCategorySite: function(a) {
        var e = a.currentTarget.dataset.index, i = this;
        if (clearInterval(i.data.interval), i.data.currentIndex != e) {
            i.setData({
                reload: !0
            });
            var r = 0, s = a.currentTarget.dataset.id;
            i.hasCategoryPro(s) && t.sendRequest({
                url: "/index.php?c=front/WxApp/SecKill&a=getProductsList&activeId=" + s + "&page=1",
                method: "GET",
                success: function(t) {
                    if (200 != t.code) console.log("getSecKillColByCate fail"); else {
                        for (r = 0; r < t.data.result.length; r++) {
                            var a = t.data.result[r];
                            0 == a.amount ? (a.remainPercent = "100%", a.progressLen = 208) : (a.remainPercent = Math.floor((a.productQuantity - a.amount) / a.productQuantity * 100) + "%", 
                            a.progressLen = (a.productQuantity - a.amount) / a.productQuantity * 208), a.status = i.data.categoryList[e].status;
                        }
                        i.data.secKillProducts.push({
                            id: s,
                            data: t.data.result
                        });
                        for (var r = 0; r < i.data.secKillProducts.length; r++) i.data.secKillProducts[r].id == s && i.setData({
                            productListByCate: {
                                id: s,
                                data: i.data.secKillProducts[r].data
                            }
                        });
                    }
                },
                fail: function(t) {
                    console.log("getsecKillColByCate fail");
                }
            });
            for (var o = 0; o < i.data.secKillProducts.length; o++) i.data.secKillProducts[o].id == s && i.setData({
                productListByCate: {
                    id: s,
                    data: i.data.secKillProducts[o].data
                }
            });
            t.sendRequest({
                url: "/index.php?c=front/WxApp/SecKill&a=getCategory",
                method: "GET",
                success: function(t) {
                    if (200 != t.code) console.log("getSecKillCategory fail：" + t.msg); else {
                        for (var a = 0; a < t.data.categoryList.length; a++) t.data.categoryList[a].remain_start_time > Math.ceil(new Date().getTime() / 1e3) ? t.data.categoryList[a].status = 1 : t.data.categoryList[a].remain_start_time < Math.ceil(new Date().getTime() / 1e3) && t.data.categoryList[a].remain_end_time > Math.ceil(new Date().getTime() / 1e3) ? t.data.categoryList[a].status = 2 : t.data.categoryList[a].remain_end_time < Math.ceil(new Date().getTime() / 1e3) && (t.data.categoryList[a].status = 3), 
                        e == a && (1 == t.data.categoryList[e].status ? r = t.data.categoryList[e].time : 2 == t.data.categoryList[e].status && (r = t.data.categoryList[e].remaining_time));
                        clearInterval(i.data.interval), 0 != r && (i.data.interval = setInterval(function() {
                            r--, i.forMatterTime(r), r <= 0 && (clearInterval(i.data.interval), i.loadBaseSecKillMsg());
                        }, 1e3));
                    }
                },
                fail: function(t) {
                    console.log("getPintuanCategory fail");
                }
            });
            var n;
            n = e >= 3 ? 170 * (e - 2) / 2 + 30 : 0, i.setData({
                offsetDis: n,
                currentIndex: e,
                categoryStatus: this.data.categoryList[e].status,
                showNoMore: !1
            });
        }
    },
    getInitMsg: function() {
        for (var a = 0, e = 0, i = this, r = !1, s = 0; s < i.data.categoryList.length; s++) {
            if (2 == i.data.categoryList[s].status) {
                r = !0;
                o = i.data.categoryList[a].remaining_time;
                e = i.data.categoryList[a].id, i.data.interval = setInterval(function() {
                    o--, i.forMatterTime(o), o <= 0 && (clearInterval(i.data.interval), i.loadBaseSecKillMsg());
                }, 1e3);
                break;
            }
            a++;
        }
        if (0 == r) {
            for (var a = 0, s = 0; s < i.data.categoryList.length; s++) {
                if (1 == i.data.categoryList[s].status) {
                    r = !0;
                    var o = i.data.categoryList[a].time;
                    e = i.data.categoryList[a].id, i.data.interval = setInterval(function() {
                        o--, i.forMatterTime(o), o <= 0 && (clearInterval(i.data.interval), i.loadBaseSecKillMsg());
                    }, 1e3);
                    break;
                }
                a++;
            }
            0 == r && (e = i.data.categoryList[0].id);
        }
        t.sendRequest({
            url: "/index.php?c=front/WxApp/SecKill&a=getProductsList&activeId=" + e + "&page=1",
            method: "GET",
            success: function(t) {
                if (200 != t.code) console.log("getSecKillColByCate fail"); else {
                    for (var r = 0; r < t.data.result.length; r++) {
                        var s = t.data.result[r];
                        0 == s.amount ? (s.remainPercent = "100%", s.progressLen = 208) : (s.remainPercent = Math.floor((s.productQuantity - s.amount) / s.productQuantity * 100) + "%", 
                        s.progressLen = (s.productQuantity - s.amount) / s.productQuantity * 208), s.status = i.data.categoryList[a].status;
                    }
                    var o;
                    o = a >= 3 ? 170 * (a - 2) / 2 + 30 : 0, i.setData({
                        productListByCate: {
                            id: e,
                            data: t.data.result
                        },
                        categoryStatus: i.data.categoryList[a].status,
                        offsetDis: o
                    }), i.data.secKillProducts.push({
                        id: e,
                        data: t.data.result
                    });
                    var n = i.data.productListByCate;
                    i.setData({
                        productListByCate: n,
                        currentIndex: a
                    });
                }
            },
            fail: function(t) {
                console.log("getSecKillColByCate fail");
            }
        });
    },
    goSecKillProDetail: function(t) {
        var a = this;
        a.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            a.setData({
                buttonClicked: !1
            });
        }, 500), wx.navigateTo({
            url: "./productdetail?ms_id=" + t.currentTarget.dataset.msid + "&ms_proid=" + t.currentTarget.dataset.msproid + "&proid=" + t.currentTarget.dataset.proid
        });
    },
    goProductDetail: function(t) {
        console.log(t);
        var a = this;
        a.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            a.setData({
                buttonClicked: !1
            });
        }, 500), wx.navigateTo({
            url: "../shop/productdetail?id=" + t.currentTarget.dataset.proid
        });
    }
});