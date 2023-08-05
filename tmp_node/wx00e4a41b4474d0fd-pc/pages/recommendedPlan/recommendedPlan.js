function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function r(a, u) {
                try {
                    var o = t[a](u), i = o.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void n(e);
                }
                if (!o.done) return Promise.resolve(i).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(i);
            }
            return r("next");
        });
    };
}

var n = require("../../utils/util"), r = e(require("../../lib/runtime")), a = e(require("../../lib/endpoint")), u = require("../../lib/promise"), o = (e(require("../../lib/requestConfig")), 
e(require("../../utils/monitor.js"))), i = (require("../../utils/util.js"), getApp()), s = require("../../config.js"), c = null;

Page({
    data: {
        serverUrl: "https://dm.static.elab-plus.com/wuXiW3/recommendedPlan/",
        mask2: "#272A34",
        hasPlan: !1,
        current: 0,
        layout: {},
        programme: {},
        designer: {},
        imgUrlPram: []
    },
    onShow: function() {
        var e = t(r.default.mark(function e(t) {
            var i, s, c, l, d;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return o.default.pageShow(), wx.setNavigationBarTitle({
                        title: "设计师推荐"
                    }), e.next = 4, (0, u.login)();

                  case 4:
                    return i = e.sent, s = i.id, c = i.houseId, e.next = 8, (0, a.default)("customState", {
                        customerId: s,
                        houseId: c
                    });

                  case 8:
                    (l = e.sent).success && this.setData({
                        hasPlan: 1 == l.single.customizedStatus
                    }), d = {
                        type: "PV",
                        pvId: "P_2cdinzhi_7",
                        pvCurPageName: "tuijianfangan"
                    }, (0, n.trackRequest)(d);

                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        }));
        return function(t) {
            return e.apply(this, arguments);
        };
    }(),
    onShareAppMessage: function(e) {
        var t = {
            type: "CLK",
            pvCurPageName: "tuijianfangan",
            pvCurPageParams: "",
            clkId: "clk_2cmina_18",
            clkName: "woyaofenxiang"
        };
        return (0, n.trackRequest)(t), {
            title: "设计师推荐",
            path: "/pages/recommendedPlan/recommendedPlan?shareToken" + i.globalData.shareToken
        };
    },
    change: function(e) {
        if ("touch" != e.detail.source) return !1;
        this.setData({
            current: e.detail.current
        });
    },
    checkout: function(e) {
        this.setData({
            current: e.currentTarget.dataset.num
        });
    },
    initData: function() {
        var e = this;
        return t(r.default.mark(function t() {
            var n, u, o, i, c, l;
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = s.houseId, t.next = 3, (0, a.default)("designerRecommend", n);

                  case 3:
                    if (u = t.sent, console.log("设计师推荐方案", u), u.success) {
                        t.next = 7;
                        break;
                    }
                    return t.abrupt("return");

                  case 7:
                    o = u.single, i = o.layout, c = o.programme, l = o.designer, e.setData({
                        layout: i,
                        programme: c,
                        designer: l
                    }), console.log(!!c.image3d);

                  case 10:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    save: function() {
        var e = this;
        return t(r.default.mark(function t() {
            var n, o, i, s;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, (0, u.login)();

                  case 2:
                    return n = e.sent, o = n.id, i = n.houseId, e.next = 6, (0, a.default)("saveDesignerRecommend", {
                        customerId: o,
                        houseId: i
                    });

                  case 6:
                    (s = e.sent).success && wx.navigateTo({
                        url: "/pages/customPay/customPay"
                    });

                  case 8:
                  case "end":
                    return e.stop();
                }
            }, t, e);
        }))();
    },
    imgOnload: function(e) {
        console.log(e.detail);
        var t = this.data.imgUrlPram;
        t[e.detail.index] = 710 / e.detail.width * e.detail.height, this.setData({
            imgUrlPram: t
        });
    },
    toDiy: function() {
        wx.navigateTo({
            url: "/pages/customHouse/customHouse"
        });
    },
    onRoute3D: function() {
        var e = "/pages/webView/webView?view=" + encodeURIComponent(this.data.programme.image3d);
        wx.navigateTo({
            url: e
        });
    },
    toIM: function() {
        var e = this;
        return t(r.default.mark(function t() {
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    wx.navigateTo({
                        url: "../counselorList/counselorList"
                    });

                  case 1:
                  case "end":
                    return e.stop();
                }
            }, t, e);
        }))();
    },
    onUnload: function() {},
    onHide: function() {},
    getCurrentPageParam: function() {
        return c;
    },
    onLoad: function(e) {
        var n = this;
        return t(r.default.mark(function t() {
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return c = JSON.stringify(e), t.next = 3, i.decrypt(e);

                  case 3:
                    console.log("onLoad执行完"), n.initData();

                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t, n);
        }))();
    }
}, o.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));