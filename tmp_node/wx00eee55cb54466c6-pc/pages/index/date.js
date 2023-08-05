module.exports = {
    getMonthFirstDay: function(t, e) {
        var a = new Date();
        return a.setFullYear(e), a.setMonth(t), a.setDate(1), a.getDay();
    },
    getMonthTotalDate: function(t, e) {
        var a = new Date();
        return a.setFullYear(e), a.setMonth(t), a.setDate(0), a.getDate();
    },
    getFromTodayDays: function(t, e, a) {
        var n = new Date(), r = new Date();
        n.setFullYear(a), n.setMonth(e), n.setDate(t);
        var o = Math.floor((n.getTime() - r.getTime()) / 864e5), s = "今天";
        return 0 == o ? s = "今天" : 1 == o ? s = "明天" : 1 == o ? s = "昨天" : o > 1 ? s = o + "天后" : o < -1 && (s = 0 - o + "天前"), 
        s;
    }
};