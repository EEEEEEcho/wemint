function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    return function() {
        var a = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function n(o, r) {
                try {
                    var i = a[o](r), u = i.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!i.done) return Promise.resolve(u).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(u);
            }
            return n("next");
        });
    };
}

var t = e(require("../../lib/runtime")), n = (e(require("../../lib/requestConfig")), 
e(require("../../utils/monitor.js"))), o = require("../../utils/util.js"), r = getApp(), i = (require("../../config.js"), 
require("../../getlogininfo.js")), u = (i.authorizeInfo, i.getUserInfo, "");

Page({
    data: {
        phoneFun: function() {
            console.log(1111);
        },
        coverImage: ""
    },
    onShow: function(e) {
        n.default.pageShow();
        var a = {
            pvId: "p_2cmina_44",
            type: "PV",
            pvCurPageName: "qingquishouquanshoujihao",
            pvLastPageName: r.globalData.pageDesc || "",
            pvCurPageParams: "",
            pvPageLoadTime: ""
        };
        o.trackRequest(a);
    },
    onUnload: function() {},
    onHide: function() {},
    getCurrentPageParam: function() {
        return u;
    },
    onLoad: function(e) {
        var n = this;
        u = JSON.stringify(e), wx.hideLoading();
        var o = e.tbfShareCoverImg;
        this.data.tbfShareCoverImg = -1 == decodeURIComponent(r.globalData.tfbSetUrl).indexOf("defaultImg=1") ? o : "", 
        this.setData({
            coverImage: decodeURIComponent(this.data.tbfShareCoverImg) || r.globalData.shareCardImage
        }), r.login(a(t.default.mark(function e() {
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    n.authorizeIndexPhone(function() {
                        n.goToShare();
                    });

                  case 1:
                  case "end":
                    return e.stop();
                }
            }, e, n);
        })));
    },
    goToShare: function() {
        var e = this;
        r.createXcxQrCode({
            tfbUrl: decodeURIComponent(r.globalData.tfbSetUrl),
            subtype: "tfb"
        }, function(a) {
            if (a) {
                var t = "";
                r.globalData.EnumList && r.globalData.EnumList.forEach(function(e, a) {
                    "tfb_card" == e.name && (t = e.value);
                });
                var n = {
                    type: 4,
                    imgUrl: decodeURIComponent(e.data.tbfShareCoverImg) || r.globalData.shareCardImage,
                    qcode: a,
                    bottomText: t || "扫描二维码，立即进入线上售楼处",
                    pvCurPageName: "toufangbaofenxiangkapian",
                    pvId: "p_2cmina_58",
                    pvCurPageParams: u
                };
                r.globalData.shareCardData = JSON.stringify(n), wx.redirectTo({
                    url: "../shareCard/shareCard"
                });
            }
        }, function(e) {
            console.log("生成小程序二维码失败", e);
        }, "/pages/webView/webView");
    },
    afterPhoneHandle: function(e) {
        var a = {
            clkDesPage: "tfbSharePage",
            type: "CLK",
            pvCurPageName: "tfbSharePage",
            pvCurPageParams: u,
            clkId: "clk_2cmina_137",
            clkName: "weixinshouquan",
            clkParams: {
                "wx.authorize.scope": "wx.getPhoneNum",
                type: e.detail ? e.detail.type : e.type
            }
        };
        o.trackRequest(a), r.globalData.tmpPhone_tfb = !0, this.goToShare();
    },
    getPhoneNumber: function(e) {
        var a = this;
        wx.setStorageSync("ISauthorizePhone", !0);
        var t = e.detail.iv, n = (e.detail.errMsg, r.globalData.houseid, r.globalData.tonken || ""), o = e.detail.encryptedData, i = r.globalData.sessionKey, u = r.globalData.appid;
        console.log("***token***", n), r.globalData.tmpPhone = !0, console.log("****getPhoneNumber****"), 
        a.data.phoneFun = function() {
            a.goToShare();
        }, a.data.phoneFailFun = function() {
            a.goToShare();
        }, !e.detail.encryptedData || e.detail.errMsg.includes("deny") ? "function" == typeof a.data.phoneFailFun && a.data.phoneFailFun() : (o && i && t || wx.showToast({
            title: "系统提示:授权信息错误",
            icon: "warn",
            duration: 1500
        }), r.globalData.single ? r.getPhone(a, o, i, u, t, n) : a.data.setInter = setInterval(function() {
            r.globalData.single && (r.getPhone(a, o, i, u, t, n), clearInterval(a.data.setInter));
        }, 200));
    },
    authorizeIndexPhone: function(e, a) {
        r.globalData.phone && "function" == typeof e && e();
    }
}, n.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));