function t(t, n, e, o, a, c) {
    wx.request({
        url: n,
        method: t,
        data: e,
        header: {
            X_ManuName: getApp().globalData.manuName
        },
        success: function(t) {
            if (200 == t.statusCode) {
                var n = t.data;
                o(n), console.log(t.data);
            }
        },
        fail: function(t) {
            "function" == typeof a && a(t.data);
        },
        complete: function(t) {
            "function" == typeof c && c(t.data);
        }
    });
}

function n(n, e, o) {
    var a = getApp().globalData, c = a.manuName;
    t("get", a.apiurl + "/member/api/Customized/GetCustomizView", {
        manuName: c,
        map: n
    }, e, o);
}

module.exports = {
    pageInit: function(t) {
        getApp().getUnionId(t);
    },
    wxRequest: t,
    getAccessToken: function(t) {
        var n = getApp().globalData;
        wx.request({
            url: "https://api.weixin.qq.com/cgi-bin/token",
            data: {
                grant_type: "client_credential",
                appid: n.zpAppid,
                secret: n.secret
            },
            success: function(n) {
                200 == n.statusCode && n.data.access_token ? t(n.data.access_token) : wx.showModal({
                    content: "获取access_token失败!",
                    showCancel: !1,
                    confirmText: "确定"
                });
            },
            fail: function(t) {
                wx.showModal({
                    content: "获取access_token网络请求失败!",
                    showCancel: !1,
                    confirmText: "确定"
                });
            }
        });
    },
    navigateTo: function(t) {
        var e = t.indexOf("?"), o = "";
        e > -1 && (o = t.substring(e), t = t.substring(0, e)), n(t, function(n) {
            1200 == n.code && n.content && n.content.View ? wx.navigateTo({
                url: n.content.View + o
            }) : wx.navigateTo({
                url: t + o
            });
        }, function(n) {
            wx.navigateTo({
                url: t + o
            });
        });
    },
    switchTab: function(t) {
        var e = t.indexOf("?"), o = "";
        e > -1 && (o = t.substring(e), t = t.substring(0, e)), n(t, function(n) {
            1200 == n.code && n.content && n.content.View ? wx.switchTab({
                url: n.content.View + o
            }) : wx.switchTab({
                url: t + o
            });
        }, function(n) {
            wx.switchTab({
                url: t + o
            });
        });
    },
    redirectTo: function(t) {
        var e = t.indexOf("?"), o = "";
        e > -1 && (o = t.substring(e), t = t.substring(0, e)), n(t, function(n) {
            1200 == n.code && n.content && n.content.View ? wx.redirectTo({
                url: n.content.View + o
            }) : wx.redirectTo({
                url: t + o
            });
        }, function(n) {
            wx.redirectTo({
                url: t + o
            });
        });
    }
};