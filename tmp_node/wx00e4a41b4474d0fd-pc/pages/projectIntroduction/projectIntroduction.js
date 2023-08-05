function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function n(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function r(i, o) {
                try {
                    var u = n[i](o), a = u.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!u.done) return Promise.resolve(a).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(a);
            }
            return r("next");
        });
    };
}

var t = require("../../utils/util"), r = e(require("../../lib/runtime")), i = require("../../lib/promise"), o = (e(require("../../lib/endpoint")), 
e(require("../../utils/monitor.js"))), u = (require("../../utils/util.js"), getApp()), a = (require("../../config.js"), 
"");

Page({
    data: {
        serverUrl: "https://dm.static.elab-plus.com/wuXiW3/projectIntroduction/",
        mask2: "#272A34"
    },
    onShow: function() {
        var e = n(r.default.mark(function e(n) {
            var u, a;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return o.default.pageShow(), wx.setNavigationBarTitle({
                        title: "项目介绍"
                    }), e.next = 4, (0, i.login)();

                  case 4:
                    u = e.sent, a = {
                        type: "PV",
                        pvId: "P_2cdinzhi_6",
                        pvCurPageName: "shejilinian"
                    }, (0, t.trackRequest)(a);

                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        }));
        return function(n) {
            return e.apply(this, arguments);
        };
    }(),
    onShareAppMessage: function(e) {
        var n = {
            type: "CLK",
            pvCurPageName: "shejilinian",
            pvCurPageParams: "",
            clkId: "clk_2cmina_18",
            clkName: "woyaofenxiang"
        };
        return (0, t.trackRequest)(n), {
            title: "项目介绍",
            path: "/pages/projectIntroduction/projectIntroduction?shareToken" + u.globalData.shareToken
        };
    },
    toDiy: function() {
        wx.navigateTo({
            url: "/pages/customHouse/customHouse"
        });
    },
    onUnload: function() {},
    onHide: function() {},
    getCurrentPageParam: function() {
        return a;
    },
    onLoad: function(e) {
        a = JSON.stringify(e), u.decrypt(e);
    }
}, o.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));