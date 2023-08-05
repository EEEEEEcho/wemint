function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../lib/runtime")), t(require("../../lib/requestConfig"));

var a = require("../../utils/util.js"), e = (require("../../config.js"), getApp()), i = !1, s = !1, h = 0;

Component({
    properties: {
        imgMaxHeight: {
            type: Number,
            value: 840
        },
        imgMinHeight: {
            type: Number,
            value: 200
        },
        focusPointY: {
            type: Number,
            value: 100
        },
        objData: {
            type: Object,
            value: null
        },
        hasOrganize: {
            type: Boolean,
            value: !1
        },
        pvCurPageName: {
            type: String,
            value: ""
        }
    },
    data: {
        activeIndex: 0,
        imgsList: [],
        firstTouch: null,
        lastTouch: null,
        currentTouch: null,
        smoothFlag: !0,
        upImg: null,
        downImg: null,
        kickInter: null,
        kickBcak: !1,
        pointList: [],
        dataList: [],
        area: {},
        scheduleList: [],
        scheduleStatus: !0,
        updateScheduleStatus: !0,
        recordE: null,
        trackDataList: []
    },
    attached: function() {},
    ready: function() {
        console.warn("****ready**");
    },
    methods: {
        initData: function() {
            var t = this;
            this.data.activeIndex = this.data.imgsList.findIndex(function(t, a) {
                return 1 == t.schedule;
            }), this.data.imgsList.forEach(function(a, e) {
                1 == a.schedule ? (a.height = a.imgMaxHeight, t.data.activeIndex = e) : e < t.data.activeIndex ? a.height = 0 : e > t.data.activeIndex && (a.height = a.imgMinHeight);
            }), this.updateSchedule();
        },
        createTrackData: function(t) {
            console.log("createTrackData:" + JSON.stringify(t));
            var a = [];
            for (var e in t.moduleList) {
                var i = t.moduleList[e], s = {};
                s.id = "view_5-1_child_" + e, s.flag = !0, s.eventName = i.moduleStyle.burialName, 
                s.eventID = "exp_2cmina_5-1", a.push(s);
            }
            this.setData({
                trackDataList: a
            });
        },
        handleShowTrack: function() {
            var t = this, a = this, e = !0, i = !1, s = void 0;
            try {
                for (var h, d = this.data.trackDataList[Symbol.iterator](); !(e = (h = d.next()).done); e = !0) !function() {
                    var e = h.value;
                    t.createIntersectionObserver().relativeToViewport({
                        bottom: -10
                    }).observe("#" + e.id, function(t) {
                        e.flag && (e.flag = !1, a.sendTrackRequest(e));
                    });
                }();
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                i = !0, s = t;
            } finally {
                try {
                    !e && d.return && d.return();
                } finally {
                    if (i) throw s;
                }
            }
        },
        sendTrackRequest: function(t) {
            var i = {
                type: "EXP",
                eventId: t.eventID,
                pvCurPageName: this.data.pvCurPageName,
                eventModuleDes: t.eventName,
                eventName: t.eventName
            };
            a.trackRequest(i, e);
        },
        getUserData: function(t) {
            var a = this;
            this.createTrackData(t), this.setData({
                area: t
            }), this.data.focusPointY = t.unifyTitleObj.focusPointY, this.data.imgMaxHeight = parseInt(t.unifyTitleObj.height), 
            this.data.imgMinHeight = parseInt(t.unifyTitleObj.imgMinHeight), this.data.objData = t.moduleList, 
            this.data.imgsList = [], this.data.objData && this.data.objData.forEach(function(t, e) {
                var i = {
                    imgUrl: "https://dm.static.elab-plus.com/miniprogram/1.png",
                    CN_name: "",
                    EN_name: "",
                    imgMaxHeight: 0,
                    imgMinHeight: 0,
                    schedule: 1,
                    height: 0
                };
                i.hasShow = t.hasShow, i.moduleStyle = t.moduleStyle, i.imgUrl = t.moduleStyle.imageUrl, 
                i.imgMaxHeight = parseInt(t.moduleStyle.height), i.imgMinHeight = parseInt(t.moduleStyle.imgMinHeight), 
                i.CN_name = t.titleObj.titleText, i.EN_name = t.titleObj.descText, i.hasTitle = t.titleObj.hasTitle, 
                i.hasDes = t.titleObj.hasDes, i.hasIcon = t.titleObj.hasIcon, i.jumpType = t.jump.type, 
                i.houseOption = t.jump.houseOption, i.jumpValue = t.jump.value, i.jumpLink = t.jump.link, 
                i.titleObj = t.titleObj, i.schedule = 0 == e ? 1 : 0, i.height = 0 == e ? i.imgMaxHeight : i.imgMinHeight, 
                a.data.activeIndex = 0, i.hasShow && (a.data.imgsList.push(i), a.data.scheduleList.push({
                    schedule: i.schedule,
                    height: i.height
                }));
            }), this.setData({
                imgsList: this.data.imgsList,
                scheduleList: this.data.scheduleList,
                focusPointY: this.data.focusPointY,
                objData: this.data.objData
            }, function() {
                setTimeout(function() {
                    a.handleShowTrack();
                }, 500);
            });
        },
        changeTap: function(t) {
            if (this.data.kickBcak) return console.log("***处在回弹状态-changeTap***", this.data.kickBcak), 
            !1;
            var a = t.currentTarget.dataset.index, e = this.data.scheduleList[a].schedule;
            console.log("***changeTap***", e, a, this.data.activeIndex);
            var i = 0;
            if (1 == e) this.navigateToDetail(t); else if (this.data.activeIndex = this.data.scheduleList.findIndex(function(t, a) {
                return 1 == t.schedule;
            }), this.data.activeIndex > a) i = 4; else {
                this.data.eventType = "1", i = 1;
                var s = this.data.activeIndex, h = a - this.data.activeIndex;
                console.log("***changeTap3***", i, s, h, t), this.data.times = 0, this.data.b = 0, 
                this.data.c = h, this.overHandle2(i, s, t);
            }
        },
        overHandle2: function(t, a, e) {
            var i = this, s = this.data.times, h = this.data.b, d = this.data.c, c = 0, n = this.data.imgsList[a], u = this.data.imgsList[a + 1];
            this.data.kickBcak = !0, this.data.kickInter = setInterval(function() {
                c = i.easeOut(s, h, d, 25);
                var g = parseInt(c), l = c - g, o = a + g;
                if (n = i.data.imgsList[o], (u = i.data.imgsList[o + 1]) && n ? (u.schedule = l, 
                n.schedule = 1 - l) : console.log("***over***", o, n, u), g >= d) {
                    n = i.data.imgsList[o - 1], (u = i.data.imgsList[o]).schedule = 1, n.schedule = 0;
                    var m = 0, r = 0;
                    1 == t || 2 == t ? (m = Math.ceil(u.schedule * (u.imgMaxHeight - u.imgMinHeight) + u.imgMinHeight), 
                    r = Math.ceil(n.schedule * n.imgMaxHeight)) : 3 != t && 4 != t || (m = Math.ceil(u.schedule * u.imgMaxHeight), 
                    r = Math.ceil(n.schedule * (n.imgMaxHeight - n.imgMinHeight) + n.imgMinHeight)), 
                    u.height = m > u.imgMaxHeight ? u.imgMaxHeight : m, n.height = r > n.imgMaxHeight ? n.imgMaxHeight : r, 
                    i.updateSchedule(), i.data.times = 0, clearInterval(i.data.kickInter), i.data.kickBcak = !1, 
                    i.navigateToDetail(e);
                } else {
                    s++, i.data.times = s, s > 500 && (i.data.times = 0, clearInterval(i.data.kickInter), 
                    i.navigateToDetail(e), i.data.kickBcak = !1);
                    var p = 0, I = 0;
                    1 == t || 2 == t ? (p = Math.ceil(u.schedule * (u.imgMaxHeight - u.imgMinHeight) + u.imgMinHeight), 
                    I = Math.ceil(n.schedule * n.imgMaxHeight)) : 3 != t && 4 != t || (p = Math.ceil(u.schedule * u.imgMaxHeight), 
                    I = Math.ceil(n.schedule * (n.imgMaxHeight - n.imgMinHeight) + n.imgMinHeight)), 
                    u.height = p > u.imgMaxHeight ? u.imgMaxHeight : p, n.height = I > n.imgMaxHeight ? n.imgMaxHeight : I, 
                    o - 1 >= 0 && (i.data.imgsList[o - 1].schedule = 0, i.data.imgsList[o - 1].height = 0), 
                    i.updateSchedule();
                }
            }, 16);
        },
        navigateToDetail: function(t) {
            var a = {};
            console.log("***navigateToDetail-跳转***"), t && this.triggerEvent("swipeItemClk", t, a);
        },
        updateSchedule: function() {
            var t = this;
            if (this.data.updateScheduleStatus = !1) return !1;
            t.data.updateScheduleStatus = !1;
            try {
                var a = [];
                t.data.imgsList.forEach(function(e, i) {
                    a.push(new Promise(function(a, s) {
                        t.data.scheduleList[i].schedule = e.schedule, t.data.scheduleList[i].height = e.height, 
                        console.log("updateSchedule complete"), a();
                    }));
                }), Promise.all(a).then(function(a) {
                    if (0 == t.data.scheduleStatus) console.warn("***updateSchedule***", t.data.scheduleStatus); else {
                        var e = getCurrentPages()[getCurrentPages().length - 1];
                        t.data.route != e.route ? (console.log("***this.currPage***", t.data.route, e.route), 
                        t.stopOverHandle()) : (t.data.scheduleStatus = !1, t.setData({
                            scheduleList: t.data.scheduleList
                        }, function() {
                            t.data.scheduleStatus = !0;
                        }, function(t) {
                            console.error("***type-error", t);
                        }));
                    }
                    console.log("***self.data.scheduleList***", t.data.scheduleList), t.data.updateScheduleStatus = !0;
                }).catch(function(a) {
                    console.log(a), t.data.updateScheduleStatus = !0;
                });
            } catch (a) {
                a = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(a);
                t.data.updateScheduleStatus = !0;
            }
        },
        imgMove: function() {
            console.log("1111111111111111");
            var t = e.systemInfo.screenWidth / 750, a = this.data.imgsList[this.data.activeIndex], i = this.data.lastTouch ? this.data.lastTouch : this.data.firstTouch;
            if (i && this.data.activeIndex > -1) {
                console.log("2222222222222222");
                var s = this.data.currentTouch.clientY - i.clientY, h = this.data.currentTouch.clientY - this.data.firstTouch.clientY, d = s / ((this.data.imgMaxHeight - this.data.imgMinHeight) * t);
                if (0 == this.data.activeIndex && h >= 0) return !1;
                if (this.data.activeIndex == this.data.imgsList.length - 1 && h < 0) return !1;
                if (d < 0) {
                    if (this.data.upImg = this.data.upImg ? this.data.upImg : a, this.data.downImg = this.data.downImg ? this.data.downImg : this.data.imgsList[this.data.activeIndex + 1], 
                    console.log("***step1***", d, a.schedule, this.data.activeIndex, this.data.upImg.schedule), 
                    !this.data.downImg) return console.error("***error1***", d, this.data.activeIndex, this.data.currentTouch.clientY, this.data.firstTouch.clientY, i.clientY), 
                    !1;
                    if (this.data.upImg.schedule > 0) {
                        this.data.downImg.schedule = 1 - this.data.upImg.schedule, this.data.upImg.schedule = this.data.upImg.schedule + d, 
                        this.data.downImg.schedule = this.data.downImg.schedule - d, this.data.upImg.schedule < 0 && (this.data.upImg.schedule = 0), 
                        this.data.downImg.schedule > 1 && (this.data.downImg.schedule = 1);
                        var c = Math.ceil(this.data.upImg.schedule * this.data.upImg.imgMaxHeight), n = Math.ceil(this.data.downImg.schedule * (this.data.downImg.imgMaxHeight - this.data.downImg.imgMinHeight) + this.data.downImg.imgMinHeight);
                        this.data.upImg.height = c > this.data.upImg.imgMaxHeight ? this.data.upImg.imgMaxHeight : c, 
                        this.data.downImg.height = n > this.data.downImg.imgMaxHeight ? this.data.downImg.imgMaxHeight : n, 
                        console.log("***step1-1***", d, a.schedule, this.data.activeIndex, this.data.upImg.schedule, this.data.downImg.schedule, c, n, this.data.upImg.height, this.data.downImg.height), 
                        this.data.lastTouch = this.data.currentTouch, this.updateSchedule();
                    } else this.data.upImg.schedule <= 0 && this.data.smoothFlag && (this.data.upImg.schedule = 0, 
                    this.data.downImg.schedule = 1, this.data.lastTouch = this.data.currentTouch, this.data.smoothFlag = !1, 
                    console.log("55555555555555"), this.updateSchedule());
                } else {
                    if (this.data.upImg = this.data.upImg ? this.data.upImg : this.data.imgsList[this.data.activeIndex - 1], 
                    this.data.downImg = this.data.downImg ? this.data.downImg : a, console.log("***step2***", d, a.schedule, this.data.activeIndex, this.data.downImg.schedule), 
                    !this.data.upImg) return console.error("***error2***", d, this.data.activeIndex, this.data.currentTouch.clientY, this.data.firstTouch.clientY, i.clientY), 
                    !1;
                    if (this.data.downImg.schedule > 0) {
                        this.data.downImg.schedule = 1 - this.data.upImg.schedule, this.data.downImg.schedule = this.data.downImg.schedule - d, 
                        this.data.upImg.schedule = this.data.upImg.schedule + d, this.data.downImg.schedule < 0 && (this.data.downImg.schedule = 0), 
                        this.data.upImg.schedule > 1 && (this.data.upImg.schedule = 1);
                        var u = Math.ceil(this.data.upImg.schedule * this.data.upImg.imgMaxHeight), g = Math.ceil(this.data.downImg.schedule * (this.data.downImg.imgMaxHeight - this.data.downImg.imgMinHeight) + this.data.downImg.imgMinHeight);
                        this.data.upImg.height = u > this.data.upImg.imgMaxHeight ? this.data.upImg.imgMaxHeight : u, 
                        this.data.downImg.height = g > this.data.downImg.imgMaxHeight ? this.data.downImg.imgMaxHeight : g, 
                        console.log("***step2-1***", d, a.schedule, this.data.activeIndex, this.data.upImg.schedule, this.data.downImg.schedule, u, g, this.data.upImg.height, this.data.downImg.height), 
                        this.data.lastTouch = this.data.currentTouch, this.updateSchedule();
                    } else this.data.downImg.schedule <= 0 && this.data.smoothFlag && (this.data.downImg.schedule = 0, 
                    this.data.upImg.schedule = 1, this.data.lastTouch = this.data.currentTouch, this.data.smoothFlag = !1, 
                    console.log("888888888888888"), this.updateSchedule());
                }
            }
        },
        swipeScrollExp: function(t) {
            console.log("swipeScrollExp:" + JSON.stringify(t));
        },
        touchstart: function(t) {
            h = t.touches[0].clientY;
            var a = getCurrentPages()[getCurrentPages().length - 1];
            return this.data.route = a.route, console.log("***touchstart***", t), this.data.kickBcak ? (console.log("***处在回弹状态1***", this.data.kickBcak), 
            !1) : t.touches && t.touches.length > 1 ? (console.warn("***多指滑动,只有第一个手指滑动会有效***"), 
            !1) : (this.data.pointList = [], this.data.firstTouch = t.touches[0], this.data.pointList[0] = this.data.firstTouch, 
            void (this.data.activeIndex = this.data.scheduleList.findIndex(function(t, a) {
                return 1 == t.schedule;
            })));
        },
        touchmove: function(t) {
            var a = this;
            if (this.data.kickBcak) return console.log("***处在回弹状态2***", this.data.kickBcak), 
            !1;
            if (t.touches && t.touches.length > 1) return console.warn("***多指滑动,只有第一个手指滑动会有效***"), 
            !1;
            this.data.currentTouch = t.touches[0], this.data.pointList[0] ? (this.data.pointList[0] = this.data.pointList[1] ? this.data.pointList[1] : this.data.pointList[0], 
            this.data.pointList[1] = t) : this.data.pointList[0] = t, console.log("***touchmove***", this.data.pointList, this.data.activeIndex), 
            this.imgMove();
            var e = t.touches[0].clientY - h;
            console.log("swipeMove111111111111111：" + h + ";" + t.touches[0].clientY), e < -6 && (s || (s = !0, 
            this.swiperTouchStart()), this.swipeScrollEndTimer && (clearTimeout(this.swipeScrollEndTimer), 
            this.swipeScrollEndTimer = null), this.swipeScrollEndTimer = setTimeout(function() {
                s = !1, a.swiperTouchEnd();
            }, 1e3)), h = t.touches[0].clientY;
        },
        touchend: function(t) {
            if (this.setData({
                recordE: t
            }), console.log("***touchend***", t), i = !1, this.data.kickBcak) return console.log("***处在回弹状态3***", this.data.kickBcak), 
            !1;
            this.data.pointList[2] = t, this.data.smoothFlag = !0, this.data.upImg = null, this.data.downImg = null, 
            this.data.lastTouch = null, this.data.firstTouch = null;
            try {
                console.log("99999999999999");
                var a = this.data.scheduleList.findIndex(function(t, a) {
                    return 1 == t.schedule;
                });
                -1 == a ? (console.log("***change***", this.data.pointList[2].timeStamp - this.data.pointList[1].timeStamp), 
                this.data.pointList[0] && this.data.pointList[1] && this.data.pointList[2] && Math.abs(this.data.pointList[2].timeStamp - this.data.pointList[1].timeStamp) < 20 ? (console.log("***swiperOver1***", this.data.pointList[2].timeStamp - this.data.pointList[1].timeStamp), 
                this.swiperOver()) : this.kickBack()) : this.data.activeIndex = a;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                console.log("aaaaaaaaaaaaaaaa"), console.error("***touchend***", t, this.data.pointList), 
                this.data.kickBcak = !1;
            }
        },
        resetStatus: function() {
            console.log("resetStatus：" + JSON.stringify(this.data.recordE)), this.data.updateScheduleStatus = !0, 
            this.touchend(this.data.recordE);
        },
        touchcancel: function(t) {
            console.log("***touchcancel***", t), this.touchend(t);
        },
        stopOverHandle: function() {
            this.data.kickInter && (console.warn("***stopOverHandle2***", this.data.upItem, this.data.downItem, this.data.type, this.data.imgsList), 
            clearInterval(this.data.kickInter)), console.warn("***stopOverHandle1***", this.data.kickInter, this.data.times, this.data.imgsList);
        },
        recoverOverHandle: function() {
            console.warn("***recoverOverHandle1***", this.data.upItem, this.data.downItem, this.data.type, this.data.times), 
            this.data.times && this.data.times > 0 && (console.warn("***recoverOverHandle2***", this.data.eventType, this.data.activeIndex), 
            "1" == this.data.eventType ? (this.data.scheduleStatus = !0, this.overHandle2(1, this.data.activeIndex, null)) : "2" == this.data.eventType ? (this.data.scheduleStatus = !0, 
            this.overHandle(this.data.upItem, this.data.downItem, this.data.type)) : "3" == this.data.eventType && (this.data.scheduleStatus = !0, 
            this.overHandle3(this.data.upItem, this.data.downItem, this.data.type)));
        },
        swiperOver: function() {
            this.data.eventType = "2";
            var t = this.data.activeIndex, a = null, e = null;
            this.data.kickBcak = !0;
            var i = 0;
            if (this.data.pointList[1].changedTouches[0].clientY - (this.data.pointList[0].changedTouches ? this.data.pointList[0].changedTouches[0].clientY : this.data.pointList[0].clientY) > 0 ? this.data.imgsList[t + 1] && this.data.imgsList[t + 1].schedule > 0 ? (a = this.data.imgsList[t], 
            e = this.data.imgsList[t + 1], i = 3) : this.data.imgsList[t - 1] && this.data.imgsList[t - 1].schedule > 0 && (e = this.data.imgsList[t], 
            a = this.data.imgsList[t - 1], i = 4) : this.data.imgsList[t + 1] && this.data.imgsList[t + 1].schedule > 0 ? (e = this.data.imgsList[t], 
            a = this.data.imgsList[t + 1], i = 1) : this.data.imgsList[t - 1] && this.data.imgsList[t - 1].schedule > 0 && (a = this.data.imgsList[t], 
            e = this.data.imgsList[t - 1], i = 2), !a || !e) return this.data.kickBcak = !1, 
            !1;
            this.data.upItem = a, this.data.downItem = e, this.data.type = i, this.data.times = 0, 
            this.data.b = a.schedule, this.data.c = 1 - a.schedule, this.overHandle(a, e, i);
        },
        overHandle: function(t, a, e) {
            var i = this, s = this.data.times, h = this.data.b, d = this.data.c, c = 0;
            this.data.kickInter = setInterval(function() {
                if (c = i.easeOut(s, h, d, 25), t.schedule = c, a.schedule = 1 - c, t.schedule >= 1 || a.schedule <= 0) {
                    t.schedule = 1, a.schedule = 0;
                    var n = 0, u = 0;
                    1 == e || 2 == e ? (n = Math.ceil(t.schedule * (t.imgMaxHeight - t.imgMinHeight) + t.imgMinHeight), 
                    u = Math.ceil(a.schedule * a.imgMaxHeight)) : 3 != e && 4 != e || (n = Math.ceil(t.schedule * t.imgMaxHeight), 
                    u = Math.ceil(a.schedule * (a.imgMaxHeight - a.imgMinHeight) + a.imgMinHeight)), 
                    t.height = n > t.imgMaxHeight ? t.imgMaxHeight : n, a.height = u > a.imgMaxHeight ? a.imgMaxHeight : u, 
                    i.updateSchedule(), i.data.times = 0, clearInterval(i.data.kickInter), i.data.kickBcak = !1;
                } else {
                    s++, i.data.times = s, s > 30 && (i.data.times = 0, clearInterval(i.data.kickInter), 
                    i.data.kickBcak = !1);
                    var g = 0, l = 0;
                    1 == e || 2 == e ? (g = Math.ceil(t.schedule * (t.imgMaxHeight - t.imgMinHeight) + t.imgMinHeight), 
                    l = Math.ceil(a.schedule * a.imgMaxHeight)) : 3 != e && 4 != e || (g = Math.ceil(t.schedule * t.imgMaxHeight), 
                    l = Math.ceil(a.schedule * (a.imgMaxHeight - a.imgMinHeight) + a.imgMinHeight)), 
                    t.height = g > t.imgMaxHeight ? t.imgMaxHeight : g, a.height = l > a.imgMaxHeight ? a.imgMaxHeight : l, 
                    i.updateSchedule();
                }
            }, 16);
        },
        kickBack: function() {
            this.data.eventType = "3";
            var t = this.data.activeIndex, a = null, e = null;
            this.data.kickBcak = !0, e = this.data.imgsList[t];
            var i = 0;
            if (this.data.imgsList[t + 1] && this.data.imgsList[t + 1].schedule > 0 ? (a = this.data.imgsList[t + 1], 
            i = 1) : this.data.imgsList[t - 1] && this.data.imgsList[t - 1].schedule > 0 && (a = this.data.imgsList[t - 1], 
            i = 2), !a || !e) return this.data.kickBcak = !1, !1;
            this.data.upItem = a, this.data.downItem = e, this.data.type = i, this.data.times = 0, 
            this.data.b = e.schedule, this.data.c = 1 - e.schedule, this.overHandle3(a, e, i);
        },
        overHandle3: function(t, a, e) {
            var i = this, s = this.data.times, h = this.data.b, d = this.data.c, c = 0;
            this.data.kickInter = setInterval(function() {
                if (c = i.easeOut(s, h, d, 25), a.schedule = c, t.schedule = 1 - c, a.schedule >= 1 || t.schedule <= 0) {
                    a.schedule = 1, t.schedule = 0;
                    var n = 0, u = 0;
                    1 == e ? (n = Math.ceil(t.schedule * (t.imgMaxHeight - t.imgMinHeight) + t.imgMinHeight), 
                    u = Math.ceil(a.schedule * a.imgMaxHeight)) : 2 == e && (n = Math.ceil(t.schedule * t.imgMaxHeight), 
                    u = Math.ceil(a.schedule * (a.imgMaxHeight - a.imgMinHeight) + a.imgMinHeight)), 
                    t.height = n > t.imgMaxHeight ? t.imgMaxHeight : n, a.height = u > a.imgMaxHeight ? a.imgMaxHeight : u, 
                    i.updateSchedule(), i.data.times = 0, clearInterval(i.data.kickInter), i.data.kickBcak = !1;
                } else {
                    s++, i.data.times = s, s > 30 && (i.data.times = 0, clearInterval(i.data.kickInter), 
                    i.data.kickBcak = !1);
                    var g = 0, l = 0;
                    1 == e ? (g = Math.ceil(t.schedule * (t.imgMaxHeight - t.imgMinHeight) + t.imgMinHeight), 
                    l = Math.ceil(a.schedule * a.imgMaxHeight)) : 2 == e && (g = Math.ceil(t.schedule * t.imgMaxHeight), 
                    l = Math.ceil(a.schedule * (a.imgMaxHeight - a.imgMinHeight) + a.imgMinHeight)), 
                    t.height = g > t.imgMaxHeight ? t.imgMaxHeight : g, a.height = l > a.imgMaxHeight ? a.imgMaxHeight : l, 
                    i.updateSchedule();
                }
            }, 16);
        },
        easeOut: function(t, a, e, i) {
            return -e * (t /= i) * (t - 2) + a;
        },
        easeOut3: function(t, a, e, i) {
            return -e * ((t = t / i - 1) * t * t * t - 1) + a;
        },
        swiperTouchStart: function() {
            var t = {
                type: 0
            };
            this.triggerEvent("swipeTouchEvent", t, {});
        },
        swiperTouchEnd: function() {
            var t = {
                type: 1
            };
            this.triggerEvent("swipeTouchEvent", t, {});
        }
    }
});