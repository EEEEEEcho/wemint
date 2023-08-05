var e, o = require("../../../utils/wx_x_config.js"), t = require("../../../utils/util.js"), a = getApp(), n = (a.globalData.userInfo, 
a.globalData.httpUrl), c = a.globalData.appId;

Page({
    data: {
        discount: 10,
        displ3: "none",
        displ2: "none",
        coupon: !1,
        card: !1,
        forceCard: !1,
        money: "",
        discountFlg: "",
        storename: "",
        userId: "",
        storeId: "",
        orderPayType: "",
        httpUrl: n,
        couponType: "",
        couponName: "",
        derateMoney: 0,
        couponId: "",
        code: "",
        miniMoney: 0,
        collectMoney: 0,
        initMoney: 0,
        clickedCoupon: !1,
        allowToClick: !0,
        allowToPay: !0
    },
    moneyInput: function(e) {
        var o = this, t = e.detail.value;
        (t = (t = (t = (t = t.replace(/[^\d.]/g, "")).replace(/\.{2,}/g, ".")).replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")).replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3")).indexOf(".") < 0 && "" != t && (t = parseFloat(t)), 
        t >= o.data.miniMoney ? 1 == o.data.coupon && "4" == o.data.couponType ? (console.log("couponType4"), 
        o.setData({
            initMoney: t,
            money: t,
            collectMoney: (t - o.data.derateMoney).toFixed(2)
        }), wx.setStorage({
            key: "initMoney",
            data: t
        })) : 1 == o.data.coupon && "2" == o.data.couponType ? (console.log("that.data.derateMoney" + o.data.derateMoney), 
        o.setData({
            initMoney: t,
            money: t,
            collectMoney: (t * o.data.derateMoney / 10).toFixed(2)
        }), wx.setStorage({
            key: "initMoney",
            data: t
        })) : 1 == o.data.card ? (o.setData({
            initMoney: t,
            money: t,
            collectMoney: (t * o.data.discount / 10).toFixed(2)
        }), wx.setStorage({
            key: "initMoney",
            data: t
        })) : (console.log("未选择优惠券"), o.setData({
            initMoney: t,
            money: t,
            collectMoney: (1 * t).toFixed(2)
        }), wx.setStorage({
            key: "initMoney",
            data: t
        }), wx.setStorage({
            key: "collectMoney",
            data: o.data.collectMoney
        })) : (console.log("小于优惠"), o.setData({
            initMoney: t,
            money: t,
            collectMoney: (1 * t).toFixed(2)
        }), wx.setStorage({
            key: "initMoney",
            data: t
        }), wx.setStorage({
            key: "collectMoney",
            data: t
        }));
    },
    chooseCoupon: function(o) {
        "v" == e.data.findWechatUserById.wechatUserStoreIdentity ? (e.setData({
            coupon: e.data.coupon,
            card: e.data.card,
            displ3: "none",
            clickedCoupon: !1
        }), wx.navigateTo({
            url: "../../index/order/evalOrder/selCoupon/selCoupon"
        })) : wx.showModal({
            title: "提示",
            content: "您没有会员卡不能使用优惠券"
        });
    },
    chooseCard: function() {
        var o = e.data.findWechatUserById;
        "v" == o.wechatUserStoreIdentity ? wx.getStorage({
            key: "userId",
            success: function(t) {
                wx.request({
                    url: n + "skmembermodel/findVipCardById",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        userId: t.data,
                        cardId: o.cardId
                    },
                    success: function(o) {
                        var t = o.data.discount;
                        (1 * t <= 0 || "" == t || null == t) && (t = "10"), e.setData({
                            discount: t,
                            displ3: "none",
                            card: !0,
                            forceCard: !1,
                            coupon: !1,
                            discountFlg: "V",
                            couponId: o.data.id,
                            miniMoney: 0
                        }), wx.getStorage({
                            key: "initMoney",
                            success: function(o) {
                                e.setData({
                                    collectMoney: (1 * t * o.data / 10).toFixed(2)
                                });
                            }
                        });
                    }
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "您没有会员卡不能使用会员卡权益"
        });
    },
    chooseForceCard: function() {
        wx.getStorage({
            key: "userId",
            success: function(o) {
                wx.getStorage({
                    key: "storeId",
                    success: function(t) {
                        wx.request({
                            url: n + "skmembermodel/selEquitycardByWX",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                userId: o.data,
                                storeId: t.data
                            },
                            success: function(o) {
                                if ("Y" == o.data.isEquitycard) {
                                    if ("1" == o.data.state) return wx.showModal({
                                        title: "权益卡已过期",
                                        content: "请重新领取"
                                    }), !1;
                                    var t = o.data.discount;
                                    (null == t || "" == t || 1 * t <= 0) && (t = "10"), e.setData({
                                        discount: t,
                                        displ3: "none",
                                        card: !0,
                                        forceCard: !0,
                                        coupon: !1,
                                        discountFlg: "Q",
                                        couponId: o.data.id,
                                        miniMoney: 0
                                    }), wx.getStorage({
                                        key: "initMoney",
                                        success: function(o) {
                                            e.setData({
                                                collectMoney: (1 * t * o.data / 10).toFixed(2)
                                            });
                                        }
                                    });
                                } else wx.showModal({
                                    title: "您没有权益卡",
                                    content: "不能使用权益卡"
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    onLoad: function(o) {
        e = this, t.getShareInfos(e, n), e.findWechatUserById(), wx.getStorage({
            key: "avatarUrl",
            success: function(o) {
                e.setData({
                    userImgUrl: o.data
                });
            }
        }), wx.setStorage({
            key: "initMoney",
            data: e.data.collectMoney
        }), wx.setStorage({
            key: "wmFlg",
            data: !1
        }), wx.setStorage({
            key: "dcFlg",
            data: !1
        }), wx.setStorage({
            key: "ydFlg",
            data: !1
        }), t.setStoreInfo(e), t.setCompanyId(e, o), t.setStoreId(e), t.setUserId(e), t.setStoreName(e);
    },
    onReady: function() {},
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
        }), console.log("===onShow==="), e.data.clickedCoupon && wx.getStorage({
            key: "initMoney",
            success: function(o) {
                o.data >= e.data.miniMoney ? "4" == e.data.couponType ? e.setData({
                    collectMoney: (o.data - e.data.derateMoney).toFixed(2),
                    discountFlg: "Y"
                }) : "2" == e.data.couponType ? e.setData({
                    collectMoney: (o.data * e.data.derateMoney / 10).toFixed(2),
                    discountFlg: "Y"
                }) : (console.log("======initMoney  coupon=========" + o.data), e.setData({
                    coupon: e.data.coupon,
                    card: e.data.card,
                    forceCard: !1,
                    collectMoney: o.data,
                    discountFlg: ""
                })) : e.setData({
                    collectMoney: o.data,
                    discountFlg: ""
                });
            }
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
    wxPay: function(t) {
        var a = this;
        console.log("============微信支付开始=============="), e.data.allowToClick ? (e.setData({
            displ2: "none",
            allowToClick: !1
        }), setTimeout(function() {
            e.setData({
                allowToClick: !0
            });
            var d = e.data.money;
            console.log(d);
            if (null != d && "" != d) if (e.data.miniMoney > d && d > 0) wx.showModal({
                title: "未达到指定满减金额",
                content: "即将清除优惠信息",
                success: function(o) {
                    e.setData({
                        couponFlg: 0,
                        couponId: "",
                        discountFlg: "",
                        collectMoney: d,
                        money: d,
                        miniMoney: 0,
                        coupon: "",
                        card: !1,
                        displ3: "none",
                        clickedCoupon: !1,
                        derateMoney: 0
                    }), console.log("=========测试couponFlg==========="), console.log(e.data.couponFlg), 
                    wx.setStorage({
                        key: "couponInfo",
                        data: ""
                    }), wx.setStorage({
                        key: "couponFlg",
                        data: "0"
                    });
                }
            }); else if (0 != d) {
                var s = a.data.storeId, i = a.data.userId, l = t.currentTarget.dataset.id;
                e.setData({
                    orderPayType: l
                }), "B" == l ? e.setData({
                    jiekouming: "addBonusHistory"
                }) : e.setData({
                    jiekouming: "paymentCallback"
                });
                var r = e.data.derateMoney, u = e.data.couponType, y = e.data.coupon, g = e.data.card, p = e.data.discount;
                if (1 == y && "4" == u ? d = (e.data.money - r).toFixed(2) : 1 == y && "2" == u ? d = (e.data.money * r / 10).toFixed(2) : 1 == g && (d = (e.data.money * p / 10).toFixed(2)), 
                null != d && "" != d) if (d <= 0) wx.showModal({
                    title: "",
                    content: "支付金额必须为正"
                }); else {
                    r > 0 ? e.setData({
                        couponFlg: "1"
                    }) : e.setData({
                        couponFlg: "0"
                    }), console.log("=============couponFlg================="), console.log(e.data.couponFlg);
                    var w = o.getWxPayOrdrID();
                    if (e.setData({
                        companyOrderNumber: w
                    }), "W" == l) wx.request({
                        url: n + "skmembermodel/wxPay",
                        data: {
                            wx_user_uuid: i,
                            order_a_num: w,
                            order_a_money: d,
                            appid: c,
                            storeId: s
                        },
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        success: function(o) {
                            console.log("支付调用 == >"), console.log(o.data), e.doWxPay(o.data, i, s, d);
                        }
                    }); else if ("B" == l) {
                        e.setData({
                            sofFlg: "s"
                        });
                        wx.getStorage({
                            key: "storeName",
                            success: function(o) {
                                wx.showModal({
                                    title: "即将支付" + (1 * d).toFixed(2) + "元给" + o.data,
                                    content: "确认支付吗",
                                    success: function(o) {
                                        if (o.confirm) {
                                            var t = e.data.findWechatUserById.wechatUserStoreBalance;
                                            if (e.setData({
                                                wechatUserStoreBalance: t
                                            }), console.log("用户余额" + t), console.log("消费金额" + d), 1 * t < 1 * d) return void wx.showToast({
                                                title: "余额不足",
                                                icon: "loading",
                                                duration: 1e3
                                            });
                                            e.addBonusHistory(d, "s");
                                        }
                                    }
                                });
                            }
                        });
                    }
                } else wx.showModal({
                    title: "",
                    content: "消费金额不能为空"
                });
            } else wx.showModal({
                title: "",
                content: "消费不能为0"
            }); else wx.showModal({
                title: "提示",
                content: "消费金额不能为空！"
            });
        }, 100)) : e.setData({
            displ2: "none"
        });
    },
    doWxPay: function(o, t, a, n) {
        console.log("param:" + o), console.log("wx_user_uuid:" + t), console.log("store_uuid:" + a), 
        console.log("money:" + n), e.data.allowToPay && (e.setData({
            allowToPay: !1
        }), wx.requestPayment({
            timeStamp: o.timeStamp,
            nonceStr: o.nonceStr,
            package: o.package,
            signType: "MD5",
            paySign: o.paySign,
            success: function(o) {
                e.setData({
                    sofFlg: "s"
                });
                e.addBonusHistory(n, "s");
            },
            fail: function(o) {
                console.log("=========调用微信充值接口失败========="), console.log(o), e.setData({
                    sofFlg: "f"
                });
                e.addBonusHistory(n, "f");
            }
        }));
    },
    addBonusHistory: function(o, t) {
        wx.getStorage({
            key: "userId",
            success: function(a) {
                wx.getStorage({
                    key: "storeId",
                    success: function(c) {
                        wx.request({
                            url: n + "skmembermodel/" + e.data.jiekouming,
                            data: {
                                wxUserUuid: a.data,
                                storeUuid: c.data,
                                orderType: "S",
                                orderPayType: e.data.orderPayType,
                                couponFlg: e.data.couponFlg,
                                couponId: e.data.couponId,
                                code: e.data.code,
                                reduceType: "X",
                                realPrice: (1 * o).toFixed(2),
                                discountFlg: e.data.discountFlg,
                                receivablePrice: e.data.initMoney,
                                companyOrderNumber: e.data.companyOrderNumber,
                                sofFlg: t
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(o) {
                                if (e.setData({
                                    allowToPay: !0
                                }), "B" != e.data.orderPayType || "000000" == o.data.message) if ("s" == t) {
                                    console.log("wxPay走完");
                                    var a = o.data.storeIntegeal;
                                    "v" == e.data.findWechatUserById.wechatUserStoreIdentity && "" != a && null != a && "0" != a && void 0 != a && "undefined" != a ? wx.showModal({
                                        title: "支付成功",
                                        content: "消费后送您" + a + "积分",
                                        success: function(e) {
                                            e.confirm, wx.switchTab({
                                                url: "../../index/index"
                                            });
                                        }
                                    }) : wx.showModal({
                                        title: "支付成功",
                                        content: "",
                                        success: function(e) {
                                            e.confirm, wx.switchTab({
                                                url: "../../index/index"
                                            });
                                        }
                                    });
                                } else wx.switchTab({
                                    url: "../../index/index"
                                }); else wx.showModal({
                                    title: "余额支付失败",
                                    content: "请联系后台管理员"
                                });
                            },
                            fail: function(e) {
                                console.log(e);
                            }
                        });
                    }
                });
            },
            fail: function(e) {
                console.log("支付失败"), console.log(e), wx.showModal({
                    title: "支付失败",
                    content: e,
                    success: function() {
                        wx.switchTab({
                            url: "../../index/index"
                        });
                    }
                });
            }
        });
    },
    toPay1: function() {
        wx.navigateTo({
            url: "paidOrder/paidOrder"
        });
    },
    toPay2: function() {
        e.setData({
            displ2: "block"
        });
    },
    chooseYouhui: function() {
        console.log(e.data.initMoney), "" != e.data.initMoney ? e.setData({
            displ3: "block"
        }) : wx.showModal({
            title: "提示",
            content: "请输入金额"
        });
    },
    resume: function(e) {
        wx.switchTab({
            url: "../../index"
        });
    },
    back: function() {
        e.setData({
            displ: "none",
            displ2: "none",
            displ3: "none"
        });
    },
    findWechatUserById: function() {
        wx.getStorage({
            key: "userId",
            success: function(o) {
                wx.getStorage({
                    key: "storeId",
                    success: function(t) {
                        wx.request({
                            url: n + "skmembermodel/findWechatUserById",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                wechatUserId: o.data,
                                wechatUserStoreStoreInfoStoreId: t.data
                            },
                            success: function(o) {
                                e.setData({
                                    findWechatUserById: o.data
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});