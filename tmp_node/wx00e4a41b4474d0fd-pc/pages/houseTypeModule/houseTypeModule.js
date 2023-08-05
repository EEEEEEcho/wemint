function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function i(n, r) {
                try {
                    var s = t[n](r), u = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!s.done) return Promise.resolve(u).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(u);
            }
            return i("next");
        });
    };
}

var a, i = e(require("../../lib/runtime")), n = e(require("../../lib/requestConfig")), r = e(require("../../utils/monitor.js")), s = "", u = require("../../utils/util.js"), o = getApp(), l = require("../../config.js");

Page({
    data: {
        currentWindowsWidth: "",
        currentTab: 0,
        scrollLeft: 0,
        titleStyle: "",
        despage: "houseTypeModule",
        currentBuildIdx: 0,
        serverUrl: "http://skyforest.static.elab-plus.com/wepy_pro/v1-2/",
        list: [],
        active: 0,
        houseList: [],
        currentName: "",
        listStyleLength: null,
        buildingId: "",
        showPhoneModel: !1,
        showInfoModel: !1,
        currentBuildId: null
    },
    calculateTitleStyle: function() {
        var e = this.data.list.length, t = void 0;
        t = e > 4 ? " margin:0 36rpx;" : "width:" + 750 / e + "rpx", this.setData({
            titleStyle: t
        });
    },
    afterPhoneHandle: function(e) {
        if (e.detail) {
            this.setData({
                showPhoneModel: !1
            });
            var t = {
                clkDesPage: this.data.despage || "",
                type: "CLK",
                pvCurPageName: this.data.despage || "",
                pvCurPageParams: s,
                clkId: "clk_2cmina_137",
                clkName: "weixinshouquan",
                clkParams: {
                    "wx.authorize.scope": "wx.getPhoneNum",
                    type: e.detail.type
                }
            };
            u.trackRequest(t);
        }
    },
    afterUserHandle: function(e) {
        if (e.detail) {
            this.setData({
                showInfoModel: !1
            });
            var t = {
                clkDesPage: this.data.despage || "",
                type: "CLK",
                pvCurPageName: this.data.despage || "",
                pvCurPageParams: s,
                clkId: "clk_2cmina_137",
                clkName: "weixinshouquan",
                clkParams: {
                    "wx.authorize.scope": "wx.getUserInfo",
                    type: e.detail.type
                }
            };
            u.trackRequest(t);
        }
    },
    switchTab: function(e) {
        this.setData({
            currentTab: e.detail.current,
            currentBuildIdx: e.detail.current
        }), this.checkCor(), this.getHouseList();
    },
    swichNav: function(e) {
        var t = e.currentTarget.dataset.current;
        if (this.data.currentTab == t) return !1;
        this.setData({
            currentTab: t,
            currentBuildIdx: t
        });
        var a = {
            clkId: "clk_2cmina_29",
            clkDesPage: "",
            clkName: "loudongxuanze",
            type: "CLK",
            clkParams: {
                buildingId: e.currentTarget.dataset.id,
                buildingName: e.currentTarget.dataset.name
            },
            pvCurPageName: "houseTypeModule",
            pvCurPageParams: s
        };
        u.trackRequest(a), this.setData({
            active: e.target.id
        }), this.getHouseList();
    },
    checkCor: function() {
        this.data.currentTab > 3 ? this.setData({
            scrollLeft: 650
        }) : this.setData({
            scrollLeft: 0
        });
    },
    getSystemInformation: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                var a = t.windowHeight * (750 / t.windowWidth) - 180;
                console.log("onLoad:" + a), e.setData({
                    currentWindowsWidth: a
                });
            }
        });
    },
    getList: function() {
        var e = this;
        return t(i.default.mark(function t() {
            var a, r, s, o, d, c;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a = e, t.next = 3, (0, n.default)("listBuilding", {
                        houseId: l.houseId
                    });

                  case 3:
                    if (r = t.sent, e.myLoading && e.myLoading.hideLoading(), !(r && r.success && r.list && r.list.length > 0)) {
                        t.next = 22;
                        break;
                    }
                    e.setData({
                        list: r.list || []
                    }), s = 0, t.t0 = i.default.keys(r.list);

                  case 9:
                    if ((t.t1 = t.t0()).done) {
                        t.next = 17;
                        break;
                    }
                    if (o = t.t1.value, (d = r.list[o]).id != e.data.currentBuildId) {
                        t.next = 15;
                        break;
                    }
                    return s = o, t.abrupt("break", 17);

                  case 15:
                    t.next = 9;
                    break;

                  case 17:
                    e.setData({
                        currentTab: s,
                        currentBuildIdx: s
                    }), e.calculateTitleStyle(), e.getHouseList(), t.next = 25;
                    break;

                  case 22:
                    c = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "houseTypeModule.js-getList",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(r) + ";houseId=" + l.houseId
                    }, u.trackRequest(c), wx.showToast({
                        title: r.message || "网络错误",
                        icon: "warn",
                        duration: 1500
                    });

                  case 25:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    tabVr: function(e) {
        var t = e.currentTarget.dataset.item || "";
        t.vrUrl && "null" != t.vrUrl && "undefined" != t.vrUrl && wx.navigateTo({
            url: "../webView/webView?view=" + encodeURIComponent(t.vrUrl),
            success: function() {},
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getHouseList: function() {
        var e = this;
        return t(i.default.mark(function t() {
            var a, r, s, o, d;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a = e.data.list, r = a[e.data.currentBuildIdx].id, s = a[e.data.currentBuildIdx].name, 
                    e.data.buildingId = r, e.setData({
                        currentName: s
                    }), t.next = 7, (0, n.default)("pageListLayoutByBuilding", {
                        houseId: l.houseId,
                        buildingId: r
                    });

                  case 7:
                    (o = t.sent) && o.success && o.pageModel.resultSet ? (e.setData({
                        houseList: o.pageModel.resultSet || []
                    }), e.calculateListLength()) : (e.setData({
                        houseList: []
                    }), d = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "houseTypeModule.js-getHouseList",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(o) + ";houseId=" + l.houseId + ";buildingId=" + r
                    }, u.trackRequest(d), wx.showToast({
                        title: o.message || "网络错误",
                        icon: "warn",
                        duration: 1500
                    }));

                  case 9:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    calculateListLength: function() {
        var e = "height:" + 410 * this.data.houseList.length + "rpx";
        this.setData({
            listStyleLength: e
        });
    },
    pageScrollListener: function(e) {},
    checkOutHouse: function(e) {
        var t = {
            clkId: "clk_2cmina_29",
            clkDesPage: "",
            clkName: "loudongxuanze",
            type: "CLK",
            clkParams: {
                buildingId: e.currentTarget.dataset.id,
                buildingName: e.currentTarget.dataset.name
            },
            pvCurPageName: "houseTypeModule",
            pvCurPageParams: s
        };
        u.trackRequest(t), this.setData({
            active: e.target.id
        }), this.getHouseList();
    },
    goDetail: function(e) {
        var t = e.currentTarget.dataset.id, a = e.currentTarget.dataset.index, i = {
            houseList: this.data.houseList,
            currentName: this.data.currentName,
            id: t,
            index: a,
            buildingId: this.data.buildingId
        }, n = {
            clkId: "clk_2cmina_30",
            clkName: "houseTypeDetail",
            clkDesPage: "houseTypeDetailModule",
            type: "CLK",
            clkParams: {
                houseType: t,
                buildingId: this.data.buildingId || ""
            },
            pvCurPageName: "houseTypeModule",
            pvCurPageParams: s
        };
        u.trackRequest(n), o.globalData.houseTypeDetail = i, wx.navigateTo({
            url: "../houseTypeDetailModule/houseTypeDetailModule?houseType=" + t + "&buildid=" + this.data.buildingId
        });
    },
    goChatList: function(e) {
        wx.navigateTo({
            url: "../counselorList/counselorList"
        });
    },
    onShow: function(e) {
        r.default.pageShow(), console.log(JSON.stringify("onShow:" + e)), a = new Date().getTime(), 
        o.login(function() {
            var e = {
                pvId: "P_2cMINA_9",
                type: "PV",
                pvCurPageName: "houseTypeModule",
                pvLastPageName: o.globalData.pageDesc || "",
                pvCurPageParams: s,
                pvPageLoadTime: new Date().getTime() - a
            };
            u.trackRequest(e), o.authorizeSet();
        });
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: "户型"
        });
    },
    onUnload: function() {
        u.stopTrackEventTimeObj();
        var e = {
            pvPageStayTime: (new Date().getTime() - a) / 1e3,
            pvCurPageName: this.data.despage || "",
            clkDesPage: "zhuye",
            clkName: "fanhui",
            clkId: "clk_2cmina_36",
            clkParams: {},
            type: "CLK"
        };
        u.trackRequest(e);
    },
    onHide: function() {
        u.stopTrackEventTimeObj();
    },
    getCurrentPageParam: function() {
        return s;
    },
    onLoad: function(e) {
        this.myLoading = this.selectComponent("#myLoading"), this.myLoading && this.myLoading.showLoading(), 
        e && e.shareToken && "null" != e.shareToken && "undefined" != e.shareToken && (o.globalData.fromChannel = e.shareToken), 
        e && e.buildid && this.setData({
            currentBuildId: e.buildid
        }), s = JSON.stringify(e), this.getSystemInformation(), this.getList();
    }
}, r.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));