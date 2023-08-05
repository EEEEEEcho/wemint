var e, o = require("../../../../utils/wx_x_config.js"), t = require("../../../../utils/util.js"), a = getApp(), d = a.globalData.httpUrl, s = a.globalData.appId;

Page({
    data: {
        orderPayType: "",
        discountFlg: "",
        displ2: "none",
        displ: "none",
        selectedCoupon: "",
        bkclor: "#444",
        clor: "#ffbf20",
        bkclor1: "#444",
        clor1: "#ffbf20",
        httpUrl: d,
        coupon: "选择优惠",
        yhprice: 0,
        peisongfei: 0,
        canhefei: 0,
        allowToClick: !0,
        allowToPay: !0,
        allowToPay1: !0,
        discountRange: "",
        wmFlg: !0,
        dcFlg: !0,
        ydFlg: !0,
        payed: !1,
        foods: [],
        storeInfo: {},
        destineInfo: {
            date: "",
            time: "",
            tableType: "",
            mealsNumber: "",
            contants: "",
            contantsNumber: ""
        },
        orderDetail: "",
        orderAddr: "",
        orderContactName: "",
        orderContactTel: "",
        couponName: "",
        derateMoney: "",
        couponId: ""
    },
    choseTxtColor: function(e) {
        var o = e.currentTarget.dataset.id;
        this.setData({
            id: o
        });
    },
    selAddr: function(e) {
        wx.navigateTo({
            url: "../selAddr/selAddr?selId=0&addressType=0"
        });
    },
    selAddr1: function(e) {
        wx.navigateTo({
            url: "../selAddr/selAddr?selId=1&addressType=1"
        });
    },
    selYouhui: function() {
        wx.setStorage({
            key: "discountFlg",
            data: e.data.discountFlg
        }), wx.getStorage({
            key: "userId",
            success: function(o) {
                wx.getStorage({
                    key: "storeId",
                    success: function(t) {
                        wx.request({
                            url: d + "skmembermodel/findWechatUserById",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                wechatUserId: o.data,
                                wechatUserStoreStoreInfoStoreId: t.data
                            },
                            success: function(o) {
                                o.data ? "v" == o.data.wechatUserStoreIdentity ? e.setData({
                                    cardId: o.data.cardId,
                                    displ: "block"
                                }) : wx.showModal({
                                    title: "提示",
                                    content: "您没有会员卡不能使用优惠"
                                }) : wx.showModal({
                                    title: "未获取会员信息",
                                    content: ""
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    selCoupon: function() {
        e.setData({
            displ: "none"
        }), wx.setStorage({
            key: "recoverCouponInfo",
            data: {
                selectedCoupon: e.data.selectedCoupon,
                yhprice: e.data.yhprice,
                discountFlg: e.data.discountFlg
            }
        }), wx.navigateTo({
            url: "selCoupon/selCoupon"
        });
    },
    selMemberCard: function() {
        wx.getStorage({
            key: "userId",
            success: function(o) {
                wx.request({
                    url: d + "skmembermodel/findVipCardById",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        userId: o.data,
                        cardId: e.data.cardId
                    },
                    success: function(o) {
                        o.data ? wx.getStorage({
                            key: "foodInfo",
                            success: function(t) {
                                t.data.orderRealPrice;
                                var a = t.data.orderReceivablePrice, d = o.data.discount;
                                null != d && void 0 != d && "" != d || (d = 10);
                                var s = a - a * d / 10;
                                console.log("以优惠价格======>" + s);
                                var n = s.toFixed(2);
                                console.log("以优惠价格======>" + n), null != n && void 0 != n && "" != n || (n = 0), 
                                e.setData({
                                    selectedCoupon: "会员卡" + d + "折",
                                    displ: "none",
                                    yhprice: n,
                                    discountFlg: "V"
                                });
                                var r = o.data.discount;
                                null != r && void 0 != r && "" != r || (d = 10, e.setData({
                                    selectedCoupon: "无折扣"
                                }));
                            }
                        }) : wx.showModal({
                            title: "未获取会员卡信息",
                            content: ""
                        });
                    }
                });
            }
        });
    },
    selForceCard: function() {
        wx.getStorage({
            key: "userId",
            success: function(o) {
                wx.getStorage({
                    key: "storeId",
                    success: function(t) {
                        wx.request({
                            url: d + "skmembermodel/selEquitycardByWX",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                userId: o.data,
                                storeId: t.data
                            },
                            success: function(o) {
                                "Y" == o.data.isEquitycard ? "1" == o.data.state ? wx.showModal({
                                    title: "权益卡已过期",
                                    content: "请重新领取"
                                }) : wx.getStorage({
                                    key: "foodInfo",
                                    success: function(t) {
                                        t.data.orderRealPrice;
                                        var a = t.data.orderReceivablePrice, d = o.data.discount;
                                        null != d && void 0 != d && "" != d || (d = 10);
                                        var s = a - a * d / 10;
                                        console.log("以优惠价格======>" + s);
                                        var n = s.toFixed(2);
                                        console.log("以优惠价格======>" + n), null != n && void 0 != n && "" != n || (n = 0), 
                                        e.setData({
                                            selectedCoupon: "权益卡" + d + "折",
                                            displ: "none",
                                            yhprice: n,
                                            discountFlg: "Q"
                                        });
                                        var r = o.data.discount;
                                        null != r && void 0 != r && "" != r || (d = 10, e.setData({
                                            selectedCoupon: "无折扣"
                                        }));
                                    }
                                }) : wx.showModal({
                                    title: "您没有权益卡",
                                    content: "无法使用权益卡优惠"
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    toPay: function(t) {
        e.data.allowToClick ? (e.setData({
            displ2: "none",
            allowToClick: !1
        }), setTimeout(function() {
            e.setData({
                allowToClick: !0
            });
            var a = 1 * e.data.foodInfo.orderReceivablePrice + 1 * e.data.peisongfei + 1 * e.data.canhefei - 1 * e.data.yhprice, n = t.currentTarget.dataset.id;
            if (e.setData({
                money: a,
                orderPayType: n
            }), "B" == n ? e.setData({
                jiekouming: "addBonusHistory"
            }) : e.setData({
                jiekouming: "paymentCallback"
            }), null != a && "" != a) if (a <= 0) wx.showModal({
                title: "",
                content: "支付金额必须为正"
            }); else {
                var r = o.getWxPayOrdrID();
                if (e.setData({
                    companyOrderNumber: r
                }), wx.setStorage({
                    key: "derateMoney",
                    data: e.data.yhprice
                }), "W" == n) console.log(e.data.wx_user_uuid), console.log(o.getWxPayOrdrID()), 
                console.log(a), console.log(s), console.log(e.data.store_uuid), wx.request({
                    url: d + "skmembermodel/wxPay",
                    data: {
                        wx_user_uuid: e.data.wx_user_uuid,
                        order_a_num: r,
                        order_a_money: a.toFixed(2),
                        appid: s,
                        storeId: e.data.store_uuid
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(o) {
                        var t = e.data.wx_user_uuid, d = e.data.store_uuid;
                        e.setData({
                            allowToPay: !1
                        }), e.doWxPay(o.data, t, d, a);
                    }
                }); else if ("B" == n) {
                    console.log("啊啊啊啊啊"), e.setData({
                        sofFlg: "s"
                    });
                    wx.getStorage({
                        key: "storeName",
                        success: function(o) {
                            wx.showModal({
                                title: "即将支付" + e.data.money.toFixed(2) + "元给" + o.data,
                                content: "确认支付吗",
                                success: function(o) {
                                    o.confirm && (e.setData({
                                        allowToPay: !1
                                    }), wx.getStorage({
                                        key: "userId",
                                        success: function(o) {
                                            wx.getStorage({
                                                key: "storeId",
                                                success: function(t) {
                                                    wx.request({
                                                        url: d + "skmembermodel/findWechatUserById",
                                                        data: {
                                                            wechatUserId: o.data,
                                                            wechatUserStoreStoreInfoStoreId: t.data
                                                        },
                                                        method: "POST",
                                                        header: {
                                                            "content-type": "application/x-www-form-urlencoded"
                                                        },
                                                        success: function(o) {
                                                            console.log("==========余额支付查询用户余额成功=========");
                                                            var t = o.data.wechatUserStoreBalance;
                                                            if (e.setData({
                                                                wechatUserStoreBalance: o.data.wechatUserStoreBalance
                                                            }), 1 * t < 1 * a) return wx.showToast({
                                                                title: "余额不足",
                                                                icon: "loading",
                                                                duration: 1e3
                                                            }), void e.setData({
                                                                allowToPay: !0
                                                            });
                                                            e.addBonusHistory("s");
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }));
                                }
                            });
                        }
                    });
                }
            } else wx.showModal({
                title: "",
                content: "消费金额不能为空"
            });
        }, 100)) : e.setData({
            displ2: "none"
        });
    },
    doWxPay: function(o, t, a, d) {
        e.data.allowToPay1 && (e.setData({
            allowToPay1: !1
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
                e.addBonusHistory("s");
            },
            fail: function(o) {
                console.log("=========调用微信充值接口失败========="), console.log(o), e.setData({
                    sofFlg: "f"
                });
                e.addBonusHistory("f");
            }
        }));
    },
    addBonusHistory: function(o) {
        wx.getStorage({
            key: "orderId",
            success: function(t) {
                wx.getStorage({
                    key: "couponInfo",
                    success: function(a) {
                        wx.getStorage({
                            key: "orderType",
                            success: function(s) {
                                wx.request({
                                    url: d + "skordermodel/webSocketPush",
                                    data: {
                                        storeId: e.data.store_uuid,
                                        orderType: s.data
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(e) {
                                        console.log(e);
                                    },
                                    fail: function(o) {
                                        console.log(o), e.setData({
                                            allowToPay: !0
                                        });
                                    }
                                }), console.log("==========couponFlg============"), console.log(e.data.couponFlg), 
                                wx.request({
                                    url: d + "skmembermodel/" + e.data.jiekouming,
                                    method: "POST",
                                    data: {
                                        wxUserUuid: e.data.wx_user_uuid,
                                        storeUuid: e.data.store_uuid,
                                        realPrice: e.data.money.toFixed(2),
                                        reduceType: "X",
                                        orderType: s.data,
                                        orderId: t.data,
                                        orderPayType: e.data.orderPayType,
                                        couponFlg: e.data.couponFlg,
                                        couponId: a.data.couponId,
                                        code: a.data.code,
                                        discountFlg: e.data.discountFlg,
                                        companyOrderNumber: e.data.companyOrderNumber,
                                        sofFlg: o
                                    },
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(t) {
                                        if (e.setData({
                                            allowToPay1: !0
                                        }), "B" != e.data.orderPayType || "000000" == t.data.message) if (console.log("========回调成功=========="), 
                                        console.log(t.data), "s" == o) {
                                            var a = t.data.storeIntegeal;
                                            wx.getStorage({
                                                key: "userId",
                                                success: function(e) {
                                                    wx.getStorage({
                                                        key: "storeId",
                                                        success: function(o) {
                                                            wx.request({
                                                                url: d + "skmembermodel/findWechatUserById",
                                                                method: "POST",
                                                                header: {
                                                                    "content-type": "application/x-www-form-urlencoded"
                                                                },
                                                                data: {
                                                                    wechatUserId: e.data,
                                                                    wechatUserStoreStoreInfoStoreId: o.data
                                                                },
                                                                success: function(e) {
                                                                    "v" == e.data.wechatUserStoreIdentity && "" != a && null != a && "0" != a && void 0 != a && "undefined" != a ? wx.showModal({
                                                                        title: "支付成功",
                                                                        content: "送您" + a + "积分，点击确定前去评价，取消返回首页",
                                                                        success: function(e) {
                                                                            e.confirm ? wx.redirectTo({
                                                                                url: "paidOrder/paidOrder"
                                                                            }) : e.cancel && wx.switchTab({
                                                                                url: "../../../index/index"
                                                                            });
                                                                        }
                                                                    }) : wx.showModal({
                                                                        title: "支付成功",
                                                                        content: "点击确定前去评价，取消返回首页",
                                                                        success: function(e) {
                                                                            e.confirm ? wx.redirectTo({
                                                                                url: "paidOrder/paidOrder"
                                                                            }) : e.cancel && wx.switchTab({
                                                                                url: "../../../index/index"
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        } else wx.switchTab({
                                            url: "../../../index/index"
                                        }); else wx.showModal({
                                            title: "余额支付失败",
                                            content: "请联系后台管理员"
                                        });
                                    },
                                    fail: function(e) {
                                        console.log("========回调失败=========="), console.log(e);
                                    }
                                });
                            }
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
        wx.getStorage({
            key: "orderId",
            success: function(o) {
                wx.getStorage({
                    key: "orderType",
                    success: function(t) {
                        wx.request({
                            url: d + "skordermodel/getOrderById",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                id: o.data,
                                orderType: t.data
                            },
                            success: function(o) {
                                "6" != o.data.orderState ? "4" != o.data.orderState && "9" != o.data.orderState ? e.data.allowToPay ? e.setData({
                                    displ2: "block"
                                }) : wx.showModal({
                                    title: "不可重复支付",
                                    content: ""
                                }) : wx.showModal({
                                    title: "订单已支付，不可支付！",
                                    content: "",
                                    success: function(e) {
                                        e.confirm ? wx.switchTab({
                                            url: "../../order/order"
                                        }) : e.cancel && wx.switchTab({
                                            url: "../../order/order"
                                        });
                                    }
                                }) : wx.showModal({
                                    title: "订单被退回，不可支付！",
                                    content: "确定查询驳回信息",
                                    success: function(e) {
                                        e.confirm ? wx.redirectTo({
                                            url: "bohuiOrder/bohuiOrder"
                                        }) : e.cancel && wx.switchTab({
                                            url: "../../order/order"
                                        });
                                    }
                                });
                            }
                        }), console.log(t);
                    }
                });
            }
        });
    },
    resume: function(o) {
        e.data.allowToPay ? wx.getStorage({
            key: "orderId",
            success: function(e) {
                wx.getStorage({
                    key: "orderType",
                    success: function(o) {
                        var t = "";
                        "D" == o.data ? t = d + "skordermodel/updOrderInfo" : "W" == o.data ? t = d + "skordermodel/updTakeOutOrder" : "Y" == o.data && (t = d + "skordermodel/updReservedOrder"), 
                        wx.request({
                            url: t,
                            method: "POST",
                            data: {
                                orderState: "5",
                                id: e.data
                            },
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(e) {
                                console.log(e);
                            },
                            fail: function(e) {
                                console.log(e);
                            }
                        }), wx.switchTab({
                            url: "../../index"
                        });
                    }
                });
            }
        }) : wx.showModal({
            title: "订单支付中",
            content: "不可取消订单"
        });
    },
    back: function() {
        e.setData({
            displ: "none",
            displ2: "none"
        });
    },
    onLoad: function(o) {
        e = this, t.getShareInfos(e, d), t.setCompanyId(e, o), t.setStoreInfo(e), wx.getStorage({
            key: "submitFlg",
            success: function(t) {
                1 == t.data && (e.setData({
                    selectedCoupon: o.youhui,
                    yhprice: o.yhprice
                }), wx.setStorage({
                    key: "submitFlg",
                    data: "false"
                }));
            }
        }), console.log("===evalOrder onLoad start==="), wx.getStorage({
            key: "couponFlg",
            success: function(o) {
                e.setData({
                    couponFlg: o.data
                });
            },
            fail: function(o) {
                e.setData({
                    couponFlg: 0,
                    discountFlg: ""
                }), wx.setStorage({
                    key: "couponInfo",
                    data: {
                        couponName: "",
                        derateMoney: "",
                        couponId: "",
                        code: "",
                        miniMoney: "",
                        couponType: ""
                    }
                });
            }
        }), wx.getStorage({
            key: "storeInfo",
            success: function(o) {
                var t = o.data.storeInfoBoxPrice;
                null != t && "" != t && void 0 != t || (t = 0), wx.getStorage({
                    key: "wmFlg",
                    success: function(o) {
                        1 == o.data ? e.setData({
                            canhefei: t
                        }) : e.setData({
                            canhefei: 0
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "wmFlg",
            success: function(o) {
                o.data && wx.getStorage({
                    key: "deliveryPrice",
                    success: function(o) {
                        e.setData({
                            peisongfei: o.data
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "couponInfo",
            success: function(o) {
                e.setData({
                    couponInfo: o.data
                });
            }
        }), wx.getStorage({
            key: "storeId",
            success: function(o) {
                e.setData({
                    storeId: o.data,
                    store_uuid: o.data
                }), wx.getStorage({
                    key: "userId",
                    success: function(o) {
                        e.setData({
                            wx_user_uuid: o.data
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "couponInfo",
            success: function(o) {
                if ("" != o.data.couponType) {
                    var t = o.data.miniMoney, a = o.data.couponType;
                    "4" == a ? wx.getStorage({
                        key: "foodInfo",
                        success: function(a) {
                            var d = a.data.orderRealPrice;
                            a.data.orderReceivablePrice;
                            console.log("realPrice" + d), console.log("miniMoney" + t), console.log("selectedCoupon" + o.data.couponName), 
                            d >= t ? e.setData({
                                selectedCoupon: o.data.couponName,
                                yhprice: o.data.derateMoney,
                                discountFlg: "Y"
                            }) : wx.showModal({
                                title: "提示",
                                content: "未达到满减条件，请重新选择优惠券",
                                success: function(o) {
                                    wx.setStorage({
                                        key: "couponFlg",
                                        data: "0"
                                    }), e.setData({
                                        couponFlg: "0"
                                    }), o.confirm ? wx.navigateTo({
                                        url: "selCoupon/selCoupon"
                                    }) : (wx.getStorage({
                                        key: "recoverCouponInfo",
                                        success: function(o) {
                                            e.setData({
                                                selectedCoupon: o.data.selectedCoupon,
                                                yhprice: o.data.yhprice
                                            });
                                        }
                                    }), wx.getStorage({
                                        key: "discountFlg",
                                        success: function(o) {
                                            e.setData({
                                                discountFlg: o.data
                                            });
                                        }
                                    }));
                                }
                            });
                        }
                    }) : "2" == a && wx.getStorage({
                        key: "foodInfo",
                        success: function(a) {
                            var d = a.data.orderRealPrice, s = a.data.orderReceivablePrice;
                            if (d >= t) {
                                var n = s - s * o.data.derateMoney / 10;
                                console.log("以优惠价格======>" + n);
                                var r = n.toFixed(2);
                                console.log("以优惠价格======>" + r), null != r && void 0 != r && "" != r || (r = 0), 
                                e.setData({
                                    selectedCoupon: o.data.couponName,
                                    yhprice: r,
                                    discountFlg: "Y"
                                });
                            } else wx.showModal({
                                title: "提示",
                                content: "未达到满减条件，请重新选择优惠券",
                                success: function(o) {
                                    wx.setStorage({
                                        key: "couponFlg",
                                        data: "0"
                                    }), e.setData({
                                        couponFlg: 0
                                    }), o.confirm ? wx.navigateTo({
                                        url: "selCoupon/selCoupon"
                                    }) : (wx.getStorage({
                                        key: "recoverCouponInfo",
                                        success: function(o) {
                                            e.setData({
                                                selectedCoupon: o.data.couponName,
                                                yhprice: o.data.yhprice
                                            });
                                        }
                                    }), wx.getStorage({
                                        key: "discountFlg",
                                        success: function(o) {
                                            e.setData({
                                                discountFlg: o.data
                                            });
                                        }
                                    }));
                                }
                            });
                        }
                    });
                } else e.setData({
                    selectedCoupon: "",
                    yhprice: 0
                });
            }
        }), wx.getStorage({
            key: "deskNum",
            success: function(o) {
                e.setData({
                    deskNum: o.data
                });
            }
        }), wx.getStorage({
            key: "receiverNotes",
            success: function(o) {
                e.setData({
                    orderAddr: o.data.wechatUserAddressFullAddress,
                    orderContactName: o.data.wechatUserAddressReceiverName,
                    orderContactTel: o.data.wechatUserAddressReceiverPhoneNum
                });
            }
        }), wx.getStorage({
            key: "wmFlg",
            success: function(o) {
                o.data && wx.getStorage({
                    key: "beizhu",
                    success: function(o) {
                        e.setData({
                            orderDetail: o.data
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "dcFlg",
            success: function(o) {
                o.data && wx.getStorage({
                    key: "dcBeizhu",
                    success: function(o) {
                        e.setData({
                            orderDetail: o.data
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "wmFlg",
            success: function(o) {
                e.setData({
                    wmFlg: o.data
                });
            }
        }), wx.getStorage({
            key: "dcFlg",
            success: function(o) {
                e.setData({
                    dcFlg: o.data
                });
            }
        }), wx.getStorage({
            key: "storeInfo",
            success: function(o) {
                var t = o.data.storeInfoTelephoneNum;
                console.log("商户电话" + t), null == t && (o.data.storeInfoTelephoneNum = ""), console.log("商户电话" + o.data.storeInfoTelephoneNum), 
                e.setData({
                    storeInfo: o.data
                });
            }
        });
        var a = o.orderId, s = o.orderType;
        console.log("orderId  ==> " + a), console.log("orderType  ==> " + s), wx.getStorage({
            key: "ydFlg",
            success: function(o) {
                e.setData({
                    ydFlg: o.data
                }), 1 == o.data ? wx.getStorage({
                    key: "orderId",
                    success: function(o) {
                        wx.request({
                            url: d + "skordermodel/getOrderById",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                id: a,
                                orderType: s
                            },
                            success: function(o) {
                                if (console.log("走预定"), o.data) {
                                    e.setData({
                                        foodInfo: o.data,
                                        orderDate: o.data.reservedEstimatedTime.split(" ")[0].replace('"', ""),
                                        orderTime: o.data.reservedEstimatedTime.split(" ")[1].replace('"', ""),
                                        orderTable: o.data.tableName,
                                        orderPersonNumber: o.data.reservedCount,
                                        orderContractName: o.data.reservedName,
                                        orderContractTel: o.data.reservedPhoneNum
                                    }), wx.setStorage({
                                        key: "foodInfo",
                                        data: o.data
                                    }), wx.setStorage({
                                        key: "orderId",
                                        data: o.data.id
                                    }), console.log("预计到店时间 ==> " + o.data.reservedEstimatedTime);
                                    var t = new Date(o.data.reservedEstimatedTime.replace(/-/g, "/")).getTime() / 1e3;
                                    console.log("预计到店时间转换=====》" + t);
                                    var a = new Date().getTime() / 1e3;
                                    console.log("获取当前时间=====》" + a.toFixed(0));
                                    var d = (1 * t.toFixed(0) - 1 * a.toFixed(0) + 600).toFixed(0);
                                    if (console.log("获取当前时间=====》" + d), console.log("获取当前时间=====》" + d), d > 0) {
                                        var s = (c = d) - 60 * Math.floor(c / 60), n = Math.floor(c - 3600 * Math.floor(c / 3600)) / 60, r = Math.floor(c / 3600);
                                        e.setData({
                                            seconds: c,
                                            minute: n,
                                            second: s,
                                            hour: r
                                        });
                                        e.countDown();
                                    } else {
                                        var c = 600, s = c - 60 * Math.floor(c / 60), n = Math.floor(c - 3600 * Math.floor(c / 3600)) / 60, r = Math.floor(c / 3600);
                                        e.setData({
                                            seconds: 600,
                                            minute: 10,
                                            second: 0,
                                            hour: 0
                                        });
                                        e.countDown();
                                    }
                                } else wx.showModal({
                                    title: "未获取预定单信息",
                                    content: ""
                                });
                            }
                        });
                    }
                }) : (console.log("orderId ==>" + a), wx.request({
                    url: d + "skordermodel/getOrderById",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        id: a,
                        orderType: s
                    },
                    success: function(o) {
                        console.log("走点餐和外卖"), o.data ? (console.log(o.data), e.setData({
                            foodInfo: o.data,
                            deskNum: o.data.orderTableId
                        }), wx.setStorage({
                            key: "foodInfo",
                            data: o.data
                        }), wx.setStorage({
                            key: "orderId",
                            data: o.data.id
                        }), console.log("===evalOrder onLoad end===")) : wx.showModal({
                            title: "未获取点单信息",
                            content: ""
                        });
                    }
                }));
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
        e = this, wx.onSocketMessage(function(o) {
            console.log("===========接收到服务器信息=============="), console.log(o.data), "orderPaid" == o.data && (wx.showToast({
                title: "您有订单已支付"
            }), wx.switchTab({
                url: "../../../index/index"
            })), t.getTkInfos(e, o);
        }), e = this, wx.onSocketClose(function() {
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
    countDown: function() {
        var e = this, o = e.data.seconds, t = e.data.hour, a = e.data.minute, s = e.data.second;
        if (o > 0) var n = setTimeout(function() {
            s = (o -= 1) - 60 * Math.floor(o / 60), a = Math.floor((o - 3600 * Math.floor(o / 3600)) / 60), 
            t = Math.floor(o / 3600), e.setData({
                seconds: o,
                hour: t,
                minute: a,
                second: s
            });
            e.countDown();
        }, 1e3); else e.setData({
            hour: 0,
            minute: 0,
            second: 0
        }), clearTimeout(n), o = 0, wx.getStorage({
            key: "orderId",
            success: function(e) {
                wx.request({
                    url: d + "skordermodel/updReservedOrder",
                    data: {
                        orderState: "5",
                        id: e.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        wx.showModal({
                            title: "提示",
                            content: "订单已自动取消",
                            success: function() {
                                wx.switchTab({
                                    url: "../../index"
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});