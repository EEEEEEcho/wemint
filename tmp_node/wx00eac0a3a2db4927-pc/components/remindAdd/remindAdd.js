var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create")), e = require("../../utils/storage.js"), a = getApp();

(0, t.default)({
    pure: !0,
    data: {
        navH: a.globalData.navH,
        status: a.globalData.status,
        isShow: !1
    },
    ready: function() {
        var t = (0, e.getRemindFirst)();
        null != t && "" != t || (this.setData({
            isShow: !0
        }), (0, e.setRemindFirst)(!0));
    },
    methods: {
        onRemindClick: function() {
            this.setData({
                isShow: !1
            });
        }
    }
});