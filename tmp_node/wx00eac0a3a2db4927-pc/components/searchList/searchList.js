var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create")), e = require("../../api/apiInstance.js"), a = getApp();

(0, t.default)({
    pure: !0,
    properties: {
        keywords: String,
        categoryUuid: String,
        isStyle: Boolean,
        pictureUrl: String
    },
    data: {
        isAllBlack: !0,
        isPriceBlack: !1,
        isDownBlack: !1,
        isUpBlack: !1,
        isCate: !1,
        isSelect: !1,
        navH: a.globalData.navH,
        status: a.globalData.status,
        pageNum: 1,
        pageSize: 10,
        isLoad: !1,
        isLoadMore: !1,
        goodList: [],
        isFixed: !1,
        topOffset: 0,
        propertyDetail: {}
    },
    observers: {
        categoryUuid: function(t) {
            "" != this.data.keywords && (this.setData({
                propertyDetail: {}
            }), this.selectCategoryQuery(t));
        },
        pictureUrl: function(t) {
            "" != t && (this.setData({
                propertyDetail: {}
            }), this.selectCategoryQuery(t));
        }
    },
    ready: function() {
        "" == this.data.pictureUrl && this.setOffset();
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
            }, 260);
        },
        selectCategoryQuery: function(t) {
            this.setData({
                isCate: !1
            }), this.onRefresh();
        },
        getParam: function() {
            var t = {
                pageSize: this.data.pageSize,
                pageNum: this.data.pageNum
            };
            return this.data.isPriceBlack && (this.data.isDownBlack ? t.priceSort = "desc" : t.priceSort = "asc"), 
            "" != this.data.categoryUuid && (t.categoryUuid = this.data.categoryUuid), "" != this.data.keywords && (t.keywords = this.data.keywords), 
            "" != this.data.pictureUrl && (t.imageUrl = this.data.pictureUrl), "{}" != JSON.stringify(this.data.propertyDetail) && (0 != this.data.propertyDetail.minSalesPrice && (t.minSalesPrice = this.data.propertyDetail.minSalesPrice), 
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
        onStyleSure: function(t) {
            this.data.propertyDetail = t.detail, this.onRefresh();
        },
        isStyleShow: function(t) {
            this.setData({
                isStyle: t.detail
            });
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
            var e = parseInt(t.currentTarget.dataset.index), a = !1, i = !1, s = !1, r = !1, o = !1, c = !1;
            switch (e) {
              case 1:
                this.setData({
                    propertyDetail: {}
                }), a = !0;
                break;

              case 2:
                this.setData({
                    propertyDetail: {}
                }), i = !0, this.data.isDownBlack ? r = !0 : s = !0;
                break;

              case 4:
                o = !0;
                break;

              case 5:
                c = !0, this.triggerEvent("showRightModel", c);
            }
            switch (this.setData({
                isAllBlack: a,
                isPriceBlack: i,
                isDownBlack: s,
                isUpBlack: r,
                isCate: o,
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