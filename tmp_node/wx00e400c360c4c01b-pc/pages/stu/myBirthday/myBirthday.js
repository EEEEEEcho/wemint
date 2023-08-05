var t = require("../../../utils/main.js"), a = getApp();

Page({
    data: {
        birthday: ""
    },
    onLoad: function(t) {
        var a = t.id, i = t.birthday;
        this.setData({
            id: a,
            birthday: i
        });
    },
    inputBirthday: function(t) {
        this.setData({
            birthday: t.detail.value
        });
    },
    editBirthday: function() {
        var i = this;
        0 == this.data.birthday.length ? this.setData({
            focus1: !0
        }) : wx.request({
            url: t.localUrl + "mobileXcx/editCpc",
            data: {
                cpcId: i.data.id,
                birthday: i.data.birthday
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
                    var t = getCurrentPages(), e = t[t.length - 2];
                    e.data.cpc.birthday = i.data.birthday, a.globalData.cpc = e.data.cpc, e.onLoad(), 
                    wx.navigateBack();
                }, 2e3);
            }
        });
    }
});