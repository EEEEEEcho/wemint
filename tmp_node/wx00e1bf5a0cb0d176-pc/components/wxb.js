function t(t, e) {
    this.appId = t, this.sessionKey = e;
}

var e = require("./utils/cryptojs/cryptojs.js").Crypto;

getApp();

t.prototype.decryptData = function(t, s) {
    var t = e.util.base64ToBytes(t), o = e.util.base64ToBytes(this.sessionKey), s = e.util.base64ToBytes(s), r = new e.mode.CBC(e.pad.pkcs7);
    try {
        var p = e.AES.decrypt(t, o, {
            asBpytes: !0,
            iv: s,
            mode: r
        }), a = JSON.parse(p);
    } catch (t) {
        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
        console.log(t);
    }
    return a.watermark.appid !== this.appId && console.log(err), a;
}, module.exports = t;