var e = getApp(), a = require("../../utils/wxapp.js"), o = require("../../utils/wxcomm.js"), t = require("../../utils/util.js");

Page({
    data: {
        hasUserInfo: !1,
        canClick: !1,
        userInfo: {},
        latitude: 0,
        longitude: 0,
        merchantId: "",
        time: new Date().getTime(),
        projectUrl: a.projectUrl,
        merchantConfigId: "",
        smallOpenId: "",
        isAuthor: !0,
        couponsList: [],
        activityList: [],
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        openId: ""
    },
    onLoad: function(a) {
        console.log(a), console.log(wx.getStorageSync("user"));
        var o = this;
        if (console.log(a.param), a.param) {
            var t = a.param;
            wx.setNavigationBarTitle({
                title: t.substring(0, t.indexOf("|"))
            }), o.setData({
                merchantConfigId: t.substring(t.indexOf("|") + 1, t.length)
            }), e.globalData.merchantConfigId = t.substring(t.indexOf("|") + 1, t.length);
        }
        if (void 0 !== wx.getStorageSync("user").openId) {
            var n = wx.getStorageSync("user").openId;
            o.setData({
                smallOpenId: n,
                isAuthor: !1
            }), console.log(o.data.merchantConfigId), console.log(o.data.smallOpenId), console.log(o.data.projectUrl), 
            console.log(o.data.isAuthor), e.globalData.userInfo ? o.setData({
                userInfo: e.globalData.userInfo,
                hasUserInfo: !0
            }) : o.data.canIUse ? e.userInfoReadyCallback = function(e) {
                o.setData({
                    userInfo: e.userInfo,
                    hasUserInfo: !0
                });
            } : wx.getUserInfo({
                success: function(a) {
                    e.globalData.userInfo = a.userInfo, o.setData({
                        userInfo: a.userInfo,
                        hasUserInfo: !0
                    });
                }
            });
        } else o.setData({
            isAuthor: !0
        });
        o.getLocation();
    },
    onShow: function() {},
    getUserInfo: function(n) {
        var s = this;
        console.log(n), this.setData({
            canClick: !0
        });
        var r = this;
        e.globalData.userInfo = n.detail.userInfo, "getUserInfo:ok" == n.detail.errMsg ? wx.getSetting({
            success: function(i) {
                if (console.log(i), i.authSetting["scope.userInfo"]) {
                    s.userInfoReadyCallback && s.userInfoReadyCallback(i);
                    var l = a.data.appid, c = a.data.secret, u = e.globalData.code, g = n.detail.userInfo;
                    o.getAppData(l, c, u).then(function(n) {
                        if (void 0 === n.openId) wx.showToast({
                            title: "请重新授权",
                            icon: "none",
                            duration: 2e3
                        }), wx.login({
                            success: function(a) {
                                console.log("aaa"), console.log(a), e.globalData.code = a.code;
                            }
                        }), setTimeout(function() {
                            r.setData({
                                canClick: !1
                            }), wx.reLaunch({
                                url: "/pages/merchant/merchant"
                            });
                        }, 2001); else {
                            wx.setStorageSync("user", n);
                            var s = n.openId;
                            e.userInfoReadyCallback && e.userInfoReadyCallback(i), wx.setStorageSync("userInfo", g), 
                            r.setData({
                                smallOpenId: s,
                                isAuthor: !1
                            });
                            var l = {
                                smallOpenId: s,
                                nickname: g.nickName,
                                headImgUrl: g.avatarUrl
                            }, c = a.projectUrl + "/miniProgram/editProgramUser";
                            o.reqPost(c, t.json2Form(l), "application/x-www-form-urlencoded").then(function(e) {
                                console.log(e);
                            });
                        }
                    });
                }
            }
        }) : this.setData({
            canClick: !1
        });
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "探索身边优惠",
            imageUrl: "https://imgs.52wxr.com/upload/image/201901/20190122/1548146339888061576.jpg",
            path: "/page/index/index"
        };
    },
    getLocation: function() {
        var e = this;
        wx.getLocation({
            type: "gcj02",
            success: function(a) {
                var o = a.latitude, t = a.longitude;
                a.speed, a.accuracy;
                console.log("纬度:" + o), e.setData({
                    latitude: o,
                    longitude: t
                });
            }
        });
    },
    markertap: function(e) {
        console.log(e.markerId);
    }
});