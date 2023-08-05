var e = require("../../../utils/main.js"), a = require("../../../utils/qiniuUploader"), t = getApp();

Page({
    data: {
        teacher: []
    },
    onLoad: function(e) {
        this.setData({
            teacher: t.globalData.teacher
        });
    },
    myMobile: function(e) {
        var a = e.currentTarget.dataset.id, t = e.currentTarget.dataset.mobile;
        wx.navigateTo({
            url: "../myMobile/myMobile?id=" + a + "&mobile=" + t
        });
    },
    myPwd: function(e) {
        var a = e.currentTarget.dataset.id, t = e.currentTarget.dataset.pwd;
        wx.navigateTo({
            url: "../myPwd/myPwd?id=" + a + "&pwd=" + t
        });
    },
    changeImage: function() {
        var t = this;
        e.initQiniu(), wx.chooseImage({
            count: 1,
            success: function(e) {
                var i = e.tempFilePaths[0];
                console.log(i), null == i || "" == i ? wx.showToast({
                    title: "上传失败",
                    icon: "loading",
                    duration: 2e3,
                    mask: !0
                }) : a.upload(i, function(e) {
                    null != e.imageURL && "" != e.imageURL ? t.editTeacher(e.imageURL) : wx.showToast({
                        title: "上传失败",
                        icon: "loading",
                        duration: 2e3,
                        mask: !0
                    });
                }, function(e) {
                    console.error("error: " + JSON.stringify(e));
                });
            }
        });
    },
    editTeacher: function(a) {
        var i = this;
        wx.request({
            url: e.localUrl + "mobileXcx/editTeacher",
            data: {
                tId: i.data.teacher.id,
                icon: a
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                i.data.teacher.icon = a, i.setData({
                    teacher: i.data.teacher
                }), t.globalData.teacher = i.data.teacher;
                var r = getCurrentPages();
                r[r.length - 2].setData({
                    teacher: i.data.teacher
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