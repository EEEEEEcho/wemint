var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create")), a = require("../../api/apiInstance.js"), e = getApp();

(0, t.default)({
    pure: !0,
    properties: {
        categoryUuid: String
    },
    data: {
        isAllBlack: !0,
        isPriceBlack: !1,
        isDownBlack: !1,
        isUpBlack: !1,
        isNew: !1,
        navH: e.globalData.navH,
        status: e.globalData.status,
        pageNum: 1,
        pageSize: 10,
        isLoad: !1,
        goodList: [],
        isFixed: !1,
        topOffset: 0
    },
    observers: {
        categoryUuid: function(t) {
            this.data.pageNum = 1, this.getGoodsQuery();
        }
    },
    ready: function() {
        this.setOffset();
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
        getParam: function() {
            var t = {
                goodsType: 2,
                pageSize: this.data.pageSize,
                pageNum: this.data.pageNum,
                sort: "desc"
            };
            return this.data.isPriceBlack && (this.data.isDownBlack ? t.priceSort = "desc" : t.priceSort = "asc"), 
            this.data.isNew && (t.isNew = 1), "" != this.data.categoryUuid && (t.categoryUuid = this.data.categoryUuid), 
            t;
        },
        getGoodsQuery: function() {
            var t = this, e = this.getParam();
            (0, a.getFreeGoodList)(e, function(a) {
                if (wx.stopPullDownRefresh(), 1 === a.errcode) {
                    var e = !0;
                    a.pages > t.data.pageNum && (e = !1), t.setData({
                        goodList: a.data,
                        isLoad: e
                    });
                }
            });
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
                var e = this.data.pageNum + 1;
                this.setData({
                    pageNum: e,
                    isLoad: !0
                });
                var s = this.getParam();
                (0, a.getFreeGoodList)(s, function(a) {
                    if (1 === a.errcode) {
                        var s = t.data.goodList.concat(a.data), i = !0;
                        a.pages > t.data.pageNum && (i = !1), t.setData({
                            isLoad: i,
                            goodList: s
                        });
                    } else t.setData({
                        isLoad: !1,
                        pageNum: e - 1
                    });
                });
            }
        },
        onClickItem: function(t) {
            var a = !1, e = !1, s = !1, i = !1, o = !1;
            switch (parseInt(t.currentTarget.dataset.index)) {
              case 1:
                a = !0;
                break;

              case 2:
                e = !0, this.data.isDownBlack ? i = !0 : s = !0;
                break;

              case 3:
                o = !0;
            }
            this.setData({
                isAllBlack: a,
                isPriceBlack: e,
                isDownBlack: s,
                isUpBlack: i,
                isNew: o
            }), this.onRefresh();
        }
    }
});