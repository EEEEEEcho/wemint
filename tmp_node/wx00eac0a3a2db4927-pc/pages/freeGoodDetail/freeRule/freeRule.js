function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../store")), a = e(require("../../../utils/create")), n = require("../../../api/apiInstance.js"), i = getApp();

(0, a.default)(t.default, {
    properties: {},
    data: {
        cartPage: "免单规则",
        navH: i.globalData.navH,
        status: i.globalData.status,
        isIphoneX: i.globalData.isIphoneX,
        exemptionRule: ""
    },
    onLoad: function(e) {
        this.getExemptionQuery();
    },
    getExemptionQuery: function() {
        var e = this, t = {
            accesstoken: ""
        };
        (0, n.getExemptionQuery)(t, function(t) {
            1 === t.errcode && e.setData({
                exemptionRule: t.data
            });
        });
    }
});