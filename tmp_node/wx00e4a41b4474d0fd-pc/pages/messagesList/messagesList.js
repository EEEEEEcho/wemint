function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

function t(e) {
    return function() {
        var a = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function n(o, i) {
                try {
                    var s = a[o](i), r = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!s.done) return Promise.resolve(r).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(r);
            }
            return n("next");
        });
    };
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = e(require("../../lib/runtime")), i = e(require("../../lib/requestConfig")), s = e(require("../../utils/monitor.js")), r = getApp(), l = require("../../utils/util.js"), g = (require("../../utils/tls.js"), 
require("../../utils/webim_wx.js")), c = require("../../config.js"), d = require("../../utils/webim_handler.js"), u = require("../../utils/IM_init.js"), m = require("../../getlogininfo.js"), p = (m.authorizeInfo, 
m.getUserInfo), h = l.getImgUrl(), f = null, v = "";

Page({
    data: {
        ePic: h + "wepy_pro/e-pic.png",
        defaultImg: "../../image/im/Avatar_male.png",
        moreImg: h + "wepy_pro/more-coun.png",
        showInfoModel: !1,
        infoFun: null,
        despage: "xiaoxiliebiao",
        despageForChat: "xiaoxiliebiao",
        infoFailFun: null,
        isShowVideoButton: !1,
        showImgModel: !1,
        showPhoneModel: !1,
        showLiudianBox: !0,
        phoneFun: null,
        phoneFailFun: null,
        pdAdviserInfo: null,
        videoList: [],
        showTips: !1,
        noAdviserPage: !1,
        fixImg: "https://dm.static.elab-plus.com/wepy_pro/im/kanfang@2x.png",
        loading: !1,
        Config: {
            sdkappid: c.sdkAppID,
            accountType: c.accType,
            accountMode: 0
        },
        adviserList: [],
        isSentAdviserList: []
    },
    textChange: function(e) {
        if (e.includes("csyzwfelab20180425hhhdfq")) {
            var a = JSON.parse(e);
            return 506 == a.type ? "[视频]" : 507 == a.type ? "[链接]" : 508 == a.type ? "[此时此刻]" : 513 == a.type ? "" : 102 == a.type ? "" : 104 == a.type ? "[e看房]" : 501 == a.type ? "[视频通话失败]" : 500 == a.type ? "[视频通话成功]" : 509 == a.type ? "[图片]" : 502 == a.type ? "[获取手机号码]" : 204 == a.type ? "[PDF文件]" : 515 == a.type || 516 == a.type ? a.param.text : "";
        }
        return e.includes("【系统消息】") || e.includes("【系统提示】") || e.includes("顾问不存在") || e.includes("onChangePlay") || e.includes("视频通话") ? "" : e.includes("second") && e.includes("uuid") ? "[语音]" : e.includes("e看房已发送") || e.includes("发起视频看房请求") ? "" : e;
    },
    goVideo: function(e) {
        var a = this, t = {
            type: "CLK",
            pvPageStayTime: (new Date().getTime() - wx.getStorageSync("loadTime")) / 1e3,
            clkDesPage: "ekanfangjietongye",
            clkName: "shipin_xiaoxiliebiao",
            clkId: "clk_2cmina_39",
            clkParams: ""
        };
        l.trackRequest(t, r), wx.getSetting({
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
                        a.data.tryAgainFlag = !1, a.myLoading && a.myLoading.hideLoading(), a.setData({
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
                                a.data.tryAgainFlag = !1, a.myLoading && a.myLoading.hideLoading(), a.setData({
                                    showImgModel: !0
                                });
                            }
                        });
                    },
                    fail: function() {
                        a.data.tryAgainFlag = !1, a.myLoading && a.myLoading.hideLoading(), a.setData({
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
    },
    onShow: function(e) {
        var a = this;
        this.setData({
            isSentAdviserList: []
        }), s.default.pageShow(), wx.setStorageSync("loadTime", new Date().getTime()), wx.showLoading();
        var t = this;
        r.login(function(e) {
            if (a.modifyChatInfo(), c.imPhoneAuthorize || t.setData({
                showLiudianBox: !1
            }), !r.globalData.single || !r.globalData.single.id) {
                wx.reportMonitor && wx.reportMonitor("single", 1);
                var n = {
                    type: "mini-program-Error",
                    pvPageStayTime: new Date().getTime() / 1e3,
                    adviserId: "",
                    imTalkId: "",
                    imTalkType: "",
                    pvCurPageName: "messagelist.js-onShow",
                    clkDesPage: "",
                    clkName: "",
                    clkId: "",
                    expand: JSON.stringify(r.globalData.single) + ";houseId=" + c.houseId
                };
                l.trackRequest(n);
            }
            var o = {
                type: "PV",
                pvId: "P_2cMINA_3",
                pvCurPageName: "xiaoxiliebiao",
                pvCurPageParams: v,
                pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
                pvLastPageParams: "",
                pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
            };
            console.log(o, "埋点"), l.trackRequest(o, r), t.getCallLog(), t.getAdviserList(), 
            r.globalData.phone || t.setData({
                showPhoneModel: !0
            });
        });
    },
    getAdviserList: function() {
        var e = this;
        return t(o.default.mark(function a() {
            var t, n;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return t = {
                        shareSign: r.globalData.fromChannel,
                        houseId: c.houseId,
                        scene: r.globalData.launchInfo && r.globalData.launchInfo.scene || "",
                        customerId: r.globalData.single && r.globalData.single.id ? r.globalData.single.id : "",
                        pageNo: 1,
                        pageSize: 100,
                        isDispatch: 0
                    }, a.next = 3, (0, i.default)("imAdviserList", t);

                  case 3:
                    n = a.sent, e.myLoading && e.myLoading.hideLoading(), n.success && n.pageModel ? (e.setData({
                        noAdviserPage: !1
                    }), 1 == n.pageModel.resultSet.length && 2 == n.pageModel.resultSet[0].safeIm ? (wx.setStorageSync("adviserInfo", JSON.stringify(n.pageModel.resultSet[0])), 
                    wx.redirectTo({
                        url: "/pages/chat/chat?adviserId=" + n.pageModel.resultSet[0].id
                    })) : e.initData()) : (console.log("im列表获接口报错，不走派单直接无顾问"), e.setData({
                        noAdviserPage: !0
                    }));

                  case 6:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    goTel: function() {
        var e = r.globalData.phone || wx.getStorageSync("phone") || "", a = wx.getStorageSync("indexLiudian"), t = {
            type: "CLK",
            pvPageStayTime: (new Date().getTime() - wx.getStorageSync("loadTime")) / 1e3,
            clkDesPage: "dianjiliudianye",
            clkName: "wuren_liudianyuyue",
            clkId: "clk_2cmina_216",
            clkParams: {
                tel: e
            }
        };
        if (l.trackRequest(t, r), !this.data.showPhoneModel) {
            var n = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - wx.getStorageSync("loadTime")) / 1e3,
                clkDesPage: "querenliudianye",
                clkName: "wuren_liudianyuyue",
                clkId: "clk_2cmina_41",
                clkParams: {
                    tel: e
                }
            };
            l.trackRequest(n, r), this.AuthLeavePhone(), e || a ? wx.showToast({
                title: "留电成功，我们会尽快联系您",
                icon: "none",
                duration: 2e3
            }) : wx.navigateTo({
                url: "../savephone/savephone"
            });
        }
    },
    getCallLog: function() {
        var e = this;
        return t(o.default.mark(function a() {
            var t, n;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return t = {
                        customerId: r.globalData.single && r.globalData.single.id ? r.globalData.single.id : "",
                        houseId: c.houseId
                    }, a.next = 3, (0, i.default)("getCallLog", t);

                  case 3:
                    (n = a.sent) && n.success && n.single && e.setData({
                        isShowVideoButton: !0
                    });

                  case 5:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: "在线咨询"
        });
    },
    afterPhoneHandle: function(e) {
        e && e.type, e && "success" === e.type && (wx.showToast({
            title: "留电成功！",
            icon: "none",
            duration: 1500
        }), this.AuthLeavePhone(), this.setData({
            showPhoneModel: !1
        }));
        var a = {
            clkDesPage: this.data.despage || "",
            type: "CLK",
            pvCurPageName: this.data.despage || "",
            pvCurPageParams: v,
            clkId: "clk_2cmina_137",
            clkName: "weixinshouquan",
            clkParams: {
                "wx.authorize.scope": "wx.getPhoneNum",
                type: e.type
            }
        };
        l.trackRequest(a);
    },
    AuthLeavePhone: function() {
        var e = this;
        return t(o.default.mark(function a() {
            var t, n, s;
            return o.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return t = {
                        houseId: c.houseId,
                        customerId: r.globalData.single && r.globalData.single.id ? r.globalData.single.id : "",
                        shareSign: r.globalData.fromChannel,
                        dynamicSource: "1",
                        scene: r.globalData.launchInfo && r.globalData.launchInfo.scene || "",
                        mobile: r.globalData.single.imBindMobile || r.globalData.single.wxAuthMobile || r.globalData.single.leavePhoneMobile || r.globalData.phone || "",
                        source: "3"
                    }, console.log("---------授权留电----------", t), e.next = 4, (0, i.default)("leavePhone", t);

                  case 4:
                    (n = e.sent) && n.success ? (wx.setStorageSync("indexLiudian", !0), n.single && n.single.organize && (r.globalData.organize = n.single.organize || "", 
                    r.globalData.organizeUsername = n.single.organizeUsername || "")) : (s = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "index.js-AuthLeavePhone",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(n) + ";houseId=" + c.houseId
                    }, l.trackRequest(s), wx.showToast({
                        title: "系统提示:网络错误",
                        icon: "none",
                        duration: 2e3
                    }));

                  case 6:
                  case "end":
                    return e.stop();
                }
            }, a, e);
        }))();
    },
    getPhoneNumber: function(e) {
        var a = this;
        wx.setStorageSync("ISauthorizePhone", !0);
        var t = e.detail.iv, n = (e.detail.errMsg, r.globalData.houseid, r.globalData.tonken || ""), o = e.detail.encryptedData, i = r.globalData.sessionKey, s = r.globalData.appid;
        console.log("***token***", n), r.globalData.tmpPhone = !0, console.log("****getPhoneNumber****"), 
        !e.detail.encryptedData || e.detail.errMsg.includes("deny") ? ("function" == typeof a.data.phoneFailFun && a.data.phoneFailFun(), 
        a.afterPhoneHandle({
            type: "fail"
        })) : (o && i && t || wx.showToast({
            title: "系统提示:授权信息错误",
            icon: "warn",
            duration: 1500
        }), r.globalData.single ? r.getPhone(a, o, i, s, t, n, function() {
            a.afterPhoneHandle({
                type: "success"
            });
        }) : a.data.setInter = setInterval(function() {
            r.globalData.single && (r.getPhone(a, o, i, s, t, n), a.afterPhoneHandle({
                type: "fail"
            }), clearInterval(a.data.setInter));
        }, 200));
    },
    getUserInfo: function(e) {
        p.call(this, e);
    },
    onUnload: function() {
        l.stopTrackEventTimeObj();
    },
    goAdviserList: function(e) {
        var a = {
            type: "CLK",
            pvPageStayTime: (new Date().getTime() - wx.getStorageSync("loadTime")) / 1e3,
            imTalkType: "1",
            clkDesPage: "xuanzeguwenliebiao",
            clkName: "gengduoguwen",
            pvCurPageName: "xiaoxiliebiao",
            clkId: "clk_2cmina_26",
            clkParams: ""
        };
        l.trackRequest(a, r), wx.navigateTo({
            url: "../counselorList/counselorList?fromMessageList=1"
        });
    },
    initData: function() {
        var e = this;
        console.log("准备登陆IM", new Date().getTime() - f);
        var a = setInterval(function() {
            r.globalData.userSig && (wx.hideLoading(), u.setListener({
                onMsgNotify: e.onmessage,
                onDestoryGroupNotify: d.onDestoryGroupNotify,
                onCustomGroupNotify: d.onCustomGroupNotify,
                onLoginSuccess: e.getHistoryMsgs
            }), u.loginIM({
                type: 0
            }), clearInterval(a));
        }, 300);
    },
    onmessage: function(e) {
        var a = this;
        console.log(e, "ppppppp");
        var t = "【系统消息】该用户当前登录方式为微信小程序登录，无法使用此功能";
        return e.content && 102 == e.content.type || 512 == e.content.type ? (d.onSendMsg(t, {
            TYPE: g.SESSION_TYPE.C2C,
            myselToID: e.fromAccountNick
        }), void a.addNewMsg(e)) : e.content && 502 == e.content.type ? e.content.param.isShowInvitation ? (wx.setStorageSync("isGiveTel", !1), 
        console.log(e.content, "ppp"), wx.getStorageSync("phone") || r.globalData.phone ? void a.addNewMsg(e) : void d.onSendMsg("【系统消息】当前用户未授权手机号，暂时无法获取。请通过聊天方式索取客户手机号码！", {
            TYPE: g.SESSION_TYPE.C2C,
            myselToID: e.fromAccountNick
        })) : void console.log("go") : void (e.content && 513 == e.content.type || (e.content && "string" == typeof e.content && e.content.includes("onChangePlayAudio") ? d.onSendMsg(t, {
            TYPE: g.SESSION_TYPE.C2C,
            myselToID: e.fromAccountNick
        }) : a.addNewMsg(e)));
    },
    addNewMsg: function(e) {
        var t = e, o = this;
        console.log(t, "new", o.data.adviserList);
        for (var i = 0; i < o.data.adviserList.length; i++) o.data.adviserList[i].id == e.fromAccountNick.substring(0, e.fromAccountNick.indexOf("_")) && (t = Object.assign(o.data.adviserList[i], e), 
        console.log(t, "加最新消息了"));
        console.log(o.data.isSentAdviserList, t, "iopkojo");
        for (var s = !1, r = 0; r < o.data.isSentAdviserList.length; r++) if (t.id == o.data.isSentAdviserList[r].id) {
            console.log("即将崛起", n(t.content)), s = !0;
            var g = "isSentAdviserList[" + r + "].hasNewMsg", c = "isSentAdviserList[" + r + "].MsgShow", d = "isSentAdviserList[" + r + "].MsgTimeStamp";
            return o.setData(a({}, g, o.data.isSentAdviserList[r].hasNewMsg + 1)), "object" == n(t.content) ? o.setData(a({}, c, o.textChange(JSON.stringify(t.content)))) : o.setData(a({}, c, o.textChange(t.content))), 
            void o.setData(a({}, d, l.formatTodayTime(new Date())));
        }
        s || o.data.isSentAdviserList.unshift(t);
    },
    goChatPage: function(e) {
        var a = this;
        return t(o.default.mark(function t() {
            var n, s;
            return o.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (a.setData({
                        showTips: !0
                    }), r.globalData.openid && r.globalData.single && "null" != r.globalData.single && "undefined" != r.globalData.single && r.globalData.single.id && "null" != r.globalData.single.id && "undefined" != r.globalData.single.id) {
                        t.next = 7;
                        break;
                    }
                    return wx.showModal({
                        title: "提醒",
                        content: "微信小程序登录不稳定，一对一在线咨询可能无法使用，建议重新打开小程序",
                        showCancel: !1,
                        confirmText: "我知道了",
                        success: function(e) {
                            e.confirm ? console.log("用户点击确定") : e.cancel && console.log("用户点击取消");
                        }
                    }), wx.reportMonitor && wx.reportMonitor("single", 1), n = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: (currPage.route || "") + "-goChatList",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(r.globalData) + ";houseId=" + c.houseId
                    }, l.trackRequest(n), t.abrupt("return", !1);

                  case 7:
                    return t.next = 9, (0, i.default)("getPdInfo", {
                        houseId: c.houseId,
                        pageNo: 1,
                        customerId: r.globalData.single.id,
                        pageSize: 10,
                        scene: r.globalData.launchInfo && r.globalData.launchInfo.scene || "",
                        shareSign: r.globalData.fromChannel
                    }, !0);

                  case 9:
                    s = t.sent, a.setData({
                        showTips: !1
                    }), s.success && s.single ? e && "function" == typeof e ? wx.redirectTo({
                        url: "/pages/chat/chat?adviserId=" + s.single.id + "&isPd=1"
                    }) : wx.navigateTo({
                        url: "/pages/chat/chat?adviserId=" + s.single.id + "&isPd=1"
                    }) : e && "function" == typeof e ? e() : wx.showToast({
                        icon: "none",
                        title: "很抱歉，当前暂无在线顾问，请稍后再试",
                        duration: 2e3
                    });

                  case 12:
                  case "end":
                    return t.stop();
                }
            }, t, a);
        }))();
    },
    getHistoryMsg: function() {
        r.globalData.tonken, l.formatTime(new Date());
        var e = this;
        g.getRecentContactList({
            Count: 100
        }, function(a) {
            if (console.log(a, "yy"), a.SessionItem && a) {
                a.SessionItem.forEach(function(e, a) {
                    e.index = a;
                }), console.log(a.SessionItem, "添加index值");
                for (var t = [], n = 0; n < e.data.adviserList.length; n++) {
                    console.log(a, "yyyyyy");
                    for (var o = 0; o < a.SessionItem.length; o++) {
                        var i = a.SessionItem[o].To_Account;
                        i.substring(0, i.indexOf("_")) == e.data.adviserList[n].id && (a.SessionItem[o] = Object.assign(a.SessionItem[o], e.data.adviserList[n]), 
                        a.SessionItem[o].MsgTimeStamp = l.formatTodayTime(new Date(1e3 * a.SessionItem[o].MsgTimeStamp)), 
                        console.log(a.SessionItem[o].MsgShow), a.SessionItem[o].MsgShow = e.textChange(a.SessionItem[o].MsgShow), 
                        t.push(a.SessionItem[o]));
                    }
                }
                0 != t.length ? (e.sortList(t), console.log(e.data.isSentAdviserList), console.log("拿到IM列表", new Date().getTime() - f), 
                console.log("渲染数据", e.data.isSentAdviserList)) : e.goChatPage(function() {
                    var a = {
                        type: "PV",
                        pvId: "P_2cMINA_4",
                        pvCurPageName: "wuzaixianguwen",
                        pvCurPageParams: v,
                        pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
                        pvLastPageParams: "",
                        pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
                    };
                    console.log(a, "埋点1"), l.trackRequest(a, r), e.setData({
                        noAdviserPage: !0
                    });
                });
            } else e.goChatPage(function() {
                var a = {
                    type: "PV",
                    pvId: "P_2cMINA_4",
                    pvCurPageName: "wuzaixianguwen",
                    pvCurPageParams: v,
                    pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
                    pvLastPageParams: "",
                    pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
                };
                console.log(a, "埋点1"), l.trackRequest(a, r), e.setData({
                    noAdviserPage: !0
                });
            });
        }, function(e) {
            console.log(e, "错误回调");
        });
    },
    sortList: function(e) {
        for (var a = null, t = [], n = [], o = 0; o < e.length; o++) if (e[o] && 1 == e[o].bindStatus) {
            a = e[o], e.splice(o, 1);
            break;
        }
        for (var i = 0; i < e.length; i++) e[i] && 1 == e[i].onlineStatus ? n.push(e[i]) : t.push(e[i]);
        t.sort(function(e, a) {
            return e.index - a.index;
        }), n.sort(function(e, a) {
            return e.index - a.index;
        }), a && t.unshift(a), this.setData({
            isSentAdviserList: t.concat(n)
        }), console.log("messageList最终名单", this.data.isSentAdviserList);
    },
    load: function(e) {
        console.log("***messagelist-img-load-success***", e), this.data.isSentAdviserList[e.currentTarget.dataset.index || 0].loadComplete = !0, 
        this.setData({
            isSentAdviserList: this.data.isSentAdviserList
        });
    },
    error: function(e) {
        console.log("***messagelist-img-load-error***", JSON.stringify(e));
        var a = {
            type: "mini-program-Error",
            pvPageStayTime: (new Date().getTime() - wx.getStorageSync("loadTime")) / 1e3,
            adviserId: "",
            imTalkId: "",
            imTalkType: "",
            pvCurPageName: "messagelist",
            clkDesPage: "",
            clkName: "",
            clkId: "",
            expand: JSON.stringify(e)
        };
        l.trackRequest(a, r);
    },
    getHistoryMsgs: function() {
        var e = this;
        return t(o.default.mark(function a() {
            var t, n, s, g, d, u;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return t = e, n = l.formatTime(new Date()), s = r.globalData.tonken, g = wx.getStorageSync("unReadMsgs"), 
                    a.next = 6, (0, i.default)("queryImChatRecord", {
                        houseId: c.houseId,
                        customerId: r.globalData.single && r.globalData.single.id ? r.globalData.single.id : ""
                    }, !0);

                  case 6:
                    (d = a.sent) && d.success && d.list ? (e.data.adviserList = d.list || [], e.data.adviserList.forEach(function(a) {
                        var t = e.data.isSentAdviserList.find(function(e, t) {
                            return e.id == a.id;
                        });
                        a.loadComplete = !(!t || !t.loadComplete) && t.loadComplete, a.hasNewMsg = g[a.id + "_" + a.houseId] ? g[a.id + "_" + a.houseId] : 0;
                    }), console.log("====adviserList=====", e.data.adviserList), setTimeout(function() {
                        console.log("本地列表加载完成，准备获取im列表", new Date().getTime() - f), t.getHistoryMsg();
                    }, 200)) : (u = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "messagelist.js-getHistoryMsgs",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(d) + ";single:" + r.globalData.single + ";houseId=" + c.houseId
                    }, l.trackRequest(u));

                  case 8:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    getCurrentPageParam: function() {
        return v;
    },
    onLoad: function(e) {
        var a = wx.getStorageSync("unReadMsgs");
        e.autoTextFromCalc && e.autoTextFromCalc.length > 0 && (r.globalData.autoTextFromCalc = e.autoTextFromCalc), 
        a.sham && (a.total--, a.sham = 0), wx.setStorageSync("unReadMsgs", a), this.myLoading = this.selectComponent("#myLoading"), 
        this.myLoading && this.myLoading.showLoading();
        v = JSON.stringify(e), f = new Date().getTime(), e.tfbContentId && (r.globalData.exchangedFromChannel = JSON.stringify({
            tfbContentId: e.tfbContentId
        }));
    },
    modifyChatInfo: function() {
        var e = this;
        return t(o.default.mark(function a() {
            var t, n;
            return o.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return t = {
                        id: r.globalData.single.id,
                        houseId: c.houseId,
                        isImChat: 1
                    }, r.globalData.single.isImChat = 1, console.log("进入IM列表，完成imChat值更改"), e.next = 5, 
                    (0, i.default)("modifyUserInfo", t);

                  case 5:
                    n = e.sent;

                  case 6:
                  case "end":
                    return e.stop();
                }
            }, a, e);
        }))();
    },
    goChat: function(e) {
        var a = e.currentTarget.dataset.item;
        wx.setStorageSync("adviserInfo", JSON.stringify(a));
        var t = {
            type: "CLK",
            pvPageStayTime: (new Date().getTime() - wx.getStorageSync("loadTime")) / 1e3,
            adviserId: a.id,
            imTalkId: a.id + "_" + r.globalData.single.id + "_" + c.houseId,
            imTalkType: "1",
            pvCurPageName: "xiaoxiliebiao",
            clkDesPage: "liaotianchuangkou",
            clkName: "xuanzeguwenliaotian",
            clkId: "clk_2cmina_25",
            clkParams: ""
        };
        l.trackRequest(t, r), wx.navigateTo({
            url: "../chat/chat"
        });
    },
    getShareProgram: function() {
        this.setData({
            showImgModel: !1
        });
    }
}, s.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));