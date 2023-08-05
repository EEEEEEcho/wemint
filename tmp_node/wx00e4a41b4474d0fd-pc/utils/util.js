function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function n(r, o) {
                try {
                    var s = t[r](o), i = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!s.done) return Promise.resolve(i).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(i);
            }
            return n("next");
        });
    };
}

function a(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = e(require("../lib/runtime.js")), o = e(require("../lib/requestConfig.js")), s = require("../config.js"), i = {
    formatTime: function(e) {
        var t = e.getFullYear(), n = e.getMonth() + 1, r = e.getDate(), o = e.getHours(), s = e.getMinutes(), i = e.getSeconds();
        return [ t, n, r ].map(a).join("-") + " " + [ o, s, i ].map(a).join(":");
    },
    formatCNTime: function(e) {
        var t = e.getFullYear(), a = e.getMonth() + 1, n = e.getDate(), r = e.getHours(), o = e.getMinutes(), s = e.getSeconds();
        return t + "年" + (a > 9 ? a : "0" + a) + "月" + n + "日" + r + "时" + (o > 9 ? o : "0" + o) + "分" + s + "秒";
    },
    buttonClicked: function(e, t) {
        e.setData({
            buttonClicked: !1
        }), setTimeout(function() {
            e.setData({
                buttonClicked: !0
            });
        }, t);
    },
    formatTodayTime: function(e) {
        var t = e.getFullYear(), a = e.getMonth() + 1, n = e.getDate(), r = e.getHours(), o = e.getMinutes(), s = e.getSeconds();
        return a == new Date().getMonth() + 1 && n + 1 == new Date().getDate() ? "昨天" + r + ":" + (o > 9 ? o : "0" + o) : a == new Date().getMonth() + 1 && n == new Date().getDate() ? r + ":" + (o > 9 ? o : "0" + o) + ":" + (s > 9 ? s : "0" + s) : t + "-" + (a > 9 ? a : "0" + a) + "-" + (n > 9 ? n : "0" + n) + " " + r + ":" + (o > 9 ? o : "0" + o) + ":" + (s > 9 ? s : "0" + s);
    },
    formatSucTime: function(e) {
        var t = e.getFullYear(), a = e.getMonth() + 1, n = e.getDate(), r = e.getHours(), o = e.getMinutes();
        return a == new Date().getMonth() + 1 && n + 1 == new Date().getDate() ? "昨天" + r + ":" + (o > 9 ? o : "0" + o) : a == new Date().getMonth() + 1 && n == new Date().getDate() ? r + ":" + (o > 9 ? o : "0" + o) : t + "-" + (a > 9 ? a : "0" + a) + "-" + n + " " + r + ":" + (o > 9 ? o : "0" + o);
    },
    normalTime: function(e) {
        return isNaN(e) ? "00" : parseInt(e) < 10 ? "0" + e : e;
    },
    getImgUrl: function() {
        return s.ImgUrl;
    },
    reformParam: function(e, t) {
        var a = {};
        a.merchantid = "3", a.version = "1", a.sign_type = "RSA", a.sign = "123", a.charset = "UTF-8", 
        a.method = e;
        var n = "";
        for (var r in t) n += "&" + r + "=" + t[r];
        return a.context = n, a;
    },
    trackRequest: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : getApp();
        '"{}"' !== JSON.stringify(e.clkParams) && "{}" !== JSON.stringify(e.clkParams) || (e.clkParams = ""), 
        '"{}"' !== JSON.stringify(e.expand) && "{}" !== JSON.stringify(e.expand) || (e.expand = "");
        var a = t.globalData.launchInfo && t.globalData.launchInfo.scene ? t.globalData.launchInfo.scene : "", r = t.globalData.exchangedFromChannel ? JSON.parse(t.globalData.exchangedFromChannel) : {};
        r.attrs && (r.attrs = r.attrs ? JSON.parse(r.attrs) : {});
        var i = getCurrentPages()[getCurrentPages().length - 1], u = "";
        u = e.pvCurPageParams ? "object" === n(e.pvCurPageParams) ? JSON.stringify(e.pvCurPageParams) : e.pvCurPageParams : i.getCurrentPageParam && "function" == typeof i.getCurrentPageParam() ? i.getCurrentPageParam() : "", 
        '"{}"' !== JSON.stringify(u) && "{}" !== JSON.stringify(u) || (u = ""), r.scene = a;
        var g = {
            session: m,
            userAgent: "",
            browserName: "",
            browserVersion: t.systemInfo.SDKVersion,
            platform: "miniapp",
            fromPlatform: "",
            fromParam: JSON.stringify(r),
            deviceType: t.systemInfo.model || "",
            ip: t.globalData.ip || "",
            cookieId: "",
            openId: t.globalData.openid || "",
            customerId: t.globalData.single && t.globalData.single.id ? t.globalData.single.id : "",
            userId: t.globalData.single && t.globalData.single.id ? t.globalData.single.id : "",
            createTime: this.formatTime(new Date()),
            uploadTime: this.formatTime(new Date()),
            product: t.globalData.projectName,
            project: s.houseId,
            eventId: e.eventId || "",
            eventName: e.eventName || "",
            expand: "object" === n(e.expand) ? JSON.stringify(e.expand) : e.expand,
            imTalkId: e.imTalkId || "",
            imTalkType: e.imTalkType || "",
            eventModuleDes: e.eventModuleDes || "",
            eventInnerModuleId: e.eventInnerModuleId || "",
            adviserId: e.adviserId || "",
            clkDesPage: e.clkDesPage || "",
            clkId: e.clkId || "",
            clkName: e.clkName || "",
            pvId: e.pvId || "",
            clkParams: "object" === n(e.clkParams) ? JSON.stringify(e.clkParams) : e.clkParams,
            pvPageStayTime: e.pvPageStayTime || "",
            pvCurPageName: e.pvCurPageName || "",
            pvCurPageParams: u,
            pvLastPageName: e.pvLastPageName || "",
            pvLastPageParams: e.pvLastPageParams || "",
            pvPageLoadTime: e.pvPageLoadTime || "",
            type: e.type || "",
            longitude: t.globalData.longitude || "",
            latitude: t.globalData.latitude || ""
        }, l = new Date().getTime(), m = wx.getStorageSync("sessionNumber") || 1;
        l - (wx.getStorageSync("sessionTime") || l) > 18e4 ? (m++, wx.setStorage({
            key: "sessionNumber",
            data: m
        })) : wx.setStorage({
            key: "sessionNumber",
            data: m
        }), wx.setStorage({
            key: "sessionTime",
            data: l
        }), g.session = g.userId + "_" + m, t.globalData.sessionTime = l, console.log(g.session), 
        (0, o.default)("upload", g);
    },
    trackEventObj: function(e, t) {
        var a = {
            uid: t.globalData.openid || "",
            time: Date.now(),
            phone: t.globalData.phone || "",
            type: "20",
            product: t.globalData.houseid || "",
            sessionId: t.globalData.sessionKey || "",
            project: t.systemInfo.model || "_" + t.systemInfo.SDKVersion || "",
            version: t.systemInfo.version || "",
            system: e.system || "4",
            module: "4",
            pageid: e.pageid || "",
            keyvalue: e.keyvalue || "",
            name: e.name || "",
            category: e.category || "",
            value: e.value || ""
        };
        e.usetime && (a.usetime = e.usetime);
        var n = {};
        n.merchantid = "3", n.version = "1", n.sign_type = "RSA", n.sign = "123", n.charset = "UTF-8", 
        n.method = "skyforest.analysis.add";
        var r = "";
        for (var o in a) r += "&" + o + "=" + a[o];
        return n.context = r, n;
    },
    reqTrackEventObj: function(e, t) {
        wx.request({
            url: url(),
            method: "POST",
            data: trackEventObj(e, t),
            success: function(e) {
                console.log("***reqTrackEventObj***", e);
            },
            fail: function(e) {}
        });
    },
    shareToken: function(e) {
        var a = this;
        return t(r.default.mark(function t() {
            var n;
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, o.default)("sign", {
                        customerId: e.globalData.single.id,
                        houseId: s.houseId,
                        userRole: 0
                    });

                  case 2:
                    (n = t.sent) && n.success && n.single && (e.globalData.shareToken = n.single || "");

                  case 4:
                  case "end":
                    return t.stop();
                }
            }, t, a);
        }))();
    },
    reqTrackEventTimeObj: function(e, t) {},
    stopTrackEventTimeObj: function(e, t) {},
    url: function(e) {
        return s.url;
    },
    newUrl: function(e) {
        return s.newUrl;
    },
    timesData: function(e) {
        var t = new Date(e);
        return t.getFullYear() + "/" + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "/") + ((t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " ");
    },
    timestampToTime: function(e) {
        var t = new Date(e);
        return (t.getHours() < 10 ? "0" + t.getHours() : t.getHours()) + ":" + (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes());
    }
};

module.exports = i;