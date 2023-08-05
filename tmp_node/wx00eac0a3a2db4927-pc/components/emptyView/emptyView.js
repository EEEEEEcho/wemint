var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create"));

getApp();

(0, t.default)({
    properties: {
        isShow: Boolean,
        textContent: String,
        iconPath: String
    },
    data: {
        defaultPath: "http://oss.shangmian.xin/weixin_applets_icon_empty_view.png"
    },
    methods: {}
});