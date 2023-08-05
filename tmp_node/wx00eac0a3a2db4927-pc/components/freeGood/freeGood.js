(0, function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create")).default)({
    properties: {
        goods: Array
    },
    data: {},
    ready: function() {},
    methods: {
        getGoodDetail: function(e) {
            wx.navigateTo({
                url: "/pages/freeGoodDetail/freeGoodDetail?goodsUuid=" + e.currentTarget.dataset.uuid
            });
        }
    }
});