function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    return function() {
        var a = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function o(n, i) {
                try {
                    var l = a[n](i), s = l.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!l.done) return Promise.resolve(s).then(function(e) {
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

var t = e(require("../../lib/runtime")), o = e(require("../../lib/requestConfig")), n = e(require("../../utils/monitor.js")), i = getApp(), l = require("../../utils/util.js"), s = require("../../config.js"), r = l.getImgUrl() + "/wepy_pro", g = "", u = require("../../getlogininfo.js"), c = u.authorizeInfo, d = u.getUserInfo;

Page({
    data: {
        chatButton: r + "/im-chat.png",
        showInfoModel: !1,
        infoFun: null,
        infoFailFun: null,
        showPhoneModel: !1,
        showImgModel: !1,
        showLiudianBox: !0,
        phoneFun: null,
        showTopTitle: !1,
        loading: !0,
        imTitle: "项目金牌顾问",
        imDesc: "请选择一名顾问为您在线咨询",
        isShowVideoButton: !1,
        despage: "xuanzeguwenliebiao",
        phoneFailFun: null,
        title: "在线咨询",
        sorry: "https://dm.static.elab-plus.com/wepy_pro/sorry.png",
        defaultImg: "../../image/im/Avatar_male.png",
        yuyue: r + "/yuyue.png",
        fixImg: "https://dm.static.elab-plus.com/wepy_pro/fix-b.png",
        showTel: !1,
        adviserList: [],
        tryAgainFlag: !1,
        setInter: null
    },
    getCallLog: function() {
        var e = this;
        return a(t.default.mark(function a() {
            var n, l;
            return t.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return n = {
                        customerId: i.globalData.single && i.globalData.single.id ? i.globalData.single.id : "",
                        houseId: s.houseId
                    }, a.next = 3, (0, o.default)("getCallLog", n, 1);

                  case 3:
                    (l = a.sent) && l.success && l.single && e.setData({
                        isShowVideoButton: !0
                    });

                  case 5:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    onShow: function(e) {},
    getAdviserList: function(e) {
        var n = this;
        return a(t.default.mark(function a() {
            var l, r, g, u;
            return t.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return l = {
                        shareSign: i.globalData.fromChannel,
                        houseId: s.houseId,
                        scene: i.globalData.launchInfo && i.globalData.launchInfo.scene || "",
                        customerId: i.globalData.single && i.globalData.single.id ? i.globalData.single.id : "",
                        pageNo: 1,
                        pageSize: 100
                    }, a.next = 3, (0, o.default)("imAdviserList", l, 1);

                  case 3:
                    if (!(r = a.sent) || !r.pageModel) {
                        a.next = 19;
                        break;
                    }
                    if ((g = r.pageModel.resultSet || []).forEach(function(e) {
                        e.loadComplete = !1;
                    }), console.log(g, "顾问列表"), n.setData({
                        loading: !1
                    }), !e.fromMessageList) {
                        a.next = 17;
                        break;
                    }
                    if (0 != g.length) {
                        a.next = 14;
                        break;
                    }
                    return n.setData({
                        showTopTitle: !0
                    }), n.noAdviser(), a.abrupt("return");

                  case 14:
                    return n.setData({
                        adviserList: g,
                        showTopTitle: !0
                    }), n.hasAdviser(), a.abrupt("return");

                  case 17:
                    (u = wx.getStorageSync("isSend" + s.houseId)) ? 1 == g.length && 2 == g[0].safeIm ? wx.redirectTo({
                        url: "/pages/chat/chat?adviserId=" + g[0].id
                    }) : wx.redirectTo({
                        url: "../messagesList/messagesList"
                    }) : 1 == g.length ? wx.redirectTo({
                        url: "/pages/chat/chat?adviserId=" + g[0].id
                    }) : 0 == g.length ? (n.setData({
                        showTopTitle: !0
                    }), n.noAdviser()) : (n.hasAdviser(), n.setData({
                        adviserList: g,
                        showTopTitle: !0
                    }));

                  case 19:
                  case "end":
                    return a.stop();
                }
            }, a, n);
        }))();
    },
    noAdviser: function() {
        var e = this;
        i.globalData.isUserInfo ? !i.globalData.tmpPhone && !i.globalData.phone && i.globalData.single && i.globalData.single.openAuthorize && (console.log("从未授权过", wx.getStorageSync("phone")), 
        e.authorizeIndexPhone()) : c.call(this, function() {
            !i.globalData.tmpPhone && !i.globalData.phone && i.globalData.single && i.globalData.single.openAuthorize && e.authorizeIndexPhone();
        }, function() {
            !i.globalData.tmpPhone && !i.globalData.phone && i.globalData.single && i.globalData.single.openAuthorize && e.authorizeIndexPhone();
        }), this.setData({
            showTel: !0
        });
        var a = {
            type: "PV",
            pvId: "P_2cMINA_4",
            pvCurPageName: "wuzaixianguwen",
            pvCurPageParams: g,
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
        };
        console.log(a, "埋点1"), l.trackRequest(a, i);
    },
    hasAdviser: function() {
        var e = this;
        i.globalData.isUserInfo ? !i.globalData.tmpPhone && !i.globalData.phone && i.globalData.single && i.globalData.single.openAuthorize && (console.log("从未授权过", wx.getStorageSync("phone")), 
        e.authorizeIndexPhone()) : c.call(this, function() {
            !i.globalData.tmpPhone && !i.globalData.phone && i.globalData.single && i.globalData.single.openAuthorize && e.authorizeIndexPhone();
        }, function() {
            !i.globalData.tmpPhone && !i.globalData.phone && i.globalData.single && i.globalData.single.openAuthorize && e.authorizeIndexPhone();
        }), this.setData({
            showTel: !1
        });
        var a = {
            type: "PV",
            pvId: "P_2cMINA_2",
            pvCurPageName: "xuanzeguwenliebiao",
            pvCurPageParams: g,
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
        };
        console.log(a, "埋点2"), l.trackRequest(a, i);
    },
    load: function(e) {
        console.log("***counselorlist-img-load-success***", e), this.data.adviserList[e.currentTarget.dataset.index || 0].loadComplete = !0, 
        this.setData({
            adviserList: this.data.adviserList
        });
    },
    error: function(e) {
        console.log("***counselorlist-img-load-error***", JSON.stringify(e));
        var a = {
            type: "mini-program-Error",
            pvPageStayTime: (new Date().getTime() - wx.getStorageSync("loadTime")) / 1e3,
            adviserId: "",
            imTalkId: "",
            imTalkType: "",
            pvCurPageName: "counselorlist",
            clkDesPage: "",
            clkName: "",
            clkId: "",
            expand: JSON.stringify(e)
        };
        l.trackRequest(a, i);
    },
    goMessageList: function(e) {
        wx.redirectTo({
            url: "../messagesList/messagesList"
        });
    },
    getPhoneNumber: function(e) {
        var a = this;
        this.setData({
            showPhoneModel: !1
        }), wx.setStorageSync("ISauthorizePhone", !0);
        var t = e.detail.iv, o = (e.detail.errMsg, i.globalData.houseid, i.globalData.tonken || ""), n = e.detail.encryptedData, l = i.globalData.sessionKey, s = i.globalData.appid;
        console.log("***token***", o), i.globalData.tmpPhone = !0, console.log("****getPhoneNumber****"), 
        !e.detail.encryptedData || e.detail.errMsg.includes("deny") ? (console.log("用户拒绝授权手机"), 
        "function" == typeof a.data.phoneFailFun && a.data.phoneFailFun()) : (n && l && t || wx.showToast({
            title: "系统提示:授权信息错误",
            icon: "warn",
            duration: 1500
        }), i.globalData.single ? i.getPhone(a, n, l, s, t, o) : a.data.setInter = setInterval(function() {
            i.globalData.single && (i.getPhone(a, n, l, s, t, o), clearInterval(a.data.setInter));
        }, 200));
    },
    authorizeIndexPhone: function(e, a) {
        var t = this;
        console.log("***authorizeIndexPhone***", i.globalData.phone, wx.getStorageSync("phone")), 
        i.globalData.phone ? (t.setData({
            showPhoneModel: !1,
            showPhoneAuth: !0
        }), "function" == typeof e && e()) : t.setData({
            showPhoneModel: !0,
            phoneFun: e || null,
            phoneFailFun: a || null
        });
    },
    getUserInfo: function(e) {
        d.call(this, e);
    },
    onUnload: function() {
        l.stopTrackEventTimeObj();
    },
    goChat: function(e) {
        var a = e.currentTarget.dataset.item;
        wx.setStorageSync("adviserInfo", JSON.stringify(a));
        var t = {
            type: "CLK",
            pvPageStayTime: (new Date().getTime() - wx.getStorageSync("loadTime")) / 1e3,
            adviserId: a.id,
            imTalkId: a.id + "_" + i.globalData.single.id + "_" + s.houseId,
            imTalkType: "1",
            clkDesPage: "liaotianchuangkou",
            clkName: "xuanzeguwenliaotian",
            clkId: "clk_2cmina_24",
            clkParams: ""
        };
        l.trackRequest(t, i), wx.redirectTo({
            url: "../chat/chat"
        }), console.log(a, "------------", JSON.stringify(a));
    },
    goVideo: function(e) {
        var a = this;
        if (!a.data.tryAgainFlag) {
            var t = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - wx.getStorageSync("loadTime")) / 1e3,
                clkDesPage: "ekanfangjietongye",
                clkName: "shipin_xuanguwenliebiao",
                clkId: "clk_2cmina_42",
                clkParams: ""
            };
            l.trackRequest(t, i), a.data.tryAgainFlag = !0, wx.getSetting({
                success: function(e) {
                    console.log("***rtcroomCom.onLoad***getSetting", e), e.authSetting["scope.record"] ? e.authSetting["scope.camera"] ? (a.data.tryAgainFlag = !1, 
                    wx.navigateTo({
                        url: "../multiroom/aide/aide"
                    })) : wx.authorize({
                        scope: "scope.camera",
                        success: function() {
                            a.data.tryAgainFlag = !1, wx.navigateTo({
                                url: "../multiroom/aide/aide"
                            });
                        },
                        fail: function() {
                            a.data.tryAgainFlag = !1, wx.hideLoading(), a.setData({
                                showImgModel: !0
                            });
                        }
                    }) : wx.authorize({
                        scope: "scope.record",
                        success: function() {
                            e.authSetting["scope.camera"] ? (a.data.tryAgainFlag = !1, wx.navigateTo({
                                url: "../multiroom/aide/aide"
                            })) : wx.authorize({
                                scope: "scope.camera",
                                success: function() {
                                    a.data.tryAgainFlag = !1, wx.navigateTo({
                                        url: "../multiroom/aide/aide"
                                    });
                                },
                                fail: function(e) {
                                    a.data.tryAgainFlag = !1, wx.hideLoading(), a.setData({
                                        showImgModel: !0
                                    });
                                }
                            });
                        },
                        fail: function() {
                            a.data.tryAgainFlag = !1, wx.hideLoading(), a.setData({
                                showImgModel: !0
                            });
                        }
                    });
                },
                fail: function() {
                    a.data.tryAgainFlag = !1, wx.showToast({
                        title: "系统提示:网络错误",
                        icon: "warn",
                        duration: 1500
                    });
                }
            });
        }
    },
    onReady: function() {},
    getCurrentPageParam: function() {
        return g;
    },
    onLoad: function(e) {
        g = JSON.stringify(e), wx.redirectTo({
            url: "../messagesList/messagesList"
        });
    },
    selectHouseLeadWork: function() {
        var e = this;
        return a(t.default.mark(function a() {
            var n;
            return t.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.next = 2, (0, o.default)("selectHouseLeadWork", {
                        id: s.houseId
                    }, 1);

                  case 2:
                    (n = a.sent) && n.success && n.single && (n.single.leadTitle && e.setData({
                        imTitle: n.single.leadTitle
                    }), n.single.leadRemark && e.setData({
                        imDesc: n.single.leadRemark
                    }), i.globalData.imHelloWord = n.single.greetings, i.globalData.imRepeat = n.single.autoReply);

                  case 4:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    goTel: function() {
        var e = i.globalData.phone || wx.getStorageSync("phone"), a = wx.getStorageSync("indexLiudian"), t = {
            type: "CLK",
            pvPageStayTime: (new Date().getTime() - wx.getStorageSync("loadTime")) / 1e3,
            clkDesPage: "querenliudianye",
            clkName: "wuren_liudianyuyue",
            clkId: "clk_2cmina_41",
            clkParams: {
                tel: e
            }
        };
        l.trackRequest(t, i), e || a ? wx.showToast({
            title: "留电成功，我们会尽快联系您",
            icon: "none",
            duration: 2e3
        }) : wx.navigateTo({
            url: "../savephone/savephone"
        });
    },
    getShareProgram: function() {
        this.setData({
            showImgModel: !1
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