function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = getApp(), s = (require("../../components/utils/imgutil.js"), require("../../components/utils/util.js")), o = require("../../common.js"), i = require("../../components/utils/qqmap-wx-jssdk.min.js"), r = require("../../components/wxb.js");

Page((e = {
    isloading: !1,
    onShareAppMessage: function() {
        return a.shareAppMessage(this.data.pageurl);
    },
    onLoad: function(t) {
        var e = this;
        t.ToBySearch && "1" === t.ToBySearch ? this.setData({
            ToBySearchFlag: !0
        }) : this.setData({
            ToBySearchFlag: !1
        });
        var s = this;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getStoreSetting",
            method: "GET",
            success: function(t) {
                t.success ? (e.setData({
                    StoreSetting: t.StoreSetting
                }), "1" === t.StoreSetting && a.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=getTencentMapApiKey",
                    method: "GET",
                    success: function(e) {
                        e.success ? (wx.setStorageSync("StoreSetting", t.StoreSetting), wx.getSetting({
                            success: function(t) {
                                t.authSetting["scope.userLocation"] ? s.defaultAddress(s) : wx.getLocation({
                                    type: "wgs84",
                                    success: function(t) {
                                        new i({
                                            key: e.data.key
                                        }).reverseGeocoder({
                                            location: {
                                                latitude: Number(t.latitude),
                                                longitude: Number(t.longitude)
                                            },
                                            success: function(t) {
                                                s.setData({
                                                    resultData: t
                                                }), wx.navigateTo({
                                                    url: "/pages/storechoose/storechoose/index?start_address=" + t.result.address + "&city=" + t.result.address_component.city + "&district=" + t.result.address_component.district + "&lat=" + t.result.location.lat + "&lng=" + t.result.location.lng
                                                });
                                            },
                                            fail: function(t) {},
                                            complete: function(t) {}
                                        });
                                    },
                                    fail: function(t) {
                                        s.defaultAddress(s);
                                    }
                                });
                            }
                        })) : a.showModal({
                            title: "提示",
                            content: t.msg
                        });
                    }
                })) : a.showModal({
                    title: "提示",
                    content: t.msg
                });
            }
        }), a.getPageUrl(this, t), a.registerGlobalFunctions(this), this.setData({
            queryparams: t,
            checkGoodsDetails: a.globalData.getMobileNode ? a.globalData.getMobileNode.checkGoodsDetails : 0
        });
        var r = t.classid && 0 != t.classid ? t.classid : "";
        this.loadSelectList(r), this.getScrollHeight(), this.getScrollHeightNoNav(), this.getmaskHeight(), 
        this.getTopHeight(), this.getCategoryListHeight(), this.getSelectScrollHeight(), 
        this.imageLoad(), this.isSearchRes(), this.loadCategory(), o.setPopupFromShare(), 
        this.navigateBackFunc(), t.couponId && this.getCouponData(t.couponId);
    },
    onPullDownRefresh: function() {
        var t = this;
        t.data.pullDownRefreshFlag && (t.setData({
            pullDownRefreshFlag: !1
        }), t.data.pullDownRefreshFlag = !1, t.data.queryparams.refresh = !0, t.isloading = !1, 
        setTimeout(function() {
            t.onShow(t.data.queryparams), t.setData({
                pullDownRefreshFlag: !0
            }), wx.stopPullDownRefresh();
        }, 1500));
    },
    onShow: function() {
        this.data.backInProDefault ? this.setData({
            backInProDefault: !1
        }) : this.loadProduct(!0);
    },
    data: {
        couponInfo: "",
        pagesize: 20,
        recordcount: 99,
        productlist: [],
        sortcol: "",
        sort: "",
        ToBySearchFlag: !1,
        backInProDefault: !1,
        hasproduct: !0,
        pullDownRefreshFlag: !0,
        baseUrl: a.globalData.siteBaseUrl,
        salesvolumeupflag: !0,
        salesvolumedownflag: !0,
        priceupflag: !0,
        pricedownflag: !0,
        hitsupflag: !0,
        reminder: "授权提示",
        matter: "授权失败，请重新授权",
        abrogate: "暂时先不",
        permission: "允许",
        hitsdownflag: !0,
        classlist: [],
        timestaus: !0,
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
    defaultAddress: function() {
        var t = this, e = "113.315353";
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getIndexStoreList&lng=113.315353&lat=23.086800&type=2&keyword=&page=1&pagesize=20",
            method: "GET",
            success: function(s) {
                if (s.success) {
                    var o = s.data.list[0], r = {
                        start_address: o.ProvinceName + o.CityName + o.DistrictName + o.Address,
                        city: o.CityName,
                        district: o.DistrictName,
                        lat: o.Lantitude,
                        lng: o.Longtitude,
                        Name: o.Name,
                        distance: o.distance,
                        ProvinceName: o.ProvinceName,
                        storeID: o.Id
                    };
                    if (wx.getStorageSync("isFirstIn") && "1" === wx.getStorageSync("isFirstIn")) return;
                    wx.setStorageSync("options", r), wx.setStorageSync("isFirstIn", "1"), a.sendRequest({
                        url: "/index.php?c=Front/WxApp/ShopApi&a=getTencentMapApiKey",
                        method: "GET",
                        success: function(a) {
                            a.success && new i({
                                key: a.data.key
                            }).reverseGeocoder({
                                location: {
                                    latitude: Number("23.086800"),
                                    longitude: Number(e)
                                },
                                success: function(e) {
                                    t.setData({
                                        resultData: e
                                    }), wx.navigateTo({
                                        url: "/pages/storechoose/storechoose/index?start_address=" + e.result.address + "&city=" + e.result.address_component.city + "&district=" + e.result.address_component.district + "&lat=" + e.result.location.lat + "&lng=" + e.result.location.lng
                                    });
                                }
                            });
                        }
                    });
                } else t.showModal({
                    title: "提示",
                    content: s.msg
                });
            },
            fail: function(e) {
                t.showModal({
                    title: "提示",
                    content: e.msg
                });
            }
        });
    },
    onFocus: function() {
        this.data.ToBySearchFlag ? wx.redirectTo({
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
    getCouponData: function(t) {
        var e = this;
        a.sendRequest({
            url: "/index.php?c=front/WxApp/ShopApi&a=getCouponWriteOffrCode&ID=" + t,
            method: "GET",
            success: function(t) {
                if (t.success) {
                    var a = t.info.couponInfo || {}, s = "", o = !1;
                    0 === Number(a.OrderMoney) ? (s = "无门槛", o = !0) : s = "满" + (a.OrderMoney - 0);
                    var i = s + (0 == a.Type ? (o ? "" : "享") + (Number(a.Amount) / 10 || 0) + "折" : "减" + (a.Amount - 0));
                    e.setData({
                        couponInfo: i
                    });
                }
            },
            fail: function(t) {
                console.log("getCouponWriteOffrCode fail");
            }
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
            scrollHeight: wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth / 750 * 93
        });
    },
    getScrollHeightNoNav: function() {
        this.setData({
            scrollHeightNoNav: wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth / 750 * 93
        });
    },
    getmaskHeight: function() {
        this.setData({
            maskHeight: wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth / 750 * 93
        });
    },
    getTopHeight: function() {
        this.setData({
            topHeight: wx.getSystemInfoSync().windowWidth / 750 * 186
        });
    },
    getCategoryListHeight: function() {
        this.setData({
            categoryListHeight: 3 * (wx.getSystemInfoSync().windowHeight - 93 * wx.getSystemInfoSync().windowWidth / 750) / 5
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
        }), this.data.queryparams.classname && wx.setNavigationBarTitle({
            title: this.data.queryparams.classname
        })) : this.setData({
            showNav: !0
        });
    },
    goProductDetails: function(t) {
        var e = this, s = wx.getStorageSync("hasMobile") || 0;
        e.setData({
            buttonClicked: !0,
            fullState: t.currentTarget.dataset.fullstate,
            productid: t.currentTarget.dataset.productid
        }), setTimeout(function() {
            e.setData({
                buttonClicked: !1
            });
        }, 500), 0 === a.globalData.hasMobile && 0 === s && 0 !== e.data.checkGoodsDetails ? e.setData({
            phonelicense: !0
        }) : e.toProductDetail();
    },
    toProductDetail: function() {
        var t = this, e = "0";
        1 == t.data.fullState && (e = "1"), wx.navigateTo({
            url: "productdetail?id=" + t.data.productid + "&fullID=" + e
        });
    },
    closeMask: function() {
        this.setData({
            isshow: !this.data.isshow
        });
    },
    getPhoneNumber: function(t) {
        var e = this;
        a.globalData.getMobileNode;
        if (t.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
            var s = a.globalData.appId, o = a.globalData.session_key, i = new r(s, o).decryptData(t.detail.encryptedData, t.detail.iv);
            a.loadphoneInfo(i.phoneNumber), e.toProductDetail();
        } else 2 === e.data.checkGoodsDetails ? e.setData({
            allowspopup: !0
        }) : e.toProductDetail();
    },
    turnOff: function() {
        a.turnOff();
    },
    abolish: function() {
        this.setData({
            allowspopup: !1
        });
    },
    navigateBackFunc: function(t) {
        var e = getCurrentPages(), a = e[e.length - 2];
        a && [ "pages/shop/productlist_tabbar", "pages/shop/productlist" ].includes(a.route) && a.setData({
            backInProDefault: !0
        });
    },
    selectFilter: function(t) {
        var e = this, a = t.currentTarget.dataset.selectidx, s = (t.currentTarget.dataset.indexflag, 
        t.currentTarget.dataset.indexp);
        t.currentTarget.dataset.filtervalue;
        if (-1 != e.data.filterArray[s].current.indexOf(a)) {
            var o = e.data.filterArray[s].current.indexOf(a);
            e.data.filterArray[s].current.splice(o, 1);
            var i = e.data.filterArray[s].current;
            e.data.filterArray[s].current = i;
        } else e.data.filterArray[s].current.push(a);
        var r = e.data.filterArray;
        e.setData({
            filterArray: r
        });
        for (var n = [], l = 0; l < r.length; l++) if (r[l].current != []) for (c = 0; c < r[l].current.length; c++) n.push(r[l].current[c]);
        e.setData({
            filterAllArray: n
        });
        for (l = 0; l < e.data.selectList.length; l++) for (var c = 0; c < e.data.selectList[l].list.length; c++) -1 !== e.data.filterAllArray.indexOf(e.data.selectList[l].list[c].ValueID) ? e.data.selectList[l].list[c].selecting = !0 : e.data.selectList[l].list[c].selecting = !1;
        e.setData({
            selectList: e.data.selectList
        });
    },
    cancelActived: function(t) {
        for (var e = this, a = 0; a < e.data.selectList.length; a++) for (var s = 0; s < e.data.selectList[a].list.length; s++) e.data.selectList[a].list[s].selecting = !1;
        for (var o = 0; o < e.data.filterArray.length; o++) e.data.filterArray[o].current = [];
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
        for (var e = t.data.filterArray, a = ",", s = 0; s < e.length; s++) for (var o = 0; o < e[s].current.length; o++) "" == e[s].current[o] ? a += e[s].current[o] : a = a + e[s].current[o] + ",";
        t.setData({
            filterValueStr: a
        }), t.loadProduct(!0);
    },
    onSearchSubmit: function(t) {
        var e, o = s.trim(t.detail.value.keyword);
        if (o) {
            if (o) {
                try {
                    var i = this;
                    e = i.data.searchkey, i.setData({
                        onSearch: !1
                    }), wx.setStorageSync(e, o);
                } catch (t) {}
                wx.navigateTo({
                    url: "productlist?keyword=" + o
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
                    var o = this;
                    e = o.data.searchkey, wx.setStorageSync(e, s), o.setData({
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
                priceupflag: i,
                pricedownflag: !i,
                salesvolumeupflag: !0,
                salesvolumedownflag: !0,
                hitsupflag: !0
            }, t(a, "hitsupflag", !0), t(a, "sortcol", "SalesCount"), t(a, "sortItem", "SalesCount"), 
            t(a, "sort", "DESC"), a));
        } else if ("Price" === e.currentTarget.dataset.condition) {
            var o, i = this.data.priceupflag;
            i = !i, this.setData((o = {
                priceupflag: i,
                pricedownflag: !i,
                salesvolumeupflag: !0,
                salesvolumedownflag: !0,
                hitsupflag: !0
            }, t(o, "hitsupflag", !0), t(o, "sortcol", "Price"), t(o, "sortItem", "Price"), 
            t(o, "sort", i ? "DESC" : "ASC"), o));
        } else if ("RenQi" === e.currentTarget.dataset.condition) {
            var r, n = this.data.hitsupflag;
            n = !n, this.setData((r = {
                hitsupflag: n
            }, t(r, "hitsupflag", !n), t(r, "salesvolumeupflag", !0), t(r, "salesvolumedownflag", !0), 
            t(r, "priceupflag", !0), t(r, "pricedownflag", !0), t(r, "sortcol", "Hits"), t(r, "sort", "DESC"), 
            t(r, "sortItem", "Hits"), r));
        } else "MoRen" === e.currentTarget.dataset.condition && this.setData({
            priceupflag: !i,
            pricedownflag: !i,
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
        var s = e.data.recordcount, o = e.data.productlist.length;
        if (s > o) {
            var i = Math.ceil(o / e.data.pagesize) + 1, r = e.data.queryparams.keyword ? e.data.queryparams.keyword : "", n = e.data.queryparams.classid ? e.data.queryparams.classid : "0", l = "", c = e.data.filterValueStr;
            e.data.sortcol && (l = "&sortcol=" + e.data.sortcol + "&sort=" + e.data.sort);
            var u = "";
            e.data.queryparams.couponId && (u = "&couponItemId=" + e.data.queryparams.couponId), 
            a.sendRequest({
                url: "/index.php?c=Front/WxApp/JsonApi&a=getNewProductList&keyword=" + r + "&page=" + i + "&pagesize=" + e.data.pagesize + "&classid=" + n + l + "&filtervalue=" + c + u,
                method: "GET",
                success: function(t) {
                    if (e.isloading = !1, t.success) {
                        "IsNew" === t.Establish && e.setData({
                            timestaus: !1
                        });
                        for (var a = 0; a < t.productlist.length; a++) {
                            var s = t.productlist[a].ProDesc, o = t.productlist[a].SalesCount;
                            t.productlist[a].SalesCount = o > 1e4 ? parseInt(o / 1e4) + "万" : o, s = s.replace(/[\r\n]/g, ""), 
                            e.data.productlist.push(t.productlist[a]);
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
}), t(e, "onReachBottom", function() {
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