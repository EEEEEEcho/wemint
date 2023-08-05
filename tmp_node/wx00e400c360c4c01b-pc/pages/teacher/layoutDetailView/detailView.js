function t(t, c, e) {
    wx.request({
        url: a.localUrl + "mobileXcx/fireClassCpcList",
        data: {
            crm_code: a.crm_code,
            ccm_id: t,
            class_time: c
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            e(t.data.dataInfo);
        }
    });
}

var a = require("../../../utils/main.js");

getApp();

Page({
    data: {
        ccm_id: "",
        class_time: "",
        carts: [],
        themeName: ""
    },
    onLoad: function(t) {
        var a = t.ccm_id, c = t.class_time;
        this.setData({
            ccm_id: a,
            class_time: c
        }), this.fireCpcList();
    },
    fireCpcList: function() {
        var a = this, c = this;
        t(c.data.ccm_id, c.data.class_time, function(t) {
            null != t.dataList && a.setData({
                carts: t.dataList,
                themeName: t.theme_name,
                curriculum_form: t.curriculum_form
            });
        });
    },
    searchStu: function(t) {
        a.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800);
        for (var c = this, e = "", i = 0; i < c.data.carts.length; i++) "" == e ? e = "'" + c.data.carts[i].cpc_id + "'" : e += ",'" + c.data.carts[i].cpc_id + "'";
        wx.navigateTo({
            url: "../layoutStuBx/layoutStu?noIds=" + e + "&ccm_id=" + c.data.ccm_id + "&class_time=" + c.data.class_time + "&theme_name=" + c.data.theme_name + "&curriculum_form=" + c.data.curriculum_form
        });
    },
    backLoad: function() {
        this.fireCpcList();
    }
});