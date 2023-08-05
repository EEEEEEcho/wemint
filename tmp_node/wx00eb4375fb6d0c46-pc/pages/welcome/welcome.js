Page({
    data: {
        imgs: [ "https://imgs.52wxr.com/upload/image/201901/20190122/1548137489451066542.png", "https://imgs.52wxr.com/upload/image/201901/20190122/1548137503206020854.png", "https://imgs.52wxr.com/upload/image/201901/20190122/1548137514570039259.png", "https://imgs.52wxr.com/upload/image/201901/20190122/1548137527099065596.png" ]
    },
    start: function() {
        wx.navigateTo({
            url: "../login/login"
        });
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "探索身边优惠",
            imageUrl: "https://imgs.52wxr.com/upload/image/201901/20190122/1548146339888061576.jpg",
            path: "/page/index/index"
        };
    }
});