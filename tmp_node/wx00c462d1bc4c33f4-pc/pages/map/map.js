var t, o = getApp(), e = (require("../../utils/util.js"), require("../../utils/util.js")), n = o.globalData.httpUrl;

o.globalData.tuhttpUrl;

Page({
    data: {
        latitude: "",
        longitude: "",
        markers: [],
        circles: [],
        controls: []
    },
    locationClick: function(o) {
        wx.getLocation({
            type: "wgs84",
            success: function(o) {
                console.log(o), t.setData({
                    latitude: o.latitude,
                    longitude: o.longitude,
                    markers: [ {
                        iconPath: "",
                        id: 0,
                        latitude: o.latitude,
                        longitude: o.longitude,
                        width: 0,
                        height: 0,
                        title: "当前位置",
                        callout: {
                            padding: 10,
                            content: "当前位置",
                            bgColor: "#DC143C",
                            color: "#FFFF00",
                            display: "ALWAYS"
                        },
                        label: {
                            content: ""
                        },
                        anchor: {}
                    } ]
                });
            }
        });
    },
    selectedClick: function() {
        wx.getSetting({
            success: function(t) {
                console.log(t), console.log(t.authSetting), console.log(t.authSetting.scope), t.authSetting["scope.userInfo"] && wx.getLocation({
                    success: function(t) {
                        console.log(t), wx.getStorage({
                            key: "storeInfo",
                            success: function(t) {
                                wx.openLocation({
                                    latitude: 1 * t.data.storeInfoLongitude,
                                    longitude: 1 * t.data.storeInfoLatitude,
                                    name: t.data.storeInfoName,
                                    address: t.data.storeInfoAddress
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    regionChange: function(t) {
        if ("end" == t.type) {
            var o = this;
            this.mapCtx = wx.createMapContext("centerChange"), this.mapCtx.getCenterLocation({
                success: function(t) {
                    console.log(t), o.setData({
                        latitude: t.latitude,
                        longitude: t.longitude,
                        markers: [ {
                            iconPath: "",
                            id: 0,
                            latitude: t.latitude,
                            longitude: t.longitude,
                            width: 0,
                            height: 0,
                            title: "当前位置",
                            callout: {
                                padding: 0,
                                content: "当前位置",
                                bgColor: "#DC143C",
                                color: "#FFFF00",
                                display: "ALWAYS"
                            },
                            label: {
                                content: ""
                            },
                            anchor: {}
                        } ]
                    });
                }
            });
        }
    },
    controlClick: function(o) {
        console.log(o), wx.getLocation({
            type: "wgs84",
            success: function(o) {
                console.log(o), t.setData({
                    latitude: o.latitude,
                    longitude: o.longitude,
                    markers: [ {
                        iconPath: "",
                        id: 0,
                        latitude: o.latitude,
                        longitude: o.longitude,
                        width: 0,
                        height: 0,
                        title: "",
                        callout: {
                            padding: 0,
                            content: "",
                            bgColor: "#DC143C",
                            color: "#FFFF00",
                            display: "ALWAYS"
                        },
                        label: {
                            content: ""
                        },
                        anchor: {}
                    } ]
                });
            }
        });
    },
    onLoad: function(o) {
        t = this, e.getShareInfos(t, n), e.setCompanyId(t, o), e.setStoreId(t), wx.getLocation({
            type: "wgs84",
            success: function(o) {
                console.log(o), t.setData({
                    latitude: o.latitude,
                    longitude: o.longitude,
                    markers: [ {
                        iconPath: "",
                        id: 0,
                        latitude: o.latitude,
                        longitude: o.longitude,
                        width: 0,
                        height: 0,
                        title: "",
                        callout: {
                            padding: 0,
                            content: "",
                            bgColor: "#DC143C",
                            color: "#FFFF00",
                            display: "ALWAYS"
                        },
                        label: {
                            content: ""
                        },
                        anchor: {}
                    } ],
                    circles: [ {
                        latitude: o.latitude,
                        longitude: o.longitude,
                        radius: 10,
                        strokeWidth: 2,
                        fillColor: "#FAFAD2",
                        color: "#90EE90"
                    } ],
                    controls: [ {
                        id: 1001,
                        position: {
                            left: 10,
                            top: 10,
                            width: 35,
                            height: 35
                        },
                        iconPath: "../../images/map.png",
                        clickable: !0
                    } ]
                });
            }
        });
    },
    closeTk: function() {
        t.setData({
            displa: !1
        });
    },
    onShow: function() {
        t = this, wx.onSocketMessage(function(o) {
            console.log("===========接收到服务器信息=============="), console.log(o.data), e.getTkInfos(t, o);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(t) {
                    e.conSocket(t.data);
                }
            });
        });
    },
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
    },
    onUnload: function() {
        e.closeSock();
    }
});