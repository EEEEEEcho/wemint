getApp();

Page({
    data: {
        motto: "Hello World",
        url: "https://dev.qian-hong.com/index/dev/mini"
    },
    onLoad: function() {},
    setData: function() {
        wx.setStorageSync("admin", Date.parse(new Date()));
    },
    getData: function() {
        console.log(wx.getStorageSync("admin"));
    }
});