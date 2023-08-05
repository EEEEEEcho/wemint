var t = getApp(), e = require("../../../components/picker_datetime.js"), a = require("../../../components/city-picker.js"), i = (require("../../../config.js"), 
require("../../../components/utils/socket.js"));

Page({
    queryparams: {},
    datetimePicker: null,
    cityPicker: null,
    productSubtotal: 0,
    baseUrl: t.globalData.siteBaseUrl,
    attrImg: "",
    skuStr: "",
    onShareAppMessage: function() {
        return t.shareAppMessage("/pages/shop/index");
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
            textareaFlag: !this.data.textareaFlag
        });
    },
    onLoad: function(i) {
        var o = this;
        t.getPageUrl(o, i), t.registerGlobalFunctions(o), o.data.queryparams = i;
        o.checkLogin(function() {
            o.loadSquareInfo(), o.datetimePicker = new e.pickerDatetime({
                page: o,
                animation: "slide",
                duration: 200
            }), o.navigateBackFunc(!0), o.cityPicker = new a(), o.getBalanceNumber();
        }), t.jurisdictionJudge("scope.userLocation", function(t) {
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
    onShow: function() {
        var t = this.data.defaultAddr;
        t && t.District && this.data.changeAddressFlag && this.getFreightByAddr(t.District);
    },
    onUnload: function() {
        "{}" != JSON.stringify(this.data.cur_socket) && this.data.cur_socket.close(), wx.removeStorageSync("originTime"), 
        wx.removeStorageSync("oldtime"), wx.removeStorageSync("pickerDateIndex"), wx.removeStorageSync("newtime"), 
        wx.removeStorageSync("val1"), wx.removeStorageSync("val2"), wx.removeStorageSync("newVal1"), 
        wx.removeStorageSync("newVal2");
    },
    checkLogin: function(e) {
        if (t.globalData.WebUserID) e(); else {
            var a = function() {
                wx.navigateBack({
                    delta: 1
                });
            };
            t.login({
                success: e,
                fail: a,
                forcereg: function() {
                    ShopUtil.showRegUI({
                        onClose: a,
                        onRegOrBindSuccess: e
                    });
                }
            });
        }
    },
    data: {
        selectStoreFlag: !0,
        integralFlag: !1,
        paymentPlugShow: !1,
        paymentFlag: 1,
        noSuccessText: "",
        showSuccessPlug: !1,
        textareaFlag: !1,
        successFlag: !0,
        balanceNumber: 0,
        showLbsShop: !1,
        couponTitleText: {
            ItemID: -1,
            Title: "不使用优惠券"
        },
        balanceflagNum: !1,
        hasproduct: !0,
        couponinfoFlag: !1,
        baseUrl: t.globalData.siteBaseUrl,
        UseJiFen: 0,
        pickupType: 1,
        freight: 0,
        ActivityID: "",
        otherSuccessFlag: !1,
        markShow: !1,
        processing: !0,
        processing_text: "处理中",
        pageSize: 10,
        listPage: 1,
        recordcount: "",
        lbsList: [],
        cur_socket: {}
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
        var e = this.data.pickupType;
        if (1 === e || 3 === e) {
            if (!this.data.defaultAddr) return void t.showModal({
                title: "提示",
                content: "请选择地址..."
            });
        } else if (2 === e) {
            if (!this.data.LbsShopId) return void t.showModal({
                title: "提示",
                content: "请选择取货门店!"
            });
            if (!this.data.PickupTime) return void t.showModal({
                title: "提示",
                content: "请选择取货时间!"
            });
            if (!this.data.NickName) return void t.showModal({
                title: "提示",
                content: "请输入真实姓名!"
            });
            if (!this.data.Mobile) return void t.showModal({
                title: "提示",
                content: "请输入取货人手机号码!"
            });
            if (11 !== this.data.Mobile.length) return void t.showModal({
                title: "提示",
                content: "请输入正确的电话号码！"
            });
            var a = this.data, i = {
                LbsShopName: a.LbsShopName,
                LbsShopId: a.LbsShopId,
                Mobile: a.Mobile,
                NickName: a.NickName
            };
            try {
                wx.setStorageSync("defaultStoreInfo", i);
            } catch (t) {}
        }
        this.setData({
            paymentPlugShow: !0,
            balanceflagNum: this.data.balanceNumber - this.data.TotalMoney < 0,
            paymentFlag: this.data.balanceNumber - this.data.TotalMoney >= 0 ? "1" : "2"
        });
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
    getBalanceNumber: function() {
        var e = this;
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/BaseApi&a=getBalance",
            method: "POST",
            success: function(t) {
                t.success && e.setData({
                    balanceNumber: t.balance
                });
            },
            fail: function(e) {
                t.showModal({
                    title: "提示",
                    content: "获取用户余额：" + e
                });
            }
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
    loadSquareInfo: function() {
        var e = this;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=comfirmOrder&pintuan_id=" + this.data.queryparams.pintuan_id + "&pintuan_product_id=" + this.data.queryparams.pintuan_product_id + "&pintuan_product_num=" + this.data.queryparams.pintuan_product_num + "&sku_id=" + this.data.queryparams.sku_id,
            method: "GET",
            success: function(a) {
                a.success ? (delete a.success, delete a.msg, e.setData({
                    squareInfo: a.data.product,
                    pickupInfo: a.data.pickup,
                    productSubtotal: a.data.product_subtotal,
                    freight: a.data.product.freight_fee,
                    pintuanPrice: a.data.product.pintuan_price,
                    num: e.data.queryparams.pintuan_product_num,
                    skuStr: a.data.product.sku_str,
                    attrImg: e.data.queryparams.attrImg,
                    ActivityID: a.data.ActivityID,
                    showPickupType: "1" === a.data.pickup.EnableShopPickup ? 1 : 0,
                    showEnableExpress: "1" === a.data.EnableExpress ? 1 : 0,
                    pickupType: "1" === a.data.pickup.EnableShopPickup && "1" === a.data.pickup.EnableFirstPickup ? 2 : 1,
                    NickName: null == a.data.UserInfo.NickName ? "" : a.data.UserInfo.NickName,
                    Mobile: null == a.data.UserInfo.Mobile ? "" : a.data.UserInfo.Mobile,
                    LbsShopId: "1" == a.data.lbsNum ? a.data.lbsInfo.Id : "",
                    LbsShopName: "1" == a.data.lbsNum ? a.data.lbsInfo.Name : ""
                }), "1" === a.data.pickup.EnableShopPickup && e.setDefaultStoreInfo(), "0" === a.data.EnableExpress && "1" === a.data.pickup.EnableShopPickup ? e.setData({
                    pickupType: 2,
                    munblock: !1,
                    TotalMoney: a.data.product_subtotal.toFixed(2)
                }) : "1" === a.data.pickup.EnableShopPickup && "1" === a.data.pickup.EnableFirstPickup ? e.setData({
                    pickupType: 2,
                    munblock: !0,
                    TotalMoney: a.data.product_subtotal.toFixed(2)
                }) : e.setData({
                    pickupType: 1,
                    munblock: !0,
                    TotalMoney: (a.data.product_subtotal + a.data.freight_fee).toFixed(2)
                }), "1" == e.data.pickupType && e.getDefaultAddr()) : t.showModal({
                    title: "提示",
                    content: "获取结算信息失败：" + a.msg
                });
            },
            fail: function(e) {
                t.showModal({
                    title: "提示",
                    content: "获取结算信息失败：" + e
                });
            }
        });
    },
    changeShowLbsShop: function() {
        var e = this, a = void 0, i = void 0;
        wx.getStorageSync("lat") && wx.getStorageSync("lng") ? (a = wx.getStorageSync("lng"), 
        i = wx.getStorageSync("lat")) : wx.getLocation({
            type: "wgs84",
            success: function(t) {
                i = t.latitude, a = t.longitude;
            },
            fail: function(t) {}
        });
        var o = this.data.lbsList.length, n = Math.ceil(o / e.data.pageSize) + 1;
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getLbsStoreList&lng=" + a + "&lat=" + i + "&page=" + n + "&pageSize=" + e.data.pageSize,
            method: "Get",
            success: function(a) {
                if (a.success) {
                    for (var i = 0; i < a.lbsList.length; i++) e.data.lbsList.push(a.lbsList[i]);
                    e.setData({
                        lbsList: e.data.lbsList,
                        recordcount: a.count
                    });
                } else t.showModal({
                    title: "提示",
                    content: a.msg
                });
            }
        }), this.setData({
            showLbsShop: !0
        });
    },
    onlbsListScroll: function() {
        this.data.lbsList.length >= this.data.recordcount || this.changeShowLbsShop();
    },
    onLbsShopChange: function(t) {
        var e = t.currentTarget.dataset.lbsname, a = t.currentTarget.dataset.lbsid;
        this.setData({
            LbsShopName: e,
            LbsShopId: a,
            showLbsShop: !1
        });
    },
    onLbsShopOK: function(e) {
        this.data.LbsShopId ? this.setData({
            showLbsShop: !1
        }) : t.showModal({
            title: "提示",
            content: "请选择门店"
        });
    },
    getStartTime: function() {
        var t = this, e = new Date(), a = 60 * parseInt(t.data.pickupInfo.ShopPickupTime) * 60 * 1e3, i = new Date(e.getTime() + a), o = i.getMonth() + 1 < 10 ? "0" + (i.getMonth() + 1) : i.getMonth() + 1, n = i.getDate() < 10 ? "0" + i.getDate() : i.getDate(), s = i.getHours() < 10 ? "0" + i.getHours() : i.getHours(), r = i.getMinutes() < 10 ? "0" + (i.getMinutes() + 1) : i.getMinutes() + 1;
        return i.getFullYear() + "-" + o + "-" + n + " " + s + ":" + r;
    },
    onTimeSure: function() {
        var e = this.data.pickupInfo.ShopPickupStartTime.split(/[年月日时点:\s\-]+/), a = new Date(e[0], parseInt(e[1]) - 1, e[2], e[3], e[4]), i = this.data.PickupTime.split(/[年月日时点:\s\-]+/);
        if (new Date(i[0], parseInt(i[1]) - 1, i[2], i[3], i[4]) < a) {
            t.showModal({
                title: "提示",
                content: "取货时间必须大于" + e[0] + "-" + e[1] + "-" + e[2] + " " + e[3] + ":" + e[4]
            });
            var o = e[0] + "年" + e[1] + "月" + e[2] + "日 " + e[3] + ":" + e[4];
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
        });
    },
    getDefaultAddr: function() {
        var e = this;
        t.sendRequest({
            url: "/index.php?c=front/Useraddr&a=GetDefaultAddr",
            method: "POST",
            success: function(a) {
                if (a.success) {
                    if (e.setData({
                        defaultAddr: a.addr
                    }), a.addr) {
                        var i = a.addr.District;
                        e.getFreightByAddr(i);
                    }
                } else t.login({
                    forcereg: function() {
                        e.showRegUI({
                            onRegOrBindSuccess: function() {
                                page.setData({
                                    showUserReg: !1
                                }), e.loadSquareInfo();
                            }
                        });
                    },
                    success: function() {
                        e.loadSquareInfo();
                    }
                });
            },
            fail: function(e) {
                t.showModal({
                    title: "提示",
                    content: "获取用户默认配送地址失败：" + e
                });
            }
        });
    },
    getFreightByAddr: function(e) {
        var a = this;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=deliveryFee&district_id=" + e + "&products_str=" + this.data.squareInfo.product_id + "|" + this.data.queryparams.pintuan_product_num + "&ActivityID=" + a.data.ActivityID,
            method: "GET",
            hideLoading: !0,
            success: function(e) {
                if (e.success) {
                    var i = (a.data.productSubtotal + e.data.freight_fee).toFixed(2);
                    a.setData({
                        freight: e.data.freight_fee,
                        TotalMoney: i
                    });
                } else t.showModal({
                    title: "提示",
                    content: e.msg
                });
            },
            fail: function(e) {
                t.showModal({
                    title: "提示",
                    content: e
                });
            }
        });
    },
    changePickupType: function(t) {
        var e = this, a = t.currentTarget.dataset.type;
        this.data.pickupType != a && (this.setData({
            pickupType: parseInt(a)
        }), "2" == a ? e.setData({
            TotalMoney: e.data.productSubtotal
        }) : "1" == a && e.data.defaultAddr ? e.setData({
            TotalMoney: parseFloat(e.data.productSubtotal) + parseFloat(e.data.freight)
        }) : "1" != a || e.data.defaultAddr || e.getDefaultAddr());
    },
    onOrderSubmit: function(e) {
        var a = this, o = a.data.pickupType, n = e.detail.value, s = {};
        if (a.setData({
            fromId: e.detail.formId
        }), s.getProductType = this.data.pickupType, s.pintuan_id = this.data.queryparams.pintuan_id, 
        s.pintuan_product_id = this.data.queryparams.pintuan_product_id, s.pintuan_product_num = this.data.queryparams.pintuan_product_num, 
        s.pintuan_group_id = this.data.queryparams.pintuan_group_id, s.remark = n.Memo ? n.Memo : "", 
        s.sku_id = this.data.queryparams.sku_id, 1 == o) {
            if (!this.data.defaultAddr) return void t.showModal({
                title: "提示",
                content: "请选择地址..."
            });
            this.cityPicker.getDistrictCodeByName(this.data.defaultAddr.ProvinceName, this.data.defaultAddr.CityName, this.data.defaultAddr.DistrictName);
            s.address_id = this.data.defaultAddr.ID;
        } else if (2 == o) {
            if (n.LbsID ? s.pickupAddressID = n.LbsID : s.pickupAddressID = a.data.LbsShopId, 
            s.pickupTime = this.data.PickupTime, s.pickUserName = n.Contact, s.pickUserPhone = n.Mobile, 
            !this.data.LbsShopId) return void t.showModal({
                title: "提示",
                content: "请选择取货门店!"
            });
            if (!this.data.PickupTime) return void t.showModal({
                title: "提示",
                content: "请选择取货时间!"
            });
            if (!n.Contact) return void t.showModal({
                title: "提示",
                content: "请输入真实姓名!"
            });
            if (!n.Mobile) return void t.showModal({
                title: "提示",
                content: "请输入取货人手机号码!"
            });
            if (11 !== n.Mobile.length) return void t.showModal({
                title: "提示",
                content: "请输入正确的电话号码！"
            });
        }
        a.navigateBackFunc(!1);
        var r = function(e) {
            t.sendRequest({
                url: "/index.php?c=front/WxApp/ShopApi&a=payOrder",
                method: "POST",
                data: {
                    OrderID: e,
                    formid: a.data.fromId
                },
                success: function(t) {
                    t.success ? a.setData({
                        showSuccessPlug: !0,
                        paymentPlugShow: !1,
                        orderId: e
                    }) : wx.redirectTo({
                        url: "/pages/order/orderdetails/index?id=" + e + "&getproducttype=" + a.data.pickupType
                    });
                },
                fail: function(t) {
                    wx.reLaunch({
                        url: "/pages/order/orderdetails/index?id=" + e + "&getproducttype=" + a.data.pickupType
                    }), a.setData({
                        paymentPlugShow: !1
                    });
                }
            });
        }, c = function(e) {
            if ("1" === a.data.paymentFlag) a.setData({
                paymentPlugShow: !1
            }), r(e); else if ("2" === a.data.paymentFlag) {
                i.listen("websocket-connected", function(e) {
                    var a = {
                        client_id: e.clientid
                    };
                    t.sendRequest({
                        url: "/index.php?c=Front/WxApp/Socket&a=bind",
                        data: a,
                        method: "POST",
                        success: function(e) {
                            e.success || t.showModal({
                                title: "提示",
                                content: e.msg
                            });
                        },
                        fail: function(t) {}
                    });
                }), i.listen("auth-fail", function(t) {
                    console.log(t);
                }), i.listen("websocket-finishPay", function(t) {
                    console.log(t), setTimeout(function() {
                        a.setData({
                            processing: !1,
                            processing_text: t.order_status_text
                        });
                    }, 1e3), a.data.cur_socket.remove("websocket-finishPay");
                });
                var o = i.run();
                a.setData({
                    cur_socket: o
                }), t.wxPay(e, {
                    success: function() {
                        a.setData({
                            otherSuccessFlag: !0,
                            paymentPlugShow: !1,
                            orderId: e
                        }), setTimeout(function() {
                            a.setData({
                                markShow: !0
                            });
                        }, 200);
                    },
                    fail: function(i) {
                        "{}" != JSON.stringify(a.data.cur_socket) && a.data.cur_socket.close(), a.setData({
                            otherSuccessFlag: !0,
                            paymentPlugShow: !1
                        });
                        var o = "/pages/order/orderdetails/index?id=" + e + "&getproducttype=" + a.data.pickupType;
                        -1 == i.err_code && t.showModal({
                            title: "提示",
                            content: i.err_desc,
                            confirm: function(t) {
                                wx.redirectTo({
                                    url: o
                                });
                            }
                        });
                        var n = new RegExp(/requestPayment:fail:/);
                        if (i.errMsg.indexOf("requestPayment:fail:") > -1) {
                            var s = i.errMsg.replace(n, "");
                            t.showModal({
                                title: "提示",
                                content: s,
                                confirm: function(t) {
                                    wx.redirectTo({
                                        url: o
                                    });
                                }
                            });
                        }
                        "requestPayment:fail cancel" == i.errMsg && wx.redirectTo({
                            url: o
                        });
                    }
                });
            }
        };
        t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=createOrder",
            method: "POST",
            data: s,
            success: function(e) {
                e.success ? (c(e.data.OrderID), wx.setStorage({
                    key: "pintuan_group_id",
                    data: e.data.pintuan_group_id
                })) : t.showModal({
                    title: "提示",
                    content: e.msg
                });
            },
            fail: function(e) {
                t.showModal({
                    title: "提示",
                    content: e
                });
            }
        });
    },
    goOrderdetail: function() {
        wx.removeStorageSync("originTime"), wx.removeStorageSync("oldtime"), wx.removeStorageSync("pickerDateIndex"), 
        wx.removeStorageSync("newtime"), wx.removeStorageSync("val1"), wx.removeStorageSync("val2"), 
        wx.removeStorageSync("newVal1"), wx.removeStorageSync("newVal2"), wx.redirectTo({
            url: "/pages/order/orderdetails/index?id=" + this.data.orderId + "&getproducttype=" + this.data.pickupType
        });
    },
    closemask: function() {
        this.setData({
            showLbsShop: !1
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
    }
});