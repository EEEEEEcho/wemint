var t = getApp(), e = (require("../../components/utils/imgutil.js"), require("../../components/utils/util.js"));

Page({
    isloading: !1,
    onShareAppMessage: function() {
        return t.shareAppMessage("/pages/shop/productlist");
    },
    onLoad: function(e) {
        t.getPageUrl(this, e), t.registerGlobalFunctions(this), this.setData({
            queryparams: e
        }), this.loadProduct(!0), this.setData({
            shopcart: e.status ? e.status : 0
        }), this.showHeight();
    },
    data: {
        shopcart: 0,
        pagesize: 20,
        recordcount: 99,
        productlist: [],
        sortcol: "",
        sort: "",
        hasproduct: !0,
        baseUrl: t.globalData.siteBaseUrl,
        baseSiteID: t.globalData.siteId,
        salesvolumeup: [ "../../images/seleup.png", "../../images/seleup1.png" ],
        salesvolumedown: [ "../../images/seledown.png", "../../images/seledown1.png" ],
        salesvolumeupflag: !0,
        salesvolumedownflag: !0,
        priceupflag: !0,
        pricedownflag: !0,
        priceupw: [ "../../images/seleup.png", "../../images/seleup1.png" ],
        pricedown: [ "../../images/seledown.png", "../../images/seledown1.png" ],
        animationData: {},
        checkobj: [],
        flag: !1,
        allChecked: !1,
        allname: "全选",
        showHeight: 0
    },
    showHeight: function() {
        this.setData({
            showHeight: 2 * wx.getSystemInfoSync().windowHeight - 98
        });
    },
    loadProduct: function(e) {
        var a = this;
        if (e || !a.isloading) {
            a.isloading = !0;
            var o = a.data.total;
            e ? (a.data.recordcount = 99, a.data.productlist = []) : void 0 != o && (a.data.recordcount = o);
            var s = a.data.recordcount, l = a.data.productlist.length;
            if (s > l) {
                var i = Math.ceil(l / a.data.pagesize) + 1, c = a.data.queryparams.keyword ? a.data.queryparams.keyword : "", n = "";
                a.data.sortcol && (n = "&sortcol=" + a.data.sortcol + "&sort=" + a.data.sort), t.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=getProductCollList&key=" + c + "&page=" + i + "&pagesize=" + a.data.pagesize + n,
                    method: "GET",
                    success: function(t) {
                        if (a.isloading = !1, t.success) {
                            var e = a.data.recordcount;
                            a.setData({
                                total: t.recordcount,
                                recordcount: e
                            }), t.data.forEach(function(t) {
                                a.data.productlist.push(t);
                            });
                            var o = [], s = {};
                            a.data.productlist.forEach(function(t) {
                                var e = new Date(t.CrTime.replace(/-/g, "/"));
                                if (e.getMonth() + 1 < 10) a = "0" + (e.getMonth() + 1); else var a = e.getMonth() + 1;
                                for (var s = e.getFullYear() + "年" + a + "月", l = null, i = 0; i < o.length; i++) if (o[i].yearMonth == s) {
                                    l = o[i];
                                    break;
                                }
                                l || (l = {
                                    yearMonth: s,
                                    list: []
                                }, o.push(l)), l.list.push(t);
                            }), o.sort(function(t, e) {
                                return t.yearMonth - e.yearMonth;
                            }), s.List = o, s.page = t.page, s.pagesize = t.pagesize, s.recordcount = t.recordcount, 
                            a.setData({
                                newList: s
                            });
                        } else console.log("getProductList fail：" + t.msg);
                    },
                    fail: function(t) {
                        a.isloading = !1, console.log("getProductList fail");
                    }
                });
            }
        }
    },
    onSortChange: function(t) {
        if ("SalesCount" === t.currentTarget.dataset.condition) {
            var e = this.data.salesvolumeupflag;
            e = !e, this.setData({
                salesvolumeupflag: e,
                salesvolumedownflag: !e,
                priceupflag: !0,
                pricedownflag: !0,
                sortcol: "SalesCount",
                sort: e ? "DESC" : "ASC"
            });
        } else if ("Price" === t.currentTarget.dataset.condition) {
            var a = this.data.priceupflag;
            a = !a, this.setData({
                priceupflag: a,
                pricedownflag: !a,
                salesvolumeupflag: !0,
                salesvolumedownflag: !0,
                sortcol: "Price",
                sort: a ? "DESC" : "ASC"
            });
        }
        this.loadProduct(!0);
    },
    onSearchSubmit: function(a) {
        var o = e.trim(a.detail.value.keyword);
        o ? wx.navigateTo({
            url: "collection?keyword=" + o
        }) : t.showModal({
            title: "提示",
            content: "请输入产品关键词"
        });
    },
    onKeywordChange: function(a) {
        var o = e.trim(a.detail.value);
        o ? o && wx.navigateTo({
            url: "collection?keyword=" + o
        }) : t.showModal({
            title: "提示",
            content: "请输入产品关键词"
        });
    },
    goProductdetail: function(t) {
        var e = t.currentTarget.dataset.productid, a = this;
        a.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            a.setData({
                buttonClicked: !1
            });
        }, 500), a.data.newList.List.forEach(function(t) {
            t.list.forEach(function(t) {
                if (t.CollProductID === e) {
                    if (1 != t.productType) return;
                    wx.navigateTo({
                        url: "productdetail?id=" + e
                    });
                }
            });
        });
    },
    SaveChcekValue: function(t) {
        t.target.dataset.index;
        var e = this, a = (this.data.allChecked, t.target.dataset.productid);
        if (e.data.newList.List.forEach(function(t) {
            t.list.forEach(function(t) {
                t.CollProductID === a && (t.selected = !t.selected, t.selected || e.setData({
                    allChecked: !1,
                    newList: e.data.newList
                }));
            });
        }), null == t.detail.value[0]) for (var o = 0; o < this.data.checkobj.length; o++) this.data.checkobj[o] == a && e.data.checkobj.splice(o, 1); else {
            this.setData({
                newList: e.data.newList
            }), this.data.checkobj.push(a);
            var s = 0;
            e.data.newList.List.forEach(function(t) {
                t.list.forEach(function(t) {
                    t.selected ? s++ : e.setData({
                        allChecked: !1
                    });
                }), s == e.data.newList.recordcount && e.setData({
                    allChecked: !0
                });
            });
        }
    },
    allCheckedBtn: function(t) {
        var e = this;
        e.data.allChecked = !e.data.allChecked, e.data.newList.List.forEach(function(t) {
            t.list.forEach(function(t) {
                1 == e.data.allChecked ? void 0 === t.selected ? (t.selected = e.data.allChecked, 
                e.data.checkobj.push(t.CollProductID)) : 0 == t.selected && (t.selected = e.data.allChecked, 
                e.data.checkobj.push(t.CollProductID)) : (t.selected = e.data.allChecked, e.data.checkobj = []);
            });
        }), e.setData({
            newList: e.data.newList,
            allChecked: e.data.allChecked
        });
    },
    DelCollection: function(e) {
        var a = this, o = a.data.newList, s = a.data.checkobj;
        0 == s.length ? wx.showModal({
            title: "提示",
            content: "请选择商品",
            showCancel: !1
        }) : wx.showModal({
            title: "提示",
            content: "确定要删除吗？",
            success: function(e) {
                e.confirm ? t.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=cancelCollPro",
                    data: {
                        collProID: s.join(",")
                    },
                    method: "POST",
                    success: function(t) {
                        if (a.isloading = !1, t.success) {
                            wx.showToast({
                                title: "删除成功",
                                icon: "sunccess"
                            });
                            for (var e = 0; e < s.length; e++) for (var l = 0; l < o.List.length; l++) if (a.data.allChecked) o.List = []; else for (var i = 0; i < o.List[l].list.length; i++) s[e] == o.List[l].list[i].CollProductID && o.List[l].list.splice(i, 1);
                            a.setData({
                                newList: o,
                                flag: !1
                            });
                        } else console.log("getProductList fail：" + t.msg);
                    },
                    fail: function(t) {
                        a.isloading = !1, console.log("getProductList fail");
                    }
                }) : e.cancel;
            }
        });
    },
    onProductListScroll: function(t) {
        this.loadProduct();
    },
    edit: function() {
        this.setData({
            flag: !0
        });
    },
    complete: function() {
        this.setData({
            flag: !1
        });
    }
});