var e, a = require("../../../utils/wx_x_config.js"), t = require("../../../utils/util.js"), o = getApp(), n = o.globalData.appId, s = o.globalData.httpUrl;

Page({
    data: {
        tipTitle: "充值活动：",
        displayFlg: "none",
        money: 0,
        hasMore: !1,
        getedMore: !1,
        allowToClick: !0,
        allowToPay: !0
    },
    fixNull: function(e) {
        return null == e && (e = 0), e;
    },
    fixNulls: function(e) {
        return null == e && (e = ""), e;
    },
    onLoad: function(a) {
        e = this, t.getShareInfos(e, s), t.setCompanyId(e, a), t.setStoreId(e), e.findWechatUserById();
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
    rechargeMoney: function(a) {
        var t = a.detail.value;
        (t = (t = (t = (t = t.replace(/[^\d.]/g, "")).replace(/\.{2,}/g, ".")).replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")).replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3")).indexOf(".") < 0 && "" != t && (t = parseFloat(t)), 
        e.setData({
            money: t
        });
    },
    recharge: function() {
        "v" == e.data.findWechatUserById.wechatUserStoreIdentity ? e.setData({
            displayFlg: "block"
        }) : wx.showModal({
            title: "提示",
            content: "您没有会员卡不能充值"
        });
    },
    cancel: function() {
        e.setData({
            displayFlg: "none"
        });
    },
    wxPay: function(t) {
        var o = this;
        e.data.allowToClick ? (e.setData({
            displayFlg: "none",
            allowToClick: !1
        }), setTimeout(function() {
            e.setData({
                allowToClick: !0
            });
            var t = o.data.storeId, l = o.data.userId, d = (1 * o.data.money).toFixed(2);
            if (e.setData({
                money: d
            }), null != d && "" != d) if (d < 0) wx.showModal({
                title: "",
                content: "充值金额必须为正"
            }); else if (d > 1e4) wx.showModal({
                title: "",
                content: "单次充值不可多于1万元"
            }); else if (0 != d) {
                var c = a.getWxPayOrdrID();
                e.setData({
                    companyOrderNumber: c
                }), wx.request({
                    url: s + "skmembermodel/wxPay",
                    data: {
                        wx_user_uuid: l,
                        order_a_num: c,
                        order_a_money: d,
                        appid: n,
                        storeId: t
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(a) {
                        console.log("支付调用 == >"), console.log(a.data), e.doWxPay(a.data, l, t, d);
                    }
                });
            } else wx.showModal({
                title: "",
                content: "充值金额不可为0"
            }); else wx.showModal({
                title: "",
                content: "充值金额不能为空"
            });
        }, 100)) : e.setData({
            displayFlg: "none"
        });
    },
    doWxPay: function(a, t, o, n) {
        console.log("param:" + a), console.log("nonceStr:" + a.nonceStr), console.log("wx_user_uuid:" + t), 
        console.log("store_uuid:" + o), console.log("money:" + n), e.data.allowToPay && (e.setData({
            allowToPay: !1
        }), wx.requestPayment({
            timeStamp: a.timeStamp,
            nonceStr: a.nonceStr,
            package: a.package,
            signType: "MD5",
            paySign: a.paySign,
            success: function(a) {
                e.setData({
                    sofFlg: "s"
                });
                e.updatebBalance("s");
            },
            fail: function(a) {
                console.log("支付失败"), console.log(a), e.setData({
                    sofFlg: "f"
                });
                e.updatebBalance("f");
            }
        }));
    },
    updatebBalance: function(a) {
        var t = e.data.storeId, o = e.data.userId, n = (1 * e.data.money).toFixed(2);
        e.setData({
            balanceAdd: n
        }), wx.request({
            url: s + "skmembermodel/updatebBalanceNew",
            data: {
                wxUserUuid: o,
                balanceAdd: n,
                storeUuid: t,
                sofFlg: a,
                companyOrderNumber: e.data.companyOrderNumber
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                if (e.setData({
                    allowToPay: !0
                }), "s" == e.data.sofFlg) {
                    a.data.jifen;
                    wx.showModal({
                        title: "支付成功",
                        success: function(e) {
                            e.confirm ? wx.switchTab({
                                url: "../../index/index"
                            }) : e.cancel && wx.switchTab({
                                url: "../../index/index"
                            });
                        }
                    });
                } else wx.switchTab({
                    url: "../../index/index"
                });
            }
        });
    },
    findWechatUserById: function() {
        wx.getStorage({
            key: "userId",
            success: function(a) {
                e.setData({
                    userId: a.data
                }), wx.getStorage({
                    key: "storeId",
                    success: function(t) {
                        e.setData({
                            storeId: t.data
                        }), wx.request({
                            url: s + "skmembermodel/findWechatUserById",
                            data: {
                                wechatUserId: a.data,
                                wechatUserStoreStoreInfoStoreId: t.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(a) {
                                e.setData({
                                    findWechatUserById: a.data,
                                    wechatUserStoreBalance: a.data.wechatUserStoreBalance
                                });
                                var t = a.data.vipCardId;
                                e.getvipCardRuleWX(t);
                            }
                        });
                    }
                });
            }
        });
    },
    getvipCardRuleWX: function(a) {
        wx.request({
            url: s + "skmembermodel/getvipCardRuleWX",
            data: {
                vipcardId: a
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                var t = a.data, o = [];
                for (var n in t) o[n] = t[n].ruleType;
                t.length > 5 && e.setData({
                    hasMore: !0
                }), e.setData({
                    getvipCardRuleWX: a.data,
                    ruleType: o
                });
            }
        });
    },
    getMoreTip: function() {
        e.data.getedMore ? e.setData({
            getedMore: !1
        }) : e.setData({
            getedMore: !0
        });
    }
});