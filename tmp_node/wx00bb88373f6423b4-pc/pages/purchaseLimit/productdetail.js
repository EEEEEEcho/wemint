var t = getApp(), a = (require("../../components/utils/imgutil.js"), require("../../components/utils/util.js"), 
require("../shop/ShopUtil.js")), e = require("../../common.js");

Page({
    url: !1,
    onShareAppMessage: function() {
        return t.shareAppMessage({
            url: this.url,
            title: this.data.pinTuanProDetail.name
        });
    },
    data: {
        currentTab: 0,
        baseUrl: t.globalData.siteBaseUrl,
        bannerHeight: 300,
        buttonClicked: !1,
        interval: null,
        intervalTime: {
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        showSku: !1,
        attrkeys: [],
        skuMsg: [],
        sku_id: 0,
        productImgs: [],
        skuInventory: 0,
        ms_stock: 0,
        buyCountLimit: 0,
        price: 0,
        ms_price: 0,
        selectedSkuArr: [],
        selectValArr: [],
        selectSkuDes: [],
        buyCount: 1,
        newSelectedSkuArr: [],
        isSelectAllAttr: !1,
        AttrValSmallImg: "",
        canClickAdd: !0,
        canClickDes: !1,
        showMask: !1,
        hasSkuInventoryArr: [],
        noSkuInventoryArr: [],
        hasInventoryPathArr: [],
        cannotSelect: [],
        getPageFlag: !0,
        SecKillProMsg: {},
        notSkuArr: [],
        notCanSelectArr: []
    },
    onLoad: function(a) {
        var s = this;
        s.url = t.getPageUrl(s, a), e.initCommonModules(), this.setData({
            queryparams: a
        }), this.loadProDetailMsg(), this.loadProductInfo();
    },
    onPageScroll: function() {},
    isLogin: function() {
        setTimeout(function() {
            t.globalData.WebUserID || a.showRegUI();
        }, 2e3);
    },
    loadProductInfo: function() {
        var a = this, e = 0;
        a.data.queryparams.proid && (e = a.data.queryparams.proid), t.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getProductInfo&id=" + e + "&updateHits=1",
            method: "GET",
            success: function(t) {
                t.success ? a.setData({
                    collection: 1 == t.info.collection
                }) : console.log("getProductInfo fail：" + t.msg);
            },
            fail: function(t) {
                console.log("getProductInfo fail");
            }
        });
    },
    loadProDetailMsg: function() {
        var a = this;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/SecKill&a=getProductInfo&ms_id=" + a.data.queryparams.ms_id + "&ms_product_id=" + a.data.queryparams.ms_proid,
            method: "GET",
            success: function(e) {
                if (200 == !e.code) console.log("getSecKillDetail fail：" + e.msg); else {
                    for (var s = e.data.img_src, r = 0; r < s.length; r++) s[r] = t.globalData.siteBaseUrl + s[r];
                    var i = e.data.ms_config.remaining_time;
                    a.data.interval = setInterval(function() {
                        --i <= 0 && (i = 0, clearInterval(a.data.interval)), a.forMatterTime(i);
                    }, 1e3), t.WxParse.wxParse("DetailInfo", "html", e.data.content, a, 5), a.setData({
                        SecKillProMsg: e.data,
                        productImgs: s,
                        AttrValSmallImg: e.data.images,
                        buyCountLimit: e.data.buy_limit_num,
                        ms_price: e.data.ms_price,
                        ms_stock: e.data.ms_stock
                    });
                }
            },
            fail: function(t) {
                console.log("getSecKillProDetail fail");
            }
        }), t.sendRequest({
            url: "/index.php?c=front/WxApp/SecKill&a=getProductSku&productId=" + a.data.queryparams.proid + "&ms_id=" + a.data.queryparams.ms_id,
            method: "GET",
            success: function(t) {
                if (200 == !t.code) console.log("getProductSku fail：" + t.msg); else if (0 == t.data.attrkeys.length) a.setData({
                    showSku: !1
                }); else {
                    a.setData({
                        showSku: !0
                    });
                    for (n = 0; n < t.data.attrkeys.length; n++) {
                        t.data.attrkeys[n].selectArr = [];
                        for (k = 0; k < t.data.attrkeys[n].attrVals.length; k++) t.data.attrkeys[n].attrVals[k].isSelect = !1, 
                        t.data.attrkeys[n].attrVals[k].canSelect = !0;
                    }
                    for (var e = [], s = [], r = [], i = [], n = 0; n < t.data.skus.length; n++) {
                        var l = t.data.skus[n];
                        0 != l.ProductQuantity ? e.push(l) : s.push(l);
                    }
                    for (n = 0; n < t.data.attrkeys.length; n++) r.push(t.data.attrkeys[n].attrVals);
                    for (k = 0; k < r.length; k++) {
                        for (var o = [], d = 0; d < r[k].length; d++) o.push(r[k][d].ValID);
                        i.push(o);
                    }
                    for (var h = [], u = [], n = 0; n < a.doExchange(i).length; n++) h.push(a.doExchange(i)[n].toString());
                    for (n = 0; n < a.data.skuMsg.length; n++) {
                        g = a.data.skuMsg[n].Path.toString();
                        a.contains(h, g) || (g = g.split(","), u.push(g));
                    }
                    for (var c = [], k = 0; k < t.data.skus.length; k++) c.push(t.data.skus[k].Path.toString());
                    for (n = 0; n < h.length; n++) {
                        var g = h[n].toString();
                        a.contains(c, g) || (g = g.split(","), u.push(g));
                    }
                    for (n = 0; n < u.length; n++) t.data.skus.push({
                        Path: u[n],
                        ProductQuantity: 0
                    }), s.push({
                        Path: u[n],
                        ProductQuantity: 0
                    });
                    for (k = 0; k < e.length; k++) for (d = 0; d < e[k].Path.length; d++) -1 == a.data.hasInventoryPathArr.indexOf(e[k].Path[d]) && a.data.hasInventoryPathArr.push(e[k].Path[d]);
                    for (n = 0; n < t.data.attrkeys.length; n++) for (k = 0; k < t.data.attrkeys[n].attrVals.length; k++) -1 == a.data.hasInventoryPathArr.indexOf(t.data.attrkeys[n].attrVals[k].ValID) && (t.data.attrkeys[n].attrVals[k].canSelect = !1, 
                    a.data.notCanSelectArr.push(t.data.attrkeys[n].attrVals[k].ValID));
                    a.setData({
                        attrkeys: t.data.attrkeys,
                        skuMsg: t.data.skus,
                        AttrValSmallImg: a.data.AttrValSmallImg,
                        hasSkuInventoryArr: e,
                        noSkuInventoryArr: s,
                        hasInventoryPathArr: a.data.hasInventoryPathArr,
                        sku_status: t.data.sku_status
                    });
                }
            },
            fail: function(t) {
                console.log("getpinTuanProSku fail");
            }
        });
    },
    contains: function(t, a) {
        for (var e = t.length; e--; ) if (t[e] === a) return !0;
        return !1;
    },
    doExchange: function(t) {
        var a = t.length;
        if (a >= 2) {
            for (var e = t[0].length, s = t[1].length, r = e * s, i = new Array(r), n = 0, l = 0; l < e; l++) for (var o = 0; o < s; o++) t[0][l] instanceof Array ? i[n] = t[0][l].concat(t[1][o]) : i[n] = [ t[0][l] ].concat(t[1][o]), 
            n++;
            for (var d = new Array(a - 1), l = 2; l < t.length; l++) d[l - 1] = t[l];
            return d[0] = i, this.doExchange(d);
        }
        return t[0];
    },
    navbarTap: function(t) {
        this.setData({
            currentTab: t.currentTarget.dataset.idx
        });
    },
    setTimeData: function(t) {},
    hasAttrkeyId: function(t) {
        if (0 == this.data.selectedSkuArr.length) return !1;
        for (var a = 0; a < this.data.selectedSkuArr.length; a++) if (this.data.selectedSkuArr[a].attrkeyid == t) return !0;
        return !1;
    },
    isContainAttr: function(t) {
        if (0 == this.data.selectValArr.length) return !1;
        for (var a = 0; a < this.data.selectValArr.length; a++) if (this.data.selectValArr[a] == t) return !0;
        return !1;
    },
    selectSku: function(t) {
        var a = t.currentTarget.dataset.attrvalid, e = t.currentTarget.dataset.attrkeyid, s = t.currentTarget.dataset.attrvalname, r = t.currentTarget.dataset.hasimage, i = 0, n = 0;
        if (0 != t.currentTarget.dataset.canselect) {
            if (1 == r) for (c = 0; c < this.data.attrkeys.length; c++) if (1 == this.data.attrkeys[c].hasImg && this.data.attrkeys[c].KeyID == e) for (o = 0; o < this.data.attrkeys[c].attrVals.length; o++) this.data.attrkeys[c].attrVals[o].ValID == a && this.setData({
                AttrValSmallImg: this.data.attrkeys[c].attrVals[o].AttrValSmallImg
            });
            if (this.hasAttrkeyId(e)) for (c = 0; c < this.data.selectedSkuArr.length; c++) this.data.selectedSkuArr[c].attrkeyid == e && (this.data.selectedSkuArr[c].attrvalid = a, 
            this.data.selectedSkuArr[c].attrvalname = s, this.data.selectedSkuArr[c].hasImage = r); else this.data.selectedSkuArr.push({
                attrkeyid: e,
                attrvalid: a,
                attrvalname: s,
                hasImage: r
            });
            for (var l = [], o = 0; o < this.data.selectedSkuArr.length; o++) l.push(this.data.selectedSkuArr[o].attrvalid);
            if (this.data.selectValArr = l.sort(function(t, a) {
                return t - a;
            }), 1 == this.data.attrkeys.length) for (o = 0; o < this.data.attrkeys[0].attrVals.length; o++) ; else for (c = 0; c < this.data.attrkeys.length; c++) for (o = 0; o < this.data.attrkeys[c].attrVals.length; o++) this.contains(this.data.notCanSelectArr, this.data.attrkeys[c].attrVals[o].ValID) || (this.data.attrkeys[c].attrVals[o].canSelect = !0);
            if (this.data.selectValArr.length == this.data.attrkeys.length - 1 && this.selectHalf(l), 
            this.data.attrkeys.length == this.data.selectValArr.length) for (c = 0; c < this.data.skuMsg.length; c++) if (this.data.skuMsg[c].Path.toString() == this.data.selectValArr.toString()) if (0 == this.data.skuMsg[c].ProductQuantity) {
                for (var d = t.currentTarget.dataset.attrvalid, h = [], u = [], c = 0; c < this.data.selectValArr.length; c++) this.data.selectValArr[c] == d && (h.push(this.data.selectValArr[c]), 
                this.data.selectValArr = h);
                for (c = 0; c < this.data.selectedSkuArr.length; c++) this.data.selectedSkuArr[c].attrvalid == d && (u.push(this.data.selectedSkuArr[c]), 
                this.data.selectedSkuArr = u);
                this.selectHalf(this.data.selectValArr), this.setData({
                    isSelectAllAttr: !1
                });
            } else {
                n = this.data.skuMsg[c].BuyLimitNum, parseInt(this.data.skuMsg[c].ProductQuantity) > parseInt(this.data.ms_stock) ? this.data.ms_stock : this.data.skuMsg[c].ProductQuantity;
                var k, g;
                2 == this.data.sku_status ? (k = this.data.skuMsg[c].SkuID, g = this.data.buyCountLimit) : 1 == this.data.sku_status && (k = this.data.skuMsg[c].SeckillSkuID, 
                g = this.data.skuMsg[c].BuyLimitNum), this.setData({
                    isSelectAllAttr: !0,
                    skuid: k,
                    ms_price: this.data.skuMsg[c].SeckillPrice,
                    skuInventory: parseInt(this.data.skuMsg[c].ProductQuantity) > parseInt(this.data.ms_stock) ? this.data.ms_stock : this.data.skuMsg[c].ProductQuantity,
                    buyCountLimit: g
                });
            }
            for (c = 0; c < this.data.attrkeys.length; c++) for (o = 0; o < this.data.attrkeys[c].attrVals.length; o++) this.isContainAttr(this.data.attrkeys[c].attrVals[o].ValID) ? this.data.attrkeys[c].attrVals[o].isSelect = !0 : this.data.attrkeys[c].attrVals[o].isSelect = !1;
            this.data.newSelectedSkuArr = [];
            for (c = 0; c < this.data.selectValArr.length; c++) for (o = 0; o < this.data.selectedSkuArr.length; o++) this.data.selectedSkuArr[o].attrvalid == this.data.selectValArr[c] && this.data.newSelectedSkuArr.push(this.data.selectedSkuArr[o]);
            for (var f = "", c = 0; c < this.data.newSelectedSkuArr.length; c++) c != this.data.newSelectedSkuArr.length - 1 ? f = f + this.data.newSelectedSkuArr[c].attrvalname + "," : f += this.data.newSelectedSkuArr[c].attrvalname;
            this.data.selectSkuDes = f, this.setData({
                selectValArr: this.data.selectValArr,
                selectSkuDes: this.data.selectSkuDes,
                attrkeys: this.data.attrkeys
            }), i = n < 0 ? n : 0, this.data.buyCount < i ? this.setData({
                canClickAdd: !0
            }) : this.data.buyCount > i && (0 == i ? this.setData({
                buyCount: 1
            }) : this.setData({
                buyCount: i
            }));
        }
    },
    arrCheck: function(t) {
        for (var a = {}, e = 0; e < t.length; e++) {
            for (var s = t[e], r = 0, i = 0; i < t.length; i++) t[i] == s && (r++, t[i] = -1);
            -1 != s && (a[s] = r);
        }
        return a;
    },
    isContained: function(t, a) {
        if (!(t instanceof Array && a instanceof Array)) return !1;
        if (t.length < a.length) return !1;
        for (var e = t.toString(), s = 0, r = a.length; s < r; s++) if (-1 == e.indexOf(a[s])) return !1;
        return !0;
    },
    minThreeNum: function() {
        return this.data.buyCountLimit < this.data.ms_stock ? this.data.buyCountLimit < this.data.skuInventory ? this.data.buyCountLimit : this.data.skuInventory : this.data.ms_stock < this.data.skuInventory ? this.data.ms_stock : this.data.skuInventory;
    },
    decrease: function() {
        var t = this.data.buyCount;
        0 == this.data.showSku ? (t > 1 && 1 == --t && this.setData({
            canClickDes: !1
        }), this.setData({
            buyCount: t,
            canClickAdd: !0
        })) : this.data.isSelectAllAttr ? (t > 1 && 1 == --t && this.setData({
            canClickDes: !1
        }), this.setData({
            buyCount: t,
            canClickAdd: !0
        })) : wx.showModal({
            title: "提示",
            content: "请选择规格",
            showCancel: !1
        });
    },
    selectHalf: function(t) {
        for (var a = [], e = [], s = 0; s < this.data.noSkuInventoryArr.length; s++) 1 == this.isContained(this.data.noSkuInventoryArr[s].Path, t) && a.push(this.data.noSkuInventoryArr[s].Path);
        for (i = 0; i < a.length; i++) for (var r = 0; r < a[i].length; r++) -1 == this.data.selectValArr.indexOf(a[i][r]) && e.push(a[i][r]);
        for (s = 0; s < this.data.attrkeys.length; s++) for (var i = 0; i < this.data.attrkeys[s].attrVals.length; i++) -1 !== e.indexOf(this.data.attrkeys[s].attrVals[i].ValID) && (this.data.attrkeys[s].attrVals[i].canSelect = !1);
    },
    increase: function() {
        var t = this.data.buyCount;
        if (t++, 0 == this.data.showSku) {
            if (t > this.data.buyCountLimit && this.data.buyCountLimit > 0) return wx.showModal({
                title: "提示",
                content: "超出限购数量",
                showCancel: !1
            }), void this.setData({
                canClickAdd: !1
            });
            if (t > this.data.ms_stock) return wx.showModal({
                title: "提示",
                content: "超出活动库存",
                showCancel: !1
            }), void this.setData({
                canClickAdd: !1
            });
            this.setData({
                buyCount: t
            }), this.data.buyCount > 1 && this.setData({
                canClickDes: !0
            });
        } else if (this.data.attrkeys.length == this.data.selectValArr.length) {
            if (t > this.data.buyCountLimit || t > this.data.skuInventory || t > this.data.ms_stock) {
                if (t > this.data.buyCountLimit && this.data.buyCountLimit > 0) return wx.showModal({
                    title: "提示",
                    content: "超出限购数量",
                    showCancel: !1
                }), void this.setData({
                    canClickAdd: !1
                });
                if (t > this.data.skuInventory) return wx.showModal({
                    title: "提示",
                    content: "此规格超出库存",
                    showCancel: !1
                }), void this.setData({
                    canClickAdd: !1
                });
                if (t > this.data.ms_stock) return wx.showModal({
                    title: "提示",
                    content: "超出活动库存",
                    showCancel: !1
                }), void this.setData({
                    canClickAdd: !1
                });
            }
            this.setData({
                buyCount: t
            }), this.data.buyCount > 1 && this.setData({
                canClickDes: !0
            });
        } else wx.showModal({
            title: "提示",
            content: "请选择全部规格",
            showCancel: !1
        });
    },
    bindManual: function(t) {
        var a = t.detail.value;
        this.setData({
            buyCount: a
        });
    },
    buyMs: function() {
        this.setData({
            showMask: !this.data.showMask
        });
    },
    close: function() {
        this.setData({
            showMask: !1
        });
    },
    sureBuy: function() {
        if (this.isLogin(), 0 != this.data.attrkeys.length) {
            if (this.data.attrkeys.length > this.data.selectValArr.length) return void wx.showModal({
                title: "提示",
                content: "请选择规格",
                showCancel: !1
            });
            if (this.data.attrkeys.length == this.data.selectValArr.length & 0 == this.data.skuInventory) return void wx.showModal({
                title: "提示",
                content: "该规格不参与活动",
                showCancel: !1
            });
            if (this.data.attrkeys.length == this.data.selectValArr.length && this.data.buyCount > this.data.ms_stock) return void wx.showModal({
                title: "提示",
                content: "超出活动库存",
                showCancel: !1
            });
            if (this.data.attrkeys.length == this.data.selectValArr.length && this.data.buyCount > this.data.skuInventory) return void wx.showModal({
                title: "提示",
                content: "该规格超出库存",
                showCancel: !1
            });
        }
        this.setData({
            showMask: !1
        }), wx.navigateTo({
            url: "../purchaseLimitOrder/square?ms_id=" + this.data.SecKillProMsg.ms_config.ms_id + "&ms_product_id=" + this.data.SecKillProMsg.id + "&ms_product_num=" + this.data.buyCount + "&sku_id=" + this.data.skuid + "&sku_status=" + this.data.sku_status
        });
    },
    buyNow: function() {
        var t = this;
        t.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            t.setData({
                buttonClicked: !1
            });
        }, 500), wx.redirectTo({
            url: "../shop/productdetail?id=" + t.data.pinTuanProDetail.product_id
        });
    },
    goregulations: function() {
        var t = this;
        t.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            t.setData({
                buttonClicked: !1
            });
        }, 500), wx.navigateTo({
            url: "regulations"
        });
    },
    forMatterTime: function(t) {
        var a = parseInt(t / 60 / 60 % 24, 10), e = parseInt(t / 60 % 60, 10), s = parseInt(t % 60, 10);
        a = this.checkTime(a), e = this.checkTime(e), s = this.checkTime(s), this.setData({
            intervalTime: {
                hours: a,
                minutes: e,
                seconds: s
            }
        });
    },
    checkTime: function(t) {
        return t < 10 && (t = "0" + t), t;
    },
    AddCollection: function(t) {
        var e = this;
        if (this.data.getPageFlag) {
            this.setData({
                getPageFlag: !1
            });
            var s = t.currentTarget.dataset.proid;
            a.AddCollection(s, function(t) {
                e.setData({
                    getPageFlag: !0
                });
            });
        }
    },
    CanleCollection: function(t) {
        var e = this;
        if (this.data.getPageFlag) {
            this.setData({
                getPageFlag: !1
            });
            var s = t.currentTarget.dataset.proid;
            a.CancelCollection(s, function(t) {
                e.setData({
                    getPageFlag: !0
                });
            });
        }
    }
});