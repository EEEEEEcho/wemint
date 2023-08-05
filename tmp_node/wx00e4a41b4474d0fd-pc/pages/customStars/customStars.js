function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, a) {
            function n(r, u) {
                try {
                    var o = e[r](u), i = o.value;
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    return void a(t);
                }
                if (!o.done) return Promise.resolve(i).then(function(t) {
                    n("next", t);
                }, function(t) {
                    n("throw", t);
                });
                t(i);
            }
            return n("next");
        });
    };
}

var a = t(require("../../lib/endpoint")), n = t(require("../../lib/runtime")), r = require("../../utils/convertor"), u = require("../../lib/promise"), o = require("../../utils/util"), i = t(require("../../utils/monitor.js")), s = "";

Page({
    data: {
        cdn: "https://dm.static.elab-plus.com/wuXiW3/img",
        pageNo: 1,
        pageSize: 10,
        rankList: [],
        total: 1,
        customizedStatus: 0
    },
    getCurrentPageParam: function() {
        return s;
    },
    onLoad: function(t) {
        var a = this;
        return e(n.default.mark(function e() {
            var r, o, i;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return console.log(t), s = JSON.stringify(t), e.next = 4, (0, u.login)();

                  case 4:
                    r = e.sent, o = r.id, i = r.houseId, a.setData({
                        houseId: i,
                        customerId: o
                    }), a.getData(), a.customState();

                  case 9:
                  case "end":
                    return e.stop();
                }
            }, e, a);
        }))();
    },
    onShow: function() {
        i.default.pageShow();
        var t = {
            type: "PV",
            pvId: "P_2cdinzhi_5",
            pvCurPageName: "fanganpaihangbang"
        };
        (0, o.trackRequest)(t);
    },
    customState: function() {
        var t = this;
        return e(n.default.mark(function e() {
            var r, u, o, i, s;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return r = t.data, u = r.customerId, o = r.houseId, e.next = 3, (0, a.default)("customState", {
                        customerId: u,
                        houseId: o
                    });

                  case 3:
                    i = e.sent, s = i.single.customizedStatus, t.setData({
                        customizedStatus: s
                    });

                  case 6:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    onReachBottom: function() {
        this.getData();
    },
    getData: function() {
        var t = this;
        return e(n.default.mark(function e() {
            var u, o, i, s, c;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (!(t.data.total < t.data.pageNo)) {
                        e.next = 2;
                        break;
                    }
                    return e.abrupt("return", !1);

                  case 2:
                    return u = t.data, o = u.houseId, i = u.customerId, e.next = 5, (0, a.default)("rankList", {
                        houseId: o,
                        pageNo: t.data.pageNo,
                        pageSize: t.data.pageSize,
                        customerId: i
                    });

                  case 5:
                    s = e.sent, c = s.pageModel ? s.pageModel.resultSet : [], c = c.map(r.rankMapper), 
                    t.setData({
                        total: s.pageModel.total,
                        rankList: t.data.rankList.concat(c),
                        pageNo: t.data.pageNo + 1,
                        pageSize: t.data.pageSize
                    });

                  case 9:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    onRouteCustom: function() {
        wx.navigateTo({
            url: "/pages/customHouse/customHouse"
        });
    },
    onLikeStar: function(t) {
        var r = this;
        return e(n.default.mark(function e() {
            var u, i, s, c, d, l, f, p;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return u = t.currentTarget.dataset.id, i = r.data, s = i.customerId, c = i.houseId, 
                    d = i.customerProgrammeId, l = i.rankList, e.next = 4, (0, a.default)("like", {
                        houseId: c,
                        customerId: s,
                        customerProgrammeId: u
                    });

                  case 4:
                    if ((f = e.sent).success) {
                        e.next = 7;
                        break;
                    }
                    return e.abrupt("return");

                  case 7:
                    (p = l.find(function(t) {
                        return t.id === parseInt(u);
                    })).isLike || (0, o.trackRequest)({
                        type: "CLK",
                        clkName: "dianzan",
                        clkId: "clk_2cdinzhi_21",
                        clkParams: {
                            customId: u
                        }
                    }), p.like = p.isLike ? p.like - 1 : p.like + 1, p.isLike = !p.isLike, r.setData({
                        rankList: l
                    }), t.stopPropagation && t.stopPropagation();

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e, r);
        }))();
    },
    onRouteDetail: function(t) {
        var e = "/pages/customDetail/customDetail?customId=" + t.currentTarget.dataset.id;
        this.navigateCustom(e), (0, o.trackRequest)({
            type: "CLK",
            clkName: "huxingfangan",
            clkId: "clk_2cdinzhi_30"
        });
    },
    navigateCustom: function(t) {
        var e = getCurrentPages();
        console.log("pages", e), e && e.length > 4 ? wx.redirectTo({
            url: t
        }) : wx.navigateTo({
            url: t
        });
    }
}, i.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(t) {},
    onHide: function() {},
    onUnload: function() {}
}));