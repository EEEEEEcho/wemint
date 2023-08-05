var e, o = getApp(), t = require("../../utils/util.js"), a = o.globalData.httpUrl, n = o.globalData.tuhttpUrl;

Page({
    data: {
        wntjUrls: "http://qiniu.shoukaikeji.com/FjFB_bsTw1h2iQz5BMo6uYEFOob-",
        httpUrl: a,
        tuhttpUrl: n,
        jiazaizhong: !0
    },
    onLoad: function(o) {
        e = this, "1" == o.secondIn ? e.setData({
            secondIn: !0
        }) : e.setData({
            secondIn: !1
        }), e.setData({
            jiazaizhong: !0
        }), t.setCompanyId(e, o), wx.getStorage({
            key: "companyInfo",
            success: function(o) {
                e.setData({
                    companyName: o.data.companyInfoName
                });
            },
            fail: function(t) {
                console.log(t), setTimeout(function() {
                    e.onLoad(o);
                }, 2e3);
            }
        });
        var n = decodeURIComponent(o.scene);
        if (console.log("scene====>" + n), "undefined" != n && void 0 != n && "" != n && null != n) {
            e.setData({
                saoma: !0,
                scene: n
            }), console.log("扫码进入");
            var s = n.split(",")[0].replace('"', "");
            wx.request({
                url: a + "skstoremodel/findStoreById",
                data: {
                    pid: s
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(o) {
                    wx.setStorage({
                        key: "storeInfo",
                        data: o.data
                    });
                    var t = o.data.storeInfoStoreId;
                    e.resendIndex(t), e.setData({
                        storeId: t
                    }), wx.setStorage({
                        key: "storeId",
                        data: t
                    });
                }
            });
        } else wx.showModal({
            title: "未获取扫码信息",
            content: "请检查二维码"
        }), t.getShareInfos(e, a);
        wx.getStorage({
            key: "connectedSocket",
            success: function(e) {
                e.data ? console.log("============已有socket不连接=============") : wx.getStorage({
                    key: "userId",
                    success: function(e) {
                        t.conSocket(e.data);
                    }
                });
            }
        });
    },
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.onSocketMessage(function(o) {
            console.log("===========接收到服务器信息=============="), console.log(o.data), t.getTkInfos(e, o);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    t.conSocket(e.data);
                }
            });
        });
    },
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
    onUnload: function() {
        t.closeSock();
    },
    resendIndex: function(t) {
        e.data.secondIn ? wx.getStorage({
            key: "userId",
            success: function(o) {
                var a = o.data;
                e.loadOther(t, a);
            }
        }) : wx.getStorage({
            key: "code",
            success: function(n) {
                if ("" != n.data && "null" != n.data && "undefined" != n.data && null != n.data && void 0 != n.data) {
                    var s = n.data;
                    wx.setStorage({
                        key: "code",
                        data: ""
                    }), e.setData({
                        code: ""
                    }), wx.getSetting({
                        success: function(n) {
                            console.log("====wx.getSetting success===="), console.log(n), console.log(n.authSetting["scope.userInfo"]), 
                            n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                                success: function(n) {
                                    console.log("====wx.getUserInfo success===="), wx.setStorage({
                                        key: "userName",
                                        data: n.userInfo.nickName
                                    }), wx.setStorage({
                                        key: "avatarUrl",
                                        data: n.userInfo.avatarUrl
                                    }), wx.request({
                                        url: a + "skmembermodel/getOpenidS",
                                        data: {
                                            code: s,
                                            AppID: o.globalData.appId,
                                            Secret: o.globalData.Secret,
                                            storeUuid: t,
                                            wxUserNickName: n.userInfo.nickName,
                                            headImgUrl: n.userInfo.avatarUrl
                                        },
                                        method: "POST",
                                        header: {
                                            "content-type": "application/x-www-form-urlencoded"
                                        },
                                        success: function(o) {
                                            var a = o.data.wechatUser.wechatUserId;
                                            wx.setStorage({
                                                key: "userId",
                                                data: a
                                            }), e.loadOther(t, a);
                                        }
                                    });
                                },
                                fali: function(e) {
                                    console.log("====wx.login fail====");
                                }
                            }) : (console.log("======未授权"), console.log("=====storeId=====>" + t), wx.getStorage({
                                key: "companyId",
                                success: function(o) {
                                    wx.request({
                                        url: a + "skstoremodel/wxSelectStoreByCompanyId",
                                        data: {
                                            storeInfoCompanyInfoId: o.data,
                                            storeInfoLongitude: "",
                                            storeInfoLatitude: "",
                                            condition: "",
                                            storeInfoName: "",
                                            storeInfoAddress: ""
                                        },
                                        method: "POST",
                                        header: {
                                            "content-type": "application/x-www-form-urlencoded"
                                        },
                                        success: function(o) {
                                            e.setData({
                                                shouquanImg: o.data[0].storeInfoHeadImgUrl
                                            }), wx.redirectTo({
                                                url: "../welcome/accredit/accredit?goCollage=true&store_uuid=" + t + "&imgurl=" + e.data.shouquanImg + "&data=" + s + "&scene=" + e.data.scene
                                            });
                                        }
                                    });
                                }
                            }));
                        },
                        fail: function(e) {
                            console.log("====wx.getSetting fail====");
                        }
                    });
                } else e.resendIndex(t);
            },
            fail: function(o) {
                e.resendIndex(t);
            }
        });
    },
    loadOther: function(o, n) {
        wx.request({
            url: a + "skmembermodel/findVipCardBy",
            data: {
                companyId: e.data.companyId,
                storeId: o
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(s) {
                wx.setStorage({
                    key: "vipCard",
                    data: s.data
                });
                var c = s.data.isExistence;
                wx.request({
                    url: a + "skmembermodel/findWechatUserById",
                    data: {
                        wechatUserId: n,
                        wechatUserStoreStoreInfoStoreId: o
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(s) {
                        var d = s.data;
                        e.setData({
                            jiazaizhong: !1
                        }), "v" != d.wechatUserStoreIdentity ? c ? wx.showModal({
                            title: "请先领取会员卡",
                            content: "",
                            success: function(t) {
                                t.confirm ? wx.request({
                                    url: a + "skmembermodel/findVipCardBy",
                                    data: {
                                        companyId: e.data.companyId,
                                        storeId: o
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(e) {
                                        var t = e.data.id;
                                        wx.setStorage({
                                            key: "cardId",
                                            data: t
                                        }), wx.setStorage({
                                            key: "userId",
                                            data: n
                                        }), wx.setStorage({
                                            key: "storeId",
                                            data: o
                                        }), wx.redirectTo({
                                            url: "../user/myCard/myCard?toGotoActive=0&saoma=0"
                                        });
                                    }
                                }) : wx.switchTab({
                                    url: "../index/index"
                                });
                            }
                        }) : wx.showModal({
                            title: "商家无会员卡可领",
                            content: "无法参与活动",
                            success: function(e) {
                                e.confirm ? wx.switchTab({
                                    url: "../index/index"
                                }) : e.cancel && wx.switchTab({
                                    url: "../index/index"
                                });
                            }
                        }) : (console.log("111111111"), t.getShareInfos(e, a), wx.getStorage({
                            key: "connectedSocket",
                            success: function(e) {
                                1 == e.data ? console.log("======已有连接socket不连接=========") : t.conSocket(n);
                            },
                            fail: function(e) {
                                t.conSocket(n);
                            }
                        }), wx.onSocketOpen(function(e) {
                            wx.setStorage({
                                key: "connectedSocket",
                                data: !0
                            }), console.log("WebSocket连接已打开！"), console.log(e);
                        }), wx.onSocketClose(function(e) {
                            console.log("WebSocket连接已关闭！"), console.log(e.reason), "interrupted" == e.reason || "abnormal closure" == e.reason ? t.conSocket(n) : (console.log("WebSocket连接已关闭！"), 
                            wx.setStorage({
                                key: "connectedSocket",
                                data: !1
                            }));
                        }), wx.onSocketError(function(e) {
                            console.log("WebSocket连接打开失败，请检查！"), console.log(e);
                        }), wx.showModal({
                            title: "即将跳转进入团购",
                            content: "确定前往",
                            success: function(e) {
                                e.confirm ? wx.navigateToMiniProgram({
                                    appId: "wxe89bfe0adae77728"
                                }) : console.log("======用户已取消=======");
                            }
                        }));
                    }
                });
            }
        });
    },
    goToTuanGou: function() {
        wx.navigateToMiniProgram({
            appId: "wxe89bfe0adae77728"
        });
    },
    backToUser: function() {
        wx.switchTab({
            url: "../user/user"
        });
    }
});