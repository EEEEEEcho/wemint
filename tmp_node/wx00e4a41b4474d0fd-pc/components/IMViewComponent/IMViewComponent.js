function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function o(r, n) {
                try {
                    var s = t[r](n), i = s.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!s.done) return Promise.resolve(i).then(function(e) {
                    o("next", e);
                }, function(e) {
                    o("throw", e);
                });
                e(i);
            }
            return o("next");
        });
    };
}

var a = e(require("../../lib/runtime")), o = e(require("../../lib/requestConfig")), r = require("../../utils/util.js"), n = require("../../config.js"), s = getApp();

Component({
    properties: {
        showPhoneModel: {
            type: Boolean,
            value: !1
        },
        showInfoModel: {
            type: Boolean,
            value: !1
        },
        mode: {
            type: String,
            value: "1"
        },
        phoneFun: {
            type: String,
            value: ""
        },
        imPhoneAuthorize: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        showBackModel: !1,
        showIMModel: !0,
        showShare: !1,
        showShareOptions: !1,
        unReadMsgNumber: 0,
        btnColor: "#CFCFCF",
        lineColor: "#ffffff",
        backgroundColor: "#ffffff",
        textColor: "#ffffff",
        icon: "",
        text: ""
    },
    externalClasses: [ "cclass" ],
    ready: function() {
        this.queryEnumList();
    },
    pageLifetimes: {
        show: function() {
            this.setData({
                showShareOptions: !1
            });
        }
    },
    methods: {
        refreshNumber: function() {
            try {
                wx.getStorageSync("unReadMsgs").total ? this.setData({
                    unReadMsgNumber: wx.getStorageSync("unReadMsgs").total
                }) : this.setData({
                    unReadMsgNumber: 0
                });
            } catch (e) {
                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                this.setData({
                    unReadMsgNumber: 0
                }), console.error("***IMView-refreshNumber-onError***", e);
            }
        },
        getUserInfo: function(e) {
            this.triggerEvent("getUserInfoFun", e);
        },
        goShare: function() {
            this.data.imPhoneAuthorize || this.triggerEvent("getUserInfoFun", !1);
        },
        queryEnumList: function() {
            var e = this;
            return t(a.default.mark(function t() {
                var r, s, i, l, u, h, d;
                return a.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, (0, o.default)("queryEnumList", {
                            houseId: n.houseId
                        });

                      case 2:
                        (l = t.sent).list.forEach(function(e, t) {
                            "layout_im" == e.name && (r = e), "layout_card" == e.name && (s = e, getCurrentPages()[getCurrentPages().length - 1].data.bottomText = e.value), 
                            "layout_share" == e.name && (i = e);
                        }), 1 == (u = getCurrentPages().length) && (console.log("***显示返回首页按钮***"), e.setData({
                            showBackModel: !0
                        })), h = e.data.showBackModel, i && "1" == i.value && e.setData({
                            showShare: !0
                        }), r && "2" == r.checkedIcon ? e.setData({
                            showIMModel: !1
                        }) : (e.refreshNumber(), r.remark && (r.remark = JSON.parse(r.remark), e.setData({
                            backgroundColor: r.remark ? r.remark["background-color"] : e.data.backgroundColor,
                            textColor: r.remark ? r.remark.textColor : e.data.textColor,
                            btnColor: r.remark ? r.remark.btnColor : e.data.btnColor,
                            lineColor: r.remark ? r.remark.lingColor : e.data.lineColor,
                            showIMModel: !0
                        })), (r.icon || r.value) && e.setData({
                            icon: r.icon || "",
                            text: r.value || e.data.text,
                            showIMModel: !0
                        })), d = e.data.showIMModel, console.log("***IM-view-ready:", u), e.triggerEvent("heightHandle", {
                            showBackModel: h,
                            showIMModel: d,
                            showShare: e.data.showShare
                        }), console.log("***queryEnumList***", r, e.data.btnColor, e.data.textColor);

                      case 13:
                      case "end":
                        return t.stop();
                    }
                }, t, e);
            }))();
        },
        goIndex: function() {
            wx.navigateTo({
                url: "../index/index"
            }), this.triggerEvent("afterIndexHandle", {});
        },
        goChatList: function() {
            console.log("IM-view-goChatList:", s.globalData.openid), s.handleGoChat() && (console.log("***IM-view-goChatList-over***"), 
            this.triggerEvent("afterIMHandle", {}));
        },
        formSubmit: function(e) {
            (0, o.default)("insertFormId", {
                houseId: n.houseId,
                customerId: s.globalData.single && s.globalData.single.id,
                formId: e.detail.formId,
                appid: s.globalData.appid,
                secret: s.globalData.secret
            });
        },
        catchEvent: function() {},
        shares: function() {
            if (this.setData({
                showShareOptions: !this.data.showShareOptions
            }), this.data.showShareOptions) {
                var e = {
                    clkDesPage: this.data.despage || "",
                    type: "CLK",
                    pvCurPageName: this.data.despage || "",
                    pvCurPageParams: "",
                    clkId: "clk_2cmina_115",
                    clkName: "huxingfenxiang",
                    clkParams: {}
                };
                r.trackRequest(e);
            }
        },
        hideShare: function() {
            this.setData({
                showShareOptions: !1
            });
        }
    }
});