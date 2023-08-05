var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/monitor.js")), a = require("../../utils/util.js"), t = getApp(), o = require("../../config.js"), n = require("../../getlogininfo.js"), i = (n.authorizeInfo, 
n.getUserInfo, null);

Page({
    data: {
        view: "",
        encodeView: "",
        loginid: "",
        linkUrl: "",
        despage: "webview",
        despageForChat: "webview",
        title: "",
        isMomentPage: !1,
        imgUrl: ""
    },
    onShareAppMessage: function(e) {
        var o = {
            clkId: "clk_2cmina_18",
            clkDesPage: "",
            clkName: "woyaofenxiang",
            type: "CLK",
            pvCurPageName: t.globalData.currDespage || "",
            pvCurPageParams: i
        };
        return a.trackRequest(o, t), {
            imageUrl: t.globalData.shareImage || "",
            title: this.data.title || t.globalData.projectName,
            path: "/pages/webView/webView?shareToken=" + t.globalData.shareToken + "&view=" + this.data.encodeView + "&title=" + this.data.title
        };
    },
    getCurrentPageParam: function() {
        return i;
    },
    onLoad: function(e) {
        var n = this;
        this.myLoading = this.selectComponent("#myLoading"), this.myLoading && this.myLoading.showLoading(), 
        i = JSON.stringify(e), console.log("pvCurPageParams:" + i), e.title && (this.data.title = e.title || t.globalData.projectName);
        var l = "";
        if (e.momentId && this.setData({
            isMoment: e.momentId
        }), e.q) {
            var r = decodeURIComponent(e.q), s = r.substring(r.lastIndexOf("/") + 1, r.length);
            l = s.startsWith("N") || s.startsWith("n") ? o.newTemplateUrl + s.replace("N", "") : o.templateUrl + s, 
            console.log("======options.q******", e.q, r, l);
        } else l = decodeURIComponent(e.view), console.log(l, e.view, "转发的url");
        -1 == l.indexOf("https") && (l = l.replace("http", "https")), l = l.includes("?fromProduce=xcx") ? l : l.includes("?") ? l.replace("?", "?fromProduce=xcx&") : l + "?fromProduce=xcx", 
        t.decrypt(e, function() {
            t.login(function() {
                var i = t.globalData.single && t.globalData.single.id ? t.globalData.single.id : "", r = wx.getStorageSync("sessionNumber") || 1;
                r = i + "_" + r;
                var s = 1 == getCurrentPages().length ? 1 : "";
                l.toLowerCase().includes("/toufangbao/") ? n.data.view = l + "&leavePhoneCustomerId=" + (i || wx.getStorageSync("xnid") || "") + "&shareParam=" + t.globalData.fromChannel + "&adviserId=" + (t.globalData.adviserId || "") + "&session=" + r + "&openid=" + t.globalData.openid : "undefined" == l.split("?")[0] ? (l = t.globalData.tfbGetUrl && t.globalData.tfbGetUrl.replace(/https?/, "https"), 
                n.data.view = l + "&leavePhoneCustomerId=" + (i || wx.getStorageSync("xnid") || "") + "&shareParam=" + t.globalData.fromChannel + "&adviserId=" + (t.globalData.adviserId || "") + "&session=" + r + "&openid=" + t.globalData.openid) : (n.data.view = l + "&leavePhoneCustomerId=" + (i || wx.getStorageSync("xnid") || "") + "&shareParam=" + t.globalData.fromChannel + "&session=" + r + "&openid=" + t.globalData.openid, 
                console.log("***WebView Data***", n.data, e.shareToken, "***", t.globalData.shareToken)), 
                n.setData({
                    view: n.data.view + "&launchFromCurrentPage=" + s + "&hasphone=" + (t.globalData.phone || t.globalData.tmpPhone_tfb || !o.imPhoneAuthorize ? "1" : 0) + "&windowWidth=" + (t.systemInfo && t.systemInfo.windowWidth || ""),
                    encodeView: e.view || encodeURIComponent(l) || "",
                    linkUrl: e.linkUrl || "",
                    imgUrl: e.imgUrl || "",
                    loginid: e.shareToken || t.globalData.shareToken || ""
                }), t.globalData.tfbSetUrl = n.data.encodeView || "", n.data.view.toLowerCase().indexOf("/toufangbao/") > -1 && (t.globalData.phone || t.globalData.tmpPhone_tfb || !o.imPhoneAuthorize) && n.initShare();
                var g = {
                    type: "PV",
                    pvId: "p_2cmina_79",
                    pvCurPageName: "webview",
                    pvCurPageParams: {
                        url: n.data.view
                    },
                    pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : ""
                };
                a.trackRequest(g, t);
            });
        });
    },
    initShare: function() {
        t.createXcxQrCode({
            tfbUrl: decodeURIComponent(t.globalData.tfbSetUrl),
            subtype: "tfb"
        }, function(e) {
            if (e) {
                var a = "";
                t.globalData.EnumList && t.globalData.EnumList.forEach(function(e, t) {
                    "tfb_card" == e.name && (a = e.value);
                });
                var o = {
                    type: 4,
                    qcode: e,
                    bottomText: a || "扫描二维码，立即进入线上售楼处",
                    pvCurPageName: "toufangbaofenxiangkapian",
                    pvId: "p_2cmina_58",
                    pvCurPageParams: i
                };
                t.globalData.shareCardData = JSON.stringify(o);
            }
        }, function(e) {
            console.log("生成小程序二维码失败", e);
        }, "/pages/webView/webView");
    },
    onReady: function() {
        this.myLoading && this.myLoading.hideLoading(), this.setData({
            despage: t.globalData.currDespage
        }), wx.setNavigationBarTitle({
            title: this.data.title
        });
    },
    onShow: function() {
        t.globalData.tmpPhone_tfb && this.data.view.indexOf("hasphone=0") && (this.setData({
            view: this.data.view.replace("hasphone=0", "hasphone=1")
        }), this.initShare()), e.default.pageShow(), wx.setStorageSync("loadTime", new Date().getTime()), 
        t.login(function() {
            console.log("***webview-onshow-app.login***");
        });
    },
    onHide: function() {
        t.globalData.currDespage = null;
    },
    onUnload: function() {
        console.log(this.data.isMoment, "webview-onUnload-ppppp");
        var e = {
            pvPageStayTime: (new Date().getTime() - wx.getStorageSync("loadTime")) / 1e3,
            pvCurPageName: this.data.despage || "",
            clkDesPage: "zhuye",
            clkName: "fanhui",
            clkId: "clk_2cmina_36",
            clkParams: {
                viewUrl: this.data.view || ""
            },
            type: "CLK"
        };
        a.trackRequest(e, t);
    }
}, e.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));