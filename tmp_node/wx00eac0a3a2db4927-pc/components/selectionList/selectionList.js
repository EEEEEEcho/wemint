var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create")), a = require("../../api/apiInstance"), s = getApp();

(0, t.default)({
    properties: {
        keywords: String
    },
    data: {
        isAllBlack: !0,
        isPriceBlack: !1,
        isChargesBlack: !1,
        isChargesDownBlack: !1,
        isChargesUpBlack: !1,
        isDownBlack: !1,
        isUpBlack: !1,
        isCate: !1,
        navH: s.globalData.navH,
        status: s.globalData.status,
        pageNum: 1,
        pageSize: 10,
        isLoad: !1,
        isLoadMore: !1,
        goodList: [],
        categories: [],
        isFixed: !1,
        topOffset: 0,
        childCategoryUuid: "",
        isFirst: !1
    },
    observers: {
        keywords: function(t) {
            this.data.isFirst && this.getGoodsQuery();
        }
    },
    ready: function() {
        this.getCategoryQuery(), this.getGoodsQuery(), this.setOffset(), this.data.isFirst = !0;
    },
    methods: {
        setOffset: function() {
            var t = this;
            setTimeout(function() {
                t.createSelectorQuery().select("#options").boundingClientRect(function(a) {
                    t.setData({
                        topOffset: a.top
                    });
                }).exec();
            }, 260);
        },
        getCategoryQuery: function() {
            var t = this, s = {
                accesstoken: this.store.data.userInfo.accesstoken
            };
            (0, a.getDistributionCategory)(s, function(a) {
                1 === a.errcode && t.setData({
                    categories: a.data
                });
            });
        },
        getParam: function() {
            var t = {
                accesstoken: this.store.data.userInfo.accesstoken,
                pageSize: this.data.pageSize,
                pageNum: this.data.pageNum,
                keywords: this.data.keywords
            };
            return this.data.isPriceBlack && (this.data.isDownBlack ? t.priceSort = "desc" : t.priceSort = "asc"), 
            "" != this.data.childCategoryUuid && (t.categoryUuid = this.data.childCategoryUuid), 
            this.data.isChargesBlack && (this.data.isChargesDownBlack ? t.commissionSort = "desc" : t.commissionSort = "asc"), 
            t;
        },
        getGoodsQuery: function() {
            var t = this, s = this.getParam();
            (0, a.getDistributionGoods)(s, function(a) {
                if (wx.stopPullDownRefresh(), 1 === a.errcode) {
                    var s = !0;
                    a.pages > t.data.pageNum && (s = !1), t.setData({
                        goodList: a.data,
                        isLoad: s
                    });
                }
            });
        },
        onClassifySure: function(t) {
            this.setData({
                childCategoryUuid: t.detail.categoryUuid
            }), this.onRefresh();
        },
        onPageScroll: function(t) {
            this.data.topOffset < t ? this.setData({
                isFixed: !0
            }) : this.setData({
                isFixed: !1
            });
        },
        onRefresh: function() {
            this.setData({
                pageNum: 1,
                isLoad: !1
            }), this.getGoodsQuery();
        },
        onMore: function() {
            var t = this;
            if (!this.data.isLoad) {
                var s = this.data.pageNum + 1;
                this.setData({
                    pageNum: s,
                    isLoad: !0,
                    isLoadMore: !0
                });
                var e = this.getParam();
                (0, a.getDistributionGoods)(e, function(a) {
                    if (1 === a.errcode) {
                        var e = t.data.goodList.concat(a.data), i = !0;
                        a.pages > t.data.pageNum && (i = !1), t.setData({
                            isLoad: i,
                            isLoadMore: !1,
                            goodList: e
                        });
                    } else t.setData({
                        isLoad: !1,
                        isLoadMore: !1,
                        pageNum: s - 1
                    });
                });
            }
        },
        onClickItem: function(t) {
            var a = parseInt(t.currentTarget.dataset.index), s = !1, e = !1, i = !1, o = !1, r = !1, c = !1, d = !1, n = !1;
            switch (a) {
              case 1:
                s = !0, this.setData({
                    childCategoryUuid: ""
                });
                break;

              case 2:
                e = !0, this.setData({
                    childCategoryUuid: ""
                }), this.data.isDownBlack ? d = !0 : c = !0;
                break;

              case 3:
                i = !0, this.setData({
                    childCategoryUuid: ""
                }), this.data.isChargesDownBlack ? r = !0 : o = !0;
                break;

              case 5:
                n = !0;
            }
            switch (this.setData({
                isAllBlack: s,
                isPriceBlack: e,
                isChargesBlack: i,
                isChargesDownBlack: o,
                isChargesUpBlack: r,
                isDownBlack: c,
                isUpBlack: d,
                isCate: n
            }), a) {
              case 1:
              case 2:
              case 3:
              case 4:
                this.onRefresh();
            }
        }
    }
});