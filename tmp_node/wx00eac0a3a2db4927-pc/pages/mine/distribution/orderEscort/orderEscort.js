function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../../store")), e = t(require("../../../../utils/create")), r = getApp();

(0, e.default)(a.default, {
    properties: {},
    data: {
        cartPage: "完成陪同",
        navH: r.globalData.navH,
        status: r.globalData.status
    }
});