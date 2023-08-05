function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var o = t(require("../../../store")), a = t(require("../../../utils/create")), e = require("../../../api/apiInstance"), n = getApp();

(0, a.default)(o.default, {
    data: {
        cartPage: "优惠劵",
        navH: n.globalData.navH,
        status: n.globalData.status,
        couponDetail: {}
    },
    onLoad: function(t) {
        this.getCouponInfo(t.couponUuid);
    },
    onShow: function() {},
    getCouponInfo: function(t) {
        var o = this, a = {
            couponUuid: t,
            accesstoken: this.store.data.userInfo.accesstoken
        };
        (0, e.getCouponInfo)(a, function(t) {
            1 === t.errcode && o.setData({
                couponDetail: t.data
            });
        });
    }
});