var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../utils/monitor.js")), o = (require("../../utils/util.js"), require("../../config.js"), 
getApp()), n = "";

Page({
    data: {
        type: "0"
    },
    getCurrentPageParam: function() {
        return n;
    },
    onLoad: function(a) {
        n = JSON.stringify(a), console.log("***shareCard***", a, o.globalData.shareCardData);
        var e = "";
        if (a && a.param && a.param.length > 0 && (e = o.globalData.shareCardData), o.globalData.shareCardData && (e = o.globalData.shareCardData), 
        "tfb" == a.flag && ((e = JSON.parse(e)).imgUrl = decodeURIComponent(a.tbfShareCoverImg) || o.globalData.shareCardImage, 
        e = JSON.stringify(e)), e && 0 != e.length) {
            console.log("***shareCard3***");
            var t = this.selectComponent("#shareView"), r = JSON.parse(e);
            t.initShareCard(r);
        } else wx.showToast({
            title: "参数不全,无法生成分享卡片",
            icon: "warn",
            duration: 1500
        }), wx.navigateBack({
            changed: !0
        });
    },
    onShow: function(o) {
        a.default.pageShow(), console.log("***shareCard.js-onShow***");
    },
    onUnload: function() {
        console.log("***shareCard.js-onUnload***");
    },
    onReady: function() {},
    onHide: function() {}
}, a.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(a) {},
    onHide: function() {},
    onUnload: function() {}
}));