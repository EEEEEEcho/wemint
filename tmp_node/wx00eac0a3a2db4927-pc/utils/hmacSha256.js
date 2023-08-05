var t = t || function(t, n) {
    var i = {}, e = i.lib = {}, r = function() {}, s = e.Base = {
        extend: function(t) {
            r.prototype = this;
            var n = new r();
            return t && n.mixIn(t), n.hasOwnProperty("init") || (n.init = function() {
                n.$super.init.apply(this, arguments);
            }), n.init.prototype = n, n.$super = this, n;
        },
        create: function() {
            var t = this.extend();
            return t.init.apply(t, arguments), t;
        },
        init: function() {},
        mixIn: function(t) {
            for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
            t.hasOwnProperty("toString") && (this.toString = t.toString);
        },
        clone: function() {
            return this.init.prototype.extend(this);
        }
    }, o = e.WordArray = s.extend({
        init: function(t, n) {
            t = this.words = t || [], this.sigBytes = void 0 != n ? n : 4 * t.length;
        },
        toString: function(t) {
            return (t || c).stringify(this);
        },
        concat: function(t) {
            var n = this.words, i = t.words, e = this.sigBytes;
            if (t = t.sigBytes, this.clamp(), e % 4) for (var r = 0; r < t; r++) n[e + r >>> 2] |= (i[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 24 - (e + r) % 4 * 8; else if (65535 < i.length) for (r = 0; r < t; r += 4) n[e + r >>> 2] = i[r >>> 2]; else n.push.apply(n, i);
            return this.sigBytes += t, this;
        },
        clamp: function() {
            var n = this.words, i = this.sigBytes;
            n[i >>> 2] &= 4294967295 << 32 - i % 4 * 8, n.length = t.ceil(i / 4);
        },
        clone: function() {
            var t = s.clone.call(this);
            return t.words = this.words.slice(0), t;
        },
        random: function(n) {
            for (var i = [], e = 0; e < n; e += 4) i.push(4294967296 * t.random() | 0);
            return new o.init(i, n);
        }
    }), a = i.enc = {}, c = a.Hex = {
        stringify: function(t) {
            var n = t.words;
            t = t.sigBytes;
            for (var i = [], e = 0; e < t; e++) {
                var r = n[e >>> 2] >>> 24 - e % 4 * 8 & 255;
                i.push((r >>> 4).toString(16)), i.push((15 & r).toString(16));
            }
            return i.join("");
        },
        parse: function(t) {
            for (var n = t.length, i = [], e = 0; e < n; e += 2) i[e >>> 3] |= parseInt(t.substr(e, 2), 16) << 24 - e % 8 * 4;
            return new o.init(i, n / 2);
        }
    }, h = a.Latin1 = {
        stringify: function(t) {
            var n = t.words;
            t = t.sigBytes;
            for (var i = [], e = 0; e < t; e++) i.push(String.fromCharCode(n[e >>> 2] >>> 24 - e % 4 * 8 & 255));
            return i.join("");
        },
        parse: function(t) {
            for (var n = t.length, i = [], e = 0; e < n; e++) i[e >>> 2] |= (255 & t.charCodeAt(e)) << 24 - e % 4 * 8;
            return new o.init(i, n);
        }
    }, f = a.Utf8 = {
        stringify: function(t) {
            try {
                return decodeURIComponent(escape(h.stringify(t)));
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                throw Error("Malformed UTF-8 data");
            }
        },
        parse: function(t) {
            return h.parse(unescape(encodeURIComponent(t)));
        }
    }, u = e.BufferedBlockAlgorithm = s.extend({
        reset: function() {
            this._data = new o.init(), this._nDataBytes = 0;
        },
        _append: function(t) {
            "string" == typeof t && (t = f.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes;
        },
        _process: function(n) {
            var i = this._data, e = i.words, r = i.sigBytes, s = this.blockSize, a = r / (4 * s);
            if (n = (a = n ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0)) * s, r = t.min(4 * n, r), 
            n) {
                for (var c = 0; c < n; c += s) this._doProcessBlock(e, c);
                c = e.splice(0, n), i.sigBytes -= r;
            }
            return new o.init(c, r);
        },
        clone: function() {
            var t = s.clone.call(this);
            return t._data = this._data.clone(), t;
        },
        _minBufferSize: 0
    });
    e.Hasher = u.extend({
        cfg: s.extend(),
        init: function(t) {
            this.cfg = this.cfg.extend(t), this.reset();
        },
        reset: function() {
            u.reset.call(this), this._doReset();
        },
        update: function(t) {
            return this._append(t), this._process(), this;
        },
        finalize: function(t) {
            return t && this._append(t), this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function(t) {
            return function(n, i) {
                return new t.init(i).finalize(n);
            };
        },
        _createHmacHelper: function(t) {
            return function(n, i) {
                return new l.HMAC.init(t, i).finalize(n);
            };
        }
    });
    var l = i.algo = {};
    return i;
}(Math);

!function(n) {
    for (var i = t, e = (s = i.lib).WordArray, r = s.Hasher, s = i.algo, o = [], a = [], c = function(t) {
        return 4294967296 * (t - (0 | t)) | 0;
    }, h = 2, f = 0; 64 > f; ) {
        var u;
        t: {
            u = h;
            for (var l = n.sqrt(u), p = 2; p <= l; p++) if (!(u % p)) {
                u = !1;
                break t;
            }
            u = !0;
        }
        u && (8 > f && (o[f] = c(n.pow(h, .5))), a[f] = c(n.pow(h, 1 / 3)), f++), h++;
    }
    var d = [], s = s.SHA256 = r.extend({
        _doReset: function() {
            this._hash = new e.init(o.slice(0));
        },
        _doProcessBlock: function(t, n) {
            for (var i = this._hash.words, e = i[0], r = i[1], s = i[2], o = i[3], c = i[4], h = i[5], f = i[6], u = i[7], l = 0; 64 > l; l++) {
                if (16 > l) d[l] = 0 | t[n + l]; else {
                    var p = d[l - 15], g = d[l - 2];
                    d[l] = ((p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3) + d[l - 7] + ((g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10) + d[l - 16];
                }
                p = u + ((c << 26 | c >>> 6) ^ (c << 21 | c >>> 11) ^ (c << 7 | c >>> 25)) + (c & h ^ ~c & f) + a[l] + d[l], 
                g = ((e << 30 | e >>> 2) ^ (e << 19 | e >>> 13) ^ (e << 10 | e >>> 22)) + (e & r ^ e & s ^ r & s), 
                u = f, f = h, h = c, c = o + p | 0, o = s, s = r, r = e, e = p + g | 0;
            }
            i[0] = i[0] + e | 0, i[1] = i[1] + r | 0, i[2] = i[2] + s | 0, i[3] = i[3] + o | 0, 
            i[4] = i[4] + c | 0, i[5] = i[5] + h | 0, i[6] = i[6] + f | 0, i[7] = i[7] + u | 0;
        },
        _doFinalize: function() {
            var t = this._data, i = t.words, e = 8 * this._nDataBytes, r = 8 * t.sigBytes;
            return i[r >>> 5] |= 128 << 24 - r % 32, i[14 + (r + 64 >>> 9 << 4)] = n.floor(e / 4294967296), 
            i[15 + (r + 64 >>> 9 << 4)] = e, t.sigBytes = 4 * i.length, this._process(), this._hash;
        },
        clone: function() {
            var t = r.clone.call(this);
            return t._hash = this._hash.clone(), t;
        }
    });
    i.SHA256 = r._createHelper(s), i.HmacSHA256 = r._createHmacHelper(s);
}(Math), function() {
    var n = t, i = n.enc.Utf8;
    n.algo.HMAC = n.lib.Base.extend({
        init: function(t, n) {
            t = this._hasher = new t.init(), "string" == typeof n && (n = i.parse(n));
            var e = t.blockSize, r = 4 * e;
            n.sigBytes > r && (n = t.finalize(n)), n.clamp();
            for (var s = this._oKey = n.clone(), o = this._iKey = n.clone(), a = s.words, c = o.words, h = 0; h < e; h++) a[h] ^= 1549556828, 
            c[h] ^= 909522486;
            s.sigBytes = o.sigBytes = r, this.reset();
        },
        reset: function() {
            var t = this._hasher;
            t.reset(), t.update(this._iKey);
        },
        update: function(t) {
            return this._hasher.update(t), this;
        },
        finalize: function(t) {
            var n = this._hasher;
            return t = n.finalize(t), n.reset(), n.finalize(this._oKey.clone().concat(t));
        }
    });
}(), module.exports = t;