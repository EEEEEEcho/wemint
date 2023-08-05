function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function s(n, r) {
                try {
                    var o = t[n](r), i = o.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!o.done) return Promise.resolve(i).then(function(e) {
                    s("next", e);
                }, function(e) {
                    s("throw", e);
                });
                e(i);
            }
            return s("next");
        });
    };
}

var a = e(require("../../lib/endpoint")), s = e(require("../../lib/runtime")), n = require("../../lib/promise"), r = require("../../utils/convertor"), o = require("../../utils/date"), i = require("../../utils/util"), u = e(require("../../lib/requestConfig")), c = e(require("../../utils/monitor.js")), d = "https://dm.static.elab-plus.com/wuXiW3/img", h = getApp(), l = "";

Page({
    data: {
        cdn: d,
        doShare: !1,
        showIntro: !1,
        showProgress: !1,
        showRefund: !1,
        selectedReason: "",
        fee: 600,
        shareCustomId: 0,
        endTime: {
            d: 30,
            h: 12
        },
        showCustomPop: !1,
        openSetting: !1
    },
    getCurrentPageParam: function() {
        return l;
    },
    onLoad: function(e) {
        var r = this;
        return t(s.default.mark(function t() {
            var o, i, u, c, d, f, m, p, g, I, k, w, v, P, x, y, T;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return l = JSON.stringify(e), t.next = 3, (0, n.login)();

                  case 3:
                    return o = t.sent, i = o.houseId, u = o.nickname, c = o.id, d = o.openId, f = o.headPortrait, 
                    m = h.globalData, p = m.appid, g = m.secret, t.next = 8, (0, a.default)("customState", {
                        customerId: c,
                        houseId: i
                    });

                  case 8:
                    I = t.sent, k = I.single, w = k.customizedStatus, v = k.paymentStatus, P = k.customerProgrammeId, 
                    x = 2 === v, y = !w && x, T = [ "我不想要了", "设计不满意", "其他原因" ], r.setData({
                        hasPay: x,
                        refundResons: T,
                        houseId: i,
                        customerId: c,
                        openid: d,
                        nickname: u,
                        headImage: f,
                        appId: p,
                        secret: g,
                        showCustomPop: y
                    }), r.initTicket(), r.initCustomziedList();

                  case 16:
                  case "end":
                    return t.stop();
                }
            }, t, r);
        }))();
    },
    onShow: function() {
        c.default.pageShow(), this.initRankList();
        var e = {
            type: "PV",
            pvId: "P_2cdinzhi_3",
            pvCurPageName: "wodedingzhi"
        };
        (0, i.trackRequest)(e);
    },
    initTicket: function() {
        var e = this;
        return t(s.default.mark(function t() {
            var n, r, i, u, c, d, h, l, f, m, p, g, I, k;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (n = e.data, r = n.hasPay, i = n.customerId, u = n.houseId, !r) {
                        t.next = 8;
                        break;
                    }
                    return t.next = 4, (0, a.default)("ticket", {
                        customerId: i,
                        houseId: u
                    });

                  case 4:
                    c = t.sent, d = c.single, h = d.ticket, l = h.payTime, f = h.ticketViewCode, m = h.fee, 
                    p = h.tradeCode, g = h.process, I = d.customerList, k = e.generateInviteArr(I), 
                    e.setData({
                        payTime: (0, o.formatDateTs)(l),
                        ticketViewCode: f,
                        payFee: m,
                        tradeCode: p,
                        inviteArr: k,
                        inviteList: I,
                        payProcess: g
                    });

                  case 8:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    initCustomziedList: function() {
        var e = this;
        return t(s.default.mark(function t() {
            var n, o, i, u, c;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = e.data, o = n.houseId, i = n.customerId, t.next = 3, (0, a.default)("customizedList", {
                        customerId: i,
                        houseId: o
                    });

                  case 3:
                    u = t.sent, c = u && u.list ? u.list.map(r.customizedMapper) : [], e.setData({
                        customList: c
                    });

                  case 6:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    initRankList: function() {
        var e = this;
        return t(s.default.mark(function t() {
            var o, i, u, c, d;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, n.login)();

                  case 2:
                    return o = t.sent, i = o.houseId, u = o.id, t.next = 6, (0, a.default)("rankList", {
                        houseId: i,
                        pageNo: 1,
                        pageSize: 10,
                        customerId: u
                    });

                  case 6:
                    c = t.sent, d = c.pageModel ? c.pageModel.resultSet : [], d = d.map(r.rankMapper), 
                    e.setData({
                        rankList: d
                    });

                  case 10:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    generateInviteArr: function(e) {
        for (var t = Math.ceil(e.length / 5), a = [], s = 0; s < t; s += 1) a.push(s);
        return a;
    },
    getRestTime: function(e) {
        var t = this.data.detail.createTime, a = Date.now(), s = t + 216e5, n = parseInt((s - a) / 1e3), r = parseInt(n / 3600 % 24), o = parseInt(n / 60 % 60), i = parseInt(n % 60);
        if (r + i + o <= 0) return console.log("timer end", this.timer), clearInterval(this.timer), 
        void (this.timer = null);
        r = this.addZero(r), o = this.addZero(o), i = this.addZero(i), this.setData({
            endTime: {
                h: r,
                m: o,
                s: i
            }
        });
    },
    onReady: function() {
        var e = this;
        return t(s.default.mark(function t() {
            var a;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    a = e.data.houseId;

                  case 1:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    changePay: function() {
        var e = this;
        return t(s.default.mark(function t() {
            var n, r, i, u, c, d, h, l, f, m, p, g, I;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = e.data, r = n.customerId, i = n.houseId, t.next = 3, (0, a.default)("ticket", {
                        customerId: r,
                        houseId: i
                    });

                  case 3:
                    u = t.sent, c = u.single, d = c.ticket, h = d.payTime, l = d.ticketViewCode, f = d.fee, 
                    m = d.tradeCode, p = d.process, g = c.customerList, I = e.generateInviteArr(g), 
                    e.setData({
                        payTime: (0, o.formatDateTs)(h),
                        ticketViewCode: l,
                        payFee: f,
                        tradeCode: m,
                        inviteList: g,
                        payProcess: p,
                        inviteArr: I
                    });

                  case 7:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    onShareAppMessage: function() {
        var e = this, t = {
            type: "CLK",
            pvCurPageName: "wodedingzhi",
            pvCurPageParams: "",
            clkId: "clk_2cmina_18",
            clkName: "woyaofenxiang"
        };
        (0, i.trackRequest)(t);
        var a = this.data, s = a.customerId, n = a.hasPay, r = a.shareCustomId, o = d + "/share_custom.jpg";
        return console.log("shareCustomId", r), r ? {
            imageUrl: o,
            title: "我刚刚在无锡WIII定制了专属house,请你来做客",
            path: "/pages/customDetail/customDetail?customId=" + r + "&shareToken=" + h.globalData.shareToken,
            success: function() {
                wx.showToast({
                    title: "分享成功",
                    icon: "success",
                    duration: 2e3
                }), e.setData({
                    doShare: !1,
                    shareCustomId: 0
                });
            }
        } : (o = d + "/share_pay.jpg", setTimeout(function() {
            n || e.onSharePay(), e.setData({
                doShare: !1
            });
        }, 2e3), {
            title: "我邀请你一起来抢限量入场券,享无锡WIII公寓户型定制",
            imageUrl: o,
            path: "/pages/customPay/customPay?shareId=" + s + "&shareToken=" + h.globalData.shareToken + "&from=customCenter"
        });
    },
    showIntro: function() {
        this.setData({
            showIntro: !0
        });
    },
    hideIntro: function() {
        this.setData({
            showIntro: !1
        });
    },
    didShowProgress: function() {
        var e = this;
        return t(s.default.mark(function t() {
            var n, o, u, c, d;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = e.data, o = n.customerId, u = n.houseId, t.next = 3, (0, a.default)("customStatus", {
                        customerId: o,
                        houseId: u
                    });

                  case 3:
                    c = t.sent, d = c.single.processList.map(r.processMapper), e.setData({
                        showProgress: !0,
                        progress: d
                    }), (0, i.trackRequest)({
                        type: "CLK",
                        clkName: "chakanxiangqing",
                        clkId: "clk_2cdinzhi_23"
                    });

                  case 7:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    onRefund: function() {
        (0, i.trackRequest)({
            type: "CLK",
            clkName: "shenqingtuikuan",
            clkId: "clk_2cdinzhi_24"
        }), this.setData({
            showProgress: !1,
            showRefund: !0
        });
    },
    selectReason: function(e) {
        this.setData({
            selectedReason: e.currentTarget.dataset.id
        });
    },
    didRefund: function() {
        var e = this;
        return t(s.default.mark(function t() {
            var n, r, o, i, u, c, d, h;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = e.data, r = n.customerId, o = n.houseId, i = n.payFee, u = n.tradeCode, 
                    c = n.refundResons, d = n.selectedReason, t.next = 3, (0, a.default)("refund", {
                        customerId: r,
                        houseId: o,
                        payPlatform: 1,
                        refundFee: i,
                        tradeCode: u,
                        refundReason: c[d]
                    });

                  case 3:
                    (h = t.sent).success ? (wx.showToast({
                        title: "退款成功",
                        icon: "success"
                    }), e.setData({
                        hasPay: !1
                    })) : wx.showToast({
                        title: "退款失败,请稍后重试！",
                        icon: "success"
                    }), e.setData({
                        showRefund: !1
                    });

                  case 6:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    cancelRefund: function() {
        this.setData({
            showRefund: !1
        });
    },
    onPay: function(e) {
        var n = this, r = e.isShare;
        return t(s.default.mark(function e() {
            var o, i, u, c, d, h, l, f, m, p, g, I, k, w, v;
            return s.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return o = n.data, i = o.openid, u = o.customerId, c = o.houseId, d = o.appId, h = o.secret, 
                    l = o.fee, e.next = 3, (0, a.default)("buyCard", {
                        customerId: u,
                        fee: r ? 300 : 600,
                        houseId: c,
                        orderSubject: "无锡WIII公寓户型定制入场券",
                        payPlatform: 1,
                        paySource: 1,
                        uniqueCode: i
                    });

                  case 3:
                    if ((f = e.sent).success) {
                        e.next = 7;
                        break;
                    }
                    return wx.showToast({
                        title: f.message,
                        icon: "none"
                    }), e.abrupt("return");

                  case 7:
                    m = f.single, p = m.nonceStr, g = m.paySign, I = m.prepayId, k = m.signType, w = m.timeStamp, 
                    v = "prepay_id=" + I, wx.requestPayment({
                        timeStamp: w,
                        nonceStr: p,
                        package: v,
                        signType: k,
                        paySign: g,
                        success: function() {
                            var e = t(s.default.mark(function e() {
                                return s.default.wrap(function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                      case 0:
                                        return wx.showToast({
                                            title: "支付成功",
                                            icon: "success"
                                        }), console.log("支付成功"), e.next = 4, n.changePay();

                                      case 4:
                                        n.setData({
                                            hasPay: !0
                                        });

                                      case 5:
                                      case "end":
                                        return e.stop();
                                    }
                                }, e, n);
                            }));
                            return function() {
                                return e.apply(this, arguments);
                            };
                        }(),
                        fail: function() {
                            wx.showToast({
                                title: "支付失败",
                                icon: "none"
                            });
                        }
                    });

                  case 10:
                  case "end":
                    return e.stop();
                }
            }, e, n);
        }))();
    },
    onSaveImage: function() {
        var e = this;
        return t(s.default.mark(function t() {
            var a, r;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, n.getSetting)();

                  case 2:
                    if (!(a = t.sent)["scope.writePhotosAlbum"]) {
                        t.next = 6;
                        break;
                    }
                    return e.savePhoto(), t.abrupt("return");

                  case 6:
                    return t.next = 8, (0, n.savePhoneAuth)();

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
        var e = this, t = this.data, a = t.timelineSrc, s = t.hasPay, n = t.shareCustomId;
        a ? wx.downloadFile({
            url: a,
            success: function(t) {
                var a = t.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: a,
                    success: function() {
                        s || n || e.onSharePay(), e.setData({
                            doShare: !1
                        }), wx.showToast({
                            title: "保存成功"
                        });
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            }
        }) : wx.showToast({
            title: "生成朋友圈海报失败",
            icon: "none"
        });
    },
    menuShare: function() {
        var e = this;
        return t(s.default.mark(function t() {
            var n, r, o, i, u, c;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = e.data, r = n.nickname, o = n.headImage, i = n.houseId, u = n.customerId, 
                    t.next = 3, (0, a.default)("poster", {
                        head: o || "",
                        houseId: i,
                        name: r || "",
                        path: "pages/customPay/customPay",
                        scene: h.globalData.shareToken,
                        width: 185,
                        type: 2,
                        xcxName: "无锡WIII"
                    });

                  case 3:
                    c = t.sent, e.setData({
                        doShare: !0,
                        timelineSrc: c.single
                    });

                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    onSharePay: function() {
        this.setData({
            fee: 300,
            doShare: !1
        }), this.onPay({
            isShare: !0
        });
    },
    createCustom: function() {
        (0, i.trackRequest)({
            type: "CLK",
            clkName: "xinjianfengan",
            clkId: "clk_2cdinzhi_18"
        });
        wx.navigateTo({
            url: "/pages/customHouse/customHouse?create=1"
        });
    },
    onEdit: function(e) {
        var t = "/pages/customHouse/customHouse?update=1&id=" + e.currentTarget.dataset.id;
        wx.navigateTo({
            url: t
        }), (0, i.trackRequest)({
            type: "CLK",
            clkName: "bianji",
            clkId: "clk_2cdinzhi_19"
        });
    },
    onShare: function(e) {
        var n = this;
        return t(s.default.mark(function t() {
            var r, o, c, d, l, f, m, p;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return r = e.currentTarget.dataset.id, o = n.data, c = o.nickname, d = o.headImage, 
                    l = o.houseId, f = {
                        customerId: h.globalData.single.id,
                        houseId: l,
                        userRole: 0,
                        layoutId: r
                    }, t.next = 5, (0, u.default)("sign", f);

                  case 5:
                    return (m = t.sent) && m.success && m.single && (h.globalData.shareToken = m.single), 
                    t.next = 9, (0, a.default)("poster", {
                        head: d,
                        houseId: l,
                        name: c,
                        path: "pages/customDetail/customDetail",
                        scene: h.globalData.shareToken,
                        width: 185,
                        type: 1,
                        xcxName: "无锡WIII"
                    });

                  case 9:
                    p = t.sent, n.setData({
                        shareCustomId: r,
                        doShare: !0,
                        timelineSrc: p.single
                    }), (0, i.trackRequest)({
                        type: "CLK",
                        clkName: "fenxiang",
                        clkId: "clk_2cdinzhi_20"
                    });

                  case 12:
                  case "end":
                    return t.stop();
                }
            }, t, n);
        }))();
    },
    closePopup: function() {
        this.setData({
            showProgress: !1
        });
    },
    closeCustomPopup: function() {
        this.setData({
            showCustomPop: !1
        });
    },
    onRouteCustom: function() {
        wx.navigateTo({
            url: "/pages/customHouse/customHouse?fromCenter=1"
        });
    },
    onRouteDetail: function(e) {
        var t = "/pages/customDetail/customDetail?customId=" + e.detail.index;
        wx.navigateTo({
            url: t
        });
    },
    onLike: function(e) {
        var n = this;
        return t(s.default.mark(function t() {
            var r, o, u, c, d, h, l, f;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return r = e.currentTarget.dataset.id, o = n.data, u = o.customerId, c = o.houseId, 
                    d = o.customerProgrammeId, h = o.customList, t.next = 4, (0, a.default)("like", {
                        houseId: c,
                        customerId: u,
                        customerProgrammeId: r
                    });

                  case 4:
                    l = t.sent, (f = h.find(function(e) {
                        return e.id === parseInt(r);
                    })).isLike || (0, i.trackRequest)({
                        type: "CLK",
                        clkName: "dianzan",
                        clkId: "clk_2cdinzhi_21",
                        clkParams: {
                            customId: r
                        }
                    }), f.like = f.isLike ? f.like - 1 : f.like + 1, f.isLike = !f.isLike, n.setData({
                        customList: h
                    }), e.stopPropagation && e.stopPropagation();

                  case 11:
                  case "end":
                    return t.stop();
                }
            }, t, n);
        }))();
    },
    onLikeStar: function(e) {
        var n = this;
        return t(s.default.mark(function t() {
            var r, o, u, c, d, h, l, f;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return r = e.currentTarget.dataset.id, o = n.data, u = o.customerId, c = o.houseId, 
                    d = o.customerProgrammeId, h = o.rankList, t.next = 4, (0, a.default)("like", {
                        houseId: c,
                        customerId: u,
                        customerProgrammeId: r
                    });

                  case 4:
                    if ((l = t.sent).success) {
                        t.next = 7;
                        break;
                    }
                    return t.abrupt("return");

                  case 7:
                    (f = h.find(function(e) {
                        return e.id === parseInt(r);
                    })).isLike || (0, i.trackRequest)({
                        type: "CLK",
                        clkName: "dianzan",
                        clkId: "clk_2cdinzhi_21",
                        clkParams: {
                            customId: r
                        }
                    }), f.like = f.isLike ? f.like - 1 : f.like + 1, f.isLike = !f.isLike, n.setData({
                        rankList: h
                    }), e.stopPropagation && e.stopPropagation();

                  case 13:
                  case "end":
                    return t.stop();
                }
            }, t, n);
        }))();
    },
    touchstart: function(e) {
        var t = this.data.customList;
        t.forEach(function(e, t) {
            e.isTouchMove && (e.isTouchMove = !1);
        }), this.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
            customList: t
        });
    },
    touchmove: function(e) {
        var t = this, a = e.currentTarget.dataset.index, s = t.data.startX, n = t.data.startY, r = e.changedTouches[0].clientX, o = e.changedTouches[0].clientY, i = t.angle({
            X: s,
            Y: n
        }, {
            X: r,
            Y: o
        }), u = this.data.customList;
        u.forEach(function(e, t) {
            e.isTouchMove = !1, Math.abs(i) > 30 || t == a && (e.isTouchMove = !(r > s));
        }), t.setData({
            customList: u
        });
    },
    angle: function(e, t) {
        var a = t.X - e.X, s = t.Y - e.Y;
        return 360 * Math.atan(s / a) / (2 * Math.PI);
    },
    onDelete: function(e) {
        var t = this;
        wx.showModal({
            title: "是否删除方案",
            content: "友情提示:删除后该方案的信息(包括排名,点赞数将不被保留)",
            cancelText: "是",
            cancelColor: "#9B9B9B",
            confirmText: "否",
            confirmColor: "#9B9B9B",
            success: function(a) {
                a.cancel ? t.didDelete(e) : t.restore(e);
            }
        }), (0, i.trackRequest)({
            type: "CLK",
            clkName: "youhuashancha",
            clkId: "clk_2cdinzhi_25",
            clkParams: {
                customId: e.currentTarget.dataset.id
            }
        });
    },
    restore: function(e) {
        var t = e.currentTarget.dataset.id, a = this.data.customList;
        a.forEach(function(e) {
            e.id === parseInt(t) && (e.isTouchMove = !1);
        }), this.setData({
            customList: a
        });
    },
    didDelete: function(e) {
        var t = this.data, s = t.houseId, n = t.customList, r = e.currentTarget.dataset.id;
        (0, a.default)("delCustom", {
            houseId: s,
            id: r,
            status: -1
        });
        var o = n.filter(function(e) {
            return e.id !== parseInt(r);
        });
        this.setData({
            customList: o
        });
    },
    onClose: function() {
        this.setData({
            doShare: !1
        });
    },
    showActivityPop: function() {
        this.setData({
            showPopup: !this.data.showPopup
        });
    },
    onRouteStar: function() {
        (0, i.trackRequest)({
            type: "CLK",
            clkName: "chakangengduo",
            clkId: "clk_2cdinzhi_22"
        }), wx.navigateTo({
            url: "/pages/customStars/customStars"
        });
    },
    onPhoneCall: function() {
        wx.makePhoneCall({
            phoneNumber: "13917075714"
        });
    }
}, c.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));