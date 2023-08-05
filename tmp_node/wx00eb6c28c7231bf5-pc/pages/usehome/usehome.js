var t = getApp();

Page({
    data: {
        userInfo: {}
    },
    onLoad: function(t) {},
    onShow: function() {
        var t = this;
        t.loadData(t);
    },
    onPullDownRefresh: function() {
        var n = this;
        t.globalData.userInfo = null, n.loadData(n);
    },
    loadData: function(n) {
        var n = this;
        t.getUserInfo(function(t) {
            n.setData({
                userInfo: t
            });
        });
    },
    bindWaitPayTap: function(t) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=1"
        });
    },
    bindWaitSendTap: function(t) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=2"
        });
    },
    bindWaitFinishTap: function(t) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=3"
        });
    },
    bindAllOrderTap: function(t) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=0"
        });
    },
    bindApply: function(t) {
        wx.navigateTo({
            url: "../applylist/applylist"
        });
    },
    bindMyAddressTap: function(t) {
        wx.navigateTo({
            url: "../address/address"
        });
    },
    bindMyCouponsTap: function(t) {
        wx.navigateTo({
            url: "../coupon/coupon"
        });
    },
    ExitLoginout: function() {
        t.getOpenId(function(n) {
            wx.request({
                url: t.getUrl("logout"),
                data: {
                    openId: n
                },
                success: function(t) {
                    wx.redirectTo({
                        url: "../login/login"
                    });
                }
            });
        });
    },
    bindTelPhone: function(t) {
        var n = t.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: n
        });
    }
});