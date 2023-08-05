// pages/usehome/usehome.js
var app = getApp();

Page({
    data: {
        userInfo: {}
    },
    onLoad: function onLoad(options) {
        // 页面初始化 options为页面跳转所带来的参数
        // var that=this;
        //that.loadData(that);
    },
    onShow: function onShow() {
        var that = this;
        that.loadData(that);
    },
    onPullDownRefresh: function onPullDownRefresh() {
        var that = this;
        app.globalData.userInfo = null;
        that.loadData(that);
    },
    loadData: function loadData(that) {
        var that = this;
        app.globalData.isReloadUser = "1";
        app.getUserInfo(function(userInfo) {
            that.setData({
                userInfo: userInfo
            });
        });
    },
    bindWaitPayTap: function bindWaitPayTap(e) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=1"
        });
    },
    bindWaitSendTap: function bindWaitSendTap(e) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=2"
        });
    },
    bindWaitFinishTap: function bindWaitFinishTap(e) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=3"
        });
    },
    bindReviewTap: function bindReviewTap(e) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=5"
        });
    },
    bindAllOrderTap: function bindAllOrderTap(e) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=0"
        });
    },
    bindApply: function bindApply(e) {
        wx.navigateTo({
            url: "../applylist/applylist"
        });
    },
    bindMyAddressTap: function bindMyAddressTap(e) {
        wx.navigateTo({
            url: "../address/address"
        });
    },
    bindMyCouponsTap: function bindMyCouponsTap(e) {
        wx.navigateTo({
            url: "../coupon/coupon"
        });
    },
    ExitLoginout: function ExitLoginout() {
        app.getOpenId(function(openid) {
            wx.request({
                url: app.getUrl(app.globalData.prcesslogout),
                data: {
                    openId: openid
                },
                success: function success(result) {
                    wx.navigateTo({
                        url: "../login/login"
                    });
                }
            });
        });
    },
    bindTelPhone: function bindTelPhone(e) {
        var tel = e.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: tel
        });
    }
});