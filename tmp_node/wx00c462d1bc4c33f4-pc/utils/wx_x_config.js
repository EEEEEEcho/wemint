var t = {
    getWxPayOrdrID: function() {
        var t = new Date(), r = t.getFullYear(), g = t.getMonth() + 1, n = t.getDate(), i = t.getHours(), S = t.getMinutes(), e = t.getSeconds(), s = t.getMilliseconds();
        return g < 10 && (g = String(String(0) + String(g))), n < 10 && (n = String(String(0) + String(n))), 
        i < 10 && (i = String(String(0) + String(i))), S < 10 && (S = String(String(0) + String(S))), 
        e < 10 && (e = String(String(0) + String(e))), s < 10 ? s = String(String(0) + String(e)) : s >= 10 && s < 100 && (s = String(String(0) + String(e))), 
        String(r) + String(g) + String(n) + String(i) + String(S) + String(e) + String(s);
    }
};

module.exports = t;