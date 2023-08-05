function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function n(o, i) {
                try {
                    var s = t[o](i), r = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
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

var a, n = e(require("../../lib/runtime")), o = e(require("../../lib/requestConfig")), i = e(require("../../utils/monitor.js")), s = require("../../utils/util.js"), r = getApp(), l = require("../../config.js"), u = "";

Page({
    data: {
        projectName: r.globalData.projectName,
        hasPhone: !1,
        phoneFailFun: null,
        phoneFun: null,
        showFlag: 0,
        isSend: !1,
        showAdmit: !1,
        flag: !1,
        tel: null,
        verifyCode: "",
        verifyText: "发送验证码"
    },
    getPhoneNumber: function(e) {
        var t = this;
        wx.setStorageSync("ISauthorizePhone", !0);
        var a = e.detail.iv, n = (e.detail.errMsg, r.globalData.houseid, r.globalData.tonken || ""), o = e.detail.encryptedData, i = r.globalData.sessionKey, s = r.globalData.appid;
        if (console.log("***token***", n), r.globalData.tmpPhone = !0, console.log("****getPhoneNumber****"), 
        !e.detail.encryptedData || e.detail.errMsg.includes("deny")) "function" == typeof t.data.phoneFailFun && t.data.phoneFailFun(), 
        t.setData({
            showFlag: 2
        }); else {
            if (!o || !i || !a) return wx.showToast({
                title: "授权信息错误",
                icon: "warn",
                duration: 1500
            }), !1;
            r.globalData.single ? t.getPhone(o, i, s, a, n) : t.data.setInter = setInterval(function() {
                r.globalData.single && (t.getPhone(o, i, s, a, n), clearInterval(t.data.setInter));
            }, 200);
        }
    },
    getPhone: function(e, a, i, u, d) {
        var c = this;
        return t(n.default.mark(function t() {
            var d, g, f, h;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return d = {
                        encryptedData: e,
                        sessionKey: a,
                        appId: i,
                        scene: r.globalData.launchInfo && r.globalData.launchInfo.scene || "",
                        customerId: r.globalData.single && r.globalData.single.id ? r.globalData.single.id : "",
                        houseId: l.houseId,
                        shareSign: r.globalData.fromChannel,
                        iv: u,
                        source: "7"
                    }, r.globalData.single && r.globalData.single.id || (wx.reportMonitor && wx.reportMonitor("single", 1), 
                    g = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "customsign.js-getPhone",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(d) + "---" + JSON.stringify(r.globalData) + ";houseId=" + l.houseId
                    }, s.trackRequest(g)), t.next = 4, (0, o.default)("authorizedMobile", d);

                  case 4:
                    (f = t.sent) && f.success && f.single ? (console.log("***解密手机号成功***", f), h = f.single, 
                    r.globalData.phone = h.phone, wx.setStorageSync("phone", h.phone), c.userSign(f.single.phone), 
                    "function" == typeof c.data.phoneFun && c.data.phoneFun()) : ("function" == typeof c.data.phoneFailFun && c.data.phoneFailFun(), 
                    console.log("***解密手机号失败***", f), wx.reportMonitor && wx.reportMonitor("single", 13), 
                    g = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "customsign.js-getPhone",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(f) + ";houseId=" + l.houseId + ";param" + JSON.stringify(d)
                    }, s.trackRequest(g));

                  case 6:
                  case "end":
                    return t.stop();
                }
            }, t, c);
        }))();
    },
    onShow: function(e) {
        this.myLoading = this.selectComponent("#myLoading"), this.myLoading && this.myLoading.hideLoading(), 
        i.default.pageShow();
        a = new Date().getTime();
        var t = {
            type: "PV",
            pvId: "P_2cMINA_customsign",
            pvCurPageName: "scancodecustomsign",
            pvCurPageParams: u,
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - a
        };
        s.trackRequest(t, r), wx.hideShareMenu && wx.hideShareMenu();
    },
    getCurrentPageParam: function() {
        return u;
    },
    onLoad: function(e) {
        u = JSON.stringify(e);
        var t = this;
        r.login(function() {
            console.log("***app.globalData.userInfo*", r.globalData.userInfo), r.globalData.phone && r.globalData.phone.length > 0 ? t.setData({
                hasPhone: !0,
                tel: r.globalData.phone,
                projectName: r.globalData.projectName
            }) : t.setData({
                projectName: r.globalData.projectName
            });
        }, "7");
    },
    onUnload: function() {},
    onHide: function() {},
    userPhone: function(e) {
        this.setData({
            tel: e.detail.value
        });
    },
    verifyCode: function(e) {
        this.setData({
            verifyCode: e.detail.value
        });
    },
    getVerifyCode: function() {
        var e = this;
        e.data.isSend || (/^1\d{10}$/.test(e.data.tel) ? this.data.flag || (this.data.flag = !0, 
        this.querySendCode()) : wx.showToast({
            title: "输入的手机号不合法",
            icon: "none",
            duration: 2e3
        }));
    },
    querySendCode: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var a, i, s;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, o.default)("querySendCode", {
                        phoneNumber: e.data.tel,
                        houseId: l.houseId
                    });

                  case 2:
                    a = t.sent, e.data.flag = !1, a && a.success ? (e.data.isSend = !0, e.setData({
                        showAdmit: !0
                    }), i = 60, s = setInterval(function() {
                        i > 0 ? (i -= 1, e.setData({
                            verifyText: i + "s"
                        })) : (e.data.isSend = !1, e.setData({
                            verifyText: "重新发送"
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
    sendTel: function(e) {
        var t = this;
        if (!t.data.flag) {
            if (t.data.flag = !0, !/^1\d{10}$/.test(t.data.tel)) return wx.showToast({
                title: "请输入正确的手机号",
                icon: "none",
                duration: 2e3
            }), void (t.data.flag = !1);
            if (console.log(t.data.verifyCode.length), t.data.verifyCode.length < 1) return wx.showToast({
                title: "验证码不能为空",
                icon: "none",
                duration: 2e3
            }), void (t.data.flag = !1);
            this.validateCode();
        }
    },
    validateCode: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var a, i;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a = {
                        phoneNumber: e.data.tel,
                        code: e.data.verifyCode
                    }, console.log(a, "---------验证登录验证码----------"), t.next = 4, (0, o.default)("validateCode", a);

                  case 4:
                    (i = t.sent) && i.success ? e.userSign(e.data.tel) : (e.data.flag = !1, wx.showToast({
                        title: "验证码不正确",
                        icon: "none",
                        duration: 2e3
                    }));

                  case 6:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    onReady: function() {},
    userSign: function(e) {
        var a = this;
        return t(n.default.mark(function t() {
            var i, s, u, d;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i = {
                        houseId: l.houseId,
                        mobile: e && "" != e && "null" != e && "undefined" != e ? e : a.data.tel,
                        type: 7
                    }, t.next = 3, (0, o.default)("customerVisit", i);

                  case 3:
                    if (!(s = t.sent) || !s.success) {
                        t.next = 15;
                        break;
                    }
                    return console.log("***userVisit***", s), u = {
                        houseId: l.houseId,
                        updator: r.globalData.single.id,
                        mobile: e && "" != e && "null" != e && "undefined" != e ? e : a.data.tel
                    }, t.next = 9, (0, o.default)("customerSign", u);

                  case 9:
                    d = t.sent, a.data.flag = !1, console.log("***userSign***", d), d && d.success ? a.setData({
                        showFlag: 1
                    }) : wx.showToast({
                        title: d.message,
                        icon: "none",
                        duration: 2e3
                    }), t.next = 17;
                    break;

                  case 15:
                    a.data.flag = !1, wx.showToast({
                        title: s.message,
                        icon: "none",
                        duration: 2e3
                    });

                  case 17:
                  case "end":
                    return t.stop();
                }
            }, t, a);
        }))();
    },
    userVisit: function(e) {
        var a = this;
        return t(n.default.mark(function t() {
            var i, s;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i = {
                        houseId: l.houseId,
                        mobile: e && "" != e && "null" != e && "undefined" != e ? e : a.data.tel,
                        type: 7
                    }, t.next = 3, (0, o.default)("customerVisit", i);

                  case 3:
                    s = t.sent, a.data.flag = !1, console.log("***userVisit***", s), s && s.success ? a.setData({
                        showFlag: 1
                    }) : wx.showToast({
                        title: s.message,
                        icon: "none",
                        duration: 2e3
                    });

                  case 7:
                  case "end":
                    return t.stop();
                }
            }, t, a);
        }))();
    },
    goindex: function() {
        wx.navigateTo({
            url: "../index/index",
            success: function() {},
            fail: function(e) {
                console.log(e);
            }
        });
    },
    showResolve: function() {
        this.userSign(this.data.tel);
    }
}, i.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));