var t = getApp(), a = require("../../../components/utils/imgutil.js"), e = require("../../../components/utils/util.js"), s = require("../../shop/ShopUtil.js"), n = require("../../../common.js");

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
        getPageFlag: !0,
        shareMarkFlag: !1,
        enableWxShare: !1,
        language: {}
    },
    onLoad: function(a) {
        var e = this;
        if (a.scene) {
            var s = {};
            decodeURIComponent(a.scene).split("&").map(function(t, a) {
                if (-1 !== t.indexOf("=")) {
                    var e = t.split("=");
                    s[e[0]] = e[1];
                }
                if (-1 !== t.indexOf("_")) {
                    var n = t.split("_");
                    s.invite = n[1];
                }
            }), a = s;
        }
        e.url = t.getPageUrl(e, a), this.setData({
            queryparams: a,
            language: t.globalData.language
        });
    },
    onShow: function(a) {
        t.doAfterUserInfoAuth({
            success: this.initData,
            fail: this.initData
        });
    },
    initData: function(t) {
        var a = this;
        n.registerGlobalFunc(), n.initCommonModules(), a.loadProDetailMsg(), a.selectHalf(a.data.selectValArr.splice(0, a.data.selectValArr.length - 1));
    },
    onBannerImgLoad: function(t) {
        var e = this, s = a.imageUtil(t);
        0 == t.currentTarget.dataset.index && e.setData({
            bannerHeight: s.imageHeight
        });
    },
    onPageScroll: function() {},
    isLogin: function() {
        setTimeout(function() {
            t.globalData.WebUserID || s.showRegUI();
        }, 2e3);
    },
    loadProDetailMsg: function() {
        var a = this;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=getProductInfo&pintuan_id=" + (a.data.queryparams.pintuan_id ? a.data.queryparams.pintuan_id : a.data.queryparams.pId) + "&pintuan_product_id=" + a.data.queryparams.id,
            method: "GET",
            success: function(s) {
                if (s.success) {
                    a.getProductSku(s.data.product_id);
                    var n = s.data.img_src;
                    a.setData({
                        AttrValSmallImg: n[0]
                    });
                    for (var i = 0; i < n.length; i++) n[i] = t.globalData.siteBaseUrl + n[i];
                    s.data.content = e.replaceRichHtml(s.data.content) || "", a.setData({
                        pinTuanProDetail: s.data,
                        productImgs: n,
                        deContent: s.data.content,
                        collection: 1 == s.data.collection,
                        enableWxShare: "1" === s.data.EnableWxShare,
                        price: s.data.pintuan_price,
                        buyCountLimit: s.data.buy_limit_num,
                        pinTuanInventory: s.data.remain_stock
                    });
                    var r = a.data.pinTuanProDetail.pintuan_config.remaining_time;
                    a.data.interval = setInterval(function() {
                        --r <= 0 && (r = 0, clearInterval(a.data.interval)), a.forMatterTime(r);
                    }, 1e3);
                } else console.log("getpinTuanProDetail fail：" + s.msg);
            },
            fail: function(t) {
                console.log("getpinTuanProDetail fail");
            }
        }), t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=getPintuanRecommend&pintuan_id=" + (a.data.queryparams.pintuan_id ? a.data.queryparams.pintuan_id : a.data.queryparams.pId) + "&pintuan_product_id=" + a.data.queryparams.id,
            method: "GET",
            success: function(t) {
                if (t.success) {
                    var e = t.data;
                    e.length > 0 && (a.data.pintuan_end_time = setInterval(function() {
                        for (var t = 0; t < e.length; t++) {
                            var s = --e[t].pintuan_remain_time;
                            s <= 0 && (s = 0);
                            var n = Math.floor(s / 60 / 60), i = Math.floor((s - 60 * n * 60) / 60), r = s % 60;
                            n < 10 && (n = "0" + n), i < 10 && (i = "0" + i), r < 10 && (r = "0" + r), e[t].leftTimeStr = n + ":" + i + ":" + r;
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
    getProductSku: function(a) {
        var e = this;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=getProductSku&pintuan_id=" + (e.data.queryparams.pintuan_id ? e.data.queryparams.pintuan_id : e.data.queryparams.pId) + "&product_id=" + a,
            method: "GET",
            success: function(t) {
                if (t.success) if (0 == t.data.attrkeys.length) e.setData({
                    showSku: !1
                }); else {
                    e.setData({
                        showSku: !0
                    });
                    for (n = 0; n < t.data.attrkeys.length; n++) {
                        t.data.attrkeys[n].selectArr = [];
                        for (l = 0; l < t.data.attrkeys[n].attrVals.length; l++) t.data.attrkeys[n].attrVals[l].isSelect = !1, 
                        t.data.attrkeys[n].attrVals[l].canSelect = !0;
                    }
                    for (var a = [], s = [], n = 0; n < t.data.skus.length; n++) {
                        var i = t.data.skus[n];
                        0 != i.ProductQuantity ? a.push(i) : s.push(i);
                    }
                    for (l = 0; l < a.length; l++) for (var r = 0; r < a[l].Path.length; r++) -1 == e.data.hasInventoryPathArr.indexOf(a[l].Path[r]) && e.data.hasInventoryPathArr.push(a[l].Path[r]);
                    for (n = 0; n < t.data.attrkeys.length; n++) for (var l = 0; l < t.data.attrkeys[n].attrVals.length; l++) -1 == e.data.hasInventoryPathArr.indexOf(t.data.attrkeys[n].attrVals[l].AttrValID) && (t.data.attrkeys[n].attrVals[l].canSelect = !1, 
                    e.setData({
                        noKuCunId: t.data.attrkeys[n].attrVals[l].AttrValID
                    }));
                    e.setData({
                        attrkeys: t.data.attrkeys,
                        skuMsg: t.data.skus,
                        AttrValSmallImg: e.data.AttrValSmallImg,
                        hasSkuInventoryArr: a,
                        noSkuInventoryArr: s,
                        hasInventoryPathArr: e.data.hasInventoryPathArr
                    });
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
        var a = t.currentTarget.dataset.attrvalid, e = t.currentTarget.dataset.attrkeyid, s = t.currentTarget.dataset.attrvalname, n = t.currentTarget.dataset.hasimage, i = t.currentTarget.dataset.canselect, r = this.minThreeNum();
        if (console.log(r), console.log(this.data.buyCount), 0 != i) {
            if (this.data.buyCount > r && this.setData({
                buyCount: this.data.buyCount
            }), 1 == n) for (h = 0; h < this.data.attrkeys.length; h++) if (1 == this.data.attrkeys[h].hasImg && this.data.attrkeys[h].AttrKeyID == e) for (u = 0; u < this.data.attrkeys[h].attrVals.length; u++) this.data.attrkeys[h].attrVals[u].AttrValID == a && this.setData({
                AttrValSmallImg: this.data.attrkeys[h].attrVals[u].AttrValSmallImg
            });
            if (this.hasAttrkeyId(e)) for (h = 0; h < this.data.selectedSkuArr.length; h++) this.data.selectedSkuArr[h].attrkeyid == e && (this.data.selectedSkuArr[h].attrvalid = a, 
            this.data.selectedSkuArr[h].attrvalname = s, this.data.selectedSkuArr[h].hasImage = n); else this.data.selectedSkuArr.push({
                attrkeyid: e,
                attrvalid: a,
                attrvalname: s,
                hasImage: n
            });
            for (var l = [], u = 0; u < this.data.selectedSkuArr.length; u++) l.push(this.data.selectedSkuArr[u].attrvalid);
            this.data.selectValArr = l.sort(function(t, a) {
                return t - a;
            });
            for (h = 0; h < this.data.attrkeys.length; h++) for (u = 0; u < this.data.attrkeys[h].attrVals.length; u++) this.data.attrkeys[h].attrVals[u].AttrValID !== this.data.noKuCunId && (this.data.attrkeys[h].attrVals[u].canSelect = !0);
            if (this.data.selectValArr.length == this.data.attrkeys.length - 1 && this.selectHalf(l), 
            console.log(this.data.buyCount), this.data.attrkeys.length == this.data.selectValArr.length) for (h = 0; h < this.data.skuMsg.length; h++) if (this.data.skuMsg[h].Path.toString() == this.data.selectValArr.toString()) if (0 == this.data.skuMsg[h].ProductQuantity) {
                for (h = 0; h < this.data.selectValArr.length; h++) if (h == this.data.selectValArr.length - 1) {
                    var o = this.data.selectValArr[h];
                    this.data.selectValArr.splice(h, 1);
                    for (h = 0; h < this.data.selectedSkuArr.length; h++) this.data.selectedSkuArr[h].attrvalid == o && this.data.selectedSkuArr.splice(h, 1);
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
            for (h = 0; h < this.data.attrkeys.length; h++) for (u = 0; u < this.data.attrkeys[h].attrVals.length; u++) this.isContainAttr(this.data.attrkeys[h].attrVals[u].AttrValID) ? this.data.attrkeys[h].attrVals[u].isSelect = !0 : this.data.attrkeys[h].attrVals[u].isSelect = !1;
            this.data.newSelectedSkuArr = [];
            for (h = 0; h < this.data.selectValArr.length; h++) for (u = 0; u < this.data.selectedSkuArr.length; u++) this.data.selectedSkuArr[u].attrvalid == this.data.selectValArr[h] && this.data.newSelectedSkuArr.push(this.data.selectedSkuArr[u]);
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
            for (var s = t[e], n = 0, i = 0; i < t.length; i++) t[i] == s && (n++, t[i] = -1);
            -1 != s && (a[s] = n);
        }
        return a;
    },
    isContained: function(t, a) {
        if (!(t instanceof Array && a instanceof Array)) return !1;
        if (t.length < a.length) return !1;
        for (var e = t.toString(), s = 0, n = a.length; s < n; s++) if (-1 == e.indexOf(a[s])) return !1;
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
        for (i = 0; i < a.length; i++) for (n = 0; n < a[i].length; n++) -1 == this.data.selectValArr.indexOf(a[i][n]) && e.push(a[i][n]);
        for (s = 0; s < this.data.attrkeys.length; s++) for (i = 0; i < this.data.attrkeys[s].attrVals.length; i++) -1 !== e.indexOf(this.data.attrkeys[s].attrVals[i].AttrValID) && (this.data.attrkeys[s].attrVals[i].canSelect = !1);
        for (var a = [], e = [], s = 0; s < this.data.noSkuInventoryArr.length; s++) 1 == this.isContained(this.data.noSkuInventoryArr[s].Path, t) && a.push(this.data.noSkuInventoryArr[s].Path);
        for (i = 0; i < a.length; i++) for (var n = 0; n < a[i].length; n++) -1 == this.data.selectValArr.indexOf(a[i][n]) && e.push(a[i][n]);
        for (s = 0; s < this.data.attrkeys.length; s++) for (var i = 0; i < this.data.attrkeys[s].attrVals.length; i++) -1 !== e.indexOf(this.data.attrkeys[s].attrVals[i].AttrValID) && (this.data.attrkeys[s].attrVals[i].canSelect = !1);
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
            showMask: !1,
            shareMarkFlag: !1
        });
    },
    blurManual: function(t) {
        t.detail.value > 1 ? t.detail.value > Number(this.data.buyCountLimit) ? this.setData({
            buyCount: this.data.buyCountLimit,
            canClickAdd: !1,
            canClickDes: !0
        }) : this.setData({
            buyCount: t.detail.value,
            canClickAdd: !0,
            canClickDes: !0
        }) : t.detail.value < 2 && this.setData({
            buyCount: 1,
            canClickAdd: !0,
            canClickDes: !1
        });
    },
    sureBuy: function() {
        var a = this;
        if (!t.globalData.WebUserID) return t.login(), void a.setData({
            showMask: !1,
            shareMarkFlag: !1
        });
        this.isLogin(), 0 === this.data.attrkeys.length || 0 != this.data.isSelectAllAttr ? 0 !== this.data.attrkeys.length && this.data.buyCount > this.data.pinTuanInventory ? wx.showModal({
            title: "提示",
            content: "超出活动库存",
            showCancel: !1
        }) : 0 != this.data.buyCount ? (this.setData({
            showMask: !1
        }), wx.navigateTo({
            url: "../square/index?pintuan_id=" + this.data.pinTuanProDetail.pintuan_config.pintuan_id + "&pintuan_product_id=" + this.data.pinTuanProDetail.id + "&pintuan_product_num=" + this.data.buyCount + "&sku_id=" + this.data.skuid + "&attrImg=" + this.data.AttrValSmallImg
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
            url: "../../shop/productdetail?id=" + t.data.pinTuanProDetail.product_id
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
        var a = parseInt(t / 60 / 60 / 24, 10), e = parseInt(t / 60 / 60 % 24, 10), s = parseInt(t / 60 % 60, 10), n = parseInt(t % 60, 10);
        a = this.checkTime(a), e = this.checkTime(e), s = this.checkTime(s), n = this.checkTime(n), 
        this.setData({
            intervalTime: {
                days: a,
                hours: e,
                minutes: s,
                seconds: n
            }
        });
    },
    checkTime: function(t) {
        return t < 10 && (t = "0" + t), t;
    },
    AddCollection: function(t) {
        var a = this;
        if (this.data.getPageFlag) {
            this.setData({
                getPageFlag: !1
            });
            var e = t.currentTarget.dataset.proid;
            s.AddCollection(e, function(t) {
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
            var e = t.currentTarget.dataset.proid;
            s.CancelCollection(e, function(t) {
                a.setData({
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
            url: "../fightgroupsdetails/index?pintuan_group_id=" + a + "&pintuan_id=" + this.data.queryparams.pintuan_id + "&pintuan_product_id=" + this.data.pinTuanProDetail.product_id + "&storenum=" + this.data.queryparams.storenum + "&buylimit=" + this.data.buyCountLimit + "&pintuan_product_id2=" + this.data.pinTuanProDetail.id
        });
    },
    backToHome: function() {
        wx.switchTab({
            url: "/pages/shop/index"
        });
    },
    share: function() {
        t.globalData.WebUserID ? this.setData({
            shareMarkFlag: !0
        }) : t.login();
    },
    sharetoFriend: function() {
        this.setData({
            shareMarkFlag: !1
        });
    },
    shareHfive: function() {
        var a = this;
        this.setData({
            shareMarkFlag: !1
        });
        var e = a.data.pinTuanProDetail.img_src;
        wx.navigateTo({
            url: "/pages/shop/poster?productId=" + a.data.queryparams.id + "&name=" + a.data.pinTuanProDetail.name + "&price=" + a.data.pinTuanProDetail.pintuan_price + "&productImg=" + e[0] + "&SiteID=" + t.globalData.baseInfo.SiteID + "&proType=1&proId=" + (a.data.queryparams.pintuan_id ? a.data.queryparams.pintuan_id : a.data.queryparams.pId)
        });
    }
});