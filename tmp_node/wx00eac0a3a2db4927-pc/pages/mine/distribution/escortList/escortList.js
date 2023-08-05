function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../../store")), a = t(require("../../../../utils/create")), r = getApp();

(0, a.default)(e.default, {
    properties: {},
    data: {
        cartPage: "陪同到店列表",
        navH: r.globalData.navH,
        status: r.globalData.status,
        pageSize: 10,
        pageNum: 1,
        isLoad: !1
    },
    toDetail: function() {
        wx.navigateTo({
            url: "/pages/mine/distribution/orderEscort/orderEscort"
        });
    }
});