function t(t, a, e, i) {
    a < 10 && (a = "0" + a), e < 10 && (e = "0" + e), wx.request({
        url: s.localUrl + "mobileXcx/todayClass",
        data: {
            tId: c.globalData.teacher.id,
            dayTime: t + "-" + a + "-" + e
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            i(t.data.dataInfo.classList);
        }
    });
}

var a = null, e = null, s = require("../../../utils/main.js"), c = (require("../../../utils/util.js"), 
getApp()), i = {
    data: {
        hasEmptyGrid: !1,
        showPicker: !1,
        todayClass: []
    },
    onLoad: function() {
        var a = this, e = new Date(), s = e.getFullYear(), c = e.getMonth() + 1, i = [ "日", "一", "二", "三", "四", "五", "六" ];
        this.calculateEmptyGrids(s, c), this.calculateDays(s, c), this.setData({
            curYear: s,
            curMonth: c,
            weeksCh: i,
            checkYear: s,
            checkMonth: c,
            checkDay: e.getDate()
        }), this.checkToDay(), t(s, c, e.getDate(), function(t) {
            a.setData({
                todayClass: t
            });
        });
    },
    getThisMonthDays: function(t, a) {
        return new Date(t, a, 0).getDate();
    },
    getFirstDayOfWeek: function(t, a) {
        return new Date(Date.UTC(t, a - 1, 1)).getDay();
    },
    calculateEmptyGrids: function(t, a) {
        var e = this.getFirstDayOfWeek(t, a), s = [];
        if (e > 0) {
            for (var c = 0; c < e; c++) s.push(c);
            this.setData({
                hasEmptyGrid: !0,
                empytGrids: s
            });
        } else this.setData({
            hasEmptyGrid: !1,
            empytGrids: []
        });
    },
    calculateDays: function(t, a) {
        for (var e = [], s = this.getThisMonthDays(t, a), c = 1; c <= s; c++) e.push({
            day: c,
            choosed: !1
        });
        this.setData({
            days: e
        });
    },
    handleCalendar: function(t) {
        var a = t.currentTarget.dataset.handle, e = this.data.curYear, s = this.data.curMonth;
        if ("prev" === a) {
            var c = s - 1, i = e;
            c < 1 && (i = e - 1, c = 12), this.calculateDays(i, c), this.calculateEmptyGrids(i, c), 
            this.setData({
                curYear: i,
                curMonth: c
            });
        } else {
            var r = s + 1, h = e;
            r > 12 && (h = e + 1, r = 1), this.calculateDays(h, r), this.calculateEmptyGrids(h, r), 
            this.setData({
                curYear: h,
                curMonth: r
            });
        }
        this.checkToDay();
    },
    tapDayItem: function(a) {
        var e = this, s = a.currentTarget.dataset.idx, c = this.data.days, i = this.data.curYear, r = this.data.curMonth;
        for (var h in c) c[h].choosed = !1;
        c[s].choosed = !0, this.setData({
            days: c,
            checkYear: i,
            checkMonth: r,
            checkDay: c[s].day
        }), t(i, r, c[s].day, function(t) {
            e.setData({
                todayClass: t
            });
        });
    },
    chooseYearAndMonth: function() {
        for (var t = this.data.curYear, a = this.data.curMonth, e = [], s = [], c = 1900; c <= 2100; c++) e.push(c);
        for (var i = 1; i <= 12; i++) s.push(i);
        var r = e.indexOf(t), h = s.indexOf(a);
        this.setData({
            pickerValue: [ r, h ],
            pickerYear: e,
            pickerMonth: s,
            showPicker: !0
        });
    },
    pickerChange: function(t) {
        var s = t.detail.value;
        a = this.data.pickerYear[s[0]], e = this.data.pickerMonth[s[1]];
    },
    tapPickerBtn: function(t) {
        var s = {
            showPicker: !1
        };
        "confirm" === t.currentTarget.dataset.type && null != a & null != e && (s.curYear = a, 
        s.curMonth = e, this.calculateEmptyGrids(a, e), this.calculateDays(a, e)), this.setData(s), 
        this.checkToDay();
    },
    checkToDay: function() {
        var t = this, a = t.data.days, e = this.data.curYear, s = this.data.curMonth, c = this.data.checkYear, i = this.data.checkMonth, r = t.data.checkDay;
        e == c & s == i && (a[r - 1].choosed = !0, t.setData({
            days: a
        }));
    },
    backLoad: function() {
        var a = this;
        t(this.data.checkYear, this.data.checkMonth, this.data.checkDay, function(t) {
            a.setData({
                todayClass: t
            });
        });
    },
    layoutDetail: function(t) {
        var a = t.currentTarget.dataset.ccm_id, e = t.currentTarget.dataset.class_time;
        wx.navigateTo({
            url: "../layoutDetail/detail?ccm_id=" + a + "&class_time=" + e
        });
    },
    layoutDetailView: function(t) {
        var a = t.currentTarget.dataset.ccm_id, e = t.currentTarget.dataset.class_time;
        wx.navigateTo({
            url: "../layoutDetailView/detailView?ccm_id=" + a + "&class_time=" + e
        });
    }
};

Page(i);