var e, a = getApp(), t = a.globalData.httpUrl;

Page({
    data: {
        httpUrl: t
    },
    onLoad: function(a) {
        e = this, console.log(a), console.log(a.imgurl), e.setData({
            data: a.data,
            store_uuid: a.store_uuid,
            imgurl: a.imgurl,
            goUser: a.goUser,
            goActive: a.goActive,
            goDiancan: a.goDiancan,
            goCollage: a.goCollage
        }), a.scene && e.setData({
            scene: a.scene
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), e = this, setTimeout(function() {
            e.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    goDetail: function(o) {
        console.log(o.detail.userInfo);
        var n = e.data.data, r = (e.data.openid, e.data.store_uuid);
        if (console.log(n), o.detail.userInfo) {
            var s = o.detail.userInfo.nickName, d = o.detail.userInfo.avatarUrl;
            wx.request({
                url: t + "skmembermodel/getOpenidS",
                data: {
                    code: n,
                    AppID: a.globalData.appId,
                    Secret: a.globalData.Secret,
                    storeUuid: r,
                    wxUserNickName: s,
                    headImgUrl: d
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(a) {
                    e.setData({
                        onClickFlag: !0
                    }), null != a.data.openid && "" != a.data.openid ? (wx.setStorage({
                        key: "openId",
                        data: a.data.openid
                    }), wx.setStorage({
                        key: "userId",
                        data: a.data.wechatUser.wechatUserId
                    }), wx.setStorage({
                        key: "userName",
                        data: s
                    }), wx.setStorage({
                        key: "avatarUrl",
                        data: d
                    }), wx.setStorage({
                        key: "storeId",
                        data: r
                    }), "true" == e.data.goUser ? wx.switchTab({
                        url: "../../user/user"
                    }) : "true" == e.data.goActive ? wx.redirectTo({
                        url: "../../active/active?scene=" + e.data.scene + "&secondIn=1"
                    }) : "true" == e.data.goDiancan ? wx.redirectTo({
                        url: "../../index/takeOut/takeOutSM?scene=" + e.data.scene + "&secondIn=1"
                    }) : "true" == e.data.goCollage ? wx.redirectTo({
                        url: "../../collage/collage?scene=" + e.data.scene + "&secondIn=1"
                    }) : wx.switchTab({
                        url: "../../index/index"
                    })) : wx.showToast({
                        title: "登录失败"
                    });
                }
            });
        }
    }
});