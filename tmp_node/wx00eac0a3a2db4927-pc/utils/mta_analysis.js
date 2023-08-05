function t(t) {
    wx.getNetworkType({
        success: function(a) {
            t(a.networkType);
        }
    });
}

function a() {
    var t = wx.getSystemInfoSync();
    return {
        adt: encodeURIComponent(t.model),
        scl: t.pixelRatio,
        scr: t.windowWidth + "x" + t.windowHeight,
        lg: t.language,
        fl: t.version,
        jv: encodeURIComponent(t.system),
        tz: encodeURIComponent(t.platform)
    };
}

function e() {
    try {
        return wx.getStorageSync(g.prefix + "auid");
    } catch (t) {}
}

function n() {
    try {
        var t = s();
        return wx.setStorageSync(g.prefix + "auid", t), t;
    } catch (t) {}
}

function r() {
    try {
        return wx.getStorageSync(g.prefix + "ssid");
    } catch (t) {}
}

function o() {
    try {
        var t = "s" + s();
        return wx.setStorageSync(g.prefix + "ssid", t), t;
    } catch (t) {}
}

function s(t) {
    for (var a = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], e = 10; 1 < e; e--) {
        var n = Math.floor(10 * Math.random()), r = a[n];
        a[n] = a[e - 1], a[e - 1] = r;
    }
    for (e = n = 0; 5 > e; e++) n = 10 * n + a[e];
    return (t || "") + (n + "") + +new Date();
}

function i() {
    try {
        var t = getCurrentPages(), a = "/";
        return 0 < t.length && (a = t.pop().__route__), a;
    } catch (t) {
        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
        console.log("get current page path error:" + t);
    }
}

function u() {
    var t = {
        dm: "wechat.apps.xx",
        url: encodeURIComponent(i() + c(_.Data.pageQuery)),
        pvi: "",
        si: "",
        ty: 0
    };
    return t.pvi = function() {
        var a = e();
        return a || (a = n(), t.ty = 1), a;
    }(), t.si = function() {
        var t = r();
        return t || (t = o()), t;
    }(), t;
}

function p() {
    var e = a();
    return t(function(t) {
        try {
            wx.setStorageSync(g.prefix + "ntdata", t);
        } catch (t) {}
    }), e.ct = wx.getStorageSync(g.prefix + "ntdata") || "4g", e;
}

function l() {
    var t, a = _.Data.userInfo, e = [];
    for (t in a) a.hasOwnProperty(t) && e.push(t + "=" + a[t]);
    return a = e.join(";"), {
        r2: g.app_id,
        r4: "wx",
        ext: "v=" + g.version + (null !== a && "" !== a ? ";ui=" + encodeURIComponent(a) : "")
    };
}

function c(t) {
    if (!g.stat_param || !t) return "";
    t = h(t);
    var a, e = [];
    for (a in t) e.push(a + "=" + t[a]);
    return 0 < e.length ? "?" + e.join("&") : "";
}

function h(t) {
    if (1 > g.ignore_params.length) return t;
    var a, e = {};
    for (a in t) 0 <= g.ignore_params.indexOf(a) || (e[a] = t[a]);
    return e;
}

function f() {
    var t = Page;
    Page = function(a) {
        var e = a.onLoad;
        a.onLoad = function(t) {
            e && e.call(this, t), _.Data.lastPageQuery = _.Data.pageQuery, _.Data.pageQuery = t, 
            _.Data.lastPageUrl = _.Data.pageUrl, _.Data.pageUrl = i(), _.Data.show = !1, _.Page.init();
        }, t(a);
    };
}

