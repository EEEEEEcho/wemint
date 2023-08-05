function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function i(t, i, a) {
    return i in t ? Object.defineProperty(t, i, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[i] = a, t;
}

var a = t(require("../../../../store")), s = t(require("../../../../utils/create")), e = require("../../../../api/apiInstance.js"), o = require("../../../../utils/distribution"), d = getApp();

(0, s.default)(a.default, {
    properties: {},
    data: {
        pageSize: 10,
        pageNum: 1,
        isLoad: !1,
        cartPage: "心愿单2019",
        navH: d.globalData.navH,
        status: d.globalData.status,
        wishDetailList: [],
        isLoadMore: !1,
        isShowLoad: !0,
        isEditWish: !1,
        options: !1,
        wishName: "",
        inputValue: ""
    },
    onLoad: function(t) {
        var a, s = JSON.parse(decodeURIComponent(t.wish));
        this.getWishList(s.wishUuid), this.setData((a = {}, i(a, "wishDetailList.wishIndex", t.wishIndex), 
        i(a, "wishDetailList.title", s.title), i(a, "wishDetailList.wishUuid", s.wishUuid), 
        i(a, "wishDetailList.avatar", s.avatar), i(a, "wishDetailList.wishNickname", s.nickname), 
        i(a, "wishDetailList.isDefault", s.isDefault), a)), (0, o.initQrCode)(this, "pages/index/index", "", "");
    },
    getWishList: function(t) {
        var a = this, s = {
            wishUuid: t,
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            sort: ""
        };
        (0, e.getWishListQuery)(s, function(t) {
            if (wx.stopPullDownRefresh(), 1 == t.errcode) {
                var s;
                a.setData((s = {}, i(s, "wishDetailList.goodsList", t.data), i(s, "wishDetailList.total", t.total), 
                s));
            }
            a.setData({
                isShowLoad: !1
            });
        });
    },
    editWishName: function() {
        this.setData({
            isEditWish: !0,
            options: !0
        });
    },
    closeWishModel: function() {
        var t = this;
        this.setData({
            options: !1
        }), setTimeout(function() {
            t.setData({
                isEditWish: !1
            });
        }, 320);
    },
    getValue: function(t) {
        this.setData({
            inputValue: t.detail.value
        });
    },
    getInputValue: function() {
        var t = this;
        if ("" != this.data.inputValue) {
            this.setData({
                options: !1
            }), setTimeout(function() {
                t.setData({
                    isEditWish: !1
                });
            }, 320);
            var a = {
                accesstoken: this.store.data.userInfo.accesstoken,
                wishUuid: this.data.wishDetailList.wishUuid,
                title: this.data.inputValue
            };
            (0, e.updateWishTitle)(a, function(a) {
                1 == a.errcode && t.setData(i({}, "wishDetailList.wishName", t.data.inputValue));
            });
        } else wx.showToast({
            title: "请编辑心愿单标题",
            icon: "none",
            duration: 2e3
        });
    },
    deleteWish: function() {
        var t = this;
        this.setData({
            options: !1
        }), setTimeout(function() {
            t.setData({
                isEditWish: !1
            });
        }, 320);
        var i = {
            accesstoken: this.store.data.userInfo.accesstoken,
            wishUuid: this.data.wishDetailList.wishUuid
        };
        (0, e.deleteWish)(i, function(t) {
            1 == t.errcode && wx.navigateBack({
                delta: 1
            });
        });
    },
    cancelWish: function(t) {
        var a = this, s = t.currentTarget.dataset.index, o = t.currentTarget.dataset.linkuuid, d = {
            accesstoken: this.store.data.userInfo.accesstoken,
            linkUuid: o
        };
        (0, e.deleteWishGoods)(d, function(t) {
            if (1 == t.errcode) {
                var e, o = a.data.wishDetailList.total, d = a.data.wishDetailList.goodsList;
                d.splice(s, 1), a.setData((e = {}, i(e, "wishDetailList.goodsList", d), i(e, "wishDetailList.total", o - 1), 
                e));
            }
        });
    },
    onUnload: function() {
        clearTimeout();
    },
    onShow: function() {
        this.data.pageNum = 1;
        var t = this.data.wishDetailList.wishUuid;
        this.getWishList(t);
    },
    addWish: function() {
        var t = this.data.wishDetailList.wishUuid;
        wx.navigateTo({
            url: "/pages/mine/wishList/addWishPage/addWishPage?wishUuid=" + t
        });
    },
    getGoodDetail: function(t) {
        var i = t.currentTarget.dataset.wish;
        "0" == i.isExemptGoods ? wx.navigateTo({
            url: "/pages/goodDetail/goodDetail?goodsUuid=" + i.goodsUuid
        }) : wx.navigateTo({
            url: "/pages/freeGoodDetail/freeGoodDetail?goodsUuid=" + i.goodsUuid
        });
    },
    onShareAppMessage: function(t) {
        var i = this.data.wishDetailList.wishUuid, a = (0, o.onSharePage)(this, "/pages/index/index", "", "", {
            title: this.data.wishDetailList.title,
            desc: "好家居，并不贵"
        });
        return a.path = a.path + "&wishUuid=" + i, a;
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.setData({
            pageNum: 1,
            isLoad: !1
        });
        var t = this.data.wishDetailList.wishUuid;
        this.getWishList(t);
    },
    onReachBottom: function() {
        var t = this;
        if (!this.data.isLoad) {
            var a = this.data.pageNum + 1;
            this.setData({
                pageNum: a,
                isLoad: !0,
                isLoadMore: !0
            });
            var s = {
                wishUuid: this.data.wishDetailList.wishUuid,
                pageSize: this.data.pageSize,
                pageNum: a,
                sort: ""
            };
            (0, e.getWishListQuery)(s, function(s) {
                if (1 === s.errcode) {
                    var e = t.data.wishDetailList.goodsList.concat(s.data), o = !0;
                    s.pages > t.data.pageNum && (o = !1), t.setData(i({
                        isLoad: o,
                        isLoadMore: !1
                    }, "wishDetailList.goodsList", e));
                } else t.setData({
                    isLoad: !1,
                    isLoadMore: !1,
                    pageNum: a - 1
                });
            });
        }
    }
});