function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var s = t(require("../../../store")), a = t(require("../../../utils/create")), e = require("../../../api/apiInstance.js"), i = getApp();

(0, a.default)(s.default, {
    properties: {},
    data: {
        pageSize: 10,
        pageNum: 1,
        isLoad: !1,
        cartPage: "心愿单",
        navH: i.globalData.navH,
        status: i.globalData.status,
        wishMenuList: [],
        wishList: [],
        isLoadMore: !1,
        isShowLoad: !0,
        isEditWish: !1,
        wishName: "",
        noGoodsList: [ "http://oss.shangmian.xin/weixin_applets_mine_good_back.png", "http://oss.shangmian.xin/weixin_applets_mine_good_back.png", "http://oss.shangmian.xin/weixin_applets_mine_good_back.png", "http://oss.shangmian.xin/weixin_applets_mine_good_back.png", "http://oss.shangmian.xin/weixin_applets_mine_good_back.png" ]
    },
    onLoad: function() {},
    onShow: function() {
        this.setData({
            pageNum: 1,
            isLoad: !1
        }), this.getWishQuery();
    },
    getWishDetail: function(t) {
        var s = t.currentTarget.dataset.wish, a = t.currentTarget.dataset.wishindex;
        delete s.goodsList, wx.navigateTo({
            url: "/pages/mine/wishList/wishDetail/wishDetail?wishIndex=" + a + "&wish=" + encodeURIComponent(JSON.stringify(s))
        });
    },
    addWishMenu: function() {
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
    getInputValue: function(t) {
        this.setData({
            wishName: t.detail.value
        });
    },
    sureAdd: function() {
        var t = this;
        "" != this.data.wishName ? (this.setData({
            options: !1
        }), setTimeout(function() {
            t.setData({
                isEditWish: !1
            }), t.addWishList(t.data.wishName);
        }, 320)) : wx.showToast({
            title: "请填写心愿单名称",
            icon: "none",
            duration: 2e3
        });
    },
    addWishList: function(t) {
        var s = this, a = {
            accesstoken: this.store.data.userInfo.accesstoken,
            title: t
        };
        (0, e.addWish)(a, function(t) {
            1 == t.errcode && (s.setData({
                pageNum: 1,
                isLoad: !1
            }), s.getWishQuery(), s.store.data.wishList.total = s.store.data.wishList.total + 1, 
            s.update());
        });
    },
    getWishQuery: function() {
        var t = this, s = {
            accesstoken: this.store.data.userInfo.accesstoken,
            userUuid: this.store.data.userInfo.userUuid,
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            sort: ""
        };
        (0, e.getWishQuery)(s, function(s) {
            wx.stopPullDownRefresh(), 1 == s.errcode && t.setData({
                wishMenuList: s.data
            }), t.setData({
                isShowLoad: !1
            });
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1,
            isLoad: !1
        }), this.getWishQuery();
    },
    onReachBottom: function() {
        var t = this;
        if (!this.data.isLoad) {
            var s = this.data.pageNum + 1;
            this.setData({
                pageNum: s,
                isLoad: !0,
                isLoadMore: !0
            });
            var a = {
                accesstoken: this.store.data.userInfo.accesstoken,
                userUuid: this.store.data.userInfo.userUuid,
                pageSize: this.data.pageSize,
                pageNum: s,
                sort: ""
            };
            (0, e.getWishQuery)(a, function(a) {
                if (1 === a.errcode) {
                    var e = t.data.wishMenuList.concat(a.data), i = !0;
                    a.pages >= t.data.pageNum && (i = !1), t.setData({
                        isLoad: i,
                        isLoadMore: !1,
                        wishMenuList: e
                    });
                } else t.setData({
                    isLoad: !1,
                    isLoadMore: !1,
                    pageNum: s - 1
                });
            });
        }
    }
});