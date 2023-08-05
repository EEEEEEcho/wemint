var a = getApp();

Page({
    data: {
        imgUrls: [],
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500
    },
    onLoad: function(t) {
        wx.showShareMenu({
            withShareTicket: !0
        });
        var e = this;
        wx.request({
            url: a.globalData.apiurl + "home/page/picture",
            method: "GET",
            success: function(a) {
                wx.hideToast(), 1200 == a.data.code && e.setData({
                    imgUrls: a.data.content
                });
            }
        });
    }
});