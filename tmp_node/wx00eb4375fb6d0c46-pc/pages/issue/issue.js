var o = require("../../utils/wxapp.js"), t = require("../../utils/wxcomm.js");

Page({
    data: {
        couponsId: "",
        showMoreItem: !1,
        showLoading: !0,
        couponListAll: [],
        couponList: []
    },
    onLoad: function(o) {
        this.getCouponsList();
    },
    showMore: function() {
        this.data.showMoreItem ? this.setData({
            couponList: this.data.couponListAll.slice(0, 3),
            showMoreItem: !this.data.showMoreItem
        }) : this.setData({
            couponList: this.data.couponListAll,
            showMoreItem: !this.data.showMoreItem
        });
    },
    getCouponsList: function() {
        var n = this;
        t.reqGet(o.projectUrl + "/product/coupons/miniProgram/myCoupons?smallOpenId=" + wx.getStorageSync("user").openId + "&pageNumber=1&pageSize=100").then(function(o) {
            console.log(o);
            var t = !0, e = !1, a = void 0;
            try {
                for (var s, i = o.data.rows[Symbol.iterator](); !(t = (s = i.next()).done); t = !0) {
                    var u = s.value;
                    3 == u.type ? u.amount = Math.round(1e3 * u.amount) / 100 + "折" : 4 == u.type ? u.amount = "体验券" : u.amount = u.amount + "元";
                }
            } catch (o) {
                o = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(o);
                e = !0, a = o;
            } finally {
                try {
                    !t && i.return && i.return();
                } finally {
                    if (e) throw a;
                }
            }
            n.setData({
                couponListAll: o.data.rows,
                couponList: o.data.rows.slice(0, 3),
                couponsId: o.data.rows[0].couponsId,
                showLoading: !1
            });
        });
    },
    checkCoupon: function(o) {
        this.setData({
            couponsId: o.currentTarget.dataset.coupon
        });
    },
    nextStep: function() {
        wx.navigateTo({
            url: "/pages/issuePush/issuePush?couponsId=" + this.data.couponsId
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "探索身边优惠",
            imageUrl: "https://imgs.52wxr.com/upload/image/201901/20190122/1548146339888061576.jpg",
            path: "/page/index/index"
        };
    }
});