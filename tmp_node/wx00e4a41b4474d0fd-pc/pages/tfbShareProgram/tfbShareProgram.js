function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function o(n, i) {
                try {
                    var s = t[n](i), r = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!s.done) return Promise.resolve(r).then(function(e) {
                    o("next", e);
                }, function(e) {
                    o("throw", e);
                });
                e(r);
            }
            return o("next");
        });
    };
}

var a, o = e(require("../../lib/runtime")), n = e(require("../../lib/requestConfig")), i = e(require("../../utils/monitor.js")), s = require("../../utils/util.js"), r = getApp(), u = require("../../config.js"), g = require("../../getlogininfo.js"), c = (g.authorizeInfo, 
g.getUserInfo, "");

Page({
    data: {
        serverUrl: "http://skyforest.static.elab-plus.com/wepy_pro/",
        list: [],
        note: "",
        showInfoModel: !1,
        showImgModel: !1,
        showPhoneModel: !1,
        reloadModel: !1,
        showImgBtn: !1,
        shareImg: "",
        phoneFailFun: null,
        loadComplete: !1,
        defaultImagePath: "../../image/wepy_pro/loading3.gif",
        phoneFun: null
    },
    load: function() {
        this.setData({
            loadComplete: !0
        });
    },
    reload: function() {
        this.loadImg(), this.setData({
            reloadModel: !1
        });
    },
    onShow: function(e) {
        i.default.pageShow();
        var t = this;
        a = new Date().getTime();
        var o = {
            type: "PV",
            pvId: "P_2cMINA_18",
            pvCurPageName: "baocunzhaopiananniu",
            pvCurPageParams: c,
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - a
        };
        s.trackRequest(o, r), wx.getSetting({
            success: function(e) {
                console.log("***rtcroomCom.onLoad***getSetting", e, !1 === e.authSetting["scope.writePhotosAlbum"]), 
                !1 === e.authSetting["scope.writePhotosAlbum"] && (t.setData({
                    showImgBtn: !0
                }), console.log(t.data.showImgBtn));
            }
        }), wx.hideShareMenu();
    },
    onUnload: function() {},
    onHide: function() {},
    loadImg: function() {
        var e = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] && !r.globalData.userInfo ? wx.getUserInfo({
                    success: function(t) {
                        t.userInfo && (r.globalData.userInfo = t.userInfo, console.log("已获取user信息", t), 
                        e.startLoad());
                    },
                    fail: function(t) {
                        e.startLoad();
                    }
                }) : e.startLoad();
            }
        });
    },
    startLoad: function() {
        var e = this;
        setTimeout(function() {
            e.createImages();
        }, 200);
    },
    createImages: function() {
        var e = this;
        return t(o.default.mark(function t() {
            var a, i;
            return o.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a = {
                        appId: r.globalData.appid,
                        houseId: u.houseId,
                        path: "/pages/webView/webView",
                        secret: r.globalData.secret,
                        xcxName: r.globalData.projectName,
                        scene: r.globalData.shareToken,
                        defaultImage: decodeURIComponent(e.data.tbfShareCoverImg) || ""
                    }, t.next = 3, (0, n.default)("createImages", a, !0);

                  case 3:
                    i = t.sent, e.myLoading && e.myLoading.hideLoading(), i && i.success ? i.single && (wx.setStorageSync("tfbshareProgram", i.single), 
                    e.setData({
                        shareImg: i.single
                    })) : e.setData({
                        reloadModel: !0
                    });

                  case 6:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    cancel: function() {
        this.setData({
            reloadModel: !1
        });
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: "我要分享"
        });
    },
    getCurrentPageParam: function() {
        return c;
    },
    onLoad: function(e) {
        c = JSON.stringify(e), this.myLoading = this.selectComponent("#myLoading");
        var t = e.tbfShareCoverImg;
        this.data.tbfShareCoverImg = t, this.loadImg();
    },
    getShareProgram: function() {
        this.setData({
            showImgModel: !1,
            showImgBtn: !1
        });
    },
    save: function() {
        var e = this, t = {
            clkId: "clk_2cmina_56",
            clkDesPage: "",
            clkName: "baocunzhaopianye",
            type: "CLK",
            pvCurPageName: "baocunzhaopiananniu",
            pvCurPageParams: ""
        };
        s.trackRequest(t, r), this.data.shareImg && (wx.getStorageSync("tfbshareProgram") ? wx.getSetting({
            success: function(t) {
                console.log("***rtcroomCom.onLoad***getSetting", t), t.authSetting["scope.writePhotosAlbum"] ? (e.myLoading && e.myLoading.showLoading("正在保存..."), 
                wx.getImageInfo({
                    src: e.data.shareImg,
                    success: function(t) {
                        var a = t.path;
                        wx.saveImageToPhotosAlbum({
                            filePath: a,
                            success: function(t) {
                                e.myLoading && e.myLoading.hideLoading(), wx.showToast({
                                    title: "保存成功！",
                                    icon: "success",
                                    duration: 1500
                                });
                            },
                            fail: function(t) {
                                e.myLoading && e.myLoading.hideLoading();
                            }
                        });
                    }
                })) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        e.myLoading && e.myLoading.showLoading("正在保存..."), wx.getImageInfo({
                            src: e.data.shareImg,
                            success: function(t) {
                                var a = t.path;
                                wx.saveImageToPhotosAlbum({
                                    filePath: a,
                                    success: function(t) {
                                        e.myLoading && e.myLoading.hideLoading(), wx.showToast({
                                            title: "保存成功！",
                                            icon: "success",
                                            duration: 1500
                                        });
                                    },
                                    fail: function(t) {
                                        e.myLoading && e.myLoading.hideLoading();
                                    }
                                });
                            }
                        });
                    },
                    fail: function(t) {
                        e.myLoading && e.myLoading.hideLoading(), e.setData({
                            showImgBtn: !0
                        });
                    }
                });
            }
        }) : wx.showToast({
            title: "生成图片中，请稍等片刻",
            icon: "none",
            duration: 1500
        }));
    }
}, i.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));