function e(e) {
    return (e / 750 * wx.getSystemInfoSync().windowWidth).toFixed(0);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.rpxToPx = e, exports.createQrCode = function(n, o, r, u) {
    t.default.api.draw(n, o, e(r), e(u)), wx.canvasToTempFilePath({
        canvasId: o,
        success: function(e) {},
        fail: function(e) {}
    });
};

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/qrcode"));