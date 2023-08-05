function e(e) {
    if (void 0 != e) return new Array(2 - e.toString().length + 1).join("0") + e;
}

var t = function(e) {
    var t = this;
    this.page = e.page, this.height = void 0 != e.height ? e.height : 600, this.success = void 0 != e.success ? e.success : function() {};
    this.page.setData({
        pickerViewHeight: this.height - 100
    }), this.pickerTimeout = null, "slide" == e.animation || "fade" == e.animation ? (this.animationType = "slide", 
    this.duration = void 0 != e.duration ? e.duration : 500, this.TimingFunction = void 0 != e.timingFunction ? e.timingFunction : "linear", 
    this.thisDelay = void 0 != e.delay ? e.delay : 0, this.animation = e.animation, 
    this.page.pickerClear = function() {
        t.onBeforeClear && t.onBeforeClear(t.page, t.pickerName);
        var e = {};
        e[t.pickerName] = "", e.pickerAnimation = t.pickerHideAnimation.export(), clearTimeout(t.pickerTimeout), 
        t.pickerTimeout = setTimeout(function() {
            t.page.setData({
                pickerViewShow: !1
            });
        }, t.duration), this.setData(e), t.onClear && t.onClear(t.page, t.pickerName);
    }, this.page.pickerCancel = function() {
        var e = {};
        e.pickerAnimation = t.pickerHideAnimation.export(), clearTimeout(t.pickerTimeout), 
        t.pickerTimeout = setTimeout(function() {
            t.page.setData({
                pickerViewShow: !1
            });
        }, t.duration), wx.getStorageSync("oldtime") && t.page.setData(wx.getStorageSync("oldtime")), 
        wx.removeStorageSync("val1"), wx.removeStorageSync("val2"), this.setData(e), this.setData({
            showTimeChoose: !1
        });
    }, this.page.pickerOk = function() {
        t.onBeforeSure && t.onBeforeSure(t.page, t.pickerName);
        var e = {};
        if (e.pickerAnimation = t.pickerHideAnimation.export(), this.setData(e), clearTimeout(t.pickerTimeout), 
        t.pickerTimeout = setTimeout(function() {
            t.page.setData({
                pickerViewShow: !1
            });
        }, t.duration), t.success(), t.onSure && t.onSure(t.page, t.pickerName), wx.getStorageSync("newtime")) {
            var r = wx.getStorageSync("newtime");
            wx.setStorageSync("oldtime", r);
        }
        "" !== wx.getStorageSync("val1") && wx.setStorageSync("newVal1", wx.getStorageSync("val1")), 
        "" !== wx.getStorageSync("val2") && wx.setStorageSync("newVal2", wx.getStorageSync("val2")), 
        this.setData({
            showTimeChoose: !1
        });
    }) : (this.animation = "", this.page.pickerClear = function() {
        t.onBeforeClear && t.onBeforeClear(t.page, t.pickerName);
        var e = {};
        e[t.pickerName] = "", e.pickerViewShow = !1, this.setData(e), t.onClear && t.onClear(t.page, t.pickerName);
    }, this.page.pickerCancel = function() {
        var e = {};
        e.pickerViewShow = !1, this.setData(e), this.setData({
            showTimeChoose: !1
        });
    }, this.page.pickerOk = function() {
        t.onBeforeSure && t.onBeforeSure(t.page, t.pickerName), this.setData({
            pickerViewShow: !1
        }), t.success(), t.onSure && t.onSure(t.page, t.pickerName), this.setData({
            showTimeChoose: !1
        });
    });
};

