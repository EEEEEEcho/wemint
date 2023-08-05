function o(o, t, s) {
    return t in o ? Object.defineProperty(o, t, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[t] = s, o;
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, s = require("../../utils/server"), e = require("../../config.js"), a = "https://up-img.0xiao.cn", i = {};

Page({
    data: {
        openCar: 0,
        shopId: 0,
        shopToken: "",
        _title: "商品",
        minPrice: 0,
        fee: 3,
        sumMonth: 0,
        carSrc: "../../images/shopCar.png",
        merchantName: "",
        merchantAds: "",
        goodsClass: [],
        goodsChoose: [],
        allGoods: [],
        sumPrice: 0,
        sumPriceText: "购物车空空如也~~",
        toPay: "￥10起送",
        shopScore: 1,
        remark: [],
        shopInfo: {},
        businessTime: [],
        isCollect: 0,
        isMask: !1,
        now_attr_name: "",
        specArr: [],
        isChooseSpec: !1,
        isShowDetail: !1,
        switch: !0
    },
    onLoad: function(o) {
        i = {
            authorization: wx.getStorageSync("authorization")
        };
        var t = {
            spread_token: e.resToken,
            shop_token: o.shoptoken
        };
        t.shop_token = o.shoptoken, t.shop_id = o.shopid, this.setData({
            shopId: o.shopid,
            shopToken: o.shoptoken
        });
        var s = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), this.getShopInfo(o, i, t).then(function(e) {
            e && (s.getInitShopCar(o), s.getGoodsSortAndList(o, i, t));
        }), this.getCollect(o, i, t);
    },
    onShow: function() {
        getApp().globalData.isDeleteGoods = !1;
    },
    onHide: function() {
        var o = this.data.shopCar;
        getApp().globalData.isDeleteGoods = !0, wx.setStorageSync("shopCar", o);
    },
    onUnload: function() {
        if (getApp().globalData.isDeleteGoods) {
            var o = this.changeShopCar([], "delAll");
            wx.setStorageSync("shopCar", o);
        } else {
            var t = this.data.shopCar;
            wx.setStorageSync("shopCar", t);
        }
    },
    chooseSort: function(o) {
        var t = [], s = this.data.allGoods;
        for (var e in s) s[e].goods_sort_id == o.target.dataset.id && t.push(s[e]);
        this.setData({
            _id: o.target.dataset.id,
            _name: o.target.dataset.name,
            goodsChoose: t
        });
    },
    tabList: function(o) {
        var t = o.target.dataset.title;
        this.setData({
            _title: t
        });
    },
    toSureOrder: function(o) {
        if (wx.getStorageSync("isAuth")) {
            if (o.target.dataset.price >= this.data.minPrice) {
                this.data.minPrice;
                var t = this.data.shopId, s = this.data.fee, e = this.data.shopToken, a = this.data.shopInfo.shop_name;
                wx.navigateTo({
                    url: "../sureOrder/sureOrder?shopId=" + t + "&fee=" + s + "&shoptoken=" + e + "&shopname=" + a
                });
            }
        } else wx.navigateTo({
            url: "../bindTel/bindTel"
        });
    },
    collectShop: function(o) {
        if (wx.getStorageSync("isAuth")) {
            o.target.dataset.state;
            var t = this, e = {
                collection_type: 1,
                shop_id: this.data.shopId
            };
            1 == this.data.isCollect ? (wx.showLoading({
                title: "取消中",
                mask: !0
            }), s.postApiJSON("/api/UserInfo/delUserCollection", e, function(o) {
                1e3 == o.data.code ? (t.setData({
                    isMask: !1,
                    isCollect: 0
                }), wx.hideLoading(), getApp().showAndHideToast("取消成功")) : (wx.hideLoading(), getApp().showAndHideToast(o.data.msg));
            }, i)) : (wx.showLoading({
                title: "收藏中",
                mask: !0
            }), s.postApiJSON("/api/UserInfo/saveUserCollection", e, function(o) {
                1e3 == o.data.code ? (t.setData({
                    isMask: !1,
                    isCollect: 1
                }), wx.hideLoading(), getApp().showAndHideToast("收藏成功")) : (wx.hideLoading(), getApp().showAndHideToast(o.data.msg));
            }, i));
        } else wx.navigateTo({
            url: "../bindTel/bindTel"
        });
    },
    closeMask: function(o) {
        this.setData({
            isMask: !1
        });
    },
    closeDetail: function(o) {
        var t = {
            isShowDetail: !1
        };
        this.setData(t);
    },
    sure: function(o) {},
    cancel: function(o) {
        this.setData({
            isMask: !1
        });
    },
    handleTap: function(o) {},
    showGoodsDetail: function(o) {
        var t = o.currentTarget.dataset.item;
        if ("" != t.describe || t.goods_more_img.length > 0) {
            var s = {
                goodsInfo: t,
                isShowDetail: !0
            };
            this.setData(s);
        }
    },
    addOne: function(o) {
        var t = o.target.dataset.item;
        if (1 == t.state && (2 == t.is_force_stock && t.stock_count > 0 || 1 == t.is_force_stock)) {
            var s = this.getNowShopCar(), e = this.compareAddShopCar(t, s);
            this.changeShopCar(e, "add");
            var a = this.changeNowGoods(e), i = this.changeAllGoods(e), r = this.priceTotal(), d = this.nowSum(), n = this.getNowShopCar();
            this.setData({
                sumPrice: r,
                nowShopCar: n,
                goodsChoose: a,
                allGoods: i,
                allshopCarSum: d,
                switch: !0
            });
        }
    },
    reduceOne: function(t) {
        if (t.target.dataset.item.goods_sum > 0) {
            var s, e = this.getNowShopCar(), a = t.target.dataset.item, i = this.compareReduceShopCar(a, e), r = (this.changeShopCar(i, "reduce"), 
            this.changeNowGoods(i)), d = this.changeAllGoods(i), n = this.priceTotal(), h = this.nowSum(), c = this.getNowShopCar();
            this.isEmptyCar(c), this.setData((s = {
                goodsChoose: r,
                sumPrice: n,
                nowShopCar: c
            }, o(s, "goodsChoose", r), o(s, "allshopCarSum", h), o(s, "allGoods", d), s));
        }
    },
    chooseGoodsAttr: function(o) {
        this.setData({
            chooseAttr: [],
            goodsSpec: {},
            goodsAttr: {},
            now_attr_name: ""
        });
        var t = o.target.dataset.item;
        if (1 == t.state && (2 == t.is_force_stock && t.stock_count > 0 || 1 == t.is_force_stock)) {
            var a = {
                spread_token: e.resToken,
                goods_id: t.goods_id
            }, r = this, d = !0, n = !0;
            a.shop_token = r.data.shopToken, a.shop_id = r.data.shopId, wx.showLoading({
                title: "",
                mask: !0
            }), s.getApiJSON("/api/goods/getGoodsInfo", a, function(o) {
                if (1e3 == o.data.code) {
                    r.setData({
                        specArr: []
                    });
                    var t = [ {
                        goods_spec_price: 0,
                        goods_spec_name: "",
                        goods_spec_id: 0
                    } ], s = o.data.data, e = {}, a = !0, i = s.attr.attr, h = s.attr.spec;
                    switch (s.finalPrice = getApp().moneyFilter(s.price), s.is_attribute) {
                      case 2:
                        if (d = !0, n = !1, (!i || i.length <= 0) && (i = [], n = !1), h && 0 != h.goods_spec.length || (h = [], 
                        d = !1, a = !1), d) {
                            t = s.attr.spec.goods_spec;
                            for (var c in t) {
                                e = c, t = [ t[c] ];
                                break;
                            }
                        }
                        break;

                      case 3:
                        d = !1, n = !0, (!i || i.length <= 0) && (i = [], n = !1), h || (h = [], d = !1);
                        break;

                      case 4:
                        if (d = !0, n = !0, (!i || i.length <= 0) && (i = [], n = !1), h && 0 != h.goods_spec.length || (h = [], 
                        d = !1, a = !1), d) {
                            t = s.attr.spec.goods_spec;
                            for (var g in t) {
                                e = g, t = [ t[g] ];
                                break;
                            }
                        }
                    }
                    if (0 != t[0].goods_spec_id && (h = o.data.data.attr.spec.goods_spec), r.setData({
                        chooseAttr: s,
                        hasSpec: d,
                        hasAttr: n,
                        goodsSpec: h,
                        goodsAttr: i,
                        goodsAttrMoney: 0,
                        btn: a,
                        isChoose: 1
                    }), d) {
                        var p = {
                            target: {
                                dataset: {
                                    attrid: e,
                                    money: t[0].goods_spec_price,
                                    name: t[0].goods_spec_name,
                                    specid: t[0].goods_spec_id
                                }
                            }
                        };
                        r.goodsSpec(p);
                    }
                    wx.hideLoading();
                } else wx.hideLoading(), getApp().showAndHideToast(o.data.msg);
            }, i);
        }
    },
    goodsSpec: function(o) {
        this.data.chooseAttr.finalPrice = o.target.dataset.money + this.data.chooseAttr.price + this.data.goodsAttrMoney, 
        this.data.chooseAttr.finalPrice = getApp().moneyFilter(this.data.chooseAttr.finalPrice);
        var t = [], s = this.data.specArr, e = {};
        void 0 != this.data.chooseAttr.attr.spec && (e = this.data.chooseAttr.attr.spec.goods_spec);
        for (var a in e) if (e[a].goods_spec_id == o.target.dataset.specid) if (s.length > 0) for (var i in s) {
            if (s[i].goods_attr_id == o.target.dataset.attrid) {
                s[i] = e[a], s[i];
                break;
            }
            i == s.length - 1 && t.push(e[a]);
        } else t.push(e[a]);
        for (var r in s) t.push(s[r]);
        for (var d in this.data.goodsSpec) this.data.goodsSpec[d].goods_spec_id == o.target.dataset.specid && (this.data.chooseAttr.attr.spec.final_goods_spec = o.target.dataset.specid);
        this.arrSort(t), this.setData({
            _specId: o.target.dataset.specid,
            chooseAttr: this.data.chooseAttr,
            specArr: t
        });
    },
    goodsAttr: function(o) {
        var t = o.target.dataset.attrid, s = o.target.dataset.specid, e = this.data.goodsAttr, a = o.target.dataset.name, i = [], r = [];
        this.data.isChooseSpec ? (r = this.data.specArr.slice(1), i = this.data.specArr[0]) : r = this.data.specArr;
        for (var d in e) if (t == e[d].goods_attr_id) {
            e[d]._specAttrId = s;
            for (var n in e[d].goods_spec) if (e[d].goods_spec[n].goods_spec_id == s) if (e[d].money = e[d].goods_spec[n].goods_spec_price, 
            e[d].final_goods_spec = e[d].goods_spec[n], r.length > 0) for (var h in r) {
                if (r[h].goods_attr_id == t && r[h].goods_spec_id == s) {
                    r.splice(h, 1), e[d]._specAttrId = 0;
                    break;
                }
                if (r[h].goods_attr_id == e[d].goods_attr_id) {
                    r[h] = e[d].final_goods_spec;
                    break;
                }
                h == r.length - 1 && r.push(e[d].final_goods_spec);
            } else r = [ e[d].final_goods_spec ];
        }
        r.sort(this.compare);
        for (var c in r) i.push(r[c]);
        this.arrSort(i);
        var g = 0;
        for (var p in e) void 0 != e[p].money && (g += e[p].money);
        this.data.chooseAttr.finalPrice = getApp().moneyFilter(this.data.chooseAttr.finalPrice + g), 
        void 0 == this.data.chooseAttr.attr_name ? this.data.chooseAttr.attr_name = a : this.data.chooseAttr.attr_name = this.data.chooseAttr.attr_name + "," + a, 
        this.setData({
            goodsAttr: e,
            chooseAttr: this.data.chooseAttr,
            specArr: i
        });
    },
    finishChoose: function(o) {
        if (this.data.btn) {
            var t = this.data.chooseAttr, s = this.data.goodsAttr, e = this.createAttrGoods(t, s), a = this.getNowShopCar(), i = this.compareAddShopCar(e, a), r = (this.changeShopCar(i, "add"), 
            this.changeNowAttrGoods(i, "add")), d = this.changeAllAttrGoods(i, "add"), n = this.priceTotal(), h = this.nowSum(), c = this.getNowShopCar();
            this.setData({
                isChoose: 0,
                sumPrice: +n,
                nowShopCar: c,
                goodsChoose: r,
                allGoods: d,
                allshopCarSum: h
            });
        } else wx.showToast({
            title: "商品信息有误",
            icon: "none",
            duration: 1e3
        });
    },
    closeChoose: function(o) {
        this.setData({
            isChoose: 0
        });
    },
    openShopCar: function(o) {
        if (0 == this.data.openCar) {
            var t = !1;
            this.data.nowShopCar.goods.length <= 0 && (t = !0), t || this.setData({
                openCar: 1
            });
        } else this.setData({
            openCar: 0
        });
    },
    closeShopCar: function(o) {
        this.setData({
            openCar: 0
        });
    },
    delAllGoods: function(o) {
        this.getShopCar();
        var t = this.data.goodsChoose, s = this.data.allGoods;
        for (var e in t) 2 == t[e].is_force_stock && (t[e].stock_count = t[e].stock_count + t[e].goods_sum), 
        t[e].goods_sum = 0, t[e].every_goodsPrice = 0;
        for (var a in s) 2 == s[a].is_force_stock && (s[a].stock_count = s[a].stock_count + s[a].goods_sum), 
        s[a].goods_sum = 0, s[a].every_goodsPrice = 0;
        this.changeShopCar([], "delAll"), this.setData({
            openCar: 0,
            sumPrice: 0,
            nowShopCar: this.getNowShopCar(),
            goodsChoose: t,
            allGoods: s,
            allshopCarSum: 0
        });
    },
    attrsReduce: function(o) {
        this.setData({
            openCar: 1
        });
    },
    increaceGoods: function(o) {
        var t = o.target.dataset.item;
        if (1 == t.state && (2 == t.is_force_stock && t.stock_count >= 1 || 1 == t.is_force_stock)) {
            var s = this.getNowShopCar(), e = this.compareAddShopCar(t, s);
            this.changeShopCar(e, "add");
            var a = [];
            a = 1 == e.is_attribute ? this.changeNowGoods(e, "add") : this.changeNowAttrGoods(e, "add");
            var i = [];
            i = 1 == e.is_attribute ? this.changeNowGoods(e, "add") : this.changeAllAttrGoods(e, "add");
            var r = this.priceTotal(), d = this.nowSum(), n = this.getNowShopCar();
            this.isEmptyCar(n), this.setData({
                goodsChoose: a,
                sumPrice: r,
                nowShopCar: n,
                allshopCarSum: d,
                allGoods: i
            });
        } else wx.showToast({
            title: "库存不足",
            icon: "none",
            duration: 1e3
        });
    },
    reduceGoods: function(o) {
        var t = o.target.dataset.item, s = this.getNowShopCar();
        if (t.goods_sum > 0) {
            var e = this.compareReduceShopCar(t, s);
            this.changeShopCar(e, "reduce");
            var a = [];
            a = 1 == e.is_attribute ? this.changeNowGoods(e, "reduce") : this.changeNowAttrGoods(e, "reduce");
            var i = [];
            i = 1 == e.is_attribute ? this.changeNowGoods(e, "reduce") : this.changeAllAttrGoods(e, "reduce");
            var r = this.priceTotal(), d = this.nowSum(), n = this.getNowShopCar();
            this.isEmptyCar(n), this.setData({
                goodsChoose: a,
                sumPrice: r,
                nowShopCar: n,
                allshopCarSum: d,
                allGoods: i
            });
        }
    },
    callShop: function(o) {
        wx.makePhoneCall({
            phoneNumber: o.target.dataset.tel
        });
    },
    openShopAds: function(o) {
        wx.openLocation({
            latitude: +o.target.dataset.lat,
            longitude: +o.target.dataset.lon,
            scale: 18
        });
    },
    priceTotal: function() {
        var o = 0, t = this.getNowShopCar().goods;
        for (var s in t) o = +o + +t[s].every_goodsPrice;
        return +getApp().moneyFilter(+o);
    },
    initData: function(o) {
        this.getNowShopCar().goods;
        for (var t in o) if ("" == o[t].goods_path ? o[t].goods_path = "../../images/logo_100.png" : o[t].goods_path = a + o[t].goods_path, 
        o[t].goods_more_img.length > 0) for (var s in o[t].goods_more_img) o[t].goods_more_img[s] = a + o[t].goods_more_img[s];
        return o;
    },
    timeChange: function(o, t) {
        var s = parseInt(o / 3600), e = parseInt(o % 3600 / 60), a = parseInt(t / 3600), i = parseInt(t % 3600 / 60);
        return {
            startTime: getApp().changeZero(s) + ":" + getApp().changeZero(e),
            endTime: getApp().changeZero(a) + ":" + getApp().changeZero(i)
        };
    },
    nowSum: function() {
        var o = 0, t = this.getNowShopCar().goods;
        for (var s in t) o += t[s].goods_sum;
        return o;
    },
    shopStar: function(o) {
        var t = Math.ceil(o.taste / o.comment_num * 2) || 8;
        return t <= 8 ? 8 : t >= 10 ? 10 : t;
    },
    speed: function(o) {
        var t = Math.floor(o.speed / o.comment_num) || 20;
        return t >= 20 ? 20 : t <= 10 ? 10 : t;
    },
    shopSpeed: function(o) {
        var t = 10 - (Math.floor((o.speed / o.comment_num - 10) / 5) || 2);
        return t <= 8 ? 8 : t >= 10 ? 10 : t;
    },
    compare: function(o, t) {
        return o - t;
    },
    arrSort: function(o) {
        var t = "";
        for (var s in o) t = 0 == s ? o[s].goods_spec_name : t + "/" + o[s].goods_spec_name;
        return this.setData({
            now_attr_name: t
        }), o;
    },
    initShopCar: function(o) {
        var t = [ {
            shopId: o.shopid,
            goods: [],
            goodsPrice_sum: this.data.sumPrice,
            businessTime: this.data.businessTime,
            preTime: this.data.preTime,
            goods_sum: 0
        } ];
        return "" == wx.getStorageSync("shopCar") || (t = wx.getStorageSync("shopCar")), 
        t;
    },
    initNowShopCar: function(o) {
        var t = {
            shopId: o.shopid,
            goods: [],
            goodsPrice_sum: this.data.sumPrice,
            businessTime: this.data.businessTime,
            preTime: this.data.preTime,
            goods_sum: 0
        }, s = [ t ];
        "" == wx.getStorageSync("shopCar") || (s = wx.getStorageSync("shopCar"));
        for (var e in s) s[e].shopId == t.shopId && (t = s[e]);
        return t;
    },
    getInitShopCar: function(o) {
        var t = this.initNowShopCar(o), s = this.initShopCar(o), e = +t.goodsPrice_sum;
        e = getApp().moneyFilter(e), this.setData({
            sumPrice: +e,
            nowShopCar: t,
            shopCar: s,
            allshopCarSum: this.nowSum()
        });
    },
    getShopInfo: function(o, t, e) {
        var i = this;
        return new Promise(function(o, r) {
            var d = i;
            s.postApiJSON("/api/mini/getShopInfoAndConfig", e, function(t) {
                if (1e3 == t.data.code) {
                    var s = t.data.data, e = [], i = d.shopSpeed(s.comment), r = d.shopStar(s.comment), n = d.speed(s.comment), h = s.business.pre_time;
                    if (0 != s.business.first_start || 0 != s.business.first_end) {
                        var c = d.timeChange(s.business.first_start, s.business.first_end);
                        e.push(c);
                    }
                    if (0 != s.business.second_start || 0 != s.business.second_end) {
                        var g = d.timeChange(s.business.second_start, s.business.second_end);
                        e.push(g);
                    }
                    if (0 != s.business.third_start || 0 != s.business.third_end) {
                        var p = d.timeChange(s.business.third_start, s.business.third_end);
                        e.push(p);
                    }
                    "" == s.shop_info.logo_path ? s.shop_info.logo_path = "../../images/logo_100.png" : s.shop_info.logo_path = a + s.shop_info.logo_path;
                    for (var _ in s.market) switch (s.market[_].rule_id) {
                      case 1:
                        s.market[_].rule_name = "首";
                        break;

                      case 2:
                        s.market[_].rule_name = "满";
                        break;

                      case 3:
                        s.market[_].rule_name = "时";
                        break;

                      case 4:
                        s.market[_].rule_name = "全";
                    }
                    d.getShopQualification(s), "" != s.ext.notice && s.market.push(s.ext);
                    for (var u in s.log) "" == s.log[u].head_path && (s.log[u].head_path = "../../images/logo_100.png");
                    d.setData({
                        shopInfo: s.shop_info,
                        minPrice: s.shop_info.min_price,
                        fee: s.fee,
                        sumMonth: s.order_count,
                        market: s.market,
                        remark: s.log,
                        tasteStar: Math.floor(r / 2),
                        tasteHarfStar: r % 2,
                        tasteNoStar: 5 - Math.ceil(r / 2),
                        tasteScore: r / 2,
                        speedStar: Math.floor(i / 2),
                        speedHarfStar: i % 2,
                        speedNoStar: 5 - Math.ceil(i / 2),
                        speedScore: i / 2,
                        aveTime: n,
                        businessTime: e,
                        preTime: h
                    }), wx.setNavigationBarTitle({
                        title: s.shop_info.shop_name
                    }), o(!0);
                }
            }, t);
        });
    },
    getCollect: function(o, t, e) {
        var a = 0, i = this;
        s.getApiJSON("/api/UserInfo/isUserCollectionShop", e, function(o) {
            1e3 == o.data.code ? a = o.data.data : 1005 == o.data.code && (a = 0), i.setData({
                isCollect: a
            });
        }, t);
    },
    getGoodsSortAndList: function(o, t, e) {
        var a = this;
        s.postApiJSON("/api/mini/getShopGoodsSort", e, function(o) {
            o.data.data.length > 0 && 1e3 == o.data.code ? (a.setData({
                goodsClass: o.data.data,
                _id: o.data.data[0].goods_sort_id,
                _name: o.data.data[0].sort_name
            }), s.getApiJSON("/api/mini/getGoodsList", e, function(o) {
                if (1e3 == o.data.code) {
                    var t = o.data.data, s = [];
                    if ((t = a.initData(t)).length > 0) {
                        var e = a.getNowShopCar();
                        for (var i in e.goods) if (void 0 != e.goods[i].goods_attr_spec_total) for (var r = 0; r < e.goods[i].goods_sum; r++) t = a.changeAllAttrGoods(e.goods[i], t, "add"); else t = a.changeAllGoods(e.goods[i], t, "add");
                        for (var d in t) t[d].goods_sort_id == a.data.goodsClass[0].goods_sort_id && s.push(t[d]);
                        a.setData({
                            goodsChoose: s,
                            allGoods: t
                        });
                    } else getApp().showAndHideToast("暂无商品");
                    wx.hideLoading();
                } else wx.hideLoading(), getApp().showAndHideToast(o.data.msg);
            }, t)) : o.data.data.length <= 0 && 1e3 == o.data.code ? (wx.hideLoading(), getApp().showAndHideToast("暂无商品")) : (wx.hideLoading(), 
            getApp().showAndHideToast(o.data.msg));
        }, t);
    },
    getShopCar: function() {
        var o = [];
        return this.data.shopCar ? o = this.data.shopCar : (o = [ {
            shopId: this.data.shopId,
            goods: [],
            goodsPrice_sum: this.data.sumPrice,
            businessTime: this.data.businessTime,
            preTime: this.data.preTime,
            goods_sum: 0
        } ], "" != wx.getStorageSync("shopCar") && (o = wx.getStorageSync("shopCar"))), 
        o;
    },
    getNowShopCar: function() {
        var o = {
            shopId: this.data.shopId,
            goods: [],
            goodsPrice_sum: this.data.sumPrice,
            businessTime: this.data.businessTime,
            preTime: this.data.preTime,
            goods_sum: 0
        }, t = this.getShopCar();
        for (var s in t) {
            if (+t[s].shopId == +this.data.shopId) {
                o = t[s];
                break;
            }
            s == t.length - 1 && t.push(o);
        }
        return o;
    },
    getOnGoodsInfo: function(o) {
        var t = o.target.dataset.id, s = this.data.allGoods, e = {};
        for (var a in s) s[a].goods_id == t && (e = s[a]);
        return e;
    },
    getCarGoodsInfo: function(o, t, s) {
        var e = this.getNowShopCar().goods, a = {};
        for (var i in e) if (o == e[i].goods_id && t == e[i].goods_attr_spec_total && s == e[i].goods_spec) {
            a = e[i];
            break;
        }
        return a;
    },
    compareAddShopCar: function(o, t) {
        var s = t.goods;
        return 2 == o.is_force_stock && (o.stock_count = o.stock_count - 1), s.length <= 0 ? (o.goods_sum = 1, 
        o.every_goodsPrice = o.price) : o = 1 != o.is_attribute ? this.addAttrGoods(s, o) : this.addOneGoods(s, o), 
        o;
    },
    compareReduceShopCar: function(o, t) {
        var s = t.goods;
        2 == o.is_force_stock && (o.stock_count = o.stock_count + 1);
        for (var e in s) if (s[e].goods_id == o.goods_id && o.goods_attr_spec_total == s[e].goods_attr_spec_total && o.goods_spec == s[e].goods_spec) {
            o.goods_sum = o.goods_sum - 1, o.every_goodsPrice = +getApp().moneyFilter(+o.every_goodsPrice - +o.price);
            break;
        }
        return o;
    },
    isEmptyCar: function(o) {
        var t = !1;
        0 == o.goods.length && (t = !0), t && 1 == this.data.openCar && this.setData({
            openCar: 0
        });
    },
    changeShopCar: function(o, t) {
        var s = this.getNowShopCar(), e = this.getShopCar(), a = s.goods;
        if ("delAll" == t) a = [], s.goods_sum = 0, s.goodsPrice_sum = 0; else if (0 == a.length) a.push(o), 
        s.goodsPrice_sum = o.price, s.goods_sum = 1; else for (var i in a) if (o.goods_id == a[i].goods_id) {
            if (o.goods_attr_spec_total == a[i].goods_attr_spec_total && o.goods_spec == a[i].goods_spec) {
                a[i] = o, s = this.increaceOrReduce(o, s, t, i);
                break;
            }
            if ((o.goods_attr_spec_total != a[i].goods_attr_spec_total || o.goods_spec != a[i].goods_spec) && i == a.length - 1) {
                a.push(o), s = this.increaceOrReduce(o, s, t, i);
                break;
            }
        } else i == a.length - 1 && (a.push(o), s.goodsPrice_sum = s.goodsPrice_sum + o.price, 
        s.goods_sum = s.goods_sum + 1);
        s.goods = a;
        for (var r in e) e[r].shopId == this.data.shopId && (e[r] = s);
        return this.setData({
            shopCar: e
        }), e;
    },
    changeNowGoods: function(o) {
        var t = this.data.goodsChoose;
        for (var s in t) if (t[s].goods_id == o.goods_id) {
            t[s] = o;
            break;
        }
        return t;
    },
    changeNowAttrGoods: function(o, t) {
        var s = this.data.goodsChoose;
        for (var e in s) if (s[e].goods_id == o.goods_id) {
            "add" == t ? (2 == s[e].is_force_stock && (s[e].stock_count = s[e].stock_count - 1), 
            s[e].goods_sum ? s[e].goods_sum = s[e].goods_sum + 1 : s[e].goods_sum = 1) : "reduce" == t && (2 == s[e].is_force_stock && (s[e].stock_count = s[e].stock_count + 1), 
            s[e].goods_sum = s[e].goods_sum - 1);
            break;
        }
        return s;
    },
    changeAllGoods: function(o, t) {
        var s = this.data.allGoods;
        t && (s = t);
        for (var e in s) if (s[e].goods_id == o.goods_id) {
            s[e] = o;
            break;
        }
        return s;
    },
    changeAllAttrGoods: function(o, s, e) {
        var a = this.data.allGoods;
        "object" === t(arguments[1]) ? a = s : "string" == typeof arguments[1] && (e = s);
        for (var i in a) if (a[i].goods_id == o.goods_id) {
            "add" == e ? (2 == a[i].is_force_stock && (a[i].stock_count = a[i].stock_count - 1), 
            a[i].goods_sum ? a[i].goods_sum = a[i].goods_sum + 1 : a[i].goods_sum = 1) : "reduce" == e && (2 == a[i].is_force_stock && (a[i].stock_count = a[i].stock_count + 1), 
            a[i].goods_sum = a[i].goods_sum - 1);
            break;
        }
        return a;
    },
    createGoodsAttr: function(o) {
        var t = 0, s = "";
        for (var e in o) void 0 != this.data.goodsAttr[e].final_goods_spec && (t += o[e].final_goods_spec.goods_spec_id, 
        s = "" == s ? o[e].final_goods_spec.goods_spec_id : s + "_" + o[e].final_goods_spec.goods_spec_id);
        return {
            goodsAttrNum: t,
            goodsAttrStr: s
        };
    },
    finalAttrName: function() {
        var o = "", t = this.data.now_attr_name.split("/");
        for (var s in t) o = 0 == s ? t[0] : o + "," + t[s];
        return o;
    },
    createAttrGoods: function(o, t) {
        var s = this.createGoodsAttr(t).goodsAttrNum, e = this.createGoodsAttr(t).goodsAttrStr, i = this.finalAttrName(), r = {
            goods_id: o.goods_id,
            goods_name: o.goods_name,
            price: o.finalPrice,
            goods_attr_spec: t,
            goods_attr_spec_total: s,
            goods_attr_spec_str: e,
            goods_attr_name: i,
            goods_sort_id: o.goods_sort_id,
            goods_sum: 1,
            pack: o.pack,
            every_goodsPrice: o.finalPrice,
            is_force_stock: o.is_force_stock,
            stock_count: o.stock_count,
            state: o.state,
            is_attribute: o.is_attribute
        };
        return void 0 != o.attr.spec && (r.goods_spec = o.attr.spec.final_goods_spec), "" == o.goods_path ? r.goods_path = "../../images/logo_100.png" : r.goods_path = a + o.goods_path, 
        r;
    },
    increaceOrReduce: function(o, t, s, e) {
        return "add" == s ? (t.goodsPrice_sum = t.goodsPrice_sum + o.price, t.goods_sum = t.goods_sum + 1) : "reduce" == s && (0 == o.goods_sum && t.goods.splice(e, 1), 
        t.goodsPrice_sum = t.goodsPrice_sum - o.price, t.goods_sum = t.goods_sum - 1), t;
    },
    addAttrGoods: function(o, t) {
        for (var s in o) if (o[s].goods_id == t.goods_id && t.goods_attr_spec_total == o[s].goods_attr_spec_total && t.goods_spec == o[s].goods_spec) {
            t.goods_sum = o[s].goods_sum + 1, t.every_goodsPrice = +getApp().moneyFilter(+t.price + +t.every_goodsPrice);
            break;
        }
        return t;
    },
    addOneGoods: function(o, t) {
        for (var s in o) {
            if (o[s].goods_id == t.goods_id) {
                t.goods_sum = o[s].goods_sum + 1, t.every_goodsPrice = +getApp().moneyFilter(+t.price + +o[s].every_goodsPrice);
                break;
            }
            s == o.length - 1 && (t.goods_sum = 1, t.every_goodsPrice = +getApp().moneyFilter(+t.price));
        }
        return t;
    },
    addInShopCar: function(o) {
        var t = {
            isShowDetail: !1
        };
        1 == o.target.dataset.item.is_attribute ? (this.setData(t), this.addOne(o)) : (this.setData(t), 
        this.chooseGoodsAttr(o));
    },
    getShopQualification: function(o) {
        "" != o.ext.business_path ? (o.ext.business_path = a + o.ext.business_path, o.ext.hasBusiness = !0) : o.ext.hasBusiness = !1, 
        "" != o.ext.permit_path ? (o.ext.permit_path = a + o.ext.permit_path, o.ext.hasPermit = !0) : o.ext.hasPermit = !1, 
        this.setData({
            ext: o.ext
        });
    }
});