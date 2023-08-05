var t = getApp();

Page({
    data: {
        delBtnWidth: 160,
        data: [ {
            content: "1",
            right: 0
        }, {
            content: "2",
            right: 0
        }, {
            content: "3",
            right: 0
        } ],
        isScroll: !0,
        windowHeight: 0,
        url: t.page.url,
        carts: [],
        total: "",
        selectedAllStatus: !1,
        cart_id: "",
        num: 0,
        minusStatuses: [ "disabled", "disabled", "normal", "normal", "disabled" ],
        userid: "",
        msg: "",
        style: "",
        openid: "",
        hidden_foot: !0
    },
    onLoad: function(t) {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    windowHeight: t.windowHeight
                });
            }
        });
    },
    onShow: function() {
        var a = this;
        wx.setNavigationBarTitle({
            title: t.globalData.title
        }), a.setData({
            selectedAllStatus: !1
        }), wx.getStorage({
            key: "userid",
            success: function(e) {
                console.log(e), a.setData({
                    userid: e.data,
                    style: "display:none"
                }), "Y" == t.globalData.is_mobile ? a.check_mobile() : (a.setData({
                    hidden_foot: !1
                }), a.getCart(), a.sum());
            },
            fail: function() {
                wx.switchTab({
                    url: "../my/my"
                });
            }
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    windowHeight: t.windowHeight
                });
            }
        });
    },
    sum: function() {
        for (var t = this.data.carts, a = 0, e = 0; e < t.length; e++) t[e].selected && (a += t[e].num * t[e].salesprice);
        a = a.toFixed(2), this.setData({
            carts: t,
            total: "¥ " + a
        });
    },
    bindCheckbox: function(t) {
        var a = parseInt(t.currentTarget.dataset.index), e = this.data.carts[a].selected, s = this.data.carts;
        s[a].selected = !e, this.setData({
            carts: s
        });
        for (var n = !0, i = 0; i < s.length; i++) 0 == s[i].selected && (this.setData({
            selectedAllStatus: !1
        }), n = !1);
        1 == n && this.setData({
            selectedAllStatus: !0
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
    getCart: function() {
        var a = this;
        a.setData({
            msg: ""
        }), console.log(), wx.request({
            url: t.page.url + "/wx/shopcart.php?act=list&userid=" + a.data.userid,
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t), a.setData({
                    carts: t.data.cart_info,
                    msg: "购物车里什么都没有喽！"
                }), a.sum();
            }
        });
    },
    drawStart: function(t) {
        var a = t.touches[0];
        for (var e in this.data.carts) {
            this.data.carts[e].right = 0;
        }
        this.setData({
            data: this.data.carts,
            startX: a.clientX
        });
    },
    drawMove: function(t) {
        var a = t.touches[0], e = this.data.carts[t.currentTarget.dataset.index], s = this.data.startX - a.clientX;
        s >= 20 ? (s > this.data.delBtnWidth && (s = this.data.delBtnWidth), e.right = s, 
        this.setData({
            isScroll: !1,
            carts: this.data.carts
        })) : (e.right = 0, this.setData({
            isScroll: !0,
            carts: this.data.carts
        }));
    },
    drawEnd: function(t) {
        var a = this.data.carts[t.currentTarget.dataset.index];
        a.right >= this.data.delBtnWidth / 2 ? (a.right = this.data.delBtnWidth, this.setData({
            isScroll: !0,
            carts: this.data.carts
        })) : (a.right = 0, this.setData({
            isScroll: !0,
            carts: this.data.carts
        }));
    },
    delItem: function(a) {
        var e = this, s = a.currentTarget.dataset.cartid;
        wx.showModal({
            title: "提示",
            content: "你确认删除吗",
            success: function(a) {
                a.confirm && wx.request({
                    url: t.page.url + "/wx/shopcart.php?act=shopcart_delete",
                    method: "post",
                    data: {
                        id: s,
                        userid: e.data.userid
                    },
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        console.log(t), "1" == t.data.code ? (e.getCart(), e.sum()) : wx.showToast({
                            title: "操作失败！",
                            duration: 2e3,
                            icon: "none"
                        });
                    }
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3,
                    icon: "none"
                });
            }
        });
    },
    bindMinus: function(t) {
        console.log("bindMinus");
        var a = parseInt(t.currentTarget.dataset.index), e = this.data.carts[a].num, s = (this.data.carts[a].housenum, 
        t.currentTarget.dataset.cartid);
        e <= 1 ? e = e : (e--, this.setData({
            num: e,
            cart_id: s
        }), this.data.carts[a].num = e, console.log(this.data.num), this.numUpdate(a));
    },
    bindPlus: function(t) {
        console.log(t);
        var a = parseInt(t.currentTarget.dataset.index), e = this.data.carts[a].num, s = this.data.carts[a].housenum;
        e++;
        var n = t.currentTarget.dataset.cartid;
        e > s && (console.log(1), wx.showToast({
            title: "超库存！",
            duration: 2e3,
            icon: "none"
        }), e = s), this.data.carts[a].num = e, this.setData({
            num: e,
            cart_id: n
        }), this.numUpdate(a);
    },
    bindManual: function(t) {
        console.log(t);
        var a = parseInt(t.currentTarget.dataset.index), e = t.detail.value, s = this.data.carts[a].housenum, n = t.currentTarget.dataset.cartid;
        console.log(a), console.log(n), console.log(e), console.log(s), parseInt(e) > parseInt(s) && (console.log(2), 
        wx.showToast({
            title: "超库存！",
            duration: 2e3,
            icon: "none"
        }), e = s), this.data.carts[a].num = e, console.log(this.data.carts[a].num), this.setData({
            num: e,
            cart_id: n
        }), this.numUpdate(a);
    },
    numUpdate: function(a) {
        var e = this;
        wx.request({
            url: t.page.url + "/wx/shopcart_ajax.php",
            method: "post",
            data: {
                num: e.data.num,
                id: e.data.cart_id,
                userid: this.data.userid
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t);
                var s = t.data.status, n = t.data.num;
                if (0 == s) {
                    var i = n <= 1 ? "disabled" : "normal", o = e.data.minusStatuses;
                    o[a] = i, e.setData({
                        minusStatuses: o
                    }), e.sum();
                } else wx.showToast({
                    title: "操作失败！",
                    duration: 2e3,
                    icon: "none"
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3,
                    icon: "none"
                });
            }
        });
    },
    bindCheckout: function() {
        for (var t = "", a = 0; a < this.data.carts.length; a++) this.data.carts[a].selected && (t += this.data.carts[a].id, 
        t += ",");
        if ("" == t) return wx.showToast({
            title: "请选择商品！",
            duration: 2e3,
            icon: "none"
        }), !1;
        console.log(t), wx.navigateTo({
            url: "../order1/order1?cartId=" + t
        });
    },
    bindGetUserInfo: function(t) {
        t.detail.userInfo ? (this.setData({
            userInfo: t.detail.userInfo
        }), wx.setStorage({
            key: "userInfo",
            data: t.detail.userInfo
        }), this.login()) : wx.switchTab({
            url: "../index/index"
        });
    },
    login: function() {
        var a = this;
        wx.getStorage({
            key: "openid",
            success: function(e) {
                a.setData({
                    openid: e.data
                }), wx.request({
                    url: t.page.url + "wx/login.php",
                    method: "post",
                    data: {
                        openid: a.data.openid,
                        username: a.data.userInfo.nickName
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        console.log(e.data.id);
                        var s = e.data.mobile;
                        wx.setStorage({
                            key: "userid",
                            data: e.data.id,
                            success: function() {
                                a.setData({
                                    style: "display:none"
                                }), wx.getStorage({
                                    key: "userid",
                                    success: function(e) {
                                        console.log(e), a.setData({
                                            userid: e.data
                                        }), wx.setStorage({
                                            key: "mobile",
                                            data: s
                                        }), "Y" == t.globalData.is_mobile ? a.check_mobile() : (a.setData({
                                            hidden_foot: !1
                                        }), a.getCart(), a.sum());
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    check_mobile: function() {
        var t = this;
        wx.getStorage({
            key: "mobile",
            success: function(a) {
                "" != a.data ? (t.setData({
                    hidden_foot: !1
                }), t.getCart(), t.sum()) : wx.showModal({
                    title: "提示",
                    content: "去绑定手机号",
                    success: function(t) {
                        t.confirm ? wx.navigateTo({
                            url: "../person/person"
                        }) : t.cancel && wx.switchTab({
                            url: "../index/index"
                        });
                    },
                    fail: function() {}
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "去绑定手机号",
                    success: function(t) {
                        t.confirm ? wx.navigateTo({
                            url: "../person/person"
                        }) : t.cancel && wx.switchTab({
                            url: "../index/index"
                        });
                    },
                    fail: function() {}
                });
            }
        });
    }
});