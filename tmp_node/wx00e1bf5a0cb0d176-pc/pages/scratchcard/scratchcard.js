function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = getApp(), a = require("../../common.js"), n = require("../../components/utils/showPopus.js"), i = require("../../components/wxb.js"), o = null, s = [], r = [];

Page(t({
    url: !1,
    data: {
        baseUrl: e.globalData.siteBaseUrl,
        timestatus: 1,
        activityTime: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        canvas_isdraw: !1,
        canvas_width: 323,
        canvas_height: 140,
        show_width: 646,
        show_height: 280,
        result_arr: [ "谢谢参与", "特等奖", "一等奖", "二等奖", "三等奖" ],
        canvas_clearw: 20,
        canvas_clearh: 20,
        canvas_percent: .1,
        result_val: "",
        result_type: !0,
        winnerList: [],
        winnerCount: 0,
        autoplay: !0,
        isUnpublished: !1,
        isUnderway: !1,
        showShareBtn: !1,
        showResetBtn: !1,
        haveNotimes: !1,
        haveNotimesBox: !1,
        getMobileFlag: !1,
        canLottery: !1,
        canNotMsg: "",
        canGetVal: !1,
        resultData: "",
        isWin: !1,
        showNoPrize: !1,
        canUse: !1,
        indexBtn: !1,
        canCompute: !1,
        rejectAccredit: !1
    },
    onLoad: function(t) {
        var a = this;
        if (t.scene) {
            var n = {};
            decodeURIComponent(t.scene).split("&").map(function(t, e) {
                if (-1 !== t.indexOf("=")) {
                    var a = t.split("=");
                    n[a[0]] = a[1];
                }
                if (-1 !== t.indexOf("_")) {
                    var i = t.split("_");
                    n[i[0]] = i[1];
                }
            }), t = n, a.setData({
                indexBtn: !0
            });
        } else t.fromShare && 1 == t.fromShare && a.setData({
            indexBtn: !0
        });
        e.initWidgets();
        var i = e.getRpxNum({
            rpx: 0,
            type: "h",
            rateFlag: !0
        });
        e.registerGlobalFunctions(a), a.url = e.getPageUrl(a, t), a.setData({
            optionsobj: t,
            winHeight: i.height,
            rpxR: i.rate
        });
    },
    onShow: function() {
        var t = this;
        e.doAfterUserInfoAuth({
            success: t.initData,
            fail: t.initData,
            timesLimit: !1
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return e.shareAppMessage({
            url: t.url,
            title: "来一起参与幸运刮刮刮，有机会赢大奖哦！",
            imageUrl: t.data.baseUrl + "/images/wxapp/guaguaka.png"
        });
    },
    initData: function(t) {
        this.canLottery();
    },
    initFunction: function() {
        var t = this;
        t.resetbox(), t.initCanvas();
    },
    initCanvas: function() {
        var t = this, e = Math.floor(t.data.show_width / t.data.rpxR), a = Math.floor(t.data.show_height / t.data.rpxR);
        t.setData({
            canvas_width: e,
            canvas_height: a
        }), wx.getImageInfo({
            src: "../../images/scratch_mark.jpg",
            success: function(t) {
                o.drawImage("../../" + t.path, 0, 0, e, a), o.draw();
            }
        });
    },
    resetbox: function() {
        s = [], r = [];
        for (var t = 0; t < this.data.canvas_width; t++) {
            s[t] = [];
            for (var e = 0; e < this.data.canvas_height; e++) s[t][e] = 0;
        }
    },
    initCanvasData: function() {
        var t = this;
        this.setData({
            rejectAccredit: !1
        }, function() {
            t.initFunction();
        });
    },
    startCanvas: function(t) {
        var a = this;
        if (!e.globalData.WebUserID) return a.setData({
            rejectAccredit: !0
        }), void e.doAfterUserInfoAuth({
            success: a.initData,
            fail: a.initCanvasData,
            timesLimit: !1
        });
        if (a.data.canUse) {
            var i = a.data.lotteryCountData, o = a.data.info;
            a.data.canLottery ? i.lotteryCount > 0 ? a.setData({
                canvas_isdraw: !0
            }) : 1 == o.canJiFen && i.remainJiFenCount > 0 ? e.showModal({
                title: "提示",
                content: "消耗" + o.jiFenConst + "积分，可以获得1次机会",
                showCancel: !0,
                confirmText: "确认兑换",
                confirm: function(t) {
                    a.chargeLotteryCount();
                }
            }) : 1 == o.canShare && i.remainShareCount > 0 ? n.showPopus({
                content: "参与次数不足",
                text: "分享可以获取1次机会",
                popusStatus: 3,
                share: function() {
                    a.data.lotteryCountData.remainShareCount > 0 && (a.shareLottery(), a.setData({
                        showShareBtn: !1,
                        showResetBtn: !1,
                        is_popus_hidden: !0,
                        isWin: !1,
                        resultData: ""
                    }, function() {
                        setTimeout(function() {
                            a.getLotteryCount();
                        }, 200);
                    }));
                },
                close: function() {
                    n.hidePopus(function(t) {
                        a.initFunction();
                    });
                }
            }) : 1 == o.participateType ? e.showModal({
                title: "提示",
                content: "参与次数已用完，可分享给其他小伙伴试试运气哦。"
            }) : e.showModal({
                title: "提示",
                content: "今天参与次数已用完，明天再来吧。"
            }) : e.showModal({
                title: "提示",
                content: a.data.canNotMsg
            });
        }
    },
    moveCanvas: function(t) {
        var e = this;
        if (this.data.canvas_isdraw) {
            e.data.canGetVal || e.setData({
                canGetVal: !0
            }, function() {
                e.doLottery();
            });
            var a = t.changedTouches[0].x, n = t.changedTouches[0].y;
            o.globalCompositeOperation = "destination-out", o.beginPath(), o.arc(a - this.data.canvas_clearw / 2, n - this.data.canvas_clearh / 2, 25, 0, 2 * Math.PI, !0), 
            o.fill(), o.closePath(), r.push({
                ax: Math.round(a - this.data.canvas_clearw),
                ay: Math.round(n - this.data.canvas_clearh),
                bx: Math.round(a + this.data.canvas_clearw),
                by: Math.round(n + this.data.canvas_clearh)
            }), o.draw(!0);
        }
    },
    endCanvas: function(t) {
        this.data.canvas_isdraw && (this.setData({
            canvas_isdraw: !1
        }), this.data.canCompute && this.computerPercent());
    },
    computerPercent: function() {
        for (var t = this, e = 0; e < r.length; e++) for (o = r[e].ax; o <= r[e].bx; o++) for (var a = r[e].ay; a <= r[e].by; a++) o >= 0 && o < this.data.canvas_width && a >= 0 && a < this.data.canvas_height && (s[o][a] = 1);
        for (var i = 0, e = 0; e < s.length; e++) for (var o = 0; o < s[e].length; o++) 1 == s[e][o] && (i += 1);
        if ((i / (this.data.canvas_width * this.data.canvas_height)).toFixed(2) >= t.data.canvas_percent) {
            var c = t.data.info;
            t.getLotteryCount(function(e) {
                e.lotteryCount > 0 ? t.setData({
                    showResetBtn: !0
                }) : 1 == c.canShare && 0 == e.lotteryCount && e.remainShareCount > 0 ? t.setData({
                    showShareBtn: !0
                }) : 1 == c.canJiFen && 0 == e.lotteryCount && e.remainJiFenCount > 0 ? t.setData({
                    showJiFenBtn: !0
                }) : t.setData({
                    haveNotimes: !0
                }), t.setData({
                    result_type: !1,
                    canUse: !1
                });
            }), t.getLotteryUsersList(), t.getPrizesCountByLotteryID();
            var u = t.data.resultData;
            "" != u && 5 != u.prizeType && n.showPopus({
                content: u.prizeName,
                popusStatus: 4,
                prizeImg: u.prizeImg,
                text: "快快分享告诉更多小伙伴",
                close: function() {
                    n.hidePopus(function(e) {
                        t.initFunction(), t.setData({
                            canCompute: !1
                        });
                    });
                },
                share: function() {
                    t.setData({
                        is_popus_hidden: !0
                    });
                }
            });
        } else console.log("no");
    },
    reset: function() {
        var t = this;
        this.getLotteryCount(), this.setData({
            result_type: !0
        }, function() {
            t.initFunction(), t.setData({
                showResetBtn: !1,
                canGetVal: !1,
                isWin: !1,
                resultData: "",
                canCompute: !1
            });
        });
    },
    shareToFriend: function() {
        var t = this;
        if (!e.globalData.WebUserID) return t.setData({
            rejectAccredit: !0
        }), void e.doAfterUserInfoAuth({
            success: t.initData,
            fail: t.initCanvasData,
            timesLimit: !1
        });
        t.data.lotteryCountData.remainShareCount > 0 && t.setData({
            result_type: !0
        }, function() {
            t.shareLottery(), t.initFunction(), t.setData({
                showShareBtn: !1,
                showResetBtn: !1,
                is_popus_hidden: !0,
                isWin: !1,
                resultData: "",
                canCompute: !1
            });
        });
    },
    getLottery: function() {
        var n = this, i = n.data.optionsobj.id;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), e.sendRequest({
            url: "/index.php?c=Front/Lottery/Lottery&a=getLottery&lotteryID=" + i,
            method: "GET",
            hideLoading: !0,
            success: function(i) {
                if (i.success) {
                    var o = i.data.lotteryInfo, s = i.data.lotteryPrize;
                    if (wx.setNavigationBarTitle({
                        title: o.title
                    }), 1 == o.status || 4 == o.status ? n.setData({
                        isUnpublished: !0,
                        isUnderway: !1
                    }) : (n.setData({
                        isUnderway: !0,
                        isUnpublished: !1
                    }), n.getPrizesCountByLotteryID(), n.getLotteryUsersList()), 3 == o.status) {
                        0 == o.remainStartTime && (n.setData({
                            timestatus: 2
                        }), a.countTdown(o.remainEndTime, null, function(t) {
                            t && n.setData({
                                isUnpublished: !0,
                                isUnderway: !1,
                                "info.status": 4
                            });
                        }));
                        var r = 0;
                        if (s.forEach(function(t) {
                            r += Number(t.remainQuantity);
                        }), 0 == r) {
                            var c;
                            n.setData((c = {
                                showResetBtn: !1,
                                getMobileFlag: !1,
                                haveNotimesBox: !1,
                                isWin: !1,
                                showJiFenBtn: !1,
                                haveNotimes: !1
                            }, t(c, "haveNotimesBox", !1), t(c, "showNoPrize", !0), c));
                        } else 1 == o.isPhoneLimit && n.getUserInfo(function(t) {});
                    } else 2 == o.status && o.remainStartTime >= 0 && (n.setData({
                        timestatus: 1,
                        showShareBtn: !1,
                        showJiFenBtn: !1
                    }), a.countTdown(o.remainStartTime, null, function(t) {
                        t && n.setData({
                            lotteryCountData: ""
                        }, function() {
                            n.onShow();
                        });
                    }));
                    n.setData({
                        info: o
                    }, function() {
                        e.globalData.WebUserID && n.initCanvasData(), wx.hideLoading();
                    });
                } else wx.hideLoading();
            },
            fail: function(t) {
                n.setData({
                    isUnpublished: !0,
                    isUnderway: !1
                }), wx.hideLoading();
            }
        });
    },
    getPrizesCountByLotteryID: function() {
        var t = this, a = t.data.optionsobj.id;
        e.sendRequest({
            url: "/index.php?c=Front/Lottery/Lottery&a=getPrizesCountByLotteryID&lotteryID=" + a,
            method: "GET",
            hideLoading: !0,
            success: function(e) {
                e.success ? t.setData({
                    winnerCount: e.data.count
                }) : console.log("getPrizesCount fail" + e.msg);
            },
            fail: function(t) {}
        });
    },
    toPrizeRule: function() {
        var t = this.data.optionsobj.id;
        wx.navigateTo({
            url: "/pages/lottery/prizerules/index?id=" + t
        });
    },
    toHomeIndex: function() {
        wx.switchTab({
            url: "/pages/shop/index"
        });
    },
    getUserInfo: function(t) {
        var a = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getUserInfo",
            method: "GET",
            hideLoading: !0,
            success: function(e) {
                "" == e.info.Mobile || null == e.info.Mobile ? a.setData({
                    getMobileFlag: !0
                }) : a.setData({
                    getMobileFlag: !1
                }), t && t(e.info.Mobile);
            },
            fail: function(t) {}
        });
    },
    getLotteryUsersList: function() {
        var t = this, a = t.data.optionsobj.id;
        e.sendRequest({
            url: "/index.php?c=Front/Lottery/Lottery&a=getLotteryUsersList&lotteryID=" + a,
            method: "GET",
            hideLoading: !0,
            success: function(e) {
                e.success ? t.setData({
                    winnerList: e.data
                }) : console.log("getLotteryUsersList fail" + e.msg);
            },
            fail: function(t) {}
        });
    },
    getPhoneNumber: function(t) {
        var a = this;
        if (-1 == t.detail.errMsg.indexOf("getPhoneNumber:fail")) {
            var n = e.globalData.appId, s = e.globalData.session_key, r = new i(n, s).decryptData(t.detail.encryptedData, t.detail.iv);
            e.sendRequest({
                url: "/index.php?c=Front/WxApp/JsonApi&a=saveUserMobile",
                method: "POST",
                data: {
                    Mobile: r.phoneNumber,
                    WebUserID: e.globalData.WebUserID
                },
                success: function(t) {
                    a.setData({
                        getMobileFlag: !1
                    }), o = wx.createCanvasContext("guaguaCanvas"), a.initFunction();
                },
                fail: function(t) {}
            });
        } else 0 != t.detail.errMsg.indexOf("getPhoneNumber:fail jsapi has no permission") && 0 != t.detail.errMsg.indexOf("getPhoneNumber:fail:access denied") || e.showModal({
            title: "提示",
            content: "小程序APPID配置有误，请联系商家！"
        });
    },
    payJifen: function() {
        var t = this;
        if (!e.globalData.WebUserID) return t.setData({
            rejectAccredit: !0
        }), void e.doAfterUserInfoAuth({
            success: t.initData,
            fail: t.initCanvasData,
            timesLimit: !1
        });
        var a = t.data.info;
        t.setData({
            result_type: !0,
            resultData: "",
            canCompute: !1
        }, function() {
            t.initFunction();
        }), e.showModal({
            title: "提示",
            content: "消耗" + a.jiFenConst + "积分，可以获得1次机会",
            showCancel: !0,
            confirmText: "确认兑换",
            confirm: function(e) {
                t.chargeLotteryCount();
            }
        });
    },
    canLottery: function() {
        var t = this, a = t.data.optionsobj.id;
        e.sendRequest({
            url: "/index.php?c=Front/Lottery/Lottery&a=canLottery&lotteryID=" + a,
            method: "GET",
            hideLoading: !0,
            success: function(a) {
                a.success ? a.data.canLottery ? t.setData({
                    canLottery: !0,
                    canNotMsg: ""
                }) : t.setData({
                    canNotMsg: a.msg
                }) : e.showModal({
                    title: "提示",
                    content: a.msg,
                    confirm: function() {
                        o = wx.createCanvasContext("guaguaCanvas"), t.initFunction();
                    }
                }), t.getLotteryCount(), t.getLottery();
            },
            fail: function(e) {
                t.setData({
                    isUnpublished: !0,
                    isUnderway: !1
                });
            }
        });
    },
    getLotteryCount: function(t) {
        var a = this, n = a.data.optionsobj.id;
        a.data.info;
        e.sendRequest({
            url: "/index.php?c=Front/Lottery/Lottery&a=getLotteryCount&lotteryID=" + n,
            method: "GET",
            hideLoading: !0,
            success: function(n) {
                if (n.success) {
                    var i = n.data, s = a.data.canNotMsg, r = a.data.canLottery;
                    a.data.lotteryCountData || ("" == s && r && (0 == i.lotteryCount && i.remainShareCount <= 0 && i.remainJiFenCount <= 0 ? a.setData({
                        haveNotimesBox: !0
                    }) : 0 == i.lotteryCount && i.remainShareCount > 0 && 0 == i.remainJiFenCount ? a.setData({
                        showShareBtn: !0
                    }) : 0 == i.lotteryCount && 0 == i.remainShareCount && i.remainJiFenCount > 0 && a.setData({
                        showJiFenBtn: !0
                    })), o = wx.createCanvasContext("guaguaCanvas"), a.initFunction()), a.setData({
                        lotteryCountData: n.data
                    }, function() {
                        a.initFunction(), a.setData({
                            canUse: !0
                        });
                    }), t && t(i);
                } else console.log("getLotteryCount fail" + n.msg), e.showModal({
                    title: "提示",
                    content: n.msg,
                    confirm: function() {
                        o = wx.createCanvasContext("guaguaCanvas"), a.initFunction();
                    }
                });
            },
            fail: function(t) {
                a.setData({
                    isUnpublished: !0,
                    isUnderway: !1
                });
            }
        });
    },
    shareLottery: function() {
        var t = this, a = t.data.optionsobj.id;
        e.sendRequest({
            url: "/index.php?c=Front/Lottery/Lottery&a=shareLottery&lotteryID=" + a,
            method: "GET",
            success: function(e) {
                e.success ? t.setData({
                    is_popus_hidden: !0,
                    showJiFenBtn: !1,
                    showShareBtn: !1,
                    canGetVal: !1,
                    isWin: !1,
                    resultData: ""
                }, function() {
                    t.getLotteryCount();
                }) : console.log("shareLottery fail" + e.msg);
            },
            fail: function(t) {}
        });
    },
    chargeLotteryCount: function() {
        var t = this, a = t.data.optionsobj.id;
        e.sendRequest({
            url: "/index.php?c=Front/Lottery/Lottery&a=chargeLotteryCount",
            method: "POST",
            data: {
                lotteryID: a
            },
            success: function(a) {
                a.success ? (e.showToast({
                    title: "支付成功",
                    icon: "success"
                }), t.setData({
                    is_popus_hidden: !0,
                    showJiFenBtn: !1,
                    canGetVal: !1,
                    isWin: !1,
                    resultData: "",
                    result_type: !0
                }, function() {
                    t.initFunction(), t.getLotteryCount();
                })) : 1005 == a.code ? n.showPopus({
                    content: "积分不足",
                    text: "去商城购物可以获得大量积分",
                    popusStatus: 2,
                    close: function() {
                        n.hidePopus(function(e) {
                            t.setData({
                                result_type: !0
                            }), t.initFunction();
                        });
                    }
                }) : 1002 == a.code ? n.showPopus({
                    content: "很遗憾",
                    text: "您今天的积分使用限额已达到最大值",
                    popusStatus: 2,
                    close: function() {
                        n.hidePopus(function(e) {
                            t.setData({
                                result_type: !0
                            }), t.initFunction();
                        });
                    }
                }) : 1007 == a.code && e.showModal({
                    title: "提示",
                    content: a.msg,
                    confirm: function() {
                        t.getLottery();
                    }
                });
            },
            fail: function(t) {}
        });
    },
    doLottery: function() {
        var t = this, a = t.data.optionsobj.id;
        e.sendRequest({
            url: "/index.php?c=Front/Lottery/Lottery&a=doLottery",
            method: "POST",
            hideLoading: !0,
            data: {
                lotteryID: a
            },
            success: function(a) {
                a.success ? t.setData({
                    resultData: a.data,
                    isWin: 5 != a.data.prizeType
                }, function() {
                    t.setData({
                        canCompute: !0
                    });
                }) : (t.setData({
                    canCompute: !0
                }), e.showModal({
                    title: "提示",
                    content: a.msg,
                    confirm: function() {
                        2001 == a.code ? o = wx.createCanvasContext("guaguaCanvas") : (t.canLottery(), t.setData({
                            showResetBtn: !1,
                            showShareBtn: !1,
                            showJiFenBtn: !1
                        })), t.initFunction();
                    }
                }));
            },
            fail: function(t) {}
        });
    },
    toMyprize: function() {
        var t = this;
        if (!e.globalData.WebUserID) return t.setData({
            rejectAccredit: !0
        }), void e.doAfterUserInfoAuth({
            success: t.initData,
            fail: t.initCanvasData,
            timesLimit: !1
        });
        wx.navigateTo({
            url: "/pages/lottery/myprize/index?currentIndex=0"
        });
    }
}, "toHomeIndex", function() {
    wx.switchTab({
        url: "/pages/shop/index"
    });
}));