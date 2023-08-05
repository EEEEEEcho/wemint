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
            function r(i, n) {
                try {
                    var s = a[i](n), o = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
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

var r = e(require("../../lib/runtime")), i = e(require("../../lib/requestConfig")), n = (e(require("../../utils/defaultData")), 
e(require("../../utils/monitor.js")), require("../../utils/util.js")), s = require("../../config.js"), o = getApp(), l = require("../../getlogininfo.js"), u = l.authorizeInfo, c = l.getUserInfo, d = !1;

Component({
    properties: {
        scrollYAble: {
            type: Boolean,
            value: !1
        },
        pvCurPageName: {
            type: String,
            value: ""
        },
        unReadMsgNumber: {
            type: Number,
            value: 0
        },
        pvCurPageParams: {
            type: String,
            value: ""
        },
        showPhoneModel: {
            type: Boolean,
            value: !1
        },
        showInfoModel: {
            type: Boolean,
            value: !1
        },
        navbar: {
            type: Object,
            value: {}
        }
    },
    ready: function() {
        this.setData({
            navigateStatusContainerHeight: o.globalData.navigateStatusContainerHeight + "px"
        });
    },
    data: {
        currentPageData: {},
        toView: "",
        initData: {},
        shareCardData: {},
        InitFlag: "0",
        bottomStyle: null,
        trackData: [],
        screenHeight: 0,
        deviceInfor: null,
        correctBottom: "0rpx",
        scrollAble: !0,
        gapLeft: 0,
        maidianCount: 0,
        maidianCalculate: !1,
        maidianCalculateComplete: !1,
        lower: !1,
        showNotice: !1,
        scrollFlag: !0,
        showAgree: !1,
        showPhoneView: !1,
        showVisitCard: !1,
        showIMEmpty: !0,
        tableList: [],
        jumpTempData: null,
        setInter: null,
        showLiudianBox: !0,
        showLiudian: !0,
        currentSelectCity: "",
        productModuleHeight: 388,
        productModuleImgList: [],
        productModuleObject: {},
        productExpandHeight: 40,
        productScrollTop: 0,
        produceScrollPoint: null,
        productLastIndex: -1,
        navigateHasPadding: !0,
        executeNavigateFuc: !1,
        effectShowable: 0,
        layoutShowable: 0,
        matchShowable: 0,
        realityShowable: 0,
        sampleShowable: 0,
        goodSet: {
            effectSet: 2,
            sampleSet: 2,
            realitySet: 2,
            matchSet: 2
        },
        flag: !1,
        isSend: !1,
        verifyText: "",
        verifyCode: "",
        tel: "",
        videoChatCount: 0,
        globalUserShowFlag: !0,
        noLeavePhone: !0
    },
    pageLifetimes: {
        show: function() {
            var e = this;
            wx.getStorageSync("unReadMsgs").total ? this.setData({
                unReadMsgNumber: wx.getStorageSync("unReadMsgs").total
            }) : this.setData({
                unReadMsgNumber: 0
            }), o.login(function() {
                e.judgeGlobalUserShow(), e.getVideoChatCount(), s.imPhoneAuthorize || e.setData({
                    showLiudianBox: !1
                }), o.globalData.single && o.globalData.phone && e.setData({
                    showLiudian: !1
                }), o.globalData.single && o.globalData.single.organize && e.setData({
                    showVisitCard: !0,
                    showNotice: !0
                }), e.querySelectCity(), setTimeout(function() {
                    o.globalData.selectNewCity && (e.setData({
                        scrollTop: 0
                    }), o.globalData.selectNewCity = !1);
                }, 500);
            });
        },
        hide: function() {},
        resize: function() {}
    },
    methods: {
        sortsAreaList: function(e) {
            var a = this, t = this, r = JSON.parse(e);
            r.goodSet && this.setData({
                goodSet: r.goodSet
            });
            for (var i = r.arealist, n = null, s = {}, l = [], u = [], c = 0, d = 0, g = 0; g < i.length; g++) {
                var p = i[g];
                if ("4-3" == p.type) {
                    var m = parseInt(p.areaStyle.height) + parseInt(p.areaStyle["margin-top"]) + parseInt(p.areaStyle["margin-bottom"]) + "rpx";
                    t.setData({
                        correctBottom: m,
                        showIMEmpty: !(!p.show || !p.permission)
                    });
                }
                "3-2" != p.type && "3-6" != p.type || (p.moduleList = p.moduleList.filter(function(e, a) {
                    return e.titleObj.titleText && e.titleObj.titleText.length > 0;
                })), "3-6" == p.type && (c = (parseInt(p.unifyTitleObj.titleStyle.left) + parseInt(p.unifyTitleObj.titleStyle.width) + parseInt(p.projectSet.titleStyle.left)) / 2), 
                "5-1" == p.type && (n = p, console.warn("***5-1***", n)), "5-2" == p.type && p.show && p.permission && p.areaStyle.needAlign && (p.moduleList[0].moduleStyle_s && (p.moduleList[0].moduleStyle_s = p.moduleList[0].moduleStyle_s.replace(";top:", ";topTrack:")), 
                p.areaStyle["background-color"] && (p.areaStyle_s = p.areaStyle_s.replace("background-color:", ";Trackbackground-color:"), 
                this.setData({
                    "navbar.navPadding": 1,
                    navigateHasPadding: !0
                })), this.setData({
                    "navbar.buildingStyleData": p
                })), "5-4" == p.type && p.show && p.permission && p.areaStyle.needAlign && (p.areaStyle["background-color"] && (p.areaStyle_s = p.areaStyle_s.replace("background-color:", ";Trackbackground-color:")), 
                this.setData({
                    "navbar.buildingCityStyleData": p
                })), "5-5" == p.type && (p.productMarkIdx = d, d++, (s = p).productLastIndex = -1, 
                t.handleProductData(s), u.push(s));
            }
            for (var h = 0; h < i.length; h++) {
                var v = i[h];
                "3-3" != v.type && "3-5" != v.type && "3-9" != v.type || (l[h] = 0);
            }
            var f = t.deepClone(u);
            t.setData({
                productModuleObjectList: u,
                defaultProductObjList: f,
                currentPageData: r,
                InitFlag: 1,
                tableList: l,
                gapLeft: c + "rpx"
            }, function() {
                a.data.swipeUnit = a.selectComponent("#swipeUnit"), a.data.swipeUnit && a.data.swipeUnit.getUserData(n), 
                o.login(function() {
                    t.scrollExp({}), t.handleTrackDataForList();
                });
            }), t.getUseSet(), t.getInitData(), t.calculateViewBottomStyle(), t.sortsProductViewList(), 
            t.handleShareData();
        },
        deepClone: function(e) {
            var a = JSON.stringify(e);
            return JSON.parse(a);
        },
        getInitData: function() {
            var e = this;
            return t(r.default.mark(function a() {
                var t, o, l;
                return r.default.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return a.next = 2, (0, i.default)("queryPositionHome", {
                            houseId: s.houseId
                        }, !0);

                      case 2:
                        (t = a.sent) && t.success && t.single ? (o = t.single, e.setData({
                            InitFlag: "1",
                            initData: o
                        }), console.log("+++配置内容+++", e.data.initData), console.log("+++此时此刻模块信息+++" + JSON.stringify(e.data.initData.momentModule))) : (l = {
                            type: "mini-program-Error",
                            pvPageStayTime: new Date().getTime() / 1e3,
                            adviserId: "",
                            imTalkId: "",
                            imTalkType: "",
                            pvCurPageName: e.data.pvCurPageName,
                            clkDesPage: "",
                            clkName: "",
                            clkId: "",
                            expand: JSON.stringify(t) + ";houseId=" + s.houseId
                        }, n.trackRequest(l));

                      case 4:
                      case "end":
                        return a.stop();
                    }
                }, a, e);
            }))();
        },
        getUseSet: function() {
            var e = this;
            return t(r.default.mark(function a() {
                var t, o;
                return r.default.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return a.next = 2, (0, i.default)("queryModuleShowable", {
                            houseId: s.houseId
                        }, !0);

                      case 2:
                        (t = a.sent) && t.success && t.single ? (console.log("***模块是否可点击配置***" + JSON.stringify(t.single)), 
                        e.data.effectShowable = t.single.effectShowable || 0, e.data.layoutShowable = t.single.layoutShowable || 0, 
                        e.data.matchShowable = t.single.matchShowable || 0, e.data.realityShowable = t.single.realityShowable || 0, 
                        e.data.sampleShowable = t.single.sampleShowable || 0) : (o = {
                            type: "mini-program-Error",
                            pvPageStayTime: new Date().getTime() / 1e3,
                            adviserId: "",
                            imTalkId: "",
                            imTalkType: "",
                            pvCurPageName: e.data.pvCurPageName,
                            clkDesPage: "",
                            clkName: "",
                            clkId: "",
                            expand: JSON.stringify(t) + ";houseId=" + s.houseId
                        }, n.trackRequest(o));

                      case 4:
                      case "end":
                        return a.stop();
                    }
                }, a, e);
            }))();
        },
        handleShareData: function() {
            var e = this.data.currentPageData.arealist;
            for (var a in e) {
                var t = e[a];
                if ("4-1" == t.type) {
                    var r = t.btnList;
                    for (var i in r) {
                        var n = r[i];
                        if ("2" == n.jumpType) {
                            var s = {};
                            s.clkName = t.areaStyle.burialName + "_" + n.burialName, s.dianjivalue = i, s.dianjiwei = r.length, 
                            s.clkId = "clk_2cmina_" + t.type, this.setData({
                                shareCardData: s
                            });
                        }
                    }
                }
            }
        },
        calculateViewBottomStyle: function() {
            var e = this;
            e.createTrackData(), e.createTrackDataForList();
            var a = e.data.currentPageData.arealist, t = void 0, r = [], i = !0, n = !1, s = void 0;
            try {
                for (var o, l = a[Symbol.iterator](); !(i = (o = l.next()).done); i = !0) {
                    var u = o.value;
                    "4-3" == u.type && u.areaStyle_s && (t = u.areaStyle_s.split(";"));
                }
            } catch (e) {
                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                n = !0, s = e;
            } finally {
                try {
                    !i && l.return && l.return();
                } finally {
                    if (n) throw s;
                }
            }
            if (console.log("style_s:" + JSON.stringify(t)), t) {
                var c = !0, d = !1, g = void 0;
                try {
                    for (var p, m = t[Symbol.iterator](); !(c = (p = m.next()).done); c = !0) {
                        var h = p.value;
                        h.indexOf("height:") >= 0 && h.length <= 13 && (h = "height:34rpx"), h.indexOf("line-height:") >= 0 && (h = "line-height:34rpx"), 
                        r.push(h);
                    }
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    d = !0, g = e;
                } finally {
                    try {
                        !c && m.return && m.return();
                    } finally {
                        if (d) throw g;
                    }
                }
            }
            r = r.join(";"), e.setData({
                bottomStyle: r
            }), e.getDeviceInfor();
        },
        getDeviceInfor: function() {
            var e = this;
            wx.getSystemInfo({
                success: function(a) {
                    if (e.data.screenHeight = a.screenHeight, e.setData({
                        deviceInfor: a.model + ""
                    }), "iPhone X" == a.model) {
                        var t = (e.data.correctBottom + "").replace("rpx", ""), r = parseInt(t) + 34 + "rpx";
                        e.setData({
                            correctBottom: r
                        });
                    }
                },
                fail: function(e) {},
                complete: function(e) {}
            });
        },
        createTrackDataForList: function() {
            var e = this.data.currentPageData.arealist, a = [];
            for (var t in e) {
                var r = e[t];
                if ("5-5" == r.type) for (var i in r.moduleList) {
                    var n = r.moduleList[i], s = {};
                    s.id = "itemView" + i + "_productMarkIdx" + r.productMarkIdx, s.flag = n.hasShow, 
                    s.eventName = n.moduleStyle.burialName, s.eventID = "exp_2cmina_5-5", a.push(s);
                }
            }
            this.data.trackDataListForListModule = a;
        },
        handleTrackDataForList: function() {
            var e = this, a = !0, t = !1, r = void 0;
            try {
                for (var i, n = this.data.trackDataListForListModule[Symbol.iterator](); !(a = (i = n.next()).done); a = !0) !function() {
                    var a = i.value;
                    wx.createIntersectionObserver().relativeToViewport({
                        bottom: -10
                    }).observe("#" + a.id, function(t) {
                        a.flag && (a.flag = !1, e.sendTrackDataForListRequest(a));
                    });
                }();
            } catch (e) {
                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                t = !0, r = e;
            } finally {
                try {
                    !a && n.return && n.return();
                } finally {
                    if (t) throw r;
                }
            }
        },
        sendTrackDataForListRequest: function(e) {
            var a = {
                type: "EXP",
                eventId: e.eventID,
                pvCurPageName: pvCurPageName,
                eventModuleDes: e.eventName,
                eventName: e.eventName
            };
            n.trackRequest(a, o);
        },
        createTrackData: function() {
            var e = [], a = this, t = a.data.currentPageData.arealist;
            for (var r in t) {
                var i = t[r], n = {};
                n.id = "#view_" + i.type + "_" + r, n.flag = i.show, n.eventName = i.areaStyle.burialName, 
                n.eventID = "exp_2cmina_" + i.type, e.push(n);
            }
            this.data.trackData = e, setTimeout(function() {
                a.scrollExp({});
            }, 300);
        },
        swipeUnitScrollHandle: function(e) {
            console.log("swipeUnitScrollHandle:" + JSON.stringify(e)), 0 == e.detail.event ? this.setData({
                scrollAble: !1
            }) : this.setData({
                scrollAble: !0
            });
        },
        swipeItemClk: function(e) {
            console.log("swipeItemClk:" + JSON.stringify(e)), null != e.detail.currentTarget.dataset.jumptype && this.jumpCheck(e.detail);
        },
        swipeTouchFuc: function(e) {
            0 == e.detail.type ? this.setData({
                viewScroll: !0
            }) : this.setData({
                viewScroll: !1
            });
        },
        scrollExp: function(e) {
            var a = this;
            e.detail && e.detail.deltaY < -10 && (this.data.viewScroll || this.setData({
                viewScroll: !0
            }), this.scrollEndTimer && (clearTimeout(this.scrollEndTimer), this.scrollEndTimer = null), 
            this.scrollEndTimer = setTimeout(function() {
                a.setData({
                    viewScroll: !1
                });
            }, 500));
            var t = this;
            if (o.globalData.openid && (this.data.scrollFlag = !0, this.data.scrollFlag)) {
                if (this.data.scrollFlag = !1, this.data.trackData.length < 1) return;
                this.data.trackData.forEach(function(e, r) {
                    a.calculateDomDistanceToTop(e.id, function() {
                        if (e.id && "null" != e.id && "undefined" != e.id && e.flag) {
                            var a = {
                                type: "EXP",
                                pvCurPageName: t.data.pvCurPageName,
                                pvCurPageParams: t.data.pvCurPageParams,
                                eventId: e.eventID,
                                eventModuleDes: e.eventName,
                                eventName: e.eventName
                            };
                            n.trackRequest(a, o);
                        }
                        t.data.trackData[r].id = 0;
                    });
                });
            }
        },
        calculateExp: function() {
            this.data.maidianCalculate || (this.data.maidianCalculate = !0, this.data.currentContext = this, 
            this.calculateExpFlag());
        },
        calculateExpFlag: function() {
            var e = this.data.currentContext, a = e.data.trackData;
            if (0 != a.length) {
                var t = a[e.data.maidianCount];
                if (t.flag) {
                    var r = wx.createSelectorQuery();
                    r.select(t.id).boundingClientRect(), r.selectViewport().scrollOffset(), r.exec(function(r) {
                        if (!r[0] || "null" == r[0] || "undefined" == r[0]) return e.data.maidianCount++, 
                        e.data.maidianCount >= a.length ? e.data.maidianCalculateComplete = !0 : e.calculateExpFlag(), 
                        !1;
                        var i = e.data.screenHeight;
                        r[0].top <= i && (t.id = 0), e.data.maidianCount++, e.data.maidianCount >= a.length ? e.data.maidianCalculateComplete = !0 : e.calculateExpFlag();
                    });
                } else t.id = 0, e.data.maidianCount++, e.data.maidianCount >= a.length ? e.data.maidianCalculateComplete = !0 : e.calculateExpFlag();
            } else e.data.maidianCalculateComplete = !0;
        },
        calculateDomDistanceToTop: function(e, a) {
            if (e && "null" != e && "undefined" != e) {
                var t = this, r = this.createSelectorQuery();
                return r.select(e).boundingClientRect(), r.selectViewport().scrollOffset(), r.exec(function(e) {
                    if (!e[0] || "null" == e[0] || "undefined" == e[0]) return !1;
                    var r = t.data.screenHeight;
                    e[0].top < r && a();
                });
            }
        },
        swichNav: function(e) {
            console.log("滑动切换", JSON.stringify(e.target.dataset));
            var a = e.target.dataset.tableidx, t = this.data.tableList;
            t[a] = e.target.dataset.id, this.setData({
                tableList: t
            });
        },
        formSubmit: function(e) {
            var a = this;
            return t(r.default.mark(function t() {
                var n;
                return r.default.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        if (console.log(e.currentTarget.dataset.type, "im提交表单"), !e.currentTarget.dataset.type) {
                            a.next = 3;
                            break;
                        }
                        return a.abrupt("return");

                      case 3:
                        return a.next = 6, (0, i.default)("insertFormId", {
                            houseId: s.houseId,
                            customerId: o.globalData.single && o.globalData.single.id,
                            formId: e.detail.formId,
                            appid: o.globalData.appid,
                            secret: o.globalData.secret
                        }, !0);

                      case 6:
                        n = a.sent;

                      case 7:
                      case "end":
                        return a.stop();
                    }
                }, t, a);
            }))();
        },
        jumpCheck: function(e) {
            var a = this;
            this.data.jumpTempData = e, 3 != e.currentTarget.dataset.functype || 0 != e.currentTarget.dataset.type ? 2 != e.currentTarget.dataset.jumptype ? 6 != e.currentTarget.dataset.functype ? 7 != e.currentTarget.dataset.jumptype ? 3 != e.currentTarget.dataset.jumptype ? 0 == e.currentTarget.dataset.jumptype && 4 != e.currentTarget.dataset.functype || (s.imPhoneAuthorize ? o.authorizeSet(function() {
                a.afterAuthCheck();
            }) : this.afterAuthCheck()) : this.goHouseType(e) : this.navigateToWaitToast(e) : this.goVideoChat(e) : this.goImgSwip(e) : this.shareFunc(this.data.jumpTempData);
        },
        goVideoChat: function() {
            var e = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - wx.getStorageSync("loadTime")) / 1e3,
                clkDesPage: "ekanfangjietongye",
                clkName: "shipin_guwentuisong",
                clkId: "clk_2cmina_40",
                pvCurPageName: this.data.pvCurPageName,
                clkParams: ""
            };
            n.trackRequest(e, o), wx.navigateTo({
                url: "../multiroom/aide/aide"
            });
        },
        afterAuthCheck: function(e) {
            console.log(this.data.jumpTempData, "即将跳转"), this.data.jumpTempData && (1 == this.data.jumpTempData.currentTarget.dataset.functype ? this.goFunc(this.data.jumpTempData) : 2 == this.data.jumpTempData.currentTarget.dataset.functype ? this.goVisitCard(this.data.jumpTempData, e) : 3 == this.data.jumpTempData.currentTarget.dataset.functype ? this.shareFunc(this.data.jumpTempData) : 5 == this.data.jumpTempData.currentTarget.dataset.functype ? this.goToNoticeList(this.data.jumpTempData) : 4 == this.data.jumpTempData.currentTarget.dataset.functype && this.goChatList(), 
            this.data.jumpTempData = null);
        },
        goChatList: function(e) {
            var a = this;
            return t(r.default.mark(function e() {
                var t;
                return r.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (!a.data.showPhoneModel && !a.data.showInfoModel) {
                            e.next = 2;
                            break;
                        }
                        return e.abrupt("return", !1);

                      case 2:
                        o.handleGoChat() && (console.log("***goChatList-over***"), t = {
                            clkDesPage: "xiaoxiliebiao",
                            type: "CLK",
                            pvCurPageName: a.data.pvCurPageName,
                            pvCurPageParams: a.data.pvCurPageParams,
                            clkId: "clk_2cmina_23",
                            clkName: "zaixianzixun"
                        }, n.trackRequest(t));

                      case 3:
                      case "end":
                        return e.stop();
                    }
                }, e, a);
            }))();
        },
        goVisitCard: function(e, a) {
            var t = this;
            if (!o.globalData.businessCard || "" == o.globalData.businessCard || 0 == o.globalData.businessCard.length || this.data.globalUserShowFlag) return !1;
            var r = this, i = !(!o.globalData.userInfo || !o.globalData.userInfo.avatarUrl), s = {
                clkDesPage: "baocunzhaopianye",
                type: "CLK",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkId: "clk_2cmina_112",
                clkName: "fenxiangmingpianrukou",
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue
                }
            };
            n.trackRequest(s), r.myLoading && r.myLoading.hideLoading(), o.createXcxQrCode({
                wxType: "qrcode_xcx_access_token",
                subtype: "agent"
            }, function(e) {
                if (e) {
                    var a = o.globalData.businessCard || [];
                    !r.data.bottomText && o.globalData.EnumList && o.globalData.EnumList.forEach(function(e, a) {
                        "business_card" == e.name && (r.data.bottomText = e.value);
                    });
                    var n = {
                        type: 7,
                        list: a,
                        qcode: e,
                        bottomText: r.data.bottomText || "扫描二维码#立即进入线上售楼处",
                        hasUserInfo: i,
                        pvCurPageParams: t.data.pvCurPageParams,
                        pvCurPageName: "fenxiangmingpianrukou",
                        pvId: "p_2cmina_59"
                    };
                    o.globalData.shareCardData = JSON.stringify(n), wx.navigateTo({
                        url: "../shareCard/shareCard"
                    });
                }
            }, function() {});
        },
        getUserInfoByVisit: function(e) {
            var a = this;
            o.globalData.businessCard && "" != o.globalData.businessCard && 0 != o.globalData.businessCard.length ? c.call(this, e, function(e) {
                a.myLoading && a.myLoading.hideLoading(), o.createXcxQrCode({
                    wxType: "qrcode_xcx_access_token",
                    subtype: "agent"
                }, function(t) {
                    if (t) {
                        var r = o.globalData.businessCard || [];
                        !a.data.bottomText && o.globalData.EnumList && o.globalData.EnumList.forEach(function(e, t) {
                            "business_card" == e.name && (a.data.bottomText = e.value);
                        });
                        var i = {
                            type: 7,
                            list: r,
                            qcode: t,
                            bottomText: a.data.bottomText || "扫描二维码#立即进入线上售楼处",
                            hasUserInfo: e,
                            pvCurPageParams: a.data.pvCurPageParams,
                            pvCurPageName: "fenxiangmingpianrukou",
                            pvId: "p_2cmina_59"
                        };
                        o.globalData.shareCardData = JSON.stringify(i), wx.navigateTo({
                            url: "../shareCard/shareCard"
                        });
                    }
                }, function() {});
            }, !0) : wx.showToast({
                title: "敬请期待",
                icon: "warn",
                duration: 1500
            });
        },
        shareFunc: function(e) {
            var a = e.currentTarget.dataset.type;
            if (console.log("***e.currentTarget.dataset.type***", a), 0 == a) this.goToShare(e); else if (2 == a) this.goToShareFriend(e); else if (1 == a) {
                if (this.data.globalUserShowFlag) return !1;
                this.getUserInfo(e);
            }
        },
        goToShare: function(e) {
            console.log("goToShare:" + JSON.stringify(e.currentTarget.dataset));
            var a = {
                clkDesPage: "woyaofenxiang",
                type: "CLK",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkId: "clk_2cmina_4-1",
                clkName: e.currentTarget.dataset.clkname || "",
                clkParams: {
                    dianjiwei: 3,
                    dianjivalue: 0,
                    type: e.currentTarget.dataset.sharetype || ""
                }
            };
            n.trackRequest(a, o);
        },
        goToShareFriend: function(e) {
            var a = {
                clkDesPage: "wodetuijian",
                type: "CLK",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkId: "clk_2cmina_4-1",
                clkName: e.currentTarget.dataset.clkname || "",
                clkParams: {
                    dianjiwei: 3,
                    dianjivalue: 2
                }
            };
            n.trackRequest(a, o), wx.navigateTo({
                url: "../shareFriend/shareFriend"
            });
        },
        verifyCode: function(e) {
            this.setData({
                verifyCode: e.detail.value
            });
        },
        getVerifyCode: function() {
            this.data.isSend || (/^1\d{10}$/.test(this.data.tel) ? this.data.flag || (this.data.flag = !0, 
            this.querySendCode()) : wx.showToast({
                title: "输入的手机号不合法",
                icon: "none",
                duration: 2e3
            }));
        },
        querySendCode: function() {
            var e = this;
            return t(r.default.mark(function a() {
                var t, n, o;
                return r.default.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return a.next = 2, (0, i.default)("querySendCode", {
                            phoneNumber: e.data.tel,
                            houseId: s.houseId
                        });

                      case 2:
                        t = a.sent, e.data.flag = !1, t && t.success ? (e.data.isSend = !0, e.setData({
                            toView: "empty-box"
                        }), n = 60, o = setInterval(function() {
                            n > 0 ? (n -= 1, e.setData({
                                verifyText: n + "s"
                            })) : (e.data.isSend = !1, e.setData({
                                verifyText: "重新发送"
                            }), clearInterval(o));
                        }, 1e3)) : wx.showToast({
                            title: "系统提示:网络错误",
                            icon: "none",
                            duration: 2e3
                        });

                      case 5:
                      case "end":
                        return a.stop();
                    }
                }, a, e);
            }))();
        },
        sendTel: function(e) {
            var a = this;
            if (!a.data.flag) {
                if (a.data.flag = !0, !/^1\d{10}$/.test(a.data.tel)) return wx.showToast({
                    title: "请输入正确的手机号",
                    icon: "none",
                    duration: 2e3
                }), void (a.data.flag = !1);
                if (console.log("***验证码***", a.data.verifyCode), !a.data.verifyCode || a.data.verifyCode.length < 1) return wx.showToast({
                    title: "验证码不能为空",
                    icon: "none",
                    duration: 2e3
                }), void (a.data.flag = !1);
                a.leavePhone(e);
            }
        },
        leavePhone: function(e) {
            var a = this;
            return t(r.default.mark(function t() {
                var l, u, c, d;
                return r.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return l = {
                            houseId: s.houseId,
                            customerId: o.globalData.single && o.globalData.single.id ? o.globalData.single.id : "",
                            shareSign: o.globalData.fromChannel,
                            mobile: a.data.tel,
                            verifyCode: a.data.verifyCode,
                            scene: o.globalData.launchInfo && o.globalData.launchInfo.scene || "",
                            dynamicSource: "1",
                            source: "3"
                        }, console.log("---------留电----------", l), t.next = 4, (0, i.default)("leavePhone", l);

                      case 4:
                        u = t.sent, console.log("---------留电----------", u), a.data.flag = !1, u && u.success ? (wx.setStorageSync("phone", a.data.tel), 
                        wx.setStorageSync("indexLiudian", !0), u.single && u.single.organize && (o.globalData.organize = u.single.organize || "", 
                        o.globalData.organizeUsername = u.single.organizeUsername || "", a.setData({
                            showVisitCard: !0
                        })), o.globalData.phone || (o.globalData.phone = a.data.tel), a.setData({
                            showLiudian: !1,
                            showAgree: !0
                        }), c = {
                            clkDesPage: "",
                            type: "CLK",
                            pvCurPageName: a.data.pvCurPageName,
                            clkId: "clk_2cmina_4-2",
                            clkName: e.currentTarget.dataset.clkname || "",
                            clkParams: {
                                dianjiwei: e.currentTarget.dataset.clicklength,
                                dianjivalue: e.currentTarget.dataset.clickvalue,
                                mobile: a.data.tel
                            },
                            pvCurPageParams: a.data.pvCurPageParams
                        }, n.trackRequest(c)) : (d = {
                            type: "mini-program-Error",
                            pvPageStayTime: new Date().getTime() / 1e3,
                            adviserId: "",
                            imTalkId: "",
                            imTalkType: "",
                            pvCurPageName: a.data.pvCurPageName,
                            clkDesPage: "",
                            clkName: "",
                            clkId: "",
                            expand: JSON.stringify(u) + ";houseId=" + s.houseId
                        }, n.trackRequest(d), wx.showToast({
                            title: "系统提示:网络错误",
                            icon: "none",
                            duration: 2e3
                        }));

                      case 8:
                      case "end":
                        return t.stop();
                    }
                }, t, a);
            }))();
        },
        getUserInfo: function(e) {
            var a = this;
            c.call(this, e, function(t) {
                var r = a.data.shareCardData, i = {
                    clkDesPage: a.data.despage || "",
                    type: "CLK",
                    pvCurPageName: a.data.pvCurPageName,
                    pvCurPageParams: a.data.pvCurPageName,
                    clkId: "clk_2cmina_137",
                    clkName: "weixinshouquan",
                    clkParams: {
                        "wx.authorize.scope": "wx.getUserInfo",
                        type: t ? "success" : "fail"
                    }
                };
                n.trackRequest(i), e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.clickid || n.trackRequest(i);
                var s = {
                    clkDesPage: "",
                    type: "CLK",
                    pvCurPageName: a.data.pvCurPageName,
                    pvCurPageParams: a.data.pvCurPageName,
                    clkId: "clk_2cmina_4-1",
                    clkName: r.clkName || "",
                    clkParams: {
                        dianjiwei: 3,
                        dianjivalue: 1
                    }
                };
                n.trackRequest(s), a.myLoading && a.myLoading.hideLoading(), wx.navigateTo({
                    url: "../shareProgram/shareProgram"
                });
            }, !0);
        },
        goToNoticeList: function() {
            var e = {
                clkId: "clk_2cMINA_0",
                clkDesPage: "xiaoxitongzhi",
                clkName: "xiaoxitongzhi",
                type: "CLK",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams
            };
            n.trackRequest(e, o), wx.navigateTo({
                url: "../noticeList/noticeList"
            });
        },
        horizonSwipeChange: function(e) {
            if (console.log("horizonSwipeChange", e), "touch" == e.detail.source) {
                var a = e.detail.current, t = {
                    clkId: "clk_2cmina_214",
                    clkName: " huadonglunbo",
                    type: "CLK",
                    clkParams: {
                        imageUrl: e.currentTarget.dataset.data[a].imageUrl
                    },
                    pvCurPageName: this.data.pvCurPageName,
                    pvCurPageParams: this.data.pvCurPageParams
                };
                n.trackRequest(t);
            }
        },
        change: function(e) {
            if ("touch" != e.detail.source) return !1;
            var a = e.target.dataset.tableidx, t = this.data.tableList;
            t[a] = e.detail.current, this.setData({
                tableList: t
            });
        },
        change1: function(e) {
            if (o.globalData.isIos13) {
                var a = e.target.dataset.tableidx, t = this.data.tableList;
                t[a] = e.detail.current, this.setData({
                    tableList: t
                });
            }
        },
        goToShareProgram: function(e) {
            var a = this, t = {
                clkDesPage: "",
                type: "CLK",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: a.data.pvCurPageParams,
                clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                clkName: e.currentTarget.dataset.clkname || "",
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue
                }
            };
            n.trackRequest(t, o), o.globalData.isUserInfo ? wx.navigateTo({
                url: "../shareProgram/shareProgram"
            }) : u.call(this, function() {
                wx.navigateTo({
                    url: "../shareProgram/shareProgram"
                });
            }, function() {
                wx.navigateTo({
                    url: "../shareProgram/shareProgram"
                });
            });
        },
        getPhoneNumber: function(e) {
            var a = this;
            wx.setStorageSync("ISauthorizePhone", !0);
            var t = e.detail.iv, r = (e.detail.errMsg, o.globalData.houseid, o.globalData.tonken || ""), i = e.detail.encryptedData, n = o.globalData.sessionKey, s = o.globalData.appid;
            if (console.log("***auth-token***", r), o.globalData.tmpPhone = !0, !e.detail.encryptedData || e.detail.errMsg.includes("deny")) a.afterPhoneHandle({
                type: "fail"
            }); else if (i && n && t || wx.showToast({
                title: "系统提示:授权信息错误",
                icon: "warn",
                duration: 1500
            }), o.globalData.single) {
                var l = getCurrentPages()[getCurrentPages().length - 1];
                o.getPhone(l, i, n, s, t, r, function() {
                    a.afterPhoneHandle({
                        type: "success",
                        expand: !0
                    }), a.agree();
                });
            } else a.data.setInter = setInterval(function() {
                if (o.globalData.single) {
                    var e = getCurrentPages()[getCurrentPages().length - 1];
                    o.getPhone(e, i, n, s, t, r, function() {
                        a.afterPhoneHandle({
                            type: "fail"
                        });
                    }), clearInterval(a.data.setInter);
                }
            }, 200);
        },
        agree: function(e) {
            var a = this;
            if (e) {
                var t = {
                    clkDesPage: "",
                    type: "CLK",
                    pvCurPageName: this.data.pvCurPageName,
                    pvCurPageParams: this.data.pvCurPageParams,
                    clkId: "clk_2cmina_4-2",
                    clkName: e.currentTarget.dataset.clkname || "",
                    clkParams: {
                        dianjiwei: e.currentTarget.dataset.clicklength,
                        dianjivalue: e.currentTarget.dataset.clickvalue
                    }
                };
                n.trackRequest(t);
            }
            if (o.globalData.phone) {
                this.AuthLeavePhone(), this.setData({
                    showAgree: !0,
                    showPhoneView: !0
                });
                var r = setTimeout(function() {
                    a.setData({
                        showPhoneView: !1
                    }), clearTimeout(r);
                }, 3e3);
            }
        },
        noagree: function(e) {
            this.setData({
                showAgree: !1
            });
        },
        AuthLeavePhone: function() {
            var e = this;
            return t(r.default.mark(function a() {
                var t, l, u;
                return r.default.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return t = {
                            houseId: s.houseId,
                            customerId: o.globalData.single && o.globalData.single.id ? o.globalData.single.id : "",
                            shareSign: o.globalData.fromChannel,
                            dynamicSource: "1",
                            scene: o.globalData.launchInfo && o.globalData.launchInfo.scene || "",
                            mobile: o.globalData.single.imBindMobile || o.globalData.single.wxAuthMobile || o.globalData.single.leavePhoneMobile || o.globalData.phone || "",
                            source: "3"
                        }, console.log("---------授权留电----------", t), a.next = 4, (0, i.default)("leavePhone", t);

                      case 4:
                        l = a.sent, e.data.flag = !1, l && l.success ? (wx.setStorageSync("indexLiudian", !0), 
                        l.single && l.single.organize && (o.globalData.organize = l.single.organize || "", 
                        o.globalData.organizeUsername = l.single.organizeUsername || "", e.setData({
                            showVisitCard: !0
                        })), e.setData({
                            showPhoneAuth: !0,
                            showAgree: !0,
                            noLeavePhone: !1
                        })) : (u = {
                            type: "mini-program-Error",
                            pvPageStayTime: new Date().getTime() / 1e3,
                            adviserId: "",
                            imTalkId: "",
                            imTalkType: "",
                            pvCurPageName: e.data.pvCurPageName,
                            clkDesPage: "",
                            clkName: "",
                            clkId: "",
                            expand: JSON.stringify(l) + ";houseId=" + s.houseId
                        }, n.trackRequest(u), wx.showToast({
                            title: "系统提示:网络错误",
                            icon: "none",
                            duration: 2e3
                        }));

                      case 7:
                      case "end":
                        return a.stop();
                    }
                }, a, e);
            }))();
        },
        judgeGlobalUserShow: function() {
            var e = this;
            o.judgeGlobalUserShow(function(a) {
                e.setData({
                    globalUserShowFlag: a
                }), console.log("更改", e.data.globalUserShowFlag);
            });
        },
        afterPhoneHandle: function(e) {
            this.setData({
                showPhoneModel: !1
            }), o.globalData.phone && this.setData({
                showLiudian: !1
            }), "fail" == e.type && wx.showToast({
                title: "您已拒绝授权",
                icon: "none",
                duration: 1500
            });
            var a = {
                clkDesPage: this.data.despage || "",
                type: "CLK",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkId: "clk_2cmina_137",
                clkName: "weixinshouquan",
                clkParams: {
                    "wx.authorize.scope": "wx.getPhoneNum",
                    type: e.detail ? e.detail.type : e.type
                }
            };
            n.trackRequest(a), this.afterAuthCheck();
        },
        afterUserHandle: function(e) {
            var a = "fail" !== e.detail.type, t = {
                clkDesPage: this.data.despage || "",
                type: "CLK",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkId: "clk_2cmina_137",
                clkName: "weixinshouquan",
                clkParams: {
                    "wx.authorize.scope": "wx.getUserInfo",
                    type: e.detail.type
                }
            };
            n.trackRequest(t), e.detail && this.setData({
                showInfoModel: !1
            }), this.afterAuthCheck(a);
        },
        goHouseType: function(e) {
            var a = this, t = {
                clkDesPage: "huxingye",
                type: "CLK",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                clkName: e.currentTarget.dataset.clkname || "",
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue
                }
            };
            n.trackRequest(t, o), 1 == this.data.layoutShowable ? (o.globalData.pageDesc = this.data.pvCurPageName, 
            s.imPhoneAuthorize ? o.authorizeSet(function() {
                a.afterAuthCheck();
            }) : this.afterAuthCheck()) : wx.showToast({
                title: "敬请期待"
            });
        },
        goImgSwip: function(e) {
            var a = this, t = e.currentTarget.dataset.jumpvalue, r = {
                clkDesPage: "tupianku",
                type: "CLK",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                clkName: e.currentTarget.dataset.clkname || "",
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue
                }
            };
            n.trackRequest(r, o), 1 == t && 1 == this.data.effectShowable || 2 == t && 1 == this.data.sampleShowable || 3 == t && 1 == this.data.realityShowable || 4 == t && 1 == this.data.matchShowable ? s.imPhoneAuthorize ? o.authorizeSet(function() {
                a.afterAuthCheck();
            }) : this.afterAuthCheck() : wx.showToast({
                title: "敬请期待"
            });
        },
        navigateToCityFromNav: function(e) {
            this.navigateToCity(e.detail);
        },
        navigateToCity: function(e) {
            var a = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - void 0) / 1e3,
                expand: "",
                clkDesPage: e.currentTarget.dataset.despage || "",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkName: e.currentTarget.dataset.clkname || "",
                clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue
                }
            };
            n.trackRequest(a, o), this.data.executeNavigateFuc = !0, wx.navigateTo({
                url: "../addressModule/addressModule"
            });
        },
        navigateMakePhone: function(e) {
            var a = e.currentTarget.dataset.phone, t = {
                type: "CLK",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkName: e.currentTarget.dataset.clkname || "",
                clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue,
                    phone: a
                }
            };
            n.trackRequest(t, o), wx.makePhoneCall({
                phoneNumber: a
            });
        },
        navigateFucFromNav: function(e) {
            this.jumpCheck(e.detail);
        },
        handleProductData: function(e) {
            e && (e.productModuleHeight = parseInt(e.unifyTitleObj.height), e.moduleList && e.moduleList.forEach(function(e, a) {
                e.productListShow = !1, e.productListHeight = 0, e.imgUrl = e.moduleStyle.imageUrl, 
                e.buriaName = e.moduleStyle.buriaName, e.CN_name = e.titleObj.titleText, e.address = e.titleObj.address, 
                e.productList = e.subtitle;
            }));
        },
        productViewItemClk: function(e) {
            var a = this;
            o.globalData.selectNewCity = !1;
            var t = e.currentTarget.dataset.index, r = e.currentTarget.dataset.markidx, i = this.data.productModuleObjectList, s = i[r].productModuleHeight, l = i[r].moduleList;
            if (l[t] && l[t].productList && l[t].productList.length > 0) {
                var u = {
                    type: "CLK",
                    pvPageStayTime: (new Date().getTime() - void 0) / 1e3,
                    expand: "",
                    clkDesPage: "",
                    pvCurPageName: this.data.pvCurPageName,
                    pvCurPageParams: this.data.pvCurPageParams,
                    clkName: e.currentTarget.dataset.clkname || "",
                    clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                    clkParams: {
                        dianjiwei: e.currentTarget.dataset.clicklength,
                        dianjivalue: e.currentTarget.dataset.clickvalue
                    }
                };
                n.trackRequest(u, o), l[t].productListShow = !l[t].productListShow;
                var c = l[t].productList.length * (this.data.productExpandHeight + 40) - 40 + 120;
                if (l[t].productListShow) {
                    var d = this.data.produceScrollPoint ? this.data.produceScrollPoint.scrollTop : 0, g = o.systemInfo.windowWidth / 750, p = Math.ceil((t * s + 120) * g), m = Math.ceil((l.length * s + 120) * g);
                    if (this.data.productLastIndex > -1) {
                        var h = 0;
                        for (var v in l) if (l[v].productListShow && t != v) {
                            h = v;
                            break;
                        }
                        l[h].productListHeight, l[h].productListHeight = 0, l[h].productListShow = !1;
                    }
                    l[t].productListHeight = c;
                    var f = parseInt(o.systemInfo.windowHeight / (s * g));
                    if (t >= l.length - f) this.setData({
                        productModuleObjectList: i
                    }, function() {
                        setTimeout(function() {
                            a.setData({
                                toView: "itemView" + t + "_productMarkIdx" + r
                            });
                        }, 550);
                    }); else {
                        var k = this.createSelectorQuery();
                        k.select("#itemView" + t + "_productMarkIdx" + r).boundingClientRect(), k.selectViewport().scrollOffset(), 
                        k.exec(function(e) {
                            console.log("***createSelectorQuery***", m, d, e);
                            var t = e[0].top;
                            a.setData({
                                productModuleObjectList: i
                            }, function() {
                                var e = (c + s) * g, r = 100, i = o.systemInfo.windowHeight;
                                if (a.data.navigateHasPadding && (i = o.systemInfo.windowHeight - o.globalData.navigateStatusContainerHeight), 
                                e > i) r = a.data.navigateHasPadding ? o.globalData.navigateStatusContainerHeight : 0; else {
                                    var n = 0;
                                    if (a.data.navigateHasPadding && (n = o.globalData.navigateStatusContainerHeight), 
                                    t < n) r = n; else if (e + t < i) {
                                        if (0 == a.data.lower) return !1;
                                        r = t;
                                    }
                                }
                                a.data.lower ? setTimeout(function() {
                                    a.setData({
                                        scrollTop: p - r
                                    });
                                }, 550) : a.setData({
                                    scrollTop: p - r
                                });
                            });
                        });
                    }
                    this.data.productLastIndex = t, this.setData({
                        productModuleObjectList: i
                    });
                } else this.data.productLastIndex == t && (this.data.productLastIndex = -1), l[t].productListHeight = 0, 
                this.setData({
                    productModuleObjectList: i
                });
            } else this.jumpCheck(e);
        },
        querySelectCity: function() {
            var e = this;
            return t(r.default.mark(function a() {
                var t, n, l, u, c, d, g, p, m;
                return r.default.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return t = e, n = {
                            houseId: s.houseId,
                            customerId: o.globalData.single && o.globalData.single.id ? o.globalData.single.id : ""
                        }, a.next = 4, (0, i.default)("selectCityHistory", n, !0);

                      case 4:
                        if (!((l = a.sent).success && l.single && l.single.currentCity && l.single.cityHistory)) {
                            a.next = 27;
                            break;
                        }
                        for (t.setData({
                            currentSelectCity: l.single.currentCity
                        }), u = !0, c = !1, d = void 0, a.prev = 10, g = l.single.cityHistory[Symbol.iterator](); !(u = (p = g.next()).done); u = !0) (m = p.value).city == l.single.currentCity && (o.globalData.selectCityCode = m.cityCode, 
                        o.globalData.selectCityName = m.city);
                        a.next = 18;
                        break;

                      case 14:
                        a.prev = 14, a.t0 = a.catch(10), c = !0, d = a.t0;

                      case 18:
                        a.prev = 18, a.prev = 19, !u && g.return && g.return();

                      case 21:
                        if (a.prev = 21, !c) {
                            a.next = 24;
                            break;
                        }
                        throw d;

                      case 24:
                        return a.finish(21);

                      case 25:
                        return a.finish(18);

                      case 26:
                        e.setData({
                            "navbar.currentSelectCity": o.globalData.selectCityName
                        });

                      case 27:
                        t.sortsProductViewList();

                      case 28:
                      case "end":
                        return a.stop();
                    }
                }, a, e, [ [ 10, 14, 18, 26 ], [ 19, , 21, 25 ] ]);
            }))();
        },
        sortsProductViewList: function() {
            var e = this.data.productModuleObjectList, t = this.data.defaultProductObjList;
            if (e && !d) {
                d = !0;
                for (var r in e) {
                    var i = e[r], n = [], s = [];
                    for (var l in i.moduleList) {
                        var u = i.moduleList[l];
                        u.city[1] && u.city[1] == o.globalData.selectCityCode && n.push(l);
                    }
                    for (var c = i.moduleList.length, g = 0; g < c; g++) {
                        var p = i.moduleList[g];
                        if (p.city[1]) if (p.city[1] && 8100 == p.city[1].toString().substring(0, 4) || p.city[1] && 8200 == p.city[1].toString().substring(0, 4)) {
                            if (p.city[0] == o.globalData.selectCityCode) {
                                var m = i.moduleList.splice(g, 1);
                                s.push(m[0]), g -= 1, c -= 1;
                            }
                        } else if (p.city[1] == o.globalData.selectCityCode) {
                            var h = i.moduleList.splice(g, 1);
                            s.push(h[0]), g -= 1, c -= 1;
                        }
                    }
                    var v = !0;
                    if (o.globalData.selectNewCity || (v = !1), s.length > 0) {
                        v = !1;
                        var f = !0, k = !1, T = void 0;
                        try {
                            for (var P, y = s[Symbol.iterator](); !(f = (P = y.next()).done); f = !0) {
                                var C = P.value;
                                i.moduleList.unshift(C);
                            }
                        } catch (e) {
                            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                            k = !0, T = e;
                        } finally {
                            try {
                                !f && y.return && y.return();
                            } finally {
                                if (k) throw T;
                            }
                        }
                    }
                    var w = "productModuleObjectList[" + r + "].moduleList", D = i.moduleList;
                    v && (D = this.deepClone(t)[r].moduleList), this.setData(a({}, w, D));
                }
                d = !1;
            }
        },
        navigateToSearch: function(e) {
            var a = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - void 0) / 1e3,
                expand: "",
                clkDesPage: e.currentTarget.dataset.despage || "",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkName: e.currentTarget.dataset.clkname || "",
                clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue
                }
            };
            n.trackRequest(a, o), this.data.executeNavigateFuc = !0, wx.navigateTo({
                url: "../searchModule/searchModule"
            });
        },
        navigateToMiniPage: function(e) {
            var a = e.currentTarget.dataset.jumplink, t = e.currentTarget.dataset.jumpvalue, r = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - void 0) / 1e3,
                expand: "",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkName: e.currentTarget.dataset.clkname || "",
                clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue
                }
            };
            n.trackRequest(r, o), a.startsWith("/") && (a = a.substring(a.indexOf("/") + 1)), 
            a = a.trim(), this.data.executeNavigateFuc = !0, wx.navigateTo({
                url: "../../" + a + "?pageId=" + t,
                fail: function(a) {
                    var t = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: this.data.pvCurPageName,
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(a) + ";pageId=" + this.data.pageId + ";param=" + JSON.stringify(e.currentTarget.dataset || "")
                    };
                    n.trackRequest(t), wx.showToast({
                        title: "敬请期待"
                    });
                }
            });
        },
        goJump: function(e) {
            console.log(e.currentTarget.dataset);
            var a = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - void 0) / 1e3,
                expand: "",
                clkDesPage: e.currentTarget.dataset.despage || "",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkName: e.currentTarget.dataset.clkname || "",
                clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue
                }
            };
            n.trackRequest(a, o);
            var t = e.currentTarget.dataset.title || "";
            if (console.log("title" + t), e.currentTarget.dataset.jumplink) {
                o.globalData.currDespage = e.currentTarget.dataset.despage || "";
                var r = e.currentTarget.dataset.jumplink;
                if (r && r.length > 0) {
                    var i = r.substring(r.lastIndexOf(".")).toLocaleLowerCase();
                    i && ".mp4" == i ? wx.navigateTo({
                        url: "../bearVideo/bearVideo?source=" + r + "&title=" + t,
                        success: function() {},
                        fail: function(e) {
                            console.log(e);
                        }
                    }) : wx.navigateTo({
                        url: "../webView/webView?view=" + encodeURIComponent(r) + "&title=" + t,
                        success: function() {},
                        fail: function(e) {
                            console.log(e);
                        }
                    });
                }
            }
        },
        goMoment: function(e) {
            var a = this;
            return t(r.default.mark(function t() {
                var o, l, u;
                return r.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, (0, i.default)("queryMomentCurrent", {
                            houseId: s.houseId
                        });

                      case 2:
                        if (!((o = t.sent) && o.success && o.single)) {
                            t.next = 15;
                            break;
                        }
                        if (console.log("***此时此刻视频信息***", o), !o.single.id) {
                            t.next = 13;
                            break;
                        }
                        return l = {
                            clkDesPage: "shishishijing",
                            clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                            clkName: e.currentTarget.dataset.clkname || "",
                            clkParams: {
                                dianjiwei: e.currentTarget.dataset.clicklength,
                                dianjivalue: e.currentTarget.dataset.clickvalue,
                                lookNum: a.data.initData.momentModule.viewCount || "0"
                            },
                            type: "CLK"
                        }, n.trackRequest(l), t.next = 10, (0, i.default)("modifyMomentView", {
                            id: o.single.id,
                            viewNumber: 1
                        });

                      case 10:
                        u = t.sent, a.myLoading && a.myLoading.hideLoading(), wx.navigateTo({
                            url: "../video/video?momentId=" + o.single.id
                        });

                      case 13:
                        t.next = 16;
                        break;

                      case 15:
                        wx.showToast({
                            title: "敬请期待"
                        });

                      case 16:
                      case "end":
                        return t.stop();
                    }
                }, t, a);
            }))();
        },
        getHourse3DList: function(e) {
            var a = this;
            return t(r.default.mark(function t() {
                var n, o, l;
                return r.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return n = 0, o = e, t.next = 4, (0, i.default)("getTDHouseList", {
                            houseId: s.houseId,
                            pageNo: 1,
                            pageSize: 10
                        });

                      case 4:
                        (l = t.sent) && l.success && l.list && l.list.length > 0 ? (console.log("3D看房:" + JSON.stringify(l)), 
                        l.list.forEach(function(e) {
                            2 == e.catalog && n++;
                        }), n > 1 && (o.currentTarget.dataset.jumplink = s.tdviewUrl + s.houseId, a.goJump(o)), 
                        1 == n && (o.currentTarget.dataset.jumplink = l.list[0].url, a.goJump(o))) : wx.showToast({
                            title: "敬请期待"
                        });

                      case 6:
                      case "end":
                        return t.stop();
                    }
                }, t, a);
            }))();
        },
        goFunc: function(e) {
            var a = this;
            return t(r.default.mark(function t() {
                var o, l, u, c;
                return r.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (console.log("跳轉數據:" + JSON.stringify(e.currentTarget.dataset)), 0 != e.currentTarget.dataset.jumptype) {
                            t.next = 5;
                            break;
                        }
                        return t.abrupt("return", !1);

                      case 5:
                        if (1 != e.currentTarget.dataset.jumptype) {
                            t.next = 9;
                            break;
                        }
                        a.goJump(e), t.next = 31;
                        break;

                      case 9:
                        if (2 != e.currentTarget.dataset.jumptype) {
                            t.next = 13;
                            break;
                        }
                        wx.navigateTo({
                            url: "../scaleImg/scaleImage?type=" + e.currentTarget.dataset.jumpvalue
                        }), t.next = 31;
                        break;

                      case 13:
                        if (3 != e.currentTarget.dataset.jumptype) {
                            t.next = 30;
                            break;
                        }
                        if (o = e.currentTarget.dataset.jumplink, !(l = e.currentTarget.dataset.jumpvalue)) {
                            t.next = 20;
                            break;
                        }
                        2 === a.data.currentPageData.templateSetting ? wx.navigateTo({
                            url: "../houseTypeDetailModule/houseTypeDetailModule?houseType=" + l + "&buildid=" + o
                        }) : wx.navigateTo({
                            url: "../houseTypeDetail/houseTypeDetail?houseType=" + l + "&buildid=" + o
                        }), t.next = 28;
                        break;

                      case 20:
                        if (!o) {
                            t.next = 27;
                            break;
                        }
                        return t.next = 23, (0, i.default)("pageListLayoutByBuilding", {
                            houseId: s.houseId,
                            buildingId: o
                        });

                      case 23:
                        (u = t.sent) && u.success && u.pageModel.resultSet && u.pageModel.resultSet.length > 0 ? 2 === a.data.currentPageData.templateSetting ? wx.navigateTo({
                            url: "../houseTypeModule/houseTypeModule?buildid=" + o
                        }) : wx.navigateTo({
                            url: "../houseType/houseType?buildid=" + o
                        }) : wx.showToast({
                            title: "敬请期待"
                        }), t.next = 28;
                        break;

                      case 27:
                        2 === a.data.currentPageData.templateSetting ? wx.navigateTo({
                            url: "../houseTypeModule/houseTypeModule"
                        }) : wx.navigateTo({
                            url: "../houseType/houseType"
                        });

                      case 28:
                        t.next = 31;
                        break;

                      case 30:
                        4 == e.currentTarget.dataset.jumptype ? a.goMoment(e) : 5 == e.currentTarget.dataset.jumptype ? a.navigateToMiniPage(e) : 6 == e.currentTarget.dataset.jumptype ? wx.navigateTo({
                            url: "../customHouse/customHouse"
                        }) : 7 == e.currentTarget.dataset.jumptype ? a.navigateToWaitToast(e) : 8 == e.currentTarget.dataset.jumptype ? a.navigateToSearch(e) : 9 == e.currentTarget.dataset.jumptype ? a.navigateToCity(e) : 10 == e.currentTarget.dataset.jumptype ? wx.navigateTo({
                            url: "../customPay/customPay"
                        }) : 11 == e.currentTarget.dataset.jumptype ? a.getHourse3DList(e) : 12 == e.currentTarget.dataset.jumptype ? a.goNewVideo(e) : 15 == e.currentTarget.dataset.jumptype ? a.navigateToVideoRoom(e) : 18 == e.currentTarget.dataset.jumptype ? a.goOtherMini(e) : e.currentTarget.dataset.jumplink && e.currentTarget.dataset.jumplink.length > 0 && ((c = e.currentTarget.dataset.jumplink).startsWith("/") && (c = c.substring(c.indexOf("/") + 1)), 
                        c = c.trim(), wx.navigateTo({
                            url: "../" + c + "?fromHouseIndex=true",
                            fail: function(t) {
                                var r = {
                                    type: "mini-program-Error",
                                    pvPageStayTime: new Date().getTime() / 1e3,
                                    adviserId: "",
                                    imTalkId: "",
                                    imTalkType: "",
                                    pvCurPageName: a.data.pvCurPageName,
                                    clkDesPage: "",
                                    clkName: "",
                                    clkId: "",
                                    expand: JSON.stringify(t) + ";houseId=" + s.houseId + ";param=" + JSON.stringify(e.currentTarget.dataset || "")
                                };
                                n.trackRequest(r), wx.showToast({
                                    title: "敬请期待"
                                });
                            }
                        }));

                      case 31:
                      case "end":
                        return t.stop();
                    }
                }, t, a);
            }))();
        },
        goOtherMini: function(e) {
            var a = this, t = e.currentTarget.dataset.jumplink, r = e.currentTarget.dataset.jumpvalue || "", i = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - void 0) / 1e3,
                expand: "",
                clkDesPage: e.currentTarget.dataset.despage || "",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkName: e.currentTarget.dataset.clkname || "",
                clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue
                }
            };
            n.trackRequest(i, o), wx.navigateToMiniProgram({
                appId: r,
                path: t,
                envVersion: "release",
                success: function(t) {
                    a.closeAD(e);
                },
                fail: function(e) {
                    console.warn("***打开其他小程fail***", e);
                }
            });
        },
        navigateToVideoRoom: function(e) {
            var a = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - void 0) / 1e3,
                expand: "",
                clkDesPage: e.currentTarget.dataset.despage || "",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkName: e.currentTarget.dataset.clkname || "",
                clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue
                }
            };
            n.trackRequest(a, o), wx.navigateTo({
                url: "../multiroom/aide/aide"
            });
        },
        goNewVideo: function(e) {
            var a = e.currentTarget.dataset.jumplink, t = e.currentTarget.dataset.expand || "", r = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - void 0) / 1e3,
                expand: "",
                clkDesPage: e.currentTarget.dataset.despage || "",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkName: e.currentTarget.dataset.clkname || "",
                clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue
                }
            };
            n.trackRequest(r, o), wx.navigateTo({
                url: "../bearVideo/bearVideo?source=" + a + "&title=" + t
            });
        },
        navigateToWaitToast: function(e) {
            var a = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - void 0) / 1e3,
                expand: "",
                clkDesPage: e.currentTarget.dataset.despage || "",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkName: e.currentTarget.dataset.clkname || "",
                clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue
                }
            };
            n.trackRequest(a, o), wx.showToast({
                title: "敬请期待"
            });
        },
        navigateToRecordUser: function(e) {
            wx.navigateTo({
                url: "../recordUser/recordUser"
            });
        },
        navigateToFangDaiJiSuanQi: function(e) {
            var a = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - void 0) / 1e3,
                expand: "",
                clkDesPage: e.currentTarget.dataset.despage || "",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkName: e.currentTarget.dataset.clkname || "",
                clkId: "clk_2cmina_" + e.currentTarget.dataset.clickid,
                clkParams: {
                    dianjiwei: e.currentTarget.dataset.clicklength,
                    dianjivalue: e.currentTarget.dataset.clickvalue
                }
            };
            n.trackRequest(a, o);
            wx.navigateTo({
                url: "../webView/webView?view=" + encodeURIComponent("") + "&title=",
                success: function() {},
                fail: function(e) {
                    console.log(e);
                }
            });
        },
        navigateDefineShare: function(e) {
            var a = {
                type: "CLK",
                pvPageStayTime: (new Date().getTime() - void 0) / 1e3,
                expand: "",
                clkDesPage: e.currentTarget.dataset.despage || "",
                pvCurPageName: this.data.pvCurPageName,
                pvCurPageParams: this.data.pvCurPageParams,
                clkName: "diyfenxiangkapian",
                clkId: "clk_2cmina_01021"
            };
            n.trackRequest(a, o), wx.navigateTo({
                url: "../defineShare/defineShare"
            });
        },
        getVideoChatCount: function() {
            var e = this;
            return t(r.default.mark(function a() {
                var t;
                return r.default.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return a.next = 2, (0, i.default)("getVideoChatCount", {
                            houseId: s.houseId,
                            id: o.globalData.single.id
                        }, !0);

                      case 2:
                        (t = a.sent).success && e.setData({
                            videoChatCount: t.single
                        });

                      case 4:
                      case "end":
                        return a.stop();
                    }
                }, a, e);
            }))();
        }
    }
});