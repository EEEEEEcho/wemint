var o = require("../../utils/wxapp.js"), t = require("../../utils/wxcomm.js");

Page({
    data: {
        tel: "",
        showQrcode: !1
    },
    onLoad: function(o) {},
    bindKeyInput: function(o) {
        this.setData({
            tel: o.detail.value
        });
    },
    hideQrcode: function() {
        this.setData({
            showQrcode: !1
        });
    },
    getCoupon: function() {
        var e = this;
        if (0 == /^1(3|4|5|7|8)\d{9}$/.test(this.data.tel)) wx.showToast({
            title: "请输入正确手机号",
            icon: "none"
        }); else {
            console.log(this.data.tel);
            var n = o.projectUrl + "/wallet/depositCard/bindMobile", a = {
                mobile: this.data.tel,
                smallOpenId: wx.getStorageSync("user").openId
            };
            t.reqPost(n, a, "application/x-www-form-urlencoded").then(function(o) {
                console.log(o), o.data.success && (e.setData({
                    showQrcode: !0
                }), console.log(e.data.showQrcode));
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});