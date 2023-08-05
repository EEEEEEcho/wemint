function e(e, t, n) {
    var r = e[t];
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !0,
        set: function(e) {
            n(e, r = e);
        },
        get: function() {
            return r;
        }
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.setWatcher = function(t, n) {
    Object.keys(n).forEach(function(r) {
        e(t, r, n[r]);
    });
};