t.prototype.setPicker = function(t, r, i) {
    var a = this;
    r.onBeforeSure && (a.onBeforeSure = r.onBeforeSure), r.onSure && (a.onSure = r.onSure), 
    r.onBeforeClear && (a.onBeforeClear = r.onBeforeClear), r.onClear && (a.onClear = r.onClear);
    var n = null;
    if (i) {
        var o = i.split(/[年月日时点:\s\-]+/);
        i = new Date(o[0], parseInt(o[1]) - 1, o[2], o[3], o[4]), n = new Date(o[0], parseInt(o[1]) - 1, o[2]);
        var s = i.getHours() < 10 ? "0" + i.getHours() : i.getHours(), c = i.getMinutes() < 10 ? "0" + i.getMinutes() : i.getMinutes(), p = i.getMonth() + 1, u = i.getFullYear() + "年" + p + "月" + i.getDate() + "日 " + s + ":" + c;
        wx.setStorageSync("originTime", {
            originTime: u
        });
    }
    if (void 0 == this.page.data[t] || "" == this.page.data[t]) {
        var g, h = (g = i || new Date()).getFullYear(), k = g.getMonth() + 1, l = g.getDate(), m = g.getHours(), S = g.getMinutes(), w = new Object();
        w[t] = i ? i.getFullYear() + "年" + (i.getMonth() + 1) + "月" + i.getDate() + "日 " + e(i.getHours()) + ":" + e(i.getMinutes()) : h + "年" + k + "月" + l + "日 " + e(m) + ":" + e(S), 
        wx.setStorageSync("oldtime", w), this.page.setData(w);
    } else var h = (g = new Date(Date.parse(this.page.data[t].replace("年", "/").replace("月", "/").replace("日", "")))).getFullYear(), k = g.getMonth() + 1, l = g.getDate(), m = g.getHours(), S = g.getMinutes();
    this.pickerName = t, this.pickerDateTextArr = [], this.pickerDateValueArr = [], 
    this.pickerHourTextArr = [], this.pickerHourValueArr = [], this.pickerMinuteTextArr = [], 
    this.pickerMinuteValueArr = [];
    var D = new Date(), x = D.getFullYear();
    D.getHours(), D.getMinutes();
    new Date(x - 1, 2, 0).getDate();
    for (var T = D.getMonth() + 1, A = D.getDate(), f = [ "日", "一", "二", "三", "四", "五", "六" ], v = 0, y = 0, d = 0, V = x - 1; V <= x + 1; V++) for (var H = 1; H <= 12; H++) for (var M = new Date(V, H, 0).getDate(), C = 1; C <= M; C++) if (!(n && new Date(V + "/" + H + "/" + C).getTime() < n.getTime())) {
        var B = f[new Date(V, H - 1, C).getDay()];
        C == A && H == T && V == x ? this.pickerDateTextArr.push("今日") : this.pickerDateTextArr.push(H + "月" + C + "日 星期" + B), 
        this.pickerDateValueArr.push(V + "年" + H + "月" + C + "日"), C == l && H == k && V == h && (v = this.pickerDateTextArr.length - 1);
    }
    if (0 === v) {
        if (y = wx.getStorageSync("newVal1") ? wx.getStorageSync("newVal1") : 0, wx.getStorageSync("originTime")) {
            var u = wx.getStorageSync("originTime"), F = new Date(Date.parse(u.originTime.replace("年", "/").replace("月", "/").replace("日", "")));
            0 === y ? m = F.getHours() : (m = F.getHours(), S = 0);
        }
        for (var N = 0; N < 24; N++) N >= m && (this.pickerHourValueArr.push(N), this.pickerHourTextArr.push(e(N) + "时"));
        for (var I = 0; I < 60; I++) I >= S && (this.pickerMinuteValueArr.push(I), this.pickerMinuteTextArr.push(e(I) + "分"), 
        d = wx.getStorageSync("newVal2") ? wx.getStorageSync("newVal2") : 0);
    } else {
        for (var Y = 0; Y < 24; Y++) this.pickerHourValueArr.push(Y), this.pickerHourTextArr.push(e(Y) + "时"), 
        m == Y && (y = Y);
        for (var O = 0; O < 60; O++) this.pickerMinuteValueArr.push(O), this.pickerMinuteTextArr.push(e(O) + "分"), 
        S == O && (d = O);
    }
    wx.setStorageSync("pickerDateIndex", v);
    var P = {};
    if (P.pickerDateTextArr = this.pickerDateTextArr, P.pickerHourTextArr = this.pickerHourTextArr, 
    P.pickerMinuteTextArr = this.pickerMinuteTextArr, P.pickDatetimeValue = [ v, y, d ], 
    this.page.setData(P), "" == this.animation) this.page.setData({
        pickerViewShow: !0
    }); else {
        var b = wx.createAnimation({
            duration: a.duration,
            timingFunction: a.thisTimingFunction,
            delay: a.thisDelay,
            transformOrigin: "50% 50% 0",
            success: function(e) {}
        }), j = wx.createAnimation({
            duration: a.duration,
            timingFunction: a.TimingFunction,
            delay: a.Delay,
            transformOrigin: "50% 50% 0",
            success: function(e) {}
        });
        clearTimeout(this.pickerTimeout), "slide" == this.animation ? (this.pickerShowAnimation = b.height(this.height + "rpx").step(), 
        this.pickerHideAnimation = j.height(0).step(), this.page.setData({
            pickerViewShow: !0,
            pickerViewStyle: "height:0;"
        })) : (this.pickerShowAnimation = b.opacity(1).step(), this.pickerHideAnimation = j.opacity(0).step(), 
        this.page.setData({
            pickerViewShow: !0,
            pickerViewStyle: "opacity:0;"
        })), this.page.setData({
            pickerAnimation: a.pickerShowAnimation.export()
        });
    }
    this.page.bindDateTimeChange = function(r) {
        var i = r.detail.value;
        if (wx.getStorageSync("originTime")) {
            var o = wx.getStorageSync("originTime"), s = new Date(Date.parse(o.originTime.replace("年", "/").replace("月", "/").replace("日", "")));
            m = s.getHours(), S = s.getMinutes();
        }
        a.pickerName = t, a.pickerDateTextArr = [], a.pickerDateValueArr = [], a.pickerHourTextArr = [], 
        a.pickerHourValueArr = [], a.pickerMinuteTextArr = [], a.pickerMinuteValueArr = [];
        var c = new Date(), p = c.getFullYear();
        c.getHours(), c.getMinutes();
        new Date(p - 1, 2, 0).getDate();
        for (var u = c.getMonth() + 1, g = c.getDate(), w = [ "日", "一", "二", "三", "四", "五", "六" ], D = 0, x = 0, T = 0, A = p - 1; A <= p + 1; A++) for (var f = 1; f <= 12; f++) for (var v = new Date(A, f, 0).getDate(), y = 1; y <= v; y++) if (!(n && new Date(A + "/" + f + "/" + y).getTime() < n.getTime())) {
            var d = w[new Date(A, f - 1, y).getDay()];
            y == g && f == u && A == p ? a.pickerDateTextArr.push("今日") : a.pickerDateTextArr.push(f + "月" + y + "日 星期" + d), 
            a.pickerDateValueArr.push(A + "年" + f + "月" + y + "日"), y == l && f == k && A == h && (D = i[0]);
        }
        var V = wx.getStorageSync("pickerDateIndex");
        if (0 !== i[0]) {
            for (var H = 0; H < 24; H++) a.pickerHourValueArr.push(H), a.pickerHourTextArr.push(e(H) + "时"), 
            x = i[1];
            for (var M = 0; M < 60; M++) a.pickerMinuteValueArr.push(M), a.pickerMinuteTextArr.push(e(M) + "分"), 
            T = i[2];
            i[0] !== V ? (x = 0, T = 0, wx.setStorageSync("pickerDateIndex", D)) : (x = i[1], 
            T = i[2]);
        } else {
            for (var C = 0; C < 24; C++) C >= m && (a.pickerHourValueArr.push(C), a.pickerHourTextArr.push(e(C) + "时"));
            if (i[0] !== V ? (x = 0, T = 0, i[1] = 0, i[2] = 0, wx.setStorageSync("pickerDateIndex", D)) : (x = i[1], 
            T = i[2]), 0 != x) for (var B = 0; B < 60; B++) a.pickerMinuteValueArr.push(B), 
            a.pickerMinuteTextArr.push(e(B) + "分"); else for (var F = 0; F < 60; F++) F >= S && (a.pickerMinuteValueArr.push(F), 
            a.pickerMinuteTextArr.push(e(F) + "分"));
        }
        var N = {};
        N.pickerDateTextArr = a.pickerDateTextArr, N.pickerHourTextArr = a.pickerHourTextArr, 
        N.pickerMinuteTextArr = a.pickerMinuteTextArr, N.pickDatetimeValue = [ D, x, T ], 
        N[t] = a.pickerDateValueArr[D] + " " + e(a.pickerHourValueArr[x]) + ":" + e(a.pickerMinuteValueArr[T]);
        var I = {
            PickupTime: N.PickupTime
        };
        wx.setStorageSync("newtime", I), wx.setStorageSync("val1", i[1]), wx.setStorageSync("val2", i[2]), 
        this.setData(N);
    };
}, module.exports = {
    pickerDatetime: t
};