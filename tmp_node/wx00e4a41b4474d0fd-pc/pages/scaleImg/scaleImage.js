function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function t(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

function e(a) {
    return function() {
        var t = a.apply(this, arguments);
        return new Promise(function(a, e) {
            function s(i, n) {
                try {
                    var r = t[i](n), o = r.value;
                } catch (a) {
                    a = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(a);
                    return void e(a);
                }
                if (!r.done) return Promise.resolve(o).then(function(a) {
                    s("next", a);
                }, function(a) {
                    s("throw", a);
                });
                a(o);
            }
            return s("next");
        });
    };
}

var s, i = a(require("../../lib/runtime")), n = a(require("../../lib/requestConfig")), r = a(require("../../utils/monitor.js")), o = "", l = require("../../utils/util.js"), u = require("../../config.js"), d = require("../../getlogininfo.js").getUserInfo, c = getApp(), g = l.getImgUrl(), p = null;

Page({
    data: {
        scaleWidth: "",
        scaleHeight: "",
        dataimg: "",
        gradient1: "#3A4A80",
        gradient2: "#6294A6",
        swipIndex: 0,
        arrayStatus: [],
        btnColor: "",
        lineColor: "",
        textColor: "",
        despage: "tupianku",
        title: "tupianku",
        likeImg: g + "wepy_pro/v1-2/Thumbup@2x.png",
        likeImgRed: g + "wepy_pro/v1-2/Thumbup-red.png",
        type: 1,
        imgTotal: [],
        authedList: [],
        currentType: {
            atlasResponseList: [ {} ]
        },
        movableWidth: 0,
        isFullScreen: !1,
        showBackIndex: !1,
        showIMbutton: !1,
        imageID: null,
        showPhoneModel: !1,
        showInfoModel: !1,
        text: "点击此处输入您想咨询的问题",
        opacityNum: 1,
        tapCheckoutFlag: !1,
        despageForChat: "tupianku",
        showShare: !1,
        showShareOptions: !1,
        bottomText: "",
        isReadyToGoChat: !1,
        globalUserShowFlag: !1
    },
    catchEvent: function() {},
    shares: function() {
        if (this.setData({
            showShareOptions: !this.data.showShareOptions
        }), this.data.showShareOptions) {
            var a = {
                clkDesPage: this.data.despage || "",
                type: "CLK",
                pvCurPageName: this.data.despage || "",
                pvCurPageParams: o,
                clkId: "clk_2cmina_153",
                clkName: "tupiankufenxiang",
                clkParams: {
                    type: this.data.type || "",
                    imageID: this.data.currentType.atlasResponseList[this.data.swipIndex].id || ""
                }
            };
            l.trackRequest(a);
        }
    },
    hideShare: function() {
        this.setData({
            showShareOptions: !1
        });
    },
    getUserInfo: function(a) {
        var t = this;
        console.log("触发了系统授权按钮"), d.call(this, a, function(a) {
            var e = {
                clkDesPage: t.data.despage || "",
                type: "CLK",
                pvCurPageName: t.data.despage || "",
                pvCurPageParams: o,
                clkId: "clk_2cmina_137",
                clkName: "weixinshouquan",
                clkParams: {
                    "wx.authorize.scope": "wx.getUserInfo",
                    type: a ? "success" : "fail"
                }
            };
            l.trackRequest(e), t.goShareDetail(a);
        }, !0);
    },
    goShareDetail: function() {
        var a = this, t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.myLoading && this.myLoading.hideLoading();
        var e = this.data.currentType.atlasResponseList[this.data.swipIndex].id;
        c.createXcxQrCode({
            signData: {
                type: this.data.type,
                imageId: e,
                btnColor: this.data.btnColor,
                lineColor: this.data.lineColor,
                textColor: this.data.textColor
            },
            subtype: "pic"
        }, function(e) {
            if (e) {
                var s = [];
                s.push(c.globalData.projectName), a.data.currentType.atlasResponseList[a.data.swipIndex].name && s.push(a.data.currentType.atlasResponseList[a.data.swipIndex].name);
                var i = {
                    type: 5,
                    bottomTitle: s,
                    bottomText: a.data.bottomText || "扫描二维码，立即进入线上售楼处",
                    shareWord: "这里有个超棒的项目，邀请你来一起围观",
                    imgUrl: a.data.currentType.atlasResponseList[a.data.swipIndex].imageUrl || c.globalData.shareImage || "",
                    qcode: e,
                    hasUserInfo: t,
                    pvCurPageName: "tujifenxiangkapian",
                    pvId: "p_2cmina_51",
                    pvCurPageParams: o
                };
                c.globalData.shareCardData = JSON.stringify(i), wx.navigateTo({
                    url: "../shareCard/shareCard"
                });
            }
        }, function() {});
    },
    goShare: function() {
        if (console.log("触发了普通按钮"), this.data.globalUserShowFlag) return !1;
        this.goShareDetail(!(!c.globalData.userInfo || !c.globalData.userInfo.avatarUrl));
    },
    onShareAppMessage: function(a) {
        var t = this.data.currentType.atlasResponseList[this.data.swipIndex].id, e = (this.data.currentType.groupName || c.globalData.projectName, 
        {
            clkId: "clk_2cmina_31",
            clkDesPage: "tujifenxiang",
            clkName: "tujifenxiang",
            type: "CLK",
            pvCurPageName: this.data.despage || "",
            clkParams: {
                type: this.data.type || "",
                imageID: t || "",
                from: a.from
            },
            expand: "",
            pvCurPageParams: o
        });
        return l.trackRequest(e, c), console.log("***scaleImage-onShareAppMessage***", c.globalData.shareToken, "==&&&==", t, this.data.currentType.groupName), 
        {
            imageUrl: this.data.currentType.atlasResponseList[this.data.swipIndex].imageUrl || c.globalData.shareImage || "",
            title: "我发现了一个超棒的项目，点击这里查看更多精美图集",
            path: "/pages/scaleImg/scaleImage?shareToken=" + c.globalData.shareToken + "&type=" + this.data.type + "&imageId=" + t + "&btnColor=" + this.data.btnColor + "&lineColor=" + this.data.lineColor + "&textColor=" + this.data.textColor
        };
    },
    transitionFun: function(a) {
        this.data.opacityNum && !this.data.tapCheckoutFlag && this.setData({
            opacityNum: 0
        });
    },
    transitionEnd: function(a) {
        this.setData({
            opacityNum: 1
        });
    },
    afterPhoneHandle: function(a) {
        this.setData({
            showPhoneModel: !1
        });
        var t = {
            clkDesPage: this.data.despage || "",
            type: "CLK",
            pvCurPageName: this.data.despage || "",
            pvCurPageParams: o,
            clkId: "clk_2cmina_137",
            clkName: "weixinshouquan",
            clkParams: {
                "wx.authorize.scope": "wx.getPhoneNum",
                type: a.detail.type
            }
        };
        l.trackRequest(t), console.log(a.detail.type, this.data.authedList), "success" === a.detail.type && this.data.authedList.length > 0 && (this.data.arrayStatus = this.data.arrayStatus.concat(this.data.authedList), 
        this.setData({
            arrayStatus: this.data.arrayStatus,
            swipIndex: 3
        }), console.log(this.data.arrayStatus, "授权之后的数组")), "fail" === a.detail.type && (this.setData({
            arrayStatus: this.data.arrayStatus,
            swipIndex: 2
        }), wx.showToast({
            title: "您已拒绝授权",
            icon: "none",
            duration: 1500
        }), console.log(this.data.arrayStatus, "拒绝授权之后的数组"));
    },
    afterUserHandle: function(a) {
        a.detail && this.setData({
            showInfoModel: !1
        });
        var t = {
            clkDesPage: this.data.despage || "",
            type: "CLK",
            pvCurPageName: this.data.despage || "",
            pvCurPageParams: o,
            clkId: "clk_2cmina_137",
            clkName: "weixinshouquan",
            clkParams: {
                "wx.authorize.scope": "wx.getUserInfo",
                type: a.detail.type
            }
        };
        l.trackRequest(t);
    },
    likeAdd: function(a) {
        var t = this;
        return e(i.default.mark(function e() {
            var s, r, o, d, g, p;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (s = t, r = s.data.imgTotal, o = !1, r.forEach(function(t) {
                        t.groupType == a.currentTarget.dataset.type && t.atlasResponseList.forEach(function(t) {
                            t.id == a.currentTarget.dataset.id && (o = t.like);
                        });
                    }), 1 != o) {
                        e.next = 6;
                        break;
                    }
                    return e.abrupt("return", !1);

                  case 6:
                    if (console.log("that.data.flag:", s.data.flag, o), 0 != s.data.flag) {
                        e.next = 9;
                        break;
                    }
                    return e.abrupt("return", !1);

                  case 9:
                    return s.data.flag = !1, console.log("that.data.flag:", s.data.flag, o), d = {
                        appVersion: "",
                        authToken: "",
                        environment: "3",
                        houseId: u.houseId,
                        imageId: a.currentTarget.dataset.id,
                        imageType: a.currentTarget.dataset.type,
                        like: 1 == o ? -1 : 1,
                        openId: c.globalData.openid,
                        uid: ""
                    }, e.next = 14, (0, n.default)("updateLike", d);

                  case 14:
                    (g = e.sent) && g.success && (r.forEach(function(t) {
                        t.groupType == a.currentTarget.dataset.type && t.atlasResponseList.forEach(function(t) {
                            t.id == a.currentTarget.dataset.id && (console.log("item.likeNumber:", t.likeNumber, o, t.like), 
                            t.likeNumber = t.likeNumber + (1 == o ? -1 : 1), t.like = !o);
                        });
                    }), s.data.flag = !0, s.setData({
                        imgTotal: r
                    }), r.forEach(function(t) {
                        t.groupType == a.currentTarget.dataset.type && s.setData({
                            currentType: t
                        });
                    }), console.log(s.data.currentType), p = {
                        pvCurPageName: s.data.title || "",
                        clkId: "clk_2cmina_37",
                        clkParams: {
                            imageID: a.currentTarget.dataset.id
                        },
                        clkName: "dianzan",
                        type: "CLK"
                    }, l.trackRequest(p));

                  case 16:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    selectTap: function(a) {
        var t = this;
        switch (a.currentTarget.dataset.type) {
          case 1:
            e = "xiaoguotu";
            break;

          case 2:
            e = "yangbanjiantu";
            break;

          case 3:
            e = "shijingtu";
            break;

          case 4:
            var e = "peitaotu";
        }
        var s = this;
        console.log(a.currentTarget.dataset.type), this.data.tapCheckoutFlag = !0, clearTimeout(p), 
        p = setTimeout(function() {
            t.data.tapCheckoutFlag = !1;
        }, 1e3), this.setData({
            swipIndex: 0,
            type: a.currentTarget.dataset.type,
            authedList: []
        }), console.log(this.data.imgTotal), this.data.imgTotal.forEach(function(t) {
            if (t.groupType == a.currentTarget.dataset.type) {
                s.setData({
                    currentType: t
                });
                var e = [];
                e.length = t.atlasResponseList.length, e.fill(!1), t.atlasResponseList[0] && (e[0] = t.atlasResponseList[0]), 
                t.atlasResponseList[1] && (e[1] = t.atlasResponseList[1]), s.setData({
                    arrayStatus: e
                });
            }
        });
        var i = {
            pvCurPageName: "tupianku",
            clkId: "clk_2cmina_38",
            clkName: "tupiankuleixing",
            clkParams: {
                imageID: this.data.currentType.atlasResponseList[this.data.swipIndex].id,
                real_view: e,
                buttonType: "show_room"
            },
            type: "CLK"
        };
        l.trackRequest(i, c), console.log(s.data.currentType);
    },
    swipChange: function(a) {
        var e = this;
        console.log("***swipChange***", this.data.swipIndex, a, this.data.currentType);
        var s = {
            type: "CLK",
            adviserId: "",
            imTalkId: "",
            clkParams: {
                imageId: this.data.currentType.atlasResponseList[a.detail.current].id || ""
            },
            imTalkType: "",
            pvCurPageName: "tupianku",
            clkDesPage: "",
            clkName: "qiehuantupian",
            clkId: "clk_2cmina_208",
            expand: ""
        };
        l.trackRequest(s), this.setData({
            swipIndex: a.detail.current
        });
        var i = {
            pvId: "p_2cmina_80",
            pvCurPageName: "huxingkutupian",
            pvCurPageParams: {
                type: this.data.type,
                imageID: this.data.currentType.atlasResponseList[this.data.swipIndex].id || ""
            },
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            type: "PV"
        };
        l.trackRequest(i);
        var n = "arrayStatus[" + a.detail.current + "]", r = null, o = null;
        if (a.detail.current > 0 && (r = "arrayStatus[" + (a.detail.current - 1) + "]"), 
        a.detail.current < this.data.arrayStatus.length - 1 && (o = "arrayStatus[" + (a.detail.current + 1) + "]"), 
        u.imPhoneAuthorize && this.data.currentType.atlasResponseList.length > 7 && !c.globalData.phone && a.detail.current > 2) {
            this.data.authedList = this.data.authedList.length > 0 ? this.data.authedList : this.data.arrayStatus.splice(4, this.data.arrayStatus.length - 4);
            var d = setTimeout(function() {
                e.setData({
                    showPhoneModel: !0
                }), clearTimeout(d);
            }, 500);
            console.log(this.data.arrayStatus, "00000");
        } else {
            var g;
            this.setData((g = {}, t(g, r, !!r && this.data.currentType.atlasResponseList[a.detail.current - 1]), 
            t(g, n, this.data.currentType.atlasResponseList[a.detail.current]), t(g, o, !!o && this.data.currentType.atlasResponseList[a.detail.current + 1]), 
            g)), console.log(this.data.arrayStatus, "455555");
        }
    },
    forbidMove: function(a) {
        console.log(a, "3333333333");
    },
    goIndex: function() {
        wx.navigateTo({
            url: "../index/index"
        });
        var a = {
            clkDesPage: "zhuye",
            type: "CLK",
            pvCurPageName: this.data.despage || "",
            pvCurPageParams: o,
            clkId: "clk_2cmina_138",
            clkName: "huishouyeanniu"
        };
        l.trackRequest(a);
    },
    getCurrentPageParam: function() {
        return o;
    },
    onLoad: function(a) {
        this.myLoading = this.selectComponent("#myLoading"), this.myLoading && this.myLoading.showLoading();
        var t = this;
        console.log("***onLoad***", a), o = JSON.stringify(a), this.setData({
            imPhoneAuthorize: u.imPhoneAuthorize
        }), c.decrypt(a, function() {
            a && a.scene && (a = c.globalData.attrs), a.btnColor && t.setData({
                btnColor: a.btnColor || "#3A4A80",
                lineColor: a.lineColor || "#ffffff",
                textColor: a.textColor || "#ffffff"
            }), c.login(function() {
                console.log(c.globalData.backgroundSetting), c.globalData.backgroundSetting && t.setData({
                    btnColor: c.globalData.backgroundSetting.btnColor || "#3A4A80",
                    lineColor: c.globalData.backgroundSetting.lingColor || "#ffffff",
                    textColor: c.globalData.backgroundSetting.textColor || "#ffffff"
                }), console.log(t.data.textColor, "fffffffffffffff"), c.systemInfo.screenHeight > 735 && c.systemInfo.screenWidth < 500 && t.setData({
                    isFullScreen: !0
                }), t.getListImages(a);
            });
        });
    },
    getListImages: function(a) {
        var t = this;
        return e(i.default.mark(function e() {
            var r, o, d, g, p, h, m, f, y, k, P, I, v;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return r = t, o = {
                        appVersion: "",
                        authToken: "",
                        environment: "",
                        houseId: u.houseId,
                        openId: c.globalData.openid,
                        uid: ""
                    }, e.next = 4, (0, n.default)("imagesListGroup", o);

                  case 4:
                    if (d = e.sent, t.myLoading && t.myLoading.hideLoading(), d && d.success && d.list) {
                        if (g = 0, t.setData({
                            imgTotal: d.list || []
                        }), a.type) try {
                            p = 0, (h = t.data.imgTotal.findIndex(function(t, e) {
                                return t.groupType == a.type;
                            })) && h >= 0 && (p = h), m = t.data.imgTotal[p], f = 0, a.imageId && (y = m.atlasResponseList.findIndex(function(t, e) {
                                return t.id == a.imageId;
                            }), f = c.globalData.phone || !u.imPhoneAuthorize ? y && y >= 0 ? y : 0 : m.atlasResponseList.length > 7 ? y && y >= 0 && y < 3 ? y : 0 : y && y >= 0 ? y : 0), 
                            console.log("***getListImages***", a, r.data.currentType, f, y, p, p), (k = []).length = m.atlasResponseList.length, 
                            k.fill(!1), f > 0 && m.atlasResponseList[f - 1] && (k[f - 1] = m.atlasResponseList[f - 1]), 
                            m.atlasResponseList[f] && (k[f] = m.atlasResponseList[f]), m.atlasResponseList[f + 1] && (k[f + 1] = m.atlasResponseList[f + 1]), 
                            console.log("***arrayStatus***", k, t.data.swipIndex), t.data.imgTotal.forEach(function(a) {
                                g += 30 * a.groupName.length + 38;
                            }), t.setData({
                                currentType: m,
                                type: a.type,
                                swipIndex: f,
                                arrayStatus: k,
                                movableWidth: g
                            }), P = {
                                pvId: "p_2cmina_80",
                                pvCurPageName: "huxingkutupian",
                                pvCurPageParams: {
                                    type: a.type,
                                    imageID: t.data.currentType.atlasResponseList[t.data.swipIndex].id || ""
                                },
                                pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
                                pvPageLoadTime: new Date().getTime() - s,
                                type: "PV"
                            }, l.trackRequest(P);
                        } catch (a) {
                            a = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(a);
                            wx.reportMonitor && wx.reportMonitor("single", 16), I = {
                                type: "mini-program-Error",
                                pvPageStayTime: new Date().getTime() / 1e3,
                                adviserId: "",
                                imTalkId: "",
                                imTalkType: "",
                                pvCurPageName: "scaleImage.js-getListImages-16",
                                clkDesPage: "",
                                clkName: "",
                                clkId: "",
                                expand: JSON.stringify(d) + ";houseId=" + u.houseId + ";Error=" + JSON.stringify(a)
                            }, l.trackRequest(I);
                        }
                        console.log(t.data.currentType, "PPPPPPPPPPPPPPPPPPP", t.data.movableWidth);
                    } else wx.showToast({
                        title: "图集已下架，先来看看其他内容吧!",
                        icon: "warn",
                        duration: 1500
                    }), wx.reportMonitor && wx.reportMonitor("single", 17), v = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "scaleImage.js-getListImages-17",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(d) + ";houseId=" + u.houseId
                    }, l.trackRequest(v);

                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    queryEnumList: function() {
        var a = this;
        return e(i.default.mark(function t() {
            var e, s, r, o;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, n.default)("queryEnumList", {
                        houseId: u.houseId
                    });

                  case 2:
                    (o = t.sent).list.forEach(function(t, i) {
                        "picture_im" == t.name && (e = t), "atlas_share" == t.name && (r = t), "atlas_card" == t.name && (s = t, 
                        a.data.bottomText = t.value);
                    }), e && "2" == e.checkedIcon ? a.setData({
                        showIMbutton: !1
                    }) : a.setData({
                        showIMbutton: !0,
                        text: e.value || a.data.text
                    }), r && 1 == r.value && a.setData({
                        showShare: !0
                    }), console.log("***queryEnumList***", e);

                  case 7:
                  case "end":
                    return t.stop();
                }
            }, t, a);
        }))();
    },
    onReady: function() {
        console.log("***onReady***"), this.myLoading && this.myLoading.hideLoading(), wx.setNavigationBarTitle({
            title: "图片库"
        });
    },
    previewImage: function(a) {
        var t = a.currentTarget.dataset.src, e = {
            clkDesPage: "",
            type: "CLK",
            pvCurPageName: this.data.despage || "",
            pvCurPageParams: o,
            clkId: "clk_2cmina_218",
            clkName: "tupiankufangda",
            clkParams: {
                type: this.data.type,
                imageID: this.data.currentType.atlasResponseList[this.data.swipIndex].id || ""
            }
        };
        l.trackRequest(e), wx.previewImage({
            current: t,
            urls: [ a.currentTarget.dataset.src ]
        });
    },
    goChatList: function() {
        if (console.log("scaleimage-goChatList:", c.globalData.openid), this.data.showPhoneModel || this.data.showInfoModel) return !1;
        if (c.handleGoChat()) {
            console.log("***goChatList-over***");
            var a = {
                clkDesPage: "xiaoxiliebiao",
                type: "CLK",
                pvCurPageName: this.data.despage || "",
                pvCurPageParams: o,
                clkId: "clk_2cmina_23",
                clkName: "zaixianzixun"
            };
            l.trackRequest(a);
        }
    },
    formSubmit: function(a) {
        (0, n.default)("insertFormId", {
            houseId: u.houseId,
            customerId: c.globalData.single && c.globalData.single.id,
            formId: a.detail.formId,
            appid: c.globalData.appid,
            secret: c.globalData.secret
        });
    },
    onShow: function() {
        var a = this;
        this.queryEnumList(), 1 == getCurrentPages().length && (console.log("***显示返回首页按钮***"), 
        this.setData({
            showBackIndex: !0
        })), c.login(function() {
            c.judgeGlobalUserShow(function(t) {
                a.setData({
                    globalUserShowFlag: t
                });
            });
            var t = {
                pvId: "P_2cMINA_14",
                pvCurPageName: a.data.despage || "",
                pvCurPageParams: o,
                pvLastPageName: "zhuye",
                pvLastPageParams: "",
                pvPageLoadTime: new Date().getTime() - s,
                type: "PV"
            };
            l.trackRequest(t, c);
        }), r.default.pageShow(), s = new Date().getTime(), console.log("路由", getCurrentPages()), 
        this.setData({
            showShareOptions: !1
        });
    },
    onHide: function() {},
    onUnload: function() {
        var a = {
            pvPageStayTime: (new Date().getTime() - s) / 1e3,
            pvCurPageName: this.data.despage || "",
            clkDesPage: "zhuye",
            clkName: "fanhui",
            clkId: "clk_2cmina_36",
            clkParams: {
                imageID: this.data.currentType.atlasResponseList[this.data.swipIndex].id || ""
            },
            type: "CLK"
        };
        l.trackRequest(a, c);
    }
}, r.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(a) {},
    onHide: function() {},
    onUnload: function() {}
}));