var e = require("../../utils/util.js"), t = getApp().globalData;

Page({
    data: {
        UserName: "",
        Email: "",
        Text: "请输入昵称",
        TextReamak: "请输入6个汉字或12个英文以内的姓名",
        Bool: !1,
        Type: 0
    },
    onLoad: function(e) {
        var t = this, a = e.type, o = "修改昵称";
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), t.setData({
            UserName: e.nickName,
            Email: e.email,
            Type: a
        }), 1 == a && (o = "修改邮箱", t.setData({
            TextReamak: "请输入邮箱地址",
            Text: "请输入邮箱"
        })), wx.setNavigationBarTitle({
            title: o
        }), wx.hideLoading();
    },
    tapSave: function(e) {
        var a = this, o = a.data.UserName, n = a.data.Email, i = a.data.Bool;
        if (0 == a.data.Type) {
            if (!i) return void wx.showModal({
                title: "警告",
                content: "昵称长度错误",
                showCancel: !1
            });
            a.SaveSubmit({
                NickName: o,
                UserID: wx.getStorageSync("UserInfo").UserID,
                CustID: t.custID
            });
        } else {
            if (!i) return void wx.showModal({
                title: "警告",
                content: "邮箱格式错误",
                showCancel: !1
            });
            a.SaveSubmit({
                Email: n,
                UserID: wx.getStorageSync("UserInfo").UserID,
                CustID: t.custID
            });
        }
    },
    tapBlur: function(e) {
        var t = this, a = e.detail.value, o = !0;
        if (0 == t.data.Type) {
            var n = t.getByteLen(a);
            (0 == n || n > 12) && (o = !1), t.setData({
                UserName: a,
                Bool: o
            });
        } else t.checkEmail(a) || (o = !1), t.setData({
            Email: a,
            Bool: o
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    SaveSubmit: function(e) {
        wx.showLoading({
            title: "提交中...",
            mask: !0
        }), wx.request({
            url: t.apiurl + "member/api/MemberCenter/Update",
            method: "POST",
            data: JSON.stringify(e),
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                200 == e.statusCode && 1200 == e.data.code && (wx.hideLoading(), wx.showToast({
                    title: "提交成功",
                    icon: "success",
                    duration: 2e3
                }), wx.redirectTo({
                    url: "/pages/personalData/personalData"
                }), console.log(e.data));
            },
            fail: function(e) {
                wx.showModal({
                    title: "错误",
                    content: e.data.msg,
                    showCancel: !1
                }), wx.hideLoading(), console.log(e.data);
            },
            complete: function(e) {
                console.log(e.data);
            }
        });
    },
    getByteLen: function(e) {
        for (var t = 0, a = 0; a < e.length; a++) null != e.charAt(a).match(/[^\x00-\xff]/gi) ? t += 2 : t += 1;
        return t;
    },
    checkEmail: function(t) {
        return e.Regular(t, "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$");
    }
});