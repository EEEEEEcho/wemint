var t = require("../../utils/config.js"), a = getApp();

Page({
    data: {
        addressData: []
    },
    onLoad: function(e) {
        var i = this;
        a.getOpenId(function(e) {
            var s = {
                openId: e
            };
            wx.showNavigationBarLoading(), t.httpGet(a.getUrl(a.globalData.getUserShippingAddress), s, i.getUserShippingAddressData);
        });
    },
    getUserShippingAddressData: function(t) {
        var a = this;
        "NOUser" == t.Message ? wx.redirectTo({
            url: "../login/login"
        }) : "OK" == t.Status ? (a.setData({
            addressData: t.Data
        }), wx.hideNavigationBarLoading()) : "NO" == t.Status ? (a.setData({
            addressData: []
        }), wx.hideNavigationBarLoading()) : wx.hideNavigationBarLoading();
    },
    getAddressResultData: function(e) {
        var i = this;
        "NOUser" == e.Message ? wx.redirectTo({
            url: "../login/login"
        }) : "OK" == e.Status ? (wx.showToast({
            title: e.Message,
            icon: "success"
        }), a.getOpenId(function(e) {
            var s = {
                openId: e
            };
            wx.hideNavigationBarLoading(), t.httpGet(a.getUrl(a.globalData.getUserShippingAddress), s, i.getUserShippingAddressData);
        })) : wx.hideNavigationBarLoading();
    },
    bindRadioAddressChange: function(e) {
        var i = this, s = e.currentTarget.dataset.shippingid;
        a.getOpenId(function(e) {
            var d = {
                openId: e,
                shippingId: s
            };
            wx.showNavigationBarLoading(), t.httpGet(a.getUrl(a.globalData.setDefaultShippingAddress), d, i.getAddressResultData);
        });
    },
    bindDeleteAddressTap: function(e) {
        var i = this, s = e.currentTarget.dataset.shippingid;
        wx.showModal({
            title: "确定删除该地址吗？",
            success: function(e) {
                e.confirm && a.getOpenId(function(e) {
                    var d = {
                        openId: e,
                        shippingId: s
                    };
                    wx.showNavigationBarLoading(), t.httpGet(a.getUrl(a.globalData.delShippingAddress), d, i.getAddressResultData);
                });
            }
        });
    },
    bindEditAddressTap: function(t) {
        var a = t.currentTarget.dataset.addressdata;
        console.log(JSON.stringify(a)), wx.redirectTo({
            url: "../editaddress/editaddress?extra=" + JSON.stringify(a) + "&title=编辑收货地址"
        });
    },
    bindAddAddressTap: function(t) {
        wx.redirectTo({
            url: "../editaddress/editaddress?title=新增收货地址"
        });
    }
});