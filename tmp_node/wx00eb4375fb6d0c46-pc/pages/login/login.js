var e = getApp(), a = require("../../utils/wxapp.js"), n = require("../../utils/wxcomm.js"), t = require("../../utils/util.js");

Page({
    data: {
        motto: "Hello World",
        hasOpenId: !1,
        canClick: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    onLoad: function() {
        e.globalData.userInfo && this.data.hasOpenId ? wx.reLaunch({
            url: "/pages/index/index"
        }) : this.data.canIUse ? e.userInfoReadyCallback = function(e) {
            wx.reLaunch({
                url: "/pages/index/index"
            });
        } : wx.getUserInfo({
            success: function(a) {
                e.globalData.userInfo = a.userInfo, wx.reLaunch({
                    url: "/pages/index/index"
                });
            }
        });
    },
    getUserInfo: function(o) {
        var s = this, r = this;
        this.setData({
            canClick: !0
        }), e.globalData.userInfo = o.detail.userInfo, "getUserInfo:ok" == o.detail.errMsg ? wx.getSetting({
            success: function(i) {
                if (i.authSetting["scope.userInfo"]) {
                    var l = a.data.appid, c = a.data.secret, u = e.globalData.code, d = o.detail.userInfo;
                    n.getAppData(l, c, u).then(function(o) {
                        if (void 0 === o.openId) wx.showToast({
                            title: "请重新授权",
                            icon: "none",
                            duration: 2e3
                        }), wx.login({
                            success: function(a) {
                                console.log("aaa"), console.log(a), e.globalData.code = a.code;
                            }
                        }), r.setData({
                            canClick: !1
                        }), setTimeout(function() {
                            wx.reLaunch({
                                url: "/pages/login/login"
                            });
                        }, 2001); else {
                            s.setData({
                                hasOpenId: !0
                            }), wx.setStorageSync("user", o);
                            var l = o.openId;
                            e.userInfoReadyCallback && e.userInfoReadyCallback(i), wx.setStorageSync("userInfo", d);
                            var c = {
                                smallOpenId: l,
                                nickname: d.nickName,
                                headImgUrl: d.avatarUrl
                            }, u = a.projectUrl + "/miniProgram/editProgramUser";
                            n.reqPost(u, t.json2Form(c), "application/x-www-form-urlencoded").then(function(e) {
                                console.log(e);
                            });
                        }
                    });
                }
            }
        }) : r.setData({
            canClick: !1
        });
    }
});