var a = getApp().globalData.rootPath;

Page({
    data: {
        path: a
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {
        var t = this;
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), wx.request({
            url: a + "/admin/xcx/index",
            data: {},
            method: "POST",
            success: function(a) {
                console.log(a), t.setData({
                    news: a.data.news
                }), wx.hideToast();
            }
        });
    },
    newsdetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/index/detail?id=" + t
        });
    }
});