module.exports = function() {
    function t(t, i) {
        return new s(t, i);
    }
    function i(t, i) {
        if (i < t.length + 11) return uv_alert("Message too long for RSA"), null;
        for (var r = new Array(), o = t.length - 1; o >= 0 && i > 0; ) {
            var h = t.charCodeAt(o--);
            r[--i] = h;
        }
        r[--i] = 0;
        for (var n = new m(), e = new Array(); i > 2; ) {
            for (e[0] = 0; 0 == e[0]; ) n.nextBytes(e);
            r[--i] = e[0];
        }
        return r[--i] = 2, r[--i] = 0, new s(r);
    }
    function r() {
        this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, 
        this.dmq1 = null, this.coeff = null;
    }
    function s(t, i, r) {
        null != t && ("number" == typeof t ? this.fromNumber(t, i, r) : null == i && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, i));
    }
    function o() {
        return new s(null);
    }
    function h(t) {
        return B.charAt(t);
    }
    function n(t, i) {
        var r = d[t.charCodeAt(i)];
        return null == r ? -1 : r;
    }
    function e(t) {
        var i = o();
        return i.fromInt(t), i;
    }
    function u(t) {
        var i, r = 1;
        return 0 != (i = t >>> 16) && (t = i, r += 16), 0 != (i = t >> 8) && (t = i, r += 8), 
        0 != (i = t >> 4) && (t = i, r += 4), 0 != (i = t >> 2) && (t = i, r += 2), 0 != (i = t >> 1) && (t = i, 
        r += 1), r;
    }
    function f(t) {
        this.m = t;
    }
    function p(t) {
        this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, 
        this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t;
    }
    function a(t) {
        S[b++] ^= 255 & t, S[b++] ^= t >> 8 & 255, S[b++] ^= t >> 16 & 255, S[b++] ^= t >> 24 & 255, 
        b >= g && (b -= g);
    }
    function l() {
        a(new Date().getTime());
    }
    function c() {
        if (null == A) {
            for (l(), (A = y()).init(S), b = 0; b < S.length; ++b) S[b] = 0;
            b = 0;
        }
        return A.next();
    }
    function m() {}
    function v() {
        this.i = 0, this.j = 0, this.S = new Array();
    }
    function y() {
        return new v();
    }
    r.prototype.doPublic = function(t) {
        return t.modPowInt(this.e, this.n);
    }, r.prototype.setPublic = function(i, r) {
        null != i && null != r && i.length > 0 && r.length > 0 ? (this.n = t(i, 16), this.e = parseInt(r, 16)) : uv_alert("Invalid RSA public key");
    }, r.prototype.encrypt = function(t) {
        var r = i(t, this.n.bitLength() + 7 >> 3);
        if (null == r) return null;
        var s = this.doPublic(r);
        if (null == s) return null;
        var o = s.toString(16);
        return 0 == (1 & o.length) ? o : "0" + o;
    };
    s.prototype.am = function(t, i, r, s, o, h) {
        for (var n = 16383 & i, e = i >> 14; --h >= 0; ) {
            var u = 16383 & this[t], f = this[t++] >> 14, p = e * u + f * n;
            o = ((u = n * u + ((16383 & p) << 14) + r[s] + o) >> 28) + (p >> 14) + e * f, r[s++] = 268435455 & u;
        }
        return o;
    }, s.prototype.DB = 28, s.prototype.DM = 268435455, s.prototype.DV = 1 << 28;
    s.prototype.FV = Math.pow(2, 52), s.prototype.F1 = 24, s.prototype.F2 = 4;
    var D, T, B = "0123456789abcdefghijklmnopqrstuvwxyz", d = new Array();
    for (D = "0".charCodeAt(0), T = 0; T <= 9; ++T) d[D++] = T;
    for (D = "a".charCodeAt(0), T = 10; T < 36; ++T) d[D++] = T;
    for (D = "A".charCodeAt(0), T = 10; T < 36; ++T) d[D++] = T;
    f.prototype.convert = function(t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
    }, f.prototype.revert = function(t) {
        return t;
    }, f.prototype.reduce = function(t) {
        t.divRemTo(this.m, null, t);
    }, f.prototype.mulTo = function(t, i, r) {
        t.multiplyTo(i, r), this.reduce(r);
    }, f.prototype.sqrTo = function(t, i) {
        t.squareTo(i), this.reduce(i);
    }, p.prototype.convert = function(t) {
        var i = o();
        return t.abs().dlShiftTo(this.m.t, i), i.divRemTo(this.m, null, i), t.s < 0 && i.compareTo(s.ZERO) > 0 && this.m.subTo(i, i), 
        i;
    }, p.prototype.revert = function(t) {
        var i = o();
        return t.copyTo(i), this.reduce(i), i;
    }, p.prototype.reduce = function(t) {
        for (;t.t <= this.mt2; ) t[t.t++] = 0;
        for (var i = 0; i < this.m.t; ++i) {
            var r = 32767 & t[i], s = r * this.mpl + ((r * this.mph + (t[i] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (t[r = i + this.m.t] += this.m.am(0, s, t, i, 0, this.m.t); t[r] >= t.DV; ) t[r] -= t.DV, 
            t[++r]++;
        }
        t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t);
    }, p.prototype.mulTo = function(t, i, r) {
        t.multiplyTo(i, r), this.reduce(r);
    }, p.prototype.sqrTo = function(t, i) {
        t.squareTo(i), this.reduce(i);
    }, s.prototype.copyTo = function(t) {
        for (var i = this.t - 1; i >= 0; --i) t[i] = this[i];
        t.t = this.t, t.s = this.s;
    }, s.prototype.fromInt = function(t) {
        this.t = 1, this.s = t < 0 ? -1 : 0, t > 0 ? this[0] = t : t < -1 ? this[0] = t + DV : this.t = 0;
    }, s.prototype.fromString = function(t, i) {
        var r;
        if (16 == i) r = 4; else if (8 == i) r = 3; else if (256 == i) r = 8; else if (2 == i) r = 1; else if (32 == i) r = 5; else {
            if (4 != i) return void this.fromRadix(t, i);
            r = 2;
        }
        this.t = 0, this.s = 0;
        for (var o = t.length, h = !1, e = 0; --o >= 0; ) {
            var u = 8 == r ? 255 & t[o] : n(t, o);
            u < 0 ? "-" == t.charAt(o) && (h = !0) : (h = !1, 0 == e ? this[this.t++] = u : e + r > this.DB ? (this[this.t - 1] |= (u & (1 << this.DB - e) - 1) << e, 
            this[this.t++] = u >> this.DB - e) : this[this.t - 1] |= u << e, (e += r) >= this.DB && (e -= this.DB));
        }
        8 == r && 0 != (128 & t[0]) && (this.s = -1, e > 0 && (this[this.t - 1] |= (1 << this.DB - e) - 1 << e)), 
        this.clamp(), h && s.ZERO.subTo(this, this);
    }, s.prototype.clamp = function() {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; ) --this.t;
    }, s.prototype.dlShiftTo = function(t, i) {
        var r;
        for (r = this.t - 1; r >= 0; --r) i[r + t] = this[r];
        for (r = t - 1; r >= 0; --r) i[r] = 0;
        i.t = this.t + t, i.s = this.s;
    }, s.prototype.drShiftTo = function(t, i) {
        for (var r = t; r < this.t; ++r) i[r - t] = this[r];
        i.t = Math.max(this.t - t, 0), i.s = this.s;
    }, s.prototype.lShiftTo = function(t, i) {
        var r, s = t % this.DB, o = this.DB - s, h = (1 << o) - 1, n = Math.floor(t / this.DB), e = this.s << s & this.DM;
        for (r = this.t - 1; r >= 0; --r) i[r + n + 1] = this[r] >> o | e, e = (this[r] & h) << s;
        for (r = n - 1; r >= 0; --r) i[r] = 0;
        i[n] = e, i.t = this.t + n + 1, i.s = this.s, i.clamp();
    }, s.prototype.rShiftTo = function(t, i) {
        i.s = this.s;
        var r = Math.floor(t / this.DB);
        if (r >= this.t) i.t = 0; else {
            var s = t % this.DB, o = this.DB - s, h = (1 << s) - 1;
            i[0] = this[r] >> s;
            for (var n = r + 1; n < this.t; ++n) i[n - r - 1] |= (this[n] & h) << o, i[n - r] = this[n] >> s;
            s > 0 && (i[this.t - r - 1] |= (this.s & h) << o), i.t = this.t - r, i.clamp();
        }
    }, s.prototype.subTo = function(t, i) {
        for (var r = 0, s = 0, o = Math.min(t.t, this.t); r < o; ) s += this[r] - t[r], 
        i[r++] = s & this.DM, s >>= this.DB;
        if (t.t < this.t) {
            for (s -= t.s; r < this.t; ) s += this[r], i[r++] = s & this.DM, s >>= this.DB;
            s += this.s;
        } else {
            for (s += this.s; r < t.t; ) s -= t[r], i[r++] = s & this.DM, s >>= this.DB;
            s -= t.s;
        }
        i.s = s < 0 ? -1 : 0, s < -1 ? i[r++] = this.DV + s : s > 0 && (i[r++] = s), i.t = r, 
        i.clamp();
    }, s.prototype.multiplyTo = function(t, i) {
        var r = this.abs(), o = t.abs(), h = r.t;
        for (i.t = h + o.t; --h >= 0; ) i[h] = 0;
        for (h = 0; h < o.t; ++h) i[h + r.t] = r.am(0, o[h], i, h, 0, r.t);
        i.s = 0, i.clamp(), this.s != t.s && s.ZERO.subTo(i, i);
    }, s.prototype.squareTo = function(t) {
        for (var i = this.abs(), r = t.t = 2 * i.t; --r >= 0; ) t[r] = 0;
        for (r = 0; r < i.t - 1; ++r) {
            var s = i.am(r, i[r], t, 2 * r, 0, 1);
            (t[r + i.t] += i.am(r + 1, 2 * i[r], t, 2 * r + 1, s, i.t - r - 1)) >= i.DV && (t[r + i.t] -= i.DV, 
            t[r + i.t + 1] = 1);
        }
        t.t > 0 && (t[t.t - 1] += i.am(r, i[r], t, 2 * r, 0, 1)), t.s = 0, t.clamp();
    }, s.prototype.divRemTo = function(t, i, r) {
        var h = t.abs();
        if (!(h.t <= 0)) {
            var n = this.abs();
            if (n.t < h.t) return null != i && i.fromInt(0), void (null != r && this.copyTo(r));
            null == r && (r = o());
            var e = o(), f = this.s, p = t.s, a = this.DB - u(h[h.t - 1]);
            a > 0 ? (h.lShiftTo(a, e), n.lShiftTo(a, r)) : (h.copyTo(e), n.copyTo(r));
            var l = e.t, c = e[l - 1];
            if (0 != c) {
                var m = c * (1 << this.F1) + (l > 1 ? e[l - 2] >> this.F2 : 0), v = this.FV / m, y = (1 << this.F1) / m, D = 1 << this.F2, T = r.t, B = T - l, d = null == i ? o() : i;
                for (e.dlShiftTo(B, d), r.compareTo(d) >= 0 && (r[r.t++] = 1, r.subTo(d, r)), s.ONE.dlShiftTo(l, d), 
                d.subTo(e, e); e.t < l; ) e[e.t++] = 0;
                for (;--B >= 0; ) {
                    var A = r[--T] == c ? this.DM : Math.floor(r[T] * v + (r[T - 1] + D) * y);
                    if ((r[T] += e.am(0, A, r, B, 0, l)) < A) for (e.dlShiftTo(B, d), r.subTo(d, r); r[T] < --A; ) r.subTo(d, r);
                }
                null != i && (r.drShiftTo(l, i), f != p && s.ZERO.subTo(i, i)), r.t = l, r.clamp(), 
                a > 0 && r.rShiftTo(a, r), f < 0 && s.ZERO.subTo(r, r);
            }
        }
    }, s.prototype.invDigit = function() {
        if (this.t < 1) return 0;
        var t = this[0];
        if (0 == (1 & t)) return 0;
        var i = 3 & t;
        return i = i * (2 - (15 & t) * i) & 15, i = i * (2 - (255 & t) * i) & 255, i = i * (2 - ((65535 & t) * i & 65535)) & 65535, 
        (i = i * (2 - t * i % this.DV) % this.DV) > 0 ? this.DV - i : -i;
    }, s.prototype.isEven = function() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s);
    }, s.prototype.exp = function(t, i) {
        if (t > 4294967295 || t < 1) return s.ONE;
        var r = o(), h = o(), n = i.convert(this), e = u(t) - 1;
        for (n.copyTo(r); --e >= 0; ) if (i.sqrTo(r, h), (t & 1 << e) > 0) i.mulTo(h, n, r); else {
            var f = r;
            r = h, h = f;
        }
        return i.revert(r);
    }, s.prototype.toString = function(t) {
        if (this.s < 0) return "-" + this.negate().toString(t);
        var i;
        if (16 == t) i = 4; else if (8 == t) i = 3; else if (2 == t) i = 1; else if (32 == t) i = 5; else {
            if (4 != t) return this.toRadix(t);
            i = 2;
        }
        var r, s = (1 << i) - 1, o = !1, n = "", e = this.t, u = this.DB - e * this.DB % i;
        if (e-- > 0) for (u < this.DB && (r = this[e] >> u) > 0 && (o = !0, n = h(r)); e >= 0; ) u < i ? (r = (this[e] & (1 << u) - 1) << i - u, 
        r |= this[--e] >> (u += this.DB - i)) : (r = this[e] >> (u -= i) & s, u <= 0 && (u += this.DB, 
        --e)), r > 0 && (o = !0), o && (n += h(r));
        return o ? n : "0";
    }, s.prototype.negate = function() {
        var t = o();
        return s.ZERO.subTo(this, t), t;
    }, s.prototype.abs = function() {
        return this.s < 0 ? this.negate() : this;
    }, s.prototype.compareTo = function(t) {
        var i = this.s - t.s;
        if (0 != i) return i;
        var r = this.t;
        if (0 != (i = r - t.t)) return i;
        for (;--r >= 0; ) if (0 != (i = this[r] - t[r])) return i;
        return 0;
    }, s.prototype.bitLength = function() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + u(this[this.t - 1] ^ this.s & this.DM);
    }, s.prototype.mod = function(t) {
        var i = o();
        return this.abs().divRemTo(t, null, i), this.s < 0 && i.compareTo(s.ZERO) > 0 && t.subTo(i, i), 
        i;
    }, s.prototype.modPowInt = function(t, i) {
        var r;
        return r = t < 256 || i.isEven() ? new f(i) : new p(i), this.exp(t, r);
    }, s.ZERO = e(0), s.ONE = e(1);
    var A, S, b;
    if (null == S) {
        S = new Array(), b = 0;
        for (var F; b < g; ) F = Math.floor(65536 * Math.random()), S[b++] = F >>> 8, S[b++] = 255 & F;
        b = 0, l();
    }
    m.prototype.nextBytes = function(t) {
        var i;
        for (i = 0; i < t.length; ++i) t[i] = c();
    }, v.prototype.init = function(t) {
        var i, r, s;
        for (i = 0; i < 256; ++i) this.S[i] = i;
        for (r = 0, i = 0; i < 256; ++i) r = r + this.S[i] + t[i % t.length] & 255, s = this.S[i], 
        this.S[i] = this.S[r], this.S[r] = s;
        this.i = 0, this.j = 0;
    }, v.prototype.next = function() {
        var t;
        return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], 
        this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255];
    };
    var g = 256;
    return {
        encrypt: function(t, i, s) {
            i = i || "F20CE00BAE5361F8FA3AE9CEFA495362FF7DA1BA628F64A347F0A8C012BF0B254A30CD92ABFFE7A6EE0DC424CB6166F8819EFA5BCCB20EDFB4AD02E412CCF579B1CA711D55B8B0B3AEB60153D5E0693A2A86F3167D7847A0CB8B00004716A9095D9BADC977CBB804DBDCBA6029A9710869A453F27DFDDF83C016D928B3CBF4C7", 
            s = s || "3";
            var o = new r();
            return o.setPublic(i, s), o.encrypt(t);
        }
    };
}();