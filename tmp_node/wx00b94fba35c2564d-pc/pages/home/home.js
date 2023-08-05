var e = getApp();

Page({
    data: {
        motto: "Hello World",
        userInfo: {},
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        hasRecord: !1
    },
    onLoad: function() {
        wx.setNavigationBarTitle({
            title: "千方舟"
        }), wx.getStorageSync("view_phone") && this.setData({
            hasRecord: !0
        });
    },
    getphonenumber: function(t) {
        console.log(t.detail.errMsg.indexOf("ok")), t.detail.errMsg.indexOf("ok") > -1 ? (wx.setStorageSync("decrypt", {
            encryptedData: t.detail.encryptedData,
            iv: t.detail.iv
        }), wx.request({
            url: e.globalData.URL + "/index/User/decrypt",
            method: "post",
            data: {
                appid: e.globalData.appid,
                session: wx.getStorageSync("session_key"),
                encryptedData: t.detail.encryptedData,
                iv: t.detail.iv
            },
            success: function(t) {
                var n = t.data;
                n.success && (wx.setStorageSync("view_phone", n.data.phoneNumber), wx.getStorageSync("view_phone") && wx.request({
                    url: e.globalData.URL + "/index/User/getPhone",
                    method: "post",
                    data: {
                        openid: wx.getStorageSync("openid"),
                        phone: wx.getStorageSync("view_phone")
                    },
                    success: function(e) {
                        e.data.success && wx.navigateTo({
                            url: "/pages/detail/detail"
                        });
                    }
                }));
            }
        })) : console.log("拒绝授权");
    },
    entryNow: function() {
        wx.navigateTo({
            url: "/pages/user/user"
        });
    },
    onShareAppMessage: function() {
        return {
            title: "零基础学IT , 月薪过万",
            path: "pages/index/index?openid=" + wx.getStorageSync("openid"),
            imageUrl: "",
            success: function(e) {
                console.log("转发成功:" + JSON.stringify(e));
            },
            fail: function(e) {
                console.log("转发失败:" + JSON.stringify(e));
            }
        };
    },
    getUserInfo: function() {
        wx.getUserInfo({
            success: function(e) {
                console.log(e);
            }
        });
    }
});