function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function r(n, i) {
                try {
                    var s = t[n](i), o = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!s.done) return Promise.resolve(o).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(o);
            }
            return r("next");
        });
    };
}

var a = e(require("../../../lib/requestConfig")), r = e(require("../../../lib/runtime")), n = require("../../../utils/util.js"), i = require("../../../config.js"), s = getApp(), o = require("../../../getlogininfo.js"), u = (o.authorizeInfo, 
o.getUserInfo, "");

Page({
    data: {
        navbar: {
            showCapsule: 1,
            title: "报备客户",
            titleColor: "#121212",
            navPadding: 1,
            navBarColor: "#fff",
            navBackColor: "#121212",
            haveCallback: !1,
            fromShare: !1,
            pageId: null,
            pageName: "baobeikehu"
        },
        navigateStatusContainerHeight: "0px",
        userName: "",
        sexType: 1,
        phoneNum: "",
        adviserList: [],
        showSelectAdviserDialog: !1,
        msgCode: "",
        adviserName: "",
        selectAdviserInfor: "",
        inheritLogic: "",
        showDaoJiShi: !1,
        showAdviser: !1,
        currentPhone: "",
        showAdviserList: !0,
        reportStatus: "",
        currentTime: "发送验证码",
        intervarID: null
    },
    onLoad: function(e) {
        e.inheritLogic && this.setData({
            inheritLogic: e.inheritLogic,
            showAdviser: 1 != e.inheritLogic
        }), u = JSON.stringify(e), this.setData({
            navigateStatusContainerHeight: s.globalData.navigateStatusContainerHeight + "px"
        }), this.getAdviserList();
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        s.login(function() {
            if (s.globalData.phone) {
                var t = e.hidePhoneNuMiddle(s.globalData.phone);
                e.setData({
                    currentPhone: t
                });
                var a = {
                    type: "PV",
                    pvId: "p_2cmina_01018",
                    pvCurPageName: "baobeikehu",
                    pvCurPageParams: u,
                    pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
                    pvLastPageParams: "",
                    pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
                };
                n.trackRequest(a);
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getUserName: function(e) {
        var t = e.detail.value;
        this.setData({
            userName: t
        });
    },
    selectSex: function(e) {
        var t = e.currentTarget.dataset.sex;
        this.data.sexType != t && this.setData({
            sexType: t
        });
    },
    userPhone: function(e) {
        this.setData({
            reportStatus: ""
        });
        var t = e.detail.value;
        /^1\d{10}$/.test(t) ? this.setData({
            phoneNum: t
        }) : wx.showToast({
            title: "输入的手机号不合法",
            icon: "none",
            duration: 2e3
        });
    },
    showAdviserList: function() {
        var e = this.data.showSelectAdviserDialog;
        this.setData({
            showSelectAdviserDialog: !e
        });
    },
    selectAdviser: function(e) {
        var t = e.currentTarget.dataset.index, a = e.currentTarget.dataset.item;
        console.log("selectAdviser:" + t);
        var r = {
            type: "CLK",
            pvCurPageName: "baobeikehu",
            pvCurPageParams: u,
            clkId: "clk_2cmina_01028",
            clkName: "zhidingguwen",
            clkParams: {
                name: a.adviserName || ""
            }
        };
        n.trackRequest(r), this.setData({
            showSelectAdviserDialog: !1,
            adviserName: a.adviserName || "",
            currentAdviserStatus: a.status,
            selectAdviserInfor: a
        });
    },
    getMSGCodeValue: function(e) {
        var t = e.detail.value;
        this.setData({
            msgCode: t
        });
    },
    getMSGCode: function() {
        var e = {
            type: "CLK",
            pvCurPageName: "baobeikehu",
            pvCurPageParams: u,
            clkId: "clk_2cmina_01029",
            clkName: "fasongyanzhengma",
            clkParams: {
                phoneNumber: s.globalData.phone || ""
            }
        };
        n.trackRequest(e), this.querySendCode();
    },
    querySendCode: function() {
        var e = this;
        return t(r.default.mark(function t() {
            var n, o, u;
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (!e.data.showDaoJiShi) {
                        t.next = 2;
                        break;
                    }
                    return t.abrupt("return");

                  case 2:
                    return n = {
                        phoneNumber: s.globalData.phone,
                        houseId: i.houseId,
                        smsCode: "SMS_002"
                    }, t.next = 5, (0, a.default)("querySendCode", n);

                  case 5:
                    o = t.sent, console.log("querySendCode", o), e.data.flag = !1, o && o.success ? (e.setData({
                        showDaoJiShi: !0
                    }), e.handleTime()) : (u = "系统提示:网络错误", o.message.indexOf("验证码未过期") >= 0 && (u = "您的操作过于频繁，请稍后再试"), 
                    wx.showToast({
                        title: u,
                        icon: "none",
                        duration: 2e3
                    }));

                  case 9:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    getAdviserList: function() {
        var e = this;
        return t(r.default.mark(function t() {
            var n, o, u, d, c, l, h, v;
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = {
                        houseId: i.houseId,
                        reporterMobile: s.globalData.phone || "",
                        inheritLogic: e.data.inheritLogic
                    }, t.next = 3, (0, a.default)("adviserListByManualRecord", n);

                  case 3:
                    if (o = t.sent, console.log("getAdviserList", o), !o.success || !o.list) {
                        t.next = 26;
                        break;
                    }
                    for (e.setData({
                        adviserList: o.list
                    }), u = !0, d = !1, c = void 0, t.prev = 10, l = o.list[Symbol.iterator](); !(u = (h = l.next()).done); u = !0) (v = h.value).autoInherit && (e.setData({
                        adviserName: v.adviserName || "",
                        currentAdviserStatus: v.status,
                        selectAdviserInfor: v
                    }), 1 == v.status && e.setData({
                        showAdviserList: !1
                    }), 3 == e.data.inheritLogic || 4 == e.data.inheritLogic ? e.setData({
                        showAdviserList: !0
                    }) : 2 == e.data.inheritLogic && -1 == v.status && e.setData({
                        showAdviserList: !0
                    }));
                    t.next = 18;
                    break;

                  case 14:
                    t.prev = 14, t.t0 = t.catch(10), d = !0, c = t.t0;

                  case 18:
                    t.prev = 18, t.prev = 19, !u && l.return && l.return();

                  case 21:
                    if (t.prev = 21, !d) {
                        t.next = 24;
                        break;
                    }
                    throw c;

                  case 24:
                    return t.finish(21);

                  case 25:
                    return t.finish(18);

                  case 26:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 10, 14, 18, 26 ], [ 19, , 21, 25 ] ]);
        }))();
    },
    commitReport: function() {
        var e = this;
        return t(r.default.mark(function t() {
            var o, d, c, l, h;
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (e.data.phoneNum) {
                        t.next = 3;
                        break;
                    }
                    return wx.showToast({
                        title: "请输入手机号",
                        icon: "none",
                        duration: 1500
                    }), t.abrupt("return");

                  case 3:
                    if (e.data.userName) {
                        t.next = 6;
                        break;
                    }
                    return wx.showToast({
                        title: "请输入客户名称",
                        icon: "none",
                        duration: 1500
                    }), t.abrupt("return");

                  case 6:
                    if (!e.data.showAdviser) {
                        t.next = 10;
                        break;
                    }
                    if (e.data.adviserName && -1 != e.data.currentAdviserStatus) {
                        t.next = 10;
                        break;
                    }
                    return wx.showToast({
                        title: "请选择有效顾问",
                        icon: "none",
                        duration: 1500
                    }), t.abrupt("return");

                  case 10:
                    return o = {
                        mobile: s.globalData.phone,
                        code: e.data.msgCode,
                        verifyType: 1
                    }, e.myLoading = e.selectComponent("#myLoading"), e.myLoading && e.myLoading.showLoading(), 
                    t.next = 15, (0, a.default)("validate", o);

                  case 15:
                    if (d = t.sent, console.log("---------validateCodeRes----------", d), !d || d.success) {
                        t.next = 21;
                        break;
                    }
                    return wx.showToast({
                        title: "验证码输入错误",
                        icon: "none",
                        duration: 1500
                    }), e.myLoading && e.myLoading.hideLoading(), t.abrupt("return");

                  case 21:
                    return c = {
                        houseId: i.houseId,
                        mobile: e.data.phoneNum,
                        name: e.data.userName,
                        reporterCustomerId: s.globalData.single.id || "",
                        reporterMobile: s.globalData.phone || "",
                        sex: e.data.sexType
                    }, l = {
                        type: "CLK",
                        pvCurPageName: "baobeikehu",
                        pvCurPageParams: u,
                        clkId: "clk_2cmina_01030",
                        clkName: "tijiaobaobei",
                        clkParams: c
                    }, n.trackRequest(l), e.data.showAdviser && (c.adviserId = e.data.selectAdviserInfor.adviserId, 
                    c.adviserMobile = e.data.selectAdviserInfor.adviserMobile, c.adviserName = e.data.selectAdviserInfor.adviserName), 
                    t.next = 27, (0, a.default)("manualRecord", c);

                  case 27:
                    h = t.sent, console.log("commitReport", h), h.single && e.setData({
                        reportStatus: h.single
                    }), e.myLoading && e.myLoading.hideLoading(), h.success && wx.showModal({
                        title: "报备成功",
                        content: "",
                        confirmText: "确认",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && (e.data.intervarID && clearInterval(e.data.intervarID), e.setData({
                                phoneNum: "",
                                userName: "",
                                sexType: 1,
                                msgCode: "",
                                showDaoJiShi: !1,
                                currentTime: "重新发送"
                            }), e.data.showAdviserList && e.setData({
                                adviserName: ""
                            }));
                        }
                    });

                  case 32:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    handleTime: function() {
        var e = this, t = 60;
        e.setData({
            currentTime: t + "s"
        }), e.setData({
            intervarID: setInterval(function() {
                (t -= 1) <= 0 ? (clearInterval(e.data.intervarID), e.setData({
                    showDaoJiShi: !1,
                    currentTime: "重新发送",
                    intervarID: null
                })) : e.setData({
                    currentTime: t + "s"
                });
            }, 1e3)
        });
    },
    hidePhoneNuMiddle: function(e) {
        var t = /^(\d{3})\d{4}(\d{4})$/;
        return e.replace(t, "$1****$2");
    }
});