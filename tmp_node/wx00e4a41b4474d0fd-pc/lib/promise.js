Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = getApp();

exports.login = function() {
    return new Promise(function(t) {
        e.login(function() {
            var n = e.globalData.single;
            t(n);
        });
    });
}, exports.getImageInfo = function(e) {
    return new Promise(function(t) {
        var n = {
            src: e,
            success: t
        };
        wx.getImageInfo(n);
    });
}, exports.uploadImageFiles = function(e, t) {
    var n = Math.random().toString(36).substr(2);
    return new Promise(function(o) {
        wx.uploadFile({
            url: "https://upload.qiniup.com",
            filePath: t,
            name: "file",
            formData: {
                token: e,
                key: n
            },
            success: function(e) {
                var t = void 0;
                try {
                    t = JSON.parse(e.data);
                } catch (n) {
                    n = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(n);
                    t = e.data;
                }
                o(t.key);
            },
            fail: function(e) {
                console.error("******uploadFile***", e), reject(e);
            }
        });
    });
}, exports.getSetting = function() {
    return new Promise(function(e) {
        wx.getSetting({
            success: function(t) {
                e(t.authSetting);
            },
            fail: function(e) {
                reject();
            }
        });
    });
}, exports.savePhoneAuth = function() {
    return new Promise(function(e) {
        wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: function() {
                return e(!0), !0;
            },
            fail: function() {
                return e(!1), !1;
            }
        });
    });
};