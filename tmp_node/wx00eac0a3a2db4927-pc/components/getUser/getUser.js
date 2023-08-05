var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create")), a = require("../../api/apiInstance"), t = require("../../utils/storage.js");

(0, e.default)({
    properties: {
        isShow: Boolean,
        setUserInfo: Object,
        preOptions: Object
    },
    data: {},
    ready: function() {},
    methods: {
        bindGetUserInfo: function(e) {
            var u = this;
            void 0 !== e.detail.userInfo && "" != e.detail.userInfo && wx.login({
                success: function(s) {
                    var n = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi, r = e.detail.userInfo.nickName.replace(n, ""), o = {
                        accesstoken: u.data.setUserInfo.accesstoken,
                        nickname: r,
                        avatar: e.detail.userInfo.avatarUrl
                    };
                    (0, a.updateUserInfo)(o, function(e) {
                        1 == e.errcode && (u.data.setUserInfo.nickname = r, u.data.setUserInfo.avatar = o.avatar, 
                        (0, t.setUser)(u.data.setUserInfo), u.store.data.userInfo = u.data.setUserInfo, 
                        u.store.data.isLogin = !0, u.update(), u.jumpToPage());
                    });
                }
            }), this.setData({
                isShow: !1
            });
        },
        jumpToPage: function() {
            var e = this, a = "/pages/index/index";
            Object.keys(this.data.preOptions).forEach(function(t) {
                a = -1 != a.indexOf("?") ? a + "&" + t + "=" + e.data.preOptions[t] : a + "?" + t + "=" + e.data.preOptions[t];
            }), wx.reLaunch({
                url: a
            });
        }
    }
});