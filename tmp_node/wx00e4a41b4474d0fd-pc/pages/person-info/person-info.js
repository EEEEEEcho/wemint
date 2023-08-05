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
                    var s = t[a](u), o = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void n(e);
                }
                if (!s.done) return Promise.resolve(o).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(o);
            }
            return r("next");
        });
    };
}

var n = e(require("../../lib/endpoint")), r = e(require("../../lib/runtime")), a = require("../../lib/promise"), u = require("../../utils/util"), s = e(require("../../utils/monitor.js")), o = "";

Page({
    data: {
        cdn: "https://dm.static.elab-plus.com/wuXiW3/img",
        name: "",
        region: [],
        sex: "",
        sexArray: [],
        age: 0,
        canSave: !1,
        hasPay: !1,
        ageIndex: 55
    },
    generateRangeArray: function(e, t) {
        for (var n = [], r = e; r <= t; r += 1) n.push(r);
        return n;
    },
    generateRange: function() {
        return [ "00", "95", "90", "85", "80", "70", "60", "50" ].map(function(e) {
            return e + "后";
        });
    },
    getCurrentPageParam: function() {
        return o;
    },
    onLoad: function(e) {
        var u = this;
        return t(r.default.mark(function t() {
            var s, i, c, f, d, l, h, p, x, g;
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return o = JSON.stringify(e), t.next = 3, (0, a.login)();

                  case 3:
                    return s = t.sent, i = s.id, c = s.houseId, f = u.generateRange(), console.log("ageArray", f), 
                    d = [ {
                        value: 1,
                        text: "先生"
                    }, {
                        value: 0,
                        text: "女士"
                    } ], t.next = 10, (0, n.default)("customState", {
                        customerId: i,
                        houseId: c
                    });

                  case 10:
                    l = t.sent, h = l.single, p = h.paymentStatus, x = h.customerSupplementStatus, g = 2 === p, 
                    u.setData({
                        ageArray: f,
                        sexArray: d,
                        customerId: i,
                        houseId: c,
                        hasPay: g
                    });

                  case 14:
                  case "end":
                    return t.stop();
                }
            }, t, u);
        }))();
    },
    redirect: function() {
        var e = this.data, t = e.customerSupplementStatus, n = e.hasPay;
        1 !== t || (n ? wx.navigateTo({
            url: "/pages/customCenter/customCenter"
        }) : wx.navigateTo({
            url: "/pages/customPay/customPay"
        }));
    },
    onShow: function() {
        var e = this;
        return t(r.default.mark(function t() {
            var n;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    s.default.pageShow(), n = {
                        type: "PV",
                        pvId: "P_2cdinzhi_1",
                        pvCurPageName: "buchongxinxi"
                    }, (0, u.trackRequest)(n);

                  case 3:
                  case "end":
                    return e.stop();
                }
            }, t, e);
        }))();
    },
    bindKeyInput: function(e) {
        this.setData({
            name: e.detail.value
        });
    },
    bindBlur: function(e) {
        var n = this;
        return t(r.default.mark(function e() {
            var t;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (t = n.data.name, !n.isExceedName(t)) {
                        e.next = 3;
                        break;
                    }
                    return e.abrupt("return");

                  case 3:
                    n.isRepeatName(t);

                  case 4:
                  case "end":
                    return e.stop();
                }
            }, e, n);
        }))();
    },
    isExceedName: function(e) {
        return e.trim().length > 15 && (wx.showToast({
            title: "昵称不超过15个字噢",
            icon: "none"
        }), !0);
    },
    isRepeatName: function(e) {
        var a = this;
        return t(r.default.mark(function t() {
            var u, s;
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (e) {
                        t.next = 2;
                        break;
                    }
                    return t.abrupt("return");

                  case 2:
                    return u = a.data.houseId, t.next = 5, (0, n.default)("existNick", {
                        nickName: e,
                        houseId: u
                    });

                  case 5:
                    if (s = t.sent, console.log("res", s), s.success) {
                        t.next = 10;
                        break;
                    }
                    return wx.showToast({
                        title: "昵称已存在，请重新填写",
                        icon: "none"
                    }), t.abrupt("return", !0);

                  case 10:
                    return t.abrupt("return", !1);

                  case 11:
                  case "end":
                    return t.stop();
                }
            }, t, a);
        }))();
    },
    changeAge: function(e) {
        var t = e.detail.value, n = this.data.ageArray[t];
        this.setData({
            ageIndex: t,
            age: n
        });
    },
    bindRegionChange: function(e) {
        var t = e.detail.value;
        this.setData({
            region: t
        });
    },
    changeSex: function(e) {
        if (e) {
            var t = e.currentTarget.dataset.value, n = this.data.sexArray;
            n.forEach(function(e) {
                e.selected = e.value === t;
            }), this.setData({
                sexArray: n,
                sex: t
            });
        }
    },
    onSave: function() {
        var e = this;
        return t(r.default.mark(function t() {
            var a, s, o, i, c, f, d, l, h, p;
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (a = e.data, s = a.name, o = a.sex, i = a.age, c = a.region, f = a.customerId, 
                    d = a.houseId, l = a.hasPay, s) {
                        t.next = 4;
                        break;
                    }
                    return wx.showToast({
                        title: "请输入昵称",
                        icon: "none"
                    }), t.abrupt("return");

                  case 4:
                    if ("" !== o) {
                        t.next = 7;
                        break;
                    }
                    return wx.showToast({
                        title: "请选择性别",
                        icon: "none"
                    }), t.abrupt("return");

                  case 7:
                    if (i) {
                        t.next = 10;
                        break;
                    }
                    return wx.showToast({
                        title: "请选择年龄",
                        icon: "none"
                    }), t.abrupt("return");

                  case 10:
                    if (c.length) {
                        t.next = 13;
                        break;
                    }
                    return wx.showToast({
                        title: "请选择区域",
                        icon: "none"
                    }), t.abrupt("return");

                  case 13:
                    if (!e.isExceedName(s)) {
                        t.next = 15;
                        break;
                    }
                    return t.abrupt("return");

                  case 15:
                    return t.next = 17, e.isRepeatName(s);

                  case 17:
                    if (!(h = t.sent)) {
                        t.next = 20;
                        break;
                    }
                    return t.abrupt("return");

                  case 20:
                    return t.next = 22, (0, n.default)("saveCustomInfo", {
                        age: i,
                        city: c[1],
                        province: c[0],
                        customerId: f,
                        gender: o,
                        houseId: d,
                        nickName: s
                    });

                  case 22:
                    if (p = t.sent, (0, u.trackRequest)({
                        type: "CLK",
                        clkName: "baocunyonghuxinxi",
                        clkId: "clk_2cdinzhi_13"
                    }), console.log("onSave", p, l), !l) {
                        t.next = 28;
                        break;
                    }
                    return wx.navigateTo({
                        url: "/pages/customCenter/customCenter"
                    }), t.abrupt("return");

                  case 28:
                    p.success && wx.navigateTo({
                        url: "/pages/customPay/customPay"
                    });

                  case 29:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    }
}, s.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));