var e = getApp();

Page({
    data: {
        motto: "Hello World",
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        weburl: getApp().globalData.weburl
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onLoad: function() {
        var a = this;
        e.globalData.userInfo ? this.setData({
            userInfo: e.globalData.userInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? e.userInfoReadyCallback = function(e) {
            a.setData({
                userInfo: e.userInfo,
                hasUserInfo: !0
            });
        } : wx.getUserInfo({
            success: function(o) {
                console.log(o), e.globalData.userInfo = o.userInfo, a.setData({
                    userInfo: o.userInfo,
                    hasUserInfo: !0
                });
            }
        });
    },
    getUserInfo: function(a) {
        console.log(a), e.globalData.userInfo = a.detail.userInfo, this.setData({
            userInfo: a.detail.userInfo,
            hasUserInfo: !0
        });
    },
    onShow: function() {
        e.data.webShowed ? wx.navigateBack({
            delta: 1
        }) : wx.navigateTo({
            url: "/pages/view/view"
        });
    }
});