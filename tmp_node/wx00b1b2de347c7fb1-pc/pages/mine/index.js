var a = getApp(), e = require("../../utils/defaultAva");

Page({
    data: {
        userInfo: {}
    },
    onLoad: function() {
        a.globalData.userInfo ? this.setData({
            userInfo: a.globalData.userInfo
        }) : this.setData({
            userInfo: {
                avatarUrl: e,
                nickName: "未授权"
            }
        });
    },
    checkMine: function() {
        wx.navigateTo({
            url: "/pages/mineList/index"
        });
    }
});