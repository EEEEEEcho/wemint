var e = {
    formatDate: function(e, t) {
        var r = {
            "M+": e.getMonth() + 1,
            "d+": e.getDate(),
            "H+": e.getHours(),
            "m+": e.getMinutes(),
            "s+": e.getSeconds(),
            "q+": Math.floor((e.getMonth() + 3) / 3),
            "f+": e.getMilliseconds()
        };
        /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var g in r) new RegExp("(" + g + ")").test(t) && (t = t.replace(RegExp.$1, 1 === RegExp.$1.length ? r[g] : ("00" + r[g]).substr(("" + r[g]).length)));
        return t;
    },
    trim: function(e) {
        return e.replace(/(^\s*)|(\s*$)/g, "");
    }
};

module.exports = e;