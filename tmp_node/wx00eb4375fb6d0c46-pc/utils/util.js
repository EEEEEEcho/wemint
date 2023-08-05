function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    }
    return Array.from(e);
}

function t(e) {
    if (null != e && "" != e) {
        var t;
        return e instanceof Date ? t = e : isNaN(e) ? e.indexOf("/Date") > -1 ? (e = e.replace(/\/Date(−?\d+)\//, "$1"), 
        (t = new Date()).setTime(e)) : t = e.indexOf("/") > -1 ? new Date(Date.parse(e.replace(/-/g, "/"))) : new Date(e) : t = new Date(e), 
        t;
    }
}

var n = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

Array.prototype.filter = function() {
    for (var e = {}, t = [], n = 0; n < this.length; n++) this[n] = JSON.stringify(this[n]), 
    e[this[n]] || (e[this[n]] = 1, t.push(JSON.parse(this[n])));
    return t;
}, Date.prototype.format = function(e) {
    var t = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var n in t) new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[n] : ("00" + t[n]).substr(("" + t[n]).length)));
    return e;
}, module.exports = {
    formatTime: function(e) {
        var t = new Date(e).getFullYear(), i = new Date(e).getMonth() + 1, a = new Date(e).getDate(), r = new Date(e).getHours(), s = new Date(e).getMinutes(), l = new Date(e).getSeconds();
        return [ t, i, a ].map(n).join("/") + " " + [ r, s, l ].map(n).join(":");
    },
    json2Form: function(e) {
        var t = [];
        for (var n in e) t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
        return t.join("&");
    },
    formatDatebox: function(e, n) {
        return null == e || "" == e ? "" : t(e).format(n);
    },
    num_data: function(e, t) {
        var n = new Date(t.replace(/-/g, "/")), i = new Date(e.replace(/-/g, "/")), a = n.getTime() - i.getTime();
        return parseInt(a / 864e5);
    },
    couponLimit: function(t) {
        if (0 != t.minimumConsumption || 0 != t.useAlone || null != t.weekAvailble && "" != t.weekAvailble || null != t.disabledStartTime1 || null != t.disabledEndTime1 || null != t.disabledStartTime2 || null != t.disabledEndTime2) {
            var n = "";
            if (t.minimumConsumption > 0 && (n += "消费满" + t.minimumConsumption + "元可用、"), null !== t.weekAvailble && "" !== t.weekAvailble) {
                for (var i = "", a = [].concat(e(t.weekAvailble.split(";"))), r = 0; r < a.length; r++) {
                    var s = a[r];
                    1 == s && (i += "周日、"), 2 == s && (i += "周一、"), 3 == s && (i += "周二、"), 4 == s && (i += "周三、"), 
                    5 == s && (i += "周四、"), 6 == s && (i += "周五、"), 7 == s && (i += "周六、");
                }
                n += i.substr(0, i.length - 1) + "不可用、";
            }
            (t.useAlone || 1 == t.useAlone) && (n += "不可与折扣卡优惠共用、"), (t.useWithoutCard || 1 == t.useWithoutCard) && (n += "不可与储值卡共用、"), 
            t.disabledStartTime1 && t.disabledEndTime1 && (n += t.disabledStartTime1 + "点到" + t.disabledEndTime1 + "不可用、"), 
            t.disabledStartTime2 && t.disabledEndTime2 && (n += t.disabledStartTime2 + "点到" + t.disabledEndTime2 + "不可用、"), 
            n = n.substr(0, n.length - 1), t.extraParams = n;
        } else t.extraParams = "无门槛全场通用";
    }
};