Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.formatDateTs = function(t) {
    var r = new Date(t), n = r.getFullYear(), u = r.getMonth() + 1, a = r.getDate(), o = r.getHours(), g = r.getMinutes();
    return n + "-" + e(u) + "-" + e(a) + " " + o + ":" + e(g);
}, exports.getDate = function(t) {
    var r = new Date(t), n = r.getFullYear(), u = r.getMonth() + 1, a = r.getDate();
    return n + "-" + e(u) + "-" + e(a);
}, exports.getTime = function(t) {
    var r = new Date(t), n = r.getHours(), u = r.getMinutes();
    return e(n) + ":" + e(u);
};

var e = function(e) {
    return e < 10 ? "0" + e : e;
};