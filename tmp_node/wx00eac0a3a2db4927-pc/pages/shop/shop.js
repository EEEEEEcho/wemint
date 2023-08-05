function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../store")), a = t(require("../../utils/create")), o = require("../../api/apiInstance"), s = require("../../utils/distribution"), n = getApp();

(0, a.default)(e.default, {
    data: {
        navH: n.globalData.navH,
        status: n.globalData.status,
        cartPage: "尚免家居",
        isComplex: !0,
        isPrice: !0,
        isGrade: !0,
        isClassify: !0,
        tabIndex: 0,
        shopUuid: "",
        shopInfo: {},
        qrCodeKey: "",
        isShowUserInfo: !1,
        sceneData: "",
        isShareJump: !1,
        isShowLoad: !1
    },
    onReady: function() {
        this.getUserShop();
    },
    onItemClick: function(t) {
        this.setData({
            tabIndex: t.detail.itemIndex
        });
    },
    onLoad: function(t) {
        var e = this;
        (0, s.initScene)(this, t, !0, "shopUuid", function() {
            (0, s.initQrCode)(e, "pages/shop/shop", "shopUuid", e.data.shopUuid);
        }, function() {
            (0, s.initQrCode)(e, "pages/shop/shop", "shopUuid", e.data.shopUuid);
        }, function(t) {
            e.setData({
                sceneData: t,
                isShowUserInfo: !0
            });
        });
    },
    getUserShop: function() {
        var t = this;
        this.setData({
            isShowLoad: !0
        });
        var e = {
            shopUuid: this.data.shopUuid,
            accesstoken: this.store.data.userInfo.accesstoken
        };
        (0, o.getShopInfo)(e, function(e) {
            wx.stopPullDownRefresh(), 1 === e.errcode && t.setData({
                shopInfo: e.data,
                cartPage: e.data.name
            }), t.setData({
                isShowLoad: !1
            });
        });
    },
    onNavigation: function() {
        var t = this.data.shopInfo, e = t.latitude, a = t.longitude, o = t.name, s = t.address;
        wx.openLocation({
            latitude: e,
            longitude: a,
            scale: 18,
            name: o,
            address: s
        });
    },
    callPhone: function(t) {
        var e = this.data.shopInfo.phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    onLaunch: function(t) {},
    onShareAppMessage: function(t) {
        return wx.showShareMenu({
            withShareTicket: !0
        }), (0, s.onSharePage)(this, "/pages/shop/shop", "shopUuid", this.data.shopUuid, {
            title: this.data.shopInfo.name,
            desc: this.data.shopInfo.description,
            imageUrl: this.data.shopInfo.scenesImages[0]
        });
    },
    onPullDownRefresh: function() {
        this.getUserShop();
    },
    onReachBottom: function() {
        1 == this.data.tabIndex && this.selectComponent("#goodsList").onMore();
    }
});