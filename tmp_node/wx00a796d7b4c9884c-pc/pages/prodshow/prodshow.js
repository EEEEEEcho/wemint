var t = getApp();

require("../../wxParse/wxParse.js");

Page({
    firstIndex: -1,
    data: {
        width: wx.getSystemInfoSync().windowWidth,
        height: 16 * wx.getSystemInfoSync().windowWidth / 16,
        bannerApp: !0,
        winWidth: 0,
        winHeight: 0,
        currentTab: 0,
        productId: 0,
        itemData: {},
        bannerItem: [],
        buynum: 1,
        goodsprice: 0,
        housenum: 0,
        priceId: 0,
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        firstIndex: -1,
        commodityAttr: [],
        attrValueList: [],
        btntype: "",
        showModalStatus: !1,
        id: "",
        cid: "",
        param: "",
        goods: [],
        url: t.page.url,
        isSelect: [ "font1", "font2" ],
        selectedId: [],
        selectedStandard: [],
        mergeId: [],
        userid: "",
        style: "display:none",
        openid: "",
        hidden1: !1,
        hidden2: !0
    },
    setModalStatus: function(a) {
        var e = this;
        wx.getStorage({
            key: "userid",
            success: function(s) {
                if (console.log(s), e.setData({
                    userid: s.data,
                    style: "display:none"
                }), "Y" == t.globalData.is_mobile) e.check_mobile("", a); else {
                    var o = wx.createAnimation({
                        duration: 200,
                        timingFunction: "linear",
                        delay: 0
                    });
                    e.animation = o, o.translateY(300).step(), e.setData({
                        animationData: o.export(),
                        btntype: a.currentTarget.dataset.type
                    }), 1 == a.currentTarget.dataset.status && e.setData({
                        showModalStatus: !0
                    }), setTimeout(function() {
                        o.translateY(0).step(), e.setData({
                            animationData: o
                        }), 0 == a.currentTarget.dataset.status && e.setData({
                            showModalStatus: !1
                        });
                    }.bind(e), 200);
                }
            },
            fail: function(t) {
                wx.switchTab({
                    url: "../my/my"
                }), e.setData({
                    style: "",
                    showModalStatus: !1
                });
            }
        });
    },
    gocart: function() {
        wx.switchTab({
            url: "../buy/buy"
        });
    },
    handleStandardClick: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.standardIndex, s = t.currentTarget.dataset.index, o = this.data.goods.norm;
        console.log(o), console.log(this.data.goods.norm.length), console.log(e), console.log(o[e].selected), 
        console.log(o[e].selected.length);
        var i = o[e].selected.length, n = this.data.selectedId;
        n[e] = a;
        var r = this.data.selectedStandard;
        console.log(s);
        for (var d = 0; d < i; d++) s == d ? (console.log(o[e].selected[s]), o[e].selected[s].isClick = 1, 
        r[e] = o[e].selected[s].attrname) : o[e].selected[d].isClick = 0;
        var l = n.join(",");
        console.log(l);
        var u = this.data.goods;
        u.norm = o, this.setData({
            goods: u,
            mergeId: l,
            selectedStandard: r
        }), console.log(o.length), console.log(n.length), n.length == o.length && this.selectprice(), 
        console.log(r), console.log(o), console.log(this.data.goods.norm);
    },
    selectprice: function() {
        var a = this;
        console.log(a.data.selectedId), wx.request({
            url: t.page.url + "/wx/item_show.php?act=selectprice",
            data: {
                id: a.data.goods.id,
                norm: a.data.mergeId
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t.data), console.log(t.data.price), console.log(t.data.housenum);
                var e = a.data.goods;
                e.salesprice = t.data.price, e.tot_housenum = t.data.housenum, a.setData({
                    goods: e
                });
            }
        });
    },
    changeNum: function(t) {
        0 == t.target.dataset.alphaBeta ? this.data.buynum <= 1 || this.setData({
            buynum: this.data.buynum - 1
        }) : this.data.buynum >= this.data.goods.tot_housenum ? this.setData({
            buynum: this.data.goods.tot_housenum
        }) : this.setData({
            buynum: this.data.buynum + 1
        });
    },
    onLoad: function(t) {
        console.log(t);
        this.setData({
            cid: t.cid,
            id: t.id,
            style: "display:none"
        });
    },
    loadProductDetail: function() {
        var a = this;
        console.log(a.data.userid), console.log(a.data.id), console.log(a.data.cid), wx.request({
            url: t.page.url + "/wx/item_show.php",
            method: "post",
            data: {
                userid: a.data.userid,
                id: a.data.id,
                cid: a.data.cid
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t), t.data.goods.norm && a.setData({
                    attrValueList: t.data.goods.norm
                }), a.setData({
                    goods: t.data.goods
                });
            },
            error: function(t) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            },
            complete: function() {}
        });
    },
    onShow: function() {
        var a = this;
        if (wx.setNavigationBarTitle({
            title: t.globalData.title
        }), wx.getStorage({
            key: "userid",
            success: function(t) {
                console.log(t), a.setData({
                    userid: t.data,
                    style: "display:none"
                }), a.loadProductDetail();
            }
        }), a.loadProductDetail(), a.setData({
            includeGroup: a.data.commodityAttr
        }), a.distachAttrValue(a.data.commodityAttr), 1 == a.data.commodityAttr.length) {
            for (var e = 0; e < a.data.commodityAttr[0].attrValueList.length; e++) a.data.attrValueList[e].selectedValue = a.data.commodityAttr[0].attrValueList[e].attrValue;
            a.setData({
                attrValueList: a.data.attrValueList
            });
        }
    },
    distachAttrValue: function(t) {
        for (var a = this.data.attrValueList, e = 0; e < t.length; e++) for (var s = 0; s < t[e].attrValueList.length; s++) {
            var o = this.getAttrIndex(t[e].attrValueList[s].attrKey, a);
            o >= 0 ? this.isValueExist(t[e].attrValueList[s].attrValue, a[o].attrValues) || a[o].attrValues.push(t[e].attrValueList[s].attrValue) : a.push({
                attrKey: t[e].attrValueList[s].attrKey,
                attrValues: [ t[e].attrValueList[s].attrValue ]
            });
        }
        for (e = 0; e < a.length; e++) for (s = 0; s < a[e].attrValues.length; s++) a[e].attrValueStatus ? a[e].attrValueStatus[s] = !0 : (a[e].attrValueStatus = [], 
        a[e].attrValueStatus[s] = !0);
        this.setData({
            attrValueList: a
        });
    },
    getAttrIndex: function(t, a) {
        for (var e = 0; e < a.length && t != a[e].attrKey; e++) ;
        return e < a.length ? e : -1;
    },
    isValueExist: function(t, a) {
        for (var e = 0; e < a.length && a[e] != t; e++) ;
        return e < a.length;
    },
    selectAttrValue: function(t) {
        var a = this.data.attrValueList, e = t.currentTarget.dataset.index, s = t.currentTarget.dataset.key, o = t.currentTarget.dataset.value;
        (t.currentTarget.dataset.status || e == this.data.firstIndex) && (t.currentTarget.dataset.selectedvalue == t.currentTarget.dataset.value ? this.disSelectValue(a, e, s, o) : this.selectValue(a, e, s, o));
    },
    selectValue: function(t, a, e, s, o) {
        var i = [];
        if (a != this.data.firstIndex || o) n = this.data.includeGroup; else for (var n = this.data.commodityAttr, r = 0; r < t.length; r++) for (var d = 0; d < t[r].attrValues.length; d++) t[r].selectedValue = "";
        for (r = 0; r < n.length; r++) for (d = 0; d < n[r].attrValueList.length; d++) n[r].attrValueList[d].attrKey == e && n[r].attrValueList[d].attrValue == s && i.push(n[r]);
        t[a].selectedValue = s;
        for (r = 0; r < t.length; r++) for (d = 0; d < t[r].attrValues.length; d++) t[r].attrValueStatus[d] = !1;
        for (var l = 0; l < t.length; l++) for (r = 0; r < i.length; r++) for (d = 0; d < i[r].attrValueList.length; d++) if (t[l].attrKey == i[r].attrValueList[d].attrKey) for (var u = 0; u < t[l].attrValues.length; u++) t[l].attrValues[u] == i[r].attrValueList[d].attrValue && (t[l].attrValueStatus[u] = !0);
        this.setData({
            attrValueList: t,
            includeGroup: i
        });
        var c = 0;
        for (r = 0; r < t.length; r++) for (d = 0; d < t[r].attrValues.length; d++) if (t[r].selectedValue) {
            c++;
            break;
        }
        c < 2 ? this.setData({
            firstIndex: a
        }) : this.setData({
            firstIndex: -1
        });
        for (s = [], r = 0; r < this.data.attrValueList.length && this.data.attrValueList[r].selectedValue; r++) s.push("{attrKey:" + this.data.attrValueList[r].attrKey + ",attrValue:" + this.data.attrValueList[r].selectedValue + "}");
        var h = JSON.stringify(s);
        h = h.replace(/\"/g, "");
        for (r = 0; r < n.length; r++) {
            var g = JSON.stringify(n[r].attrValueList);
            if ((g = g.replace(/\"/g, "")) == h) {
                this.setData({
                    goodsprice: n[r].price,
                    housenum: n[r].stock,
                    priceId: n[r].priceId
                });
                break;
            }
        }
    },
    disSelectValue: function(t, a, e, s) {
        var o = this.data.commodityAttr;
        t[a].selectedValue = "";
        for (var i = 0; i < t.length; i++) for (var n = 0; n < t[i].attrValues.length; n++) t[i].attrValueStatus[n] = !0;
        this.setData({
            includeGroup: o,
            attrValueList: t
        });
        for (i = 0; i < t.length; i++) t[i].selectedValue && this.selectValue(t, i, t[i].attrKey, t[i].selectedValue, !0);
    },
    initProductData: function(a) {
        a.LunBoProductImageUrl = [];
        var e = a.LunBoProductImage.split(";"), s = !0, o = !1, i = void 0;
        try {
            for (var n, r = e[Symbol.iterator](); !(s = (n = r.next()).done); s = !0) {
                var d = n.value;
                d && a.LunBoProductImageUrl.push(t.d.hostImg + d);
            }
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            o = !0, i = t;
        } finally {
            try {
                s || null == r.return || r.return();
            } finally {
                if (o) throw i;
            }
        }
        a.Price = a.Price / 100, a.VedioImagePath = t.d.hostVideo + "/" + a.VedioImagePath, 
        a.videoPath = t.d.hostVideo + "/" + a.videoPath;
    },
    addFavorites: function(a) {
        var e = this;
        console.log(e.data.goods.id), wx.getStorage({
            key: "userid",
            success: function(s) {
                console.log(s), e.setData({
                    userid: s.data,
                    style: "display:none"
                }), "Y" == t.globalData.is_mobile ? e.check_mobile("favorites", a) : e.favorites();
            },
            fail: function(t) {
                wx.switchTab({
                    url: "../my/my"
                }), e.setData({
                    style: "",
                    showModalStatus: !1
                });
            }
        });
    },
    favorites: function() {
        var a = this, e = a.data.goods.collection;
        wx.request({
            url: t.page.url + "/wx/member.php?act=add_collect",
            method: "post",
            data: {
                userid: a.data.userid,
                gid: a.data.goods.id,
                collection: a.data.goods.collection
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t);
                var s = t.data;
                0 == s.code ? (0 == e ? wx.showToast({
                    title: "收藏成功",
                    icon: "seccess",
                    duration: 1e3
                }) : wx.showToast({
                    title: "取消收藏成功",
                    icon: "seccess",
                    duration: 1e3
                }), a.loadProductDetail()) : wx.showToast({
                    title: s.msg,
                    icon: "loading",
                    duration: 1e3
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
    addShopCart: function(a) {
        var e = a.currentTarget.dataset.type, s = "", o = this;
        wx.getStorage({
            key: "userid",
            success: function(a) {
                console.log(a), o.setData({
                    userid: a.data,
                    style: "display:none"
                }), s = "buynow" == e ? "NowBuy" : "add", o.data.selectedId.length < o.data.attrValueList.length ? wx.showToast({
                    title: "请完善属性",
                    icon: "loading",
                    duration: 1e3
                }) : (console.log(o.data.buynum), console.log(o.data.goods.salesprice), wx.request({
                    url: t.page.url + "/wx/shopcart.php?act=" + s,
                    method: "post",
                    data: {
                        userid: o.data.userid,
                        id: o.data.goods.id,
                        goods_num: o.data.buynum,
                        goods_norm: o.data.mergeId,
                        goods_price: o.data.goods.salesprice,
                        housenum: o.data.goods.tot_housenum
                    },
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        var a = t.data;
                        if (console.log(a), 1 == a.act) {
                            if ("buynow" == e) return void wx.redirectTo({
                                url: "../order1/order1?cartId=" + a.cart_id + ","
                            });
                            wx.showToast({
                                title: "加入购物车成功",
                                icon: "success",
                                duration: 2e3
                            }), o.setData({
                                showModalStatus: !1
                            });
                        } else wx.showToast({
                            title: "失败",
                            duration: 2e3
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "网络异常！",
                            duration: 2e3
                        });
                    }
                }));
            },
            fail: function(t) {
                o.setData({
                    style: "",
                    showModalStatus: !1
                });
            }
        });
    },
    bindChange: function(t) {
        this.setData({
            currentTab: t.detail.current
        });
    },
    initNavHeight: function() {
        var t = this;
        console.log(), wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    winWidth: a.windowWidth,
                    winHeight: a.windowHeight
                });
            }
        });
    },
    bannerClosed: function() {
        this.setData({
            bannerApp: !1
        });
    },
    swichNav: function(t) {
        if (console.log(t.target.dataset.current), 1 == t.target.dataset.current ? this.setData({
            hidden2: !1,
            hidden1: !0
        }) : this.setData({
            hidden2: !0,
            hidden1: !1
        }), this.data.currentTab === t.target.dataset.current) return !1;
        this.setData({
            currentTab: t.target.dataset.current
        });
    },
    bindGetUserInfo: function(t) {
        t.detail.userInfo ? (this.setData({
            userInfo: t.detail.userInfo
        }), wx.setStorage({
            key: "userInfo",
            data: t.detail.userInfo
        }), this.login()) : (console.log(1), wx.switchTab({
            url: "../index/index"
        }));
    },
    login: function() {
        var a = this;
        wx.getStorage({
            key: "openid",
            success: function(s) {
                a.setData({
                    openid: s.data
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
                    success: function(s) {
                        console.log(s.data.id);
                        var o = s.data.mobile;
                        wx.setStorage({
                            key: "userid",
                            data: s.data.id,
                            success: function() {
                                a.setData({
                                    style: "display:none"
                                }), wx.getStorage({
                                    key: "userid",
                                    success: function(s) {
                                        console.log(s), a.setData({
                                            userid: s.data
                                        }), wx.setStorage({
                                            key: "mobile",
                                            data: o
                                        }), "Y" == t.globalData.is_mobile && a.check_mobile("", e);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    check_mobile: function(t, a) {
        var e = this;
        wx.getStorage({
            key: "mobile",
            success: function(s) {
                if ("" != s.data) if ("favorites" == t) e.favorites(); else {
                    var o = wx.createAnimation({
                        duration: 200,
                        timingFunction: "linear",
                        delay: 0
                    });
                    e.animation = o, o.translateY(300).step(), e.setData({
                        animationData: o.export(),
                        btntype: a.currentTarget.dataset.type
                    }), 1 == a.currentTarget.dataset.status && e.setData({
                        showModalStatus: !0
                    }), setTimeout(function() {
                        o.translateY(0).step(), e.setData({
                            animationData: o
                        }), 0 == a.currentTarget.dataset.status && e.setData({
                            showModalStatus: !1
                        });
                    }.bind(e), 200);
                } else wx.showModal({
                    title: "提示",
                    content: "请去保存手机号",
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
                    content: "请去保存手机号",
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