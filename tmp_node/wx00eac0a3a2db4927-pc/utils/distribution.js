function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function t(e, t, r) {
    var n = (0, o.getUser)();
    if (void 0 !== n.accesstoken && "" != n.accesstoken) {
        i = {
            key: e,
            accesstoken: n.accesstoken
        };
        (0, a.getUserBinding)(i, function(e) {
            1 == e.errcode && t(e);
        });
    } else {
        var i = {
            key: e
        };
        (0, a.getUserBinding)(i, function(e) {
            1 == e.errcode && t(e);
        }), r(e);
    }
}

function r(e, t, r, o) {
    var n = {
        isCreateQrCode: 0,
        accesstoken: e.store.data.userInfo.accesstoken,
        page: t
    };
    "" != r && (n[r] = o), (0, a.getMaQrCode)(n, function(t) {
        1 === t.errcode && e.setData({
            qrCodeKey: t.data.key
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.onUserBinding = t, exports.initScene = function(r, a, o, i, s, d, c) {
    if (void 0 !== a.scene) t(a.scene, function(t) {
        if ("" != i) {
            var a = t.data[i];
            r.setData(e({}, i, a));
        }
        s();
    }, c), o && r.setData({
        isShareJump: !0
    }), (0, n.mtaEventStat)(a.scene, {}); else {
        var u = !1;
        if (void 0 !== a.qrCodeKey && ("0" != a.qrCodeKey && (t(a.qrCodeKey, function(e) {}, c), 
        (0, n.mtaEventStat)(a.qrCodeKey, {})), u = !0), o && r.setData({
            isShareJump: u
        }), "" != i) {
            var f = a[i];
            r.setData(e({}, i, f));
        }
        d();
    }
}, exports.onSharePage = function(e, t, r, a, o) {
    return 1 != e.store.data.userInfo.isDisUser ? "" != e.data.qrCodeKey ? (t = "" == r ? t + "?qrCodeKey=" + e.data.qrCodeKey : t + "?" + r + "=" + a + "&qrCodeKey=" + e.data.qrCodeKey, 
    o.path = t, o) : ("" == r ? t += "?qrCodeKey=0" : t = t + "?" + r + "=" + a + "&qrCodeKey=0", 
    o.path = t, o) : "" != e.data.qrCodeKey ? (t = "" == r ? t + "?qrCodeKey=" + e.data.qrCodeKey : t + "?" + r + "=" + a + "&qrCodeKey=" + e.data.qrCodeKey, 
    o.path = t, o) : void wx.showToast({
        title: "分销数据没有加载成功，请重新进入页面",
        icon: "none",
        duration: 3e3
    });
}, exports.initQrCode = function(e, t, a, o) {
    e.store.data.isLogin && r(e, t, a, o);
    var n = e.store.data.isLogin;
    Object.defineProperty(e.store.data, "isLogin", {
        configurable: !0,
        enumerable: !0,
        set: function(i) {
            n = i, i && r(e, t, a, o);
        },
        get: function() {
            return n;
        }
    });
};

var a = require("../api/apiInstance"), o = require("../utils/storage.js"), n = require("../utils/mtaUtil.js");