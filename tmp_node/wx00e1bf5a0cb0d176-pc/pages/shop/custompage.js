var a = getApp(), t = require("../../common.js"), e = require("./ShopUtil.js");

Page({
    data: {
        pullDownRefreshFlag: !0
    },
    onPullDownRefresh: function() {
        var a = this;
        a.data.pullDownRefreshFlag && (a.setData({
            pullDownRefreshFlag: !1
        }), a.data.pullDownRefreshFlag = !1, a.data.optionsData.refresh = !0, setTimeout(function() {
            a.onLoad(a.data.optionsData), a.initData(a.data.optionsData), a.setData({
                pullDownRefreshFlag: !0
            }), wx.stopPullDownRefresh();
        }, 1500));
    },
    onLoad: function(a) {
        this.setData({
            optionsData: a
        });
    },
    onShow: function() {
        a.doAfterUserInfoAuth({
            success: this.initData,
            fail: this.initData
        });
    },
    initData: function(a) {
        t.registerGlobalVar("ShopUtil", e), a.page = "CustomPage_" + a.id, t.registerGlobalFunc(), 
        t.loadPageModules(a);
    },
    onShareAppMessage: function() {
        var t = this.data.optionsData.scene.match(/\_(\d+)/);
        return a.shareAppMessage({
            url: this.data.optionsData.scene ? this.data.url + "?id=" + t[1] : this.data.url,
            title: this.data.pageTitle
        });
    },
    onPageScroll: function() {},
    isLogin: function() {
        setTimeout(function() {
            a.globalData.WebUserID || e.showRegUI();
        }, 2e3);
    },
    phoneConfirm: function(a) {
        var t = this, e = "";
        t.setData({
            phoneNumber: a.detail.value
        }), e = a.detail.value, /^1\d{10}$/.test(e) ? t.setData({
            tips: ""
        }) : t.setData({
            tips: "请输入正确的手机号码!"
        });
    },
    yijiandaohhang: function(a) {
        console.log("yijiandaohhang");
        for (var t, e, o = a.currentTarget.dataset.hi, n = o[0].Latitude, i = o[0].Longitude, s = 0; s < o.length; s++) 1 == o[s].Type && (t = o[s].Text, 
        e = o[s].Title);
        wx.openLocation({
            name: e,
            address: t,
            longitude: Number(i),
            latitude: Number(n)
        });
    },
    yijianbohao: function(a) {
        var t = a.currentTarget.dataset.iphone;
        wx.makePhoneCall({
            phoneNumber: t
        });
    }
});