function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../store")), a = t(require("../../utils/create")), i = require("../../api/apiInstance.js"), o = getApp();

(0, a.default)(e.default, {
    data: {
        cartPage: "拼团免单",
        navH: o.globalData.navH,
        status: o.globalData.status,
        tabList: [],
        isShowLoad: !1,
        categoryUuid: "",
        active: -1
    },
    onLoad: function(t) {
        this.getActivityQuery();
    },
    getActivityQuery: function() {
        var t = this, e = {
            keywords: "",
            activityUuid: "",
            itemUuid: "",
            type: 2
        };
        (0, i.getActivityQuery)(e, function(e) {
            1 === e.errcode && t.setData({
                tabList: e.data
            }), t.setData({
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
        this.selectComponent("#freeList").onPageScroll(t.scrollTop);
    },
    onPullDownRefresh: function() {
        this.selectComponent("#freeList").onRefresh();
    },
    onReachBottom: function() {
        this.selectComponent("#freeList").onMore();
    }
});