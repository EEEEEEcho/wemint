var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t) {
    var o = "object" == ("undefined" == typeof exports ? "undefined" : e(exports)) && exports, r = "object" == ("undefined" == typeof module ? "undefined" : e(module)) && module && module.exports == o && module, n = "object" == ("undefined" == typeof global ? "undefined" : e(global)) && global;
    n.global !== n && n.window !== n || (t = n);
    var a = function(e) {
        this.message = e;
    };
    (a.prototype = new Error()).name = "InvalidCharacterError";
    var c = function(e) {
        throw new a(e);
    }, d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = /[\t\n\f\r ]/g, f = {
        encode: function(e) {
            e = String(e), /[^\0-\xFF]/.test(e) && c("The string to be encoded contains characters outside of the Latin1 range.");
            for (var t, o = e.length % 3, r = "", n = -1, a = e.length - o; ++n < a; ) t = (e.charCodeAt(n) << 16) + (e.charCodeAt(++n) << 8) + e.charCodeAt(++n), 
            r += d.charAt(t >> 18 & 63) + d.charAt(t >> 12 & 63) + d.charAt(t >> 6 & 63) + d.charAt(63 & t);
            return 2 == o ? (t = (e.charCodeAt(n) << 8) + e.charCodeAt(++n), r += d.charAt(t >> 10) + d.charAt(t >> 4 & 63) + d.charAt(t << 2 & 63) + "=") : 1 == o && (t = e.charCodeAt(n), 
            r += d.charAt(t >> 2) + d.charAt(t << 4 & 63) + "=="), r;
        },
        decode: function(e) {
            var t = (e = String(e).replace(i, "")).length;
            t % 4 == 0 && (t = (e = e.replace(/==?$/, "")).length), (t % 4 == 1 || /[^+a-zA-Z0-9/]/.test(e)) && c("Invalid character: the string to be decoded is not correctly encoded.");
            for (var o, r, n = 0, a = "", f = -1; ++f < t; ) r = d.indexOf(e.charAt(f)), o = n % 4 ? 64 * o + r : r, 
            n++ % 4 && (a += String.fromCharCode(255 & o >> (-2 * n & 6)));
            return a;
        },
        version: "0.1.0"
    };
    if ("function" == typeof define && "object" == e(define.amd) && define.amd) define(function() {
        return f;
    }); else if (o && !o.nodeType) if (r) r.exports = f; else for (var l in f) f.hasOwnProperty(l) && (o[l] = f[l]); else t.base64 = f;
}(void 0);