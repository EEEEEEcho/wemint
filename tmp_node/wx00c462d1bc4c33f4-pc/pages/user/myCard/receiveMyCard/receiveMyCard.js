var e, o = require("../../../../utils/util.js"), t = getApp().globalData.httpUrl;

Page({
    data: {
        chengedColor: "#666",
        cardName: "",
        cardNumber: "",
        httpUrl: t
    },
    onLoad: function(a) {
        e = this, o.getShareInfos(e, t), o.setCompanyId(e, a), o.setStoreId(e), o.setStoreInfo(e), 
        "1" == a.hasReceived ? e.setData({
            hasReceived: "1"
        }) : e.setData({
            hasReceived: "0"
        }), wx.getStorage({
            key: "companyId",
            success: function(o) {
                o.data;
                wx.getStorage({
                    key: "userId",
                    success: function(o) {
                        var a = o.data;
                        wx.getStorage({
                            key: "cardId",
                            success: function(o) {
                                wx.request({
                                    url: t + "skmembermodel/findVipCardById",
                                    data: {
                                        cardId: o.data,
                                        userId: a
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(o) {
                                        e.setData({
                                            cardInfos: o.data,
                                            title: o.data.title,
                                            wechatUserStoreCardNum: o.data.cardNum,
                                            prerogative: o.data.vipcardPrerogativeBeanList
                                        });
                                        var t = o.data.color;
                                        e.chengeColor(t);
                                    }
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
        o.closeSock(), "1" == e.data.hasReceived && wx.switchTab({
            url: "../../../../index/index?hasReceived=1"
        });
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
    },
    chengeColor: function(o) {
        "Color010" == o && e.setData({
            chengedColor: "#63b359"
        }), "Color020" == o && e.setData({
            chengedColor: "#2c9f67"
        }), "Color030" == o && e.setData({
            chengedColor: "#509fc9"
        }), "Color040" == o && e.setData({
            chengedColor: "#5885cf"
        }), "Color050" == o && e.setData({
            chengedColor: "#9062c0"
        }), "Color060" == o && e.setData({
            chengedColor: "#d09a45"
        }), "Color070" == o && e.setData({
            chengedColor: "#e4b138"
        }), "Color080" == o && e.setData({
            chengedColor: "#ee903c"
        }), "Color081" == o && e.setData({
            chengedColor: "#f08500"
        }), "Color082" == o && e.setData({
            chengedColor: "#a9d92d"
        }), "Color090" == o && e.setData({
            chengedColor: "#dd6549"
        }), "Color100" == o && e.setData({
            chengedColor: "#cc463d"
        }), "Color101" == o && e.setData({
            chengedColor: "#cf3e36"
        }), "Color102" == o && e.setData({
            chengedColor: "#5E6671"
        });
    }
});