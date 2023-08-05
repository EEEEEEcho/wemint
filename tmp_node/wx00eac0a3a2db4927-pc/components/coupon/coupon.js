var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../utils/create")), e = require("../../api/apiInstance");

getApp();

(0, a.default)({
    data: {
        couponList: [],
        pageSize: 10,
        pageNum: 1,
        isLoad: !1
    },
    ready: function() {
        this.getCoupons();
    },
    methods: {
        onDetail: function(a) {
            wx.navigateTo({
                url: "/pages/mine/couponDetail/couponDetail?couponUuid=" + a.currentTarget.dataset.couponUuid
            });
        },
        onAround: function(a) {
            wx.reLaunch({
                url: "/pages/index/index"
            });
        },
        getCoupons: function() {
            var a = this, t = {
                accesstoken: this.store.data.userInfo.accesstoken,
                pageSize: this.data.pageSize,
                pageNum: this.data.pageNum
            };
            (0, e.getCouponUser)(t, function(e) {
                if (wx.stopPullDownRefresh(), console.log(e.data), 1 === e.errcode) {
                    var t = !0;
                    e.pages > a.data.pageNum && (t = !1), a.setData({
                        couponList: e.data,
                        isLoad: t
                    });
                }
            });
        },
        onRefresh: function() {
            this.setData({
                pageNum: 1
            }), this.getCoupons();
        },
        onMore: function() {
            var a = this;
            if (!this.data.isLoad) {
                var t = this.data.pageNum + 1;
                this.setData({
                    pageNum: t
                });
                var o = {
                    accesstoken: this.store.data.userInfo.accesstoken,
                    pageSize: this.data.pageSize,
                    pageNum: this.data.pageNum
                };
                (0, e.getCouponUser)(o, function(e) {
                    if (1 === e.errcode) {
                        var o = a.data.couponList.concat(e.data), s = !0;
                        e.pages > a.data.pageNum && (s = !1), a.setData({
                            couponList: o,
                            isLoad: s
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