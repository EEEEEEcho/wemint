function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../../store")), e = a(require("../../../utils/create")), u = getApp();

(0, e.default)(t.default, {
    data: {
        cartPage: "积分商城",
        navH: u.globalData.navH,
        status: u.globalData.status
    }
});