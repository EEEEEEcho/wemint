var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

module.exports = function() {
    var o = {}, t = function(t, n) {
        if (!o[t]) return require(n);
        if (!o[t].status) {
            var r = {
                exports: {}
            };
            o[t].status = 1, o[t].func(o[t].req, r, r.exports), "object" === e(r.exports) ? (Object.keys(r.exports).forEach(function(e) {
                o[t].m.exports[e] = r.exports[e], Object.defineProperty(r.exports, e, {
                    set: function(n) {
                        o[t].m.exports[e] = n;
                    },
                    get: function() {
                        return o[t].m.exports[e];
                    }
                });
            }), r.exports.__esModule && Object.defineProperty(o[t].m.exports, "__esModule", {
                value: !0
            })) : o[t].m.exports = r.exports;
        }
        return o[t].m.exports;
    };
    return function(e, t, n) {
        var r = {
            exports: {}
        };
        o[e] = {
            status: 0,
            func: t,
            req: n,
            m: r
        };
    }(1562481969816, function(o, t, n) {
        !function(o) {
            function r(e) {
                throw RangeError(q[e]);
            }
            function u(e, o) {
                for (var t = e.length, n = []; t--; ) n[t] = o(e[t]);
                return n;
            }
            function i(e, o) {
                var t = e.split("@"), n = "";
                return t.length > 1 && (n = t[0] + "@", e = t[1]), n + u((e = e.replace(_, ".")).split("."), o).join(".");
            }
            function f(e) {
                for (var o, t, n = [], r = 0, u = e.length; r < u; ) (o = e.charCodeAt(r++)) >= 55296 && o <= 56319 && r < u ? 56320 == (64512 & (t = e.charCodeAt(r++))) ? n.push(((1023 & o) << 10) + (1023 & t) + 65536) : (n.push(o), 
                r--) : n.push(o);
                return n;
            }
            function c(e) {
                return u(e, function(e) {
                    var o = "";
                    return e > 65535 && (o += T((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), 
                    o += T(e);
                }).join("");
            }
            function s(e) {
                return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : g;
            }
            function p(e, o) {
                return e + 22 + 75 * (e < 26) - ((0 != o) << 5);
            }
            function l(e, o, t) {
                var n = 0;
                for (e = t ? P(e / S) : e >> 1, e += P(e / o); e > M * j >> 1; n += g) e = P(e / M);
                return P(n + (M + 1) * e / (e + C));
            }
            function d(e) {
                var o, t, n, u, i, f, p, d, a, v, h = [], x = e.length, y = 0, b = O, C = A;
                for ((t = e.lastIndexOf(E)) < 0 && (t = 0), n = 0; n < t; ++n) e.charCodeAt(n) >= 128 && r("not-basic"), 
                h.push(e.charCodeAt(n));
                for (u = t > 0 ? t + 1 : 0; u < x; ) {
                    for (i = y, f = 1, p = g; u >= x && r("invalid-input"), ((d = s(e.charCodeAt(u++))) >= g || d > P((m - y) / f)) && r("overflow"), 
                    y += d * f, a = p <= C ? w : p >= C + j ? j : p - C, !(d < a); p += g) f > P(m / (v = g - a)) && r("overflow"), 
                    f *= v;
                    C = l(y - i, o = h.length + 1, 0 == i), P(y / o) > m - b && r("overflow"), b += P(y / o), 
                    y %= o, h.splice(y++, 0, b);
                }
                return c(h);
            }
            function a(e) {
                var o, t, n, u, i, c, s, d, a, v, h, x, y, b, C, S = [];
                for (x = (e = f(e)).length, o = O, t = 0, i = A, c = 0; c < x; ++c) (h = e[c]) < 128 && S.push(T(h));
                for (n = u = S.length, u && S.push(E); n < x; ) {
                    for (s = m, c = 0; c < x; ++c) (h = e[c]) >= o && h < s && (s = h);
                    for (s - o > P((m - t) / (y = n + 1)) && r("overflow"), t += (s - o) * y, o = s, 
                    c = 0; c < x; ++c) if ((h = e[c]) < o && ++t > m && r("overflow"), h == o) {
                        for (d = t, a = g; v = a <= i ? w : a >= i + j ? j : a - i, !(d < v); a += g) C = d - v, 
                        b = g - v, S.push(T(p(v + C % b, 0))), d = P(C / b);
                        S.push(T(p(d, 0))), i = l(t, y, n == u), t = 0, ++n;
                    }
                    ++t, ++o;
                }
                return S.join("");
            }
            var v = "object" == (void 0 === n ? "undefined" : e(n)) && n && !n.nodeType && n, h = "object" == (void 0 === t ? "undefined" : e(t)) && t && !t.nodeType && t, x = "object" == ("undefined" == typeof global ? "undefined" : e(global)) && global;
            x.global !== x && x.window !== x && x.self !== x || (o = x);
            var y, b, m = 2147483647, g = 36, w = 1, j = 26, C = 38, S = 700, A = 72, O = 128, E = "-", I = /^xn--/, F = /[^\x20-\x7E]/, _ = /[\x2E\u3002\uFF0E\uFF61]/g, q = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            }, M = g - w, P = Math.floor, T = String.fromCharCode;
            if (y = {
                version: "1.3.2",
                ucs2: {
                    decode: f,
                    encode: c
                },
                decode: d,
                encode: a,
                toASCII: function(e) {
                    return i(e, function(e) {
                        return F.test(e) ? "xn--" + a(e) : e;
                    });
                },
                toUnicode: function(e) {
                    return i(e, function(e) {
                        return I.test(e) ? d(e.slice(4).toLowerCase()) : e;
                    });
                }
            }, "function" == typeof define && "object" == e(define.amd) && define.amd) define("punycode", function() {
                return y;
            }); else if (v && h) if (t.exports == v) h.exports = y; else for (b in y) y.hasOwnProperty(b) && (v[b] = y[b]); else o.punycode = y;
        }(this);
    }, function(e) {
        return t({}[e], e);
    }), t(1562481969816);
}();