var t = t || function(t, n) {
    var i = {}, r = i.lib = {}, e = function() {}, s = r.Base = {
        extend: function(t) {
            e.prototype = this;
            var n = new e();
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
    }, o = r.WordArray = s.extend({
        init: function(t, n) {
            t = this.words = t || [], this.sigBytes = void 0 != n ? n : 4 * t.length;
        },
        toString: function(t) {
            return (t || c).stringify(this);
        },
        concat: function(t) {
            var n = this.words, i = t.words, r = this.sigBytes;
            if (t = t.sigBytes, this.clamp(), r % 4) for (var e = 0; e < t; e++) n[r + e >>> 2] |= (i[e >>> 2] >>> 24 - e % 4 * 8 & 255) << 24 - (r + e) % 4 * 8; else if (65535 < i.length) for (e = 0; e < t; e += 4) n[r + e >>> 2] = i[e >>> 2]; else n.push.apply(n, i);
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
            for (var i = [], r = 0; r < n; r += 4) i.push(4294967296 * t.random() | 0);
            return new o.init(i, n);
        }
    }), a = i.enc = {}, c = a.Hex = {
        stringify: function(t) {
            var n = t.words;
            t = t.sigBytes;
            for (var i = [], r = 0; r < t; r++) {
                var e = n[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                i.push((e >>> 4).toString(16)), i.push((15 & e).toString(16));
            }
            return i.join("");
        },
        parse: function(t) {
            for (var n = t.length, i = [], r = 0; r < n; r += 2) i[r >>> 3] |= parseInt(t.substr(r, 2), 16) << 24 - r % 8 * 4;
            return new o.init(i, n / 2);
        }
    }, f = a.Latin1 = {
        stringify: function(t) {
            var n = t.words;
            t = t.sigBytes;
            for (var i = [], r = 0; r < t; r++) i.push(String.fromCharCode(n[r >>> 2] >>> 24 - r % 4 * 8 & 255));
            return i.join("");
        },
        parse: function(t) {
            for (var n = t.length, i = [], r = 0; r < n; r++) i[r >>> 2] |= (255 & t.charCodeAt(r)) << 24 - r % 4 * 8;
            return new o.init(i, n);
        }
    }, u = a.Utf8 = {
        stringify: function(t) {
            try {
                return decodeURIComponent(escape(f.stringify(t)));
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                throw Error("Malformed UTF-8 data");
            }
        },
        parse: function(t) {
            return f.parse(unescape(encodeURIComponent(t)));
        }
    }, h = r.BufferedBlockAlgorithm = s.extend({
        reset: function() {
            this._data = new o.init(), this._nDataBytes = 0;
        },
        _append: function(t) {
            "string" == typeof t && (t = u.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes;
        },
        _process: function(n) {
            var i = this._data, r = i.words, e = i.sigBytes, s = this.blockSize, a = e / (4 * s);
            if (n = (a = n ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0)) * s, e = t.min(4 * n, e), 
            n) {
                for (var c = 0; c < n; c += s) this._doProcessBlock(r, c);
                c = r.splice(0, n), i.sigBytes -= e;
            }
            return new o.init(c, e);
        },
        clone: function() {
            var t = s.clone.call(this);
            return t._data = this._data.clone(), t;
        },
        _minBufferSize: 0
    });
    r.Hasher = h.extend({
        cfg: s.extend(),
        init: function(t) {
            this.cfg = this.cfg.extend(t), this.reset();
        },
        reset: function() {
            h.reset.call(this), this._doReset();
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
                return new p.HMAC.init(t, i).finalize(n);
            };
        }
    });
    var p = i.algo = {};
    return i;
}(Math), n = t, i = n.lib.WordArray, r = n.enc.Base64 = {
    stringify: function(t) {
        var n = t.words, i = t.sigBytes, r = this._map;
        t.clamp();
        for (var e = [], s = 0; s < i; s += 3) for (var o = (n[s >>> 2] >>> 24 - s % 4 * 8 & 255) << 16 | (n[s + 1 >>> 2] >>> 24 - (s + 1) % 4 * 8 & 255) << 8 | n[s + 2 >>> 2] >>> 24 - (s + 2) % 4 * 8 & 255, a = 0; a < 4 && s + .75 * a < i; a++) e.push(r.charAt(o >>> 6 * (3 - a) & 63));
        var c = r.charAt(64);
        if (c) for (;e.length % 4; ) e.push(c);
        return e.join("");
    },
    parse: function(t) {
        var n = t.length, r = this._map, e = r.charAt(64);
        if (e) {
            var s = t.indexOf(e);
            -1 != s && (n = s);
        }
        for (var o = [], a = 0, c = 0; c < n; c++) if (c % 4) {
            var f = r.indexOf(t.charAt(c - 1)) << c % 4 * 2, u = r.indexOf(t.charAt(c)) >>> 6 - c % 4 * 2;
            o[a >>> 2] |= (f | u) << 24 - a % 4 * 8, a++;
        }
        return i.create(o, a);
    },
    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
};

module.exports = r;