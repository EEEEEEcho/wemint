var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create")), r = require("../../utils/jumpTo.js");

(0, e.default)({
    pure: !0,
    properties: {
        images: Array,
        shopBeauty: Array
    },
    data: {
        current: 0
    },
    methods: {
        changeSwiper: function(e) {
            if ("" != this.data.images) {
                var r = e.detail.current;
                this.setData({
                    current: r
                });
            }
        },
        jumpToPage: function(e) {
            var t = e.currentTarget.dataset.url, a = (0, r.jumpToWeb)("shopBanner", t);
            "" != a && wx.navigateTo({
                url: a
            });
        }
    }
});