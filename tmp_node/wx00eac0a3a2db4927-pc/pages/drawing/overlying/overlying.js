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
        isDesc: !0,
        isShowLoad: !1,
        pageSize: 10,
        pageNum: 1,
        firstActive: 0,
        secondActive: 0,
        groupUuid: "",
        navH: o.globalData.navH,
        status: o.globalData.status,
        cartPage: "尚免·图纸",
        spaceNameList: [],
        recommendProductionList: [],
        relatedProductionList: [],
        selectedQuery: []
    },
    chooseFirst: function(t) {
        this.setData({
            firstActive: t.currentTarget.dataset.index,
            secondActive: 0
        });
        var e = this.data.spaceNameList[t.currentTarget.dataset.index].groups;
        if (0 != e.length) {
            var a = e[0].groupUuid, i = this.isDesc();
            this.getDrawingPackageGoodsQuery(i, 1, a), this.getDrawingPackageGoodsQuery(i, 2, a);
        } else this.setData({
            recommendProductionList: [],
            groupUuid: ""
        });
    },
    chooseSecond: function(t) {
        this.setData({
            secondActive: t.currentTarget.dataset.index,
            groupUuid: t.currentTarget.dataset.groupuuid
        });
        var e = this.isDesc();
        this.getDrawingPackageGoodsQuery(e, 1, t.currentTarget.dataset.groupuuid), this.getDrawingPackageGoodsQuery(e, 2, t.currentTarget.dataset.groupuuid);
    },
    onLoad: function(t) {
        this.setData({
            isShowLoad: !0
        }), this.data.activityUuid = t.activityUuid, this.data.packageUuid = t.packageUuid, 
        this.getDrawingPackageSpaceQuery(t.packageUuid), this.getDrawingGoodsSelectQuery(t.activityUuid);
    },
    getDrawingPackageSpaceQuery: function(t) {
        var e = this, a = {
            packageUuid: t,
            type: 2,
            sort: "desc",
            pageNum: 1,
            pageSize: 100
        };
        (0, s.getDrawingPackageSpaceQuery)(a, function(t) {
            if (1 == t.errcode) {
                e.setData({
                    spaceNameList: t.data
                });
                var a = e.isDesc();
                0 != t.data[0].groups.length ? (e.data.groupUuid = t.data[0].groups[0].groupUuid, 
                e.getDrawingPackageGoodsQuery(a, 1, t.data[0].groups[0].groupUuid), e.getDrawingPackageGoodsQuery(a, 2, t.data[0].groups[0].groupUuid)) : e.setData({
                    isShowLoad: !1,
                    groupUuid: ""
                });
            }
        });
    },
    isDesc: function() {
        var t = "";
        return t = this.data.isDesc ? "desc" : "asc", t;
    },
    priceSort: function() {
        this.setData({
            isDesc: !this.data.isDesc
        });
        var t = this.isDesc();
        this.getDrawingPackageGoodsQuery(t, 1, this.data.groupUuid), this.getDrawingPackageGoodsQuery(t, 2, this.data.groupUuid);
    },
    getDrawingPackageGoodsQuery: function(t, e, a) {
        var i = this, o = {
            pageSize: 10,
            pageNum: 1,
            priceSort: t,
            sort: "desc",
            activityUuid: this.data.activityUuid,
            groupUuid: a,
            accesstoken: this.store.data.userInfo.accesstoken,
            keywords: "",
            type: e
        };
        1 == e ? (0, s.getDrawingPackageGoodsQuery)(o, function(t) {
            1 == t.errcode && i.setData({
                isShowLoad: !1,
                relatedProductionList: t.data
            });
        }) : (0, s.getDrawingPackageGoodsQuery)(o, function(t) {
            1 == t.errcode && i.setData({
                isShowLoad: !1,
                recommendProductionList: t.data
            });
        });
    },
    checkedThis: function(t) {
        var a = this, i = [], o = t.currentTarget.dataset.gooduuid;
        i.push(o);
        var r = t.currentTarget.dataset.index, d = this.data.relatedProductionList[r].isSelected, u = 0, c = {
            activityUuid: this.data.activityUuid
        };
        this.store.data.isLogin ? (c.accesstoken = this.store.data.userInfo.accesstoken, 
        0 == d ? (u = 1, c.goodsUuids = JSON.stringify(i), (0, s.addSelectGoods)(c, function(t) {
            1 == t.errcode && a.getDrawingGoodsSelectQuery(a.data.activityUuid);
        })) : (u = 0, c.goodsUuid = o, (0, s.deleteSelectGoods)(c, function(t) {
            1 == t.errcode && a.getDrawingGoodsSelectQuery(a.data.activityUuid);
        })), this.setData(e({}, "relatedProductionList[" + r + "].isSelected", u))) : wx.navigateTo({
            url: "/pages/login/loginFast/loginFast"
        });
    },
    getDrawingGoodsSelectQuery: function(t) {
        var e = this, a = {
            activityUuid: t,
            pageSize: 100,
            pageNum: this.data.pageNum,
            sort: "desc"
        };
        this.store.data.isLogin && (a.accesstoken = this.store.data.userInfo.accesstoken, 
        a.userUuid = this.store.data.userInfo.userUuid, (0, s.getDrawingGoodsSelectQuery)(a, function(t) {
            1 == t.errcode && e.setData({
                selectedQuery: t.data
            });
        }));
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1,
            isShowLoad: !0
        });
        var t = this.isDesc();
        this.getDrawingPackageGoodsQuery(t, 2, this.data.groupUuid);
    },
    onReachBottom: function() {
        var t = this;
        if (!this.data.isLoad) {
            var e = this.data.pageNum + 1;
            this.setData({
                pageNum: e,
                isShowLoad: !0
            });
            var a = this.isDesc(), i = {
                pageSize: this.data.pageSize,
                pageNum: e,
                priceSort: a,
                sort: "desc",
                activityUuid: this.data.activityUuid,
                groupUuid: this.data.groupUuid,
                accesstoken: this.store.data.userInfo.accesstoken,
                keywords: "",
                type: 2
            };
            (0, s.getDrawingPackageGoodsQuery)(i, function(a) {
                if (1 === a.errcode) {
                    var i = t.data.recommendProductionList.concat(a.data), s = !0;
                    a.pages > t.data.pageNum && (s = !1), t.setData({
                        recommendProductionList: i,
                        isLoad: s,
                        isShowLoad: !1
                    });
                } else t.setData({
                    isLoad: !1,
                    pageNum: e - 1,
                    isShowLoad: !1
                });
            });
        }
    }
});