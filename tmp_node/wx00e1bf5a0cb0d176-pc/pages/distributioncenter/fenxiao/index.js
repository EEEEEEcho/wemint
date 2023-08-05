var a = getApp();

Page({
    data: {},
    onLoad: function(t) {
        this.setData({
            language: a.globalData.language
        });
    }
});