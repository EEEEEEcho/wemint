var t, o = require("../../../utils/util.js"), e = getApp(), n = e.globalData.httpUrl, a = e.globalData.tuhttpUrl;

Page({
    data: {
        infos: [],
        httpUrl: n,
        tuhttpUrl: a
    },
    onLoad: function(a) {
        t = this, o.getShareInfos(t, n), o.setCompanyId(t, a), o.setStoreId(t), o.setStoreInfo(t), 
        t.setData({
            IntroTitle: e.globalData.foodName
        }), wx.getStorage({
            key: "specialitiesId",
            success: function(o) {
                wx.request({
                    url: n + "skfoodmodel/selFoodByspecialitiesId",
                    data: {
                        specialitiesId: o.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(o) {
                        t.setData({
                            infos: o.data
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    closeTk: function() {
        t.setData({
            displa: !1
        });
    },
    onShow: function() {
        t = this, wx.onSocketMessage(function(e) {
            console.log("===========接收到服务器信息=============="), console.log(e.data), o.getTkInfos(t, e);
        }), t = this, wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(t) {
                    o.conSocket(t.data);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        o.closeSock();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), t = this, setTimeout(function() {
            t.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: t.data.shareTitle,
            desc: "",
            imageUrl: t.data.shareImgUrl,
            path: "/pages/index/index?storeId=" + t.data.storeId + "&companyId=" + t.data.companyId,
            success: function(t) {
                console.log("转发成功");
            },
            fail: function(t) {
                console.log("转发失败");
            }
        };
    }
});