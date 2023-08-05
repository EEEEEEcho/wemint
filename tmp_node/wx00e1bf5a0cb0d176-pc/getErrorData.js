function e() {
    return new Promise(function(e, r) {
        wx.getSystemInfo({
            success: function(r) {
                e(r);
            },
            fail: function() {
                r();
            }
        });
    });
}

var r = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
};

module.exports = {
    getError: function(t) {
        var n = {};
        e().then(function(e) {
            var o = getCurrentPages(), a = "未知";
            o && o[o.length - 1] && (a = o[o.length - 1].route), n = r({}, t, {
                brand: e.brand,
                model: e.model,
                language: e.language,
                version: e.version,
                system: e.system,
                platform: e.platform,
                appTitle: e.appTitle,
                SDKVersion: e.SDKVersion,
                page: a
            }), wx.request({
                url: n.siteBaseUrl + "/index.php?c=ErrorReport&a=report",
                data: n,
                method: "POST"
            });
        });
    }
};