var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../utils/create")), e = require("../../api/apiInstance");

getApp();

(0, a.default)({
    data: {
        cardList: [],
        pageSize: 10,
        pageNum: 1,
        isLoad: !1
    },
    ready: function() {
        this.getCards();
    },
    methods: {
        onDetail: function(a) {
            wx.navigateTo({
                url: "/pages/mine/cardDetail/cardDetail?cardUuid=" + a.currentTarget.dataset.cardUuid
            });
        },
        getCards: function() {
            var a = this, t = {
                accesstoken: this.store.data.userInfo.accesstoken,
                pageSize: this.data.pageSize,
                pageNum: this.data.pageNum
            };
            (0, e.getCardUser)(t, function(e) {
                if (wx.stopPullDownRefresh(), 1 === e.errcode) {
                    var t = !0;
                    e.pages > a.data.pageNum && (t = !1), a.setData({
                        cardList: e.data,
                        isLoad: t
                    });
                }
            });
        },
        onRefresh: function() {
            this.setData({
                pageNum: 1
            }), this.getCards();
        },
        onMore: function() {
            var a = this;
            if (!this.data.isLoad) {
                var t = this.data.pageNum + 1;
                this.setData({
                    pageNum: t
                });
                var s = {
                    accesstoken: this.store.data.userInfo.accesstoken,
                    pageSize: this.data.pageSize,
                    pageNum: this.data.pageNum
                };
                (0, e.getCardUser)(s, function(e) {
                    if (1 === e.errcode) {
                        var s = a.data.cardList.concat(e.data), i = !0;
                        e.pages > a.data.pageNum && (i = !1), a.setData({
                            cardList: s,
                            isLoad: i
                        });
                    } else a.setData({
                        isLoad: !1,
                        pageNum: t - 1
                    });
                });
            }
        }
    }
});