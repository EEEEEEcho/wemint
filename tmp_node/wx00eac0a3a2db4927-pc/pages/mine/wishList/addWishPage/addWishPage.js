function s(s) {
    return s && s.__esModule ? s : {
        default: s
    };
}

function t(s, t, a) {
    return t in s ? Object.defineProperty(s, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : s[t] = a, s;
}

var a = s(require("../../../../store")), e = s(require("../../../../utils/create")), i = require("../../../../api/apiInstance.js"), o = getApp();

(0, e.default)(a.default, {
    properties: {},
    data: {
        pageSize: 10,
        pageNum: 1,
        isLoad: !1,
        cartPage: "添加心愿",
        navH: o.globalData.navH,
        status: o.globalData.status,
        wishGoodsList: [],
        wishList: [],
        isLoadMore: !1,
        isShowLoad: !0,
        isChecked: !1,
        keywords: "",
        goodsUuidList: [],
        goodsList: [],
        wishUuid: ""
    },
    onLoad: function(s) {
        this.getWishOptionalQuery(), this.setData({
            wishUuid: s.wishUuid
        });
    },
    searchSomething: function(s) {
        this.setData({
            keywords: s.detail.value
        }), this.data.pageNum = 1, this.data.isLoad = !1, this.getWishOptionalQuery();
    },
    toCheck: function(s) {
        var a, e = this.data.goodsUuidList, i = this.data.goodsList, o = this.data.isChecked, d = s.currentTarget.dataset.checkindex, r = this.data.wishGoodsList, u = !1, h = r[d].goodsUuid, n = r[d];
        -1 != e.indexOf(h) ? (u = !1, e.splice(e.indexOf(h), 1), i.splice(d, 1)) : (u = !0, 
        e.push(h), i.push(n)), o = 0 != e.length;
        var c = "wishGoodsList[" + d + "].isChecked";
        this.setData((a = {}, t(a, c, u), t(a, "goodsUuidList", e), t(a, "goodsList", i), 
        t(a, "isChecked", o), a));
    },
    finished: function() {
        var s = {
            accesstoken: this.store.data.userInfo.accesstoken,
            wishUuid: this.data.wishUuid,
            goodsUuids: JSON.stringify(this.data.goodsUuidList)
        };
        (0, i.addWishGoods)(s, function(s) {
            1 == s.errcode && wx.navigateBack({
                delta: 1
            });
        });
    },
    getWishOptionalQuery: function() {
        var s = this, t = {
            accesstoken: this.store.data.userInfo.accesstoken,
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            sort: "",
            userUuid: this.store.data.userInfo.userUuid
        };
        "" != this.data.keywords && (t.keywords = this.data.keywords), (0, i.getWishOptionalQuery)(t, function(t) {
            wx.stopPullDownRefresh(), 1 == t.errcode && s.setData({
                wishGoodsList: t.data
            }), s.setData({
                isShowLoad: !1
            });
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1,
            isLoad: !1
        }), this.getWishOptionalQuery();
    },
    onReachBottom: function() {
        var s = this;
        if (!this.data.isLoad) {
            var t = this.data.pageNum + 1;
            this.setData({
                pageNum: t,
                isLoad: !0,
                isLoadMore: !0
            });
            var a = {
                accesstoken: this.store.data.userInfo.accesstoken,
                pageSize: this.data.pageSize,
                pageNum: t,
                sort: "",
                userUuid: this.store.data.userInfo.userUuid
            };
            "" != this.data.keywords && (a.keywords = this.data.keywords), (0, i.getWishOptionalQuery)(a, function(a) {
                if (1 === a.errcode) {
                    var e = s.data.wishGoodsList.concat(a.data), i = !0;
                    a.pages > s.data.pageNum && (i = !1), s.setData({
                        isLoad: i,
                        isLoadMore: !1,
                        wishGoodsList: e
                    });
                } else s.setData({
                    isLoad: !1,
                    isLoadMore: !1,
                    pageNum: t - 1
                });
            });
        }
    }
});