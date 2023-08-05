function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function n(o, i) {
                try {
                    var r = t[o](i), s = r.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!r.done) return Promise.resolve(s).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(s);
            }
            return n("next");
        });
    };
}

var a = e(require("../../lib/runtime")), n = e(require("../../lib/requestConfig")), o = e(require("../../utils/monitor.js")), i = require("../../utils/util.js"), r = require("../../config.js"), s = getApp(), l = require("../../getlogininfo.js"), u = (l.authorizeInfo, 
l.getUserInfo), g = "";

Page({
    data: {
        serverUrl: "http://skyforest.static.elab-plus.com/wepy_pro/v1-2/",
        count: "",
        list: [],
        pageNo: 1,
        total: "",
        pageSize: 20,
        showInfoModel: !1,
        showPhoneModel: !1,
        phoneFailFun: null,
        phoneFun: null,
        hasNotice: !1,
        setInter: null
    },
    onShow: function(e) {
        o.default.pageShow();
        var t = {
            type: "PV",
            pvId: "P_2cMINA_12",
            pvCurPageName: "xiaoxitongzhi",
            pvCurPageParams: g,
            pvLastPageName: getCurrentPages()[getCurrentPages().length - 2] ? getCurrentPages()[getCurrentPages().length - 2].data.despage : "",
            pvLastPageParams: "",
            pvPageLoadTime: ""
        };
        console.log(t, "埋点"), i.trackRequest(t, s);
    },
    onReady: function() {
        this.myLoading && this.myLoading.hideLoading(), wx.setNavigationBarTitle({
            title: "消息通知"
        });
    },
    onUnload: function() {},
    onHide: function() {},
    transformTime: function(e) {
        var t = new Date(1e3 * e);
        return t.getFullYear() + "-" + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-") + ((t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " ") + ((t.getHours() < 10 ? "0" + t.getHours() : t.getHours()) + ":") + ((t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()) + ":") + ((t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds()) + " ");
    },
    getList: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var o, l, u, g;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (!((o = e).data.total && o.data.pageNo > o.data.total)) {
                        t.next = 6;
                        break;
                    }
                    return wx.showToast({
                        title: "无更多消息",
                        icon: "warn",
                        duration: 1500
                    }), t.abrupt("return", !1);

                  case 6:
                    e.myLoading && e.myLoading.showLoading();

                  case 7:
                    return t.next = 9, (0, n.default)("noticeList", {
                        pageNo: o.data.pageNo,
                        pageSize: o.data.pageSize,
                        customerId: s.globalData.single.id,
                        houseId: r.houseId
                    });

                  case 9:
                    l = t.sent, e.myLoading && e.myLoading.hideLoading(), l && l.success && l.pageModel.resultSet ? (o.data.total || (o.data.total = l.pageModel.total), 
                    (u = l.pageModel.resultSet).forEach(function(e, t) {
                        u[t].sendTime = o.transformTime(e.sendTime / 1e3), u[t].mobile ? (console.log(u[t].content.split(u[t].mobile)), 
                        u[t].array1 = u[t].content.split(u[t].mobile)[0], u[t].array2 = u[t].content.split(u[t].mobile)[1]) : u[t].array1 = u[t].content;
                    }), o.data.pageNo = o.data.pageNo + 1, o.setData({
                        list: o.data.list.concat(u),
                        hasNotice: o.data.list.length > 0
                    }), o.data.list.length > 0 && o.setData({
                        hasNotice: !0
                    })) : (g = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "noticelist.js-getList",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(l) + ";houseId=" + r.houseId
                    }, i.trackRequest(g), wx.showToast({
                        title: l.message || "网络错误",
                        icon: "warn",
                        duration: 1500
                    }));

                  case 12:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    callTel: function(e) {
        var t = {
            clkId: "clk_2cmina_33",
            clkDesPage: "",
            clkName: "dianjidianhuahaoma",
            type: "CLK",
            pvCurPageName: "xiaoxitongzhi",
            pvCurPageParams: g
        };
        i.trackRequest(t, s), wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.tel
        });
    },
    getCurrentPageParam: function() {
        return g;
    },
    onLoad: function(e) {
        this.myLoading = this.selectComponent("#myLoading"), this.myLoading && this.myLoading.showLoading(), 
        g = JSON.stringify(e);
        var t = this;
        s.login(function() {
            t.getList();
        });
    },
    authorizeIndexPhone: function(e, t) {
        var a = this;
        wx.getStorageSync("phone") || s.globalData.tmpPhone ? "function" == typeof e && e() : (console.log("***authorizeIndexPhone***", s.globalData.phone, wx.getStorageSync("phone")), 
        s.globalData.phone ? (a.setData({
            showPhoneModel: !1,
            showPhoneAuth: !0
        }), "function" == typeof e && e()) : a.setData({
            showPhoneModel: !0,
            phoneFun: e || null,
            phoneFailFun: t || null
        }));
    },
    getPhoneNumber: function(e) {
        var t = this;
        this.setData({
            showPhoneModel: !1
        }), s.globalData.tmpPhone = !0, wx.setStorageSync("ISauthorizePhone", !0);
        var a = e.detail.iv, n = (e.detail.errMsg, s.globalData.houseid, s.globalData.tonken || ""), o = e.detail.encryptedData, i = s.globalData.sessionKey, r = s.globalData.appid;
        console.log("***token***", n), s.globalData.tmpPhone = !0, console.log("****getPhoneNumber****"), 
        !e.detail.encryptedData || e.detail.errMsg.includes("deny") ? "function" == typeof t.data.phoneFailFun && t.data.phoneFailFun() : (o && i && a || wx.showToast({
            title: "系统提示:授权信息错误",
            icon: "warn",
            duration: 1500
        }), s.globalData.single ? s.getPhone(t, o, i, r, a, n) : t.data.setInter = setInterval(function() {
            s.globalData.single && (s.getPhone(t, o, i, r, a, n), clearInterval(t.data.setInter));
        }, 200));
    },
    getUserInfo: function(e) {
        u.call(this, e);
    },
    onReachBottom: function() {
        this.getList();
    },
    goToDetail: function(e) {
        console.log("asd");
        var t = e.target.dataset.url, a = e.target.dataset.type;
        if (t && t.includes("m.elab-plus.com") && 1 == a) {
            var n = encodeURIComponent(t);
            wx.navigateTo({
                url: "../webView/webView?view=" + encodeURIComponent(n)
            });
        } else t && 1 == a && wx.showToast({
            title: "请在APP中打开查看!",
            icon: "warn",
            duration: 1500
        });
    }
}, o.default.hookPage({
    data: {},
    onReady: function() {},
    onShow: function() {},
    onLoad: function(e) {},
    onHide: function() {},
    onUnload: function() {}
}));