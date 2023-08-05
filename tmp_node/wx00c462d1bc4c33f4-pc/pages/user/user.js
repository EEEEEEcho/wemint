var e, t = getApp(), o = (require("../../utils/util.js"), require("../../utils/util.js")), a = t.globalData.httpUrl;

Page({
    data: {
        shakeShowFlg: "N",
        isRefreshing: !1,
        wechatUserStoreIntegeal: 0,
        wechatUserStoreBalance: 0,
        vipColor: "#ffbf20",
        point: "50",
        httpUrl: a,
        cash: "100",
        coupon: "3",
        isVip: !1,
        noticeCount: 0,
        selectedFlag: [ !1, !1, !1, !1, !1 ],
        contactName: "",
        contactTel: "",
        contactAddr: "",
        clicked: !1,
        allowtion: !1
    },
    onLoad: function(t) {
        e = this;
        var n = decodeURIComponent(t.scene);
        if ("undefined" != n && void 0 != n && "" != n && null != n) {
            e.setData({
                allowtion: !0
            });
            var s = n.split(",")[0].replace('"', "");
            console.log(s), wx.request({
                url: a + "skstoremodel/findStoreById",
                data: {
                    pid: s
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data, s = t.data.storeInfoStoreId;
                    wx.setStorage({
                        key: "storeInfo",
                        data: n
                    }), wx.setNavigationBarTitle({
                        title: n.storeInfoName
                    }), console.log("storeInfo.storeInfoName"), console.log(n.storeInfoName), e.setData({
                        storeId: s
                    }), wx.setStorageSync("storeId", s), o.getShareInfos(e, a), e.resendIndex(s);
                }
            });
        } else console.log("进来没"), o.getShareInfos(e, a), o.setStoreInfo(e), wx.getStorage({
            key: "connectedSocket",
            success: function(e) {
                e.data ? console.log("============已有socket不连接=============") : wx.getStorage({
                    key: "userId",
                    success: function(e) {
                        o.conSocket(e.data);
                    }
                });
            }
        }), e.loadOther();
    },
    onReady: function() {},
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        (e = this).selOperationRecord(), wx.onSocketMessage(function(t) {
            console.log("===========接收到服务器信息=============="), console.log(t.data), o.getTkInfos(e, t);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    o.conSocket(e.data);
                }
            });
        }), e.findWechatUserById0(), e.data.allowtion && (e.setData({
            allowtion: !1
        }), e.loadOther());
    },
    onHide: function() {},
    onUnload: function() {
        o.closeSock();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
        var t = {
            scene: ""
        };
        (e = this).data.isRefreshing || (e.setData({
            isRefreshing: !0
        }), setTimeout(function() {
            e.setData({
                isRefreshing: !1
            }), e.onLoad(t), e.onShow();
        }, 2e3));
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: e.data.storeInfo.storeInfoName,
            desc: "",
            imageUrl: "",
            path: "/pages/index/index?storeId=" + e.data.storeId + "&companyId=" + e.data.companyId,
            success: function(e) {
                console.log("转发成功");
            },
            fail: function(e) {
                console.log("转发失败");
            }
        };
    },
    checkCoupon: function() {
        "v" == e.data.findWechatUserById.wechatUserStoreIdentity ? wx.navigateTo({
            url: "../user/myCoupon/myCoupon"
        }) : wx.showModal({
            title: "提示",
            content: "您没有会员卡不能查看优惠券"
        });
    },
    checkCash: function() {
        "v" == e.data.findWechatUserById.wechatUserStoreIdentity ? wx.navigateTo({
            url: "myCash/myCash"
        }) : wx.showModal({
            title: "提示",
            content: "您没有会员卡不能充值"
        });
    },
    myCard: function(t) {
        var o = e.data.isVip;
        console.log("===myCard==="), console.log(o), console.log("===myCard==="), o ? wx.navigateTo({
            url: "myCard/receiveMyCard/receiveMyCard"
        }) : e.data.isExistenceVip ? wx.showToast({
            title: "请先领卡",
            success: function() {
                e.data.toGotoActive ? (wx.navigateTo({
                    url: "myCard/myCard?toGotoActive=0&toGoTuanGou=1"
                }), e.setData({
                    toGotoActive: !1,
                    toGoTuanGou: !1
                })) : e.data.toGoTuanGou ? (wx.navigateTo({
                    url: "myCard/myCard?toGoTuanGou=0&toGotoActive=1"
                }), e.setData({
                    toGotoActive: !1,
                    toGoTuanGou: !1
                })) : (wx.navigateTo({
                    url: "myCard/myCard?toGotoActive=1&toGoTuanGou=1"
                }), e.setData({
                    toGotoActive: !1,
                    toGoTuanGou: !1
                }));
            }
        }) : wx.showToast({
            title: "无卡可领取",
            success: function() {}
        });
    },
    alterMyCard: function(t) {
        e.data.isVip ? wx.navigateTo({
            url: "../user/alterMyCard/alterMyCard"
        }) : e.data.isExistenceVip ? wx.showToast({
            title: "请先领卡",
            success: function() {
                wx.navigateTo({
                    url: "myCard/myCard"
                });
            }
        }) : wx.showToast({
            title: "无卡可领",
            success: function() {}
        });
    },
    shippingAddress: function(t) {
        e.chkUserFlag("外卖") && wx.navigateTo({
            url: "shippingAddress/shippingAddress"
        });
    },
    comment: function(e) {
        wx.navigateTo({
            url: "comment/comment"
        });
    },
    couponsCenter: function(t) {
        console.log(e.data.couponCnt), 0 != e.data.couponCnt && void 0 != e.data.couponCnt ? e.chkUserFlag("会员") && (e.data.isVip ? wx.navigateTo({
            url: "couponsCenter/couponsCenter"
        }) : e.data.isExistenceVip ? wx.showToast({
            title: "请先领卡",
            success: function() {
                wx.navigateTo({
                    url: "myCard/myCard"
                });
            }
        }) : wx.showToast({
            title: "无卡可领取",
            success: function() {}
        })) : wx.showModal({
            title: "",
            content: "暂无优惠券可领"
        });
    },
    getNotice: function() {
        wx.getStorage({
            key: "storeId",
            success: function(t) {
                wx.getStorage({
                    key: "userId",
                    success: function(o) {
                        wx.request({
                            url: a + "skmembermodel/updateBalanceRead",
                            data: {
                                wxUserUuid: o.data,
                                storeUuid: t.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                console.log(t.data), e.setData({
                                    noticeCount: 0
                                });
                            }
                        });
                    }
                });
            }
        }), wx.navigateTo({
            url: "userNotice/userNotice"
        });
    },
    shopNotice: function(e) {
        wx.navigateTo({
            url: "shopNotice/shopNotice"
        });
    },
    changeToggle: function(t) {
        var o = t.currentTarget.dataset.index;
        if ("0" == o && !e.data.isVip) {
            if (!e.data.isExistenceVip) return void wx.showModal({
                title: "商家无会员卡可领",
                content: ""
            });
            if ("N" == e.data.vipUseFlg) return void wx.showModal({
                title: "商家无会员卡功能",
                content: ""
            });
        }
        "7" == o && wx.getStorage({
            key: "storeId",
            success: function(t) {
                wx.request({
                    url: a + "skordermodel/getShakeActivityByIdWX",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        storeId: t.data
                    },
                    success: function(t) {
                        t.data.isUseVip ? e.data.isVip ? (console.log("=====是会员====="), wx.navigateTo({
                            url: "../active/active?secondIn=1"
                        })) : (console.log("======不是会员====="), wx.showModal({
                            title: "请先领取会员卡",
                            content: "",
                            success: function(t) {
                                t.confirm && (e.setData({
                                    toGotoActive: !0
                                }), e.myCard());
                            }
                        })) : wx.navigateTo({
                            url: "../active/active?secondIn=1"
                        });
                    }
                });
            }
        }), "5" == o && wx.getStorage({
            key: "userId",
            success: function(t) {
                wx.getStorage({
                    key: "storeId",
                    success: function(o) {
                        wx.request({
                            url: a + "skmembermodel/selEquitycardByWX",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                userId: t.data,
                                storeId: o.data
                            },
                            success: function(t) {
                                if ("Y" != t.data.isEquitycard) {
                                    if (!e.data.isExistenceForce) return void wx.showModal({
                                        title: "商家无权益卡可领",
                                        content: ""
                                    });
                                    if ("N" == e.data.forceUseFlg) return void wx.showModal({
                                        title: "商家无权益卡功能",
                                        content: ""
                                    });
                                }
                            }
                        });
                    }
                });
            }
        }), e.data.selectedFlag[o] ? e.data.selectedFlag[o] = !1 : e.data.selectedFlag[o] = !0, 
        wx.getStorage({
            key: "storeId",
            success: function(t) {
                console.log(t.data), wx.request({
                    url: a + "skstoremodel/findStoreById",
                    data: {
                        storeId: t.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        console.log(t.data), console.log(e.data.selectedFlag), e.setData({
                            selectedFlag: e.data.selectedFlag,
                            contactName: t.data.storeInfoContactsName,
                            contactTel: t.data.storeInfoTelephoneNum,
                            contactAddr: t.data.storeInfoAddress
                        });
                    }
                });
            }
        });
    },
    chkUserFlag: function(t) {
        var o = e.data.menus, a = !0;
        console.log("预订 ==> "), console.log(o);
        for (var n in o) console.log(o[n].buttonName + " , " + o[n].menuStorePowerisUser), 
        o[n].buttonName == t && "N" == o[n].menuStorePowerisUser && (console.log(o[n].buttonName + " , " + o[n].menuStorePowerisUser), 
        a = !1);
        return a;
    },
    receiveForceCard: function() {
        wx.getStorage({
            key: "userId",
            success: function(t) {
                wx.getStorage({
                    key: "storeId",
                    success: function(o) {
                        wx.request({
                            url: a + "skmembermodel/selEquitycardByWX",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                userId: t.data,
                                storeId: o.data
                            },
                            success: function(t) {
                                if (e.setData({
                                    isEquitycard: t.data.isEquitycard
                                }), "Y" == t.data.isEquitycard) wx.navigateTo({
                                    url: "forceCard/alterForceCard/alterForceCard"
                                }); else {
                                    if (!e.data.isExistenceForce) return void wx.showModal({
                                        title: "",
                                        content: "没有权益卡可购买"
                                    });
                                    wx.navigateTo({
                                        url: "forceCard/receiveForceCard/receiveForceCard"
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    },
    selOperationRecord: function() {
        wx.getStorage({
            key: "storeId",
            success: function(t) {
                wx.getStorage({
                    key: "userId",
                    success: function(o) {
                        wx.request({
                            url: a + "skmembermodel/getOperationRecordNum",
                            data: {
                                wxUserUuid: o.data,
                                storeUuid: t.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                console.log(t.data);
                                var o = t.data;
                                e.setData({
                                    noticeCount: o
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    findWechatUserById0: function() {
        wx.getStorage({
            key: "userId",
            success: function(t) {
                wx.getStorage({
                    key: "storeId",
                    success: function(o) {
                        var n = t.data, s = o.data;
                        wx.request({
                            url: a + "skmembermodel/findWechatUserById",
                            data: {
                                wechatUserId: n,
                                wechatUserStoreStoreInfoStoreId: s
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                e.setData({
                                    findWechatUserById: t.data
                                });
                                var o = e.data.findWechatUserById;
                                "v" == o.wechatUserStoreIdentity ? e.setData({
                                    isVip: !0
                                }) : e.setData({
                                    isVip: !1
                                }), e.setData({
                                    wechatUserStoreIntegeal: o.wechatUserStoreIntegeal,
                                    wechatUserStoreBalance: o.wechatUserStoreBalance,
                                    receiveConfigNum: o.receiveConfigNum,
                                    wechatUserNickName: o.wechatUserNickName
                                }), e.data.isVip ? e.setData({
                                    vipColor: "#ffbf20"
                                }) : e.setData({
                                    vipColor: "#666"
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    findWechatUserById: function() {
        wx.getStorage({
            key: "userId",
            success: function(t) {
                wx.getStorage({
                    key: "storeId",
                    success: function(o) {
                        var n = t.data, s = o.data;
                        wx.request({
                            url: a + "skmembermodel/findWechatUserById",
                            data: {
                                wechatUserId: n,
                                wechatUserStoreStoreInfoStoreId: s
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                e.setData({
                                    findWechatUserById: t.data
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    selCouponByReceive: function() {
        wx.getStorage({
            key: "userId",
            success: function(t) {
                wx.getStorage({
                    key: "storeId",
                    success: function(o) {
                        wx.request({
                            url: a + "skcouponmodel/selCouponByReceive",
                            data: {
                                userId: t.data,
                                applyStoreId: o.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                var o = t.data.length;
                                e.setData({
                                    couponCnt1: o,
                                    selCouponByReceive: t.data
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    selCouponByApply: function() {
        wx.getStorage({
            key: "userId",
            success: function(t) {
                wx.getStorage({
                    key: "storeId",
                    success: function(o) {
                        wx.getStorage({
                            key: "companyId",
                            success: function(n) {
                                wx.request({
                                    url: a + "skcouponmodel/selCouponByApply",
                                    data: {
                                        userId: t.data,
                                        applyStoreId: o.data,
                                        companyId: n.data
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(t) {
                                        var o = t.data.length;
                                        e.setData({
                                            couponCnt: o,
                                            selCouponByApply: t.data
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
    selEquityCardWX: function() {
        wx.getStorage({
            key: "companyId",
            success: function(t) {
                wx.getStorage({
                    key: "storeId",
                    success: function(o) {
                        wx.request({
                            url: a + "skmembermodel/selEquityCardWX",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                companyId: t.data,
                                storeId: o.data
                            },
                            success: function(t) {
                                e.setData({
                                    isExistenceForce: t.data.isExistence,
                                    selEquityCardWX: t.data
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    findAllMenuStorePower: function() {
        wx.getStorage({
            key: "storeId",
            success: function(t) {
                wx.request({
                    url: a + "sksystemmodel/findAllMenuStorePower",
                    data: {
                        menuStorePowerStoreinfoStoreId: t.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        for (var o in t.data) if ("会员" == t.data[o].buttonName) {
                            var a = t.data[o].menuStorePowerisShow, n = t.data[o].menuStorePowerisUser;
                            e.setData({
                                vipShowFlg: a,
                                vipUseFlg: n
                            });
                        } else if ("权益卡" == t.data[o].buttonName) {
                            var s = t.data[o].menuStorePowerisShow, c = t.data[o].menuStorePowerisUser;
                            e.setData({
                                forceShowFlg: s,
                                forceUseFlg: c
                            });
                        } else if ("摇一摇" == t.data[o].buttonName) {
                            var r = t.data[o].menuStorePowerisShow;
                            e.setData({
                                shakeShowFlg: r
                            });
                        } else if ("拼团" == t.data[o].buttonName) {
                            var d = t.data[o].menuStorePowerisShow;
                            e.setData({
                                pintuanFlg: d
                            });
                        }
                        e.setData({
                            findAllMenuStorePower: t.data
                        });
                    }
                });
            }
        });
    },
    resendIndex: function(o) {
        console.log(o), wx.request({
            url: a + "skstoremodel/findCompanyByAppid",
            data: {
                xcxAppid: t.globalData.appId
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.setStorage({
                    key: "companyInfo",
                    data: t.data
                }), wx.setStorage({
                    key: "companyId",
                    data: t.data.companyInfoId
                }), e.setData({
                    companyId: t.data.companyInfoId
                });
            }
        }), e.data.secondIn ? wx.getStorage({
            key: "userId",
            success: function(t) {
                var a = t.data;
                e.directLoad(o, a);
            }
        }) : wx.login({
            success: function(n) {
                console.log("====wx.login success====");
                n.code;
                if (n.code) {
                    console.log("====get code===="), console.log("res.code ==> " + n.code);
                    var s = n.code;
                    wx.getSetting({
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
                                            AppID: t.globalData.appId,
                                            Secret: t.globalData.Secret,
                                            storeUuid: o,
                                            wxUserNickName: n.userInfo.nickName,
                                            headImgUrl: e.data.userInfo.avatarUrl
                                        },
                                        method: "POST",
                                        header: {
                                            "content-type": "application/x-www-form-urlencoded"
                                        },
                                        success: function(t) {
                                            if (null != t.data.openid && "" != t.data.openid) {
                                                t.data.wechatUser;
                                                var a = t.data.wechatUser.wechatUserId;
                                                wx.setStorage({
                                                    key: "openId",
                                                    data: t.data.openid
                                                }), wx.setStorage({
                                                    key: "userId",
                                                    data: t.data.wechatUser.wechatUserId
                                                }), wx.setStorage({
                                                    key: "storeId",
                                                    data: o
                                                }), e.directLoad(o, a);
                                            } else wx.showToast({
                                                title: "登录失败"
                                            });
                                        }
                                    });
                                },
                                fali: function(e) {
                                    console.log("====wx.login fail====");
                                }
                            }) : (console.log("======未授权"), wx.getStorage({
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
                                            });
                                            var a = t.data[0].storeInfoHeadImgUrl;
                                            wx.reLaunch({
                                                url: "../welcome/accredit/accredit?data=" + s + "&store_uuid=" + o + "&imgurl=" + a + "&goUser=true",
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
                            }));
                        },
                        fail: function(e) {
                            console.log("====wx.getSetting fail====");
                        }
                    });
                } else console.log("获取用户登录态失败！" + n.errMsg);
            },
            fail: function(e) {
                console.log("====wx.login fail===="), console.log("错误信息"), console.log(e);
            }
        });
    },
    directLoad: function(e, t) {
        wx.getStorage({
            key: "connectedSocket",
            success: function(e) {
                e.data ? console.log("============已有socket不连接=============") : o.conSocket(t);
            }
        }), wx.getStorage({
            key: "companyId",
            success: function(o) {
                wx.request({
                    url: a + "skmembermodel/updatVipCardStore",
                    data: {
                        wechatUserId: t,
                        wechatUserStoreStoreInfoStoreId: e,
                        companyId: o.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(n) {
                        wx.request({
                            url: a + "skmembermodel/updatEquitycardStore",
                            data: {
                                wxUserId: t,
                                storeId: e,
                                companyId: o.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(e) {
                                console.log(e.data);
                            }
                        });
                    }
                });
            }
        });
    },
    loadOther: function() {
        o.setStoreInfoName(e), e.setData({
            isVip: !0
        }), t.getUserInfo(function(t) {
            e.setData({
                userInfo: t
            });
        }), wx.getStorage({
            key: "menus",
            success: function(t) {
                e.setData({
                    menus: t.data
                });
            }
        }), o.setStoreId(e), o.setStoreInfo(e), wx.getStorage({
            key: "companyId",
            success: function(t) {
                e.setData({
                    companyId: t.data
                }), wx.request({
                    url: a + "skmembermodel/findVipCardBy",
                    data: {
                        companyId: t.data,
                        storeId: e.data.storeId
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        var o = t.data;
                        e.setData({
                            isExistenceVip: o.isExistence
                        });
                    }
                });
            }
        }), e.selCouponByReceive(), e.selCouponByApply(), console.log("=============可领取优惠券数量============"), 
        console.log(e.data.couponCnt), e.selOperationRecord(), e.selEquityCardWX(), e.findAllMenuStorePower();
    },
    checkCollage: function() {
        wx.navigateTo({
            url: "../collage/collage"
        });
    },
    myCollage: function() {
        wx.navigateTo({
            url: "../collage/myCollage/myCollage"
        });
    },
    naviToOther: function() {
        if (e.data.isVip) wx.navigateToMiniProgram({
            appId: "wx019c4828f5156688"
        }); else {
            if (!e.data.isExistenceVip) return void wx.showModal({
                title: "无会员卡可领",
                content: ""
            });
            e.setData({
                toGoTuanGou: !0
            }), e.myCard();
        }
    }
});