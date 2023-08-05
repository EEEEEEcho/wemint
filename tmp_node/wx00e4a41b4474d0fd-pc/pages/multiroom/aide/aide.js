function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    return function() {
        var a = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function n(i, o) {
                try {
                    var r = a[i](o), s = r.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!r.done) return Promise.resolve(s).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(s);
            }
            return n("next");
        });
    };
}

var t = e(require("../../../lib/runtime")), n = e(require("../../../lib/requestConfig")), i = e(require("../../../utils/monitor.js")), o = getApp(), r = require("../../../utils/util.js"), s = (require("../../../utils/rtcroom.js"), 
require("../../../getlogininfo.js")), l = require("../../../config.js"), d = "", u = "";

Page({
    data: {
        adviserList: [],
        aideData: {},
        isSuc: null,
        showImgModel: !1,
        options: null,
        showBack: !1
    },
    go: function(e) {
        console.log(e.target.dataset), this.login(e.target.dataset.item.name), console.log(e.target.dataset.index, "uu");
    },
    login: function(e) {
        wx.showLoading && wx.showLoading({
            title: "登录信息获取中"
        });
        var a = this;
        s.getLoginInfo({
            type: "multi_room",
            opt: e,
            success: function() {
                if (o.globalData.identifier && "null" != o.globalData.identifier && "undefined" != o.globalData.identifier && o.globalData.userSig && "null" != o.globalData.userSig && "undefined" != o.globalData.userSig) {
                    console.log("success"), a.data.firstshow = !1, a.data.isGetLoginInfo = !0;
                    var e = o.globalData.userInfo.nickName || o.globalData.loginid || o.globalData.identifier;
                    console.log("我的昵称：", e), a.setData({
                        userName: e
                    }), wx.hideLoading && wx.hideLoading(), a.creatroom(e);
                } else {
                    a.data.isGetLoginInfo = !1, console.log("***登录信息不全&&&getlogininfo***", o.globalData.identifier, o.globalData.userSig), 
                    wx.hideLoading && wx.hideLoading(), wx.showModal({
                        title: "登录信息不全",
                        content: "必要信息为空",
                        showCancel: !1,
                        complete: function() {
                            var e = getCurrentPages();
                            e[e.length - 2] ? wx.navigateBack({}) : wx.redirectTo({
                                url: "../../index/index"
                            });
                        }
                    });
                    var t = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "aide-login-app-Error",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(o.globalData)
                    };
                    r.trackRequest(t, o);
                }
            },
            fail: function(e) {
                a.data.isGetLoginInfo = !1, console.log("***获取登录信息失败&&&getlogininfo***", e), wx.hideLoading && wx.hideLoading(), 
                wx.showModal({
                    title: "获取登录信息失败",
                    content: "网络错误",
                    showCancel: !1,
                    complete: function() {
                        wx.navigateBack({});
                    }
                });
                var t = {
                    type: "mini-program-Error",
                    pvPageStayTime: new Date().getTime() / 1e3,
                    adviserId: "",
                    imTalkId: "",
                    imTalkType: "",
                    pvCurPageName: "aide-login",
                    clkDesPage: "",
                    clkName: "",
                    clkId: "",
                    expand: e.errMsg
                };
                r.trackRequest(t, o);
            }
        });
    },
    creatroom: function(e) {
        var a = "../room/room?type=create&roomName=视频看房&userName=" + e + "&roomID=" + ("web_" + Date.now()) + "&isSuc=" + this.data.isSuc;
        wx.redirectTo({
            url: a
        }), wx.showToast({
            title: "进入房间",
            icon: "success",
            duration: 1e3
        });
    },
    onShow: function() {
        var e = this;
        i.default.pageShow(), u = new Date().getTime(), o.login(function() {
            var a = {
                ip: o.globalData.ip,
                type: "PV",
                pvId: "P_2cMINA_95",
                pvCurPageName: "shipinboda",
                pvCurPageParams: d,
                pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
                pvLastPageParams: "",
                pvPageLoadTime: new Date().getTime() - u
            };
            r.trackRequest(a, o), e.addVideoChatCount();
        });
    },
    next: function() {
        var e = this;
        console.log("------********", this.data.options), o.login(function() {
            e.data.isSuc = e.data.options.isSuc || "", e.dialVideo(e.data.options);
        });
    },
    getShareProgram: function(e) {
        this.setData({
            showImgModel: !1
        }), e.detail.authSetting["scope.camera"] && e.detail.authSetting["scope.record"] ? this.next() : e.detail.authSetting[this.data.authorizeType] ? this.mySet() : e.detail.authSetting[this.data.authorizeType] || wx.navigateBack({
            delta: 1
        });
    },
    mySet: function() {
        var e = this;
        wx.getSetting({
            success: function(a) {
                console.log("***aide.onLoad***getSetting", a), a.authSetting["scope.record"] ? a.authSetting["scope.camera"] ? (wx.hideLoading(), 
                e.next()) : wx.authorize({
                    scope: "scope.camera",
                    success: function() {
                        e.next();
                    },
                    fail: function() {
                        wx.hideLoading(), e.setData({
                            showImgModel: !0
                        }), e.data.authorizeType = "scope.camera";
                    }
                }) : wx.authorize({
                    scope: "scope.record",
                    success: function() {
                        a.authSetting["scope.camera"] ? (wx.hideLoading(), e.next()) : wx.authorize({
                            scope: "scope.camera",
                            success: function() {
                                e.next();
                            },
                            fail: function(a) {
                                wx.hideLoading(), e.setData({
                                    showImgModel: !0
                                }), e.data.authorizeType = "scope.camera";
                            }
                        });
                    },
                    fail: function() {
                        wx.hideLoading(), e.setData({
                            showImgModel: !0
                        }), e.data.authorizeType = "scope.record";
                    }
                });
            },
            fail: function() {
                wx.showToast({
                    title: "系統错误，請稍後重試",
                    icon: "warn",
                    duration: 1500
                });
            }
        });
    },
    closeBackView: function() {
        var e = getCurrentPages(), a = e[e.length - 1];
        if (this.data.options.isSuc) {
            a.setData({
                videoStatus: null,
                timeUse: null
            });
            var t = getCurrentPages();
            t[t.length - 2] ? wx.navigateBack({
                delta: 1
            }) : wx.redirectTo({
                url: "../../index/index"
            });
        } else {
            var n = getCurrentPages();
            n[n.length - 2] ? wx.navigateBack({
                changed: !0
            }) : wx.redirectTo({
                url: "../../index/index"
            });
        }
    },
    getCurrentPageParam: function() {
        return d;
    },
    onLoad: function(e) {
        if (d = JSON.stringify(e), o.decrypt(e), this.data.options = e, ("7.0.5" == o.systemInfo.version || "7.0.6" == o.systemInfo.version) && "android" == o.systemInfo.platform) return this.setData({
            showBack: !0
        }), !1;
        console.log("------********", e), this.data.isSuc = e.isSuc || "", this.mySet();
    },
    appointAdviser: function(e) {
        var i = this;
        return a(t.default.mark(function a() {
            var s, d, u, g;
            return t.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return s = getCurrentPages(), d = s[s.length - 1], a.next = 4, (0, n.default)("adviserInfo", {
                        houseId: l.houseId,
                        agentId: e.consultantId
                    });

                  case 4:
                    u = a.sent, console.log("指定视频小助手接口:", u), u && u.success && u.single ? (o.globalData.videoCustomer = i.aideData = u.single, 
                    i.login(i.aideData)) : (console.log("指定视频顾问信息接口失败: ", u), wx.showModal({
                        title: "提示",
                        content: "当前看房小助手暂忙",
                        showCancel: !1,
                        success: function(a) {
                            if (e.isSuc) {
                                d.setData({
                                    videoStatus: null,
                                    timeUse: null
                                });
                                var t = getCurrentPages();
                                t[t.length - 2] ? wx.navigateBack({
                                    delta: 1
                                }) : wx.redirectTo({
                                    url: "../../index/index"
                                });
                            } else {
                                var n = getCurrentPages();
                                n[n.length - 2] ? wx.navigateBack({
                                    changed: !0
                                }) : wx.redirectTo({
                                    url: "../../index/index"
                                });
                            }
                        }
                    }), e.fail && e.fail({
                        errCode: errCode || -1,
                        errMsg: errMsg || "获取看房小助手接口失败，调试期间请点击右上角三个点按钮，选择打开调试"
                    }), g = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "aide.js-appointAdviser",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(u) + ";houseId=" + l.houseId + ";" + JSON.stringify(e)
                    }, r.trackRequest(g));

                  case 7:
                  case "end":
                    return a.stop();
                }
            }, a, i);
        }))();
    },
    randomAdviser: function(e) {
        var i = this;
        return a(t.default.mark(function a() {
            var s, d, u, g, c;
            return t.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return s = getCurrentPages(), d = s[s.length - 1], u = {
                        houseId: l.houseId,
                        shareSign: o.globalData.fromChannel || "",
                        customerId: o.globalData.single && o.globalData.single.id ? o.globalData.single.id : "",
                        scene: o.globalData.launchInfo && o.globalData.launchInfo.scene || "",
                        adviserId: o.globalData.adviserId || ""
                    }, a.next = 5, (0, n.default)("randomAdviser", u);

                  case 5:
                    g = a.sent, console.log("获取随机看房小助手接口:", g), g && g.success && g.single ? (o.globalData.videoCustomer = i.aideData = g.single, 
                    i.login(i.aideData)) : (console.log("获取看房小助手接口失败: ", g), wx.showModal({
                        title: "提示",
                        content: "当前没有空闲的看房小助手",
                        showCancel: !1,
                        success: function(a) {
                            if (e.isSuc) {
                                d.setData({
                                    videoStatus: null,
                                    timeUse: null
                                });
                                var t = getCurrentPages();
                                t[t.length - 2] ? wx.navigateBack({
                                    delta: 1
                                }) : wx.redirectTo({
                                    url: "../../index/index"
                                });
                            } else {
                                var n = getCurrentPages();
                                n[n.length - 2] ? wx.navigateBack({
                                    changed: !0
                                }) : wx.redirectTo({
                                    url: "../../index/index"
                                });
                            }
                        }
                    }), e.fail && e.fail({
                        errCode: errCode || -1,
                        errMsg: errMsg || "获取看房小助手接口失败，调试期间请点击右上角三个点按钮，选择打开调试"
                    }), c = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "aide.js-randomAdviser",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(g) + ";houseId=" + l.houseId + ";" + JSON.stringify(u)
                    }, r.trackRequest(c));

                  case 8:
                  case "end":
                    return a.stop();
                }
            }, a, i);
        }))();
    },
    dialVideo: function(e) {
        var i = this;
        return a(t.default.mark(function a() {
            var s, d, u, g, c, h;
            return t.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return s = getCurrentPages(), d = s[s.length - 2] || "", u = 1, i.data.isSuc && (u = e.consultantId && e.consultantId.length > 0 ? 3 : 2), 
                    g = {
                        houseId: l.houseId,
                        shareSign: o.globalData.fromChannel || "",
                        customerId: o.globalData.single && o.globalData.single.id ? o.globalData.single.id : "",
                        scene: o.globalData.launchInfo && o.globalData.launchInfo.scene || "",
                        adviserId: e.consultantId || (d && d.data && d.data.adviserInfo ? d.data.adviserInfo.id : ""),
                        type: u
                    }, a.next = 7, (0, n.default)("dialVideo", g);

                  case 7:
                    c = a.sent, console.log("获取新接口看房小助手接口:", c, d), c && c.success && c.single ? (o.globalData.videoCustomer = i.aideData = c.single, 
                    i.login(i.aideData)) : (console.log("获取新接口看房小助手接口失败: ", c), wx.showModal({
                        title: "提示",
                        content: "当前没有空闲的看房小助手",
                        showCancel: !1,
                        success: function(a) {
                            if (e.isSuc) {
                                d.setData({
                                    videoStatus: null,
                                    timeUse: null
                                });
                                var t = getCurrentPages();
                                t[t.length - 2] ? wx.navigateBack({
                                    delta: 1
                                }) : wx.redirectTo({
                                    url: "../../index/index"
                                });
                            } else {
                                var n = getCurrentPages();
                                n[n.length - 2] ? wx.navigateBack({
                                    changed: !0
                                }) : wx.redirectTo({
                                    url: "../../index/index"
                                });
                            }
                        }
                    }), e.fail && e.fail({
                        errCode: errCode || -1,
                        errMsg: errMsg || "获取看房小助手接口失败，调试期间请点击右上角三个点按钮，选择打开调试"
                    }), h = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "aide.js-dialVideo",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(c) + ";houseId=" + l.houseId + ";" + JSON.stringify(g)
                    }, r.trackRequest(h));

                  case 10:
                  case "end":
                    return a.stop();
                }
            }, a, i);
        }))();
    },
    addVideoChatCount: function() {
        var e = this;
        return a(t.default.mark(function a() {
            var i;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, (0, n.default)("addVideoChatCount", {
                        id: o.globalData.single.id,
                        houseId: l.houseId
                    }, !0);

                  case 2:
                    i = e.sent;

                  case 3:
                  case "end":
                    return e.stop();
                }
            }, a, e);
        }))();
    }
}, i.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));