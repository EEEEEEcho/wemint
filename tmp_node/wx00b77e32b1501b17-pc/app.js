App({
    onLaunch: function(t) {
        var e = decodeURIComponent(t.scene);
        e = e.indexOf("UserID") > -1 ? e.replace("UserID", "") : null, console.log("App-onLaunch");
        wx.getStorageSync("openId") || wx.redirectTo({
            url: "/pages/sign/sign?backUrl=" + t.path
        });
        var n = wx.getStorageSync("logs") || [];
        n.unshift(Date.now()), wx.setStorageSync("logs", n);
    },
    onShow: function() {
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                var e = t.latitude, n = t.longitude;
                console.log("latitude:" + e + ",longitude:" + n), wx.setStorageSync("latitude", e), 
                wx.setStorageSync("longitude", n);
            }
        }), console.log("App-onShow");
    },
    getUnionId: function(t) {
        var e = this, n = wx.getStorageSync("openId");
        n ? wx.request({
            url: e.globalData.apiurl + "user/info/get",
            data: {
                openId: n
            },
            method: "Get",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t.data.content), wx.hideLoading(), 1200 != t.data.code && (wx.clearStorageSync(), 
                e.getUnionId(function() {}));
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "获取用户数据失败",
                    duration: 2e3
                });
            },
            complete: function() {}
        }) : wx.login({
            success: function(n) {
                wx.getUserInfo({
                    success: function(o) {
                        var a = {
                            js_code: n.code,
                            appid: e.globalData.zpAppid,
                            secret: e.globalData.secret,
                            grant_type: "authorization_code"
                        }, c = {
                            signature: o.signature,
                            encryptedData: o.encryptedData,
                            iv: o.iv,
                            rawData: o.rawData,
                            session_key: ""
                        };
                        wx.request({
                            url: e.globalData.apiurl + "/user/userinfo/decode",
                            method: "post",
                            data: {
                                JsCode: a,
                                loginInfo: c
                            },
                            success: function(t) {
                                1200 == t.data.code ? (wx.setStorageSync("openId", t.data.content.openId), wx.setStorageSync("unionId", t.data.content.unionId), 
                                wx.setStorageSync("UserInfo", t.data.content), console.log("用户信息" + JSON.stringify(t.data.content))) : wx.showModal({
                                    content: "解密出错!",
                                    showCancel: !1,
                                    confirmText: "确定"
                                });
                            },
                            fail: function(t) {
                                wx.showModal({
                                    content: "服务器请求失败!",
                                    showCancel: !1,
                                    confirmText: "确定"
                                });
                            },
                            complete: function(e) {
                                t();
                            }
                        });
                    },
                    fail: function(e) {
                        wx.showModal({
                            title: "警告",
                            content: "您点击了拒绝授权，将无法正常使用功能体验。请10分钟后再次点击授权，或者删除小程序重新进入。",
                            showCancel: !1
                        }), t();
                    }
                });
            },
            fail: function(e) {
                t();
            }
        });
    },
    globalData: {
        apiurl: "https://api.likun779.cn/",
        zpAppid: "wx00b77e32b1501b17",
        secret: "9d9c1678aa24c10101409062a52721a8"
    }
});