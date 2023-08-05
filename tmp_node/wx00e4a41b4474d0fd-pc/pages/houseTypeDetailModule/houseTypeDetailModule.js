function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    return function() {
        var a = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function i(r, n) {
                try {
                    var o = a[r](n), s = o.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!o.done) return Promise.resolve(s).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(s);
            }
            return i("next");
        });
    };
}

var t, i = e(require("../../lib/runtime")), r = e(require("../../lib/requestConfig")), n = e(require("../../utils/monitor.js")), o = "", s = require("../../utils/util.js"), u = getApp(), l = require("../../config.js"), d = require("../../getlogininfo.js").getUserInfo;

Page({
    data: {
        testTitle: [ "户型亮点", "户型图", "精装效果", "精装效果1", "精装效果2", "精装效果2222" ],
        currentWindowsWidth: "",
        currentTab: 0,
        scrollLeft: 0,
        titleStyle: "",
        serverUrl: "http://skyforest.static.elab-plus.com/wepy_pro/v1-2/",
        jbColor1: "#AD7C59",
        jbColor2: "#AD7C59",
        list: [ "123", "123", "123", "123", "123" ],
        positionImg: "",
        effectImage: "",
        hasVr: "",
        vrUrl: "",
        despage: "huxingtupianmodule",
        despageForChat: "huxingtupianmodule",
        previewFlag: !1,
        houseDetail: "",
        active: 0,
        current: 0,
        currentIndex: 0,
        defaultImagePath: "../../image/wepy_pro/loading1.gif",
        TDImagePath: "../../image/wepy_pro/TD_icon.png",
        layoutImgheights: [],
        hardbackImgheights: [],
        imgwidth: 750,
        layoutWidth: 690,
        currentRoomDetail: {
            area: 0,
            name: ""
        },
        currentHouseInformation: [],
        remarkList: [],
        remark2List: [],
        tableList: [],
        currentList: [],
        currentHardbackList: [],
        currentLayoutList: [],
        styleLayoutHeight: 0,
        styleHardbackHeight: 0,
        stylePositionHeight: 0,
        currentName: "",
        buildingId: "",
        emptyHeight: !1,
        showPhoneModel: !1,
        showInfoModel: !1,
        bottomText: "",
        isReadyToGoChat: !1,
        houseType: "",
        isShowDiy: !1,
        scrollTop: 0,
        checkTabForScroll: 0,
        isGoVr: !1,
        imPhoneAuthorize: !1,
        showScroll: !0
    },
    afterPhoneHandle: function(e) {
        e && "fail" === e.type && wx.showToast({
            title: "您已拒绝授权",
            icon: "none",
            duration: 1500
        }), e && "success" === e.type && (this.setData({
            showPhoneModel: !1
        }), this.data.isGoVr && (this.tabVr(), this.data.isGoVr = !1));
        var a = {
            clkDesPage: this.data.despage || "",
            type: "CLK",
            pvCurPageName: this.data.despage || "",
            pvCurPageParams: o,
            clkId: "clk_2cmina_137",
            clkName: "weixinshouquan",
            clkParams: {
                "wx.authorize.scope": "wx.getPhoneNum",
                type: e.type
            }
        };
        s.trackRequest(a);
    },
    afterUserHandle: function(e) {
        if (e.detail) {
            this.setData({
                showInfoModel: !1
            });
            var a = {
                clkDesPage: this.data.despage || "",
                type: "CLK",
                pvCurPageName: this.data.despage || "",
                pvCurPageParams: o,
                clkId: "clk_2cmina_137",
                clkName: "weixinshouquan",
                clkParams: {
                    "wx.authorize.scope": "wx.getUserInfo",
                    type: e.type
                }
            };
            s.trackRequest(a);
        }
    },
    heightHandle: function(e) {
        console.warn("***heightHandle***", e), e.detail && (e.detail.showBackModel || e.detail.showIMModel || e.detail.showShare) && this.setData({
            emptyHeight: !0
        });
    },
    refreshNumber: function() {
        this.selectComponent("#IMView").refreshNumber();
    },
    ImageError: function(e) {
        console.log("houseTypeDetailModule", e);
    },
    ImageLayoutLoad: function(e) {
        this.data.currentLayoutList[e.currentTarget.dataset.index || 0].loadComplete = !0;
        var a = e.detail.width / (t = e.detail.height), t = this.data.layoutWidth / a, i = this.data.layoutImgheights;
        i[e.currentTarget.dataset.index] = t, this.data.styleLayoutHeight = this.data.styleLayoutHeight + t, 
        this.setData({
            currentLayoutList: this.data.currentLayoutList,
            layoutImgheights: i,
            styleLayoutHeight: this.data.styleLayoutHeight
        });
    },
    ImageHardbackLoad: function(e) {
        this.data.currentHardbackList[e.currentTarget.dataset.index || 0].loadComplete = !0;
        var a = e.detail.width / (t = e.detail.height), t = this.data.imgwidth / a, i = this.data.hardbackImgheights;
        i[e.currentTarget.dataset.index] = t, this.data.styleHardbackHeight = this.data.styleHardbackHeight + t, 
        this.setData({
            currentHardbackList: this.data.currentHardbackList,
            hardbackImgheights: i,
            styleHardbackHeight: this.data.styleHardbackHeight
        });
    },
    ImagePositionLoad: function(e) {
        var a = e.detail.width / (t = e.detail.height), t = this.data.layoutWidth / a;
        this.data.stylePositionHeight = t + 60, this.setData({
            stylePositionHeight: t + 60
        });
    },
    afterIndexHandle: function(e) {
        var a = {
            clkDesPage: "zhuye",
            type: "CLK",
            pvCurPageName: this.data.despage || "",
            pvCurPageParams: o,
            clkId: "clk_2cmina_138",
            clkName: "huishouyeanniu"
        };
        s.trackRequest(a);
    },
    afterIMHandle: function(e) {
        var a = {
            clkDesPage: "xiaoxiliebiao",
            type: "CLK",
            pvCurPageName: this.data.despage || "",
            pvCurPageParams: o,
            clkId: "clk_2cmina_23",
            clkName: "zaixianzixun"
        };
        s.trackRequest(a);
    },
    calculateTitleStyle: function() {
        var e = this.data.tableList.length, a = void 0;
        a = e > 4 ? " margin:0 36rpx;" : "width:" + 750 / e + "rpx", this.setData({
            titleStyle: a
        });
    },
    switchTab: function(e) {
        var a = this, i = void 0;
        if (i = 1 == e.detail.current ? {
            type: "PV",
            pvCurPageName: "jingzhuanghuxingtapian",
            pvId: "p_2cmina_81",
            pvCurPageParams: o
        } : {
            pvId: "P_2cMINA_10",
            type: "PV",
            pvCurPageParams: o,
            pvCurPageName: this.data.despage || "",
            pvPageLoadTime: new Date().getTime() - t
        }, s.trackRequest(i), this.setData({
            currentTab: e.detail.current,
            showScroll: !1
        }, function() {
            a.setData({
                showScroll: !0
            });
        }), this.data.showPhoneModel && 1 == e.detail.current && (console.log("sss"), this.setData({
            scrollTop: 0
        }), this.data.showPhoneModel)) {
            var r = {
                type: "EXP",
                pvCurPageName: this.data.despage || "",
                eventId: "exp_2cmina_13",
                eventName: "huxingshouquan",
                eventModuleDes: JSON.stringify({
                    "wx.authorize.scope": "wx.getPhoneNumber"
                })
            };
            s.trackRequest(r);
        }
        var n = setTimeout(function() {
            a.setData({
                checkTabForScroll: e.detail.current
            }), console.log(a.data.showPhoneModel, a.data.checkTabForScroll), clearTimeout(n);
        }, 200);
        this.checkCor();
    },
    swichNav: function(e) {
        var a = e.currentTarget.dataset.current, t = {
            clkId: "clk_2cmina_214",
            clkName: "huxingxiangqingziyeTab",
            type: "CLK",
            clkParams: {
                tabName: e.currentTarget.dataset.item
            },
            pvCurPageName: "houseTypeDetailModule.js",
            pvCurPageParams: o
        };
        if (s.trackRequest(t), this.data.currentTab == a) return !1;
        this.setData({
            currentTab: a
        });
    },
    checkCor: function() {
        this.data.currentTab > 3 ? this.setData({
            scrollLeft: 650
        }) : this.setData({
            scrollLeft: 0
        });
    },
    getHouseList: function(e, t) {
        var n = this;
        return a(i.default.mark(function a() {
            var o, d, c, h, g, m, p, y, f;
            return i.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.next = 2, (0, r.default)("pageListLayoutByBuilding", {
                        houseId: l.houseId,
                        buildingId: e
                    });

                  case 2:
                    if (!((o = a.sent) && o.success && o.pageModel.resultSet && o.pageModel.resultSet.length > 0)) {
                        a.next = 28;
                        break;
                    }
                    d = o.pageModel.resultSet, c = 0, a.t0 = i.default.keys(o.pageModel.resultSet);

                  case 7:
                    if ((a.t1 = a.t0()).done) {
                        a.next = 17;
                        break;
                    }
                    if (h = a.t1.value, (g = o.pageModel.resultSet[h]).id != t) {
                        a.next = 15;
                        break;
                    }
                    return c = h, n.data.currentIndex = c, n.data.currentName = g.name || "户型详情", a.abrupt("break", 17);

                  case 15:
                    a.next = 7;
                    break;

                  case 17:
                    if (wx.setNavigationBarTitle({
                        title: n.data.currentName
                    }), d[c].layoutImageResponseList) for (m = 0; m < d[c].layoutImageResponseList.length; m++) d[c].layoutImageResponseList[m].loadComplete = !1;
                    if (d[c].layoutHardbackImageResponseList) for (p = 0; p < d[c].layoutHardbackImageResponseList.length; p++) d[c].layoutHardbackImageResponseList[p].loadComplete = !1;
                    n.data.vrUrl = d[c].vrUrl || "", n.data.currentRoomDetail = d[c], 1 == n.data.currentRoomDetail.hasVr && n.data.showPhoneModel && (y = {
                        type: "EXP",
                        pvCurPageName: n.data.despage || "",
                        eventId: "exp_2cmina_16",
                        eventName: "3dkanfangjiesuo",
                        eventModuleDes: JSON.stringify({
                            "wx.authorize.scope": "wx.getPhoneNumber"
                        })
                    }, s.trackRequest(y)), n.setData({
                        active: t,
                        currentRoomDetail: d[c],
                        positionImg: d[c].positionImg,
                        currentHardbackList: d[c].layoutHardbackImageResponseList || [],
                        effectImage: d[c].effectImage,
                        hasVr: d[c].hasVr,
                        houseType: d[c].unitDes,
                        houseDetail: d[c].remark,
                        currentLayoutList: d[c].layoutImageResponseList || []
                    }), n.handleHouseInformation(), n.queryHouseImageRecommend(d[c].id), a.next = 32;
                    break;

                  case 28:
                    wx.showToast({
                        title: "户型已下架，先来看看其他内容吧!",
                        icon: "warn",
                        duration: 1500
                    }), wx.redirectTo({
                        url: "../houseTypeModule/houseTypeModule"
                    }), f = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "houseTypeDetailModule.js-getHouseListError",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(u.globalData) + ";houseId=" + l.houseId + ";buildingId=" + e + ";requestmessage=" + JSON.stringify(o)
                    }, s.trackRequest(f);

                  case 32:
                  case "end":
                    return a.stop();
                }
            }, a, n);
        }))();
    },
    getCurrentPageParam: function() {
        return o;
    },
    onLoad: function(e) {
        var a = this;
        this.getSystemInformation(), o = JSON.stringify(e), this.myLoading = this.selectComponent("#myLoading"), 
        this.myLoading && this.myLoading.showLoading(), u.decrypt(e, function() {
            if (console.log("****houseTypeDetail-onload**", o, "###shareToken###:", e.shareToken), 
            e && e.shareToken && e.id) if (a.data.currentIndex = e.currentIndex || 0, a.data.currentName = e.currentName || "户型详情", 
            a.data.houseType = e.id || "", a.data.active = e.id || null, a.data.buildingId = e.buildingId, 
            console.log("***来自分享***", a.data.currentIndex, a.data.currentName, a.data.active, a.data.buildingId), 
            a.data.buildingId) a.getHouseList(a.data.buildingId, a.data.active, a.data.currentIndex); else {
                wx.navigateTo({
                    url: "../houseTypeModule/houseTypeModule"
                });
                var t = {
                    type: "mini-program-Error",
                    pvPageStayTime: new Date().getTime() / 1e3,
                    adviserId: "",
                    imTalkId: "",
                    imTalkType: "",
                    pvCurPageName: "houseTypeDetailModule.js-onLoadError",
                    clkDesPage: "",
                    clkName: "",
                    clkId: "",
                    expand: JSON.stringify(u.globalData) + ";houseId=" + l.houseId + ";sharemessage=" + JSON.stringify(e)
                };
                s.trackRequest(t);
            } else if (e && e.scene) {
                var i = u.globalData.attrs;
                if (a.data.currentIndex = i.currentIndex || 0, a.data.currentName = i.currentName || "户型详情", 
                a.data.active = i.id || null, a.data.houseType = i.id || "", a.data.buildingId = i.buildingId, 
                console.log("***来自卡片分享***", a.data.currentIndex, a.data.currentName, a.data.active, a.data.buildingId), 
                a.data.buildingId) a.getHouseList(a.data.buildingId, a.data.active, a.data.currentIndex); else {
                    wx.navigateTo({
                        url: "../houseTypeModule/houseTypeModule"
                    });
                    var r = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "houseTypeDetailModule.js-onLoadError",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(u.globalData) + ";houseId=" + l.houseId + ";sharemessage=" + JSON.stringify(e)
                    };
                    s.trackRequest(r);
                }
            } else e.houseType && e.buildid && (a.setData({
                buildingId: e.buildid,
                houseType: e.houseType
            }), a.getHouseList(e.buildid, e.houseType));
            u.globalData.pageDesc = "huxingtupian";
        });
    },
    queryHouseImageRecommend: function(e) {
        var t = this;
        return a(i.default.mark(function a() {
            var n, o;
            return i.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return n = {
                        houseType: e,
                        environment: 3,
                        uid: ""
                    }, a.next = 3, (0, r.default)("queryHouseImageRecommend", n);

                  case 3:
                    (o = a.sent).success && o.single && 1 == o.single ? t.setData({
                        isShowDiy: !0
                    }) : t.setData({
                        isShowDiy: !1
                    });

                  case 5:
                  case "end":
                    return a.stop();
                }
            }, a, t);
        }))();
    },
    handleHouseInformation: function() {
        var e = this.data.currentRoomDetail, a = JSON.parse(JSON.stringify(e.layoutParamsResponseList)) || [], t = [];
        if (e.unitDes && e.unitDes.length > 0) {
            var i = {};
            i.name = "房型", i.content = e.unitDes, t.push(i);
        }
        if (e.area && e.area.length > 0) {
            var r = {};
            r.name = "面积", r.content = (1 != e.areaType && e.areaType ? 2 == e.areaType ? "建面" : "套内" : "") + "约" + e.area + "m²", 
            t.push(r);
        }
        this.setData({
            currentHouseInformation: t.concat(a)
        });
        var n = e.remark, o = n ? n.split(",") : [], s = o.length, u = e.remark ? e.remark.length - s : 0;
        if (s > 1 && u > 20) {
            for (var l = [], d = [], c = "", h = o.sort(function(e, a) {
                return e.length > a.length ? 1 : e.length < a.length ? -1 : 0;
            }), g = 0; g < h.length; g++) c.length + h[g].length >= u / 2 ? d.push(h[g]) : (c += h[g], 
            l.push(h[g]));
            this.setData({
                remarkList: d,
                remark2List: l
            });
        } else this.setData({
            remarkList: o
        });
        var m = [];
        e.highlightTabName && m.push(e.highlightTabName), e.layoutTabName && m.push(e.layoutTabName), 
        e.hardbackTabName && e.layoutHardbackImageResponseList && e.layoutHardbackImageResponseList.length > 0 && m.push(e.hardbackTabName), 
        this.setData({
            tableList: m
        }), this.calculateTitleStyle();
    },
    getSystemInformation: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(a) {
                var t = a.windowHeight * (750 / a.windowWidth) - 180;
                console.log("onLoad:" + t), e.setData({
                    currentWindowsWidth: t
                });
            }
        });
    },
    priviewPic1: function(e) {
        var a = this.data.currentRoomDetail, t = this.data.currentTab, i = this.data.tableList, r = e.currentTarget.dataset.item;
        if (r && r.url && r.url.length > 0) wx.navigateTo({
            url: "../webView/webView?view=" + encodeURIComponent(r.url),
            success: function() {},
            fail: function(e) {
                console.log(e);
            }
        }); else {
            var n = "", u = "";
            i[t] === a.hardbackTabName ? (n = this.data.currentHardbackList[e.currentTarget.dataset.index].image, 
            u = this.data.currentHardbackList.map(function(e) {
                return e.image;
            })) : i[t] === a.layoutTabName ? (n = this.data.currentLayoutList[e.currentTarget.dataset.index].imageUrl, 
            u = this.data.currentLayoutList.map(function(e) {
                return e.imageUrl;
            })) : i[t];
            var l = {
                clkDesPage: this.data.despage || "",
                type: "CLK",
                pvCurPageName: this.data.despage || "",
                pvCurPageParams: o,
                clkId: "clk_2cmina_217",
                clkName: "fangdahuxingtupian",
                clkParams: {
                    imageUrl: n
                }
            };
            s.trackRequest(l);
            var d = {
                pvId: "p_2cmina_82",
                type: "PV",
                pvCurPageName: "huxingxiangqingtupian",
                pvCurPageParams: {
                    imageUrl: n
                }
            };
            s.trackRequest(d), this.data.previewFlag = !0, console.log(u), wx.previewImage({
                current: n,
                urls: u
            });
        }
    },
    positionPriviewPic: function(e) {
        var a = this.data.currentRoomDetail;
        wx.previewImage({
            current: a.positionImg,
            urls: [ a.positionImg ]
        });
    },
    clickPhoneAuth: function() {
        if (this.data.showPhoneModel) {
            var e = {
                type: "EXP",
                pvCurPageName: this.data.despage || "",
                eventId: "exp_2cmina_14",
                eventName: "huxingshouquanqueren",
                eventModuleDes: JSON.stringify({
                    "wx.authorize.scope": "wx.getPhoneNumber"
                })
            };
            s.trackRequest(e);
        }
    },
    getPhoneNumber: function(e) {
        var a = this;
        wx.setStorageSync("ISauthorizePhone", !0);
        var t = e.detail.iv, i = (e.detail.errMsg, u.globalData.houseid, u.globalData.tonken || ""), r = e.detail.encryptedData, n = u.globalData.sessionKey, o = u.globalData.appid;
        if (console.log("***auth-token***", i), console.log("****auth-getPhoneNumber****"), 
        !e.detail.encryptedData || e.detail.errMsg.includes("deny")) a.afterPhoneHandle({
            type: "fail"
        }); else if (r && n && t || wx.showToast({
            title: "系统提示:授权信息错误",
            icon: "warn",
            duration: 1500
        }), u.globalData.single) {
            var s = getCurrentPages()[getCurrentPages().length - 1];
            u.getPhone(s, r, n, o, t, i, function() {
                a.afterPhoneHandle({
                    type: "success"
                });
            });
        } else a.data.setInter = setInterval(function() {
            if (u.globalData.single) {
                var e = getCurrentPages()[getCurrentPages().length - 1];
                u.getPhone(e, r, n, o, t, i, function() {
                    a.afterPhoneHandle({
                        type: "fail"
                    });
                }), clearInterval(a.data.setInter);
            }
        }, 200);
    },
    shareFun: function(e) {
        var a = this;
        e && e.detail ? d.call(this, e.detail, function(e) {
            var t = {
                clkDesPage: a.data.despage || "",
                type: "CLK",
                pvCurPageName: a.data.despage || "",
                pvCurPageParams: o,
                clkId: "clk_2cmina_137",
                clkName: "weixinshouquan",
                clkParams: {
                    "wx.authorize.scope": "wx.getUserInfo",
                    type: e ? "success" : "fail"
                }
            };
            s.trackRequest(t), a.goShareDetail(e);
        }, !0) : this.goShareDetail(e.detail);
    },
    goShareDetail: function() {
        var e = this, a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = this;
        t.myLoading && t.myLoading.hideLoading(), u.createXcxQrCode({
            signData: {
                currentIndex: this.data.currentIndex,
                currentName: this.data.currentName,
                id: this.data.active,
                buildingId: this.data.buildingId
            },
            subtype: "layout"
        }, function(t) {
            var i = e.data.currentRoomDetail, r = i.name, n = !i.areaShow || 2 != i.areaShow && "2" != i.areaShow ? i.area : "", s = i.unitDes, l = [], d = "";
            if (l.push(u.globalData.projectName), (r || n) && (d = (r || "") + (n ? (r ? "·" : "") + n + "m²" : "")), 
            s && (d = d.length > 0 ? d + "·" + s : s), l.push(d), !e.data.bottomText && u.globalData.EnumList && u.globalData.EnumList.forEach(function(a, t) {
                "layout_card" == a.name && (e.data.bottomText = a.value);
            }), t) {
                var c = {
                    type: 3,
                    bottomTitle: l,
                    bottomText: e.data.bottomText || "扫描二维码，立即进入线上售楼处",
                    imgUrl: e.data.currentLayoutList[0].imageUrl || u.globalData.shareImage || "",
                    shareWord: "我发现了一个不错的户型，邀请你一起来看看",
                    qcode: t,
                    hasUserInfo: a,
                    pvCurPageName: "fenxianghuxingtu",
                    pvId: "p_2cmina_50",
                    pvCurPageParams: o
                };
                u.globalData.shareCardData = JSON.stringify(c), wx.navigateTo({
                    url: "../shareCard/shareCard"
                });
            }
        }, function(e) {
            console.log("生成小程序二维码失败", e);
        });
    },
    onShow: function(e) {
        console.log("onshow"), n.default.pageShow();
        var a = this;
        t = new Date().getTime(), u.login(function() {
            if (u.judgeGlobalUserShow(function(e) {
                a.setData({
                    imPhoneAuthorize: e
                }), console.log("IMVIEW组件控制授权是否弹起", a.data.imPhoneAuthorize);
            }), a.data.previewFlag) a.data.previewFlag = !1; else {
                var e = {
                    pvId: "P_2cMINA_10",
                    type: "PV",
                    pvCurPageParams: o,
                    pvCurPageName: a.data.despage || "",
                    pvLastPageName: "houseTypeModule",
                    pvPageLoadTime: new Date().getTime() - t
                };
                s.trackRequest(e, u), console.log("已发送埋点"), l.imPhoneAuthorize && !u.globalData.phone && a.setData({
                    showPhoneModel: !0
                }), a.refreshNumber();
            }
        });
    },
    onUnload: function() {
        s.stopTrackEventTimeObj();
        var e = {
            pvPageStayTime: (new Date().getTime() - t) / 1e3,
            pvCurPageName: this.data.despage || "",
            clkDesPage: "houseTypeModule",
            clkName: "fanhui",
            clkId: "clk_2cmina_36",
            type: "CLK"
        };
        s.trackRequest(e, u);
    },
    onReady: function() {
        this.myLoading && this.myLoading.hideLoading();
    },
    onHide: function() {
        s.stopTrackEventTimeObj();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    diy: function() {
        var e = {
            clkId: "clk_2cmina_184",
            clkName: "huxingDIYrukou",
            clkDesPage: "huxingdiy",
            type: "CLK",
            clkParams: {
                houseType: this.data.currentRoomDetail.name || ""
            },
            pvCurPageName: this.data.despage || "",
            pvCurPageParams: o
        };
        s.trackRequest(e), wx.navigateTo({
            url: "../houseDIY/houseDIY?houseType=" + this.data.currentRoomDetail.name + "&houseTypeId=" + this.data.currentRoomDetail.id + "&from=" + this.data.despage || ""
        });
    },
    tabVr: function() {
        if (this.data.showPhoneModel) {
            this.data.isGoVr = !0;
            var e = {
                type: "EXP",
                pvCurPageName: this.data.despage || "",
                eventId: "exp_2cmina_14",
                eventName: "huxingshouquanqueren",
                eventModuleDes: JSON.stringify({
                    "wx.authorize.scope": "wx.getPhoneNumber"
                })
            };
            return s.trackRequest(e), !1;
        }
        if (this.data.currentRoomDetail && this.data.currentRoomDetail.vrUrl && "null" != this.data.currentRoomDetail.vrUrl && "undefined" != this.data.currentRoomDetail.vrUrl) {
            var a = {
                clkId: "clk_2cmina_100",
                clkName: "huxingVR720",
                clkDesPage: "vr720",
                type: "CLK",
                clkParams: {
                    houseType: this.data.active || u.globalData.houseTypeDetail.id || "",
                    buildingId: this.data.buildingId || ""
                },
                pvCurPageName: this.data.despage || "",
                pvCurPageParams: o
            };
            s.trackRequest(a), wx.navigateTo({
                url: "../webView/webView?view=" + encodeURIComponent(this.data.currentRoomDetail.vrUrl),
                success: function() {},
                fail: function(e) {
                    console.log(e);
                }
            });
        }
    },
    onShareAppMessage: function(e) {
        var a = {
            clkId: "clk_2cmina_31",
            clkDesPage: "huxingfenxiang",
            clkName: "huxingfenxiang",
            type: "CLK",
            pvCurPageName: this.data.despage || "",
            clkParams: {
                houseType: this.data.active || u.globalData.houseTypeDetail.id || "",
                buildingId: this.data.buildingId || "",
                from: e.from
            },
            expand: "",
            pvCurPageParams: o
        };
        return s.trackRequest(a, u), console.log("***houseTypeDetailModule-onShareAppMessage***", u.globalData.shareToken), 
        {
            imageUrl: this.data.currentLayoutList[0].imageUrl || u.globalData.shareImage || "",
            title: "我发现了一个不错的户型，邀请你来围观一下",
            path: "/pages/houseTypeDetailModule/houseTypeDetailModule?shareToken=" + u.globalData.shareToken + "&currentIndex=" + this.data.currentIndex + "&currentName=" + this.data.currentName + "&id=" + this.data.active + "&buildingId=" + this.data.buildingId
        };
    }
}, n.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));