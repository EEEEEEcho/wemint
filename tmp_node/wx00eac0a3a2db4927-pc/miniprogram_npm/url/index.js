var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

module.exports = function() {
    var s = {}, e = function(t, e, h) {
        var r = {
            exports: {}
        };
        s[t] = {
            status: 0,
            func: e,
            req: h,
            m: r
        };
    }, h = function(e, h) {
        if (!s[e]) return require(h);
        if (!s[e].status) {
            var r = {
                exports: {}
            };
            s[e].status = 1, s[e].func(s[e].req, r, r.exports), "object" === t(r.exports) ? (Object.keys(r.exports).forEach(function(t) {
                s[e].m.exports[t] = r.exports[t], Object.defineProperty(r.exports, t, {
                    set: function(h) {
                        s[e].m.exports[t] = h;
                    },
                    get: function() {
                        return s[e].m.exports[t];
                    }
                });
            }), r.exports.__esModule && Object.defineProperty(s[e].m.exports, "__esModule", {
                value: !0
            })) : s[e].m.exports = r.exports;
        }
        return s[e].m.exports;
    };
    return e(1562481969820, function(s, e, h) {
        function r() {
            this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, 
            this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, 
            this.path = null, this.href = null;
        }
        function o(t, s, e) {
            if (t && n.isObject(t) && t instanceof r) return t;
            var h = new r();
            return h.parse(t, s, e), h;
        }
        var a = s("punycode"), n = s("./util");
        h.parse = o, h.resolve = function(t, s) {
            return o(t, !1, !0).resolve(s);
        }, h.resolveObject = function(t, s) {
            return t ? o(t, !1, !0).resolveObject(s) : s;
        }, h.format = function(t) {
            return n.isString(t) && (t = o(t)), t instanceof r ? t.format() : r.prototype.format.call(t);
        }, h.Url = r;
        var i = /^([a-z0-9.+-]+:)/i, l = /:[0-9]*$/, u = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, p = [ "<", ">", '"', "`", " ", "\r", "\n", "\t" ], c = [ "{", "}", "|", "\\", "^", "`" ].concat(p), f = [ "'" ].concat(c), m = [ "%", "/", "?", ";", "#" ].concat(f), v = [ "/", "?", "#" ], y = /^[+a-z0-9A-Z_-]{0,63}$/, g = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, b = {
            javascript: !0,
            "javascript:": !0
        }, d = {
            javascript: !0,
            "javascript:": !0
        }, x = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0
        }, O = s("querystring");
        r.prototype.parse = function(s, e, h) {
            if (!n.isString(s)) throw new TypeError("Parameter 'url' must be a string, not " + (void 0 === s ? "undefined" : t(s)));
            var r = s.indexOf("?"), o = -1 !== r && r < s.indexOf("#") ? "?" : "#", l = s.split(o), p = /\\/g;
            l[0] = l[0].replace(p, "/");
            var c = s = l.join(o);
            if (c = c.trim(), !h && 1 === s.split("#").length) {
                var j = u.exec(c);
                if (j) return this.path = c, this.href = c, this.pathname = j[1], j[2] ? (this.search = j[2], 
                this.query = e ? O.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "", 
                this.query = {}), this;
            }
            var q = i.exec(c);
            if (q) {
                var A = (q = q[0]).toLowerCase();
                this.protocol = A, c = c.substr(q.length);
            }
            if (h || q || c.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                var S = "//" === c.substr(0, 2);
                !S || q && d[q] || (c = c.substr(2), this.slashes = !0);
            }
            if (!d[q] && (S || q && !x[q])) {
                for (var C = -1, I = 0; I < v.length; I++) -1 !== (U = c.indexOf(v[I])) && (-1 === C || U < C) && (C = U);
                var w, N;
                -1 !== (N = -1 === C ? c.lastIndexOf("@") : c.lastIndexOf("@", C)) && (w = c.slice(0, N), 
                c = c.slice(N + 1), this.auth = decodeURIComponent(w)), C = -1;
                for (I = 0; I < m.length; I++) {
                    var U = c.indexOf(m[I]);
                    -1 !== U && (-1 === C || U < C) && (C = U);
                }
                -1 === C && (C = c.length), this.host = c.slice(0, C), c = c.slice(C), this.parseHost(), 
                this.hostname = this.hostname || "";
                var k = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                if (!k) for (var _ = this.hostname.split(/\./), I = 0, R = _.length; I < R; I++) {
                    var $ = _[I];
                    if ($ && !$.match(y)) {
                        for (var z = "", P = 0, E = $.length; P < E; P++) $.charCodeAt(P) > 127 ? z += "x" : z += $[P];
                        if (!z.match(y)) {
                            var H = _.slice(0, I), L = _.slice(I + 1), M = $.match(g);
                            M && (H.push(M[1]), L.unshift(M[2])), L.length && (c = "/" + L.join(".") + c), this.hostname = H.join(".");
                            break;
                        }
                    }
                }
                this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), 
                k || (this.hostname = a.toASCII(this.hostname));
                var Z = this.port ? ":" + this.port : "", T = this.hostname || "";
                this.host = T + Z, this.href += this.host, k && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), 
                "/" !== c[0] && (c = "/" + c));
            }
            if (!b[A]) for (var I = 0, R = f.length; I < R; I++) {
                var B = f[I];
                if (-1 !== c.indexOf(B)) {
                    var D = encodeURIComponent(B);
                    D === B && (D = escape(B)), c = c.split(B).join(D);
                }
            }
            var F = c.indexOf("#");
            -1 !== F && (this.hash = c.substr(F), c = c.slice(0, F));
            var G = c.indexOf("?");
            if (-1 !== G ? (this.search = c.substr(G), this.query = c.substr(G + 1), e && (this.query = O.parse(this.query)), 
            c = c.slice(0, G)) : e && (this.search = "", this.query = {}), c && (this.pathname = c), 
            x[A] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
                var Z = this.pathname || "", J = this.search || "";
                this.path = Z + J;
            }
            return this.href = this.format(), this;
        }, r.prototype.format = function() {
            var t = this.auth || "";
            t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
            var s = this.protocol || "", e = this.pathname || "", h = this.hash || "", r = !1, o = "";
            this.host ? r = t + this.host : this.hostname && (r = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), 
            this.port && (r += ":" + this.port)), this.query && n.isObject(this.query) && Object.keys(this.query).length && (o = O.stringify(this.query));
            var a = this.search || o && "?" + o || "";
            return s && ":" !== s.substr(-1) && (s += ":"), this.slashes || (!s || x[s]) && !1 !== r ? (r = "//" + (r || ""), 
            e && "/" !== e.charAt(0) && (e = "/" + e)) : r || (r = ""), h && "#" !== h.charAt(0) && (h = "#" + h), 
            a && "?" !== a.charAt(0) && (a = "?" + a), e = e.replace(/[?#]/g, function(t) {
                return encodeURIComponent(t);
            }), a = a.replace("#", "%23"), s + r + e + a + h;
        }, r.prototype.resolve = function(t) {
            return this.resolveObject(o(t, !1, !0)).format();
        }, r.prototype.resolveObject = function(t) {
            if (n.isString(t)) {
                var s = new r();
                s.parse(t, !1, !0), t = s;
            }
            for (var e = new r(), h = Object.keys(this), o = 0; o < h.length; o++) {
                var a = h[o];
                e[a] = this[a];
            }
            if (e.hash = t.hash, "" === t.href) return e.href = e.format(), e;
            if (t.slashes && !t.protocol) {
                for (var i = Object.keys(t), l = 0; l < i.length; l++) {
                    var u = i[l];
                    "protocol" !== u && (e[u] = t[u]);
                }
                return x[e.protocol] && e.hostname && !e.pathname && (e.path = e.pathname = "/"), 
                e.href = e.format(), e;
            }
            if (t.protocol && t.protocol !== e.protocol) {
                if (!x[t.protocol]) {
                    for (var p = Object.keys(t), c = 0; c < p.length; c++) {
                        var f = p[c];
                        e[f] = t[f];
                    }
                    return e.href = e.format(), e;
                }
                if (e.protocol = t.protocol, t.host || d[t.protocol]) e.pathname = t.pathname; else {
                    for (q = (t.pathname || "").split("/"); q.length && !(t.host = q.shift()); ) ;
                    t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== q[0] && q.unshift(""), 
                    q.length < 2 && q.unshift(""), e.pathname = q.join("/");
                }
                if (e.search = t.search, e.query = t.query, e.host = t.host || "", e.auth = t.auth, 
                e.hostname = t.hostname || t.host, e.port = t.port, e.pathname || e.search) {
                    var m = e.pathname || "", v = e.search || "";
                    e.path = m + v;
                }
                return e.slashes = e.slashes || t.slashes, e.href = e.format(), e;
            }
            var y = e.pathname && "/" === e.pathname.charAt(0), g = t.host || t.pathname && "/" === t.pathname.charAt(0), b = g || y || e.host && t.pathname, O = b, j = e.pathname && e.pathname.split("/") || [], q = t.pathname && t.pathname.split("/") || [], A = e.protocol && !x[e.protocol];
            if (A && (e.hostname = "", e.port = null, e.host && ("" === j[0] ? j[0] = e.host : j.unshift(e.host)), 
            e.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === q[0] ? q[0] = t.host : q.unshift(t.host)), 
            t.host = null), b = b && ("" === q[0] || "" === j[0])), g) e.host = t.host || "" === t.host ? t.host : e.host, 
            e.hostname = t.hostname || "" === t.hostname ? t.hostname : e.hostname, e.search = t.search, 
            e.query = t.query, j = q; else if (q.length) j || (j = []), j.pop(), j = j.concat(q), 
            e.search = t.search, e.query = t.query; else if (!n.isNullOrUndefined(t.search)) return A && (e.hostname = e.host = j.shift(), 
            (U = !!(e.host && e.host.indexOf("@") > 0) && e.host.split("@")) && (e.auth = U.shift(), 
            e.host = e.hostname = U.shift())), e.search = t.search, e.query = t.query, n.isNull(e.pathname) && n.isNull(e.search) || (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")), 
            e.href = e.format(), e;
            if (!j.length) return e.pathname = null, e.search ? e.path = "/" + e.search : e.path = null, 
            e.href = e.format(), e;
            for (var S = j.slice(-1)[0], C = (e.host || t.host || j.length > 1) && ("." === S || ".." === S) || "" === S, I = 0, w = j.length; w >= 0; w--) "." === (S = j[w]) ? j.splice(w, 1) : ".." === S ? (j.splice(w, 1), 
            I++) : I && (j.splice(w, 1), I--);
            if (!b && !O) for (;I--; I) j.unshift("..");
            !b || "" === j[0] || j[0] && "/" === j[0].charAt(0) || j.unshift(""), C && "/" !== j.join("/").substr(-1) && j.push("");
            var N = "" === j[0] || j[0] && "/" === j[0].charAt(0);
            if (A) {
                e.hostname = e.host = N ? "" : j.length ? j.shift() : "";
                var U = !!(e.host && e.host.indexOf("@") > 0) && e.host.split("@");
                U && (e.auth = U.shift(), e.host = e.hostname = U.shift());
            }
            return (b = b || e.host && j.length) && !N && j.unshift(""), j.length ? e.pathname = j.join("/") : (e.pathname = null, 
            e.path = null), n.isNull(e.pathname) && n.isNull(e.search) || (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")), 
            e.auth = t.auth || e.auth, e.slashes = e.slashes || t.slashes, e.href = e.format(), 
            e;
        }, r.prototype.parseHost = function() {
            var t = this.host, s = l.exec(t);
            s && (":" !== (s = s[0]) && (this.port = s.substr(1)), t = t.substr(0, t.length - s.length)), 
            t && (this.hostname = t);
        };
    }, function(t) {
        return h({
            "./util": 1562481969821
        }[t], t);
    }), e(1562481969821, function(s, e, h) {
        e.exports = {
            isString: function(t) {
                return "string" == typeof t;
            },
            isObject: function(s) {
                return "object" === (void 0 === s ? "undefined" : t(s)) && null !== s;
            },
            isNull: function(t) {
                return null === t;
            },
            isNullOrUndefined: function(t) {
                return null == t;
            }
        };
    }, function(t) {
        return h({}[t], t);
    }), h(1562481969820);
}();