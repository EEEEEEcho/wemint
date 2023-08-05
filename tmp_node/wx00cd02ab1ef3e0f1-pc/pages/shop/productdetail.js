var t = getApp(), a = require("../../components/utils/imgutil.js"), e = require("ShopUtil.js");

Page({
    isloading: !1,
    url: !1,
    onShareAppMessage: function() {
        return t.shareAppMessage({
            url: this.url,
            title: this.data.productInfo.Name
        });
    },
    data: {
        backselectFlag: !1,
        currentTab: 0,
        bannerHeight: 150,
        hasPrice: !0,
        productImgs: [],
        count: 1,
        minusStatus: "disabled",
        flag: !1,
        flag2: !1,
        flag4: !1,
        flag3: !1,
        list: [],
        sortcol: "",
        sort: "",
        attrs: [],
        getPageFlag: !0,
        toFixed: !1,
        scrviewFlag: !1,
        buttonClicked: !1
    },
    onLoad: function(a) {
        var i = this;
        i.url = t.getPageUrl(i, a), t.registerGlobalFunctions(i), this.setData({
            queryparams: a,
            scrviewFlag: !1
        }), e.loadCouponList(!0, function(t) {
            i.setData({
                list: t.list
            });
        });
    },
    onShow: function() {
        var t = this;
        this.loadCartNum(), this.loadProduct(), t.data.flag4 ? this.setData({
            scrviewFlag: !0
        }) : this.setData({
            scrviewFlag: !1
        });
    },
    loadProduct: function() {
        var a = this;
        if (!a.isloading) {
            a.isloading = !0;
            var e = 0;
            a.data.queryparams.id && (e = a.data.queryparams.id), t.sendRequest({
                url: "/index.php?c=Front/WxApp/JsonApi&a=getProductInfo&id=" + e,
                method: "GET",
                success: function(e) {
                    if (a.isloading = !1, e.success) {
                        for (var i = e.info.BigImages.split(","), s = 0; s < i.length; s++) i[s] = t.globalData.siteBaseUrl + "/comdata/" + e.info.SiteID + "/product/" + i[s];
                        0 == parseFloat(e.info.Price) && (e.info.Price = "面议", a.setData({
                            hasPrice: !1
                        })), 0 == parseFloat(e.info.FreightMoney) && (e.info.FreightMoney = "包邮"), t.WxParse.wxParse("DetailInfo", "html", e.info.Content, a, 5);
                        a.data.attrs;
                        for (var n = e.info.Skus2, o = null, s = 0; s < n.length; s++) o += parseInt(n[s].ProductQuantity);
                        0 == n.length ? a.setData({
                            ProductQuantity: e.info.ProductQuantity
                        }) : a.setData({
                            ProductQuantity: o
                        });
                        var r = e.info.ProDesc;
                        r = r.replace(/[\r\n]/g, ""), e.info.ProDesc = r, a.setData({
                            productInfo: e.info,
                            productImgs: i,
                            PriceShow: e.info.Price,
                            attrs: e.info.Attrs,
                            proImg: i[0],
                            collection: 1 == e.info.collection
                        });
                        var c = {};
                        a.setData({
                            selectedAttrs: c
                        });
                    } else ;
                },
                fail: function(t) {
                    a.isloading = !1;
                }
            });
        }
    },
    loadCartNum: function() {
        var a = this;
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getCartProNum",
            method: "GET",
            success: function(t) {
                a.isloading = !1, t.success ? a.setData({
                    cartnum: t.num
                }) : console.log("loadCartNum fail：" + t.msg);
            },
            fail: function(t) {
                a.isloading = !1, console.log("loadCartNum fail");
            }
        });
    },
    getCoupon: function(t) {
        var a = this;
        a.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            a.setData({
                buttonClicked: !1
            });
        }, 500), e.getCoupon(t.currentTarget.dataset.couponid, function() {
            e.loadCouponList(!0, function(t) {
                a.setData({
                    list: t.list
                }), wx.showToast({
                    title: "领取成功",
                    icon: "success"
                });
            });
        });
    },
    onListScroll: function(t) {},
    findAttrValItemById: function(t) {
        for (var a = this.data.attrs, e = 0; e < a.length; e++) for (var i = 0; i < a[e].AttrVals.length; i++) if (t == a[e].AttrVals[i].AttrValID) return a[e].AttrVals[i];
        return null;
    },
    doAttrChange: function(a, e) {
        this.data.count;
        if (this.setData({
            count: 1,
            minusStatus: "disabled",
            canNoClick: ""
        }), this.data.noQuantityList) for (var i in this.data.noQuantityList) if (this.data.noQuantityList[i].AttrValID == e) return !1;
        var s = this.data.attrs, n = this.data.selectedAttrs;
        n[a] = e, n || (n = {});
        var o = [];
        for (var r in n) o.push(n[r]);
        if (o.length >= s.length - 1) {
            var c = t.cloneObj(o);
            c.length >= s.length && (c.sort(), c.pop());
            var u = this.getNoQuantityAttrList(this.data.productInfo.Skus2, c);
            for (var i in u) a != u[i].AttrKeyID && n[u[i].AttrKeyID] == u[i].AttrValID && (delete n[u[i].AttrKeyID], 
            o.pop());
            this.setData({
                noQuantityList: u
            });
        }
        var l = [];
        for (var r in n) {
            var g = this.findAttrValItemById(n[r]);
            if (g.AttrValBigImg) {
                var d = t.globalData.siteBaseUrl + g.AttrValBigImg;
                this.setData({
                    attrImg: d
                });
            }
            l.push(g.AttrValName);
        }
        this.setData({
            selectedAttrNames: l.join(" ; ")
        });
        var h = t.analyseProductSkusPrice(this.data.productInfo.Skus2, n);
        this.setData({
            selectedAttrs: n,
            SkuID: h.skuid
        }), o.length >= s.length && this.setData({
            PriceShow2: h.price,
            ProductQuantity: h.productQuantity
        });
    },
    onAttrChange: function(t) {
        var a = t.currentTarget.dataset.attrkeyid, e = t.currentTarget.dataset.attrvalid;
        this.doAttrChange(a, e);
    },
    getNoQuantityAttrList: function(t, a) {
        var e = [];
        for (var i in a) e.push(a[i]);
        var s = e.join(",");
        s = (s = s.replace(/(^,)|(,$)/g, "")).split(",").sort().join(",");
        for (var n = [], o = 0; o < t.length; o++) {
            var r = t[o].Path.replace(/(^,)|(,$)/g, "").split(",").sort().join(","), c = new RegExp("(," + s + ")$"), u = new RegExp("^(" + s + ",)");
            if ((c.test(r) || u.test(r)) && "0" == t[o].ProductQuantity) {
                var l = r.split(","), g = l[l.length - 1], d = this.findAttrValItemById(g);
                n.push(d);
            }
        }
        return n;
    },
    onBannerImgLoad: function(t) {
        var e = this, i = a.imageUtil(t);
        0 == t.currentTarget.dataset.index && e.setData({
            bannerHeight: i.imageHeight
        });
    },
    getRect: function() {
        var t = this;
        wx.createSelectorQuery().select(".particulars-text").boundingClientRect(function(a) {
            t.setData({
                particularsHeight: a.height
            });
        }).exec();
    },
    addToCart: function() {
        var t = this;
        if (this.data.getPageFlag) {
            this.setData({
                getPageFlag: !1
            });
            var a = t.data.cartnum;
            e.addProcuctToCart(this.data.productInfo.ProductID, this.data.SkuID, this.data.count, 0, function(e) {
                e && (t.isbuying = !1, setTimeout(function() {
                    wx.showToast({
                        title: "加入成功",
                        image: "../../images/shopcart.png"
                    }), t.setData({
                        flag2: !1,
                        flag: !1,
                        scrviewFlag: !1
                    });
                }, 500), setTimeout(function() {
                    t.setData({
                        getPageFlag: !0
                    });
                }, 600), a += t.data.count, t.setData({
                    cartnum: a
                }));
            }, function() {
                t.setData({
                    getPageFlag: !0
                });
            });
        }
    },
    navbarTap: function(t) {
        this.setData({
            currentTab: t.currentTarget.dataset.idx
        });
    },
    buyNow: function() {
        var t = this;
        this.data.getPageFlag && (this.setData({
            getPageFlag: !1
        }), setTimeout(function() {
            t.setData({
                scrviewFlag: !1
            });
        }, 500), e.addProcuctToCart(this.data.productInfo.ProductID, this.data.SkuID, this.data.count, 1, function(a) {
            t.setData({
                flag2: !1,
                flag: !1,
                flag3: !1
            }), wx.navigateTo({
                url: "square?pkeys=" + a.pkey,
                success: function() {
                    setTimeout(function() {
                        t.setData({
                            getPageFlag: !0
                        });
                    }, 100);
                }
            });
        }, function() {
            t.setData({
                getPageFlag: !0
            });
        }));
    },
    decrease: function() {
        var t = this.data.count;
        t > 1 && (t--, this.setData({
            canNoClick: ""
        }));
        var a = t <= 1 ? "disabled" : "normal";
        this.setData({
            count: t,
            minusStatus: a
        });
    },
    increase: function() {
        this.data.selectedAttrs;
        var a = e <= 1 ? "disabled" : "normal", e = this.data.count;
        this.data.attrs.length > 0 ? this.data.SkuID ? e < this.data.ProductQuantity ? (++e == this.data.ProductQuantity && this.setData({
            canNoClick: "disabled"
        }), this.setData({
            count: e,
            minusStatus: a
        })) : (this.setData({
            count: e,
            canNoClick: "disabled"
        }), t.showModal({
            title: "提示",
            content: "超出商品库存量！",
            showCancel: !1
        })) : wx.showModal({
            title: "提示",
            content: "请选择规格",
            showCancel: !1
        }) : e < this.data.ProductQuantity ? (++e == this.data.ProductQuantity && this.setData({
            canNoClick: "disabled"
        }), this.setData({
            count: e,
            minusStatus: a
        })) : this.setData({
            count: e,
            canNoClick: "disabled"
        });
    },
    bindManual: function(t) {
        var a = t.detail.value;
        this.setData({
            count: a
        });
    },
    choose: function() {
        this.setData({
            flag: !0,
            scrviewFlag: !0
        });
    },
    close: function() {
        this.setData({
            flag: !1,
            flag2: !1,
            flag3: !1,
            flag4: !1,
            scrviewFlag: !1
        });
    },
    discount: function() {
        this.setData({
            flag4: !0,
            scrviewFlag: !0
        });
    },
    addToshopCart: function() {
        this.setData({
            flag: !0,
            flag2: !0,
            scrviewFlag: !0
        });
    },
    shopCart: function() {
        wx.navigateTo({
            url: "shopcart?one=1"
        });
    },
    AddCollection: function(t) {
        var a = this;
        if (this.data.getPageFlag) {
            this.setData({
                getPageFlag: !1
            });
            var i = t.currentTarget.dataset.proid;
            e.AddCollection(i, function(t) {
                a.setData({
                    getPageFlag: !0
                });
            });
        }
    },
    CanleCollection: function(t) {
        var a = this;
        if (this.data.getPageFlag) {
            this.setData({
                getPageFlag: !1
            });
            var i = t.currentTarget.dataset.proid;
            e.CancelCollection(i, function(t) {
                a.setData({
                    getPageFlag: !0
                });
            });
        }
    },
    buyNow2: function() {
        this.setData({
            flag: !0,
            flag3: !0,
            scrviewFlag: !0
        });
    }
});