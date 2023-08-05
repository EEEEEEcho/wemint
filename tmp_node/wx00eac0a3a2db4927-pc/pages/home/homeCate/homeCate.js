function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e, a = t(require("../../../store")), o = t(require("../../../utils/create")), i = require("../../../api/apiInstance.js"), s = require("../../../utils/canvasUtil.js"), n = getApp();

(0, o.default)(a.default, {
    properties: {
        cartPage: String,
        navH: Number,
        status: Number
    },
    data: {
        isComplex: !0,
        isPrice: !0,
        isClassify: !0,
        isFilter: !0,
        isShowCateModel: !1,
        active: 0,
        cateTitle: "",
        cartPage: "分类",
        navH: n.globalData.navH,
        status: n.globalData.status,
        dataList: [],
        categoryUuid: "",
        isShowLoad: !0,
        options: !1,
        scrollLeft: 0,
        name: ""
    },
    toSearch: function() {
        wx.navigateTo({
            url: "/pages/search/search"
        });
    },
    chooseOne: function(t) {
        var e = t.currentTarget.dataset.proindex;
        this.data.categoryUuid = this.data.dataList[e].categoryUuid;
        var a = 0;
        0 != e && (a = (0, s.rpxToPx)(157 * e)), this.setData({
            cateTitle: t.currentTarget.dataset.catetitle,
            active: e,
            scrollLeft: a,
            categoryUuid: this.data.categoryUuid
        });
    },
    onLoad: function(t) {
        this.setData({
            name: t.name
        });
    },
    onReady: function() {
        this.getCategoryQuery();
    },
    getCategoryQuery: function() {
        var t = this, e = {
            pageSize: 20,
            pageNum: 1
        };
        (0, i.getCategoryQuery)(e, function(e) {
            if (1 === e.errcode) {
                t.setData({
                    dataList: e.data
                });
                for (var a = 0; a < e.data.length; a++) e.data[a].name == t.data.name && t.setData({
                    active: a,
                    scrollLeft: (0, s.rpxToPx)(157) * a,
                    categoryUuid: e.data[a].categoryUuid,
                    cateTitle: e.data[a].name
                });
            }
            t.setData({
                isShowLoad: !1
            });
        });
    },
    onHide: function() {
        clearTimeout(e);
    },
    onUnload: function() {
        clearTimeout(e);
    },
    onPageScroll: function(t) {
        this.selectComponent("#goodsList").onPageScroll(t.scrollTop);
    },
    showCateModel: function(t) {
        this.setData({
            isShowCateModel: !0,
            options: !0
        });
    },
    closeModel: function() {
        var t = this;
        this.setData({
            options: !1
        }), e = setTimeout(function() {
            t.setData({
                isShowCateModel: !1
            });
        }, 300);
    },
    onClassify: function(t) {
        var e = t.currentTarget.dataset.uuid, a = t.currentTarget.dataset.index;
        this.setData({
            isShowCateModel: !1,
            active: a,
            categoryUuid: e
        });
    },
    onPullDownRefresh: function() {
        this.selectComponent("#goodsList").onRefresh();
    },
    onReachBottom: function() {
        this.selectComponent("#goodsList").onMore();
    }
});