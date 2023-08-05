Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.mtaAppInit = function(t) {
    e.App.init({
        appID: "500688342",
        eventID: "500688343",
        lauchOpts: t,
        statPullDownFresh: !0,
        statShareApp: !0,
        statReachBottom: !0,
        autoReport: !0,
        statParam: !0,
        ignoreParams: []
    });
}, exports.mtaPageInit = function() {
    var a = (0, t.getUser)();
    "" != a && (e.Data.userInfo = {
        phone: a.mobile
    }), e.Page.init();
}, exports.mtaEventStat = function(t, a) {
    e.Event.stat(t, a);
};

var t = require("./storage.js"), e = require("./mta_analysis.js");