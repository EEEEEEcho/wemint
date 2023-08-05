var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, s = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create")), a = require("../../api/apiInstance"), e = getApp();

(0, s.default)({
    properties: {
        isShow: Boolean,
        isCart: Boolean,
        skus: Array,
        goodsInfo: Object,
        isFree: Boolean,
        groupUuid: String
    },
    observers: {
        isShow: function(t) {
            t && this.setData({
                options: !0
            });
        },
        skus: function(t) {
            null != t && this.getSkus();
        },
        goodsInfo: function(t) {
            if ("{}" != JSON.stringify(t)) {
                var s = "";
                0 != t.covers.length && (s = t.covers[0]);
                var a;
                a = this.data.isFree ? t.activityPrice : t.minSalesPrice, this.setData({
                    popupPrice: a,
                    goodImage: s
                });
            }
        }
    },
    data: {
        clickArray: [],
        showSkus: [],
        selectOnly: -1,
        popupPrice: 0,
        goodImage: "",
        goodNum: 1,
        payCarts: [],
        standard: "",
        options: !1,
        shoppingCartChange: !1,
        isIphoneX: e.globalData.isIphoneX
    },
    onHide: function() {
        clearTimeout();
    },
    onUnload: function() {
        clearTimeout();
    },
    methods: {
        onClose: function() {
            var t = this;
            this.setData({
                options: !1
            }), setTimeout(function() {
                t.setData({
                    isShow: !1
                });
            }, 450);
        },
        onMinus: function() {
            1 == this.data.goodNum ? wx.showToast({
                title: "购买的数量不能小于1件",
                icon: "none",
                duration: 3e3
            }) : this.setData({
                goodNum: this.data.goodNum - 1
            });
        },
        onPlus: function() {
            this.setData({
                goodNum: this.data.goodNum + 1
            });
        },
        setStandard: function(t, s) {
            if (0 == t.length && 1 == this.data.skus.length) this.setData({
                selectOnly: 0,
                standard: "单一规格"
            }); else {
                var a = "";
                if (0 == s.length) {
                    for (i = 0; i < t.length; i++) a += t[i].title, i != t.length - 1 && (a += " ");
                    this.setData({
                        standard: "请选择  " + a
                    });
                } else {
                    for (var e = "", i = 0; i < s.length; i++) e += s[i], i != s.length - 1 && (e += " ");
                    this.setData({
                        standard: "已选择  " + e
                    });
                }
            }
        },
        onSure: function() {
            if (this.store.data.isLogin) {
                if (-1 != this.data.selectOnly) {
                    var t = this.data.skus[this.data.selectOnly].skuUuid;
                    this.data.isCart ? this.addShoppingCart(t) : (this.setJumpCartList(), this.data.isFree && "" != this.data.groupUuid ? wx.navigateTo({
                        url: "/pages/order/payment/payment?groupUuid=" + this.data.groupUuid
                    }) : wx.navigateTo({
                        url: "/pages/order/payment/payment"
                    }));
                }
            } else wx.navigateTo({
                url: "/pages/login/loginFast/loginFast"
            });
        },
        setJumpCartList: function() {
            var t = {};
            t.logo = this.data.goodsInfo.shopLogo, t.name = this.data.goodsInfo.shopName, t.shopUuid = this.data.goodsInfo.shopUuid;
            var s = {};
            s.goodsUuid = this.data.goodsInfo.goodsUuid, s.num = this.data.goodNum, s.title = this.data.goodsInfo.title, 
            this.data.isFree ? (s.type = 2, s.payType = 1) : (s.payType = this.data.goodsInfo.payType, 
            s.type = 1), s.depositRatio = this.data.goodsInfo.depositRatio, s.depositAmount = this.data.goodsInfo.depositAmount, 
            s.deliveryType = this.data.goodsInfo.deliveryType, s.goodsCovers = this.data.goodsInfo.covers, 
            this.data.isFree ? s.salesPrice = this.data.skus[this.data.selectOnly].activityPrice : s.salesPrice = this.data.skus[this.data.selectOnly].salesPrice, 
            s.skuUuid = this.data.skus[this.data.selectOnly].skuUuid, s.skuProperties = this.data.skus[this.data.selectOnly].properties;
            var a = [];
            a.push(s), t.goods = a, this.store.data.payCarts.splice(0, this.store.data.payCarts.length), 
            this.store.data.payCarts.push(t), this.update();
        },
        addShoppingCart: function(t) {
            var s = this, e = {
                accesstoken: this.store.data.userInfo.accesstoken,
                goodsUuid: this.data.goodsInfo.goodsUuid,
                shopUuid: this.data.goodsInfo.shopUuid,
                skuUuid: t,
                num: this.data.goodNum
            };
            1 == this.data.payType ? e.isDeposit = 0 : e.isDeposit = 1, (0, a.getShoppingCartAdd)(e, function(t) {
                1 === t.errcode && (s.setData({
                    isShow: !1
                }), s.store.data.shoppingCartChange = !s.store.data.shoppingCartChange, s.update(), 
                wx.showToast({
                    title: "已添加到购物车",
                    icon: "none",
                    duration: 3e3
                }));
            });
        },
        getSkus: function() {
            for (var s = this, a = [], e = 0; e < this.data.skus.length; e++) if (0 == e) for (r = 0; r < this.data.skus[e].properties.length; r++) {
                this.data.clickArray.push("");
                var i = [], o = {};
                (h = {}).selectItem = !1, h.isClick = !0, "object" === t(this.data.skus[e].properties[r].value) ? ("" == this.data.skus[e].properties[r].value.remark ? h.value = this.data.skus[e].properties[r].value.value : h.value = this.data.skus[e].properties[r].value.value + "(" + this.data.skus[e].properties[r].value.remark + ")", 
                h.img = this.data.skus[e].properties[r].value.img, h.icon = this.data.skus[e].properties[r].value.icon) : h.value = this.data.skus[e].properties[r].value, 
                i.push(h), o.title = this.data.skus[e].properties[r].name, o.properties = i, a.push(o);
            } else for (var r = 0; r < this.data.skus[e].properties.length; r++) {
                var u = a.findIndex(function(t) {
                    return t.title == s.data.skus[e].properties[r].name;
                });
                if (-1 == a[u].properties.findIndex(function(a) {
                    var i;
                    return i = "object" === t(s.data.skus[e].properties[r].value) ? "" == s.data.skus[e].properties[r].value.remark ? s.data.skus[e].properties[r].value.value : s.data.skus[e].properties[r].value.value + "(" + s.data.skus[e].properties[r].value.remark + ")" : s.data.skus[e].properties[r].value, 
                    a.value == i;
                })) {
                    var h = {};
                    h.selectItem = !1, h.isClick = !0, "object" === t(this.data.skus[e].properties[r].value) ? ("" == this.data.skus[e].properties[r].value.remark ? h.value = this.data.skus[e].properties[r].value.value : h.value = this.data.skus[e].properties[r].value.value + "(" + this.data.skus[e].properties[r].value.remark + ")", 
                    h.img = this.data.skus[e].properties[r].value.img, h.icon = this.data.skus[e].properties[r].value.icon) : h.value = this.data.skus[e].properties[r].value, 
                    a[u].properties.push(h);
                }
            }
            this.setStandard(a, []), this.setData({
                showSkus: a
            });
        },
        onSelectItem: function(s) {
            var a = s.currentTarget.dataset.i, e = s.currentTarget.dataset.j;
            if (this.data.showSkus[a].properties[e].selectItem) this.data.showSkus[a].properties[e].selectItem = !1, 
            this.data.clickArray[a] = ""; else {
                for (o = 0; o < this.data.showSkus[a].properties.length; o++) this.data.showSkus[a].properties[o].selectItem = !1;
                this.data.clickArray[a] = e + "", this.data.showSkus[a].properties[e].selectItem = !0;
            }
            for (var i = [], o = 0; o < this.data.clickArray.length; o++) "" != this.data.clickArray[o] && i.push(this.data.showSkus[o].properties[parseInt(this.data.clickArray[o])].value);
            for (var r = [], o = 0; o < this.data.skus.length; o++) {
                for (var u = !0, h = 0; h < i.length; h++) for (p = 0; p < this.data.skus[o].properties.length; p++) {
                    if ("object" === t(this.data.skus[o].properties[p].value)) {
                        if ("" == this.data.skus[o].properties[p].value.remark) {
                            if (i[h] == this.data.skus[o].properties[p].value.value) break;
                        } else if (i[h] == this.data.skus[o].properties[p].value.value + "(" + this.data.skus[o].properties[p].value.remark + ")") break;
                    } else if (i[h] == this.data.skus[o].properties[p].value) break;
                    p + 1 == this.data.skus[o].properties.length && (u = !1);
                }
                u && (r.push(this.data.skus[o].properties), this.data.selectOnly = o), o + 1 == this.data.skus.length && 1 != r.length && (this.data.selectOnly = -1);
            }
            for (var d = [], o = 0; o < r.length; o++) for (var p = 0; p < r[o].length; p++) for (h = 0; h < this.data.showSkus.length; h++) if (r[o][p].name == this.data.showSkus[h].title) {
                for (c = 0; c < this.data.showSkus[h].properties.length; c++) if ("object" === t(this.data.skus[o].properties[p].value)) {
                    if ("" == r[o][p].value.remark) {
                        if (r[o][p].value.value == this.data.showSkus[h].properties[c].value) {
                            d.push(h + "," + c);
                            break;
                        }
                    } else if (r[o][p].value.value + "(" + r[o][p].value.remark + ")" == this.data.showSkus[h].properties[c].value) {
                        d.push(h + "," + c);
                        break;
                    }
                } else if (r[o][p].value == this.data.showSkus[h].properties[c].value) {
                    d.push(h + "," + c);
                    break;
                }
                break;
            }
            for (var l = 0, n = -1, h = 0; h < this.data.clickArray.length; h++) "" == this.data.clickArray[h] ? l++ : n = h;
            for (h = 0; h < this.data.showSkus.length; h++) if (this.data.clickArray.length - l == 1) if (n != h) for (c = 0; c < this.data.showSkus[h].properties.length; c++) this.data.showSkus[h].properties[c].isClick = !1; else for (c = 0; c < this.data.showSkus[h].properties.length; c++) this.data.showSkus[h].properties[c].isClick = !0; else for (var c = 0; c < this.data.showSkus[h].properties.length; c++) this.data.showSkus[h].properties[c].isClick = !1;
            for (h = 0; h < d.length; h++) {
                var k = d[h].split(",");
                this.data.showSkus[k[0]].properties[k[1]].isClick = !0;
            }
            this.setStandard(this.data.showSkus, i);
            var g = "";
            if (-1 != this.data.selectOnly) {
                for (a = 0; a < this.data.skus[this.data.selectOnly].properties.length; a++) {
                    var v = this.data.skus[this.data.selectOnly].properties[a];
                    "object" === t(v.value) && (null != v.value.icon && "" != v.value.icon ? g = v.value.icon : null != v.value.img && "" != v.value.img && (g = v.value.img));
                }
                if ("" != g) this.setData({
                    goodImage: g
                }); else {
                    var f = "";
                    0 != this.data.goodsInfo.covers.length && (f = this.data.goodsInfo.covers[0]), f != g && "" != g && this.setData({
                        goodImage: g
                    });
                }
                this.data.isFree ? this.data.popupPrice = this.data.skus[this.data.selectOnly].activityPrice : this.data.popupPrice = this.data.skus[this.data.selectOnly].salesPrice;
            } else this.data.isFree ? this.data.popupPrice = this.data.goodsInfo.activityPrice : this.data.popupPrice = this.data.goodsInfo.minSalesPrice;
            this.setData({
                showSkus: this.data.showSkus,
                popupPrice: this.data.popupPrice,
                selectOnly: this.data.selectOnly
            });
        },
        preventTouchMove: function(t) {}
    }
});