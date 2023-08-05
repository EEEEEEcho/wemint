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
                    var r = t[o](i), s = r.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
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

var a, n = e(require("../../lib/runtime")), o = e(require("../../lib/requestConfig")), i = e(require("../../utils/monitor.js")), r = require("../../utils/util.js"), s = getApp(), u = require("../../config.js"), l = "";

Page({
    data: {
        verifyText: "获取验证码",
        isSend: !1,
        tel: "",
        dialog: !1,
        verifyCode: "",
        serverUrl: "http://skyforest.static.elab-plus.com/",
        pathName: {},
        templateContentId: "",
        flag: !1,
        projectPhone: "(0574)5568 6666",
        projectId: "",
        sharerImage: "",
        channel: ""
    },
    getCurrentPageParam: function() {
        return l;
    },
    onLoad: function(e) {
        l = JSON.stringify(e), this.myLoading = this.selectComponent("#myLoading"), this.myLoading && this.myLoading.showLoading();
    },
    onShow: function() {
        i.default.pageShow(), a = new Date().getTime();
        var e = {
            ip: s.globalData.ip,
            type: "PV",
            pvId: "P_2cMINA_15",
            pvCurPageName: "querenliudianye",
            pvCurPageParams: l,
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - a
        };
        console.log(e, "埋点*app.globalData.userInfo*", s.globalData.userInfo), r.trackRequest(e), 
        this.getCityInfo();
    },
    getCityInfo: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var a;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, o.default)("getCityInfo", {
                        id: u.houseId
                    });

                  case 2:
                    (a = t.sent) && a.success && a.single && (console.log("***获取项目信息***", a), e.setData({
                        projectPhone: a.single.tel || e.data.projectPhone
                    }));

                  case 4:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    getVerifyCode: function() {
        var e = this;
        e.data.isSend || (/^1\d{10}$/.test(e.data.tel) ? this.querySendCode() : wx.showToast({
            title: "输入的手机号不合法",
            icon: "none",
            duration: 2e3
        }));
    },
    querySendCode: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var a, i, r;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, o.default)("querySendCode", {
                        phoneNumber: e.data.tel,
                        houseId: u.houseId
                    });

                  case 2:
                    a = t.sent, e.data.flag = !1, a && a.success ? (e.data.isSend = !0, e.setData({
                        showAdmit: !0,
                        toView: "empty-box"
                    }), i = 60, r = setInterval(function() {
                        i > 0 ? (i -= 1, e.setData({
                            verifyText: i + "秒后获取"
                        })) : (e.data.isSend = !1, e.setData({
                            verifyText: "获取验证码"
                        }), clearInterval(r));
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
        return t(n.default.mark(function t() {
            var i, l, d, c;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i = {
                        houseId: u.houseId,
                        scene: s.globalData.launchInfo && s.globalData.launchInfo.scene || "",
                        customerId: s.globalData.single.id,
                        shareSign: s.globalData.fromChannel,
                        mobile: e.data.tel,
                        verifyCode: e.data.verifyCode,
                        dynamicSource: "1",
                        source: "3"
                    }, t.next = 3, (0, o.default)("leavePhone", i);

                  case 3:
                    l = t.sent, e.data.flag = !1, l && l.success ? (e.setData({
                        dialog: !0
                    }), d = {
                        type: "CLK",
                        pvPageStayTime: (new Date().getTime() - a) / 1e3,
                        clkDesPage: "",
                        clkName: "querenliudian",
                        clkId: "clk_2cmina_44",
                        clkParams: JSON.stringify({
                            tel: e.data.tel
                        })
                    }, r.trackRequest(d, s)) : (c = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "savephone.js-leavePhone",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(l) + JSON.stringify(i) + ";houseId=" + u.houseId
                    }, r.trackRequest(c), wx.showToast({
                        title: "系统提示:网络错误",
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
    userPhone: function(e) {
        console.log(e, "寂静欢喜"), this.setData({
            tel: e.detail.value
        });
    },
    verifyCode: function(e) {
        console.log(e, "yuan"), this.setData({
            verifyCode: e.detail.value
        }), console.log(this.data.verifyCode, "===============");
    },
    goAdviserList: function() {
        wx.navigateTo({
            url: "../counselorList/counselorList"
        });
    },
    onReady: function() {
        this.myLoading && this.myLoading.hideLoading();
    }
}, i.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));