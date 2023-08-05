function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function t(a) {
    return function() {
        var t = a.apply(this, arguments);
        return new Promise(function(a, e) {
            function s(r, i) {
                try {
                    var n = t[r](i), o = n.value;
                } catch (a) {
                    a = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(a);
                    return void e(a);
                }
                if (!n.done) return Promise.resolve(o).then(function(a) {
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

var e = a(require("../../lib/runtime")), s = a(require("../../lib/requestConfig")), r = require("../../utils/util.js"), i = require("../../config.js"), n = getApp();

Component({
    properties: {
        shareType: {
            type: String,
            value: "0"
        },
        images: {
            type: Array,
            value: [ "" ]
        },
        hasUserInfo: {
            type: Boolean,
            value: !1
        },
        hasOrganize: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        canvasWidth: 630,
        screenWidth: 0,
        winHeight: 0,
        ratio: 0,
        showPhoneModel: !1,
        showInfoModel: !1,
        currentIndex: 0,
        swipIndex: 0,
        bottomText: "",
        icon: "https://dm.static.elab-plus.com/miniprogram/icon.png",
        shareWord: "我发现了一个不错的项目，想邀请你一起来看一下",
        currentMessage: "",
        text: "正在保存...",
        chooseFile: !1,
        showEditView: !1,
        creatCard: !1,
        showLoading: !1,
        selectObj: null,
        resultImg: "",
        resultSelectImg: "",
        resultNoSelectImg: "",
        chy: 200,
        bottomHeight: 120,
        canvasHeight: "0",
        canvasSelectHeight: "",
        canvasNoSelectHeight: "",
        selectBtn: !1,
        listData: [],
        tempData: null,
        paramData: null,
        resultImgList: [],
        minHeight: 1020,
        showImgModel: !1,
        showImgBtn: !1,
        chooseFlag: !1,
        platform: "",
        showBg: !1,
        showBack: !1,
        wordTmp: "",
        creatFirstCard: !1,
        ImagesData: [],
        userInfo: null
    },
    ready: function() {
        console.log("***shareType-ready***", this.data.shareType);
        var a = this;
        wx.getSetting({
            success: function(t) {
                console.log("***shareType-ready***getSetting", t, !1 === t.authSetting["scope.writePhotosAlbum"]), 
                !1 === t.authSetting["scope.writePhotosAlbum"] && (a.setData({
                    showImgBtn: !0
                }), console.log(a.data.showImgBtn));
            }
        });
    },
    methods: {
        getShareProgram: function() {
            this.setData({
                showImgModel: !1,
                showImgBtn: !1
            });
        },
        afterPhoneHandle: function(a) {
            if (a.detail) {
                this.setData({
                    showPhoneModel: !1
                });
                var t = getCurrentPages()[getCurrentPages().length - 2];
                if (!t) return console.error("***app.js-authorizeSet-currPage no exit!!!***", t), 
                !1;
                var e = {
                    clkDesPage: t.data.despage || "",
                    type: "CLK",
                    pvCurPageName: t.data.despage || "",
                    pvCurPageParams: this.data.paramData.pvCurPageParams || "fengxiangkapian",
                    clkId: "clk_2cmina_137",
                    clkName: "weixinshouquan",
                    clkParams: {
                        "wx.authorize.scope": "wx.getPhoneNum",
                        type: a.detail.type
                    }
                };
                r.trackRequest(e);
            }
        },
        afterUserHandle: function(a) {
            var t = this;
            if (a.detail) {
                this.setData({
                    showInfoModel: !1
                });
                var e = getCurrentPages()[getCurrentPages().length - 2];
                if (console.log("***afterUserHandle***", e), !e) return console.error("***app.js-authorizeSet-currPage no exit!!!***", e), 
                !1;
                n.login(function() {
                    t.data.paramData.hasUserInfo = "success" == a.detail.type, t.data.paramData.hasOrganize = !(!n.globalData.single || !n.globalData.single.organize), 
                    t.starDraw();
                    var s = {
                        clkDesPage: e.data.despage || "",
                        type: "CLK",
                        pvCurPageName: e.data.despage || "",
                        pvCurPageParams: t.data.paramData.pvCurPageParams || "fengxiangkapian",
                        clkId: "clk_2cmina_137",
                        clkName: "weixinshouquan",
                        clkParams: {
                            type: that.data.shareType
                        }
                    };
                    r.trackRequest(s);
                });
            }
        },
        swipChage: function(a) {
            this.setData({
                swipIndex: a.detail.current,
                selectObj: this.data.resultImgList[a.detail.current]
            });
            var t = {
                clkDesPage: "baocunzhaopianye",
                type: "CLK",
                pvCurPageName: "baocunzhaopianye",
                pvCurPageParams: this.data.paramData.pvCurPageParams || "",
                clkId: "clk_2cmina_151",
                clkName: "zuoyouhuadongqiehuan",
                clkParams: {
                    swipIndex: a.detail.current
                }
            };
            r.trackRequest(t);
        },
        chooseBtn: function() {
            if (1 == this.data.creatCard) return !1;
            if (1 == this.data.chooseFlag) return !1;
            var a = {
                clkDesPage: "baocunzhaopianye",
                type: "CLK",
                pvCurPageName: "baocunzhaopianye",
                pvCurPageParams: this.data.paramData.pvCurPageParams || "",
                clkId: "clk_2cmina_148",
                clkName: "tianjiabiankuang",
                clkParams: {
                    selectBtn: this.data.selectBtn
                }
            };
            r.trackRequest(a), this.setData({
                selectBtn: !this.data.selectBtn
            }), this.data.selectBtn ? "" == this.data.resultSelectImg ? (console.log("***chooseBtn1***", this.data.resultSelectImg), 
            this.data.chy = 200, this.data.bottomHeight = 280, this.initCanvas("shareCardCanvas", this.data.chy + this.data.bottomHeight)) : (this.data.resultImgList[0].imgUrl = this.data.resultSelectImg, 
            this.data.resultImgList[0].imgHeight = this.data.canvasSelectHeight, this.data.resultImgList[0].imgWidth = this.data.canvasWidth, 
            this.data.selectObj = this.data.resultImgList[0], this.setData({
                resultImgList: this.data.resultImgList,
                selectObj: this.data.selectObj,
                creatCard: !1,
                creatFirstCard: !1
            })) : "" == this.data.resultNoSelectImg ? (console.log("***chooseBtn2***", this.data.resultNoSelectImg), 
            this.data.chy = 200, this.data.bottomHeight = 280, this.initCanvas("shareCardCanvas", this.data.chy + this.data.bottomHeight)) : (this.data.resultImgList[0].imgUrl = this.data.resultNoSelectImg, 
            this.data.resultImgList[0].imgHeight = this.data.canvasNoSelectHeight, this.data.resultImgList[0].imgWidth = this.data.canvasWidth, 
            this.data.selectObj = this.data.resultImgList[0], this.setData({
                resultImgList: this.data.resultImgList,
                selectObj: this.data.selectObj,
                creatCard: !1,
                creatFirstCard: !1
            }));
        },
        wordsWrap: function(a, t, e, s, r, i, n) {
            this.data.screenWidth;
            for (var o = 0, l = 0, d = 0; d < t.length; d++) "ios" == this.data.platform && 0 == a.measureText(t[d]).width ? o += Math.ceil(e / 2 + 1) : o += a.measureText(t[d]).width, 
            o > s && (a.fillText(t.substring(l, d), r, i), i += n, o = 0, l = d), d == t.length - 1 && a.fillText(t.substring(l, d + 1), r, i);
        },
        closeBackView: function() {
            wx.navigateBack({
                changed: !0
            });
        },
        asynGetImageInfo: function(a) {
            var s = this;
            return t(e.default.mark(function t() {
                var r;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return r = s, t.abrupt("return", new Promise(function(t, e) {
                            var s = r.data.ImagesData.find(function(t, e) {
                                return t.imgUrl === a;
                            });
                            s && s.res ? t(s.res) : wx.getImageInfo({
                                src: a,
                                success: function(e) {
                                    var s = {
                                        imgUrl: a,
                                        res: e
                                    };
                                    r.data.ImagesData.push(s), t(e);
                                },
                                fail: function(s) {
                                    console.error("***asynGetImageInfo-error-try-again***", a, r.data.shareType, s), 
                                    wx.getImageInfo({
                                        src: a,
                                        success: function(e) {
                                            var s = {
                                                imgUrl: a,
                                                res: e
                                            };
                                            r.data.ImagesData.push(s), t(e);
                                        },
                                        fail: function(t) {
                                            console.error("***asynGetImageInfo-error***", a, r.data.shareType, t), e(t);
                                        }
                                    });
                                }
                            });
                        }).catch(function(a) {
                            return console.log("catch:", a), {
                                error: !0
                            };
                        }));

                      case 2:
                      case "end":
                        return t.stop();
                    }
                }, t, s);
            }))();
        },
        drawUserInfo: function(a, s) {
            var r = this;
            return t(e.default.mark(function t() {
                var i, o, l, d, c, h, g, u, m, p, f, v, I, w, D, y, b;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return i = r, o = r.data.screenWidth / 750, l = r.data.ratio, console.log("***drawUserInfo***", o, r.data.ratio, n.globalData.userInfo, n.globalData.single.headPortrait, n.globalData.logo), 
                        d = "", c = "", h = "", "1" == i.data.shareType || "2" == i.data.shareType ? (d = n.globalData.userInfo.avatarUrl || n.globalData.logo, 
                        c = n.globalData.userInfo.nickName || n.globalData.projectName) : "3" == i.data.shareType || "5" == i.data.shareType ? 0 == i.data.resultImgList.length ? n.globalData.userInfo.avatarUrl ? (d = n.globalData.userInfo.avatarUrl, 
                        c = n.globalData.userInfo.nickName) : (n.globalData.logo && 0 != n.globalData.logo.length || wx.showToast({
                            title: "项目logo未上传",
                            icon: "none",
                            duration: 1500
                        }), d = n.globalData.logo || "https://dm.static.elab-plus.com/miniprogram/projectLOGO.png", 
                        c = n.globalData.projectName) : 1 == i.data.resultImgList.length ? n.globalData.userInfo.avatarUrl ? (n.globalData.logo && 0 != n.globalData.logo.length || wx.showToast({
                            title: "项目logo未上传",
                            icon: "none",
                            duration: 1500
                        }), d = n.globalData.logo || "https://dm.static.elab-plus.com/miniprogram/projectLOGO.png", 
                        c = n.globalData.projectName) : i.data.paramData.hasOrganize && (d = n.globalData.single && n.globalData.single.organizeAvatarUrl ? n.globalData.single.organizeAvatarUrl : n.globalData.single.headPortrait, 
                        d = d || "https://dm.static.elab-plus.com/miniprogram/organizeAvatar.png", c = n.globalData.organizeUsername, 
                        h = n.globalData.phone) : 2 == i.data.resultImgList.length && i.data.paramData.hasUserInfo && i.data.paramData.hasOrganize && (d = n.globalData.single && n.globalData.single.organizeAvatarUrl ? n.globalData.single.organizeAvatarUrl : n.globalData.single.headPortrait, 
                        d = d || "https://dm.static.elab-plus.com/miniprogram/organizeAvatar.png", c = n.globalData.organizeUsername, 
                        h = n.globalData.phone) : "7" == i.data.shareType && (d = n.globalData.single && n.globalData.single.organizeAvatarUrl ? n.globalData.single.organizeAvatarUrl : "https://dm.static.elab-plus.com/miniprogram/organizeAvatar.png", 
                        c = n.globalData.organizeUsername, h = n.globalData.phone), t.next = 10, i.asynGetImageInfo(d);

                      case 10:
                        if (!(g = t.sent).error) {
                            t.next = 14;
                            break;
                        }
                        return i.setData({
                            showBack: !0,
                            creatCard: !1,
                            creatFirstCard: !1
                        }), t.abrupt("return", !1);

                      case 14:
                        if (u = g.width, m = g.height, p = u / m, f = 60 / p, m = f, v = 60 * o, I = 60 * o, 
                        w = 30 * o, D = 30 * o, "7" == i.data.shareType && (v = 70 * o, I = 70 * o, w = 62.5 * o, 
                        D = 599 * o, s && (v = 70 * o, I = 70 * o, w = 50 * o, D = 370 * o)), a.save(), 
                        i.roundRect(a, w / o, D / o, v / o, v / o, v / 2 / o), a.drawImage(g.path, w, D, v, I), 
                        a.restore(), a.save(), a.setFontSize(30 * o), "1" == i.data.shareType || "2" == i.data.shareType ? a.setFillStyle("#1B1B1B") : a.setFillStyle("#ffffff"), 
                        a.setTextAlign("left"), a.setTextBaseline("top"), y = 120 * o, b = 40 * o, "7" == i.data.shareType && (y = 142.5 * o, 
                        b = 594 * o, s && (y = 130 * o, b = 370 * o, a.setFontSize(28 * o))), h && h.length > 0 ? "7" == i.data.shareType ? s ? i.wordsWrap(a, c, 30 * o, 650 * o, y, b, 40 * o) : (c.length > 11 && (c = c.substr(0, 11) + "..."), 
                        i.wordsWrap(a, c, 30 * o, 450 * o, y, b, 40 * o)) : (c.length > 7 && (c = c.substr(0, 7) + "..."), 
                        i.wordsWrap(a, c, 30 * o, 360 * o, y, b, 40 * o)) : (c.length > 14 && (c = c.substr(0, 14) + "..."), 
                        console.log("***_name***", c), i.wordsWrap(a, c, 30 * o, 510 * o, y, b, 40 * o)), 
                        a.restore(), !(h && h.length > 0)) {
                            t.next = 79;
                            break;
                        }
                        if ("7" != i.data.shareType) {
                            t.next = 52;
                            break;
                        }
                        a.save(), a.setFontSize(30 * o), a.setFillStyle("#121212"), y = 142.5 * o, b = 634 * o, 
                        s && (y = 130 * o, b = 400 * o, a.setFontSize(26 * o), a.setFillStyle("#ffffff")), 
                        a.setTextAlign("left"), a.setTextBaseline("top"), a.fillText(h, y, b, 350 * o), 
                        a.restore(), i.drawInfo(a, i.data.shareWord, s), t.next = 77;
                        break;

                      case 52:
                        return t.next = 54, i.asynGetImageInfo("https://dm.static.elab-plus.com/miniprogram/phone.png");

                      case 54:
                        if (!(g = t.sent).error) {
                            t.next = 58;
                            break;
                        }
                        return i.setData({
                            showBack: !0,
                            creatCard: !1,
                            creatFirstCard: !1
                        }), t.abrupt("return", !1);

                      case 58:
                        a.save(), u = g.width, m = g.height, m = f = 60 / (p = u / m), v = 22 * o, I = 30 * o, 
                        w = 370 * o, D = 42 * o, a.drawImage(g.path, w, D, v, I), a.restore(), a.save(), 
                        a.setFontSize(30 * o), a.setFillStyle("#ffffff"), a.setTextAlign("left"), a.setTextBaseline("top"), 
                        a.fillText(h, 410 * o, 40 * o, 350 * o), a.restore(), i.drawInfo(a, i.data.shareWord, s);

                      case 77:
                        t.next = 80;
                        break;

                      case 79:
                        i.drawInfo(a, i.data.shareWord, s);

                      case 80:
                      case "end":
                        return t.stop();
                    }
                }, t, r);
            }))();
        },
        drawInfo: function(a, t, e) {
            var s = this, r = this.data.screenWidth / 750;
            this.data.ratio;
            if (a.save(), "7" == s.data.shareType) {
                var i = 684 * r, n = 62.5 * r, o = 450 * r;
                a.setFontSize(26 * r), e ? (o = 650 * r, n = 50 * r, i = 502 * r, a.setFillStyle("#1A1A1A")) : a.setFillStyle("#121212"), 
                a.setTextAlign("left"), a.setTextBaseline("top"), s.wordsWrap(a, t, 28 * r, o, n, i, 30 * r);
            } else a.setFontSize(28 * r), a.setFillStyle("#AC7E58"), a.setTextAlign("left"), 
            a.setTextBaseline("top"), s.wordsWrap(a, t, 28 * r, 570 * r, 30 * r, 110 * r, 40 * r);
            a.restore(), s.drawFooter(a, e);
        },
        computerHeight: function(a, t) {
            var e = this;
            console.log("***shareHandle-computerHeight***", e.data.listData);
            var s = e.data.canvasWidth - 60, r = 30, i = 20, n = this.data.screenWidth / 750;
            "1" == e.data.shareType || "2" == e.data.shareType ? (s = e.data.selectBtn ? e.data.canvasWidth - 60 : e.data.canvasWidth, 
            r = e.data.selectBtn ? 30 : 0, i = e.data.selectBtn ? 20 : 0) : "7" == e.data.shareType ? (s = e.data.canvasWidth, 
            r = 0) : "4" == e.data.shareType && (s = e.data.canvasWidth, r = 0);
            var o = [];
            e.data.listData.forEach(function(a, t) {
                o.push(new Promise(function(r, n) {
                    wx.getImageInfo({
                        src: a,
                        success: function(a) {
                            if ("1" == e.data.shareType || "2" == e.data.shareType) {
                                var n = a.width, o = a.height, l = s / (c = n / o), d = parseInt(e.data.canvasHeight) + l + i;
                                e.data.canvasHeight = d;
                            } else if ("4" == e.data.shareType) {
                                var c = (n = a.width) / (o = a.height), l = s / c;
                                e.data.canvasHeight = l;
                            }
                            console.log("***await-data***" + t, e.data.canvasHeight, a), wx.compressImage({
                                src: a.path,
                                quality: 80,
                                success: function(t) {
                                    console.log("***compressImage***", a);
                                    var e = t.tempFilePath;
                                    r({
                                        path: e,
                                        width: a.width,
                                        height: a.height
                                    });
                                },
                                fail: function(t) {
                                    console.error("***compressImage-fail***", t), r(a);
                                }
                            });
                        },
                        fail: function(a) {
                            n(a);
                        }
                    });
                }));
            }), Promise.all(o).then(function(s) {
                if ("1" == e.data.shareType || "2" == e.data.shareType) {
                    c = (c = e.data.canvasHeight - r) > (h = 1020) ? c : h;
                    var i = e.data.winHeight * (750 / e.data.screenWidth) - 140, o = i > c ? (i - c) / 2 : 0;
                    e.setData({
                        marginTop: o,
                        canvasHeight: c
                    }), a.setFillStyle("white"), a.fillRect(0, 0, e.data.canvasWidth, c);
                } else if ("3" == e.data.shareType) {
                    var l = a.createLinearGradient(0, 0, 0, e.data.canvasHeight);
                    l.addColorStop(0, "#353B4D"), l.addColorStop(1, "#12151E"), a.setFillStyle(l), a.fillRect(0, 0, e.data.canvasWidth * n, e.data.canvasHeight * n);
                } else if ("5" == e.data.shareType) {
                    var d = a.createLinearGradient(0, 0, 0, e.data.canvasHeight);
                    d.addColorStop(0, "#353B4D"), d.addColorStop(1, "#12151E"), a.setFillStyle(d), a.fillRect(0, 0, e.data.canvasWidth * n, e.data.canvasHeight * n);
                } else if ("4" == e.data.shareType) {
                    var c = e.data.canvasHeight + 300, h = e.data.minHeight;
                    c = c > h ? c : h, e.setData({
                        canvasHeight: c
                    }), a.setFillStyle("#E7E7E7"), a.fillRect(0, 0, e.data.canvasWidth * n, c * n);
                }
                e.data.tempData = s, "7" == e.data.shareType ? e.drawGaussBgImage(a, t) : e.drawBusinessImages(a, t);
            }).catch(function(a) {
                console.log(a);
            });
        },
        drawBusinessImages: function(a, t) {
            var e = this, s = this.data.screenWidth / 750, r = e.data.canvasWidth - 60, i = 30, n = 20;
            "1" == e.data.shareType || "2" == e.data.shareType ? (r = e.data.selectBtn ? e.data.canvasWidth - 60 : e.data.canvasWidth, 
            i = e.data.selectBtn ? 30 : 0, n = e.data.selectBtn ? 20 : 0) : "4" == e.data.shareType && (r = e.data.canvasWidth, 
            i = 0);
            var o = [];
            e.data.tempData.forEach(function(s) {
                o.push(new Promise(function(o, l) {
                    var d = s.path, c = s.width, h = s.height, g = c / h, u = r / g;
                    if ("1" == e.data.shareType || "2" == e.data.shareType) {
                        m = e.data.chy;
                        e.drawImage(a, d, c, h, i, m, r), e.data.chy = e.data.chy + u + n, o();
                    } else if ("4" == e.data.shareType) {
                        var m = e.data.chy;
                        e.drawImage(a, d, c, h, i, m, r), e.data.chy = e.data.chy + u + i, o();
                    } else if ("3" == e.data.shareType) if (u > (p = r)) {
                        f = (r - (I = p * g)) / 2;
                        e.drawImage2(a, d, 0, 0, c, h, i + f, e.data.chy, I, p, t), o();
                    } else {
                        v = (p - (w = r / g)) / 2;
                        e.drawImage2(a, d, f, v, I, w, i, e.data.chy + v, r, w, t), o();
                    } else if ("5" == e.data.shareType) {
                        var p = r;
                        if (u > p) {
                            var f = 0, v = (D = (u - p) / (r / c)) / 2, I = c, w = h - D;
                            e.drawImage2(a, d, f, v, I, w, i, e.data.chy, r, p, t), o();
                        } else {
                            var D = c - r / (p / h), f = D / 2, v = 0, I = c - D, w = h;
                            e.drawImage2(a, d, f, v, I, w, i, e.data.chy, r, p, t), o();
                        }
                    }
                }));
            }), Promise.all(o).then(function(r) {
                if ("7" == e.data.shareType) {
                    var i = a.createLinearGradient(0, 0, 0, e.data.canvasHeight);
                    i.addColorStop(0, "rgba(26,26,26,0.0)"), i.addColorStop(.8, "#131620"), i.addColorStop(1, "#181818"), 
                    a.setFillStyle(i), a.fillRect(0, 0, e.data.canvasWidth * s, e.data.canvasHeight * s), 
                    e.drawUserInfo(a, t);
                } else "4" == e.data.shareType ? e.drawFooter(a, t) : e.drawUserInfo(a, t);
            });
        },
        drawGaussBgImage: function(a, t) {
            var e = this, s = 576;
            t && (s = e.data.minHeight), console.log("***drawGaussBgImage***", e.data.gaussImageUrl), 
            wx.getImageInfo({
                src: e.data.gaussImageUrl,
                success: function(r) {
                    var i = r.path, n = r.width, o = r.height, l = s / (n / o), d = e.data.canvasHeight;
                    if (t && (d = e.data.canvasWidth), l > d) {
                        var c = 0, h = (m = (l - d) / (s / n)) / 2, g = n, u = o - m;
                        e.drawGaussImg(a, i, c, h, g, u, 0, e.data.chy, s, d, t);
                    } else {
                        var m = n - s / (d / o), c = m / 2, h = 0, g = n - m, u = o;
                        e.drawGaussImg(a, i, c, h, g, u, 0, e.data.chy, s, d, t);
                    }
                }
            });
        },
        drawGaussImg: function(a, t, e, s, r, i, n, o, l, d, c) {
            var h = this, g = this.data.screenWidth / 750, u = g * l, m = g * d, p = g * n, f = g * o;
            a.save(), a.drawImage(t, e, s, r, i, p, f, u, m), a.restore(), h.drawPImg(a, c);
        },
        drawPImg: function(a, t) {
            var e = this, s = this.data.screenWidth / 750, r = 450, i = 42.5, n = 44, o = 490, l = 730, d = 14;
            t ? (i = 30, n = 40, o = r = 706, l = 550, d = 16, a.save(), e.roundRect(a, i, n, o, l, d)) : (a.save(), 
            e.roundRect(a, i, n, o, l, d), a.restore(), i = 62.5, n = 64, o = r, l = 570, d = 16, 
            a.save(), e.roundRect(a, i, n, o, l, d));
            var c = e.data.tempData[0], h = c.path, g = c.width, u = c.height;
            console.log("***drawPImg***", c);
            var m = r / (g / u), p = s * r, f = t ? 430 * s : s * m, v = s * i, I = s * n;
            if (a.drawImage(h, v, I, p, f), console.log(h, v, I, p, f), t) {
                var w = a.createLinearGradient(i * s, 294 * s, i * s, 470 * s);
                w.addColorStop(0, "rgba(26,26,26,0.0)"), w.addColorStop(1, "rgba(26,26,26,0.7)"), 
                a.setFillStyle(w), a.fillRect(i * s, 294 * s, r * s, 176 * s), a.restore();
            } else {
                var D = a.createLinearGradient(i * s, 468 * s, i * s, 634 * s);
                D.addColorStop(0, "rgba(26,26,26,0.0)"), D.addColorStop(1, "rgba(26,26,26,0.7)"), 
                a.setFillStyle(D), a.fillRect(i * s, 468 * s, 450 * s, 166 * s), a.restore();
            }
            e.drawUserInfo(a, t);
        },
        drawImage2: function(a, t, e, s, r, i, n, o, l, d, c) {
            var h = this, g = this.data.screenWidth / 750;
            a.save();
            var u = g * l, m = g * d, p = g * n, f = g * o;
            "3" == h.data.shareType && h.roundRect(a, n, o, l, d, 16, "#353B4D"), a.drawImage(t, e, s, r, i, p, f, u, m), 
            a.restore();
        },
        drawImage: function(a, t, e, s, r, i, n) {
            var o = !(arguments.length > 7 && void 0 !== arguments[7]) || arguments[7], l = this.data.screenWidth / 750;
            this.data.ratio;
            o && a.save();
            var d = l * n, c = l * (n / (e / s)), h = l * r, g = l * i;
            a.drawImage(t, h, g, d, c), o && a.restore();
        },
        drawFooter: function(a, s) {
            var r = this;
            return t(e.default.mark(function t() {
                var i, n, o, l, d, c, h, g, u, m, p, f, v;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (i = r, n = r.data.screenWidth / 750, o = r.data.ratio, "7" != i.data.shareType) {
                            t.next = 7;
                            break;
                        }
                        i.drawFooterFixed(a, s), t.next = 53;
                        break;

                      case 7:
                        if ("4" != i.data.shareType) {
                            t.next = 11;
                            break;
                        }
                        i.drawQcode(a, s), t.next = 53;
                        break;

                      case 11:
                        if (!((l = "string" == typeof i.data.paramData.bottomTitle ? [ i.data.paramData.bottomTitle ] : i.data.paramData.bottomTitle) && l.length > 0)) {
                            t.next = 52;
                            break;
                        }
                        return t.next = 15, i.asynGetImageInfo("https://dm.static.elab-plus.com/miniprogram/icon_information.png");

                      case 15:
                        if (!(d = t.sent).error) {
                            t.next = 19;
                            break;
                        }
                        return i.setData({
                            showBack: !0,
                            creatCard: !1,
                            creatFirstCard: !1
                        }), t.abrupt("return", !1);

                      case 19:
                        console.log("***drawFooter-asynGetImageInfo***", d), c = i.data.canvasHeight - 200 + 42, 
                        h = 30 * n, g = 30 * n, u = 30 * n, m = n * c, l[1] && l[1].length > 0 && (a.save(), 
                        a.drawImage(d.path, u, m, h, g), a.restore()), a.save(), a.setFontSize(32 * n), 
                        a.setFillStyle("white"), a.setTextAlign("left"), a.setTextBaseline("top"), p = "", 
                        p = l[0], i.wordsWrap(a, p, 32 * n, 600 * n, 30 * n, (c - 52) * n, 42 * n), a.setFontSize(30 * n), 
                        a.setFillStyle("#AC7E58"), p = l[1] || "", f = 0, v = 0;

                      case 39:
                        if (!(v < p.length)) {
                            t.next = 47;
                            break;
                        }
                        if (!((f += a.measureText(p[v]).width) > 170)) {
                            t.next = 44;
                            break;
                        }
                        return p = p.substr(0, v) + "...", t.abrupt("break", 47);

                      case 44:
                        v++, t.next = 39;
                        break;

                      case 47:
                        i.wordsWrap(a, p, 30 * n, 600 * n, 70 * n, (c - 6) * n, 42 * n), a.restore(), i.drawFooterFixed(a, s), 
                        t.next = 53;
                        break;

                      case 52:
                        i.drawFooterFixed(a, s);

                      case 53:
                      case "end":
                        return t.stop();
                    }
                }, t, r);
            }))();
        },
        drawFooterFixed: function(a, s) {
            var r = this;
            return t(e.default.mark(function t() {
                var i, n, o, l, d, c, h, g, u, m, p, f, v, I, w;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return i = r, n = r.data.screenWidth / 750, o = r.data.ratio, l = i.data.paramData.bottomText || "长按二维码，了解更多信息", 
                        t.next = 6, i.asynGetImageInfo("https://dm.static.elab-plus.com/miniprogram/zhiwen.png");

                      case 6:
                        if (!(d = t.sent).error) {
                            t.next = 10;
                            break;
                        }
                        return i.setData({
                            showBack: !0,
                            creatCard: !1,
                            creatFirstCard: !1
                        }), t.abrupt("return", !1);

                      case 10:
                        c = 140, h = i.data.canvasHeight - 30 - 60, g = 60 * n, u = 60 * n, m = 30 * n, 
                        p = n * h, "1" == i.data.shareType || "2" == i.data.shareType ? (c = Math.ceil((i.data.canvasWidth - (20 * l.length + 36 + 10)) / 2), 
                        h = i.data.canvasHeight - 30 - 36, g = 36 * n, u = 36 * n, m = n * c, p = n * h) : "7" == i.data.shareType && (l = i.data.paramData.bottomText || "扫描二维码#立即进入线上售楼处", 
                        f = l.replace("#", "，"), c = Math.ceil((i.data.canvasWidth - (24 * f.length + 36 + 10)) / 2), 
                        h = i.data.canvasHeight - 50 - 28, g = 28 * n, u = 28 * n, m = n * c, p = n * h), 
                        "7" != !i.data.shareType && s || (a.save(), a.drawImage(d.path, m, p, g, u), a.restore()), 
                        l && l.length > 0 && (a.save(), "1" == i.data.shareType || "2" == i.data.shareType ? (h = i.data.canvasHeight - 30 - 36 + 8, 
                        a.setFontSize(20 * n), a.setFillStyle("#8B8B8B"), a.setTextAlign("right"), a.setTextBaseline("top"), 
                        i.wordsWrap(a, l, 20 * n, 20 * (l.length + 1) * n, (i.data.canvasWidth - c) * n, h * n, 25 * n)) : "7" == i.data.shareType ? (v = l.split("#"), 
                        I = 140, s ? (w = i.data.canvasHeight - 50 - 84, h = 275 - I / 2 + I + 20, v.forEach(function(t, e) {
                            a.setFontSize(24 * n), a.setFillStyle("#ffffff"), a.setTextAlign("center"), a.setTextBaseline("top"), 
                            i.wordsWrap(a, t, 24 * n, 275 * n, w * n, (h + 30 * e) * n, 30 * n);
                        })) : (h = i.data.canvasHeight - 50 - 28 - 2, a.setFontSize(24 * n), a.setFillStyle("#ffffff"), 
                        a.setTextAlign("right"), a.setTextBaseline("top"), i.wordsWrap(a, f, 20 * n, 24 * (f.length + 1) * n, (i.data.canvasWidth - c) * n, h * n, 30 * n))) : (a.setFontSize(20 * n), 
                        a.setFillStyle("#8B8B8B"), a.setTextAlign("left"), a.setTextBaseline("top"), i.wordsWrap(a, l, 20 * n, 350 * n, 110 * n, (h + 16) * n, 25 * n)), 
                        a.restore()), i.drawQcode(a, s);

                      case 20:
                      case "end":
                        return t.stop();
                    }
                }, t, r);
            }))();
        },
        drawQcode: function(a, s) {
            var r = this;
            return t(e.default.mark(function t() {
                var i, n, o, l, d, c, h, g, u, m, p, f, v, I, w, D, y;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return i = r, n = r.data.screenWidth / 750, console.log("***this.data.platform***", r.data.platform, r.data.ratio), 
                        o = "ios" == r.data.platform ? r.data.ratio : 1, t.next = 6, i.asynGetImageInfo(i.data.paramData.qcode);

                      case 6:
                        if (!(l = t.sent).error) {
                            t.next = 10;
                            break;
                        }
                        return i.setData({
                            showBack: !0,
                            creatCard: !1,
                            creatFirstCard: !1
                        }), t.abrupt("return", !1);

                      case 10:
                        a.save(), d = l.width, c = l.height, c = g = 140 / (h = d / c), u = i.data.canvasHeight - 30 - 140, 
                        m = 140 * n, p = 140 * n, f = 440 * n, v = n * u, I = 1, "1" == i.data.shareType || "2" == i.data.shareType ? (f = 245 * n, 
                        v = n * (i.data.canvasHeight - i.data.bottomHeight + 60)) : "7" == i.data.shareType ? (I = 2, 
                        w = 100, s ? (m = n * w, p = n * w, f = n * (i.data.minHeight - (138 + w / 2)), 
                        v = n * (275 - w / 2)) : (m = n * w, p = n * w, f = n * Math.ceil((575 - w) / 2), 
                        v = n * (i.data.canvasHeight - 100 - w))) : "4" == i.data.shareType && (u = i.data.canvasHeight - 300 + 30, 
                        m = 160 * n, p = 160 * n, f = 235 * n, v = n * u), 1 == I ? i.roundRect(a, f / n, v / n, m / n, p / n, m / 2 / n) : i.roundRect(a, f / n, v / n, m / n, p / n, 8 / n), 
                        a.drawImage(l.path, f, v, m, p, !1), console.warn("***drawQcode***", l.path, f, v, m, p), 
                        a.restore(), "4" == i.data.shareType && (D = i.data.paramData.bottomText || "扫描二维码，立即进入线上售楼处", 
                        (y = D.split("#")).forEach(function(t, e) {
                            a.save(), a.setFontSize(22 * n), a.setFillStyle("#8A8A8A"), a.setTextAlign("center"), 
                            a.setTextBaseline("top"), a.fillText(t, i.data.canvasWidth / 2 * n, (u + 160 + 20 + 30 * e) * n), 
                            a.restore();
                        })), a.draw(!1, function() {
                            setTimeout(function() {
                                var a = s ? "shareCardHorizontalCanvas" : "shareCardCanvas", t = s ? i.data.canvasWidth : parseInt(i.data.canvasHeight), e = s ? parseInt(i.data.canvasHeight) : i.data.canvasWidth;
                                console.log("***draw-over***", a, t, e), wx.canvasToTempFilePath({
                                    x: 0,
                                    y: 0,
                                    destWidth: o * e,
                                    destHeight: o * t,
                                    canvasId: a,
                                    fileType: "jpg",
                                    quality: 1,
                                    success: function(a) {
                                        if (console.log("***canvasToTempFilePath-success***", a), "1" == i.data.shareType || "2" == i.data.shareType) {
                                            i.data.selectBtn ? (i.data.resultSelectImg = a.tempFilePath, i.data.canvasSelectHeight = t) : (i.data.resultNoSelectImg = a.tempFilePath, 
                                            i.data.canvasNoSelectHeight = t);
                                            r = {
                                                imgUrl: a.tempFilePath,
                                                imgHeight: t,
                                                imgWidth: e,
                                                horizontal: s
                                            };
                                            i.setData({
                                                resultImgList: [ r ],
                                                selectObj: r,
                                                creatCard: !1,
                                                creatFirstCard: !1
                                            });
                                        } else if ("3" == i.data.shareType || "5" == i.data.shareType) {
                                            r = {
                                                imgUrl: a.tempFilePath,
                                                imgHeight: t,
                                                imgWidth: e,
                                                horizontal: s
                                            };
                                            i.data.resultImgList.push(r), 1 == i.data.resultImgList.length ? i.setData({
                                                resultImgList: i.data.resultImgList,
                                                selectObj: i.data.resultImgList[0],
                                                creatCard: !1,
                                                creatFirstCard: !1
                                            }) : i.setData({
                                                resultImgList: i.data.resultImgList,
                                                selectObj: i.data.selectObj ? i.data.selectObj : i.data.resultImgList[0],
                                                creatCard: !1
                                            }), 1 == i.data.resultImgList.length ? (i.data.paramData.hasUserInfo && i.initCanvas("shareCardCanvas", t), 
                                            i.data.paramData.hasOrganize && i.initCanvas("shareCardCanvas", t)) : 2 == i.data.resultImgList.length && i.data.paramData.hasUserInfo && i.data.paramData.hasOrganize && i.initCanvas("shareCardCanvas", t);
                                        } else if ("4" == i.data.shareType) {
                                            r = {
                                                imgUrl: a.tempFilePath,
                                                imgHeight: t,
                                                imgWidth: e,
                                                horizontal: s
                                            };
                                            i.data.resultImgList.push(r), i.setData({
                                                resultImgList: i.data.resultImgList,
                                                selectObj: i.data.resultImgList[0],
                                                creatCard: !1,
                                                creatFirstCard: !1
                                            });
                                        } else if ("7" == i.data.shareType) {
                                            var r = {
                                                imgUrl: a.tempFilePath,
                                                imgHeight: t,
                                                imgWidth: e,
                                                horizontal: s
                                            };
                                            i.data.resultImgList.push(r), 1 == i.data.resultImgList.length ? i.setData({
                                                resultImgList: i.data.resultImgList,
                                                selectObj: i.data.resultImgList[0],
                                                creatCard: !1,
                                                creatFirstCard: !1
                                            }) : i.setData({
                                                resultImgList: i.data.resultImgList,
                                                selectObj: i.data.selectObj ? i.data.selectObj : i.data.resultImgList[0],
                                                creatCard: !1
                                            });
                                            var n = i.data.resultImgList.length;
                                            if (n < i.data.paramData.list.length) {
                                                var o = i.data.paramData.list[n];
                                                i.data.listData = [ o.url ], "2" == o.imgCategory.toString() ? (i.data.gaussImageUrl = o.fuzzyUrl || "https://dm.static.elab-plus.com/miniprogram/heng.png", 
                                                i.initCanvas("shareCardHorizontalCanvas", t, !0)) : (i.data.gaussImageUrl = o.fuzzyUrl || "https://dm.static.elab-plus.com/miniprogram/shu.png", 
                                                i.initCanvas("shareCardCanvas", 1020));
                                            }
                                        }
                                    },
                                    fail: function(a) {
                                        console.warn("***canvasToTempFilePath-fail***", a), i.setData({
                                            creatCard: !1,
                                            creatFirstCard: !1
                                        });
                                    }
                                }, i);
                            }, 1500);
                        });

                      case 28:
                      case "end":
                        return t.stop();
                    }
                }, t, r);
            }))();
        },
        initShareCard: function(a) {
            var t = this, e = this;
            if (this.data.paramData = a, this.data.userInfo = wx.getStorageSync("userInfo"), 
            n.globalData.userInfo || (n.globalData.userInfo = this.data.userInfo), this.data.paramData.hasUserInfo = !!this.data.userInfo, 
            console.log("******AAAAAAAAAA*****", e.data.paramData.hasUserInfo, n.globalData.userInfo), 
            !this.data.paramData.qcode || 0 == this.data.paramData.qcode.length) return wx.showToast({
                title: "没有二维码,请生成二维码",
                icon: "warn",
                duration: 1500
            }), !1;
            this.setData({
                shareType: a.type,
                shareWord: a.shareWord || "我发现了一个不错的项目，想邀请你一起来看一下"
            }), wx.getSystemInfo({
                success: function(a) {
                    e.setData({
                        screenWidth: a.screenWidth,
                        winHeight: a.windowHeight,
                        ratio: a.pixelRatio,
                        platform: a.platform
                    }), console.log("***res.windowHeight***", a.screenWidth, a.windowHeight, a.pixelRatio, a.platform), 
                    n.login(function() {
                        e.data.paramData.hasUserInfo = !!e.data.userInfo, console.log("******AAAAAAAAAA*****", e.data.paramData.hasUserInfo, n.globalData.userInfo), 
                        e.data.paramData.hasOrganize = !(!n.globalData.single || !n.globalData.single.organize), 
                        e.starDraw();
                        var a = {
                            pvId: e.data.paramData.pvId,
                            type: "PV",
                            expand: {
                                type: e.data.shareType,
                                paramData: e.data.paramData
                            },
                            pvCurPageParams: e.data.paramData.pvCurPageParams || "",
                            pvCurPageName: "baocunzhaopianye",
                            pvLastPageName: e.data.paramData.pvCurPageName || "",
                            pvPageLoadTime: ""
                        };
                        r.trackRequest(a);
                    }), console.log("***shareType-refreshNumber***", t.data.shareType);
                }
            }), this.clearParams();
        },
        initCanvas: function(a) {
            var t = this, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 320, s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r = this;
            if (1 == this.data.creatCard) return !1;
            this.data.canvasWidth = 630, this.data.chy = 200, "4" == this.data.paramData.type && (this.data.chy = 0), 
            "7" == this.data.paramData.type && (this.data.chy = 0, this.data.canvasWidth = s ? 630 : 575), 
            "shareCardHorizontalCanvas" == a ? 0 == r.data.resultImgList.length ? this.setData({
                creatFirstCard: !0,
                creatCard: !0,
                canvasHeight: e,
                canvasWidth: this.data.canvasWidth
            }, function() {
                var e = wx.createCanvasContext(a, r);
                t.computerHeight(e, s);
            }) : this.setData({
                creatCard: !0,
                canvasHeight: e,
                canvasWidth: this.data.canvasWidth
            }, function() {
                var e = wx.createCanvasContext(a, r);
                t.computerHeight(e, s);
            }) : 0 == r.data.resultImgList.length || 1 == r.data.resultImgList.length && "1" == this.data.paramData.type ? this.setData({
                creatFirstCard: !0,
                creatCard: !0,
                canvasHeight: e,
                canvasWidth: this.data.canvasWidth
            }, function() {
                var e = wx.createCanvasContext(a, r);
                t.computerHeight(e, s);
            }) : this.setData({
                creatCard: !0,
                canvasHeight: e,
                canvasWidth: this.data.canvasWidth
            }, function() {
                var e = wx.createCanvasContext(a, r);
                t.computerHeight(e, s);
            });
        },
        createImages: function() {
            var a = this;
            return t(e.default.mark(function t() {
                var r, o, l, d, c, h, g, u, m, p, f, v;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return a.setData({
                            creatCard: !0
                        }), r = a, o = r.data.resultImgList.length, l = r.data.paramData.list[o], d = n.globalData.single && n.globalData.single.organizeAvatarUrl ? n.globalData.single.organizeAvatarUrl : "https://dm.static.elab-plus.com/miniprogram/organizeAvatar.png", 
                        c = n.globalData.organizeUsername, h = n.globalData.phone, g = r.data.shareWord, 
                        u = {
                            houseId: i.houseId,
                            customerId: n.globalData.single && n.globalData.single.id ? n.globalData.single.id : "",
                            mobile: n.globalData.phone ? n.globalData.phone : "",
                            backgroundImage: l.fuzzyUrl,
                            imageType: l.imgCategory,
                            mainImage: l.url,
                            headImage: d,
                            name: c,
                            notes: g,
                            path: "/pages/index/index",
                            scene: n.globalData._shareToken || n.globalData.shareToken,
                            wxType: "qrcode_xcx_access_token"
                        }, t.next = 11, (0, s.default)("createBusinessCard", u, !0);

                      case 11:
                        m = t.sent, p = r.data.minHeight, f = 575, 2 == l.imgCategory && (f = r.data.minHeight, 
                        p = 630), v = {
                            imgUrl: m.single,
                            imgHeight: p,
                            imgWidth: f,
                            horizontal: 2 == l.imgCategory
                        }, r.data.resultImgList.push(v), 1 == r.data.resultImgList.length ? r.setData({
                            resultImgList: r.data.resultImgList,
                            selectObj: r.data.resultImgList[0],
                            creatCard: !1,
                            creatFirstCard: !1
                        }) : r.setData({
                            resultImgList: r.data.resultImgList,
                            selectObj: r.data.selectObj ? r.data.selectObj : r.data.resultImgList[0],
                            creatCard: !1
                        }), r.data.resultImgList.length < r.data.paramData.list.length && r.createImages();

                      case 19:
                      case "end":
                        return t.stop();
                    }
                }, t, a);
            }))();
        },
        imgSecCheck: function(a) {
            var t = this, e = [];
            t.setData({
                showLoading: !0,
                text: "图片上传中，请稍后"
            }), a.forEach(function(a, t) {
                e.push(new Promise(function(t, e) {
                    wx.uploadFile({
                        url: i.newUrl + "elab-marketing-user/wx/imgSecCheck",
                        filePath: a,
                        name: "file",
                        formData: {
                            appId: n.globalData.appid,
                            secret: n.globalData.secret
                        },
                        success: function(a) {
                            var s = JSON.parse(a.data);
                            console.warn("***imgSecCheck-uploadFile***", a.data, s), "87014" == s.errorCode ? e(s) : t(s);
                        },
                        fail: function(a) {
                            console.warn("***uploadFile***", a), t();
                        }
                    });
                }));
            }), Promise.all(e).then(function(e) {
                console.log("***chooseImage1***", a), t.data.listData = a, t.data.chy = 200, t.data.bottomHeight = 280, 
                t.initCanvas("shareCardCanvas", t.data.chy + t.data.bottomHeight), t.setData({
                    showLoading: !1
                });
            }).catch(function(a) {
                wx.showModal({
                    title: "提示",
                    content: "图片涉嫌违规，请检查后重新上传",
                    showCancel: !1,
                    confirmColor: "#5370FF"
                }), t.data.chooseFlag = !1, t.setData({
                    showLoading: !1,
                    showBg: !0,
                    resultImgList: []
                });
            });
        },
        starDraw: function() {
            var a = this, t = a.data.winHeight * (750 / a.data.screenWidth) - 190;
            a.data.minHeight = 1020 > t ? 1020 : t;
            var e = t > 1020 ? (t - 1020) / 2 : 0;
            if (a.setData({
                marginTop: "3" == a.data.paramData.type.toString() || "5" == a.data.paramData.type.toString() || "7" == a.data.paramData.type.toString() ? e : 0
            }), console.log("***starDraw***", a.data.paramData), "1" == a.data.paramData.type.toString()) a.setData({
                showBg: !0,
                resultImgList: []
            }), a.data.paramData.bottomTitle = [], a.data.chooseFlag = !0, console.warn("***本地选择图片***", a.data.paramData.type), 
            wx.chooseImage({
                count: 3,
                sizeType: [ "original", "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(t) {
                    var e = t.tempFilePaths;
                    a.imgSecCheck(e), console.log("***chooseImage1***", e);
                },
                fail: function(t) {
                    console.warn("***chooseImage1-fail***", t), a.setData({
                        showBg: !1
                    }), a.data.resultImgList && 0 == a.data.resultImgList.length && wx.navigateBack({
                        changed: !0
                    });
                },
                complete: function(t) {
                    a.setData({
                        showBg: !1
                    }), a.data.chooseFlag = !1, console.warn("***chooseImage1-complete***", t);
                }
            }); else if ("2" == a.data.paramData.type.toString()) a.setData({
                showBg: !0,
                resultImgList: []
            }), a.data.paramData.bottomTitle = [], a.data.chooseFlag = !0, wx.chooseImage({
                count: 1,
                sizeType: [ "original", "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(t) {
                    var e = t.tempFilePaths;
                    console.log("***chooseImage2***", e), a.imgSecCheck(e);
                },
                fail: function(t) {
                    console.log("***chooseImage2-fail***", t), a.setData({
                        showBg: !1
                    }), a.data.resultImgList && 0 == a.data.resultImgList.length && wx.navigateBack({
                        changed: !0
                    });
                },
                complete: function(t) {
                    a.setData({
                        showBg: !1
                    }), a.data.chooseFlag = !1;
                }
            }); else if ("3" == a.data.paramData.type.toString()) {
                a.data.minHeight = 1020;
                var s = a.data.paramData.imgUrl;
                console.log("***chooseImage3***", s), a.data.listData = [ s ], a.initCanvas("shareCardCanvas", 1020);
            } else if ("5" == a.data.paramData.type.toString()) {
                a.data.minHeight = 1020;
                var r = a.data.paramData.imgUrl;
                console.log("***chooseImage3***", r), a.data.listData = [ r ], a.initCanvas("shareCardCanvas", 1020);
            } else if ("4" == a.data.paramData.type.toString()) {
                var i = a.data.paramData.imgUrl;
                console.log("***chooseImage3***", i), a.data.listData = [ i ], a.initCanvas("shareCardCanvas");
            } else if ("7" == a.data.paramData.type.toString()) if (a.data.minHeight = 1020, 
            a.data.paramData.bottomTitle = [], "ios" == this.data.platform) {
                if (console.log("***chooseImage6***", a.data.paramData.list), a.data.paramData.list && a.data.paramData.list.length > 0) {
                    var n = a.data.paramData.list[0];
                    a.data.listData = [ n.url ], "2" == n.imgCategory.toString() ? (a.data.gaussImageUrl = n.fuzzyUrl || "https://dm.static.elab-plus.com/miniprogram/heng.png", 
                    a.initCanvas("shareCardHorizontalCanvas", a.data.minHeight, !0)) : (a.data.gaussImageUrl = n.fuzzyUrl || "https://dm.static.elab-plus.com/miniprogram/shu.png", 
                    a.initCanvas("shareCardCanvas", a.data.minHeight));
                }
            } else this.setData({
                creatFirstCard: !0
            }), a.createImages();
        },
        showEditViewTap: function() {
            this.data.wordTmp = this.data.shareWord, this.data.currentMessage = this.data.wordTmp, 
            this.setData({
                showEditView: !0
            });
            var a = {
                clkDesPage: "baocunzhaopianye",
                type: "CLK",
                pvCurPageName: "baocunzhaopianye",
                pvCurPageParams: this.data.paramData.pvCurPageParams || "",
                clkId: "clk_2cmina_149",
                clkName: "zidingyiwenan"
            };
            r.trackRequest(a);
        },
        cancel: function() {
            this.setData({
                showEditView: !1,
                shareWord: this.data.wordTmp
            });
            var a = {
                clkDesPage: "baocunzhaopianye",
                type: "CLK",
                pvCurPageName: "baocunzhaopianye",
                pvCurPageParams: this.data.paramData.pvCurPageParams || "",
                clkId: "clk_2cmina_150",
                clkName: "wenbenkuangshurukuang",
                clkParams: {
                    button: "取消",
                    custom_text: this.data.shareWord || ""
                }
            };
            r.trackRequest(a);
        },
        bindKeyInput: function(a) {
            this.data.currentMessage = a.detail.value, console.log("***bindKeyInput***", this.data.shareWord);
        },
        confirm: function(a) {
            var i = this;
            return t(e.default.mark(function a() {
                var t, o;
                return e.default.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        if (i.data.wordTmp != i.data.currentMessage && "" != i.data.currentMessage) {
                            a.next = 3;
                            break;
                        }
                        return i.setData({
                            showEditView: !1
                        }), a.abrupt("return", !1);

                      case 3:
                        return i.data.resultSelectImg = "", i.data.resultNoSelectImg = "", i.data.currentMessage = i.data.currentMessage.replace(/\n/g, ""), 
                        "ios" != i.data.platform && (i.data.currentMessage = i.data.currentMessage.replace(/\uD83C[\uDF00-\uDFFF]\s|\uD83D[\uDC00-\uDE4F]\s/g, ""), 
                        i.data.currentMessage = i.data.currentMessage.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, ""), 
                        console.log("--platform---", i.data.currentMessage)), t = {
                            appId: n.globalData.appid,
                            secret: n.globalData.secret,
                            content: i.data.currentMessage
                        }, a.next = 10, (0, s.default)("msgSecCheck", t, !0);

                      case 10:
                        if (!(o = a.sent) || 0 != o.success) {
                            a.next = 14;
                            break;
                        }
                        return wx.showModal({
                            title: "提示",
                            content: "文字涉嫌违规，请检查后重新编辑",
                            showCancel: !1,
                            confirmColor: "#5370FF"
                        }), a.abrupt("return", !1);

                      case 14:
                        i.setData({
                            showEditView: !1,
                            shareWord: i.data.currentMessage,
                            resultImgList: [],
                            selectObj: null,
                            currentIndex: 0
                        }, function() {
                            if ("1" == i.data.shareType.toString() || "2" == i.data.shareType.toString()) i.data.chy = 200, 
                            i.data.bottomHeight = 280, i.initCanvas("shareCardCanvas", i.data.chy + i.data.bottomHeight); else if ("3" == i.data.shareType.toString()) {
                                var a = i.data.paramData.imgUrl;
                                i.data.listData = [ a ], i.initCanvas("shareCardCanvas", 1020);
                            } else if ("5" == i.data.shareType.toString()) {
                                var t = i.data.paramData.imgUrl;
                                i.data.listData = [ t ], i.initCanvas("shareCardCanvas", 1020);
                            } else if ("7" == i.data.shareType.toString()) if ("ios" == i.data.platform) {
                                var e = i.data.paramData.list[0];
                                i.data.listData = [ e.url ], "2" == e.imgCategory.toString() ? (i.data.gaussImageUrl = e.fuzzyUrl || "https://dm.static.elab-plus.com/miniprogram/heng.png", 
                                i.initCanvas("shareCardHorizontalCanvas", i.data.minHeight, !0)) : (i.data.gaussImageUrl = e.fuzzyUrl || "https://dm.static.elab-plus.com/miniprogram/shu.png", 
                                i.initCanvas("shareCardCanvas", 1020));
                            } else i.setData({
                                creatFirstCard: !0
                            }), i.createImages();
                            var s = {
                                clkDesPage: "baocunzhaopianye",
                                type: "CLK",
                                pvCurPageName: "baocunzhaopianye",
                                pvCurPageParams: i.data.paramData.pvCurPageParams || "",
                                clkId: "clk_2cmina_150",
                                clkName: "wenbenkuangshurukuang",
                                clkParams: {
                                    button: "确认",
                                    custom_text: i.data.shareWord || ""
                                }
                            };
                            r.trackRequest(s);
                        });

                      case 15:
                      case "end":
                        return a.stop();
                    }
                }, a, i);
            }))();
        },
        clearParams: function() {
            this.data.resultSelectImg = "", this.data.resultNoSelectImg = "", this.data.canvasSelectHeight = "", 
            this.data.canvasNoSelectHeight = "", this.setData({
                resultImgList: [],
                selectObj: null
            });
        },
        clearCanvas: function() {
            this.data.resultSelectImg = "", this.data.resultNoSelectImg = "", this.data.canvasSelectHeight = "", 
            this.data.canvasNoSelectHeight = "", this.data.ImagesData = [], this.setData({
                resultImgList: [],
                selectObj: null,
                canvasWidth: 200,
                canvasHeight: 300
            }), wx.drawCanvas({
                canvasId: "shareCardCanvas",
                actions: [],
                reserve: !1
            }), wx.drawCanvas({
                canvasId: "shareCardHorizontalCanvas",
                actions: [],
                reserve: !1
            });
        },
        reselect: function() {
            var a = this;
            if (1 == this.data.creatCard) return !1;
            if (1 == this.data.chooseFlag) return !1;
            var t = {
                clkDesPage: "baocunzhaopianye",
                type: "CLK",
                pvCurPageName: "baocunzhaopianye",
                pvCurPageParams: this.data.paramData.pvCurPageParams || "",
                clkId: "clk_2cmina_152",
                clkName: "zhongxuanzhaopian",
                expand: {
                    type: a.data.shareType,
                    paramData: a.data.paramData
                }
            };
            r.trackRequest(t), "1" == this.data.shareType ? (a.data.resultImgList && 0 == a.data.resultImgList.length && a.setData({
                showBg: !0,
                resultImgList: []
            }), a.data.chooseFlag = !0, wx.chooseImage({
                count: 3,
                sizeType: [ "original", "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(t) {
                    a.clearParams();
                    var e = t.tempFilePaths;
                    console.log("***reselect-chooseImage1***", e), a.imgSecCheck(e);
                },
                fail: function(t) {
                    console.log("***chooseImage1-fail***", t), a.setData({
                        showBg: !1
                    }), a.data.resultImgList && 0 == a.data.resultImgList.length && wx.navigateBack({
                        changed: !0
                    });
                },
                complete: function(t) {
                    a.setData({
                        showBg: !1
                    }), a.data.chooseFlag = !1;
                }
            })) : (a.data.resultImgList && 0 == a.data.resultImgList.length && a.setData({
                showBg: !0,
                resultImgList: []
            }), a.data.chooseFlag = !0, wx.chooseImage({
                count: 1,
                sizeType: [ "original", "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(t) {
                    a.clearParams();
                    var e = t.tempFilePaths;
                    console.log("***reselect-chooseImage2***", e), a.imgSecCheck(e);
                },
                fail: function(t) {
                    console.log("***chooseImage2-fail***", t), a.setData({
                        showBg: !1
                    }), a.data.resultImgList && 0 == a.data.resultImgList.length && wx.navigateBack({
                        changed: !0
                    });
                },
                complete: function(t) {
                    a.setData({
                        showBg: !1
                    }), a.data.chooseFlag = !1;
                }
            }));
        },
        save: function() {
            if (1 == this.data.creatCard) return !1;
            if (1 == this.data.chooseFlag) return !1;
            var a = this, t = this.data.selectObj ? this.data.selectObj.imgUrl : this.data.resultImgList && this.data.resultImgList.length > 0 ? this.data.resultImgList[0].imgUrl : "", e = {
                clkDesPage: "baocunzhaopianye",
                type: "CLK",
                pvCurPageName: "baocunzhaopianye",
                pvCurPageParams: a.data.paramData.pvCurPageParams || "",
                clkId: "clk_2cmina_56",
                clkName: "baocunzhaopiananniu",
                expand: {
                    type: a.data.shareType,
                    resultImg: t || "",
                    paramData: a.data.paramData
                }
            };
            r.trackRequest(e), t && t.length > 0 ? wx.getSetting({
                success: function(e) {
                    console.log("***rtcroomCom.onLoad***getSetting", e), e.authSetting["scope.writePhotosAlbum"] ? (console.log("***scope.writePhotosAlbum-ok***"), 
                    a.showLoading(), t.startsWith("http://tmp/") || t.startsWith("wxfile://") ? wx.saveImageToPhotosAlbum({
                        filePath: t,
                        success: function(t) {
                            a.hideLoading(), wx.showToast({
                                title: "保存成功！",
                                icon: "success",
                                duration: 1500
                            });
                        },
                        fail: function(t) {
                            a.hideLoading();
                        }
                    }) : (console.log("***getSetting.save***网络图片", t), wx.downloadFile({
                        url: t,
                        success: function(t) {
                            wx.saveImageToPhotosAlbum({
                                filePath: t.tempFilePath,
                                success: function(t) {
                                    a.hideLoading(), wx.showToast({
                                        title: "保存成功！",
                                        icon: "success",
                                        duration: 1500
                                    });
                                },
                                fail: function(t) {
                                    a.hideLoading();
                                }
                            });
                        },
                        fail: function(t) {
                            a.hideLoading();
                        }
                    }))) : (console.warn("***scope.writePhotosAlbum-false***"), wx.authorize({
                        scope: "scope.writePhotosAlbum",
                        success: function() {
                            a.showLoading(), t.startsWith("http://tmp/") || t.startsWith("wxfile://") ? wx.saveImageToPhotosAlbum({
                                filePath: t,
                                success: function(t) {
                                    a.hideLoading(), wx.showToast({
                                        title: "保存成功！",
                                        icon: "success",
                                        duration: 1500
                                    });
                                },
                                fail: function(t) {
                                    a.hideLoading();
                                }
                            }) : (console.log("***getSetting.save***网络图片", t), wx.downloadFile({
                                url: t,
                                success: function(t) {
                                    wx.saveImageToPhotosAlbum({
                                        filePath: t.tempFilePath,
                                        success: function(t) {
                                            a.hideLoading(), wx.showToast({
                                                title: "保存成功！",
                                                icon: "success",
                                                duration: 1500
                                            });
                                        },
                                        fail: function(t) {
                                            a.hideLoading();
                                        }
                                    });
                                },
                                fail: function(t) {
                                    a.hideLoading();
                                }
                            }));
                        },
                        fail: function(t) {
                            console.log("***scope.writePhotosAlbum***"), a.setData({
                                showImgModel: !0,
                                showImgBtn: !0
                            }), a.hideLoading();
                        }
                    }));
                }
            }) : wx.showToast({
                title: "生成图片中，请稍等片刻",
                icon: "none",
                duration: 1500
            });
        },
        showLoading: function(a) {
            this.setData({
                showLoading: !0,
                text: a || "正在保存..."
            });
        },
        hideLoading: function() {
            this.setData({
                showLoading: !1
            });
        },
        roundRect: function(a, t, e, s, r, i, n) {
            var o = this.data.screenWidth / 750;
            t *= o, e *= o, s *= o, r *= o, i *= o, a.beginPath();
            var l = n || "white";
            a.setFillStyle(l), a.arc(t + i, e + i, i, Math.PI, 1.5 * Math.PI), a.moveTo(t + i, e), 
            a.lineTo(t + s - i, e), a.lineTo(t + s, e + i), a.arc(t + s - i, e + i, i, 1.5 * Math.PI, 2 * Math.PI), 
            a.lineTo(t + s, e + r - i), a.lineTo(t + s - i, e + r), a.arc(t + s - i, e + r - i, i, 0, .5 * Math.PI), 
            a.lineTo(t + i, e + r), a.lineTo(t, e + r - i), a.arc(t + i, e + r - i, i, .5 * Math.PI, Math.PI), 
            a.lineTo(t, e + i), a.lineTo(t + i, e), a.fill(), a.closePath(), a.clip();
        }
    }
});