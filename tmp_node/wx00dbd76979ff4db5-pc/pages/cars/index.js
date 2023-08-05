var a = getApp(), t = a.globalData.rootPath;

Page({
    data: {
        check: 0,
        path: t,
        pick: 0,
        pinpai: "",
        hot: 0,
        jiage: 0,
        page: 1,
        pfbz: [ "不限", "国一及以上", "国二及以上", "国三及以上", "国四及以上", "国五及以上" ],
        pfbzindex: 0,
        paifang: "不限",
        cl: [ "不限", "1年以内", "1~3年", "3~5年", "5~8年", "8~10年", "10年以上" ],
        clindex: 0,
        cheling: "不限",
        bsx: [ "不限", "手动", "自动" ],
        bsxindex: 0,
        biansuxiang: "不限",
        pl: [ "不限", "1.0L以内", "1.0L~1.6L", "1.7L~2.0L", "2.1L~2.5L", "2.6L~3.0L", "3.1L~4.0L", "4.0L以上" ],
        plindex: 0,
        pailiang: "不限",
        ys: [ "不限", "黑色", "白色", "银灰色", "深灰色", "红色", "香槟色", "蓝色", "黄色" ],
        ysindex: 0,
        color: "不限",
        cx: [ "不限", "微小型车", "紧凑型车", "中型车", "中大型车", "SUV", "MPV", "跑车", "微面", "皮卡" ],
        cxindex: 0,
        chexing: "不限"
    },
    onLoad: function(e) {
        var i = this;
        wx.getSystemInfo({
            success: function(a) {
                console.log(a.windowWidth), console.log(a.windowHeight), i.setData({
                    windowHeight: a.windowHeight
                });
            }
        }), "" == a.globalData.openid && i.getopenid(), wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), wx.request({
            url: t + "/admin/xcx/carslist",
            data: {
                hot: i.data.hot,
                pinpai: i.data.pinpai,
                jiage: i.data.jiage,
                page: 1,
                chexing: i.data.cxindex,
                cheling: i.data.cheling,
                biansuxiang: i.data.biansuxiang,
                pailiang: i.data.pailiang,
                paifang: i.data.paifang,
                color: i.data.color
            },
            method: "POST",
            success: function(a) {
                console.log(a), i.setData({
                    list: a.data.list,
                    total: a.data.total,
                    page: 1
                }), wx.hideToast();
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    check: function(a) {
        var t = a.currentTarget.dataset.check;
        t == this.data.check ? this.setData({
            check: 0
        }) : this.setData({
            check: t
        });
    },
    move: function() {},
    hot: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.hot;
        t == this.data.hot ? this.setData({
            hot: 0
        }) : this.setData({
            hot: t
        });
    },
    pinpai: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.pinpai;
        t == this.data.pinpai ? this.setData({
            pinpai: "不限"
        }) : this.setData({
            pinpai: t
        });
    },
    jiage: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.jiage;
        t == this.data.jiage ? this.setData({
            jiage: 0
        }) : this.setData({
            jiage: t
        });
    },
    paifangbiaozhun: function(a) {
        console.log(a), console.log("排放标准，携带值为", a.detail.value), this.setData({
            pfbzindex: a.detail.value,
            paifang: this.data.pfbz[a.detail.value]
        }), console.log(this.data.paifang);
    },
    pailiang: function(a) {
        console.log(a), console.log("排量，携带值为", a.detail.value), this.setData({
            plindex: a.detail.value,
            pailiang: this.data.pl[a.detail.value]
        }), console.log(this.data.pailiang);
    },
    cheling: function(a) {
        console.log(a), console.log("车龄，携带值为", a.detail.value), this.setData({
            clindex: a.detail.value,
            cheling: this.data.cl[a.detail.value]
        }), console.log(this.data.cheling);
    },
    chexing: function(a) {
        console.log(a), console.log("车型，携带值为", a.detail.value), this.setData({
            cxindex: a.detail.value,
            chexing: this.data.cx[a.detail.value]
        }), console.log(this.data.chexing);
    },
    color: function(a) {
        console.log(a), console.log("颜色，携带值为", a.detail.value), this.setData({
            ysindex: a.detail.value,
            color: this.data.ys[a.detail.value]
        }), console.log(this.data.color);
    },
    biansuxiang: function(a) {
        console.log(a), console.log("变速箱，携带值为", a.detail.value), this.setData({
            bsxindex: a.detail.value,
            biansuxiang: this.data.bsx[a.detail.value]
        }), console.log(this.data.biansuxiang);
    },
    search: function(a) {
        var t = a.currentTarget.dataset.check;
        this.setData({
            check: t
        }), this.onLoad();
    },
    detail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/cars/detail?id=" + t
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        var a = this;
        wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 3e3,
            mask: !0,
            success: function(e) {
                if (!(6 * a.data.page < a.data.total)) return wx.hideToast(), !1;
                a.setData({
                    page: a.data.page + 1
                }), wx.request({
                    url: t + "/admin/xcx/carslist",
                    data: {
                        hot: a.data.hot,
                        pinpai: a.data.pinpai,
                        jiage: a.data.jiage,
                        page: a.data.page,
                        chexing: a.data.cxindex,
                        cheling: a.data.cheling,
                        biansuxiang: a.data.biansuxiang,
                        pailiang: a.data.pailiang,
                        paifang: a.data.paifang,
                        color: a.data.color
                    },
                    method: "POST",
                    dataType: "json",
                    responseType: "text",
                    success: function(t) {
                        console.log(t), wx.hideToast();
                        var e = t.data.list, i = a.data.list;
                        for (var o in e) i.push(e[o]);
                        t.data.total, a.data.page, e.length, a.setData({
                            list: i
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {},
    getopenid: function() {
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), wx.login({
            success: function(e) {
                e.code && wx.request({
                    url: t + "/admin/xcx/wxlogin",
                    data: {
                        js_code: e.code,
                        appid: a.globalData.appid,
                        secret: a.globalData.secret,
                        grant_type: "authorization_code"
                    },
                    method: "POST",
                    success: function(e) {
                        return console.log(e), -1 == e.data.code ? (wx.showToast({
                            title: "信息保存失败",
                            icon: "loading",
                            duration: 2e3,
                            mask: !0
                        }), !1) : -2 == e.data.code ? (wx.showToast({
                            title: "openid获取失败",
                            icon: "loading",
                            duration: 2e3,
                            mask: !0
                        }), !1) : (a.globalData.openid = e.data.openid, wx.hideToast(), void wx.request({
                            url: t + "/admin/xcx/havephone",
                            data: {
                                openid: a.globalData.openid
                            },
                            method: "POST",
                            success: function(e) {
                                console.log(e), 0 == e.data ? wx.redirectTo({
                                    url: "/pages/index/denglu"
                                }) : wx.request({
                                    url: t + "/admin/Xcx/user",
                                    data: {
                                        openid: a.globalData.openid
                                    },
                                    method: "POST",
                                    dataType: "json",
                                    responseType: "text",
                                    success: function(a) {
                                        console.log(a), "" == a.data.nickname && wx.redirectTo({
                                            url: "/pages/index/shouquan"
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