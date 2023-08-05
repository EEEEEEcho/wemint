var e, o = require("../../../../utils/util.js"), t = getApp().globalData.httpUrl;

Page({
    data: {
        chengedColor: "#666",
        cardName: "至尊七折卡",
        storeName: "",
        cardStatus: "已开通",
        httpUrl: t,
        cardNumber: "",
        date: "",
        time: "",
        userName: "",
        tele: "",
        age: 0
    },
    ohShitfadeOut: function() {
        var o = setTimeout(function() {
            e.setData({
                popErrorMsg: ""
            }), clearTimeout(o);
        }, 3e3);
    },
    onLoad: function(a) {
        e = this, o.getShareInfos(e, t), o.setCompanyId(e, a), o.setStoreId(e), o.setStoreInfo(e), 
        o.setStoreName(e), wx.getStorage({
            key: "userId",
            success: function(o) {
                wx.getStorage({
                    key: "storeId",
                    success: function(a) {
                        wx.request({
                            url: t + "skmembermodel/selEquitycardByWX",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                userId: o.data,
                                storeId: a.data
                            },
                            success: function(o) {
                                e.setData({
                                    prerogative: o.data.vipcardPrerogativeBeanList
                                });
                                var t = o.data.color;
                                e.chengeColor(t), "0" == o.data.state ? e.setData({
                                    cardName: o.data.vipCardName,
                                    cardInfos: o.data,
                                    forceCardId: o.data.id,
                                    status: "已开通",
                                    state: !0,
                                    cardCode: o.data.equityCardCode,
                                    activateTime: o.data.activateTime,
                                    overTime: o.data.overTime
                                }) : (e.setData({
                                    cardName: o.data.vipCardName,
                                    cardInfos: o.data,
                                    forceCardId: o.data.id,
                                    status: "已过期",
                                    state: !1,
                                    cardCode: o.data.equityCardCode,
                                    activateTime: o.data.activateTime,
                                    overTime: o.data.overTime
                                }), wx.showModal({
                                    title: "权益卡已过期",
                                    content: "请重新购买权益卡",
                                    success: function(o) {
                                        o.confirm && e.receiveForceCard();
                                    }
                                }));
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
    },
    receiveForceCard: function() {
        wx.redirectTo({
            url: "../receiveForceCard/receiveForceCard"
        });
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