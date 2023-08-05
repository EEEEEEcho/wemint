function r() {
    return Math.round(4294967295 * Math.random());
}

function n(r, n, t) {
    (!t || t > 4) && (t = 4);
    for (var e = 0, o = n; o < n + t; o++) e <<= 8, e |= r[o];
    return (4294967295 & e) >>> 0;
}

function t(r, n, t) {
    r[n + 3] = t >> 0 & 255, r[n + 2] = t >> 8 & 255, r[n + 1] = t >> 16 & 255, r[n + 0] = t >> 24 & 255;
}

function e(r) {
    if (!r) return "";
    for (var n = "", t = 0; t < r.length; t++) {
        var e = Number(r[t]).toString(16);
        1 == e.length && (e = "0" + e), n += e;
    }
    return n;
}

function o(r) {
    var n, t, e = [], o = r.length;
    for (n = 0; n < o; n++) (t = r.charCodeAt(n)) > 0 && t <= 127 ? e.push(r.charAt(n)) : t >= 128 && t <= 2047 ? e.push(String.fromCharCode(192 | t >> 6 & 31), String.fromCharCode(128 | 63 & t)) : t >= 2048 && t <= 65535 && e.push(String.fromCharCode(224 | t >> 12 & 15), String.fromCharCode(128 | t >> 6 & 63), String.fromCharCode(128 | 63 & t));
    return e.join("");
}

function u(n) {
    v = new Array(8), C = new Array(8), d = y = 0, S = !0, g = 0;
    var t = n.length, e = 0;
    0 != (g = (t + 10) % 8) && (g = 8 - g), p = new Array(t + g + 10), v[0] = 255 & (248 & r() | g);
    for (o = 1; o <= g; o++) v[o] = 255 & r();
    g++;
    for (o = 0; o < 8; o++) C[o] = 0;
    for (e = 1; e <= 2; ) g < 8 && (v[g++] = 255 & r(), e++), 8 == g && f();
    for (var o = 0; t > 0; ) g < 8 && (v[g++] = n[o++], t--), 8 == g && f();
    for (e = 1; e <= 7; ) g < 8 && (v[g++] = 0, e++), 8 == g && f();
    return p;
}

function a(r) {
    var n = 0, t = new Array(8), e = r.length;
    if (m = r, e % 8 != 0 || e < 16) return null;
    if (C = i(r), g = 7 & C[0], (n = e - g - 10) < 0) return null;
    for (u = 0; u < t.length; u++) t[u] = 0;
    p = new Array(n), y = 0, d = 8, g++;
    for (var o = 1; o <= 2; ) if (g < 8 && (g++, o++), 8 == g && (t = r, !c())) return null;
    for (var u = 0; 0 != n; ) if (g < 8 && (p[u] = 255 & (t[y + g] ^ C[g]), u++, n--, 
    g++), 8 == g && (t = r, y = d - 8, !c())) return null;
    for (o = 1; o < 8; o++) {
        if (g < 8) {
            if (0 != (t[y + g] ^ C[g])) return null;
            g++;
        }
        if (8 == g && (t = r, y = d, !c())) return null;
    }
    return p;
}

function f() {
    for (n = 0; n < 8; n++) v[n] ^= S ? C[n] : p[y + n];
    for (var r = h(v), n = 0; n < 8; n++) p[d + n] = r[n] ^ C[n], C[n] = v[n];
    y = d, d += 8, g = 0, S = !1;
}

function h(r) {
    for (var e = 16, o = n(r, 0, 4), u = n(r, 4, 4), a = n(s, 0, 4), f = n(s, 4, 4), h = n(s, 8, 4), i = n(s, 12, 4), c = 0; e-- > 0; ) u = (4294967295 & (u += ((o = (4294967295 & (o += (u << 4) + a ^ u + (c = (4294967295 & (c += 2654435769)) >>> 0) ^ (u >>> 5) + f)) >>> 0) << 4) + h ^ o + c ^ (o >>> 5) + i)) >>> 0;
    var A = new Array(8);
    return t(A, 0, o), t(A, 4, u), A;
}

function i(r) {
    for (var e = 16, o = n(r, 0, 4), u = n(r, 4, 4), a = n(s, 0, 4), f = n(s, 4, 4), h = n(s, 8, 4), i = n(s, 12, 4), c = 3816266640; e-- > 0; ) o = (4294967295 & (o -= ((u = (4294967295 & (u -= (o << 4) + h ^ o + c ^ (o >>> 5) + i)) >>> 0) << 4) + a ^ u + c ^ (u >>> 5) + f)) >>> 0, 
    c = (4294967295 & (c -= 2654435769)) >>> 0;
    var A = new Array(8);
    return t(A, 0, o), t(A, 4, u), A;
}

function c() {
    m.length;
    for (var r = 0; r < 8; r++) C[r] ^= m[d + r];
    return C = i(C), d += 8, g = 0, !0;
}

function A(r, n) {
    var t = [];
    if (n) for (o = 0; o < r.length; o++) t[o] = 255 & r.charCodeAt(o); else for (var e = 0, o = 0; o < r.length; o += 2) t[e++] = parseInt(r.substr(o, 2), 16);
    return t;
}

var l = require("base64.js"), s = "", g = 0, v = [], C = [], d = 0, y = 0, p = [], m = [], S = !0, w = {
    encrypt: function(r, n) {
        return e(u(A(r, n)));
    },
    enAsBase64: function(r, n) {
        for (var t = u(A(r, n)), e = "", o = 0; o < t.length; o++) e += String.fromCharCode(t[o]);
        return l.encode(e);
    },
    decrypt: function(r) {
        return e(a(A(r, !1)));
    },
    initkey: function(r, n) {
        s = A(r, n);
    },
    bytesToStr: function(r) {
        for (var n = "", t = 0; t < r.length; t += 2) n += String.fromCharCode(parseInt(r.substr(t, 2), 16));
        return n;
    },
    strToBytes: function(r, n) {
        if (!r) return "";
        n && (r = o(r));
        for (var t = [], u = 0; u < r.length; u++) t[u] = r.charCodeAt(u);
        return e(t);
    },
    bytesInStr: e,
    dataFromStr: A
};

(l = {}).PADCHAR = "=", l.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", 
l.getbyte = function(r, n) {
    var t = r.charCodeAt(n);
    if (t > 255) throw "INVALID_CHARACTER_ERR: DOM Exception 5";
    return t;
}, l.encode = function(r) {
    if (1 != arguments.length) throw "SyntaxError: Not enough arguments";
    var n, t, e = l.PADCHAR, o = l.ALPHA, u = l.getbyte, a = [], f = (r = "" + r).length - r.length % 3;
    if (0 == r.length) return r;
    for (n = 0; n < f; n += 3) t = u(r, n) << 16 | u(r, n + 1) << 8 | u(r, n + 2), a.push(o.charAt(t >> 18)), 
    a.push(o.charAt(t >> 12 & 63)), a.push(o.charAt(t >> 6 & 63)), a.push(o.charAt(63 & t));
    switch (r.length - f) {
      case 1:
        t = u(r, n) << 16, a.push(o.charAt(t >> 18) + o.charAt(t >> 12 & 63) + e + e);
        break;

      case 2:
        t = u(r, n) << 16 | u(r, n + 1) << 8, a.push(o.charAt(t >> 18) + o.charAt(t >> 12 & 63) + o.charAt(t >> 6 & 63) + e);
    }
    return a.join("");
}, module.exports = w;