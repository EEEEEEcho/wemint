var a = getApp().globalData.rootPath;

Page({
    data: {
        path: a,
        page: 1
    },
    onLoad: function(t) {
        wx.hideShareMenu();
        var e = this;
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), wx.request({
            url: a + "/admin/xcx/newcars",
            data: {
                page: 1
            },
            method: "POST",
            success: function(a) {
                console.log(a), e.setData({
                    list: a.data.list,
                    total: a.data.total,
                    page: 1
                }), wx.hideToast();
            }
        });
    },
    detail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/cars/detail?id=" + t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        var t = this;
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 3e3,
            mask: !0,
            success: function(e) {
                if (!(6 * t.data.page < t.data.total)) return wx.hideToast(), !1;
                t.setData({
                    page: t.data.page + 1
                }), wx.request({
                    url: a + "/admin/xcx/newcars",
                    data: {
                        page: t.data.page
                    },
                    method: "POST",
                    dataType: "json",
                    responseType: "text",
                    success: function(a) {
                        console.log(a), wx.hideToast();
                        var e = a.data.list, o = t.data.list;
                        for (var n in e) o.push(e[n]);
                        a.data.total, t.data.page, e.length, t.setData({
                            list: o
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {}
});