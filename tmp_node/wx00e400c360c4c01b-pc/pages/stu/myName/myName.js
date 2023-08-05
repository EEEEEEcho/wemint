var a = require("../../../utils/main.js"), t = getApp();

Page({
    data: {
        name: ""
    },
    onLoad: function(a) {
        var t = a.id, e = a.name;
        this.setData({
            id: t,
            name: e
        });
    },
    inputName: function(a) {
        this.setData({
            name: a.detail.value
        });
    },
    editName: function() {
        var e = this;
        0 == this.data.name.length ? this.setData({
            focus1: !0
        }) : wx.request({
            url: a.localUrl + "mobileXcx/editCpc",
            data: {
                cpcId: e.data.id,
                name: e.data.name
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                wx.showToast({
                    title: "成功",
                    icon: "success",
                    duration: 2e3,
                    mask: !0
                }), setTimeout(function() {
                    var a = getCurrentPages(), n = a[a.length - 2];
                    n.data.cpc.name = e.data.name, t.globalData.cpc = n.data.cpc, n.onLoad(), wx.navigateBack();
                }, 2e3);
            }
        });
    }
});