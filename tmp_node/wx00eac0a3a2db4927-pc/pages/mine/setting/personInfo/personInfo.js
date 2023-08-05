function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../../store")), a = e(require("../../../../utils/create")), r = require("../../../../api/apiInstance.js"), s = require("../../../../utils/storage"), i = require("../../../../utils/filter.js"), n = getApp();

(0, a.default)(t.default, {
    properties: {},
    data: {
        date: "",
        cartPage: "个人信息",
        navH: n.globalData.navH,
        status: n.globalData.status,
        userInfo: {}
    },
    onLoad: function() {},
    onShow: function() {
        var e = i.tsFormatTime(this.store.data.userInfo.birthday, "Y-M-D");
        this.setData({
            date: e
        });
    },
    bindDateChange: function(e) {
        var t = this;
        this.setData({
            date: e.detail.value
        });
        var a, n = e.detail.value;
        a = e.detail.value.substring(0, 4) + e.detail.value.substring(5, 7) + e.detail.value.substring(8) + " 00:00:00";
        var u = {
            accesstoken: this.store.data.userInfo.accesstoken,
            birthday: a
        };
        (0, r.updateUserInfo)(u, function(e) {
            if (1 == e.errcode) {
                var a = n.replace(/-/g, "/"), r = new Date(a).getTime(), u = i.tsFormatTime(r, "Y-M-D");
                t.setData({
                    date: u
                }), t.store.data.userInfo.birthday = r, t.update(), (0, s.setUser)(t.store.data.userInfo);
            }
        });
    },
    toPersonalPage: function(e) {
        var t = e.currentTarget.dataset.typename;
        "昵称" == t && wx.navigateTo({
            url: "/pages/mine/setting/personInfo/updateNickname/updateNickname"
        }), "头像" == t && wx.navigateTo({
            url: "/pages/mine/setting/personInfo/updateAvatar/updateAvatar"
        });
    }
});