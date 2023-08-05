function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a, e = t(require("../../../store")), i = t(require("../../../utils/create")), n = require("../../../api/apiInstance.js"), r = require("../../../utils/storage.js"), s = getApp();

(0, i.default)(e.default, {
    properties: {
        cartPage: String
    },
    data: {
        isClick: !1,
        isShowInterval: !1,
        intervalValue: 59,
        tel: "",
        code: "",
        active: 0,
        cartPage: "尚免登陆",
        navH: s.globalData.navH,
        status: s.globalData.status
    },
    onUnload: function() {
        clearInterval(a), this.setData({
            intervalValue: 59,
            isShowInterval: !1
        });
    },
    login: function() {
        var t = this;
        if ("" != this.data.tel && "" != this.data.code) {
            var a = {
                mobile: this.data.tel,
                vercode: this.data.code
            };
            (0, n.login)(a, function(a) {
                var e = {
                    accesstoken: a.data.accesstoken,
                    mobile: a.data.mobile,
                    userUuid: a.data.userUuid,
                    nickname: a.data.nickname,
                    avatar: a.data.avatar,
                    birthday: a.data.birthday,
                    isDisUser: a.data.isDisUser
                };
                1 == a.errcode ? ((0, r.setUser)(e), t.store.data.userInfo = e, t.store.data.isLogin = !0, 
                t.update(), wx.navigateBack({
                    delta: 2
                })) : wx.showToast({
                    title: a.errmsg,
                    icon: "none",
                    duration: 2e3
                });
            });
        }
    },
    getTel: function(t) {
        this.setData({
            tel: t.detail.value
        });
    },
    getCode: function(t) {
        this.setData({
            code: t.detail.value,
            isClick: !0
        });
    },
    getValidateCode: function() {
        var t = this;
        if (0 == this.data.tel.length) return wx.showToast({
            title: "输入的手机号为空",
            icon: "none",
            duration: 1500
        }), !1;
        if (this.data.tel.length < 11) return wx.showToast({
            title: "请输入正确的手机号",
            icon: "none",
            duration: 1500
        }), !1;
        var e = {
            mobile: this.data.tel
        };
        (0, n.getValidateCode)(e, function(e) {
            1 == e.errcode ? (t.setData({
                isShowInterval: !0
            }), a = setInterval(function() {
                var e = t.data.intervalValue;
                e--, t.setData({
                    intervalValue: e
                }), 0 == t.data.intervalValue && (clearInterval(a), t.setData({
                    isShowInterval: !1,
                    intervalValue: 59
                }));
            }, 1e3)) : wx.showToast({
                title: e.errmsg,
                icon: "none",
                duration: 2e3
            });
        });
    }
});