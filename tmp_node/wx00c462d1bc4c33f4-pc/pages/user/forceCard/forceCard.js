var e, a = require("../../../utils/util.js"), t = require("../../../utils/wx_x_config.js"), o = getApp(), r = o.globalData.httpUrl, s = (o.globalData.testhttpUrl, 
o.globalData.appId);

Page({
    data: {
        valueMr: "1990-04-09",
        displ3: "none",
        cartArr: [ {
            name: "man",
            value: "男"
        }, {
            name: "woman",
            value: "女"
        } ],
        age: 0,
        date: "请选择您的生日",
        time: "",
        sex: "",
        userName: "",
        tele: "",
        cardName: "至尊七折卡",
        cardStatus: "未开通",
        payStyle: "支付",
        httpUrl: r,
        allowToPay: !0
    },
    bindDateChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value);
        var o = Date.parse(a.formatTime(new Date()));
        e.setData({
            date: t.detail.value,
            time: o
        });
        var r = Date.parse(t.detail.value);
        e.setData({
            age: Math.floor((o - r) / 31104e6)
        });
    },
    radioChange: function(a) {
        console.log("radio发生change事件，携带value值为：", a.detail.value), console.log("e.detail.value：", a.detail.value), 
        e.setData({
            sex: a.detail.value
        });
    },
    bindKeyInputName: function(a) {
        e.setData({
            userName: a.detail.value
        }), console.log(e.data.userName);
    },
    bindKeyInputPhone: function(a) {
        e.setData({
            tele: a.detail.value
        }), console.log(e.data.tele);
    },
    onLoad: function(t) {
        e = this, a.getShareInfos(e, r), a.setCompanyId(e, t), a.setStoreId(e), a.setStoreInfo(e), 
        a.setStoreName(e), a.setUserId(e), wx.getStorage({
            key: "toPayMoney",
            success: function(a) {
                e.setData({
                    toPayMoney: a.data
                });
            }
        }), wx.getStorage({
            key: "forceCardName",
            success: function(a) {
                e.setData({
                    cardName: a.data
                });
            }
        }), wx.getStorage({
            key: "activateTime",
            success: function(a) {
                e.setData({
                    activateTime: a.data
                });
            }
        }), wx.getStorage({
            key: "overTime",
            success: function(a) {
                e.setData({
                    overTime: a.data
                });
            }
        }), wx.getStorage({
            key: "forceCardTypeId",
            success: function(a) {
                e.setData({
                    forceCardTypeId: a.data
                });
            }
        }), wx.getStorage({
            key: "companyId",
            success: function(a) {
                wx.getStorage({
                    key: "storeId",
                    success: function(t) {
                        wx.request({
                            url: r + "skmembermodel/selEquityCardWX",
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                companyId: a.data,
                                storeId: t.data
                            },
                            success: function(a) {
                                var t = a.data.color;
                                e.chengeColor(t), e.setData({
                                    cardInfos: a.data,
                                    forceCardId: a.data.id
                                });
                            }
                        });
                    }
                });
            }
        });
        var o = a.formatDate(new Date()), s = "1950-" + a.formatDate(new Date()).split("-")[1] + "-" + a.formatDate(new Date()).split("-")[2];
        e.setData({
            zuijiao: o,
            startTime: s
        }), console.log("cardName ==> " + e.data.cardName), console.log("cardId ==> " + e.data.cardId);
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
    receiveMyCard: function(a) {
        var t = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, o = /[0-9]/, r = e.data.tele, s = e.data.date, d = e.data.sex, n = e.data.userName, c = e.data.age;
        return null == r || "" == r ? (e.setData({
            popErrorMsg: "联系电话不能为空"
        }), void e.ohShitfadeOut()) : t.test(r) ? "" == n || null == n ? (e.setData({
            popErrorMsg: "用户名不能为空"
        }), void e.ohShitfadeOut()) : o.test(n) ? (e.setData({
            popErrorMsg: "用户名不能为数字"
        }), void e.ohShitfadeOut()) : "" == d || null == d ? (e.setData({
            popErrorMsg: "请选择性别"
        }), void e.ohShitfadeOut()) : "请选择您的生日" == s ? (e.setData({
            popErrorMsg: "请选择出生日期"
        }), void e.ohShitfadeOut()) : c < 0 ? (e.setData({
            popErrorMsg: "请选择正确出生日期"
        }), void e.ohShitfadeOut()) : void e.setData({
            displ3: "block"
        }) : (e.setData({
            popErrorMsg: "电话号码错误"
        }), void e.ohShitfadeOut());
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
            var o = e.data.storeId, d = e.data.userId, n = a.currentTarget.dataset.orderPayType;
            e.setData({
                orderPayType: n
            }), "B" == n ? e.setData({
                jiekouming: "receiveEquitycard"
            }) : e.setData({
                jiekouming: "newReceiveEquitycard"
            });
            var c = e.data.toPayMoney;
            if ("W" == n) {
                var l = t.getWxPayOrdrID();
                e.setData({
                    companyOrderNumber: l
                }), wx.request({
                    url: r + "skmembermodel/wxPay",
                    data: {
                        wx_user_uuid: d,
                        order_a_num: l,
                        order_a_money: c,
                        appid: s,
                        storeId: o
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(a) {
                        console.log("支付调用 == >"), console.log(a.data), e.doWxPay(a.data, d, o, c);
                    }
                });
            } else if ("B" == n) {
                e.setData({
                    sofFlg: "s"
                });
                wx.getStorage({
                    key: "storeName",
                    success: function(a) {
                        wx.getStorage({
                            key: "forceCardTypeId",
                            success: function(t) {
                                wx.request({
                                    url: r + "skmembermodel/selEquitycardByIdWX",
                                    data: {
                                        id: t.data
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(t) {
                                        wx.showModal({
                                            title: "即将支付" + c + "元给" + a.data,
                                            content: "确认支付吗",
                                            success: function(a) {
                                                if (a.confirm) {
                                                    if (1 * t.data.vipCardSum - 1 * t.data.vipCardUsedSum < 1) return void wx.showModal({
                                                        title: "该卡已售罄",
                                                        content: "请选择其它权益卡购买"
                                                    });
                                                    wx.getStorage({
                                                        key: "userId",
                                                        success: function(a) {
                                                            wx.getStorage({
                                                                key: "storeId",
                                                                success: function(t) {
                                                                    wx.request({
                                                                        url: r + "skmembermodel/findWechatUserById",
                                                                        data: {
                                                                            wechatUserId: a.data,
                                                                            wechatUserStoreStoreInfoStoreId: t.data
                                                                        },
                                                                        method: "POST",
                                                                        header: {
                                                                            "content-type": "application/x-www-form-urlencoded"
                                                                        },
                                                                        success: function(a) {
                                                                            var t = a.data.wechatUserStoreBalance;
                                                                            e.setData({
                                                                                wechatUserStoreBalance: a.data.wechatUserStoreBalance
                                                                            }), 1 * t < 1 * c ? wx.showToast({
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
    doWxPay: function(a, t, o, s) {
        e.data.allowToPay && (e.setData({
            allowToPay: !1
        }), wx.getStorage({
            key: "forceCardTypeId",
            success: function(t) {
                wx.request({
                    url: r + "skmembermodel/selEquitycardByIdWX",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        id: t.data
                    },
                    success: function(t) {
                        1 * t.data.vipCardSum - 1 * t.data.vipCardUsedSum < 1 ? wx.showModal({
                            title: "该卡已售罄",
                            content: "请选择其它权益卡购买"
                        }) : wx.requestPayment({
                            timeStamp: a.timeStamp,
                            nonceStr: a.nonceStr,
                            package: a.package,
                            signType: "MD5",
                            paySign: a.paySign,
                            success: function(a) {
                                e.setData({
                                    sofFlg: "s"
                                });
                                e.receiveEquitycard("s");
                            },
                            fail: function(a) {
                                console.log("支付失败"), console.log(a), e.setData({
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
    receiveEquitycard: function(a) {
        wx.getStorage({
            key: "userId",
            success: function(t) {
                wx.request({
                    url: r + "skmembermodel/" + e.data.jiekouming,
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        equityCardTypeId: e.data.forceCardTypeId,
                        equityCardId: e.data.forceCardId,
                        wxUserId: t.data,
                        payType: e.data.orderPayType,
                        money: e.data.toPayMoney,
                        storeId: e.data.storeId,
                        wechatUserName: e.data.userName,
                        wechatUserAge: e.data.age,
                        wechatUserPhoneNum: e.data.tele,
                        wechatUserBirthday: e.data.date,
                        wechatUserSex: e.data.sex,
                        wechatUserStoreIdentity: "f",
                        formId: e.data.formId,
                        sofFlg: a,
                        outTradeNo: e.data.companyOrderNumber
                    },
                    success: function(a) {
                        e.setData({
                            allowToPay: !0
                        }), "B" != e.data.orderPayType || 1 == a.data ? 1 == a.data && "s" == e.data.sofFlg ? wx.showModal({
                            title: "支付成功",
                            content: "您已购买" + e.data.cardName,
                            success: function(e) {
                                e.confirm, wx.redirectTo({
                                    url: "alterForceCard/alterForceCard"
                                });
                            }
                        }) : wx.switchTab({
                            url: "../../user/user"
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
    },
    ohShitfadeOut: function() {
        var a = setTimeout(function() {
            e.setData({
                popErrorMsg: ""
            }), clearTimeout(a);
        }, 3e3);
    },
    chengeColor: function(a) {
        "Color010" == a && e.setData({
            chengedColor: "#63b359"
        }), "Color020" == a && e.setData({
            chengedColor: "#2c9f67"
        }), "Color030" == a && e.setData({
            chengedColor: "#509fc9"
        }), "Color040" == a && e.setData({
            chengedColor: "#5885cf"
        }), "Color050" == a && e.setData({
            chengedColor: "#9062c0"
        }), "Color060" == a && e.setData({
            chengedColor: "#d09a45"
        }), "Color070" == a && e.setData({
            chengedColor: "#e4b138"
        }), "Color080" == a && e.setData({
            chengedColor: "#ee903c"
        }), "Color081" == a && e.setData({
            chengedColor: "#f08500"
        }), "Color082" == a && e.setData({
            chengedColor: "#a9d92d"
        }), "Color090" == a && e.setData({
            chengedColor: "#dd6549"
        }), "Color100" == a && e.setData({
            chengedColor: "#cc463d"
        }), "Color101" == a && e.setData({
            chengedColor: "#cf3e36"
        }), "Color102" == a && e.setData({
            chengedColor: "#5E6671"
        });
    }
});