var e, t = getApp(), a = t.globalData.httpUrl, o = t.globalData.tuhttpUrl;

Page({
    data: {
        clickedStore: !1,
        storeName: "",
        httpUrl: a,
        tuhttpUrl: o,
        shopTime: "",
        position: "",
        rightText: "距我最近",
        leftText: "选择区域",
        i: 0,
        j: 0,
        starurls: [],
        slider: [],
        stores: [],
        rows: [ [ {
            areaName: "和平区"
        }, {
            areaName: "沈河区"
        } ], [ {
            areaName: "皇姑区"
        }, {
            areaName: "大东区"
        } ], [ {
            areaName: "铁西区"
        }, {
            areaName: "浑南区"
        } ], [ {
            areaName: "于洪区"
        }, {
            areaName: "沈北新区"
        } ] ],
        disLeft: "none",
        disRight: "none",
        scroFlag: "",
        latitude: "",
        longitude: "",
        onClickFlag: !0
    },
    disRight: function() {
        e.data.canotClick ? wx.showToast({
            title: "加载中不可点击！"
        }) : e.setData({
            disRight: "block",
            disLeft: "none",
            scroFlag: "hidden"
        });
    },
    disLeft: function() {
        e.data.canotClick ? wx.showToast({
            title: "加载中不可点击！"
        }) : e.setData({
            disLeft: "block",
            disRight: "none",
            scroFlag: "hidden"
        });
    },
    cancel: function() {
        e.data.canotClick ? wx.showToast({
            title: "加载中不可点击！"
        }) : e.setData({
            disLeft: "none",
            disRight: "none",
            scroFlag: ""
        });
    },
    goDetail: function(t) {
        t.detail.userInfo && (e.setData({
            shouquan: !1
        }), e.onLoad());
    },
    onLoad: function(o) {
        (e = this).setData({
            canotClick: !0
        }), wx.getStorage({
            key: "companyId",
            success: function(o) {
                e.setData({
                    companyId: o.data
                }), void 0 == o.data || null == o.data || "undefined" == o.data || "null" == o.data || "" == o.data ? (console.log("============companyId未获取================="), 
                setTimeout(function() {
                    e.onLoad();
                }, 2e3)) : (console.log("===================已获取companyId========================="), 
                wx.request({
                    url: a + "skstoremodel/WXfindWelcomeForward",
                    data: {
                        companyId: e.data.companyId
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        var a = t.data;
                        if (console.log("shareInfo:"), console.log(a), "" != a.img && null != a.img && void 0 != a.img) {
                            var o = a.img.split("/"), n = "http://qiniu.shoukaikeji.com/" + o[o.length - 1];
                            console.log("shareImgUrl:" + n), e.setData({
                                shareImgUrl: n
                            });
                        }
                        e.setData({
                            shareTitle: a.title
                        });
                    }
                }), wx.getSetting({
                    success: function(o) {
                        o.authSetting["scope.userInfo"] ? (t.getUserInfo(function(t) {
                            console.log(t), e.setData({
                                userInfo: t
                            });
                        }), wx.setStorage({
                            key: "onshow",
                            data: !1
                        }), wx.setStorage({
                            key: "submitFlg",
                            data: !1
                        }), wx.getLocation({
                            type: "wgs84",
                            success: function(t) {
                                wx.setStorage({
                                    key: "latitude",
                                    data: t.latitude
                                }), wx.setStorage({
                                    key: "longitude",
                                    data: t.longitude
                                }), e.finishOnload(t);
                            },
                            fail: function() {
                                var t = {
                                    longitude: "",
                                    latitude: ""
                                };
                                wx.setStorage({
                                    key: "latitude",
                                    data: t.latitude
                                }), wx.setStorage({
                                    key: "longitude",
                                    data: t.longitude
                                }), e.finishOnload(t);
                            }
                        })) : wx.getStorage({
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
                                            shouquanImg: t.data[0].storeInfoHeadImgUrl,
                                            shouquan: !0
                                        });
                                    }
                                });
                            }
                        });
                    },
                    fail: function() {
                        e.onLoad();
                    }
                }));
            },
            fail: function(t) {
                console.log(t), setTimeout(function() {
                    e.onLoad();
                }, 2e3);
            }
        });
    },
    finishOnload: function(t) {
        wx.getStorage({
            key: "companyId",
            success: function(o) {
                wx.request({
                    url: a + "skstoremodel/getCarouselInfoDateWX",
                    data: {
                        companyId: o.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        var a = t.data, o = e.data.slider;
                        for (var n in a) a[n].desktopCycleConfigImgUrl && o.push({
                            picUrl: a[n].desktopCycleConfigImgUrl
                        });
                        e.setData({
                            slider: o
                        }), console.log(o);
                    }
                }), e.getStroeList(o.data, t.longitude, t.latitude, "距离最近", "", "", !0);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
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
            path: "/pages/welcome/welcome",
            success: function(e) {
                console.log("转发成功");
            },
            fail: function(e) {
                console.log("转发失败");
            }
        };
    },
    gotoIndex: function(t) {
        if (!e.data.clickedStore) {
            e.setData({
                clickedStore: !0
            });
            var a = t.currentTarget.dataset.storeName, o = t.currentTarget.dataset.storeuid, n = t.currentTarget.dataset.storeInfo, s = t.currentTarget.dataset.storeInfoDeliveryPrice;
            wx.setStorage({
                key: "storeInfo",
                data: n
            }), wx.setStorage({
                key: "deliveryPrice",
                data: s
            }), wx.setStorage({
                key: "storeName",
                data: a
            }), console.log("====gotoIndex===="), e.resendIndex(o);
        }
    },
    toOther: function() {
        e.cancel(), wx.navigateTo({
            url: "otherStore/otherStore"
        });
    },
    nearBy: function(t) {
        e.setData({
            rightText: "距我最近",
            disLeft: "none",
            disRight: "none",
            scroFlag: ""
        }), wx.getStorage({
            key: "latitude",
            success: function(t) {
                wx.getStorage({
                    key: "longitude",
                    success: function(a) {
                        wx.getStorage({
                            key: "companyId",
                            success: function(o) {
                                e.getStroeList(o.data, a.data, t.data, "距离最近", "", "");
                            }
                        });
                    }
                });
            }
        });
    },
    setStorName: function(t) {
        var a = t.detail.value;
        e.setData({
            storeName: a
        });
    },
    searchStoreByName: function(t) {
        var a = e.data.storeName;
        wx.getStorage({
            key: "companyId",
            success: function(t) {
                wx.getStorage({
                    key: "longitude",
                    success: function(o) {
                        wx.getStorage({
                            key: "latitude",
                            success: function(n) {
                                e.getStroeList(t.data, o.data, n.data, "距离最近", a, "");
                            }
                        });
                    }
                });
            }
        });
    },
    maxPopu: function() {
        var e = this;
        e.setData({
            rightText: "人气最高",
            disLeft: "none",
            disRight: "none",
            scroFlag: ""
        }), wx.getStorage({
            key: "companyId",
            success: function(t) {
                e.getStroeList(t.data, "", "", "人气最高", "", "");
            }
        });
    },
    maxSale: function() {
        var e = this;
        e.setData({
            rightText: "销量最高",
            disLeft: "none",
            disRight: "none",
            scroFlag: ""
        }), wx.getStorage({
            key: "companyId",
            success: function(t) {
                e.getStroeList(t.data, "", "", "销量最高", "", "");
            }
        });
    },
    area: function(e) {
        var t = this, a = e.currentTarget.dataset.areaname;
        t.setData({
            disLeft: "none",
            disRight: "none",
            scroFlag: "",
            leftText: a
        }), wx.getStorage({
            key: "latitude",
            success: function(e) {
                wx.getStorage({
                    key: "longitude",
                    success: function(o) {
                        wx.getStorage({
                            key: "companyId",
                            success: function(n) {
                                t.getStroeList(n.data, o.data, e.data, "距离最近", "", a);
                            }
                        });
                    }
                });
            }
        });
    },
    getStroeList: function(t, o, n, s, r, c, d) {
        wx.request({
            url: a + "skstoremodel/wxSelectStoreByCompanyId",
            data: {
                storeInfoCompanyInfoId: t,
                storeInfoLongitude: o,
                storeInfoLatitude: n,
                condition: s,
                storeInfoName: r,
                storeInfoAddress: c
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (console.log("=====welcome getStroeList wxSelectStoreByCompanyId success====="), 
                console.log(t.data), e.setData({
                    canotClick: !1
                }), d && 1 == t.data.length) {
                    var a = t.data[0].storeInfoName, o = t.data[0].storeInfoStoreId, n = t.data[0].storeInfoDeliveryPrice;
                    wx.setStorage({
                        key: "deliveryPrice",
                        data: n
                    }), wx.setStorage({
                        key: "storeInfo",
                        data: t.data[0]
                    }), wx.setStorage({
                        key: "storeId",
                        data: t.data[0].storeInfoStoreId
                    }), wx.setStorage({
                        key: "storeName",
                        data: a
                    }), e.resendIndex(o);
                } else {
                    e.setData({
                        stores: t.data
                    });
                    var s = t.data, r = e.data.starurls;
                    for (var c in s) r[c] = e.setStart(s[c].storeRatedServiceStartLevel);
                    e.setData({
                        starurls: r
                    });
                }
                e.setData({
                    onClickFlag: !0
                });
            }
        });
    },
    setStart: function(e) {
        var t = {};
        console.log("storeRatedServiceStartLevel ==> " + e);
        for (var a = 0; a < 5; a++) t[a] = a <= e - 1 ? {
            starurl: "../../images/star.png"
        } : e - a > 0 && e - a < 1 ? {
            starurl: "../../images/halfStar.png"
        } : {
            starurl: "../../images/emptyStar.png"
        };
        return t;
    },
    resendIndex: function(o) {
        console.log("=========进入跳转主页========="), wx.login({
            success: function(n) {
                console.log("====wx.login success====");
                var s = n.code;
                n.code ? (console.log("====get code===="), console.log("res.code ==> " + n.code), 
                wx.getUserInfo({
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
                                AppID: t.globalData.appId,
                                Secret: t.globalData.Secret,
                                storeUuid: o,
                                wxUserNickName: n.userInfo.nickName,
                                headImgUrl: n.userInfo.avatarUrl
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                e.setData({
                                    onClickFlag: !0,
                                    clickedStore: !1
                                }), null != t.data.openid && "" != t.data.openid ? (wx.setStorage({
                                    key: "openId",
                                    data: t.data.openid
                                }), wx.setStorage({
                                    key: "userId",
                                    data: t.data.wechatUser.wechatUserId
                                }), wx.setStorage({
                                    key: "storeId",
                                    data: o
                                }), wx.switchTab({
                                    url: "../index/index"
                                }), wx.getStorage({
                                    key: "companyId",
                                    success: function(e) {
                                        wx.request({
                                            url: a + "skmembermodel/updatVipCardStore",
                                            data: {
                                                wechatUserId: t.data.wechatUser.wechatUserId,
                                                wechatUserStoreStoreInfoStoreId: o,
                                                companyId: e.data
                                            },
                                            method: "POST",
                                            header: {
                                                "content-type": "application/x-www-form-urlencoded"
                                            },
                                            success: function(e) {}
                                        }), wx.request({
                                            url: a + "skmembermodel/updatEquitycardStore",
                                            data: {
                                                wxUserId: t.data.wechatUser.wechatUserId,
                                                storeId: o,
                                                companyId: e.data
                                            },
                                            method: "POST",
                                            header: {
                                                "content-type": "application/x-www-form-urlencoded"
                                            },
                                            success: function(e) {}
                                        });
                                    }
                                })) : wx.showToast({
                                    title: "登录失败"
                                });
                            }
                        });
                    },
                    fali: function(e) {
                        console.log("====wx.login fail====");
                    }
                })) : console.log("获取用户登录态失败！" + n.errMsg);
            },
            fail: function(e) {
                console.log("====wx.login fail===="), console.log("错误信息"), console.log(e);
            }
        });
    }
});