function t(t, a) {
    wx.showLoading({
        title: "加载中...",
        mask: !0
    });
    var e = getApp().globalData.apiurl + "user/seller/list";
    wx.request({
        url: e,
        data: {
            latitude: wx.getStorageSync("latitude"),
            longitude: wx.getStorageSync("longitude")
        },
        method: "POST",
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            if (console.log(a.data.content), a.data.content.length < t.data.PageSize) return t.data.IsLastPage = !0, 
            t.setData({
                SellerList: a.data.content
            }), wx.hideLoading(), !1;
            t.setData({
                SellerList: a.data.content
            }), wx.hideLoading();
        },
        fail: function() {
            wx.hideLoading(), wx.showToast({
                title: "获取列表失败",
                duration: 2e3
            });
        },
        complete: function() {}
    });
}

getApp().globalData;

Page({
    data: {
        SellerList: {},
        PageIndex: 1,
        PageSize: 5,
        IsLastPage: !1
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        t(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.data.PageIndex, t(this, --this.data.PageIndex);
    },
    onReachBottom: function() {
        console.log(this.data.PageIndex), this.data.IsLastPage, t(this, ++this.data.PageIndex);
    },
    onShareAppMessage: function() {}
});