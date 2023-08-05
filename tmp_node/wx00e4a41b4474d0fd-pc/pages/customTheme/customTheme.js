function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, n) {
            function o(r, u) {
                try {
                    var i = e[r](u), a = i.value;
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    return void n(t);
                }
                if (!i.done) return Promise.resolve(a).then(function(t) {
                    o("next", t);
                }, function(t) {
                    o("throw", t);
                });
                t(a);
            }
            return o("next");
        });
    };
}

var n = t(require("../../lib/endpoint")), o = t(require("../../lib/runtime")), r = require("../../utils/convertor"), u = t(require("../../utils/monitor.js")), i = "";

Page({
    data: {
        cdn: "https://dm.static.elab-plus.com/wuXiW3/img",
        colorList: [],
        selectTheme: 0
    },
    getCurrentPageParam: function() {
        return i;
    },
    onLoad: function(t) {
        var u = this;
        return e(o.default.mark(function e() {
            var a, c, s, f;
            return o.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return console.log(t), i = JSON.stringify(t), a = t.houseId, c = t.layoutId, s = void 0 === c ? 115 : c, 
                    e.next = 5, (0, n.default)("theme", t);

                  case 5:
                    f = e.sent, u.setData({
                        colorList: (0, r.themeMapper)(f.list)
                    });

                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e, u);
        }))();
    },
    onSelect: function(t) {
        console.log(t), this.setData({
            selectTheme: t.currentTarget.dataset.id
        });
    },
    onShow: function() {
        u.default.pageShow();
    },
    onBack: function() {
        wx.navigateBack();
    }
}, u.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(t) {},
    onHide: function() {},
    onUnload: function() {}
}));