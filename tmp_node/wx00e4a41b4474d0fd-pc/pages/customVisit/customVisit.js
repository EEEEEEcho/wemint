function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
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

var t, n = e(require("../../lib/runtime")), o = e(require("../../lib/requestConfig")), i = e(require("../../utils/monitor.js")), s = require("../../utils/util.js"), r = getApp(), l = require("../../config.js"), u = "";

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
        verifyText: "发送验证码",
        codeStatus: -1,
        sign: ""
    },
    getPhoneNumber: function(e) {
        var a = this;
        wx.setStorageSync("ISauthorizePhone", !0);
        var t = e.detail.iv, n = (e.detail.errMsg, r.globalData.houseid, r.globalData.tonken || ""), o = e.detail.encryptedData, i = r.globalData.sessionKey, s = r.globalData.appid;
        if (console.log("***token***", n), r.globalData.tmpPhone = !0, console.log("****getPhoneNumber****"), 
        !e.detail.encryptedData || e.detail.errMsg.includes("deny")) "function" == typeof a.data.phoneFailFun && a.data.phoneFailFun(), 
        a.afterPhoneHandle("fail"); else {
            if (!o || !i || !t) return wx.showToast({
                title: "授权信息错误",
                icon: "warn",
                duration: 1500
            }), !1;
            r.globalData.single ? (a.getPhone(o, i, s, t, n), a.afterPhoneHandle("success")) : a.data.setInter = setInterval(function() {
                r.globalData.single && (a.getPhone(o, i, s, t, n), clearInterval(a.data.setInter), 
                a.afterPhoneHandle("fail"));
            }, 200);
        }
    },
    getPhone: function(e, t, i, u, c) {
        var g = this;
        return a(n.default.mark(function a() {
            var c, d, f, h;
            return n.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return c = {
                        encryptedData: e,
                        sessionKey: t,
                        appId: i,
                        scene: r.globalData.launchInfo && r.globalData.launchInfo.scene || "",
                        customerId: r.globalData.single && r.globalData.single.id ? r.globalData.single.id : "",
                        houseId: l.houseId,
                        shareSign: r.globalData.fromChannel,
                        iv: u,
                        source: "7"
                    }, r.globalData.single && r.globalData.single.id || (wx.reportMonitor && wx.reportMonitor("single", 1), 
                    d = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "customvisit.js-getPhone",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(c) + "---" + JSON.stringify(r.globalData) + ";houseId=" + l.houseId
                    }, s.trackRequest(d)), a.next = 4, (0, o.default)("authorizedMobile", c);

                  case 4:
                    (f = a.sent) && f.success && f.single ? (console.log("***解密手机号成功***", f), h = f.single, 
                    r.globalData.phone = h.phone, g.userVisit(f.single.phone), wx.setStorageSync("phone", h.phone), 
                    "function" == typeof g.data.phoneFun && g.data.phoneFun()) : ("function" == typeof g.data.phoneFailFun && g.data.phoneFailFun(), 
                    console.log("***解密手机号失败***", f), wx.reportMonitor && wx.reportMonitor("single", 12), 
                    d = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "customvisit.js-getPhone",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(f) + ";houseId=" + l.houseId + ";param" + JSON.stringify(c)
                    }, s.trackRequest(d));

                  case 6:
                  case "end":
                    return a.stop();
                }
            }, a, g);
        }))();
    },
    onShow: function(e) {
        this.myLoading = this.selectComponent("#myLoading"), this.myLoading && this.myLoading.hideLoading(), 
        i.default.pageShow();
        t = new Date().getTime();
        var a = {
            type: "PV",
            pvId: "P_2cMINA_customvisit",
            pvCurPageName: "scancodecustomvisit",
            pvCurPageParams: u,
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - t
        };
        s.trackRequest(a, r), wx.hideShareMenu && wx.hideShareMenu();
    },
    getCurrentPageParam: function() {
        return u;
    },
    afterPhoneHandle: function(e) {
        var a = {
            clkDesPage: "",
            type: "CLK",
            pvCurPageName: "scancodecustomvisit",
            pvCurPageParams: u,
            clkId: "clk_2cmina_137",
            clkName: "weixinshouquan",
            clkParams: {
                "wx.authorize.scope": "wx.getPhoneNum",
                type: e
            }
        };
        s.trackRequest(a);
    },
    onLoad: function(e) {
        this.setData({
            sign: e.scene
        }), this.qrCodeGetStatus(e.scene), u = JSON.stringify(e);
        var a = this;
        r.login(function() {
            a.modifyUserInfo(), console.log("***app.globalData.userInfo*", r.globalData.userInfo), 
            r.globalData.phone && r.globalData.phone.length > 0 ? a.setData({
                hasPhone: !0,
                tel: r.globalData.phone,
                projectName: r.globalData.projectName
            }) : a.setData({
                projectName: r.globalData.projectName
            });
        }, "7");
    },
    modifyUserInfo: function() {
        var e = this;
        return a(n.default.mark(function a() {
            var t, i;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return t = {
                        source: 7,
                        id: r.globalData.single && r.globalData.single.id ? r.globalData.single.id : "",
                        houseId: l.houseId
                    }, e.next = 3, (0, o.default)("modifyUserInfo", t);

                  case 3:
                    (i = e.sent) && i.success;

                  case 5:
                  case "end":
                    return e.stop();
                }
            }, a, e);
        }))();
    },
    onUnload: function() {},
    onHide: function() {},
    onReady: function() {},
    qrCodeGetStatus: function(e) {
        var t = this;
        return a(n.default.mark(function a() {
            var i, s;
            return n.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return i = {
                        sign: e
                    }, a.next = 3, (0, o.default)("qrCodeGetStatus", i);

                  case 3:
                    (s = a.sent) && s.success ? t.setData({
                        codeStatus: 1
                    }) : t.setData({
                        codeStatus: 0
                    });

                  case 5:
                  case "end":
                    return a.stop();
                }
            }, a, t);
        }))();
    },
    userVisit: function(e) {
        var t = this;
        return a(n.default.mark(function a() {
            var i, s;
            return n.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return i = {
                        houseId: l.houseId,
                        mobile: e && "" != e && "null" != e && "undefined" != e ? e : t.data.tel,
                        customerId: r.globalData.single && r.globalData.single.id ? r.globalData.single.id : "",
                        sign: t.data.sign
                    }, a.next = 3, (0, o.default)("visitAddVisitQueue", i);

                  case 3:
                    s = a.sent, t.data.flag = !1, console.log("***userVisit***", s), s && s.success ? t.setData({
                        showFlag: 1
                    }) : wx.showToast({
                        title: s.message,
                        icon: "none",
                        duration: 2e3
                    });

                  case 7:
                  case "end":
                    return a.stop();
                }
            }, a, t);
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
        this.clickMaidian(), this.userVisit(this.data.tel);
    },
    clickMaidian: function() {
        var e = {
            clkDesPage: "",
            type: "CLK",
            pvCurPageName: "scancodecustomvisit",
            pvCurPageParams: u,
            clkId: "clk_2cmina_256",
            clkName: "dianjishouquan",
            clkParams: {}
        };
        s.trackRequest(e);
    }
}, i.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));