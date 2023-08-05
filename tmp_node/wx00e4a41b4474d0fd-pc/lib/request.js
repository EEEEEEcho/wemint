function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function n(o, a) {
                try {
                    var i = r[o](a), s = i.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!i.done) return Promise.resolve(s).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(s);
            }
            return n("next");
        });
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
}, t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./runtime"));

exports.default = function(n, o) {
    return new Promise(function(a, i) {
        var s = function() {
            var r = e(t.default.mark(function e(r) {
                var o, i, s = r.data, u = r.statusCode;
                return t.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        -1 == n.url.lastIndexOf("elab-marketing-system/behavior/miniOrWeb/upload") && (o = getApp()) && o.hideLoading(), 
                        200 === u && a(s), a({
                            message: i = "http status code " + u,
                            responseData: s,
                            requestData: n
                        });

                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e, void 0);
            }));
            return function(e) {
                return r.apply(this, arguments);
            };
        }(), u = r({}, n, {
            success: s,
            fail: function(e) {
                try {
                    if (-1 == n.url.lastIndexOf("elab-marketing-system/behavior/miniOrWeb/upload")) {
                        var r = getApp();
                        r && r.hideLoading();
                    }
                    wx.showToast({
                        title: "网络连接异常...",
                        icon: "error"
                    }), a({
                        message: "网络连接异常",
                        error: e
                    }), console.log("***fail-Error***", e);
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    console.log("***reject-Error***", e);
                }
            }
        });
        if (-1 == n.url.lastIndexOf("elab-marketing-system/behavior/miniOrWeb/upload") && !o) {
            var c = getApp();
            c && c.showLoading();
        }
        wx.request(u);
    });
};