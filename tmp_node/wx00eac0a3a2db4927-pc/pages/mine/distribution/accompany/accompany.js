function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var e = a(require("../../../../store")), t = a(require("../../../../utils/create")), p = getApp();

(0, t.default)(e.default, {
    properties: {},
    data: {
        cartPage: "陪同到店",
        navH: p.globalData.navH,
        status: p.globalData.status,
        pageSize: 10,
        pageNum: 1,
        isLoad: !1
    },
    applyAccompany: function() {
        wx.navigateTo({
            url: "/pages/mine/distribution/applyAccompany/applyAccompany"
        });
    }
});