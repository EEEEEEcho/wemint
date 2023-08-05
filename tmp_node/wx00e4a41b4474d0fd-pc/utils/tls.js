function e(e) {
    wx.request({
        url: "https://tls.qcloud.com/getusersig",
        data: {
            tmpsig: e.TmpSig,
            identifier: e.Identifier,
            sdkappid: s
        },
        method: "GET",
        header: {},
        success: function(t) {
            var s = t.data.match(/tlsGetUserSig\((.*?)\)/), i = JSON.parse(s[1]).UserSig;
            e.success && e.success({
                Identifier: e.Identifier,
                UserSig: i
            });
        },
        fail: function(t) {
            e.error && e.error(t);
        }
    });
}

var t = require("encrypt.js"), s = 1400079977;

module.exports = {
    init: function(e) {
        s = e.sdkappid;
    },
    anologin: function(i) {
        wx.request({
            url: "https://tls.qcloud.com/anologin",
            data: {
                passwd: t.getRSAH1(),
                url: "https://tls.qcloud.com/demo.html",
                sdkappid: s
            },
            method: "GET",
            header: {},
            success: function(t) {
                var s = t.data.match(/tlsAnoLogin\((.*?)\)/), r = JSON.parse(s[1]);
                e({
                    TmpSig: r.TmpSig,
                    Identifier: r.Identifier,
                    success: i
                });
            }
        });
    },
    login: e
};