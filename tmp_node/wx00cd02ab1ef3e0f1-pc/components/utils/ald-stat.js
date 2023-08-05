var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function() {
    function a(t) {
        var a = wx.getStorageSync("aldstat_uuid");
        return a || (a = "" + Date.now() + Math.floor(1e7 * Math.random()), wx.setStorageSync("aldstat_uuid", a), 
        t.aldstat_is_first_open = !0), a;
    }
    function s() {
        wx.request({
            url: "https://" + d + ".aldwx.com/config/app.json",
            header: {
                AldStat: "MiniApp-Stat"
            },
            method: "GET",
            success: function(t) {
                if (200 === t.statusCode) for (var a in t.data) wx.setStorageSync(a, t.data[a]);
            }
        });
    }
    function e(t, a, s) {
        if (t[a]) {
            var e = t[a];
            t[a] = function(t) {
                s.call(this, t, a), e.call(this, t);
            };
        } else t[a] = function(t) {
            s.call(this, t, a);
        };
    }
    function n(t, a, s) {
        if (t[a]) {
            var e = t[a];
            t[a] = function(t) {
                var n = e.call(this, t);
                return s.call(this, [ t, n ], a), n;
            };
        } else t[a] = function(t) {
            s.call(this, t, a);
        };
    }
    function o(t) {
        this.app = t;
    }
    function r(t) {
        for (var a in t) return !1;
        return !0;
    }
    function _(t) {
        if (!t && "string" == typeof t) return !1;
        var a = t.replace(/\s+/g, "_");
        return !!/^(?!_)(?!.*?_$)[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/.test(a);
    }
    function i(a) {
        for (var s in a) {
            if ("object" == t(a[s])) return !1;
            if ("string" === s) return _(s);
            if ("string" == typeof a[s]) return _(a[s]);
        }
        return !0;
    }
    var l = "5.4.1", d = "log", c = require("./ald-stat-conf.js"), u = 0, p = 0, h = 0, f = 0, g = function(t) {
        wx.login({
            success: function(a) {
                wx.getUserInfo({
                    success: function(a) {
                        t(a);
                    }
                });
            }
        });
    }, w = function(t, a, s) {
        void 0 === arguments[1] && (a = "GET"), void 0 === arguments[2] && (s = "d.html");
        var e = 0;
        !function n() {
            u += 1, t.rq_c = u, wx.request({
                url: "https://" + d + ".aldwx.com/" + s,
                data: t,
                header: {
                    AldStat: "MiniApp-Stat"
                },
                method: a,
                success: function() {},
                fail: function() {
                    2 > e && (e++, t.retryTimes = e, n());
                }
            });
        }();
    }, v = function(t, s, e, n) {
        var o = {
            ak: c.app_key,
            uu: a(t),
            at: t.aldstat_access_token,
            st: Date.now(),
            tp: e,
            ev: s,
            v: l
        };
        n && (o.ct = n), t.aldstat_qr && (o.qr = t.aldstat_qr), w(o, "GET", "d.html");
    }, m = function(t, s, e, n) {
        void 0 === t.aldstat_showoption && (t.aldstat_showoption = {});
        var o = {
            ak: c.app_key,
            wsr: t.aldstat_showoption,
            uu: a(t),
            at: t.aldstat_access_token,
            st: Date.now(),
            tp: e,
            ev: s,
            nt: t.aldstat_network_type,
            pm: t.aldstat_phone_model,
            pr: t.aldstat_pixel_ratio,
            ww: t.aldstat_window_width,
            wh: t.aldstat_window_height,
            lang: t.aldstat_language,
            wv: t.aldstat_wechat_version,
            lat: t.aldstat_lat,
            lng: t.aldstat_lng,
            spd: t.aldstat_speed,
            v: l
        };
        n && (o.ct = n), t.aldstat_location_name && (o.ln = t.aldstat_location_name), t.aldstat_src && (o.sr = t.aldstat_src), 
        t.aldstat_qr && (o.qr = t.aldstat_qr), w(o, "GET", "d.html");
    };
    o.prototype.debug = function(t) {
        m(this.app, "debug", 0, t);
    }, o.prototype.warn = function(t) {
        m(this.app, "debug", 1, t);
    }, o.prototype.error = function(t) {
        v(this.app, "debug", 2, t);
    }, o.prototype.sendEvent = function(a, s) {
        if (!a || a.length >= 255) return !1;
        if (!_(a)) return !1;
        if ("object" == (void 0 === s ? "undefined" : t(s))) i(s) && m(this.app, "event", a, JSON.stringify(s)); else if ("string" == typeof s && s.length <= 255) {
            if (_(s)) {
                var e = String(s);
                new Object()[e] = s, m(this.app, "event", a, s);
            }
        } else m(this.app, "event", a, !1);
    };
    var y = function() {
        var t = this;
        t.aldstat_duration += Date.now() - t.aldstat_showtime, D(t, "app", "unLaunch");
    }, S = function(t, a, s) {
        void 0 !== wx.getShareInfo ? wx.getShareInfo({
            shareTicket: a,
            success: function(a) {
                m(t, "event", "ald_share_" + s, JSON.stringify(a));
            },
            fail: function() {
                m(t, "event", "ald_share_" + s, "1");
            }
        }) : m(t, "event", "ald_share_" + s, "1");
    }, x = function(t) {
        s(), this.aldstat = new o(this);
        var e = wx.getStorageSync("aldstat_src");
        e && (this.aldstat_src = e);
        var n = a(this);
        this.aldstat_uuid = n, this.aldstat_timestamp = Date.now(), this.aldstat_showtime = Date.now(), 
        this.aldstat_duration = 0;
        var r = this;
        r.aldstat_error_count = 0, r.aldstat_page_count = 1, r.aldstat_first_page = 0, this.aldstat_showoption = void 0 !== t ? t : {};
        var _ = function() {
            wx.getSystemInfo({
                success: function(t) {
                    r.aldstat_vsdk_version = void 0 === t.SDKVersion ? "1.0.0" : t.SDKVersion, r.aldstat_phone_model = t.model, 
                    r.aldstat_pixel_ratio = t.pixelRatio, r.aldstat_window_width = t.windowWidth, r.aldstat_window_height = t.windowHeight, 
                    r.aldstat_language = t.language, r.aldstat_wechat_version = t.version, r.aldstat_sv = t.system, 
                    r.aldstat_wvv = t.platform;
                },
                complete: function() {
                    c.getLocation && l(), c.getUserinfo && i();
                }
            });
        }, i = function() {
            g(function(t) {
                var a = wx.getStorageSync("aldstat_uuid");
                t.userInfo.uu = a, w(t.userInfo, "GET", "u.html");
            });
        }, l = function() {
            wx.getLocation({
                type: "wgs84",
                success: function(t) {
                    r.aldstat_lat = t.latitude, r.aldstat_lng = t.longitude, r.aldstat_speed = t.speed;
                }
            });
        };
        wx.getNetworkType({
            success: function(t) {
                r.aldstat_network_type = t.networkType;
            },
            complete: _
        });
        var d = wx.getStorageSync("app_session_key_create_launch_upload");
        d ? d > 0 && "number" == typeof d && (r.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random())) : r.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random()), 
        D(r, "app", "launch");
    }, k = function(t, a) {
        var s = getApp();
        void 0 === this.aldstat_error_count ? this.aldstat_error_count = 1 : this.aldstat_error_count++, 
        m(s, "event", "ald_error_message", JSON.stringify(t));
    }, D = function(t, s, e) {
        var n = wx.getStorageSync("app_" + e + "_upload");
        if (!(!n && "launch" !== e || 1 > n && "number" == typeof n)) {
            void 0 === t.aldstat_timestamp && (t.aldstat_timestamp = Date.now()), t.aldstat_duration += Date.now() - t.aldstat_showtime;
            var o = wx.getSystemInfoSync();
            t.aldstat_vsdk_version = void 0 === o.SDKVersion ? "1.0.0" : o.SDKVersion, t.aldstat_phone_model = o.model, 
            t.aldstat_pixel_ratio = o.pixelRatio, t.aldstat_window_width = o.windowWidth, t.aldstat_window_height = o.windowHeight, 
            t.aldstat_language = o.language, t.aldstat_wechat_version = o.version;
            var r = {
                ak: c.app_key,
                waid: c.appid,
                wst: c.appsecret,
                uu: a(t),
                at: t.aldstat_access_token,
                wsr: t.aldstat_showoption,
                st: t.aldstat_timestamp,
                dr: t.aldstat_duration,
                et: Date.now(),
                pc: t.aldstat_page_count,
                fp: t.aldstat_first_page,
                lp: t.aldstat_last_page,
                life: e,
                ec: t.aldstat_error_count,
                nt: t.aldstat_network_type,
                pm: t.aldstat_phone_model,
                wsdk: t.aldstat_vsdk_version,
                pr: t.aldstat_pixel_ratio,
                ww: t.aldstat_window_width,
                wh: t.aldstat_window_height,
                lang: t.aldstat_language,
                wv: t.aldstat_wechat_version,
                lat: t.aldstat_lat,
                lng: t.aldstat_lng,
                spd: t.aldstat_speed,
                v: l,
                ev: s,
                sv: t.aldstat_sv,
                wvv: t.aldstat_wvv
            };
            "launch" === e ? p += 1 : "show" === e ? h += 1 : f += 1, r.la_c = p, r.as_c = h, 
            r.ah_c = f, t.page_share_count && "number" == typeof t.page_share_count && (r.sc = t.page_share_count), 
            t.aldstat_is_first_open && (r.ifo = "true"), t.aldstat_location_name && (r.ln = t.aldstat_location_name), 
            t.aldstat_src && (r.sr = t.aldstat_src), t.aldstat_qr && (r.qr = t.aldstat_qr), 
            t.ald_share_src && (r.usr = t.ald_share_src), w(r, "GET", "d.html");
        }
    }, b = function(t) {
        this.aldstat_showtime = Date.now(), this.aldstat_showoption = void 0 !== t ? t : {};
        var a = wx.getStorageSync("app_session_key_create_show_upload");
        a && a > 0 && "number" == typeof a && (this.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random())), 
        this.aldstat_duration += Date.now() - this.aldstat_showtime, D(this, "app", "show"), 
        void 0 !== t && (void 0 !== t.shareTicket ? S(this, t.shareTicket, "click") : void 0 !== t.query && void 0 !== t.query.ald_share_src && S(this, "0", "click"));
    }, q = function(t, a) {
        var s = this;
        s.aldstat_is_first_open && (s.aldstat_is_first_open = !1), s.aldstat_duration += Date.now() - s.aldstat_showtime, 
        D(s, "app", "hide");
    }, A = App;
    App = function(t) {
        e(t, "onLaunch", x), e(t, "onUnlaunch", y), e(t, "onShow", b), e(t, "onHide", q), 
        e(t, "onError", k), A(t);
    };
    var T = function(t, a) {
        var s = getApp();
        E(s, this, "hide");
    }, M = function(t, a) {
        var s = getApp();
        E(s, this, "unload");
    }, I = function(t, a) {
        var s = wx.getStorageSync("aldstat_src");
        wx.showShareMenu;
        var e = getApp();
        if (s && (e.aldstat_src = s), !r(t)) {
            void 0 !== t.aldsrc && (s ? e.aldstat_qr = t.aldsrc : (wx.setStorageSync("aldstat_src", t.aldsrc), 
            e.aldstat_src = t.aldsrc, e.aldstat_qr = t.aldsrc));
            wx.getStorageSync("aldstat_uuid");
            void 0 !== t.ald_share_src && (e.ald_share_src = t.ald_share_src), this.aldstat_page_args = JSON.stringify(t);
        }
        E(e, this, "load");
    }, E = function(t, s, e) {
        var n = wx.getStorageSync("page_" + e + "_upload");
        if (!(!n && "show" !== e || 1 > n && "number" == typeof n)) {
            s.aldstat_start_time = Date.now(), s.aldstat_error_count = 0, t.aldstat_page_count ? t.aldstat_page_count++ : t.aldstat_page_count = 1, 
            t.aldstat_first_page || (t.aldstat_first_page = s.__route__, s.aldstat_is_first_page = !0), 
            t.aldstat_last_page = s.__route__;
            var o = {
                uu: a(t),
                at: t.aldstat_access_token,
                wsr: t.aldstat_showoption,
                ak: c.app_key,
                ev: "page",
                st: s.aldstat_start_time,
                dr: Date.now() - s.aldstat_start_time,
                pp: s.__route__,
                life: e,
                sc: s.page_share_count,
                ec: s.aldstat_error_count,
                nt: t.aldstat_network_type,
                pm: t.aldstat_phone_model,
                pr: t.aldstat_pixel_ratio,
                ww: t.aldstat_window_width,
                wh: t.aldstat_window_height,
                lang: t.aldstat_language,
                wv: t.aldstat_wechat_version,
                lat: t.aldstat_lat,
                lng: t.aldstat_lng,
                spd: t.aldstat_speed,
                v: l,
                wsdk: t.aldstat_vsdk_version,
                sv: t.aldstat_sv,
                wvv: t.aldstat_wvv
            };
            s.aldstat_is_first_page && (o.ifp = "true"), t.aldstat_page_last_page && (o.lp = t.aldstat_page_last_page), 
            t.aldstat_location_name && (o.ln = t.aldstat_location_name), s.aldstat_page_args && (o.ag = s.aldstat_page_args), 
            t.aldstat_src && (o.sr = t.aldstat_src), t.aldstat_qr && (o.qr = t.aldstat_qr), 
            t.ald_share_src && (o.usr = t.ald_share_src), t.aldstat_page_last_page = s.__route__, 
            w(o, "GET", "d.html");
        }
    }, G = function(t, a) {
        var s = getApp();
        E(s, this, "show");
    }, O = function(t, a) {
        var s = getApp();
        m(s, "event", "ald_pulldownrefresh", 1);
    }, j = function(t, a) {
        var s = getApp();
        m(s, "event", "ald_reachbottom", 1);
    }, N = Page, U = function(a, s) {
        var e = this, n = getApp();
        if (console.log(a[1]), void 0 !== a && void 0 !== a[1]) {
            var o = wx.getStorageSync("aldstat_uuid"), r = wx.getStorageSync(o), _ = "";
            if ("undefined" !== n.ald_share_src && n.ald_share_src) {
                var i = (_ = n.ald_share_src).split(",");
                i.length >= 3 && (i.shift(), _ = i.toString()), "" !== _ && (_ = _ + "," + o);
            } else _ = wx.getStorageSync("aldstat_uuid");
            a[1].path && "undefined" !== a[1].path || (a[1].path = c.defaultPath ? c.defaultPath : e.__route__), 
            a[1].path += -1 != a[1].path.indexOf("?") ? "&ald_share_src=" + _ : "?ald_share_src=" + _, 
            m(n, "event", "ald_share_chain", {
                path: n.aldstat_last_page,
                chain: _
            }), "" === r || void 0 === r ? (wx.setStorageSync(o, 1), r = 1, n.page_share_count = r) : (r = parseInt(wx.getStorageSync(o)) + 1, 
            n.page_share_count = r, wx.setStorageSync(o, r)), (void 0 === c.getShareUserInfo || !0 === c.getShareUserInfo) && g(function(t) {
                var a = wx.getStorageSync("aldstat_uuid");
                t.userInfo.uu = a, w(t.userInfo, "GET", "u.html");
            });
            a[1];
            void 0 === a[1].success && (a[1].success = function(t) {}), void 0 === a[1].fail && (a[1].fail = function(t) {});
            var l = a[1].fail, d = a[1].success;
            return a[1].success = function(a) {
                new Array();
                if ("object" == t(a.shareTickets)) for (var s = 0; s < a.shareTickets.length; s++) S(n, a.shareTickets[s], "user");
                m(n, "event", "ald_share_status", JSON.stringify(a)), d(a);
            }, a[1].fail = function(t) {
                m(n, "event", "ald_share_status", "fail"), l(t);
            }, a[1];
        }
    };
    Page = function(t) {
        e(t, "onLoad", I), e(t, "onUnload", M), e(t, "onShow", G), e(t, "onHide", T), e(t, "onReachBottom", j), 
        e(t, "onPullDownRefresh", O), void 0 !== t.onShareAppMessage && n(t, "onShareAppMessage", U), 
        N(t);
    };
}();