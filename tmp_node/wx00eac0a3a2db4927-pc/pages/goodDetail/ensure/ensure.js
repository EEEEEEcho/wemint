function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../store")), e = t(require("../../../utils/create")), r = getApp();

(0, e.default)(a.default, {
    properties: {},
    data: {
        cartPage: "尚免保障",
        navH: r.globalData.navH,
        status: r.globalData.status,
        ensure: []
    },
    onLoad: function(t) {
        this.setData({
            ensure: JSON.parse(t.notesData)
        });
    }
});