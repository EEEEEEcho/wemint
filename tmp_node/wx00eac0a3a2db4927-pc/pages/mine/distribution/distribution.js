function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var t = e(require("../../../store")), i = e(require("../../../utils/create")), s = require("../../../api/apiInstance.js"), n = getApp();

(0, i.default)(t.default, {
    properties: {},
    data: {
        navH: n.globalData.navH,
        status: n.globalData.status,
        cartPage: "分销中心",
        orderList: [ "", "", "" ],
        disUserInfo: {},
        isShowModel: !0
    },
    onReady: function() {},
    onShow: function() {
        var e = this, t = {
            accesstoken: this.store.data.userInfo.accesstoken
        };
        (0, s.getUserDisInfo)(t, function(t) {
            if (1 == t.errcode) {
                var i, s = (t.data.balance / 100).toFixed(2), n = (t.data.proIncome / 100).toFixed(2);
                e.setData((i = {
                    disUserInfo: t.data
                }, a(i, "disUserInfo.balance", s), a(i, "disUserInfo.proIncome", n), a(i, "isShowModel", !1), 
                i));
            }
        });
    },
    toPage: function(e) {
        var a = "";
        switch (e.currentTarget.dataset.type) {
          case "我的客户":
            a = "/pages/mine/distribution/myCustomer/myCustomer";
            break;

          case "选品推荐":
            a = "/pages/mine/distribution/recommendedProduct/recommendedProduct";
            break;

          case "推广订单":
            a = "/pages/mine/distribution/promotion/promotion";
            break;

          case "余额提现":
            if (1 == this.data.disUserInfo.bindingAli) {
                var t = {
                    bindingAli: 1,
                    aliAccountName: this.data.disUserInfo.aliAccountName,
                    aliAccountNo: this.data.disUserInfo.aliAccountNo
                };
                this.store.data.aliAccountInfomation = t, this.update();
            } else this.store.data.aliAccountInfomation = {
                bindingAli: 0,
                aliAccountName: "支付宝名称",
                aliAccountNo: "支付宝账号"
            }, this.update();
            a = "/pages/mine/distribution/purse/purse";
            break;

          case "账号管理":
            a = "/pages/mine/distribution/accountManagement/accountManagement";
            break;

          case "每日任务":
            a = "/pages/mine/distribution/dayTasks/dayTasks";
            break;

          case "陪同到店":
            a = "/pages/mine/distribution/accompany/accompany";
            break;

          case "陪同到店列表":
            a = "/pages/mine/distribution/escortList/escortList";
        }
        wx.navigateTo({
            url: a
        });
    }
});