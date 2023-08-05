Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.jumpToWeb = function(e, o) {
    var a = "", s = [], i = "";
    return "website" == e ? a = "sm://download" == o ? "isShowContactService" : "/pages/webViewPage/webViewPage?loadUrl=" + encodeURIComponent(o) : "shopBanner" == e ? a = "/pages/webViewPage/webViewPage?loadUrl=" + encodeURIComponent(o) : -1 != e.indexOf("=") ? (i = (s = e.split("="))[1], 
    "shop_uuid" == s[0] ? a = "/pages/shop/shop?shopUuid=" + i : "goods_uuid" == s[0] && (a = "/pages/goodDetail/goodDetail?goodsUuid=" + i)) : a = "/pages/webViewPage/webViewPage?loadUrl=" + encodeURIComponent(o), 
    a;
};