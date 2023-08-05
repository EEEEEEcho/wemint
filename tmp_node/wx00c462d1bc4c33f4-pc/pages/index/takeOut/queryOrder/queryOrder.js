function o(o, e, t) {
    return e in o ? Object.defineProperty(o, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[e] = t, o;
}

var e, t = require("../../../../utils/util.js"), a = getApp(), r = a.globalData.httpUrl;

a.globalData.testhttpUrl;

Page({
    data: {
        dcBeizhu: "",
        priceT: "",
        priceTZ: "",
        priceW: "",
        priceWZ: "",
        scroFlag: "hidden",
        otherPagePrice: 0,
        otherPageCount: 0,
        totalCount: 0,
        cartShow: "none",
        count: 0,
        indx1: "",
        cartUrl: "../../../../images/notShopping.png",
        clicked: "block",
        httpUrl: r,
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
        display: "none",
        clickabled: !0,
        emptyed: !1
    },
    onLoad: function(o) {
        e = this, t.getShareInfos(e, r), t.setCompanyId(e, o), t.setStoreId(e), t.setStoreInfo(e), 
        console.log("===queryOrder onLoad start==="), wx.getStorage({
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
                    url: r + "skfoodmodel/wxFoodInfoById",
                    data: {
                        id: o.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(o) {
                        var t = o.data.foodRatedFoodStartLevel;
                        e.setStart(t), e.setData({
                            food: o.data,
                            starurls: e.data.starurls,
                            foodSrc: o.data.imgUrl,
                            descriptionText: o.data.introduce,
                            yhtjTitle: o.data.foodName,
                            monthSales: o.data.monthCount
                        }), e.setInitGuige(), console.log("food ==> "), console.log(o.data), wx.getStorage({
                            key: "carArray",
                            success: function(o) {
                                var t = o.data;
                                t && t.length > 0 && (e.setData({
                                    carArray: t,
                                    cartUrl: "../../../../images/shopping.png"
                                }), e.calTotalPrice()), e.setData({
                                    carArray: t
                                }), e.changeFoodOnBack(), e.checkCount(), console.log("===queryOrder onLoad end===");
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
        var o = e.data.carArray, t = e.data.food;
        if (console.log("carArray ==> "), console.log(o), o && o.length > 0) {
            for (var a in o) !function(e) {
                if (t.id == o[e].foodId) t.foodCount = o[e].num; else if (t.foodSizeList.length > 0) {
                    var a = t.foodSizeList.find(function(t) {
                        return t.id == o[e].foodId;
                    });
                    a && (a.foodSizeCount = o[e].num);
                }
            }(a);
        }
        e.setData({
            food: t
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
        var t = o.currentTarget.dataset.foodSize, a = o.currentTarget.dataset.indx, r = o.currentTarget.dataset.guigeIndex, n = o.currentTarget.dataset.foodsizelist, d = [], i = [];
        for (var s in n) d[s] = "#666", i[s] = "#efefef";
        d[r] = "#ffbf21", i[r] = "#35343a", e.setData({
            foodSizeList: n,
            bgColors: d,
            colors: i,
            indx: a,
            foodSize: t
        });
    },
    resum: function() {
        e.setData({
            guige: !1,
            scroFlag: ""
        });
    },
    chkOrder: function() {
        if (e.setData({
            display: "none"
        }), e.data.dcFlg) {
            var o = e.data.zuohao;
            null == o || "" == o ? e.setData({
                disp: "block"
            }) : e.sendOrder("", o);
        } else e.sendOrder();
    },
    sendOrder: function(o, t) {
        if (e.data.dcFlg) {
            var a = e.data.deskNum;
            if ("" == a || null == a || void 0 == a) return void wx.showModal({
                title: "提醒",
                content: "请输入桌号"
            });
        }
        console.log("===queryFood sendOrder start==="), wx.getStorage({
            key: "userId",
            success: function(o) {
                var a = o.data;
                wx.getStorage({
                    key: "storeId",
                    success: function(o) {
                        var n = o.data;
                        wx.getStorage({
                            key: "orderType",
                            success: function(o) {
                                var d = o.data, i = [];
                                for (var s in e.data.goods) {
                                    var c = e.data.goods[s].foodList;
                                    for (var l in c) if (c[l].foodSizeList.length > 0) {
                                        var f = !1;
                                        for (var g in e.data.carArray) {
                                            for (var u in c[l].foodSizeList) if (c[l].foodSizeList[u].id == e.data.carArray[g].foodId && c[l].foodSizeList[u].foodSizeCount > 0) {
                                                i.push(c[l]), f = !0;
                                                break;
                                            }
                                            if (f) break;
                                        }
                                    } else for (var p in e.data.carArray) c[l].id == e.data.carArray[p].foodId && i.push(c[l]);
                                }
                                console.log("foodList ==>"), console.log(i), t || (t = e.data.deskNum), wx.request({
                                    url: r + "skordermodel/insertOrderInfo",
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    data: {
                                        wechatUserId: a,
                                        storeId: n,
                                        orderTableId: t,
                                        orderReceivablePrice: e.data.totalReceivablePrice,
                                        orderRealPrice: e.data.totalPrice,
                                        orderType: o.data,
                                        foodList: JSON.stringify(i)
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
        e.setData({
            fold: !0,
            emptyed: !1
        }), e.setFoodInfo(o, 1);
    },
    minusCount: function(o) {
        e.setFoodInfo(o, -1);
    },
    setFoodInfo: function(o, t) {
        var a = o.currentTarget.dataset.foodId;
        console.log("foodId == > " + a), console.log("count == > " + t), console.log(o.currentTarget.dataset);
        var r = o.currentTarget.dataset.typeId, n = o.currentTarget.dataset.foodSize;
        console.log("typeId == > " + r);
        var d = e.data.goods, i = d.find(function(o) {
            return o.id == r;
        }).foodList;
        console.log(i);
        var s = i.find(function(o) {
            return a == o.id;
        });
        if (!s) {
            console.log("!food == > " + !s);
            for (var c in i) if (console.log(i[c].foodSizeList), n = i[c].foodSizeList.find(function(o) {
                return o.id == a;
            })) {
                s = i.find(function(o) {
                    return n.foodId == o.id;
                });
                break;
            }
        }
        console.log("food == > "), console.log(s), console.log(n);
        var l = void 0, f = 0, g = "", u = 0, p = 0;
        s.foodSizeList.length > 0 ? (console.log("===多规格==="), l = s.foodSizeList.find(function(o) {
            return o.id == n.id;
        }), a = l.id, console.log(l), g = s.foodName + "(" + l.name + ")", l.foodSizeCount = 1 * l.foodSizeCount + t, 
        p = l.foodSizeCount, f = "0" == l.discountFlg ? e.data.wmFlg ? l.priceW : l.priceT : e.data.wmFlg ? l.priceWZ : l.priceTZ) : (g = s.foodName, 
        s.foodCount = 1 * s.foodCount + t, p = s.foodCount, u = e.data.wmFlg ? s.priceW : s.priceT, 
        f = "0" == s.discountFlg ? e.data.wmFlg ? s.priceW : s.priceT : e.data.wmFlg ? s.priceWZ : s.priceTZ), 
        console.log("foodName == >" + g), console.log("price == >" + f), console.log("foodCount == >" + p), 
        e.refreshShopingCar(a, f, p, g, r, u), e.setFoodCnt();
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
    refreshShopingCar: function(o, t, a, r, n, d) {
        var i = e.data.carArray, s = void 0, c = i.find(function(e) {
            return e.foodId == o;
        });
        if (c) {
            c.foodId = o;
            var l = t * a, f = d * a;
            if (c.price = l.toFixed(2), c.receivablePrice = f.toFixed(2), c.num = a, c.name = r, 
            0 == a) {
                for (var g = 0, u = 0; u < i.length; u++) o == i[u].foodId && (g = u);
                i.splice(g, 1), console.log("carArray.length ==> " + i.length), 0 == i.length && (e.setCarShowSate(!1), 
                e.setData({
                    cartUrl: "../../../../images/notShopping.png"
                }), console.log(e.data.cartUrl));
            }
        } else s = {
            foodId: o,
            price: t,
            num: a,
            name: r,
            typeId: n,
            receivablePrice: d
        }, i.push(s);
        e.calTotalPrice(), console.log("carArray ==>"), console.log(i), console.log("carArray ==>"), 
        e.setData({
            carArray: i
        });
    },
    setFoodCnt: function(o) {
        var t = e.data.food, a = e.data.goods, r = void 0;
        console.log("===setFoodCnt==="), console.log("===food==="), console.log(t), console.log("===goods==="), 
        console.log(a);
        for (var n in a) if (r = a[n].foodList.find(function(o) {
            return o.id == t.id;
        })) break;
        e.setData({
            food: r
        });
    },
    xuanguige: function(o) {
        var t = o.currentTarget.dataset.foodCount, a = o.currentTarget.dataset.foodPrice, r = o.currentTarget.dataset.foodId, n = [], d = [];
        n[0] = "#ffbf21", d[0] = "#35343a", e.setData({
            guige: r,
            foodCount: t,
            foodPrice: a,
            indx: 0,
            bgColors: n,
            colors: d,
            scroFlag: "hidden"
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
    calTotalPrice: function() {
        for (var o = this.data.carArray, t = 0, a = 0, r = 0, n = e.data.distriFeePrice, d = 0; d < o.length; d++) t += 1 * o[d].price, 
        a += 1 * o[d].receivablePrice, r += 1 * o[d].num;
        var i = t;
        e.setData({
            finalPrice: parseFloat(i).toFixed(2),
            totalReceivablePrice: parseFloat(a).toFixed(2),
            totalPrice: parseFloat(t).toFixed(2),
            totalCount: r,
            distriFeePrice: parseFloat(n).toFixed(2)
        });
    },
    empty: function(t) {
        var a, r = e.data.goods;
        for (var n in r) for (var d in r[n].foodList) if (r[n].foodList[d].foodCount = 0, 
        r[n].foodList[d].foodSizeList.length > 0) for (var i in r[n].foodList[d].foodSizeList) r[n].foodList[d].foodSizeList[i].foodSizeCount = 0;
        e.setData((a = {
            cartShow: "none",
            fold: !0,
            scroFlag: "",
            cartUrl: "/images/notShopping.png",
            bcgcolor: "#333",
            colo: "#999",
            naviFlg: !1,
            totalPrice: 0,
            totalCount: 0
        }, o(a, "totalPrice", 0), o(a, "otherPagePrice", 0), o(a, "otherPageCount", 0), 
        o(a, "emptyed", !0), o(a, "carArray", []), a));
    },
    setStart: function(o) {
        for (var t = {}, a = 0; a < 5; a++) t[a] = a <= o - 1 ? {
            starurl: "../../../../images/star.png"
        } : o - a > 0 && o - a < 1 ? {
            starurl: "../../../../images/halfStar.png"
        } : {
            starurl: "../../../../images/emptyStar.png"
        };
        e.setData({
            starurls: t
        });
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
    setInitGuige: function() {
        var o = [], t = e.data.food;
        if (console.log("===setInitGuige food==="), console.log(t), t.foodSizeList.length > 0) {
            var a = t.foodSizeList[0].priceT, r = t.foodSizeList[0].priceTZ, n = t.foodSizeList[0].priceW, d = t.foodSizeList[0].priceWZ;
            for (var i in t.foodSizeList) o[i] = "#fff", o[0] = "#ffbf21", console.log(o[0]);
            e.setData({
                priceT: a,
                priceTZ: r,
                priceW: n,
                priceWZ: d,
                colors1: o,
                indx1: 0
            });
        }
    },
    changeSel: function(o) {
        var t = o.currentTarget.dataset.index, a = [], r = e.data.food, n = r.foodSizeList[t].priceT, d = r.foodSizeList[t].priceTZ, i = r.foodSizeList[t].priceW, s = r.foodSizeList[t].priceWZ;
        a[t] = "#ffbf21", e.setData({
            priceT: n,
            priceTZ: d,
            priceW: i,
            priceWZ: s,
            colors1: a,
            indx1: t
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
                            success: function(a) {
                                wx.request({
                                    url: r + "skordermodel/selUnpaidOrder",
                                    data: {
                                        wechatUserId: o.data,
                                        orderType: a.data,
                                        storeId: t.data
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(o) {
                                        "操作成功！" == o.data.msg ? o.data.count > 0 ? (wx.getStorage({
                                            key: "editType",
                                            success: function(o) {
                                                "N" != o.data ? e.setData({
                                                    display: "block"
                                                }) : e.chkOrder();
                                            }
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