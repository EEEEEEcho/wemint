function t(t, e) {
    Object.keys(e).forEach(function(n) {
        t.hasOwnProperty(n) && (e[n] = t[n]);
    });
}

function e(t) {
    var e = {};
    return n(t, e), e;
}

function n(t, e) {
    Object.keys(t).forEach(function(n) {
        e[n] = !0;
        var r = Object.prototype.toString.call(t[n]);
        r === A ? a(t[n], n, e) : r === x && o(t[n], n, e);
    });
}

function a(t, e, n) {
    Object.keys(t).forEach(function(r) {
        n[e + "." + r] = !0, delete n[e];
        var i = Object.prototype.toString.call(t[r]);
        i === A ? a(t[r], e + "." + r, n) : i === x && o(t[r], e + "." + r, n);
    });
}

function o(t, e, n) {
    t.forEach(function(t, r) {
        n[e + "[" + r + "]"] = !0, delete n[e];
        var i = Object.prototype.toString.call(t);
        i === A ? a(t, e + "[" + r + "]", n) : i === x && o(t, e + "[" + r + "]", n);
    });
}

function r(t) {
    t.update = function(t) {
        var e = this.store, n = this;
        return new Promise(function(a) {
            if (t) for (var o in t) p(e.data, o, t[o]);
            var r = (0, J.default)(e.data, e.originData), i = [];
            if (Object.keys(r).length > 0) {
                i.push(new Promise(function(t) {
                    return n.setData(r, t);
                })), e.onChange && e.onChange(r);
                for (var c in r) p(e.originData, c, "object" === w(r[c]) ? JSON.parse(JSON.stringify(r[c])) : r[c]);
            }
            Promise.all(i).then(function(t) {
                return a(r);
            });
        });
    };
}

function i(t) {
    wx.cloud.init(), _.db = wx.cloud.database({
        env: t
    });
}

function c(t) {
    return new Promise(function(e, n) {
        u(s(t), e);
    });
}

function u(t, e) {
    var n = O(t);
    Object.keys(n).forEach(function(t) {
        var a = t.split("-"), o = _.data[a[0]][parseInt(a[1])]._id, r = n[t];
        _.methods && _.methods[a[0]] && Object.keys(_.methods[a[0]]).forEach(function(t) {
            r.hasOwnProperty(t) && delete r[t];
        }), _.db.collection(a[0]).doc(o).update({
            data: r
        }).then(function(t) {
            e(t);
        });
    });
}

function s(t) {
    return new Promise(function(e) {
        if (t) for (var n in t) p(_.data, n, t[n]);
        var a = (0, J.default)(_.data, N);
        "" == Object.keys(a)[0] && (a = a[""]);
        var o = f(a), r = [];
        if (Object.keys(a).length > 0) {
            for (var i in _.instances) _.instances[i].forEach(function(t) {
                if (o || _.updateAll || t._updatePath) {
                    var e = l(a, t._updatePath);
                    if (e.length) {
                        var n = {};
                        for (var i in a) e.includes(i) && (n[i] = "object" === w(a[i]) ? JSON.parse(JSON.stringify(a[i])) : a[i]);
                        r.push(new Promise(function(e) {
                            t.setData.call(t, n, e);
                        }));
                    }
                }
            });
            _.onChange && _.onChange(a);
            for (var c in a) p(N, c, "object" === w(a[c]) ? JSON.parse(JSON.stringify(a[c])) : a[c]);
        }
        Promise.all(r).then(function(t) {
            e(a);
        });
    });
}

function f(t) {
    if (!_.globalData) return !1;
    for (var e in t) {
        if (_.globalData.indexOf(e) > -1) return !0;
        for (var n = 0, a = _.globalData.length; n < a; n++) if (d(e, _.globalData[n])) return !0;
    }
    return !1;
}

function l(t, e) {
    var n = [];
    for (var a in t) {
        e[a] && n.push(a);
        for (var o in e) d(a, o) && n.push(a);
    }
    return n;
}

function d(t, e) {
    if (0 === t.indexOf(e)) {
        var n = t.substr(e.length, 1);
        if ("[" === n || "." === n) return !0;
    }
    return !1;
}

function h(t) {
    t.update = s;
}

function p(t, e, n) {
    for (var a = e.replace(/]/g, "").replace(/\[/g, ".").split("."), o = t, r = 0, i = a.length; r < i; r++) r === i - 1 ? o[a[r]] = n : o = o[a[r]];
}

function b(t, e) {
    return new Promise(function(n) {
        _.db.collection(t).where(e || {}).get().then(function(e) {
            g(e, t), n(e);
        });
    });
}

