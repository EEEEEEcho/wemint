var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Date.now = Date.now || function() {
    return new Date().getTime();
};

var e = Date.now(), n = function() {}, r = {
    noop: n,
    warn: function() {
        var e = "object" == ("undefined" == typeof console ? "undefined" : t(console)) ? console.warn : n;
        try {
            var r = {
                warn: e
            };
            r.warn.call(r);
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            return n;
        }
        return e;
    }(),
    key: "__bl",
    win: "object" == ("undefined" == typeof window ? "undefined" : t(window)) && window.document ? window : void 0,
    regionMap: {
        cn: "https://arms-retcode.aliyuncs.com/r.png?",
        sg: "https://arms-retcode-sg.aliyuncs.com/r.png?",
        daily: "http://arms-retcode-daily.alibaba.net/r.png?"
    },
    defaultImgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
    $a2: function(t) {
        if (Object.create) return Object.create(t);
        var e = function() {};
        return e.prototype = t, new e();
    },
    each: function(t, e) {
        var n = 0, r = t.length;
        if (this.T(t, "Array")) for (;n < r && !1 !== e.call(t[n], t[n], n); n++) ; else for (n in t) if (!1 === e.call(t[n], t[n], n)) break;
        return t;
    },
    $a3: function(t, e, n) {
        if ("function" != typeof t) return n;
        try {
            return t.apply(this, e);
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            return n;
        }
    },
    T: function(t, e) {
        var n = Object.prototype.toString.call(t).substring(8).replace("]", "");
        return e ? n === e : n;
    },
    $a4: function(t, e) {
        if (!t) return "";
        if (!e) return t;
        var n = this, r = n.T(e);
        return "Function" === r ? n.$a3(e, [ t ], t) : "Array" === r ? (this.each(e, function(e) {
            t = n.$a4(t, e);
        }), t) : "Object" === r ? t.replace(e.rule, e.target || "") : t.replace(e, "");
    },
    J: function(t) {
        if (!t || "string" != typeof t) return t;
        var e = null;
        try {
            e = JSON.parse(t);
        } catch (t) {}
        return e;
    },
    pick: function(t) {
        return 1 === t || 1 === Math.ceil(Math.random() * t);
    },
    $a5: function(t) {
        if ("sample" in t) {
            var e = t.sample, n = e;
            e && /^\d+(\.\d+)?%$/.test(e) && (n = parseInt(100 / parseFloat(e))), 0 < n && 1 > n && (n = parseInt(1 / n)), 
            n >= 1 && n <= 100 ? t.sample = n : delete t.sample;
        }
        return t;
    },
    on: function(t, e, n, r) {
        return t.addEventListener ? t.addEventListener(e, function i(o) {
            r && t.removeEventListener(e, i, !1), n.call(this, o);
        }, !1) : t.attachEvent && t.attachEvent("on" + e, function i(o) {
            r && t.detachEvent("on" + e, i), n.call(this, o);
        }), this;
    },
    off: function(t, e, n) {
        return n ? (t.removeEventListener ? t.removeEventListener(e, n) : t.detachEvent && t.detachEvent(e, n), 
        this) : this;
    },
    delay: function(t, e) {
        return -1 === e ? (t(), null) : setTimeout(t, e || 0);
    },
    ext: function(t) {
        for (var e = 1, n = arguments.length; e < n; e++) {
            var r = arguments[e];
            for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
        }
        return t;
    },
    sub: function(t, e) {
        var n = {};
        return this.each(t, function(t, r) {
            -1 !== e.indexOf(r) && (n[r] = t);
        }), n;
    },
    uu: function() {
        for (var t, e, n = 20, r = new Array(n), i = Date.now().toString(36).split(""); n-- > 0; ) e = (t = 36 * Math.random() | 0).toString(36), 
        r[n] = t % 3 ? e : e.toUpperCase();
        for (var o = 0; o < 8; o++) r.splice(3 * o + 2, 0, i[o]);
        return r.join("");
    },
    seq: function() {
        return (e++).toString(36);
    },
    encode: function(t, e) {
        try {
            t = e ? encodeURIComponent(t).replace(/\(/g, "%28").replace(/\)/g, "%29") : encodeURIComponent(t);
        } catch (t) {}
        return t;
    },
    serialize: function(t) {
        t = t || {};
        var e = [];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && void 0 !== t[n] && e.push(n + "=" + this.encode(t[n], "msg" === n));
        return e.join("&");
    },
    $a6: function(t, e) {
        if (!t || "string" != typeof t) return !1;
        var n = /arms-retcode[\w-]*\.aliyuncs/.test(t);
        return !n && e && (n = /(\.png)|(\.gif)|(alicdn\.com)/.test(t)), !n;
    },
    $a7: function(t) {
        return !(!t || !t.message || /failed[\w\s]+fetch/i.test(t.message));
    },
    $a8: function(t) {
        return t && "string" == typeof t ? t.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "") : "";
    },
    $a9: function(t) {
        return function() {
            return t + "() { [native code] }";
        };
    },
    checkSameOrigin: function(t, e) {
        if (!e || !t) return !1;
        if (/^(http|https):\/\//.test(t)) {
            var n = t.split("/");
            return (t = n[0] + "//" + n[2]) === e;
        }
        return !0;
    },
    getRandIP: function() {
        for (var t = [], e = 0; e < 4; e++) {
            var n = Math.floor(256 * Math.random());
            t[e] = (n > 15 ? "" : "0") + n.toString(16);
        }
        return t.join("");
    },
    getSortNum: function(t) {
        return t ? (t += 1) >= 1e3 && t <= 9999 ? t : t < 1e3 ? t + 1e3 : t % 1e4 + 1e3 : 1e3;
    },
    getRandNum: function(t) {
        return t && "string" == typeof t ? t.length < 5 ? this.getNum(5) : t.substring(t.length - 5) : this.getNum(5);
    },
    getNum: function(t) {
        for (var e = [], n = 0; n < t; n++) {
            var r = Math.floor(16 * Math.random());
            e[n] = r.toString(16);
        }
        return e.join("");
    }
}, i = function(t, e) {
    var n;
    "error" === e.t && (n = t.$aa[0]) && "error" === n.t && e.msg === n.msg ? n.times++ : (t.$aa.unshift(e), 
    t.$ab(function() {
        t.$ac = r.delay(function() {
            t.$ad();
        }, "error" === e.t ? 3e3 : -1);
    }));
}, o = function t(e) {
    return this.ver = "1.5.0", this._conf = r.ext({}, t.dftCon), this.$ae = {}, this.$aa = [], 
    this.hash = r.seq(), this.$af(), this.setConfig(e), this.rip = r.getRandIP(), this.record = 999, 
    this["EagleEye-TraceID"] = this.getTraceId()["EagleEye-TraceID"], this._common = {}, 
    this;
};

