function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    return function() {
        var a = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function i(o, n) {
                try {
                    var r = a[o](n), s = r.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!r.done) return Promise.resolve(s).then(function(e) {
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

var t, i = e(require("../../lib/runtime")), o = e(require("../../lib/requestConfig")), n = e(require("../../utils/monitor.js")), r = "", s = require("../../utils/util.js"), d = getApp(), u = require("../../config.js"), l = require("../../getlogininfo.js").getUserInfo;

Page({
    data: {
        serverUrl: "http://skyforest.static.elab-plus.com/wepy_pro/v1-2/",
        jbColor1: "#AD7C59",
        jbColor2: "#AD7C59",
        dataList: [],
        btnColor: "#3A4A80",
        lineColor: "#ffffff",
        backgroundColor: "#ffffff",
        textColor: "#ffffff",
        list: [ "123", "123", "123", "123", "123" ],
        picList: [],
        positionImg: "",
        effectImage: "",
        hasVr: "",
        vrUrl: "",
        layoutHardbackList: [],
        despage: "huxingtupian",
        despageForChat: "huxingtupian",
        previewFlag: !1,
        houseDetail: "",
        active: 0,
        current: 0,
        detail: "",
        currentIndex: 0,
        defaultImagePath: "../../image/wepy_pro/loading1.gif",
        imgheights: [],
        imgwidth: 690,
        currentName: "",
        buildingId: "",
        showPhoneModel: !1,
        showInfoModel: !1,
        emptyHeight: !0,
        deviceInfor: !1,
        bottomText: "",
        isReadyToGoChat: !1,
        isShowDiy: !1,
        houseType: "",
        imPhoneAuthorize: !1
    },
    onShareAppMessage: function(e) {
        var a = {
            clkId: "clk_2cmina_31",
            clkDesPage: "huxingfenxiang",
            clkName: "huxingfenxiang",
            type: "CLK",
            pvCurPageName: "huxingtupian",
            clkParams: {
                houseType: this.data.active || d.globalData.houseTypeDetail.id || "",
                buildingId: this.data.buildingId || "",
                from: e.from
            },
            expand: "",
            pvCurPageParams: r
        };
        return s.trackRequest(a, d), console.log("***houseTypeDetail-onShareAppMessage***", d.globalData.shareToken, "==&&&=="), 
        {
            imageUrl: this.data.picList[0].imageUrl || d.globalData.shareImage || "",
            title: "我发现了一个不错的户型，邀请你来围观一下",
            path: "/pages/houseTypeDetail/houseTypeDetail?shareToken=" + d.globalData.shareToken + "&currentIndex=" + this.data.currentIndex + "&currentName=" + this.data.currentName + "&id=" + this.data.active + "&buildingId=" + this.data.buildingId + "&btnColor=" + this.data.btnColor + "&lineColor=" + this.data.lineColor + "&textColor=" + this.data.textColor + "&backgroundColor=" + this.data.backgroundColor
        };
    },
    shareFun: function(e) {
        var a = this, t = this;
        e && e.detail ? l.call(this, e.detail, function(i) {
            var o = {
                clkDesPage: a.data.despage || "",
                type: "CLK",
                pvCurPageName: a.data.despage || "",
                pvCurPageParams: r,
                clkId: "clk_2cmina_137",
                clkName: "weixinshouquan",
                clkParams: {
                    "wx.authorize.scope": "wx.getUserInfo",
                    type: e ? "success" : "fail"
                }
            };
            s.trackRequest(o), t.goShareDetail(i);
        }) : t.goShareDetail(!1);
    },
    goShareDetail: function() {
        var e = this, a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = this;
        t.myLoading && t.myLoading.hideLoading(), d.createXcxQrCode({
            signData: {
                currentIndex: this.data.currentIndex,
                currentName: this.data.currentName,
                id: this.data.active,
                buildingId: this.data.buildingId,
                btnColor: this.data.btnColor,
                lineColor: this.data.lineColor,
                textColor: this.data.textColor,
                backgroundColor: this.data.backgroundColor
            },
            subtype: "layout"
        }, function(t) {
            var i = e.data.dataList[e.data.currentIndex], o = i.name, n = !i.areaShow || 2 != i.areaShow && "2" != i.areaShow ? i.area : "", s = i.unitDes, u = [], l = "";
            if (u.push(d.globalData.projectName), (o || n) && (l = (o || "") + (n ? (o ? "·" : "") + n + "m²" : "")), 
            s && (l = l.length > 0 ? l + "·" + s : s), u.push(l), !e.data.bottomText && d.globalData.EnumList && d.globalData.EnumList.forEach(function(a, t) {
                "layout_card" == a.name && (e.data.bottomText = a.value);
            }), t) {
                var c = {
                    type: 3,
                    bottomTitle: u,
                    bottomText: e.data.bottomText || "扫描二维码，立即进入线上售楼处",
                    imgUrl: e.data.picList[0].imageUrl || d.globalData.shareImage || "",
                    shareWord: "我发现了一个不错的户型，邀请你一起来看看",
                    qcode: t,
                    hasUserInfo: a,
                    pvCurPageName: "fenxianghuxingtu",
                    pvId: "p_2cmina_50",
                    pvCurPageParams: r
                };
                d.globalData.shareCardData = JSON.stringify(c), wx.navigateTo({
                    url: "../shareCard/shareCard"
                });
            }
        }, function(e) {
            console.log("生成小程序二维码失败", e);
        });
    },
    pre: function() {
        this.setData({
            current: this.data.current - 1
        });
    },
    next: function() {
        this.setData({
            current: this.data.current + 1
        });
    },
    refreshNumber: function() {
        this.selectComponent("#IMView").refreshNumber();
    },
    heightHandle: function(e) {
        console.warn("***heightHandle***", e), e.detail && 0 == e.detail.showBackModel && 0 == e.detail.showIMModel && 0 == e.detail.showShare && this.setData({
            emptyHeight: !1
        });
    },
    diy: function() {
        var e = {
            clkId: "clk_2cmina_184",
            clkName: "huxingDIYrukou",
            clkDesPage: "huxingdiy",
            type: "CLK",
            clkParams: {
                houseType: this.data.dataList[this.data.currentIndex].name || ""
            },
            pvCurPageName: "huxingtupian",
            pvCurPageParams: r
        };
        s.trackRequest(e), wx.navigateTo({
            url: "../houseDIY/houseDIY?houseType=" + this.data.dataList[this.data.currentIndex].name + "&from=huxingtupian&houseTypeId=" + this.data.dataList[this.data.currentIndex].id
        });
    },
    tabVr: function() {
        if (this.data.vrUrl && "null" != this.data.vrUrl && "undefined" != this.data.vrUrl) {
            var e = {
                clkId: "clk_2cmina_100",
                clkName: "huxingVR720",
                clkDesPage: "vr720",
                type: "CLK",
                clkParams: {
                    houseType: this.data.active,
                    buildingId: this.data.buildingId || ""
                },
                pvCurPageName: "huxingtupian",
                pvCurPageParams: r
            };
            s.trackRequest(e), wx.navigateTo({
                url: "../webView/webView?view=" + encodeURIComponent(this.data.vrUrl),
                success: function() {},
                fail: function(e) {
                    console.log(e);
                }
            });
        }
    },
    tabLink: function(e) {
        var a = e.currentTarget.dataset.jumplink || "";
        a && "null" != a && "undefined" != a && wx.navigateTo({
            url: "../webView/webView?view=" + encodeURIComponent(a),
            success: function() {},
            fail: function(e) {
                console.log(e);
            }
        });
    },
    checkOutHouse: function(e) {
        if (this.data.currentIndex == e.target.dataset.index) return !1;
        var a = e.currentTarget.dataset.id, t = {
            clkId: "clk_2cmina_30",
            clkName: "huxingxuanze",
            clkDesPage: "huxingtupian",
            type: "CLK",
            clkParams: {
                houseType: a,
                buildingId: this.data.buildingId || ""
            },
            pvCurPageName: "huxingtupian",
            pvCurPageParams: r
        };
        s.trackRequest(t, d);
        var i = e.target.dataset.index, o = this.data.dataList;
        this.data.currentIndex = i;
        for (var n = 0; n < o[i].layoutImageResponseList.length; n++) null !== o[i].layoutImageResponseList[n].loadComplete && void 0 !== o[i].layoutImageResponseList[n].loadComplete || (o[i].layoutImageResponseList[n].loadComplete = !1);
        this.data.vrUrl = o[i].vrUrl || "", this.setData({
            active: e.target.dataset.id,
            current: 0,
            imgheights: [],
            positionImg: o[i].positionImg,
            layoutHardbackList: o[i].layoutHardbackImageResponseList || [],
            effectImage: o[i].effectImage,
            hasVr: o[i].hasVr,
            houseType: o[i].unitDes,
            houseDetail: o[i].remark,
            picList: o[i].layoutImageResponseList
        }), this.queryHouseImageRecommend(a);
    },
    bindchange: function(e) {
        this.setData({
            current: e.detail.current
        });
    },
    afterPhoneHandle: function(e) {
        this.setData({
            showPhoneModel: !1
        }), e.detail && "fail" === e.detail.type && this.data.isReadyToGoChat && (this.data.isReadyToGoChat = !1, 
        wx.showToast({
            icon: "none",
            title: "非常抱歉，需要您的授权才能进入IM界面",
            duration: 3e3
        }));
        var a = {
            clkDesPage: this.data.despage || "",
            type: "CLK",
            pvCurPageName: this.data.despage || "",
            pvCurPageParams: r,
            clkId: "clk_2cmina_137",
            clkName: "weixinshouquan",
            clkParams: {
                "wx.authorize.scope": "wx.getPhoneNum",
                type: e.detail.type
            }
        };
        s.trackRequest(a), this.data.isReadyToGoChat && (this.data.isReadyToGoChat = !1, 
        d.handleGoChat() && this.afterIMHandle());
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
                pvCurPageParams: r,
                clkId: "clk_2cmina_137",
                clkName: "weixinshouquan",
                clkParams: {
                    "wx.authorize.scope": "wx.getUserInfo",
                    type: e.detail.type
                }
            };
            s.trackRequest(a);
        }
    },
    priviewPic1: function(e) {
        var a = this.data.picList[e.currentTarget.dataset.index].imageUrl, t = this.data.picList.map(function(e) {
            return e.imageUrl;
        });
        this.data.previewFlag = !0, console.log(t), wx.previewImage({
            current: a,
            urls: t
        });
    },
    afterIndexHandle: function(e) {
        var a = {
            clkDesPage: "zhuye",
            type: "CLK",
            pvCurPageName: this.data.despage || "",
            pvCurPageParams: r,
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
            pvCurPageParams: r,
            clkId: "clk_2cmina_23",
            clkName: "zaixianzixun"
        };
        s.trackRequest(a);
    },
    load: function(e) {
        console.log("houseTypeDetail", e), this.data.picList[e.currentTarget.dataset.index || 0].loadComplete = !0, 
        this.data.dataList[this.data.currentIndex].layoutImageResponseList[e.currentTarget.dataset.index || 0].loadComplete = !0, 
        this.setData({
            picList: this.data.picList
        });
        var a = e.detail.width, t = e.detail.height, i = a / t;
        console.log(a, t), t = 690 / i;
        var o = this.data.imgheights;
        o[e.currentTarget.dataset.index] = t, this.setData({
            imgheights: o
        }), console.log(this.data.imgheights);
    },
    error: function(e) {
        console.log("houseTypeDetail", e);
    },
    onShow: function(e) {
        var a = getCurrentPages().length;
        console.log("onshow", a), 1 == a && console.log("***可以添加返回首页按钮***"), n.default.pageShow();
        var i = this;
        t = new Date().getTime(), d.login(function() {
            if (d.judgeGlobalUserShow(function(e) {
                i.setData({
                    imPhoneAuthorize: e
                }), console.log("IMVIEW组件控制授权是否弹起", i.data.imPhoneAuthorize);
            }), i.data.previewFlag) i.data.previewFlag = !1; else {
                var e = {
                    pvId: "P_2cMINA_10",
                    type: "PV",
                    pvCurPageParams: r,
                    pvCurPageName: "huxingtupian",
                    pvLastPageName: "huxingye",
                    pvPageLoadTime: new Date().getTime() - t
                };
                s.trackRequest(e), console.log("已发送埋点"), d.authorizeSet(), i.refreshNumber();
            }
        });
    },
    onReady: function() {
        this.myLoading && this.myLoading.hideLoading();
    },
    onUnload: function() {
        s.stopTrackEventTimeObj();
        var e = {
            pvPageStayTime: (new Date().getTime() - t) / 1e3,
            pvCurPageName: this.data.despage || "",
            clkDesPage: "huxingtupian",
            clkName: "fanhui",
            clkId: "clk_2cmina_36",
            type: "CLK"
        };
        s.trackRequest(e, d);
    },
    onHide: function() {
        s.stopTrackEventTimeObj();
    },
    queryHouseImageRecommend: function(e) {
        var t = this;
        return a(i.default.mark(function a() {
            var n, r;
            return i.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return n = {
                        houseType: e,
                        environment: 3,
                        uid: ""
                    }, a.next = 3, (0, o.default)("queryHouseImageRecommend", n);

                  case 3:
                    (r = a.sent).success && r.single && 1 == r.single ? t.setData({
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
    getHouseList: function(e, t) {
        var n = this;
        return a(i.default.mark(function a() {
            var r, l, c, g, h, m, p;
            return i.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.next = 2, (0, o.default)("pageListLayoutByBuilding", {
                        houseId: u.houseId,
                        buildingId: e
                    });

                  case 2:
                    if (r = a.sent, console.warn("***getHouseList***", r), !(r && r.success && r.pageModel.resultSet && r.pageModel.resultSet.length > 0)) {
                        a.next = 25;
                        break;
                    }
                    l = r.pageModel.resultSet, c = 0, a.t0 = i.default.keys(r.pageModel.resultSet);

                  case 8:
                    if ((a.t1 = a.t0()).done) {
                        a.next = 18;
                        break;
                    }
                    if (g = a.t1.value, (h = r.pageModel.resultSet[g]).id != t) {
                        a.next = 16;
                        break;
                    }
                    return c = g, n.data.currentIndex = c, n.data.currentName = h.name || "户型详情", a.abrupt("break", 18);

                  case 16:
                    a.next = 8;
                    break;

                  case 18:
                    for (wx.setNavigationBarTitle({
                        title: n.data.currentName
                    }), m = 0; m < l[c].layoutImageResponseList.length; m++) l[c].layoutImageResponseList[m].loadComplete = !1;
                    n.data.vrUrl = l[c].vrUrl || "", n.setData({
                        dataList: l,
                        active: t || l[c].id,
                        positionImg: l[c].positionImg,
                        layoutHardbackList: l[c].layoutHardbackImageResponseList || [],
                        effectImage: l[c].effectImage,
                        hasVr: l[c].hasVr,
                        houseType: l[c].unitDes,
                        houseDetail: l[c].remark,
                        picList: l[c].layoutImageResponseList,
                        btnColor: n.data.btnColor,
                        lineColor: n.data.lineColor,
                        textColor: n.data.textColor,
                        backgroundColor: n.data.backgroundColor
                    }), n.queryHouseImageRecommend(n.data.dataList[n.data.currentIndex].id), a.next = 29;
                    break;

                  case 25:
                    wx.showToast({
                        title: "户型已下架，先来看看其他内容吧!",
                        icon: "warn",
                        duration: 1500
                    }), p = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "houseTypeDetail.js-getHouseListError",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(d.globalData) + ";houseId=" + u.houseId + ";buildingId=" + e + ";requestmessage=" + JSON.stringify(r)
                    }, s.trackRequest(p), wx.redirectTo({
                        url: "../houseType/houseType"
                    });

                  case 29:
                  case "end":
                    return a.stop();
                }
            }, a, n);
        }))();
    },
    getDeviceInfor: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(a) {
                "iPhone X" == a.model && e.setData({
                    deviceInfor: !0
                });
            }
        });
    },
    getCurrentPageParam: function() {
        return r;
    },
    onLoad: function(e) {
        var a = this;
        r = JSON.stringify(e), this.getDeviceInfor(), this.myLoading = this.selectComponent("#myLoading"), 
        this.myLoading && this.myLoading.showLoading(), d.decrypt(e, function() {
            if (console.log("****houseTypeDetail-onload**", r, "###shareToken###:", e.shareToken), 
            e && e.shareToken && e.id) if (a.data.currentIndex = e.currentIndex || 0, a.data.currentName = e.currentName || "户型详情", 
            a.data.active = e.id || null, a.data.buildingId = e.buildingId, a.data.houseType = e.id || "", 
            a.data.btnColor = e.btnColor, a.data.lineColor = e.lineColor, a.data.textColor = e.textColor, 
            a.data.backgroundColor = e.backgroundColor, console.log("***来自分享***", a.data.currentIndex, a.data.currentName, a.data.active, a.data.buildingId), 
            a.data.buildingId) a.getHouseList(a.data.buildingId, a.data.active); else {
                wx.navigateTo({
                    url: "../houseType/houseType"
                });
                var t = {
                    type: "mini-program-Error",
                    pvPageStayTime: new Date().getTime() / 1e3,
                    adviserId: "",
                    imTalkId: "",
                    imTalkType: "",
                    pvCurPageName: "houseTypeDetail.js-onLoadError",
                    clkDesPage: "",
                    clkName: "",
                    clkId: "",
                    expand: JSON.stringify(d.globalData) + ";houseId=" + u.houseId + ";sharemessage=" + JSON.stringify(e)
                };
                s.trackRequest(t);
            } else if (e && e.scene) {
                var i = d.globalData.attrs;
                if (a.data.currentIndex = i.currentIndex || 0, a.data.currentName = i.currentName || "户型详情", 
                a.data.active = i.id || null, a.data.houseType = i.id || "", a.data.buildingId = i.buildingId, 
                a.data.btnColor = i.btnColor, a.data.lineColor = i.lineColor, a.data.textColor = i.textColor, 
                a.data.backgroundColor = i.backgroundColor, console.log("***来自卡片分享***", a.data.currentIndex, a.data.currentName, a.data.active, a.data.buildingId), 
                a.data.buildingId) a.getHouseList(a.data.buildingId, a.data.active); else {
                    wx.navigateTo({
                        url: "../houseType/houseType"
                    });
                    var o = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "houseTypeDetail.js-onLoadError",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(d.globalData) + ";houseId=" + u.houseId + ";sharemessage=" + JSON.stringify(e)
                    };
                    s.trackRequest(o);
                }
            } else e.houseType && e.buildid && (a.setData({
                buildingId: e.buildid,
                houseType: e.houseType
            }), a.getHouseList(e.buildid, e.houseType));
            d.globalData.pageDesc = "huxingtupian";
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