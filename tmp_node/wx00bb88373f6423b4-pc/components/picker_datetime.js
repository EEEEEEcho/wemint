function e(e) {
    return new Array(2 - e.toString().length + 1).join("0") + e;
}

var i = function(e) {
    var i = this;
    this.page = e.page, this.height = void 0 != e.height ? e.height : 600, this.success = void 0 != e.success ? e.success : function() {};
    this.page.setData({
        pickerViewHeight: this.height - 100
    }), this.pickerTimeout = null, "slide" == e.animation || "fade" == e.animation ? (this.animationType = "slide", 
    this.duration = void 0 != e.duration ? e.duration : 500, this.TimingFunction = void 0 != e.timingFunction ? e.timingFunction : "linear", 
    this.thisDelay = void 0 != e.delay ? e.delay : 0, this.animation = e.animation, 
    this.page.pickerClear = function() {
        i.onBeforeClear && i.onBeforeClear(i.page, i.pickerName);
        var e = {};
        e[i.pickerName] = "", e.pickerAnimation = i.pickerHideAnimation.export(), clearTimeout(i.pickerTimeout), 
        i.pickerTimeout = setTimeout(function() {
            i.page.setData({
                pickerViewShow: !1
            });
        }, i.duration), this.setData(e), i.onClear && i.onClear(i.page, i.pickerName);
    }, this.page.pickerCancel = function() {
        var e = {};
        e.pickerAnimation = i.pickerHideAnimation.export(), clearTimeout(i.pickerTimeout), 
        i.pickerTimeout = setTimeout(function() {
            i.page.setData({
                pickerViewShow: !1
            });
        }, i.duration), this.setData(e);
    }, this.page.pickerOk = function() {
        i.onBeforeSure && i.onBeforeSure(i.page, i.pickerName);
        var e = {};
        e.pickerAnimation = i.pickerHideAnimation.export(), this.setData(e), clearTimeout(i.pickerTimeout), 
        i.pickerTimeout = setTimeout(function() {
            i.page.setData({
                pickerViewShow: !1
            });
        }, i.duration), i.success(), i.onSure && i.onSure(i.page, i.pickerName);
    }) : (this.animation = "", this.page.pickerClear = function() {
        i.onBeforeClear && i.onBeforeClear(i.page, i.pickerName);
        var e = {};
        e[i.pickerName] = "", e.pickerViewShow = !1, this.setData(e), i.onClear && i.onClear(i.page, i.pickerName);
    }, this.page.pickerCancel = function() {
        var e = {};
        e.pickerViewShow = !1, this.setData(e);
    }, this.page.pickerOk = function() {
        i.onBeforeSure && i.onBeforeSure(i.page, i.pickerName), this.setData({
            pickerViewShow: !1
        }), i.success(), i.onSure && i.onSure(i.page, i.pickerName);
    });
};

i.prototype.setPicker = function(i, t, r) {
    var a = this;
    t.onBeforeSure && (a.onBeforeSure = t.onBeforeSure), t.onSure && (a.onSure = t.onSure), 
    t.onBeforeClear && (a.onBeforeClear = t.onBeforeClear), t.onClear && (a.onClear = t.onClear);
    var n = null;
    if (r) {
        var o = r.split(/[年月日时点:\s\-]+/);
        r = new Date(o[0], parseInt(o[1]) - 1, o[2], o[3], o[4]), n = new Date(o[0], parseInt(o[1]) - 1, o[2]);
    }
    if (void 0 == this.page.data[i] || "" == this.page.data[i]) {
        var s = (k = new Date()).getFullYear(), p = k.getMonth() + 1, c = k.getDate(), u = k.getHours(), h = k.getMinutes(), g = new Object();
        g[i] = r ? r.getFullYear() + "年" + (r.getMonth() + 1) + "月" + r.getDate() + "日 " + e(r.getHours()) + ":" + e(r.getMinutes()) : s + "年" + p + "月" + c + "日 " + e(u) + ":" + e(h), 
        this.page.setData(g);
    } else var k = new Date(Date.parse(this.page.data[i].replace("年", "/").replace("月", "/").replace("日", "/"))), s = k.getFullYear(), p = k.getMonth() + 1, c = k.getDate(), u = k.getHours(), h = k.getMinutes();
    this.pickerName = i, this.pickerDateTextArr = [], this.pickerDateValueArr = [], 
    this.pickerHourTextArr = [], this.pickerHourValueArr = [], this.pickerMinuteTextArr = [], 
    this.pickerMinuteValueArr = [];
    var l = new Date(), m = l.getFullYear();
    l.getHours(), l.getMinutes();
    new Date(m - 1, 2, 0).getDate();
    for (var D = l.getMonth() + 1, f = l.getDate(), A = [ "日", "一", "二", "三", "四", "五", "六" ], w = 0, T = 0, d = 0, v = m - 1; v <= m + 1; v++) for (var S = 1; S <= 12; S++) for (var x = new Date(v, S, 0).getDate(), V = 1; V <= x; V++) if (!(n && new Date(v + "/" + S + "/" + V).getTime() < n.getTime())) {
        var C = A[new Date(v, S - 1, V).getDay()];
        V == f && S == D && v == m ? this.pickerDateTextArr.push("今日") : this.pickerDateTextArr.push(S + "月" + V + "日 星期" + C), 
        this.pickerDateValueArr.push(v + "年" + S + "月" + V + "日"), V == c && S == p && v == s && (w = this.pickerDateTextArr.length - 1);
    }
    for (var H = 0; H < 24; H++) this.pickerHourValueArr.push(H), this.pickerHourTextArr.push(e(H) + "时"), 
    u == H && (T = H);
    for (var y = 0; y < 60; y++) this.pickerMinuteValueArr.push(y), this.pickerMinuteTextArr.push(e(y) + "分"), 
    h == y && (d = y);
    var M = {};
    if (M.pickerDateTextArr = this.pickerDateTextArr, M.pickerHourTextArr = this.pickerHourTextArr, 
    M.pickerMinuteTextArr = this.pickerMinuteTextArr, M.pickDatetimeValue = [ w, T, d ], 
    this.page.setData(M), "" == this.animation) this.page.setData({
        pickerViewShow: !0
    }); else {
        var B = wx.createAnimation({
            duration: a.duration,
            timingFunction: a.thisTimingFunction,
            delay: a.thisDelay,
            transformOrigin: "50% 50% 0",
            success: function(e) {}
        }), F = wx.createAnimation({
            duration: a.duration,
            timingFunction: a.TimingFunction,
            delay: a.Delay,
            transformOrigin: "50% 50% 0",
            success: function(e) {}
        });
        clearTimeout(this.pickerTimeout), "slide" == this.animation ? (this.pickerShowAnimation = B.height(this.height + "rpx").step(), 
        this.pickerHideAnimation = F.height(0).step(), this.page.setData({
            pickerViewShow: !0,
            pickerViewStyle: "height:0;"
        })) : (this.pickerShowAnimation = B.opacity(1).step(), this.pickerHideAnimation = F.opacity(0).step(), 
        this.page.setData({
            pickerViewShow: !0,
            pickerViewStyle: "opacity:0;"
        })), this.page.setData({
            pickerAnimation: a.pickerShowAnimation.export()
        });
    }
    this.page.bindDateTimeChange = function(t) {
        var r = t.detail.value, n = {};
        n[i] = a.pickerDateValueArr[r[0]] + " " + e(a.pickerHourValueArr[r[1]]) + ":" + e(a.pickerMinuteValueArr[r[2]]), 
        this.setData(n);
    };
}, module.exports = {
    pickerDatetime: i
};