function t(t, e) {
    wx.request({
        url: a.localUrl + "mobileXcx/findTeacher",
        data: {
            crm_code: a.crm_code,
            noIds: t
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            e(t.data.dataInfo.teacherList);
        }
    });
}

require("../../../utils/dateTimePicker.js");

var a = require("../../../utils/main.js");

getApp();

Page({
    data: {
        title: "",
        address: "",
        star_time: "",
        end_time: "",
        content: "",
        remark: "",
        captainList: [],
        teammateList: [],
        teacherList: []
    },
    onLoad: function(a) {
        var e = this;
        t("", function(t) {
            console.log(t);
            for (var a = [], i = 0; i < t.length; i++) a.push(t[i].name);
            e.setData({
                teacherList: t,
                array: a
            });
        });
    },
    inputTitle: function(t) {
        this.setData({
            title: t.detail.value
        });
    },
    inputAddress: function(t) {
        this.setData({
            address: t.detail.value
        });
    },
    bindDateStar: function(t) {
        this.setData({
            star_time: t.detail.value
        });
    },
    bindDateEnd: function(t) {
        this.setData({
            end_time: t.detail.value
        });
    },
    inputContent: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    inputRemark: function(t) {
        this.setData({
            remark: t.detail.value
        });
    },
    bindPickerChange: function(t) {
        var a = this;
        a.data.captainList.push(a.data.teacherList[t.detail.value]), this.setData({
            captainList: a.data.captainList
        });
    },
    bindPickerChange2: function(t) {
        var a = this;
        a.data.teammateList.push(a.data.teacherList[t.detail.value]), this.setData({
            teammateList: a.data.teammateList
        });
    },
    deleteCaptainList: function(t) {
        var a = this.data.captainList, e = t.currentTarget.dataset.index;
        a.splice(e, 1), this.setData({
            captainList: a
        });
    },
    deleteTeammateList: function(t) {
        var a = this.data.teammateList, e = t.currentTarget.dataset.index;
        a.splice(e, 1), this.setData({
            teammateList: a
        });
    },
    addActivity: function() {
        for (var t = this, e = "", i = 0; i < t.data.captainList.length; i++) "" == e ? e = t.data.captainList[i].id : e += "," + t.data.captainList[i].id;
        for (var s = "", i = 0; i < t.data.teammateList.length; i++) "" == s ? s = t.data.teammateList[i].id : s += "," + t.data.teammateList[i].id;
        wx.request({
            url: a.localUrl + "mobileXcx/addActivity",
            data: {
                crm_code: a.crm_code,
                title: t.data.title,
                activity_address: t.data.address,
                star_time: t.data.star_time,
                end_time: t.data.end_time,
                content: t.data.content,
                remark: t.data.remark,
                captain_id: e,
                teammate_id: s
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                200 == t.statusCode && (wx.showToast({
                    title: "成功",
                    icon: "success",
                    duration: 2e3,
                    mask: !0
                }), setTimeout(function() {
                    var t = getCurrentPages();
                    t[t.length - 2].backLoad(), wx.navigateBack();
                }, 2e3));
            }
        });
    }
});