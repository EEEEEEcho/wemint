function e(t, n) {
    if (t !== n) {
        var i = r(t), o = r(n);
        if (i == f && o == f) {
            if (Object.keys(t).length >= Object.keys(n).length) for (var l in n) {
                var s = t[l];
                void 0 === s ? t[l] = null : e(s, n[l]);
            }
        } else i == c && o == c && t.length >= n.length && n.forEach(function(n, r) {
            e(t[r], n);
        });
    }
}

function t(e, i, o, l) {
    if (e !== i) {
        var s = r(e), u = r(i);
        if (s == f) if (u != f || Object.keys(e).length < Object.keys(i).length && "" !== o) n(l, o, e); else {
            for (var a in e) !function(s) {
                var u = e[s], a = i[s], h = r(u), g = r(a);
                if (h != c && h != f) u != i[s] && n(l, ("" == o ? "" : o + ".") + s, u); else if (h == c) g != c ? n(l, ("" == o ? "" : o + ".") + s, u) : u.length < a.length ? n(l, ("" == o ? "" : o + ".") + s, u) : u.forEach(function(e, n) {
                    t(e, a[n], ("" == o ? "" : o + ".") + s + "[" + n + "]", l);
                }); else if (h == f) if (g != f || Object.keys(u).length < Object.keys(a).length) n(l, ("" == o ? "" : o + ".") + s, u); else for (var b in u) t(u[b], a[b], ("" == o ? "" : o + ".") + s + "." + b, l);
            }(a);
        } else s == c ? u != c ? n(l, o, e) : e.length < i.length ? n(l, o, e) : e.forEach(function(e, n) {
            t(e, i[n], o + "[" + n + "]", l);
        }) : n(l, o, e);
    }
}

function n(e, t, n) {
    r(n) != i && (e[t] = n);
}

function r(e) {
    return Object.prototype.toString.call(e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(n, r) {
    var c = {};
    return e(n, r), t(n, r, "", c), c;
};

var c = "[object Array]", f = "[object Object]", i = "[object Function]";