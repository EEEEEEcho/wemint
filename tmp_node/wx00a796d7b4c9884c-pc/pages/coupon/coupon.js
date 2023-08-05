var t = getApp();

Page({
    data: {
        url: t.page.url,
        userid: "",
        coupon: [],
        can: ""
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
            url: t.page.url + "/wx/member.php?act=point_list",
            method: "post",
            data: {
                can: a.data.can,
                userid: a.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    coupon: t.data
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