var e, t = getApp(), o = require("../../utils/util.js"), a = t.globalData.httpUrl, s = t.globalData.tuhttpUrl;

Page({
    data: {
        wntjUrls: "http://qiniu.shoukaikeji.com/FjFB_bsTw1h2iQz5BMo6uYEFOob-",
        isRefreshing: !1,
        httpUrl: a,
        tuhttpUrl: s,
        description: "参加摇一摇活动，摇出丰厚大奖",
        isShow: !1,
        allowShake: !0,
        shake: "",
        shakeBackUrl: "http://qiniu.shoukaikeji.com/Fmmg4emGpeNKhCIDwCaieZE9WKMp",
        shakeBottomUrl: "http://qiniu.shoukaikeji.com/FkwlQKSsYO8hXmFiKSuZ70KXqb1_",
        noShakeUrl: "http://qiniu.shoukaikeji.com/FiDHGGf_-zAXB3Sk05E4FJECH6lT",
        hasShakeUrl: "http://qiniu.shoukaikeji.com/FhisIFTWxtV-1qCfU4EThVspKi5w",
        shakeMp3: "http://qiniu.shoukaikeji.com/FniUyJC9NddXGl5CMAIPAVfsDJRf",
        hasShake: !1,
        noShake: !1,
        prizeInfo: "电视机一台",
        confirm: "好 的"
    },
    onLoad: function(t) {
        (e = this).setData({
            allowShake: !1
        }), "1" == t.secondIn ? e.setData({
            secondIn: !0
        }) : e.setData({
            secondIn: !1
        }), e.setData({
            jiazaizhong: !0
        }), o.setCompanyId(e, t);
        var s = decodeURIComponent(t.scene);
        if (console.log("scene====>" + s), "undefined" != s && void 0 != s && "" != s && null != s) {
            wx.setStorage({
                key: "saomajin",
                data: !0
            }), wx.onSocketOpen(function() {
                wx.closeSocket({
                    success: function(e) {
                        console.log("======初始化关闭socket======="), wx.onSocketClose(function(e) {
                            console.log("========没有socket连接==========");
                        });
                    }
                });
            }), e.setData({
                saoma: !0,
                scene: s
            }), console.log("扫码进入");
            var n = s.split(",")[0].replace('"', "");
            wx.request({
                url: a + "skstoremodel/findStoreById",
                data: {
                    pid: n
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    wx.setStorage({
                        key: "storeInfo",
                        data: t.data
                    });
                    var o = t.data.storeInfoStoreId;
                    e.resendIndex(o), e.setData({
                        storeId: o
                    }), wx.setStorage({
                        key: "storeId",
                        data: o
                    });
                }
            });
        } else o.getShareInfos(e, a), e.setData({
            saoma: !1
        }), "0" == t.saoma && e.setData({
            saoma: !0
        }), console.log("从小程序进入"), wx.getStorage({
            key: "storeId",
            success: function(t) {
                e.setData({
                    storeId: t.data
                }), e.resendIndex(t.data), e.getShakeListWX(t.data);
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
        }), e.data.isShow = !0, wx.onAccelerometerChange(function(t) {
            e.data.isShow && (wx.onSocketClose(function(e) {
                console.log("WebSocket连接已关闭！"), console.log(e.reason), "interrupted" == e.reason || "abnormal closure" == e.reason ? wx.getStorage({
                    key: "userId",
                    success: function(e) {
                        o.conSocket(e.data);
                    }
                }) : (console.log("WebSocket连接已关闭！"), wx.setStorage({
                    key: "connectedSocket",
                    data: !1
                }));
            }), wx.onSocketMessage(function(t) {
                console.log("收到服务器内容："), console.log(t), "shakeAShake" != t.data.split(",")[0] ? "NoShakeAShake" != t.data.split(",")[0] || e.setData({
                    hasShake: !1,
                    noShake: !0,
                    prizeInfo: "未中奖"
                }) : e.setData({
                    hasShake: !0,
                    noShake: !1,
                    prizeInfo: t.data.split(",")[1]
                });
            }), (t.x > 1 || t.y > 1) && (e.playShakeAudio(), setTimeout(function() {
                e.setData({
                    allowShake: !0
                });
            }, 1e3)));
        });
    },
    onHide: function() {
        e.setData({
            isShow: !1
        });
    },
    onUnload: function() {
        e.setData({
            isShow: !1
        }), wx.closeSocket({
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
    onPullDownRefresh: function() {},
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
    playShakeAudio: function() {
        wx.request({
            url: a + "skordermodel/getShakeListWX",
            data: {
                storeId: e.data.storeId
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                t.data.isExistence ? e.data.allowShake && (e.setData({
                    allowShake: !1
                }), e.setData({
                    shake: "shake 1s linear infinite"
                }), "undefined" == e.data.userId || void 0 == e.data.userId || "" == e.data.userId || "null" == e.data.userId || null == e.data.userId ? e.playShakeAudio() : (wx.request({
                    url: a + "skordermodel/instersShakeRosterWX",
                    data: {
                        userId: e.data.userId,
                        storeId: e.data.storeId
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        1 == t.data.isExistence ? wx.showToast({
                            title: "摇一摇成功"
                        }) : wx.showToast({
                            title: "活动已结束"
                        }), e.setData({
                            shake: ""
                        }), console.log("111111111");
                    }
                }), wx.playBackgroundAudio({
                    dataUrl: e.data.shakeMp3,
                    title: "",
                    coverImgUrl: ""
                }), wx.onBackgroundAudioStop(function() {
                    e.setData({
                        shake: ""
                    }), console.log("开始调用getShakeListWX");
                }))) : wx.showToast({
                    title: "活动未开始"
                });
            }
        });
    },
    getShakeListWX: function(t) {
        wx.request({
            url: a + "skordermodel/getShakeListWX",
            data: {
                storeId: t
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                e.setData({
                    getShakeListWX: t.data
                });
            }
        });
    },
    goDetail: function(t) {
        t.detail.userInfo && (e.setData({
            shouquan: !1
        }), e.onLoad(options));
    },
    confirm: function() {
        e.setData({
            hasShake: !1,
            noShake: !1
        });
    },
    resendIndex: function(o) {
        e.data.secondIn ? wx.getStorage({
            key: "userId",
            success: function(t) {
                var a = t.data;
                e.loadActive(o, a);
            }
        }) : wx.getStorage({
            key: "code",
            success: function(s) {
                if ("" != s.data && null != s.data && void 0 != s.data && "null" != s.data && "undefined" != s.data) {
                    e.setData({
                        code: s.data
                    });
                    var n = s.data;
                    wx.getSetting({
                        success: function(s) {
                            console.log("====wx.getSetting success===="), console.log(s), console.log(s.authSetting["scope.userInfo"]), 
                            s.authSetting["scope.userInfo"] ? wx.getUserInfo({
                                success: function(s) {
                                    console.log("====wx.getUserInfo success===="), wx.setStorage({
                                        key: "userName",
                                        data: s.userInfo.nickName
                                    }), wx.setStorage({
                                        key: "avatarUrl",
                                        data: s.userInfo.avatarUrl
                                    }), wx.request({
                                        url: a + "skmembermodel/getOpenidS",
                                        data: {
                                            code: n,
                                            AppID: t.globalData.appId,
                                            Secret: t.globalData.Secret,
                                            storeUuid: o,
                                            wxUserNickName: s.userInfo.nickName,
                                            headImgUrl: s.userInfo.avatarUrl
                                        },
                                        method: "POST",
                                        header: {
                                            "content-type": "application/x-www-form-urlencoded"
                                        },
                                        success: function(t) {
                                            wx.setStorage({
                                                key: "code",
                                                data: ""
                                            }), e.setData({
                                                code: ""
                                            });
                                            var a = t.data.wechatUser.wechatUserId;
                                            wx.setStorage({
                                                key: "userId",
                                                data: t.data.wechatUser.wechatUserId
                                            }), e.loadActive(o, a);
                                        }
                                    });
                                },
                                fali: function(e) {
                                    console.log("====wx.login fail====");
                                }
                            }) : (console.log("======未授权"), console.log("=====storeId=====>" + o), wx.getStorage({
                                key: "companyId",
                                success: function(t) {
                                    wx.request({
                                        url: a + "skstoremodel/wxSelectStoreByCompanyId",
                                        data: {
                                            storeInfoCompanyInfoId: t.data,
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
                                        success: function(t) {
                                            e.setData({
                                                shouquanImg: t.data[0].storeInfoHeadImgUrl
                                            }), wx.redirectTo({
                                                url: "../welcome/accredit/accredit?goActive=true&goUser=false&store_uuid=" + o + "&imgurl=" + e.data.shouquanImg + "&data=" + e.data.code + "&scene=" + e.data.scene
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
                } else e.resendIndex(o);
            },
            fail: function(t) {
                console.log("获取code失败"), e.resendIndex(o);
            }
        });
    },
    loadActive: function(t, s) {
        wx.request({
            url: a + "skmembermodel/findVipCardBy",
            data: {
                companyId: e.data.companyId,
                storeId: t
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(n) {
                wx.setStorage({
                    key: "vipCard",
                    data: n.data
                });
                n.data;
                var c = n.data.isExistence;
                wx.request({
                    url: a + "skmembermodel/findWechatUserById",
                    data: {
                        wechatUserId: s,
                        wechatUserStoreStoreInfoStoreId: t
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(n) {
                        var d = n.data;
                        wx.request({
                            url: a + "skordermodel/getShakeActivityByIdWX",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                storeId: t
                            },
                            success: function(n) {
                                var r = n.data.isUseVip;
                                e.setData({
                                    jiazaizhong: !1
                                }), "v" != d.wechatUserStoreIdentity && r ? c ? (wx.request({
                                    url: a + "skmembermodel/findVipCardBy",
                                    data: {
                                        companyId: e.data.companyId,
                                        storeId: t
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(e) {
                                        var o = e.data.id;
                                        wx.setStorage({
                                            key: "cardId",
                                            data: o
                                        }), wx.setStorage({
                                            key: "storeId",
                                            data: t
                                        });
                                    }
                                }), wx.showModal({
                                    title: "请先领取会员卡",
                                    content: "",
                                    success: function(e) {
                                        e.confirm ? wx.redirectTo({
                                            url: "../user/myCard/myCard?toGotoActive=0&saoma=0"
                                        }) : wx.switchTab({
                                            url: "../index/index"
                                        });
                                    }
                                })) : wx.showModal({
                                    title: "商家无会员卡可领",
                                    content: "无法参与活动",
                                    success: function(e) {
                                        e.confirm ? wx.switchTab({
                                            url: "../index/index"
                                        }) : e.cancel && wx.switchTab({
                                            url: "../index/index"
                                        });
                                    }
                                }) : (e.setData({
                                    allowShake: !0
                                }), o.getShareInfos(e, a), e.getShakeListWX(e.data.storeId), wx.getStorage({
                                    key: "connectedSocket",
                                    success: function(e) {
                                        1 == e.data ? console.log("======已有连接socket不连接=========") : o.conSocket(s);
                                    },
                                    fail: function(e) {
                                        o.conSocket(s);
                                    }
                                }), wx.onSocketOpen(function(e) {
                                    wx.setStorage({
                                        key: "connectedSocket",
                                        data: !0
                                    }), console.log("WebSocket连接已打开！"), console.log(e);
                                }), wx.onSocketClose(function(e) {
                                    console.log("WebSocket连接已关闭！"), console.log(e.reason), "interrupted" == e.reason || "abnormal closure" == e.reason ? o.conSocket(s) : (console.log("WebSocket连接已关闭！"), 
                                    wx.setStorage({
                                        key: "connectedSocket",
                                        data: !1
                                    }));
                                }), wx.onSocketError(function(e) {
                                    console.log("WebSocket连接打开失败，请检查！"), console.log(e);
                                }), wx.setStorage({
                                    key: "storeId",
                                    data: t
                                }), wx.setStorage({
                                    key: "userId",
                                    data: s
                                }), e.setData({
                                    userId: s
                                }), console.log("userId====>" + s));
                            }
                        });
                    }
                });
            }
        });
    },
    close: function() {
        wx.switchTab({
            url: "../user/user"
        });
    }
});