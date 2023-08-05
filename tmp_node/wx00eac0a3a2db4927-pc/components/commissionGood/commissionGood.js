(0, function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create")).default)({
    properties: {
        goods: Array,
        isCharges: Boolean
    },
    data: {},
    ready: function() {},
    methods: {
        getGoodDetail: function(e) {
            wx.navigateTo({
                url: "/pages/goodDetail/goodDetail?goodsUuid=" + e.currentTarget.dataset.uuid
            });
        }
    }
});