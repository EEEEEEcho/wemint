function t(t, r) {
    var e, n, o, i;
    try {
        e = t.toString().split(".")[1].length;
    } catch (t) {
        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
        e = 0;
    }
    try {
        n = r.toString().split(".")[1].length;
    } catch (t) {
        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
        n = 0;
    }
    if (i = Math.abs(e - n), o = Math.pow(10, Math.max(e, n)), i > 0) {
        var u = Math.pow(10, i);
        e > n ? (t = Number(t.toString().replace(".", "")), r = Number(r.toString().replace(".", "")) * u) : (t = Number(t.toString().replace(".", "")) * u, 
        r = Number(r.toString().replace(".", "")));
    } else t = Number(t.toString().replace(".", "")), r = Number(r.toString().replace(".", ""));
    return (t + r) / o;
}

function r(t, r) {
    var e = 0, n = t.toString(), o = r.toString();
    try {
        e += n.split(".")[1].length;
    } catch (t) {}
    try {
        e += o.split(".")[1].length;
    } catch (t) {}
    return Number(n.replace(".", "")) * Number(o.replace(".", "")) / Math.pow(10, e);
}

function e(t, r) {
    var e, n, o = 0, i = 0;
    try {
        o = t.toString().split(".")[1].length;
    } catch (t) {}
    try {
        i = r.toString().split(".")[1].length;
    } catch (t) {}
    return e = Number(t.toString().replace(".", "")), n = Number(r.toString().replace(".", "")), 
    e / n * Math.pow(10, i - o);
}

module.exports = {
    jsNumber: function() {
        Number.prototype.div = function(t) {
            return e(this, t);
        }, Number.prototype.mul = function(t) {
            return r(t, this);
        }, Number.prototype.sub = function(t) {
            return r(t, this);
        }, Number.prototype.add = function(r) {
            return t(r, this);
        };
    }
};