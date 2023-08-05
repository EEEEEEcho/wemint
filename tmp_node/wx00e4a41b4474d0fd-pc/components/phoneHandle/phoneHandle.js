var e = require("../../utils/util.js"), t = require("../../config.js"), a = getApp();

Component({
    properties: {
        showPhoneModel: {
            type: Boolean,
            value: !1
        },
        mode: {
            type: String,
            value: "1"
        },
        phoneFun: {
            type: Object,
            value: ""
        },
        phoneTitle: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        phoneText: {
            type: String,
            value: "为了更好的为您提供服务，我们请求获取您的手机号码"
        },
        userText: {
            type: String,
            value: "为了更好的为您提供服务，我们请求获取您的昵称、头像等公开信息"
        },
        userTitle: {
            type: String,
            value: ""
        },
        phoneFailFun: {
            type: Object,
            value: ""
        },
        phoneSuccessFun: {
            type: Object,
            value: ""
        },
        infoFun: {
            type: Object,
            value: ""
        },
        infoFailFun: {
            type: Object,
            value: ""
        },
        infoSuccessFun: {
            type: Object,
            value: ""
        },
        autoAuthentication: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        showInfoModel: !1,
        error: !1,
        yeslogo: "https://dm.static.elab-plus.com/wepy_pro/scaleImage/auth-yes.png",
        logo: "https://dm.static.elab-plus.com/wepy_pro/scaleImage/auth-title.png",
        loading: "../../image/wepy_pro/loading1.gif",
        errorImg: "../../image/wepy_pro/errorImg.png",
        startTime: null
    },
    externalClasses: [ "cclass" ],
    ready: function() {},
    methods: {
        getPhoneNumber: function(e) {
            var t = this;
            this.setData({
                showPhoneModel: !1
            }), wx.setStorageSync("ISauthorizePhone", !0);
            var n = e.detail.iv, o = (e.detail.errMsg, a.globalData.houseid, a.globalData.tonken || ""), r = e.detail.encryptedData, l = a.globalData.sessionKey, i = a.globalData.appid;
            if (console.log("***auth-token***", o), console.log("****auth-getPhoneNumber****"), 
            !e.detail.encryptedData || e.detail.errMsg.includes("deny")) this.triggerEvent("afterPhoneHandle", {
                type: "fail"
            }); else if (r && l && n || wx.showToast({
                title: "系统提示:授权信息错误",
                icon: "warn",
                duration: 1500
            }), a.globalData.single) {
                var s = getCurrentPages()[getCurrentPages().length - 1];
                a.getPhone(s, r, l, i, n, o, function() {
                    t.triggerEvent("afterPhoneHandle", {
                        type: "success"
                    });
                }, t.data.autoAuthentication);
            } else t.data.setInter = setInterval(function() {
                if (a.globalData.single) {
                    var e = getCurrentPages()[getCurrentPages().length - 1];
                    a.getPhone(e, r, l, i, n, o, function() {
                        t.triggerEvent("afterPhoneHandle", {
                            type: "success"
                        });
                    }, t.data.autoAuthentication), clearInterval(t.data.setInter);
                }
            }, 200);
        },
        nextTimeInfo: function() {
            a.globalData.isUserInfo = !0, this.triggerEvent("afterUserHandle", {
                type: "fail"
            });
        },
        nextTimePhone: function() {
            this.triggerEvent("afterPhoneHandle", {
                type: "fail"
            });
        },
        getUserInfo: function(n) {
            if (a.globalData.isUserInfo = !0, wx.setStorageSync("ISauthorizeInfo", !0), console.log("***auth-getUserInfo***", n.detail), 
            !n.detail.encryptedData || n.detail.errMsg.includes("deny")) this.triggerEvent("afterUserHandle", {
                type: "fail"
            }); else {
                if (a.modifyUserInfo(n.detail.userInfo), !a.globalData.single || !a.globalData.single.id) {
                    wx.reportMonitor && wx.reportMonitor("single", 1);
                    var o = {
                        type: "mini-program-Error",
                        pvPageStayTime: new Date().getTime() / 1e3,
                        adviserId: "",
                        imTalkId: "",
                        imTalkType: "",
                        pvCurPageName: "authhandle.js-getUserInfo",
                        clkDesPage: "",
                        clkName: "",
                        clkId: "",
                        expand: JSON.stringify(a.globalData) + ";houseId=" + t.houseId
                    };
                    e.trackRequest(o);
                }
                a.globalData.userInfo = n.detail.userInfo, wx.setStorageSync("userInfo", n.detail.userInfo), 
                this.triggerEvent("afterUserHandle", {
                    type: "success"
                });
            }
        }
    }
});