function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function i(o, n) {
                try {
                    var r = t[o](n), s = r.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
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

var a, i = e(require("../../lib/runtime")), o = e(require("../../lib/requestConfig")), n = e(require("../../utils/monitor.js")), r = require("../../utils/util.js"), s = require("../../config.js"), d = (getApp(), 
null), u = "";

Page({
    data: {
        source: "",
        videoLength: !0,
        dateTime: "",
        city: "",
        temperature: "",
        weather: "",
        videoContext: null,
        appFlag: !1,
        queit: !1,
        title: "",
        showTime: "1",
        showWeather: "1",
        momentId: "",
        videoFlag: !0,
        videoList: [],
        touchDot: 0,
        time: 0,
        videoLeft: -12.5,
        interval: "",
        windowHeight: 0,
        currentFlag: 0,
        linkUrl: "",
        id: "",
        showInfo: !1,
        showPhoneModel: !1,
        showInfoModel: !1,
        currentVideoId: ""
    },
    getCurrentPageParam: function() {
        return u;
    },
    onLoad: function(e) {
        u = JSON.stringify(e), this.myLoading = this.selectComponent("#myLoading"), this.myLoading && this.myLoading.showLoading();
        var t = this;
        console.log("***Video onLoad***", e, "啦啦啦", e.shareToken, e.linkUrl, e.id), this.data.momentId = e.momentId || "", 
        wx.getSystemInfo({
            success: function(e) {
                "ios" == e.platform ? t.setData({
                    appFlag: !0,
                    currentFlag: -1,
                    windowHeight: e.windowWidth
                }) : t.setData({
                    windowHeight: e.windowWidth
                }), console.log("可视区宽度", e.windowWidth), console.log("可视区高度", e.windowHeight);
            }
        }), this.data.linkUrl = e.linkUrl || "", this.data.id = e.id || "", this.setData({
            dateTime: r.timesData(new Date().getTime()),
            time: r.timestampToTime(new Date().getTime())
        }), this.getCurrentVideo(), this.getCityInfo();
    },
    afterPhoneHandle: function(e) {
        e.detail && this.setData({
            showPhoneModel: !1
        });
    },
    afterUserHandle: function(e) {
        e.detail && this.setData({
            showInfoModel: !1
        });
    },
    getCityInfo: function() {
        var e = this;
        return t(i.default.mark(function t() {
            var a;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, o.default)("getCityInfo", {
                        id: s.houseId
                    });

                  case 2:
                    (a = t.sent) && a.success && a.single && (console.log("***获取项目信息***", a), e.setData({
                        city: a.single.city || ""
                    }), e.getWeather());

                  case 4:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    getCurrentVideo: function() {
        var e = this;
        return t(i.default.mark(function t() {
            var a;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, o.default)("queryMomentCurrent", {
                        houseId: s.houseId
                    });

                  case 2:
                    (a = t.sent) && a.success && a.single && (console.log("***获取视频信息***", a), e.data.title = a.single.title || "", 
                    e.data.currentVideoId = a.single.id || "", e.setData({
                        source: a.single.videoUrl,
                        showTime: null != a.single.showTime ? a.single.showTime : 1,
                        showWeather: null != a.single.showWeather ? a.single.showWeather : 1
                    }), wx.setNavigationBarTitle({
                        title: e.data.title
                    }));

                  case 4:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    getWeather: function() {
        var e = this;
        return t(i.default.mark(function t() {
            var a, n;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, (0, o.default)("queryWeather", {
                        city: e.data.city
                    });

                  case 2:
                    if ((a = t.sent) && a.success && a.single) try {
                        e.setData({
                            city: a.single.data.city,
                            temperature: a.single.data.forecast[0].low.substring(3),
                            weather: a.single.data.forecast[0].type
                        }), console.log("***天气信息***", e.data.temperature, e.data.city, e.data.weather);
                    } catch (t) {
                        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                        e.setData({
                            temperature: "",
                            weather: ""
                        });
                    } else n = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "video.js-getWeather",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(a) + ";houseId=" + s.houseId
                    }, r.trackRequest(n);

                  case 4:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    moveLeft: function() {
        var e = this, t = e.data.videoLeft, a = 20 * (e.data.videoList.length - 1);
        47.5 != e.data.videoLeft ? (t += 20, e.setData({
            videoLeft: t
        }), console.log("向左滑动", e.data.videoLeft, "==", a)) : t = a;
    },
    moveRight: function() {
        var e = this, t = e.data.videoLeft, a = 20 * (e.data.videoList.length - 1);
        92.5 != Math.abs(e.data.videoLeft) ? (t -= 20, e.setData({
            videoLeft: t
        }), console.log("向右滑动", e.data.videoLeft, "=====", a)) : t = a;
    },
    switchVideo: function(e) {
        try {
            if (this.data.currentVideoId == e.currentTarget.dataset.video.id) return !1;
            this.data.currentVideoId = e.currentTarget.dataset.video.id || "";
        } catch (e) {}
        this.videoContext && this.videoContext.stop();
        var t = this;
        e.currentTarget.dataset.video;
        console.log("***switchVideo***", e.currentTarget);
        var a = {
            clkId: "clk_2cmina_207",
            clkName: "qiehuanshipin",
            type: "CLK",
            clkParams: {
                videoUrl: e.currentTarget.dataset.video.videoUrl
            },
            pvCurPageName: "video.js",
            pvCurPageParams: u
        };
        r.trackRequest(a), t.data.appFlag ? t.setData({
            currentFlag: -1,
            source: e.currentTarget.dataset.video.videoUrl,
            showTime: null != e.currentTarget.dataset.video.showTime ? e.currentTarget.dataset.video.showTime : 1,
            showWeather: null != e.currentTarget.dataset.video.showWeather ? e.currentTarget.dataset.video.showWeather : 1
        }) : (t.setData({
            currentFlag: e.currentTarget.dataset.id,
            source: e.currentTarget.dataset.video.videoUrl,
            showTime: null != e.currentTarget.dataset.video.showTime ? e.currentTarget.dataset.video.showTime : 1,
            showWeather: null != e.currentTarget.dataset.video.showWeather ? e.currentTarget.dataset.video.showWeather : 1
        }), console.log("安卓手机", t.data.currentFlag)), console.log("索引", t.data.currentFlag, e.currentTarget.dataset.id);
    },
    onShow: function(e) {
        n.default.pageShow(), console.log("***video.js-onShow***"), a = new Date().getTime();
        var t = this;
        this.videoContext = wx.createVideoContext("myVideo"), setTimeout(function() {
            t.videoContext.requestFullScreen({
                direction: 90
            }), t.setData({
                showInfo: !0
            });
        }, 1e3), d = setInterval(function() {
            t.setData({
                dateTime: r.timesData(new Date().getTime()),
                time: r.timestampToTime(new Date().getTime())
            }), console.log(r.timesData(new Date().getTime()));
        }, 3e3), wx.hideShareMenu && wx.hideShareMenu();
    },
    onUnload: function() {
        var e = this;
        return t(i.default.mark(function t() {
            var n, s;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e.videoContext && e.videoContext.stop(), e.videoContext && e.videoContext.exitFullScreen(), 
                    console.log("***video.js-onUnload返回首页***", e.data.momentId), n = {
                        pvPageStayTime: (new Date().getTime() - a) / 1e3,
                        pvCurPageName: e.data.despage || "",
                        clkDesPage: "zhuye",
                        clkName: "fanhui",
                        clkId: "clk_2cmina_36",
                        clkParams: {
                            sourceUrl: e.data.source || ""
                        },
                        type: "CLK"
                    }, r.trackRequest(n), clearInterval(d), t.next = 8, (0, o.default)("modifyMomentView", {
                        id: e.data.momentId,
                        viewNumber: -1
                    });

                  case 8:
                    s = t.sent;

                  case 9:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    goback: function() {
        console.log("返回首页", this.data.momentId), this.videoContext && this.videoContext.stop(), 
        this.videoContext && this.videoContext.exitFullScreen(), setTimeout(function() {
            wx.navigateBack({
                url: "../index/index"
            });
        }, 500);
    },
    moreVideo: function() {
        var e = this;
        return t(i.default.mark(function t() {
            var a, n;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e.setData({
                        videoFlag: !1
                    }), t.next = 3, (0, o.default)("queryMomentCurrentList", {
                        houseId: s.houseId
                    });

                  case 3:
                    (a = t.sent) && a.success && a.list ? (a.list.length <= 4 ? e.setData({
                        videoList: a.list,
                        videoLength: !1
                    }) : e.setData({
                        videoList: a.list
                    }), console.log("***视频列表返回数据***", e.data.videoLength, a.list.length)) : (n = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "video.js-moreVideo",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(a) + ";houseId=" + s.houseId
                    }, r.trackRequest(n));

                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    hideVideo: function() {
        this.setData({
            videoFlag: !0
        });
    },
    play: function() {},
    queitFull: function(e) {
        e.detail.fullScreen ? (this.setData({
            queit: !1
        }), console.log("进入全屏", this.data.queit)) : (this.setData({
            queit: !0
        }), console.log("退出全屏", this.data.queit));
    },
    onReady: function() {
        this.myLoading && this.myLoading.hideLoading();
    },
    onHide: function() {
        this.videoContext && this.videoContext.exitFullScreen(), console.log("***video.js-onHide***");
    }
}, n.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));