o.dftCon = {
    sample: 1,
    tag: "",
    imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
    region: null
}, o.prototype = {
    constructor: o,
    $ab: function(t) {
        return t();
    },
    $ag: function() {
        var t = this._conf.page;
        return r.$a3(t, [], t + "");
    },
    setPage: function() {},
    setConfig: function(e) {
        e && "object" == (void 0 === e ? "undefined" : t(e)) && (r.$a5(e), e = this.$ah(e), 
        this._conf = r.ext({}, this._conf, e));
    },
    $ah: function(t) {
        var e = t.region, n = t.imgUrl;
        if (e) {
            var i = r.regionMap[e];
            return t.imgUrl = i || r.defaultImgUrl, t;
        }
        return n && (t.imgUrl = n), t;
    },
    $ai: function(t) {
        if (this.getConfig("debug")) return !0;
        var e = r.regionMap, n = !1;
        for (var i in e) if (e[i] === t) {
            n = !0;
            break;
        }
        return !n && r.warn("[retcode] invalid url: " + t), n;
    },
    $aj: function() {},
    $ak: function() {},
    $al: function() {
        return {};
    },
    setCommonInfo: function(e) {
        e && "object" == (void 0 === e ? "undefined" : t(e)) && (this._common = r.ext({}, this._common, e));
    },
    $af: function() {
        this.session = r.uu(), this.sBegin = Date.now();
    },
    getTraceId: function() {
        var t = this.rip, e = Date.now(), n = r.getSortNum(this.record), i = t + e + n + r.getRandNum(this._conf.pid);
        return this["EagleEye-TraceID"] = i, this.record = n, {
            "EagleEye-TraceID": i
        };
    },
    getSessionId: function() {
        return {
            "EagleEye-SessionID": this.session
        };
    },
    getConfig: function(t) {
        return t ? this._conf[t] : r.ext({}, this._conf);
    },
    $am: function(t) {
        return 1 === t || ("boolean" == typeof this.$ae[t] ? this.$ae[t] : (this.$ae[t] = r.pick(t), 
        this.$ae[t]));
    },
    $ad: function() {
        var t;
        for (clearTimeout(this.$ac), this.$ac = null; t = this.$aa.pop(); ) "res" === t.t ? this.$ak(t, "res") : "error" === t.t ? this.$ak(t, "err") : this.$aj(t);
        return this;
    },
    _lg: function(t, e, n) {
        var o = this._conf;
        return this.$ai(o.imgUrl) && e && !o.disabled && o.pid ? n && !this.$am(n) ? this : (e = r.ext({
            t: t,
            times: 1,
            page: this.$ag(),
            tag: o.tag || "",
            begin: Date.now()
        }, e, this.$al(), this._common, {
            pid: o.pid,
            _v: this.ver,
            sid: this.session,
            sampling: n || 1,
            z: r.seq()
        }), i(this, e)) : this;
    },
    custom: function(e, n) {
        if (!e || "object" != (void 0 === e ? "undefined" : t(e))) return this;
        var i = !1, o = {
            begin: Date.now()
        };
        return r.each(e, function(t, e) {
            return !(i = e && e.length <= 20) && r.warn("[retcode] invalid key: " + e), o["x-" + e] = t, 
            i;
        }), i ? this._lg("custom", o, n || 1) : this;
    }
};

