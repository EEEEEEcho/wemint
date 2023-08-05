function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var e = a(require("../../../../store")), t = a(require("../../../../utils/create")), r = getApp();

(0, t.default)(e.default, {
    properties: {},
    data: {
        cartPage: "今日任务",
        navH: r.globalData.navH,
        status: r.globalData.status,
        pageSize: 10,
        pageNum: 1,
        isLoad: !1
    }
});