function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    return function() {
        var a = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function n(r, o) {
                try {
                    var s = a[r](o), i = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!s.done) return Promise.resolve(i).then(function(e) {
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

var t = e(require("../../lib/requestConfig")), n = e(require("../../utils/monitor.js")), r = e(require("../../lib/runtime")), o = require("../../utils/util.js"), s = require("../../config.js"), i = getApp(), c = require("../../getlogininfo.js"), l = (c.authorizeInfo, 
c.getUserInfo), u = "", d = "chenggongtuijian";

Page({
    data: {
        serverUrl: "http://skyforest.static.elab-plus.com/wepy_pro/v1-2/",
        jbColor1: " #6294A6",
        jbColor2: "#3B4B81",
        list: [],
        showInfoModel: !1,
        showPhoneModel: !1,
        isOrg: !1,
        phoneFailFun: null,
        phoneFun: null,
        setInter: null,
        currentNum: 0,
        headList: [],
        noMan: !0,
        isGetHeadList: !1,
        showMySuggest: !0,
        nuClearList: [],
        navbar: {
            showCapsule: 1,
            title: "我的推荐",
            titleColor: "#fff",
            navPadding: 0,
            navBarColor: "",
            navBackColor: "#fff",
            haveCallback: !1,
            fromShare: !1,
            pageId: null,
            pageName: ""
        },
        navigateStatusContainerHeight: "0px",
        showRecommend: !0,
        showBaoBei: !1,
        recommendList: [],
        recordList: [],
        recommendUnRecordList: [],
        recordUnRecordList: [],
        recommendPageSize: 10,
        recommendPageNo: 1,
        _recommendListHaveAllData: !1,
        recordPageSize: 10,
        recordPageNo: 1,
        _recordListHaveAllData: !1,
        bindStatusCode: null,
        noVerifiedRecommendListHaveAllData: !1,
        noVerifiedRecommendPageSize: 10,
        noVerifiedRecommendPageNo: 1,
        noVerifiedRecommendList: [],
        specialUser: !1,
        specialUserType: null,
        specialRole: null,
        baobeiTableView: !1,
        recommendSuccessCount: 0,
        recommendSuccessCountWithBuild: 0,
        recordCount: 0,
        agentName: "",
        agentStatus: 1,
        hasRecordData: 0,
        getWuGuanRequest: !1,
        inheritLogic: "",
        manualRecord: "",
        specialRoleName: ""
    },
    onLoad: function(e) {
        this.setData({
            navigateStatusContainerHeight: i.globalData.navigateStatusContainerHeight + "px"
        }), u = JSON.stringify(e), this.myLoading = this.selectComponent("#myLoading"), 
        this.myLoading && this.myLoading.showLoading();
    },
    onShow: function(e) {
        var a = this;
        wx.setStorageSync("loadTime", new Date().getTime()), i.login(function() {
            a.getHeadList(), a.entrance();
        });
        var t = {
            type: "PV",
            pvId: "p_2cmina_01007",
            pvCurPageName: "chenggongtuijian",
            pvCurPageParams: u,
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
        };
        o.trackRequest(t, i);
    },
    entrance: function() {
        var e = this;
        return a(r.default.mark(function a() {
            var n, o;
            return r.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return n = {
                        houseId: s.houseId
                    }, a.next = 3, (0, t.default)("entrance", n);

                  case 3:
                    o = a.sent, console.log("entrance:", o), o.success && o.list && o.list.length > 0 ? i.globalData.phone ? (e.setData({
                        showPhoneModel: !1
                    }), e.checkoutRecordStatus()) : (e.setData({
                        specialUserType: 1,
                        showPhoneModel: !0,
                        specialUser: !1
                    }), e.getNoVerifiedRecommendList()) : (console.log("app.globalData.phone:" + i.globalData.phone), 
                    e.setData({
                        showPhoneModel: !i.globalData.phone,
                        isOrg: i.globalData.organize,
                        specialUser: !1
                    }), e.getNoVerifiedRecommendList());

                  case 6:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    getHeadList: function() {
        var e = this;
        return a(r.default.mark(function a() {
            var n, o;
            return r.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.next = 2, (0, t.default)("queryViewCustomer", {
                        houseId: s.houseId,
                        customerId: i.globalData.single.id
                    });

                  case 2:
                    (n = a.sent).success && (console.log("成功推荐头像列表", n.list), o = n.list.length > 15 ? n.list.slice(0, 15) : n.list, 
                    e.setData({
                        headList: o,
                        currentNum: n.list.length || 0,
                        isGetHeadList: !0
                    }));

                  case 4:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    onUnload: function() {
        o.stopTrackEventTimeObj();
    },
    onHide: function() {
        o.stopTrackEventTimeObj();
    },
    transformTime: function(e) {
        if (!e) return "";
        var a = new Date(1e3 * e), t = a.getFullYear() + "-", n = (a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1) + "-", r = (a.getDate() < 10 ? "0" + a.getDate() : a.getDate()) + " ", o = (a.getHours() < 10 ? "0" + a.getHours() : a.getHours()) + ":", s = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
        a.getSeconds(), a.getSeconds();
        return t + n + r + o + s;
    },
    checkoutRecordStatus: function() {
        var e = this;
        return a(r.default.mark(function a() {
            var n, o;
            return r.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return n = {
                        customerId: i.globalData.single && i.globalData.single.id ? i.globalData.single.id : "",
                        houseId: s.houseId,
                        mobile: i.globalData.phone
                    }, a.next = 3, (0, t.default)("getAuthenticationStatus", n);

                  case 3:
                    o = a.sent, console.log("checkoutRecordStatus:", o), o.success && o.single && 1 == o.single.verificationStatus ? (e.setData({
                        specialUser: !0,
                        specialRole: o.single.verificationRole,
                        inheritLogic: o.single.inheritLogic,
                        manualRecord: o.single.manualRecord,
                        specialRoleName: o.single.organizeName
                    }), e.setData({
                        _recommendListHaveAllData: !1,
                        _recordListHaveAllData: !1,
                        recordList: [],
                        recordPageNo: 1
                    }), e.getRecommendList(), e.getRecordList(), e.checkoutBindUserStatus()) : (e.setData({
                        specialUserType: 1,
                        specialUser: !1
                    }), e.getNoVerifiedRecommendList());

                  case 6:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    checkoutBindUserStatus: function() {
        var e = this;
        return a(r.default.mark(function a() {
            var n, o, c;
            return r.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return n = {
                        houseId: s.houseId,
                        mobile: i.globalData.phone || ""
                    }, a.next = 3, (0, t.default)("queryBindIdentityInfo", n);

                  case 3:
                    o = a.sent, console.log("checkoutBindUserStatus:", o), o.success && o.single && 1 == (c = o.single.checkStatus) ? e.setData({
                        specialUserType: 3
                    }) : e.setData({
                        specialUserType: 2
                    });

                  case 6:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    getRecommendList: function() {
        var e = this, n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return a(r.default.mark(function a() {
            var o, c, l, u, d, g, m, h, p, f, v, b, k, D, P, x;
            return r.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (!(e.data._recommendListHaveAllData || n && 0 == e.data.recommendList.length)) {
                        a.next = 2;
                        break;
                    }
                    return a.abrupt("return");

                  case 2:
                    return o = {
                        houseId: s.houseId,
                        inviteUserId: i.globalData.single && i.globalData.single.id ? i.globalData.single.id : "",
                        inviteUserMobile: i.globalData.phone || "",
                        pageSize: e.data.recommendPageSize,
                        pageNo: e.data.recommendPageNo,
                        type: 0
                    }, a.next = 5, (0, t.default)("recommendList", o);

                  case 5:
                    if (c = a.sent, console.log("recommendList", c), !c.success) {
                        a.next = 69;
                        break;
                    }
                    if (!c.pageModel) {
                        a.next = 68;
                        break;
                    }
                    l = e.data.recommendList, u = !0, d = !1, g = void 0, a.prev = 13, m = c.pageModel.resultSet[Symbol.iterator]();

                  case 15:
                    if (u = (h = m.next()).done) {
                        a.next = 49;
                        break;
                    }
                    p = h.value, f = !1, v = !0, b = !1, k = void 0, a.prev = 21, D = l[Symbol.iterator]();

                  case 23:
                    if (v = (P = D.next()).done) {
                        a.next = 31;
                        break;
                    }
                    if (!((x = P.value).customerMobile == p.customerMobile || x.customerId && x.customerId == p.customerId)) {
                        a.next = 28;
                        break;
                    }
                    return f = !0, a.abrupt("break", 31);

                  case 28:
                    v = !0, a.next = 23;
                    break;

                  case 31:
                    a.next = 37;
                    break;

                  case 33:
                    a.prev = 33, a.t0 = a.catch(21), b = !0, k = a.t0;

                  case 37:
                    a.prev = 37, a.prev = 38, !v && D.return && D.return();

                  case 40:
                    if (a.prev = 40, !b) {
                        a.next = 43;
                        break;
                    }
                    throw k;

                  case 43:
                    return a.finish(40);

                  case 44:
                    return a.finish(37);

                  case 45:
                    f || l.push(p);

                  case 46:
                    u = !0, a.next = 15;
                    break;

                  case 49:
                    a.next = 55;
                    break;

                  case 51:
                    a.prev = 51, a.t1 = a.catch(13), d = !0, g = a.t1;

                  case 55:
                    a.prev = 55, a.prev = 56, !u && m.return && m.return();

                  case 58:
                    if (a.prev = 58, !d) {
                        a.next = 61;
                        break;
                    }
                    throw g;

                  case 61:
                    return a.finish(58);

                  case 62:
                    return a.finish(55);

                  case 63:
                    e.setData({
                        recommendList: l,
                        recommendSuccessCountWithBuild: c.invitationCount || 0,
                        recordCount: c.fissionCount || 0,
                        agentName: c.agentName || "",
                        agentStatus: c.effective || 1
                    }), c.hasRecordData && e.setData({
                        baobeiTableView: !0
                    }), l.length >= c.pageModel.rowTotal && e.setData({
                        _recommendListHaveAllData: !0
                    }), a.next = 69;
                    break;

                  case 68:
                    e.setData({
                        _recommendListHaveAllData: !0
                    });

                  case 69:
                    e.setData({
                        getWuGuanRequest: !0
                    });

                  case 70:
                  case "end":
                    return a.stop();
                }
            }, a, e, [ [ 13, 51, 55, 63 ], [ 21, 33, 37, 45 ], [ 38, , 40, 44 ], [ 56, , 58, 62 ] ]);
        }))();
    },
    getNoVerifiedRecommendList: function() {
        var e = this, n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return a(r.default.mark(function a() {
            var o, c, l, u, d, g, m, h, p, f, v, b, k, D, P, x, L, w;
            return r.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (!(e.data.noVerifiedRecommendListHaveAllData || n && 0 == e.data.noVerifiedRecommendList.length)) {
                        a.next = 2;
                        break;
                    }
                    return a.abrupt("return");

                  case 2:
                    return o = e, c = {
                        inviterMobile: i.globalData.phone || "",
                        customerId: i.globalData.single && i.globalData.single.id ? i.globalData.single.id : "",
                        houseId: s.houseId,
                        pageSize: e.data.noVerifiedRecommendPageSize,
                        pageNo: e.data.noVerifiedRecommendPageNo
                    }, a.next = 6, (0, t.default)("noVerifiedRecommendList", c);

                  case 6:
                    if (l = a.sent, console.log("noVerifiedRecommendList", l), !l.success || !l.pageModel) {
                        a.next = 69;
                        break;
                    }
                    u = e.data.noVerifiedRecommendList, d = !0, g = !1, m = void 0, a.prev = 13, h = l.pageModel.resultSet[Symbol.iterator]();

                  case 15:
                    if (d = (p = h.next()).done) {
                        a.next = 49;
                        break;
                    }
                    f = p.value, v = !1, b = !0, k = !1, D = void 0, a.prev = 21, P = u[Symbol.iterator]();

                  case 23:
                    if (b = (x = P.next()).done) {
                        a.next = 31;
                        break;
                    }
                    if (!((L = x.value).customerMobile == f.customerMobile || L.customerId && L.customerId == f.customerId)) {
                        a.next = 28;
                        break;
                    }
                    return v = !0, a.abrupt("break", 31);

                  case 28:
                    b = !0, a.next = 23;
                    break;

                  case 31:
                    a.next = 37;
                    break;

                  case 33:
                    a.prev = 33, a.t0 = a.catch(21), k = !0, D = a.t0;

                  case 37:
                    a.prev = 37, a.prev = 38, !b && P.return && P.return();

                  case 40:
                    if (a.prev = 40, !k) {
                        a.next = 43;
                        break;
                    }
                    throw D;

                  case 43:
                    return a.finish(40);

                  case 44:
                    return a.finish(37);

                  case 45:
                    v || u.push(f);

                  case 46:
                    d = !0, a.next = 15;
                    break;

                  case 49:
                    a.next = 55;
                    break;

                  case 51:
                    a.prev = 51, a.t1 = a.catch(13), g = !0, m = a.t1;

                  case 55:
                    a.prev = 55, a.prev = 56, !d && h.return && h.return();

                  case 58:
                    if (a.prev = 58, !g) {
                        a.next = 61;
                        break;
                    }
                    throw m;

                  case 61:
                    return a.finish(58);

                  case 62:
                    return a.finish(55);

                  case 63:
                    w = 0, w = l.invitationCount || 0, w += l.fissionCount || 0, e.setData({
                        noVerifiedRecommendList: u,
                        recommendSuccessCount: w || 0
                    }), l.hasRecordData && e.setData({
                        baobeiTableView: !0
                    }), u.length >= l.pageModel.rowTotal && e.setData({
                        noVerifiedRecommendListHaveAllData: !0
                    });

                  case 69:
                    e.setData({
                        getWuGuanRequest: !0
                    });

                  case 70:
                  case "end":
                    return a.stop();
                }
            }, a, e, [ [ 13, 51, 55, 63 ], [ 21, 33, 37, 45 ], [ 38, , 40, 44 ], [ 56, , 58, 62 ] ]);
        }))();
    },
    getRecordList: function() {
        var e = this, n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return a(r.default.mark(function a() {
            var o, c, l, u, d, g, m, h, p, f, v, b, k, D, P, x;
            return r.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (!(e.data._recordListHaveAllData || n && 0 == e.data.recordList.length)) {
                        a.next = 2;
                        break;
                    }
                    return a.abrupt("return");

                  case 2:
                    return o = {
                        houseId: s.houseId,
                        inviteUserId: i.globalData.single && i.globalData.single.id ? i.globalData.single.id : "",
                        inviteUserMobile: i.globalData.phone || "",
                        pageSize: e.data.recordPageSize,
                        pageNo: e.data.recordPageNo,
                        type: 1
                    }, a.next = 5, (0, t.default)("recommendList", o);

                  case 5:
                    if (c = a.sent, console.log("recommendList", c), !c.success) {
                        a.next = 70;
                        break;
                    }
                    if (!(c.pageModel && c.pageModel.resultSet.length > 0)) {
                        a.next = 69;
                        break;
                    }
                    l = e.data.recordList, u = !0, d = !1, g = void 0, a.prev = 13, m = c.pageModel.resultSet[Symbol.iterator]();

                  case 15:
                    if (u = (h = m.next()).done) {
                        a.next = 49;
                        break;
                    }
                    p = h.value, f = !1, v = !0, b = !1, k = void 0, a.prev = 21, D = l[Symbol.iterator]();

                  case 23:
                    if (v = (P = D.next()).done) {
                        a.next = 31;
                        break;
                    }
                    if (!((x = P.value).customerMobile == p.customerMobile || x.customerId && x.customerId == p.customerId)) {
                        a.next = 28;
                        break;
                    }
                    return f = !0, a.abrupt("break", 31);

                  case 28:
                    v = !0, a.next = 23;
                    break;

                  case 31:
                    a.next = 37;
                    break;

                  case 33:
                    a.prev = 33, a.t0 = a.catch(21), b = !0, k = a.t0;

                  case 37:
                    a.prev = 37, a.prev = 38, !v && D.return && D.return();

                  case 40:
                    if (a.prev = 40, !b) {
                        a.next = 43;
                        break;
                    }
                    throw k;

                  case 43:
                    return a.finish(40);

                  case 44:
                    return a.finish(37);

                  case 45:
                    f || l.push(p);

                  case 46:
                    u = !0, a.next = 15;
                    break;

                  case 49:
                    a.next = 55;
                    break;

                  case 51:
                    a.prev = 51, a.t1 = a.catch(13), d = !0, g = a.t1;

                  case 55:
                    a.prev = 55, a.prev = 56, !u && m.return && m.return();

                  case 58:
                    if (a.prev = 58, !d) {
                        a.next = 61;
                        break;
                    }
                    throw g;

                  case 61:
                    return a.finish(58);

                  case 62:
                    return a.finish(55);

                  case 63:
                    console.log("getRecordList", l), e.setData({
                        recordList: l
                    }), l.length > 0 && e.setData({
                        baobeiTableView: !0
                    }), l.length >= c.pageModel.rowTotal && e.setData({
                        _recordListHaveAllData: !0
                    }), a.next = 70;
                    break;

                  case 69:
                    e.setData({
                        _recordListHaveAllData: !0
                    });

                  case 70:
                    e.setData({
                        getWuGuanRequest: !0
                    });

                  case 71:
                  case "end":
                    return a.stop();
                }
            }, a, e, [ [ 13, 51, 55, 63 ], [ 21, 33, 37, 45 ], [ 38, , 40, 44 ], [ 56, , 58, 62 ] ]);
        }))();
    },
    onReachBottom: function() {
        if (this.data.specialUser) {
            if (!this.data._recommendListHaveAllData && this.data.showRecommend) {
                var e = this.data.recommendPageNo;
                e += 1, this.setData({
                    recommendPageNo: e
                }), this.getRecommendList(!0);
            }
        } else if (!this.data.noVerifiedRecommendListHaveAllData) {
            var a = this.data.noVerifiedRecommendPageNo;
            a += 1, this.setData({
                noVerifiedRecommendPageNo: a
            }), this.getNoVerifiedRecommendList(!0);
        }
        if (!this.data._recordListHaveAllData && this.data.showBaoBei) {
            var t = this.data.recordPageNo;
            t += 1, this.setData({
                recordPageNo: t
            }), this.getRecordList(!0);
        }
    },
    onReady: function() {
        this.myLoading && this.myLoading.hideLoading();
    },
    getCurrentPageParam: function() {
        return u;
    },
    authorizeIndexPhone: function(e, a) {
        var t = this;
        i.globalData.phone || wx.getStorageSync("phone") || i.globalData.tmpPhone ? "function" == typeof e && e() : i.globalData.phone ? (t.setData({
            showPhoneModel: !1,
            showPhoneAuth: !0
        }), "function" == typeof e && e()) : t.setData({
            showPhoneModel: !0,
            phoneFun: e || null,
            phoneFailFun: a || null
        });
    },
    afterPhoneHandle: function(e) {
        e && "fail" === e.type && wx.showToast({
            title: "您已拒绝授权",
            icon: "none",
            duration: 1500
        }), e && "success" === e.type && (this.setData({
            showPhoneModel: !1
        }), this.entrance());
        var a = {
            clkDesPage: this.data.despage || "",
            type: "CLK",
            pvCurPageName: d,
            pvCurPageParams: u,
            clkId: "clk_2cmina_137",
            clkName: "weixinshouquan",
            clkParams: {
                "wx.authorize.scope": "wx.getPhoneNum",
                type: e.type || e.detail.type
            }
        };
        o.trackRequest(a);
    },
    getPhoneNumber: function(e) {
        var a = this;
        i.globalData.tmpPhone = !0, wx.setStorageSync("ISauthorizePhone", !0);
        var t = e.detail.iv, n = (e.detail.errMsg, i.globalData.houseid, i.globalData.tonken || ""), r = e.detail.encryptedData, o = i.globalData.sessionKey, s = i.globalData.appid;
        i.globalData.tmpPhone = !0, !e.detail.encryptedData || e.detail.errMsg.includes("deny") ? a.afterPhoneHandle({
            type: "fail"
        }) : (r && o && t || wx.showToast({
            title: "系统提示:授权信息错误",
            icon: "warn",
            duration: 1500
        }), i.globalData.single ? (i.getPhone(a, r, o, s, t, n), a.afterPhoneHandle({
            type: "success"
        })) : a.data.setInter = setInterval(function() {
            i.globalData.single && (i.getPhone(a, r, o, s, t, n), a.afterPhoneHandle({
                type: "fail"
            }), clearInterval(a.data.setInter));
        }, 200));
    },
    getUserInfo: function(e) {
        l.call(this, e);
    },
    ClkRecommend: function() {
        if (!this.data.showRecommend) {
            var e = {
                clkDesPage: this.data.despage || "",
                type: "CLK",
                pvCurPageName: d,
                pvCurPageParams: u,
                clkId: "clk_2cmina_01026",
                clkName: "wodetuijian"
            };
            o.trackRequest(e), this.setData({
                showRecommend: !0,
                showBaoBei: !1
            });
        }
    },
    ClkBaobei: function() {
        if (!this.data.showBaoBei) {
            var e = {
                clkDesPage: this.data.despage || "",
                type: "CLK",
                pvCurPageName: d,
                pvCurPageParams: u,
                clkId: "clk_2cmina_01010",
                clkName: "wodebaobei"
            };
            o.trackRequest(e), this.setData({
                showRecommend: !1,
                showBaoBei: !0
            }), this.getRecordList();
        }
    },
    navigateToBaoBei: function(e) {
        var n = this;
        return a(r.default.mark(function a() {
            var c, l, g, m, h, p, f, v, b, k, D, P, x, L;
            return r.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (c = e.currentTarget.dataset.type, l = {
                        clkDesPage: n.data.despage || "",
                        type: "CLK",
                        pvCurPageName: d,
                        pvCurPageParams: u,
                        clkId: "clk_2cmina_01011",
                        clkName: "baobei"
                    }, o.trackRequest(l), 2 == c) {
                        a.next = 5;
                        break;
                    }
                    return a.abrupt("return");

                  case 5:
                    return g = e.currentTarget.dataset.customermobile, m = e.currentTarget.dataset.stateid, 
                    h = e.currentTarget.dataset.customerid, p = {
                        mobile: g,
                        inviteUserMobile: i.globalData.phone || "",
                        customerId: h,
                        houseId: s.houseId,
                        stateId: m
                    }, a.next = 11, (0, t.default)("record", p);

                  case 11:
                    if (f = a.sent, console.log("record", f), !f.success) {
                        a.next = 47;
                        break;
                    }
                    v = n.data.recommendList, b = !0, k = !1, D = void 0, a.prev = 18, P = v[Symbol.iterator]();

                  case 20:
                    if (b = (x = P.next()).done) {
                        a.next = 31;
                        break;
                    }
                    if ((L = x.value).customerId != h) {
                        a.next = 28;
                        break;
                    }
                    return L.state = f.single.state, L.copyWriting = f.single.copyWriting, L.dynamic = f.single.dynamic, 
                    L.dynamicDate = f.single.dynamicDate, a.abrupt("break", 31);

                  case 28:
                    b = !0, a.next = 20;
                    break;

                  case 31:
                    a.next = 37;
                    break;

                  case 33:
                    a.prev = 33, a.t0 = a.catch(18), k = !0, D = a.t0;

                  case 37:
                    a.prev = 37, a.prev = 38, !b && P.return && P.return();

                  case 40:
                    if (a.prev = 40, !k) {
                        a.next = 43;
                        break;
                    }
                    throw D;

                  case 43:
                    return a.finish(40);

                  case 44:
                    return a.finish(37);

                  case 45:
                    n.setData({
                        _recordListHaveAllData: !1,
                        recommendList: v,
                        recordList: [],
                        recordPageNo: 1
                    }), n.getRecordList();

                  case 47:
                  case "end":
                    return a.stop();
                }
            }, a, n, [ [ 18, 33, 37, 45 ], [ 38, , 40, 44 ] ]);
        }))();
    },
    navigateToGoChat: function() {
        if (i.handleGoChat()) {
            var e = {
                clkDesPage: "xiaoxiliebiao",
                type: "CLK",
                pvCurPageName: d,
                pvCurPageParams: u,
                clkId: "clk_2cmina_23",
                clkName: "zaixianzixun"
            };
            o.trackRequest(e);
        }
    },
    navigateToOrganize: function() {
        var e = {
            clkDesPage: this.data.despage || "",
            type: "CLK",
            pvCurPageName: d,
            pvCurPageParams: u,
            clkId: "clk_2cmina_01008",
            clkName: "zuzhixinxi"
        };
        o.trackRequest(e), wx.navigateTo({
            url: "../panKeBao/organizeInformation/organizeInformation"
        });
    },
    navigateFuc: function() {
        if (1 == this.data.specialUserType) wx.navigateTo({
            url: "../panKeBao/recordUser/recordUser"
        }); else if (2 == this.data.specialUserType) {
            var e = {
                clkDesPage: this.data.despage || "",
                type: "CLK",
                pvCurPageName: d,
                pvCurPageParams: u,
                clkId: "clk_2cmina_01009",
                clkName: "shenfenbangding"
            };
            o.trackRequest(e), wx.navigateTo({
                url: "../panKeBao/bindUser/bindUser"
            });
        }
    },
    navigateToSelfReport: function() {
        var e = 1 == this.data.specialRole ? "老业主" : 2 == this.data.specialRole ? "全民经纪人" : "渠道经纪人", a = {
            type: "CLK",
            pvCurPageName: d,
            pvCurPageParams: u,
            clkId: "clk_2cmina_01027",
            clkName: "shoudongbaobei",
            clkParams: {
                role: e,
                organize: i.globalData.organize
            }
        };
        o.trackRequest(a), wx.navigateTo({
            url: "../panKeBao/selfReport/selfReport?inheritLogic=" + this.data.inheritLogic
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