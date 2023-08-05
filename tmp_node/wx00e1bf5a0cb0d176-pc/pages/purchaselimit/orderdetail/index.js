var t = getApp(), e = (require("../../../components/utils/imgutil.js"), require("../../../common.js")), a = require("../../../components/utils/socket.js");

Page({
    isloading: !1,
    bannerLoaded: !1,
    url: !1,
    onShareAppMessage: function() {
        return t.shareAppMessage({
            url: this.url,
            title: this.data.productInfo.Name
        });
    },
    onLoad: function(a) {
        "2" === a.getproducttype ? this.setData({
            pickUpFlag: !0
        }) : this.setData({
            pickUpFlag: !1
        });
        var n = this;
        n.url = t.getPageUrl(n, a), t.registerGlobalFunctions(n), e.initCommonModules(), 
        this.setData({
            queryparams: a,
            hasrefunds: ""
        }), n.getBalanceNumber(), wx.getSystemInfo({
            success: function(t) {
                wx.setStorageSync("userSystemInfo", t);
            }
        });
    },
    onUnload: function() {
        clearTimeout(this.data.timer), "{}" != JSON.stringify(this.data.cur_socket) && this.data.cur_socket.close();
    },
    onHide: function() {
        clearTimeout(this.data.timer);
    },
    onShow: function() {
        var e = this;
        wx.getLocation({
            type: "wgs84",
            success: function(t) {
                var a = t.latitude, n = t.longitude;
                e.setData({
                    lat: a,
                    lng: n
                }), e.loadOrder({
                    lat: a,
                    lng: n
                });
            },
            fail: function(a) {
                e.loadOrder({
                    lat: t.globalData.baseInfo.Lat,
                    lng: t.globalData.baseInfo.Lng
                });
            }
        });
    },
    onPageScroll: function() {},
    changeData: function(t) {
        this.loadOrder();
    },
    backtrack: function() {
        var t = getCurrentPages();
        if (t.length > 1) {
            var e = t[t.length - 2];
            e && e.changeData([]);
        }
    },
    data: {
        currentTab: 0,
        baseUrl: t.globalData.siteBaseUrl,
        shows: !0,
        intervalTime: {
            minutes: 0,
            seconds: 0
        },
        interval: null,
        processing: !0,
        processing_text: "处理中",
        cur_socket: {},
        otherSuccessFlag: !1,
        markShow: !1,
        timer: "",
        TotalMoney: 0,
        balanceNumber: 0,
        removeCotainer: !0
    },
    loadOrder: function(e) {
        var a = this;
        if (!a.isloading) {
            a.isloading = !0;
            var n = 0;
            a.data.queryparams.id && (n = a.data.queryparams.id), t.sendRequest({
                url: "/index.php?c=Front/WxApp/ShopApi&a=OrderDetail&ID=" + n + "&lat=" + e.lat + "&lng=" + e.lng,
                method: "GET",
                success: function(o) {
                    if (a.isloading = !1, o.success) {
                        0 == o.data.Status && (o.data.Status = "未付款", a.setData({
                            pickupInfoHide: !0
                        })), 1 != o.data.Status && 7 != o.data.Status || (o.data.Status = "等待卖家发货"), 3 != o.data.Status && 8 != o.data.Status || (o.data.Status = "等待买家收货"), 
                        2 == o.data.Status && (o.data.Status = "已完成", a.setData({
                            pickupInfoHide: !0
                        })), 6 == o.data.Status && (o.data.Status = "退款完成", a.setData({
                            pickupInfoHide: !0
                        })), 9 == o.data.Status && (o.data.Status = "已付款，未取货", a.setData({
                            pickupInfoHide: !1
                        }), a.data.ispaying ? a.setData({
                            removeCotainer: !1
                        }) : a.setData({
                            removeCotainer: !0
                        })), 4 == o.data.Status && (o.data.Status = "交易关闭", a.setData({
                            pickupInfoHide: !0
                        }));
                        for (var i = 0; i < o.data.ProductList.length; i++) o.data.ProductList[i].RefundStatus ? o.data.ProductList[i].hasrefunds = !0 : o.data.ProductList[i].hasrefunds = !1;
                        a.setData({
                            orderinfo: o.data,
                            siteID: t.globalData.baseInfo.SiteID,
                            TotalMoney: o.data.OrderInfo.countmoney
                        });
                        var s = o.data.OrderLeftTime;
                        if (a.data.interval = setInterval(function() {
                            --s <= 0 && (s = 0, clearInterval(a.data.interval)), a.forMatterTime(s);
                        }, 1e3), "2" === o.data.OrderInfo.GetProductType) {
                            var r = JSON.parse(o.data.OrderInfo.PickupInfo);
                            a.setData({
                                pickUserName: r.pickUserName,
                                pickUserPhone: r.pickUserPhone
                            }), "未付款" == o.data.Status ? clearTimeout(a.data.timer) : "已完成" === o.data.Status || "交易关闭" === o.data.Status || "退款完成" === o.data.Status ? clearTimeout(a.data.timer) : e.again || a.getPickUpCode(n);
                        }
                    } else console.log("getProductInfo fail：" + o.msg);
                },
                fail: function(t) {
                    a.isloading = !1, console.log("getProductInfo fail");
                },
                hideLoading: !!e.again
            });
        }
    },
    forMatterTime: function(t) {
        var e = parseInt(t / 60 % 60, 10), a = parseInt(t % 60, 10);
        e = this.checkTime(e), a = this.checkTime(a), this.setData({
            intervalTime: {
                minutes: e,
                seconds: a
            }
        });
    },
    checkTime: function(t) {
        return t < 10 && (t = "0" + t), t;
    },
    setInterval: function() {
        var e = this;
        e.setData({
            timer: setTimeout(function() {
                wx.getLocation({
                    type: "wgs84",
                    success: function(t) {
                        var a = t.latitude, n = t.longitude;
                        e.loadOrder({
                            lat: a,
                            lng: n,
                            again: !0
                        });
                    },
                    fail: function(a) {
                        e.loadOrder({
                            lat: t.globalData.baseInfo.Lat,
                            lng: t.globalData.baseInfo.Lng,
                            again: !0
                        });
                    }
                });
            }, 5e3)
        });
    },
    getPickUpCode: function(e) {
        var a = this;
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getPickUpCode&ID=" + e,
            method: "GET",
            hideLoading: !0,
            success: function(t) {
                t.success ? (a.setData({
                    qrCodeUrl: t.qrCodeUrl,
                    pickupCode: t.code
                }), wx.downloadFile({
                    url: t.qrCodeUrl,
                    success: function(e) {
                        var n = wx.getStorageSync("userSystemInfo").screenWidth, o = n / 750 * 450, i = n / 750 * 500;
                        a.setData({
                            canvasWidth: parseInt(o),
                            canvasHeight: parseInt(i)
                        });
                        var s = n / 750 * 322, r = (o - s) / 2, c = e.tempFilePath, d = "取货号  " + t.code, u = wx.createCanvasContext("myCanvas");
                        u.setFillStyle("white"), u.fillRect(0, 0, o, i), u.drawImage(c, r, 20, s, s);
                        var l = .008 * n + r;
                        u.setFontSize(12), u.setFillStyle("#999"), u.setTextAlign("center"), u.fillText("出示二维码给商家扫一扫", o / 2, l + s);
                        var f = .08 * n + l;
                        u.setFontSize(15), u.setFillStyle("#000"), u.setTextAlign("center"), u.fillText(d, o / 2, f + s), 
                        u.draw(), setTimeout(function() {
                            wx.canvasToTempFilePath({
                                x: 0,
                                y: 0,
                                width: o,
                                height: i,
                                destWidth: 4 * o,
                                destHeight: 4 * i,
                                quality: 1,
                                fileType: "jpg",
                                canvasId: "myCanvas",
                                success: function(t) {
                                    a.setData({
                                        pickupImg: t.tempFilePath,
                                        qrcodeBtn: !0
                                    });
                                },
                                fail: function(t) {
                                    console.log("生成图片失败");
                                }
                            });
                        }, 1e3);
                    }
                })) : console.log(t);
            }
        });
    },
    goRefunds: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.pkey;
        wx.navigateTo({
            url: "/pages/refund/refundreson/index?orderid=" + e + "&pkey=" + a
        });
    },
    goRefundsuc: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.pkey;
        wx.navigateTo({
            url: "/pages/refund/refunddetails/index?orderid=" + e + "&pkey=" + a
        });
    },
    goRefundfail: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.pkey;
        wx.navigateTo({
            url: "/pages/refund/refundfail/index?orderid=" + e + "&pkey=" + a
        });
    },
    goRefundsWuliu: function(t) {
        var e = t.currentTarget.dataset.pkey;
        wx.navigateTo({
            url: "/pages/refund/refundlogistics/index?pkey=" + e
        });
    },
    ConfirmReceive: function(e) {
        var a = this, n = e.currentTarget.dataset.orderid, o = e.detail.formId;
        return wx.showModal({
            title: "提示",
            content: "确定收货吗？",
            success: function(e) {
                e.confirm ? t.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=ConfirmReceiving&orderid=" + n + "&formid=" + o,
                    method: "GET",
                    success: function(t) {
                        a.isloading = !1, t.success ? a.loadOrder(!0) : console.log("getProductList fail：" + t.msg);
                    },
                    fail: function(t) {
                        a.isloading = !1, console.log("getProductList fail");
                    }
                }) : e.cancel && console.log("用户点击取消");
            }
        }), !1;
    },
    goKuaidiUrl: function(t) {
        var e = t.currentTarget.dataset.company, a = t.currentTarget.dataset.postid;
        wx.navigateTo({
            url: "/pages/order/logisticsview/index?company=" + e + "&postid=" + a
        });
    },
    DelOrder: function(e) {
        var a = e.currentTarget.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确定取消订单吗？",
            success: function(e) {
                e.confirm ? t.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=cancelOrder&orderid=" + a,
                    method: "GET",
                    success: function(t) {
                        this.isloading = !1, t.success ? wx.reLaunch({
                            url: "/pages/order/orderlist/index?status=0"
                        }) : console.log("getProductList fail：" + t.msg);
                    },
                    fail: function(t) {
                        this.isloading = !1, console.log("getProductList fail");
                    }
                }) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    navbarTap: function(t) {
        this.setData({
            currentTab: t.currentTarget.dataset.idx
        });
    },
    showPaymentPlug: function(t) {
        var e = this, a = t.currentTarget.dataset.orderid;
        t.currentTarget.dataset.totalmoney, t.currentTarget.dataset.ordertype;
        e.setData({
            paymentPlugShow: !0,
            balanceflagNum: e.data.balanceNumber - e.data.TotalMoney < 0,
            paymentFlag: e.data.balanceNumber - e.data.TotalMoney >= 0 ? "1" : "2",
            curOrderId: a
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
                    content: e
                });
            }
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
                    paymentPlugShow: !1,
                    curOrderId: ""
                }) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    Gopay: function(e) {
        var n = this.data.curOrderId, o = e.detail.formId, i = (this.data.queryparams.orderType, 
        this), s = function(e) {
            var a = function() {
                i.loadOrder(!0);
            };
            t.sendRequest({
                url: "/index.php?c=front/WxApp/ShopApi&a=payOrder",
                method: "POST",
                data: {
                    OrderID: e,
                    formid: o
                },
                success: function(e) {
                    e.success ? (i.loadOrder(!0), t.showModal({
                        title: "提示",
                        content: "支付成功",
                        confirm: a
                    })) : t.showModal({
                        title: "提示",
                        content: "支付失败：" + e.msg
                    });
                },
                fail: function(e) {
                    t.showModal({
                        title: "提示",
                        content: "支付失败：" + e
                    }), i.loadOrder(!0);
                }
            });
        };
        !function(e) {
            if ("1" === i.data.paymentFlag) i.setData({
                paymentPlugShow: !1,
                removeCotainer: !0
            }), s(e); else if ("2" === i.data.paymentFlag) {
                i.setData({
                    ispaying: !0
                }), a.listen("websocket-connected", function(e) {
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
                }), a.listen("websocket-finishPay", function(t) {
                    console.log(t), setTimeout(function() {
                        i.setData({
                            removeCotainer: !1,
                            processing: !1,
                            processing_text: t.order_status_text
                        });
                    }, 1e3), i.data.cur_socket.remove("websocket-finishPay");
                });
                var n = a.run();
                i.setData({
                    cur_socket: n
                }), t.wxPay(e, {
                    success: function() {
                        i.setData({
                            otherSuccessFlag: !0,
                            orderId: e,
                            paymentPlugShow: !1
                        }), setTimeout(function() {
                            i.setData({
                                markShow: !0
                            });
                        }, 200);
                    },
                    fail: function(t) {
                        i.setData({
                            paymentPlugShow: !1
                        }), "{}" != JSON.stringify(i.data.cur_socket) && i.data.cur_socket.close();
                    }
                });
            }
        }(n);
    },
    DeleteOrder: function(e) {
        var a = this, n = {
            orderid: e
        };
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=delOrder",
            method: "POST",
            data: n,
            success: function(e) {
                e.success ? a.loadOrder(!0) : t.showModal({
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
    call: function() {
        this.data.orderinfo.OrderInfo.PickupMobile && wx.makePhoneCall({
            phoneNumber: this.data.orderinfo.OrderInfo.PickupMobile
        });
    },
    navigation: function() {
        var t = this, e = Number(t.data.orderinfo.OrderInfo.Lantitude), a = Number(t.data.orderinfo.OrderInfo.Longtitude);
        e > 0 && a > 0 && wx.openLocation({
            name: t.data.orderinfo.OrderInfo.PickupStoreName,
            address: t.data.orderinfo.OrderInfo.PickupAddress,
            longitude: Number(a),
            latitude: Number(e)
        });
    },
    saveImageToPhotosAlbum: function() {
        wx.showLoading({
            title: "保存中...",
            mask: !0
        });
        var t = this;
        wx.saveImageToPhotosAlbum({
            filePath: t.data.pickupImg,
            success: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "已保存到相册",
                    icon: "success"
                });
            },
            fail: function(t) {
                (t.errMsg.indexOf("auth deny") > -1 || t.errMsg.indexOf("auth denied") > -1) && wx.openSetting({
                    success: function(t) {}
                }), wx.hideLoading();
            }
        });
    },
    magnify: function(t) {
        if (this.data.qrcodeBtn) {
            var e = t.target.dataset.src;
            wx.previewImage({
                current: e,
                urls: [ e ],
                fail: function() {
                    console.log("fail");
                },
                complete: function() {
                    console.info("点击图片了");
                }
            });
        }
    },
    goOrderdetail: function() {
        this.setData({
            ispaying: !1,
            otherSuccessFlag: !1,
            removeCotainer: !0,
            processing: !0,
            processing_text: "处理中"
        }), this.loadOrder(!0);
    }
});