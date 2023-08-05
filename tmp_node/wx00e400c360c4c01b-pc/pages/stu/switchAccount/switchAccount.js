var t = require("../../../utils/main.js"), a = getApp();

Page({
    data: {
        dataList: []
    },
    onLoad: function(t) {
        this.appointmentByOpenId();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    switchAccountAdd: function() {
        wx.navigateTo({
            url: "../switchAccountAdd/switchAccountAdd"
        });
    },
    appointmentByOpenId: function() {
        var n = this;
        wx.request({
            url: t.localUrl + "mobileXcx/appointmentByOpenId",
            data: {
                openId: a.globalData.openId
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                n.setData({
                    dataList: t.data.dataInfo.dataList
                });
            }
        });
    },
    editAppointment: function(n) {
        var e = this, o = n.target.dataset.id, i = n.target.dataset.index, e = this;
        wx.showLoading({}), wx.request({
            url: t.localUrl + "mobileXcx/editAppointment",
            data: {
                id: o
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if ("000" != t.data.succeed) wx.showToast({
                    title: t.data.sucInfo,
                    icon: "none",
                    duration: 2e3
                }); else {
                    a.globalData.cpc = e.data.dataList[i].cpc, a.globalData.csc = t.data.dataInfo.csc;
                    var n = getCurrentPages();
                    n[n.length - 2].onLoad(), wx.hideLoading(), wx.navigateTo({
                        url: "../home/home",
                        success: function(t) {
                            var a = getCurrentPages().pop();
                            void 0 != a && null != a && a.onLoad();
                        }
                    });
                }
            }
        });
    },
    delAppointment: function(a) {
        var n = this, e = a.target.dataset.id, o = a.target.dataset.index, n = this;
        wx.showLoading({}), wx.request({
            url: t.localUrl + "mobileXcx/delAppointment",
            data: {
                id: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                "000" != t.data.succeed ? wx.showToast({
                    title: t.data.sucInfo,
                    icon: "none",
                    duration: 2e3
                }) : (n.data.dataList.splice(o, 1), n.setData({
                    dataList: n.data.dataList
                }), wx.hideLoading());
            }
        });
    }
});