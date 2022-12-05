var e, t = require("./config"), n = require("./common/ajax/ajax"), o = wx.getExtConfigSync ? wx.getExtConfigSync() : {};

o.host = o.host || t.host, o.appid = o.appid || "wx014ec5a60f84cced", o.secret = o.secret || "06190c25a34a919244745a521ba964cc",
o.title = o.title || "机油电池批发", o.uid = o.cid || 5849, o.actHost = t.actHost, n.setGlobalParam(o);

var r = {
    host: o.host,
    actHost: o.actHost,
    config: o,
    shareFunc: function() {
        var e = wx.getStorageSync("upperuid"), t = "pages/index/index";
        return e && (t += "?upperuid=" + e), {
            title: o.title,
            path: t
        };
    },
    globalData: {
        evt: "dev"
    },
    onLaunch: function() {
        wx.removeStorageSync("city");
    },
    onShow: function(t) {
        var n, o = t.query, r = o.upperuid;
        0 == (n = (n = e.getQ(t.q) || o.scene || t.scene || "") ? decodeURIComponent(n) : "").indexOf("upperuid_") && (r = t.scene.split("_")[1] || ""),
        r = wx.getStorageSync("upperuid") || r, wx.setStorageSync("upperuid", r), this.bindUpperUid(r);
    },
    bindUpperUid: function(e) {
        wx.getStorageSync("hasBind");
        var t = wx.getStorageSync("userinfo") || {};
        (e = e || wx.getStorageSync("upperuid")) && t && t.token && n.query({
            url: this.host + "/app/binding",
            param: {
                parentUserId: e
            }
        }, function(e) {
            "0000" != e.code && "1003" != e.code || wx.setStorageSync("hasBind", !0);
        });
    }
};

e = {
    getQ: function(t) {
        t = t || "";
        return t = decodeURIComponent(t), t = e.urlToObj(t), decodeURIComponent(t.scene || "") || "";
    },
    urlToObj: function(e) {
        var t, n, o, r = {};
        for (t = 0, n = (e = (e = e || "").split("&")).length; t < n; ++t) 2 == (o = e[t].split("=")).length && (r[o[0]] = o[1]);
        return r;
    }
}, App(r);