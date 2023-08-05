function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../store")), a = t(require("../../../utils/create")), s = require("../../../api/apiInstance.js"), i = getApp();

(0, a.default)(e.default, {
    properties: {},
    data: {
        isComplex: !0,
        isPrice: !0,
        isClassify: !0,
        isFilter: !0,
        active: -1,
        cartPage: "搜索结果",
        navH: i.globalData.navH,
        status: i.globalData.status,
        searchText: "",
        tabList: [],
        isShowLoad: !0,
        categoryUuid: "",
        isStyle: !1,
        pictureUrl: ""
    },
    onLoad: function(t) {
        void 0 !== t.pictureUrl ? this.setData({
            pictureUrl: t.pictureUrl,
            cartPage: "图片搜索"
        }) : this.setData({
            searchText: t.searchText,
            cartPage: t.searchText
        }), this.getRecommendQuery();
    },
    getRecommendQuery: function() {
        var t = this, e = {
            keywords: this.data.searchText
        };
        (0, s.getRecommendQuery)(e, function(e) {
            1 === e.errcode && (e.data.length > 0 && t.setData({
                isStyle: !0
            }), t.setData({
                tabList: e.data
            })), t.setData({
                isShowLoad: !1
            });
        });
    },
    chooseTab: function(t) {
        var e = t.currentTarget.dataset.index;
        this.data.active == e ? this.setData({
            active: -1,
            categoryUuid: ""
        }) : this.setData({
            active: e,
            categoryUuid: this.data.tabList[e].categoryUuid
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