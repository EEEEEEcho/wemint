var e, a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/monitor.js")), t = require("../../utils/util.js"), r = require("../../config.js"), n = getApp(), o = "";

Page({
    data: {
        serverUrl: "https://dm.static.elab-plus.com/jmf/",
        color1: r.color1,
        color2: r.color2,
        color3: r.color3,
        color4: r.color4,
        despage: "fuxikaiji"
    },
    scrollMsg: function() {},
    onUnload: function() {},
    onHide: function() {},
    onShareAppMessage: function(e) {
        var a = {
            clkId: "clk_2cmina_18",
            type: "CLK",
            clkName: "woyaofenxiang",
            pvCurPageName: this.data.despage || "",
            pvCurPageParams: o
        };
        return t.trackRequest(a, n), {
            title: r.projectName,
            path: "/pages/fxkj/fxkj?shareToken=" + n.globalData.shareToken
        };
    },
    goJump: function(a) {
        if (console.log(a.currentTarget.dataset), a.currentTarget.dataset.jump) {
            var r = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - e) / 1e3,
                expand: "",
                clkDesPage: a.currentTarget.dataset.despage || "",
                clkName: a.currentTarget.dataset.despage || "",
                pvCurPageName: a.currentTarget.dataset.pageName || "",
                pvCurPageParams: o,
                clkId: a.currentTarget.dataset.clkid,
                clkParams: {
                    linkParam: "view=" + encodeURIComponent(a.currentTarget.dataset.jump) + "&title=" + a.currentTarget.dataset.title,
                    imageCode: "",
                    jumpUrl: a.currentTarget.dataset.jump || ""
                }
            };
            t.trackRequest(r, n), n.globalData.currDespage = a.currentTarget.dataset.despage || "", 
            wx.navigateTo({
                url: "../bearVideo/bearVideo?source=" + a.currentTarget.dataset.jump + "&title=" + a.currentTarget.dataset.title,
                success: function() {},
                fail: function(e) {
                    console.log(e);
                }
            });
        }
    },
    onReady: function() {
        this.myLoading && this.myLoading.hideLoading();
    },
    onLoad: function(e) {
        this.myLoading = this.selectComponent("#myLoading"), this.myLoading && this.myLoading.showLoading(), 
        o = JSON.stringify(e);
    },
    onShow: function(r) {
        a.default.pageShow(), wx.setNavigationBarTitle({
            title: "府系科技，成就传奇"
        }), e = new Date().getTime(), n.login(function() {
            var a = {
                ip: n.globalData.ip,
                type: "PV",
                pvId: "P_2cMINA_17",
                pvCurPageName: "fuxikaiji",
                pvCurPageParams: o,
                pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
                pvLastPageParams: "",
                pvPageLoadTime: new Date().getTime() - e
            };
            console.log(a, "埋点"), t.trackRequest(a, n);
        });
    }
}, a.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));