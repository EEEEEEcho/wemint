var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create")), t = require("../../api/apiInstance"), a = require("../../utils/storage.js");

(0, e.default)({
    properties: {
        isShow: Boolean,
        sceneData: String
    },
    data: {
        isLogin: !1,
        isShowLoad: !1
    },
    ready: function() {
        wx.login({
            success: function(e) {},
            fail: function(e) {}
        });
    },
    methods: {
        getPhoneNumber: function(e) {
            var a = this;
            void 0 !== e.detail.encryptedData && "" != e.detail.encryptedData ? (this.setData({
                isShowLoad: !0
            }), wx.login({
                success: function(i) {
                    var n = {
                        key: a.data.sceneData,
                        code: i.code,
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv
                    };
                    (0, t.getUserBinding)(n, function(t) {
                        1 == t.errcode ? a.store.data.isLogin || wx.checkSession({
                            success: function() {
                                a.wxLogin(e);
                            },
                            fail: function() {
                                a.wxLogin(e);
                            }
                        }) : a.setData({
                            isShowLoad: !1
                        });
                    });
                }
            })) : this.triggerEvent("getPhoneOver"), this.setData({
                isShow: !1
            });
        },
        wxLogin: function(e) {
            var t = {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv
            }, a = this;
            wx.login({
                success: function(e) {
                    e.code ? (t.code = e.code, a.submitLogin(t)) : (a.setData({
                        isShowLoad: !1
                    }), wx.showToast({
                        title: "登录失败",
                        icon: "none",
                        duration: 3e3
                    }));
                }
            });
        },
        submitLogin: function(e) {
            var i = this;
            (0, t.wechatLogin)(e, function(e) {
                if (i.setData({
                    isShowLoad: !1
                }), 1 == e.errcode) {
                    var t = {
                        accesstoken: e.data.accesstoken,
                        avatar: e.data.avatar,
                        birthday: e.data.birthday,
                        mobile: e.data.mobile,
                        nickname: e.data.nickname,
                        isDisUser: e.data.isDisUser
                    };
                    (0, a.setUser)(t), i.store.data.userInfo = t, i.store.data.isLogin = !0, i.update(), 
                    i.triggerEvent("getPhoneOver");
                }
            });
        }
    }
});