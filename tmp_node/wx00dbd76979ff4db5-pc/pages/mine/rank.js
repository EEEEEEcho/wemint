var a = getApp().globalData.rootPath;

Page({
    data: {
        path: a,
        status: 1
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
            url: a + "/admin/xcx/ranking",
            data: {},
            method: "POST",
            success: function(a) {
                console.log(a);
                var s = a.data.user.length, n = a.data.cars.length;
                t.setData({
                    user: a.data.user,
                    cars: a.data.cars,
                    usernum: s,
                    carsnum: n
                }), wx.hideToast();
            }
        });
    },
    navchange: function(a) {
        var t = a.currentTarget.dataset.status;
        this.setData({
            status: t
        });
    }
});