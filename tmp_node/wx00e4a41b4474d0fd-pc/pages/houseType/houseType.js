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
                    var s = t[n](r), o = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!s.done) return Promise.resolve(o).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(o);
            }
            return i("next");
        });
    };
}

var a, i = e(require("../../lib/runtime")), n = e(require("../../lib/requestConfig")), r = e(require("../../utils/monitor.js")), s = "", o = require("../../utils/util.js"), u = getApp(), l = require("../../config.js");

Page({
    data: {
        serverUrl: "http://skyforest.static.elab-plus.com/wepy_pro/v1-2/",
        jbColor1: "#AD7C59",
        jbColor2: "#AD7C59",
        btnColor: "",
        lineColor: "",
        textColor: "",
        shade1: "rgba(39,42,52,0.00)",
        despage: "huxingye",
        shade2: "#272A34",
        list: [],
        active: 0,
        houseList: [],
        currentName: "",
        buildingId: "",
        showPhoneModel: !1,
        showInfoModel: !1,
        buildIndex: null
    },
    getList: function() {
        var e = this;
        return t(i.default.mark(function t() {
            var a, r, s, u, d, c, g;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, n.default)("listBuilding", {
                        houseId: l.houseId
                    });

                  case 2:
                    if (a = t.sent, e.myLoading && e.myLoading.hideLoading(), !(a && a.success && a.list)) {
                        t.next = 25;
                        break;
                    }
                    if (e.setData({
                        list: a.list || []
                    }), r = a.list[0].id, s = a.list[0].name, null == e.data.buildIndex) {
                        t.next = 22;
                        break;
                    }
                    u = 0, t.t0 = i.default.keys(a.list);

                  case 11:
                    if ((t.t1 = t.t0()).done) {
                        t.next = 19;
                        break;
                    }
                    if (d = t.t1.value, (c = a.list[d]).id != e.data.buildIndex) {
                        t.next = 17;
                        break;
                    }
                    return u = d, t.abrupt("break", 19);

                  case 17:
                    t.next = 11;
                    break;

                  case 19:
                    r = a.list[u].id, s = a.list[u].name, e.setData({
                        active: u
                    });

                  case 22:
                    e.getHouseList(r, s), t.next = 28;
                    break;

                  case 25:
                    g = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "houseType.js-getList",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(a) + ";houseId=" + l.houseId
                    }, o.trackRequest(g), wx.showToast({
                        title: a.message || "网络错误",
                        icon: "warn",
                        duration: 1500
                    });

                  case 28:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
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
            o.trackRequest(t);
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
            o.trackRequest(t);
        }
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
    getHouseList: function(e, a) {
        var r = this;
        return t(i.default.mark(function t() {
            var s, u;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return r.setData({
                        currentName: a
                    }), r.data.buildingId = e, t.next = 4, (0, n.default)("pageListLayoutByBuilding", {
                        houseId: l.houseId,
                        buildingId: e
                    });

                  case 4:
                    (s = t.sent) && s.success && s.pageModel.resultSet ? r.setData({
                        houseList: s.pageModel.resultSet || []
                    }) : (r.setData({
                        houseList: []
                    }), u = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "houseType.js-getHouseList",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(s) + ";houseId=" + l.houseId + ";buildingId=" + e
                    }, o.trackRequest(u), wx.showToast({
                        title: s.message || "网络错误",
                        icon: "warn",
                        duration: 1500
                    }));

                  case 6:
                  case "end":
                    return t.stop();
                }
            }, t, r);
        }))();
    },
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
            pvCurPageName: "huxingye",
            pvCurPageParams: s
        };
        o.trackRequest(t, u), this.setData({
            active: e.target.id
        }), this.getHouseList(e.currentTarget.dataset.id, e.currentTarget.dataset.name);
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
            clkName: "huxingxuanze",
            clkDesPage: "huxingtupian",
            type: "CLK",
            clkParams: {
                houseType: t,
                buildingId: this.data.buildingId || ""
            },
            pvCurPageName: "huxingye",
            pvCurPageParams: s
        };
        console.log(i, "detail"), o.trackRequest(n, u), u.globalData.houseTypeDetail = i, 
        wx.navigateTo({
            url: "../houseTypeDetail/houseTypeDetail?houseType=" + t + "&buildid=" + this.data.buildingId
        });
    },
    goChatList: function(e) {
        wx.navigateTo({
            url: "../counselorList/counselorList"
        });
    },
    onShow: function(e) {
        r.default.pageShow(), console.log(JSON.stringify("onShow:" + e)), a = new Date().getTime(), 
        u.login(function() {
            var e = {
                pvId: "                       P_2cMINA_9",
                type: "PV",
                pvCurPageName: "huxingye",
                pvLastPageName: u.globalData.pageDesc || "",
                pvCurPageParams: s,
                pvPageLoadTime: new Date().getTime() - a
            };
            o.trackRequest(e), u.authorizeSet();
        });
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: "户型"
        });
    },
    onUnload: function() {
        o.stopTrackEventTimeObj();
        var e = {
            pvPageStayTime: (new Date().getTime() - a) / 1e3,
            pvCurPageName: this.data.despage || "",
            clkDesPage: "zhuye",
            clkName: "fanhui",
            clkId: "clk_2cmina_36",
            clkParams: {},
            type: "CLK"
        };
        o.trackRequest(e, u);
    },
    onHide: function() {
        o.stopTrackEventTimeObj();
    },
    getCurrentPageParam: function() {
        return s;
    },
    onLoad: function(e) {
        this.myLoading = this.selectComponent("#myLoading"), this.myLoading && this.myLoading.showLoading(), 
        u.globalData.backgroundSetting && this.setData({
            btnColor: u.globalData.backgroundSetting.btnColor || "#3A4A80",
            lineColor: u.globalData.backgroundSetting.lingColor || "#ffffff",
            textColor: u.globalData.backgroundSetting.textColor || "#ffffff"
        }), e && e.shareToken && "null" != e.shareToken && "undefined" != e.shareToken && (u.globalData.fromChannel = e.shareToken), 
        e && e.buildid && this.setData({
            buildIndex: e.buildid
        }), s = JSON.stringify(e), this.getList();
    }
}, r.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));