var a = o, s = [ "api", "success", "time", "code", "msg", "trace", "traceId", "begin", "sid", "seq" ], c = function(t, e) {
    var n = t.split("::");
    return n.length > 1 ? r.ext({
        group: n[0],
        key: n[1]
    }, e) : r.ext({
        group: "default_group",
        key: n[0]
    }, e);
}, u = function(e) {
    a.call(this, e);
    var n;
    try {
        n = "object" == ("undefined" == typeof performance ? "undefined" : t(performance)) ? performance.timing.fetchStart : Date.now();
    } catch (t) {
        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
        n = Date.now();
    }
    return this._startTime = n, this;
};

u.prototype = r.$a2(a.prototype), r.ext(a.dftCon, {
    startTime: null
}), r.ext(u.prototype, {
    constructor: u,
    _super: a,
    sum: function(t, e, n) {
        try {
            return this._lg("sum", c(t, {
                val: e || 1,
                begin: Date.now()
            }), n);
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            r.warn("[retcode] can not get parseStatData: " + t);
        }
    },
    avg: function(t, e, n) {
        try {
            return this._lg("avg", c(t, {
                val: e || 0,
                begin: Date.now()
            }), n);
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            r.warn("[retcode] can not get parseStatData: " + t);
        }
    },
    percent: function(t, e, n, i) {
        try {
            return this._lg("percent", c(t, {
                subkey: e,
                val: n || 0,
                begin: Date.now()
            }), i);
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            r.warn("[retcode] can not get parseStatData: " + t);
        }
    },
    msg: function(t, e) {
        if (t && !(t.length > 180)) return this.custom({
            msg: t
        }, e);
    },
    error: function(e, n) {
        if (!e) return r.warn("[retcode] invalid param e: " + e), this;
        1 === arguments.length ? ("string" == typeof e && (e = {
            message: e
        }, n = {}), "object" == (void 0 === e ? "undefined" : t(e)) && (n = e = e.error || e)) : ("string" == typeof e && (e = {
            message: e
        }), "object" != (void 0 === n ? "undefined" : t(n)) && (n = {}));
        var i = e.name || "CustomError", o = e.message, a = e.stack || "";
        n = n || {};
        var s = {
            begin: Date.now(),
            cate: i,
            msg: o.substring(0, 1e3),
            stack: a && a.substring(0, 1e3),
            file: n.filename || "",
            line: n.lineno || "",
            col: n.colno || "",
            err: {
                msg_raw: o,
                stack_raw: a
            }
        };
        return this.$ap && this.$ap("error", s), this._lg("error", s, 1);
    },
    api: function(t, e, n, i, o, a, c, u) {
        return t ? (t = "string" == typeof t ? {
            api: t,
            success: e,
            time: n,
            code: i,
            msg: o,
            begin: a,
            traceId: c,
            sid: u
        } : r.sub(t, s), r.$a6(t.api) ? (t.code = t.code || "", t.msg = t.msg || "", t.success = t.success ? 1 : 0, 
        t.time = +t.time, t.begin = t.begin, t.traceId = t.traceId || "", t.sid = t.sid || "", 
        !t.api || isNaN(t.time) ? (r.warn("[retcode] invalid time or api"), this) : (this.$ap && this.$ap("api", t), 
        this._lg("api", t, t.success && this.getConfig("sample")))) : this) : (r.warn("[retcode] api is null"), 
        this);
    },
    speed: function(t, e, n) {
        var i = this, o = this.getConfig("startTime") || this._startTime;
        return /^s(\d|1[0])$/.test(t) ? (e = "number" != typeof e ? Date.now() - o : e >= o ? e - o : e, 
        i.$an = i.$an || {}, i.$an[t] = e, i.$an.begin = o, clearTimeout(i.$ao), i.$ao = setTimeout(function() {
            n || (i.$an.page = i.$ag(!0)), i._lg("speed", i.$an), i.$an = null;
        }, 5e3), i) : (r.warn("[retcode] invalid point: " + t), i);
    }
}), u._super = a, u._root = a, a.Reporter = u;

