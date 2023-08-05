function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../store")), o = t(require("../../../utils/create")), a = getApp();

(0, o.default)(e.default, {
    properties: {
        cartPage: String,
        navH: Number,
        status: Number
    },
    data: {
        active: 0,
        isComplex: !0,
        isPrice: !0,
        cartPage: "好友推荐",
        navH: a.globalData.navH,
        status: a.globalData.status,
        isRecommend: 1
    },
    chooseOne: function(t) {
        this.setData({
            active: t.currentTarget.dataset.proindex,
            cateTitle: t.currentTarget.dataset.catetitle
        });
    },
    onPageScroll: function(t) {
        this.selectComponent("#goodsList").onPageScroll(t.scrollTop);
    },
    onPullDownRefresh: function() {
        this.selectComponent("#goodsList").onRefresh();
    },
    onReachBottom: function() {
        this.selectComponent("#goodsList").onMore();
    }
});