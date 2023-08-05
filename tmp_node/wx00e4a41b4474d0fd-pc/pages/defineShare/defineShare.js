function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

a(require("../../lib/runtime")), a(require("../../lib/requestConfig"));

var e, t = a(require("../../utils/monitor.js")), n = require("../../utils/util.js"), i = require("../../config.js"), o = getApp(), r = "";

Page({
    data: {
        despage: "dingyifenxiangkapianye",
        bottomText: ""
    },
    onShow: function(a) {
        t.default.pageShow(), e = new Date().getTime();
        var i = {
            type: "PV",
            pvId: "p_2cmina_48",
            pvCurPageName: "dingyifenxiangkapianye",
            pvCurPageParams: r,
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - e
        };
        console.log(i, "埋点"), n.trackRequest(i, o);
    },
    onUnload: function() {},
    onHide: function() {},
    goLocal: function() {
        var a = this;
        o.createXcxQrCode({
            signData: {},
            subtype: "diy"
        }, function(e) {
            if (e) {
                var t = {
                    type: "clk",
                    pvCurPageName: "dingyifenxiangkapianye",
                    clkDesPage: "",
                    clkName: "bendishangchuanzhaopian",
                    clkId: "clk_2cmina_146",
                    expand: JSON.stringify(e) + ";houseId=" + i.houseId
                };
                n.trackRequest(t), !a.data.bottomText && o.globalData.EnumList && o.globalData.EnumList.forEach(function(e, t) {
                    "activity_card" == e.name && (a.data.bottomText = e.value);
                });
                var g = {
                    type: 1,
                    bottomTitle: "",
                    bottomText: a.data.bottomText || "扫描二维码，立即进入线上售楼处",
                    imgUrl: "",
                    qcode: e,
                    pvId: "p_2cmina_49",
                    pvCurPageName: "dingyifenxiangkapianxiaoguoye",
                    pvCurPageParams: r
                };
                o.globalData.shareCardData = JSON.stringify(g), wx.navigateTo({
                    url: "../shareCard/shareCard"
                });
            }
        }, function(a) {
            console.log("生成小程序二维码失败", a);
        }, "/pages/index/index");
    },
    onReady: function() {
        wx.setNavigationBarTitle && wx.setNavigationBarTitle({
            title: "定义分享卡片"
        });
    },
    getCurrentPageParam: function() {
        return r;
    },
    onLoad: function(a) {
        r = JSON.stringify(a);
    }
}, t.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(a) {},
    onHide: function() {},
    onUnload: function() {}
}));