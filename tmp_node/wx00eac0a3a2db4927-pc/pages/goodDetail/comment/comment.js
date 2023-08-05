function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../store")), a = t(require("../../../utils/create")), r = require("../../../api/apiInstance.js"), u = getApp();

(0, a.default)(e.default, {
    properties: {},
    data: {
        cartPage: "评价",
        navH: u.globalData.navH,
        status: u.globalData.status,
        dataList: []
    },
    onLoad: function(t) {
        this.getCommentQuery(t.goodsUuid);
    },
    getCommentQuery: function(t) {
        var e = this, a = {
            type: 2,
            goodsUuid: t
        };
        (0, r.getCommentQuery)(a, function(t) {
            1 === t.errcode && e.setData({
                dataList: t.data
            });
        });
    },
    previewImg: function(t) {
        var e = t.currentTarget.dataset.images, a = t.currentTarget.dataset.index;
        wx.previewImage({
            current: a,
            urls: e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    }
});