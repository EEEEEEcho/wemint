var e, s = require("../../../../../utils/util.js"), d = getApp().globalData.httpUrl;

Page({
    data: {
        shouhuo: "我的",
        displ: "none",
        selectedCoupon: "",
        bkclor: "#444",
        clor: "#ffbf20",
        bkclor1: "#444",
        clor1: "#ffbf20",
        beizhu: "",
        yhprice: 0,
        receiveUser: "",
        receiveAddr: "",
        receiveTel: "",
        coupon: "选择优惠",
        foods: [],
        storeInfo: "",
        peisongfei: 0,
        canhefei: 0
    },
    choseTxtColor: function(e) {
        var s = e.currentTarget.dataset.id;
        this.setData({
            id: s
        });
    },
    selAddr: function(s) {
        "Ta收货" != e.data.shouhuo ? wx.navigateTo({
            url: "../selAddr/selAddr?selId=1&addressType=1"
        }) : wx.navigateTo({
            url: "../selAddr/selAddr?selId=0&addressType=0"
        });
    },
    selAddr1: function(s) {
        console.log(e.data.shouhuo), "Ta收货" == e.data.shouhuo ? (e.setData({
            shouhuo: "我的"
        }), e.selMorenTa()) : (e.setData({
            shouhuo: "Ta收货"
        }), e.selMoren());
    },
    selYouhui: function() {
        e.setData({
            displ: "block"
        });
    },
    selCoupon: function() {
        e.setData({
            displ: "none"
        }), wx.navigateTo({
            url: "../../../../index/order/evalOrder/selCoupon/selCoupon"
        });
    },
    back: function() {
        e.setData({
            displ: "none"
        });
    },
    selMemberCard: function() {
        wx.getStorage({
            key: "companyId",
            success: function(s) {
                wx.getStorage({
                    key: "storeId",
                    success: function(r) {
                        wx.request({
                            url: d + "skmembermodel/findVipCardBy",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                companyId: s.data,
                                storeId: r.data
                            },
                            success: function(s) {
                                s.data.cardId ? wx.getStorage({
                                    key: "userId",
                                    success: function(r) {
                                        wx.request({
                                            url: d + "skmembermodel/findVipCardById",
                                            method: "POST",
                                            header: {
                                                "content-type": "application/x-www-form-urlencoded"
                                            },
                                            data: {
                                                userId: r.data,
                                                cardId: s.data.cardId
                                            },
                                            success: function(s) {
                                                wx.getStorage({
                                                    key: "foodInfo",
                                                    success: function(d) {
                                                        var r = d.data.foodList;
                                                        console.log("===selMemberCard findVipCardById==="), console.log(r);
                                                        var t = 0;
                                                        for (var a in r) "0" == r[a].discountFlg && (t += 1 * r[a].realPrice);
                                                        var o = s.data.discount;
                                                        null != o && void 0 != o && "" != o || (o = 10), console.log("realPrice======>" + t), 
                                                        console.log("resi.data.realPrice======>" + d.data.realPrice);
                                                        var c = d.data.orderReceivablePrice - 1 * d.data.orderRealPrice + t * (1 - o / 10);
                                                        console.log("以优惠价格======>" + c);
                                                        var n = c.toFixed(2);
                                                        console.log("以优惠价格======>" + n), null != n && void 0 != n && "" != n || (n = 0), 
                                                        d.data.orderRealPrice = (1 * d.data.orderReceivablePrice - 1 * n).toFixed(2), console.log("orderRealPrice======>" + d.data.orderRealPrice), 
                                                        e.setData({
                                                            selectedCoupon: "会员卡" + o + "折",
                                                            displ: "none",
                                                            yhprice: n,
                                                            foodInfo: d.data
                                                        }), console.log(e.data.foodInfo), wx.setStorage({
                                                            key: "couponInfo",
                                                            data: {
                                                                couponName: "",
                                                                derateMoney: o,
                                                                couponId: "",
                                                                code: "",
                                                                miniMoney: "",
                                                                couponType: "2"
                                                            }
                                                        });
                                                        var i = s.data.discount;
                                                        null != i && void 0 != i && "" != i || (o = 10, e.setData({
                                                            selectedCoupon: "无折扣"
                                                        }));
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }) : wx.showModal({
                                    title: "提示",
                                    content: "您没有会员卡不能使用会员卡权益"
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    selForceCard: function() {
        wx.showModal({
            title: "提示",
            content: "暂时没有权益卡功能"
        }), e.setData({
            selectedCoupon: ""
        });
    },
    onLoad: function(r) {
        e = this, s.getShareInfos(e, d), s.setCompanyId(e, r), s.setStoreId(e), wx.getStorage({
            key: "deliveryPrice",
            success: function(s) {
                e.setData({
                    peisongfei: 0
                });
            }
        }), wx.getStorage({
            key: "storeInfo",
            success: function(s) {
                var d = s.data.storeInfoBoxPrice;
                null != d && "" != d && void 0 != d || (d = 0), e.setData({
                    canhefei: d
                });
            }
        });
        var t = r.orderId, a = r.orderType;
        console.log("orderId ==> " + t), console.log("orderType ==> " + a), wx.request({
            url: d + "skordermodel/getOrderById",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                id: t,
                orderType: a
            },
            success: function(s) {
                console.log(s.data), e.setData({
                    foodInfo: s.data
                }), wx.setStorage({
                    key: "foodInfo",
                    data: s.data
                }), wx.setStorage({
                    key: "orderId",
                    data: t
                }), wx.setStorage({
                    key: "orderType",
                    data: a
                }), wx.getStorage({
                    key: "couponInfo",
                    success: function(s) {
                        if (s.data) {
                            var d = s.data.miniMoney, r = s.data.couponType;
                            "4" == r ? wx.getStorage({
                                key: "foodInfo",
                                success: function(r) {
                                    var t = r.data.foodList;
                                    console.log("===selMemberCard findVipCardById==="), console.log(t);
                                    var a = 0;
                                    for (var o in t) "0" == t[o].discountFlg && (a += 1 * t[o].realPrice);
                                    var c = s.data.derateMoney;
                                    if (null != c && void 0 != c && "" != c || (c = 0), a >= d) {
                                        var n = r.data.orderReceivablePrice - 1 * r.data.orderRealPrice + c;
                                        console.log("以优惠价格======>" + n);
                                        var i = n.toFixed(2);
                                        console.log("以优惠价格======>" + i), null != i && void 0 != i && "" != i || (i = 0), 
                                        r.data.orderRealPrice = (1 * r.data.orderReceivablePrice - 1 * i).toFixed(2), e.setData({
                                            selectedCoupon: s.data.couponName,
                                            yhprice: i,
                                            foodInfo: r.data
                                        });
                                    } else wx.showModal({
                                        title: "提示",
                                        content: "未达到满减条件，请重新选择优惠券"
                                    }), e.setData({
                                        selectedCoupon: "",
                                        yhprice: 0
                                    });
                                }
                            }) : "2" == r && wx.getStorage({
                                key: "foodInfo",
                                success: function(r) {
                                    var t = r.data.foodList;
                                    console.log("===selMemberCard findVipCardById==="), console.log(t);
                                    var a = 0;
                                    for (var o in t) "0" == t[o].discountFlg && (a += 1 * t[o].realPrice);
                                    var c = s.data.derateMoney;
                                    null != c && void 0 != c && "" != c || (c = 10);
                                    var n = r.data.orderReceivablePrice - 1 * r.data.orderRealPrice + a * (1 - c / 10);
                                    console.log("以优惠价格======>" + n);
                                    var i = n.toFixed(2);
                                    console.log("以优惠价格======>" + i), null != i && void 0 != i && "" != i || (i = 0), 
                                    r.data.orderRealPrice = (1 * r.data.orderReceivablePrice - 1 * i).toFixed(2), console.log("orderRealPrice======>" + r.data.orderRealPrice), 
                                    a >= d ? e.setData({
                                        selectedCoupon: s.data.couponName,
                                        yhprice: i,
                                        foodInfo: r.data
                                    }) : (wx.showModal({
                                        title: "提示",
                                        content: "未达到满减条件，请重新选择优惠券"
                                    }), e.setData({
                                        selectedCoupon: "",
                                        yhprice: 0
                                    }));
                                }
                            });
                        } else e.setData({
                            selectedCoupon: "",
                            yhprice: 0
                        });
                    }
                });
            }
        }), wx.setStorage({
            key: "beizhu",
            data: ""
        }), wx.getStorage({
            key: "storeId",
            success: function(s) {
                wx.request({
                    url: d + "skstoremodel/findStoreById",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        storeId: s.data
                    },
                    success: function(s) {
                        e.setData({
                            httpUrl: d,
                            storeInfo: s.data
                        });
                    }
                });
            }
        }), console.log("获取默认的收货地址" + r.selCoupon), r.selCoupon ? r.selCoupon || e.selAddr1() : e.selAddr1();
    },
    onReady: function() {},
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.onSocketMessage(function(d) {
            console.log("===========接收到服务器信息=============="), console.log(d.data), s.getTkInfos(e, d);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    s.conSocket(e.data);
                }
            });
        }), wx.getStorage({
            key: "receiverNotes",
            success: function(s) {
                var d = s.data.wechatUserAddressAddress;
                void 0 == d && (d = ""), console.log("返回后获取新的默认地址" + s.data.wechatUserAddressReceiverName), 
                console.log("返回后获取新的默认地址" + d), e.setData({
                    receiveUser: s.data.wechatUserAddressReceiverName,
                    receiveAddr: d + s.data.wechatUserAddressFullAddress,
                    receiveTel: s.data.wechatUserAddressReceiverPhoneNum,
                    addressId: s.data.addressId
                }), "" == e.data.addressId ? (e.setData({
                    peisongfei: 0
                }), wx.setStorage({
                    key: "deliveryPrice",
                    data: 0
                })) : wx.getStorage({
                    key: "deliveryPrice",
                    success: function(s) {
                        e.setData({
                            peisongfei: s.data
                        });
                    }
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {
        s.closeSock();
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
    toSubmit: function() {
        wx.setStorage({
            key: "wmFlg",
            data: !0
        }), wx.setStorage({
            key: "dcFlg",
            data: !1
        }), wx.setStorage({
            key: "ydFlg",
            data: !1
        }), console.log("===toSubmit start==="), wx.getStorage({
            key: "receiverNotes",
            success: function(s) {
                var r = s.data.wechatUserAddressReceiverName, t = s.data.wechatUserAddressFullAddress, a = s.data.wechatUserAddressAddress, o = s.data.wechatUserAddressReceiverPhoneNum;
                "" != t ? "" != r && "" != o && "" != a ? wx.getStorage({
                    key: "receiverNotes",
                    success: function(s) {
                        wx.getStorage({
                            key: "orderId",
                            success: function(r) {
                                wx.request({
                                    url: d + "skordermodel/updTakeOutOrder",
                                    data: {
                                        addressId: s.data.addressId,
                                        orderRemarke: e.data.beizhu,
                                        id: r.data
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(s) {
                                        wx.getStorage({
                                            key: "orderId",
                                            success: function(s) {
                                                wx.getStorage({
                                                    key: "orderType",
                                                    success: function(d) {
                                                        wx.setStorage({
                                                            key: "submitFlg",
                                                            data: !0
                                                        }), wx.redirectTo({
                                                            url: "../evalOrder?orderId=" + s.data + "&orderType=" + d.data + "&youhui=" + e.data.selectedCoupon + "&yhprice=" + e.data.yhprice
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
                }) : wx.showModal({
                    title: "提醒",
                    content: "请选择收货信息"
                }) : wx.showModal({
                    title: "提醒",
                    content: "请选择详细收货地址",
                    success: function(s) {
                        s.confirm && e.selAddr();
                    }
                });
            }
        });
    },
    inputBeizhu: function(s) {
        e.setData({
            beizhu: s.detail.value
        }), wx.setStorage({
            key: "beizhu",
            data: s.detail.value
        });
    },
    selMoren: function() {
        wx.getStorage({
            key: "userId",
            success: function(s) {
                wx.getStorage({
                    key: "storeId",
                    success: function(r) {
                        wx.request({
                            url: d + "skmembermodel/getAddress",
                            data: {
                                wechatUserAddressWechatUserId: s.data,
                                storeId: r.data,
                                wechatUserAddressIsDefault: "1",
                                identification: "1"
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(s) {
                                for (var d = s.data[0], r = (s.data[1], 0); r < d.length; r++) if ("1" == d[r].wechatUserAddressIsDefault && "Y" == d[r].isWithin) wx.setStorage({
                                    key: "deliveryPrice",
                                    data: d[r].deliveryPrice
                                }), e.setData({
                                    receiveUser: d[r].wechatUserAddressReceiverName,
                                    receiveAddr: d[r].wechatUserAddressAddress + d[r].wechatUserAddressFullAddress,
                                    receiveTel: d[r].wechatUserAddressReceiverPhoneNum,
                                    addressId: d[r].wechatUserAddressId,
                                    peisongfei: d[r].deliveryPrice
                                }), wx.setStorage({
                                    key: "receiverNotes",
                                    data: {
                                        wechatUserAddressReceiverName: d[r].wechatUserAddressReceiverName,
                                        wechatUserAddressReceiverPhoneNum: d[r].wechatUserAddressReceiverPhoneNum,
                                        wechatUserAddressFullAddress: d[r].wechatUserAddressFullAddress,
                                        addressId: d[r].wechatUserAddressId,
                                        wechatUserAddressAddress: d[r].wechatUserAddressAddress
                                    }
                                }); else if ("1" == d[r].wechatUserAddressIsDefault && "N" == d[r].isWithin) {
                                    for (var t = [], a = 0; a < d.length; a++) "0" == d[a].wechatUserAddressIsDefault && "Y" == d[a].isWithin && t.push(d[a]);
                                    console.log("======linshiAddress========"), console.log(t), t.length > 0 ? (wx.setStorage({
                                        key: "deliveryPrice",
                                        data: t[0].deliveryPrice
                                    }), e.setData({
                                        receiveUser: t[0].wechatUserAddressReceiverName,
                                        receiveAddr: t[0].wechatUserAddressAddress + d[r].wechatUserAddressFullAddress,
                                        receiveTel: t[0].wechatUserAddressReceiverPhoneNum,
                                        addressId: t[0].wechatUserAddressId,
                                        peisongfei: t[0].deliveryPrice
                                    }), wx.setStorage({
                                        key: "receiverNotes",
                                        data: {
                                            wechatUserAddressReceiverName: t[0].wechatUserAddressReceiverName,
                                            wechatUserAddressReceiverPhoneNum: t[0].wechatUserAddressReceiverPhoneNum,
                                            wechatUserAddressFullAddress: t[0].wechatUserAddressFullAddress,
                                            addressId: t[0].wechatUserAddressId,
                                            wechatUserAddressAddress: t[0].wechatUserAddressAddress
                                        }
                                    })) : e.selAddress("我的地址不在配送范围内，请添加地址！");
                                }
                            }
                        });
                    }
                });
            }
        });
    },
    selMorenTa: function() {
        wx.getStorage({
            key: "userId",
            success: function(s) {
                wx.getStorage({
                    key: "storeId",
                    success: function(r) {
                        wx.request({
                            url: d + "skmembermodel/getAddress",
                            data: {
                                wechatUserAddressWechatUserId: s.data,
                                storeId: r.data,
                                wechatUserAddressIsDefault: "1",
                                identification: "1"
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(s) {
                                s.data[0];
                                for (var d = s.data[1], r = 0; r < d.length; r++) "1" == d[r].wechatUserAddressIsDefault && "Y" == d[r].isWithin ? (wx.setStorage({
                                    key: "deliveryPrice",
                                    data: d[r].deliveryPrice
                                }), e.setData({
                                    receiveUser: d[r].wechatUserAddressReceiverName,
                                    receiveAddr: d[r].wechatUserAddressAddress + d[r].wechatUserAddressFullAddress,
                                    receiveTel: d[r].wechatUserAddressReceiverPhoneNum,
                                    addressId: d[r].wechatUserAddressId,
                                    peisongfei: d[r].deliveryPrice
                                }), wx.setStorage({
                                    key: "receiverNotes",
                                    data: {
                                        wechatUserAddressReceiverName: d[r].wechatUserAddressReceiverName,
                                        wechatUserAddressReceiverPhoneNum: d[r].wechatUserAddressReceiverPhoneNum,
                                        wechatUserAddressFullAddress: d[r].wechatUserAddressFullAddress,
                                        addressId: d[r].wechatUserAddressId
                                    }
                                })) : "1" == d[r].wechatUserAddressIsDefault && "N" == d[r].isWithin && e.selAddress("Ta的默认地址不在配送范围内，请选择地址！");
                                0 == d.length && e.selAddress("暂无Ta的默认地址!");
                            }
                        });
                    }
                });
            }
        });
    },
    selAddress: function(s) {
        wx.showModal({
            title: "提示",
            content: s
        }), e.setData({
            receiveUser: "",
            receiveAddr: "",
            receiveTel: "",
            addressId: ""
        }), wx.setStorage({
            key: "receiverNotes",
            data: {
                wechatUserAddressReceiverName: "",
                wechatUserAddressReceiverPhoneNum: "",
                wechatUserAddressFullAddress: "",
                addressId: ""
            }
        });
    }
});