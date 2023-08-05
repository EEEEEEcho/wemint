var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create")), e = require("../../api/apiInstance.js"), a = getApp();

(0, t.default)({
    pure: !0,
    properties: {
        isComplex: Boolean,
        isPrice: Boolean,
        isClassify: Boolean,
        isFilter: Boolean,
        isGrade: Boolean,
        keywords: String,
        spaceUuid: String,
        styleUuid: String,
        categoryUuid: String,
        shopUuid: String,
        isRecommend: Number,
        isIndexRecommend: Number
    },
    data: {
        isAllBlack: !0,
        isPriceBlack: !1,
        isDownBlack: !1,
        isUpBlack: !1,
        isNew: !1,
        isCate: !1,
        isSelect: !1,
        navH: a.globalData.navH,
        status: a.globalData.status,
        pageNum: 1,
        pageSize: 10,
        isLoad: !1,
        isLoadMore: !1,
        goodList: [],
        categories: [],
        isFixed: !1,
        topOffset: 0,
        childCategoryUuid: "",
        propertyDetail: {}
    },
    observers: {
        spaceUuid: function(t) {
            this.selectCategoryQuery(t);
        },
        styleUuid: function(t) {
            this.selectCategoryQuery(t);
        },
        categoryUuid: function(t) {
            this.selectCategoryQuery(t);
        },
        shopUuid: function(t) {
            this.selectCategoryQuery(t);
        }
    },
    ready: function() {
        this.data.isClassify || this.getGoodsQuery(), this.setOffset();
    },
    methods: {
        setOffset: function() {
            var t = this;
            setTimeout(function() {
                t.createSelectorQuery().select("#options").boundingClientRect(function(e) {
                    t.setData({
                        topOffset: e.top
                    });
                }).exec();
            }, 300);
        },
        selectCategoryQuery: function(t) {
            "" != t && this.data.isClassify && (this.setData({
                isCate: !1
            }), this.getRecommendQuery(), this.onRefresh());
        },
        getRecommendQuery: function() {
            var t = this, a = {};
            "" != this.data.styleUuid && (a.styleUuid = this.data.styleUuid), "" != this.data.spaceUuid && (a.spaceUuid = this.data.spaceUuid), 
            "" != this.data.categoryUuid && (a.categoryUuid = this.data.categoryUuid), "" != this.data.shopUuid && (a.shopUuid = this.data.shopUuid), 
            (0, e.getRecommendQuery)(a, function(e) {
                1 === e.errcode && t.setData({
                    categories: e.data
                });
            });
        },
        getParam: function() {
            var t = {
                pageSize: this.data.pageSize,
                pageNum: this.data.pageNum
            };
            return 1 == this.properties.isRecommend && (t.isRecommend = this.properties.isRecommend), 
            1 == this.properties.isIndexRecommend && (t.isIndexRecommend = this.properties.isIndexRecommend), 
            this.data.isPriceBlack && (this.data.isDownBlack ? t.priceSort = "desc" : t.priceSort = "asc"), 
            this.data.isNew && (t.isNew = 1), "" != this.data.styleUuid && (t.styleUuid = this.data.styleUuid), 
            "" != this.data.spaceUuid && (t.spaceUuid = this.data.spaceUuid), (this.data.isSelect || this.data.isCate) && "" != this.data.childCategoryUuid && (t.categoryUuid = this.data.childCategoryUuid), 
            "" != this.data.keywords && (t.keywords = this.data.keywords), "" != this.data.categoryUuid && (t.foreCategoryUuid = this.data.categoryUuid), 
            "" != this.data.shopUuid && (t.shopUuid = this.data.shopUuid), this.data.isSelect && "{}" != JSON.stringify(this.data.propertyDetail) && (0 != this.data.propertyDetail.minSalesPrice && (t.minSalesPrice = this.data.propertyDetail.minSalesPrice), 
            0 != this.data.propertyDetail.maxSalesPrice && (t.maxSalesPrice = this.data.propertyDetail.maxSalesPrice), 
            this.data.propertyDetail.properties.length > 0 && (t.property = JSON.stringify(this.data.propertyDetail.properties))), 
            t;
        },
        getGoodsQuery: function() {
            var t = this, a = this.getParam();
            (0, e.getGoodQuery)(a, function(e) {
                if (wx.stopPullDownRefresh(), 1 === e.errcode) {
                    var a = !0;
                    e.pages > t.data.pageNum && (a = !1), t.setData({
                        goodList: e.data,
                        isLoad: a
                    });
                }
            });
        },
        onClassifySure: function(t) {
            this.setData({
                childCategoryUuid: t.detail.categoryUuid
            }), this.onRefresh();
        },
        onPropertySure: function(t) {
            this.data.propertyDetail = t.detail, this.onRefresh();
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
                var a = this.data.pageNum + 1;
                this.setData({
                    pageNum: a,
                    isLoad: !0,
                    isLoadMore: !0
                });
                var i = this.getParam();
                (0, e.getGoodQuery)(i, function(e) {
                    if (1 === e.errcode) {
                        var i = t.data.goodList.concat(e.data), s = !0;
                        e.pages > t.data.pageNum && (s = !1), t.setData({
                            isLoad: s,
                            isLoadMore: !1,
                            goodList: i
                        });
                    } else t.setData({
                        isLoad: !1,
                        isLoadMore: !1,
                        pageNum: a - 1
                    });
                });
            }
        },
        onClickItem: function(t) {
            var e = parseInt(t.currentTarget.dataset.index), a = !1, i = !1, s = !1, o = !1, r = !1, d = !1, c = !1;
            switch (e) {
              case 1:
                a = !0, this.setData({
                    childCategoryUuid: ""
                });
                break;

              case 2:
                i = !0, this.data.isDownBlack ? o = !0 : s = !0, this.setData({
                    childCategoryUuid: ""
                });
                break;

              case 3:
                this.setData({
                    childCategoryUuid: ""
                }), r = !0;
                break;

              case 4:
                d = !0;
                break;

              case 5:
                c = !0, this.triggerEvent("showRightModel", c);
            }
            switch (this.setData({
                isAllBlack: a,
                isPriceBlack: i,
                isDownBlack: s,
                isUpBlack: o,
                isNew: r,
                isCate: d,
                isSelect: c
            }), e) {
              case 1:
              case 2:
              case 3:
                this.onRefresh();
            }
        }
    }
});