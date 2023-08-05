function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function s(n, o) {
                try {
                    var r = t[n](o), i = r.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!r.done) return Promise.resolve(i).then(function(e) {
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

var a = e(require("../../lib/endpoint")), s = e(require("../../lib/runtime")), n = require("../../utils/convertor"), o = require("../../lib/promise"), r = require("../../utils/util"), i = e(require("../../utils/monitor.js")), c = e(require("../../lib/requestConfig")), u = getApp(), d = "https://dm.static.elab-plus.com/wuXiW3/img", l = "";

Page({
    data: {
        cdn: d,
        commentExpand: !1,
        tabSelected: 0,
        doShare: !1,
        canvasHeight: 450,
        canvasWidth: 375,
        customizedStatus: 0
    },
    getCurrentPageParam: function() {
        return l;
    },
    onLoad: function(e) {
        var r = this;
        l = JSON.stringify(e), u.decrypt(e, t(s.default.mark(function t() {
            var i, c, d, l, m, h, p, f, g, I, k, w;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return console.log("3333333", e), i = void 0, c = e.scene, i = c ? u.globalData.layoutId : e.customId, 
                    u.globalData.customId = i, t.next = 7, (0, o.login)();

                  case 7:
                    return d = t.sent, l = d.id, m = d.houseId, h = d.nickname, p = d.headPortrait, 
                    t.next = 11, (0, a.default)("customizedDetail", i, l);

                  case 11:
                    if ((f = t.sent).success) {
                        t.next = 15;
                        break;
                    }
                    return wx.showToast({
                        title: "方案已删除",
                        icon: "none"
                    }), t.abrupt("return");

                  case 15:
                    g = (0, n.customDetailMapper)(f.single), I = l === g.origin.id ? "我" : g.origin.nickName || "用户", 
                    wx.setNavigationBarTitle({
                        title: I + "的方案"
                    }), r.loadImage(g), k = l === g.customerId, w = r.getSpaceIndicatorClass(g), r.setData({
                        houseId: m,
                        customerId: l,
                        customId: i,
                        customDetail: g,
                        isSelf: k,
                        nickname: h,
                        headImage: p,
                        spaceIndicatorClass: w
                    });

                  case 22:
                  case "end":
                    return t.stop();
                }
            }, t, r);
        })));
    },
    getSpaceIndicatorClass: function(e) {
        switch (e.spacePositions) {
          case "1":
            return {
                spacetop: "space11",
                spacebtm: "space12"
            };

          case "2":
            return {
                spacetop: "space21",
                spacebtm: "space22"
            };

          case "3":
            return {
                spacetop: "space31",
                spacebtm: "space32"
            };

          case "4":
            return {
                spacetop: "space41",
                spacebtm: "space42"
            };

          default:
            return {
                spacetop: "space-left-top",
                spacebtm: "space-left-bottom"
            };
        }
    },
    onShow: function() {
        i.default.pageShow(), this.initRankList();
    },
    initRankList: function() {
        var e = this;
        return t(s.default.mark(function t() {
            var i, c, d, l, m, h, p, f, g;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, o.login)();

                  case 2:
                    return i = t.sent, c = i.houseId, d = i.id, t.next = 6, (0, a.default)("rankList", {
                        houseId: c,
                        pageNo: 1,
                        pageSize: 10,
                        customerId: d
                    });

                  case 6:
                    return l = t.sent, m = l.pageModel ? l.pageModel.resultSet : [], m = m.map(n.rankMapper), 
                    t.next = 11, (0, a.default)("customState", {
                        customerId: d,
                        houseId: c
                    });

                  case 11:
                    h = t.sent, p = h.single.customizedStatus, e.setData({
                        rankList: m,
                        customizedStatus: p
                    }), f = {
                        customId: u.globalData.customId
                    }, g = {
                        type: "PV",
                        pvId: "P_2cdinzhi_4",
                        pvCurPageName: "huxingfangan",
                        pvCurPageParams: f.customId ? f : "{}"
                    }, (0, r.trackRequest)(g);

                  case 17:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    switchTab: function(e) {
        var t = e.currentTarget.dataset.id;
        console.log("switchTab", t), this.setData({
            tabSelected: parseInt(t)
        });
    },
    onEdit: function() {
        var e = this.data.customId;
        wx.navigateTo({
            url: "/pages/customHouse/customHouse?update=1&id=" + e
        });
    },
    onSaveImage: function() {
        var e = this;
        return t(s.default.mark(function t() {
            var a, n;
            return s.default.wrap(function(t) {
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
                    (n = t.sent) ? e.savePhoto() : e.setData({
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
        var e = this, t = this.data.timelineSrc;
        wx.downloadFile({
            url: t,
            success: function(t) {
                var a = t.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: a,
                    success: function() {
                        e.setData({
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
        });
    },
    onShareAppMessage: function() {
        var e = this, t = this.data, a = (t.customerId, t.customId), s = "/pages/customDetail/customDetail?customId=" + a + "&shareToken=" + u.globalData.shareToken, n = {
            type: "CLK",
            clkName: "gengduo",
            clkId: "clk_2cdinzhi_0"
        };
        return (0, r.trackRequest)(n), {
            title: "我刚刚在无锡WIII定制了专属house,请你来做客",
            path: s,
            imageUrl: "https://dm.static.elab-plus.com/wuXiW3/img/share_custom.jpg",
            success: function() {
                wx.showToast({
                    title: "分享成功",
                    icon: "success",
                    duration: 2e3
                }), e.setData({
                    doShare: !1
                });
            }
        };
    },
    menuShare: function() {
        var e = this;
        return t(s.default.mark(function t() {
            var n, o, r, i, d, l, m, h, p;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = e.data, o = n.nickname, r = n.headImage, i = n.houseId, d = n.customerId, 
                    l = n.customId, m = {
                        customerId: u.globalData.single.id,
                        houseId: i,
                        userRole: 0,
                        layoutId: l
                    }, t.next = 4, (0, c.default)("sign", m);

                  case 4:
                    return (h = t.sent) && h.success && h.single && (u.globalData.shareToken = h.single), 
                    t.next = 8, (0, a.default)("poster", {
                        head: r,
                        houseId: i,
                        name: o,
                        path: "pages/customDetail/customDetail",
                        scene: u.globalData.shareToken,
                        width: 185,
                        type: 1,
                        xcxName: "无锡WIII"
                    });

                  case 8:
                    p = t.sent, e.setData({
                        doShare: !0,
                        timelineSrc: p.single
                    });

                  case 10:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    onSave: function() {
        var e = this;
        return t(s.default.mark(function t() {
            var n, o, i, c, u;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = e.data, o = n.houseId, i = n.customerId, c = n.customId, t.next = 3, 
                    (0, a.default)("copy", {
                        houseId: o,
                        originId: c,
                        customerId: i
                    });

                  case 3:
                    (u = t.sent).success && (wx.showToast({
                        title: "存入成功",
                        icon: "success",
                        duration: 2e3
                    }), wx.redirectTo({
                        url: "/pages/customCenter/customCenter"
                    })), (0, r.trackRequest)({
                        type: "CLK",
                        clkName: "dingzhicifangan",
                        clkId: "clk_2cdinzhi_28"
                    });

                  case 6:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    onRouteCustom: function() {
        (0, r.trackRequest)({
            type: "CLK",
            clkName: "DIYwodehouse",
            clkId: "clk_2cdinzhi_29"
        }), wx.redirectTo({
            url: "/pages/customHouse/customHouse"
        });
    },
    onRouteService: function() {
        var e = this;
        return t(s.default.mark(function t() {
            return s.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    wx.navigateTo({
                        url: "../counselorList/counselorList"
                    });

                  case 1:
                  case "end":
                    return e.stop();
                }
            }, t, e);
        }))();
    },
    onLikeStar: function(e) {
        var n = this;
        return t(s.default.mark(function t() {
            var o, i, c, u, d, l, m, h, p, f;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return o = e.currentTarget.dataset.id, i = n.data, c = i.customerId, u = i.houseId, 
                    d = i.rankList, l = i.customDetail, m = i.customId, t.next = 4, (0, a.default)("like", {
                        houseId: u,
                        customerId: c,
                        customerProgrammeId: o
                    });

                  case 4:
                    if ((h = t.sent).success) {
                        t.next = 7;
                        break;
                    }
                    return t.abrupt("return");

                  case 7:
                    if (console.log("customDetail", l), o !== m) {
                        t.next = 15;
                        break;
                    }
                    return l.isThumbsUp || (0, r.trackRequest)({
                        type: "CLK",
                        clkName: "dianzan",
                        clkId: "clk_2cdinzhi_21",
                        clkParams: {
                            customId: o
                        }
                    }), p = l.likes.length, l.likes.length = l.isThumbsUp ? p - 1 : p + 1, l.isThumbsUp = !l.isThumbsUp, 
                    n.setData({
                        customDetail: l
                    }), t.abrupt("return");

                  case 15:
                    (f = d.find(function(e) {
                        return e.id === parseInt(o);
                    })).isLike || (0, r.trackRequest)({
                        type: "CLK",
                        clkName: "dianzan",
                        clkId: "clk_2cdinzhi_21",
                        clkParams: {
                            customId: o
                        }
                    }), f.like = f.isLike ? f.like - 1 : f.like + 1, f.isLike = !f.isLike, n.setData({
                        rankList: d
                    });

                  case 20:
                  case "end":
                    return t.stop();
                }
            }, t, n);
        }))();
    },
    onClose: function() {
        this.setData({
            doShare: !1
        });
    },
    toggleExpand: function() {
        var e = this.data.commentExpand;
        this.setData({
            commentExpand: !e
        });
    },
    loadImage: function(e) {
        var a = this;
        return t(s.default.mark(function t() {
            var n, r, i, c, u, d, l, m, h, p, f;
            return s.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = a.data, r = n.canvasHeight, i = n.canvasWidth, c = e.commentImageUrl, 
                    t.next = 4, (0, o.getImageInfo)(c);

                  case 4:
                    u = t.sent, d = u.height, l = u.width, m = u.path, (h = d / r) < l / r && (h = l / i), 
                    p = l / h, f = d / h, a.startX = i / 2 - p / 2, a.startY = r / 2 - f / 2, a.setData({
                        imgWidth: p,
                        imgHeight: f,
                        imgTop: a.startY,
                        imgLeft: a.startX,
                        customImageUrl: c
                    }), a.scaleWidth = p, a.scaleHeight = f, console.log("loadImage", h, a.startX, a.startY, p, f);

                  case 16:
                  case "end":
                    return t.stop();
                }
            }, t, a);
        }))();
    },
    onRouteStar: function() {
        wx.navigateTo({
            url: "/pages/customStars/customStars"
        });
    },
    onRoute3D: function() {
        var e = this.data.customDetail.image3d, t = "/pages/webView/webView?view=" + encodeURIComponent(e);
        wx.navigateTo({
            url: t
        });
    },
    imgOnload: function(e) {
        console.log(e.detail);
        var t = this.data.imgUrlPram;
        t[e.detail.index] = 710 / e.detail.width * e.detail.height, this.setData({
            imgUrlPram: t
        });
    },
    swiperChange: function(e) {
        if ("touch" != e.detail.source) return !1;
        console.log(e.detail.current), this.setData({
            tabSelected: e.detail.current
        });
    }
}, i.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));