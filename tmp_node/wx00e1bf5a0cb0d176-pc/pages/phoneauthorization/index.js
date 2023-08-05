var e = getApp(), t = require("../../components/wxb.js");

Page({
    data: {
        baseUrl: e.globalData.siteBaseUrl,
        reminder: "授权提示",
        matter: "授权失败，请重新授权",
        abrogate: "暂时先不",
        permission: "允许",
        fork: !1
    },
    onLoad: function(t) {
        this.setData({
            Icon: e.globalData.info.Icon,
            option: t
        }), console.log(this.data.option, "ewqewe");
    },
    onShow: function() {
        e.doAfterUserInfoAuth({
            success: this.initData,
            fail: this.initData
        });
    },
    initData: function() {},
    getPhoneNumber: function(a) {
        var o = this, i = (Number(o.data.option.getMobileNode), o.data.option.pageroute);
        if (a.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
            var n = e.globalData.appId, s = e.globalData.session_key, r = new t(n, s).decryptData(a.detail.encryptedData, a.detail.iv);
            e.loadphoneInfo(r.phoneNumber), i.indexOf("_tabbar") > -1 ? wx.switchTab({
                url: "/" + i
            }) : [ "pages/shop/productdetail", "pages/shop/newsdetail", "pages/shop/servicedetail" ].includes(i) ? id : wx.redirectTo({
                url: "/" + i
            });
        } else ;
    },
    backHomepag: function() {
        wx.switchTab({
            url: "/pages/shop/index"
        });
    },
    abolish: function() {
        this.setData({
            allowspopup: !1
        });
    },
    turnOff: function() {
        e.turnOff();
    },
    preventD: function() {}
});