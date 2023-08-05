function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../../../store")), e = t(require("../../../../../utils/create")), n = require("../../../../../api/apiInstance.js"), s = getApp();

(0, e.default)(a.default, {
    properties: {},
    data: {
        cartPage: "微信提现",
        navH: s.globalData.navH,
        status: s.globalData.status,
        userInfo: {},
        balance: 0,
        inputValue: 0,
        serviceRate: 3.6
    },
    ready: function() {},
    onLoad: function(t) {
        var a = t.balance;
        this.setData({
            balance: a
        });
    },
    getInputValue: function(t) {
        this.setData({
            inputValue: t.detail.value
        });
    },
    getParamsBack: function() {
        var t = getCurrentPages(), a = t[t.length - 2], e = (this.data.balance - this.data.inputValue).toFixed(2);
        a.setData({
            total: e
        }), wx.navigateBack({
            delta: 1
        });
    },
    getAllCash: function(t) {
        console.log(this.data.balance), this.data.balance >= 1 ? this.setData({
            inputValue: this.data.balance
        }) : wx.showToast({
            title: "提现金额不得少于1元",
            icon: "none",
            duration: 800
        });
    },
    getCashOut: function() {
        var t = this, a = this.data.inputValue, e = {
            accesstoken: this.store.data.userInfo.accesstoken,
            channel: "WX_TRANSFER"
        };
        "" != a && a >= 1 ? a.indexOf(".") > -1 ? a.split(".")[1].length < 2 ? (e.amount = 100 * a, 
        (0, n.getUserDisCashOut)(e, function(a) {
            console.log(a), 1 == a.errcode && t.getParamsBack();
        })) : wx.showToast({
            title: "提现的最小单位为分钱",
            icon: "none",
            duration: 2e3
        }) : (e.amount = 100 * a, (0, n.getUserDisCashOut)(e, function(a) {
            console.log(a), 1 == a.errcode && t.getParamsBack();
        })) : wx.showToast({
            title: "提现金额不得少于1元",
            icon: "none",
            duration: 2e3
        });
    },
    onShow: function() {},
    getDistributionInfoQuery: function() {
        var t = this, a = {
            accesstoken: this.store.data.userInfo.accesstoken
        };
        (0, n.getDistributionInfoQuery)(a, function(a) {
            1 == a.errcode && t.setData({
                serviceRate: a.data.serviceRate
            });
        });
    }
});