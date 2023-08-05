var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = getApp();

Component({
    properties: {
        productAttrs: {
            type: Array,
            value: [],
            observer: function(t, r, a) {
                if (t && t.length) {
                    var n = {}, e = this.data.productBaseInfo.skuId, o = e && this.data.productAttrGroup.find(function(t) {
                        return t.SkuID == e;
                    });
                    t.forEach(function(t) {
                        var r = o && o.list && o.list.find(function(r) {
                            return t.AttrVals.find(function(t) {
                                return t.AttrValID == r;
                            });
                        }), a = t.AttrVals && 1 === t.AttrVals.length ? t.AttrVals[0].AttrValID : 0;
                        n[t.AttrKeyID] = r || a;
                    }), this.setData({
                        currentDefaultData: n
                    }), this._getAttrSelectText(), this._changeProductBaseInfo();
                }
            }
        },
        entranceType: {
            type: String,
            value: "default"
        },
        productAttrGroup: {
            type: Array,
            value: [],
            observer: function(t, r, a) {
                t.forEach(function(t) {
                    t.list = t.Path.split(",").filter(function(t) {
                        if (t) return t;
                    });
                });
            }
        },
        hideNumFlag: {
            type: Boolean,
            value: !1
        },
        productBaseInfo: {
            type: Object,
            value: {
                currentProImg: "",
                price: 100,
                quantity: 100,
                count: 1,
                limitNum: 0,
                limitNumText: "",
                skuId: 0
            }
        }
    },
    data: {
        proSkuModalShow: !0,
        mainHeight: 500,
        currentSelectAttrText: {
            containTitleText: "",
            text: "请选择规格"
        },
        currentDefaultData: null
    },
    ready: function() {
        this.setData({
            mainHeight: this.selectComponent("#proModal").data.mainHeight - 228
        });
    },
    methods: {
        _onShowModal: function() {
            this.setData({
                proSkuModalShow: !0
            }), this.selectComponent("#proModal").onShowModal();
        },
        _onCloseModal: function() {
            this.setData({
                proSkuModalShow: !1
            });
        },
        _getAttrSelectText: function() {
            var t = this.data.currentDefaultData, r = this.data.productAttrs, a = [], n = [];
            for (var e in t) {
                (function(e) {
                    var o = t[e];
                    if (!o) return "continue";
                    var i = r.find(function(t) {
                        return t.AttrKeyID == e;
                    });
                    if (i) {
                        var u = i.AttrVals.find(function(t) {
                            return t.AttrValID == o;
                        });
                        u && (a.push(u.AttrValName), n.push(i.AttrKeyName + ":" + u.AttrValName));
                    }
                })(e);
            }
            this.setData({
                currentSelectAttrText: {
                    containTitleText: n.join("；"),
                    text: a.length ? a.join("；") : "请选择规格"
                }
            });
        },
        _onCalculateNum: function(t) {
            var r = t.target.dataset.type, a = this.data.productBaseInfo, n = a.count;
            if ("1" === r) {
                if (1 === n) return wx.showToast({
                    title: "商品已不能在减了",
                    icon: "none"
                });
                n--;
            } else if ("2" === r) {
                if (a.quantity <= n) return wx.showToast({
                    title: "商品数量已超出库存",
                    icon: "none"
                });
                if (a.limitNum && a.limitNum <= n) return wx.showToast({
                    title: "商品已超出限购数量",
                    icon: "none"
                });
                n++;
            }
            a.count = n, this.setData({
                productBaseInfo: a
            });
        },
        _bindManual: function(t) {
            Number(t.detail.value);
        },
        _blurManual: function(t) {
            var r = Number(t.detail.value) || 1, a = this.data.productBaseInfo.quantity, n = this.data.productBaseInfo.limitNum, e = n && n < a ? n : a;
            r >= e && (r = e), this.setData({
                "productBaseInfo.count": r
            });
        },
        _onSelectAttrItem: function(t) {
            var a = t.target.dataset, n = a.index, e = a.idx, o = this.data.productAttrs[n], i = o.AttrVals[e];
            if (!i.disable) {
                var u = this.data.currentDefaultData, c = this.data.productBaseInfo;
                "1" == o.hasImg && (c.currentProImg = r.globalData.siteBaseUrl + i.AttrValSmallImg), 
                u[i.AttrKeyID] = u[i.AttrKeyID] == i.AttrValID ? 0 : i.AttrValID, this.setData({
                    currentDefaultData: u,
                    productBaseInfo: c
                }), this._getAttrSelectText(), this._changeProductBaseInfo();
            }
        },
        _changeProductBaseInfo: function() {
            var t = this.data.currentDefaultData, r = this.data.productAttrs, a = [], n = "";
            for (var e in t) {
                var o = t[e];
                o && a.push(o), o || (n = e);
            }
            var i = a.length;
            if (r.forEach(function(t) {
                t.AttrVals.forEach(function(t) {
                    t.disable = !1;
                });
            }), i < r.length - 1) this.setData({
                productAttrs: r
            }); else {
                var u = this.data.productAttrGroup;
                if (i === r.length - 1) {
                    var c = u.filter(function(t) {
                        var r = 0;
                        return a.forEach(function(a) {
                            t.list.find(function(t) {
                                return t == a;
                            }) && r++;
                        }), r == a.length;
                    });
                    return r.forEach(function(t) {
                        t.AttrKeyID == n && t.AttrVals.forEach(function(t) {
                            var r = c.find(function(r) {
                                return r.list.find(function(r) {
                                    return r == t.AttrValID;
                                });
                            });
                            r && !Number(r.ProductQuantity) && (t.disable = !0);
                        });
                    }), void this.setData({
                        productAttrs: r
                    });
                }
                var s = u.filter(function(t) {
                    return t.list.sort().toString() == a.sort().toString();
                })[0], f = this.data.productBaseInfo;
                f.quantity = Number(s.ProductQuantity), f.count >= f.quantity && (f.count = f.quantity), 
                f.price = s.Price, f.attrData = s, this.setData({
                    productBaseInfo: f
                }), r.forEach(function(r) {
                    var a = [], n = [];
                    for (var e in t) e != r.AttrKeyID && a.push(t[e]);
                    a.length && u.forEach(function(t) {
                        var r = 0;
                        t.list.forEach(function(t) {
                            a.find(function(r) {
                                return t === r;
                            }) && r++;
                        }), r === a.length && n.push(t);
                    }), r.AttrVals.forEach(function(t) {
                        return t.disable = !1;
                    }), n.forEach(function(t) {
                        Number(t.ProductQuantity) || r.AttrVals.forEach(function(r) {
                            t.list.find(function(t) {
                                return r.AttrValID == t;
                            }) && (r.disable = !0);
                        });
                    });
                }), this.setData({
                    productAttrs: r
                });
            }
        },
        _onBottomButton: function(r) {
            var a = r.target.dataset.type, n = [ "default", "shopCart", "buyNow" ], e = this.data.currentDefaultData, o = this.data.productAttrs, i = this.data.productBaseInfo, u = this.data.currentSelectAttrText, c = this;
            if (o && o.length) {
                for (var s in e) {
                    var f = function(t) {
                        if (!e[t]) {
                            var r = o.find(function(r) {
                                return r.AttrKeyID == t;
                            });
                            return {
                                v: wx.showToast({
                                    title: "请选择 ` " + r.AttrKeyName + " `",
                                    icon: "none"
                                })
                            };
                        }
                    }(s);
                    if ("object" === (void 0 === f ? "undefined" : t(f))) return f.v;
                }
            }
            this.triggerEvent("confirm", {
                productBaseInfo: i,
                close: function() {
                    c.selectComponent("#proModal").onCloseModal();
                },
                type: n[a],
                currentSelectAttrText: u
            });
        }
    }
});