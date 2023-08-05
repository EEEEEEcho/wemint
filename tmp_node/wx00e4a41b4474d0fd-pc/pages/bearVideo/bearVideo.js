var o = function(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}(require("../../utils/monitor.js")), t = (require("../../utils/util.js"), require("../../config.js"), 
getApp(), "");

Page({
    data: {
        source: "",
        videoContext: null,
        appFlag: !1,
        queit: !1,
        showInfoModel: !1,
        title: "",
        momentId: "",
        videoFlag: !0,
        windowHeight: 0,
        currentFlag: 0,
        id: ""
    },
    onLoad: function(o) {
        t = JSON.stringify(o);
        var e = this;
        console.log("***Video onLoad***", o, "bearvideo-啦啦啦", o.source), this.setData({
            source: o.source,
            title: o.title
        }), wx.getSystemInfo({
            success: function(o) {
                "ios" == o.platform && e.setData({
                    currentFlag: -1,
                    appFlag: !0
                }), e.setData({
                    windowHeight: o.windowWidth
                }), console.log("可视区宽度", o.windowWidth), console.log("可视区高度", o.windowHeight);
            }
        });
    },
    getCurrentPageParam: function() {
        return t;
    },
    onShow: function(t) {
        o.default.pageShow(), console.log("***video.js-onShow***"), this.videoContext = wx.createVideoContext("myVideo"), 
        wx.hideShareMenu();
    },
    onUnload: function() {
        console.log("***video.js-onUnload***");
    },
    goback: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    play: function(o) {},
    queitFull: function(o) {
        o.detail.fullScreen ? (this.setData({
            queit: !1
        }), console.log("进入全屏", this.data.queit)) : (this.setData({
            queit: !0
        }), console.log("退出全屏", this.data.queit));
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.title
        });
    },
    onHide: function() {}
}, o.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(o) {},
    onHide: function() {},
    onUnload: function() {}
}));