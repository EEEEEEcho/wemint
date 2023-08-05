function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

require("../../utils/util.js");

var a, e = require("date.js"), o = require("getCNDate.js"), n = (getApp(), new Date());

Page((a = {
    data: {
        xsinfo: {},
        isshowrf: 0,
        list: [],
        dialog: 0,
        xstxt: "",
        MONTH_EN: [ "JAN ", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ],
        monthNum: n.getMonth() + 1,
        yearNum: n.getFullYear(),
        MonthDayArray: [],
        toDate: n.getDate(),
        toMonth: n.getMonth() + 1,
        toYear: n.getFullYear(),
        fromToday: "今天",
        nongliDetail: o(n.getFullYear(), n.getMonth() + 1, n.getDate())
    },
    onLoad: function(t) {
        this.loadXSinfo();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        this.setData({
            dialog: 0
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    submit: function(t) {
        console.log(t.detail.formId), this.saveUserFormid(t.detail.formId);
    },
    clickTap: function(t) {
        console.log(t.currentTarget.dataset.ss), this.addUserInter(t.currentTarget.dataset.ss);
    },
    saveUserFormid: function(t) {
        console.log("saveUserFormid");
        var a = getApp().globalData.BaseHost, e = getApp().globalData.appid;
        wx.request({
            url: a + "mini01/setGVuserFormidServlet",
            method: "POST",
            data: {
                openid: wx.getStorageSync("openid"),
                appid: e,
                formid: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {}
        });
    },
    loadXSinfo: function() {
        var t = this, a = getApp().globalData.BaseHost, e = getApp().globalData.appid;
        wx.request({
            url: a + "xs/getXSListByAppidServlet",
            method: "POST",
            data: {
                appid: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                console.log(a);
                var e = a.data[0].reviewcontent.replace(/<img\s/g, '<img width="100%" ');
                if (t.setData({
                    xsinfo: a.data[0],
                    xstxt: e
                }), "1" == a.data[0].isrf) {
                    var o = a.data[0].copytxt;
                    wx.setClipboardData({
                        data: o,
                        success: function(t) {
                            wx.getClipboardData({
                                success: function(t) {
                                    wx.showToast({
                                        title: "加载成功！"
                                    });
                                }
                            });
                        }
                    }), t.loadXSList(1);
                }
            }
        });
    },
    loadXSList: function(t) {
        var a = this, e = getApp().globalData.BaseHost;
        getApp().globalData.appid;
        wx.request({
            url: e + "xs/getXSListServlet",
            method: "POST",
            data: {
                page: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t);
                var e = t.data;
                a.shuffle(e), a.setData({
                    list: e,
                    isshowrf: 1
                });
            }
        });
    },
    addUserInter: function(t) {
        var a = this, e = getApp().globalData.BaseHost, o = getApp().globalData.appid;
        wx.request({
            url: e + "xs/addXSUserInterfaceServlet",
            method: "POST",
            data: {
                appid: o,
                xsid: t,
                openid: wx.getStorageSync("openid")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t), a.setData({
                    dialog: 1
                });
            }
        });
    },
    shuffle: function(t) {
        for (var a = t.length, e = 0; e < a - 1; e++) {
            var o = parseInt(Math.random() * (a - e)), n = t[o];
            t[o] = t[a - e - 1], t[a - e - 1] = n;
        }
    },
    dateClick: function(t) {
        for (var a = t.currentTarget.id, n = this.data.MonthDayArray, s = this.data, r = 0; r < n.length; r++) for (i = 0; i < n[r].length; i++) "string" != typeof n[r][i] && n[r][i].num == a && (n[r][i].isShowDayInfo = !n[r][i].isShowDayInfo);
        for (r = 0; r < n.length; r++) for (var i = 0; i < n[r].length; i++) "string" != typeof n[r][i] && n[r][i].num != a && (n[r][i].isShowDayInfo = !1);
        this.setData({
            MonthDayArray: n,
            toYear: s.yearNum,
            toMonth: s.monthNum,
            toDate: a,
            fromToday: e.getFromTodayDays(a, s.monthNum - 1, s.yearNum),
            nongliDetail: o(s.yearNum, s.monthNum, a)
        });
    },
    monthTouch: function(t) {
        var a = t.target.offsetLeft, e = t.changedTouches[0].clientX;
        console.log(a - e), a - e > 100 ? this.nextMonth_Fn() : a - e < -100 && this.lastMonth_Fn();
    },
    nextMonth_Fn: function() {
        var t = this.data.monthNum, a = this.data.yearNum;
        console.log(t), 12 == t ? this.setData({
            monthNum: 1,
            yearNum: a + 1
        }) : this.setData({
            monthNum: t + 1
        }), this.calcMonthDayArray();
    },
    lastMonth_Fn: function() {
        var t = this.data.monthNum, a = this.data.yearNum;
        console.log(t), 1 == t ? this.setData({
            monthNum: 12,
            yearNum: a - 1
        }) : this.setData({
            monthNum: t - 1
        }), this.calcMonthDayArray();
    }
}, t(a, "onShow", function() {
    console.log("onShow"), this.calcMonthDayArray();
}), t(a, "calcMonthDayArray", function() {
    for (var t = this.data, a = e.getMonthFirstDay(t.monthNum - 1, t.yearNum), s = e.getMonthTotalDate(t.monthNum, t.yearNum), r = [], i = [], l = 1; ;l++) {
        if (l <= a) i.push(""); else {
            if (!(l <= s + a)) {
                for (var h = i.length, u = 0; u + h < 7; u++) i.push("");
                r.push(i);
                break;
            }
            var g = o(t.yearNum, t.monthNum, l - a);
            i.push({
                num: l - a,
                isShowDayInfo: !1,
                nongli: g.slice(g.length - 2),
                nongliInfo: o(t.yearNum, t.monthNum, l - a),
                isToday: t.monthNum == n.getMonth() + 1 && l - a == n.getDate() && t.yearNum == n.getFullYear()
            });
        }
        7 == i.length && (r.push(i), i = []);
    }
    var c = t.monthNum != n.getMonth() + 1 || t.yearNum != n.getFullYear();
    if (c) for (l = 0; l < r[0].length; l++) 1 == r[0][l].num && (r[0][l].isShowDayInfo = !0);
    this.setData({
        MonthDayArray: r,
        toYear: c ? this.data.yearNum : n.getFullYear(),
        toMonth: c ? this.data.monthNum : n.getMonth() + 1,
        toDate: c ? 1 : n.getDate(),
        fromToday: c ? e.getFromTodayDays(1, t.monthNum - 1, t.yearNum) : "今天",
        nongliDetail: c ? o(t.yearNum, t.monthNum, 1) : o(n.getFullYear(), n.getMonth() + 1, n.getDate())
    });
}), a));