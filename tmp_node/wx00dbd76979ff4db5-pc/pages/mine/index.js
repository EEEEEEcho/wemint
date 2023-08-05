var e = getApp(), n = e.globalData.rootPath;

Page({
    data: {
        yynum: 0
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {
        var a = this;
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), wx.request({
            url: n + "/admin/xcx/user",
            data: {
                openid: e.globalData.openid
            },
            method: "POST",
            success: function(e) {
                console.log(e);
                var o = e.data.id;
                a.setData({
                    user: e.data
                }), wx.request({
                    url: n + "/admin/xcx/yuyuelist",
                    data: {
                        uid: o
                    },
                    method: "POST",
                    success: function(e) {
                        console.log(e), a.setData({
                            yynum: e.data.num
                        });
                    }
                }), wx.request({
                    url: n + "/admin/xcx/collectlist",
                    data: {
                        uid: o
                    },
                    method: "POST",
                    success: function(e) {
                        console.log(e), a.setData({
                            collect: e.data.num
                        });
                    }
                }), wx.request({
                    url: n + "/admin/xcx/recordlist",
                    data: {
                        uid: o
                    },
                    method: "POST",
                    success: function(e) {
                        console.log(e), a.setData({
                            record: e.data.num
                        }), wx.hideToast();
                    }
                });
            }
        });
    },
    yuyue: function() {
        wx.navigateTo({
            url: "/pages/mine/yuyue"
        });
    },
    collect: function() {
        wx.navigateTo({
            url: "/pages/mine/collect"
        });
    },
    record: function() {
        wx.navigateTo({
            url: "/pages/mine/record"
        });
    },
    resetinfo: function() {
        wx.navigateTo({
            url: "/pages/mine/resetinfo"
        });
    },
    rank: function() {
        wx.navigateTo({
            url: "/pages/mine/rank"
        });
    },
    references: function() {
        wx.navigateTo({
            url: "/pages/mine/references"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    userInfoHandler: function(a) {
        if (wx.showToast({
            title: "信息获取中",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), "getUserInfo:ok" == a.detail.errMsg) {
            console.log(a);
            var o = a.detail.userInfo.avatarUrl, t = a.detail.userInfo.nickName, i = this;
            wx.request({
                url: n + "/admin/xcx/wsinfo",
                data: {
                    openid: e.globalData.openid,
                    headimgurl: o,
                    nickname: t
                },
                success: function(e) {
                    1 == e.data ? (wx.hideToast(), i.onShow()) : wx.showToast({
                        title: "信息同步失败",
                        icon: "loading",
                        duration: 1e3,
                        mask: !0
                    });
                }
            });
        } else wx.hideToast();
    }
});