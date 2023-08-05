function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../store")), i = t(require("../../../utils/create")), a = require("../../../api/apiInstance");

(0, i.default)(e.default, {
    data: {
        isLogin: !1,
        isShowLoad: !1,
        isShowUserInfo: !1,
        sceneData: "",
        setUserInfo: {},
        listWidth: 0,
        listHeight: 0,
        leftX: 0,
        topY: 0,
        preOptions: {}
    },
    onLoad: function(t) {
        if (this.store.data.isLogin) wx.reLaunch({
            url: "/pages/index/index"
        }); else {
            void 0 !== t.preOptions && this.setData({
                preOptions: JSON.parse(decodeURIComponent(t.preOptions))
            }), void 0 !== this.data.preOptions.scene ? this.setData({
                sceneData: this.data.preOptions.scene
            }) : void 0 !== this.data.preOptions.qrCodeKey && this.setData({
                sceneData: this.data.preOptions.qrCodeKey
            });
            var e = wx.getSystemInfoSync().windowWidth, i = wx.getSystemInfoSync().windowHeight, a = Math.sqrt(e * e + i * i), n = a * e / i, s = (3 * n - e) / 2, o = (a - i) / 2;
            this.setData({
                listWidth: 3 * n,
                listHeight: a,
                imageWidth: n,
                imageHeight: a,
                leftX: -s,
                topY: -o
            });
        }
    },
    onReady: function() {
        wx.login({
            success: function(t) {},
            fail: function(t) {}
        });
    },
    getPhoneNumber: function(t) {
        var e = this;
        void 0 !== t.detail.encryptedData && "" != t.detail.encryptedData ? (this.setData({
            isShowLoad: !0
        }), "" == this.data.sceneData ? e.wxLogin(t) : wx.login({
            success: function(i) {
                var n = {
                    key: e.data.sceneData,
                    code: i.code,
                    encryptedData: t.detail.encryptedData,
                    iv: t.detail.iv
                };
                (0, a.getUserBinding)(n, function(i) {
                    1 == i.errcode ? wx.checkSession({
                        success: function() {
                            e.wxLogin(t);
                        },
                        fail: function() {
                            e.wxLogin(t);
                        }
                    }) : e.failLoginToast();
                });
            }
        })) : e.failLoginToast();
    },
    failLoginToast: function() {
        this.setData({
            isShowLoad: !1
        }), wx.showToast({
            title: "登录失败",
            icon: "none",
            duration: 3e3
        });
    },
    onUnload: function() {},
    wxLogin: function(t) {
        var e = {
            encryptedData: t.detail.encryptedData,
            iv: t.detail.iv
        }, i = this;
        wx.login({
            success: function(t) {
                t.code ? (e.code = t.code, i.submitLogin(e)) : i.failLoginToast();
            }
        });
    },
    submitLogin: function(t) {
        var e = this;
        (0, a.wechatLogin)(t, function(t) {
            if (1 == t.errcode) {
                var i = {
                    accesstoken: t.data.accesstoken,
                    avatar: t.data.avatar,
                    birthday: t.data.birthday,
                    mobile: t.data.mobile,
                    nickname: t.data.nickname,
                    isDisUser: t.data.isDisUser
                };
                e.setData({
                    isShowLoad: !1,
                    setUserInfo: i,
                    isShowUserInfo: !0
                });
            } else e.failLoginToast();
        });
    }
});