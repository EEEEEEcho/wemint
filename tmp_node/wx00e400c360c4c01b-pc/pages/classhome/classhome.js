var o = require("../../utils/main.js"), a = getApp();

Page({
    data: {
        home_01: "http://p1wtvunnq.bkt.clouddn.com/201811090911380-80.jpg",
        home_01_old: "http://p1wtvunnq.bkt.clouddn.com/201811090911380-80.jpg",
        home_01_btn: "http://p1wtvunnq.bkt.clouddn.com/201811090911380-80.jpg",
        home_02: "http://p1wtvunnq.bkt.clouddn.com/201811090911380-80.jpg",
        home_03: "http://p1wtvunnq.bkt.clouddn.com/201811090911380-80.jpg",
        posterList: [],
        stuloginCheck: !1
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            userInfo: a.globalData.userInfo
        }), wx.request({
            url: o.localUrl + "mobileXcx/initialization",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                for (var t = o.data.dataInfo.menuList, n = "", d = "", l = "", i = "", c = 0; c < t.length; c++) "home_01" == t[c][0] && (n = t[c][1], 
                d = t[c][1]), "home_02" == t[c][0] && (l = t[c][1]), "home_03" == t[c][0] && (i = t[c][1]);
                null != a.globalData.userInfo && e.setData({
                    home_01_btn: a.globalData.userInfo.avatarUrl
                }), e.setData({
                    home_01: n,
                    home_01_old: d,
                    home_02: l,
                    home_03: i,
                    phone: o.data.dataInfo.phone,
                    posterList: o.data.dataInfo.posterList
                }), a.globalData.menuList = o.data.dataInfo.menuList, a.globalData.posterList = o.data.dataInfo.posterList, 
                a.globalData.qrcode = o.data.dataInfo.qrcode, a.globalData.mobile = o.data.dataInfo.phone;
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    mytouchstart: function(o) {
        this.setData({
            home_01: this.data.home_01_btn
        });
    },
    myteacherstart: function(o) {
        this.setData({
            home_02: this.data.home_01_btn
        });
    },
    myinfostart: function(o) {
        this.setData({
            home_03: this.data.home_01_btn
        });
    },
    stuNavigate: function(t) {
        var e = this, n = t.detail.userInfo;
        a.globalData.userInfo = t.detail.userInfo, null != n && wx.login({
            success: function(t) {
                t.code && (wx.showLoading({
                    mask: !0
                }), wx.request({
                    url: o.localUrl + "mobileXcx/getOpenId",
                    data: {
                        code: t.code
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(t) {
                        console.log(t), wx.hideLoading(), null != t.data.openid & void 0 != t.data.openid && (console.info("登录成功返回的openId：" + t.data.openid), 
                        a.globalData.openId = t.data.openid, wx.request({
                            url: o.localUrl + "mobileXcx/getUserByOpenId",
                            data: {
                                crm_code: o.crm_code,
                                type: 1,
                                openId: t.data.openid
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(o) {
                                e.setData({
                                    home_01: e.data.home_01_old
                                }), console.log(o.data), "000" != o.data.succeed ? wx.navigateTo({
                                    url: "../binding/binding"
                                }) : (null != o.data.dataInfo.cpc && (a.globalData.cpc = o.data.dataInfo.cpc), null != o.data.dataInfo.csc && (a.globalData.csc = o.data.dataInfo.csc), 
                                wx.navigateTo({
                                    url: "../stu/home/home"
                                }));
                            }
                        }));
                    }
                }));
            }
        });
    },
    teaLogin: function(t) {
        var e = t.detail.userInfo;
        a.globalData.userInfo = t.detail.userInfo, null != e && wx.login({
            success: function(t) {
                t.code && (wx.showLoading({
                    mask: !0
                }), wx.request({
                    url: o.localUrl + "mobileXcx/getOpenId",
                    data: {
                        code: t.code
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(t) {
                        console.log(t), wx.hideLoading(), null != t.data.openid & void 0 != t.data.openid && (console.info("登录成功返回的openId：" + t.data.openid), 
                        a.globalData.openId = t.data.openid, wx.request({
                            url: o.localUrl + "mobileXcx/getUserByOpenId",
                            data: {
                                crm_code: o.crm_code,
                                type: 0,
                                openId: t.data.openid
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(o) {
                                console.log(o.data), "000" != o.data.succeed ? wx.navigateTo({
                                    url: "../login/login"
                                }) : (null != o.data.dataInfo.tea && (a.globalData.teacher = o.data.dataInfo.tea), 
                                wx.navigateTo({
                                    url: "../teacher/home/home"
                                }));
                            }
                        }));
                    }
                }));
            }
        });
    },
    tourist: function(t) {
        var e = t.detail.userInfo;
        a.globalData.userInfo = t.detail.userInfo, null != e && (this.setData({
            userInfo: e
        }), wx.login({
            success: function(t) {
                t.code && (wx.showLoading({
                    mask: !0
                }), wx.request({
                    url: o.localUrl + "mobileXcx/getOpenId",
                    data: {
                        code: t.code
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(o) {
                        console.log(o), wx.hideLoading(), null != o.data.openid & void 0 != o.data.openid && (console.info("登录成功返回的openId：" + o.data.openid), 
                        a.globalData.openId = o.data.openid, wx.navigateTo({
                            url: "../tourist/mine/mine"
                        }));
                    }
                }));
            }
        }));
    },
    poster: function(t) {
        var e = t.detail.userInfo;
        a.globalData.userInfo = t.detail.userInfo, null != e && wx.login({
            success: function(t) {
                t.code && (wx.showLoading({
                    mask: !0
                }), wx.request({
                    url: o.localUrl + "mobileXcx/getOpenId",
                    data: {
                        code: t.code
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(o) {
                        console.log(o), wx.hideLoading(), null != o.data.openid & void 0 != o.data.openid && (console.info("登录成功返回的openId：" + o.data.openid), 
                        a.globalData.openId = o.data.openid, wx.navigateTo({
                            url: "../poster/posterList/posterList"
                        }));
                    }
                }));
            }
        });
    }
});