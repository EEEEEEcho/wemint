var a = getApp();

Page({
    onShow: function() {
        a.data.webShowed ? wx.navigateBack({
            delta: 1
        }) : wx.navigateTo({
            url: "/pages/index/index"
        });
    }
});