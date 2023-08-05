function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function a(r, o) {
                try {
                    var i = t[r](o), u = i.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void n(e);
                }
                if (!i.done) return Promise.resolve(u).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(u);
            }
            return a("next");
        });
    };
}

var n = e(require("../../../lib/requestConfig")), a = e(require("../../../lib/runtime")), r = require("../../../utils/util.js"), o = require("../../../config.js"), i = getApp(), u = "", s = "";

Page({
    data: {
        navbar: {
            showCapsule: 1,
            title: "组织信息",
            titleColor: "#121212",
            navPadding: 1,
            navBarColor: "#fff",
            navBackColor: "#161616",
            haveCallback: !1,
            fromShare: !1,
            pageId: null,
            pageName: ""
        },
        navigateStatusContainerHeight: "0px",
        projectList: []
    },
    onLoad: function(e) {
        this.setData({
            navigateStatusContainerHeight: i.globalData.navigateStatusContainerHeight + "px"
        }), u = JSON.stringify(e), this.getOrganizeHouseInfo();
    },
    onReady: function() {},
    onShow: function() {
        s = new Date().getTime();
        var e = {
            ip: i.globalData.ip,
            type: "PV",
            pvId: "p_2cmina_01016",
            pvCurPageName: "zuzhixinxi",
            pvCurPageParams: u,
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - s
        };
        r.trackRequest(e, i);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getCurrentPageParam: function() {
        return u;
    },
    getOrganizeHouseInfo: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var r, u;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return r = {
                        houseId: o.houseId,
                        mobile: i.globalData.phone || ""
                    }, console.log("getOrganizeHouseInfo", r), t.next = 4, (0, n.default)("organizeHouseInfo", r);

                  case 4:
                    u = t.sent, console.log("getOrganizeHouseInfo", u), u.success && e.setData({
                        projectList: u.list
                    });

                  case 7:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    }
});