function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../store")), a = t(require("../../../utils/create")), n = getApp();

(0, a.default)(e.default, {
    data: {
        cartPage: "我的优惠劵",
        navH: n.globalData.navH,
        status: n.globalData.status,
        selectTab: 0
    },
    onLoad: function(t) {},
    onReady: function() {},
    changTab: function(t) {
        this.setData({
            selectTab: parseInt(t.currentTarget.dataset.index)
        });
    },
    onPullDownRefresh: function() {
        0 == this.data.selectTab ? this.selectComponent("#coupon").onRefresh() : this.selectComponent("#card").onRefresh();
    },
    onReachBottom: function() {
        0 == this.data.selectTab ? this.selectComponent("#coupon").onMore() : this.selectComponent("#card").onMore();
    }
});