function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    return function() {
        var a = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function n(o, r) {
                try {
                    var s = a[o](r), l = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!s.done) return Promise.resolve(l).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(l);
            }
            return n("next");
        });
    };
}

var t = e(require("utils/monitor.js")), n = e(require("lib/requestConfig")), o = e(require("lib/runtime")), r = require("./config.js"), s = require("./utils/util.js"), l = (require("utils/webim_handler.js"), 
require("utils/webim_wx.js")), i = require("utils/IM_init.js"), g = wx.getUpdateManager && "function" == typeof wx.getUpdateManager ? wx.getUpdateManager() : null, u = !0, c = [], d = !1;

App({
    onLaunch: function(e) {
        g && g.onCheckForUpdate(function(e) {
            console.log(e.hasUpdate);
        }), g && g.onUpdateReady(function() {
            console.log("***UpdateManager-update***"), g.applyUpdate();
        });
        var a = this;
        if (!wx.getStorageSync("xnid")) {
            var t = "xnid_" + new Date().getTime() + "_" + Math.floor(1e3 * Math.random());
            wx.setStorageSync("xnid", t);
        }
        wx.onMemoryWarning && wx.onMemoryWarning(function(e) {
            var t = {
                type: "mini-program-Error",
                pvPageStayTime: new Date().getTime() / 1e3,
                adviserId: "",
                imTalkId: "",
                imTalkType: "",
                pvCurPageName: "app.js-onMemoryWarning",
                clkDesPage: "",
                clkName: "",
                clkId: "",
                expand: JSON.stringify(e) + JSON.stringify(a.globalData) + ";houseId=" + r.houseId
            };
            s && s.trackRequest(t);
        }), wx.onNetworkStatusChange(function(e) {
            console.log(e.isConnected, "网络断开"), console.log(e.networkType);
        }), wx.getSystemInfo({
            success: function(e) {
                console.log(e), a.systemInfo = e, a.globalData.statusBarHeight = e.statusBarHeight, 
                a.globalData.navigationHeight = 44, a.globalData.navigateStatusHeight = e.statusBarHeight + a.globalData.navigationHeight, 
                a.globalData.navigateStatusBottomHeight = 0, a.globalData.navigateStatusContainerHeight = a.globalData.navigateStatusHeight + a.globalData.navigateStatusBottomHeight, 
                console.log("wx.getSystemInfo：" + a.globalData.navigateStatusContainerHeight);
                try {
                    var t = !0, n = a.systemInfo.system.replace(/\s/g, "").match(/iOS(\d+)\.(\d+)\.(\d+)/);
                    (!n || n[1] < 13) && (t = !1), a.globalData.isIos13 = t;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    console.log(e);
                }
            }
        });
        var n = wx.getLaunchOptionsSync && "function" == typeof wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
        n && (a.globalData.launchInfo = n, console.log("***来源信息：***", n)), a.detail(), a.getIpAddr(), 
        a.queryEnumList(), a.getProjectInformation();
    },
    IMISPOP: function() {
        var e = this;
        if (console.warn("***app.js-IMISPOP***", e.globalData.Is30Second, e.globalData.single.isImChat), 
        0 == e.globalData.Is30Second && e.globalData.single && e.globalData.single.isImChat && "-1" == e.globalData.single.isImChat.toString()) {
            e.globalData.Is30Second = !0;
            var a = {
                sham: "1",
                total: "1"
            };
            wx.setStorageSync("unReadMsgs", a);
            var t = getCurrentPages()[getCurrentPages().length - 1];
            if (!t) return console.error("***app.js-IMISPOP-currPage no exit!!!***", t), !1;
            t.refreshNumber && (console.warn("***app.js-IMISPOP-refreshNumber***", t), t.refreshNumber()), 
            t.data.hasOwnProperty("unReadMsgNumber") && (console.warn("***app.js-IMISPOP-unReadMsgNumber***", t), 
            t.setData({
                unReadMsgNumber: 1
            }));
        }
    },
    showLoading: function() {
        var e = getCurrentPages()[getCurrentPages().length - 1];
        if (!e) return console.error("***app.js-showLoading-currPage no exit!!!***", e), 
        !1;
        e.myLoading || (e.myLoading = e.selectComponent("#myLoading")), e.myLoading && e.myLoading.showLoading();
    },
    hideLoading: function() {
        var e = getCurrentPages()[getCurrentPages().length - 1];
        if (!e) return console.error("***app.js-hideLoading-currPage no exit!!!***", e), 
        !1;
        e.myLoading || (e.myLoading = e.selectComponent("#myLoading")), e.myLoading && e.myLoading.hideLoading();
    },
    queryEnumList: function() {
        var e = this;
        return a(o.default.mark(function a() {
            var t;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.next = 2, (0, n.default)("queryEnumList", {
                        houseId: r.houseId
                    }, !0);

                  case 2:
                    t = a.sent, console.log("***app.js-onLaunch-queryEnumList***", t), t && t.success && t.list ? e.globalData.EnumList = t.list : console.log("获取基础数据配置信息失败", t);

                  case 5:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    getProjectInformation: function() {
        var e = this;
        return a(o.default.mark(function a() {
            var t;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.next = 2, (0, n.default)("houseAttrInfo", {
                        id: r.houseId
                    }, !0);

                  case 2:
                    (t = a.sent) && t.success && (!t.single.city || -1 == t.single.city.indexOf("自治区") && -1 == t.single.city.indexOf("香港特别行政区") && -1 == t.single.city.indexOf("澳门特别行政区")) && (e.globalData.projectCity = t.single.city + "市");

                  case 4:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    detail: function() {
        var e = this;
        return a(o.default.mark(function a() {
            var t, s, l;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return t = e, a.next = 3, (0, n.default)("queryShareConfig", {
                        houseId: r.houseId
                    }, !0);

                  case 3:
                    if (!((s = a.sent) && s.success && s.single)) {
                        a.next = 19;
                        break;
                    }
                    if (t.globalData.projectName = s.single.name || r.projectName, t.globalData.logo = s.single.logo || null, 
                    t.globalData.shareImage = s.single.shareFigure && s.single.shareFigure.url || null, 
                    t.globalData.shareCardImage = s.single.cardFigure && s.single.cardFigure.url || null, 
                    t.globalData.videoFigure = s.single.videoFigure && s.single.videoFigure.url || null, 
                    t.globalData.houseBgImg = s.single.videoBackgroundFigure && s.single.videoBackgroundFigure.url || "http://test.static.elab-plus.com/1580885039046/42.png", 
                    t.globalData.businessCard = s.single.businessCardFigure || "", !(getCurrentPages().length > 0)) {
                        a.next = 19;
                        break;
                    }
                    if (wx.setNavigationBarTitle && wx.setNavigationBarTitle({
                        title: t.globalData.projectName
                    }), l = getCurrentPages()[getCurrentPages().length - 1]) {
                        a.next = 18;
                        break;
                    }
                    return console.error("***app.js-hideLoading-currPage no exit!!!***", l), a.abrupt("return", !1);

                  case 18:
                    l.selectComponent("#authView") && l.selectComponent("#authView").getLogo();

                  case 19:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    modifyUserInfo: function(e) {
        var t = this;
        return a(o.default.mark(function a() {
            var s, l, i, g;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return s = t, 2 == (l = e.gender || s.globalData.userInfo.gender || "") && (l = 0), 
                    i = {
                        houseId: r.houseId,
                        id: s.globalData.single && s.globalData.single.id ? s.globalData.single.id : "",
                        headPortrait: e.avatarUrl || s.globalData.userInfo.avatarUrl,
                        nickname: e.nickName || s.globalData.userInfo.nickName,
                        sex: l,
                        city: e.city || s.globalData.userInfo.city,
                        country: e.country || s.globalData.userInfo.country,
                        province: e.province || s.globalData.userInfo.province
                    }, a.next = 6, (0, n.default)("modifyUserInfo", i, !0);

                  case 6:
                    (g = a.sent) && g.success && console.log("***提交用户信息成功***", g);

                  case 8:
                  case "end":
                    return a.stop();
                }
            }, a, t);
        }))();
    },
    pushIMInfo: function(e) {
        var t = this;
        return a(o.default.mark(function a() {
            var r;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.next = 2, (0, n.default)("pushIMInfo", e);

                  case 2:
                    r = a.sent, console.log("***IM消息通知顾问***", r);

                  case 4:
                  case "end":
                    return a.stop();
                }
            }, a, t);
        }))();
    },
    getIpAddr: function() {
        var e = this;
        return a(o.default.mark(function a() {
            var t;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.next = 2, (0, n.default)("getIpAddr", {}, !0);

                  case 2:
                    (t = a.sent) && t.success && t.single && (e.globalData.ip = t.single, console.log("***app.js-onLaunch-getIpAddr***", t.single));

                  case 4:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    getPhone: function(e, t, l, i, g, u, c) {
        var d = this, p = arguments.length > 7 && void 0 !== arguments[7] && arguments[7];
        return a(o.default.mark(function a() {
            var u, f, h, m, b, I, D;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return u = d, d.pageContext = e, f = {
                        encryptedData: t,
                        sessionKey: l,
                        appId: i,
                        scene: u.globalData.launchInfo && u.globalData.launchInfo.scene || "",
                        customerId: u.globalData.single && u.globalData.single.id ? u.globalData.single.id : "",
                        houseId: r.houseId,
                        shareSign: u.globalData.fromChannel,
                        iv: g
                    }, u.globalData.single && u.globalData.single.id || (wx.reportMonitor && wx.reportMonitor("single", 1), 
                    h = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "app.js-getPhone",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(f) + "---" + JSON.stringify(u.globalData) + ";houseId=" + r.houseId
                    }, s.trackRequest(h)), a.next = 6, (0, n.default)("authorizedMobile", f, !0);

                  case 6:
                    if (!((m = a.sent) && m.success && m.single)) {
                        a.next = 26;
                        break;
                    }
                    if (console.log("***解密手机号成功***", m), b = m.single, u.globalData.phone = b.phone, 
                    u.globalData.organize = b.organize || "", u.globalData.organizeUsername = b.organizeUsername || "", 
                    wx.setStorageSync("phone", b.phone), b.organize ? d.pageContext.setData({
                        showPhoneModel: !1,
                        showLiudian: !1,
                        showVisitCard: !0
                    }) : d.pageContext.setData({
                        showPhoneModel: !1,
                        showLiudian: !1
                    }), "function" == typeof d.pageContext.data.phoneFun && d.pageContext.data.phoneFun(), 
                    "function" == typeof c && c(), u.globalData.phone && !p) {
                        a.next = 19;
                        break;
                    }
                    return a.abrupt("return");

                  case 19:
                    return I = {
                        mobile: u.globalData.phone || "",
                        customerId: u.globalData.single && u.globalData.single.id ? u.globalData.single.id : "",
                        houseId: r.houseId
                    }, a.next = 22, (0, n.default)("autoAuthentication", I, !0);

                  case 22:
                    (D = a.sent).success && D.single && (u.globalData.organize = D.single.organizeName || "", 
                    u.globalData.organizeUsername = D.single.organizeName || ""), a.next = 32;
                    break;

                  case 26:
                    "function" == typeof c && c(), "function" == typeof d.pageContext.data.phoneFailFun && d.pageContext.data.phoneFailFun(), 
                    console.log("***解密手机号失败***", m), wx.reportMonitor && wx.reportMonitor("single", 15), 
                    h = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "app.js-getPhone",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(m) + ";houseId=" + r.houseId + ";param" + JSON.stringify(f)
                    }, s.trackRequest(h);

                  case 32:
                  case "end":
                    return a.stop();
                }
            }, a, d);
        }))();
    },
    handleGoChat: function() {
        var e = this;
        return a(o.default.mark(function a() {
            var t, l, i, g;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (t = getCurrentPages()[getCurrentPages().length - 1], (l = e).globalData.openid && l.globalData.single && "null" != l.globalData.single && "undefined" != l.globalData.single && l.globalData.single.id && "null" != l.globalData.single.id && "undefined" != l.globalData.single.id) {
                        a.next = 8;
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
                    }), wx.reportMonitor && wx.reportMonitor("single", 1), i = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: (t.route || "") + "-goChatList",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(l.globalData) + ";houseId=" + r.houseId
                    }, s.trackRequest(i), a.abrupt("return", !1);

                  case 8:
                    return a.next = 10, (0, n.default)("selectHouseLeadWork", {
                        id: r.houseId
                    }, 1);

                  case 10:
                    return (g = a.sent) && g.success && g.single && (l.globalData.imHelloWord = g.single.greetings || "", 
                    l.globalData.imRepeat = g.single.autoReply || ""), wx.navigateTo({
                        url: "/pages/messagesList/messagesList"
                    }), a.abrupt("return", !0);

                  case 14:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    createXcxQrCode: function(e, t, l, i) {
        var g = this;
        return a(o.default.mark(function a() {
            var u, c, p, f, h, m, b, I;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (!d) {
                        a.next = 2;
                        break;
                    }
                    return a.abrupt("return", !1);

                  case 2:
                    return d = !0, a.prev = 3, u = "", e.signData = e.signData || {}, e.signData.shareType = "qrcode", 
                    e.signData.subtype = e.subtype, c = {
                        customerId: g.globalData.single.id,
                        houseId: r.houseId,
                        userRole: 0,
                        mobile: g.globalData.phone,
                        attrs: JSON.stringify(e.signData) || "",
                        tfbUrl: e.tfbUrl || ""
                    }, a.next = 11, (0, n.default)("sign", c, !0);

                  case 11:
                    return (p = a.sent) && p.success && p.single ? (u = p.single, g.globalData._shareToken = u) : (wx.reportMonitor && wx.reportMonitor("single", 4), 
                    f = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "app.js-request-sign",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(p) + ";houseId=" + r.houseId + ";param=" + JSON.stringify(c)
                    }, s.trackRequest(f)), h = g, m = getCurrentPages()[getCurrentPages().length - 1], 
                    b = {
                        appId: g.globalData.appid,
                        defaultImage: "",
                        head: "",
                        houseId: r.houseId,
                        name: "",
                        path: i || "/" + m.route,
                        scene: u || h.globalData.shareToken,
                        secret: g.globalData.secret,
                        width: e.width || 100,
                        wxType: e.wxType || "",
                        xcxName: ""
                    }, a.next = 18, (0, n.default)("createXcxQrCode", b);

                  case 18:
                    I = a.sent, setTimeout(function() {
                        d = !1;
                    }, 2e3), I && I.success && I.single ? (console.log("***生成小程序二维码***", I), t && "function" == typeof t && t(I.single)) : (console.log("***生成小程序二维码失败***", I), 
                    l && "function" == typeof l && l(I)), a.next = 27;
                    break;

                  case 23:
                    a.prev = 23, a.t0 = a.catch(3), console.log(a.t0, "生成小程序二维码失败"), d = !1;

                  case 27:
                  case "end":
                    return a.stop();
                }
            }, a, g, [ [ 3, 23 ] ]);
        }))();
    },
    onUnload: function(e) {},
    onShow: function(e) {
        console.log("***app.js-小程序启动，或从后台进入前台显示时触发***"), this.websocketListener();
        var a = getCurrentPages()[getCurrentPages().length - 1];
        if (a && a.data && a.data.despage) {
            if (console.log("onShow:" + a.data.despage), a.data.isSendImg) return void (a.data.isSendImg = !1);
            if ("tupianku" === a.data.despage || "huxingtupian" === a.data.despage && a.data.previewFlag) return;
            this.opIMWebSocket();
        } else this.opIMWebSocket();
    },
    opIMWebSocket: function() {
        var e = this;
        e.login(function() {
            if (e.globalData.single) {
                var a = e.globalData.userInfo ? e.globalData.userInfo.nickName : "", t = r.houseId, n = e.globalData.single.id, o = [ "CONNECT\ntoken:" + e.globalData.tonken + "\nopenId:" + e.globalData.openid + "\nname:" + a + "\nhouseId:" + t + "\nuserId:" + n + "\naccept-version:1.1,1.0\nheart-beat:10000,10000\n\n\0" ], s = r.websocketUrl + "gs-guide-websocket/" + e.getRandomNum() + "/" + e.uuid(8, 60) + "/websocket";
                e.globalData.SocketTask = wx.connectSocket({
                    url: s,
                    data: o,
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(a) {
                        wx.onSocketOpen(function(a) {
                            console.log("wsConnect success" + JSON.stringify(a)), e.wsSendOrder(), console.warn("***SocketTask***", e.globalData.SocketTask);
                        });
                    },
                    fail: function(e) {
                        console.error("wsConnect fail");
                    }
                });
                var l = /\{.+\}/;
                e.globalData.SocketTask.onMessage(function(a) {
                    if (console.log("监听到回调", a), a.data.match(l) && a.data.match(l)[0]) {
                        for (var t = JSON.parse(a.data.match(l)[0].replace(/\\/g, "")), n = !1, o = 0; o < e.globalData.adviserOnlineStatusSocket.length; o++) e.globalData.adviserOnlineStatusSocket[o].adviserId == t.userId && (n = !0, 
                        e.globalData.adviserOnlineStatusSocket[o].onlineStatus = t.onlineStatus || 0, console.log("存在该socket记录，进行status修改", e.globalData.adviserOnlineStatusSocket));
                        t.userId && 0 == n && (e.globalData.adviserOnlineStatusSocket.push({
                            adviserId: t.userId,
                            onlineStatus: t.onlineStatus || 0
                        }), console.log(e.globalData.adviserOnlineStatusSocket));
                    }
                }), e.globalData.SocketTask.onClose(function(e) {
                    console.error("***关闭WebSocket连接。***", e);
                });
            }
        });
    },
    websocketListener: function() {
        wx.onSocketMessage(function(e) {
            console.warn("websocketListener:" + JSON.stringify(e));
        });
    },
    wsSendOrder: function() {
        var e = this.globalData.userInfo ? this.globalData.userInfo.nickName : "", a = r.houseId, t = this.globalData.single.id, n = [ "CONNECT\ntoken:" + this.globalData.tonken + "\nopenId:" + this.globalData.openid + "\nhouseId:" + a + "\nuserId:" + t + "\nname:" + e + "\nchannelGroup:im\naccept-version:1.1,1.0\nheart-beat:10000,10000\n\n\0" ];
        console.warn("wsSendOrder"), wx.sendSocketMessage({
            data: JSON.stringify(n)
        });
        var o = [ "SUBSCRIBE\nid:sub-2\ndestination:/user/topic/allUser\n\n\0" ];
        wx.sendSocketMessage({
            data: JSON.stringify([ "SUBSCRIBE\nid:sub-1\ndestination:/topic/allUser\n\n\0" ])
        }), wx.sendSocketMessage({
            data: JSON.stringify(o)
        });
    },
    uuid: function(e, a) {
        var t, n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), o = [];
        if (a = a || n.length, e) for (t = 0; t < e; t++) o[t] = n[0 | Math.random() * a]; else {
            var r;
            for (o[8] = o[13] = o[18] = o[23] = "-", o[14] = "4", t = 0; t < 36; t++) o[t] || (r = 0 | 16 * Math.random(), 
            o[t] = n[19 == t ? 3 & r | 8 : r]);
        }
        return o.join("");
    },
    getRandomNum: function() {
        return "" + parseInt(10 * Math.random()) + parseInt(10 * Math.random()) + parseInt(10 * Math.random());
    },
    onHide: function(e) {
        console.log("***app.js-小程序从前台进入后台***");
        var a = getCurrentPages()[getCurrentPages().length - 1];
        if (a && a.data) {
            if (console.log("onHide:" + a.data.despage), "tupianku" === a.data.despage || "huxingtupian" === a.data.despage && a.data.previewFlag || 1 == a.data.isSendImg) return;
            wx.closeSocket();
            var t = {
                clkId: "clk_2cmina_2",
                clkDesPage: "",
                clkName: "close",
                type: "CLK",
                pvCurPageName: a.data.despage || "",
                pvCurPageParams: ""
            };
            s.trackRequest(t);
        }
        wx.onSocketClose(function(e) {
            console.log("WebSocket 已关闭！");
        });
    },
    onError: function(e) {
        console.log("***小程序发生脚本错误或 API 调用报错时触发***");
        try {
            var a = getCurrentPages()[getCurrentPages().length - 1], t = a && a.data ? a.data.despage : "", n = a.route || "", o = {
                type: "mini-program-Error",
                pvPageStayTime: new Date().getTime() / 1e3,
                adviserId: "",
                imTalkId: "",
                imTalkType: "",
                pvCurPageName: "app.js-onError",
                clkDesPage: "",
                clkName: "",
                clkId: "",
                expand: t + ";route:" + n + ";houseId=" + r.houseId + ";errmessage=" + JSON.stringify(e)
            };
            s.trackRequest(o);
        } catch (e) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            console.error("***app.js-onError***", e);
        }
    },
    authorizeSet: function(e) {
        var a = this, t = getCurrentPages()[getCurrentPages().length - 1];
        if (!t) return console.error("***app.js-authorizeSet-currPage no exit!!!***", t), 
        !1;
        if (console.log("***app.js-authorizeSet***", a.globalData.phone, a.globalData.single.headPortrait, wx.getStorageSync("phone")), 
        a.globalData.tmpPhone) "function" == typeof e && e(); else if (a.globalData.phone) if (t.setData({
            showPhoneModel: !1
        }), a.globalData.isUserInfo) "function" == typeof e && e(); else if (wx.getStorageSync("userInfo")) "function" == typeof e && e(); else {
            t.setData({
                showInfoModel: !0
            });
            var n = {
                eventId: "exp_2cmina_12",
                eventName: "qingqiushouquan",
                type: "EXP",
                eventModuleDes: JSON.stringify({
                    "wx.authorize.scope": "wx.getUserInfo"
                }),
                pvCurPageName: t.data.despage || ""
            };
            s.trackRequest(n);
        } else {
            t.setData({
                showPhoneModel: !0
            });
            var o = {
                eventId: "exp_2cmina_12",
                eventName: "qingqiushouquan",
                eventModuleDes: JSON.stringify({
                    "wx.authorize.scope": "wx.getPhoneNum"
                }),
                type: "EXP",
                pvCurPageName: t.data.despage || ""
            };
            s.trackRequest(o);
        }
    },
    judgeGlobalUserShow: function(e) {
        var a = this, t = getCurrentPages()[getCurrentPages().length - 1];
        if (!t) return console.error("***app.js-authorizeSet-currPage no exit!!!***", t), 
        !1;
        r.imPhoneAuthorize ? a.globalData.globalUserInfoFlagForShare ? "function" == typeof e && e(!1) : wx.getStorageSync("ISauthorizeInfo") ? "function" == typeof e && e(!1) : "function" == typeof e && e(!0) : "function" == typeof e && e(!1);
    },
    decrypt: function(e, t) {
        var l = this;
        return a(o.default.mark(function a() {
            var i, g, u, c, d;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (i = l, e && e.scene && (g = decodeURIComponent(e.scene), e.shareToken = g, console.log("被scene先覆盖了")), 
                    e && e.shareToken && "null" != e.shareToken && "undefined" != e.shareToken && (i.globalData.fromChannel = e.shareToken), 
                    !i.globalData.fromChannel) {
                        a.next = 11;
                        break;
                    }
                    return console.log("***开始解密来源信息***", i.globalData.fromChannel), u = {
                        shareSign: i.globalData.fromChannel
                    }, a.next = 8, (0, n.default)("decrypt", u, !0);

                  case 8:
                    c = a.sent, console.log("***decryptHandle***", c), c && c.success ? (console.log("***解密来源信息成功***", c.single), 
                    c.single && (i.globalData.tfbGetUrl = c.single.tfbUrl, i.globalData.shareId = c.single.customerId, 
                    i.globalData.layoutId = c.single.layoutId || "", i.globalData.attrs = c.single.attrs ? JSON.parse(c.single.attrs) : "", 
                    i.globalData.exchangedFromChannel = JSON.stringify(c.single), c.single.adviserId && (i.globalData.adviserId = c.single.adviserId, 
                    console.log("***来源信息有绑定顾问***", i.globalData.adviserId)))) : (d = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "app.js-decrypt",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(c) + ";houseId=" + r.houseId + ";param=" + JSON.stringify(u)
                    }, s.trackRequest(d));

                  case 11:
                    "function" == typeof t && t();

                  case 12:
                  case "end":
                    return a.stop();
                }
            }, a, l);
        }))();
    },
    getUserInfo: function(e) {
        this.globalData.userInfo = wx.getStorageSync("userInfo"), this.globalData.userInfo && "function" == typeof e && e(this.globalData.userInfo);
    },
    event: function(e) {
        console.log("app.js执行event"), this.gloabalFun.a && "function" == typeof this.gloabalFun.a && this.gloabalFun.a(e);
    },
    loginHandle: function(e, t) {
        var l = this;
        return a(o.default.mark(function a() {
            var i, g, d, p, f, h, m, b, I, D, k;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return i = l, a.next = 3, (0, n.default)("login", e, !0);

                  case 3:
                    if (g = a.sent, console.log("***loginHandle***", g), !(g && g.success && g.single && g.single.id && g.single.openId)) {
                        a.next = 38;
                        break;
                    }
                    if (d = g.single, i.globalData.qrpictureurl = d.qrpictureurl, i.globalData.tonken = d.token, 
                    i.globalData.single = d, i.globalData.loginid = d.loginNo, i.globalData.sessionKey = d.sessionKey, 
                    i.globalData.openid = d.openId || "", i.globalData.phone = d.wxAuthMobile || "", 
                    i.globalData.identifier = (d.id || 0) + "_" + (d.houseId || 0), i.globalData.organize = d.organize || "", 
                    i.globalData.organizeUsername = d.organizeUsername || "", i.globalData.single && i.globalData.single.isImChat && "-1" == i.globalData.single.isImChat.toString() ? setTimeout(l.IMISPOP, 3e4) : i.globalData.single && i.globalData.single.isImChat && "1" == i.globalData.single.isImChat.toString() && (p = wx.getStorageSync("unReadMsgs")).sham && "1" == p.sham.toString() && (p.total--, 
                    p.sham = 0, wx.setStorageSync("unReadMsgs", p), delete p.sham), i.proto_getLoginInfo(), 
                    console.log(i.globalData.phone, i.globalData.identifier), "function" == typeof t && t(), 
                    c && c.length > 0) for (f = c.length - 1; f >= 0; f--) console.log("***回调列表***", f), 
                    "function" == typeof c[f] && c[f](), c[f] = null, c.pop();
                    return h = {
                        customerId: i.globalData.single.id,
                        houseId: r.houseId,
                        userRole: 0,
                        tfbUrl: decodeURIComponent(i.globalData.tfbSetUrl || ""),
                        mobile: i.globalData.phone,
                        attrs: JSON.stringify({
                            shareType: "link"
                        })
                    }, a.next = 25, (0, n.default)("sign", h, !0);

                  case 25:
                    if (m = a.sent, console.log("***signHandle***", m), m && m.success && m.single ? i.globalData.shareToken = m.single : (wx.reportMonitor && wx.reportMonitor("single", 4), 
                    b = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "app.js-request-sign",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(m) + ";houseId=" + r.houseId + ";param=" + JSON.stringify(h)
                    }, s.trackRequest(b)), u = !0, i.globalData.phone) {
                        a.next = 31;
                        break;
                    }
                    return a.abrupt("return");

                  case 31:
                    return I = {
                        mobile: i.globalData.phone,
                        customerId: i.globalData.single && i.globalData.single.id ? i.globalData.single.id : "",
                        houseId: r.houseId
                    }, a.next = 34, (0, n.default)("autoAuthentication", I, !0);

                  case 34:
                    (D = a.sent).success && D.single && (i.globalData.organize = D.single.organizeName || "", 
                    i.globalData.organizeUsername = D.single.organizeName || ""), a.next = 42;
                    break;

                  case 38:
                    wx.reportMonitor && wx.reportMonitor("single", 1), k = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "app.js-login-false",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(g) + ";houseId=" + r.houseId + ";param=" + JSON.stringify(e)
                    }, s.trackRequest(k), u = !0;

                  case 42:
                  case "end":
                    return a.stop();
                }
            }, a, l);
        }))();
    },
    login: function(e, a) {
        var t = this, n = this;
        t.globalData.userInfo = wx.getStorageSync("userInfo"), n.globalData.single && "null" != n.globalData.single && "undefined" != n.globalData.single && n.globalData.single.id && "null" != n.globalData.single.id && "undefined" != n.globalData.single.id ? (console.log("******app.login2-app.globalData.single***", n.globalData.single), 
        "function" == typeof e && e()) : 1 == u ? (u = !1, wx.login({
            success: function(o) {
                if (o.code) {
                    var l = t.globalData.secret, i = o.code;
                    t.globalData.code = o.code;
                    var g = {
                        code: i,
                        appid: t.globalData.appid,
                        secret: l
                    };
                    console.log("=========login-code======", g);
                    var u = {
                        source: a || "3",
                        scene: n.globalData.launchInfo && n.globalData.launchInfo.scene || "",
                        registChannel: n.globalData.fromChannel || "",
                        houseId: r.houseId,
                        code: g.code || "",
                        appId: g.appid || "",
                        secret: g.secret || ""
                    };
                    console.log("=========login-loginHandle-param======", u), t.loginHandle(u, e);
                } else {
                    wx.reportMonitor && wx.reportMonitor("single", 3);
                    var c = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "app.js-login-wx.login-code-fail",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(res) + ";houseId=" + r.houseId
                    };
                    s.trackRequest(c), wx.showToast({
                        title: "登录失败,请稍后再试",
                        icon: "warn",
                        duration: 1500
                    });
                }
            },
            fail: function(e) {
                console.log("***login-fail***", e), wx.reportMonitor && wx.reportMonitor("single", 2);
                var a = {
                    type: "mini-program-Error",
                    pvPageStayTime: new Date().getTime() / 1e3,
                    adviserId: "",
                    imTalkId: "",
                    imTalkType: "",
                    pvCurPageName: "app.js-login-wx.login",
                    clkDesPage: "",
                    clkName: "",
                    clkId: "",
                    expand: JSON.stringify(e) + ";houseId=" + r.houseId
                };
                s.trackRequest(a), u = !0, wx.showToast({
                    title: "登录失败,请稍后再试",
                    icon: "warn",
                    duration: 1500
                });
            }
        })) : (console.log("***添加登录成功后回调函数***", c.length), c.push(e));
    },
    onLoginSuccess: function() {
        var e = l.MsgStore.sessMap();
        console.log(e, "ooooo");
    },
    proto_getLoginInfo: function() {
        var e = this;
        return a(o.default.mark(function a() {
            var t, l, g, u, c;
            return o.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return t = e, l = {
                        identifier: t.globalData.identifier,
                        appId: r.sdkAppID
                    }, a.next = 4, (0, n.default)("signature", l, !0);

                  case 4:
                    g = a.sent, console.log("***signatureHandle***", g), g && g.success && g.single ? (console.log("获取usersig登录信息成功", g), 
                    t.globalData.userSig = g.single && g.single.signature ? g.single.signature : "", 
                    "" != t.globalData.userSig && "null" != t.globalData.userSig && "undefined" != t.globalData.userSig || (wx.reportMonitor && wx.reportMonitor("signature", 1), 
                    u = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "app.js-proto_getLoginInfo1",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(g) + ";param=" + JSON.stringify(l)
                    }, s.trackRequest(u)), i.setListener({
                        onLoginSuccess: t.onLoginSuccess
                    }), i.loginIM({
                        type: 0
                    })) : (console.log("***获取signature信息失败: ", g), wx.reportMonitor && wx.reportMonitor("signature", 2), 
                    c = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "app.js-proto_getLoginInfo2",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(g) + ";houseId=" + r.houseId
                    }, s.trackRequest(c));

                  case 7:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    systemInfo: {},
    gloabalFun: {
        a: null
    },
    globalData: {
        appid: "wx00e4a41b4474d0fd",
        secret: "f8e74623433ecc50ee8bc64bc5f2a145",
        shareToken: null,
        videoCustomer: null,
        openid: null,
        adviserOnlineStatusSocket: [],
        exchangedFromChannel: "",
        sessionKey: null,
        tonken: null,
        projectName: r.projectName,
        logo: null,
        shareImage: null,
        shareCardImage: null,
        houseid: r.houseId,
        code: null,
        currDespage: null,
        ip: "",
        fromChannel: "",
        imHelloWord: null,
        imRepeat: null,
        qrpictureurl: null,
        identifier: null,
        single: null,
        globalUserInfoFlagForShare: !1,
        phone: null,
        userSig: null,
        tfbSetUrl: null,
        like: null,
        isShowVideoButton: !1,
        view: null,
        adviserList: null,
        parm: null,
        loginid: null,
        userInfo: null,
        sessionTime: new Date().getTime(),
        tmpPhone: !1,
        isUserInfo: !1,
        houseTypeDetail: null,
        dataJson: "",
        pullLog: "",
        pushLog: "",
        adviserId: null,
        tfbGetUrl: "",
        houseBgImg: "http://test.static.elab-plus.com/1580885039046/42.png",
        backgroundSetting: null,
        launchInfo: null,
        longitude: "",
        latitude: "",
        SocketTask: null,
        organize: "",
        organizeUsername: "",
        businessCard: "",
        Is30Second: !1,
        EnumList: "",
        isShowHelloText: !1,
        autoTextFromCalc: null,
        videoFigure: null,
        shareCardData: null,
        statusBarHeight: 0,
        navigationHeight: 0,
        navigateStatusHeight: 0,
        navigateStatusBottomHeight: 0,
        navigateStatusContainerHeight: 0,
        selectCityCode: null,
        selectCityName: "",
        projectCity: "",
        tmpPhone_tfb: !1
    }
}, t.default.hookApp({
    onError: function(e) {},
    onLaunch: function() {},
    onShow: function(e) {},
    onHide: function() {}
}));