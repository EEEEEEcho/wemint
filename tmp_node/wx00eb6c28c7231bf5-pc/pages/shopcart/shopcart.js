var t = getApp();

Page({
    data: {
        ShopCarts: null,
        isEdite: !1,
        TotalPrice: 0,
        EditeText: "编辑",
        selectAllStatus: !1,
        DelskuId: "",
        SelectskuId: []
    },
    onLoad: function(t) {
        this.loadData(this);
    },
    loadData: function(a) {
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("getShoppingCartList"),
                data: {
                    openId: e
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var e = t.data.Data;
                        e.CartItemInfo.forEach(function(t, a, e) {
                            t.selected = !1, t.ActQuantity = t.Quantity, t.isDelete = !1;
                        }), a.setData({
                            ShopCarts: e
                        });
                    } else "NOUser" == t.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.Message,
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
    selectList: function(t) {
        var a = this, e = t.currentTarget.dataset.index, n = a.data.ShopCarts, o = a.data.SelectskuId, s = !n.CartItemInfo[e].selected;
        n.CartItemInfo[e].selected = s;
        var r = n.CartItemInfo[e].SubTotal, i = a.data.TotalPrice;
        s ? (i = parseFloat(i) + parseFloat(r), o.push(n.CartItemInfo[e].SkuID)) : (i -= r, 
        o.shift(n.CartItemInfo[e].SkuID)), a.setData({
            ShopCarts: n,
            TotalPrice: i.toFixed(2),
            SelectskuId: o
        });
    },
    selectAll: function() {
        var t = this, a = [], e = 0, n = !t.data.selectAllStatus, o = t.data.ShopCarts;
        o.CartItemInfo.forEach(function(t, o, s) {
            t.IsValid && (t.selected = n, n && (a.push(t.SkuID), e += parseFloat(t.SubTotal)));
        }), t.setData({
            ShopCarts: o,
            selectAllStatus: n,
            TotalPrice: e.toFixed(2),
            SelectskuId: a
        });
    },
    SwitchEdite: function() {
        var t = this;
        "编辑" == t.data.EditeText ? t.setData({
            isEdite: !0,
            EditeText: "完成"
        }) : (t.SaveShopCart(), t.setData({
            isEdite: !1,
            EditeText: "编辑",
            DelskuId: ""
        }));
    },
    changeAmount: function(t) {
        var a = this, e = parseInt(t.detail.value), n = t.currentTarget.dataset.index, o = a.data.ShopCarts, s = o.CartItemInfo[n].Stock;
        e <= 0 || s - e <= 0 ? wx.showModal({
            title: "提示",
            content: "请输入正确的数量,不能大于库存或者小于等于0",
            showCancel: !1
        }) : (o.CartItemInfo[n].ActQuantity = amout, a.setData({
            ShopCarts: o
        }));
    },
    MuseNum: function(t) {
        var a = this, e = t.currentTarget.dataset.index, n = a.data.ShopCarts, o = n.CartItemInfo[e].ActQuantity;
        parseInt(o) <= 1 || (n.CartItemInfo[e].ActQuantity = o - 1, a.setData({
            ShopCarts: n
        }));
    },
    AddNum: function(t) {
        var a = this, e = t.currentTarget.dataset.index, n = a.data.ShopCarts, o = n.CartItemInfo[e].ActQuantity;
        n.CartItemInfo[e].Stock - o <= 0 || (n.CartItemInfo[e].ActQuantity = parseInt(o) + 1, 
        a.setData({
            ShopCarts: n
        }));
    },
    DelCarts: function(t) {
        var a = this, e = t.currentTarget.dataset.index, n = a.data.ShopCarts, o = n.CartItemInfo[e].SkuID;
        n.CartItemInfo[e].isDelete = !0;
        var s = a.data.DelskuId;
        "" != s ? s += "," + o : s = o, a.setData({
            DelskuId: s,
            ShopCarts: n
        });
    },
    SaveShopCart: function() {
        var a = this, e = a.data.DelskuId, n = a.data.ShopCarts;
        "" != e && t.getOpenId(function(o) {
            wx.request({
                url: t.getUrl("delCartItem"),
                data: {
                    openId: o,
                    SkuIds: e
                },
                success: function(t) {
                    "OK" == t.data.Status ? a.setData({
                        ShopCarts: t.data.Data
                    }) : "NOUser" == t.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : (wx.showModal({
                        title: "提示",
                        content: t.data.ErrorResponse.ErrorMsg,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    }), n.CartItemInfo.forEach(function(t, a, e) {
                        t.isDelete = !1;
                    }));
                },
                complete: function() {
                    a.setData({
                        ShopCarts: n
                    });
                }
            });
        });
        var o = [];
        n.CartItemInfo.forEach(function(t, a, e) {
            if (t.Quantity != t.ActQuantity) {
                var n = {
                    skuId: t.SkuID,
                    quantity: t.ActQuantity - t.Quantity
                };
                o.push(n), e[a].Quantity = t.ActQuantity;
            }
        }), o.forEach(function(t, e, o) {
            a.ChangeQuantiy(a, n, t.quantity, t.skuId);
        });
    },
    SettlementShopCart: function() {
        var a = this, e = a.data.SelectskuId.join(",");
        e <= 0 ? wx.showModal({
            title: "提示",
            content: "请选择要结算的商品",
            showCancel: !1
        }) : t.getOpenId(function(n) {
            wx.request({
                url: t.getUrl("CanSubmitOrder"),
                data: {
                    openId: n,
                    skus: e
                },
                success: function(t) {
                    "OK" == t.data.Status ? wx.navigateTo({
                        url: "../submitorder/submitorder?productsku=" + e
                    }) : "NOUser" == t.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : a.loadData(a);
                }
            });
        });
    },
    ChangeQuantiy: function(a, e, n, o) {
        t.getOpenId(function(s) {
            wx.request({
                url: t.getUrl("addToCart"),
                data: {
                    openId: s,
                    SkuID: o,
                    Quantity: n
                },
                success: function(t) {
                    "OK" == t.data.Status ? a.setData({
                        ShopCarts: e
                    }) : "NOUser" == t.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : (wx.showModal({
                        title: "提示",
                        content: t.data.ErrorResponse.ErrorMsg,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    }), e.CartItemInfo.forEach(function(t, a, e) {
                        if (t.SkuID == o) {
                            var s = t.Quantity;
                            return s -= n, void (t.ActQuantity = Quantity = s);
                        }
                    }), a.setData({
                        ShopCarts: e
                    }));
                },
                complete: function() {}
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        this.loadData(this), this.setData({
            selectAllStatus: !1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});