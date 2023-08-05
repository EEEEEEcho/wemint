function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var e = a(require("../../../../store")), t = a(require("../../../../utils/create")), s = require("../../../../api/apiInstance.js"), i = getApp();

(0, t.default)(e.default, {
    data: {
        cartPage: "钱包",
        navH: i.globalData.navH,
        status: i.globalData.status,
        userInfo: {},
        balance: 0
    },
    onShow: function() {
        var a = this, e = {
            accesstoken: this.store.data.userInfo.accesstoken
        };
        (0, s.getUserDisInfo)(e, function(e) {
            if (1 == e.errcode) {
                var t = (e.data.balance / 100).toFixed(2);
                a.setData({
                    balance: t
                });
            }
        });
    },
    toPage: function(a) {
        var e = a.currentTarget.dataset.type, t = this.data.balance, s = "";
        switch (e) {
          case "明细":
            s = "/pages/mine/distribution/definite/definite";
            break;

          case "微信提现":
            s = "/pages/mine/distribution/purse/wechatCash/wechatCash?balance=" + t;
            break;

          case "支付宝提现":
            s = "/pages/mine/distribution/purse/aliPayCash/aliPayCash?balance=" + t;
        }
        wx.navigateTo({
            url: s
        });
    }
});