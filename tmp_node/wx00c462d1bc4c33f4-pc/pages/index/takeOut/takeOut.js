function o(o, e, t) {
    return e in o ? Object.defineProperty(o, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[e] = t, o;
}

var e, t = require("../../../utils/util.js"), a = getApp().globalData.httpUrl;

Page({
    data: {
        submitedOrder: !1,
        display: "none",
        indx: 0,
        clicked: !1,
        guigetogFlg: "block",
        guigetogFlg1: "none",
        guige: !1,
        borderLeft: "4px solid #ffbf1f",
        leftBorder: [],
        cdFlg: "block",
        cdFlg1: "block",
        tcFlg: "none",
        tcFlg1: "flex",
        tcFlg2: "absolute",
        a: "",
        httpUrl: a,
        cartUrl: "../../../images/notShopping.png",
        bcgcolor: "#333",
        colo: "#999",
        naviFlg: !1,
        goods: [],
        toView: "",
        scrollTop: 100,
        dcBeizhu: "",
        qisongfei: 20,
        distriFeePrice: 3,
        totalPrice: 0,
        totalCount: 0,
        canhefei: 0,
        carArray: [],
        minPrice: 0,
        editType: "N",
        payDesc: "",
        fold: !0,
        selectFoods: [ {
            price: 20,
            count: 2
        } ],
        cartShow: "none",
        status: 0,
        url: "",
        showPopup: !1,
        pageBackgroundColor: "#333",
        wmFlg: !1,
        disp: "none",
        deskNum: "",
        dcFlg: !1,
        catalogSelect: 0,
        huodongs: []
    },
    onLoad: function(o) {
        e = this, t.getShareInfos(e, a), t.setCompanyId(e, o), t.setStoreId(e), wx.setStorage({
            key: "dcBeizhu",
            data: ""
        }), wx.setStorage({
            key: "couponInfo",
            data: ""
        }), console.log("===takeOut onload start==="), wx.getStorage({
            key: "ydFlg",
            success: function(o) {
                console.log("不知道是点餐还是外卖====》" + o.data), e.setData({
                    ydFlg: o.data
                });
            }
        });
        var r = o.zuohao, d = o.flag, n = o.orderId, i = o.editType;
        e.setData({
            flag: d,
            editType: i,
            orderId: n
        }), wx.setStorage({
            key: "editType",
            data: e.data.editType
        }), r && e.setData({
            zuohao: r
        }), wx.getStorage({
            key: "storeInfo",
            success: function(o) {
                var t = o.data.storeInfoBoxPrice;
                null != t && "" != t && void 0 != t || (t = 0), e.setData({
                    canhefei: t
                });
            }
        }), wx.getStorage({
            key: "storeInfo",
            success: function(o) {
                wx.setNavigationBarTitle({
                    title: o.data.storeInfoName
                }), e.setData({
                    storeInfo: o.data
                }), e.changeSubmit(!1);
            }
        }), wx.getStorage({
            key: "dcFlg",
            success: function(o) {
                e.setData({
                    dcFlg: o.data
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
            key: "storeId",
            success: function(o) {
                wx.request({
                    url: a + "skfoodmodel/selFoodActivityByStoreId",
                    data: {
                        storeId: o.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(o) {
                        var t = 85 * o.data.length;
                        e.setData({
                            huodongs: o.data,
                            huodongHeight: t
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "storeId",
            success: function(o) {
                wx.request({
                    url: a + "skfoodmodel/selFoodTypeAndFood",
                    data: {
                        storeId: o.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(o) {
                        var t = o.data;
                        e.setData({
                            goods: t
                        }), wx.setStorage({
                            key: "goods",
                            data: t
                        }), d && wx.request({
                            url: a + "skordermodel/getOrderById",
                            data: {
                                id: n,
                                orderType: d
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(o) {
                                console.log(o.data), e.setData({
                                    zuohao: o.data.orderTableId,
                                    orderId: o.data.id
                                });
                                var t = e.data.goods;
                                for (var a in o.data.foodList) !function(a) {
                                    var r = t.find(function(e) {
                                        return e.id == o.data.foodList[a].foodTypeId;
                                    });
                                    if (r) {
                                        var d = r.foodList.find(function(e) {
                                            return e.id == o.data.foodList[a].foodId;
                                        }), n = void 0, i = void 0, s = o.data.foodList[a].foodId, c = o.data.foodList[a].realPrice, l = o.data.foodList[a].foodTypeId, g = o.data.foodList[a].receivablePrice;
                                        if (o.data.foodList[a].foodSizeId) {
                                            var f = d.foodSizeList.find(function(e) {
                                                return e.id == o.data.foodList[a].foodSizeId;
                                            });
                                            n = o.data.foodList[a].foodCount, i = o.data.foodList[a].foodName + "(" + o.data.foodList[a].sizeName + ")", 
                                            f.foodSizeCount = n;
                                        } else n = o.data.foodList[a].foodCount, i = o.data.foodList[a].foodName, d.foodCount = n;
                                        console.log("receivablePrice ==> " + g), e.refreshShopingCar(s, c, n, i, l, g);
                                    }
                                }(a);
                                e.changeSubmit(!0), e.setData({
                                    goods: t,
                                    clickAble: !0,
                                    cartUrl: "../../../images/shopping.png"
                                });
                            }
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "wmFlg",
            success: function(o) {
                e.setData({
                    wmFlg: o.data
                }), o.data ? wx.getStorage({
                    key: "deliveryPrice",
                    success: function(o) {
                        e.setData({
                            distriFeePrice: o.data
                        });
                    }
                }) : e.setData({
                    distriFeePrice: 0
                });
            }
        });
    },
    selguige: function(o) {
        console.log("===selguige===");
        var t = o.currentTarget.dataset.foodSize, a = o.currentTarget.dataset.indx, r = o.currentTarget.dataset.guigeIndex, d = o.currentTarget.dataset.foodsizelist, n = [], i = [];
        for (var s in d) n[s] = "#666", i[s] = "#efefef";
        n[r] = "#ffbf21", i[r] = "#35343a", e.setData({
            foodSize: t,
            foodSizeList: d,
            bgColors: n,
            colors: i,
            indx: a
        }), console.log(a);
    },
    xuanguige: function(o) {
        console.log("===xuanguige===");
        var t = o.currentTarget.dataset.foodCount, a = o.currentTarget.dataset.foodPrice, r = o.currentTarget.dataset.foodId, d = [], n = [];
        d[0] = "#ffbf21", n[0] = "#35343a", e.setData({
            guige: r,
            foodCount: t,
            foodPrice: a,
            indx: 0,
            bgColors: d,
            colors: n,
            cdFlg1: "none"
        });
    },
    togguige: function() {
        e.setData({
            guigetogFlg: "none",
            guigetogFlg1: "block"
        });
    },
    resum: function() {
        e.setData({
            guige: !1,
            cdFlg1: "block"
        });
    },
    changeColor: function() {
        var o = (this.data.pageBackgroundColor, "#ffbf1f");
        this.setData({
            pageBackgroundColor: o
        });
    },
    chooseCatalog: function(o) {
        e.setData({
            catalogSelect: o.currentTarget.dataset.select
        });
    },
    empty: function(t) {
        var a, r = e.data.goods;
        for (var d in r) for (var n in r[d].foodList) if (r[d].foodList[n].foodCount = 0, 
        r[d].foodList[n].foodSizeList.length > 0) for (var i in r[d].foodList[n].foodSizeList) r[d].foodList[n].foodSizeList[i].foodSizeCount = 0;
        e.setData((a = {
            goods: r,
            cartShow: "none",
            fold: !0,
            clickAble: !1,
            cartUrl: "../../../images/notShopping.png",
            bcgcolor: "#333",
            colo: "#999",
            naviFlg: !1,
            totalPrice: 0,
            totalCount: 0,
            otherPagePrice: 0,
            otherPageCount: 0
        }, o(a, "totalPrice", 0), o(a, "carArray", []), a));
    },
    calTotalPrice: function() {
        for (var o = this.data.carArray, t = 0, a = 0, r = 0, d = e.data.distriFeePrice, n = 0; n < o.length; n++) t += 1 * o[n].price, 
        a += 1 * o[n].receivablePrice, r += 1 * o[n].num;
        var i = t;
        console.log("totalCount ==> " + r), console.log("totalPrice ==> " + t), console.log("totalReceivablePrice ==> " + a), 
        e.setData({
            finalPrice: parseFloat(i).toFixed(2),
            totalReceivablePrice: parseFloat(a).toFixed(2),
            totalPrice: parseFloat(t).toFixed(2),
            totalCount: r,
            distriFeePrice: parseFloat(d).toFixed(2)
        });
    },
    toggleList: function() {
        if (e.data.totalCount) {
            e.setData({
                fold: !e.data.fold
            });
            var o = e.data.fold;
            e.cartShow(o);
        }
    },
    cartShow: function(o) {
        0 == o ? e.setData({
            cartShow: "block"
        }) : e.setData({
            cartShow: "none"
        });
    },
    resume: function() {
        e.setData({
            disp: "none",
            display: "none"
        });
    },
    fixNull: function(o) {
        return null == o && (o = ""), o;
    },
    togglePopup: function(o) {
        wx.setStorage({
            key: "foodId",
            data: o.currentTarget.dataset.foodId
        }), wx.setStorage({
            key: "carArray",
            data: e.data.carArray
        }), wx.setStorage({
            key: "goods",
            data: e.data.goods
        }), wx.navigateTo({
            url: "queryOrder/queryOrder"
        });
    },
    tohuodongs: function(o) {
        wx.setStorage({
            key: "carArray",
            data: e.data.carArray
        }), wx.setStorage({
            key: "foodId",
            data: o.currentTarget.dataset.foodId
        }), wx.setStorage({
            key: "goods",
            data: e.data.goods
        }), wx.navigateTo({
            url: "queryFood/queryFood"
        });
    },
    onReady: function() {
        console.log("===onReady===");
    },
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.getStorage({
            key: "goods",
            success: function(o) {
                e.setData({
                    goods: o.data
                });
            }
        }), console.log(e.data.back), e.data.back && (e.setData({
            back: !1
        }), e.empty()), wx.onSocketMessage(function(o) {
            console.log("===========接收到服务器信息=============="), console.log(o.data), t.getTkInfos(e, o);
        }), console.log("===onShow==="), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(o) {
                    t.conSocket(o.data);
                }
            });
        }), wx.getStorage({
            key: "carArray",
            success: function(o) {
                e.setData({
                    carArray: o.data
                }), e.changeFoodOnBack(), e.calTotalPrice(), e.data.totalCount > 0 && e.setData({
                    cartUrl: "../../../images/shopping.png"
                }), 0 == e.data.carArray.length ? (e.changeSubmit(!1), e.setData({
                    clickAble: !1,
                    cartUrl: "../../../images/notShopping.png"
                })) : (e.changeSubmit(!0), e.setData({
                    clickAble: !0,
                    cartUrl: "../../../images/shopping.png"
                }));
            }
        });
    },
    onHide: function() {
        console.log("===onHide==="), e.setData({
            back: !0
        }), console.log(e.data.back);
    },
    onUnload: function() {
        console.log("===onUnload==="), t.closeSock();
    },
    onPullDownRefresh: function() {
        console.log("===onPullDownRefresh==="), wx.stopPullDownRefresh(), e = this, setTimeout(function() {
            e.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {
        console.log("===onReachBottom===");
    },
    onShareAppMessage: function() {
        return {
            title: e.data.shareTitle,
            desc: "",
            imageUrl: e.data.shareImgUrl,
            path: "/pages/index/index?storeId=" + e.data.storeId + "&companyId=" + e.data.companyId,
            success: function(o) {
                console.log("转发成功");
            },
            fail: function(o) {
                console.log("转发失败");
            }
        };
    },
    bindDesk: function(o) {
        e.setData({
            deskNum: o.detail.value
        }), wx.setStorage({
            key: "deskNum",
            data: o.detail.value
        });
    },
    bindBeizhu: function(o) {
        var t = o.detail.value;
        null == t || void 0 == t || "undefined" == t || "null" == t ? (t = "", e.setData({
            dcBeizhu: ""
        })) : e.setData({
            dcBeizhu: t
        }), wx.setStorage({
            key: "dcBeizhu",
            data: t
        });
    },
    togBorder: function(o) {
        for (var t = o.currentTarget.dataset.itemindex, a = [], r = 0; r < e.data.goods.length; r++) a[r] = "none";
        a[t] = "4px solid #ffbf1f", e.setData({
            leftBorder: a,
            borderLeft: "none"
        });
        var d = o.currentTarget.dataset.itemIndex;
        e.setData({
            toView: "order" + d,
            key: o.currentTarget.dataset.itemIndex
        });
    },
    togBorder1: function(o) {
        for (var t = [], a = 0; a < e.data.goods.length; a++) t[a] = "none";
        e.setData({
            leftBorder: t,
            borderLeft: "4px solid #ffbf1f"
        });
        var r = o.currentTarget.dataset.itemIndex;
        e.setData({
            toView: "order" + r,
            key: o.currentTarget.dataset.itemIndex
        });
    },
    gotype: function(o) {
        var t = o.detail.scrollTop;
        e.getFoodType(t);
    },
    tolower: function(o) {
        console.log("===tolower===");
    },
    getFoodType: function(o) {
        var t = e.data.goods, a = e.data.huodongHeight;
        if (o < a) {
            for (var r = [], d = 0; d < e.data.goods.length; d++) r[d] = "none";
            e.setData({
                leftBorder: r,
                borderLeft: "4px solid #ffbf1f"
            });
        } else {
            var n = [];
            for (var i in t) n[i] = "none";
            var s = 0;
            for (var c in t) {
                var l = [];
                if (l[c] = 76 * t[c].foodList.length + 20, s = 1 * s + 1 * l[c], o - a < s) return n[c] = "4px solid #ffbf1f", 
                void e.setData({
                    leftBorder: n,
                    borderLeft: "none"
                });
            }
        }
    },
    changeSubmit: function(o) {
        o ? e.setData({
            bcgcolor: "#ffbf21",
            colo: "#3f3d40",
            payDesc: "下单"
        }) : (wx.getStorage({
            key: "wmFlg",
            success: function(o) {
                if (o.data) {
                    var t = e.data.storeInfo.storeInfoCharging;
                    console.log("起送费" + t), null != t && void 0 != t && "" != t || (t = 0), e.setData({
                        payDesc: "￥" + t + "起送"
                    });
                } else e.setData({
                    payDesc: "下单"
                });
            }
        }), e.setData({
            bcgcolor: "#333",
            colo: "#999"
        }));
    },
    addCount: function(o) {
        e.setFoodInfo(o, 1);
    },
    minusCount: function(o) {
        e.setFoodInfo(o, -1);
    },
    changeFoodOnBack: function() {
        var o = e.data.goods;
        console.log("===changeFoodOnBack==="), console.log(o), e.setData({
            goods: o
        });
    },
    setFoodInfo: function(o, t) {
        var a = o.currentTarget.dataset.foodId;
        console.log("foodId == > " + a), console.log("count == > " + t);
        var r = o.currentTarget.dataset.typeId, d = o.currentTarget.dataset.foodSize;
        console.log("typeId == > " + r);
        var n = e.data.goods, i = n.find(function(o) {
            return o.id == r;
        }).foodList, s = i.find(function(o) {
            return a == o.id;
        });
        if (!s) {
            console.log("food == > " + !s);
            for (var c in i) if (console.log(i[c].foodSizeList), d = i[c].foodSizeList.find(function(o) {
                return o.id == a;
            })) {
                s = i.find(function(o) {
                    return d.foodId == o.id;
                });
                break;
            }
        }
        console.log("food == > "), console.log(s);
        var l = void 0, g = 0, f = "", u = 0, p = 0;
        console.log(s), console.log(d), s.foodSizeList.length > 0 ? (console.log("===多规格==="), 
        l = s.foodSizeList.find(function(o) {
            return o.id == d.id;
        }), a = l.id, console.log(l), f = s.foodName + "(" + l.name + ")", l.foodSizeCount = 1 * l.foodSizeCount + t, 
        p = l.foodSizeCount, "0" == l.discountFlg ? (g = e.data.wmFlg ? l.priceW : l.priceT, 
        u = e.data.wmFlg ? l.priceW : l.priceT) : (g = e.data.wmFlg ? l.priceWZ : l.priceTZ, 
        u = e.data.wmFlg ? l.priceWZ : l.priceTZ)) : (f = s.foodName, s.foodCount = 1 * s.foodCount + t, 
        p = s.foodCount, u = e.data.wmFlg ? s.priceW : s.priceT, g = "0" == s.discountFlg ? e.data.wmFlg ? s.priceW : s.priceT : e.data.wmFlg ? s.priceWZ : s.priceTZ), 
        console.log("foodName == >" + f), console.log("price == >" + g), console.log("foodCount == >" + p), 
        e.refreshShopingCar(a, g, p, f, r, u);
        var h = e.data.carArray;
        0 == s.foodCount && 0 == h.length ? (e.changeSubmit(!1), e.setData({
            goods: n,
            clickAble: !1,
            cartUrl: "../../../images/notShopping.png"
        })) : (e.changeSubmit(!0), e.setData({
            goods: n,
            clickAble: !0,
            cartUrl: "../../../images/shopping.png"
        }));
    },
    refreshShopingCar: function(o, t, a, r, d, n) {
        var i = e.data.carArray, s = void 0, c = i.find(function(e) {
            return e.foodId == o;
        });
        if (c) {
            c.foodId = o;
            var l = t * a, g = n * a;
            if (c.price = l.toFixed(2), c.receivablePrice = g.toFixed(2), c.num = a, c.name = r, 
            0 == a) {
                for (var f = 0, u = 0; u < i.length; u++) o == i[u].foodId && (f = u);
                i.splice(f, 1), console.log("carArray.length ==> " + i.length), 0 == i.length && (e.setCarShowSate(!1), 
                e.setData({
                    cartUrl: "../../../images/notShopping.png"
                }), console.log(e.data.cartUrl));
            }
        } else s = {
            foodId: o,
            price: t,
            num: a,
            name: r,
            typeId: d,
            receivablePrice: n
        }, i.push(s);
        e.calTotalPrice(), console.log("carArray ==>"), console.log(i), console.log("carArray ==>"), 
        e.setData({
            carArray: i
        });
    },
    chkOrder: function() {
        e.setData({
            display: "none"
        });
        var o = e.data.clickAble, t = e.data.storeInfo.storeInfoCharging;
        console.log("起送费" + t);
        var a = e.data.totalPrice;
        if (console.log("菜价" + a), 1 * a < 1 * t && 1 == e.data.wmFlg) wx.showModal({
            title: "提示",
            content: "未达到起送费"
        }); else if (o) if (console.log("是否可以下单======>" + e.data.dcFlg), console.log("是否可以下单flag======>" + e.data.flag), 
        e.data.dcFlg || "D" == e.data.flag) {
            var r = e.data.zuohao, d = e.data.dcBeizhu;
            null != d && void 0 != d || wx.setStorage({
                key: "dcBeizhu",
                data: ""
            }), null == r || "" == r ? e.setData({
                disp: "block"
            }) : e.sendOrder("", r);
        } else e.sendOrder();
    },
    sendOrder: function(o, t) {
        if (!e.data.submitedOrder) {
            if (e.setData({
                submitedOrder: !0
            }), console.log("是否可以下单2======>" + e.data.dcFlg), console.log("桌号======>" + t), 
            e.data.dcFlg && !t && ("" == (t = e.data.deskNum) || null == t || void 0 == t)) return e.setData({
                submitedOrder: !1
            }), void wx.showModal({
                title: "提醒",
                content: "请输入桌号"
            });
            wx.getStorage({
                key: "userId",
                success: function(o) {
                    var r = o.data;
                    wx.getStorage({
                        key: "storeId",
                        success: function(o) {
                            var d = o.data;
                            wx.getStorage({
                                key: "orderType",
                                success: function(o) {
                                    var n = o.data, i = [];
                                    for (var s in e.data.goods) !function(o) {
                                        var t = e.data.goods[o].foodList;
                                        for (var a in t) !function(o) {
                                            if (t[o].foodSizeList.length > 0) {
                                                for (var a in e.data.carArray) for (var r in t[o].foodSizeList) if (t[o].foodSizeList[r].id == e.data.carArray[a].foodId && t[o].foodSizeList[r].foodSizeCount > 0) {
                                                    console.log("foodShuzu[food].id======>" + t[o].id);
                                                    var d = i.find(function(e) {
                                                        return console.log("这到底是啥啊======>" + e.id), e.id == t[o].id;
                                                    });
                                                    d ? console.log("这是哪=====>" + d) : i.push(t[o]);
                                                }
                                            } else for (var n in e.data.carArray) t[o].id == e.data.carArray[n].foodId && i.push(t[o]);
                                        }(a);
                                    }(s);
                                    t || (t = e.data.deskNum), console.log(t), console.log(i), e.data.ydFlg ? wx.getStorage({
                                        key: "orderId",
                                        success: function(s) {
                                            console.log("我在走预定"), console.log(e.data.orderId), wx.request({
                                                url: a + "skordermodel/insertOrderInfo",
                                                method: "POST",
                                                header: {
                                                    "content-type": "application/x-www-form-urlencoded"
                                                },
                                                data: {
                                                    wechatUserId: r,
                                                    storeId: d,
                                                    orderTableId: t,
                                                    orderReceivablePrice: e.data.totalReceivablePrice,
                                                    orderRealPrice: e.data.totalPrice,
                                                    orderType: o.data,
                                                    foodList: JSON.stringify(i),
                                                    id: s.data
                                                },
                                                success: function(o) {
                                                    e.setData({
                                                        submitedOrder: !1
                                                    }), console.log("===insertOrderInfo success==="), console.log("res.data.jsonEntity ==>" + o.data.jsonEntity), 
                                                    console.log("res.data.jsonEntity ==>" + n), console.log("that.data.wmFlg=======>" + e.data.wmFlg), 
                                                    e.data.wmFlg ? wx.redirectTo({
                                                        url: "../order/evalOrder/submitOrder/submitOrder?orderId=" + o.data.jsonEntity + "&orderType=" + n
                                                    }) : wx.redirectTo({
                                                        url: "../order/evalOrder/evalOrder?orderId=" + o.data.jsonEntity + "&orderType=" + n
                                                    });
                                                },
                                                fail: function(o) {
                                                    wx.showToast({
                                                        title: "下单失败"
                                                    });
                                                }
                                            });
                                        }
                                    }) : e.data.dcFlg ? wx.request({
                                        url: a + "skordermodel/insertOrderInfo",
                                        method: "POST",
                                        header: {
                                            "content-type": "application/x-www-form-urlencoded"
                                        },
                                        data: {
                                            wechatUserId: r,
                                            storeId: d,
                                            orderTableId: t,
                                            orderReceivablePrice: e.data.totalReceivablePrice,
                                            orderRealPrice: e.data.totalPrice,
                                            orderType: o.data,
                                            foodList: JSON.stringify(i),
                                            id: e.data.orderId,
                                            orderRemarke: e.data.dcBeizhu
                                        },
                                        success: function(o) {
                                            e.setData({
                                                submitedOrder: !1
                                            }), console.log("===insertOrderInfo success==="), wx.redirectTo({
                                                url: "../order/evalOrder/evalOrder?orderId=" + o.data.jsonEntity + "&orderType=" + n
                                            });
                                        },
                                        fail: function(o) {
                                            wx.showToast({
                                                title: "下单失败"
                                            });
                                        }
                                    }) : e.data.wmFlg && wx.request({
                                        url: a + "skordermodel/insertOrderInfo",
                                        method: "POST",
                                        header: {
                                            "content-type": "application/x-www-form-urlencoded"
                                        },
                                        data: {
                                            wechatUserId: r,
                                            storeId: d,
                                            orderTableId: t,
                                            orderReceivablePrice: e.data.totalReceivablePrice,
                                            orderRealPrice: e.data.totalPrice,
                                            orderType: o.data,
                                            foodList: JSON.stringify(i),
                                            id: e.data.orderId
                                        },
                                        success: function(o) {
                                            e.setData({
                                                submitedOrder: !1
                                            }), wx.redirectTo({
                                                url: "../order/evalOrder/submitOrder/submitOrder?orderId=" + o.data.jsonEntity + "&orderType=" + n
                                            });
                                        },
                                        fail: function(o) {
                                            wx.showToast({
                                                title: "下单失败"
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
    },
    setCarShowSate: function(o) {
        o ? e.setData({
            cartShow: "block"
        }) : e.setData({
            cartShow: "none"
        });
    },
    util: function(o) {
        var e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = e, e.opacity(0).rotateX(-100).step(), this.setData({
            animationData: e.export()
        }), setTimeout(function() {
            e.opacity(1).rotateX(0).step(), this.setData({
                animationData: e
            }), "close" == o && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == o && this.setData({
            showModalStatus: !0
        });
    },
    askFor: function() {
        "#ffbf21" == e.data.bcgcolor ? wx.getStorage({
            key: "userId",
            success: function(o) {
                wx.getStorage({
                    key: "storeId",
                    success: function(t) {
                        wx.getStorage({
                            key: "orderType",
                            success: function(r) {
                                wx.request({
                                    url: a + "skordermodel/selUnpaidOrder",
                                    data: {
                                        wechatUserId: o.data,
                                        orderType: r.data,
                                        storeId: t.data
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(o) {
                                        "操作成功！" == o.data.msg ? o.data.count > 0 && "N" != e.data.editType ? (e.setData({
                                            display: "block",
                                            orderId: o.data.orderId
                                        }), console.log(e.data.display)) : e.chkOrder() : wx.showModal({
                                            title: "获取未支付订单操作失败",
                                            content: "请联系后台管理员"
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }) : wx.showModal({
            title: "",
            content: "当前没有点餐，不可下单"
        });
    }
});