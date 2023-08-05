Page({
    data: {},
    onLoad: function(n) {
        var o = JSON.parse(n.model);
        this.setData({
            model: o
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    previewImg: function(n) {
        var o = n.currentTarget.dataset.index, e = this.data.model.img_path;
        wx.previewImage({
            current: e[o],
            urls: e
        });
    }
});