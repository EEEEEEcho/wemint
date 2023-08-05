function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../../store")), e = a(require("../../../utils/create")), r = getApp();

(0, e.default)(t.default, {
    data: {
        cartPage: "商品参数",
        navH: r.globalData.navH,
        status: r.globalData.status,
        parameter: []
    },
    onLoad: function(a) {
        this.setData({
            parameter: JSON.parse(a.parameter)
        });
    }
});