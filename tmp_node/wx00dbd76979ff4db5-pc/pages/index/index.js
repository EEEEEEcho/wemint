var a = getApp(), e = a.globalData.rootPath;

Page({
    data: {
        path: e
    },
    onLoad: function() {},
    onShow: function() {
        var n = this;
        "" == a.globalData.openid && n.getopenid(), wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), wx.request({
            url: e + "/admin/xcx/index",
            data: {},
            method: "POST",
            success: function(a) {
                console.log(a), n.setData({
                    banner: a.data.banner,
                    jingpin: a.data.jingpin,
                    xinche: a.data.xinche,
                    news: a.data.news
                }), wx.hideToast();
            }
        });
    },
    detail: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/cars/detail?id=" + e
        });
    },
    newcar: function() {
        wx.navigateTo({
            url: "/pages/cars/newcar"
        });
    },
    jingpin: function() {
        wx.navigateTo({
            url: "/pages/cars/jingpin"
        });
    },
    newslist: function() {
        wx.navigateTo({
            url: "/pages/index/newslist"
        });
    },
    newsdetail: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/index/detail?id=" + e
        });
    },
    getopenid: function() {
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), wx.login({
            success: function(n) {
                n.code && wx.request({
                    url: e + "/admin/xcx/wxlogin",
                    data: {
                        js_code: n.code,
                        appid: a.globalData.appid,
                        secret: a.globalData.secret,
                        grant_type: "authorization_code"
                    },
                    method: "POST",
                    success: function(n) {
                        return console.log(n), -1 == n.data.code ? (wx.showToast({
                            title: "信息保存失败",
                            icon: "loading",
                            duration: 2e3,
                            mask: !0
                        }), !1) : -2 == n.data.code ? (wx.showToast({
                            title: "openid获取失败",
                            icon: "loading",
                            duration: 2e3,
                            mask: !0
                        }), !1) : (a.globalData.openid = n.data.openid, wx.hideToast(), void wx.request({
                            url: e + "/admin/Xcx/user",
                            data: {
                                openid: a.globalData.openid
                            },
                            method: "POST",
                            dataType: "json",
                            responseType: "text",
                            success: function(n) {
                                console.log(n), "" == n.data.nickname ? wx.redirectTo({
                                    url: "/pages/index/shouquan"
                                }) : wx.request({
                                    url: e + "/admin/xcx/havephone",
                                    data: {
                                        openid: a.globalData.openid
                                    },
                                    method: "POST",
                                    success: function(a) {
                                        console.log(a), 0 == a.data && wx.redirectTo({
                                            url: "/pages/index/denglu"
                                        });
                                    }
                                });
                            }
                        }));
                    }
                });
            }
        });
    }
});