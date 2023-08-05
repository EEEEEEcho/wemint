function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function r(n, o) {
                try {
                    var s = t[n](o), i = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!s.done) return Promise.resolve(i).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(i);
            }
            return r("next");
        });
    };
}

var a = e(require("../../../lib/requestConfig")), r = e(require("../../../lib/runtime")), n = require("../../../lib/promise"), o = e(require("../../../lib/endpoint")), s = require("../../../utils/util.js"), i = require("../../../config.js"), u = getApp(), l = require("../../../getlogininfo.js"), c = (l.authorizeInfo, 
l.getUserInfo, ""), m = "";

Page({
    data: {
        navbar: {
            showCapsule: 1,
            title: "身份绑定",
            titleColor: "#121212",
            navPadding: 1,
            navBarColor: "#fff",
            navBackColor: "#121212",
            haveCallback: !1,
            fromShare: !1,
            pageId: null,
            pageName: ""
        },
        navigateStatusContainerHeight: "0px",
        progressRecord: !0,
        progressCheck: !1,
        progressComplete: !1,
        sexType: 1,
        userName: "",
        userID: "",
        showCommitComplete: !1,
        showCommitFail: !1,
        showCommitWarning: !1,
        warningText: "请您完整填写信息后提交。",
        _provinceCode: {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        },
        portraitImgUrl: "",
        nationalEmblemUrl: ""
    },
    onLoad: function(e) {
        this.setData({
            navigateStatusContainerHeight: u.globalData.navigateStatusContainerHeight + "px"
        }), c = JSON.stringify(e), this.checkoutBindUserStatus();
    },
    onReady: function() {},
    onShow: function() {
        m = new Date().getTime();
        var e = {
            ip: u.globalData.ip,
            type: "PV",
            pvId: "p_2cmina_01014",
            pvCurPageName: "shenfenbangding",
            pvCurPageParams: c,
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - m
        };
        s.trackRequest(e, u);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getCurrentPageParam: function() {
        return c;
    },
    checkoutBindUserStatus: function() {
        var e = this;
        return t(r.default.mark(function t() {
            var n, o, s;
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = {
                        houseId: i.houseId,
                        mobile: u.globalData.phone || ""
                    }, console.log("checkoutBindUserStatus", n), t.next = 4, (0, a.default)("queryBindIdentityInfo", n);

                  case 4:
                    o = t.sent, console.log("checkoutBindUserStatus", o), o.success && o.single && null != (s = o.single.checkStatus) && (0 == s ? e.setData({
                        progressCheck: !0,
                        progressRecord: !1,
                        progressComplete: !1,
                        showCommitFail: !1,
                        sexType: o.single.sex,
                        userName: o.single.realName,
                        userID: o.single.identityCard
                    }) : 1 == s ? e.setData({
                        showCommitComplete: !0,
                        progressCheck: !1,
                        progressRecord: !1,
                        progressComplete: !0,
                        showCommitFail: !1
                    }) : -1 == s && e.setData({
                        progressCheck: !1,
                        progressRecord: !1,
                        progressComplete: !0,
                        showCommitFail: !0
                    }), e.setData({
                        sexType: o.single.sex,
                        userName: o.single.realName,
                        userID: o.single.identityCard,
                        nationalEmblemUrl: o.single.nationalEmblemImg,
                        portraitImgUrl: o.single.portraitImg
                    }));

                  case 7:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    resetUserInformation: function() {
        this.setData({
            progressCheck: !1,
            progressRecord: !0,
            progressComplete: !1,
            showCommitFail: !1,
            showCommitComplete: !1
        });
    },
    updateInformation: function() {
        this.setData({
            progressCheck: !1,
            progressRecord: !0,
            progressComplete: !1,
            showCommitFail: !1,
            showCommitComplete: !1
        });
    },
    selectMale: function() {
        1 != this.data.sexType && this.setData({
            sexType: 1
        });
    },
    selectFemale: function() {
        0 != this.data.sexType && this.setData({
            sexType: 0
        });
    },
    getUserName: function(e) {
        var t = e.detail.value;
        this.setData({
            userName: t
        });
    },
    checkUserCode: function(e) {
        var t = this, a = e.detail.value, r = t.data._provinceCode, n = "", o = !0, s = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
        if (a && a.match(s)) if (r[a.substr(0, 2)]) {
            if (18 == a.length) {
                a = a.split("");
                for (var i = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ], u = [ 1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2 ], l = 0, c = 0; c < 17; c++) l += a[c] * i[c];
                u[l % 11] != a[17] && (n = "校验位错误", o = !1);
            }
        } else n = "身份证地址编码错误", o = !1; else n = "身份证号格式错误", o = !1;
        if (o) {
            var m = "", g = !0, p = !1, d = void 0;
            try {
                for (var h, f = a[Symbol.iterator](); !(g = (h = f.next()).done); g = !0) m += h.value;
            } catch (e) {
                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                p = !0, d = e;
            } finally {
                try {
                    !g && f.return && f.return();
                } finally {
                    if (p) throw d;
                }
            }
            t.setData({
                userID: m
            });
        } else wx.showToast({
            title: n,
            icon: "none",
            duration: 1500
        });
    },
    closeWarnDialog: function() {
        this.setData({
            showCommitWarning: !1
        });
    },
    uploadPortrait: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sourceType: [ "album", "camera" ],
            success: function(t) {
                e.uploadFile(t.tempFilePaths[0], 1);
            }
        });
    },
    uploadNationalEmblem: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sourceType: [ "album", "camera" ],
            success: function(t) {
                e.uploadFile(t.tempFilePaths[0], 2);
            }
        });
    },
    uploadFile: function(e, a) {
        var s = this;
        return t(r.default.mark(function t() {
            var i, u, l, c, m, g;
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, o.default)("getUploadToken");

                  case 2:
                    if (!(i = t.sent).success) {
                        t.next = 9;
                        break;
                    }
                    return u = i.single, l = u.token, c = u.resultUrl, t.next = 7, (0, n.uploadImageFiles)(l, e);

                  case 7:
                    (m = t.sent) && m.length > 0 && (g = "" + c + m, console.log("uploadFile:" + g), 
                    1 == a ? s.setData({
                        portraitImgUrl: g
                    }) : s.setData({
                        nationalEmblemUrl: g
                    }));

                  case 9:
                  case "end":
                    return t.stop();
                }
            }, t, s);
        }))();
    },
    goChatList: function(e) {
        var a = this;
        return t(r.default.mark(function e() {
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    u.handleGoChat();

                  case 1:
                  case "end":
                    return e.stop();
                }
            }, e, a);
        }))();
    },
    buildingCommit: function() {
        var e = this;
        return t(r.default.mark(function t() {
            var n, o, l;
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (e.data.userName && e.data.userID) {
                        t.next = 3;
                        break;
                    }
                    return e.setData({
                        warningText: "请您完整填写信息后提交。",
                        showCommitWarning: !0
                    }), t.abrupt("return");

                  case 3:
                    if (e.data.nationalEmblemUrl) {
                        t.next = 6;
                        break;
                    }
                    return e.setData({
                        warningText: "请您完整填写信息后提交。",
                        showCommitWarning: !0
                    }), t.abrupt("return");

                  case 6:
                    if (e.data.nationalEmblemUrl) {
                        t.next = 9;
                        break;
                    }
                    return e.setData({
                        warningText: "请您完整填写信息后提交。",
                        showCommitWarning: !0
                    }), t.abrupt("return");

                  case 9:
                    return n = {
                        type: "CLK",
                        pvCurPageName: "shenfenbangding",
                        pvCurPageParams: c,
                        clkId: "clk_2cmina_01015",
                        clkName: "tijiaobangding"
                    }, s.trackRequest(n), o = {
                        houseId: i.houseId,
                        identityCard: e.data.userID,
                        nationalEmblemImg: e.data.nationalEmblemUrl,
                        portraitImg: e.data.portraitImgUrl,
                        organizeUserMobile: u.globalData.phone || "",
                        realName: e.data.userName,
                        sex: e.data.sexType
                    }, console.log("buildingCommit", o), t.next = 15, (0, a.default)("bindIdentity", o);

                  case 15:
                    l = t.sent, console.log("buildingCommit", l), l.success && e.checkoutBindUserStatus();

                  case 18:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    }
});