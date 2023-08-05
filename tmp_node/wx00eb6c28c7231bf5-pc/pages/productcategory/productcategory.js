function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = getApp();

Page((a = {
    data: {
        Css: {
            LHeight: 0,
            FirstIndex: 0,
            SecondIndex: 0,
            SortIndex: 1
        },
        CategoryList: [],
        CurrentCategory: null,
        ProductList: null,
        CurrentProduct: null,
        CurrentSku: null,
        Cid: 0,
        SortBy: "",
        SortOrder: "asc",
        KeyWord: "",
        PageIndex: 1,
        PageSize: 10,
        Num: 0,
        SortClass: "",
        isShow: !0,
        selectedskuList: [],
        buyAmount: 1,
        selectedSku: "",
        SkuItemList: null,
        MarginTop: 0
    },
    onLoad: function(t) {
        var a = this;
        a.loadCategory(a), a.loadData(a, !1);
    },
    loadCategory: function(t) {
        e.getOpenId(function(a) {
            wx.request({
                url: e.getUrl("GetAllCategories"),
                data: {},
                success: function(a) {
                    if ("OK" == a.data.Status) {
                        var e = a.data.Data;
                        t.setData({
                            CategoryList: e,
                            CurrentCategory: e[0]
                        });
                    } else "NOUser" == a.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: a.data.Message,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            });
        });
    },
    BuyProduct: function(t) {
        var a = this, n = t.currentTarget.dataset.index, u = t.currentTarget.dataset.sku, r = t.currentTarget.dataset.productid, s = a.data.ProductList, o = null;
        0 == u ? (s[n].CartQuantity = 1, a.setData({
            isShow: !0,
            ProductList: s,
            CurrentSku: o,
            selectedskuList: []
        })) : wx.request({
            url: e.getUrl("GetProductSkus"),
            data: {
                ProductId: r
            },
            success: function(t) {
                if ("OK" == t.data.Status) {
                    var e = t.data.Data;
                    o = e.DefaultSku, a.setData({
                        isShow: !1,
                        CurrentProduct: e,
                        CurrentSku: o,
                        selectedskuList: []
                    });
                }
            },
            complete: function() {}
        });
    },
    minusCount: function(t) {
        var a = this, e = t.currentTarget.dataset.index, n = this.data.ProductList, u = n[e].CartQuantity;
        u <= 1 || (u -= 1, n[e].CartQuantity = u, a.ChangeQuantiy(a, n, n[e].SkuId, -1));
    },
    addCount: function(t) {
        var a = this, e = t.currentTarget.dataset.index, n = this.data.ProductList, u = n[e].CartQuantity;
        u += 1, n[e].CartQuantity = u, a.ChangeQuantiy(a, n, n[e].SkuId, 1);
    },
    ChangeQuantiy: function(t, a, n, u) {
        e.getOpenId(function(r) {
            wx.request({
                url: e.getUrl("addToCart"),
                data: {
                    openId: r,
                    SkuID: n,
                    Quantity: u
                },
                success: function(e) {
                    "OK" == e.data.Status ? t.setData({
                        ProductList: a
                    }) : "NOUser" == e.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: e.data.ErrorResponse.ErrorMsg,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {}
            });
        });
    },
    onSkuHide: function(t) {
        that.setData({
            isShow: !0
        });
    },
    onSkuClick: function(t) {
        var a = this, e = t.target.dataset.indexcount, n = t.target.id, u = t.target.dataset.skuvalue, r = new Object();
        r.ValueId = n, r.Value = u;
        var s = this.data.selectedskuList;
        s[e] = r;
        var o = "", i = this.data.CurrentProduct, d = this.data.CurrentProduct.SkuItems;
        i.SkuItems.length, s.length;
        for (var c = i.ProductId, l = 0; l < s.length; l++) {
            var h = s[l];
            void 0 != h && (o += "" == o ? h.Value : "," + h.Value, c += "_" + h.ValueId);
        }
        for (var g = 0; g < i.SkuItems[e].AttributeValue.length; g++) i.SkuItems[e].AttributeValue[g].ValueId == n ? i.SkuItems[e].AttributeValue[g].UseAttributeImage = "selected" : i.SkuItems[e].AttributeValue[g].UseAttributeImage = "False";
        var C = null;
        this.data.CurrentProduct.Skus.find(function(t, e) {
            if (c == t.SkuId) return C = t, void (a.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
        }), this.setData({
            selectedskuList: s,
            selectedSku: c,
            selectedSkuContent: o,
            SkuItemList: d,
            CurrentProduct: i
        }), null != C && this.setData({
            CurrentSku: C
        });
    },
    bindSearchInput: function(t) {
        var a = t.detail.value;
        a.length > 0 && this.setData({
            keyword: a
        });
    },
    bindConfirmSearchInput: function(t) {
        var a = t.detail.value;
        a.length > 0 && (wx.setStorage({
            key: "keyword",
            data: a
        }), wx.switchTab({
            url: "../searchresult/searchresult",
            success: function(t) {
                wx.hideKeyboard();
            }
        }));
    },
    gotoKeyWordPage: function(t) {
        wx.navigateTo({
            url: "../search/search"
        });
    },
    bindBlurInput: function(t) {
        wx.hideKeyboard();
    },
    changeAmount: function(t) {
        var a = parseInt(t.detail.value), e = this.data.CurrentSkuStock;
        isNaN(a) || a > e || a <= 0 ? wx.showModal({
            title: "提示",
            content: "请输入正确的数量,不能大于库存或者小于等于0",
            showCancel: !1
        }) : this.setData({
            buyAmount: a
        });
    },
    reduceAmount: function(t) {
        var a = this.data.buyAmount;
        (a -= 1) <= 0 || this.setData({
            buyAmount: a
        });
    },
    addAmount: function(t) {
        var a = this.data.buyAmount;
        (a += 1) > this.data.CurrentSku.Stock ? wx.showModal({
            title: "提示",
            content: "请输入正确的数量,不能大于库存或者小于等于0",
            showCancel: !1
        }) : this.setData({
            buyAmount: a
        });
    },
    loadData: function(t, a) {
        wx.showNavigationBarLoading(), wx.request({
            url: e.getUrl("GetProducts"),
            data: {
                keyword: t.data.KeyWord,
                pageIndex: t.data.PageIndex,
                pageSize: t.data.PageSize,
                sortBy: t.data.SortBy,
                sortOrder: t.data.SortOrder,
                cId: t.data.Cid
            },
            success: function(e) {
                if ("OK" == e.data.Status) {
                    var n = e.data.Data;
                    if (a) {
                        var u = t.data.ProductList;
                        u.push.apply(u, n), t.setData({
                            ProductList: u
                        });
                    } else t.setData({
                        ProductList: n
                    });
                } else wx.showModal({
                    title: "提示",
                    content: e.data.Message,
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            },
            complete: function() {
                wx.getSystemInfo({
                    success: function(a) {
                        var e = a.windowHeight - 53, n = t.data.Css;
                        n.LHeight = e, t.setData({
                            CSS: n
                        });
                    }
                }), t.SetSubCategoryHeight(), wx.hideNavigationBarLoading();
            }
        });
    },
    SetSubCategoryHeight: function() {
        var t = 174;
        this.data.CurrentCategory.subs.forEach(function(a, e, n) {
            var u = 18 * a.name.length, r = parseInt(u) + parseInt(76);
            t += r;
        });
        var a = parseInt(t / 536);
        t % 536 > 0 && a > 0 && (a = parseInt(a) + parseInt(1));
        var e = 202;
        e = 0 == a ? 0 : parseInt(84 * (a - 1)), this.setData({
            MarginTop: e
        }), console.log(e);
    },
    commitBuy: function(t) {
        for (var a = this, e = !0, n = 0; n < a.data.selectedskuList.length; n++) if (void 0 == this.data.selectedskuList[n] || "" == a.data.selectedskuList[n] || null == this.data.selectedskuList[n]) {
            e = !1;
            break;
        }
        if (null != this.data.SkuItemList && a.data.selectedskuList.length == this.data.SkuItemList.length && e) if (a.data.buyAmount <= 0) wx.showModal({
            title: "提示",
            content: "请输入要购买的数量",
            showCancel: !1
        }); else {
            var u = this.data.buyAmount, r = this.data.selectedSku;
            if (u > this.data.CurrentSku.Stock) wx.showModal({
                title: "提示",
                content: "请输入正确的数量,不能大于库存或者小于等于0",
                showCancel: !1
            }); else {
                var s = u - this.data.CurrentSku.CartQuantity, o = this.data.ProductList;
                o.find(function(t, e) {
                    t.ProductId != a.data.CurrentProduct.ProductId || (t.CartQuantity += s);
                }), a.ChangeQuantiy(a, o, r, s), a.onSkuHide(t);
            }
        } else wx.showModal({
            title: "提示",
            content: "请选择规格",
            showCancel: !1
        });
    }
}, t(a, "onSkuHide", function(t) {
    this.setData({
        isShow: !0,
        CurrentSku: null,
        CurrentProduct: null,
        selectedSku: "",
        buyAmount: 1
    });
}), t(a, "ChooseCategory", function(t) {
    var a = this, e = t.currentTarget.dataset.cid, n = t.currentTarget.dataset.grade, u = t.currentTarget.dataset.index, r = a.data.Css;
    "1" == n ? a.data.CategoryList.find(function(t, n) {
        r.FirstIndex = u, r.SecondIndex = 0, t.cid != e || a.setData({
            CurrentCategory: t,
            Css: r,
            Cid: e
        });
    }) : (r.SecondIndex = u, a.setData({
        Css: r,
        Cid: e
    })), a.loadData(a, !1);
}), t(a, "SortClick", function(t) {
    var a = this, e = t.currentTarget.dataset.sortby, n = t.currentTarget.dataset.index, u = a.data.Css;
    u.SortIndex = n;
    var r = "asc", s = "shengxu";
    a.data.SortOrder == r && (r = "desc", s = "jiangxu"), a.setData({
        PageIndex: 1,
        SortBy: e,
        SortOrder: r,
        SortClass: s,
        Css: u
    }), a.loadData(a, !1);
}), t(a, "ChooseProduct", function(t) {
    var a = t.currentTarget.dataset.productid;
    wx.navigateTo({
        url: "../productdetail/productdetail?id=" + a
    });
}), t(a, "onReachBottom", function() {
    var t = this, a = t.data.PageIndex + 1;
    t.setData({
        PageIndex: a
    }), t.loadData(t, !0);
}), t(a, "onReady", function() {}), t(a, "onShow", function() {}), t(a, "onHide", function() {}), 
t(a, "onUnload", function() {}), t(a, "onPullDownRefresh", function() {}), t(a, "onReachBottom", function() {}), 
t(a, "onShareAppMessage", function() {}), a));