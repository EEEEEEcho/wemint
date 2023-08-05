(0, function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create")).default)({
    pure: !0,
    data: {
        dataList: [ "首页", "商品" ],
        selectedIndex: 0
    },
    methods: {
        onItemClick: function(e) {
            var t = e.currentTarget.dataset.index;
            this.setData({
                selectedIndex: t
            }), this.triggerEvent("onItemClick", {
                itemIndex: t
            });
        }
    }
});