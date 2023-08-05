function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function n(o, r) {
                try {
                    var s = t[o](r), i = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
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

var a = e(require("../../lib/endpoint")), n = e(require("../../lib/runtime")), o = require("../../lib/promise"), r = require("../../utils/util"), s = e(require("../../utils/monitor.js")), i = "https://dm.static.elab-plus.com/wuXiW3/img", u = "", c = getApp(), d = 1;

Page({
    data: {
        doShare: !1,
        showPopup: !1,
        cdn: i,
        fee: 300,
        timelineSrc: "",
        fromShare: !1,
        openSetting: !1
    },
    getCurrentPageParam: function() {
        return u;
    },
    onLoad: function(e) {
        var s = this;
        u = JSON.stringify(e), this.myLoading = this.selectComponent("#myLoading"), this.myLoading && this.myLoading.hideLoading(), 
        c.decrypt(e, t(n.default.mark(function t() {
            var i, u, h, l, p, m, f, g, I, w, v, P, k, y, S, x, C, b, T;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return console.log({
                        path: s.route,
                        parmas: e
                    }), i = void 0, i = e.scene ? c.globalData.shareId : e.shareId || "", t.next = 5, 
                    (0, o.login)();

                  case 5:
                    return u = t.sent, h = {
                        shareToken: c.globalData.shareToken
                    }, l = {
                        type: "PV",
                        pvId: "P_2cdinzhi_2",
                        pvCurPageName: "yudingfuwu",
                        pvCurPageParams: h.shareToken ? h : "{}"
                    }, (0, r.trackRequest)(l), d++, p = u.houseId, m = u.nickname, f = u.id, g = u.openId, 
                    I = u.headPortrait, w = c.globalData, v = w.appid, P = w.secret, t.next = 14, (0, 
                    a.default)("customState", {
                        customerId: f,
                        houseId: p
                    });

                  case 14:
                    k = t.sent, y = k.single, S = y.customizedStatus, x = y.paymentStatus, C = y.customerProgrammeId, 
                    b = 2 === x, T = !!i && parseInt(i) !== f, s.setData({
                        openid: g,
                        shareId: i,
                        customerId: f,
                        houseId: p,
                        appId: v,
                        secret: P,
                        fromShare: T,
                        hasPay: b,
                        nickname: m,
                        headImage: I
                    }), s.redirect();

                  case 20:
                  case "end":
                    return t.stop();
                }
            }, t, s);
        })));
    },
    onShow: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var a;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    s.default.pageShow(), d > 1 && (a = {
                        type: "PV",
                        pvId: "P_2cdinzhi_2",
                        pvCurPageName: "yudingfuwu",
                        pvCurPageParams: {
                            shareToken: c.globalData.shareToken
                        }
                    }, (0, r.trackRequest)(a));

                  case 3:
                  case "end":
                    return e.stop();
                }
            }, t, e);
        }))();
    },
    redirect: function() {
        this.data.hasPay && wx.redirectTo({
            url: "/pages/customCenter/customCenter"
        });
    },
    addShareRecord: function() {
        var e = this.data, t = e.houseId, n = e.customerId, o = e.shareId;
        (0, a.default)("addShare", {
            houseId: t,
            masterCustomerId: o,
            guestCustomerId: n
        });
    },
    onShowPopup: function() {
        this.setData({
            showPopup: !0
        });
    },
    onClose: function() {
        this.setData({
            showPopup: !1,
            doShare: !1
        });
    },
    onPay: function(e, o) {
        var s = this;
        return t(n.default.mark(function e() {
            var t, i, u, c, d, h, l, p, m, f, g, I, w, v, P, k;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return t = s.data, i = t.openid, u = t.customerId, c = t.houseId, d = t.appId, h = t.secret, 
                    l = t.shareId, p = s.data.fee, e.next = 4, (0, a.default)("buyCard", {
                        customerId: u,
                        fee: 300,
                        houseId: c,
                        orderSubject: "无锡WIII公寓户型定制入场券",
                        payPlatform: 1,
                        paySource: 1,
                        uniqueCode: i,
                        shareCustomerId: l
                    });

                  case 4:
                    if ((m = e.sent).success) {
                        e.next = 8;
                        break;
                    }
                    return wx.showToast({
                        title: m.message,
                        icon: "none"
                    }), e.abrupt("return");

                  case 8:
                    f = m.single, g = f.nonceStr, I = f.paySign, w = f.prepayId, v = f.signType, P = f.timeStamp, 
                    k = "prepay_id=" + w, wx.requestPayment({
                        timeStamp: P,
                        nonceStr: g,
                        package: k,
                        signType: v,
                        paySign: I,
                        success: function() {
                            wx.showToast({
                                title: "成功",
                                icon: "success",
                                duration: 2e3
                            }), wx.navigateTo({
                                url: "/pages/customCenter/customCenter"
                            });
                        },
                        fail: function() {
                            wx.showToast({
                                title: "支付失败",
                                icon: "fail",
                                duration: 2e3
                            });
                        }
                    }), o ? (0, r.trackRequest)({
                        type: "CLK",
                        clkName: "xiangshoujianmian",
                        clkId: "clk_2cdinzhi_15"
                    }) : (0, r.trackRequest)({
                        type: "CLK",
                        clkName: "zhijiefukuan",
                        clkId: "clk_2cdinzhi_14"
                    });

                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e, s);
        }))();
    },
    menuShare: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var o, s, i, u, d, h, l, p;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return o = e.data, s = o.nickname, i = o.headImage, u = o.houseId, d = o.customerId, 
                    h = e.route, l = c.globalData.shareToken, t.next = 5, (0, a.default)("poster", {
                        head: i,
                        houseId: u,
                        name: s,
                        path: h,
                        scene: l,
                        width: 185,
                        type: 2,
                        xcxName: "无锡WIII"
                    });

                  case 5:
                    p = t.sent, e.setData({
                        doShare: !0,
                        timelineSrc: p.single
                    }), (0, r.trackRequest)({
                        type: "CLK",
                        clkName: "xiangshoujianmian",
                        clkId: "clk_2cdinzhi_15"
                    });

                  case 8:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    onShareAppMessage: function() {
        var e = {
            type: "CLK",
            pvCurPageName: "yudingfuwu",
            pvCurPageParams: "",
            clkId: "clk_2cmina_18",
            clkName: "woyaofenxiang"
        };
        (0, r.trackRequest)(e);
        var t = this.data, a = t.customerId;
        t.hasPay;
        return {
            title: "我邀请你一起来抢限量入场券,享无锡WIII公寓户型定制",
            imageUrl: "https://dm.static.elab-plus.com/wuXiW3/img/share_pay.jpg",
            path: this.route + "?shareId=" + a + "&shareToken=" + c.globalData.shareToken + "&from=customPay",
            success: function() {
                console.log("success");
            }
        };
    },
    onShareFriend: function() {
        console.log("onShareFriend"), this.sharePay();
    },
    onSaveImage: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var a, r;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, o.getSetting)();

                  case 2:
                    if (!(a = t.sent)["scope.writePhotosAlbum"]) {
                        t.next = 6;
                        break;
                    }
                    return e.savePhoto(), t.abrupt("return");

                  case 6:
                    return t.next = 8, (0, o.savePhoneAuth)();

                  case 8:
                    (r = t.sent) ? e.savePhoto() : e.setData({
                        openSetting: !0
                    });

                  case 10:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    handleSetting: function(e) {
        e.detail.detail.authSetting["scope.writePhotosAlbum"] ? (wx.showModal({
            title: "提示",
            content: "您已授权，赶紧将图片保存在相册中吧！",
            showCancel: !1
        }), this.setData({
            openSetting: !1
        })) : (wx.showModal({
            title: "警告",
            content: "若不打开授权，则无法将图片保存在相册中！",
            showCancel: !1
        }), this.setData({
            openSetting: !0
        }));
    },
    savePhoto: function() {
        var e = this, t = this.data, a = t.timelineSrc;
        t.hasPay;
        wx.downloadFile({
            url: a,
            success: function(t) {
                var a = t.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: a,
                    success: function() {
                        wx.showToast({
                            title: "保存成功"
                        }), e.sharePay();
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            }
        });
    },
    sharePay: function() {
        var e = this.data.hasPay;
        this.setData({
            fee: 300,
            doShare: !1
        }), e || this.onPay(null, !0);
    },
    toBargain: function() {
        (0, r.trackRequest)({
            type: "CLK",
            clkName: "kanjiaanniu",
            clkId: "clk_2cmina_66"
        }), wx.navigateTo({
            url: "/pages/customBargain/customBargain?houseId=83"
        });
    },
    onRouteCustom: function() {
        wx.navigateTo({
            url: "/pages/index/index"
        });
    },
    onRouteService: function() {
        wx.navigateTo({
            url: "../counselorList/counselorList"
        });
    }
}, s.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));