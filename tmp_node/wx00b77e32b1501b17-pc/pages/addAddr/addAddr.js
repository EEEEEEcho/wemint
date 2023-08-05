var t = getApp().globalData;

Page({
    data: {
        name: "",
        mobile: "",
        school: "",
        grade: "",
        birth_date: "1993-07-02",
        ordertothis: !1
    },
    onLoad: function(e) {
        var a = this;
        a.setData({
            ordertothis: e.ordertothis
        }), wx.showLoading({
            title: "加载中...",
            mask: !0
        }), a.wxSubRequest("Get", t.apiurl + "user/address/get", {
            openId: wx.getStorageSync("openId")
        }, function(t) {
            wx.hideLoading(), t.content.ID > 0 && a.setData({
                name: t.content.name,
                mobile: t.content.mobile,
                school: t.content.school,
                grade: t.content.grade,
                birth_date: t.content.birth_date.split(" ")[0]
            });
        }, function(t) {
            wx.hideLoading(), wx.showModal({
                title: "警告",
                content: "数据加载失败！",
                showCancel: !1
            }), console.log(t);
        });
    },
    bindNameInput: function(t) {
        this.setData({
            name: t.detail.value
        });
    },
    bindMobileInput: function(t) {
        this.setData({
            mobile: t.detail.value
        });
    },
    bindSchoolInput: function(t) {
        this.setData({
            school: t.detail.value
        });
    },
    bindGradeInput: function(t) {
        this.setData({
            grade: t.detail.value
        });
    },
    bindBirthDateChange: function(t) {
        this.setData({
            birth_date: t.detail.value
        });
    },
    bindSaveTap: function(e) {
        var a = this, o = /^1[34578]\d{9}$/;
        if ("" != a.data.name && null != a.data.name) if ("" != a.data.mobile && null != a.data.mobile) if (o.test(a.data.mobile)) if ("" != a.data.school && null != a.data.school) if ("" != a.data.grade && null != a.data.grade) if ("" != a.data.birth_date && null != a.data.birth_date) {
            var n = {
                openId: wx.getStorageSync("openId"),
                name: a.data.name,
                mobile: a.data.mobile,
                school: a.data.school,
                grade: a.data.grade,
                birth_date: a.data.birth_date
            };
            wx.showLoading({
                title: "保存中...",
                mask: !0
            }), a.wxSubRequest("POST", t.apiurl + "user/address/edit", n, function(t) {
                wx.hideLoading(), wx.showModal({
                    title: "提示",
                    content: "保存成功！",
                    showCancel: !1
                }), wx.navigateBack();
            }, function(t) {
                wx.hideLoading(), wx.showModal({
                    title: "警告",
                    content: "保存失败！",
                    showCancel: !1
                });
            });
        } else wx.showModal({
            title: "警告",
            content: "请输入出生日期",
            showCancel: !1
        }); else wx.showModal({
            title: "警告",
            content: "请输入年级",
            showCancel: !1
        }); else wx.showModal({
            title: "警告",
            content: "请输入学校名称",
            showCancel: !1
        }); else wx.showModal({
            title: "警告",
            content: "号码不对,请重新输入",
            showCancel: !1
        }); else wx.showModal({
            title: "警告",
            content: "请输入手机号码",
            showCancel: !1
        }); else wx.showModal({
            title: "警告",
            content: "请输入姓名",
            showCancel: !1
        });
    },
    wxSubRequest: function(t, e, a, o, n) {
        wx.request({
            url: e,
            method: t,
            data: a,
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (console.log(t.data), 200 == t.statusCode && 1200 == t.data.code) {
                    var e = t.data;
                    o(e);
                } else n(t.data);
            },
            fail: function(t) {
                n(t.data), console.log(t.data);
            },
            complete: function(t) {
                console.log(t.msg);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});