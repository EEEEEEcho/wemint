function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = getApp(), s = (require("../../components/utils/imgutil.js"), require("../../components/utils/util.js"));

Page((e = {
    isloading: !1,
    onShareAppMessage: function() {
        return a.shareAppMessage("/pages/shop/productlist");
    },
    onLoad: function(t) {
        a.getPageUrl(this, t), a.registerGlobalFunctions(this), this.setData({
            queryparams: t
        });
        var e = t.classid && 0 != t.classid ? t.classid : "";
        this.loadSelectList(e), this.getScrollHeight(), this.getScrollHeightNoNav(), this.getmaskHeight(), 
        this.getTopHeight(), this.getCategoryListHeight(), this.getSelectScrollHeight(), 
        this.imageLoad(), this.isSearchRes(), this.loadCategory(), this.loadProduct(!0);
    },
    data: {
        pagesize: 6,
        recordcount: 99,
        productlist: [],
        sortcol: "",
        sort: "",
        hasproduct: !0,
        baseUrl: a.globalData.siteBaseUrl,
        salesvolumeupflag: !0,
        salesvolumedownflag: !0,
        priceupflag: !0,
        pricedownflag: !0,
        hitsupflag: !0,
        hitsdownflag: !0,
        classlist: [],
        classpagesize: 8,
        isshow: !1,
        imageWidth: 0,
        onSearch: "",
        sortItem: "MoRen",
        selectidx: "",
        count: 0,
        buttonClicked: !1,
        scrollHeight: 0,
        scrollHeightNoNav: 0,
        maskHeight: 0,
        topHeight: 0,
        categoryListHeight: 0,
        selectScrollHeight: 0,
        showNav: !0,
        isSelect: !1,
        selectList: [],
        selecting: !1,
        filterArray: [],
        filter: "",
        filterValueStr: "",
        animationData: {},
        filterAllArray: []
    },
    onFocus: function() {
        getCurrentPages().length > 1 ? wx.redirectTo({
            url: "./searchPage"
        }) : wx.navigateTo({
            url: "./searchPage"
        });
    },
    toCategoryPage: function() {
        wx.navigateTo({
            url: "./categoryPage"
        });
    },
    showAndHideSelect: function() {
        this.setData({
            isSelect: !this.data.isSelect
        });
    },
    imageLoad: function() {
        this.setData({
            imageWidth: (wx.getSystemInfoSync().windowWidth - 12 / a.pixelRatio) / 2
        });
    },
    getScrollHeight: function() {
        this.setData({
            scrollHeight: wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth / 750 * 186
        });
    },
    getScrollHeightNoNav: function() {
        this.setData({
            scrollHeightNoNav: wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth / 750 * 186
        });
    },
    getmaskHeight: function() {
        this.setData({
            maskHeight: wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth / 750 * 186
        });
    },
    getTopHeight: function() {
        this.setData({
            topHeight: wx.getSystemInfoSync().windowWidth / 750 * 186
        });
    },
    getCategoryListHeight: function() {
        this.setData({
            categoryListHeight: 3 * (wx.getSystemInfoSync().windowHeight - 186 * wx.getSystemInfoSync().windowWidth / 750) / 5
        });
    },
    getSelectScrollHeight: function() {
        this.setData({
            selectScrollHeight: wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth / 750 * 98
        });
    },
    isSearchRes: function() {
        getCurrentPages().length > 1 ? (this.setData({
            showNav: !1
        }), wx.setNavigationBarTitle({
            title: this.data.queryparams.classname
        })) : this.setData({
            showNav: !0
        });
    },
    goProductDetails: function(t) {
        var e = t.currentTarget.dataset.productid, a = this;
        a.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            a.setData({
                buttonClicked: !1
            });
        }, 500), wx.navigateTo({
            url: "productdetail?id=" + e
        });
    },
    closeMask: function() {
        this.setData({
            isshow: !this.data.isshow
        });
    },
    selectFilter: function(t) {
        var e = this, a = t.currentTarget.dataset.selectidx, s = (t.currentTarget.dataset.indexflag, 
        t.currentTarget.dataset.indexp);
        t.currentTarget.dataset.filtervalue;
        if (-1 != e.data.filterArray[s].current.indexOf(a)) {
            var i = e.data.filterArray[s].current.indexOf(a);
            e.data.filterArray[s].current.splice(i, 1);
            var r = e.data.filterArray[s].current;
            e.data.filterArray[s].current = r;
        } else e.data.filterArray[s].current.push(a);
        var o = e.data.filterArray;
        e.setData({
            filterArray: o
        });
        for (var l = [], n = 0; n < o.length; n++) if (o[n].current != []) for (c = 0; c < o[n].current.length; c++) l.push(o[n].current[c]);
        e.setData({
            filterAllArray: l
        });
        for (n = 0; n < e.data.selectList.length; n++) for (var c = 0; c < e.data.selectList[n].list.length; c++) -1 !== e.data.filterAllArray.indexOf(e.data.selectList[n].list[c].ValueID) ? e.data.selectList[n].list[c].selecting = !0 : e.data.selectList[n].list[c].selecting = !1;
        e.setData({
            selectList: e.data.selectList
        });
    },
    cancelActived: function(t) {
        for (var e = this, a = 0; a < e.data.selectList.length; a++) for (var s = 0; s < e.data.selectList[a].list.length; s++) e.data.selectList[a].list[s].selecting = !1;
        for (var i = 0; i < e.data.filterArray.length; i++) e.data.filterArray[i].current = [];
        e.setData({
            filterArray: e.data.filterArray,
            selectList: e.data.selectList
        });
    },
    filterPro: function() {
        var t = this;
        t.setData({
            isSelect: !this.data.isSelect
        });
        for (var e = t.data.filterArray, a = ",", s = 0; s < e.length; s++) for (var i = 0; i < e[s].current.length; i++) "" == e[s].current[i] ? a += e[s].current[i] : a = a + e[s].current[i] + ",";
        t.setData({
            filterValueStr: a
        }), t.loadProduct(!0);
    },
    onSearchSubmit: function(t) {
        var e, i = s.trim(t.detail.value.keyword);
        if (i) {
            if (i) {
                try {
                    var r = this;
                    e = r.data.searchkey, r.setData({
                        onSearch: !1
                    }), wx.setStorageSync(e, i);
                } catch (t) {}
                wx.navigateTo({
                    url: "productlist?keyword=" + i
                });
            }
        } else a.showModal({
            title: "提示",
            content: "请输入产品关键词"
        });
    },
    clearStorage: function() {
        var t = this;
        wx.clearStorageSync(), t.setData({
            searchRecord: []
        });
    },
    onKeywordChange: function(t) {
        var e, s = t.detail.value;
        if (s) {
            if (s) {
                try {
                    var i = this;
                    e = i.data.searchkey, wx.setStorageSync(e, s), i.setData({
                        onSearch: !1
                    });
                } catch (t) {}
                wx.navigateTo({
                    url: "productlist?keyword=" + s
                });
            }
        } else a.showModal({
            title: "提示",
            content: "请输入产品关键词"
        });
    },
    loadCategory: function() {
        var t = this;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getProductClassThree",
            method: "GET",
            success: function(e) {
                e.success ? (e.list.unshift({
                    ClassID: 0,
                    Name: "全部分类"
                }), t.setData({
                    classlist: e.list
                })) : console.log("getProductClassList fail：" + e.msg);
            },
            fail: function(t) {
                console.log("getProductClassList fail");
            }
        });
    },
    loadSelectList: function(t) {
        var e = this;
        a.sendRequest({
            url: "/index.php?c=front/WxApp/BaseApi&a=productFilter&class_id=" + t,
            method: "GET",
            success: function(t) {
                t.success ? (t.productFilter.forEach(function(t) {
                    e.data.filterArray.push({
                        id: t.FilterID,
                        current: []
                    });
                }), e.setData({
                    selectList: t.productFilter
                })) : console.log("getProductClassList fail：" + t.msg);
            },
            fail: function(t) {
                console.log("getProductClassList fail");
            }
        });
    },
    toggle: function() {
        this.setData({
            isshow: !this.data.isshow
        });
    },
    showClassProducts: function(t) {
        var e = this;
        e.setData({
            isshow: !1
        });
        var a = t.currentTarget.dataset.classid;
        e.data.queryparams.classid = a, e.data.queryparams.keyword = "", e.loadProduct(!0);
    },
    subClassProducts: function(t) {
        var e = this;
        e.setData({
            isshow: !1
        });
        var a = t.currentTarget.dataset.classid;
        e.data.queryparams.classid = a, e.data.queryparams.keyword = "", e.loadProduct(!0);
    },
    onSortChange: function(e) {
        if ("SalesCount" === e.currentTarget.dataset.condition) {
            var a, s = this.data.salesvolumeupflag;
            s = !s, this.setData((a = {
                priceupflag: r,
                pricedownflag: !r,
                salesvolumeupflag: !0,
                salesvolumedownflag: !0,
                hitsupflag: !0
            }, t(a, "hitsupflag", !0), t(a, "sortcol", "SalesCount"), t(a, "sortItem", "SalesCount"), 
            t(a, "sort", "DESC"), a));
        } else if ("Price" === e.currentTarget.dataset.condition) {
            var i, r = this.data.priceupflag;
            r = !r, this.setData((i = {
                priceupflag: r,
                pricedownflag: !r,
                salesvolumeupflag: !0,
                salesvolumedownflag: !0,
                hitsupflag: !0
            }, t(i, "hitsupflag", !0), t(i, "sortcol", "Price"), t(i, "sortItem", "Price"), 
            t(i, "sort", r ? "DESC" : "ASC"), i));
        } else if ("RenQi" === e.currentTarget.dataset.condition) {
            var o, l = this.data.hitsupflag;
            l = !l, this.setData((o = {
                hitsupflag: l
            }, t(o, "hitsupflag", !l), t(o, "salesvolumeupflag", !0), t(o, "salesvolumedownflag", !0), 
            t(o, "priceupflag", !0), t(o, "pricedownflag", !0), t(o, "sortcol", "Hits"), t(o, "sort", "DESC"), 
            t(o, "sortItem", "Hits"), o));
        } else "MoRen" === e.currentTarget.dataset.condition && this.setData({
            priceupflag: !r,
            pricedownflag: !r,
            sortcol: "",
            sort: "",
            sortItem: "MoRen"
        });
        this.loadProduct(!0);
    }
}, t(e, "onSearchSubmit", function(t) {
    var e = s.trim(t.detail.value.keyword);
    e ? (this.data.queryparams.keyword = e, this.data.queryparams.classid = 0, this.loadProduct(!0)) : a.showModal({
        title: "提示",
        content: "请输入产品关键词"
    });
}), t(e, "onKeywordChange", function(t) {
    var e = s.trim(t.detail.value);
    e ? (this.data.queryparams.keyword = e, this.data.queryparams.classid = 0, this.loadProduct(!0)) : a.showModal({
        title: "提示",
        content: "请输入产品关键词"
    });
}), t(e, "loadProduct", function(t) {
    var e = this;
    if (t || !e.isloading) {
        e.isloading = !0, t && (e.data.recordcount = 99, e.data.productlist = []);
        var s = e.data.recordcount, i = e.data.productlist.length;
        if (s > i) {
            var r = Math.ceil(i / e.data.pagesize) + 1, o = e.data.queryparams.keyword ? e.data.queryparams.keyword : "", l = e.data.queryparams.classid ? e.data.queryparams.classid : "0", n = "", c = e.data.filterValueStr;
            e.data.sortcol && (n = "&sortcol=" + e.data.sortcol + "&sort=" + e.data.sort), a.sendRequest({
                url: "/index.php?c=Front/WxApp/JsonApi&a=getNewProductList&keyword=" + o + "&page=" + r + "&pagesize=" + e.data.pagesize + "&classid=" + l + n + "&filtervalue=" + c,
                method: "GET",
                success: function(t) {
                    if (e.isloading = !1, t.success) {
                        for (var a = 0; a < t.productlist.length; a++) {
                            var s = t.productlist[a].ProDesc;
                            s = s.replace(/[\r\n]/g, ""), e.data.productlist.push(t.productlist[a]);
                        }
                        e.setData({
                            productlist: e.data.productlist,
                            recordcount: t.recordcount,
                            hasproduct: e.data.productlist.length > 0
                        });
                    } else console.log("getProductList fail：" + t.msg);
                },
                fail: function(t) {
                    e.isloading = !1, console.log("getProductList fail");
                }
            });
        }
    }
}), t(e, "onProductListScroll", function(t) {
    this.loadProduct();
}), t(e, "canceltap", function() {
    var t = wx.createAnimation({
        duration: 200,
        timingFunction: "ease-in",
        delay: 0
    });
    t.translateY(-100).step(), this.setData({
        animationData: t.export()
    });
}), t(e, "searchBoxshow", function(t) {
    var e = wx.createAnimation({
        duration: 200,
        timingFunction: "ease-out",
        delay: 0
    });
    this.animation = e, e.translateX(0).step(), this.setData({
        animationData: e.export()
    });
}), e));