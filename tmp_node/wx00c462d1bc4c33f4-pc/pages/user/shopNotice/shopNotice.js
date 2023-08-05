var o, e = require("../../../utils/util.js"), t = getApp().globalData.httpUrl;

Page({
    data: {
        clicked: 0,
        noMore: !1,
        notices: [],
        date: "",
        noticeTitle: "",
        noticeText: ""
    },
    fixNull: function(o) {
        return null == o && (o = 0), o;
    },
    fixNulls: function(o) {
        return null == o && (o = ""), o;
    },
    onLoad: function(n) {
        o = this, wx.getStorage({
            key: "storeId",
            success: function(e) {
                wx.request({
                    url: t + "skstoremodel/findStoreNoticeList",
                    data: {
                        storeId: e.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        console.log(e.data);
                        var t = e.data;
                        o.setData({
                            notices: t
                        });
                    }
                });
            }
        }), e.getShareInfos(o, t), e.setCompanyId(o, n), e.setStoreId(o), e.setStoreInfo(o);
    },
    onReady: function() {},
    closeTk: function() {
        o.setData({
            displa: !1
        });
    },
    onShow: function() {
        o = this, wx.onSocketMessage(function(t) {
            console.log("===========接收到服务器信息=============="), console.log(t.data), e.getTkInfos(o, t);
        }), wx.onSocketClose(function() {
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
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
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
    }
});