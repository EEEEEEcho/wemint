function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var e = t(require("../../../../../store")), n = t(require("../../../../../utils/create")), o = require("../../../../../api/apiInstance.js"), i = getApp();

(0, n.default)(e.default, {
    properties: {},
    data: {
        cartPage: "编辑子账号",
        navH: i.globalData.navH,
        status: i.globalData.status,
        userInfo: {},
        accountInfo: {}
    },
    ready: function() {},
    onShow: function() {
        var t = getCurrentPages(), e = t[t.length - 1];
        void 0 !== e.data.inputValue && (11 != e.data.inputValue.length ? this.setData(a({}, "accountInfo.moneyRatio", e.data.inputValue)) : this.setData(a({}, "accountInfo.mobile", e.data.inputValue)));
    },
    onLoad: function(t) {
        var e;
        this.setData((e = {}, a(e, "accountInfo.userDisUuid", t.userDisUuid), a(e, "accountInfo.userUuid", t.userUuid), 
        a(e, "accountInfo.name", t.name), a(e, "accountInfo.mobile", t.mobile), a(e, "accountInfo.moneyRatio", t.moneyratio), 
        a(e, "accountInfo.avatar", t.avatar), e));
    },
    getInputValue: function(t) {
        this.setData(a({}, "accountInfo.name", t.detail.value));
    },
    toPage: function(t) {
        var a = t.currentTarget.dataset.type, e = "";
        void 0 !== t.currentTarget.dataset.useruuid && (e = t.currentTarget.dataset.useruuid);
        var n = "";
        switch (a) {
          case "手机号码":
            n = "/pages/mine/distribution/accountManagement/modifierInfomation/modifierInfomation?sort=" + "mobile" + "&source=edit&mobile=" + this.data.accountInfo.mobile;
            break;

          case "分成比例":
            n = "/pages/mine/distribution/accountManagement/modifierInfomation/modifierInfomation?sort=" + "profit" + "&source=edit&ratio=" + this.data.accountInfo.moneyRatio;
            break;

          case "查看订单":
            n = "/pages/mine/distribution/promotion/promotion?useruuid=" + e;
            break;

          case "查看客户":
            n = "/pages/mine/distribution/myCustomer/myCustomer?useruuid=" + e;
        }
        wx.navigateTo({
            url: n
        });
    },
    modifierProfit: function() {
        var t = {
            accesstoken: this.store.data.userInfo.accesstoken,
            userDisUuid: this.data.accountInfo.userDisUuid,
            subDisMoneyRatio: this.data.accountInfo.moneyRatio,
            name: this.data.accountInfo.name,
            mobile: this.data.accountInfo.mobile
        };
        (0, o.updateDistributionUser)(t, function(t) {
            1 == t.errcode && wx.navigateBack({
                delta: 1
            });
        });
    },
    deleteDis: function() {
        var t = [];
        t.push(this.data.accountInfo.userDisUuid);
        var a = {
            accesstoken: this.store.data.userInfo.accesstoken,
            userDisUuids: JSON.stringify(t)
        };
        (0, o.deleteDistributionUser)(a, function(t) {
            1 == t.errcode && wx.navigateBack({
                delta: 1
            });
        });
    }
});