var g = {
    app_id: "",
    event_id: "",
    api_base: "https://pingtas.qq.com/pingd",
    prefix: "_mta_",
    version: "1.3.10",
    stat_share_app: !1,
    stat_pull_down_fresh: !1,
    stat_reach_bottom: !1,
    stat_param: !0
}, _ = {
    App: {
        init: function(t) {
            "appID" in t && (g.app_id = t.appID), "eventID" in t && (g.event_id = t.eventID), 
            "statShareApp" in t && (g.stat_share_app = t.statShareApp), "statPullDownFresh" in t && (g.stat_pull_down_fresh = t.statPullDownFresh), 
            "statReachBottom" in t && (g.stat_reach_bottom = t.statReachBottom), "ignoreParams" in t && (g.ignore_params = t.ignoreParams), 
            "statParam" in t && (g.stat_param = t.statParam), o();
            try {
                "lauchOpts" in t && (_.Data.lanchInfo = t.lauchOpts, _.Data.lanchInfo.landing = 1);
            } catch (t) {}
            "autoReport" in t && t.autoReport && f();
        }
    },
    Page: {
        init: function() {
            var t = getCurrentPages()[getCurrentPages().length - 1];
            t.onShow && function() {
                var a = t.onShow;
                t.onShow = function() {
                    if (!0 === _.Data.show) {
                        var t = _.Data.lastPageQuery;
                        _.Data.lastPageQuery = _.Data.pageQuery, _.Data.pageQuery = t, _.Data.lastPageUrl = _.Data.pageUrl, 
                        _.Data.pageUrl = i();
                    }
                    _.Data.show = !0, _.Page.stat(), a.apply(this, arguments);
                };
            }(), g.stat_pull_down_fresh && t.onPullDownRefresh && function() {
                var a = t.onPullDownRefresh;
                t.onPullDownRefresh = function() {
                    _.Event.stat(g.prefix + "pulldownfresh", {
                        url: t.__route__
                    }), a.apply(this, arguments);
                };
            }(), g.stat_reach_bottom && t.onReachBottom && function() {
                var a = t.onReachBottom;
                t.onReachBottom = function() {
                    _.Event.stat(g.prefix + "reachbottom", {
                        url: t.__route__
                    }), a.apply(this, arguments);
                };
            }(), g.stat_share_app && t.onShareAppMessage && function() {
                var a = t.onShareAppMessage;
                t.onShareAppMessage = function() {
                    return _.Event.stat(g.prefix + "shareapp", {
                        url: t.__route__
                    }), a.apply(this, arguments);
                };
            }();
        },
        multiStat: function(t, a) {
            if (1 == a) _.Page.stat(t); else {
                var e = getCurrentPages()[getCurrentPages().length - 1];
                e.onShow && function() {
                    var a = e.onShow;
                    e.onShow = function() {
                        _.Page.stat(t), a.call(this, arguments);
                    };
                }();
            }
        },
        stat: function(t) {
            if ("" != g.app_id) {
                var a = [], e = l();
                if (t && (e.r2 = t), t = [ u(), e, p() ], _.Data.lanchInfo) {
                    t.push({
                        ht: _.Data.lanchInfo.scene
                    }), _.Data.pageQuery && _.Data.pageQuery._mta_ref_id && t.push({
                        rarg: _.Data.pageQuery._mta_ref_id
                    });
                    try {
                        1 == _.Data.lanchInfo.landing && (e.ext += ";lp=1", _.Data.lanchInfo.landing = 0);
                    } catch (t) {}
                }
                t.push({
                    rdm: "/",
                    rurl: 0 >= _.Data.lastPageUrl.length ? _.Data.pageUrl + c(_.Data.lastPageQuery) : encodeURIComponent(_.Data.lastPageUrl + c(_.Data.lastPageQuery))
                }), t.push({
                    rand: +new Date()
                }), e = 0;
                for (var n = t.length; e < n; e++) for (var r in t[e]) t[e].hasOwnProperty(r) && a.push(r + "=" + (void 0 === t[e][r] ? "" : t[e][r]));
                wx.request({
                    url: g.api_base + "?" + a.join("&").toLowerCase()
                });
            }
        }
    },
    Event: {
        stat: function(t, a) {
            if ("" != g.event_id) {
                var e = [], n = u(), r = l();
                n.dm = "wxapps.click", n.url = t, r.r2 = g.event_id;
                var o, s = void 0 === a ? {} : a, i = [];
                for (o in s) s.hasOwnProperty(o) && i.push(encodeURIComponent(o) + "=" + encodeURIComponent(s[o]));
                for (s = i.join(";"), r.r5 = s, s = 0, r = (n = [ n, r, p(), {
                    rand: +new Date()
                } ]).length; s < r; s++) for (var c in n[s]) n[s].hasOwnProperty(c) && e.push(c + "=" + (void 0 === n[s][c] ? "" : n[s][c]));
                wx.request({
                    url: g.api_base + "?" + e.join("&").toLowerCase()
                });
            }
        }
    },
    Data: {
        userInfo: null,
        lanchInfo: null,
        pageQuery: null,
        lastPageQuery: null,
        pageUrl: "",
        lastPageUrl: "",
        show: !1
    }
};

module.exports = _;