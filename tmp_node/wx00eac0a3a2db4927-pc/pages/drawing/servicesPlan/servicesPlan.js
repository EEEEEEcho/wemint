function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a = t(require("../../../store")), i = t(require("../../../utils/create")), s = require("../../../api/apiInstance.js"), o = getApp();

(0, i.default)(a.default, {
    properties: {},
    data: {
        total: 0,
        totalPrice: 0,
        activityUuid: "",
        pageSize: 10,
        pageNum: 1,
        isShowLoad: !1,
        navH: o.globalData.navH,
        status: o.globalData.status,
        cartPage: "已选套餐",
        relatedProductionList: []
    },
    onLoad: function(t) {
        this.setData({
            isShowLoad: !0,
            activityUuid: t.activityUuid
        }), this.getDrawingGoodsSelectQuery(t.activityUuid), this.getAcountPrice(t.activityUuid);
    },
    giveItUp: function(t) {
        var a = this, i = t.currentTarget.dataset.goodsuuid, o = t.currentTarget.dataset.index, r = {
            accesstoken: this.store.data.userInfo.accesstoken,
            activityUuid: this.data.activityUuid,
            goodsUuid: i
        };
        (0, s.deleteSelectGoods)(r, function(t) {
            1 == t.errcode && (a.setData(e({}, "relatedProductionList[" + o + "].isSelected", 0)), 
            a.getDrawingGoodsSelectQuery(a.data.activityUuid), a.getAcountPrice());
        });
    },
    getTotalMoney: function(t) {
        for (var e = 0, a = 0; a < t.length; a++) e += t[a].minSalesPrice;
        e = (e / 100).toFixed(2), this.setData({
            totalPrice: e
        });
    },
    getAcountPrice: function(t) {
        var e = this, a = {
            activityUuid: t,
            pageSize: 200,
            pageNum: 1,
            sort: "desc",
            accesstoken: this.store.data.userInfo.accesstoken,
            userUuid: this.store.data.userInfo.userUuid
        };
        (0, s.getDrawingGoodsSelectQuery)(a, function(t) {
            1 == t.errcode && e.getTotalMoney(t.data);
        });
    },
    getDrawingGoodsSelectQuery: function(t) {
        var e = this, a = {
            activityUuid: t,
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            sort: "desc"
        };
        this.store.data.isLogin ? (a.accesstoken = this.store.data.userInfo.accesstoken, 
        a.userUuid = this.store.data.userInfo.userUuid, (0, s.getDrawingGoodsSelectQuery)(a, function(t) {
            if (1 == t.errcode) {
                var a = !0;
                t.pages > e.data.pageNum && (a = !1), e.setData({
                    isShowLoad: !1,
                    relatedProductionList: t.data,
                    total: t.total,
                    isLoad: a
                });
            }
        })) : this.setData({
            isShowLoad: !1
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1,
            isShowLoad: !0
        }), this.getDrawingGoodsSelectQuery(this.data.activityUuid);
    },
    onReachBottom: function() {
        var t = this;
        if (!this.data.isLoad) {
            var e = this.data.pageNum + 1;
            this.setData({
                pageNum: e,
                isShowLoad: !0
            });
            var a = {
                activityUuid: this.data.activityUuid,
                pageSize: this.data.pageSize,
                pageNum: e,
                sort: "desc"
            };
            this.store.data.isLogin && (a.accesstoken = this.store.data.userInfo.accesstoken, 
            a.userUuid = this.store.data.userInfo.userUuid, (0, s.getDrawingGoodsSelectQuery)(a, function(a) {
                if (1 === a.errcode) {
                    var i = t.data.relatedProductionList.concat(a.data), s = !0;
                    a.pages > t.data.pageNum && (s = !1), t.setData({
                        relatedProductionList: i,
                        isLoad: s,
                        isShowLoad: !1
                    });
                } else t.setData({
                    isLoad: !1,
                    pageNum: e - 1,
                    isShowLoad: !1
                });
            }));
        }
    }
});