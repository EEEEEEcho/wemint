module.exports = function() {
    function e(e) {
        return a(e);
    }
    function a(e) {
        return i(c(o(e), e.length * p));
    }
    function c(e, a) {
        e[a >> 5] |= 128 << a % 32, e[14 + (a + 64 >>> 9 << 4)] = a;
        for (var c = 1732584193, r = -271733879, u = -1732584194, o = 271733878, i = 0; i < e.length; i += 16) {
            var g = c, s = r, h = u, l = o;
            r = d(r = d(r = d(r = d(r = t(r = t(r = t(r = t(r = n(r = n(r = n(r = n(r = f(r = f(r = f(r = f(r, u = f(u, o = f(o, c = f(c, r, u, o, e[i + 0], 7, -680876936), r, u, e[i + 1], 12, -389564586), c, r, e[i + 2], 17, 606105819), o, c, e[i + 3], 22, -1044525330), u = f(u, o = f(o, c = f(c, r, u, o, e[i + 4], 7, -176418897), r, u, e[i + 5], 12, 1200080426), c, r, e[i + 6], 17, -1473231341), o, c, e[i + 7], 22, -45705983), u = f(u, o = f(o, c = f(c, r, u, o, e[i + 8], 7, 1770035416), r, u, e[i + 9], 12, -1958414417), c, r, e[i + 10], 17, -42063), o, c, e[i + 11], 22, -1990404162), u = f(u, o = f(o, c = f(c, r, u, o, e[i + 12], 7, 1804603682), r, u, e[i + 13], 12, -40341101), c, r, e[i + 14], 17, -1502002290), o, c, e[i + 15], 22, 1236535329), u = n(u, o = n(o, c = n(c, r, u, o, e[i + 1], 5, -165796510), r, u, e[i + 6], 9, -1069501632), c, r, e[i + 11], 14, 643717713), o, c, e[i + 0], 20, -373897302), u = n(u, o = n(o, c = n(c, r, u, o, e[i + 5], 5, -701558691), r, u, e[i + 10], 9, 38016083), c, r, e[i + 15], 14, -660478335), o, c, e[i + 4], 20, -405537848), u = n(u, o = n(o, c = n(c, r, u, o, e[i + 9], 5, 568446438), r, u, e[i + 14], 9, -1019803690), c, r, e[i + 3], 14, -187363961), o, c, e[i + 8], 20, 1163531501), u = n(u, o = n(o, c = n(c, r, u, o, e[i + 13], 5, -1444681467), r, u, e[i + 2], 9, -51403784), c, r, e[i + 7], 14, 1735328473), o, c, e[i + 12], 20, -1926607734), u = t(u, o = t(o, c = t(c, r, u, o, e[i + 5], 4, -378558), r, u, e[i + 8], 11, -2022574463), c, r, e[i + 11], 16, 1839030562), o, c, e[i + 14], 23, -35309556), u = t(u, o = t(o, c = t(c, r, u, o, e[i + 1], 4, -1530992060), r, u, e[i + 4], 11, 1272893353), c, r, e[i + 7], 16, -155497632), o, c, e[i + 10], 23, -1094730640), u = t(u, o = t(o, c = t(c, r, u, o, e[i + 13], 4, 681279174), r, u, e[i + 0], 11, -358537222), c, r, e[i + 3], 16, -722521979), o, c, e[i + 6], 23, 76029189), u = t(u, o = t(o, c = t(c, r, u, o, e[i + 9], 4, -640364487), r, u, e[i + 12], 11, -421815835), c, r, e[i + 15], 16, 530742520), o, c, e[i + 2], 23, -995338651), u = d(u, o = d(o, c = d(c, r, u, o, e[i + 0], 6, -198630844), r, u, e[i + 7], 10, 1126891415), c, r, e[i + 14], 15, -1416354905), o, c, e[i + 5], 21, -57434055), u = d(u, o = d(o, c = d(c, r, u, o, e[i + 12], 6, 1700485571), r, u, e[i + 3], 10, -1894986606), c, r, e[i + 10], 15, -1051523), o, c, e[i + 1], 21, -2054922799), u = d(u, o = d(o, c = d(c, r, u, o, e[i + 8], 6, 1873313359), r, u, e[i + 15], 10, -30611744), c, r, e[i + 6], 15, -1560198380), o, c, e[i + 13], 21, 1309151649), u = d(u, o = d(o, c = d(c, r, u, o, e[i + 4], 6, -145523070), r, u, e[i + 11], 10, -1120210379), c, r, e[i + 2], 15, 718787259), o, c, e[i + 9], 21, -343485551), 
            c = b(c, g), r = b(r, s), u = b(u, h), o = b(o, l);
        }
        return 16 == v ? Array(r, u) : Array(c, r, u, o);
    }
    function r(e, a, c, r, f, n) {
        return b(u(b(b(a, e), b(r, n)), f), c);
    }
    function f(e, a, c, f, n, t, d) {
        return r(a & c | ~a & f, e, a, n, t, d);
    }
    function n(e, a, c, f, n, t, d) {
        return r(a & f | c & ~f, e, a, n, t, d);
    }
    function t(e, a, c, f, n, t, d) {
        return r(a ^ c ^ f, e, a, n, t, d);
    }
    function d(e, a, c, f, n, t, d) {
        return r(c ^ (a | ~f), e, a, n, t, d);
    }
    function b(e, a) {
        var c = (65535 & e) + (65535 & a);
        return (e >> 16) + (a >> 16) + (c >> 16) << 16 | 65535 & c;
    }
    function u(e, a) {
        return e << a | e >>> 32 - a;
    }
    function o(e) {
        for (var a = Array(), c = (1 << p) - 1, r = 0; r < e.length * p; r += p) a[r >> 5] |= (e.charCodeAt(r / p) & c) << r % 32;
        return a;
    }
    function i(e) {
        for (var a = l ? "0123456789ABCDEF" : "0123456789abcdef", c = "", r = 0; r < 4 * e.length; r++) c += a.charAt(e[r >> 2] >> r % 4 * 8 + 4 & 15) + a.charAt(e[r >> 2] >> r % 4 * 8 & 15);
        return c;
    }
    function g(e) {
        for (var a = [], c = 0; c < e.length; c += 2) a.push(String.fromCharCode(parseInt(e.substr(c, 2), 16)));
        return a.join("");
    }
    function s(e) {
        return (e = m.encode(g(e))).replace(/[\/\+=]/g, function(e) {
            return {
                "/": "-",
                "+": "*",
                "=": "_"
            }[e];
        });
    }
    function h() {
        for (var e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", a = "", c = 0; c < 16; c++) a += e[Math.round(1e3 * Math.random()) % e.length];
        return a;
    }
    var l = 1, p = 8, v = 32, y = require("tea.js"), A = require("rsa.js"), m = require("base64.js");
    return {
        getEncPwd: function(a) {
            console.log(a);
            for (var c = a.vcode || "", r = e(a.pwd || ""), f = e(g(r) + a.salt), n = y.strToBytes(c.toUpperCase(), !0), t = Number(n.length / 2).toString(16), d = y.strToBytes(a.id), b = Number(d.length / 2).toString(16), u = Number(a.sdkAppid).toString(16), o = Number(0).toString(16); t.length < 4; ) t = "0" + t;
            for (;b.length < 4; ) b = "0" + b;
            for (;u.length < 8; ) u = "0" + u;
            for (;o.length < 8; ) o = "0" + o;
            y.initkey(f);
            var i = y.encrypt(r + b + d + u + o + t + n);
            y.initkey("");
            return s(A.encrypt(g(i), "00988f6fe99e3d7c72b8b8a1cc9563e9750f5815316de064b531a0bfaa4dd5c2a5ea1f0e9b6e87bbcd19f445a13afada991a8ef60b812c628019741e4337933fb68438d93b62a538da25884627d3d46e6c62a5a41d30a7167a3a1ce5f6ecc3353db98b14a04ce2f777f335223134a900caa74fa79d9ab2c20ce19aaac9c24a82c847fa2eed0704553f75e030d93aa721186576cf5c344015ddc384b6b37add7139531af060548be8060a4bb075cc842bb190343c7f5e0e0b03fe1ca46c29b0df0bec7345888028df47f71fe44a0bd9cb8aed6282c095a75c57b6a604600886744b2965138730b27cf7d173381f0e53523aa1ced6864c09f7cc4135d45c5d4cfcbd", "10001"));
        },
        getRSAH1: function(a) {
            var c = e(a = a || h());
            return s(A.encrypt(g(c), "00ccaa91239f0a10fae03522fe6fdc6194007809732b07cb89e04dee9b4fdb9186787659fdf308be6efbc8aa147ffd8b5e4d61aba8a7e40e08af759751e1acc207a3988ce381cca6dfac4c75af1acda8bb3c09dce7a3d43fc23c95eecf56ca0c0c7a7eaeb019c912877757fe23ab28ac7060ee5409da3f0b5f079901475b11ac7d6c5cea1e7bd26a324674878cc31094b62eb407247f3e7f2070bb76a919883eaa114b0a40ea1341bf99dfd131d77343fd113f3a294fc0e19d9cc06989b98a0c14677e589ac41dd414283a3cf7685089d92770e7fde43c6aa443f2822c52fdbba309ea819bea8e4c2f1fac03930081ffd5189de9f025e15c4a1c466b761ba8e7f3", "10001"));
        },
        md5: e
    };
}();