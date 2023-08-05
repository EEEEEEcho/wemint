var e, t = require("../../../../utils/wx_x_config.js"), a = require("../../../../utils/util.js"), o = getApp(), d = o.globalData.httpUrl, r = o.globalData.appId;

Page({
    data: {
        chengedColor: "#666",
        cardName: "权益卡",
        cardStatus: "未开通",
        httpUrl: d,
        noteTitle: "使用须知：",
        forceTitle: "特权介绍：",
        displ3: "none",
        clicked: !1,
        allowToPay: !0
    },
    onLoad: function(t) {
        e = this, a.getShareInfos(e, d), a.setCompanyId(e, t), a.setStoreId(e), a.setStoreInfo(e), 
        a.setStoreName(e), a.setUserId(e), wx.getStorage({
            key: "companyId",
            success: function(t) {
                wx.getStorage({
                    key: "storeId",
                    success: function(a) {
                        wx.request({
                            url: d + "skmembermodel/selEquityCardWX",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                companyId: t.data,
                                storeId: a.data
                            },
                            success: function(t) {
                                e.setData({
                                    cardInfos: t.data,
                                    note: t.data.title,
                                    forceCardId: t.data.id,
                                    forceCards: t.data.vipcardTypeBeanList,
                                    cardName: t.data.title
                                }), wx.setStorage({
                                    key: "forceCardId",
                                    data: t.data.id
                                });
                            }
                        });
                    }
                });
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
            console.log("===========接收到服务器信息=============="), console.log(t.data), a.getTkInfos(e, t);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    a.conSocket(e.data);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        a.closeSock();
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
    radioChange: function(t) {
        var a = e.data.forceCards, o = t.currentTarget.dataset.index, d = a[o].money, r = a[o].id, n = a[o].effectiveStartDate, c = a[o].effectiveEndDate, s = a[o].vipCardName;
        wx.setStorage({
            key: "forceCardName",
            data: s
        }), wx.setStorage({
            key: "activateTime",
            data: n
        }), wx.setStorage({
            key: "overTime",
            data: c
        }), wx.setStorage({
            key: "toPayMoney",
            data: d
        }), wx.setStorage({
            key: "forceCardTypeId",
            data: r
        }), e.setData({
            toPayMoney: d,
            forceCardTypeId: r,
            clicked: !0
        });
    },
    receiveMyCard: function(t) {
        e.radioChange(t), e.data.clicked ? wx.getStorage({
            key: "userId",
            success: function(t) {
                wx.getStorage({
                    key: "storeId",
                    success: function(a) {
                        wx.request({
                            url: d + "skmembermodel/findWechatUserById",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                wechatUserId: t.data,
                                wechatUserStoreStoreInfoStoreId: a.data
                            },
                            success: function(t) {
                                "v" == t.data.wechatUserStoreIdentity ? e.setData({
                                    displ3: "block"
                                }) : wx.redirectTo({
                                    url: "../forceCard"
                                });
                            }
                        });
                    }
                });
            }
        }) : wx.showModal({
            title: "",
            content: "请先选择权益卡"
        });
    },
    back: function() {
        e.setData({
            displ3: "none"
        });
    },
    toPay: function(a) {
        var o = a.detail.formId;
        e.setData({
            formId: o
        }), console.log(o), e.setData({
            displ3: "none"
        }), setTimeout(function() {
            var o = e.data.storeId, n = e.data.userId, c = a.currentTarget.dataset.orderPayType;
            e.setData({
                orderPayType: c
            }), "B" == c ? e.setData({
                jiekouming: "receiveEquitycard"
            }) : e.setData({
                jiekouming: "newReceiveEquitycard"
            });
            var s = e.data.toPayMoney;
            if ("W" == c) {
                var i = t.getWxPayOrdrID();
                e.setData({
                    companyOrderNumber: i
                }), wx.request({
                    url: d + "skmembermodel/wxPay",
                    data: {
                        wx_user_uuid: n,
                        order_a_num: i,
                        order_a_money: s,
                        appid: r,
                        storeId: o
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        console.log("支付调用 == >"), console.log(t.data), e.doWxPay(t.data, n, o, s);
                    }
                });
            } else if ("B" == c) {
                e.setData({
                    sofFlg: "s"
                });
                wx.getStorage({
                    key: "storeName",
                    success: function(t) {
                        wx.getStorage({
                            key: "forceCardTypeId",
                            success: function(a) {
                                wx.request({
                                    url: d + "skmembermodel/selEquitycardByIdWX",
                                    data: {
                                        id: a.data
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(a) {
                                        wx.showModal({
                                            title: "即将支付" + s + "元给" + t.data,
                                            content: "确认支付吗",
                                            success: function(t) {
                                                if (t.confirm) {
                                                    if (1 * a.data.vipCardSum - 1 * a.data.vipCardUsedSum < 1) return void wx.showModal({
                                                        title: "该卡已售罄",
                                                        content: "请选择其它权益卡购买"
                                                    });
                                                    wx.getStorage({
                                                        key: "userId",
                                                        success: function(t) {
                                                            wx.getStorage({
                                                                key: "storeId",
                                                                success: function(a) {
                                                                    wx.request({
                                                                        url: d + "skmembermodel/findWechatUserById",
                                                                        data: {
                                                                            wechatUserId: t.data,
                                                                            wechatUserStoreStoreInfoStoreId: a.data
                                                                        },
                                                                        method: "POST",
                                                                        header: {
                                                                            "content-type": "application/x-www-form-urlencoded"
                                                                        },
                                                                        success: function(t) {
                                                                            var a = t.data.wechatUserStoreBalance;
                                                                            e.setData({
                                                                                wechatUserStoreBalance: t.data.wechatUserStoreBalance
                                                                            }), 1 * a < 1 * s ? wx.showToast({
                                                                                title: "余额不足",
                                                                                icon: "loading",
                                                                                duration: 1e3
                                                                            }) : e.receiveEquitycard("s");
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }, 100);
    },
    doWxPay: function(t, a, o, r) {
        e.data.allowToPay && (e.setData({
            allowToPay: !1
        }), wx.getStorage({
            key: "forceCardTypeId",
            success: function(a) {
                wx.request({
                    url: d + "skmembermodel/selEquitycardByIdWX",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        id: a.data
                    },
                    success: function(a) {
                        1 * a.data.vipCardSum - 1 * a.data.vipCardUsedSum < 1 ? wx.showModal({
                            title: "该卡已售罄",
                            content: "请选择其它权益卡购买"
                        }) : wx.requestPayment({
                            timeStamp: t.timeStamp,
                            nonceStr: t.nonceStr,
                            package: t.package,
                            signType: "MD5",
                            paySign: t.paySign,
                            success: function(t) {
                                e.setData({
                                    sofFlg: "s"
                                });
                                e.receiveEquitycard("s");
                            },
                            fail: function(t) {
                                console.log("支付失败"), console.log(t), e.setData({
                                    sofFlg: "f"
                                });
                                e.receiveEquitycard("f");
                            }
                        });
                    }
                });
            }
        }));
    },
    receiveEquitycard: function(t) {
        wx.getStorage({
            key: "userId",
            success: function(a) {
                wx.request({
                    url: d + "skmembermodel/" + e.data.jiekouming,
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        equityCardTypeId: e.data.forceCardTypeId,
                        equityCardId: e.data.forceCardId,
                        wxUserId: a.data,
                        payType: e.data.orderPayType,
                        money: e.data.toPayMoney,
                        storeId: e.data.storeId,
                        formId: e.data.formId,
                        sofFlg: t,
                        outTradeNo: e.data.companyOrderNumber
                    },
                    success: function(t) {
                        e.setData({
                            allowToPay: !0
                        }), "B" != e.data.orderPayType || 1 == t.data ? 1 == t.data && "s" == e.data.sofFlg ? wx.showModal({
                            title: "支付成功",
                            content: "您已购买" + e.data.cardName,
                            success: function(e) {
                                e.confirm, wx.redirectTo({
                                    url: "../alterForceCard/alterForceCard"
                                });
                            }
                        }) : wx.switchTab({
                            url: "../../../user/user"
                        }) : wx.showModal({
                            title: "余额支付失败",
                            content: "请联系后台管理员"
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
    }
});