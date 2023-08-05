function e(e, t) {
    var r = e.split("?");
    if (r.length > 1) {
        for (var x, n = r[1].split("&"), a = 0; a < n.length; a++) if (null != (x = n[a].split("=")) && x[0] == t) return x[1];
        return "";
    }
    return "";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getUrlParam = e, exports.prePay = function(t, r, x) {
    var n;
    n = null != t.prepayStr ? "prepay_id=" + e(t.prepayStr, "prepay_id") : t.package;
    var a = t.pay_sign, p = t.sign_type, i = t.nonce_str, s = t.timestamp;
    wx.requestPayment({
        timeStamp: s,
        nonceStr: i,
        package: n,
        signType: p,
        paySign: a,
        success: function(e) {
            r();
        },
        fail: function(e) {
            x();
        }
    });
}, exports.getUuid = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
        var t = 16 * Math.random() | 0;
        return ("x" == e ? t : 3 & t | 8).toString(16);
    });
};

require("./constant.js");