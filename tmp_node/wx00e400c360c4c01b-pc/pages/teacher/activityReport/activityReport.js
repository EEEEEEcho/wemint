var t = require("../../../utils/main.js");

getApp();

Page({
    data: {},
    onLoad: function(t) {
        var e = t.id, a = t.report_content;
        this.setData({
            id: e,
            report_content: a
        });
    },
    inputContent: function(t) {
        this.setData({
            report_content: t.detail.value
        });
    },
    addReport: function(e) {
        t.collectFomrId(e.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800);
        var a = this;
        wx.request({
            url: t.localUrl + "mobileXcx/addReport",
            data: {
                id: a.data.id,
                report_content: a.data.report_content
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