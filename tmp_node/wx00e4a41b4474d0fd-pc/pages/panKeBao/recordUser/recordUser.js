function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function n(r, s) {
                try {
                    var o = t[r](s), i = o.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!o.done) return Promise.resolve(i).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(i);
            }
            return n("next");
        });
    };
}

var a = e(require("../../../lib/requestConfig")), n = e(require("../../../lib/runtime")), r = require("../../../utils/util.js"), s = require("../../../config.js"), o = getApp(), i = require("../../../getlogininfo.js"), l = (i.authorizeInfo, 
i.getUserInfo, ""), c = "";

Page({
    data: {
        despage: "recordUser.js",
        navbar: {
            showCapsule: 1,
            title: "身份认证",
            titleColor: "#121212",
            navPadding: 1,
            navBarColor: "#fff",
            navBackColor: "#121212",
            haveCallback: !0,
            fromShare: !1,
            pageId: null,
            pageName: "",
            capsuleUrl: ""
        },
        navigateStatusContainerHeight: "0px",
        hasLaoYeZhu: !1,
        hasQuanMinJinJiRen: !1,
        hasQuDaoJinJiRen: !1,
        selectUseType: null,
        recordButtonClickAble: !1,
        selectUserUI: !0,
        recordUserUI: !1,
        agreementUI: !1,
        successUI: !1,
        failUI: !1,
        sexGroups: [ {
            value: "先生",
            name: "男",
            checked: !0,
            type: 1
        }, {
            value: "女士",
            name: "女",
            checked: !1,
            type: 0
        } ],
        selectSexType: 1,
        organizeCode: "",
        userName: "",
        agreeRule: !1,
        editorCtx: null,
        electronTreaty: "",
        listData: [],
        showPhoneModel: !1,
        showInfoModel: !1,
        projectName: "",
        sexInformation: {},
        listEntranceData: [],
        resultMessage: ""
    },
    onLoad: function(e) {
        this.setData({
            navigateStatusContainerHeight: o.globalData.navigateStatusContainerHeight + "px",
            projectName: o.globalData.projectName
        }), l = JSON.stringify(e), this.myLoading = this.selectComponent("#myLoading"), 
        wx.hideShareMenu(), this.entrance(), this.getUserInformation();
    },
    onReady: function() {},
    onShow: function() {
        c = new Date().getTime(), o.login(function() {
            var e = {
                ip: o.globalData.ip,
                type: "PV",
                pvId: "p_2cmina_01001",
                pvCurPageName: "shenfenxuanze",
                pvCurPageParams: l,
                pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
                pvLastPageParams: "",
                pvPageLoadTime: new Date().getTime() - c
            };
            r.trackRequest(e, o);
        });
    },
    getCurrentPageParam: function() {
        return l;
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    afterPhoneHandle: function(e) {
        this.setData({
            showPhoneModel: !1
        }), o.globalData.phone && this.getAuthenticationStatus(), "fail" == e.type && wx.showToast({
            title: "您已拒绝授权",
            icon: "none",
            duration: 1500
        });
        var t = {
            clkDesPage: "",
            type: "CLK",
            pvCurPageName: "shenfenxuanze",
            pvCurPageParams: l,
            clkId: "clk_2cmina_01005",
            clkName: "shouquanyanzheng",
            clkParams: {
                customerId: (o.globalData.single && o.globalData.single.id ? o.globalData.single.id : "").toString(),
                role: (this.data.selectUseType || "").toString(),
                "wx.authorize.scope": "wx.getPhoneNum",
                type: e.detail.type
            }
        };
        r.trackRequest(t);
    },
    getAuthenticationStatus: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var i, l, u;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i = {
                        customerId: o.globalData.single && o.globalData.single.id ? o.globalData.single.id : "",
                        houseId: s.houseId,
                        mobile: o.globalData.phone
                    }, console.log("getAuthenticationStatus", i), t.next = 4, (0, a.default)("getAuthenticationStatus", i);

                  case 4:
                    l = t.sent, console.log("getAuthenticationStatus", l), l.success ? (l.single ? 1 == l.single.verificationStatus ? l.single.verificationRole == e.data.selectUseType ? e.setData({
                        selectUserUI: !1,
                        successUI: !0,
                        "navbar.capsuleUrl": "https://dm.static.elab-plus.com/miniprogram/recordUser/exit.png"
                    }) : e.setData({
                        selectUserUI: !1,
                        failUI: !0,
                        "navbar.capsuleUrl": "https://dm.static.elab-plus.com/miniprogram/recordUser/exit.png"
                    }) : 2 == l.single.verificationStatus ? e.setData({
                        selectUserUI: !1,
                        recordUserUI: !0,
                        "navbar.capsuleUrl": "https://dm.static.elab-plus.com/miniprogram/recordUser/exit.png"
                    }) : 3 == l.single.verificationStatus && e.setData({
                        selectUserUI: !1,
                        recordUserUI: !0,
                        "navbar.capsuleUrl": "https://dm.static.elab-plus.com/miniprogram/recordUser/exit.png"
                    }) : e.setData({
                        selectUserUI: !1,
                        recordUserUI: !0,
                        "navbar.capsuleUrl": "https://dm.static.elab-plus.com/miniprogram/recordUser/exit.png"
                    }), e.setData({
                        resultMessage: l.message
                    }), e.data.recordUserUI && (u = {
                        ip: o.globalData.ip,
                        type: "PV",
                        pvId: "p_2cmina_01002",
                        pvCurPageName: "yanzheng",
                        pvCurPageParams: {
                            customerId: (o.globalData.single && o.globalData.single.id ? o.globalData.single.id : "").toString(),
                            role: (e.data.selectUseType || "").toString()
                        },
                        pvLastPageName: "",
                        pvLastPageParams: "",
                        pvPageLoadTime: new Date().getTime() - c
                    }, r.trackRequest(u, o))) : e.setData({
                        resultMessage: ""
                    });

                  case 7:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    entrance: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var r, o, i, l, c, u, g, d;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e.myLoading && e.myLoading.showLoading(), r = {
                        houseId: s.houseId
                    }, console.log("entrance", r), t.next = 5, (0, a.default)("entrance", r, !1);

                  case 5:
                    if (o = t.sent, console.log("entrance", o), !o.success) {
                        t.next = 29;
                        break;
                    }
                    if (!o.list) {
                        t.next = 29;
                        break;
                    }
                    for (e.setData({
                        listEntranceData: o.list
                    }), i = !0, l = !1, c = void 0, t.prev = 13, u = o.list[Symbol.iterator](); !(i = (g = u.next()).done); i = !0) 1 == (d = g.value).role ? e.setData({
                        hasLaoYeZhu: !0
                    }) : 2 == d.role ? e.setData({
                        hasQuanMinJinJiRen: !0
                    }) : 3 == d.role && e.setData({
                        hasQuDaoJinJiRen: !0
                    });
                    t.next = 21;
                    break;

                  case 17:
                    t.prev = 17, t.t0 = t.catch(13), l = !0, c = t.t0;

                  case 21:
                    t.prev = 21, t.prev = 22, !i && u.return && u.return();

                  case 24:
                    if (t.prev = 24, !l) {
                        t.next = 27;
                        break;
                    }
                    throw c;

                  case 27:
                    return t.finish(24);

                  case 28:
                    return t.finish(21);

                  case 29:
                    e.myLoading && e.myLoading.hideLoading();

                  case 30:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 13, 17, 21, 29 ], [ 22, , 24, 28 ] ]);
        }))();
    },
    getUserInformation: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var r, o;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return r = {
                        houseId: s.houseId
                    }, console.log("getUserInformation", r), t.next = 4, (0, a.default)("verificationList", r);

                  case 4:
                    o = t.sent, console.log("getUserInformation", o), o.success && e.setData({
                        listData: o.list
                    });

                  case 7:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    handleUserInformation: function(e) {
        this.setData({
            electronTreaty: e.electronTreaty
        });
    },
    navbarBackClk: function() {
        var e = {};
        e = this.data.selectUserUI ? {
            clkDesPage: "chenggongtuijian",
            type: "CLK",
            pvCurPageName: "shenfenxuanze",
            pvCurPageParams: l,
            clkId: "clk_2cmina_01025",
            clkName: "xuanzeshenfenguanbi",
            clkParams: {
                customerId: (o.globalData.single && o.globalData.single.id ? o.globalData.single.id : "").toString(),
                role: (this.data.selectUseType || "").toString()
            }
        } : {
            clkDesPage: "chenggongtuijian",
            type: "CLK",
            pvCurPageName: "yanzhengjieguo",
            pvCurPageParams: l,
            clkId: "clk_2cmina_01006",
            clkName: "yanzhengguanbi",
            clkParams: {
                customerId: (o.globalData.single && o.globalData.single.id ? o.globalData.single.id : "").toString(),
                role: (this.data.selectUseType || "").toString()
            }
        }, r.trackRequest(e), wx.navigateBack();
    },
    exitElectronTreatyContent: function() {
        this.setData({
            agreementUI: !1
        });
    },
    selectUserType: function(e) {
        var t = parseInt(e.currentTarget.dataset.type);
        this.setData({
            recordButtonClickAble: !0,
            selectUseType: t
        });
    },
    recordUserFuc: function() {
        if (this.data.recordButtonClickAble) {
            var e = !0, t = !1, a = void 0;
            try {
                for (var n, s = this.data.listData[Symbol.iterator](); !(e = (n = s.next()).done); e = !0) {
                    var i = n.value;
                    if (i.role == this.data.selectUseType) {
                        this.handleUserInformation(i);
                        break;
                    }
                }
            } catch (e) {
                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                t = !0, a = e;
            } finally {
                try {
                    !e && s.return && s.return();
                } finally {
                    if (t) throw a;
                }
            }
            o.globalData.phone ? this.getAuthenticationStatus() : this.setData({
                showPhoneModel: !0
            });
            var c = {
                clkDesPage: "",
                type: "CLK",
                pvCurPageName: "shenfenxuanze",
                pvCurPageParams: l,
                clkId: "clk_2cmina_01004",
                clkName: "xuanzeshenfen",
                clkParams: {
                    customerId: (o.globalData.single && o.globalData.single.id ? o.globalData.single.id : "").toString(),
                    role: (this.data.selectUseType || "").toString()
                }
            };
            r.trackRequest(c);
        }
    },
    selectSex: function(e) {
        this.setData({
            selectSexType: e.detail.value
        });
    },
    getUserName: function(e) {
        var t = e.detail.value;
        t.length > 20 ? wx.showToast({
            title: "用户名最多为20个",
            icon: "none",
            duration: 1500
        }) : this.setData({
            userName: t
        });
    },
    getOrganizeCode: function(e) {
        var t = e.detail.value;
        this.setData({
            organizeCode: t
        });
    },
    checkAgreement: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var a;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    e.setData({
                        agreementUI: !0
                    }), a = e, wx.createSelectorQuery().select("#electronTreatyContent").context(function(e) {
                        var t = e.context;
                        console.log("checkAgreement:", a.data.electronTreaty), t.setContents({
                            html: a.data.electronTreaty,
                            success: function() {
                                console.log("insert html success");
                            }
                        });
                    }).exec();

                  case 3:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    agreeElectronTreatyContent: function() {
        var e = this.data.agreeRule;
        this.setData({
            agreeRule: !e,
            recordUserUI: !0,
            agreementUI: !1
        });
    },
    authenticationCommit: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var i, l, u;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (e.data.agreeRule) {
                        t.next = 2;
                        break;
                    }
                    return t.abrupt("return");

                  case 2:
                    if (e.data.userName) {
                        t.next = 5;
                        break;
                    }
                    return wx.showToast({
                        title: "请输入用户名",
                        icon: "none",
                        duration: 1500
                    }), t.abrupt("return");

                  case 5:
                    if (2 == e.data.selectUseType || e.data.organizeCode) {
                        t.next = 8;
                        break;
                    }
                    return wx.showToast({
                        title: "请输入组织验证码",
                        icon: "none",
                        duration: 1500
                    }), t.abrupt("return");

                  case 8:
                    return i = {
                        customerId: o.globalData.single && o.globalData.single.id ? o.globalData.single.id : "",
                        houseId: s.houseId,
                        mobile: o.globalData.phone,
                        name: e.data.userName,
                        organizeCode: e.data.organizeCode,
                        role: e.data.selectUseType,
                        sex: e.data.selectSexType
                    }, console.log("authenticationCommit", i), t.next = 12, (0, a.default)("authentication", i);

                  case 12:
                    l = t.sent, console.log("authenticationCommit", l), l.success ? e.setData({
                        successUI: !0,
                        resultMessage: l.message,
                        recordUserUI: !1,
                        userName: l.single.name || ""
                    }) : e.setData({
                        failUI: !0,
                        resultMessage: l.message,
                        recordUserUI: !1
                    }), u = {
                        ip: o.globalData.ip,
                        type: "PV",
                        pvId: "p_2cmina_01003",
                        pvCurPageName: "yanzhengjieguo",
                        pvCurPageParams: {
                            customerId: (o.globalData.single && o.globalData.single.id ? o.globalData.single.id : "").toString(),
                            role: (e.data.selectUseType || "").toString(),
                            organizeCode: (e.data.organizeCode || "").toString(),
                            result: l.success.toString()
                        },
                        pvLastPageName: "",
                        pvLastPageParams: "",
                        pvPageLoadTime: new Date().getTime() - c
                    }, r.trackRequest(u, o);

                  case 17:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    successUICommit: function() {
        wx.navigateBack();
    }
});