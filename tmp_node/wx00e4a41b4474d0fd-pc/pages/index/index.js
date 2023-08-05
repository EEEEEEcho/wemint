function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    return function() {
        var a = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function o(n, r) {
                try {
                    var i = a[n](r), s = i.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!i.done) return Promise.resolve(s).then(function(e) {
                    o("next", e);
                }, function(e) {
                    o("throw", e);
                });
                e(s);
            }
            return o("next");
        });
    };
}

var t = e(require("../../lib/runtime")), o = e(require("../../lib/requestConfig")), n = e(require("../../utils/monitor.js")), r = require("../../utils/util.js"), i = require("../../config.js"), s = getApp(), g = null, u = void 0, l = require("../../getlogininfo.js");

l.authorizeInfo, l.getUserInfo;

Page({
    data: {
        currentPageParams: "",
        currentData: {},
        despageForChat: "zhuye",
        despage: "zhuye",
        showHelloText: !1,
        isSend: !1,
        showPhoneAuth: !1,
        showAgree: !1,
        indexLiudian: !1,
        showAuth: !0,
        appid: "",
        name: "",
        deviceInfor: null,
        showLiudian: !0,
        userInfo: {},
        verifyText: "",
        verifyCode: "",
        tel: "",
        defaultImagePath: "../../image/wepy_pro/loading.gif",
        tableList: [],
        screenHeight: 0,
        showPhoneModel: !1,
        showInfoModel: !1,
        unReadMsgNumber: 0,
        showSecondLoginToast: !1,
        navbar: {
            showCapsule: 0,
            title: "",
            titleColor: "#fff",
            navPadding: 1,
            navBarColor: "#272A34",
            navBackColor: "#000",
            haveCallback: !1,
            fromShare: !1,
            pageId: null,
            pageName: ""
        },
        pvCurPageName: "zhuye",
        navigateStatusContainerHeight: "0px"
    },
    onUnload: function() {
        console.log("关闭小程序-onUnload");
    },
    onHide: function() {
        console.log("隐藏首页小程序-onHide");
    },
    onShareAppMessage: function(e) {
        console.log("onShareAppMessage:" + JSON.stringify(e));
        var a = {
            type: "CLK",
            pvCurPageName: "zhuye",
            pvCurPageParams: g,
            clkId: "clk_2cmina_18",
            clkName: "woyaofenxiang",
            clkParams: {
                from: e.from
            }
        };
        return r.trackRequest(a, s), console.log("***onShareAppMessage***", JSON.stringify(e), s.globalData.projectName), 
        {
            imageUrl: s.globalData.shareImage || "",
            title: s.globalData.projectName || "",
            path: "/pages/index/index?shareToken=" + s.globalData.shareToken
        };
    },
    onLoad: function(e) {
        this.setData({
            navigateStatusContainerHeight: s.globalData.navigateStatusContainerHeight + "px"
        });
        var a = this;
        g = JSON.stringify(e), a.setData({
            currentPageParams: g
        }), console.log("***onLoad***", e, e.shareToken), s.decrypt(e), a.getPageData();
        var t = wx.getStorageSync("loginXcxNumber") || 0;
        1 * t < 1 ? wx.setStorageSync("loginXcxNumber", 1) : (wx.setStorageSync("loginXcxNumber", t + 1), 
        2 == wx.getStorageSync("loginXcxNumber") && this.setData({
            showSecondLoginToast: !0
        }));
    },
    getCurrentPageParam: function() {
        return g;
    },
    onReady: function() {},
    onShow: function(e) {
        n.default.pageShow(), u = new Date().getTime();
        var a = this;
        wx.showShareMenu && wx.showShareMenu(), s.login(function() {
            if (s.globalData.single && s.globalData.single.organize && !s.globalData.isShowHelloText) {
                s.globalData.isShowHelloText = !0, a.setData({
                    showHelloText: s.globalData.single.organize
                });
                var e = setTimeout(function() {
                    a.setData({
                        showHelloText: !1
                    }), clearTimeout(e);
                }, 3e3);
            }
            var t = {
                ip: s.globalData.ip,
                type: "PV",
                pvId: "P_2cMINA_1",
                pvCurPageName: "zhuye",
                pvCurPageParams: g,
                pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
                pvLastPageParams: "",
                pvPageLoadTime: new Date().getTime() - u
            };
            r.trackRequest(t, s);
        });
    },
    getPageData: function() {
        var e = this;
        return a(t.default.mark(function a() {
            var n, g, u, l;
            return t.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.next = 2, (0, o.default)("queryXcxPage", {
                        houseId: i.houseId
                    }, !0);

                  case 2:
                    n = a.sent, console.log("***首页内容数据***", n), n && n.success && n.single ? (g = n.single, 
                    u = JSON.parse(g.jsonString), s.globalData.backgroundSetting = u.backgroundSetting, 
                    console.log("===颜色数据===", u.backgroundSetting, e.data.goodSet), e.setData({
                        "navbar.title": n.single.title || ""
                    }), e.sortsAreaList(g.jsonString)) : (l = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "zhuye",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(n) + ";houseId=" + i.houseId
                    }, r.trackRequest(l));

                  case 5:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    sortsAreaList: function(e) {
        this.data.moduleViewCP = this.selectComponent("#moduleViewCP"), this.data.moduleViewCP && this.data.moduleViewCP.sortsAreaList(e);
        var a = JSON.parse(e);
        this.setData({
            currentData: a
        });
    },
    catchTouchMove: function() {
        return !1;
    },
    closeSecondTipBox: function() {
        this.setData({
            showSecondLoginToast: !1
        });
    }
}, n.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));