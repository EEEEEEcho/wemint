getApp();

var o = require("../../utils/wxapp.js"), t = require("../../utils/wxcomm.js"), n = require("../../utils/util.js");

Page({
    data: {
        couponList: []
    },
    onLoad: function(o) {
        this.getRecommend(0);
    },
    toSearch: function() {
        console.log("搜搜");
    },
    getRecommend: function(e) {
        var i = this, r = wx.getStorageSync("user").openId, a = o.projectUrl + "/miniProgram/recommend", u = {
            smallOpenId: r,
            longitude: 113.331169,
            latitude: 22.992849,
            merchantType: e
        };
        t.reqPost(a, u, "application/x-www-form-urlencoded").then(function(o) {
            if (i.setData({
                couponList: []
            }), null !== o.data.rows) {
                var t = !0, e = !1, r = void 0;
                try {
                    for (var a, u = o.data.rows[Symbol.iterator](); !(t = (a = u.next()).done); t = !0) {
                        var c = a.value;
                        n.couponLimit(c);
                    }
                } catch (o) {
                    o = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(o);
                    e = !0, r = o;
                } finally {
                    try {
                        !t && u.return && u.return();
                    } finally {
                        if (e) throw r;
                    }
                }
                i.setData({
                    couponList: o.data.rows
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});