function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = e(require("../../store")), s = e(require("../../utils/create")), t = require("../../api/apiInstance.js"), a = getApp();

(0, s.default)(r.default, {
    properties: {},
    data: {
        isShowDisUser: !1,
        avatar: "",
        userQrCode: "",
        cartPage: "我的",
        userInfo: {},
        isShowCode: !1,
        navH: a.globalData.navH,
        status: a.globalData.status,
        options: !1,
        orderIndex: 0,
        isShowContactService: !1
    },
    onHide: function() {
        this.setData({
            isShowContactService: !1
        });
    },
    dismissConcatModal: function(e) {
        this.setData({
            isShowContactService: e.detail
        });
    },
    launchApp: function(e) {
        this.store.data.isLogin ? this.setData({
            isShowContactService: !0
        }) : wx.navigateTo({
            url: "/pages/login/loginFast/loginFast"
        });
    },
    toLogin: function(e) {
        this.store.data.isLogin ? wx.navigateTo({
            url: "/pages/mine/setting/personInfo/personInfo"
        }) : wx.navigateTo({
            url: "/pages/login/loginFast/loginFast"
        });
    },
    showCodeModel: function() {
        var e = this;
        if (this.store.data.isLogin) if (this.setData({
            isShowCode: !0,
            options: !0
        }), "" == this.store.data.userQrCode) {
            var r = {
                accesstoken: this.store.data.userInfo.accesstoken
            };
            (0, t.getUserQrCode)(r, function(r) {
                1 == r.errcode && (e.setData({
                    userQrCode: r.data.qrCode
                }), e.store.data.userQrCode = r.data.qrCode, e.update());
            });
        } else this.setData({
            userQrCode: this.store.data.userQrCode
        }); else wx.navigateTo({
            url: "/pages/login/loginFast/loginFast"
        });
    },
    closeCodeModel: function() {
        var e = this;
        this.setData({
            options: !1
        }), setTimeout(function() {
            e.setData({
                isShowCode: !1
            }), wx.showTabBar();
        }, 500);
    },
    onOrderSelect: function(e) {
        var r = parseInt(e.currentTarget.dataset.orderIndex);
        this.setData({
            orderIndex: r
        });
    },
    onShow: function() {
        var e = !1;
        e = 1 == this.store.data.userInfo.isDisUser, this.setData({
            avatar: this.store.data.userInfo.avatar,
            isShowDisUser: e
        });
    },
    toPage: function(e) {
        if (this.store.data.isLogin) {
            var r = "";
            switch (e.currentTarget.dataset.type) {
              case "设置":
                r = "/pages/mine/setting/setting";
                break;

              case "消息":
                r = "/pages/mine/messages/messages";
                break;

              case "全部订单":
                r = 0 == this.data.orderIndex ? "/pages/order/allOrder/allOrder?goodType=1" : "/pages/order/allOrder/allOrder?goodType=2";
                break;

              case "分销中心":
                r = "/pages/mine/distribution/distribution";
                break;

              case "待付款":
                r = 0 == this.data.orderIndex ? "/pages/order/orderList/orderList?orderStatus=1&goodType=1" : "/pages/order/orderList/orderList?orderStatus=1&goodType=2";
                break;

              case "待发货":
                r = 0 == this.data.orderIndex ? "/pages/order/orderList/orderList?orderStatus=3&goodType=1" : "/pages/order/orderList/orderList?orderStatus=3&goodType=2";
                break;

              case "待收货":
                r = 0 == this.data.orderIndex ? "/pages/order/orderList/orderList?orderStatus=4&goodType=1" : "/pages/order/orderList/orderList?orderStatus=4&goodType=2";
                break;

              case "待评价":
                r = 0 == this.data.orderIndex ? "/pages/order/orderList/orderList?orderStatus=5&goodType=1" : "/pages/order/orderList/orderList?orderStatus=5&goodType=2";
                break;

              case "尚售后":
                r = "/pages/order/orderList/orderList?orderStatus=6&goodType=1";
                break;

              case "待分享":
                r = "/pages/order/orderList/orderList?orderStatus=7&goodType=2";
                break;

              case "待开奖":
                r = "/pages/order/orderList/orderList?orderStatus=8&goodType=2";
                break;

              case "优惠券":
                r = "/pages/mine/couponCard/couponCard";
                break;

              case "心愿单":
                r = "/pages/mine/wishList/wishList";
                break;

              case "我的收藏":
                r = "/pages/mine/myFavorite/myFavorite";
                break;

              case "我的足迹":
                r = "/pages/mine/myTracks/myTracks";
                break;

              case "意见反馈":
                r = "/pages/mine/suggestions/suggestions";
            }
            wx.navigateTo({
                url: r
            });
        } else wx.navigateTo({
            url: "/pages/login/loginFast/loginFast"
        });
    }
});