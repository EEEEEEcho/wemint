var a = require("../../../utils/main.js"), t = require("../../../utils/qiniuUploader"), e = getApp();

Page({
    data: {
        cpc: []
    },
    onLoad: function(a) {
        this.setData({
            cpc: e.globalData.cpc
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    myMobile: function(a) {
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.mobile;
        wx.navigateTo({
            url: "../myMobile/myMobile?id=" + t + "&mobile=" + e
        });
    },
    myPwd: function() {
        wx.navigateTo({
            url: "../myPwd/myPwd"
        });
    },
    myName: function(a) {
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.name;
        wx.navigateTo({
            url: "../myName/myName?id=" + t + "&name=" + e
        });
    },
    myBirthday: function(a) {
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.birthday;
        wx.navigateTo({
            url: "../myBirthday/myBirthday?id=" + t + "&birthday=" + e
        });
    },
    changeImage: function() {
        var e = this;
        a.initQiniu(), wx.chooseImage({
            count: 1,
            success: function(a) {
                var n = a.tempFilePaths[0];
                console.log(n), null == n || "" == n ? wx.showToast({
                    title: "上传失败",
                    icon: "loading",
                    duration: 2e3,
                    mask: !0
                }) : t.upload(n, function(a) {
                    console.log(a), console.log(a.imageURL), null != a.imageURL && "" != a.imageURL ? e.editCpc(a.imageURL) : wx.showToast({
                        title: "上传失败",
                        icon: "loading",
                        duration: 2e3,
                        mask: !0
                    });
                }, function(a) {
                    console.error("error: " + JSON.stringify(a));
                });
            }
        });
    },
    editCpc: function(t) {
        var n = this;
        wx.request({
            url: a.localUrl + "mobileXcx/editCpc",
            data: {
                cpcId: n.data.cpc.id,
                icon: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                n.data.cpc.icon = t, n.setData({
                    cpc: n.data.cpc
                }), e.globalData.cpc = n.data.cpc;
                var o = getCurrentPages();
                o[o.length - 2].setData({
                    cpc: n.data.cpc
                }), wx.showToast({
                    title: "修改成功",
                    icon: "success",
                    duration: 2e3,
                    mask: !0
                });
            }
        });
    }
});