var f = u, h = function(t) {
    t && t.pid || r.warn("[arms] pid is a required prop to instatiate MiniProgramLogger");
    var e = this;
    return f.call(e, t), e._health = {
        errcount: 0,
        apisucc: 0,
        apifail: 0
    }, e.DEFAUT_PAGE_PATH = "[app]", e.isSendPerf = !1, e.$ap = function(t, n) {
        "error" === t ? e._health.errcount++ : "api" === t && e._health[n.success ? "apisucc" : "apifail"]++;
    }, "function" == typeof e.$aq && e.$aq(), "function" == typeof e.$ar && e.$ar(), 
    this;
};

h.prototype = r.$a2(f.prototype), r.ext(f._root.dftCon, {
    uid: null,
    disableHook: !1,
    enableLinkTrace: !1,
    sendRequest: function() {},
    getCurrentPage: function() {}
}), r.ext(h.prototype, {
    constructor: h,
    _super: f,
    $ab: function(t) {
        t();
    },
    $aj: function(e, n) {
        if (this.getConfig("debug")) "undefined" != typeof console && console && "function" == typeof console.log && console.log("[arms] [DEBUG MODE] log data", e); else {
            var i = this.getConfig("imgUrl");
            "object" == (void 0 === e ? "undefined" : t(e)) && (e = r.serialize(e));
            var o = i + e;
            n && (o += "&post_res=");
            var a = this._conf.sendRequest;
            if ("function" == typeof a) try {
                a(o, n);
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                r.warn("[arms] error in $aj", t);
            }
        }
    },
    $ak: function(t, e) {
        var n = {};
        n[e] = t[e], delete t[e], this.$aj(t, n);
    },
    $ag: function() {
        var t = this._conf.getCurrentPage;
        if ("function" == typeof t) try {
            var e = t();
            if (e && "string" == typeof e) return e;
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            r.warn("[arms] error in $ag", t);
        }
        return "string" == typeof t && t ? t : this.DEFAUT_PAGE_PATH;
    },
    setConfig: function(e) {
        if (e && "object" == (void 0 === e ? "undefined" : t(e))) {
            r.$a5(e), e = this.$ah(e);
            var n = this._conf;
            this._conf = r.ext({}, this._conf, e);
            var i = "disableHook";
            i in e && n[i] !== e[i] && (e[i] ? "function" == typeof this.removeHook && this.removeHook() : "function" == typeof this.addHook && this.addHook());
        }
    },
    pageShow: function() {
        var t = this;
        t.$af(), t.$as(), clearTimeout(t.$at), t.$au(), t.$at = setTimeout(function() {
            t.$av();
        }, 10), t.sessionPage = t.$ag();
    },
    pageHide: function() {
        this.$au();
    },
    addHook: function() {
        return this;
    },
    removeHook: function() {
        return this;
    },
    hookApp: function(t) {
        var e = this, n = {
            onError: function(n) {
                var i = 1 === arguments.length ? [ arguments[0] ] : Array.apply(null, arguments), o = t.onError;
                try {
                    e.error(n);
                } catch (n) {
                    n = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(n);
                    r.warn("[arms] error in hookApp:onError", n);
                }
                if ("function" == typeof o) return o.apply(this, i);
            }
        };
        return r.ext({}, t, n);
    },
    hookPage: function(t) {
        var e = this, n = {
            onShow: function() {
                var n = 1 === arguments.length ? [ arguments[0] ] : Array.apply(null, arguments), i = t.onShow;
                try {
                    e.pageShow();
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    r.warn("[arms] error in hookPage:pageShow", t);
                }
                if ("function" == typeof i) return i.apply(this, n);
            },
            onHide: function() {
                var n = 1 === arguments.length ? [ arguments[0] ] : Array.apply(null, arguments), i = t.onHide;
                try {
                    e.pageHide();
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    r.warn("[arms] error in hookPage:onHide", t);
                }
                if ("function" == typeof i) return i.apply(this, n);
            },
            onUnload: function() {
                var n = 1 === arguments.length ? [ arguments[0] ] : Array.apply(null, arguments), i = t.onUnload;
                try {
                    e.pageHide();
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    r.warn("[arms] error in hookPage:onUnload", t);
                }
                if ("function" == typeof i) return i.apply(this, n);
            }
        };
        return r.ext({}, t, n);
    },
    $aq: function() {},
    $ar: function() {
        this.setCommonInfo({
            app: "mini_common",
            uid: this._conf.uid
        });
    },
    $av: function() {
        var t = this;
        t.$ab(function() {
            t._lg("pv", {});
        });
    },
    $as: function() {
        var t = this;
        t.isSendPerf || (t.$ab(function() {
            var e = {
                fpt: Date.now() - t.sBegin
            };
            t._lg("perf", e);
        }), t.isSendPerf = !0);
    },
    $au: function() {
        this.$aw(), this.$an && (this._lg("speed", this.$an), this.$an = null, clearTimeout(this.$ao)), 
        this.$ad();
    },
    $aw: function() {
        if (this.sessionPage) {
            var t = r.ext({}, this._health);
            t.healthy = t.errcount > 0 ? 0 : 1, t.begin = Date.now();
            var e = t.begin - this.sBegin;
            t.page = this.sessionPage, t.stay = e, this._lg("health", t, 1), this._health = {
                errcount: 0,
                apisucc: 0,
                apifail: 0
            }, this.sessionPage = null;
        }
    }
});

