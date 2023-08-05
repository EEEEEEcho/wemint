function n(n) {
    return (n = n.toString())[1] ? n : "0" + n;
}

module.exports = {
    formatTime: function(e) {
        var t = e.getFullYear(), o = e.getMonth() + 1, r = e.getDate(), u = e.getHours(), i = e.getMinutes(), a = e.getSeconds();
        return [ t, o, r ].map(n).join("/") + " " + [ u, i, a ].map(n).join(":");
    },
    json2Form: function(n) {
        var e = [];
        for (var t in n) e.push(encodeURIComponent(t) + "=" + encodeURIComponent(n[t]));
        return e.join("&");
    }
};