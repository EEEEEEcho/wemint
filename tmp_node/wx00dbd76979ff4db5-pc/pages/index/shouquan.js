var a = getApp(), e = a.globalData.rootPath;

Page({
    data: {},
    onLoad: function(a) {
        wx.hideShareMenu();
    },
    onReady: function() {},
    onShow: function() {},
    userInfoHandler: function(o) {
        if (wx.showToast({
            title: "信息获取中",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), "getUserInfo:ok" == o.detail.errMsg) {
            console.log(o);
            var n = o.detail.userInfo.avatarUrl, t = o.detail.userInfo.nickName;
            wx.request({
                url: e + "/admin/xcx/wsinfo",
                data: {
                    openid: a.globalData.openid,
                    headimgurl: n,
                    nickname: t
                },
                success: function(a) {
                    1 == a.data ? (wx.hideToast(), wx.redirectTo({
                        url: "/pages/index/denglu"
                    })) : wx.showToast({
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