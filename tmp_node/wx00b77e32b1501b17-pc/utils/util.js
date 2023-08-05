function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), r = e.getMonth() + 1, o = e.getDate(), u = e.getHours(), g = e.getMinutes(), i = e.getSeconds();
        return [ n, r, o ].map(t).join("/") + " " + [ u, g, i ].map(t).join(":");
    },
    Regular: function(t, e) {
        return !!new RegExp(e).test(t);
    }
};