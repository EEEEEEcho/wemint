getApp();

Page({
    data: {
        info: {},
        isMine: !1,
        bottom: "100rpx"
    },
    checkImg: function(t) {
        wx.previewImage({
            urls: t.currentTarget.dataset.urls,
            current: t.currentTarget.dataset.url
        });
    },
    takePhone: function(t) {
        var e = t.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "溢农信息",
            path: this.route + "?id=" + this.data.info._id,
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {}
        };
    },
    checkAddress: function(t) {
        wx.openLocation({
            latitude: t.currentTarget.dataset.latitude,
            longitude: t.currentTarget.dataset.longitude
        });
    },
    onLoad: function(t) {
        var e = this;
        t.mine && this.setData({
            isMine: !0,
            bottom: 0
        }), wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: "https://www.0469ynxx.cn/api/detail",
            data: {
                _id: t.id
            },
            success: function(t) {
                wx.hideLoading(), t.data.value || wx.showModal({
                    title: "提示",
                    content: "该信息已删除，请刷新！",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.switchTab({
                            url: "/pages/index/index",
                            success: function(t) {
                                var e = getCurrentPages().pop();
                                void 0 !== e && null !== e && e.onLoad();
                            }
                        });
                    }
                }), e.setData({
                    info: t.data.value
                });
            }
        });
    }
});