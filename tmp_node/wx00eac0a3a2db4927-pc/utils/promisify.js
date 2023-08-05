var r = Object.assign || function(r) {
    for (var n = 1; n < arguments.length; n++) {
        var t = arguments[n];
        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (r[o] = t[o]);
    }
    return r;
};

module.exports = {
    promisify: function(n) {
        return function(t) {
            for (var o = arguments.length, e = Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) e[a - 1] = arguments[a];
            return new Promise(function(o, a) {
                var c = {
                    success: o,
                    fail: a
                };
                n.apply(void 0, [ r({}, t, c) ].concat(e));
            });
        };
    }
};