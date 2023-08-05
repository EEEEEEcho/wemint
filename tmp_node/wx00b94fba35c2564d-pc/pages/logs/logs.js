require("../../utils/util.js");

var e = getApp();

Page({
    data: {
        logs: []
    },
    onLoad: function(o) {
        console.log(o), wx.login({
            success: function(s) {
                console.log(s);
                if (s.code) {
                    var a = e.globalData.URL + "/index/dev/auth";
                    wx.request({
                        url: a,
                        data: {
                            appid: e.globalData.appid,
                            wx_openid: o.wx_openid,
                            secret: e.globalData.secret,
                            code: s.code
                        },
                        method: "GET",
                        header: {
                            "content-type": "application/json"
                        },
                        success: function(e) {
                            console.log(e);
                            var o = e.data.data;
                            wx.setStorageSync("openid", o.openid), wx.setStorageSync("session_key", o.session_key);
                        }
                    });
                }
            }
        });
    },
    getUserInfo: function() {
        var e = this;
        wx.getUserInfo({
            success: function(o) {
                console.log(o), e.globalData.userInfo = o.userInfo;
            }
        });
    }
});