var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create"));

getApp();

(0, e.default)({
    properties: {
        isShow: Boolean
    },
    data: {},
    methods: {
        onDeliveryClose: function(e) {
            this.setData({
                isShow: !1
            });
        }
    }
});