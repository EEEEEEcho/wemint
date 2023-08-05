function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../../store")), a = e(require("../../../../utils/create")), r = require("../../../../api/apiInstance"), s = getApp();

(0, a.default)(t.default, {
    properties: {},
    data: {
        cartPage: "物流消息",
        navH: s.globalData.navH,
        status: s.globalData.status,
        logistics: {},
        imageUrl: ""
    },
    onLoad: function(e) {
        var t = decodeURIComponent(e.imageUrl);
        this.setData({
            imageUrl: t
        }), this.getOrderLogistics(e.orderUuid);
    },
    getOrderLogistics: function(e) {
        var t = this, a = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: e
        };
        (0, r.getOrderLogistics)(a, function(e) {
            1 === e.errcode && t.setData({
                logistics: e.data.logistics
            });
        });
    },
    callPhone: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone
        });
    }
});