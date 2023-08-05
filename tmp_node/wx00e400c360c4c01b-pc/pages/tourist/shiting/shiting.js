var t = require("../../../utils/main.js"), a = getApp();

Page({
    data: {
        isCheckF: !0,
        name: "",
        phone: "",
        birthdy: "",
        array: [ "1年", "3年", "5年", "10年" ]
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    claSelect2: function() {
        this.setData({
            isCheckF: !0
        });
    },
    claSelect3: function() {
        this.setData({
            isCheckF: !1
        });
    },
    bindPickerChange: function(t) {
        this.setData({
            index: t.detail.value
        });
    },
    bindDateChange: function(t) {
        console.log(t.detail.value), this.setData({
            birthdy: t.detail.value
        });
    },
    nameInput: function(t) {
        this.setData({
            name: t.detail.value
        });
    },
    phoneInput: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    shiting: function() {
        a.globalData.openId;
        if (0 == this.data.name.length || 0 == this.data.phone.length) 0 == this.data.name.length ? this.setData({
            focus1: !0
        }) : 0 == this.data.phone.length && this.setData({
            focus2: !0
        }); else {
            var e = this, n = "男";
            e.data.isCheckF || (n = "女"), wx.request({
                url: t.localUrl + "mobileXcx/shiting",
                data: {
                    name: e.data.name,
                    phone: e.data.phone,
                    sex: n,
                    birthdy: e.data.birthdy,
                    curr_name: e.data.array[e.data.index]
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    "000" == t.data.succeed && (wx.showToast({
                        title: "提交预约成功",
                        icon: "success",
                        duration: 2e3,
                        mask: !0
                    }), setTimeout(function() {
                        var t = getCurrentPages();
                        t[t.length - 2].backLoad(), wx.navigateBack();
                    }, 2e3));
                }
            });
        }
    }
});