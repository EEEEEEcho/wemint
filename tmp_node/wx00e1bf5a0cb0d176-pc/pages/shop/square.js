function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = getApp(), a = require("../../components/picker_datetime.js"), i = require("../../components/city-picker.js"), o = (require("../../config.js"), 
require("../../components/utils/socket.js"));

Page({
    queryparams: {},
    datetimePicker: null,
    cityPicker: null,
    baseUrl: e.globalData.siteBaseUrl,
    canOnOrderSubmit: !1,
    onShareAppMessage: function() {
        return e.shareAppMessage("/pages/shop/index");
    },
    getMinuData: function(t) {
        var e = new Date(), a = new Date(new Date().getTime() + 864e5), i = a.getFullYear(), o = a.getMonth() + 1, s = a.getDate(), n = new Date(i + "/" + (o < 10 ? "0" + o : o) + "/" + (s < 10 ? "0" + s : s) + " " + t).getTime() - e.getTime();
        return Math.floor(n / 6e4);
    },
    getShowSelectTimeList: function(t) {
        var e = new Date(), a = this.data.squareInfo.CityDistribution.business_hours.split(":"), i = a[0], o = a[1], s = this.data.squareInfo.CityDistribution.business_closing_time.split(":"), n = s[0], r = s[1], d = (this.data.squareInfo.CityDistribution.distribution_atTime || 0) - 0, c = t ? parseInt(i) : e.getHours(), u = t ? parseInt(o) : e.getMinutes(), l = [];
        if (c < i || c == i && u <= o) {
            var p = this.judgeTimeData(i, o, d);
            p.data, c = p.curH, u = p.curM;
        } else if (c < n || c == n && r > u) {
            var h = this.judgeTimeData(c, u, d);
            h.data, c = h.curH, u = h.curM;
        }
        c = 24 === Number(c) ? 0 : Number(c);
        var g = Math.floor(c / 24);
        c = g ? c % 24 : c;
        var f = g ? "明天" : "";
        for (l.push({
            name: t ? f + (c < 10 ? "0" + c : c) + ":" + (u >= 10 ? u : "0" + u) : "立即送达 (" + f + (c < 10 ? "0" + c : c) + ":" + (u >= 10 ? u : "0" + u) + ")",
            nameText: (t ? "明天" : f || "大约") + (c < 10 ? "0" + c : c) + ":" + (u >= 10 ? u : "0" + u) + "送达",
            time: t ? this.getMinuData((c < 10 ? "0" + c : c) + ":" + (u >= 10 ? u : "0" + u)) : d,
            flag: t
        }); c < n || c == n && r > u; ) {
            var m = this.judgeTimeData(c, u, 20);
            d += 20, c = m.curH, u = m.curM, l.push({
                name: m.data,
                nameText: t || g ? "明天" + m.data + "送达" : "大约" + m.data + "送达",
                time: t ? this.getMinuData(m.data) : d,
                flag: t
            });
        }
        this.setData({
            dateList: l
        });
    },
    judgeTimeData: function(t, e, a, i) {
        e = parseInt(e) + a;
        var o = parseInt(e / 60);
        return o && (t = Number(t) + o, e -= 60 * o), {
            data: (t < 10 ? "0" + t : t >= 24 ? t - 24 > 0 ? "0" + (t - 24) : "00" : t) + ":" + (e < 10 ? "0" + e : e),
            curH: t,
            curM: e
        };
    },
    boxShowModal: function() {
        this.setData({
            currentTimeIndex: this.data.selectId.childId,
            selectIndex: this.data.selectId.parentId
        }), this.getShowSelectTimeList(2 == this.data.selectIndex);
        var t = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        }), e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        t.translateY(300).step(), e.opacity(0).step(), this.setData({
            animationData: t.export(),
            animationDataBg: e.export(),
            showModalStatus: !0,
            showModalStatusFlag: !0
        }), setTimeout(function() {
            t.translateY(0).step(), e.opacity(1).step(), this.setData({
                animationData: t.export(),
                animationDataBg: e.export()
            });
        }.bind(this), 200);
    },
    hideModal: function() {
        var t = this, e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        }), a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        e.translateY(300).step(), a.opacity(0).step(), this.setData({
            animationData: e.export(),
            animationDataBg: a.export()
        }), setTimeout(function() {
            e.translateY(0).step(), a.opacity(1).step(), t.setData({
                animationData: e.export(),
                animationDataBg: a.export(),
                showModalStatus: !1,
                showModalStatusFlag: !1
            });
        }.bind(this), 200);
    },
    navigateBackFunc: function(t) {
        var e = getCurrentPages(), a = e[e.length - 2];
        a && a.setData({
            backselectFlag: t
        });
    },
    showCouponinfoPlug: function() {
        this.setData({
            couponinfoFlag: !this.data.couponinfoFlag,
            textareaFlag: !this.data.textareaFlag,
            feeNum: this.data.backupsFeeNum || 0
        });
    },
    onLoad: function(t) {
        var o = this;
        o.setData({
            wxPaymentBackFlag: !1
        });
        var s = new Date().getDay();
        this.setData({
            currentWeek: this.data.meekList[s],
            torrWeek: 6 === s ? this.data.meekList[0] : this.data.meekList[s + 1]
        }), this.datetimePicker = new a.pickerDatetime({
            page: this,
            animation: "slide",
            duration: 200
        }), this.cityPicker = new i(), e.getPageUrl(o, t), e.registerGlobalFunctions(o), 
        o.queryparams = t, this.getInfo(), wx.getSystemInfo({
            success: function(t) {
                o.setData({
                    systemInfo: t
                }), "ios" == t.platform ? o.setData({
                    platformType: "ios"
                }) : "android" == t.platform && o.setData({
                    platformType: "android"
                });
            }
        }), e.jurisdictionJudge("scope.userLocation", function(t) {
            o.setData({
                selectStoreFlag: "boolean" != typeof t || t
            });
        });
    },
    getOpenData: function(t) {
        this.setData({
            selectStoreFlag: Boolean(t.detail.authSetting["scope.userLocation"])
        });
    },
    setDefaultStoreInfo: function() {
        var t = wx.getStorageSync("defaultStoreInfo");
        t && this.setData({
            LbsShopName: t.LbsShopName,
            NickName: t.NickName,
            LbsShopId: t.LbsShopId,
            Mobile: t.Mobile
        });
    },
    onShow: function() {
        if (this.canOnOrderSubmit = !1, !this.data.wxPaymentBackFlag || this.data.changeAddressFlag) {
            e.doAfterUserInfoAuth({
                success: this.initData,
                fail: this.initData
            });
            var t = wx.getStorageSync("options"), a = wx.getStorageSync("StoreSetting");
            this.setData({
                StoreSetting: a
            }), t.Name && this.setData({
                options: t,
                LbsShopName: t.Name,
                LbsShopId: t.storeID
            });
        }
    },
    initData: function() {
        var t = this, e = this.data;
        Promise.all([ t.getBaseInfo(), t.getDefaultAddr(), t.getDoodList(t.data.fullRadioFlag, !0), t.couponList() ]).then(function(a) {
            if (t.getDoodListFunc(a[2]), t.couponListFunc(a[3]), e.changeAddressFlag) e.defaultAddr && t.onAddrManageClick(e.defaultAddr); else {
                var i = a[1];
                i && i.addr && t.setData({
                    defaultAddr: i.addr
                });
            }
            t.getbaseInfoFunc(a[0], e.changeAddressFlag && e.defaultAddr);
        }).catch(function(t) {}), t.navigateBackFunc(!0);
    },
    onUnload: function() {
        wx.removeStorageSync("originTime"), wx.removeStorageSync("oldtime"), wx.removeStorageSync("pickerDateIndex"), 
        wx.removeStorageSync("newtime"), wx.removeStorageSync("val1"), wx.removeStorageSync("val2"), 
        wx.removeStorageSync("newVal1"), wx.removeStorageSync("newVal2"), "{}" != JSON.stringify(this.data.cur_socket) && this.data.cur_socket.close();
    },
    getPrice: function(t) {
        var a = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/Order/OrderPrepay&a=getPrice",
            data: t,
            method: "POST",
            success: function(t) {
                if (t.success) {
                    var i = "";
                    a.data.defaultAddr || (t.freight = 0), i = a.data.integralFlag ? (100 * t.orderMoney - 100 * t.pointMoney + 100 * t.freight) / 100 : (100 * t.orderMoney + 100 * t.freight) / 100, 
                    "3" == a.data.pickupType && (i = (100 * i + 100 * a.data.packetMoney + 100 * a.data.feeNum) / 100);
                    var o = a.data.integralFlag ? parseFloat(t.spareMoney + t.pointMoney).toFixed(2) : t.spareMoney;
                    a.setData({
                        tosavemoney: o,
                        getPriceInfo: t,
                        orderPrice: i.toFixed(2),
                        smallPlan: t.orderMoney.toFixed(2)
                    });
                } else e.showModal({
                    title: "提示",
                    content: t.msg
                });
            },
            fail: function(t) {
                e.showModal({
                    title: "提示",
                    content: t
                });
            },
            complete: function() {
                a.canOnOrderSubmit = !0;
            }
        });
    },
    couponList: function() {
        var t = this;
        return new Promise(function(a, i) {
            e.sendRequest({
                url: "/index.php?c=Front/WxApp/Order/OrderPrepay&a=getCouponList",
                data: {
                    pkeys: t.queryparams.pkeys
                },
                method: "POST",
                success: function(t) {
                    t.success ? a(t) : i(t.msg);
                },
                fail: function(t) {
                    i(t.msg);
                }
            });
        });
    },
    couponListFunc: function(t) {
        this.setData({
            couplist: t.coupons
        });
    },
    getDoodListFunc: function(t, e) {
        var a = this, i = this;
        this.setData({
            fullReductMoney: t.DecreaseAmount.toFixed(2),
            autopoint: !!t.AutomaticPointsDeduction
        }), this.setData({
            enableFreePostage: Boolean(t.freePostage)
        }), t.goods.fullreduction && t.goods.fullreduction.forEach(function(t) {
            t.forEach(function(t) {
                if (e && a.setData({
                    fullRadioFlag: !0
                }), i.setData({
                    disableCoupon: Boolean(t.gift && t.gift.coupon && 0 == t.gift.coupon.no_stock),
                    disableProduct: Boolean(t.gift && t.gift.largess && 0 == t.gift.largess.no_stock)
                }), t && t.gift && t.gift.coupon) if (t.gift.coupon.Amount = Number(t.gift.coupon.Amount), 
                t.gift.coupon.OrderMoney = Number(t.gift.coupon.OrderMoney), "0" == t.gift.coupon.EndTimeType) {
                    var o = a.getCouponEndTime(1e3 * Number(t.gift.coupon.EndTime));
                    t.gift.coupon.EndTime = o;
                } else if ("1" == t.gift.coupon.EndTimeType) {
                    var s = new Date().getTime() + 864e5 * Number(t.gift.coupon.EndTime), n = a.getCouponEndTime(s);
                    t.gift.coupon.EndTime = n;
                }
            });
        }), e || this.setData({
            fullRadioFlag: !!t.isShowReduction
        }), this.setData({
            fullActiveFlag: t.isShowReduction,
            goodInfo: t
        });
    },
    getbaseInfoFunc: function(t, e) {
        var a = this;
        this.data.prcktype || "1" === t.ShopPickup.IsFirstPickup && this.setData({
            pickupType: 2
        });
        var i, o, s, n;
        if (t.CityDistribution.isShowCityDistribution && t.CityDistribution.business_hours && t.CityDistribution.distribution_atTime) {
            var r = new Date(), d = (o = (i = t.CityDistribution.business_hours).split(":"))[0], c = o[1], u = t.CityDistribution.business_closing_time.split(":"), l = u[0], p = u[1], h = t.CityDistribution.distribution_atTime;
            if (s = r.getHours(), n = r.getMinutes(), s < d || s == d && n <= c) {
                var g = this.judgeTimeData(d, c, Number(h) || 0);
                s = g.curH, n = g.curM;
            } else if (s < l || s == l && p > n) {
                var f = this.judgeTimeData(s, n, Number(h) || 0);
                s = f.curH, n = f.curM;
            }
        }
        var m = Math.floor(s / 24);
        s = m ? s % 24 : s;
        var y = t.DeliveryMethod;
        2 === t.DeliveryMethod.length && this.setData({
            showpeisong: !0
        }), this.setData({
            integralFlag: "1" === t.AutomaticPointsDeduction,
            UseJiFen: "1" === t.AutomaticPointsDeduction ? 1 : 0,
            LbsShopName: "1" == t.lbsNum ? t.lbsInfo.Name : this.data.LbsShopName ? this.data.LbsShopName : "",
            LbsShopId: "1" == t.lbsNum ? t.lbsInfo.Id : this.data.LbsShopId,
            balanceNumber: t.balance,
            showEnableExpress: y && y.length && y.includes("Express"),
            showPickupType: y && y.length && y.includes("ShopPickup"),
            isShowCityDistribution: y && y.length && y.includes("CityDistribution"),
            NickName: t.UserInfo.NickName,
            Mobile: null == t.UserInfo.Mobile ? "" : t.UserInfo.Mobile,
            squareInfo: t,
            distributionText: {
                name: "立即送达",
                nameText: m ? "明天" + (s < 10 ? "0" + s : s) + ":" + (n >= 10 ? n : "0" + n) : "立即送达 (" + (s < 10 ? "0" + s : s) + ":" + (n >= 10 ? n : "0" + n) + ")",
                time: t.CityDistribution.distribution_atTime
            }
        }), this.data.showPickupType && a.setDefaultStoreInfo(), 1 == this.data.squareInfo.DeliveryMethod.length && "CityDistribution" === this.data.squareInfo.DeliveryMethod[0] && (this.setData({
            pickupType: 3
        }), this.getCityWideFreight()), 1 == this.data.squareInfo.DeliveryMethod.length && "ShopPickup" === this.data.squareInfo.DeliveryMethod[0] && this.setData({
            pickupType: 2
        }), this.data.isShowCityDistribution && this.data.showPickupType && !this.data.showEnableExpress && !this.data.prcktype && this.setData({
            pickupType: 2
        });
        var D = {
            useFullReduction: a.data.fullRadioFlag ? "1" : "2",
            getProductType: a.data.pickupType,
            couponItemId: -1 !== a.data.couponTitleText.ItemID ? a.data.couponTitleText.ItemID : "",
            pkeys: a.queryparams.pkeys,
            addressId: a.data.defaultAddr && a.data.defaultAddr.ID || 0
        };
        a.getPrice(D);
    },
    getTimeData: function(t) {
        var e = t.target.dataset.index;
        this.hideModal(), this.setData({
            currentTimeIndex: e,
            selectId: {
                parentId: this.data.selectIndex,
                childId: e
            },
            distributionText: this.data.dateList[e]
        });
    },
    changeDays: function(t) {
        var e = t.target.dataset.id;
        this.getShowSelectTimeList(2 == e), this.setData({
            selectIndex: e,
            currentTimeIndex: 0
        });
    },
    getCityWideFreight: function() {
        var t = this;
        t.data.defaultAddr && t.data.defaultAddr.ID && ("1" === this.data.StoreSetting ? this.defaultStores(function(e) {
            t.cityWideData(e);
        }) : this.isdefaultStores(function(e) {
            t.cityWideData(e);
        }));
    },
    chooseFullReduct: function() {
        var t = this;
        this.setData({
            fullRadioFlag: !this.data.fullRadioFlag
        }), this.data.fullRadioFlag ? this.setData({
            couponTitleText: {
                ItemID: -1,
                Title: "不使用优惠券"
            },
            UseCouponInfo: {
                Amount: 0,
                ItemID: -1
            },
            feeNum: this.data.enableFreePostage ? 0 : this.data.backupsFeeNum
        }) : this.setData({
            feeNum: this.data.backupsFeeNum || 0
        }), this.getDoodList(this.data.fullRadioFlag).then(function(e) {
            t.getDoodListFunc(e, !0);
        }).catch(function(t) {
            e.showModal({
                title: "提示",
                content: t
            });
        });
        var a = {
            useFullReduction: this.data.fullRadioFlag ? "1" : "2",
            getProductType: this.data.pickupType,
            couponItemId: "",
            pkeys: this.queryparams.pkeys,
            addressId: this.data.defaultAddr && this.data.defaultAddr.ID || 0
        };
        this.getPrice(a);
    },
    data: {
        isSelect: !1,
        selectStoreFlag: !1,
        wxPaymentBackFlag: !1,
        tosavemoney: 0,
        changeAddressFlag: !1,
        ctreateOrderisOk: !1,
        getPriceInfo: {},
        orderPrice: 0,
        showpeisong: !1,
        districtAddr: "",
        districtAddrFlag: !1,
        couponMoney: 0,
        subtotal: 0,
        limitInfoProductArr: [],
        LbsShopId: "",
        platformType: "",
        enableFreePostage: !1,
        raoundArray: [],
        fullActiveFlag: !1,
        fullRadioFlag: !1,
        fullReductMoney: 0,
        totalSaveMoney: 0,
        couplist: [],
        selectId: {
            parentId: 1,
            childId: 0
        },
        prcktype: !1,
        currentWeek: "",
        torrWeek: "",
        meekList: [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ],
        allNum: 0,
        feeNum: 0,
        backupsFeeNum: 0,
        packetMoney: 0,
        distributionText: {
            name: "立即送达",
            nameText: "立即送达",
            time: 40
        },
        autopoint: !1,
        currentTimeIndex: 0,
        selectIndex: "1",
        animationDataBg: "",
        animationData: "",
        LbsShopName: "",
        showModalStatus: !1,
        showModalStatusFlag: !1,
        dateList: [],
        integralFlag: !1,
        paymentPlugShow: !1,
        paymentFlag: 1,
        noSuccessText: "",
        StoreSetting: "",
        munblock: !0,
        radioFullState: !0,
        showSuccessPlug: !1,
        textareaFlag: !1,
        successFlag: !0,
        balanceNumber: 0,
        cityWideDataFlag: !1,
        showCityDistribution: {},
        isShowCityDistribution: 0,
        showLbsShop: !1,
        options: {},
        storecontent: {},
        couponTitleText: {
            ItemID: -1,
            Title: "不使用优惠券"
        },
        disableCoupon: !1,
        disableProduct: !1,
        balanceflagNum: !1,
        hasproduct: !0,
        couponinfoFlag: !1,
        baseUrl: e.globalData.siteBaseUrl,
        UseJiFen: 0,
        pickupType: 1,
        otherSuccessFlag: !1,
        markShow: !1,
        processing: !0,
        processing_text: "处理中",
        cur_socket: {},
        lbsList: [],
        smallPlan: "",
        recordcount: 99,
        falgAjax: !0,
        pagesize: 10,
        showExpressWarmTips: !0,
        showCityWarmTips: !0,
        showStoreWarmTips: !0,
        goodInfo: {}
    },
    getIntegralSelec: function() {
        this.setData({
            integralFlag: !this.data.integralFlag
        });
    },
    changePaymentWay: function(t) {
        this.data.balanceNumber - this.data.TotalMoney < 0 || this.setData({
            paymentFlag: t.currentTarget.dataset.paymentflag
        });
    },
    closePaymentPlug: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "您确定要放弃支付吗？",
            success: function(e) {
                e.confirm ? t.setData({
                    paymentPlugShow: !1
                }) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    showPaymentPlug: function() {
        var t = this;
        if ("3" != t.data.pickupType || t.data.ctreateOrderisOk) {
            var a = t.data.pickupType;
            if (1 === a || 3 === a) {
                if (!this.data.defaultAddr) return void e.showModal({
                    title: "提示",
                    content: "请选择地址..."
                });
            } else if (2 === a) {
                if (!this.data.LbsShopId) return void e.showModal({
                    title: "提示",
                    content: "请选择取货门店!"
                });
                if (!this.data.PickupTime) return void e.showModal({
                    title: "提示",
                    content: "请选择取货时间!"
                });
                if (!this.data.NickName) return void e.showModal({
                    title: "提示",
                    content: "请输入真实姓名!"
                });
                if (!this.data.Mobile) return void e.showModal({
                    title: "提示",
                    content: "请输入取货人手机号码!"
                });
                if (11 !== this.data.Mobile.length) return void e.showModal({
                    title: "提示",
                    content: "请输入正确的电话号码！"
                });
                var i = this.data, o = {
                    LbsShopName: i.LbsShopName,
                    LbsShopId: i.LbsShopId,
                    Mobile: i.Mobile,
                    NickName: i.NickName
                };
                try {
                    wx.setStorageSync("defaultStoreInfo", o);
                } catch (t) {}
            }
            if (!t.canOnOrderSubmit) return !1;
            this.setData({
                TotalMoney: Number(this.data.orderPrice).toFixed(2),
                paymentPlugShow: !0,
                balanceflagNum: this.data.balanceNumber - this.data.orderPrice < 0,
                paymentFlag: this.data.balanceNumber - this.data.orderPrice >= 0 ? "1" : "2"
            });
        }
    },
    inputUserName: function(t) {
        this.setData({
            NickName: t.detail.value
        });
    },
    inputUserMobile: function(t) {
        this.setData({
            Mobile: t.detail.value
        });
    },
    getDoodList: function(t, a) {
        var i = this;
        return new Promise(function(o, s) {
            e.sendRequest({
                url: "/index.php?c=Front/WxApp/Order/OrderPrepay&a=getGoodsList",
                data: {
                    useFullReduction: a ? "1" : t ? "1" : "2",
                    pkeys: i.queryparams.pkeys
                },
                method: "POST",
                success: function(t) {
                    t.success ? o(t) : s(t.msg);
                },
                fail: function(t) {
                    s(t.msg);
                }
            });
        });
    },
    getBaseInfo: function() {
        return new Promise(function(t, a) {
            e.sendRequest({
                url: "/index.php?c=Front/WxApp/Order/OrderPrepay&a=getSetting",
                method: "POST",
                success: function(e) {
                    e.success ? t(e) : a(e.msg);
                },
                fail: function(t) {
                    a(t.msg);
                }
            });
        });
    },
    getCouponEndTime: function(t) {
        var e = new Date(t), a = e.getDate();
        return e.getFullYear() + "." + (e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "." + (a < 10 ? "0" + a : a);
    },
    sliceString: function(t) {
        if (t += "") {
            var e = t.indexOf(".");
            return t.substring(0, e);
        }
    },
    getInfo: function() {
        var t = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getWxAppInfo",
            method: "GET",
            success: function(a) {
                a.success ? (t.isloading = !1, t.setData({
                    Name: a.data.Name,
                    SiteLogo: a.data.SiteLogo,
                    BGImage: a.data.BGImage
                })) : (t.isloading = !1, e.showModal({
                    title: "提示",
                    content: a.msg
                }));
            },
            fail: function(t) {
                this.isloading = !1, e.showModal({
                    title: "提示",
                    content: t.msg
                });
            }
        });
    },
    onUseJiFenChange: function(t) {
        var e = this, a = "";
        this.data.UseJiFen = 0 == this.data.UseJiFen ? 1 : 0, a = 3 == e.data.pickupType ? e.data.integralFlag ? (100 * e.data.getPriceInfo.orderMoney + 100 * e.data.packetMoney + 100 * e.data.feeNum - 100 * e.data.getPriceInfo.pointMoney) / 100 : (100 * e.data.getPriceInfo.orderMoney + 100 * e.data.packetMoney + 100 * e.data.feeNum) / 100 : e.data.integralFlag ? (100 * e.data.getPriceInfo.orderMoney + 100 * e.data.getPriceInfo.freight - 100 * e.data.getPriceInfo.pointMoney) / 100 : (100 * e.data.getPriceInfo.orderMoney + 100 * e.data.getPriceInfo.freight) / 100;
        var i = e.data.integralFlag ? parseFloat(e.data.getPriceInfo.spareMoney + e.data.getPriceInfo.pointMoney) : e.data.getPriceInfo.spareMoney;
        e.setData({
            tosavemoney: i,
            orderPrice: a.toFixed(2)
        });
    },
    onCouponChange: function(t) {
        var e = this, a = t.currentTarget.dataset.type, i = t.currentTarget.dataset.itemid, o = t.currentTarget.dataset.amount, s = t.currentTarget.dataset.idx, n = {};
        if (s > -1) {
            var r = this.data.couplist[s], d = "";
            d = 0 === Number(r.OrderMoney) ? "减" + r.Amount + "元" : "订单满" + r.OrderMoney + "元减" + r.Amount + "元", 
            n = {
                ItemID: r.ItemID,
                Title: "0" === r.Type ? r.Amount / 10 + "折" : d
            }, this.setData({
                fullRadioFlag: !1
            });
        } else n = {
            ItemID: -1,
            Title: "不使用优惠券"
        };
        this.setData({
            couponTitleText: n,
            couponinfoFlag: !this.data.couponinfoFlag,
            textareaFlag: !this.data.textareaFlag
        }), this.setData({
            UseCouponInfo: {
                Type: a,
                ItemID: i,
                Amount: o
            }
        });
        var c = wx.getStorageSync("options").storeID || 0;
        2 == e.data.pickupType && (c = e.data.LbsShopId ? e.data.LbsShopId : c);
        var u = {
            useFullReduction: "2",
            getProductType: e.data.pickupType,
            couponItemId: -1 == n.ItemID ? "" : i,
            pkeys: e.queryparams.pkeys,
            addressId: e.data.defaultAddr && e.data.defaultAddr.ID || 0
        };
        e.getPrice(u);
    },
    changeShowLbsShop: function() {
        var t = this;
        wx.getLocation({
            type: "wgs84",
            success: function(e) {
                var a = e.latitude, i = e.longitude;
                t.setData({
                    lat: a,
                    lng: i
                }), t.getLbsStoreList(!0), t.setData({
                    showLbsShop: !0
                });
            },
            fail: function(t) {}
        });
    },
    getLbsStoreList: function(t) {
        var a = this;
        t && (a.data.recordcount = 99, a.data.lbsList = []);
        var i = a.data.recordcount, o = a.data.lbsList.length;
        if (i > o && a.data.falgAjax) {
            a.setData({
                falgAjax: !1
            });
            var s = Math.ceil(o / a.data.pagesize) + 1;
            e.sendRequest({
                url: "/index.php?c=Front/WxApp/ShopApi&a=getLbsStoreList&lng=" + a.data.lng + "&lat=" + a.data.lat + "&page=" + s + "&pageSize=" + a.data.pagesize,
                method: "Get",
                success: function(t) {
                    if (t.success) {
                        for (var i = 0; i < t.lbsList.length; i++) a.data.lbsList.push(t.lbsList[i]);
                        a.setData({
                            lbsList: a.data.lbsList,
                            falgAjax: !0,
                            recordcount: t.count
                        });
                    } else e.showModal({
                        title: "提示",
                        content: t.msg
                    });
                },
                fail: function(t) {
                    console.log("getLbsStoreList fail" + t);
                }
            });
        }
    },
    onLbsShopChange: function(t) {
        var e = t.currentTarget.dataset.lbsname, a = t.currentTarget.dataset.lbsid;
        this.setData({
            LbsShopName: e,
            LbsShopId: a,
            showLbsShop: !1
        });
    },
    onLbsShopOK: function(t) {
        this.data.LbsShopId ? this.setData({
            showLbsShop: !1
        }) : e.showModal({
            title: "提示",
            content: "请选择门店"
        });
    },
    getStartTime: function() {
        var t = this, e = new Date(), a = 60 * parseInt(t.data.squareInfo.ShopPickup.PickupTime) * 60 * 1e3, i = new Date(e.getTime() + a), o = i.getMonth() + 1 < 10 ? "0" + (i.getMonth() + 1) : i.getMonth() + 1, s = i.getDate() < 10 ? "0" + i.getDate() : i.getDate(), n = i.getHours() < 10 ? "0" + i.getHours() : i.getHours(), r = i.getMinutes() < 10 ? "0" + (i.getMinutes() + 1) : i.getMinutes() + 1;
        return i.getFullYear() + "-" + o + "-" + s + " " + n + ":" + r;
    },
    onTimeSure: function() {
        var t = this.data.squareInfo.ShopPickup.PickupStartTime.split(/[年月日时点:\s\-]+/), a = new Date(t[0], parseInt(t[1]) - 1, t[2], t[3], t[4]), i = this.data.PickupTime.split(/[年月日时点:\s\-]+/);
        if (new Date(i[0], parseInt(i[1]) - 1, i[2], i[3], i[4]) < a) {
            e.showModal({
                title: "提示",
                content: "取货时间必须大于" + t[0] + "-" + t[1] + "-" + t[2] + " " + t[3] + ":" + t[4]
            });
            var o = t[0] + "年" + t[1] + "月" + t[2] + "日 " + t[3] + ":" + t[4];
            this.setData({
                PickupTime: o
            });
        }
    },
    showTimeSelector: function() {
        this.datetimePicker.setPicker("PickupTime", {
            onBeforeSure: this.onTimeSure
        }, this.getStartTime()), this.setData({
            showTimeChoose: !0
        });
    },
    showAddrManage: function() {
        var t = this.data.defaultAddr;
        wx.navigateTo({
            url: "/pages/sundry/address/addresslist/index?type=square" + (t && t.ID ? "&id=" + t.ID : "")
        }), this.setData({
            couponTitleText: {
                ItemID: -1
            }
        });
    },
    onAddrManageClick: function(t) {
        var e = this, a = e.cityPicker.getDistrictCodeByName(t.ProvinceName, t.CityName, t.DistrictName);
        e.setData({
            defaultAddr: t,
            districtAddr: a
        }), 3 === this.data.pickupType && this.getCityWideFreight();
    },
    cityWideData: function(t) {
        var a = this, i = a.data.defaultAddr, o = a.data.getPriceInfo.orderMoney;
        this.data.cityWideDataFlag || (a.setData({
            cityWideDataFlag: !0
        }), e.sendRequest({
            url: "/index.php?c=Front/WxApp/DaDa/CreateCityDistributionOrder&a=queryDeliverFee",
            data: {
                storeId: t,
                cargo_price: o < 0 ? 0 : o,
                receiver_name: i ? i.RealName : "",
                receiver_address: i ? i.CombinedAddress : "",
                receiver_phone: i ? i.ContactNumber : "",
                Longtitude: i ? i.Longtitude : "",
                Lantitude: i ? i.Lantitude : "",
                district_id: i ? i.ID : ""
            },
            method: "POST",
            success: function(t) {
                if (a.setData({
                    cityWideDataFlag: !1
                }), 200 !== t.code) {
                    if (!i.ID) return;
                    e.showModal({
                        title: "提示",
                        content: t.msg
                    });
                } else {
                    a.setData({
                        backupsFeeNum: t.info.fee,
                        feeNum: a.data.enableFreePostage && a.data.fullRadioFlag ? 0 : t.info.fee,
                        packetMoney: (Number(a.data.squareInfo.CityDistribution.packaging_fee) * ~~a.data.goodInfo.goodsNums).toFixed(2)
                    });
                    var o = (100 * a.data.smallPlan + 100 * a.data.packetMoney + 100 * a.data.feeNum) / 100;
                    a.data.integralFlag && (o = (100 * o - 100 * a.data.getPriceInfo.pointMoney) / 100), 
                    a.setData({
                        orderPrice: o.toFixed(2),
                        ctreateOrderisOk: !0
                    });
                }
            },
            fail: function(t) {
                e.showModal({
                    title: "提示",
                    content: t
                });
            }
        }));
    },
    defaultStores: function(a) {
        var i = this, o = this.data.options.storeID, s = i.data.defaultAddr && i.data.defaultAddr.ID || 0;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=enableCityDistribution&addressId=" + s + "&storeId=" + o + "&cargo_price=" + i.data.getPriceInfo.ordermoney,
            method: "Get",
            success: function(n) {
                n.success ? (a && a(o), i.setData(t({
                    cityDistribution: n.data.cityDistribution,
                    storedistance: n.data.distance
                }, "options.distance", n.data.distance))) : 0 == s ? e.showModal({
                    title: "提示",
                    content: "请添加收货地址"
                }) : e.showModal({
                    title: "提示",
                    content: n.msg
                });
            }
        });
    },
    isdefaultStores: function(t) {
        var a = this, i = a.data.defaultAddr ? a.data.defaultAddr.ID : "";
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getCityDistributionStore&addressId=" + i + "&cargo_price=" + a.data.getPriceInfo.ordermoney,
            method: "Get",
            success: function(i) {
                if (i.success) {
                    t && t(i.data.storeInfo.Id);
                    var o = i.data.storeInfo;
                    a.setData({
                        store: i.data,
                        storecontent: o,
                        storeArr: o.ProvinceName + o.CityName + o.DistrictName + o.Address
                    });
                } else e.showModal({
                    title: "提示",
                    content: i.msg
                });
            }
        });
    },
    getDefaultAddr: function() {
        return new Promise(function(t, a) {
            e.sendRequest({
                url: "/index.php?c=front/Useraddr&a=GetDefaultAddr",
                method: "POST",
                success: function(e) {
                    e.success ? t(e) : a(e.msg);
                },
                fail: function(t) {
                    a(t);
                }
            });
        });
    },
    changePickupType: function(t) {
        var e = this, a = t ? t.currentTarget.dataset.type : "3";
        if (this.data.pickupType != a) {
            this.setData({
                pickupType: parseInt(a),
                radioFullState: !1,
                prcktype: !0
            });
            var i = {
                useFullReduction: e.data.fullRadioFlag ? "1" : "2",
                getProductType: e.data.pickupType,
                couponItemId: -1 !== e.data.couponTitleText.ItemID ? e.data.couponTitleText.ItemID : "",
                pkeys: e.queryparams.pkeys,
                addressId: e.data.defaultAddr && e.data.defaultAddr.ID || 0
            };
            e.getPrice(i), 3 == a && this.getCityWideFreight();
        }
    },
    onOrderSubmit: function(t) {
        var a = this, i = a.data.pickupType, s = t.detail.value, n = {};
        if (a.setData({
            fromId: t.detail.formId
        }), n.useFullReduction = this.data.fullRadioFlag ? 1 : 2, n.getProductType = this.data.pickupType, 
        n.remark = s.Memo ? s.Memo : "", n.useJiFen = this.data.UseJiFen ? 1 : 2, n.couponID = this.data.UseCouponInfo && -1 != this.data.UseCouponInfo.ItemID ? this.data.UseCouponInfo.ItemID : 0, 
        n.pkeys = this.queryparams.pkeys, 3 === i && (n.delivery_time = this.data.distributionText.time, 
        "0" === a.data.StoreSetting ? n.pickupAddressID = this.data.storecontent.Id : n.pickupAddressID = this.data.options.storeID), 
        1 === i || 3 === i) {
            if (!this.data.defaultAddr) return void e.showModal({
                title: "提示",
                content: "请选择地址..."
            });
            var r = a.cityPicker.getDistrictCodeByName(a.data.defaultAddr.ProvinceName, a.data.defaultAddr.CityName, a.data.defaultAddr.DistrictName);
            n.userAddrID = this.data.defaultAddr && this.data.defaultAddr.ID || 0, n.district = r;
        } else if (2 === i) {
            if (this.data.LbsShopName === this.data.options.Name ? n.pickupAddressID = this.data.options.storeID : s.LbsID ? n.pickupAddressID = s.LbsID : n.pickupAddressID = a.data.LbsShopId, 
            n.pickupTime = this.data.PickupTime, n.pickUserName = s.Contact, n.pickUserPhone = s.Mobile, 
            !this.data.LbsShopId) return void e.showModal({
                title: "提示",
                content: "请选择取货门店!"
            });
            if (!this.data.PickupTime) return void e.showModal({
                title: "提示",
                content: "请选择取货时间!"
            });
            if (!s.Contact) return void e.showModal({
                title: "提示",
                content: "请输入真实姓名!"
            });
            if (!s.Mobile) return void e.showModal({
                title: "提示",
                content: "请输入取货人手机号码!"
            });
            if (11 !== s.Mobile.length) return void e.showModal({
                title: "提示",
                content: "请输入正确的电话号码！"
            });
        }
        a.setData({
            wxPaymentBackFlag: !0
        }), a.navigateBackFunc(!1);
        var d = function(t) {
            a.setData({
                otherSuccessFlag: !0
            }), e.sendRequest({
                url: "/index.php?c=front/WxApp/ShopApi&a=payOrder",
                method: "POST",
                data: {
                    OrderID: t,
                    formid: a.data.fromId
                },
                success: function(e) {
                    e.success ? (a.setData({
                        paymentPlugShow: !1,
                        processing: !1,
                        orderId: t,
                        payParam: {
                            orderMoney: e.data.orderMoney,
                            payScenes: 1,
                            getproducttype: a.data.pickupType,
                            id: t,
                            payToken: e.data.payToken
                        }
                    }), a.calActivePayGift({
                        payGiftToken: a.data.payParam.payToken,
                        payScenes: 1,
                        orderID: t
                    })) : wx.redirectTo({
                        url: "../order/orderdetails/index?id=" + t + "&getproducttype=" + a.data.pickupType
                    });
                },
                fail: function(e) {
                    wx.reLaunch({
                        url: "../order/orderdetails/index?id=" + t + "&getproducttype=" + a.data.pickupType
                    });
                }
            });
        }, c = function(i) {
            if ("1" === a.data.paymentFlag) a.setData({
                paymentPlugShow: !1
            }), d(i); else if ("2" === a.data.paymentFlag) {
                o.listen("websocket-connected", function(t) {
                    var a = {
                        client_id: t.clientid,
                        order_id: i
                    };
                    e.sendRequest({
                        url: "/index.php?c=Front/WxApp/Socket&a=bind",
                        data: a,
                        method: "POST",
                        success: function(t) {
                            t.success || e.showModal({
                                title: "提示",
                                content: t.msg
                            });
                        },
                        fail: function(t) {}
                    });
                }), o.listen("websocket-finishPay", function(t) {
                    setTimeout(function() {
                        a.setData({
                            processing: !1,
                            processing_text: t.order_status_text,
                            payToken: t.payToken,
                            payParam: {
                                orderMoney: t.orderMoney,
                                payScenes: 1,
                                getproducttype: a.data.pickupType,
                                id: i,
                                payToken: t.payToken
                            }
                        }), a.calActivePayGift({
                            payGiftToken: t.payToken,
                            payScenes: 1,
                            orderID: i
                        });
                    }, 1e3), a.data.cur_socket.remove("websocket-finishPay");
                });
                var s = o.run();
                a.setData({
                    cur_socket: s
                }), e.wxPay(i, {
                    formid: t.detail.formId,
                    success: function() {
                        a.setData({
                            otherSuccessFlag: !0,
                            paymentPlugShow: !1,
                            orderId: i
                        }), setTimeout(function() {
                            a.setData({
                                markShow: !0
                            });
                        }, 200);
                    },
                    fail: function(t) {
                        a.setData({
                            otherSuccessFlag: !0,
                            paymentPlugShow: !1
                        });
                        var o = "../order/orderdetails/index?id=" + i + "&getproducttype=" + a.data.pickupType;
                        -1 == t.err_code && e.showModal({
                            title: "提示",
                            content: t.err_desc,
                            confirm: function(t) {
                                wx.redirectTo({
                                    url: o
                                });
                            }
                        });
                        var s = new RegExp(/requestPayment:fail:/);
                        if (t.errMsg.indexOf("requestPayment:fail:") > -1) {
                            var n = t.errMsg.replace(s, "");
                            e.showModal({
                                title: "提示",
                                content: n,
                                confirm: function(t) {
                                    wx.redirectTo({
                                        url: o
                                    });
                                }
                            });
                        }
                        "requestPayment:fail cancel" == t.errMsg && wx.redirectTo({
                            url: o
                        });
                    }
                });
            }
        };
        n.useNewCreateOrder = 1, n.formID = a.data.fromId, n.payMoney = Number(a.data.orderPrice), 
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/Order/OrderPrepay&a=createOrder",
            method: "POST",
            data: n,
            success: function(t) {
                t.success ? c(t.OrderID) : e.showModal({
                    title: "提示",
                    content: t.msg
                });
            },
            fail: function(t) {
                e.showModal({
                    title: "提示",
                    content: t
                });
            }
        });
    },
    calActivePayGift: function(t) {
        var a = this;
        e.sendRequest({
            url: "/index.php?c=Front/PayGift/PayGift&a=calActivePayGift",
            method: "POST",
            data: {
                payGiftToken: t.payGiftToken,
                payScenes: 1,
                orderID: t.orderID
            },
            success: function(t) {
                t.success ? a.setData({
                    payConfig: t.data
                }) : e.showModal({
                    title: "提示",
                    content: t.msg
                });
            }
        });
    },
    receive: function() {
        var t = this;
        e.sendRequest({
            url: "/index.php?c=Front/PayGift/PayGift&a=receivePayGift",
            method: "POST",
            data: {
                payGiftToken: t.data.payParam.payToken,
                orderID: t.data.payParam.id
            },
            success: function(a) {
                a.success ? (t.setData({
                    isSelect: !0
                }), wx.showToast({
                    title: "领取成功",
                    icon: "none",
                    duration: 1500
                })) : e.showModal({
                    title: "提示",
                    content: a.msg
                });
            }
        });
    },
    viewOrder: function() {
        var t = this;
        wx.redirectTo({
            url: "../order/orderdetails/index?id=" + t.data.payParam.id + "&getproducttype=" + t.data.payParam.getproducttype
        });
    },
    toIndex: function() {
        wx.switchTab({
            url: "/pages/shop/index"
        });
    },
    goOrderdetail: function() {
        wx.redirectTo({
            url: "../order/orderdetails/index?id=" + this.data.orderId + "&getproducttype=" + this.data.pickupType
        });
    },
    closemask: function() {
        this.setData({
            showLbsShop: !1
        });
    },
    toposition: function() {
        var t = void 0, e = void 0, a = void 0, i = void 0, o = this.data.storecontent, s = this.data.options;
        "0" === this.data.StoreSetting ? (t = o.ProvinceName + o.CityName + o.DistrictName + o.Address, 
        e = o.Name, a = o.Longtitude, i = o.Lantitude) : (t = s.start_address, e = s.Name, 
        a = s.lng, i = s.lat), wx.openLocation({
            name: e,
            address: t,
            longitude: Number(a),
            latitude: Number(i)
        });
    },
    location: function(t) {
        var e = Number(t.currentTarget.dataset.item.Lantitude), a = Number(t.currentTarget.dataset.item.Longtitude);
        e > 0 && a > 0 && wx.openLocation({
            name: t.currentTarget.dataset.item.Name,
            address: t.currentTarget.dataset.item.Address,
            longitude: Number(a),
            latitude: Number(e)
        });
    },
    onlbsListScroll: function() {
        this.getLbsStoreList();
    },
    closeWarmTips: function(t) {
        var e = t.currentTarget.dataset.typeway;
        "1" == e ? this.setData({
            showExpressWarmTips: !1
        }) : "2" == e ? this.setData({
            showStoreWarmTips: !1
        }) : "3" == e && this.setData({
            showCityWarmTips: !1
        });
    }
});