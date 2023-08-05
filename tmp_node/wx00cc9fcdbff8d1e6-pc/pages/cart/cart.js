var t = getApp();

Page({
    data: {
        page: 1,
        minusStatuses: [ "disabled", "disabled", "normal", "normal", "disabled" ],
        total: 0,
        carts: []
    },
    bindMinus: function(a) {
        var e = this, s = parseInt(a.currentTarget.dataset.index), r = e.data.carts[s].num;
        r > 1 && r--, console.log(r);
        var i = a.currentTarget.dataset.cartid;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Shopping/up_cart",
            method: "post",
            data: {
                user_id: t.d.userId,
                num: r,
                cart_id: i
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (1 == t.data.status) {
                    var a = r <= 1 ? "disabled" : "normal";
                    e.data.carts[s].num = r;
                    var i = e.data.minusStatuses;
                    i[s] = a, e.setData({
                        minusStatuses: i
                    }), e.sum();
                } else wx.showToast({
                    title: "操作失败！",
                    duration: 2e3
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    bindPlus: function(a) {
        var e = this, s = parseInt(a.currentTarget.dataset.index), r = e.data.carts[s].num;
        r++, console.log(r);
        var i = a.currentTarget.dataset.cartid;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Shopping/up_cart",
            method: "post",
            data: {
                user_id: t.d.userId,
                num: r,
                cart_id: i
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (1 == t.data.status) {
                    var a = r <= 1 ? "disabled" : "normal";
                    e.data.carts[s].num = r;
                    var i = e.data.minusStatuses;
                    i[s] = a, e.setData({
                        minusStatuses: i
                    }), e.sum();
                } else wx.showToast({
                    title: "操作失败！",
                    duration: 2e3
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    bindCheckbox: function(t) {
        var a = parseInt(t.currentTarget.dataset.index), e = this.data.carts[a].selected, s = this.data.carts;
        s[a].selected = !e, this.setData({
            carts: s
        }), this.sum();
    },
    bindSelectAll: function() {
        var t = this.data.selectedAllStatus;
        t = !t;
        for (var a = this.data.carts, e = 0; e < a.length; e++) a[e].selected = t;
        this.setData({
            selectedAllStatus: t,
            carts: a
        }), this.sum();
    },
    bindCheckout: function() {
        for (var t = "", a = 0; a < this.data.carts.length; a++) this.data.carts[a].selected && (t += this.data.carts[a].id, 
        t += ",");
        if ("" == t) return wx.showToast({
            title: "请选择要结算的商品！",
            duration: 2e3
        }), !1;
        wx.navigateTo({
            url: "../order/pay?cartId=" + t
        });
    },
    bindToastChange: function() {
        this.setData({
            toastHidden: !0
        });
    },
    sum: function() {
        for (var t = this.data.carts, a = 0, e = 0; e < t.length; e++) t[e].selected && (a += t[e].num * t[e].price);
        this.setData({
            carts: t,
            total: "¥ " + a
        });
    },
    onLoad: function(t) {
        this.loadProductData(), this.sum();
    },
    onShow: function() {
        this.loadProductData();
    },
    removeShopCard: function(a) {
        var e = this, s = a.currentTarget.dataset.cartid;
        wx.showModal({
            title: "提示",
            content: "你确认移除吗",
            success: function(a) {
                a.confirm && wx.request({
                    url: t.d.ceshiUrl + "/Api/Shopping/delete",
                    method: "post",
                    data: {
                        cart_id: s
                    },
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        1 == t.data.status ? e.loadProductData() : wx.showToast({
                            title: "操作失败！",
                            duration: 2e3
                        });
                    }
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    loadProductData: function() {
        var a = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Shopping/index",
            method: "post",
            data: {
                user_id: t.d.userId
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var e = t.data.cart;
                a.setData({
                    carts: e
                });
            }
        });
    }
});