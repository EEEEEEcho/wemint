var t = getApp();

Page({
    data: {
        userInfo: [],
        style: "",
        openid: "",
        showModalStatus: !1
    },
    onLoad: function(t) {
        var e = this;
        wx.getStorage({
            key: "userInfo",
            success: function(t) {
                console.log(t), e.setData({
                    userInfo: t.data,
                    style: "display:none"
                });
            }
        });
    },
    bindGetUserInfo: function(t) {
        t.detail.userInfo ? (this.setData({
            userInfo: t.detail.userInfo
        }), wx.setStorage({
            key: "userInfo",
            data: t.detail.userInfo
        }), this.login()) : wx.switchTab({
            url: "../index/index"
        });
    },
    login: function() {
        var e = this;
        wx.getStorage({
            key: "openid",
            success: function(o) {
                e.setData({
                    openid: o.data
                }), wx.request({
                    url: t.page.url + "wx/login.php",
                    method: "post",
                    data: {
                        openid: e.data.openid,
                        username: e.data.userInfo.nickName
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(o) {
                        console.log(o.data);
                        var a = o.data.mobile;
                        wx.setStorage({
                            key: "userid",
                            data: o.data.id,
                            success: function() {
                                e.setData({
                                    showModalStatus: !1
                                }), wx.getStorage({
                                    key: "userid",
                                    success: function(o) {
                                        console.log(o), e.setData({
                                            userid: o.data
                                        }), wx.setStorage({
                                            key: "mobile",
                                            data: a
                                        }), "Y" == t.globalData.is_mobile && e.check_mobile();
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    check_mobile: function() {
        wx.getStorage({
            key: "mobile",
            success: function(t) {
                console.log(1), console.log(t), "" == t.data && wx.showModal({
                    title: "提示",
                    content: "去绑定手机号",
                    success: function(t) {
                        t.confirm ? (console.log(1), wx.navigateTo({
                            url: "../person/person"
                        })) : t.cancel && (console.log(2), wx.switchTab({
                            url: "../index/index"
                        }));
                    },
                    fail: function() {}
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "去绑定手机号",
                    success: function(t) {
                        t.confirm ? (console.log(1), wx.navigateTo({
                            url: "../person/person"
                        })) : t.cancel && (console.log(2), wx.switchTab({
                            url: "../index/index"
                        }));
                    },
                    fail: function() {}
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        wx.setNavigationBarTitle({
            title: t.globalData.title
        }), e.setData({
            showModalStatus: !1
        }), wx.getStorage({
            key: "userid",
            success: function(o) {
                console.log(o), e.setData({
                    userid: o.data,
                    style: "display:none"
                }), "Y" == t.globalData.is_mobile && e.check_mobile();
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    powerDrawer: function(t) {
        var e = t.currentTarget.dataset.statu;
        this.util(e);
    },
    util: function(t) {
        var e = wx.createAnimation({
            duration: 1,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = e, e.translateX(240).step(), this.setData({
            animationData: e.export()
        }), setTimeout(function() {
            e.translateX(0).step(), this.setData({
                animationData: e
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 1), "open" == t && this.setData({
            showModalStatus: !0
        });
    }
});