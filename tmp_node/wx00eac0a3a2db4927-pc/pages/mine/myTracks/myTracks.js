function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../store")), e = t(require("../../../utils/create")), o = require("../../../api/apiInstance.js"), s = getApp();

(0, e.default)(a.default, {
    properties: {},
    data: {
        pageSize: 10,
        pageNum: 1,
        isLoad: !1,
        cartPage: "我的足迹",
        navH: s.globalData.navH,
        status: s.globalData.status,
        footprintList: [],
        isLoadMore: !1,
        isShowLoad: !0
    },
    onLoad: function() {
        this.getFootprint();
    },
    getFootprint: function() {
        var t = this, a = {
            accesstoken: this.store.data.userInfo.accesstoken,
            type: 1,
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            sort: ""
        };
        (0, o.searchFootprintQuery)(a, function(a) {
            wx.stopPullDownRefresh(), 1 == a.errcode && t.setData({
                footprintList: a.data
            }), t.setData({
                isShowLoad: !1
            });
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1,
            isLoad: !1
        }), this.getFootprint();
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
            var e = {
                pageSize: this.data.pageSize,
                pageNum: a,
                accesstoken: this.store.data.userInfo.accesstoken,
                type: 1,
                sort: ""
            };
            (0, o.searchFootprintQuery)(e, function(e) {
                if (1 === e.errcode) {
                    var o = t.data.footprintList.concat(e.data), s = !0;
                    e.pages > t.data.pageNum && (s = !1), t.setData({
                        isLoad: s,
                        isLoadMore: !1,
                        footprintList: o
                    });
                } else t.setData({
                    isLoad: !1,
                    isLoadMore: !1,
                    pageNum: a - 1
                });
            });
        }
    },
    getGoodDetail: function(t) {
        wx.navigateTo({
            url: "/pages/goodDetail/goodDetail?goodsUuid=" + t.currentTarget.dataset.uuid
        });
    }
});