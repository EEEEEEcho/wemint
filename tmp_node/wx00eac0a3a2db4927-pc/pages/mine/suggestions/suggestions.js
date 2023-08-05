function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../store")), a = t(require("../../../utils/create")), n = require("../../../api/apiInstance.js"), s = getApp();

(0, a.default)(e.default, {
    properties: {},
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        active: 0,
        typeId: 1,
        suggestContent: "",
        accesstoken: "",
        cartPage: "意见反馈",
        navH: s.globalData.navH,
        status: s.globalData.status,
        sugCateList: [ {
            typeId: 1,
            typeName: "产品质量"
        }, {
            typeId: 2,
            typeName: "服务态度"
        }, {
            typeId: 3,
            typeName: "送货速度"
        }, {
            typeId: 4,
            typeName: "软件使用"
        }, {
            typeId: 5,
            typeName: "功能建议"
        }, {
            typeId: 6,
            typeName: "性能问题"
        }, {
            typeId: 7,
            typeName: "其他"
        } ]
    },
    ready: function() {},
    onLoad: function() {
        var t = this.store.data.userInfo.accesstoken;
        this.setData({
            accesstoken: t
        });
    },
    changeType: function(t) {
        t.currentTarget.dataset.typeid;
        var e = t.currentTarget.dataset.index;
        this.setData({
            active: e
        });
    },
    getContent: function(t) {
        var e = t.detail.value;
        this.setData({
            suggestContent: e
        });
    },
    formSubmit: function(t) {
        var e = this.data.typeId, a = this.data.suggestContent, s = this.data.accesstoken;
        if ("" != a) {
            var o = {
                accesstoken: s,
                type: e,
                content: a
            };
            (0, n.subFeedback)(o, function(t) {
                1 == t.errcode ? (wx.showToast({
                    title: "提交成功",
                    icon: "none",
                    duration: 1e3
                }), setTimeout(function(t) {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 800)) : wx.showToast({
                    title: "提交失败，请重新提交",
                    icon: "none",
                    duration: 1e3
                });
            });
        } else wx.showToast({
            title: "请填写您的意见或建议",
            icon: "none",
            duration: 1e3
        });
    }
});