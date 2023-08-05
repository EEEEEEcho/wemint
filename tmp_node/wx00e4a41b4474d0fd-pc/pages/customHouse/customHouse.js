function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function n(s, r) {
                try {
                    var c = t[s](r), o = c.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!c.done) return Promise.resolve(o).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(o);
            }
            return n("next");
        });
    };
}

var a = e(require("../../lib/endpoint")), n = e(require("../../lib/runtime")), s = require("../../utils/convertor"), r = require("../../lib/promise"), c = e(require("../../utils/monitor.js")), o = require("../../utils/util"), i = (getApp(), 
"");

Page({
    data: {
        selectedType: null,
        spaceNames: {},
        customStep: 1,
        popup: !1,
        guide: !1,
        houseTypeUpdate: !1,
        spaceEdit: !1,
        commentMode: !1,
        drawMode: !1,
        commentList: [],
        inputComment: "",
        coverTip: 1,
        cdn: "https://dm.static.elab-plus.com/wuXiW3/img",
        commentExpand: !1,
        canvasHeight: 450,
        canvasWidth: 375,
        lineWidth: 2,
        lineColor: "#FFA546"
    },
    getCurrentPageParam: function() {
        return i;
    },
    onLoad: function(e) {
        var c = this;
        return t(n.default.mark(function t() {
            var o, u, d, l, m, p, h, f, g, v, I, y, x, w, T, k, D, S, P, C, b, z, L, U;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return console.log("onLoad", e), i = JSON.stringify(e), t.next = 4, (0, r.login)();

                  case 4:
                    return o = t.sent, u = o.id, d = o.houseId, l = e.update, m = e.create, p = e.id, 
                    h = e.fromCenter, t.next = 9, (0, a.default)("customState", {
                        customerId: u,
                        houseId: d
                    });

                  case 9:
                    if (f = t.sent, g = f.single, v = g.customizedStatus, I = g.paymentStatus, y = g.customerProgrammeId, 
                    x = g.customerSupplementStatus, w = l ? p : y, T = !v && y, k = T || l, D = 2 === I, 
                    S = v, !(P = S && !l && !m && !h)) {
                        t.next = 20;
                        break;
                    }
                    return wx.redirectTo({
                        url: "/pages/customCenter/customCenter"
                    }), t.abrupt("return");

                  case 20:
                    if (C = {
                        houseId: d,
                        customerId: u,
                        customizedStatus: v,
                        customerProgrammeId: w
                    }, console.log("customizedId", w), !k) {
                        t.next = 30;
                        break;
                    }
                    return t.next = 25, (0, a.default)("customizedDetail", w);

                  case 25:
                    b = t.sent, z = (0, s.customDetailMapper)(b.single), L = {
                        layoutId: z.layoutId,
                        name: z.name,
                        area: z.area
                    }, console.log("customizedDetail", z), Object.assign(C, {
                        customStep: 2,
                        customDetail: z,
                        selectedType: L,
                        commentList: z.comments,
                        spaceIndicatorClass: c.getSpaceIndicatorClass(z)
                    });

                  case 30:
                    return t.next = 32, (0, a.default)("customList", d);

                  case 32:
                    U = t.sent, Object.assign(C, {
                        houseTypes: U.list.map(s.houseTypesMapper),
                        customerSupplementStatus: x
                    }), c.setData(C), c.showGuide() && c.setData({
                        popup: !0,
                        guide: !0
                    });

                  case 36:
                  case "end":
                    return t.stop();
                }
            }, t, c);
        }))();
    },
    showGuide: function() {
        var e = wx.getStorageSync("CUSTOM_POP_UP"), t = this.data.customizedStatus;
        return !e && !t;
    },
    touchmove: function() {
        return !1;
    },
    onShow: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var a;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    c.default.pageShow(), a = {
                        type: "PV",
                        pvId: "P_2cdinzhi_0",
                        pvCurPageName: "huxingdingzhi"
                    }, (0, o.trackRequest)(a);

                  case 3:
                  case "end":
                    return e.stop();
                }
            }, t, e);
        }))();
    },
    onSelect: function(e) {
        if (e) {
            var t = (e.detail && e.detail.currentTarget ? e.detail : e).currentTarget.dataset.type, a = this.data.houseTypes.find(function(e) {
                return e.id === t;
            });
            this.setData({
                selectedType: a
            });
        }
    },
    isOperating: function() {
        var e = this.data, t = e.commentMode, a = e.drawMode;
        return t || a;
    },
    onHouseTypeUpdate: function() {
        this.isOperating() || ((0, o.trackRequest)({
            type: "CLK",
            clkName: "qiehuanfangan",
            clkId: "clk_2cdinzhi_3"
        }), this.setData({
            houseTypeUpdate: !0,
            preHouseType: this.data.selectedType
        }));
    },
    onStep: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var s, r, c;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (e.data.selectedType) {
                        t.next = 2;
                        break;
                    }
                    return t.abrupt("return");

                  case 2:
                    return t.next = 4, (0, a.default)("customDetail", {
                        customizedLayoutId: e.data.selectedType.layoutId,
                        houseId: e.data.houseId,
                        customerId: e.data.customerId
                    });

                  case 4:
                    (s = t.sent).single.originUrl = s.single.image3dPlane, r = s.single || {}, c = r.customizedLayout, 
                    e.setData({
                        customStep: 2,
                        customDetail: s.single,
                        customerProgrammeId: s.single.customerProgrammeId,
                        customizedProgrammeId: s.single.id,
                        spaceIndicatorClass: e.getSpaceIndicatorClass(c)
                    }), (0, o.trackRequest)({
                        type: "CLK",
                        clkName: "xiayibu",
                        clkId: "clk_2cdinzhi_2",
                        clkParams: {
                            selectedType: e.data.selectedType.layoutId
                        }
                    });

                  case 9:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
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
    onKnown: function() {
        wx.setStorageSync("CUSTOM_POP_UP", 1), this.setData({
            popup: !1
        });
    },
    onCoverTip: function(e) {
        if (e) {
            var t = e.currentTarget.dataset.step, a = t > 3 ? 0 : +t + 1;
            this.setData({
                coverTip: a
            });
        }
    },
    onHouseTypeDidUpdate: function(e) {
        var s = this;
        return t(n.default.mark(function t() {
            var r, c, i, u, d, l, m, p, h, f;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (r = e.detail.update, c = {
                        houseTypeUpdate: !1
                    }, i = {
                        type: "CLK"
                    }, !r) {
                        t.next = 15;
                        break;
                    }
                    return u = s.data, d = u.houseId, l = u.customerId, m = u.customerProgrammeId, t.next = 7, 
                    (0, a.default)("customDetail", {
                        houseId: d,
                        customerId: l,
                        customerProgrammeId: m,
                        customizedLayoutId: s.data.selectedType.layoutId
                    });

                  case 7:
                    (p = t.sent).single.originUrl = p.single.image3dPlane, h = p.single || {}, f = h.customizedLayout, 
                    Object.assign(c, {
                        customDetail: p.single,
                        customizedProgrammeId: p.single.id,
                        spaceIndicatorClass: s.getSpaceIndicatorClass(f)
                    }), Object.assign(i, {
                        clkName: "querenxaunzehuxing",
                        clkId: "clk_2cdinzhi_7",
                        clkParams: {
                            selectedType: s.data.selectedType.layoutId
                        }
                    }), (0, o.trackRequest)(i), t.next = 16;
                    break;

                  case 15:
                    Object.assign(c, {
                        selectedType: s.data.preHouseType
                    });

                  case 16:
                    s.setData(c);

                  case 17:
                  case "end":
                    return t.stop();
                }
            }, t, s);
        }))();
    },
    editSpace: function(e) {
        var r = this;
        return t(n.default.mark(function t() {
            var c, i, u, d, l, m, p, h, f;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (!r.isOperating()) {
                        t.next = 2;
                        break;
                    }
                    return t.abrupt("return");

                  case 2:
                    return (0, o.trackRequest)({
                        type: "CLK",
                        clkName: "bianhuankongjian",
                        clkId: "clk_2cdinzhi_5"
                    }), c = e.currentTarget.dataset.space, i = r.data, u = i.customDetail, d = i.houseId, 
                    l = i.spaceNames, m = i.selectedType, t.next = 7, (0, a.default)("spaceList", {
                        houseId: d,
                        customizedLayoutId: m.layoutId
                    });

                  case 7:
                    p = t.sent, h = p.list.map(s.spaceTypeMapper), f = h.find(function(e) {
                        return e.id === c.spaceTypeId;
                    }), h.forEach(function(e) {
                        e.id === c.spaceTypeId && (e.selected = !0), e.subTypes.forEach(function(t) {
                            var a = u.spaces.find(function(e) {
                                return e.spaceTypeId === t.spaceTypeId;
                            });
                            t.id === a.id && (t.selected = !0, l[e.id] = t.name);
                        });
                    }), r.setData({
                        spaceEdit: !0,
                        spaceTypes: h,
                        spaceNames: l,
                        selectedSpace: f
                    });

                  case 12:
                  case "end":
                    return t.stop();
                }
            }, t, r);
        }))();
    },
    onSelectSpaceChange: function(e) {
        var t = (e.detail && e.detail.currentTarget ? e.detail : e).currentTarget.dataset.type, a = this.data.spaceTypes, n = a.find(function(e) {
            return e.id === t;
        });
        a.forEach(function(e) {
            e.selected = e.id === t;
        }), this.setData({
            spaceTypes: a,
            selectedSpace: n
        });
    },
    onSelectSubSpaceChange: function(e) {
        var t = (e.detail && e.detail.currentTarget ? e.detail : e).currentTarget.dataset.type, a = this.data, n = a.selectedSpace, s = a.spaceTypes, r = a.spaceNames, c = s.find(function(e) {
            return e.id === n.id;
        });
        c.subTypes.forEach(function(e) {
            e.selected = e.id === t;
        });
        var o = c.subTypes.find(function(e) {
            return e.id === t;
        });
        r[n.id] = o.name, this.setData({
            selectedSpace: c,
            spaceNames: r
        });
    },
    onSpaceDidUpdate: function(e) {
        var s = this;
        return t(n.default.mark(function t() {
            var r, c, i, u, d, l, m, p, h, f;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (r = s.data, c = r.customerProgrammeId, i = r.houseId, u = r.customerId, d = e.detail.update, 
                    l = {
                        spaceEdit: !1
                    }, m = {
                        type: "CLK"
                    }, !d) {
                        t.next = 15;
                        break;
                    }
                    return p = [], s.data.spaceTypes.forEach(function(e) {
                        e.subTypes.forEach(function(e) {
                            e.selected && p.push(e.id);
                        });
                    }), h = p.join("_"), t.next = 10, (0, a.default)("customDetail", {
                        customerProgrammeId: c,
                        spaceIds: h,
                        houseId: i,
                        customerId: u,
                        customizedLayoutId: s.data.selectedType.layoutId
                    });

                  case 10:
                    (f = t.sent).single.originUrl = f.single.image3dPlane, Object.assign(l, {
                        customDetail: f.single,
                        customizedProgrammeId: f.single.id
                    }), Object.assign(m, {
                        clkName: "querenxaunzekongjian",
                        clkId: "clk_2cdinzhi_11",
                        clkParams: {
                            selectedLayoutId: f.single.id
                        }
                    }), (0, o.trackRequest)(m);

                  case 15:
                    s.setData(l);

                  case 16:
                  case "end":
                    return t.stop();
                }
            }, t, s);
        }))();
    },
    onComment: function() {
        var e = this.data.commentMode, t = {
            commentMode: !e
        };
        e && Object.assign(t, {
            commentExpand: !1
        }), this.setData(t), (0, o.trackRequest)({
            type: "CLK",
            clkName: e ? "tuchupinglun" : "tianjiapinglun",
            clkId: e ? "clk_2cdinzhi_10" : "clk_2cdinzhi_6"
        });
    },
    sendComment: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var s, r, c, i, u, d, l, m;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (s = e.data.inputComment, !(s = s.trim()).length) {
                        t.next = 10;
                        break;
                    }
                    return r = e.data, c = r.commentList, i = r.customerId, u = r.customerProgrammeId, 
                    d = r.houseId, t.next = 6, (0, a.default)("addComment", {
                        customerId: i,
                        commentText: s,
                        customerProgrammeId: u,
                        houseId: d,
                        orderNo: 1
                    });

                  case 6:
                    l = t.sent, m = {
                        id: l.id,
                        commentText: s
                    }, c.unshift(m), e.setData({
                        commentList: c,
                        inputComment: ""
                    });

                  case 10:
                    (0, o.trackRequest)({
                        type: "CLK",
                        clkName: "fasongpinglun",
                        clkId: "clk_2cdinzhi_9",
                        clkParams: {
                            commentText: s
                        }
                    });

                  case 11:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    bindKeyInput: function(e) {
        var t = e.detail.value;
        t.length && (t = t.trim(), this.setData({
            inputComment: t,
            commentExpand: !0
        }));
    },
    focusEvent: function(e) {
        this.setData({
            commentExpand: !0
        });
    },
    delComment: function(e) {
        var s = this;
        return t(n.default.mark(function t() {
            var r, c, o, i, u, d, l;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (console.log(s.data.commentMode), s.data.commentMode) {
                        t.next = 3;
                        break;
                    }
                    return t.abrupt("return");

                  case 3:
                    r = e.currentTarget.dataset, c = r.index, o = r.id, i = s.data, u = i.commentList, 
                    d = i.customerId, l = i.houseId, u.splice(c, 1), (0, a.default)("updateComment", {
                        customerId: d,
                        customerProgrammeId: 0,
                        houseId: l,
                        id: o,
                        status: -1
                    }), s.setData({
                        commentList: u
                    });

                  case 8:
                  case "end":
                    return t.stop();
                }
            }, t, s);
        }))();
    },
    onSaveCustom: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var s, r, c, i, u, d;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return s = e.data, r = s.customerProgrammeId, c = s.drawUrl, i = s.customizedProgrammeId, 
                    u = s.customerSupplementStatus, t.next = 3, (0, a.default)("saveCustom", {
                        commentImageUrl: c,
                        customerId: e.data.customerId,
                        customizedProgrammeId: i,
                        houseId: e.data.houseId,
                        id: r,
                        customizedStatus: 1
                    });

                  case 3:
                    d = t.sent, console.log("onSaveCustom", d, u), d.success && (u ? wx.navigateTo({
                        url: "/pages/customCenter/customCenter"
                    }) : wx.navigateTo({
                        url: "/pages/person-info/person-info"
                    })), (0, o.trackRequest)({
                        type: "CLK",
                        clkName: "tijiaofangan",
                        clkId: "clk_2cdinzhi_4"
                    });

                  case 7:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    toggleExpand: function() {
        var e = this.data.commentExpand;
        this.setData({
            commentExpand: !e
        });
    },
    onPreview: function() {
        if (!this.isOperating()) {
            var e = this.data.customDetail.imageUrl;
            wx.previewImage({
                urls: [ e ],
                current: e
            });
        }
    },
    onDraw: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var a, s, c, o, i, u, d, l, m, p, h, f, g, v;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (e.setData({
                        drawMode: !0
                    }), !e.data.commentMode) {
                        t.next = 3;
                        break;
                    }
                    return t.abrupt("return");

                  case 3:
                    return a = e.data, s = a.customDetail.image3dPlane, c = a.canvasHeight, o = a.canvasWidth, 
                    t.next = 6, (0, r.getImageInfo)(s);

                  case 6:
                    i = t.sent, u = i.height, d = i.width, l = i.path, (m = u / c) < d / c && (m = d / o), 
                    f = -(p = d / m) / 2, g = -(h = u / m) / 2, console.log("scaleWidth", p), console.log("scaleHeight", h), 
                    (v = wx.createCanvasContext("draw")).translate(o / 2, c / 2), v.drawImage(l, f, g, p, h), 
                    v.draw(), e.ctx = v, e.scaleWidth = p, e.scaleHeight = h, e.startX = f, e.startY = g, 
                    console.log("canvas", m, f, g, p, h);

                  case 26:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    drawStart: function(e) {
        var t = this, a = this.data, n = a.canvasHeight, s = a.canvasWidth, r = a.lineWidth, c = a.lineColor;
        t.lineWidth = r, t.lineColor = c, t.doodleStartX = e.touches[0].x - s / 2, t.doodleStartY = e.touches[0].y - n / 2;
    },
    drawMove: function(e) {
        var t = this;
        t.doodled = !0;
        var a = this.data, n = a.canvasHeight, s = a.canvasWidth;
        t.ctx.setStrokeStyle(t.lineColor), t.ctx.setLineWidth(t.lineWidth), t.ctx.setLineCap("round"), 
        t.ctx.setLineJoin("round"), t.ctx.moveTo(t.doodleStartX, t.doodleStartY), t.ctx.lineTo(e.touches[0].x - s / 2, e.touches[0].y - n / 2), 
        t.ctx.stroke(), t.ctx.draw(!0), t.doodleStartX = e.touches[0].x - s / 2, t.doodleStartY = e.touches[0].y - n / 2;
    },
    onSaveDraw: function() {
        this.saveDraw(), this.setData({
            drawMode: !1
        });
    },
    saveDraw: function() {
        var e = this, s = this, c = this.startX, o = this.startY, i = this.scaleHeight, u = this.scaleWidth, d = this.data, l = d.canvasHeight, m = d.canvasWidth, p = d.customDetail;
        console.log("save", m / 2 + c, l / 2 + o, i, u), wx.canvasToTempFilePath({
            x: m / 2 + c,
            y: l / 2 + o,
            width: u,
            height: i,
            canvasId: "draw",
            success: function() {
                var c = t(n.default.mark(function t(c) {
                    var o, i, u, d, l, m;
                    return n.default.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return console.log("res", c.tempFilePath), p.image3dPlane = c.tempFilePath, s.setData({
                                customDetail: p
                            }), e.next = 5, (0, a.default)("getUploadToken");

                          case 5:
                            return o = e.sent, i = o.single, u = i.token, d = i.resultUrl, e.next = 9, (0, r.uploadImageFiles)(u, c.tempFilePath);

                          case 9:
                            l = e.sent, console.log("qnkey", l), m = "" + d + l, console.log("drawUrl", m), 
                            s.setData({
                                drawUrl: m
                            });

                          case 14:
                          case "end":
                            return e.stop();
                        }
                    }, t, e);
                }));
                return function(e) {
                    return c.apply(this, arguments);
                };
            }()
        });
    },
    loadImage: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var a, s, c, o, i, u, d, l, m, p, h;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return a = e.data, s = a.customDetail.image3dPlane, c = a.canvasHeight, o = a.canvasWidth, 
                    t.next = 3, (0, r.getImageInfo)(s);

                  case 3:
                    i = t.sent, u = i.height, d = i.width, l = i.path, (m = u / c) < d / c && (m = d / o), 
                    p = d / m, h = u / m, e.startX = o / 2 - p / 2, e.startY = c / 2 - h / 2, e.setData({
                        imgWidth: p,
                        imgHeight: h,
                        imgTop: e.startY,
                        imgLeft: e.startX
                    }), e.scaleWidth = p, e.scaleHeight = h, console.log("loadImage", m, e.startX, e.startY, p, h);

                  case 15:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    resetDraw: function() {
        var e = this.data.customDetail;
        console.log("resetDraw", e.image3dPlane, e.originUrl), e.image3dPlane = e.originUrl, 
        this.setData({
            customDetail: e
        }), this.onDraw();
    },
    seePlain: function() {
        var e = this.data.customDetail.imageUrl;
        wx.previewImage({
            urls: [ e ],
            current: e
        });
    },
    onRouteTheme: function() {
        var e = this.data, t = e.houseId, a = e.layoutId, n = "/pages/customTheme/customTheme?houseId=" + t + "&layoutId=" + (void 0 === a ? 115 : a);
        wx.navigateTo({
            url: n
        });
    },
    onRoute3D: function() {
        var e = this.data.customDetail.image3d, t = "/pages/webView/webView?view=" + encodeURIComponent(e);
        wx.navigateTo({
            url: t
        });
    },
    onClosePickUp: function() {
        this.setData({
            houseTypeUpdate: !1,
            spaceEdit: !1
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