var e = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

module.exports = {
    formatTime: function(t) {
        var o = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate(), s = t.getHours(), r = t.getMinutes(), c = t.getSeconds();
        return [ o, n, a ].map(e).join("/") + " " + [ s, r, c ].map(e).join(":");
    },
    formatDate: function(t) {
        return [ t.getFullYear(), t.getMonth() + 1, t.getDate() ].map(e).join("-");
    },
    formatTimeOnly: function(t) {
        t.getFullYear(), t.getMonth(), t.getDate();
        var o = t.getHours(), n = t.getMinutes();
        t.getSeconds();
        return [ o, n ].map(e).join(":");
    },
    getQueryString: function(e, t) {
        console.log("url = " + e), console.log("name = " + t);
        var o = new RegExp("(^|&|/?)" + t + "=([^&|/?]*)(&|/?|$)", "i"), n = e.substr(1).match(o);
        return null != n ? (console.log("r = " + n), console.log("r[2] = " + n[2]), n[2]) : null;
    },
    getWifiDates: function(e, t) {
        wx.getStorage({
            key: "storeId",
            success: function(o) {
                e.setData({
                    storeId: o.data
                }), wx.request({
                    url: t + "skstoremodel/getWifiDate",
                    data: {
                        storeWifiConfigStoreInfoStoreId: o.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        e.setData({
                            wifi_name: t.data[0].storeWifiConfigWifiName,
                            wifi_password: t.data[0].storeWifiConfigWifiPaaswork
                        }), console.log(t.data);
                    }
                });
            }
        });
    },
    getShareInfos: function(e, t) {
        wx.getStorage({
            key: "storeId",
            success: function(o) {
                wx.request({
                    url: t + "skstoremodel/WXfindIndexForwardByStoreId",
                    data: {
                        storeId: o.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        console.log("===========WXfindIndexForwardByStoreId成功============");
                        var o = t.data;
                        if (console.log("shareInfo:"), console.log(o), "" != o.img && null != o.img && void 0 != o.img) {
                            var n = o.img.split("/"), a = "http://qiniu.shoukaikeji.com/" + n[n.length - 1];
                            console.log("shareImgUrl:" + a), e.setData({
                                shareImgUrl: a
                            });
                        }
                        e.setData({
                            shareTitle: o.title
                        });
                    }
                });
            }
        });
    },
    setCompanyId: function(e, t) {
        wx.getStorage({
            key: "companyId",
            success: function(t) {
                e.setData({
                    companyId: t.data
                });
            },
            fail: function(o) {
                console.log(o), setTimeout(function() {
                    e.onLoad(t);
                }, 2e3);
            }
        });
    },
    setStoreId: function(e) {
        wx.getStorage({
            key: "storeId",
            success: function(t) {
                e.setData({
                    storeId: t.data
                });
            }
        });
    },
    setUserId: function(e) {
        wx.getStorage({
            key: "userId",
            success: function(t) {
                e.setData({
                    userId: t.data
                });
            }
        });
    },
    setStoreInfo: function(e) {
        wx.getStorage({
            key: "storeInfo",
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.data.storeInfoName
                }), e.setData({
                    storeInfo: t.data,
                    storeImgUrl: t.data.storeInfoHeadImgUrl
                });
            }
        });
    },
    setStoreName: function(e) {
        wx.getStorage({
            key: "storeName",
            success: function(t) {
                e.setData({
                    storename: t.data,
                    storeName: t.data
                });
            }
        });
    },
    setUserName: function(e) {
        wx.getStorage({
            key: "userName",
            success: function(t) {
                e.setData({
                    userName: t.data
                });
            }
        });
    },
    setStoreInfoName: function(e) {
        wx.getStorage({
            key: "storeInfo",
            success: function(t) {
                wx.setStorage({
                    key: "storeName",
                    data: t.data.storeInfoName
                }), e.setData({
                    storename: t.data.storeInfoName,
                    storeName: t.data.storeInfoName
                });
            }
        });
    },
    conSocket: function(e) {
        wx.connectSocket({
            url: "wss://zdr.zhongderun.com:8110/websocket/" + e,
            method: "GET",
            success: function(e) {
                console.log("===connectSocket==="), console.log("=========重连成功=========="), console.log(e), 
                wx.setStorage({
                    key: "connectedSocket",
                    data: !0
                });
            },
            fail: function() {
                console.log("连接socket失败"), wx.setStorage({
                    key: "connectedSocket",
                    data: !1
                });
            }
        });
    },
    closeSock: function() {
        wx.closeSocket({
            success: function(e) {
                console.log("======success======="), wx.setStorage({
                    key: "connectedSocket",
                    data: !1
                }), console.log(e);
            },
            fail: function(e) {
                console.log("======fail======="), console.log(e);
            }
        });
    },
    getTkInfos: function(e, t) {
        if (console.log("=========getTkInfos========"), "refunInfoReminding" == t.data.split("&")[0]) {
            var o = t.data.split("&")[1], n = t.data.split("&")[2];
            e.setData({
                refundId: o,
                displa: !0,
                refundTitle: n
            });
        }
    }
};