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
        SkuItemList: null
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
        var a = this, u = t.currentTarget.dataset.index, n = t.currentTarget.dataset.sku, s = t.currentTarget.dataset.productid, r = a.data.ProductList;
        0 == n ? r[u].CartQuantity = 1 : wx.request({
            url: e.getUrl("GetProductSkus"),
            data: {
                ProductId: s
            },
            success: function(t) {
                if ("OK" == t.data.Status) {
                    var e = t.data.Data;
                    a.setData({
                        CurrentProduct: e,
                        CurrentSku: e.DefaultSku
                    });
                }
            }
        }), a.setData({
            isShow: !1,
            ProductList: r
        });
    },
    minusCount: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.ProductList, u = e[a].CartQuantity;
        e[a].CartQuantity = u <= 1 ? 1 : u - 1, this.setData({
            ProductList: e
        });
    },
    addCount: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.ProductList, u = e[a].CartQuantity;
        e[a].CartQuantity = u + 1, this.setData({
            ProductList: e
        });
    },
    onSkuHide: function(t) {
        that.setData({
            isShow: !0
        });
    },
    onSkuClick: function(t) {
        var a = t.target.dataset.indexcount, e = t.target.id, u = t.target.dataset.skuvalue, n = new Object();
        n.ValueId = e, n.Value = u;
        var s = this.data.selectedskuList;
        s[a] = n;
        var r = "", d = this.data.CurrentProduct, o = this.data.CurrentProduct.SkuItems;
        d.SkuItems.length, s.length;
        for (var i = d.ProductId, c = 0; c < s.length; c++) {
            var l = s[c];
            void 0 != l && (r += "" == r ? l.Value : "," + l.Value, i += "_" + l.ValueId);
        }
        for (var g = 0; g < d.SkuItems[a].AttributeValue.length; g++) d.SkuItems[a].AttributeValue[g].ValueId == e ? d.SkuItems[a].AttributeValue[g].UseAttributeImage = "selected" : d.SkuItems[a].AttributeValue[g].UseAttributeImage = "False";
        var h = null;
        this.data.CurrentProduct.Skus.find(function(t, a) {
            i != t.SkuId || (h = t);
        }), this.setData({
            selectedskuList: s,
            selectedSku: i,
            selectedSkuContent: r,
            SkuItemList: o,
            CurrentProduct: d
        }), null != h && this.setData({
            CurrentSku: h
        });
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
        (a += 1) > this.data.CurrentSku.Stock || this.setData({
            buyAmount: a
        });
    },
    loadData: function(t, a) {
        wx.showNavigationBarLoading(), e.getOpenId(function(u) {
            wx.request({
                url: e.getUrl("GetProducts"),
                data: {
                    openId: u,
                    keyword: t.data.KeyWord,
                    pageIndex: t.data.PageIndex,
                    pageSize: t.data.PageSize,
                    sortBy: t.data.SortBy,
                    sortOrder: t.data.SortOrder,
                    cId: t.data.Cid
                },
                success: function(e) {
                    if ("OK" == e.data.Status) {
                        var u = e.data.Data;
                        if (a) {
                            var n = t.data.ProductList;
                            n.push.apply(n, u), t.setData({
                                ProductList: n
                            });
                        } else t.setData({
                            ProductList: u
                        });
                        wx.hideNavigationBarLoading();
                    } else "NOUser" == e.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
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
                            var e = a.windowHeight - 53, u = t.data.Css;
                            u.LHeight = e, t.setData({
                                CSS: u
                            });
                        }
                    });
                }
            });
        });
    },
    commitBuy: function(t) {
        for (var a = this, e = !0, u = 0; u < a.data.selectedskuList.length; u++) if (void 0 == this.data.selectedskuList[u] || "" == a.data.selectedskuList[u] || null == this.data.selectedskuList[u]) {
            e = !1;
            break;
        }
        if (null != this.data.SkuItemList && a.data.selectedskuList.length == this.data.SkuItemList.length && e) if (a.data.buyAmount <= 0) wx.showModal({
            title: "提示",
            content: "请输入要购买的数量",
            showCancel: !1
        }); else {
            var n = this.data.buyAmount, s = (this.data.selectedSku, this.data.ProductList);
            s.find(function(t, e) {
                t.ProductId != a.data.CurrentProduct.ProductId || (t.CartQuantity += n);
            }), this.setData({
                ProductList: s
            }), a.onSkuHide(t);
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
    var a = this, e = t.currentTarget.dataset.cid, u = t.currentTarget.dataset.grade, n = t.currentTarget.dataset.index, s = a.data.Css;
    "1" == u ? a.data.CategoryList.find(function(t, u) {
        s.FirstIndex = n, s.SecondIndex = 0, t.cid == e && a.setData({
            CurrentCategory: t,
            Css: s,
            Cid: e
        });
    }) : (s.SecondIndex = n, a.setData({
        Css: s,
        Cid: e
    })), a.loadData(a, !1);
}), t(a, "SortClick", function(t) {
    var a = this, e = t.currentTarget.dataset.sortby, u = t.currentTarget.dataset.index, n = a.data.Css;
    n.SortIndex = u;
    var s = "asc", r = "shengxu";
    a.data.SortOrder == s && (s = "desc", r = "jiangxu"), a.setData({
        PageIndex: 1,
        SortBy: e,
        SortOrder: s,
        SortClass: r,
        Css: n
    }), a.loadData(a, !1);
}), t(a, "ChooseProduct", function(t) {
    var a = t.currentTarget.dataset.productId;
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