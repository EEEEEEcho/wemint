function t() {
    for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = {}, r = Object.keys(t), a = 0; a < r.length; a++) {
        var n = r[a];
        e[n.toLowerCase()] = t[n];
    }
    return e;
}

function e(t, e, a, s, o, x) {
    var d = a.signHeaders, f = r(a.headers, d), l = f["content-type"] || "";
    "POST" !== t || l.startsWith(g) || (f["content-md5"] = p(a.data));
    var y = i(f, d);
    f["x-ca-signature-headers"] = y.join(",");
    var v = n(y, f), j = h(e, !0), m = u(t, f, v, j, s);
    f["x-ca-signature"] = c(m), wx.request({
        url: j.href,
        header: f,
        method: t,
        data: a.data,
        success: function(t) {
            o(t);
        },
        fail: function(t) {
            x(t);
        }
    });
}

function r() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
    return Object.assign({
        "x-ca-timestamp": new Date().getTime(),
        "x-ca-key": d.API_APPKEY,
        "x-ca-nonce": a(),
        "x-ca-stage": d.X_CA_STAGR,
        accept: "application/json"
    }, t, e);
}

function a() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
        var e = 16 * Math.random() | 0;
        return ("x" == t ? e : 3 & e | 8).toString(16);
    });
}

function n(t, e) {
    for (var r = [], a = 0; a < t.length; a++) {
        var n = t[a];
        r.push(n + ":" + e[n]);
    }
    return r.join("\n");
}

function s(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
}

function i(t, e) {
    for (var r = Object.keys(t).sort(), a = [], n = 0; n < r.length; n++) {
        var i = r[n];
        (i.startsWith("x-ca-") || s(e, i)) && a.push(i);
    }
    return a.sort();
}

function u(t, e, r, a, n) {
    var s = "\n", i = [ t, s ], u = e.accept;
    u && i.push(u), i.push(s);
    var c = e["content-md5"];
    c && i.push(c), i.push(s);
    var p = e["content-type"] || "";
    p && i.push(p), i.push(s);
    var h = e.date;
    return h && i.push(h), i.push(s), r && (i.push(r), i.push(s)), p.startsWith(g) ? i.push(o(a, n)) : i.push(o(a)), 
    i.join("");
}

function o(t, e) {
    var r = Object.assign(t.query, e), a = t.pathname;
    if (Object.keys(r).length) {
        for (var n = Object.keys(r).sort(), s = new Array(n.length), i = 0; i < n.length; i++) {
            var u = n[i];
            void 0 !== r[u] && null !== r[u] && "" + r[u] ? s[i] = u + "=" + r[u] : s[i] = "" + u;
        }
        a += "?" + s.join("&");
    }
    return a;
}

function c(t) {
    var e = f.HmacSHA256(t, d.API_APPSCRECT);
    return l.stringify(e);
}

function p(t) {
    var e = y.MD5(t);
    return l.stringify(e);
}

var h = require("url").parse, x = require("querystring"), d = require("../utils/constant.js"), f = require("../utils/hmacSha256.js"), l = require("../utils/base64.js"), y = require("../utils/md5.js"), g = "application/x-www-form-urlencoded";

module.exports = {
    post: function(r, a, n, s) {
        var r = d.API_BASE_URL + r, i = {
            data: a,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }, u = h(r, !0), o = i.query;
        o && (Object.assign(u.query, o), u.path = u.pathname + "?" + x.stringify(u.query), 
        i.query = null), i.headers = t(i.headers), i.signHeaders = t(i.signHeaders);
        var c = i.headers, p = c["content-type"] || c["Content-Type"];
        p || (c["content-type"] = "application/json", p = c["content-type"]);
        var f = i.data;
        p.startsWith("application/x-www-form-urlencoded") ? i.data = x.stringify(i.data) : p.startsWith("application/json") ? i.data = JSON.stringify(i.data) : Buffer.isBuffer(i.data) || "string" == typeof i.data || (i.data = JSON.stringify(i.data)), 
        e("POST", u, i, f, n, s);
    }
};