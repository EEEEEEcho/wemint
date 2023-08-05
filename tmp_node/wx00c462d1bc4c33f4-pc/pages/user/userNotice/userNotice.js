var e, o = require("../../../utils/util.js"), t = getApp().globalData.httpUrl;

Page({
    data: {},
    onLoad: function(n) {
        e = this, o.getShareInfos(e, t), o.setCompanyId(e, n), o.setStoreInfo(e), wx.getStorage({
            key: "storeId",
            success: function(o) {
                e.setData({
                    storeId: o.data
                }), wx.getStorage({
                    key: "userId",
                    success: function(n) {
                        wx.request({
                            url: t + "skmembermodel/selOperationRecord",
                            data: {
                                wxUserUuid: n.data,
                                storeUuid: o.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(o) {
                                e.setData({
                                    notices: o.data
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.onSocketMessage(function(t) {
            console.log("===========接收到服务器信息=============="), console.log(t.data), o.getTkInfos(e, t);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    o.conSocket(e.data);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        o.closeSock();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), e = this, setTimeout(function() {
            e.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: e.data.shareTitle,
            desc: "",
            imageUrl: e.data.shareImgUrl,
            path: "/pages/index/index?storeId=" + e.data.storeId + "&companyId=" + e.data.companyId,
            success: function(e) {
                console.log("转发成功");
            },
            fail: function(e) {
                console.log("转发失败");
            }
        };
    }
});