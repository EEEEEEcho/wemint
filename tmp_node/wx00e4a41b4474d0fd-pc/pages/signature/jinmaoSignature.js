function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function a(i, c) {
                try {
                    var o = t[i](c), r = o.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void n(e);
                }
                if (!o.done) return Promise.resolve(r).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(r);
            }
            return a("next");
        });
    };
}

var n = e(require("../../lib/runtime")), a = e(require("../../lib/requestConfig")), i = e(require("../../lib/endpoint")), c = require("../../lib/promise"), o = require("../../utils/promisify.js"), r = require("../../utils/util.js"), s = getApp(), u = "", l = null, d = !1, g = [], h = [], m = [], f = 0, v = 0;

wx.getSystemInfo({
    success: function(e) {
        f = e.windowWidth, v = e.windowHeight;
    }
}), Page({
    data: {
        backImageUrl: "https://dm.static.elab-plus.com/JinmaoQ/jinmaoSignature.png",
        isHide: !1,
        activity: {}
    },
    canvasIdErrorCallback: function(e) {
        console.error(e.detail.errMsg);
    },
    canvasStart: function(e) {
        d = !0, m.push(0), g.push(e.changedTouches[0].x), h.push(e.changedTouches[0].y);
    },
    canvasMove: function(e) {
        d && (m.push(1), g.push(e.changedTouches[0].x), h.push(e.changedTouches[0].y));
        for (var t = 0; t < g.length; t++) 0 == m[t] ? l.moveTo(g[t], h[t]) : l.lineTo(g[t], h[t]);
        l.clearRect(0, 0, f, v), l.setStrokeStyle("#000000"), l.setLineWidth(4), l.setLineCap("round"), 
        l.setLineJoin("round"), l.stroke(), l.draw(!1);
    },
    canvasEnd: function(e) {
        d = !1;
    },
    cleardraw: function() {
        g = [], h = [], m = [], l.clearRect(0, 0, f, v), l.draw(!0), this.clk_2cmina_161();
    },
    getimg: function() {
        var e = this;
        if (g.length < 5) return wx.showModal({
            title: "提示",
            content: "签名内容不能为空！",
            showCancel: !1
        }), this.clk_2cmina_162(!1), !1;
        wx.showLoading({
            title: "提交中...",
            mask: !0
        });
        var t = o(wx.getImageInfo), n = o(wx.canvasToTempFilePath);
        Promise.all([ t({
            src: "https://dm.static.elab-plus.com/JinmaoQ/jinmaoSignature.png"
        }), n({
            canvasId: "canvas"
        }) ]).then(function(t) {
            var n = wx.createCanvasContext("customCanvas");
            n.drawImage(t[0].path, 0, 0, 750, 2892), n.drawImage(t[1].tempFilePath, 63, 2321, 630, 290), 
            n.draw(!1, e.canvasTemp);
        }).catch(function(t) {
            wx.hideLoading(), e.clk_2cmina_162(!1);
        });
    },
    canvasTemp: function() {
        var e = this;
        wx.canvasToTempFilePath({
            canvasId: "customCanvas",
            success: function(t) {
                console.log("============", t), e.uploadToQiniu(t.tempFilePath);
            },
            fail: function(e) {
                wx.hideLoading(), this.clk_2cmina_162(!1);
            }
        }, this);
    },
    uploadToQiniu: function(e) {
        var a = this;
        return t(n.default.mark(function t() {
            var o, r, s, u, l, d;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, i.default)("getUploadToken");

                  case 2:
                    return (o = t.sent).success || (wx.hideLoading(), a.clk_2cmina_162(!1)), r = o.single, 
                    s = r.token, u = r.resultUrl, t.next = 7, (0, c.uploadImageFiles)(s, e);

                  case 7:
                    (l = t.sent) && l.length > 0 ? (d = "" + u + l, a.submitAction(d)) : (wx.hideLoading(), 
                    a.clk_2cmina_162(!1));

                  case 9:
                  case "end":
                    return t.stop();
                }
            }, t, a);
        }))();
    },
    submitAction: function(e) {
        var i = this;
        return t(n.default.mark(function t() {
            var c, o, r;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return c = {
                        activityId: i.data.activity.id,
                        customerId: s.globalData.single.id,
                        houseId: s.globalData.houseid,
                        signUrl: e
                    }, console.log("图片上传参数：", c), o = i, t.next = 5, (0, a.default)("addActivityRecord", c);

                  case 5:
                    r = t.sent, console.log("图片上传res", r), r && r.success ? (wx.hideLoading(), wx.showToast({
                        title: "签名提交成功"
                    }), o.setData({
                        isHide: !0,
                        backImageUrl: e
                    }), o.clk_2cmina_162(!0), wx.reLaunch({
                        url: "../index/index"
                    })) : (wx.hideLoading(), i.clk_2cmina_162(!1));

                  case 8:
                  case "end":
                    return t.stop();
                }
            }, t, i);
        }))();
    },
    getSignatureAction: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var i, c;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i = {
                        customerId: s.globalData.single.id,
                        houseId: s.globalData.houseid,
                        activityId: e.data.activity.id
                    }, t.next = 3, (0, a.default)("queryCustomerActivity", i);

                  case 3:
                    (c = t.sent) && c.success && c.single && c.single.signUrl && (e.setData({
                        backImageUrl: c.single.signUrl
                    }), e.setData({
                        isHide: !0
                    }));

                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    getQueryActivity: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var i, c, o;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i = {
                        code: "CUSTOMER_SIGNATURE",
                        houseId: s.globalData.houseid
                    }, c = e, console.log("======== 获取活动记录 ========"), t.next = 5, (0, a.default)("queryActivity", i);

                  case 5:
                    o = t.sent, console.log("获取活的记录：", o), o && o.success && o.single && (e.setData({
                        activity: o.single
                    }), c.getSignatureAction());

                  case 8:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    login: function() {
        var e = this;
        s.login(function() {
            wx.setStorageSync("loadTime", new Date().getTime()), e.getQueryActivity(), e.p_2cmina_59();
        });
    },
    p_2cmina_59: function() {
        var e = {
            ip: s.globalData.ip,
            type: "PV",
            pvId: "p_2cmina_59",
            pvCurPageName: "Jiedailiuchengye",
            pvCurPageParams: u,
            pvLastPageName: "zhuye",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
        };
        console.log("============ 埋点 ============", e), r.trackRequest(e);
    },
    clk_2cmina_161: function() {
        var e = {
            type: "CLK",
            clkId: "clk_2cmina_161",
            clkName: "Qingchu",
            pvCurPageName: "Jiedailiuchengye",
            pvCurPageParams: u,
            clkDesPage: ""
        };
        r.trackRequest(e);
    },
    clk_2cmina_162: function(e) {
        var t = {
            type: "CLK",
            clkId: "clk_2cmina_162",
            clkName: "Tijiao",
            pvCurPageName: "Jiedailiuchengye",
            pvCurPageParams: u,
            clkDesPage: "zhuye",
            expand: JSON.stringify({
                success: e
            })
        };
        r.trackRequest(t);
    },
    getCurrentPageParam: function() {
        return u;
    },
    onLoad: function(e) {
        u = JSON.stringify(e), (l = wx.createCanvasContext("canvas")).beginPath(), l.setStrokeStyle("#000000"), 
        l.setLineWidth(4), l.setLineCap("round"), l.setLineJoin("round"), s.decrypt(e), 
        this.login();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        g = [], h = [], m = [], l.clearRect(0, 0, f, v), l.draw(!0);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});