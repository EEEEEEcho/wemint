function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function a(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function n(s, o) {
                try {
                    var i = t[s](o), r = i.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!i.done) return Promise.resolve(r).then(function(e) {
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

var n, s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = e(require("../../lib/requestConfig")), i = e(require("../../lib/runtime")), r = e(require("../../utils/monitor.js")), l = require("../../lib/promise"), d = e(require("../../lib/endpoint")), c = require("../../utils/util.js"), u = require("../../utils/webim_wx.js"), g = require("../../config.js"), f = require("../../utils/webim_handler.js"), m = require("../../utils/IM_init.js"), p = require("../../utils/tls.js"), h = getApp(), v = null, I = null, y = "http://skyforest.static.elab-plus.com/", S = null, T = "", w = {
    sdkappid: g.sdkAppID,
    accountType: g.accType,
    accountMode: 0
};

p.init({
    sdkappid: w.sdkappid
}), Page({
    onShow: function() {
        var e = this;
        r.default.pageShow(), this.setData({
            isGiveTel: wx.getStorageSync("isGiveTel")
        });
        var t = setInterval(function() {
            if (h.globalData.single && h.globalData.userSig) {
                var a = e;
                wx.setStorageSync("loadTime", new Date().getTime());
                var n = {
                    type: "PV",
                    pvId: "P_2cMINA_5",
                    pvCurPageName: "liaotianchuangkou",
                    pvCurPageParams: T,
                    adviserId: e.data.adviserInfo.id,
                    imTalkId: e.data.adviserInfo.id + "_" + h.globalData.single.id + "_" + g.houseId,
                    imTalkType: "1",
                    pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despageForChat : "",
                    pvLastPageParams: "",
                    pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
                };
                if (console.log(n, "埋点", a.data.adviserId, a.data.videoStatus, a.data.timeUse), 
                c.trackRequest(n, h), a.data.needReLoginIM && (a.data.msgKey = "", a.data.lastMsgTime = 0, 
                a.data.tempMessages = [], a.data.localMessages = [], a.data.isFirstInitIm = !1, 
                a.data.needReLoginIM = !1, a.initIM()), 1 == a.data.videoStatus) {
                    var s = {
                        csyzwfelab20180425hhhdfq: "secretkey",
                        param: {
                            timeUse: a.data.timeUse
                        },
                        type: 500,
                        typedesc: "视频通讯成功"
                    };
                    f.sendCustomMsg({
                        text: "视频通讯成功",
                        ext: JSON.stringify(s),
                        data: ""
                    }, {
                        TYPE: u.SESSION_TYPE.C2C,
                        myselToID: a.data.adviserId
                    }, h.globalData.identifier), a.data.videoStatus = null;
                }
                if (2 == a.data.videoStatus) {
                    var o = {
                        csyzwfelab20180425hhhdfq: "secretkey",
                        type: 501,
                        typedesc: "视频通讯失败"
                    };
                    f.sendCustomMsg({
                        text: "视频通讯失败",
                        ext: JSON.stringify(o),
                        data: ""
                    }, {
                        TYPE: u.SESSION_TYPE.C2C,
                        myselToID: a.data.adviserId
                    }, h.globalData.identifier), a.data.videoStatus = null;
                }
                clearInterval(t);
            }
        }, 300);
    },
    onUnload: function() {
        c.stopTrackEventTimeObj(), clearInterval(null), console.log(null, "aaaaaaaaaa"), 
        this.data.videoFlag;
    },
    clearInput: function() {
        this.setData({
            currentMessage: ""
        });
    },
    inputFocus: function() {
        this.setData({
            inputFocus: !0
        });
    },
    data: {
        isFirstInitIm: !0,
        inputFocus: !1,
        activeCount: [],
        isFullScreen: !1,
        serverUrl: y,
        tempMessages: [],
        loading: !1,
        putMess: !1,
        loadMsgFlag: !1,
        customerHead: "",
        messageNone: !1,
        lastMsgTime: 0,
        msgKey: "",
        videoImg: "https://dm.static.elab-plus.com/wepy_pro/im/ekanfang.png",
        isBusy: !1,
        getFirstMsg: !1,
        isFirstSend: !0,
        showvideo: !1,
        videoFlag: !0,
        showImgModel: !1,
        videoStatus: null,
        adviserInfo: {},
        timeUse: null,
        adviserWx: "",
        tryAgainFlag: !1,
        currentPage: "chat",
        despage: "liaotianchuangkou",
        adviserPhone: "",
        toView: "",
        isGiveTel: !1,
        pdfImg: "https://dm.static.elab-plus.com/wepy_pro/im/pdf.png",
        loadingImg: "../../image/wepy_pro/loading.gif",
        scrollTop: 200,
        currentMessage: "",
        userInfo: {},
        showImModal: !1,
        showNoAdviserModal: !1,
        liudianFromPd: !1,
        imgUrl: "",
        adviserId: "",
        adviserName: "",
        backButton: y + "im/back-button.png",
        busyButton: y + "im/online.png",
        dialog: !1,
        localMessages: [],
        Identifier: null,
        autoRepeatList: [],
        autoRepeatTitleText: "",
        autoRepeatEndText: "",
        UserSig: null,
        needReLoginIM: !1,
        leaveTelFlag: !1,
        verifyText: "获取验证码",
        flag: !1,
        showTelBox: !1,
        tel: "",
        verifyCode: "",
        isSendImg: !1,
        buttonClicked: !0,
        isFirstPd: null,
        isPushToService: !0,
        isBindStatus: null,
        isPd: null,
        showImModalTimeLost: !1
    },
    bindConfirm: function(e) {
        var t = this, a = this.data.currentMessage;
        a.replace(/^\s*|\s*$/g, "") && f.onSendMsg(a, {
            TYPE: u.SESSION_TYPE.C2C,
            myselToID: t.data.adviserId
        }, h.globalData.identifier, function(e) {
            t.receiveMsgs(e, !0), t.clearInput();
        });
    },
    goBack: function() {},
    deny: function() {
        var e = this, t = {
            csyzwfelab20180425hhhdfq: "secretkey",
            type: 505,
            typedesc: "获取手机号码"
        };
        f.sendCustomMsg({
            text: "[用户已拒绝]",
            ext: JSON.stringify(t),
            data: ""
        }, {
            TYPE: u.SESSION_TYPE.C2C,
            myselToID: e.data.adviserId
        }, h.globalData.identifier, function(e) {}), wx.setStorageSync("isGiveTel", 1), 
        e.setData({
            isGiveTel: 1
        }), wx.showToast({
            title: "您已拒绝该请求"
        });
    },
    nextTime: function() {
        this.setData({
            showImModal: !1,
            showNoAdviserModal: !1
        });
    },
    bindImAdviser: function() {
        var e = this;
        return a(i.default.mark(function t() {
            var a, n, s, r;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a = e, n = {
                        scene: h.globalData.launchInfo && h.globalData.launchInfo.scene || "",
                        houseId: g.houseId,
                        customerId: h.globalData.single.id,
                        mobile: wx.getStorageSync("phone") || h.globalData.phone || "",
                        adviserId: e.data.adviserInfo.id,
                        shareSign: h.globalData.fromChannel
                    }, t.next = 4, (0, o.default)("bindImAdviser", n);

                  case 4:
                    (s = t.sent) && (wx.setStorageSync("isGiveTel", 2), e.setData({
                        isGiveTel: 2
                    }), s.success ? (wx.showToast({
                        title: "您已同意！",
                        icon: "success",
                        duration: 2e3
                    }), r = {
                        csyzwfelab20180425hhhdfq: "secretkey",
                        type: 503,
                        typedesc: "获取手机号码"
                    }, f.sendCustomMsg({
                        text: "[用户已同意]",
                        ext: JSON.stringify(r),
                        data: ""
                    }, {
                        TYPE: u.SESSION_TYPE.C2C,
                        myselToID: e.data.adviserId
                    }, h.globalData.identifier, function(e) {
                        a.receiveMsgs({
                            content: r
                        }, !1);
                    })) : ("CUSTOMER.HAS.BIND.ERROR" == s.errorCode && wx.showToast({
                        title: "您已被绑定",
                        icon: "success"
                    }), "CUSTOMER.MOBILE.EXSISTED" == s.errorCode && wx.showToast({
                        title: "手机号已被绑定",
                        icon: "warn"
                    }), f.onSendMsg("客户已被其他顾问绑定", {
                        TYPE: u.SESSION_TYPE.C2C,
                        myselToID: e.data.adviserId
                    }, h.globalData.identifier, function(e) {})));

                  case 6:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    showOnlineLiudian: function() {
        this.setData({
            liudianFromPd: !0
        });
    },
    admit: function() {
        this.bindImAdviser();
    },
    previewImage: function(e) {
        var t = e.target.dataset.src;
        t && wx.previewImage({
            current: t,
            urls: [ e.target.dataset.src ]
        });
    },
    tryAgain: function(e) {
        var t = this;
        t.data.tryAgainFlag || (t.data.tryAgainFlag = !0, f.onSendMsg(e.currentTarget.dataset.msg, {
            TYPE: u.SESSION_TYPE.C2C,
            myselToID: t.data.adviserId
        }, h.globalData.identifier, function(a) {
            wx.setStorageSync("isSend" + g.houseId, !0), t.data.localMessages.splice(e.currentTarget.dataset.index, 1), 
            t.data.tempMessages.splice(e.currentTarget.dataset.index, 1), console.log(t.data.localMessages), 
            t.data.tryAgainFlag = !1, t.receiveMsgs(a, !0), t.data.isBusy && t.receiveMsgs({
                content: "您好，非常抱歉，我正在为其他用户服务，稍后回复您！",
                type: !1
            }, !1);
        }, function(e) {
            t.data.tryAgainFlag = !1, t.receiveMsgs(e, !0, !0);
        }));
    },
    receiveMsgs: function(e, t, a) {
        e.local = t, e.time = c.formatTodayTime(new Date());
        var n = this.data.localMessages || [], s = this.data.tempMessages;
        a && (e.failed = !0), n.length > 0 && n[n.length - 1].local == e.local ? n[n.length - 1].content && 503 == n[n.length - 1].content.type ? e.showHead = !0 : e.showHead = !1 : e.showHead = !0, 
        s.push(e), n.push(e), this.setData({
            tempMessages: s,
            localMessages: n
        }), console.log(this.data.localMessages, "hhhh"), this.setData({
            toView: "hei"
        });
    },
    goVideo: function(e) {
        if (this.data.buttonClicked) {
            c.buttonClicked(this, 1e3);
            var t, a = e.currentTarget.dataset.istoself;
            t = a ? e.currentTarget.dataset.consultantid : "";
            var n = this, s = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - wx.getStorageSync("loadTime")) / 1e3,
                clkDesPage: "ekanfangjietongye",
                clkName: "shipin_guwentuisong",
                pvCurPageName: "liaotianchuangkou",
                clkId: "clk_2cmina_40",
                clkParams: ""
            };
            c.trackRequest(s, h), wx.getSetting({
                success: function(e) {
                    console.log("***rtcroomCom.onLoad***getSetting", e), e.authSetting["scope.record"] ? e.authSetting["scope.camera"] ? (n.data.needReLoginIM = !0, 
                    wx.navigateTo({
                        url: "../multiroom/aide/aide?isSuc=1&consultantId=" + t
                    })) : wx.authorize({
                        scope: "scope.camera",
                        success: function() {
                            n.data.needReLoginIM = !0, wx.navigateTo({
                                url: "../multiroom/aide/aide?isSuc=1&consultantId=" + t
                            });
                        },
                        fail: function() {
                            n.myLoading.hideLoading(), n.setData({
                                showImgModel: !0
                            });
                        }
                    }) : wx.authorize({
                        scope: "scope.record",
                        success: function() {
                            e.authSetting["scope.camera"] ? (n.data.needReLoginIM = !0, wx.navigateTo({
                                url: "../multiroom/aide/aide?isSuc=1&consultantId=" + t
                            })) : wx.authorize({
                                scope: "scope.camera",
                                success: function() {
                                    n.data.needReLoginIM = !0, wx.navigateTo({
                                        url: "../multiroom/aide/aide?isSuc=1&consultantId=" + t
                                    });
                                },
                                fail: function(e) {
                                    n.myLoading.hideLoading(), n.setData({
                                        showImgModel: !0
                                    });
                                }
                            });
                        },
                        fail: function() {
                            n.myLoading.hideLoading(), n.setData({
                                showImgModel: !0
                            });
                        }
                    });
                },
                fail: function() {
                    wx.showToast({
                        title: "系统提示:网络错误",
                        icon: "warn",
                        duration: 1500
                    });
                }
            });
        }
    },
    playSound: function(e) {
        var t = this, a = e.currentTarget.dataset.index, o = e.currentTarget.dataset.uuid;
        if (n && n.uuid) if (n.uuid == o) console.log("本次播放为同一个音源"), S ? (console.log("存在计时器，手动暂停"), 
        n.pause()) : (console.log("不存在计时器，再次播放"), n.play()); else {
            console.log("本次触发音源与正在播放音源不同，重新播放，删除正在播放音源"), clearInterval(S), S = null, this.setData({
                activeCount: []
            }), n.destroy(), n = null;
            var i = wx.createInnerAudioContext();
            i.src = e.currentTarget.dataset.url, i.uuid = o, (n = i).play();
        } else {
            console.log("第一次听，创建音源");
            var r = wx.createInnerAudioContext();
            r.src = e.currentTarget.dataset.url, r.uuid = o, n = r, console.log(n, s(n.play)), 
            setTimeout(function() {
                n.play();
            }, 300);
        }
        n.onCanplay(function() {
            console.log("可以播放");
        }), n.onWaiting(function(e) {
            console.log("等待", e);
        }), n.onError(function(e) {
            console.log("播放失败！", e);
        }), n.onEnded(function() {
            n && n.destroy(), n = null, clearInterval(S), S = null, t.setData({
                activeCount: []
            }), console.log("当前播放结束");
        }), n.onPause(function() {
            clearInterval(S), S = null, t.setData({
                activeCount: []
            }), console.log("当前播放暂停");
        }), n.onPlay(function() {
            console.log("当前播放开始"), S || (S = setInterval(function() {
                var e = t.data.activeCount;
                e[a] = (void 0 == e[a] ? 19 : e[a]) - 19, t.setData({
                    activeCount: e
                }), console.log(t.data.activeCount);
            }, 500));
        }), console.log(n);
    },
    initIM: function() {
        var e = this, t = setInterval(function() {
            h.globalData.single && h.globalData.userSig && (m.setListener({
                onMsgNotify: e.onMsgNotify,
                onDestoryGroupNotify: f.onDestoryGroupNotify,
                onCustomGroupNotify: f.onCustomGroupNotify,
                onLoginSuccess: e.loadMessage
            }), m.loginIM({
                type: 0,
                adviserId: e.data.adviserId
            }), clearInterval(t));
        }, 300);
    },
    onMsgNotify: function(e) {
        I && (clearTimeout(I), I = null);
        var t = this, a = getCurrentPages();
        if (a[a.length - 1].data.currentPage && "chat" === a[a.length - 1].data.currentPage) {
            var n = wx.getStorageSync("unReadMsgs");
            n[e.fromAccountNick]--, n.total--, wx.setStorageSync("unReadMsgs", n), console.log("chat页面收到消息");
        }
        wx.setStorageSync("isSend" + g.houseId, !0), t.data.getFirstMsg || t.setData({
            getFirstMsg: !0
        });
        var s = "【系统消息】该用户当前登录方式为微信小程序登录，无法使用此功能";
        if (e.content && 102 == e.content.type || 512 == e.content.type) f.onSendMsg(s, {
            TYPE: u.SESSION_TYPE.C2C,
            myselToID: e.fromAccountNick
        }); else if (e.content && 502 == e.content.type) {
            if (console.log(e), !e.content.param.isShowInvitation) return void console.log("150723");
            if (e.fromAccountNick != t.data.adviserId || !wx.getStorageSync("phone") && !h.globalData.phone) return void f.onSendMsg("【系统消息】当前用户未授权手机号，暂时无法获取。请通过聊天方式索取客户手机号码！", {
                TYPE: u.SESSION_TYPE.C2C,
                myselToID: e.fromAccountNick
            });
            wx.setStorageSync("isGiveTel", !1), t.setData({
                isGiveTel: !1
            }), e.content.isover = !1, t.receiveMsgs(e, !1);
        } else {
            if (e.content && 513 == e.content.type || 504 == e.content.type) return;
            e.content && "string" == typeof e.content && e.content.includes("onChangePlayAudio") ? f.onSendMsg(s, {
                TYPE: u.SESSION_TYPE.C2C,
                myselToID: e.fromAccountNick
            }) : e.fromAccountNick == t.data.adviserId && t.receiveMsgs(e, !1);
        }
    },
    scrollTop: function() {
        this.data.messageNone && this.data.putMess && (this.setData({
            putMess: !1
        }), this.loadMessage());
    },
    loadMessage: function() {
        var e = this;
        console.log("开始获取历史消息", new Date() - v);
        var a = this;
        this.setData({
            loading: !0
        }), setTimeout(function() {
            e.setData({
                loading: !1
            });
        }, 2e3), f.getC2CHistoryMsgs(function(e, t, n) {
            if (console.log(new Date().getTime() - v, "渲染数据时间", e.elems[0].content), console.log(a.data.localMessages, a.data.tempMessages), 
            e.elems[0].content.ext) {
                var s = JSON.parse(e.elems[0].content.ext), o = a.data.tempMessages;
                if (t) {
                    513 == s.type || 504 == s.type || 512 == s.type || 505 == s.type || 501 == s.type || 500 == s.type || (e.elems[0].content = s, 
                    515 == e.elems[0].content.type || 516 == e.elems[0].content.type || 520 == e.elems[0].content.type || 521 == e.elems[0].content.type ? e.elems[0].local = !1 : e.elems[0].local = !0, 
                    e.elems[0].time = c.formatTodayTime(new Date(1e3 * e.time)), o.unshift(e.elems[0]), 
                    a.setData({
                        tempMessages: o
                    })), o[0].showHead = !0;
                    for (var i = 1; i < o.length; i++) o[i - 1].local == o[i].local ? o[i - 1].content && 503 == o[i - 1].content.type ? o[i].showHead = !0 : o[i].showHead = !1 : o[i].showHead = !0;
                    return a.setData({
                        localMessages: JSON.parse(JSON.stringify(a.data.tempMessages))
                    }), console.log("临时数据转移数据到显示层", a.data.localMessages), void (n && a.setData({
                        toView: "hei"
                    }));
                }
                if (513 == s.type || 504 == s.type || 512 == s.type || 505 == s.type || 501 == s.type || 500 == s.type) return;
                return e.elems[0].content = s, 515 == e.elems[0].content.type || 516 == e.elems[0].content.type || 520 == e.elems[0].content.type || 521 == e.elems[0].content.type ? e.elems[0].local = !1 : e.elems[0].local = !0, 
                e.elems[0].time = c.formatTodayTime(new Date(1e3 * e.time)), (o = a.data.tempMessages).unshift(e.elems[0]), 
                void a.setData({
                    tempMessages: o
                });
            }
            if (e.elems[0].content.text) {
                if (e.elems[0].content.text.includes("【系统消息】") || e.elems[0].content.text.includes("顾问不存在")) return;
                if (e.elems[0].content.text.indexOf("该手机号码已被其他顾问绑定") > -1) return;
                if (e.elems[0].content.text.indexOf("csyzwfelab20180425hhhdfq") > -1) {
                    if (513 == (s = JSON.parse(e.elems[0].content.text)).type || 504 == s.type || 512 == s.type || 505 == s.type || 501 == s.type || 500 == s.type) return;
                    if (502 == s.type && !wx.getStorageSync("phone") && !h.globalData.phone) return;
                    if (e.elems[0].content = s, 515 == e.elems[0].content.type || 516 == e.elems[0].content.type) {
                        if (e.elems[0].local = !1, e.elems[0].time = c.formatTodayTime(new Date(1e3 * e.time)), 
                        (o = a.data.tempMessages).unshift(e.elems[0]), a.setData({
                            tempMessages: o
                        }), t) {
                            o[0].showHead = !0;
                            for (var r = 1; r < o.length; r++) o[r - 1].local == o[r].local ? o[r - 1].content && 503 == o[r - 1].content.type ? o[r].showHead = !0 : o[r].showHead = !1 : o[r].showHead = !0;
                            a.setData({
                                localMessages: JSON.parse(JSON.stringify(a.data.tempMessages))
                            }), console.log("临时数据转移数据到显示层", a.data.localMessages), n && a.setData({
                                toView: "hei"
                            });
                        }
                        return;
                    }
                } else e.elems[0].content = e.elems[0].content.text;
            }
            if (e.elems[0].content.second, e.fromAccount == h.globalData.identifier ? e.elems[0].local = !0 : e.elems[0].local = !1, 
            e.elems[0].time = c.formatTodayTime(new Date(1e3 * e.time)), (o = a.data.tempMessages).unshift(e.elems[0]), 
            a.setData({
                tempMessages: o
            }), t) {
                o[0].showHead = !0;
                for (var l = 1; l < o.length; l++) o[l - 1].local == o[l].local ? o[l - 1].content && 503 == o[l - 1].content.type ? o[l].showHead = !0 : o[l].showHead = !1 : o[l].showHead = !0;
                a.setData({
                    localMessages: JSON.parse(JSON.stringify(a.data.tempMessages))
                }), console.log("临时数据转移数据到显示层", a.data.localMessages), n && a.setData({
                    toView: "hei"
                });
            }
        }, a.data.msgKey, a.data.lastMsgTime, function(e, t) {
            a.setData({
                loading: !1,
                msgKey: e,
                lastMsgTime: t,
                putMess: !0,
                messageNone: !0
            });
        }, function() {
            a.setData({
                loading: !1,
                messageNone: !1
            });
        }, function() {
            setTimeout(function() {
                h.globalData.autoTextFromCalc && f.onSendMsg(h.globalData.autoTextFromCalc, {
                    TYPE: u.SESSION_TYPE.C2C,
                    myselToID: a.data.adviserId
                }, h.globalData.identifier, function(e) {
                    wx.setStorageSync("isSend" + g.houseId, !0);
                    var t = {
                        type: "CLK",
                        adviserId: a.data.adviserInfo.id,
                        imTalkId: a.data.adviserInfo.id + "_" + h.globalData.single.id + "_" + g.houseId,
                        imTalkType: "1",
                        clkName: "dianjifasong",
                        pvCurPageName: "liaotianchuangkou",
                        pvCurPageParams: T,
                        pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despageForChat : "",
                        clkId: "clk_2cmina_27",
                        clkParams: {
                            msg: h.globalData.autoTextFromCalc,
                            contentType: "text"
                        }
                    };
                    h.globalData.autoTextFromCalc = null, c.trackRequest(t, h), a.receiveMsgs(e, !0);
                }, function(e) {
                    a.receiveMsgs(e, !0, !0);
                }), a.sendAutoRepeat();
                var e = h.globalData.imHelloWord ? h.globalData.imHelloWord : "您好，我是项目的置业顾问，请问您想咨询什么问题？我在这里为您快速解答。";
                console.log(e);
                var n = {
                    csyzwfelab20180425hhhdfq: "secretkey",
                    param: {
                        text: e
                    },
                    type: 515,
                    typedesc: e
                };
                (wx.getStorageSync("firstRepeatList")[a.data.adviserInfo.id] || !1) == new Date().getDate() || (f.sendCustomMsg({
                    text: e,
                    ext: JSON.stringify(n),
                    data: ""
                }, {
                    TYPE: u.SESSION_TYPE.C2C,
                    myselToID: a.data.adviserId
                }, h.globalData.identifier, function(t) {
                    a.receiveMsgs({
                        content: e,
                        type: !1
                    }, !1), wx.setStorageSync("needRepeatTo" + a.data.adviserId, new Date().getTime()), 
                    a.pushIMInfo(), a.getCustomerDetail();
                }), wx.setStorageSync("firstRepeatList", Object.assign(wx.getStorageSync("firstRepeatList") || {}, t({}, a.data.adviserInfo.id, new Date().getDate()))));
            }, 2e3);
        }, function(e) {
            setTimeout(function() {
                a.loadMessage();
            }, 1e3), console.log(e);
        });
    },
    sendAutoRepeat: function() {
        var e = this, t = this, a = wx.getStorageSync("needAutoRepeatList") || [];
        if (console.log(a, "已知缓存自动回复列表", this.data.adviserId), a.indexOf(this.data.adviserId) > -1) return !1;
        var n = this.data.autoRepeatTitleText || "", s = this.data.autoRepeatEndText || "", o = this.data.autoRepeatList;
        if (!n && !s && !o) return !1;
        var i = {
            csyzwfelab20180425hhhdfq: "secretkey",
            param: {
                textStart: n,
                textEnd: s,
                textList: o
            },
            type: 520,
            typedesc: n
        };
        setTimeout(function() {
            f.sendCustomMsg({
                text: n,
                ext: JSON.stringify(i),
                data: ""
            }, {
                TYPE: u.SESSION_TYPE.C2C,
                myselToID: t.data.adviserId
            }, h.globalData.identifier, function(e) {
                t.receiveMsgs({
                    content: i,
                    type: !1
                }, !1);
            }), a.push(e.data.adviserId), wx.setStorageSync("needAutoRepeatList", a);
        }, 2e3);
    },
    getCustomerDetail: function() {
        var e = this;
        return a(i.default.mark(function t() {
            var a, n, s;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a = {
                        adviserId: e.data.adviserInfo.id,
                        customerId: h.globalData.single.id,
                        houseId: g.houseId
                    }, t.next = 3, (0, o.default)("getCustomerDetail", a);

                  case 3:
                    if (!(n = t.sent) || !n.success) {
                        t.next = 12;
                        break;
                    }
                    return console.log(n, "ffff"), "小程序用户" == n.single.nameRemark && (n.single.nameRemark = !1), 
                    a = {
                        param: {
                            name: n.single.nameRemark || h.globalData.single.nickname || n.single.mobileRemark || h.globalData.phone || "小程序客户"
                        },
                        phoneNumber: e.data.adviserInfo.mobile
                    }, t.next = 10, (0, o.default)("chatSms", a);

                  case 10:
                    s = t.sent, console.log(s);

                  case 12:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    pushIMInfo: function() {
        var e = this;
        return a(i.default.mark(function t() {
            var a, n;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a = {
                        houseId: g.houseId,
                        receiver: e.data.adviserInfo.id,
                        businessType: 1,
                        workId: h.globalData.single.id,
                        title: "消息通知顾问",
                        code: "PUSH_003",
                        pushContent: "已有客户发起在线咨询，请及时回复",
                        receiverType: "adviser"
                    }, t.next = 3, (0, o.default)("pushIMInfo", a);

                  case 3:
                    n = t.sent, console.log(n);

                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    prevent: function(e) {},
    showDialog: function(e) {
        e.currentTarget.dataset.url && this.setData({
            imgUrl: encodeURI(decodeURIComponent(e.currentTarget.dataset.url))
        }), e.currentTarget.dataset.showvideo && this.setData({
            showvideo: e.currentTarget.dataset.showvideo
        }), this.setData({
            dialog: e.currentTarget.dataset.dialog
        });
    },
    fun: function(e) {
        console.log(e, "fun");
    },
    onReady: function() {
        this.myLoading = this.selectComponent("#myLoading"), this.myLoading.hideLoading();
    },
    initAdviserInfo: function(e) {
        var t = this;
        return a(i.default.mark(function a() {
            var n, s, r;
            return i.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return n = e, wx.setNavigationBarTitle({
                        title: "顾问" + n.name || ""
                    }), t.setData({
                        customerHead: wx.getStorageSync("userInfo") && wx.getStorageSync("userInfo").avatarUrl || "https://dm.static.elab-plus.com/wepy_pro/im/default-head-icon.png",
                        adviserInfo: n,
                        adviserId: n.id + "_" + n.houseId,
                        adviserWx: e.wxno || "",
                        isBusy: e.onlineStatus || !1,
                        showTelBox: e.onlineStatus || !1,
                        busyButton: e.onlineStatus ? y + "im/offline.png" : y + "im/online.png",
                        adviserPhone: e.mobile || "",
                        adviserName: n.name || "顾问"
                    }), console.log(h.globalData.single, "23333333333333333333333333333333333333333333333"), 
                    (s = wx.getStorageSync("unReadMsgs"))[t.data.adviserId] && (s.total = s.total - s[t.data.adviserId], 
                    s[t.data.adviserId] = 0, wx.setStorageSync("unReadMsgs", s)), t.initIM(), a.next = 9, 
                    (0, o.default)("connect", {
                        adviserId: n.id,
                        customerId: h.globalData.single.id,
                        houseId: g.houseId
                    });

                  case 9:
                    r = a.sent;

                  case 10:
                  case "end":
                    return a.stop();
                }
            }, a, t);
        }))();
    },
    selfInfo: function(e) {
        var t = this;
        return a(i.default.mark(function a() {
            var n;
            return i.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.next = 2, (0, o.default)("selfInfo", {
                        adviserId: e
                    });

                  case 2:
                    (n = a.sent) && n.success && t.initAdviserInfo(n.single);

                  case 4:
                  case "end":
                    return a.stop();
                }
            }, a, t);
        }))();
    },
    detail: function() {
        var e = this;
        return a(i.default.mark(function t() {
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    h.globalData.videoFigure && e.setData({
                        videoImg: h.globalData.videoFigure
                    });

                  case 1:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    getCurrentPageParam: function() {
        return T;
    },
    onLoad: function(e) {
        T = JSON.stringify(e), h.systemInfo.screenHeight > 735 && h.systemInfo.screenWidth < 500 && this.setData({
            isFullScreen: !0
        }), e.tfbContentId && (h.globalData.exchangedFromChannel = JSON.stringify({
            tfbContentId: e.tfbContentId
        }));
        var t = this;
        h.login(function(a) {
            h.globalData.single || wx.showModal({
                title: "登录失败",
                content: "很抱歉，一对一在线咨询暂时无法使用，请重新打开小程序后使用此功能",
                confirmText: "我知道了",
                success: function(e) {
                    wx.navigateBack({});
                }
            }), e && e.adviserId ? (t.data.adviserInfo.id = e.adviserId, t.selfInfo(e.adviserId)) : (t.data.adviserInfo = JSON.parse(wx.getStorageSync("adviserInfo")), 
            t.setData({
                isBindStatus: JSON.parse(wx.getStorageSync("adviserInfo")).bindStatus
            }), t.selfInfo(JSON.parse(wx.getStorageSync("adviserInfo")).id)), e && e.isPd && (t.data.isPd = !0), 
            v = new Date().getTime(), console.log(e, "yuu", v, t.data.videoStatus, t.data.timeUse), 
            !0 === wx.getStorageSync("isGiveTel") && (wx.setStorageSync("isGiveTel", 2), t.setData({
                isGiveTel: 2
            })), console.log("开始调用IM接口", new Date() - v);
        }), t.detail(), t.getAutoRepeatList();
    },
    lostFocus: function() {
        this.data.inputFocus = !1, this.data.showImModalTimeLost && (this.setData({
            showImModal: !0
        }), this.data.showImModalTimeLost = !1);
    },
    pdTimeoutRepeatShow: function() {
        var e = this;
        return a(i.default.mark(function t() {
            var a, n, s;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (!((a = wx.getStorageSync("isFirstPdList") || []).indexOf(e.data.adviserInfo.id || "") > -1)) {
                        t.next = 5;
                        break;
                    }
                    e.data.isFirstPd = !1, t.next = 12;
                    break;

                  case 5:
                    return n = 3e4, t.next = 8, (0, o.default)("adviserResponseTime", {
                        houseId: g.houseId,
                        adviserId: 1111
                    }, !0);

                  case 8:
                    (s = t.sent).success && s.single && (n = 1e3 * s.single.settingResponseTime || 3e4), 
                    console.log("自动倒计时开始", n, "秒"), I = setTimeout(function() {
                        a.push(e.data.adviserId), wx.setStorageSync("isFirstPdList", a), 0 == e.data.inputFocus ? e.setData({
                            showImModal: !0
                        }) : e.setData({
                            showImModalTimeLost: !0
                        }), clearTimeout(I), I = null;
                    }, n);

                  case 12:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    goPdAction: function() {
        var e = this;
        return a(i.default.mark(function t() {
            var a;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e.myLoading.showLoading(), t.next = 3, (0, o.default)("getPdInfo", {
                        houseId: g.houseId,
                        pageNo: 1,
                        customerId: h.globalData.single.id,
                        pageSize: 10,
                        scene: h.globalData.launchInfo && h.globalData.launchInfo.scene || "",
                        shareSign: h.globalData.fromChannel
                    });

                  case 3:
                    (a = t.sent).success && a.single ? (e.myLoading.hideLoading(), wx.redirectTo({
                        url: "/pages/chat/chat?adviserId=" + a.single.id + "&isPd=1"
                    })) : e.setData({
                        showNoAdviserModal: !0
                    });

                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    getAutoRepeatList: function() {
        var e = this;
        return a(i.default.mark(function t() {
            var a;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, o.default)("getAutoRepeatList", {
                        houseId: g.houseId
                    });

                  case 2:
                    (a = t.sent) && a.success && e.setData({
                        autoRepeatTitleText: a.guideLanguage || null,
                        autoRepeatEndText: a.endLanguage || null,
                        autoRepeatList: a.list || null
                    });

                  case 4:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    goH5: function(e) {
        wx.setStorageSync("h5page", e.currentTarget.dataset.url), console.log(e.currentTarget.dataset.url, "uuuuu"), 
        console.log(decodeURI(e.currentTarget.dataset.url)), console.log(encodeURIComponent(e.currentTarget.dataset.url)), 
        wx.navigateTo({
            url: "../webView/webView?view=" + encodeURIComponent(e.currentTarget.dataset.url),
            success: function() {},
            fail: function(e) {
                console.log(e);
            }
        });
    },
    goVideoPage: function(e) {
        this.setData({
            videoFlag: !1
        }), wx.navigateTo({
            url: "../video/video?source=" + e.currentTarget.dataset.url
        });
    },
    goPDF: function(e) {
        wx.downloadFile({
            url: e.currentTarget.dataset.url,
            success: function(e) {
                var t = e.tempFilePath;
                wx.openDocument({
                    filePath: t,
                    success: function(e) {
                        console.log("打开文档成功");
                    }
                });
            }
        });
    },
    sendAutoQuestion: function(e) {
        var t = this, a = e.currentTarget.dataset.message.customerQuestion || "";
        f.onSendMsg(a, {
            TYPE: u.SESSION_TYPE.C2C,
            myselToID: t.data.adviserId
        }, h.globalData.identifier, function(n) {
            wx.setStorageSync("isSend" + g.houseId, !0);
            var s = {
                type: "CLK",
                adviserId: t.data.adviserInfo.id,
                imTalkId: t.data.adviserInfo.id + "_" + h.globalData.single.id + "_" + g.houseId,
                imTalkType: "1",
                clkName: "dianjifasong",
                pvCurPageName: "liaotianchuangkou",
                pvCurPageParams: T,
                pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despageForChat : "",
                clkId: "clk_2cmina_27",
                clkParams: {
                    msg: a,
                    contentType: "hotKey"
                }
            };
            c.trackRequest(s, h), t.receiveMsgs(n, !0), t.isInChatPage(e);
        }, function(e) {
            t.receiveMsgs(e, !0, !0);
        });
    },
    isInChatPage: function(e) {
        var t = this, a = e.currentTarget.dataset.message.automaticResponse || "", n = h.globalData.adviserOnlineStatusSocket, s = !1;
        if (console.log(n), n.forEach(function(e) {
            e.adviserId == t.data.adviserInfo.id && 1 == e.onlineStatus && (s = !0);
        }), !s) {
            var o = {
                csyzwfelab20180425hhhdfq: "secretkey",
                param: {
                    text: a
                },
                type: 521,
                typedesc: a
            };
            setTimeout(function() {
                f.sendCustomMsg({
                    text: a,
                    ext: JSON.stringify(o),
                    data: ""
                }, {
                    TYPE: u.SESSION_TYPE.C2C,
                    myselToID: t.data.adviserId
                }, h.globalData.identifier, function(e) {
                    t.receiveMsgs({
                        content: o,
                        type: !1
                    }, !1);
                });
            }, 1e3);
        }
    },
    bindButtonTap: function() {
        var e = this;
        return a(i.default.mark(function t() {
            var a, n, s;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a = e, t.next = 3, (0, o.default)("updateDispatchStatus", {
                        adviserId: a.data.adviserInfo.id,
                        customerId: h.globalData.single.id,
                        houseId: g.houseId,
                        clientType: 0
                    }, !0);

                  case 3:
                    if (n = t.sent, e.data.isFirstSend && (e.data.isPd && e.pdTimeoutRepeatShow(), e.setData({
                        isFirstSend: !1
                    })), a = e, (s = a.data.currentMessage).replace(/^\s*|\s*$/g, "")) {
                        t.next = 9;
                        break;
                    }
                    return t.abrupt("return");

                  case 9:
                    f.onSendMsg(a.data.currentMessage, {
                        TYPE: u.SESSION_TYPE.C2C,
                        myselToID: a.data.adviserId
                    }, h.globalData.identifier, function(e) {
                        wx.setStorageSync("isSend" + g.houseId, !0);
                        var t = {
                            type: "CLK",
                            adviserId: a.data.adviserInfo.id,
                            imTalkId: a.data.adviserInfo.id + "_" + h.globalData.single.id + "_" + g.houseId,
                            imTalkType: "1",
                            clkName: "dianjifasong",
                            pvCurPageName: "liaotianchuangkou",
                            pvCurPageParams: T,
                            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despageForChat : "",
                            clkId: "clk_2cmina_27",
                            clkParams: {
                                msg: s,
                                contentType: "text"
                            }
                        };
                        c.trackRequest(t, h), a.receiveMsgs(e, !0);
                    }, function(e) {
                        a.receiveMsgs(e, !0, !0);
                    }), 1 == e.data.isPushToService && e.pushMessageToService(), e.setData({
                        currentMessage: ""
                    });

                  case 12:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    pushMessageToService: function() {
        var e = this;
        return a(i.default.mark(function t() {
            var a, n;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a = e.data.currentMessage.replace(new RegExp([ "\ud83c[\udf00-\udfff]", "\ud83d[\udc00-\ude4f]", "\ud83d[\ude80-\udeff]" ].join("|"), "g"), "/表情/"), 
                    t.next = 3, (0, o.default)("insertOrUpdate", {
                        adviserId: e.data.adviserInfo.id,
                        houseId: g.houseId,
                        customerId: h.globalData.single.id,
                        tag: 1,
                        customerWord: a
                    }, !0);

                  case 3:
                    n = t.sent, e.data.isPushToService = !1;

                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    bindKeyInput: function(e) {
        this.setData({
            currentMessage: e.detail.value
        });
    },
    getShareProgram: function() {
        this.setData({
            showImgModel: !1
        });
    },
    bindTel: function(e) {
        this.setData({
            tel: e.detail.value
        });
    },
    showTelBox: function() {
        this.setData({
            showTelBox: !1
        });
    },
    callTel: function() {
        var e = this;
        wx.makePhoneCall({
            phoneNumber: e.data.adviserPhone
        });
    },
    getVerifyCode: function() {
        var e = this;
        /^1\d{10}$/.test(e.data.tel) ? e.data.leaveTelFlag || (e.data.leaveTelFlag = !0, 
        e.querySendCode()) : wx.showToast({
            title: "输入的手机号不合法",
            icon: "none",
            duration: 2e3
        });
    },
    querySendCode: function() {
        var e = this;
        return a(i.default.mark(function t() {
            var a, n, s;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, o.default)("querySendCode", {
                        phoneNumber: e.data.tel,
                        houseId: g.houseId
                    });

                  case 2:
                    a = t.sent, e.data.leaveTelFlag = !1, a && a.success ? (n = 60, s = setInterval(function() {
                        n > 0 ? (n -= 1, e.setData({
                            verifyText: n + "秒后获取"
                        })) : (e.setData({
                            verifyText: "获取验证码"
                        }), clearInterval(s));
                    }, 1e3)) : wx.showToast({
                        title: "系统提示:网络错误",
                        icon: "none",
                        duration: 2e3
                    });

                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    uploadImgs: function() {
        var e = this;
        return a(i.default.mark(function t() {
            var n;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    e.data.isSendImg = !0, n = e, wx.chooseImage({
                        count: 9,
                        sizeType: [ "original", "compressed" ],
                        sourceType: [ "album", "camera" ],
                        success: function(e) {
                            var t = this;
                            return a(i.default.mark(function s() {
                                var o, r, m, p, v;
                                return i.default.wrap(function(s) {
                                    for (;;) switch (s.prev = s.next) {
                                      case 0:
                                        return o = e.tempFilePaths, s.next = 3, (0, d.default)("getUploadToken");

                                      case 3:
                                        r = s.sent, m = r.single, p = m.token, v = m.resultUrl, o.forEach(function() {
                                            var e = a(i.default.mark(function e(a) {
                                                var s, o, r, d;
                                                return i.default.wrap(function(e) {
                                                    for (;;) switch (e.prev = e.next) {
                                                      case 0:
                                                        return e.next = 2, (0, l.uploadImageFiles)(p, a);

                                                      case 2:
                                                        s = e.sent, console.log("qnkey", s), o = "" + v + s, r = void 0, d = void 0, console.log(o), 
                                                        wx.getImageInfo({
                                                            src: o,
                                                            success: function(e) {
                                                                r = e.width, d = e.height;
                                                                var t = {
                                                                    param: {
                                                                        linkedUrl: o,
                                                                        url: o,
                                                                        width: r,
                                                                        height: d
                                                                    },
                                                                    csyzwfelab20180425hhhdfq: "secretkey",
                                                                    type: 509,
                                                                    typedesc: "图片"
                                                                };
                                                                console.log(t), f.sendCustomMsg({
                                                                    text: "[图片]",
                                                                    ext: JSON.stringify(t),
                                                                    data: ""
                                                                }, {
                                                                    TYPE: u.SESSION_TYPE.C2C,
                                                                    myselToID: n.data.adviserId
                                                                }, h.globalData.identifier, function(e) {
                                                                    var a = {
                                                                        type: "CLK",
                                                                        adviserId: n.data.adviserInfo.id,
                                                                        imTalkId: n.data.adviserInfo.id + "_" + h.globalData.single.id + "_" + g.houseId,
                                                                        imTalkType: "1",
                                                                        clkName: "dianjifasong",
                                                                        pvCurPageName: "liaotianchuangkou",
                                                                        pvCurPageParams: T,
                                                                        pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despageForChat : "",
                                                                        clkId: "clk_2cmina_27",
                                                                        clkParams: {
                                                                            msg: o,
                                                                            contentType: "image"
                                                                        }
                                                                    };
                                                                    c.trackRequest(a, h), n.receiveMsgs({
                                                                        content: t
                                                                    }, !0);
                                                                });
                                                            },
                                                            fail: function(e) {
                                                                console.log("***uploadImgs-getImageInfo-fail***", e);
                                                                var t = {
                                                                    type: "mini-program-Error",
                                                                    pvPageStayTime: new Date().getTime() / 1e3,
                                                                    adviserId: "",
                                                                    imTalkId: "",
                                                                    imTalkType: "",
                                                                    pvCurPageName: "chat.js-uploadImgs-getImageInfo",
                                                                    clkDesPage: "",
                                                                    clkName: "",
                                                                    clkId: "",
                                                                    expand: JSON.stringify(e) + ";houseId=" + g.houseId
                                                                };
                                                                c.trackRequest(t);
                                                            }
                                                        });

                                                      case 8:
                                                      case "end":
                                                        return e.stop();
                                                    }
                                                }, e, t);
                                            }));
                                            return function(t) {
                                                return e.apply(this, arguments);
                                            };
                                        }());

                                      case 6:
                                      case "end":
                                        return s.stop();
                                    }
                                }, s, t);
                            }))();
                        },
                        fail: function(e) {
                            console.log("***uploadImgs-fail***", e);
                            var t = {
                                type: "mini-program-Error",
                                pvPageStayTime: new Date().getTime() / 1e3,
                                adviserId: "",
                                imTalkId: "",
                                imTalkType: "",
                                pvCurPageName: "chat.js-uploadImgs",
                                clkDesPage: "",
                                clkName: "",
                                clkId: "",
                                expand: JSON.stringify(e) + ";houseId=" + g.houseId
                            };
                            c.trackRequest(t);
                        }
                    });

                  case 3:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    sendTel: function() {
        var e = this;
        if (!e.data.flag) {
            if (e.data.flag = !0, !/^1\d{10}$/.test(e.data.tel)) return wx.showToast({
                title: "请输入正确的手机号",
                icon: "none",
                duration: 2e3
            }), void (e.data.flag = !1);
            if (console.log(e.data.verifyCode.length), e.data.verifyCode.length < 1) return wx.showToast({
                title: "验证码不能为空",
                icon: "none",
                duration: 2e3
            }), void (e.data.flag = !1);
            e.leavePhone();
        }
    },
    leavePhone: function() {
        var e = this;
        return a(i.default.mark(function t() {
            var a, n, s;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a = {
                        houseId: g.houseId,
                        scene: h.globalData.launchInfo && h.globalData.launchInfo.scene || "",
                        customerId: h.globalData.single && h.globalData.single.id,
                        shareSign: h.globalData.fromChannel,
                        mobile: e.data.tel,
                        verifyCode: e.data.verifyCode,
                        dynamicSource: "1",
                        source: "3"
                    }, t.next = 3, (0, o.default)("leavePhone", a);

                  case 3:
                    (n = t.sent) && n.success ? (e.setData({
                        showTelBox: !1
                    }), wx.showToast({
                        title: "感谢留电，我们将在第一时间电话联系您。",
                        icon: "none",
                        duration: 2e3
                    }), e.setData({
                        liudianFromPd: !1
                    })) : (e.data.flag = !1, s = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "chat.js-leavePhone",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(n) + JSON.stringify(a) + ";houseId=" + g.houseId
                    }, c.trackRequest(s), wx.showToast({
                        title: n.message || "系统提示:网络错误",
                        icon: "none",
                        duration: 2e3
                    }));

                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    verifyCode: function(e) {
        this.setData({
            verifyCode: e.detail.value
        });
    }
}, r.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));