var p = null, l = function(t) {
    return p || (p = new h(t || {})), p;
};

h.init = l, h.singleton = l, h._super = f, h._root = f._root, f.MiniProgramLogger = h;

var g = h, d = function(t) {
    return g.call(this, t), this;
};

d.prototype = r.$a2(g.prototype), r.ext(g._root.dftCon, {
    sendRequest: function(t, e) {
        if ("undefined" != typeof wx && wx && "function" == typeof wx.request) try {
            var n, i = "GET";
            e && (i = "POST", n = JSON.stringify(e)), wx.request({
                url: t,
                method: i,
                data: n,
                fail: function(t) {
                    r.warn("[arms] sendRequest fail", t);
                }
            });
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            r.warn("[arms] error in conf sendRequest", t);
        }
    },
    getCurrentPage: function() {
        if ("function" == typeof getCurrentPages) try {
            var t = getCurrentPages() || [], e = t[t.length - 1];
            return e && e.route || null;
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            r.warn("[arms] error in conf getCurrentPage", t);
        }
    }
}), r.ext(d.prototype, {
    constructor: d,
    _super: g,
    $ar: function() {
        this.setCommonInfo({
            app: "mini_wx"
        }), this.$ay(), this.$az(), this.$b0();
    },
    $b0: function() {
        if (this._conf && this._conf.uid) this.setCommonInfo({
            uid: this._conf.uid
        }); else if ("undefined" != typeof wx && wx && "function" == typeof wx.getStorageSync) try {
            var t = wx.getStorageSync("ARMS_STORAGE_MINIPROGRAM_WX_UID_KEY");
            if (t && "string" == typeof t) this.setCommonInfo({
                uid: t
            }); else if ("function" == typeof wx.setStorageSync) {
                var e = r.uu();
                wx.setStorageSync("ARMS_STORAGE_MINIPROGRAM_WX_UID_KEY", e), this.setCommonInfo({
                    uid: e
                });
            }
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            r.warn("[arms] error in $b0", t);
        }
    },
    $ay: function() {
        if ("undefined" != typeof wx && wx && "function" == typeof wx.getSystemInfoSync) try {
            var e = wx.getSystemInfoSync();
            "object" == (void 0 === e ? "undefined" : t(e)) && this.setCommonInfo({
                sr: (e.screenWidth || 0) + "x" + (e.screenHeight || 0),
                vp: (e.windowWidth || 0) + "x" + (e.windowHeight || 0),
                dpr: e.pixelRatio,
                ul: e.language
            });
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            r.warn("[arms] error in $ay", t);
        }
    },
    $az: function() {
        var t = this;
        if ("undefined" != typeof wx && wx && "function" == typeof wx.getNetworkType) try {
            wx.getNetworkType({
                success: function(e) {
                    e && "string" == typeof e.networkType && t.setCommonInfo({
                        ct: e.networkType
                    });
                },
                fail: function(t) {
                    r.warn("[arms] $az getNetworkType fail", t);
                }
            });
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            r.warn("[arms] error in $az", t);
        }
    },
    hookApp: function(e) {
        var n = this, i = {
            onError: function(i) {
                var o = 1 === arguments.length ? [ arguments[0] ] : Array.apply(null, arguments), a = e.onError;
                try {
                    if (i && "object" == (void 0 === i ? "undefined" : t(i)) && n.error(i), i && "string" == typeof i) {
                        var s = i.split("\n"), c = "", u = "";
                        s.length > 1 && (c = s[0] && s[0].length < 100 ? s[0] : s[0].substring(0, 100), 
                        u = s[1]), n.error({
                            name: c,
                            message: u || i,
                            stack: i
                        });
                    }
                } catch (i) {
                    i = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(i);
                    r.warn("[arms] error in hookApp:onError", i);
                }
                if ("function" == typeof a) return a.apply(this, o);
            }
        };
        return r.ext({}, e, i);
    }
}), function(e) {
    var n = r, i = null, o = {};
    n.ext(e.prototype, {
        addHook: function() {
            return this.isHookInstantiated ? this : (function() {
                var e = this;
                if ("undefined" != typeof wx && wx && "function" == typeof wx.request) {
                    i = wx;
                    var r = {
                        request: function(r) {
                            var i = new Date().getTime();
                            if (r && "object" == (void 0 === r ? "undefined" : t(r)) && r[0]) {
                                var o, a, s = r[0], c = n.$a8(s.url), u = s.success, f = s.fail, h = s && s.header;
                                h && "object" == (void 0 === h ? "undefined" : t(h)) || (h = {});
                                var p = {};
                                if (e.getConfig("enableLinkTrace")) {
                                    var l = h["EagleEye-pAppName"];
                                    if (o = h["EagleEye-TraceID"], a = h["EagleEye-SessionID"], o || (o = e.getTraceId()["EagleEye-TraceID"], 
                                    p["EagleEye-TraceID"] = o), a || (a = e.getSessionId()["EagleEye-SessionID"], p["EagleEye-SessionID"] = a), 
                                    !l) {
                                        var g = e.getConfig("pid");
                                        p["EagleEye-pAppName"] = g;
                                    }
                                }
                                s.success = function() {
                                    var t = new Date().getTime();
                                    if (n.$a6(c, !0)) {
                                        var s = arguments && arguments[0] && arguments[0].statusCode || 200;
                                        e.api({
                                            api: r[0].url,
                                            success: !0,
                                            time: t - i,
                                            code: s,
                                            begin: i,
                                            traceId: o,
                                            sid: a
                                        });
                                    }
                                    u && u.apply(e, [].slice.call(arguments));
                                }, s.fail = function() {
                                    var s = new Date().getTime();
                                    if (n.$a6(c, !0)) {
                                        var u = "";
                                        arguments && arguments[0] && "object" == t(arguments[0]) && (u = (u = JSON.stringify(arguments[0])).substring(0, 1e3));
                                        var h = arguments && arguments[0] && arguments[0].statusCode || "FAILED";
                                        e.api({
                                            api: r[0].url,
                                            success: !1,
                                            time: s - i,
                                            code: h,
                                            msg: u,
                                            begin: i,
                                            traceId: o,
                                            sid: a
                                        });
                                    }
                                    f && f.apply(e, [].slice.call(arguments));
                                }, s.header = n.ext({}, h, p);
                            }
                        }
                    };
                    for (var a in wx) if (r[a]) {
                        var s = a.toString();
                        o[s] = function() {
                            return r[s](arguments), i[s].apply(i, [].slice.call(arguments));
                        };
                    } else o[a] = i[a];
                    wx = o;
                }
            }.call(this), this.isHookInstantiated = !0, this);
        },
        removeHook: function() {
            return this.isHookInstantiated ? (function() {
                "undefined" != typeof wx && wx && i && (wx = i, i = null);
            }.call(this), this.isHookInstantiated = !1, this) : this;
        },
        $aq: function() {
            return this.$ax ? this : (this.getConfig("disableHook") || this.addHook(), this.$ax = !0, 
            this);
        }
    });
}(d);

var m = null, y = function(t) {
    return m || (m = new d(t || {})), m;
};

d.init = y, d.singleton = y, d._super = g, d._root = g._root, g.WXLogger = d;

var v = d;

module.exports = v;