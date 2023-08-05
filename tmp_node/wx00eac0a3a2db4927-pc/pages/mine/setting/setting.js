function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var e = a(require("../../../store")), t = a(require("../../../utils/create")), s = require("../../../utils/storage.js"), r = getApp();

(0, t.default)(e.default, {
    properties: {},
    data: {
        cartPage: "设置",
        navH: r.globalData.navH,
        status: r.globalData.status,
        userInfo: {},
        version: 0
    },
    onLoad: function() {
        this.setData({
            version: "1.1.3"
        });
    },
    outLogin: function(a) {
        this.store.data.isLogin && (s.clear(), this.store.data.isLogin = !1, this.store.data.userQrCode = "", 
        this.store.data.userInfo = {
            avatar: "http://oss.shangmian.xin/weixin_applets_login_default_avatar.png",
            nickname: "未登录"
        }, this.update()), wx.navigateBack({
            delta: 1
        });
    },
    toPage: function(a) {
        var e = "";
        switch (a.currentTarget.dataset.type) {
          case "个人信息":
            e = "/pages/mine/setting/personInfo/personInfo";
            break;

          case "绑定手机":
            e = "/pages/mine/setting/updateTel/updateTel";
            break;

          case "收货地址":
            e = "/pages/mine/address/address";
            break;

          case "关于我们":
            e = "";
        }
        wx.navigateTo({
            url: e
        });
    }
});