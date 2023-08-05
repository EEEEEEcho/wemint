function t(t) {
    var o = [];
    for (var e in t) o.push(encodeURIComponent(e) + "=" + encodeURIComponent(t[e]));
    return o.join("&");
}

module.exports = {
    json2Form: t
}, module.exports = {
    httpGet: function(t, o, e) {
        wx.request({
            url: t,
            data: o,
            method: "GET",
            success: function(t) {
                e(t.data);
            },
            fail: function(t) {
                wx.showToast({
                    title: t.errMsg,
                    icon: "fail",
                    duration: 2e3
                });
            },
            complete: function(t) {}
        });
    },
    httpPost: function(o, e, n) {
        wx.request({
            url: o,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: t(e),
            method: "POST",
            success: function(t) {
                n(t.data);
            },
            fail: function(t) {
                wx.showToast({
                    title: t.errMsg,
                    icon: "fail",
                    duration: 2e3
                });
            },
            complete: function(t) {}
        });
    }
};