function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../store"));

(0, e(require("../../utils/create")).default)(t.default, {
    data: {
        loadUrl: "",
        isShowView: !0
    },
    onLoad: function(e) {
        this.setData({
            loadUrl: decodeURIComponent(e.loadUrl)
        });
    },
    onBindLoad: function(e) {}
});