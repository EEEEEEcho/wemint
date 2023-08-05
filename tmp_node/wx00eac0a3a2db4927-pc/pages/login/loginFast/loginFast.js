function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../../store")), e = a(require("../../../utils/create")), i = require("../../../utils/storage.js"), n = require("../../../api/apiInstance.js"), o = getApp();

(0, e.default)(t.default, {
    properties: {
        cartPage: String
    },
    data: {
        cartPage: "尚免登陆",
        navH: o.globalData.navH,
        status: o.globalData.status,
        isShowLoad: !1
    },
    onLoad: function() {
        wx.setNavigationBarTitle({
            title: "尚免登陆"
        });
    },
    onReady: function() {
        wx.login({
            success: function(a) {},
            fail: function(a) {
                wx.showToast({
                    title: "需要允许授权才能登录",
                    icon: "none",
                    duration: 3e3
                }), wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    openLoginMsg: function(a) {
        wx.navigateTo({
            url: "/pages/login/loginMsg/loginMsg"
        });
    },
    submitLogin: function(a) {
        var t = this;
        (0, n.wechatLogin)(a, function(a) {
            if (1 == a.errcode) {
                var e = {
                    accesstoken: a.data.accesstoken,
                    avatar: a.data.avatar,
                    birthday: a.data.birthday,
                    mobile: a.data.mobile,
                    nickname: a.data.nickname,
                    isDisUser: a.data.isDisUser,
                    userUuid: a.data.userUuid,
                    email: a.data.email,
                    fansCount: a.data.fansCount,
                    followCount: a.data.followCount,
                    footprintCount: a.data.footprintCount,
                    gender: a.data.gender,
                    introduction: a.data.introduction,
                    likeCount: a.data.likeCount,
                    likedCount: a.data.likedCount
                };
                (0, i.setUser)(e), t.store.data.userInfo = e, t.store.data.isLogin = !0, t.update(), 
                wx.navigateBack({
                    delta: 1
                });
            }
            t.setData({
                isShowLoad: !1
            });
        });
    },
    getPhoneNumber: function(a) {
        var t = this;
        wx.checkSession({
            success: function() {
                t.wxLogin(a);
            },
            fail: function() {
                t.wxLogin(a);
            }
        });
    },
    wxLogin: function(a) {
        if (void 0 === a.detail.encryptedData || "" == a.detail.encryptedData) wx.showToast({
            title: "拒绝登陆将无法进行相关操作",
            icon: "none",
            duration: 3e3
        }); else {
            this.setData({
                isShowLoad: !0
            });
            var t = {
                encryptedData: a.detail.encryptedData,
                iv: a.detail.iv
            }, e = this;
            wx.login({
                success: function(a) {
                    a.code ? (t.code = a.code, e.submitLogin(t)) : (e.setData({
                        isShowLoad: !1
                    }), wx.showToast({
                        title: "登录失败，请重新登录",
                        icon: "none",
                        duration: 3e3
                    }));
                }
            });
        }
    },
    toPage: function(a) {
        var t = "";
        t = "注册协议" == a.currentTarget.dataset.type ? "https://m.shangmian.xin/d_share/protocol" : "https://m.shangmian.xin/d_share/secret", 
        wx.navigateTo({
            url: "/pages/webViewPage/webViewPage?loadUrl=" + t
        });
    }
});