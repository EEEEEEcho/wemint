var a = require("../../wxParse/wxParse.js"), t = getApp(), s = t.globalData.rootPath;

Page({
    data: {
        path: s,
        guanzhu: 0
    },
    onLoad: function(t) {
        var e = this, o = t.id;
        e.setData({
            cars_id: o
        }), wx.request({
            url: s + "/admin/xcx/aboutus",
            data: {},
            method: "POST",
            success: function(t) {
                console.log(t);
                var s = String(t.data.content);
                e.setData({
                    us: t.data,
                    nodes: s
                }), a.wxParse("datas", "html", s, e, 5);
            }
        });
    },
    collect: function() {
        var a = this.data.user_id, t = this.data.cars_id, e = this;
        wx.request({
            url: s + "/admin/xcx/collect",
            data: {
                user_id: a,
                cars_id: t
            },
            method: "POST",
            success: function(a) {
                console.log(a), 3 != a.data.code ? (e.setData({
                    guanzhu: 1
                }), wx.showToast({
                    title: "关注成功",
                    icon: "success",
                    duration: 2e3,
                    mask: !0
                })) : (e.setData({
                    guanzhu: 0
                }), wx.showToast({
                    title: "已取消关注",
                    icon: "success",
                    duration: 2e3,
                    mask: !0
                }));
            }
        });
    },
    yuyue: function() {
        var a = this;
        wx.request({
            url: s + "/admin/xcx/yuyue",
            data: {
                cars_id: a.data.cars_id,
                user_id: a.data.user_id
            },
            method: "POST",
            success: function(t) {
                console.log(t), wx.showToast({
                    title: "预约成功",
                    icon: "success",
                    duration: 2e3,
                    mask: !0
                }), setTimeout(function() {
                    a.onShow();
                }, 2e3);
            }
        });
    },
    cancel: function() {
        wx.showToast({
            title: "已在预约队列中,请勿重复预约",
            icon: "none",
            duration: 2e3,
            mask: !0
        });
    },
    call: function(a) {
        var t = a.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), wx.request({
            url: s + "/admin/xcx/carsdetail",
            data: {
                id: e.data.cars_id
            },
            method: "POST",
            success: function(t) {
                console.log(t);
                var s = String(t.data.content);
                e.setData({
                    list: t.data,
                    notes: s
                }), a.wxParse("datas", "html", s, e, 5), wx.hideToast();
            }
        }), wx.request({
            url: s + "/admin/xcx/user",
            data: {
                openid: t.globalData.openid
            },
            method: "POST",
            success: function(a) {
                console.log(a), e.setData({
                    userinfo: a.data,
                    user_id: a.data.id
                }), wx.request({
                    url: s + "/admin/xcx/collectType",
                    data: {
                        user_id: e.data.user_id,
                        cars_id: e.data.cars_id
                    },
                    method: "POST",
                    success: function(a) {
                        console.log(a), a.data > 0 ? e.setData({
                            guanzhu: 1
                        }) : e.setData({
                            guanzhu: 0
                        });
                    }
                }), wx.request({
                    url: s + "/admin/xcx/record",
                    data: {
                        user_id: e.data.user_id,
                        cars_id: e.data.cars_id
                    },
                    method: "POST",
                    success: function(a) {}
                }), wx.request({
                    url: s + "/admin/xcx/yystatus",
                    data: {
                        cars_id: e.data.cars_id,
                        user_id: e.data.user_id
                    },
                    method: "POST",
                    success: function(a) {
                        console.log(a), e.setData({
                            yystatus: a.data
                        });
                    }
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});