function e() {
    for (var e = [], t = 0; t < 3; ++t) {
        var o = Math.floor(256 * Math.random()).toString(16);
        o = 1 == o.length ? "0" + o : o, e.push(o);
    }
    return "#" + e.join("");
}

var t, o = require("../../utils/util.js"), a = getApp(), s = a.globalData.httpUrl, n = a.globalData.tuhttpUrl;

a.globalData.testhttpUrl;

Page({
    data: {
        isPlay: !1,
        src: "",
        describe: "",
        desc: "",
        homePageimg: "",
        coverFlg: !1,
        videoCover: "http://qiniu.shoukaikeji.com/FkvxMcZloG6t1ZrxZlb3LX9ZSPbh",
        dianUrl: "http://qiniu.shoukaikeji.com/Fv2jhbGuGlGHLtBixVHMkUOEmE3C",
        vipUrl: "http://qiniu.shoukaikeji.com/FgdPeEuxFyAfoUK-dkmtmIqNjMtr",
        wntjUrls: "http://qiniu.shoukaikeji.com/FrecMOHfCdA8Vb1q9THBwB4ozYcx",
        wntjUrls1: "http://qiniu.shoukaikeji.com/FlYKx1bXrk8RbCTm1vQuRbjzhVgi",
        wntjUrls2: "http://qiniu.shoukaikeji.com/Ftpj8aVwFVJ94iSKX91w5bHBRTkQ",
        wntjUrls3: "http://qiniu.shoukaikeji.com/FmhD6wldZQYRZhahCQBvgb7fwyPA",
        storeId: "",
        httpUrl: s,
        tuhttpUrl: n,
        ydFlag: !0,
        pdFlag: !0,
        syFlag: !0,
        orderFlag: !0,
        movies: [],
        cutfoods: [],
        tsfoods: [],
        yhtjName: "",
        yhtjName1: "",
        wntjName: "",
        wntjName1: "",
        wntjName2: "",
        wntjName3: "",
        urls: "",
        urls1: "",
        urls2: "",
        urls3: "",
        specialitiesId: "",
        specialitiesId1: "",
        specialitiesId2: "",
        specialitiesId3: "",
        priceT: "",
        priceT1: "",
        slider: [],
        swiperCurrent: 0,
        orderImgUrl: "",
        memberImgUrl: "",
        showView: !0
    },
    showButton: function() {
        t.setData({
            showView: !t.data.showView
        });
    },
    swiperChange: function(e) {
        t.setData({
            swiperCurrent: e.detail.current
        });
    },
    onLoad: function(e) {
        console.log(e), t = this, wx.setStorage({
            key: "receiverNotes",
            data: {
                wechatUserAddressReceiverName: "",
                wechatUserAddressReceiverPhoneNum: "",
                wechatUserAddressFullAddress: "",
                wechatUserAddressAddress: "",
                addressId: ""
            }
        });
        var n = decodeURIComponent(e.scene);
        if ("undefined" != n && void 0 != n && "" != n && null != n) {
            var r = n.split(",")[0].replace('"', "");
            console.log(r), wx.request({
                url: s + "skstoremodel/findStoreById",
                data: {
                    pid: r
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(e) {
                    var o = e.data, a = e.data.storeInfoStoreId;
                    wx.setStorage({
                        key: "storeInfo",
                        data: o
                    }), wx.setStorageSync("storeId", a), t.resendIndex(a);
                }
            });
        }
        if (void 0 != e.storeId && "undefined" != e.storeId && null != e.storeId && "null" != e.storeId && "" != e.storeId) {
            console.log("========转发进入=========");
            var d = e.storeId, i = e.companyId;
            wx.setStorageSync("storeId", d), wx.setStorageSync("companyId", i), console.log(d), 
            console.log(i), wx.request({
                url: s + "skstoremodel/wxSelectStoreByCompanyId",
                data: {
                    storeInfoCompanyInfoId: i,
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
                success: function(e) {
                    var o = e.data;
                    for (var a in o) if (o[a].storeInfoStoreId == d) {
                        var s = o[a];
                        wx.setStorage({
                            key: "storeInfo",
                            data: s
                        }), wx.setNavigationBarTitle({
                            title: s.storeInfoName
                        }), t.setData({
                            storeInfo: s
                        });
                    }
                    t.resendIndex(d);
                }
            });
        }
        o.getShareInfos(t, s), o.setCompanyId(t, e), o.setStoreId(t), o.setStoreInfo(t), 
        o.setUserId(t), o.setStoreInfoName(t), wx.setStorage({
            key: "collectMoney",
            data: 0
        }), wx.setStorage({
            key: "couponInfo",
            data: ""
        }), a.getUserInfo(function(e) {
            console.log(e), t.setData({
                userInfo: e
            });
        });
        var c = wx.createVideoContext("myVideo");
        t.setData({
            videoContext: c
        }), wx.getStorage({
            key: "storeId",
            success: function(e) {
                wx.request({
                    url: s + "skstoremodel/getDesktopcycleDateNew",
                    data: {
                        desktopCycleConfigStoreInfoStoreId: e.data,
                        desktopCycleConfigIsUseFlg: "0"
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        var o = e.data.videoFlg;
                        t.setData({
                            videoFlg: o
                        });
                        var a = [];
                        if ("1" == o) {
                            var s = e.data.videoUrl;
                            console.log(s), t.setData({
                                src: s
                            }), a.push({
                                desktopCycleConfigImgUrl: t.data.src,
                                marks: 0
                            }), console.log("========视频文件名称=========="), console.log(a[0].desktopCycleConfigImgUrl), 
                            console.log("========轮播列表=========="), console.log(a);
                        } else {
                            for (var n in e.data.imgList) a.push({
                                desktopCycleConfigImgUrl: e.data.imgList[n].desktopCycleConfigImgUrl,
                                marks: "1"
                            });
                            console.log("============lunboMovie========="), console.log(a);
                        }
                        t.setData({
                            lunboMovie: a
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "storeId",
            success: function(e) {
                wx.request({
                    url: s + "skfoodmodel/selFoodInfo",
                    data: {
                        storeId: e.data,
                        discountFlg: "1"
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        t.setData({
                            cutfoods: e.data
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "storeId",
            success: function(e) {
                wx.request({
                    url: s + "sksystemmodel/findAllMenuStorePower",
                    data: {
                        menuStorePowerStoreinfoStoreId: e.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        var o = [];
                        console.log("=====findAllMenuStorePower success======="), console.log(e.data);
                        var a = void 0, s = void 0;
                        for (var n in e.data) o.push({
                            buttonName: e.data[n].buttonName,
                            menuStorePowerisUser: e.data[n].menuStorePowerisUser,
                            menuStorePowerisShow: e.data[n].menuStorePowerisShow
                        }), "点餐" == e.data[n].buttonName ? a = e.data[n].imgUrl : "会员" == e.data[n].buttonName && (s = e.data[n].imgUrl);
                        console.log(o), t.setData({
                            menus: o,
                            dianMenuImgUrl: a,
                            vipMenuImgUrl: s
                        }), t.chkShowFlag(), wx.setStorage({
                            key: "menus",
                            data: o
                        });
                    }
                }), wx.request({
                    url: s + "skfoodmodel/selFoodSpecialitiesflg",
                    data: {
                        storeId: e.data,
                        specialitiesFlg: "1"
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        t.setData({
                            tsfoods: e.data
                        });
                        for (var o = 0; o < e.data.length; o++) 0 == o ? t.setData({
                            wntjName: e.data[o].name,
                            urls: e.data[o].url,
                            specialitiesId: e.data[o].id
                        }) : 1 == o ? t.setData({
                            urls1: e.data[o].url,
                            wntjName1: e.data[o].name,
                            specialitiesId1: e.data[o].id
                        }) : 2 == o ? t.setData({
                            urls2: e.data[o].url,
                            wntjName2: e.data[o].name,
                            specialitiesId2: e.data[o].id
                        }) : 3 == o && t.setData({
                            urls3: e.data[o].url,
                            wntjName3: e.data[o].name,
                            specialitiesId3: e.data[o].id
                        });
                    }
                }), wx.request({
                    url: s + "skstoremodel/selSingleConfListByStoreIdWX",
                    data: {
                        storeId: e.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        var a = e.data, s = !0, n = !0;
                        if (a) {
                            var r = o.formatTimeOnly(new Date()).replace(":", ""), d = a.reservedBegin.replace(":", ""), i = a.reservedEnd.replace(":", ""), c = a.takeoutBegin.replace(":", ""), l = a.takeoutEnd.replace(":", "");
                            console.log("====selSingleConfListByStoreIdWX====="), console.log(r), console.log(d), 
                            console.log(i), console.log(c), console.log(l), console.log("====selSingleConfListByStoreIdWX====="), 
                            console.log("reservedBegin ==> " + (parseInt(d) < parseInt(r))), console.log("reservedEnd ==> " + i > r), 
                            console.log("reservedBegin ==> " + c < r), console.log("reservedEnd ==> " + l > r), 
                            parseInt(d) < parseInt(i) ? (s = parseInt(d) < parseInt(r) && parseInt(i) > parseInt(r), 
                            n = parseInt(c) < parseInt(r) && parseInt(l) > parseInt(r)) : (s = parseInt(d) < parseInt(r) || parseInt(i) > parseInt(r), 
                            n = parseInt(c) < parseInt(r) || parseInt(l) > parseInt(r));
                        }
                        console.log("yudingIsuse ==> " + s), console.log("waimaiIsuse ==> " + n), t.setData({
                            singleConfBean: e.data,
                            yudingIsuse: s,
                            waimaiIsuse: n
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "companyId",
            success: function(e) {
                var o = e.data;
                wx.getStorage({
                    key: "storeId",
                    success: function(e) {
                        var a = e.data;
                        wx.request({
                            url: s + "skmembermodel/findVipCardBy",
                            data: {
                                companyId: o,
                                storeId: a
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(e) {
                                var o = e.data.id;
                                t.setData({
                                    cardId: o,
                                    vipCard: e.data
                                }), wx.setStorage({
                                    key: "cardId",
                                    data: e.data.id
                                }), wx.setStorage({
                                    key: "vipCard",
                                    data: e.data
                                });
                            }
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "userId",
            success: function(e) {
                wx.getStorage({
                    key: "connectedSocket",
                    success: function(t) {
                        1 == t.data ? console.log("======已有连接socket不连接=========") : o.conSocket(e.data);
                    },
                    fail: function(t) {
                        o.conSocket(e.data);
                    }
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
        t = this, wx.onSocketMessage(function(e) {
            console.log("===========接收到服务器信息=============="), console.log(e.data), o.getTkInfos(t, e);
        }), wx.getStorage({
            key: "saomajin",
            success: function(e) {
                e.data && (t.onLoad(), wx.setStorage({
                    key: "saomajin",
                    data: !1
                }));
            }
        }), console.log("=====isPlay=====:" + t.data.isPlay), wx.onSocketOpen(function(e) {
            wx.setStorage({
                key: "connectedSocket",
                data: !0
            }), console.log("WebSocket连接已打开！"), console.log(e);
        }), wx.onSocketClose(function(e) {
            console.log("WebSocket连接已关闭！"), wx.getStorage({
                key: "userId",
                success: function(e) {
                    o.conSocket(e.data);
                },
                fail: function() {
                    console.log("连接socket失败"), wx.setStorage({
                        key: "connectedSocket",
                        data: !1
                    });
                }
            });
        }), wx.onSocketError(function(e) {
            console.log("WebSocket连接打开失败，请检查！"), console.log(e), wx.setStorage({
                key: "connectedSocket",
                data: !1
            });
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), t = this, setTimeout(function() {
            t.onPullDownRefresh();
        }, 500);
    },
    onShareAppMessage: function() {
        return console.log("======share开始======="), {
            title: t.data.shareTitle,
            desc: "",
            imageUrl: t.data.shareImgUrl,
            path: "/pages/index/index?storeId=" + t.data.storeId + "&companyId=" + t.data.companyId,
            success: function(e) {
                console.log("转发成功");
            },
            fail: function(e) {
                console.log("转发失败");
            }
        };
    },
    onUnload: function() {
        (t = this).toStop(), wx.closeSocket({
            success: function(e) {
                console.log("======success======="), console.log(e), wx.setStorage({
                    key: "connectedSocket",
                    data: !1
                });
            },
            fail: function(e) {
                console.log("======fail======="), console.log(e);
            }
        });
    },
    onHide: function() {
        (t = this).toStop();
    },
    goToActive: function() {
        wx.navigateTo({
            url: "../active/active"
        });
    },
    wifi: function(e) {
        wx.navigateTo({
            url: "../index/wifi/wifi"
        });
    },
    map: function() {
        wx.navigateTo({
            url: "../map/map"
        });
    },
    wntjDetail: function(e) {
        var t = e.currentTarget.dataset.specialitiesId;
        wx.setStorage({
            key: "specialitiesId",
            data: t
        }), console.log(e), wx.navigateTo({
            url: "../index/wntjDetail/wntjDetail"
        });
    },
    yhtjDetail: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.setStorage({
            key: "foodId",
            data: t
        }), wx.navigateTo({
            url: "../index/yhtjDetail/yhtjDetail"
        });
    },
    destine: function(e) {
        if (t.chkUserFlag("预订")) if (t.data.yudingIsuse) {
            wx.setStorage({
                key: "ydFlg",
                data: !0
            }), wx.setStorage({
                key: "dcFlg",
                data: !1
            }), wx.setStorage({
                key: "wmFlg",
                data: !1
            }), wx.setStorage({
                key: "carArray",
                data: []
            }), wx.getStorage({
                key: "userId",
                success: function(e) {
                    wx.getStorage({
                        key: "storeId",
                        success: function(t) {
                            wx.request({
                                url: s + "skordermodel/selUnpaidOrder",
                                data: {
                                    wechatUserId: e.data,
                                    orderType: "Y",
                                    storeId: t.data
                                },
                                method: "POST",
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                success: function(e) {
                                    "操作成功！" == e.data.msg ? e.data.count > 0 ? wx.request({
                                        url: s + "skordermodel/getOrderById",
                                        data: {
                                            orderType: "Y",
                                            id: e.data.orderId
                                        },
                                        method: "POST",
                                        header: {
                                            "content-type": "application/x-www-form-urlencoded"
                                        },
                                        success: function(e) {
                                            console.log(e.data.orderState);
                                            var t = "destine/destine";
                                            "1" == e.data.orderState ? t = "destine/waitReceipt/waitReceipt?orderId=" + e.data.id + "&orderState=1&orderType=Y" : "2" == e.data.orderState && (t = e.data.foodList.length > 0 ? "takeOut/takeOut?flag=Y&orderId=" + e.data.id + "&editType=N" : "destine/Receipt/Receipt?flag=Y&orderId=" + e.data.id + "&editType=N&orderState=2"), 
                                            wx.navigateTo({
                                                url: t
                                            });
                                        }
                                    }) : wx.navigateTo({
                                        url: "destine/destine"
                                    }) : wx.showModal({
                                        title: "获取未支付订单操作失败",
                                        content: "请联系后台管理员"
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else wx.showModal({
            title: "不在预定时间范围内",
            content: ""
        }); else wx.showModal({
            title: "没有预定功能",
            content: ""
        });
    },
    checkBusinessTime: function() {
        var e = t.data.storeInfo.storeInfoBusinessStartTime.replace(":", ""), a = t.data.storeInfo.storeInfoBusinessEndTime.replace(":", ""), s = o.formatTime(new Date()).split(" ")[1].split(":")[0] + o.formatTime(new Date()).split(" ")[1].split(":")[1];
        console.log("=========查看时间==========="), console.log(e), console.log(a), console.log(s), 
        1 * e < 1 * a ? (console.log("======起始时间小于结束时间========"), 1 * e > 1 * s || 1 * s > 1 * a ? t.setData({
            businessTime: !1
        }) : t.setData({
            businessTime: !0
        })) : 1 * e > 1 * a && (console.log("======起始时间大于结束时间========"), 1 * e > 1 * s && 1 * s > 1 * a ? t.setData({
            businessTime: !1
        }) : t.setData({
            businessTime: !0
        }));
    },
    fellin: function(e) {
        t.checkBusinessTime(), t.data.businessTime ? t.chkUserFlag("排队") ? wx.getStorage({
            key: "openId",
            success: function(e) {
                wx.getStorage({
                    key: "storeId",
                    success: function(t) {
                        wx.request({
                            url: s + "skordermodel/findlPersonNumLineUpByOpenId",
                            data: {
                                openId: e.data,
                                storeId: t.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(e) {
                                console.log("===findlPersonNumLineUpByOpenId success==="), e.data > 0 ? wx.navigateTo({
                                    url: "../index/fellin/queuingNumber/queuingNumber"
                                }) : wx.navigateTo({
                                    url: "../index/fellin/fellin"
                                });
                            }
                        });
                    }
                });
            }
        }) : wx.showModal({
            title: "没有排队功能",
            content: ""
        }) : wx.showModal({
            title: "不在店铺营业时间",
            content: "功能不可用"
        });
    },
    collect: function(e) {
        if (t.checkBusinessTime(), t.data.businessTime) if (t.chkUserFlag("收银")) {
            wx.navigateTo({
                url: "../index/collect/collect"
            });
        } else wx.showModal({
            title: "没有收银功能",
            content: ""
        }); else wx.showModal({
            title: "不在店铺营业时间",
            content: "功能不可用"
        });
    },
    member: function() {
        wx.getStorage({
            key: "vipCard",
            success: function(e) {
                "Y" == t.data.vipUseFlg ? (console.log("======有会员卡======="), wx.getStorage({
                    key: "userId",
                    success: function(e) {
                        wx.getStorage({
                            key: "storeId",
                            success: function(o) {
                                wx.request({
                                    url: s + "skmembermodel/findWechatUserById",
                                    data: {
                                        wechatUserId: e.data,
                                        wechatUserStoreStoreInfoStoreId: o.data
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(e) {
                                        "v" == e.data.wechatUserStoreIdentity ? t.setData({
                                            isVip: !0
                                        }) : t.setData({
                                            isVip: !1
                                        });
                                        var o = t.data.isVip;
                                        console.log("===myCard==="), console.log(o), console.log("===myCard==="), o ? wx.navigateTo({
                                            url: "../user/myCard/receiveMyCard/receiveMyCard"
                                        }) : wx.showToast({
                                            title: "请先领卡",
                                            success: function() {
                                                wx.navigateTo({
                                                    url: "../user/myCard/myCard"
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                })) : wx.getStorage({
                    key: "companyId",
                    success: function(e) {
                        wx.getStorage({
                            key: "storeId",
                            success: function(o) {
                                wx.request({
                                    url: s + "skmembermodel/selEquityCardWX",
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    data: {
                                        companyId: e.data,
                                        storeId: o.data
                                    },
                                    success: function(e) {
                                        e.data.isExistence || "Y" != t.data.forceUseFlg ? e.data.isExistence || "N" != t.data.forceUseFlg ? e.data.isExistence && "N" == t.data.forceUseFlg ? wx.showModal({
                                            title: "",
                                            content: "商家无会员卡功能且商家无权益卡功能"
                                        }) : wx.getStorage({
                                            key: "userId",
                                            success: function(e) {
                                                wx.getStorage({
                                                    key: "storeId",
                                                    success: function(t) {
                                                        wx.request({
                                                            url: s + "skmembermodel/selEquitycardByWX",
                                                            method: "POST",
                                                            header: {
                                                                "content-type": "application/x-www-form-urlencoded"
                                                            },
                                                            data: {
                                                                userId: e.data,
                                                                storeId: t.data
                                                            },
                                                            success: function(e) {
                                                                "Y" == e.data.isEquitycard ? wx.navigateTo({
                                                                    url: "../user/forceCard/alterForceCard/alterForceCard"
                                                                }) : wx.navigateTo({
                                                                    url: "../user/forceCard/receiveForceCard/receiveForceCard"
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        }) : wx.showModal({
                                            title: "",
                                            content: "商家无会员卡功能且商家无权益卡功能"
                                        }) : wx.showModal({
                                            title: "",
                                            content: "商家无会员卡功能且没有权益卡可购买"
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    member1: function() {
        "1" == t.data.hasReceived ? wx.navigateTo({
            url: "../user/myCard/receiveMyCard/receiveMyCard"
        }) : t.member();
    },
    takeOut: function(e) {
        t.chkUserFlag("外卖") ? t.data.waimaiIsuse ? (wx.setStorage({
            key: "wmFlg",
            data: !0
        }), wx.setStorage({
            key: "dcFlg",
            data: !1
        }), wx.setStorage({
            key: "ydFlg",
            data: !1
        }), wx.setStorage({
            key: "orderType",
            data: "W"
        }), wx.setStorage({
            key: "carArray",
            data: []
        }), wx.navigateTo({
            url: "../index/takeOut/takeOut?editType=Y"
        })) : wx.showModal({
            title: "不在可接单时间范围",
            content: ""
        }) : wx.showModal({
            title: "没有外卖功能",
            content: ""
        });
    },
    cutUsername: function() {
        wx.reLaunch({
            url: "../welcome/welcome"
        });
    },
    orderBut: function(e) {
        if (t.toStop(), t.checkBusinessTime(), t.data.businessTime) if (t.chkUserFlag("点餐")) {
            var o = e.currentTarget.dataset.statu;
            t.util(o);
        } else wx.showModal({
            title: "没有点餐功能",
            content: ""
        }); else wx.showModal({
            title: "不在店铺营业时间",
            content: "功能不可用"
        });
    },
    zhijieDian: function() {
        wx.setStorage({
            key: "wmFlg",
            data: !1
        }), wx.setStorage({
            key: "dcFlg",
            data: !0
        }), wx.setStorage({
            key: "ydFlg",
            data: !1
        }), wx.setStorage({
            key: "orderType",
            data: "D"
        }), wx.setStorage({
            key: "carArray",
            data: []
        }), wx.navigateTo({
            url: "../index/takeOut/takeOut?editType=Y"
        }), t.setData({
            showModalStatus: !1
        });
    },
    saomaDian: function() {
        wx.scanCode({
            success: function(e) {
                console.log("结果:" + e.result + "二维码类型:" + e.scanType + "字符集:" + e.charSet), new RegExp("zhuohao:").test(e.result) ? (wx.showToast({
                    title: "成功",
                    icon: "success",
                    duration: 2e3
                }), wx.setStorage({
                    key: "wmFlg",
                    data: !1
                }), wx.setStorage({
                    key: "dcFlg",
                    data: !0
                }), wx.setStorage({
                    key: "ydFlg",
                    data: !1
                }), wx.setStorage({
                    key: "orderType",
                    data: "D"
                }), wx.setStorage({
                    key: "carArray",
                    data: []
                }), wx.navigateTo({
                    url: "../index/takeOut/takeOut?zuohao=" + e.result.replace("zhuohao:", "") + "&editType=Y"
                })) : wx.showToast({
                    title: "未获取桌号",
                    icon: "loading",
                    mask: !0,
                    duration: 2e3
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "未获取桌号",
                    icon: "success",
                    duration: 2e3
                });
            },
            complete: function(e) {}
        }), t.setData({
            showModalStatus: !1
        });
    },
    util: function(e) {
        var t = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = t, t.opacity(0).rotateX(-100).step(), this.setData({
            animationData: t.export()
        }), setTimeout(function() {
            t.opacity(1).rotateX(0).step(), this.setData({
                animationData: t
            }), "close" == e && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == e && this.setData({
            showModalStatus: !0
        });
    },
    chkUserFlag: function(e) {
        var o = t.data.menus, a = !0;
        for (var s in o) o[s].buttonName == e && "N" == o[s].menuStorePowerisUser && (console.log(o[s].buttonName + " , " + o[s].menuStorePowerisUser), 
        a = !1);
        return a;
    },
    chkShowFlag: function() {
        var e = t.data.menus;
        console.log("chkShowFlag ==> "), console.log(e);
        for (var o in e) if ("预订" == e[o].buttonName) t.setData({
            yuding: e[o].menuStorePowerisShow
        }); else if ("排队" == e[o].buttonName) t.setData({
            paidui: e[o].menuStorePowerisShow
        }); else if ("收银" == e[o].buttonName) t.setData({
            shouyin: e[o].menuStorePowerisShow
        }); else if ("外卖" == e[o].buttonName) t.setData({
            waimai: e[o].menuStorePowerisShow
        }); else if ("点餐" == e[o].buttonName) t.setData({
            diancan: e[o].menuStorePowerisShow
        }); else if ("会员" == e[o].buttonName) {
            var a = e[o].menuStorePowerisShow, n = e[o].menuStorePowerisUser;
            t.setData({
                vipShowFlg: a,
                vipUseFlg: n
            }), "N" == e[o].menuStorePowerisShow ? t.setData({
                huiyuan: "N"
            }) : t.setData({
                huiyuan: "Y"
            });
        } else if ("权益卡" == e[o].buttonName) {
            var r = e[o].menuStorePowerisShow, d = e[o].menuStorePowerisUser;
            t.setData({
                forceShowFlg: r,
                forceUseFlg: d
            }), "N" == e[o].menuStorePowerisShow ? t.setData({
                quanyika: "N"
            }) : t.setData({
                quanyika: "Y"
            });
        } else "首页广告" == e[o].buttonName && ("N" == e[o].menuStorePowerisShow ? t.setData({
            coverFlgCheck: "N"
        }) : t.setData({
            coverFlgCheck: "Y"
        }), "N" == t.data.coverFlgCheck ? t.setData({
            coverFlg: !1,
            heightFlg: "",
            overflowFlg: ""
        }) : wx.getStorage({
            key: "storeId",
            success: function(e) {
                wx.request({
                    url: s + "skstoremodel/selAdvertWX",
                    data: {
                        storeId: e.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        "" != e.data.title && void 0 != e.data.title && null != e.data.title ? t.setData({
                            describe: e.data.title,
                            desc: e.data.content,
                            homePageimg: e.data.imgUrl,
                            coverFlg: !0,
                            heightFlg: "100vh",
                            overflowFlg: "hidden"
                        }) : "" != e.data.imgUrl && void 0 != e.data.imgUrl && null != e.data.imgUrl ? t.setData({
                            describe: e.data.title,
                            desc: e.data.content,
                            homePageimg: e.data.imgUrl,
                            coverFlg: !0,
                            heightFlg: "100vh",
                            overflowFlg: "hidden"
                        }) : (console.log("无广告信息"), t.setData({
                            coverFlg: !1,
                            heightFlg: "",
                            overflowFlg: ""
                        }));
                    }
                });
            }
        }));
    },
    go: function() {
        console.log(t), t.setData({
            coverFlg: !1,
            heightFlg: "",
            overflowFlg: ""
        }), t.toPlay(), console.log("videoFlg:" + t.data.videoFlg), console.log("isPlay:" + t.data.isPlay), 
        t.data.videoContext.play();
    },
    toPlay: function() {
        "1" == t.data.videoFlg ? t.setData({
            isPlay: !0
        }) : t.setData({
            isPlay: !1
        }), console.log("isPlay:" + t.data.isPlay);
    },
    toStop: function() {
        t.data.videoContext.stop(), t.setData({
            isPlay: !1
        });
    },
    onReady: function() {
        t = this;
    },
    bindInputBlur: function(e) {
        console.log(e.detail.value), t.setData({
            inputValue: e.detail.value
        });
    },
    bindSendDanmu: function() {
        t.videoContext.sendDanmu({
            text: t.data.inputValue,
            color: e()
        });
    },
    resendIndex: function(e) {
        console.log("=========进入跳转主页========="), wx.login({
            success: function(o) {
                console.log("====wx.login success====");
                var n = o.code;
                o.code ? (console.log("====get code===="), console.log("res.code ==> " + o.code), 
                wx.getSetting({
                    success: function(o) {
                        if (console.log("====wx.getSetting success===="), console.log(o), console.log(o.authSetting["scope.userInfo"]), 
                        o.authSetting["scope.userInfo"]) wx.getUserInfo({
                            success: function(o) {
                                console.log("====wx.getUserInfo success===="), wx.setStorage({
                                    key: "userName",
                                    data: o.userInfo.nickName
                                }), wx.setStorage({
                                    key: "avatarUrl",
                                    data: o.userInfo.avatarUrl
                                }), wx.request({
                                    url: s + "skmembermodel/getOpenidS",
                                    data: {
                                        code: n,
                                        AppID: a.globalData.appId,
                                        Secret: a.globalData.Secret,
                                        storeUuid: e,
                                        wxUserNickName: o.userInfo.nickName,
                                        headImgUrl: o.userInfo.avatarUrl
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(o) {
                                        var a = o.data.wechatUser.wechatUserId;
                                        t.setData({
                                            onClickFlag: !0,
                                            clickedStore: !1,
                                            userId: a
                                        }), null != o.data.openid && "" != o.data.openid ? (wx.setStorage({
                                            key: "openId",
                                            data: o.data.openid
                                        }), wx.setStorage({
                                            key: "userId",
                                            data: o.data.wechatUser.wechatUserId
                                        }), wx.setStorage({
                                            key: "storeId",
                                            data: e
                                        }), wx.getStorage({
                                            key: "companyId",
                                            success: function(t) {
                                                wx.request({
                                                    url: s + "skmembermodel/updatVipCardStore",
                                                    data: {
                                                        wechatUserId: o.data.wechatUser.wechatUserId,
                                                        wechatUserStoreStoreInfoStoreId: e,
                                                        companyId: t.data
                                                    },
                                                    method: "POST",
                                                    header: {
                                                        "content-type": "application/x-www-form-urlencoded"
                                                    },
                                                    success: function(e) {}
                                                }), wx.request({
                                                    url: s + "skmembermodel/updatEquitycardStore",
                                                    data: {
                                                        wxUserId: o.data.wechatUser.wechatUserId,
                                                        storeId: e,
                                                        companyId: t.data
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
                        }); else {
                            console.log("======未授权");
                            var r = "";
                            wx.getStorage({
                                key: "storeInfo",
                                success: function(t) {
                                    console.log("storeInfo ==>"), console.log(t.data), r = t.data.storeInfoHeadImgUrl, 
                                    wx.reLaunch({
                                        url: "../welcome/accredit/accredit?data=" + n + "&store_uuid=" + e + "&imgurl=" + r,
                                        success: function(e) {
                                            console.log(e);
                                        },
                                        fail: function(e) {
                                            console.log(e);
                                        }
                                    });
                                }
                            });
                        }
                    },
                    fail: function(e) {
                        console.log("====wx.getSetting fail====");
                    }
                })) : console.log("获取用户登录态失败！" + o.errMsg);
            },
            fail: function(e) {
                console.log("====wx.login fail===="), console.log("错误信息"), console.log(e);
            }
        });
    }
});