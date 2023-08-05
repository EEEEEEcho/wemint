var t = require("../../../utils/main.js"), a = getApp();

Page({
    data: {
        id: "",
        pwd: "",
        pwdOld: "",
        pwdNew: ""
    },
    onLoad: function(t) {
        var a = t.id, e = t.pwd;
        this.setData({
            id: a,
            pwd: e
        });
    },
    inputOld: function(t) {
        this.setData({
            pwdOld: t.detail.value
        });
    },
    inputNew: function(t) {
        this.setData({
            pwdNew: t.detail.value
        });
    },
    editPwd: function() {
        var e = this;
        0 == this.data.pwdOld.length || 0 == this.data.pwdNew.length ? 0 == this.data.pwdOld.length ? this.setData({
            focus1: !0
        }) : 0 == this.data.pwdNew.length && this.setData({
            focus2: !0
        }) : e.data.pwd != e.data.pwdOld ? wx.showToast({
            title: "原密码不正确",
            icon: "none",
            duration: 2e3,
            mask: !0
        }) : wx.request({
            url: t.localUrl + "mobileXcx/editTeacher",
            data: {
                tId: e.data.id,
                pwd: e.data.pwdNew
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                wx.showToast({
                    title: "成功",
                    icon: "success",
                    duration: 2e3,
                    mask: !0
                }), setTimeout(function() {
                    var t = getCurrentPages(), d = t[t.length - 2];
                    d.data.teacher.login_pwd = e.data.pwdNew, a.globalData.teacher = d.data.teacher, 
                    d.onLoad(), wx.navigateBack();
                }, 2e3);
            }
        });
    }
});