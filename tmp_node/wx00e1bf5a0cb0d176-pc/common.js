function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, n = getApp(), i = null, s = null, r = null, l = null, u = require("components/wxb.js"), c = {
    registerGlobalVar: function(t, e) {
        this[t] = e;
    },
    loadPageModules: function(t) {
        var e = this;
        t.refresh && e.clearInterval();
        var a = getCurrentPages()[getCurrentPages().length - 1], o = "HomeIndex";
        t.page && (o = t.page);
        var i = a.route.match(/(CustomPage_\d+)_tabbar/i);
        i && i.length > 1 && (o = i[1]);
        var s = decodeURIComponent(t.scene || ""), r = s.match(/sharepage=(CustomPage_\d+)/i);
        r && r.length > 1 && (o = r[1]), console.log("page:" + o, "scene:" + s), n.sendRequest({
            url: "/index.php?c=front/WxApp/PageApi&a=getPageModules&publish=1&sortcol=ShowOrder&page=" + o + "&justCache=" + e.getConfig().ModuleDataJustFromCache,
            method: "POST",
            success: function(t) {
                if (t.success) try {
                    t.appinfo && "shop" === t.appinfo.Industry ? wx.setStorageSync("Industryshop", !0) : wx.setStorageSync("Industryshop", !1), 
                    wx.setStorageSync("StoreSetting", t.appinfo.StoreSetting), t.modules.forEach(function(t) {
                        t.CouponList && t.CouponList.forEach(function(t) {
                            if (t.beginTime = t.BeginTime.split(" ")[0].split("-").join("."), 0 == t.Type ? t.Amount = (t.Amount / 10).toString().replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, "") : t.Amount = t.Amount.replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, ""), 
                            "0" === t.EndTimeType) {
                                var e = t.TimeLimit.split(" ")[1].split(":")[0] + ":" + t.TimeLimit.split(" ")[1].split(":")[1];
                                t.timeLimit = t.TimeLimit.split(" ")[0].split("-").join(".") + " " + e;
                            } else t.timeLimit = t.TimeLimit;
                        }), "ModuleServiceList" === t.ModuleType && t.ProList && t.ProList.length > 0 && t.ProList.forEach(function(t) {
                            for (var e = t.ImgUrl.split("/"), a = 0; a < e.length; a++) /product/.test(e[a]) && (t.ImgUrl = "/comdata/" + n.globalData.siteId + "/product/" + e[e.length - 1]);
                        });
                    }), a.setData({
                        modules: t.modules
                    }), t.pageTitle && !/homeindex/i.test(o) && (wx.setNavigationBarTitle({
                        title: t.pageTitle
                    }), a.setData({
                        pageTitle: t.pageTitle,
                        url: a.route + (a.options.id ? "?id=" + a.options.id : "")
                    })), e.setFloatLayerInfo(t.appinfo.FloatLayerSetting), e.setCopyrightInfo(t.appinfo.CopyrightSetting), 
                    e.CACHEKEY = t.cachekey, e.clearInterval(), e.getPurchaseLimit();
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    var i = t.toString();
                    wx.showModal({
                        title: "提示",
                        showCancel: !1,
                        content: i
                    });
                } else console.log("getPageModules fail：" + t.msg);
            },
            options: t,
            fail: function(t) {
                console.log("getPageModules fail");
            }
        });
    },
    clearInterval: function(t) {
        function e() {
            return t.apply(this, arguments);
        }
        return e.toString = function() {
            return t.toString();
        }, e;
    }(function() {
        clearInterval(i), clearInterval(s), clearInterval(r), clearInterval(l);
    }),
    getPurchaseLimit: function() {
        var t = this, e = getCurrentPages()[getCurrentPages().length - 1], a = !0;
        i = setInterval(function() {
            var a = e.data.modules;
            try {
                for (var o = 0; o < a.length; ++o) if ("ModuleSecKill" === a[o].ModuleType) {
                    var n = a[o].ActivityInfo, s = n.remainingTime;
                    0 == --s && (t.loadPageModules(!0), clearInterval(i));
                    var r = t.forMatterTime(s), l = r.hours, u = r.minutes, c = r.seconds;
                    n.remainingTime = s, n.remainingTimeHours = l, n.remainingTimeMinutes = u, n.remainingTimeSeconds = c, 
                    a[o].ActivityInfo = n, t.setModuleData(a[o].ModuleID, a[o]);
                }
            } catch (t) {}
        }, 1e3), s = setInterval(function() {
            var a = e.data.modules;
            try {
                for (var o = 0; o < a.length; ++o) if ("ModuleSecKill" === a[o].ModuleType) {
                    var n = a[o].ActivityInfo, s = n.morningInterval;
                    0 == --s && (t.loadPageModules(!0), clearInterval(i)), n.morningInterval = s, a[o].ActivityInfo = n, 
                    t.setModuleData(a[o].ModuleID, a[o]);
                }
            } catch (t) {}
        }, 1e3), r = setInterval(function() {
            var o = e.data.modules;
            try {
                for (var n = 0; n < o.length; ++n) if ("ModuleFullReduction" === o[n].ModuleType) {
                    var i = o[n].ActivityBase, s = i.activityTime;
                    if (s > 0 && (a = !1), --s <= 0) {
                        i.activityTime = "0", i.activityDay = "0", i.activityHour = "0", i.activityMinute = "0", 
                        i.activitySecond = "0", o[n].ActivityBase = i, t.setModuleData(o[n].ModuleID, o[n]);
                        continue;
                    }
                    var l = t.forMatterTime(s), u = l.days, c = l.hours, d = l.minutes, g = l.seconds;
                    i.activityTime = s, i.activityDay = u, i.activityHour = c, i.activityMinute = d, 
                    i.activitySecond = g, o[n].ActivityBase = i, t.setModuleData(o[n].ModuleID, o[n]);
                }
                a && clearInterval(r), a = !0;
            } catch (t) {}
        }, 1e3), l = setInterval(function() {
            var a = e.data.modules;
            try {
                for (var o = 0; o < a.length; ++o) if ("ModuleBargain" === a[o].ModuleType) {
                    var n = a[o].ActivityBase, i = n.activityTime;
                    if (--i <= 0) {
                        n.activityTime = "0", n.activityDay = "0", n.activityHour = "0", n.activityMinute = "0", 
                        n.activitySecond = "0", a[o].ActivityBase = n, t.setModuleData(a[o].ModuleID, a[o]), 
                        clearInterval(l);
                        continue;
                    }
                    var s = t.forMatterTime(i), r = s.days, u = s.hours, c = s.minutes, d = s.seconds;
                    n.activityTime = i, n.activityDay = r, n.activityHour = u, n.activityMinute = c, 
                    n.activitySecond = d, a[o].ActivityBase = n, t.setModuleData(a[o].ModuleID, a[o]);
                }
            } catch (t) {}
        }, 1e3);
    },
    registerGlobalFunc: function() {
        var t = getCurrentPages()[getCurrentPages().length - 1], e = this, a = function() {
            var e = {}, a = getApp().globalData;
            e.customformvalues = t.data.globaldata && t.data.globaldata.customformvalues ? t.data.globaldata.customformvalues : {}, 
            e.appGlobalData = a, e.sysInfo = wx.getSystemInfoSync(), e.Industry = a.baseInfo && a.baseInfo.Industry, 
            e.cityName = wx.getStorageSync("cityName"), e.StoreSetting = wx.getStorageSync("StoreSetting"), 
            e.geoAuthFlag = a.geoAuthFlag, e.store = "", t.setData({
                globaldata: e
            });
        };
        a(), setTimeout(function() {
            a();
        }, 500), t.shareAppMessage = function(t) {
            e.shareAppMessage(t);
        }, t.getPageUrl = function(t, a) {
            e.getPageUrl(t, a);
        }, t.navTo = function(a) {
            var o = a.currentTarget.dataset.linktype, n = a.currentTarget.dataset.linkid, i = a.currentTarget.dataset.linknorepeat;
            if ("string" == typeof i && "1" == i) {
                if (1 == t.data.navGoIng) return;
                t.data.navGoIng = !0, setTimeout(function() {
                    t.data.navGoIng = !1;
                }, 500);
            }
            var s = [], r = a.currentTarget.dataset.linkdata;
            if ("string" == typeof r) try {
                if (r = JSON.parse(r)) for (var l in r) {
                    var u = r[l];
                    "string" != typeof u && "number" != typeof u || (s[l] = u);
                }
            } catch (t) {}
            e.navTo(o, n, s);
        }, t.M_doSearch = function(a) {
            e.doSearch(a, t);
        }, t.M_goSearch = function(t) {
            wx.navigateTo({
                url: "/pages/shop/searchPage"
            });
        }, t.M_onSearchInput = function(t) {}, t.M_onSearchInputFocus = function(t) {
            var a = t.currentTarget.dataset.moduleid;
            e.setModuleData(a, {
                HidePlaceHolder: 1
            });
        }, t.openSettingFn = function(t) {
            var e = wx.getStorageSync("resultData");
            wx.navigateTo({
                url: "/pages/storechoose/storechoose/index?start_address=" + e.result.address + "&city=" + e.result.address_component.city + "&district=" + e.result.address_component.district + "&lat=" + e.result.location.lat + "&lng=" + e.result.location.lng
            });
        }, t.M_onSearchInputBlur = function(a) {
            e.onSearchInput(a, t);
        }, t.M_slideImgLoad = function(a) {
            e.slideImgLoad(a, t);
        }, t.M_getCoupon = function(a) {
            e.getCoupon(a, t);
        }, t.onChooseImg = function(a) {
            e.onChooseImg(a, t);
        }, t.onCustomFormSubmit = function(a) {
            e.onCustomFormSubmit(a, t);
        }, t.onCustomFormSelectChange = function(a) {
            e.onCustomFormSelectChange(a, t);
        }, t.onCustomFormDateChange = function(a) {
            e.onCustomFormDateChange(a, t);
        }, t.onCustomFormTimeChange = function(a) {
            e.onCustomFormTimeChange(a, t);
        }, t.onCustomFormDateTap = function(a) {
            e.onCustomFormDateTap(a, t);
        }, t.onCustomFormDateTimeChange = function(a) {
            e.onCustomFormDateTimeChange(a, t);
        }, t.onCustomFormDateTimeClear = function(a) {
            e.onCustomFormDateTimeClear(a, t);
        }, t.onCustomRegionChange = function(a) {
            e.onCustomRegionChange(a, t);
        }, t.onCustomFormTextInputChange = function(a) {
            e.onCustomFormTextInputChange(a, t);
        }, t.onCustomFormCheckboxChange = function(a) {
            e.onCustomFormCheckboxChange(a, t);
        }, t.onCustomFormRadioChange = function(a) {
            e.onCustomFormRadioChange(a, t);
        }, t.onClickMap = function(t) {
            return e.getLocation(t.currentTarget.dataset.lat, t.currentTarget.dataset.lng, t.currentTarget.dataset.title, t.currentTarget.dataset.addr), 
            !1;
        }, t.ImgchangeVideo = function(t) {
            e.setModuleData(t.currentTarget.dataset.moduleid, {
                WxappShow: !1
            });
        }, t.appPhoneCall = function(t) {
            getApp().phoneCall();
        }, this.setCopyrightInfo();
    },
    initCommonModules: function() {
        this.setCopyrightInfo(), this.setFloatLayerInfo();
    },
    setCopyrightInfo: function(t) {
        var e = this;
        if (!t) {
            var a = getApp();
            a.globalData && Object.keys(a.globalData.baseInfo).length > 0 ? (t = a.globalData.baseInfo.CopyrightSetting, 
            e.setCopyrightInfoToPage(t)) : setTimeout(function() {
                e.setCopyrightInfo(t);
            }, 200);
        }
    },
    setCopyrightInfoToPage: function(t) {
        var e = {};
        try {
            e = JSON.parse(t) || {};
        } catch (t) {}
        var a = "", o = "";
        1 == e.Enable && (o += "container-copyright", 1 == e.ShowIcon ? 1 == e.DisplayType ? (a += " leftRight", 
        o += " container-copyright-leftRight") : (a += " topBottom", o += " container-copyright-topBottom") : (a += " noIcon", 
        o += " container-copyright-noIcon")), e.copyrightClassName = a, e.contentClassName = o, 
        this.getCurPage().setData({
            copyrightInfo: e,
            appinfo: n.globalData.baseInfo
        });
    },
    setFloatLayerInfo: function(t, e) {
        u = this;
        if (!t) {
            var a = getApp();
            if (a.globalData && a.globalData.baseInfo && (e = a.globalData.baseInfo, t = e.FloatLayerSetting), 
            !t && a.globalData.businessCardInfo) return void u.setDefaultCardFloatLayer(e);
            if (!t) return void setTimeout(function() {
                u.setFloatLayerInfo(t, e);
            }, 200);
        }
        var o = {};
        try {
            o = JSON.parse(t) || {};
        } catch (t) {}
        o = this.adjustFloatLayer(o);
        var n = this.getCurPage(), i = this.getFloatLayerCurPageName(), s = !1;
        /productdetail/i.test(i) && /(meirong)|(peixun)|(shop)|(yunzhi)/i.test(e.Industry) && (s = !0);
        var r = 0;
        1 == o.EnableCustomService && r++, 1 == o.EnableTel && 1 == o.EnableNormalBtnShow && r++, 
        n.setData({
            floatLayerInfo: o,
            hasBottomBar: s,
            btnCount: r
        });
        var l = !1;
        if (n.setData({
            scrollTopCurrent: 0,
            scrollBottomNum: 0
        }), 1 == o.EnableNormalBtnShow) {
            n.onPageScroll = function(t) {
                l = !(t.scrollTop - this.data.scrollTopCurrent > 0), this.data.scrollBottomNum && this.data.scrollBottomNum < t.scrollTop && (l = !1), 
                t.scrollTop < 50 && (l = !1), this.setData({
                    showTopFlag: l,
                    scrollTopCurrent: t.scrollTop
                });
            }, n.scrollToTop = function(t) {
                wx.pageScrollTo({
                    scrollTop: 0,
                    duration: 500
                });
            }, n.onReachBottom = function(t) {
                this.setData({
                    showTopFlag: !1,
                    scrollBottomNum: this.data.scrollTopCurrent - 10
                });
            };
            var u = this;
            n.goToHomeIndex = function() {
                u.navTo("HomeIndex");
            }, u.goToBusinessCardDetail(), n.goToCardList = function() {
                var t = void 0, e = wx.getStorageSync("SiteID");
                wx.getStorageSync("businessCardInfo") ? t = wx.getStorageSync("businessCardInfo") : a.globalData.businessCardInfo && (t = a.globalData.businessCardInfo), 
                1 == t.isOne ? u.navTo("NormalCardDetails", "", {
                    BusinessCardID: t.BusinessCardID,
                    SiteID: e || ""
                }) : u.navTo("CardCase");
            };
        } else "yunzhi" != this.getConfig().Industry && "shop" != this.getConfig().Industry && "shoplite" != this.getConfig().Industry && (u.goToBusinessCardDetail(), 
        n.goToCardList = function() {
            var t = void 0, e = wx.getStorageSync("SiteID");
            wx.getStorageSync("businessCardInfo") ? t = wx.getStorageSync("businessCardInfo") : a.globalData.businessCardInfo && (t = a.globalData.businessCardInfo), 
            1 == t.isOne ? u.navTo("NormalCardDetails", "", {
                BusinessCardID: t.BusinessCardID,
                SiteID: e || ""
            }) : u.navTo("CardCase");
        });
    },
    setDefaultCardFloatLayer: function(t) {
        var e = this, a = {};
        a = this.adjustFloatLayer(a);
        var o = this.getCurPage(), i = this.getFloatLayerCurPageName(), s = !1;
        /productdetail/i.test(i) && /(meirong)|(peixun)|(shop)|(yunzhi)/i.test(t.Industry) && (s = !0);
        var r = 0;
        1 == a.EnableCustomService && r++, 1 == a.EnableTel && 1 == a.EnableNormalBtnShow && r++, 
        o.setData({
            floatLayerInfo: a,
            hasBottomBar: s,
            btnCount: r
        }), 1 == a.EnableNormalBtnShow ? (e.goToBusinessCardDetail(), o.goToCardList = function() {
            var t = void 0, a = wx.getStorageSync("SiteID");
            wx.getStorageSync("businessCardInfo") ? t = wx.getStorageSync("businessCardInfo") : n.globalData.businessCardInfo && (t = n.globalData.businessCardInfo), 
            1 == t.isOne ? e.navTo("NormalCardDetails", "", {
                BusinessCardID: t.BusinessCardID,
                SiteID: a || ""
            }) : e.navTo("CardCase");
        }) : "yunzhi" != this.getConfig().Industry && "shop" != this.getConfig().Industry && "shoplite" != this.getConfig().Industry && (e.goToBusinessCardDetail(), 
        o.goToCardList = function() {
            var t = void 0, a = wx.getStorageSync("SiteID");
            wx.getStorageSync("businessCardInfo") ? t = wx.getStorageSync("businessCardInfo") : n.globalData.businessCardInfo && (t = n.globalData.businessCardInfo), 
            1 == t.isOne ? e.navTo("NormalCardDetails", "", {
                BusinessCardID: t.BusinessCardID,
                SiteID: a || ""
            }) : e.navTo("CardCase");
        });
    },
    goToBusinessCardDetail: function() {
        var t = this, e = this.getCurPage();
        wx.getStorageSync("hasMobile");
        e.goToBusinessCardDetail = function() {
            t.businessCardInfos();
        };
    },
    businessCardInfos: function() {
        var t = void 0, e = this, a = wx.getStorageSync("SiteID");
        wx.getStorageSync("businessCardInfo") ? t = wx.getStorageSync("businessCardInfo") : n.globalData.businessCardInfo && (t = n.globalData.businessCardInfo), 
        t.checkComplete ? e.navTo("CardDetails", "", {
            BusinessCardID: t.businessCardID,
            SiteID: a || ""
        }) : e.navTo("EditCard", "", {
            ID: t.businessCardID,
            checkComplete: t.businessCardInfo ? "1" : "0"
        });
    },
    adjustFloatLayer: function(t) {
        var e = this.getCurPage(), a = (t = t || e.data.floatLayerInfo || {}).ShowPages || "", o = this.getFloatLayerCurPageName(), i = new RegExp(o, "i").test(a);
        n.globalData.businessCardInfo && (t.businessCardInfo = n.globalData.businessCardInfo), 
        "pages/shop/index" != e.route && "pages/company/index" != e.route || (t.showBusinessCard = !0), 
        t.Enable = 1, t.EnableCustomService = 1 == t.EnableCustomService && i ? 1 : 0;
        var s = /(homeindex)|(productdetail)|(servicedetail)|(custompage)/i.test(o);
        t.EnableNormalBtnShow = s ? 1 : 0;
        var r = e.options && 1 == e.options.fromShare, l = (e.options ? decodeURIComponent(e.options.scene || "") : "").match(/sharepage=(CustomPage_\d+)/i);
        l && l.length > 1 && (r = !0);
        var u = r && /(productdetail)|(servicedetail)|(custompage)/i.test(o) && /(meirong)|(peixun)|(meifa)|(jianshen)|(jianzhan)/i.test(n.globalData.baseInfo.Industry);
        return u = u || r && /custompage/i.test(o), t.EnableGoToHomeIndex = u ? 1 : 0, t;
    },
    getFloatLayerCurPageName: function() {
        var t = this.getCurPage().route, e = null;
        return /(pages\/shop\/index)|(pages\/index)|(pages\/company\/index)/i.test(t) ? e = "homeindex" : /mycenter/i.test(t) ? e = "usercenter" : /orderdetail/i.test(t) ? e = "orderdetail" : /productdetail/i.test(t) ? e = "productdetail" : /reserve-by-person/i.test(t) ? e = "servicedetail" : /reserve-by-product/i.test(t) ? e = "servicedetail" : /custompage/i.test(t) && (e = /tabbar/i.test(t) ? t.replace(/.*(custompage_\d+).*/, "$1") : "custompage_" + getCurrentPages()[getCurrentPages().length - 1].data.optionsData.id), 
        e;
    },
    setPopupFromShare: function() {
        var t = this, e = this.getCurPage();
        if (e.options.scene) {
            var a = {};
            decodeURIComponent(e.options.scene).split("&").map(function(t, e) {
                if (-1 !== t.indexOf("=")) {
                    var o = t.split("=");
                    a[o[0]] = o[1];
                }
                if (-1 !== t.indexOf("_")) {
                    var n = t.split("_");
                    a[n[0]] = n[1];
                }
            }), e.options = a;
        }
        1 == e.options.fromShare && (e.goToHomeIndex = function() {
            t.navTo("HomeIndex");
        }, e.setData({
            showPopupFromShare: 1
        }));
    },
    getCurPage: function() {
        return getCurrentPages()[getCurrentPages().length - 1];
    },
    CONFIG: {},
    CACHEKEY: "",
    getConfig: function() {
        return this.CONFIG.SITEID || (this.CONFIG = function() {
            var t = wx.getExtConfigSync();
            return t.ext ? t.ext : require("/config.js");
        }()), this.CONFIG;
    },
    URLCONFIG: null,
    getUrlConfig: function() {
        return this.URLCONFIG || (this.URLCONFIG = function() {
            try {
                return require("/urlconfig.js");
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return {};
            }
        }()), this.URLCONFIG;
    },
    getUrlByLinkType: function(t, e, a) {
        var n = {};
        n.HomeIndex = "/pages/index", n.UserCenter = "/pages/ucenter/index", n.ShopCart = "/pages/shop/shopcart", 
        n.AboutUs = "/pages/company/aboutus", n.ContactUs = "/pages/company/contact", n.ProductList = "/pages/productlist", 
        n.RetailProductList = "/pages/shop/retailproductlist", n.ProductClass = "/pages/productlist?classid=$id", 
        n.ProductDetail = "/pages/productdetail?id=$id", n.NewsList = "/pages/newslist", 
        n.NewsClass = "/pages/newslist?classid=$id", n.NewsDetail = "/pages/newsdetail?id=$id", 
        n.CaseList = "/pages/company/caselist", n.CaseClass = "/pages/company/caselist?classid=$id", 
        n.CaseDetail = "/pages/company/casedetail?id=$id";
        var i = this.getUrlConfig();
        for (var s in i) "object" == o(i[s]) ? n[s] = i[s].url : n[s] = i[s];
        var r = n[t];
        if (r && (r = r.replace("$id", e), "object" == (void 0 === a ? "undefined" : o(a)) && a)) for (var s in a) r.indexOf("?") > -1 ? r += "&" + s + "=" + encodeURI(a[s]) : r += "?" + s + "=" + encodeURI(a[s]);
        return r;
    },
    phoneAuthorization: function(t, e, a, o) {
        var i = this.getCurPage(), s = this.getUrlByLinkType(t, e, a);
        i.turnOff = function() {
            n.turnOff();
        }, i.getPhoneNumber = function(a) {
            if (i.setData({
                phonelicense: !1
            }), a.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
                var r = n.globalData.appId, l = n.globalData.session_key, d = new u(r, l).decryptData(a.detail.encryptedData, a.detail.iv);
                n.loadphoneInfo(d.phoneNumber), "ProductDetail" === t || "NewsDetail" === t || "ServiceDetail" === t ? c.navToUrl(s) : "entryBusinessCardHome" === t ? c.businessCardInfos() : (c.couponCollection(t, e), 
                i.setData({
                    allowspopup: !0
                }));
            } else 2 === o ? (i.setData({
                allowspopup: !0
            }), i.abolish = function() {
                i.setData({
                    allowspopup: !1
                });
            }) : "ProductDetail" === t || "NewsDetail" === t || "ServiceDetail" === t ? c.navToUrl(s) : "entryBusinessCardHome" === t ? c.businessCardInfos() : c.couponCollection(t, e);
        };
    },
    navTo: function(t, e, a) {
        var o = !1, i = n.globalData.getMobileNode, s = [ "ProductDetail", "NewsDetail", "ServiceDetail" ].includes(t), r = 0;
        r = "ProductDetail" === t ? i ? n.globalData.getMobileNode.checkGoodsDetails : 0 : "NewsDetail" === t ? i ? n.globalData.getMobileNode.readArticles : 0 : i ? n.globalData.getMobileNode.checkServiceDetails : 0;
        var l = wx.getStorageSync("hasMobile") || 0;
        if ("ProductDetail" !== t && "NewsDetail" !== t && "ServiceDetail" !== t || 0 === r || (o = !0), 
        0 === n.globalData.hasMobile && s && o && !l) 0 !== r && (this.getCurPage().setData({
            phonelicense: !0
        }), this.phoneAuthorization(t, e, a, r)); else {
            if ("OneKeyPhoneCall" == t) return void getApp().phoneCall();
            if ("OneKeyNav" == t) return void getApp().getLocation();
            "miniprogram" === t ? wx.navigateToMiniProgram({
                appId: a.appid,
                path: a.path,
                extraData: {},
                envVersion: "develop"
            }) : "h5" === t && wx.navigateTo({
                url: "/pages/webview/webview?path=" + a.h5
            });
            var u = this.getUrlByLinkType(t, e, a);
            if (!u) return;
            "HomeIndex" == t ? wx.reLaunch({
                url: u
            }) : this.navToUrl(u);
        }
    },
    navToUrl: function(t) {
        if (t.indexOf("?") > -1) for (var e = {}, a = t.split("?")[1].split("&"), o = 0; o < a.length; o++) {
            var n = a[o].split("=");
            e[this.trim(n[0])] = this.trim(n[1]);
        }
        wx.navigateTo({
            url: t
        });
    },
    shareAppMessage: function(t) {
        var e = "pages/index", a = getApp().globalData.appTitle, n = getApp().globalData.appDescription;
        return "object" == (void 0 === t ? "undefined" : o(t)) ? (t.url && (e = t.url), 
        t.title && (a = t.title), t.desc && (n = t.desc)) : "string" == typeof t && t && (e = t), 
        {
            title: a,
            desc: n,
            path: e
        };
    },
    getPageUrl: function(t, e) {
        var a = getCurrentPages()[getCurrentPages().length - 1].__route__, o = [];
        for (var n in e) o.push(n + "=" + e[n]);
        return o.length > 0 && (a += "?" + o.join("&")), t.setData({
            pageurl: a
        }), a;
    },
    onChooseImg: function(t, e) {
        var a = this, o = t.currentTarget.dataset.col;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(i) {
                var s = i.tempFilePaths;
                n.uploadRequest({
                    url: "/index.php?c=Front/WxApp/ServiceApi&a=uploadImg",
                    filePath: s[0],
                    name: "makeAnAppointment",
                    success: function(n) {
                        var i = JSON.parse(n);
                        i.tempFilePaths = s[0], i.col = o, a.setCustomFormPageData(t, e, i);
                    },
                    fail: function(t) {},
                    complete: function(t) {
                        wx.hideLoading();
                    }
                });
            }
        });
    },
    onCustomFormSubmit: function(t, e) {
        this.validateForm(t.detail.value) && n.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=saveCustomFormData",
            method: "POST",
            data: t.detail.value,
            success: function(t) {
                if (t.success) {
                    n.showModal({
                        title: "提示",
                        content: "提交成功"
                    });
                    var a = e.data.globaldata || {};
                    a.customformvalues = {}, e.setData({
                        globaldata: a
                    });
                } else n.showModal({
                    title: "提示",
                    content: "提交失败：" + t.msg
                });
            },
            fail: function(t) {
                n.showModal({
                    title: "提示",
                    content: "提交失败：" + t
                });
            }
        });
    },
    validateForm: function(t) {
        var e = {};
        for (var a in t) if (a.indexOf("-fieldID") > -1) {
            var o = t[a];
            e[o] = {
                fieldName: t[o + "-fieldName"],
                fieldType: t[o + "-fieldType"],
                checkType: t[o + "-fieldCheckType"],
                require: "1" == t[o + "-fieldRequire"]
            };
        }
        var i = {
            2: "^[0-9]+$",
            3: "^1\\d{10}$",
            4: "^\\d{3,4}\\-\\d{6,9}$",
            5: "^((1\\d{10})|(\\d{3,4}\\-\\d{6,9}))$",
            6: "^[a-z\\d]+([\\-_\\.][a-z\\d]+)*@([a-z\\d]+[\\-\\.]*)+\\.[a-z\\d]{2,5}$",
            7: "^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$",
            8: "^\\d{4}\\-\\d{1,2}\\-\\d{1,2}\\s+\\d{1,2}:\\d{1,2}$"
        };
        for (var s in t) if (e[s]) {
            if ("string" == typeof t[s] && (t[s] = t[s].replace(/(^\s*)|(\s*$)/g, "")), e[s] && e[s].require) {
                if (!t[s]) return n.showModal({
                    title: "提示",
                    content: "请输入" + e[s].fieldName
                }), !1;
                if (t[s] instanceof Array && 0 == t[s].length) return n.showModal({
                    title: "提示",
                    content: "请输入" + e[s].fieldName
                }), !1;
            }
            var r = e[s].checkType;
            if ("8" == e[s].fieldType && (r = "8"), i[r]) {
                var l = new RegExp(i[r], "i");
                if (t[s] && !l.test(t[s])) return n.showModal({
                    title: "提示",
                    content: e[s].fieldName + "格式不正确"
                }), !1;
            }
        }
        return !0;
    },
    onCustomFormTextInputChange: function(t, e) {
        var a = t.detail.value;
        this.setCustomFormPageData(t, e, a);
    },
    onCustomFormRadioChange: function(t, e) {
        var a = t.detail.value;
        this.setCustomFormPageData(t, e, a);
    },
    onCustomFormSelectChange: function(t, e) {
        var a = t.currentTarget.dataset.array[t.detail.value];
        this.setCustomFormPageData(t, e, a);
    },
    onCustomFormCheckboxChange: function(t, e) {
        var a = t.detail.value;
        this.setCustomFormPageData(t, e, a);
    },
    onCustomFormDateChange: function(t, e) {
        var a = t.detail.value;
        this.setCustomFormPageData(t, e, a);
    },
    onCustomFormTimeChange: function(t, e) {
        var a = t.detail.value;
        this.setCustomFormPageData(t, e, a);
    },
    onCustomRegionChange: function(t, e) {
        var a = new Array();
        for (var o in t.detail.value) a.push(t.detail.value[o]);
        var n = a.join(",");
        this.setCustomFormPageData(t, e, n);
    },
    setCustomFormPageData: function(t, e, a) {
        var o = t.currentTarget.dataset.col, n = e.data.globaldata || {}, i = n.customformvalues || {};
        i[o + "val"] = a.path ? a.path : a, i[o + "valimg"] = a.tempFilePaths ? a.tempFilePaths : "", 
        n.customformvalues = i, e.setData({
            globaldata: n
        });
    },
    doSearch: function(t, e) {
        var a = this.trim(t.detail.value);
        if (a) {
            var o = getApp().globalData.baseInfo.Industry, n = "";
            n = (n = "meifa" == o || "peixun" == o || "meirong" == o || "jianshen" == o ? this.getUrlByLinkType("ServiceList", 0) : "retail" == o ? this.getUrlByLinkType("RetailProductList", 0) : this.getUrlByLinkType("ProductList", 0)).indexOf("?") > -1 ? n + "&keyword=" + a : n + "?keyword=" + a, 
            wx.navigateTo({
                url: n
            });
        }
    },
    onSearchInput: function(t, e) {
        var a = this.trim(t.detail.value), o = t.currentTarget.dataset.moduleid;
        a ? this.setModuleData(o, {
            HidePlaceHolder: 1
        }) : this.setModuleData(o, {
            HidePlaceHolder: 0
        });
    },
    getCoupon: function(t, e) {
        var a = this, o = wx.getStorageSync("hasMobile") || 0, i = n.globalData.getMobileNode ? n.globalData.getMobileNode.getCoupons : 0, s = e.data.globaldata || {};
        s.gettingCoupon || (s.gettingCoupon = !0, e.setData({
            globaldata: s
        }), setTimeout(function() {
            s.gettingCoupon = !1, e.setData({
                globaldata: s
            });
        }, 2e3), 0 === n.globalData.hasMobile && 0 === o && 0 !== i ? ((e = this.getCurPage()).setData({
            phonelicense: !0
        }), this.phoneAuthorization(t.currentTarget.dataset.moduleid, t.currentTarget.dataset.couponid, 1, i)) : a.couponCollection(t.currentTarget.dataset.moduleid, t.currentTarget.dataset.couponid));
    },
    couponCollection: function(t, e) {
        var a = this, o = function() {
            a.loadModuleData(t), wx.showToast({
                title: "领取成功",
                icon: "success",
                duration: 3e3
            });
        }, n = function(t, e) {
            getApp().getCoupon(t, e);
        };
        getApp().getCoupon(e, o, null, function() {
            a.ShopUtil.showRegUI({
                onRegOrBindSuccess: function() {
                    page.setData({
                        showUserReg: !1
                    }), n(couponid, o);
                }
            });
        });
    },
    loadModuleData: function(t) {
        var e = this;
        n.sendRequest({
            hideLoading: !0,
            url: "/index.php?c=Front/WxApp/PageApi&a=getModuleData&moduleId=" + t + "&cachekey=" + e.CACHEKEY + "&justCache=" + e.getConfig().ModuleDataJustFromCache,
            method: "GET",
            success: function(a) {
                if (a.success) {
                    a.data.CouponList && a.data.CouponList.length > 0 && a.data.CouponList.forEach(function(t) {
                        if (t.beginTime = t.BeginTime.split(" ")[0].split("-").join("."), 0 == t.Type ? t.Amount = (t.Amount / 10).toString().replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, "") : t.Amount = t.Amount.replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, ""), 
                        "0" === t.EndTimeType) {
                            var e = t.TimeLimit.split(" ")[1].split(":")[0] + ":" + t.TimeLimit.split(" ")[1].split(":")[1];
                            t.timeLimit = t.TimeLimit.split(" ")[0].split("-").join(".") + " " + e;
                        } else t.timeLimit = t.TimeLimit;
                    });
                    for (var o = e.getCurPage(), n = o.data.modules, i = 0; i < n.length; i++) parseInt(n[i].ModuleID) == parseInt(t) && (n[i] = a.data);
                    o.setData({
                        modules: n
                    });
                }
            },
            fail: function(t) {
                console.log("loadModuleData fail");
            }
        });
    },
    setModuleData: function(t, o) {
        var n = this.getCurPage(), i = n.data.modules, s = i.findIndex(function(e) {
            return e.ModuleID == t;
        });
        o = a({}, i[s], o), s > -1 && n.setData(e({}, "modules[" + s + "]", o));
    },
    slideImgLoad: function(t, e) {
        var a = this.getImageSize(t), o = t.currentTarget.dataset.moduleid;
        e.data["slide" + o] || (e.data.globaldata.slideheight || (e.data.globaldata.slideheight = {}), 
        e.data.globaldata.slideheight[o] = a.imageHeight, e.data["slide" + o] = !0);
    },
    getImageSize: function(t) {
        var e = {}, a = t.detail.width, o = t.detail.height, n = o / a;
        return wx.getSystemInfo({
            success: function(t) {
                var i = t.windowWidth, s = t.windowHeight;
                n < s / i ? (e.imageWidth = i, e.imageHeight = i * o / a) : (e.imageHeight = s, 
                e.imageWidth = s * a / o);
            }
        }), e;
    },
    trim: function(t) {
        return t.replace(/(^\s*)|(\s*$)/g, "");
    },
    showToast: function(t) {
        wx.showToast({
            title: t.title,
            icon: t.icon,
            duration: t.duration || 1500,
            success: function(e) {
                "function" == typeof t.success && t.success(e);
            },
            fail: function(e) {
                "function" == typeof t.fail && t.fail(e);
            },
            complete: function(e) {
                "function" == typeof t.complete && t.complete(e);
            }
        });
    },
    hideToast: function() {
        wx.hideToast();
    },
    showModal: function(t) {
        wx.showModal({
            title: t.title || "提示",
            content: t.content,
            showCancel: t.showCancel || !1,
            cancelText: t.cancelText || "取消",
            cancelColor: t.cancelColor || "#000000",
            confirmText: t.confirmText || "确定",
            confirmColor: t.confirmColor || "#3CC51F",
            success: function(e) {
                e.confirm ? "function" == typeof t.confirm && t.confirm(e) : "function" == typeof t.cancel && t.cancel(e);
            },
            fail: function(e) {
                "function" == typeof t.fail && t.fail(e);
            },
            complete: function(e) {
                "function" == typeof t.complete && t.complete(e);
            }
        });
    },
    countTdown: function(a, o, n) {
        var i = this.getCurPage(), s = this;
        if (o || 0 == o) {
            var r = a;
            clearInterval(s["fullReduction" + o]), s["fullReduction" + o] = setInterval(function() {
                var a;
                if (--r < 0) return clearInterval(s["fullReduction" + o]), void (n && n(1));
                var l = s.forMatterTime(r), u = l.days, c = l.hours, d = l.minutes, g = l.seconds, f = [];
                f.push("activityTimeArr" + o), i.setData((a = {}, e(a, f[0], {
                    day: u,
                    hour: c,
                    minute: d,
                    second: g
                }), e(a, "key", [].concat(t(i.data.key), f)), a));
                var p = i.data.key.filter(function(t, e, a) {
                    return a.indexOf(t) === e;
                }), m = [];
                p.forEach(function(t, e) {
                    m.push(i.data["activityTimeArr" + e]);
                }), i.setData({
                    key: p,
                    timeInterval: m
                }), n && n(0);
            }, 1e3);
        } else {
            var l = a;
            clearInterval(s.fullReduction), s.fullReduction = setInterval(function() {
                if (--l < 0) return clearInterval(s.fullReduction), void (n && n(1));
                var t = s.forMatterTime(l), e = t.days, a = t.hours, o = t.minutes, r = t.seconds;
                i.setData({
                    activityTime: {
                        day: e,
                        hour: a,
                        minute: o,
                        second: r
                    }
                }), n && n(0);
            }, 1e3);
        }
    },
    forMatterTime: function(t) {
        var e = parseInt(t / 60 / 60 / 24, 10), a = parseInt(t / 60 / 60 % 24, 10), o = parseInt(t / 60 % 60, 10), n = parseInt(t % 60, 10);
        return a = this.checkTime(a), o = this.checkTime(o), n = this.checkTime(n), {
            days: e,
            hours: a,
            minutes: o,
            seconds: n
        };
    },
    checkTime: function(t) {
        return t < 10 && (t = "0" + t), t;
    },
    getLocationByAddress: function(t, e, a, o) {
        var i = this, s = {
            url: "/index.php?c=Front/WxApp/Amap&a=geo",
            data: {
                addr: o
            },
            success: function(n) {
                n.success ? wx.openLocation({
                    name: a,
                    address: o,
                    longitude: Number(e),
                    latitude: Number(t),
                    scale: 15
                }) : i.showModal({
                    content: "" + n.msg
                });
            }
        };
        n.sendRequest(s);
    },
    getLocation: function(t, e, a, o) {
        t = Number(t), e = Number(e), t > 0 && e > 0 ? wx.openLocation({
            name: a,
            address: o,
            longitude: e,
            latitude: t
        }) : this.getLocationByAddress(t, e, a, o);
    },
    modifyPostParam: function(t) {
        var e, a, o, n, i, s, r = "";
        for (e in t) if ((a = t[e]) instanceof Array) for (s = 0; s < a.length; ++s) n = a[s], 
        (i = {})[e + "[" + s + "]"] = n, r += this.modifyPostParam(i) + "&"; else if (a instanceof Object) for (o in a) n = a[o], 
        (i = {})[e + "[" + o + "]"] = n, r += this.modifyPostParam(i) + "&"; else void 0 !== a && null !== a && (r += encodeURIComponent(e) + "=" + encodeURIComponent(a) + "&");
        return r.length ? r.substr(0, r.length - 1) : r;
    },
    sendRequest: function(t, e, a) {
        t.options || (t.options = {}), void 0 === a && (a = 0);
        var o, i = t.data || {}, s = t.header;
        i.app_id = this.getConfig().APPID, this.getConfig().SITEID && (i.InitSiteID = this.getConfig().SITEID), 
        this.getConfig().DATAID && (i.dataId = this.getConfig().DATAID), getApp().globalData.PSESSID && (i.PSESSID = getApp().globalData.PSESSID), 
        getApp().globalData.WebUserID && (i.WebUserID = getApp().globalData.WebUserID), 
        o = e ? e + t.url : this.getConfig().SITEBASEURL + t.url, this.getConfig().ADD_QUERYSTRING && (o.indexOf("?") > -1 ? o += "&" + this.getConfig().ADD_QUERYSTRING : o += "?" + this.getConfig().ADD_QUERYSTRING);
        var r = wx.getStorageSync("invite");
        o.toLowerCase().indexOf("regorbinduser") > -1 && r && (i.invite = r), t.method && ("post" == t.method.toLowerCase() && (i = this.modifyPostParam(i), 
        s = s || {
            "content-type": "application/x-www-form-urlencoded;"
        }), t.method = t.method.toUpperCase()), t.hideLoading || t.options.refresh || wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), wx.request({
            url: o,
            data: i,
            method: t.method || "GET",
            header: s || {
                "content-type": "application/json"
            },
            success: function(e) {
                if (e.statusCode && 200 != e.statusCode) return wx.hideToast(), void wx.showModal({
                    content: "" + e.errMsg
                });
                t.hideLoading || wx.hideToast(), !e.data || e.data.success || 1 != e.data.needAuthorized ? "function" == typeof t.success && t.success(e.data) : n.showModal({
                    title: "提示",
                    content: e.data.msg
                });
            },
            fail: function(o) {
                a < 3 ? setTimeout(function() {
                    n.sendRequest(t, e, ++a);
                }, 1e3) : (wx.showModal({
                    content: "请求失败 " + o.errMsg
                }), "function" == typeof t.fail && t.fail(o.data));
            },
            complete: function(e) {
                "function" == typeof t.complete && t.complete(e.data);
            }
        });
    },
    findTabBarPageByLinkType: function(t) {
        var e = this.getUrlByLinkType(t);
        return this.findTabBarPage(e + "_tabbar");
    },
    findTabBarPage: function(t) {
        var e = null;
        try {
            if (t) var a = (t = (t || "").replace(/_tabbar$/i, "").replace(/^\/+/, "")) + "_tabbar"; else a = this.getCurPage().route + "_tabbar";
            for (var o = require("tabbarlist.js"), n = Object.keys(o) || [], i = 0; i < n.length; i++) if (a === n[i]) {
                e = a;
                break;
            }
        } catch (t) {}
        return e;
    },
    checkToReLaunchTabBarPage: function() {
        var t = this.findTabBarPage();
        t && (t = "/" + t.replace(/^\/+/, ""), wx.switchTab({
            url: t,
            fail: function(t) {
                console.log(t, "cant switchTab");
            }
        }));
    }
};

module.exports = c;