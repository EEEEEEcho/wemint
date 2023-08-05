function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../../../store")), e = t(require("../../../../../utils/create")), n = require("../../../../../api/apiInstance.js"), i = getApp();

(0, e.default)(a.default, {
    properties: {},
    data: {
        cartPage: "支付宝",
        navH: i.globalData.navH,
        status: i.globalData.status,
        userInfo: {},
        balance: 0,
        inputValue: 0,
        serviceRate: 3.6,
        aliAccountInfomation: {}
    },
    ready: function() {},
    onLoad: function(t) {
        var a = t.balance;
        this.setData({
            balance: a
        });
    },
    getInputValue: function(t) {
        var a = t.detail.value, e = a;
        0 != a.indexOf(".") ? a.toString().length <= this.data.balance.toString().length && 100 * a <= 100 * this.data.balance ? e = a : wx.showToast({
            title: "提现金额超出可用余额",
            icon: "none",
            duration: 3e3
        }) : e = "", this.setData({
            inputValue: e
        });
    },
    getParamsBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    getAllCash: function(t) {
        this.data.balance >= 1 ? this.setData({
            inputValue: this.data.balance
        }) : wx.showToast({
            title: "提现金额不得少于1元",
            icon: "none",
            duration: 3e3
        });
    },
    getCashOut: function() {
        var t = this, a = this.data.inputValue, e = {
            accesstoken: this.store.data.userInfo.accesstoken,
            channel: "ALI_TRANSFER"
        };
        1 == this.store.data.aliAccountInfomation.bindingAli ? "" != a && a >= 1 ? a.toString().length <= this.data.balance.toString().length && 100 * a <= 100 * this.data.balance ? a.indexOf(".") > -1 ? a.split(".")[1].length <= 2 ? (e.amount = parseInt(100 * a), 
        (0, n.getUserDisCashOut)(e, function(a) {
            1 == a.errcode && t.getParamsBack();
        })) : wx.showToast({
            title: "提现的最小单位为分钱",
            icon: "none",
            duration: 3e3
        }) : 0 == a.substr(0, 1) ? wx.showToast({
            title: "非法输入",
            icon: "none",
            duration: 3e3
        }) : (e.amount = parseInt(100 * a), (0, n.getUserDisCashOut)(e, function(a) {
            1 == a.errcode && t.getParamsBack();
        })) : wx.showToast({
            title: "提现金额超出可用余额",
            icon: "none",
            duration: 3e3
        }) : wx.showToast({
            title: "提现金额不得少于1元",
            icon: "none",
            duration: 3e3
        }) : wx.showToast({
            title: "请填写要提现的账户",
            icon: "none",
            duration: 3e3
        });
    },
    getDistributionInfoQuery: function() {
        var t = this, a = {
            accesstoken: this.store.data.userInfo.accesstoken
        };
        (0, n.getDistributionInfoQuery)(a, function(a) {
            1 == a.errcode && t.setData({
                serviceRate: a.data.serviceRate
            });
        });
    },
    toBindPage: function() {
        wx.navigateTo({
            url: "/pages/mine/distribution/purse/bindAliAccount/bindAliAccount"
        });
    }
});