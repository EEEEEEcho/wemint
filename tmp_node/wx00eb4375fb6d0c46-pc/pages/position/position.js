Page({
    data: {
        latitude: 0,
        longitude: 0,
        name: ""
    },
    onLoad: function(o) {
        this.moveToLocation();
    },
    moveToLocation: function() {
        wx.chooseLocation({
            success: function(o) {
                wx.setStorageSync("adressMsg", o), wx.navigateBack({
                    delta: 2
                });
            },
            fail: function(o) {
                console.log(o), wx.navigateBack({
                    delta: 2
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});