var e = require("../../utils/server"), a = (require("../../config.js"), {});

Page({
    data: {
        userInfo: {},
        cardClass: [ "余额", "积分", "卡券" ],
        myClass: [ {
            myClassName: "我的订单",
            path: "toOrder",
            src: "icon-dingdan"
        }, {
            myClassName: "我的余额",
            path: "toMoney",
            src: "icon-money-bag"
        }, {
            myClassName: "我的收藏",
            path: "toCollect",
            src: "icon-shoucang"
        }, {
            myClassName: "常备地址",
            path: "openAds",
            src: "icon-icondizhi"
        } ]
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "个人中心"
        });
        var t = wx.getStorageSync("isAuth");
        this.setData({
            isAuth: t
        }), a = {
            authorization: wx.getStorageSync("authorization")
        };
    },
    onShow: function() {
        var t = wx.getStorageSync("isAuth");
        this.setData({
            isAuth: t
        });
        var o = {
            more: !0
        }, n = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), e.getApiJSON("/api/userInfo/getUserInfo", o, function(e) {
            if (1e3 == e.data.code) {
                var a = e.data.data, t = a.tel;
                t = t.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"), "" == a.head_path && (a.head_path = "../../images/defaultHeadImg.png"), 
                n.setData({
                    userInfo: {
                        userName: a.nick_name,
                        userId: a.user_id,
                        userImgSrc: a.head_path,
                        userTel: t
                    },
                    cardClass: [ {
                        name: "余额",
                        info: a.card_money
                    }, {
                        name: "积分",
                        info: a.card_grade
                    }, {
                        name: "卡券",
                        info: a.ticket
                    } ]
                }), wx.hideLoading();
            } else wx.hideLoading();
        }, a);
    },
    toBindTel: function() {
        wx.navigateTo({
            url: "../bindTel/bindTel"
        });
    },
    toOrder: function() {
        wx.switchTab({
            url: "../orders/orders"
        });
    },
    toMoney: function() {
        wx.navigateTo({
            url: "../chargeMoney/chargeMoney"
        });
    },
    toCollect: function() {
        wx.navigateTo({
            url: "../personalCollection/personalCollection"
        });
    },
    openAds: function() {
        wx.chooseAddress({
            success: function(e) {
                wx.setStorageSync("userInfo", {
                    userAddress: e.provinceName + e.cityName + e.countyName + e.detailInfo,
                    userName: e.userName,
                    userTel: e.telNumber,
                    nowLocal: e.cityName + e.countyName + e.detailInfo
                });
            }
        });
    }
});