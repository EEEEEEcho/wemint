function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../../store")), e = a(require("../../../utils/create")), r = require("../../../utils/canvasUtil"), d = require("../../../api/apiInstance"), i = getApp();

(0, e.default)(t.default, {
    data: {
        cartPage: "折扣卡",
        navH: i.globalData.navH,
        status: i.globalData.status,
        cardDetail: {},
        cardUuid: ""
    },
    onLoad: function(a) {
        this.data.cardUuid = a.cardUuid;
    },
    onReady: function() {
        this.getCardInfo();
    },
    getCardInfo: function() {
        var a = this, t = {
            cardUuid: this.data.cardUuid,
            accesstoken: this.store.data.userInfo.accesstoken
        };
        (0, d.getCardInfo)(t, function(t) {
            1 === t.errcode && (a.setData({
                cardDetail: t.data
            }), setTimeout(function() {
                (0, r.createQrCode)(t.data.code, "qrCode", 360, 360);
            }, 500));
        });
    }
});