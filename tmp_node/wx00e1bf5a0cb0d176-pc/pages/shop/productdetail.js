var t = getApp(), a = (require("../../components/utils/imgutil.js"), require("../../components/utils/util.js")), e = require("ShopUtil.js"), i = require("../../common.js"), o = require("../../components/utils/qqmap-wx-jssdk.min.js"), s = require("../../components/wxb.js");

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
        activitySknorm: [],
        discountLimitedInfo: {},
        activityInter: null,
        limitAddAndJia: !1,
        activityTime: {
            day: "0",
            hour: "0",
            minute: "0",
            second: "0"
        },
        reminder: "授权提示",
        matter: "授权失败，请重新授权",
        abrogate: "暂时先不",
        permission: "允许",
        storeList: [],
        timeBuyLimit: 0,
        timeLimitActivity: !1,
        activitStore: !1,
        timeLimitStoreShowFlag: !1,
        fullPriceFlag: !1,
        fullIcon: "",
        showFullReductIcon: !1,
        fullBuyLimit: 0,
        freeFeightFlag: !1,
        fullGiftFlag: !1,
        minFreeFeight: "",
        fullReductionFlag: !1,
        fullReductActiveId: "",
        fullReductionInfo: {},
        fullReductTitle: "",
        backselectFlag: !1,
        currentTab: 0,
        LimitNumberData: null,
        LimitNumberDataList: null,
        bannerHeight: 150,
        hasPrice: !0,
        sellOutFlag: !1,
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
        buttonClicked: !1,
        videoshow: !1,
        baseUrl: t.globalData.siteBaseUrl,
        shareMarkFlag: !1,
        enableWxShare: !1,
        resultData: {},
        options: {},
        SiteLogo: "",
        nearbyStoreNumber: "",
        StoreSetting: "",
        skuData: [],
        isloadData: !1,
        phonelicense: !1,
        fork: !1
    },
    countTdown: function(t) {
        var a = this, e = t;
        clearInterval(a.data.activityInter), a.data.activityInter = setInterval(function() {
            if (--e < 0) return clearInterval(a.data.activityInter), void a.setData({
                timeLimitActivity: !1
            });
            var t = a.forMatterTime(e), i = t.days, o = t.hours, s = t.minutes, n = t.seconds;
            a.setData({
                activityTime: {
                    day: i,
                    hour: o,
                    minute: s,
                    second: n
                }
            });
        }, 1e3);
    },
    forMatterTime: function(t) {
        var a = parseInt(t / 60 / 60 / 24 % 24, 10), e = parseInt(t / 60 / 60 % 24, 10), i = parseInt(t / 60 % 60, 10), o = parseInt(t % 60, 10);
        return e = this.checkTime(e), i = this.checkTime(i), o = this.checkTime(o), {
            days: a,
            hours: e,
            minutes: i,
            seconds: o
        };
    },
    checkTime: function(t) {
        return t < 10 && (t = "0" + t), t;
    },
    timeLimitStoreShow: function() {
        this.setData({
            timeLimitStoreShowFlag: !0,
            scrviewFlag: !0
        });
    },
    onLoad: function(a) {
        var i = this, s = this;
        if ("1" === wx.getStorageSync("StoreSetting")) {
            var n = "&storeId=" + wx.getStorageSync("options").storeID + "&lng=" + wx.getStorageSync("lng") + "&lat=" + wx.getStorageSync("lat");
            t.sendRequest({
                url: "/index.php?c=Front/WxApp/ShopApi&a=getIndexStoreInfo" + n,
                method: "GET",
                success: function(t) {
                    t.success && i.setData({
                        SiteLogo: t.data.SiteLogo,
                        nearbyStoreNumber: t.data.nearbyStoreNumber
                    });
                }
            }), t.sendRequest({
                url: "/index.php?c=Front/WxApp/JsonApi&a=getStoreSetting",
                method: "GET",
                success: function(a) {
                    a.success ? (i.setData({
                        StoreSetting: a.StoreSetting
                    }), "1" === a.StoreSetting && t.sendRequest({
                        url: "/index.php?c=Front/WxApp/ShopApi&a=getTencentMapApiKey",
                        method: "GET",
                        success: function(t) {
                            t.success ? (wx.setStorageSync("StoreSetting", a.StoreSetting), wx.getSetting({
                                success: function(a) {
                                    if (a.authSetting["scope.userLocation"]) {
                                        if (a.authSetting["scope.userLocation"]) return;
                                        s.defaultAddress(s);
                                    } else wx.getLocation({
                                        type: "wgs84",
                                        success: function(a) {
                                            new o({
                                                key: t.data.key
                                            }).reverseGeocoder({
                                                location: {
                                                    latitude: Number(a.latitude),
                                                    longitude: Number(a.longitude)
                                                },
                                                success: function(t) {
                                                    s.setData({
                                                        resultData: t
                                                    }), wx.navigateTo({
                                                        url: "/pages/storechoose/storechoose/index?start_address=" + t.result.address + "&city=" + t.result.address_component.city + "&district=" + t.result.address_component.district + "&lat=" + t.result.location.lat + "&lng=" + t.result.location.lng
                                                    });
                                                }
                                            });
                                        },
                                        fail: function(t) {
                                            s.defaultAddress(s);
                                        }
                                    });
                                }
                            })) : wx.showModal({
                                title: "提示",
                                content: a.msg,
                                showCancel: !1
                            });
                        }
                    })) : wx.showModal({
                        title: "提示",
                        content: a.msg,
                        showCancel: !1
                    });
                }
            });
        }
        if (a.scene) {
            var r = {};
            decodeURIComponent(a.scene).split("&").map(function(t, a) {
                if (-1 !== t.indexOf("=")) {
                    var e = t.split("=");
                    r[e[0]] = e[1];
                }
                if (-1 !== t.indexOf("_")) {
                    var i = t.split("_");
                    r[i[0]] = i[1];
                }
            }), a = r;
        }
        t.registerGlobalFunctions(s), s.url = t.getPageUrl(s, a), this.setData({
            queryparams: a,
            scrviewFlag: !1,
            language: t.globalData.language,
            authorization: 1
        }), console.log(s.data.queryparams, "分享获取"), e.loadCouponList(!0, function(t) {
            t.list.forEach(function(t) {
                t.code = 1;
            }), s.setData({
                list: t.list
            });
        }), this.getHeight(), this.navigateBackFunc();
    },
    onShow: function() {
        t.doAfterUserInfoAuth({
            success: this.initData,
            fail: this.initData
        });
        var a = wx.getStorageSync("options");
        this.setData({
            options: a,
            limitAddAndJia: !1,
            nobileNodeStatus: t.globalData.getMobileNode
        });
    },
    navigateBackFunc: function(t) {
        var a = getCurrentPages(), e = a[a.length - 2];
        e && [ "pages/shop/productlist_tabbar", "pages/shop/productlist" ].includes(e.route) && e.setData({
            backInProDefault: !0
        });
    },
    defaultAddress: function() {
        var a = this, e = "113.315353";
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getIndexStoreList&lng=113.315353&lat=23.086800&type=2&keyword=&page=1&pagesize=20",
            method: "GET",
            success: function(i) {
                if (i.success) {
                    var s = i.data.list[0], n = {
                        start_address: s.ProvinceName + s.CityName + s.DistrictName + s.Address,
                        city: s.CityName,
                        district: s.DistrictName,
                        lat: s.Lantitude,
                        lng: s.Longtitude,
                        Name: s.Name,
                        distance: s.distance,
                        ProvinceName: s.ProvinceName,
                        storeID: s.Id
                    };
                    if (wx.getStorageSync("isFirstIn") && "1" === wx.getStorageSync("isFirstIn")) return;
                    wx.setStorageSync("isFirstIn", "1"), wx.setStorageSync("options", n), t.sendRequest({
                        url: "/index.php?c=Front/WxApp/ShopApi&a=getTencentMapApiKey",
                        method: "GET",
                        success: function(t) {
                            t.success && new o({
                                key: t.data.key
                            }).reverseGeocoder({
                                location: {
                                    latitude: Number("23.086800"),
                                    longitude: Number(e)
                                },
                                success: function(t) {
                                    a.setData({
                                        resultData: t
                                    }), wx.navigateTo({
                                        url: "/pages/storechoose/storechoose/index?start_address=" + t.result.address + "&city=" + t.result.address_component.city + "&district=" + t.result.address_component.district + "&lat=" + t.result.location.lat + "&lng=" + t.result.location.lng
                                    });
                                }
                            });
                        }
                    });
                } else wx.showModal({
                    title: "提示",
                    content: i.msg
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "提示",
                    content: t.msg
                });
            }
        });
    },
    initData: function() {
        var a = this, e = t.globalData.WebUserID || 0;
        a.setData({
            fromShare: a.data.queryparams.fromShare ? 1 : 0
        });
        var o = 0, s = getCurrentPages(), n = s[s.length - 1];
        a.data.queryparams.id && (o = a.data.queryparams.id);
        var r = t.globalData.getMobileNode ? t.globalData.getMobileNode.checkGoodsDetails : 0;
        0 === t.globalData.hasMobile && 0 !== e && 0 !== r && "1" === a.data.queryparams.fromShare && (2 === r ? wx.redirectTo({
            url: "/pages/phoneauthorization/index?getMobileNode=" + r + "&pageroute=" + n.route + "&id=" + o
        }) : a.setData({
            phonelicense: !0
        })), a.setData({
            authorization: 1
        }), i.initCommonModules(), a.loadCartNum(), a.loadProduct(), a.setData({
            selectedAttrNames: ""
        }), a.data.flag4 ? a.setData({
            scrviewFlag: !0
        }) : a.setData({
            scrviewFlag: !1
        });
    },
    getHeight: function() {
        this.setData({
            height: parseInt(wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth / 750)
        });
    },
    onPageScroll: function() {},
    goActiveList: function() {
        wx.navigateTo({
            url: "/pages/fullReduction/activityListPage?id=" + this.data.fullReductActiveId
        }), this.close();
    },
    goProductDetails: function(t) {
        var a = t.currentTarget.dataset.productid;
        wx.navigateTo({
            url: "productdetail?id=" + a
        }), this.close();
    },
    loadDiscountLimitedActive: function(a, e) {
        if (a && e) {
            var i = this;
            t.sendRequest({
                url: "/index.php?c=front/WxApp/LimitedDiscount&a=getActivityBaseInfoByProductId&ProductId=" + a + "&ActivityId=" + e,
                method: "GET",
                success: function(t) {
                    if (t.success) {
                        var a = t.activityStore.length > 0;
                        i.countTdown(t.activityBase.FinishTime - new Date().getTime() / 1e3), 1 == t.activityProduct.length && 0 == t.activityProduct[0].SkuId && i.setData({
                            timeBuyLimit: t.activityProduct[0].BuyLimit,
                            ProductQuantity: t.activityProduct[0].Quota
                        }), i.setData({
                            timeLimitActivity: !0,
                            discountLimitedInfo: t,
                            activitStore: a,
                            storeList: t.activityStore,
                            activitySknorm: t.activityProduct
                        });
                    } else console.log("load active info fail：" + t.msg);
                },
                fail: function(t) {
                    console.log("load active info fail");
                }
            }), t.sendRequest({
                url: "/index.php?c=front/WxApp/LimitedDiscount&a=calRemainPurchaseLimit&ProductId=" + a + "&ActivityId=" + e,
                method: "GET",
                success: function(t) {
                    t.success ? (t.data.forEach(function(t) {
                        t.buy_limit = Number(t.buy_limit);
                    }), i.setData({
                        LimitNumberData: 1 === t.data.length ? t.data[0] : null,
                        LimitNumberDataList: t.data
                    })) : console.log("load active info fail：" + t.msg);
                },
                fail: function(t) {
                    console.log("load active info fail");
                }
            });
        }
    },
    loadFullReductActive: function(a, e) {
        if (a && e) {
            var i = this;
            t.sendRequest({
                url: "/index.php?c=Front/WxApp/FullReduction&a=getActivityBaseInfoByProductId&ProductId=" + a + "&ActivityId=" + e,
                method: "GET",
                success: function(t) {
                    if (t.success) {
                        var a = t.activityDiscounts, e = "", o = "", s = [], n = !1, r = !1, u = !1;
                        if (a && a.length > 0) {
                            var c = [], l = [], d = [];
                            a.forEach(function(t) {
                                (t.DecreaseAmount || t.Discount) && c.push(t), t.DecreaseAmount || t.Discount || "0" == t.GiftType || l.push(t), 
                                t.DecreaseAmount || t.Discount || "0" != t.GiftType || "1" != t.EnableFreePostage || d.push(t);
                            }), c.length > 0 && c.sort(function(t, a) {
                                return t.Threshold - a.Threshold;
                            }), l.length > 0 && l.sort(function(t, a) {
                                return t.Threshold - a.Threshold;
                            }), d.length > 0 && d.sort(function(t, a) {
                                return t.Threshold - a.Threshold;
                            }), (a = [].concat(c, l, d)).forEach(function(t) {
                                t.Threshold = Number(t.Threshold), t.DecreaseAmount && (o = "满减", e += "满" + t.Threshold + "减" + Number(t.DecreaseAmount) + ",", 
                                u = !0), t.Discount && (o = "满减", e += "满" + t.Threshold + "元" + Number(t.Discount) / 10 + "折,", 
                                u = !0), "0" != t.GiftType && (r = !0), e || "0" == t.GiftType || (o = "满送", "2" == t.GiftType ? e += "满" + Number(t.Threshold) + "送精美礼品一份" : "1" == t.GiftType && (e += "满" + Number(t.Threshold) + "送优惠券一张")), 
                                "1" == t.EnableFreePostage && (n = !0, s.push(Number(t.Threshold))), e || "1" != t.EnableFreePostage || (o = "免邮", 
                                e += "满" + Number(t.Threshold) + "免邮");
                            }), t.activityDiscounts = a.sort(function(t, a) {
                                return t.Threshold - a.Threshold;
                            });
                        }
                        var g = Math.min.apply(Math, s), h = (o.length, e.length);
                        i.setData({
                            ProductQuantity: t.activityBase.Quota,
                            fullReductActiveId: t.activityBase.ID,
                            showFullReductIcon: u,
                            fullIcon: o,
                            fullReductionFlag: !0,
                            fullBuyLimit: t.activityBase.BuyLimit,
                            fullGiftFlag: r,
                            freeFeightFlag: n,
                            fullReductionInfo: t,
                            fullReductTitle: e.substring(0, u ? h - 1 : h),
                            minFreeFeight: g
                        });
                    } else console.log("load active info fail：" + t.msg);
                },
                fail: function(t) {
                    console.log("load active info fail");
                }
            });
        }
    },
    sliceString: function(t) {
        if (t += "") {
            var a = t.indexOf(".");
            return t.substring(0, a);
        }
    },
    loadProduct: function() {
        var e = this;
        if (!e.isloading) {
            e.isloading = !0;
            var i = 0;
            e.data.queryparams.id && (i = e.data.queryparams.id), t.sendRequest({
                url: "/index.php?c=Front/WxApp/JsonApi&a=getProductInfo&id=" + i + "&updateHits=1",
                method: "GET",
                success: function(i) {
                    if (e.isloading = !1, i.success) {
                        var o = wx.getStorageSync("businessCardInfo"), s = i.info.BigImages.split(",")[0];
                        if (o.admin) if (wx.getStorageSync("otherMemberCardId")) {
                            var n = {
                                tbUserID: t.globalData.WebUserID,
                                tbType: "18",
                                tbTypeID: i.info.ProductID,
                                tbTypeName: i.info.Name,
                                tbTypeImg: s,
                                tbBusinessCardID: wx.getStorageSync("otherMemberCardId")
                            };
                            t.buried(n, function(t) {});
                        } else {
                            var r = {
                                tbUserID: t.globalData.WebUserID,
                                tbType: "18",
                                tbTypeID: i.info.ProductID,
                                tbTypeName: i.info.Name,
                                tbTypeImg: s,
                                tbBusinessCardID: 0
                            };
                            t.buried(r, function(t) {});
                        } else {
                            var u = {
                                tbUserID: t.globalData.WebUserID,
                                tbType: "18",
                                tbTypeID: i.info.ProductID,
                                tbTypeName: i.info.Name,
                                tbTypeImg: s,
                                tbBusinessCardID: wx.getStorageSync("businessCardId") ? wx.getStorageSync("businessCardId") : 0
                            };
                            t.buried(u, function(t) {});
                        }
                        var c = i.info.ActicityType, l = [];
                        l = i.info && i.info.Skus2, c && (1 == c ? (e.loadFullReductActive(i.info.ProductID, i.info.ActivityId), 
                        l = i.info.Skus) : 2 == c && e.loadDiscountLimitedActive(i.info.ProductID, i.info.ActivityId));
                        for (var d = i.info.BigImages.split(","), g = 0; g < d.length; g++) d[g] = t.globalData.siteBaseUrl + "/comdata/" + i.info.SiteID + "/product/" + d[g];
                        0 == parseFloat(i.info.Price) && e.setData({
                            hasPrice: !1
                        }), 0 == parseFloat(i.info.FreightMoney) && (i.info.FreightMoney = "包邮"), i.info.Content = a.replaceRichHtml(i.info.Content || "") || "";
                        e.data.attrs;
                        for (var h = i.info.Skus2, f = null, g = 0; g < h.length; g++) f += parseInt(h[g].ProductQuantity);
                        0 == h.length ? e.setData({
                            ProductQuantity: i.info.ProductQuantity,
                            sellOutFlag: !Number(i.info.ProductQuantity)
                        }) : e.setData({
                            ProductQuantity: f,
                            sellOutFlag: !f
                        });
                        var m = i.info.ProDesc;
                        m = m.replace(/[\r\n]/g, ""), i.info.ProDesc = m;
                        var p = i.info.Content.replace(/\<p/gi, '<p style="margin:0" ');
                        p = (p = p.replace(/&nbsp;/gi, "")).replace(/\<div style="width:100%;">\<\/div>/gi, '<div style="width:100%; height:4px;"></div>');
                        var D = i.info.Attrs, y = [];
                        1 === D.length && (l.forEach(function(t) {
                            if ("0" == t.ProductQuantity) {
                                var a = (t.Path && t.Path.split(","))[1], e = D[0].AttrVals.find(function(t) {
                                    return t.AttrValID == a;
                                });
                                e && y.push(e);
                            }
                        }), e.setData({
                            noQuantityList: y
                        })), e.setData({
                            productInfo: i.info,
                            skuData: l,
                            deContent: p,
                            productImgs: d,
                            PriceShow: e.data.fullPriceFlag ? i.info.OriginalPrice : i.info.Price,
                            attrs: i.info.Attrs,
                            proImg: d[0],
                            collection: 1 == i.info.collection,
                            enableWxShare: "1" === i.enableWxShare,
                            isloadData: !0
                        });
                        var b = i.info.Attrs, v = {}, I = 1 === l.length && b && b.length;
                        I && b.forEach(function(t) {
                            var a = t.AttrVals[0];
                            v[a.AttrKeyID] = a.AttrValID;
                        }), e.setData({
                            selectedAttrs: v
                        }), I && e.getCurrentSkuData();
                    } else ;
                },
                fail: function(t) {
                    e.isloading = !1;
                }
            });
        }
    },
    getCurrentSkuData: function() {
        var a = this.data.selectedAttrs, e = [];
        for (var i in a) {
            var o = this.findAttrValItemById(a[i]);
            if (o.AttrValBigImg) {
                var s = t.globalData.siteBaseUrl + o.AttrValBigImg;
                this.setData({
                    attrImg: s
                });
            }
            e.push(o.AttrValName);
        }
        this.setData({
            selectedAttrNames: e.join(" ; ")
        });
        var n = t.analyseProductSkusPrice(this.data.skuData, a);
        this.setData({
            SkuID: n.skuid,
            timeBuyLimit: 0
        });
        var r = this.data.activitySknorm, u = !1, c = null;
        if (r.length >= 1) {
            for (var l = 0; l < r.length; l++) r[l].SkuId == n.skuid && (n.price = r[l].DiscountedPrice, 
            n.productQuantity = r[l].Quota, this.setData({
                timeBuyLimit: r[l].BuyLimit
            }));
            var d = (this.data.LimitNumberDataList || []).find(function(t) {
                return t.SkuId === n.skuid;
            });
            d && (c = d, u = !0);
        }
        if (this.data.fullReductionFlag) {
            var g = Number(this.data.fullReductionInfo.activityBase.Quota);
            n.productQuantity = g > n.productQuantity ? n.productQuantity : g;
        }
        this.setData({
            PriceShow2: n.price.toString(),
            LimitNumberData: c,
            timeLimitActivity: u,
            ProductQuantity: n.productQuantity
        });
    },
    loadCartNum: function() {
        var a = this;
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopCart&a=getCartNum",
            method: "GET",
            success: function(t) {
                a.isloading = !1, t.success ? a.setData({
                    cartnum: t.data.num
                }) : console.log("loadCartNum fail：" + t.msg);
            },
            fail: function(t) {
                a.isloading = !1, console.log("loadCartNum fail");
            }
        });
    },
    getCoupon: function(a) {
        var e = this;
        e.setData({
            buttonClicked: !0,
            licensecouponid: a.currentTarget.dataset.couponid
        });
        var i = wx.getStorageSync("hasMobile") || 0, o = t.globalData.getMobileNode ? t.globalData.getMobileNode.getCoupons : 0;
        0 === t.globalData.hasMobile && 0 === i && 0 !== o ? this.setData({
            phonelicense: !0,
            characteristic: 1
        }) : e.couponCollection(), setTimeout(function() {
            e.setData({
                buttonClicked: !1
            });
        }, 500);
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
        var o = this.data.attrs, s = this.data.selectedAttrs;
        s[a] = e, s || (s = {});
        var n = [];
        for (var r in s) n.push(s[r]);
        if (n.length >= o.length - 1) {
            var u = t.cloneObj(n);
            u.length >= o.length && (u.sort(), u.pop());
            var c = this.getNoQuantityAttrList(this.data.skuData, u);
            for (var i in c) a != c[i].AttrKeyID && s[c[i].AttrKeyID] == c[i].AttrValID && (delete s[c[i].AttrKeyID], 
            n.pop());
            1 != o.length && this.setData({
                noQuantityList: c
            });
        }
        this.setData({
            selectedAttrs: s
        }), n.length >= o.length && this.getCurrentSkuData();
    },
    onAttrChange: function(t) {
        var a = t.currentTarget.dataset.attrkeyid, e = t.currentTarget.dataset.attrvalid;
        this.doAttrChange(a, e);
    },
    getNoQuantityAttrList: function(t, a) {
        var e = [];
        for (var i in a) e.push(a[i]);
        var o = e.join(",");
        o = (o = o.replace(/(^,)|(,$)/g, "")).split(",").sort().join(",");
        for (var s = [], n = 0; n < t.length; n++) {
            var r = t[n].Path.replace(/(^,)|(,$)/g, "").split(",").sort().join(","), u = new RegExp("(," + o + ")$"), c = new RegExp("^(" + o + ",)");
            if ((u.test(r) || c.test(r)) && "0" == t[n].ProductQuantity) {
                var l = r.split(","), d = l[l.length - 1], g = this.findAttrValItemById(d);
                s.push(g);
            }
        }
        return s;
    },
    onBannerImgLoad: function(t) {
        this.setData({
            bannerHeight: wx.getSystemInfoSync().windowWidth
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
    addToCartContent: function(a) {
        var e = this, i = wx.getStorageSync("hasMobile") || 0, o = t.globalData.getMobileNode ? t.globalData.getMobileNode.goodsInShopCart : 0;
        0 === t.globalData.hasMobile && 0 === i && 0 !== o ? this.setData({
            phonelicense: !0,
            characteristic: 2
        }) : e.addToCart();
    },
    addToCart: function() {
        var a = this;
        if (this.data.getPageFlag) {
            if (this.setData({
                getPageFlag: !1
            }), 0 == a.data.ProductQuantity) return wx.showToast({
                title: "库存不足",
                image: "../../images/choose-type_21.png",
                duration: 1e3
            }), void this.setData({
                getPageFlag: !0
            });
            var i = a.data.LimitNumberData;
            if (a.data.timeLimitActivity && i && i.buy_limit == i.count && 0 != i.buy_limit) return wx.showToast({
                title: "已达到最大购买量",
                icon: "none",
                duration: 2e3
            }), void this.setData({
                getPageFlag: !0
            });
            if (this.data.productInfo.Attrs.length && !this.data.SkuID) return wx.showToast({
                title: "请选择规格",
                icon: "none",
                duration: 2e3
            }), void this.setData({
                getPageFlag: !0
            });
            var o = a.data.cartnum, s = {};
            this.data.productInfo && this.data.productInfo.ActivityId && (s = {
                act_id: this.data.productInfo.ActivityId
            }), e.addToShopCart({
                product_id: this.data.productInfo.ProductID,
                num: this.data.count,
                sku_id: this.data.SkuID,
                source: this.data.timeLimitActivity ? 3 : this.data.fullReductionFlag ? 2 : 1,
                extra: JSON.stringify(s)
            }, function(e) {
                if (e) {
                    a.isbuying = !1, setTimeout(function() {
                        wx.showToast({
                            title: "加入成功",
                            image: "../../images/shopcart.png",
                            duration: 2e3
                        }), a.setData({
                            flag2: !1,
                            flag: !1,
                            scrviewFlag: !1
                        });
                        var e = a.data.productInfo, i = e.BigImages.split(",")[0];
                        if (wx.getStorageSync("businessCardInfo").admin) if (wx.getStorageSync("otherMemberCardId")) {
                            var o = {
                                tbUserID: t.globalData.WebUserID,
                                tbType: "20",
                                tbTypeID: e.ProductID,
                                tbTypeName: e.Name,
                                tbTypeImg: i,
                                tbBusinessCardID: wx.getStorageSync("otherMemberCardId")
                            };
                            t.buried(o, function(t) {});
                        } else {
                            var s = {
                                tbUserID: t.globalData.WebUserID,
                                tbType: "20",
                                tbTypeID: e.ProductID,
                                tbTypeName: e.Name,
                                tbTypeImg: i,
                                tbBusinessCardID: 0
                            };
                            t.buried(s, function(t) {});
                        } else {
                            var n = {
                                tbUserID: t.globalData.WebUserID,
                                tbType: "20",
                                tbTypeID: e.ProductID,
                                tbTypeName: e.Name,
                                tbTypeImg: i,
                                tbBusinessCardID: wx.getStorageSync("businessCardId") ? wx.getStorageSync("businessCardId") : 0
                            };
                            t.buried(n, function(t) {});
                        }
                    }, 500), setTimeout(function() {
                        a.setData({
                            getPageFlag: !0
                        });
                    }, 600);
                    var s = a.data;
                    if (o += s.count, s.timeLimitActivity && i) return i.count = s.count + (Number(i.count) || 0), 
                    0 != i.buy_limit && (i.daily_remain_buy_limit -= s.count), s.SkuID && (s.LimitNumberDataList.forEach(function(t) {
                        t.SkuId == s.SkuID && (t.daily_remain_buy_limit -= s.count, t.count = s.count + (Number(i.count) || 0));
                    }), s.activitySknorm.forEach(function(t) {
                        t.SkuId == s.SkuID && (t.Quota -= s.count);
                    }), a.setData({
                        LimitNumberDataList: s.LimitNumberDataList,
                        activitySknorm: s.activitySknorm
                    })), void a.setData({
                        cartnum: o,
                        LimitNumberData: i
                    });
                    a.setData({
                        cartnum: o
                    });
                }
            }, function(t) {
                t.success || (a.setData({
                    getPageFlag: !0
                }), t.msg.indexOf("已达到最大购买量") > -1 && a.setData({
                    limitAddAndJia: !0
                }));
            });
        }
    },
    getPhoneNumber: function(a) {
        var e = this, i = t.globalData.getMobileNode, o = i.checkGoodsDetails;
        if (o = 1 === e.data.characteristic ? i.getCoupons : 2 === e.data.characteristic ? i.goodsInShopCart : 4 === e.data.characteristic ? i.enterShopCart : i.checkGoodsDetails, 
        a.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
            var n = t.globalData.appId, r = t.globalData.session_key, u = new s(n, r).decryptData(a.detail.encryptedData, a.detail.iv);
            t.loadphoneInfo(u.phoneNumber), 2 === e.data.licensecouponid ? e.addToCart() : 4 === e.data.licensecouponid ? wx.navigateTo({
                url: "shopcart?one=1"
            }) : 1 === characteristic && e.couponCollection();
        } else e.setData({
            authorization: 2
        }), 2 === o ? e.setData({
            allowspopup: !0
        }) : 2 === e.data.characteristic ? e.addToCart() : 4 === e.data.characteristic ? wx.navigateTo({
            url: "shopcart?one=1"
        }) : 1 === e.data.characteristic && e.couponCollection();
    },
    abolish: function() {
        this.setData({
            allowspopup: !1
        });
    },
    turnOff: function() {
        t.turnOff();
    },
    preventD: function() {},
    couponCollection: function() {
        var t = this;
        e.getCoupon(t.data.licensecouponid, function(a) {
            t.setData({
                statusCode: a.result.Code,
                CouponId: a.result.CouponItem.CouponID
            }), wx.showToast({
                icon: "success",
                title: "领取成功"
            }), t.data.couponlist.forEach(function(a) {
                t.data.CouponId === a.CouponID && (a.code = t.data.statusCode);
            }), t.setData({
                couponlist: t.data.couponlist
            });
        });
    },
    navbarTap: function(t) {
        this.setData({
            currentTab: t.currentTarget.dataset.idx
        });
    },
    buyNow: function() {
        var t = this;
        if (this.data.count > this.data.productInfo.BuyLimit && "0" !== this.data.productInfo.BuyLimit) wx.showToast({
            title: "只能限买" + this.data.productInfo.BuyLimit + "件",
            image: "../../images/choose-type_21.png",
            duration: 1e3
        }); else {
            var a = this;
            if (this.data.getPageFlag) {
                this.setData({
                    getPageFlag: !1
                }), setTimeout(function() {
                    a.setData({
                        scrviewFlag: !1
                    });
                }, 500);
                var i = a.data.LimitNumberData;
                if (a.data.timeLimitActivity && i && i.buy_limit == i.count && 0 != i.buy_limit) return wx.showToast({
                    title: "已达到最大购买量",
                    icon: "none",
                    duration: 2e3
                }), void this.setData({
                    getPageFlag: !0
                });
                a.data.productInfo.Skus.length > 0 ? void 0 == this.data.SkuID || 0 == this.data.SkuID ? (setTimeout(function() {
                    wx.showToast({
                        title: "请选择规格",
                        image: "../../images/choose-type_21.png",
                        duration: 1e3
                    });
                }, 500), a.setData({
                    getPageFlag: !0
                })) : a.data.productInfo.Skus.forEach(function(i) {
                    i.SkuID == t.data.SkuID && ("0" == i.ProductQuantity ? (setTimeout(function() {
                        a.setData({
                            getPageFlag: !0
                        });
                    }, 100), wx.showToast({
                        title: "库存不足",
                        image: "../../images/choose-type_21.png",
                        duration: 1e3
                    })) : e.addProcuctToCart(t.data.productInfo.ProductID, t.data.SkuID, t.data.count, 1, function(t) {
                        a.setData({
                            flag2: !1,
                            flag: !1,
                            flag3: !1
                        }), wx.navigateTo({
                            url: "square?pkeys=" + t.pkey + "&storeId=" + wx.getStorageSync("options").storeID,
                            success: function() {
                                setTimeout(function() {
                                    a.setData({
                                        getPageFlag: !0
                                    });
                                }, 100);
                            }
                        });
                    }, function(t) {
                        t.success || a.setData({
                            getPageFlag: !0
                        });
                    }));
                }) : 0 == a.data.ProductQuantity ? (setTimeout(function() {
                    wx.showToast({
                        title: "库存不足",
                        image: "../../images/choose-type_21.png",
                        duration: 1e3
                    });
                }, 500), a.setData({
                    getPageFlag: !0
                })) : e.addProcuctToCart(this.data.productInfo.ProductID, this.data.SkuID, this.data.count, 1, function(t) {
                    a.setData({
                        flag2: !1,
                        flag: !1,
                        flag3: !1
                    }), wx.navigateTo({
                        url: "square?pkeys=" + t.pkey + "&storeId=" + wx.getStorageSync("options").storeID,
                        success: function() {
                            setTimeout(function() {
                                a.setData({
                                    getPageFlag: !0
                                });
                            }, 100);
                        }
                    });
                }, function(t) {
                    t.success || a.setData({
                        getPageFlag: !0
                    });
                });
            }
        }
    },
    decrease: function() {
        var t = this.data;
        if (t.flag2 && t.limitAddAndJia) wx.showToast({
            title: "已达到最大购买量",
            icon: "none",
            duration: 2e3
        }); else {
            var a = this.data.count;
            if (1 != a) {
                a > 1 && (a--, this.setData({
                    canNoClick: ""
                }));
                var e = a <= 1 ? "disabled" : "normal";
                this.setData({
                    count: a,
                    minusStatus: e
                });
            } else wx.showToast({
                title: "商品已经不能再减了",
                icon: "none",
                duration: 2e3
            });
        }
    },
    increase: function() {
        var t = this.data;
        if (t.flag2 && t.limitAddAndJia || t.LimitNumberData && t.LimitNumberData.buy_limit > 0 && (t.flag2 && 0 == t.LimitNumberData.daily_remain_buy_limit || t.LimitNumberData.daily_remain_buy_limit == t.count)) return wx.showToast({
            title: "已达到最大购买量",
            icon: "none",
            duration: 2e3
        }), void this.setData({
            canNoClick: "disabled"
        });
        t.selectedAttrs;
        var a = e <= 1 ? "disabled" : "normal", e = t.count, i = t.ProductQuantity, o = t.productInfo.BuyLimit <= 0 ? i + 1 : t.productInfo.BuyLimit, s = o > i ? i : o;
        t.fullReductionFlag && 0 != t.fullBuyLimit && (o = t.fullBuyLimit, s = t.fullBuyLimit), 
        t.LimitNumberData && t.LimitNumberData.daily_remain_buy_limit > 0 && t.LimitNumberData.buy_limit > 0 && (o = t.LimitNumberData.daily_remain_buy_limit, 
        s = this.data.LimitNumberData.daily_remain_buy_limit), this.data.attrs.length > 0 ? this.data.SkuID ? ~~e < ~~s ? (~~++e == ~~s && this.setData({
            canNoClick: "disabled"
        }), this.setData({
            count: e,
            minusStatus: a
        })) : (this.setData({
            count: e,
            canNoClick: "disabled"
        }), wx.showToast({
            title: "已达到最大购买量",
            icon: "none",
            duration: 2e3
        })) : wx.showModal({
            title: "提示",
            content: "请选择规格",
            showCancel: !1
        }) : ~~e < ~~s ? (++e == s && this.setData({
            canNoClick: "disabled"
        }), this.setData({
            count: e,
            minusStatus: a
        })) : this.setData({
            canNoClick: "disabled"
        });
    },
    blurManual: function(t) {
        var a = this.data, e = t.detail.value;
        if (a.limitAddAndJia) wx.showToast({
            title: "已达到最大购买量",
            icon: "none",
            duration: 2e3
        }); else if (e > 1) {
            if (a.LimitNumberData && a.LimitNumberData.daily_remain_buy_limit > 0 && a.LimitNumberData.buy_limit > 0 && a.LimitNumberData.daily_remain_buy_limit <= e) return this.setData({
                count: a.LimitNumberData.daily_remain_buy_limit,
                canNoClick: "disabled",
                minusStatus: a.LimitNumberData.daily_remain_buy_limit > 1 ? "normal" : "disabled"
            }), void wx.showToast({
                title: "已达到最大购买量",
                icon: "none",
                duration: 2e3
            });
            e > Number(a.ProductQuantity) ? (this.setData({
                count: a.ProductQuantity,
                canNoClick: "disabled",
                minusStatus: "normal"
            }), wx.showToast({
                title: "已达到最大购买量",
                icon: "none",
                duration: 2e3
            })) : this.setData({
                count: e,
                canNoClick: "",
                minusStatus: "normal"
            });
        } else e < 2 && this.setData({
            count: 1,
            canNoClick: "",
            minusStatus: "disabled"
        });
    },
    bindManual: function(t) {
        if (this.data.limitAddAndJia) return wx.showToast({
            title: "已达到最大购买量",
            icon: "none",
            duration: 2e3
        }), void this.setData({
            count: 1
        });
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
            scrviewFlag: !1,
            shareMarkFlag: !1,
            fullReductFlag: !1,
            timeLimitStoreShowFlag: !1
        });
    },
    fullreduct: function() {
        this.setData({
            fullReductFlag: !0,
            scrviewFlag: !0
        });
    },
    discount: function() {
        this.setData({
            flag4: !0,
            scrviewFlag: !0
        });
    },
    addToshopCart: function() {
        if (this.data.isloadData) {
            var t = this.data;
            if (!t.sellOutFlag) {
                var a = t.LimitNumberData && t.LimitNumberData.daily_remain_buy_limit > 1 && t.LimitNumberData.buy_limit > 0 || t.ProductQuantity > 1;
                this.setData({
                    flag: !0,
                    flag2: !0,
                    scrviewFlag: !0,
                    count: 1,
                    minusStatus: "disabled",
                    canNoClick: a ? "normal" : "disabled"
                });
            }
        }
    },
    shopCart: function(a) {
        var e = this, i = wx.getStorageSync("hasMobile") || 0, o = e.data.nobileNodeStatus ? t.globalData.getMobileNode.enterShopCart : 0;
        0 === t.globalData.hasMobile && 0 === i && 0 !== o ? this.setData({
            phonelicense: !0,
            characteristic: 4
        }) : wx.navigateTo({
            url: "shopcart?one=1"
        });
    },
    AddCollection: function(t) {
        var a = this;
        if (this.data.isloadData && this.data.getPageFlag) {
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
    videobofang: function() {
        this.setData({
            videoshow: !0
        });
    },
    videoguanbi: function() {
        this.setData({
            videoshow: !1
        });
    },
    buyNow2: function() {
        if (this.data.isloadData) {
            var t = this.data;
            if (!t.sellOutFlag) {
                var a = t.LimitNumberData && t.LimitNumberData.daily_remain_buy_limit > 1 && t.LimitNumberData.buy_limit > 0 || t.ProductQuantity > 1;
                this.setData({
                    flag: !0,
                    flag3: !0,
                    scrviewFlag: !0,
                    count: 1,
                    minusStatus: "disabled",
                    canNoClick: a ? "normal" : "disabled"
                });
            }
        }
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
        var t = this;
        this.setData({
            shareMarkFlag: !1
        });
        var a = t.data.productInfo.BigImages.split(",");
        wx.navigateTo({
            url: "./poster?productId=" + t.data.productInfo.ProductID + "&name=" + t.data.productInfo.Name + "&price=" + t.data.productInfo.Price + "&productImg=" + a[0] + "&SiteID=" + t.data.productInfo.SiteID + "&proType=0"
        });
    },
    toposition: function() {
        wx.openLocation({
            name: this.data.options.Name,
            address: this.data.options.start_address,
            longitude: Number(this.data.options.lng),
            latitude: Number(this.data.options.lat)
        });
    },
    tochooseStorePage: function() {
        var t = this.data.resultData ? wx.getStorageSync("resultData") : this.data.resultData;
        wx.navigateTo({
            url: "/pages/storechoose/storechoose/index?start_address=" + t.result.address + "&city=" + t.result.address_component.city + "&district=" + t.result.address_component.district + "&lat=" + t.result.location.lat + "&lng=" + t.result.location.lng + "&byproductdetail=1"
        });
    }
});