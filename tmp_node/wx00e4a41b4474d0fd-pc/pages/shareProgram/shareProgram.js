function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    return function() {
        var a = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function o(n, s) {
                try {
                    var i = a[n](s), r = i.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!i.done) return Promise.resolve(r).then(function(e) {
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

var t, o = e(require("../../lib/runtime")), n = e(require("../../lib/requestConfig")), s = e(require("../../utils/monitor.js")), i = require("../../utils/util.js"), r = getApp(), g = require("../../config.js"), l = require("../../getlogininfo.js"), u = (l.authorizeInfo, 
l.getUserInfo, "");

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
        swipIndex: 0,
        screenWidth: 0,
        winHeight: 0,
        shareImg: [],
        phoneFailFun: null,
        loadComplete: !1,
        defaultImagePath: "../../image/wepy_pro/loading3.gif",
        phoneFun: null,
        paddingTop: 0
    },
    load: function(e) {
        console.log("***e***", e), this.data.shareImg[e.currentTarget.dataset.index || 0].loadComplete = !0, 
        this.setData({
            shareImg: this.data.shareImg
        }), console.log(this.data.shareImg);
    },
    reload: function() {
        this.loadImg(), this.setData({
            reloadModel: !1
        });
    },
    onShow: function(e) {
        s.default.pageShow();
        var a = this;
        t = new Date().getTime();
        var o = {
            type: "PV",
            pvId: "P_2cMINA_18",
            pvCurPageName: "baocunzhaopianye",
            pvCurPageParams: "fengxiangkapian",
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - t
        };
        i.trackRequest(o, r), wx.getSetting({
            success: function(e) {
                console.log("***rtcroomCom.onLoad***getSetting", e, !1 === e.authSetting["scope.writePhotosAlbum"]), 
                !1 === e.authSetting["scope.writePhotosAlbum"] && (a.setData({
                    showImgBtn: !0
                }), console.log(a.data.showImgBtn));
            }
        }), wx.getSystemInfo({
            success: function(e) {
                a.setData({
                    screenWidth: e.screenWidth,
                    winHeight: e.windowHeight
                });
                var t = 2 * a.data.winHeight - 220 - 1020 > 0 ? (2 * a.data.winHeight - 220 - 1020) / 2 : 0;
                console.log(t, a.data.winHeight, "33333333333333333333333333"), a.setData({
                    paddingTop: t
                });
            }
        }), wx.hideShareMenu && wx.hideShareMenu();
    },
    onUnload: function() {},
    onHide: function() {},
    swipChage: function(e) {
        console.log(e, this.data.swipIndex), this.setData({
            swipIndex: e.detail.current
        });
    },
    loadImg: function() {
        var e = this;
        wx.getSetting({
            success: function(a) {
                0 != a.authSetting["scope.userInfo"] ? a.authSetting["scope.userInfo"] && !r.globalData.single.headPortrait ? wx.getUserInfo({
                    success: function(a) {
                        a.userInfo && (r.globalData.userInfo = a.userInfo, console.log("已获取user信息", a), 
                        e.startLoad());
                    },
                    fail: function(a) {
                        console.log("获取user信息失败", a), e.startLoadForNoInfo();
                    }
                }) : (console.log("直接获取user信息", r.globalData.userInfo), e.startLoad()) : e.startLoadForNoInfo();
            }
        });
    },
    startLoadForNoInfo: function() {
        var e = this;
        setTimeout(function() {
            e.createImages(1);
        }, 200);
    },
    createImages: function(e) {
        var t = this;
        return a(o.default.mark(function a() {
            var s, i, l, u, c;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return s = {
                        customerId: r.globalData.single.id,
                        houseId: g.houseId,
                        userRole: 0,
                        mobile: r.globalData.phone,
                        attrs: JSON.stringify({
                            shareType: "qrcode",
                            subtype: "project"
                        })
                    }, a.next = 3, (0, n.default)("sign", s, !0);

                  case 3:
                    return i = a.sent, l = {
                        appId: r.globalData.appid,
                        houseId: g.houseId,
                        path: "/pages/index/index",
                        secret: r.globalData.secret,
                        xcxName: r.globalData.projectName,
                        scene: i && i.single || r.globalData.shareToken
                    }, 2 == e && (l.name = r.globalData.userInfo ? r.globalData.userInfo.nickName : r.globalData.single ? r.globalData.single.nickname || "" : "", 
                    l.head = r.globalData.userInfo ? r.globalData.userInfo.avatarUrl : r.globalData.single ? r.globalData.single.headPortrait || "" : ""), 
                    a.next = 8, (0, n.default)("createImages", l, !0);

                  case 8:
                    u = a.sent, t.myLoading && t.myLoading.hideLoading(), u && u.success ? u.single && ((c = t.data.shareImg).push({
                        src: u.single,
                        loadComplete: !1
                    }), t.setData({
                        shareImg: c
                    }), (r.globalData.userInfo && r.globalData.userInfo.nickName || r.globalData.single && r.globalData.single.nickname) && 2 == e ? (wx.setStorageSync("shareProgram", c), 
                    t.startLoadForNoInfo()) : wx.setStorageSync("shareProgram", c)) : 1 == e ? t.data.shareImg && t.data.shareImg.length > 0 ? t.startLoadForNoInfo() : t.setData({
                        reloadModel: !0
                    }) : 2 == e && t.setData({
                        reloadModel: !0
                    });

                  case 11:
                  case "end":
                    return a.stop();
                }
            }, a, t);
        }))();
    },
    startLoad: function() {
        var e = this;
        setTimeout(function() {
            e.createImages(2);
        }, 200);
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
        return u;
    },
    onLoad: function(e) {
        u = JSON.stringify(e), this.myLoading = this.selectComponent("#myLoading"), this.loadImg();
    },
    getShareProgram: function() {
        console.log("***getShareProgram***"), this.setData({
            showImgModel: !1,
            showImgBtn: !1
        });
    },
    save: function() {
        var e = this, a = {
            clkId: "clk_2cmina_56",
            clkDesPage: "",
            clkName: "baocunzhaopiananniu",
            type: "CLK",
            pvCurPageName: "baocunzhaopianye",
            pvCurPageParams: "fengxiangkapian"
        };
        i.trackRequest(a, r), this.data.shareImg && (wx.getStorageSync("shareProgram") ? wx.getSetting({
            success: function(a) {
                console.log("***rtcroomCom.onLoad***getSetting", a), a.authSetting["scope.writePhotosAlbum"] ? (e.myLoading && e.myLoading.showLoading("正在保存..."), 
                wx.getImageInfo({
                    src: e.data.shareImg[e.data.swipIndex].src,
                    success: function(a) {
                        var t = a.path;
                        wx.saveImageToPhotosAlbum({
                            filePath: t,
                            success: function(a) {
                                e.myLoading && e.myLoading.hideLoading(), wx.showToast({
                                    title: "保存成功！",
                                    icon: "success",
                                    duration: 1500
                                });
                            },
                            fail: function(a) {
                                e.myLoading && e.myLoading.hideLoading();
                            }
                        });
                    }
                })) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        e.myLoading && e.myLoading.showLoading("正在保存..."), wx.getImageInfo({
                            src: e.data.shareImg[e.data.swipIndex].src,
                            success: function(a) {
                                var t = a.path;
                                wx.saveImageToPhotosAlbum({
                                    filePath: t,
                                    success: function(a) {
                                        e.myLoading && e.myLoading.hideLoading(), wx.showToast({
                                            title: "保存成功！",
                                            icon: "success",
                                            duration: 1500
                                        });
                                    },
                                    fail: function(a) {
                                        e.myLoading && e.myLoading.hideLoading();
                                    }
                                });
                            }
                        });
                    },
                    fail: function(a) {
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
}, s.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));