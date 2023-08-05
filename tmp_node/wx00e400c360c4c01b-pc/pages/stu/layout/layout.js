function t(t, a, e, i) {
    a < 10 && (a = "0" + a), e < 10 && (e = "0" + e), wx.request({
        url: c.localUrl + "mobileXcx/todayClassStu",
        data: {
            ccm_id: s.globalData.csc.ccm_id,
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

var a = null, e = null, c = require("../../../utils/main.js"), s = (require("../../../utils/util.js"), 
getApp()), i = {
    data: {
        hasEmptyGrid: !1,
        showPicker: !1,
        todayClass: []
    },
    onLoad: function() {
        var a = this, e = new Date(), c = e.getFullYear(), s = e.getMonth() + 1, i = [ "日", "一", "二", "三", "四", "五", "六" ];
        this.calculateEmptyGrids(c, s), this.calculateDays(c, s), this.setData({
            curYear: c,
            curMonth: s,
            weeksCh: i,
            checkYear: c,
            checkMonth: s,
            checkDay: e.getDate()
        }), this.checkToDay(), t(c, s, e.getDate(), function(t) {
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
        var e = this.getFirstDayOfWeek(t, a), c = [];
        if (e > 0) {
            for (var s = 0; s < e; s++) c.push(s);
            this.setData({
                hasEmptyGrid: !0,
                empytGrids: c
            });
        } else this.setData({
            hasEmptyGrid: !1,
            empytGrids: []
        });
    },
    calculateDays: function(t, a) {
        for (var e = [], c = this.getThisMonthDays(t, a), s = 1; s <= c; s++) e.push({
            day: s,
            choosed: !1
        });
        this.setData({
            days: e
        });
    },
    handleCalendar: function(t) {
        var a = t.currentTarget.dataset.handle, e = this.data.curYear, c = this.data.curMonth;
        if ("prev" === a) {
            var s = c - 1, i = e;
            s < 1 && (i = e - 1, s = 12), this.calculateDays(i, s), this.calculateEmptyGrids(i, s), 
            this.setData({
                curYear: i,
                curMonth: s
            });
        } else {
            var r = c + 1, h = e;
            r > 12 && (h = e + 1, r = 1), this.calculateDays(h, r), this.calculateEmptyGrids(h, r), 
            this.setData({
                curYear: h,
                curMonth: r
            });
        }
        this.checkToDay();
    },
    tapDayItem: function(a) {
        var e = this, c = a.currentTarget.dataset.idx, s = this.data.days, i = this.data.curYear, r = this.data.curMonth;
        for (var h in s) s[h].choosed = !1;
        s[c].choosed = !0, this.setData({
            days: s,
            checkYear: i,
            checkMonth: r,
            checkDay: s[c].day
        }), t(i, r, s[c].day, function(t) {
            e.setData({
                todayClass: t
            });
        });
    },
    chooseYearAndMonth: function() {
        for (var t = this.data.curYear, a = this.data.curMonth, e = [], c = [], s = 1900; s <= 2100; s++) e.push(s);
        for (var i = 1; i <= 12; i++) c.push(i);
        var r = e.indexOf(t), h = c.indexOf(a);
        this.setData({
            pickerValue: [ r, h ],
            pickerYear: e,
            pickerMonth: c,
            showPicker: !0
        });
    },
    pickerChange: function(t) {
        var c = t.detail.value;
        a = this.data.pickerYear[c[0]], e = this.data.pickerMonth[c[1]];
    },
    tapPickerBtn: function(t) {
        var c = {
            showPicker: !1
        };
        "confirm" === t.currentTarget.dataset.type && null != a & null != e && (c.curYear = a, 
        c.curMonth = e, this.calculateEmptyGrids(a, e), this.calculateDays(a, e)), this.setData(c), 
        this.checkToDay();
    },
    checkToDay: function() {
        var t = this, a = t.data.days, e = this.data.curYear, c = this.data.curMonth, s = this.data.checkYear, i = this.data.checkMonth, r = t.data.checkDay;
        e == s & c == i && (a[r - 1].choosed = !0, t.setData({
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