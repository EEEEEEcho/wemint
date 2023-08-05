function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../../store")), s = t(require("../../../../utils/create")), a = (require("../../../../api/apiInstance.js"), 
require("../../../../utils/filter.js"), getApp());

(0, s.default)(e.default, {
    properties: {},
    data: {
        isFirst: !0,
        cartPage: "我的客户",
        navH: a.globalData.navH,
        status: a.globalData.status,
        keywords: "",
        userUuidFromAccount: "",
        type: [ 2 ],
        isShowInput: !1,
        total: 0,
        firstTotal: 0,
        secondTotal: 0
    },
    ready: function() {},
    getFocus: function() {
        this.setData({
            isShowInput: !0
        });
    },
    searchSomething: function(t) {
        this.setData({
            keywords: t.detail.value
        }), this.onPullDownRefresh();
    },
    onHide: function() {
        this.setData({
            keywords: "",
            isShowInput: !1
        });
    },
    onLoad: function(t) {
        void 0 !== t.useruuid && this.setData({
            userUuidFromAccount: t.useruuid
        });
    },
    getFirstTotalNumber: function(t) {
        this.setData({
            firstTotal: t.detail
        });
    },
    getSecondTotalNumber: function(t) {
        this.setData({
            secondTotal: t.detail
        });
    },
    getCustomer: function(t) {
        var e = [];
        e = 1 != t.currentTarget.dataset.stage ? [ 3 ] : [ 2 ], this.setData({
            type: e,
            keywords: ""
        });
    },
    onPullDownRefresh: function() {
        var t = this.data.keywords;
        2 == this.data.type[0] ? this.selectComponent("#firstClassCustomer").onRefresh(t) : 3 == this.data.type[0] && this.selectComponent("#secondClassCustomer").onRefresh(t);
    },
    onReachBottom: function() {
        var t = this.data.keywords;
        2 == this.data.type[0] ? this.selectComponent("#firstClassCustomer").onMore(t) : 3 == this.data.type[0] && this.selectComponent("#secondClassCustomer").onMore(t);
    }
});