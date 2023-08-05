function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var e = t(require("../../store")), s = t(require("../../utils/create")), i = require("../../utils/watcherUtil"), o = require("../../api/apiInstance"), r = getApp();

(0, s.default)(e.default, {
    data: {
        isShow: !1,
        cartPage: "购物车",
        cartLeftText: "管理",
        submitText: "结算",
        navH: r.globalData.navH,
        status: r.globalData.status,
        summary: 0,
        isCheckAll: !1,
        cartList: [],
        isLogin: !1,
        isCheck: !1,
        isShowLoad: !1,
        shoppingCartChange: !1
    },
    onHide: function() {
        this.setData({
            cartLeftText: "管理",
            submitText: "结算"
        });
    },
    onReady: function() {
        var t = this;
        (0, i.setWatcher)(this.data, {
            shoppingCartChange: function(a) {
                t.getShoppingCartQuery();
            },
            isLogin: function(a) {
                a && t.getShoppingCartQuery();
            }
        }), this.store.data.isLogin && this.getShoppingCartQuery();
    },
    onManage: function() {
        "管理" == this.data.cartLeftText ? this.setData({
            cartLeftText: "完成",
            submitText: "删除"
        }) : this.setData({
            cartLeftText: "管理",
            submitText: "结算"
        });
    },
    getShoppingCartQuery: function() {
        var t = this;
        this.setData({
            isCheck: !1,
            isCheckAll: !1,
            isShowLoad: !0
        });
        var a = {
            accesstoken: this.store.data.userInfo.accesstoken
        };
        (0, o.getShoppingCartQuery)(a, function(a) {
            if (wx.stopPullDownRefresh(), 1 === a.errcode) {
                t.data.cartList = a.data;
                for (var e = 0; e < t.data.cartList.length; e++) for (var s = 0; s < t.data.cartList[e].goods.length; s++) t.data.cartList[e].goods[s].isChecked = !1;
                t.setData({
                    cartList: t.data.cartList
                });
            }
            t.setData({
                isShowLoad: !1
            });
        });
    },
    onPullDownRefresh: function() {
        this.store.data.isLogin && (this.getShoppingCartQuery(), this.setData({
            summary: 0
        }));
    },
    toGoodDetail: function(t) {
        var a = t.currentTarget.dataset.goodsUuid;
        wx.navigateTo({
            url: "/pages/goodDetail/goodDetail?goodsUuid=" + a
        });
    },
    toLogin: function(t) {
        wx.navigateTo({
            url: "/pages/login/loginFast/loginFast"
        });
    },
    toShop: function(t) {
        wx.navigateTo({
            url: "/pages/shop/shop?shopUuid=" + t.currentTarget.dataset.shopUuid
        });
    },
    onDeleteCart: function(t) {
        var a = this, e = {
            accesstoken: this.store.data.userInfo.accesstoken,
            shoppingcartUuids: JSON.stringify(t)
        };
        (0, o.getShoppingCartDelete)(e, function(t) {
            1 === t.errcode && (a.getShoppingCartQuery(), a.setData({
                summary: 0
            }), wx.showToast({
                title: "删除成功",
                icon: "none",
                duration: 3e3
            }));
        });
    },
    toPayment: function(t) {
        if ("结算" == this.data.submitText) {
            if (this.data.isCheck) {
                for (var a = JSON.parse(JSON.stringify(this.data.cartList)), e = 0; e < a.length; e++) {
                    for (i = 0; i < a[e].goods.length; i++) a[e].goods[i].isChecked || (a[e].goods.splice(i, 1), 
                    i--);
                    0 == a[e].goods.length && (a.splice(e, 1), e--);
                }
                this.store.data.payCarts = a, this.update(), wx.navigateTo({
                    url: "/pages/order/payment/payment"
                });
            }
        } else {
            if (0 == this.data.cartList.length) return void wx.showToast({
                title: "没有购物车商品可删除",
                icon: "none",
                duration: 3e3
            });
            for (var s = [], e = 0; e < this.data.cartList.length; e++) for (var i = 0; i < this.data.cartList[e].goods.length; i++) this.data.cartList[e].goods[i].isChecked && s.push(this.data.cartList[e].goods[i].shoppingcartUuid);
            if (0 == s.length) return void wx.showToast({
                title: "请选择购物车商品再删除",
                icon: "none",
                duration: 3e3
            });
            this.onDeleteCart(s);
        }
    },
    allCheck: function(t) {
        for (var a = 0; a < this.data.cartList.length; a++) for (var e = 0; e < this.data.cartList[a].goods.length; e++) this.data.isCheckAll ? this.data.cartList[a].goods[e].isChecked = !1 : this.data.cartList[a].goods[e].isChecked = !0;
        this.setData({
            cartList: this.data.cartList,
            isCheckAll: !this.data.isCheckAll
        }), this.selectGoodsPrice();
    },
    goodCheck: function(t) {
        var e = t.currentTarget.dataset.cartIndex, s = t.currentTarget.dataset.goodIndex, i = "cartList[" + e + "].goods[" + s + "].isChecked", o = !1;
        o = !this.data.cartList[e].goods[s].isChecked, this.setData(a({}, i, o)), this.selectGoodsPrice();
    },
    numMinus: function(t) {
        var a = t.currentTarget.dataset.cartIndex, e = t.currentTarget.dataset.goodIndex, s = this.data.cartList[a].goods[e].num, i = this.data.cartList[a].goods[e].shoppingcartUuid, o = "cartList[" + a + "].goods[" + e + "].num";
        s > 1 && this.getShoppingCartUpdate(i, s - 1, o);
    },
    numAdd: function(t) {
        var a = t.currentTarget.dataset.cartIndex, e = t.currentTarget.dataset.goodIndex, s = this.data.cartList[a].goods[e].num, i = this.data.cartList[a].goods[e].shoppingcartUuid, o = "cartList[" + a + "].goods[" + e + "].num";
        this.getShoppingCartUpdate(i, s + 1, o);
    },
    getShoppingCartUpdate: function(t, e, s) {
        var i = this, r = {
            accesstoken: this.store.data.userInfo.accesstoken,
            shoppingcartUuid: t,
            num: e
        };
        (0, o.getShoppingCartUpdate)(r, function(t) {
            1 === t.errcode && (i.setData(a({}, s, e)), i.selectGoodsPrice());
        });
    },
    selectGoodsPrice: function() {
        for (var t = !1, a = 0, e = 0; e < this.data.cartList.length; e++) for (var s = 0; s < this.data.cartList[e].goods.length; s++) {
            var i = this.data.cartList[e].goods[s];
            i.isChecked && (t = !0, 1 == i.payType ? a += i.salesPrice * i.num : 0 == i.depositRatio ? a += i.depositAmount * i.num : a += i.salesPrice * i.num * i.depositRatio / 100);
        }
        a = (a / 100).toFixed(2), this.setData({
            summary: a,
            isCheck: t
        });
    }
});