function o(o, e, t) {
    return e in o ? Object.defineProperty(o, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[e] = t, o;
}

var e, t = require("../../../../utils/util.js"), a = getApp().globalData.httpUrl;

Page({
    data: {
        dcBeizhu: "",
        scroFlag: "",
        otherPagePrice: 0,
        otherPageCount: 0,
        totalCount: 0,
        cartShow: "none",
        count: 0,
        cartUrl: "../../../../images/notShopping.png",
        clicked: "block",
        httpUrl: a,
        infos: [],
        yhtjTitle: "",
        yhtjPrice: "",
        price: 0,
        extra: "3",
        toBuyNum: 0,
        likeNum: 0,
        unlikeNum: 0,
        descriptionText: "",
        disp: "none",
        foodData: "",
        display: "none",
        clickabled: !0,
        emptyed: !1
    },
    onLoad: function(o) {
        e = this, t.getShareInfos(e, a), t.setCompanyId(e, o), t.setStoreId(e), t.setStoreInfo(e), 
        wx.getStorage({
            key: "goods",
            success: function(o) {
                e.setData({
                    goods: o.data
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
            key: "ydFlg",
            success: function(o) {
                e.setData({
                    ydFlg: o.data
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
            key: "foodId",
            success: function(o) {
                wx.request({
                    url: a + "skfoodmodel/selFoodByActivityId",
                    data: {
                        id: o.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(o) {
                        var t = o.data;
                        console.log("=============skfoodmodel/selFoodByActivityId============="), console.log(t), 
                        e.setData({
                            foodData: t
                        }), console.log(e.data.foodData), console.log(e), console.log("=============skfoodmodel/selFoodByActivityId============="), 
                        wx.getStorage({
                            key: "carArray",
                            success: function(o) {
                                var t = o.data;
                                t && t.length > 0 && (e.setData({
                                    carArray: t,
                                    cartUrl: "../../../../images/shopping.png"
                                }), e.calTotalPrice()), e.setData({
                                    carArray: t
                                }), e.changeFoodOnBack(), e.checkCount();
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
    checkCount: function() {
        e.data.totalCount > 0 ? (e.changeSubmit(!0), e.setData({
            cartUrl: "../../../../images/shopping.png",
            clicked: "none"
        })) : (e.changeSubmit(!1), e.setData({
            cartUrl: "../../../../images/notShopping.png",
            clicked: "block"
        }));
    },
    changeFoodOnBack: function() {
        var o = e.data.goods;
        console.log("===changeFoodOnBack==="), console.log(e), console.log(o), e.setData({
            goods: o
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
        e = this, console.log(e.data.back), e.data.back && (e.setData({
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
        });
    },
    onHide: function() {
        console.log("===onHide==="), e.setData({
            back: !0
        }), console.log(e.data.back);
    },
    onUnload: function() {
        console.log("===onUnload==="), t.closeSock(), wx.setStorage({
            key: "carArray",
            data: e.data.carArray
        }), wx.setStorage({
            key: "goods",
            data: e.data.goods
        });
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
    setCarShowSate: function(o) {
        o ? e.setData({
            cartShow: "block",
            scroFlag: "hidden"
        }) : e.setData({
            cartShow: "none",
            scroFlag: ""
        });
    },
    selguige: function(o) {
        var t = o.currentTarget.dataset.foodSize, a = o.currentTarget.dataset.indx, n = o.currentTarget.dataset.guigeIndex, r = o.currentTarget.dataset.foodsizelist, d = [], c = [];
        for (var s in r) d[s] = "#666", c[s] = "#efefef";
        d[n] = "#ffbf21", c[n] = "#35343a", e.setData({
            foodSizeList: r,
            bgColors: d,
            colors: c,
            indx: a,
            foodSize: t
        });
    },
    resum: function() {
        e.setData({
            guige: !1,
            scroFlag: "",
            clickabled: !0
        });
    },
    chkOrder: function() {
        if (e.setData({
            display: "none"
        }), e.data.dcFlg) {
            var o = e.data.zuohao;
            null == o || "" == o ? e.setData({
                disp: "block"
            }) : e.sendOrder(o);
        } else e.sendOrder();
    },
    sendOrder: function(o, t) {
        if (e.data.dcFlg) {
            var n = e.data.deskNum;
            if ("" == n || null == n || void 0 == n) return void wx.showModal({
                title: "提醒",
                content: "请输入桌号"
            });
        }
        console.log("===queryFood sendOrder start==="), wx.getStorage({
            key: "userId",
            success: function(o) {
                var n = o.data;
                wx.getStorage({
                    key: "storeId",
                    success: function(o) {
                        var r = o.data;
                        wx.getStorage({
                            key: "orderType",
                            success: function(o) {
                                var d = o.data, c = [];
                                for (var s in e.data.goods) {
                                    var i = e.data.goods[s].foodList;
                                    for (var l in i) if (i[l].foodSizeList.length > 0) {
                                        var g = !1;
                                        for (var f in e.data.carArray) {
                                            for (var u in i[l].foodSizeList) if (i[l].foodSizeList[u].id == e.data.carArray[f].foodId && i[l].foodSizeList[u].foodSizeCount > 0) {
                                                c.push(i[l]), g = !0;
                                                break;
                                            }
                                            if (g) break;
                                        }
                                    } else for (var p in e.data.carArray) i[l].id == e.data.carArray[p].foodId && c.push(i[l]);
                                }
                                console.log("foodList ==>"), console.log(c), t || (t = e.data.deskNum), wx.request({
                                    url: a + "skordermodel/insertOrderInfo",
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    data: {
                                        wechatUserId: n,
                                        storeId: r,
                                        orderTableId: t,
                                        orderReceivablePrice: e.data.totalReceivablePrice,
                                        orderRealPrice: e.data.totalPrice,
                                        orderType: o.data,
                                        foodList: JSON.stringify(c)
                                    },
                                    success: function(o) {
                                        console.log("===insertOrderInfo success==="), console.log("res.data.jsonEntity ==>" + o.data.jsonEntity), 
                                        console.log("res.data.jsonEntity ==>" + d), e.data.wmFlg ? wx.redirectTo({
                                            url: "../../order/evalOrder/submitOrder/submitOrder?orderId=" + o.data.jsonEntity + "&orderType=" + d
                                        }) : wx.redirectTo({
                                            url: "../../order/evalOrder/evalOrder?orderId=" + o.data.jsonEntity + "&orderType=" + d
                                        }), console.log("===queryFood sendOrder end===");
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
    },
    addCount: function(o) {
        console.log("addCount == > "), console.log(e), e.setData({
            fold: !0,
            emptyed: !1
        }), e.setFoodInfo(o, 1);
    },
    minusCount: function(o) {
        e.setFoodInfo(o, -1);
    },
    setFoodInfo: function(o, t) {
        var a = o.currentTarget.dataset.foodId;
        console.log("foodId == > " + a), console.log("count == > " + t), console.log(e);
        var n = o.currentTarget.dataset.typeId, r = o.currentTarget.dataset.foodSize;
        console.log("typeId == > " + n);
        var d = e.data.goods, c = d.find(function(o) {
            return o.id == n;
        }).foodList, s = c.find(function(o) {
            return a == o.id;
        });
        if (!s) {
            console.log("food == > " + !s);
            for (var i in c) if (console.log(c[i].foodSizeList), r = c[i].foodSizeList.find(function(o) {
                return o.id == a;
            })) {
                s = c.find(function(o) {
                    return r.foodId == o.id;
                });
                break;
            }
        }
        console.log("food == > "), console.log(s), console.log(r), console.log("food == > ");
        var l = void 0, g = 0, f = "", u = 0, p = 0;
        s.foodSizeList.length > 0 ? (console.log("===多规格==="), l = s.foodSizeList.find(function(o) {
            return o.id == r.id;
        }), a = l.id, console.log(l), f = s.foodName + "(" + l.name + ")", l.foodSizeCount = 1 * l.foodSizeCount + t, 
        p = l.foodSizeCount, g = "0" == l.discountFlg ? e.data.wmFlg ? l.priceW : l.priceT : e.data.wmFlg ? l.priceWZ : l.priceTZ) : (f = s.foodName, 
        s.foodCount = 1 * s.foodCount + t, p = s.foodCount, u = e.data.wmFlg ? s.priceW : s.priceT, 
        g = "0" == s.discountFlg ? e.data.wmFlg ? s.priceW : s.priceT : e.data.wmFlg ? s.priceWZ : s.priceTZ), 
        console.log("foodName == >" + f), console.log("price == >" + g), console.log("foodCount == >" + p), 
        e.refreshShopingCar(a, g, p, f, n, u), e.setFoodCnt();
        var h = e.data.carArray;
        0 == s.foodCount && 0 == h.length ? (e.changeSubmit(!1), e.setData({
            goods: d,
            clickAble: !1,
            cartUrl: "../../../../images/notShopping.png"
        })) : (e.changeSubmit(!0), e.setData({
            goods: d,
            clickAble: !0,
            cartUrl: "../../../../images/shopping.png"
        }));
    },
    refreshShopingCar: function(o, t, a, n, r, d) {
        var c = e.data.carArray, s = void 0, i = c.find(function(e) {
            return e.foodId == o;
        });
        if (i) {
            i.foodId = o;
            var l = t * a, g = d * a;
            if (i.price = l.toFixed(2), i.receivablePrice = g.toFixed(2), i.num = a, i.name = n, 
            0 == a) {
                for (var f = 0, u = 0; u < c.length; u++) o == c[u].foodId && (f = u);
                c.splice(f, 1), console.log("carArray.length ==> " + c.length), 0 == c.length && (e.setCarShowSate(!1), 
                e.setData({
                    cartUrl: "../../../../images/notShopping.png"
                }), console.log(e.data.cartUrl));
            }
        } else s = {
            foodId: o,
            price: t,
            num: a,
            name: n,
            typeId: r,
            receivablePrice: d
        }, c.push(s);
        e.calTotalPrice(), console.log("carArray ==>"), console.log(c), console.log("carArray ==>"), 
        e.setData({
            carArray: c
        });
    },
    setFoodCnt: function() {
        var o = e.data.foodData, t = e.data.goods;
        console.log("===setFoodCnt==="), console.log(o), console.log(t), console.log("===setFoodCnt===");
        for (var a in t) for (var n in t[a].foodList) {
            for (var r in o) !function(e) {
                console.log("===let foodListIdx in foodList==="), console.log(o[e]);
                var n = t[a].foodList.find(function(t) {
                    return t.id == o[e].id;
                });
                n && (o[e] = n);
            }(r);
        }
        console.log("===setFoodCnt==="), console.log(o), console.log("===setFoodCnt==="), 
        e.setData({
            foodData: o
        });
    },
    xuanguige: function(o) {
        var t = o.currentTarget.dataset.foodCount, a = o.currentTarget.dataset.foodPrice, n = o.currentTarget.dataset.foodId, r = [], d = [];
        r[0] = "#ffbf21", d[0] = "#35343a", e.setData({
            guige: n,
            foodCount: t,
            foodPrice: a,
            indx: 0,
            bgColors: r,
            colors: d,
            scroFlag: "hidden",
            clickabled: !1,
            emptyed: !0
        });
    },
    changeSubmit: function(o) {
        e.setData({
            clickAble: o
        }), o ? e.setData({
            bcgcolor: "#ffbf21",
            colo: "#3f3d40",
            payDesc: "下单"
        }) : (e.data.wmFlg ? wx.getStorage({
            key: "storeInfo",
            success: function(o) {
                null != o.data.storeInfoCharging && null != o.data.storeInfoCharging && null != o.data.storeInfoCharging || (o.data.storeInfoCharging = 0), 
                e.setData({
                    payDesc: "￥" + o.data.storeInfoCharging + "起送"
                });
            }
        }) : e.setData({
            payDesc: "下单"
        }), e.setData({
            bcgcolor: "#333",
            colo: "#999"
        }));
    },
    bindBeizhu: function(o) {
        var t = o.detail.value;
        null == t || void 0 == t || "undefined" == t || "null" == t ? e.setData({
            dcBeizhu: ""
        }) : e.setData({
            dcBeizhu: t
        }), wx.setStorage({
            key: "dcBeizhu",
            data: t
        });
    },
    toggleList: function() {
        if (e.data.clickabled) {
            if (e.data.totalCount) {
                e.setData({
                    fold: !e.data.fold
                });
                var o = e.data.fold;
                e.cartShow(o);
            }
        } else wx.showModal({
            title: "",
            content: "请关闭选菜窗口"
        });
    },
    cartShow: function(o) {
        0 == o ? e.setData({
            cartShow: "block"
        }) : e.setData({
            cartShow: "none"
        });
    },
    calTotalPrice: function() {
        for (var o = this.data.carArray, t = 0, a = 0, n = 0, r = e.data.distriFeePrice, d = 0; d < o.length; d++) t += 1 * o[d].price, 
        a += 1 * o[d].receivablePrice, n += 1 * o[d].num;
        var c = t;
        console.log("totalCount ==> " + n), console.log("totalPrice ==> " + t), console.log("totalReceivablePrice ==> " + a), 
        e.setData({
            finalPrice: parseFloat(c).toFixed(2),
            totalReceivablePrice: parseFloat(a).toFixed(2),
            totalPrice: parseFloat(t).toFixed(2),
            totalCount: n,
            distriFeePrice: parseFloat(r).toFixed(2)
        });
    },
    empty: function(t) {
        var a, n = e.data.goods;
        for (var r in n) for (var d in n[r].foodList) if (n[r].foodList[d].foodCount = 0, 
        n[r].foodList[d].foodSizeList.length > 0) for (var c in n[r].foodList[d].foodSizeList) n[r].foodList[d].foodSizeList[c].foodSizeCount = 0;
        e.setData((a = {
            cartShow: "none",
            fold: !0,
            scroFlag: "",
            cartUrl: "/images/notShopping.png",
            bcgcolor: "#333",
            colo: "#999",
            naviFlg: !1,
            totalPrice: 0,
            totalCount: 0,
            foodCount: 0
        }, o(a, "totalPrice", 0), o(a, "otherPagePrice", 0), o(a, "otherPageCount", 0), 
        o(a, "emptyed", !0), o(a, "carArray", []), a));
    },
    resume: function() {
        e.setData({
            disp: "none",
            display: "none"
        });
    },
    bindDesk: function(o) {
        e.setData({
            deskNum: o.detail.value
        }), wx.setStorage({
            key: "deskNum",
            data: o.detail.value
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
                            success: function(n) {
                                wx.request({
                                    url: a + "skordermodel/selUnpaidOrder",
                                    data: {
                                        wechatUserId: o.data,
                                        orderType: n.data,
                                        storeId: t.data
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(o) {
                                        "操作成功！" == o.data.msg ? o.data.count > 0 ? wx.getStorage({
                                            key: "editType",
                                            success: function(o) {
                                                "N" != o.data ? e.setData({
                                                    display: "block"
                                                }) : e.chkOrder();
                                            }
                                        }) : e.chkOrder() : wx.showModal({
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