var t = getApp();

require("../../components/utils/imgutil.js"), require("../../components/utils/util.js"), 
require("../shop/ShopUtil.js");

Page({
    data: {
        pintuan_group_id: "",
        show: !1,
        empty_pintuan_user: [],
        showSku: !1,
        attrkeys: [],
        attrImg: "",
        skuMsg: [],
        skuid: 0,
        remain_stock: "",
        baseUrl: t.globalData.siteBaseUrl,
        skuInventory: 0,
        pinTuanInventory: 0,
        buyCountLimit: 0,
        productName: "",
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
        pintuan_product_id: "",
        pintuan_num: ""
    },
    onLoad: function(t) {
        console.log(t);
        var a = this;
        this.setData({
            queryparams: t,
            pinTuanInventory: t.storenum
        }), a.isLogin();
    },
    isLogin: function() {
        setTimeout(function() {
            t.globalData.WebUserID || t.login();
        }, 2e3);
    },
    onShow: function() {
        var a = this;
        a.selectHalf();
        a.data.UserID;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=getPintuanInfo&&pintuan_group_id=" + a.data.queryparams.pintuan_group_id,
            method: "GET",
            success: function(e) {
                if (e.success) {
                    for (o = 0; o < e.data.pintuan_user_list.length; o++) e.data.pintuan_user_list[o].join_time = a.toDate(e.data.pintuan_user_list[o].join_time);
                    var s = e.data.pintuan_user_num, r = e.data.pintuan_num - s, n = e.data.pintuan_user_list, i = [];
                    if (r > 0) for (var u = 0; u < r; u++) i.push({
                        user_img: ""
                    });
                    console.log(e.data), a.data.pintuan_id = e.data.pintuan_id, a.data.pintuan_product_id = e.data.product.id, 
                    a.setData({
                        empty_pintuan_user: i,
                        leftTime: d,
                        pintuan_user_list: e.data.pintuan_user_list,
                        product: e.data.product,
                        pintuan: e.data,
                        pintuan_end_time: e.data.pintuan_end_time,
                        pintuan_group_id: e.data.pintuan_group_id,
                        productName: e.data.product.name,
                        attrImg: e.data.product.img_src,
                        pintuan_id: e.data.pintuan_id,
                        pintuan_product_id: e.data.product.pintuan_product_id,
                        product_id: e.data.product.product_id,
                        buyCountLimit: e.data.product.buy_limit_num,
                        pinTuanInventory: e.data.product.remain_stock,
                        remain_stock: e.data.product.remain_stock,
                        pintuan_num: e.data.pintuan_num
                    }), console.log(t.globalData.WebUserID);
                    for (var o = 0; o < n.length; o++) t.globalData.WebUserID == n[o].UserID && a.setData({
                        show: !0
                    });
                    var d = "", l = e.data.pintuan_remain_time;
                    l < 86400 ? a.data.pintuan_remain_time = setInterval(function() {
                        var t = --l, e = Math.floor(t / 60 / 60 % 24, 10), s = Math.floor(t / 60 % 60, 10), r = Math.floor(t % 60, 10);
                        e < 10 && (e = "0" + e), s < 10 && (s = "0" + s), r < 10 && (r = "0" + r);
                        var n = e + ":" + s + ":" + r;
                        a.setData({
                            leftTime: n
                        }), l <= 0 && clearInterval(a.data.pintuan_remain_time), l <= 0 && (l = 0);
                    }, 1e3) : a.data.pintuan_end_time = setInterval(function() {
                        var t = --l, e = Math.floor(t / 60 / 60 / 24, 10), s = Math.floor(t / 60 / 60 % 24, 10), r = Math.floor(t / 60 % 60, 10), n = Math.floor(t % 60, 10);
                        e < 10 && (s = "0" + e), s < 10 && (s = "0" + s), r < 10 && (r = "0" + r), n < 10 && (n = "0" + n);
                        var i = e + "天" + s + "时" + r + "分" + n + "秒";
                        a.setData({
                            leftTime: i
                        }), "0" == l && clearInterval(a.data.pintuan_end_time), l <= 0 && (l = 0);
                    }, 1e3);
                } else console.log("getPintuanInfo fail：" + e.msg);
                t.sendRequest({
                    url: "/index.php?c=front/WxApp/pintuan&a=getProductSku&pintuan_id=" + a.data.pintuan_id + "&product_id=" + a.data.product_id,
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
                                for (u = 0; u < t.data.attrkeys[r].attrVals.length; u++) t.data.attrkeys[r].attrVals[u].isSelect = !1, 
                                t.data.attrkeys[r].attrVals[u].canSelect = !0;
                            }
                            for (var e = [], s = [], r = 0; r < t.data.skus.length; r++) {
                                var n = t.data.skus[r];
                                0 != n.ProductQuantity ? e.push(n) : s.push(n);
                            }
                            for (u = 0; u < e.length; u++) for (var i = 0; i < e[u].Path.length; i++) -1 == a.data.hasInventoryPathArr.indexOf(e[u].Path[i]) && a.data.hasInventoryPathArr.push(e[u].Path[i]);
                            for (r = 0; r < t.data.attrkeys.length; r++) for (var u = 0; u < t.data.attrkeys[r].attrVals.length; u++) -1 == a.data.hasInventoryPathArr.indexOf(t.data.attrkeys[r].attrVals[u].AttrValID) && (t.data.attrkeys[r].attrVals[u].canSelect = !1, 
                            a.setData({
                                noKuCunId: t.data.attrkeys[r].attrVals[u].AttrValID
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
                });
            },
            fail: function(t) {
                console.log("getPintuanInfo fail");
            }
        });
    },
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
            for (var u = [], o = 0; o < this.data.selectedSkuArr.length; o++) u.push(this.data.selectedSkuArr[o].attrvalid);
            this.data.selectValArr = u.sort(function(t, a) {
                return t - a;
            }), console.log(this.data.selectValArr);
            for (h = 0; h < this.data.attrkeys.length; h++) for (o = 0; o < this.data.attrkeys[h].attrVals.length; o++) this.data.attrkeys[h].attrVals[o].AttrValID !== this.data.noKuCunId && (this.data.attrkeys[h].attrVals[o].canSelect = !0);
            if (this.data.selectValArr.length == this.data.attrkeys.length - 1 && this.selectHalf(u), 
            this.data.attrkeys.length == this.data.selectValArr.length) for (h = 0; h < this.data.skuMsg.length; h++) if (this.data.skuMsg[h].Path.toString() == this.data.selectValArr.toString()) if (0 == this.data.skuMsg[h].ProductQuantity) {
                for (h = 0; h < this.data.selectValArr.length; h++) if (h == this.data.selectValArr.length - 1) {
                    var d = this.data.selectValArr[h];
                    this.data.selectValArr.splice(h, 1);
                    for (h = 0; h < this.data.selectedSkuArr.length; h++) this.data.selectedSkuArr[h].attrvalid == d && this.data.selectedSkuArr.splice(h, 1);
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
            for (var l = "", h = 0; h < this.data.newSelectedSkuArr.length; h++) h != this.data.newSelectedSkuArr.length - 1 ? l = l + this.data.newSelectedSkuArr[h].attrvalname + "," : l += this.data.newSelectedSkuArr[h].attrvalname;
            this.data.selectSkuDes = l, this.setData({
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
    selectHalf: function(t) {
        for (var a = [], e = [], s = 0; s < this.data.noSkuInventoryArr.length; s++) 1 == this.isContained(this.data.noSkuInventoryArr[s].Path, t) && a.push(this.data.noSkuInventoryArr[s].Path);
        for (n = 0; n < a.length; n++) for (r = 0; r < a[n].length; r++) -1 == this.data.selectValArr.indexOf(a[n][r]) && (console.log(a[n][r]), 
        e.push(a[n][r]));
        for (s = 0; s < this.data.attrkeys.length; s++) for (n = 0; n < this.data.attrkeys[s].attrVals.length; n++) -1 !== e.indexOf(this.data.attrkeys[s].attrVals[n].AttrValID) && (this.data.attrkeys[s].attrVals[n].canSelect = !1);
        for (var a = [], e = [], s = 0; s < this.data.noSkuInventoryArr.length; s++) 1 == this.isContained(this.data.noSkuInventoryArr[s].Path, t) && a.push(this.data.noSkuInventoryArr[s].Path);
        for (n = 0; n < a.length; n++) for (var r = 0; r < a[n].length; r++) -1 == this.data.selectValArr.indexOf(a[n][r]) && e.push(a[n][r]);
        for (s = 0; s < this.data.attrkeys.length; s++) for (var n = 0; n < this.data.attrkeys[s].attrVals.length; n++) -1 !== e.indexOf(this.data.attrkeys[s].attrVals[n].AttrValID) && (this.data.attrkeys[s].attrVals[n].canSelect = !1);
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
    close: function() {
        this.setData({
            showMask: !1
        });
    },
    sureBuy: function() {
        0 === this.data.attrkeys.length || 0 != this.data.isSelectAllAttr ? 0 !== this.data.attrkeys.length && this.data.buyCount > this.data.pinTuanInventory ? wx.showModal({
            title: "提示",
            content: "超出活动库存",
            showCancel: !1
        }) : (this.setData({
            showMask: !1
        }), wx.navigateTo({
            url: "../order/square?pintuan_id=" + this.data.pintuan_id + "&pintuan_group_id=" + this.data.pintuan_group_id + "&pintuan_product_id=" + this.data.pintuan_product_id + "&pintuan_product_num=" + this.data.buyCount + "&sku_id=" + this.data.skuid + "&attrImg=" + this.data.attrImg
        })) : wx.showModal({
            title: "提示",
            content: "请选择规格",
            showCancel: !1
        });
    },
    showModal: function(t) {
        var a = "open" == t.currentTarget.dataset.statu;
        this.setData({
            showModalStatus: a
        });
    },
    onShareAppMessage: function(a) {
        var e = this;
        console.log(e.data.pintuan_group_id);
        var s = "/pages/fightGroups/fightgroups?pintuan_group_id=" + e.data.pintuan_group_id;
        return {
            title: e.data.productName,
            path: s,
            success: function(a) {
                t.showToast({
                    title: "发送成功",
                    icon: "success"
                });
            },
            fail: function(a) {
                t.showToast({
                    title: "转发失败",
                    image: "/images/error.png"
                });
            }
        };
    },
    buyKaiTuan: function() {
        this.setData({
            showMask: !this.data.showMask
        });
    },
    goPinTuanProDetail: function() {
        var t = this;
        t.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            t.setData({
                buttonClicked: !1
            });
        }, 500), console.log("拼团ID" + t.data.product.sale_price), wx.redirectTo({
            url: "./productdetail?pintuan_id=" + this.data.pintuan_id + "&id=" + this.data.pintuan_product_id + "&img=" + t.data.product.img_src + "&price=" + t.data.product.sale_price + "&storenum=" + t.data.product.remain_stock + "&proid=" + t.data.product.product_id + "&buycount=" + t.data.product.buy_limit_num
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
    toDate: function(t) {
        var a = 1e3 * t, e = new Date(a);
        return e.getFullYear() + "/" + ((e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "/") + ((e.getDate() < 10 ? "0" + e.getDate() : e.getDate()) + " ") + ((e.getHours() < 10 ? "0" + e.getHours() : e.getHours()) + ":") + ((e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes()) + ":") + (e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds());
    }
});