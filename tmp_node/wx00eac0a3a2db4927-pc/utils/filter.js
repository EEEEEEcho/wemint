var u = function(u) {
    return (u = u.toString())[1] ? u : "0" + u;
};

module.exports = {
    tsFormatTime: function(e, t) {
        var r = [ "Y", "M", "D", "h", "m", "s" ], n = [];
        13 == e.length && (e /= 10);
        var o = new Date(e), a = o.getFullYear(), D = o.getMonth() + 1, i = o.getDate(), F = o.getHours(), g = o.getMinutes(), s = o.getSeconds();
        n.push(a, D, i, F, g, s), n = n.map(u);
        for (var c in n) t = t.replace(r[c], n[c]);
        return t;
    },
    formatTime: function(e) {
        var t = e.getFullYear(), r = e.getMonth() + 1, n = e.getDate(), o = e.getHours(), a = e.getMinutes(), D = e.getSeconds();
        return [ t, r, n ].map(u).join("/") + " " + [ o, a, D ].map(u).join(":");
    },
    filterEmoji: function(u) {
        return u.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi, "");
    },
    filterSpace: function(u) {
        return u.replace(/\s+/g, "");
    }
};