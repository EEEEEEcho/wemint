function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../../../store")), a = e(require("../../../../../utils/create")), n = require("../../../../../utils/storage"), s = require("../../../../../api/apiInstance.js"), i = getApp();

(0, a.default)(t.default, {
    properties: {},
    data: {
        cartPage: "昵称",
        navH: i.globalData.navH,
        status: i.globalData.status,
        userInfo: {},
        isDisabled: !1,
        nickname: "",
        isShowInput: !1
    },
    onLoad: function() {
        this.setData({
            nickname: this.store.data.userInfo.nickname
        });
    },
    getBlur: function() {
        this.setData({
            isShowInput: !0
        });
    },
    blurInput: function(e) {
        this.setData({
            isShowInput: !1,
            nickname: e.detail.value
        });
    },
    keepUpdate: function(e) {
        this.setData({
            isDisabled: !0,
            nickname: e.detail.value
        });
    },
    confirm: function() {
        var e = this, t = {
            accesstoken: this.store.data.userInfo.accesstoken,
            nickname: this.data.nickname
        };
        (0, s.updateUserInfo)(t, function(a) {
            1 == a.errcode && (e.store.data.userInfo.nickname = t.nickname, (0, n.setUser)(e.store.data.userInfo), 
            e.update(), wx.navigateBack({
                delta: 1
            }));
        });
    }
});