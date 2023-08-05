var t = require("./utils/storage.js"), a = require("./utils/mtaUtil.js"), e = require("./api/apiInstance.js"), s = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./store"));

App({
    onLaunch: function(t) {
        this.setNavigateSize(), (0, a.mtaAppInit)(t), this.getUser();
    },
    getUser: function() {
        var i = (0, t.getUser)();
        if ("" != i) {
            s.default.data.userInfo = i, s.default.data.isLogin = !0;
            var n = {
                accesstoken: s.default.data.userInfo.accesstoken
            };
            (0, e.getAnalyticsData)(n, function(t) {
                for (var e = 0; e < t.data.length; e++) (0, a.mtaEventStat)(t.data[e], {});
            });
        }
    },
    setNavigateSize: function() {
        var t, a = wx.getSystemInfoSync(), e = a.statusBarHeight, s = a.system.indexOf("iOS") > -1, i = a.model.search("iPhone X") > -1;
        this.globalData.isIphoneX = !!i, t = s ? 44 : 48, this.globalData.navH = t, this.globalData.status = e;
    },
    globalData: {
        navH: 0,
        status: 0,
        isIphoneX: !1,
        screenWidth: 0,
        windowWidth: 0
    }
});