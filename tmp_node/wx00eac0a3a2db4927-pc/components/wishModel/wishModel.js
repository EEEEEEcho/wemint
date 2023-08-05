var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create")), i = require("../../api/apiInstance");

(0, t.default)({
    properties: {
        isShowWishModel: Boolean,
        wishUuid: String
    },
    observers: {
        isShowWishModel: function(t) {
            t && this.data.isFirst && (this.data.isFirst = !1, this.data.pageNum = 1, this.getWishInfo(), 
            this.getWishGood(!1), this.setData({
                options: t
            }));
        }
    },
    data: {
        wishListData: [],
        wishInfo: {},
        options: !1,
        total: 0,
        pageSize: 10,
        pageNum: 1,
        isLoad: !0,
        isFirst: !0
    },
    methods: {
        onBindToLower: function(t) {
            this.data.isLoad || (this.data.isLoad = !0, this.data.pageNum = this.data.pageNum + 1, 
            this.getWishGood(!0));
        },
        closeWishModel: function() {
            var t = this;
            setTimeout(function() {
                t.setData({
                    isShowWishModel: !1
                });
            }, 480);
        },
        getWishInfo: function() {
            var t = this, a = {
                wishUuid: this.data.wishUuid
            };
            (0, i.getWishInfo)(a, function(i) {
                1 === i.errcode && t.setData({
                    wishInfo: i.data
                });
            });
        },
        getWishGood: function(t) {
            var a = this, s = {
                wishUuid: this.data.wishUuid,
                pageSize: this.data.pageSize,
                pageNum: this.data.pageNum,
                sort: "desc"
            };
            (0, i.getWishListQuery)(s, function(i) {
                if (1 === i.errcode) {
                    var s;
                    s = t ? a.data.wishListData.concat(i.data) : i.data;
                    var e = !0;
                    i.pages > a.data.pageNum && (e = !1), a.data.isLoad = e, a.setData({
                        wishListData: s,
                        total: i.total
                    });
                } else a.data.isLoad = !1, a.data.pageNum = a.data.pageNum - 1;
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
        finished: function() {
            var t = this;
            if (this.store.data.isLogin) {
                var a = {
                    wishUuid: this.data.wishUuid,
                    accesstoken: this.store.data.userInfo.accesstoken
                };
                (0, i.getWishAddAll)(a, function(i) {
                    1 === i.errcode && (wx.showToast({
                        title: "添加心愿单成功",
                        icon: "none",
                        duration: 3e3
                    }), t.closeWishModel());
                });
            } else wx.navigateTo({
                url: "/pages/login/loginFast/loginFast"
            });
        }
    }
});