function g(t, e) {
    t.data.forEach(function(t) {
        var n = _.methods[e];
        n && Object.keys(n).forEach(function(e) {
            Object.defineProperty(t, e, {
                enumerable: !0,
                get: function() {
                    return n[e].call(t);
                },
                set: function() {}
            });
        });
    });
}

function y(t, e) {
    return _.db.collection(t).add({
        data: e
    });
}

function v(t, e) {
    return _.db.collection(t).doc(e).remove();
}

function O(t) {
    var e = {};
    return Object.keys(t).forEach(function(n) {
        j(n, t[n], e);
    }), e;
}

function j(t, e, n) {
    for (var a = t.replace(/]/g, "").replace(/\[/g, ".").split("."), o = {}, r = null, i = a.length, c = 2; c < i; c++) if (3 === i) o[a[c]] = e; else if (c === i - 1) r[a[c]] = e; else {
        var u = r;
        r = {}, 2 === c ? o[a[c]] = r : u[a[c]] = r;
    }
    var s = a[0] + "-" + a[1];
    n[s] = Object.assign(n[s] || {}, o);
}

function m() {
    _.method = function(t, e) {
        C[t] = e;
        var n = P(t);
        Object.defineProperty(n.obj, n.key, {
            enumerable: !0,
            get: function() {
                return C[t].call(_.data);
            },
            set: function() {
                console.warn("Please using store.method to set method prop of data!");
            }
        });
    };
}

function P(t) {
    var e = t.replace(/]/g, "").replace(/\[/g, ".").split("."), n = e.length;
    if (n > 1) {
        for (var a = _.data[e[0]], o = 1; o < n - 1; o++) a = a[e[o]];
        return {
            obj: a,
            key: e[n - 1]
        };
    }
    return {
        obj: _.data,
        key: e[0]
    };
}

function S(t) {
    Object.keys(t).forEach(function(e) {
        var n = t[e], a = D(n);
        a == L ? E(e, n) : a == A ? Object.keys(n).forEach(function(t) {
            k(n[t], e + "." + t);
        }) : a == x && n.forEach(function(t, n) {
            k(t, e + "[" + n + "]");
        });
    });
}

function k(t, e) {
    var n = D(t);
    n == L ? E(e, t) : n == A ? Object.keys(t).forEach(function(n) {
        k(t[n], e + "." + n);
    }) : n == x && t.forEach(function(t, n) {
        k(t, e + "[" + n + "]");
    });
}

function E(t, e) {
    var n = P(t);
    C[t] = e, Object.defineProperty(n.obj, n.key, {
        enumerable: !0,
        get: function() {
            return C[t].call(_.data);
        },
        set: function() {
            console.warn("Please using store.method to set method prop of data!");
        }
    });
}

function D(t) {
    return Object.prototype.toString.call(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

exports.default = function(n, a) {
    var o = null;
    if (2 === arguments.length) {
        N || (N = JSON.parse(JSON.stringify(n.data)), _ = n, n.instances = {}, n.update = s, 
        n.push = c, n.pull = b, n.add = y, n.remove = v, n.originData = N, n.env && i(n.env), 
        m()), getApp().globalData && (getApp().globalData.store = n);
        var u = a.onLoad;
        S(n.data), a.data && Object.keys(a.data).length > 0 && (o = e(a.data), t(n.data, a.data)), 
        a.onLoad = function(e) {
            this.store = n, this._updatePath = o, h(this), n.instances[this.route] = [], n.instances[this.route].push(this), 
            u && u.call(this, e), t(n.data, this.data), this.setData(this.data);
        };
        var f = a.onUnload;
        a.onUnload = function() {
            f && f.call(this), n.instances[this.route] = [];
        }, Page(a);
    } else {
        var l = n.ready, d = n.pure, p = e(n.data);
        n.ready = function() {
            d ? (this.store = {
                data: n.data || {}
            }, this.store.originData = n.data ? JSON.parse(JSON.stringify(n.data)) : {}, S(n.data || {}), 
            r(this)) : (this.page = getCurrentPages()[getCurrentPages().length - 1], this.store = this.page.store, 
            this._updatePath = p, t(this.store.data, n.data), S(n.data || {}), this.setData.call(this, this.store.data), 
            h(this), this.store.instances[this.page.route].push(this)), l && l.call(this);
        }, Component(n);
    }
};

var J = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./diff")), N = null, _ = null, C = {}, x = "[object Array]", A = "[object Object]", L = "[object Function]";