var e, t = require("../../../utils/util.js"), a = getApp(), o = a.globalData.httpUrl;

a.globalData.testhttpUrl;

Page({
    data: {
        cartArr: [ {
            name: "man",
            value: "男",
            checked: "true"
        }, {
            name: "woman",
            value: "女"
        } ],
        age: 0,
        date: "请选择您的生日",
        time: "",
        sex: "男",
        userName: "",
        tele: "",
        cardName: "",
        cardNumber: "",
        cardId: "",
        httpUrl: o,
        hasClickedButton: !1
    },
    bindDateChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value);
        var o = Date.parse(t.formatTime(new Date()));
        e.setData({
            date: a.detail.value,
            time: o
        });
        var r = Date.parse(a.detail.value);
        e.setData({
            age: Math.floor((o - r) / 31104e6)
        });
    },
    radioChange: function(t) {
        console.log("radio发生change事件，携带value值为：", t.detail.value), console.log("e.detail.value：", t.detail.value), 
        e.setData({
            sex: t.detail.value
        });
    },
    bindKeyInputName: function(t) {
        e.setData({
            userName: t.detail.value
        }), console.log(e.data.userName);
    },
    bindKeyInputPhone: function(t) {
        e.setData({
            tele: t.detail.value
        }), console.log(e.data.tele);
    },
    onLoad: function(a) {
        e = this, t.getShareInfos(e, o), t.setStoreInfo(e), t.setStoreName(e), "0" == a.toGotoActive ? e.setData({
            toGotoActive: !0,
            toGoTuanGou: !1
        }) : "0" == a.toGoTuanGou ? e.setData({
            toGoTuanGou: !0,
            toGotoActive: !1
        }) : e.setData({
            toGotoActive: !1,
            toGoTuanGou: !1
        }), "0" == a.saoma ? e.setData({
            saoma: !0
        }) : e.setData({
            saoma: !1
        }), wx.getStorage({
            key: "userId",
            success: function(t) {
                wx.getStorage({
                    key: "storeId",
                    success: function(a) {
                        wx.request({
                            url: o + "skmembermodel/findWechatUserById",
                            data: {
                                wechatUserId: t.data,
                                wechatUserStoreStoreInfoStoreId: a.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                "v" == t.data.wechatUserStoreIdentity ? wx.redirectTo({
                                    url: "receiveMyCard/receiveMyCard"
                                }) : wx.request({
                                    url: o + "skcouponmodel/selCouponByReceive",
                                    data: {
                                        userId: t.data,
                                        applyStoreId: a.data
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(t) {
                                        console.log(t.data), e.setData({
                                            couponCnt: t.data.length
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "companyId",
            success: function(t) {
                e.setData({
                    companyId: t.data
                }), wx.getStorage({
                    key: "storeId",
                    success: function(a) {
                        e.setData({
                            storeId: a.data
                        }), wx.request({
                            url: o + "skmembermodel/findVipCardBy",
                            data: {
                                companyId: t.data,
                                storeId: a.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                e.setData({
                                    cardInfos: t.data
                                });
                                var a = t.data.color;
                                e.chengeColor(a);
                            }
                        });
                    }
                });
            }
        });
        var r = t.formatDate(new Date()), s = "1950-" + t.formatDate(new Date()).split("-")[1] + "-" + t.formatDate(new Date()).split("-")[2];
        e.setData({
            zuijiao: r,
            startTime: s
        }), wx.getStorage({
            key: "cardId",
            success: function(t) {
                e.setData({
                    cardId: t.data
                });
            }
        }), console.log("cardName ==> " + e.data.cardName), console.log("cardId ==> " + e.data.cardId), 
        e.initMemberInfo();
    },
    onReady: function() {},
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.onSocketMessage(function(a) {
            console.log("===========接收到服务器信息=============="), console.log(a.data), t.getTkInfos(e, a);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    t.conSocket(e.data);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        t.closeSock();
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
    receiveMyCard: function(t) {
        var a = t.detail.formId;
        console.log(a);
        var r = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, s = /[0-9]/, d = e.data.tele, c = e.data.date, n = e.data.sex, i = e.data.userName, u = e.data.age;
        if (!e.data.hasClickedButton) {
            if (null == d || "" == d) return e.setData({
                popErrorMsg: "联系电话不能为空"
            }), void e.ohShitfadeOut();
            if (!r.test(d)) return e.setData({
                popErrorMsg: "电话号码错误"
            }), void e.ohShitfadeOut();
            if ("" == i || null == i) return e.setData({
                popErrorMsg: "用户名不能为空"
            }), void e.ohShitfadeOut();
            if (s.test(i)) return e.setData({
                popErrorMsg: "用户名不能为数字"
            }), void e.ohShitfadeOut();
            if ("" == n || null == n) return e.setData({
                popErrorMsg: "请选择性别"
            }), void e.ohShitfadeOut();
            if ("请选择您的生日" == c) return e.setData({
                popErrorMsg: "请选择出生日期"
            }), void e.ohShitfadeOut();
            if (u < 0) return e.setData({
                popErrorMsg: "请选择正确出生日期"
            }), void e.ohShitfadeOut();
            e.setData({
                hasClickedButton: !0
            }), wx.getStorage({
                key: "userId",
                success: function(t) {
                    wx.getStorage({
                        key: "storeId",
                        success: function(r) {
                            wx.request({
                                url: o + "skmembermodel/updateWechatUserBecomeMember",
                                data: {
                                    wechatUserId: t.data,
                                    wechatUserName: e.data.userName,
                                    wechatUserAge: e.data.age,
                                    wechatUserPhoneNum: e.data.tele,
                                    wechatUserBirthday: e.data.date,
                                    wechatUserSex: e.data.sex,
                                    vipCardId: e.data.cardId,
                                    wechatUserStoreStoreInfoStoreId: r.data,
                                    formId: a
                                },
                                method: "POST",
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                success: function(t) {
                                    wx.showToast({
                                        title: "领取成功",
                                        duration: 2e3,
                                        icon: "success",
                                        success: function() {
                                            e.setData({
                                                hasClickedButton: !1
                                            }), e.data.toGotoActive ? e.data.saoma ? wx.redirectTo({
                                                url: "../../active/active?saoma=0&secondIn=1"
                                            }) : wx.redirectTo({
                                                url: "../../active/active?secondIn=1"
                                            }) : e.data.toGoTuanGou ? (wx.navigateToMiniProgram({
                                                appId: "wxe89bfe0adae77728"
                                            }), wx.redirectTo({
                                                url: "../myCard/receiveMyCard/receiveMyCard?hasReceived=1"
                                            })) : wx.redirectTo({
                                                url: "../myCard/receiveMyCard/receiveMyCard?hasReceived=1"
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    ohShitfadeOut: function() {
        var t = setTimeout(function() {
            e.setData({
                popErrorMsg: ""
            }), clearTimeout(t);
        }, 3e3);
    },
    chengeColor: function(t) {
        "Color010" == t && e.setData({
            chengedColor: "#63b359"
        }), "Color020" == t && e.setData({
            chengedColor: "#2c9f67"
        }), "Color030" == t && e.setData({
            chengedColor: "#509fc9"
        }), "Color040" == t && e.setData({
            chengedColor: "#5885cf"
        }), "Color050" == t && e.setData({
            chengedColor: "#9062c0"
        }), "Color060" == t && e.setData({
            chengedColor: "#d09a45"
        }), "Color070" == t && e.setData({
            chengedColor: "#e4b138"
        }), "Color080" == t && e.setData({
            chengedColor: "#ee903c"
        }), "Color081" == t && e.setData({
            chengedColor: "#f08500"
        }), "Color082" == t && e.setData({
            chengedColor: "#a9d92d"
        }), "Color090" == t && e.setData({
            chengedColor: "#dd6549"
        }), "Color100" == t && e.setData({
            chengedColor: "#cc463d"
        }), "Color101" == t && e.setData({
            chengedColor: "#cf3e36"
        }), "Color102" == t && e.setData({
            chengedColor: "#5E6671"
        });
    },
    initMemberInfo: function() {
        wx.getStorage({
            key: "userId",
            success: function(a) {
                wx.getStorage({
                    key: "storeId",
                    success: function(r) {
                        wx.request({
                            url: o + "skmembermodel/selEquitycardByWX",
                            data: {
                                userId: a.data,
                                storeId: r.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(a) {
                                if (a.data.isExistence) wx.getStorage({
                                    key: "userId",
                                    success: function(t) {
                                        wx.getStorage({
                                            key: "storeId",
                                            success: function(a) {
                                                wx.request({
                                                    url: o + "skmembermodel/findWechatUserById",
                                                    data: {
                                                        wechatUserId: t.data,
                                                        wechatUserStoreStoreInfoStoreId: a.data
                                                    },
                                                    method: "POST",
                                                    header: {
                                                        "content-type": "application/x-www-form-urlencoded"
                                                    },
                                                    success: function(t) {
                                                        var a = e.data.cartArr;
                                                        e.setData({
                                                            cartArr: a,
                                                            age: t.data.wechatUserAge,
                                                            date: t.data.wechatUserBirthday,
                                                            tele: t.data.wechatUserPhoneNum,
                                                            userName: t.data.wechatUserName,
                                                            sex: t.data.wechatUserSex
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }); else {
                                    var r = e.data.cartArr, s = Date.parse(t.formatTime(new Date()));
                                    e.setData({
                                        date: "1990-01-01",
                                        time: s
                                    });
                                    var d = Date.parse(e.data.date);
                                    e.setData({
                                        cartArr: r,
                                        age: Math.floor((s - d) / 31104e6),
                                        date: "1990-01-01",
                                        tele: "",
                                        userName: "",
                                        sex: "男"
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    },
    goToUser: function() {
        wx.switchTab({
            url: "../user"
        });
    }
});