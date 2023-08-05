function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../store")), a = e(require("../../../utils/create")), o = require("../../../api/apiInstance.js"), s = getApp();

(0, a.default)(t.default, {
    properties: {},
    data: {
        pageSize: 100,
        pageNum: 1,
        isLoad: !1,
        cartPage: "我的收藏",
        navH: s.globalData.navH,
        status: s.globalData.status,
        favoriteList: [],
        tags: [],
        isLoadMore: !1,
        isShowLoad: !0,
        isShowWishModel: !1
    },
    onShow: function() {
        this.getCollection();
    },
    showWishModel: function() {
        this.setData({
            isShowWishModel: !0
        });
    },
    closeWishModel: function() {
        this.setData({
            isShowWishModel: !1
        });
    },
    getCollection: function() {
        var e = this, t = {
            accesstoken: this.store.data.userInfo.accesstoken,
            type: 1,
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            sort: "desc"
        };
        (0, o.searchCollectionQuery)(t, function(t) {
            if (wx.stopPullDownRefresh(), 1 === t.errcode) {
                var a = !0;
                t.pages > e.data.pageNum && (a = !1), e.setData({
                    isLoad: a,
                    favoriteList: t.data
                });
            }
            e.setData({
                isShowLoad: !1
            });
        });
    },
    getWishList: function() {
        wx.navigateTo({
            url: "/pages/mine/wishList/wishList"
        });
    },
    getGoodDetail: function(e) {
        var t = e.currentTarget.dataset.good;
        1 == t.isExemptGoods ? wx.navigateTo({
            url: "/pages/freeGoodDetail/freeGoodDetail?goodsUuid=" + t.goodsUuid
        }) : wx.navigateTo({
            url: "/pages/goodDetail/goodDetail?goodsUuid=" + t.goodsUuid
        });
    },
    cancelCollection: function(e) {
        var t = this, a = e.currentTarget.dataset.goodsuuid, s = {
            accesstoken: this.store.data.userInfo.accesstoken,
            goodsUuid: a
        };
        (0, o.getGoodsUnCollection)(s, function(e) {
            1 == e.errcode && t.getCollection();
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1,
            isLoad: !1
        }), this.getCollection();
    },
    onReachBottom: function() {
        var e = this;
        if (!this.data.isLoad) {
            var t = this.data.pageNum + 1;
            this.setData({
                pageNum: t,
                isLoadMore: !0,
                isLoad: !0
            });
            var a = {
                pageSize: this.data.pageSize,
                pageNum: t,
                accesstoken: this.store.data.userInfo.accesstoken,
                type: 1,
                sort: "desc"
            };
            (0, o.getGoodsUnCollection)(a, function(a) {
                if (1 === a.errcode) {
                    var o = e.data.favoriteList.concat(a.data), s = !0;
                    a.pages > e.data.pageNum && (s = !1), e.setData({
                        isLoad: s,
                        isLoadMore: !1,
                        favoriteList: o
                    });
                } else e.setData({
                    isLoad: !1,
                    isLoadMore: !1,
                    pageNum: t - 1
                });
            });
        }
    }
});