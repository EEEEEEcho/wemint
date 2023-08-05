function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../../../store")), e = t(require("../../../../../utils/create")), i = require("../../../../../api/apiInstance.js"), n = getApp();

(0, e.default)(a.default, {
    properties: {},
    data: {
        cartPage: "添加子账号",
        navH: n.globalData.navH,
        status: n.globalData.status,
        userInfo: {},
        nickname: "",
        inputValueMobile: "请输入手机号码",
        inputValueProfit: 0
    },
    ready: function() {},
    onShow: function() {
        var t = getCurrentPages(), a = t[t.length - 1];
        void 0 !== a.data.inputValue && (11 != a.data.inputValue.length ? this.setData({
            inputValueProfit: a.data.inputValue
        }) : this.setData({
            inputValueMobile: a.data.inputValue
        }));
    },
    onUnload: function() {
        this.setData({
            nickname: ""
        });
    },
    getInputValue: function(t) {
        "" == t.detail.value ? wx.showToast({
            title: "请输入名称",
            duration: 800,
            icon: "none"
        }) : this.setData({
            nickname: t.detail.value
        });
    },
    toPage: function(t) {
        var a = "";
        switch (t.currentTarget.dataset.type) {
          case "手机号码":
            a = "/pages/mine/distribution/accountManagement/modifierInfomation/modifierInfomation?sort=" + "mobile" + "&source=add";
            break;

          case "分成比例":
            a = "/pages/mine/distribution/accountManagement/modifierInfomation/modifierInfomation?sort=" + "profit" + "&source=add";
        }
        wx.navigateTo({
            url: a
        });
    },
    addComplete: function() {
        if ("" != this.data.nickname && "请输入手机号码" != this.data.inputValueMobile && 0 != this.data.inputValueProfit) {
            var t = {
                accesstoken: this.store.data.userInfo.accesstoken,
                name: this.data.nickname,
                mobile: this.data.inputValueMobile,
                subDisMoneyRatio: this.data.inputValueProfit
            };
            (0, i.addDistributionUser)(t, function(t) {
                1 == t.errcode && wx.navigateBack({
                    delta: 1
                });
            });
        } else wx.showToast({
            title: "请填写完整信息",
            icon: "none",
            duration: 800
        });
    }
});