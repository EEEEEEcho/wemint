var t, e = getApp(), a = e.globalData.httpUrl;

Page({
    data: {
        othercity: "其它",
        httpUrl: a,
        stores: [],
        spCitys: [],
        citys: [],
        disFlag: "none",
        scroFlag: "",
        starurls: [],
        slider: [ {
            picUrl: "../../images/swiper1.jpg"
        }, {
            picUrl: "../../images/swiper1.jpg"
        }, {
            picUrl: "../../images/swiper1.jpg"
        } ],
        onClickFlag: !0
    },
    onLoad: function(e) {
        (t = this).setInit(), wx.getStorage({
            key: "companyId",
            success: function(e) {
                t.setData({
                    companyId: e.data
                }), wx.request({
                    url: a + "skstoremodel/WXfindWelcomeForward",
                    data: {
                        companyId: t.data.companyId
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        var o = e.data;
                        console.log("shareInfo:"), console.log(o);
                        var s = o.img.split("/"), r = s.length - 1, n = a + "image/" + s[r];
                        console.log("shareImgUrl:" + n), t.setData({
                            shareTitle: o.title,
                            shareImgUrl: n
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "avatarUrl",
            success: function(e) {
                t.setData({
                    avatarUrl: e.data
                });
            }
        }), wx.getStorage({
            key: "latitude",
            success: function(e) {
                wx.getStorage({
                    key: "longitude",
                    success: function(o) {
                        wx.getStorage({
                            key: "companyId",
                            success: function(s) {
                                wx.request({
                                    url: a + "skstoremodel/selCityByUser",
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    data: {
                                        storeInfoCompanyInfoId: s.data
                                    },
                                    success: function(a) {
                                        console.log(a.data);
                                        for (var r = t.data.citys, n = t.data.spCitys, c = a.data, d = 0; d < c.length; d++) c[d].cityxs.indexOf("沈阳") < 0 && n.length < 3 ? n.push({
                                            cityName1: c[d].cityxs
                                        }) : n.length >= 3 && r.push({
                                            cityName1: c[d].cityxs
                                        });
                                        t.setData({
                                            spCitys: n,
                                            citys: r
                                        }), n.length > 0 && t.getStroeList(s.data, o.data, e.data, "距离最近", "", n[0].cityName1, "");
                                    },
                                    fail: function(t) {}
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
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
            path: "/pages/welcome/welcome",
            success: function(t) {
                console.log("转发成功");
            },
            fail: function(t) {
                console.log("转发失败");
            }
        };
    },
    gotoIndex: function(e) {
        if (console.log("that.data.onClickFlag"), console.log(t.data.onClickFlag), t.data.onClickFlag) {
            t.setData({
                onClickFlag: !1
            });
            var a = e.currentTarget.dataset.storeName, o = e.currentTarget.dataset.storeuid, s = e.currentTarget.dataset.storeInfo, r = e.currentTarget.dataset.storeInfoDeliveryPrice;
            wx.setStorage({
                key: "storeInfo",
                data: s
            }), wx.setStorage({
                key: "deliveryPrice",
                data: r
            }), wx.setStorage({
                key: "storeName",
                data: a
            }), console.log("====gotoIndex===="), t.resendIndex(o);
        }
    },
    disOther: function() {
        var e = [], a = [];
        for (var o in t.data.spCitys) e[o] = "#ddd", a[o] = "#555";
        t.setData({
            disFlag: "block",
            scroFlag: "hidden",
            wordColor: "#313330",
            bgColor: "#fcc11f",
            wordColors: e,
            bgColors: a
        });
    },
    resume: function() {
        t.setData({
            disFlag: "none",
            scroFlag: ""
        });
    },
    area: function(e) {
        t.resume();
        var a = e.currentTarget.dataset.cityname;
        wx.getStorage({
            key: "companyId",
            success: function(e) {
                wx.getStorage({
                    key: "latitude",
                    success: function(o) {
                        wx.getStorage({
                            key: "longitude",
                            success: function(s) {
                                t.getStroeList(e.data, s.data, o.data, "距离最近", "", a, "");
                            }
                        });
                    }
                });
            }
        });
    },
    getStroeList: function(e, o, s, r, n, c, d) {
        wx.request({
            url: a + "skstoremodel/wxSelectStoreByCompanyId",
            data: {
                storeInfoCompanyInfoId: e,
                storeInfoLongitude: o,
                storeInfoLatitude: s,
                condition: r,
                storeInfoName: n,
                storeInfoAddress: c
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                t.setData({
                    stores: e.data
                });
                for (var a = e.data, o = t.data.starurls, s = 0; s < a.length; s++) o[s] = t.setStart(a[s].storeRatedServiceStartLevel);
                t.setData({
                    starurls: o
                });
            }
        });
    },
    setInit: function(e) {
        var a = [], o = [];
        for (var s in t.data.spCitys) a[s] = "#ddd", o[s] = "#555";
        a[0] = "#313330", o[0] = "#fcc11f", t.setData({
            wordColors: a,
            bgColors: o,
            wordColor: "#ddd",
            bgColor: "#555"
        });
    },
    fushun: function(e) {
        var a = e.currentTarget.dataset.clickIndex, o = [], s = [];
        for (var r in t.data.spCitys) o[r] = "#ddd", s[r] = "#555";
        o[a] = "#313330", s[a] = "#fcc11f", t.setData({
            wordColors: o,
            bgColors: s,
            wordColor: "#ddd",
            bgColor: "#555"
        }), t.area(e);
    },
    setStart: function(t) {
        this.data.starurls;
        var e = {};
        console.log("storeRatedServiceStartLevel ==> " + t);
        for (var a = 0; a < 5; a++) e[a] = a <= t - 1 ? {
            starurl: "../../../images/star.png"
        } : a - t > 0 && a - t < 1 ? {
            starurl: "../../../images/halfstar.png"
        } : {
            starurl: "../../../images/emptystar.png"
        };
        return e;
    },
    resendIndex: function(o) {
        wx.login({
            success: function(s) {
                console.log("====wx.login success====");
                s.code;
                s.code ? wx.getStorage({
                    key: "userName",
                    success: function(r) {
                        console.log("resi.data ==> " + r.data), wx.request({
                            url: a + "skmembermodel/getOpenidS",
                            data: {
                                code: s.code,
                                AppID: e.globalData.appId,
                                Secret: e.globalData.Secret,
                                storeUuid: o,
                                wxUserNickName: r.data,
                                headImgUrl: t.data.avatarUrl
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(e) {
                                t.setData({
                                    onClickFlag: !0
                                }), null != e.data.openid && "" != e.data.openid ? (wx.setStorage({
                                    key: "openId",
                                    data: e.data.openid
                                }), wx.setStorage({
                                    key: "userId",
                                    data: e.data.wechatUser.wechatUserId
                                }), wx.setStorage({
                                    key: "storeId",
                                    data: o
                                }), wx.switchTab({
                                    url: "../../index/index"
                                })) : wx.showToast({
                                    title: "登录失败"
                                });
                            }
                        });
                    }
                }) : console.log("获取用户登录态失败！" + s.errMsg);
            },
            fail: function() {
                console.log("====wx.login fail====");
            }
        });
    }
});