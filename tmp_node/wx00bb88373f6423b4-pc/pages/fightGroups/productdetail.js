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
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        showSku: !1,
        attrkeys: [],
        skuMsg: [],
        skuid: 0,
        productImgs: [],
        skuInventory: 0,
        pinTuanInventory: 0,
        buyCountLimit: 0,
        price: 0,
        pintuan_price: 0,
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
        getPageFlag: !0
    },
    onLoad: function(a) {
        var s = this;
        s.url = t.getPageUrl(s, a), e.initCommonModules(), this.setData({
            queryparams: a
        }), console.log(a), this.setData({
            buyCountLimit: this.data.queryparams.buycount,
            AttrValSmallImg: this.data.queryparams.img,
            price: this.data.queryparams.price,
            pinTuanInventory: this.data.queryparams.storenum
        }), this.loadProDetailMsg();
    },
    onShow: function() {
        this.selectHalf(this.data.selectValArr.splice(0, this.data.selectValArr.length - 1)), 
        this.loadProductInfo();
    },
    onPageScroll: function() {},
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
    isLogin: function() {
        setTimeout(function() {
            t.globalData.WebUserID || a.showRegUI();
        }, 2e3);
    },
    loadProDetailMsg: function() {
        var a = this;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=getProductInfo&pintuan_id=" + a.data.queryparams.pintuan_id + "&pintuan_product_id=" + a.data.queryparams.id,
            method: "GET",
            success: function(e) {
                if (e.success) {
                    for (var s = e.data.img_src, r = 0; r < s.length; r++) s[r] = t.globalData.siteBaseUrl + s[r];
                    a.setData({
                        pinTuanProDetail: e.data,
                        productImgs: s
                    }), t.WxParse.wxParse("DetailInfo", "html", e.data.content, a, 5);
                    var n = a.data.pinTuanProDetail.pintuan_config.remaining_time;
                    a.data.interval = setInterval(function() {
                        --n <= 0 && (n = 0, clearInterval(a.data.interval)), a.forMatterTime(n);
                    }, 1e3);
                } else console.log("getpinTuanProDetail fail：" + e.msg);
            },
            fail: function(t) {
                console.log("getpinTuanProDetail fail");
            }
        }), t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=getProductSku&pintuan_id=" + a.data.queryparams.pintuan_id + "&product_id=" + a.data.queryparams.proid,
            method: "GET",
            success: function(t) {
                if (t.success) if (0 == t.data.attrkeys.length) a.setData({
                    showSku: !1
                }); else {
                    a.setData({
                        showSku: !0
                    });
                    for (r = 0; r < t.data.attrkeys.length; r++) {
                        t.data.attrkeys[r].selectArr = [];
                        for (l = 0; l < t.data.attrkeys[r].attrVals.length; l++) t.data.attrkeys[r].attrVals[l].isSelect = !1, 
                        t.data.attrkeys[r].attrVals[l].canSelect = !0;
                    }
                    for (var e = [], s = [], r = 0; r < t.data.skus.length; r++) {
                        var n = t.data.skus[r];
                        0 != n.ProductQuantity ? e.push(n) : s.push(n);
                    }
                    for (l = 0; l < e.length; l++) for (var i = 0; i < e[l].Path.length; i++) -1 == a.data.hasInventoryPathArr.indexOf(e[l].Path[i]) && a.data.hasInventoryPathArr.push(e[l].Path[i]);
                    for (r = 0; r < t.data.attrkeys.length; r++) for (var l = 0; l < t.data.attrkeys[r].attrVals.length; l++) -1 == a.data.hasInventoryPathArr.indexOf(t.data.attrkeys[r].attrVals[l].AttrValID) && (t.data.attrkeys[r].attrVals[l].canSelect = !1, 
                    a.setData({
                        noKuCunId: t.data.attrkeys[r].attrVals[l].AttrValID
                    }));
                    a.setData({
                        attrkeys: t.data.attrkeys,
                        skuMsg: t.data.skus,
                        AttrValSmallImg: a.data.AttrValSmallImg,
                        hasSkuInventoryArr: e,
                        noSkuInventoryArr: s,
                        hasInventoryPathArr: a.data.hasInventoryPathArr
                    });
                } else console.log("getpinTuanProSku fail：" + t.msg);
            },
            fail: function(t) {
                console.log("getpinTuanProSku fail");
            }
        }), t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=getPintuanRecommend&pintuan_id=" + a.data.queryparams.pintuan_id + "&pintuan_product_id=" + a.data.queryparams.id,
            method: "GET",
            success: function(t) {
                if (t.success) {
                    var e = t.data;
                    console.log(t.data), e.length > 0 && (a.data.pintuan_end_time = setInterval(function() {
                        for (var t = 0; t < e.length; t++) {
                            var s = --e[t].pintuan_remain_time;
                            s <= 0 && (s = 0);
                            var r = Math.floor(s / 60 / 60), n = Math.floor((s - 60 * r * 60) / 60), i = s % 60;
                            r < 10 && (r = "0" + r), n < 10 && (n = "0" + n), i < 10 && (i = "0" + i), e[t].leftTimeStr = r + ":" + n + ":" + i;
                        }
                        s <= 0 && clearInterval(a.data.pintuan_end_time), a.setData({
                            groupList: e
                        });
                    }, 1e3));
                } else console.log("getpinTuanProSku fail：" + t.msg);
            },
            fail: function(t) {
                console.log("getpinTuanProSku fail");
            }
        });
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
        var a = t.currentTarget.dataset.attrvalid, e = t.currentTarget.dataset.attrkeyid, s = t.currentTarget.dataset.attrvalname, r = t.currentTarget.dataset.hasimage, n = t.currentTarget.dataset.canselect, i = this.minThreeNum();
        if (0 != n) {
            if (this.data.buyCount > i && this.setData({
                buyCount: i
            }), 1 == r) for (h = 0; h < this.data.attrkeys.length; h++) if (1 == this.data.attrkeys[h].hasImg && this.data.attrkeys[h].AttrKeyID == e) for (o = 0; o < this.data.attrkeys[h].attrVals.length; o++) this.data.attrkeys[h].attrVals[o].AttrValID == a && this.setData({
                AttrValSmallImg: this.data.attrkeys[h].attrVals[o].AttrValSmallImg
            });
            if (this.hasAttrkeyId(e)) for (h = 0; h < this.data.selectedSkuArr.length; h++) this.data.selectedSkuArr[h].attrkeyid == e && (this.data.selectedSkuArr[h].attrvalid = a, 
            this.data.selectedSkuArr[h].attrvalname = s, this.data.selectedSkuArr[h].hasImage = r); else this.data.selectedSkuArr.push({
                attrkeyid: e,
                attrvalid: a,
                attrvalname: s,
                hasImage: r
            });
            for (var l = [], o = 0; o < this.data.selectedSkuArr.length; o++) l.push(this.data.selectedSkuArr[o].attrvalid);
            this.data.selectValArr = l.sort(function(t, a) {
                return t - a;
            });
            for (h = 0; h < this.data.attrkeys.length; h++) for (o = 0; o < this.data.attrkeys[h].attrVals.length; o++) this.data.attrkeys[h].attrVals[o].AttrValID !== this.data.noKuCunId && (this.data.attrkeys[h].attrVals[o].canSelect = !0);
            if (this.data.selectValArr.length == this.data.attrkeys.length - 1 && this.selectHalf(l), 
            console.log(l), this.data.attrkeys.length == this.data.selectValArr.length) for (h = 0; h < this.data.skuMsg.length; h++) if (this.data.skuMsg[h].Path.toString() == this.data.selectValArr.toString()) if (0 == this.data.skuMsg[h].ProductQuantity) {
                for (h = 0; h < this.data.selectValArr.length; h++) if (h == this.data.selectValArr.length - 1) {
                    var u = this.data.selectValArr[h];
                    this.data.selectValArr.splice(h, 1);
                    for (h = 0; h < this.data.selectedSkuArr.length; h++) this.data.selectedSkuArr[h].attrvalid == u && this.data.selectedSkuArr.splice(h, 1);
                }
                this.selectHalf(this.data.selectValArr), this.setData({
                    isSelectAllAttr: !0
                });
            } else this.setData({
                isSelectAllAttr: !0,
                skuid: this.data.skuMsg[h].SkuID,
                price: this.data.skuMsg[h].Price,
                skuInventory: this.data.skuMsg[h].ProductQuantity
            });
            for (h = 0; h < this.data.attrkeys.length; h++) for (o = 0; o < this.data.attrkeys[h].attrVals.length; o++) this.isContainAttr(this.data.attrkeys[h].attrVals[o].AttrValID) ? this.data.attrkeys[h].attrVals[o].isSelect = !0 : this.data.attrkeys[h].attrVals[o].isSelect = !1;
            this.data.newSelectedSkuArr = [];
            for (h = 0; h < this.data.selectValArr.length; h++) for (o = 0; o < this.data.selectedSkuArr.length; o++) this.data.selectedSkuArr[o].attrvalid == this.data.selectValArr[h] && this.data.newSelectedSkuArr.push(this.data.selectedSkuArr[o]);
            for (var d = "", h = 0; h < this.data.newSelectedSkuArr.length; h++) h != this.data.newSelectedSkuArr.length - 1 ? d = d + this.data.newSelectedSkuArr[h].attrvalname + "," : d += this.data.newSelectedSkuArr[h].attrvalname;
            this.data.selectSkuDes = d, this.setData({
                selectValArr: this.data.selectValArr,
                selectSkuDes: this.data.selectSkuDes,
                attrkeys: this.data.attrkeys
            });
        }
    },
    arrCheck: function(t) {
        for (var a = {}, e = 0; e < t.length; e++) {
            for (var s = t[e], r = 0, n = 0; n < t.length; n++) t[n] == s && (r++, t[n] = -1);
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
        var t;
        return t = this.data.buyCountLimit > this.data.pinTuanInventory ? this.data.pinTuanInventory : this.data.buyCountLimit, 
        this.data.skuInventory > t && (t = t), t;
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
        for (n = 0; n < a.length; n++) for (r = 0; r < a[n].length; r++) -1 == this.data.selectValArr.indexOf(a[n][r]) && e.push(a[n][r]);
        for (s = 0; s < this.data.attrkeys.length; s++) for (n = 0; n < this.data.attrkeys[s].attrVals.length; n++) -1 !== e.indexOf(this.data.attrkeys[s].attrVals[n].AttrValID) && (this.data.attrkeys[s].attrVals[n].canSelect = !1);
        for (var a = [], e = [], s = 0; s < this.data.noSkuInventoryArr.length; s++) 1 == this.isContained(this.data.noSkuInventoryArr[s].Path, t) && a.push(this.data.noSkuInventoryArr[s].Path);
        for (n = 0; n < a.length; n++) for (var r = 0; r < a[n].length; r++) -1 == this.data.selectValArr.indexOf(a[n][r]) && e.push(a[n][r]);
        for (s = 0; s < this.data.attrkeys.length; s++) for (var n = 0; n < this.data.attrkeys[s].attrVals.length; n++) -1 !== e.indexOf(this.data.attrkeys[s].attrVals[n].AttrValID) && (this.data.attrkeys[s].attrVals[n].canSelect = !1);
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
            if (t > this.data.pinTuanInventory) return wx.showModal({
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
        } else if (this.data.isSelectAllAttr) {
            if (t > this.data.buyCountLimit || t > this.data.skuInventory || t > this.data.pinTuanInventory) {
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
                if (t > this.data.pinTuanInventory) return wx.showModal({
                    title: "提示",
                    content: "超出拼团库存",
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
            content: "请选择规格",
            showCancel: !1
        });
    },
    bindManual: function(t) {
        var a = t.detail.value;
        this.setData({
            buyCount: a
        });
    },
    buyKaiTuan: function() {
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
        this.isLogin(), 0 === this.data.attrkeys.length || 0 != this.data.isSelectAllAttr ? 0 !== this.data.attrkeys.length && this.data.buyCount > this.data.pinTuanInventory ? wx.showModal({
            title: "提示",
            content: "超出活动库存",
            showCancel: !1
        }) : 0 != this.data.buyCount ? (this.setData({
            showMask: !1
        }), wx.navigateTo({
            url: "../order/square?pintuan_id=" + this.data.pinTuanProDetail.pintuan_config.pintuan_id + "&pintuan_product_id=" + this.data.pinTuanProDetail.id + "&pintuan_product_num=" + this.data.buyCount + "&sku_id=" + this.data.skuid + "&attrImg=" + this.data.AttrValSmallImg
        })) : wx.showModal({
            title: "提示",
            content: "拼团商品已售罄",
            showCancel: !1
        }) : wx.showModal({
            title: "提示",
            content: "请选择规格",
            showCancel: !1
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
        var a = parseInt(t / 60 / 60 / 24, 10), e = parseInt(t / 60 / 60 % 24, 10), s = parseInt(t / 60 % 60, 10), r = parseInt(t % 60, 10);
        a = this.checkTime(a), e = this.checkTime(e), s = this.checkTime(s), r = this.checkTime(r), 
        this.setData({
            intervalTime: {
                days: a,
                hours: e,
                minutes: s,
                seconds: r
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
    },
    goPinTuanDetail: function(t) {
        var a = t.currentTarget.dataset.group, e = this;
        e.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            e.setData({
                buttonClicked: !1
            });
        }, 500), wx.redirectTo({
            url: "./fightgroups?pintuan_group_id=" + a + "&pintuan_id=" + this.data.queryparams.pintuan_id + "&pintuan_product_id=" + this.data.pinTuanProDetail.product_id + "&storenum=" + this.data.queryparams.storenum + "&buylimit=" + this.data.buyCountLimit + "&pintuan_product_id2=" + this.data.pinTuanProDetail.id
        });
    }
});