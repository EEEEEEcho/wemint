function e(e) {
    if (Array.isArray(e)) {
        for (var r = 0, t = Array(e.length); r < e.length; r++) t[r] = e[r];
        return t;
    }
    return Array.from(e);
}

function r(e) {
    return e < 10 ? "0" + e : "" + e;
}

function t(e, t) {
    for (var e = e || 0, t = t || 1, a = [], n = e; n <= t; n++) a.push(r(n));
    return a;
}

function a(e, r) {
    var a = e % 400 == 0 || e % 4 == 0 && e % 100 != 0, n = null;
    switch (r) {
      case "01":
      case "03":
      case "05":
      case "07":
      case "08":
      case "10":
      case "12":
        n = t(1, 31);
        break;

      case "04":
      case "06":
      case "09":
      case "11":
        n = t(1, 30);
        break;

      case "02":
        n = a ? t(1, 29) : t(1, 28);
        break;

      default:
        n = "月份格式不正确，请重新输入！";
    }
    return n;
}

function n() {
    var e = new Date();
    return [ r(e.getFullYear()), r(e.getMonth() + 1), r(e.getDate()), r(e.getHours()), r(e.getMinutes()), r(e.getSeconds()) ];
}

module.exports = {
    dateTimePicker: function(r, c, s) {
        var u = [], i = [ [], [], [], [], [], [] ], o = r || 1978, f = c || 2100, l = s ? [].concat(e(s.split(" ")[0].split("-")), e(s.split(" ")[1].split(":"))) : n();
        return i[0] = t(o, f), i[1] = t(1, 12), i[2] = a(l[0], l[1]), i[3] = t(0, 23), i[4] = t(0, 59), 
        i[5] = t(0, 59), i.forEach(function(e, r) {
            u.push(e.indexOf(l[r]));
        }), {
            dateTimeArray: i,
            dateTime: u
        };
    },
    getMonthDay: a
};