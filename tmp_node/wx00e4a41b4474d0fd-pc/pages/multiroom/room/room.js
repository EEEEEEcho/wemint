function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t) {
    return function() {
        var a = t.apply(this, arguments);
        return new Promise(function(t, e) {
            function o(n, s) {
                try {
                    var i = a[n](s), l = i.value;
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    return void e(t);
                }
                if (!i.done) return Promise.resolve(l).then(function(t) {
                    o("next", t);
                }, function(t) {
                    o("throw", t);
                });
                t(l);
            }
            return o("next");
        });
    };
}

var e, o, n = t(require("../../../lib/runtime")), s = t(require("../../../lib/requestConfig")), i = t(require("../../../utils/monitor.js")), l = require("../../../utils/rtcroom.js"), d = require("../../../utils/util.js"), r = getApp(), g = require("../../../config.js"), u = (require("../../../utils/webim_wx.js"), 
null);

Page({
    data: {
        roomID: "",
        roomname: "",
        beauty: 5,
        muted: !1,
        debug: !1,
        frontCamera: !0,
        assistant: {},
        startTime: null,
        endTime: null,
        flagStatus: 1,
        selToID: null,
        dynatownId: null,
        hideBg: !1,
        flag: !1,
        status: "正在呼叫对方",
        color1: g.color1,
        color2: g.color2,
        backColor: g.backColor,
        hzdlFlag: !1,
        ysglFlag: !1,
        hqcsFlag: !1,
        wlkdFlag: !1,
        fwbjFlag: !1,
        bmsyFlag: !1,
        qtyyFlag: !1,
        goodIndex: "",
        evaluateFlag: "",
        TextArea: "",
        selectTags: [],
        goodIndex1: "",
        goodIndex2: "",
        goodIndexList1: [ 0, 0, 0, 0, 0 ],
        goodIndexList2: [ 0, 0, 0, 0, 0 ],
        aliveFlag: !1,
        consultantList: [],
        consultantObj1: {},
        consultantObj2: {},
        houseBgImg: "",
        navbar: {
            showCapsule: 1,
            title: "",
            titleColor: "#fff",
            navPadding: 0,
            navBarColor: "transparent",
            navBackColor: "#fff",
            haveCallback: !1,
            fromShare: !1,
            pageId: null,
            pageName: ""
        },
        titleFlag: !0,
        statusBarHeight: 0
    },
    handleIndex: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            goodIndex: a
        });
        var e = {
            eventId: "exp_2cmina_23",
            eventName: "shipinpingjia",
            eventModuleDes: JSON.stringify({
                "wx.authorize.scope": "wx.getPhoneNum",
                type: r.globalData.phone ? "success" : "fail",
                isOK: "1" == this.data.goodIndex ? "满意" : "不满意"
            }),
            type: "EXP",
            adviserId: r.globalData.videoCustomer.id,
            imTalkType: "2",
            pvCurPageName: "shipinpingjia",
            pvCurPageParams: u
        };
        d.trackRequest(e);
    },
    handleIndex1: function(t) {
        var a = t.currentTarget.dataset.index;
        1 == this.data.goodIndexList1[a - 1] ? this.data.goodIndexList1[a - 1] = 0 : this.data.goodIndexList1[a - 1] = 1, 
        this.data.goodIndexList1.includes(1) ? this.setData({
            goodIndex1: a
        }) : this.setData({
            goodIndex1: ""
        }), this.setData({
            goodIndexList1: this.data.goodIndexList1
        }), console.log("***this.data.goodIndexList1", this.data.goodIndexList1);
    },
    handleIndex2: function(t) {
        var a = t.currentTarget.dataset.index;
        1 == this.data.goodIndexList2[a - 1] ? this.data.goodIndexList2[a - 1] = 0 : this.data.goodIndexList2[a - 1] = 1, 
        this.data.goodIndexList2.includes(1) ? this.setData({
            goodIndex2: a
        }) : this.setData({
            goodIndex2: ""
        }), this.setData({
            goodIndexList2: this.data.goodIndexList2
        });
    },
    onRoomEvent: function(t) {
        var a = this;
        switch (console.log("收到消息:", t), t.detail.tag) {
          case "recvTextMsg":
            var e = JSON.parse(t.detail.detail);
            if (console.log("收到消息recvTextMsg:", t.detail.detail, e.textMsg), 0 == e.textMsg.startsWith("{")) {
                var o = e.textMsg;
                console.log("***consultantList***", a.data.consultantList), a.data.consultantList.forEach(function(t, e) {
                    if (o.indexOf(t + "离开房间") > 0 && (a.data.consultantList.length > 0 && a.data.consultantList.splice(e, 1), 
                    console.log("***对方离开房间***", o, ",", t, ",", a.data.consultantList), r.globalData.dataJson += JSON.stringify({
                        getMessage: o,
                        text: "对方已挂断"
                    }), 0 == a.data.consultantList.length)) {
                        wx.showToast({
                            title: "对方已挂断",
                            icon: "none",
                            duration: 1500
                        }), a.setData({
                            flagStatus: 3,
                            hideBg: !1,
                            endTime: Date.now()
                        }), a.videoInsert(30, 10), a.exit();
                        var n = a.selectComponent("#rtcroom");
                        console.log("***recvTextMsg-rtcroomCom.exitRoom()***"), n.exitRoom();
                    }
                    o.indexOf(t + "进入房间") > 0 && (console.log("***对方接收到视频请求并进入房间***", o, ",", t, ",", a.data.hideBg), 
                    r.globalData.dataJson += JSON.stringify({
                        getMessage: o,
                        text: "对方接收到视频请求并进入房间"
                    }));
                });
            } else try {
                var n = JSON.parse(e.textMsg);
                if (console.log("==========", n), "108" != n.type && 108 != n.type || (a.setData({
                    hideBg: !0
                }), r.globalData.dataJson += JSON.stringify({
                    getMessage: e.textMsg,
                    text: "对方接通视频"
                }), console.log("***对方接通视频***", a.data.hideBg)), "109" != n.type && 109 != n.type || (a.setData({
                    hideBg: !1
                }), console.log("***对方隐藏视频***", a.data.hideBg)), 300 != n.type && "300" != n.type || (console.log("***300***", n.param), 
                a.data.consultantList.push(n.param.consultantId + "_" + g.houseId), a.data.consultantObj1.tipsWord = "正在转接请稍后", 
                a.data.consultantObj2.tipsWord = "通话中", a.data.consultantObj2.userId = n.param.consultantId + "_" + g.houseId, 
                a.data.consultantObj2.dynatownId = n.param.consultantId, a.data.consultantObj2.head = n.param.consultantAvatar, 
                a.data.consultantObj2.name = n.param.consultantName, a.setData({
                    assistant: a.data.consultantObj1
                })), 301 != n.type && "301" != n.type || (console.log("***301***"), a.data.consultantObj2.tipsWord = "通话中", 
                a.setData({
                    assistant: a.data.consultantObj2,
                    dynatownId: a.data.consultantObj2.dynatownId
                }), a.data.consultantObj1.tipsWord = "通话中", a.data.consultantObj1.userId = a.data.consultantObj2.userId, 
                a.data.consultantObj1.dynatownId = a.data.consultantObj2.dynatownId, a.data.consultantObj1.head = a.data.consultantObj2.head, 
                a.data.consultantObj1.name = a.data.consultantObj2.name), 302 == n.type || "302" == n.type) {
                    if (console.log("***302***", n.param), n.param && n.param.consultantId) {
                        var s = n.param.consultantId + "_" + g.houseId;
                        a.data.consultantList.forEach(function(t, e) {
                            s == t && a.data.consultantList.splice(e, 1);
                        });
                    } else a.data.consultantList.pop();
                    a.data.consultantObj1.tipsWord = "通话中", a.setData({
                        assistant: a.data.consultantObj1
                    });
                }
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                console.log("***onRoomEvent-try-Error***", t);
            }
            break;

          case "roomClosed":
            console.log("roomClose:", t.detail.detail), this.setData({
                flagStatus: 4,
                endTime: Date.now(),
                hideBg: !1
            });
            l = getCurrentPages();
            if (console.log(l, l.length, l[l.length - 1].__route__), l.length > 1 && "pages/multiroom/room/room" == l[l.length - 1].__route__ && (wx.showToast({
                title: "对方已挂断",
                icon: "none",
                duration: 1500
            }), l = getCurrentPages(), console.log(l, l.length, l[l.length - 1].__route__), 
            l.length > 1 && "pages/multiroom/room/room" == l[l.length - 1].__route__)) {
                a.exit();
                var i = a.selectComponent("#rtcroom");
                console.log("***rtcroomCom.exitRoom()***"), i.exitRoom();
            }
            break;

          case "error":
            console.error("error:", t.detail.detail), console.log("error:", t.detail.detail), 
            r.globalData.dataJson += JSON.stringify(t), this.setData({
                flagStatus: 5,
                endTime: Date.now(),
                hideBg: !1
            }), this.videoInsert(99, 40);
            var l = getCurrentPages();
            console.log(l, l.length, l[l.length - 1].__route__), l.length > 1 && "pages/multiroom/room/room" == l[l.length - 1].__route__ && wx.showModal({
                title: "提示",
                content: t.detail.detail,
                showCancel: !1,
                complete: function() {
                    (l = getCurrentPages()).length > 1 && "pages/multiroom/room/room" == l[l.length - 1].__route__ && a.exit();
                }
            });
        }
    },
    exit: function() {
        var t = this;
        if (!0 === t.data.aliveFlag) return !1;
        t.data.aliveFlag = !0;
        var a = 0, n = 0, s = t.data.startTime || "", i = "", l = "";
        if (i = t.data.endTime = t.data.endTime ? t.data.endTime : Date.now(), console.log("&&&&&exit-self.data.flagStatus&&&&&", t.data.flagStatus, t.data.startTime, t.data.endTime), 
        t.data.endTime && t.data.startTime) {
            var g = Math.floor((t.data.endTime - t.data.startTime) / 1e3);
            n = Math.floor(g / 60), a = g % 60, l = e = (n > 9 ? n : "0" + n) + ":" + (a > 9 ? a : "0" + a), 
            console.log("***exit***", n, a, e);
        }
        var u = {
            talkStartTime: s ? t.formatDate(new Date(s), "yyyy-MM-dd hh:mm:ss") : "",
            talkEndTime: i ? t.formatDate(new Date(i), "yyyy-MM-dd hh:mm:ss") : "",
            talkLongTime: l
        };
        this.setData({
            evaluateFlag: "1"
        });
        var c = {
            ip: r.globalData.ip,
            type: "PV",
            adviserId: r.globalData.videoCustomer.id,
            imTalkType: "2",
            pvId: "p_2cmina_97",
            pvCurPageName: "shipinpingjia",
            pvCurPageParams: JSON.stringify(u),
            pvLastPageName: "",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - o
        };
        d.trackRequest(c), console.log("*******evaluateFlag******", this.data.evaluateFlag, t.data.endTime, t.data.startTime);
    },
    formatDate: function(t, a) {
        /(y+)/.test(a) && (a = a.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length)));
        var e = {
            "M+": t.getMonth() + 1,
            "d+": t.getDate(),
            "h+": t.getHours(),
            "m+": t.getMinutes(),
            "s+": t.getSeconds()
        };
        for (var o in e) if (new RegExp("(" + o + ")").test(a)) {
            var n = e[o] + "";
            a = a.replace(RegExp.$1, 1 === RegExp.$1.length ? n : this.padLeftZero(n));
        }
        return a;
    },
    padLeftZero: function(t) {
        return ("00" + t).substr(t.length);
    },
    realExit: function() {
        var t = this;
        if (t.data.flag) {
            var a = getCurrentPages(), o = a[a.length - 2];
            if (t.data.endTime && t.data.startTime) {
                console.log("****返回上一页1***", e), o.setData({
                    videoStatus: 1,
                    timeUse: e
                });
                var n = getCurrentPages();
                n[n.length - 2] ? wx.navigateBack({
                    changed: !0
                }) : wx.redirectTo({
                    url: "../../index/index"
                });
            } else {
                console.log("****返回上一页2***"), o.setData({
                    videoStatus: 2,
                    timeUse: null
                });
                var s = getCurrentPages();
                s[s.length - 2] ? wx.navigateBack({
                    changed: !0
                }) : wx.redirectTo({
                    url: "../../index/index"
                });
            }
        } else {
            var i = getCurrentPages();
            i[i.length - 2] ? wx.navigateBack({
                changed: !0
            }) : wx.redirectTo({
                url: "../../index/index"
            });
        }
        console.log("***真实退出该页面组件***", t.data.flag, t.data.endTime, t.data.startTime);
    },
    sendText: function() {
        var t = this.selectComponent("#rtcroom");
        if (t) {
            var a = {
                flag: "3",
                myselToID: "2758_83"
            };
            t.sendTextMsg("asdjgklasjdgklasdgk", a);
        }
    },
    onliveplay: function() {
        if (!this.data.startTime) {
            console.log("***onliveplay***", this.data.startTime), this.setData({
                flagStatus: 2,
                startTime: Date.now(),
                titleFlag: !1
            });
            var t = {
                ip: r.globalData.ip,
                type: "PV",
                adviserId: r.globalData.videoCustomer.id,
                imTalkType: "2",
                pvId: "P_2cMINA_96",
                pvCurPageName: "shipinjietong",
                pvCurPageParams: u,
                pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
                pvLastPageParams: "",
                pvPageLoadTime: new Date().getTime() - o
            };
            console.log(t, "视频通话埋点pv"), d.trackRequest(t, r);
        }
    },
    trigVideo: function() {
        this.videoInsert(1, 1);
    },
    decline: function() {
        var t = this, a = 0, o = 0;
        console.log("***room.js-decline***", t.data.flag, t.data.flagStatus);
        var n = this.selectComponent("#rtcroom"), s = l.getRoomInfo();
        if (console.log("***roomInfo***", s.isPush), !s.isPush) return !1;
        t.videoInsert(30, 10);
        var i = "fankuiyemian", g = "";
        if (2 == t.data.flagStatus && (g = "ekanfangjietongye"), t.data.endTime = t.data.endTime ? t.data.endTime : Date.now(), 
        t.setData({
            hideBg: !1
        }), t.data.endTime && t.data.startTime) {
            var u = Math.floor((t.data.endTime - t.data.startTime) / 1e3);
            o = Math.floor(u / 60), a = u % 60, e = (o > 9 ? o : "0" + o) + ":" + (a > 9 ? a : "0" + a), 
            console.log("***decline-exit***", o, a, e), o >= 1 && (i = "pingjiayemian");
        }
        var c = {
            clkId: "clk_2cmina_28",
            clkDesPage: i,
            type: "CLK",
            adviserId: r.globalData.videoCustomer.id,
            imTalkType: "2",
            pvCurPageName: g,
            clkName: "bodaguaduan",
            pvCurPageParams: ""
        };
        console.log(c, "视频通话挂断点击埋点pv"), d.trackRequest(c, r), t.videoInsert(30, 10), t.exit(), 
        console.log("***rtcroomCom.exitRoom()***"), n.exitRoom();
    },
    bindTextAreaBlur: function(t) {
        console.log("**bindTextAreaBlur***", t.detail.value), this.setData({
            TextArea: t.detail.value
        });
    },
    videoInsert: function(t, e) {
        var o = this;
        return a(n.default.mark(function a() {
            var i, l;
            return n.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return console.log("***videoInsert***", r.globalData.single.id, g.houseId, t, e), 
                    i = {
                        userId: r.globalData.single.id,
                        dataJson: r.globalData.dataJson,
                        pullLog: r.globalData.pullLog,
                        pushLog: r.globalData.pushLog,
                        mobile: r.globalData.phone,
                        reqStatus: e,
                        reqType: t,
                        system: 3,
                        roomNo: o.data.roomID,
                        roleType: 0,
                        created: Date.now(),
                        creator: r.globalData.single.id + "_" + g.houseId
                    }, a.next = 4, (0, s.default)("insertData", i, !0);

                  case 4:
                    (l = a.sent) && l.success ? console.log("&&&success-videoInsert***", l) : console.log("&&&fail-videoInsert***", l), 
                    r.globalData.dataJson = r.globalData.pullLog = r.globalData.pushLog = "";

                  case 7:
                  case "end":
                    return a.stop();
                }
            }, a, o);
        }))();
    },
    submitEvaluate: function() {
        var t = this;
        return a(n.default.mark(function a() {
            var e, o, i, l, c;
            return n.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (!(!(e = t).data.goodIndex || "1" == e.data.goodIndex && "" == e.data.goodIndex1 || "2" == e.data.goodIndex && "" == e.data.goodIndex2)) {
                        a.next = 3;
                        break;
                    }
                    return a.abrupt("return", !1);

                  case 3:
                    if (console.log("***submitEvaluate***"), o = "", "2" == e.data.goodIndex && 1 == e.data.goodIndexList2[4] && (o = e.data.TextArea), 
                    e.data.selectTags = [], "1" != e.data.goodIndex) {
                        a.next = 15;
                        break;
                    }
                    e.data.goodIndexList1[0] && e.data.selectTags.push("顾问热情"), e.data.goodIndexList1[1] && e.data.selectTags.push("体验流畅"), 
                    e.data.goodIndexList1[2] && e.data.selectTags.push("效率很高"), e.data.goodIndexList1[3] && e.data.selectTags.push("功能好用"), 
                    e.data.goodIndexList1[4] && e.data.selectTags.push("快捷便利"), a.next = 24;
                    break;

                  case 15:
                    if (e.data.goodIndexList2[0] && e.data.selectTags.push("画质不佳"), e.data.goodIndexList2[1] && e.data.selectTags.push("隐私顾虑"), 
                    e.data.goodIndexList2[2] && e.data.selectTags.push("网络卡顿"), e.data.goodIndexList2[3] && e.data.selectTags.push("服务不佳"), 
                    !e.data.goodIndexList2[4]) {
                        a.next = 24;
                        break;
                    }
                    if (0 != o.length) {
                        a.next = 23;
                        break;
                    }
                    return wx.showToast({
                        title: "请输入其他原因的内容",
                        icon: "none",
                        duration: 1500
                    }), a.abrupt("return", !1);

                  case 23:
                    e.data.selectTags.push("其他原因");

                  case 24:
                    return i = {
                        clkId: "clk_2cmina_254",
                        clkDesPage: "",
                        type: "CLK",
                        adviserId: r.globalData.videoCustomer && r.globalData.videoCustomer.id || "",
                        imTalkType: "2",
                        pvCurPageName: "shipinpingjia",
                        clkName: "shipinpingjia",
                        clkParams: {
                            "wx.authorize.scope": "wx.getPhoneNum",
                            type: r.globalData.phone ? "success" : "fail",
                            isOK: "1" == e.data.goodIndex ? "满意" : "不满意",
                            tags: e.data.selectTags.join(",")
                        },
                        pvCurPageParams: u
                    }, d.trackRequest(i), l = {
                        userId: r.globalData.single.id,
                        houseId: g.houseId,
                        isOk: "1" == e.data.goodIndex ? 1 : 0,
                        mobile: r.globalData.phone,
                        remark: o,
                        tags: e.data.selectTags.join(",")
                    }, console.log(l, "来聊一次"), a.next = 30, (0, s.default)("submitEvaluate", l, !0);

                  case 30:
                    c = a.sent, "2" == e.data.goodIndex ? wx.showToast({
                        title: "感谢您的评价，我们会不断改进优化",
                        icon: "none",
                        duration: 3e3,
                        success: function() {
                            setTimeout(function() {
                                e.data.houseVideo ? wx.redirectTo({
                                    url: "/pages/index/index"
                                }) : e.realExit();
                            }, 3e3);
                        }
                    }) : e.data.houseVideo ? wx.showModal({
                        title: "感谢您的评价",
                        content: "是否需要联系置业顾问预约现场看房？",
                        showCancel: !0,
                        cancelText: "暂不需要",
                        cancelColor: "#7684A0",
                        confirmText: "好的",
                        confirmColor: "#5370FF",
                        success: function(t) {
                            t.confirm ? (console.log("用户点击确定"), r.handleGoChat()) : t.cancel && (console.log("用户点击取消"), 
                            wx.redirectTo({
                                url: "/pages/index/index"
                            }));
                        }
                    }) : (wx.showToast({
                        title: "感谢您的评价，您的满意是我们不断前进的动力",
                        icon: "none",
                        duration: 3e3
                    }), setTimeout(function() {
                        e.realExit();
                    }, 3e3));

                  case 32:
                  case "end":
                    return a.stop();
                }
            }, a, t);
        }))();
    },
    submitEvaluate2: function() {
        var t = this;
        return a(n.default.mark(function a() {
            var e, o, i, l;
            return n.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return e = t, o = "1" == e.data.goodIndex ? "10" : "2" == e.data.goodIndex ? "5" : "0", 
                    console.log("***submitEvaluate2***", o), i = {
                        evaluateCustomerId: r.globalData.single.id,
                        adviserId: e.data.dynatownId,
                        houseId: g.houseId,
                        evaluateMobile: r.globalData.phone,
                        remark: e.data.TextArea,
                        totalEvaluate: o
                    }, a.next = 6, (0, s.default)("submitEvaluate2", i, !0);

                  case 6:
                    (l = a.sent) && l.success ? (console.log("&&&success-submitEvaluate***", l), e.realExit()) : (console.log("&&&fail-submitEvaluate***", l), 
                    e.realExit());

                  case 8:
                  case "end":
                    return a.stop();
                }
            }, a, t);
        }))();
    },
    changeCamera: function() {},
    setBeauty: function() {
        var t = this.selectComponent("#rtcroom");
        if (t) {
            l.getAccountInfo();
            var a = {
                type: 106,
                time: Date.now(),
                param: {
                    text: "123456zjs"
                }
            }, e = {
                flag: "0"
            };
            t.sendTextMsg(JSON.stringify(a), e), l.getRoomList({
                data: {
                    index: 0,
                    cnt: 20
                },
                success: function(t) {
                    console.log(t), console.log("拉取房间列表成功", t);
                },
                fail: function(t) {
                    console.log(t), wx.showModal({
                        title: "提示",
                        content: t.errMsg,
                        showCancel: !1
                    });
                }
            });
        }
    },
    changeMute: function() {
        this.data.muted = !this.data.muted, this.setData({
            muted: this.data.muted
        });
    },
    showLog: function() {
        this.data.debug = !this.data.debug, this.setData({
            debug: this.data.debug
        });
    },
    updateDynatown: function(t) {
        var e = this;
        return a(n.default.mark(function a() {
            var o, i, l;
            return n.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return o = e.data.dynatownId, console.log("***updateDynatown***", t, o, g.houseId), 
                    i = {
                        adviserId: o,
                        houseId: g.houseId,
                        userRole: 2,
                        onlineStatus: t
                    }, a.next = 5, (0, s.default)("switchStatus", i);

                  case 5:
                    l = a.sent, console.log("***updateDynatown_res***", l);

                  case 7:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    getCurrentPageParam: function() {
        return u;
    },
    onLoad: function(t) {
        u = JSON.stringify(t), console.log("********------", t), t && t.isSuc ? this.setData({
            flag: !0,
            houseBgImg: r.globalData.houseBgImg
        }) : this.setData({
            flag: !1,
            houseBgImg: r.globalData.houseBgImg
        });
        var a = this, e = getCurrentPages(), o = e[e.length - 2];
        wx.getSetting({
            success: function(e) {
                console.log("=======rtcroomCom.onLoad***getSetting", e), e.authSetting["scope.record"] && e.authSetting["scope.camera"] ? a.init(t) : wx.openSetting({
                    success: function(e) {
                        if (e.authSetting["scope.record"] && e.authSetting["scope.camera"]) a.init(t); else if (console.log("******openSetting——success-other&&&&&&&", e), 
                        a.data.flag) {
                            o.setData({
                                videoStatus: null,
                                timeUse: null
                            });
                            var n = getCurrentPages();
                            n[n.length - 2] ? wx.navigateBack({
                                changed: !0
                            }) : wx.redirectTo({
                                url: "../../index/index"
                            });
                        } else {
                            var s = getCurrentPages();
                            s[s.length - 2] ? wx.navigateBack({
                                changed: !0
                            }) : wx.redirectTo({
                                url: "../../index/index"
                            });
                        }
                    },
                    fail: function(t) {
                        console.log("******openSetting错误&&&&&&&", t), wx.showModal({
                            title: "提示",
                            content: "操作太快,请稍后再试",
                            success: function(t) {
                                if (t.confirm) if (a.data.flag) {
                                    o.setData({
                                        videoStatus: null,
                                        timeUse: null
                                    });
                                    var e = getCurrentPages();
                                    e[e.length - 2] ? wx.navigateBack({
                                        changed: !0
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
                                } else if (t.cancel) if (a.data.flag) {
                                    o.setData({
                                        videoStatus: null,
                                        timeUse: null
                                    });
                                    var s = getCurrentPages();
                                    s[s.length - 2] ? wx.navigateBack({
                                        changed: !0
                                    }) : wx.redirectTo({
                                        url: "../../index/index"
                                    });
                                } else {
                                    var i = getCurrentPages();
                                    i[i.length - 2] ? wx.navigateBack({
                                        changed: !0
                                    }) : wx.redirectTo({
                                        url: "../../index/index"
                                    });
                                }
                            }
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
    },
    callConsultant: function(t) {},
    init: function(t) {
        var a = this;
        console.log("room.js onLoad");
        var e = new Date();
        e = e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds(), console.log("*************开始视频看房：" + e + "**************"), 
        console.log(t), a.data.aliveFlag = !1, a.data.role = t.type, a.data.roomID = t.roomID || "", 
        a.data.roomname = t.roomName, a.data.username = t.userName, a.setData({
            roomID: a.data.roomID,
            roomname: a.data.roomname,
            username: a.data.username
        }, function() {
            var t = a.selectComponent("#rtcroom");
            if (t) {
                console.log("rtcroomCom");
                var e = l.getAccountInfo();
                console.log("accountInfo.opt:", e.opt), e.opt && e.opt.id && a.data.consultantList.push(e.opt.id + "_" + g.houseId), 
                e.opt.tipsWord = "通话中", a.data.consultantObj1.tipsWord = "通话中", a.data.consultantObj1.userId = e.selToID || "", 
                a.data.consultantObj1.dynatownId = e.opt ? e.opt.id : "", a.data.consultantObj1.name = e.opt ? e.opt.name : "", 
                a.data.consultantObj1.head = e.opt ? e.opt.head : "", a.setData({
                    assistant: a.data.consultantObj1,
                    dynatownId: e.opt ? e.opt.id : "",
                    selToID: e.selToID || ""
                }), t.start(function(t) {
                    a.setData({
                        roomID: t
                    }), a.updateDynatown("1"), a.videoInsert(10, 10);
                });
            }
        });
    },
    chuli: function() {},
    onReady: function() {},
    onShow: function() {
        i.default.pageShow(), o = new Date().getTime();
        console.log("room.js onShow"), this.setData({
            statusBarHeight: r.globalData.statusBarHeight
        }), wx.setKeepScreenOn({
            keepScreenOn: !0
        });
    },
    onHide: function() {
        console.log("room.js onHide");
    },
    onUnload: function() {
        console.log("***onUnload***room.js onUnload", this.data.flagStatus), 1 == this.data.flagStatus && console.log("=====this.data.flagStatus======", this.data.flagStatus);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
}, i.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(t) {},
    onHide: function() {},
    onUnload: function() {}
}));