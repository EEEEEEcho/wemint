var t = getApp();

Page({
    data: {
        url: t.page.url,
        userid: "",
        coupon: [],
        can: "",
        id: 0,
        style: ""
    },
    topChange: function(t) {
        console.log(t.currentTarget.dataset.can), t.currentTarget.dataset.can ? this.setData({
            can: t.currentTarget.dataset.can
        }) : this.setData({
            can: ""
        }), this.getCoupon();
    },
    getCoupon: function() {
        var a = this;
        console.log(a.data.can), wx.request({
            url: t.page.url + "/wx/point.php",
            method: "post",
            data: {
                userid: a.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    coupon: t.data.coupon
                });
            }
        });
    },
    addCoupon: function(a) {
        var o = this;
        o.setData({
            id: a.currentTarget.dataset.id
        }), wx.request({
            url: t.page.url + "/wx/member.php?act=point_add",
            method: "post",
            data: {
                id: o.data.id,
                userid: o.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (console.log(t.data), 0 == t.data) {
                    wx.showToast({
                        title: "领取成功",
                        icon: "loading",
                        duration: 1e3
                    });
                    for (var a = o.data.coupon, e = 0; e < a.length; e++) a[e].id == o.data.id && (a[e].lingqu = 1);
                    o.setData({
                        coupon: a
                    });
                } else 1 == t.data ? wx.showToast({
                    title: "领取失败",
                    icon: "loading",
                    duration: 1e3
                }) : wx.showToast({
                    title: "已领取",
                    icon: "loading",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        wx.getStorage({
            key: "userid",
            success: function(t) {
                console.log(t), a.setData({
                    userid: t.data
                }), a.getCoupon();
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarTitle({
            title: t.globalData.title
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});