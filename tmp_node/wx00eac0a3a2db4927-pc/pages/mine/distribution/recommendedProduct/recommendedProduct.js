function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../../store")), o = t(require("../../../../utils/create")), n = getApp();

(0, o.default)(e.default, {
    properties: {},
    data: {
        cartPage: "选品推荐",
        navH: n.globalData.navH,
        status: n.globalData.status,
        keywords: "",
        isShowInput: !1
    },
    ready: function() {},
    getFocus: function() {
        this.setData({
            isShowInput: !0
        });
    },
    getKeywords: function(t) {
        this.setData({
            keywords: t.detail.value,
            isShowInput: !1
        });
    },
    onPageScroll: function(t) {
        this.selectComponent("#selectionList").onPageScroll(t.scrollTop);
    },
    onPullDownRefresh: function() {
        this.selectComponent("#selectionList").onRefresh();
    },
    onReachBottom: function() {
        this.selectComponent("#selectionList").onMore();
    }
});