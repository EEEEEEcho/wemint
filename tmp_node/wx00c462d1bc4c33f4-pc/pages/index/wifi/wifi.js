var o, e = require("../../../utils/util.js"), n = getApp().globalData.httpUrl;

Page({
    data: {
        wifi_password: null,
        wifi_name: null
    },
    onLoad: function(t) {
        o = this, e.getShareInfos(o, n), e.setCompanyId(o, t), e.setStoreId(o), e.setStoreInfo(o), 
        e.getWifiDates(o, n);
    },
    onReady: function() {},
    closeTk: function() {
        o.setData({
            displa: !1
        });
    },
    onShow: function() {
        o = this, wx.onSocketMessage(function(n) {
            console.log("===========接收到服务器信息=============="), console.log(n.data), e.getTkInfos(o, n);
        }), o = this, wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(o) {
                    e.conSocket(o.data);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        e.closeSock();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), o = this, setTimeout(function() {
            o.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log("=========onShareAppMessage==========="), {
            title: o.data.shareTitle,
            desc: "",
            imageUrl: o.data.shareImgUrl,
            path: "/pages/index/index?storeId=" + o.data.storeId + "&companyId=" + o.data.companyId,
            success: function(o) {
                console.log("转发成功");
            },
            fail: function(o) {
                console.log("转发失败");
            }
        };
    },
    btn_fuzhi: function(e) {
        wx.setClipboardData({
            data: o.data.wifi_password,
            success: function(o) {}
        });
    }
});