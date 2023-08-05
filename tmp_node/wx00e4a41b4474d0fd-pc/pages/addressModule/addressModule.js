function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, a) {
            function i(r, n) {
                try {
                    var s = e[r](n), c = s.value;
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    return void a(t);
                }
                if (!s.done) return Promise.resolve(c).then(function(t) {
                    i("next", t);
                }, function(t) {
                    i("throw", t);
                });
                t(c);
            }
            return i("next");
        });
    };
}

var a = t(require("../../lib/runtime")), i = t(require("../../lib/requestConfig")), r = require("../../config.js"), n = getApp(), s = require("../../utils/util.js"), c = null, o = void 0;

Page({
    data: {
        searchLetter: [ "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z" ],
        showLetter: "",
        winHeight: 0,
        cityList: [],
        isShowLetter: !1,
        scrollTop: 0,
        scrollTopId: "",
        currentCity: "",
        hotCityList: [],
        navbar: {
            showCapsule: 1,
            title: "切换城市",
            titleColor: "#fff",
            navPadding: 1,
            navBarColor: "#272A34",
            navBackColor: "#fff",
            haveCallback: !1,
            fromShare: !1,
            pageId: null,
            pageName: "addressModule.js"
        },
        cityHistoryList: [],
        selectCityCode: "",
        showSearchListView: !0,
        searchResultList: [],
        resultCityList: [],
        hasNoSearch: !1,
        currentCityCode: ""
    },
    onLoad: function(t) {
        n.globalData.selectNewCity = !1, c = JSON.stringify(t), this.handleSearchModuleView();
    },
    getCurrentPageParam: function() {
        return c;
    },
    getCityLocationInformation: function(t) {
        var e = this, a = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + t.latitude + "," + t.longitude + "&key=C7PBZ-GFTR6-XFHS5-M7NSM-ROHZT-7JF7C&get_poi=1";
        wx.request({
            url: a,
            headers: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                e.setData({
                    currentCity: t.data.result.address_component.city
                }), console.log("getCityLocationInformation:" + JSON.stringify(t));
            }
        });
    },
    handleSearchModuleView: function() {
        var t = this;
        return e(a.default.mark(function e() {
            var s, c, o, u;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return s = t, c = t.data.searchLetter, o = {
                        houseId: r.houseId,
                        customerId: n.globalData.single && n.globalData.single.id ? n.globalData.single.id : ""
                    }, e.next = 5, (0, i.default)("selectCityHistory", o, !0);

                  case 5:
                    (u = e.sent).success && u.single && (u.single.currentCity && s.setData({
                        currentCity: u.single.currentCity,
                        currentCityCode: u.single.currentCityCode
                    }), u.single.cityHistory && s.setData({
                        cityHistoryList: u.single.cityHistory
                    })), wx.request({
                        url: "https://dm.static.elab-plus.com/GroupMini/cityCodeLists.json",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        success: function(t) {
                            if (200 === t.statusCode) {
                                var e = s.handleCityList(t.data);
                                s.setData({
                                    resultCityList: t.data,
                                    cityList: e
                                });
                                var a = wx.getSystemInfoSync().windowHeight, i = a / c.length, r = [];
                                for (var n in c) {
                                    var o = {};
                                    o.name = c[n], o.tHeight = n * i, o.bHeight = (n + 1) * i, r.push(o);
                                }
                                s.setData({
                                    winHeight: a,
                                    itemH: i,
                                    searchLetter: r
                                }), s.getHotCityList();
                            }
                        },
                        fail: function(t) {
                            console.log("handleSearchModuleView:" + JSON.stringify(t));
                        }
                    });

                  case 8:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    getHotCityList: function() {
        var t = this;
        return e(a.default.mark(function e() {
            var s, c, o, u, l, d, h, y, g, f, C, v, p, m, w, k, L;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return s = {
                        houseId: r.houseId,
                        name: "",
                        type: "hot_city"
                    }, e.next = 3, (0, i.default)("queryEnumList", s, !0);

                  case 3:
                    if (c = e.sent, t.setData({
                        hotCityList: []
                    }), !c || !c.success) {
                        e.next = 62;
                        break;
                    }
                    if (o = [], c.list && 0 != c.list.length) {
                        e.next = 40;
                        break;
                    }
                    u = !0, l = !1, d = void 0, e.prev = 11, h = t.data.resultCityList[Symbol.iterator]();

                  case 13:
                    if (u = (y = h.next()).done) {
                        e.next = 24;
                        break;
                    }
                    if (!((g = y.value).city.indexOf(n.globalData.projectCity) >= 0)) {
                        e.next = 21;
                        break;
                    }
                    return f = {}, f.city = g.city, f.cityCode = g.code, o.push(f), e.abrupt("break", 24);

                  case 21:
                    u = !0, e.next = 13;
                    break;

                  case 24:
                    e.next = 30;
                    break;

                  case 26:
                    e.prev = 26, e.t0 = e.catch(11), l = !0, d = e.t0;

                  case 30:
                    e.prev = 30, e.prev = 31, !u && h.return && h.return();

                  case 33:
                    if (e.prev = 33, !l) {
                        e.next = 36;
                        break;
                    }
                    throw d;

                  case 36:
                    return e.finish(33);

                  case 37:
                    return e.finish(30);

                  case 38:
                    e.next = 59;
                    break;

                  case 40:
                    for (C = !0, v = !1, p = void 0, e.prev = 43, m = c.list[Symbol.iterator](); !(C = (w = m.next()).done); C = !0) k = w.value, 
                    (L = {}).city = k.name, L.cityCode = k.value, o.push(L);
                    e.next = 51;
                    break;

                  case 47:
                    e.prev = 47, e.t1 = e.catch(43), v = !0, p = e.t1;

                  case 51:
                    e.prev = 51, e.prev = 52, !C && m.return && m.return();

                  case 54:
                    if (e.prev = 54, !v) {
                        e.next = 57;
                        break;
                    }
                    throw p;

                  case 57:
                    return e.finish(54);

                  case 58:
                    return e.finish(51);

                  case 59:
                    t.setData({
                        hotCityList: o
                    }), e.next = 63;
                    break;

                  case 62:
                    console.log("获取基础数据配置信息失败", c);

                  case 63:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 11, 26, 30, 38 ], [ 31, , 33, 37 ], [ 43, 47, 51, 59 ], [ 52, , 54, 58 ] ]);
        }))();
    },
    handleCityList: function(t) {
        var e = [], a = this.data.searchLetter, i = !0, r = !1, n = void 0;
        try {
            for (var s, c = a[Symbol.iterator](); !(i = (s = c.next()).done); i = !0) {
                var o = s.value, u = [], l = {};
                l.initial = o;
                var d = !0, h = !1, y = void 0;
                try {
                    for (var g, f = t[Symbol.iterator](); !(d = (g = f.next()).done); d = !0) {
                        var C = g.value;
                        o == C.initial && u.push(C);
                    }
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    h = !0, y = t;
                } finally {
                    try {
                        !d && f.return && f.return();
                    } finally {
                        if (h) throw y;
                    }
                }
                l.cityInfo = u, e.push(l);
            }
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            r = !0, n = t;
        } finally {
            try {
                !i && c.return && c.return();
            } finally {
                if (r) throw n;
            }
        }
        return e;
    },
    onReady: function() {},
    onShow: function() {
        o = new Date().getTime(), wx.hideShareMenu();
        var t = {
            ip: n.globalData.ip,
            type: "PV",
            pvId: "p_2cmina_73",
            pvCurPageName: "dingweichengshi",
            pvCurPageParams: c,
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - o
        };
        s.trackRequest(t, n);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    letterClkFuc: function(t) {
        console.log(t.currentTarget.dataset.letter);
        var e = t.currentTarget.dataset.letter;
        this.setData({
            showLetter: e,
            isShowLetter: !0,
            scrollTopId: e
        });
        var a = this;
        setTimeout(function() {
            a.setData({
                isShowLetter: !1
            });
        }, 1e3);
    },
    bindCurrentCity: function(t) {
        var e = {
            type: "CLK",
            pvCurPageName: "dingweichengshi",
            pvCurPageParams: c,
            clkId: "clk_2cmina_202",
            clkName: "dangqiandingweichengshi",
            clkParams: {
                city: this.data.currentCity
            }
        };
        s.trackRequest(e, n), this.setData({
            selectCityCode: t.currentTarget.dataset.citycode
        }), this.navigateBackFuc();
    },
    bindHistoryCity: function(t) {
        this.setData({
            currentCity: t.currentTarget.dataset.city,
            selectCityCode: t.currentTarget.dataset.citycode
        }), this.navigateBackFuc();
    },
    bindHotCity: function(t) {
        var e = {
            type: "CLK",
            pvCurPageName: "dingweichengshi",
            pvCurPageParams: c,
            clkId: "clk_2cmina_203",
            clkName: "guoneiremenchengshi",
            clkParams: {
                city: t.currentTarget.dataset.city
            }
        };
        s.trackRequest(e, n), this.setData({
            currentCity: t.currentTarget.dataset.city,
            selectCityCode: t.currentTarget.dataset.citycode
        }), this.navigateBackFuc();
    },
    bindCity: function(t) {
        var e = {
            type: "CLK",
            pvCurPageName: "dingweichengshi",
            pvCurPageParams: c,
            clkId: "clk_2cmina_204",
            clkName: "chengshiliebiao",
            clkParams: {
                city: t.currentTarget.dataset.city
            }
        };
        s.trackRequest(e, n), this.setData({
            currentCity: t.currentTarget.dataset.city,
            selectCityCode: t.currentTarget.dataset.citycode
        }), this.navigateBackFuc();
    },
    bindCityFromSearch: function(t) {
        console.log("bindCityFromSearch:" + JSON.stringify(t)), this.setData({
            currentCity: t.currentTarget.dataset.city,
            selectCityCode: t.currentTarget.dataset.citycode
        }), this.navigateBackFuc();
    },
    hotCity: function() {
        this.setData({
            scrollTop: 0
        });
    },
    startSearchFuc: function(t) {
        console.log("startSearchFuc:" + JSON.stringify(t));
        var e = t.detail.value;
        this.setData({
            searchResultList: []
        });
        var a = [], i = !0, r = !1, o = void 0;
        try {
            for (var u, l = this.data.resultCityList[Symbol.iterator](); !(i = (u = l.next()).done); i = !0) {
                var d = u.value;
                d.city.indexOf(e) >= 0 && a.push(d);
            }
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            r = !0, o = t;
        } finally {
            try {
                !i && l.return && l.return();
            } finally {
                if (r) throw o;
            }
        }
        this.setData({
            searchResultList: a,
            showSearchListView: !1
        }), 0 == a.length && this.setData({
            hasNoSearch: !0
        });
        var h = {
            type: "CLK",
            pvCurPageName: "dingweichengshi",
            pvCurPageParams: c,
            clkId: "clk_2cmina_201",
            clkName: "sousuoshurukuang",
            clkParams: {
                keyword: e
            }
        };
        s.trackRequest(h, n);
    },
    inputValueChange: function(t) {
        console.log("inputValueChange:" + JSON.stringify(t)), t.detail.value && t.detail.value.length > 0 ? this.setData({
            showSearchListView: !1
        }) : this.setData({
            showSearchListView: !0
        }), this.setData({
            hasNoSearch: !1
        });
    },
    navigateBackFuc: function() {
        var t = this;
        return e(a.default.mark(function e() {
            var s, c, o;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return s = t, c = {
                        houseId: r.houseId,
                        city: t.data.currentCity,
                        cityCode: t.data.selectCityCode,
                        customerId: n.globalData.single && n.globalData.single.id ? n.globalData.single.id : ""
                    }, e.next = 4, (0, i.default)("addCityHistory", c, !0);

                  case 4:
                    (o = e.sent).success && wx.navigateBack({
                        success: function() {
                            n.globalData.selectCityCode != s.data.selectCityCode && (n.globalData.selectNewCity = !0), 
                            n.globalData.selectCityCode = s.data.selectCityCode;
                        },
                        fail: function(t) {}
                    });

                  case 6:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    }
});