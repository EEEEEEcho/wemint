var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = getApp(), a = {
    registerGlobalVar: function(t, e) {
        this[t] = e;
    },
    loadPageModules: function(t) {
        var e = this, a = getCurrentPages()[getCurrentPages().length - 1];
        this.sendRequest({
            url: "/index.php?c=front/WxApp/PageApi&a=getPageModules&publish=1&sortcol=ShowOrder&page=HomeIndex&justCache=" + e.getConfig().ModuleDataJustFromCache,
            method: "POST",
            success: function(t) {
                t.success ? (a.setData({
                    modules: t.modules
                }), e.setFloatLayerInfo(t.appinfo.FloatLayerSetting), e.setCopyrightInfo(t.appinfo.CopyrightSetting), 
                e.CACHEKEY = t.cachekey, e.getPurchaseLimit()) : console.log("getPageModules fail：" + t.msg);
            },
            fail: function(t) {
                console.log("getPageModules fail");
            }
        });
    },
    getPurchaseLimit: function() {
        var t = this, e = getCurrentPages()[getCurrentPages().length - 1], a = setInterval(function() {
            var o = e.data.modules;
            try {
                for (var n = 0; n < o.length; ++n) if ("ModuleSecKill" === o[n].ModuleType) {
                    var i = o[n].ActivityInfo, r = i.remainingTime;
                    0 == --r && (t.loadPageModules(!0), clearInterval(a));
                    var s = t.forMatterTime(r), l = s.hours, u = s.minutes, c = s.seconds;
                    i.remainingTime = r, i.remainingTimeHours = l, i.remainingTimeMinutes = u, i.remainingTimeSeconds = c, 
                    o[n].ActivityInfo = i, t.setModuleData(o[n].ModuleID, o[n]);
                }
            } catch (t) {}
        }, 1e3);
        setInterval(function() {
            var o = e.data.modules;
            try {
                for (var n = 0; n < o.length; ++n) if ("ModuleSecKill" === o[n].ModuleType) {
                    var i = o[n].ActivityInfo, r = i.morningInterval;
                    0 == --r && (t.loadPageModules(!0), clearInterval(a)), i.morningInterval = r, o[n].ActivityInfo = i, 
                    t.setModuleData(o[n].ModuleID, o[n]);
                }
            } catch (t) {}
        }, 1e3);
    },
    registerGlobalFunc: function() {
        var t = getCurrentPages()[getCurrentPages().length - 1], e = this;
        t.setData({
            globaldata: {
                appGlobalData: getApp().globalData,
                sysInfo: wx.getSystemInfoSync()
            }
        }), t.shareAppMessage = function(t) {
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
            var r = [], s = a.currentTarget.dataset.linkdata;
            if ("string" == typeof s) try {
                if (s = JSON.parse(s)) for (var l in s) {
                    var u = s[l];
                    "string" != typeof u && "number" != typeof u || (r[l] = u);
                }
            } catch (t) {}
            e.navTo(o, n, r);
        }, t.M_doSearch = function(a) {
            e.doSearch(a, t);
        }, t.M_onSearchInput = function(t) {}, t.M_onSearchInputFocus = function(t) {
            var a = t.currentTarget.dataset.moduleid;
            e.setModuleData(a, {
                HidePlaceHolder: 1
            });
        }, t.M_onSearchInputBlur = function(a) {
            e.onSearchInput(a, t);
        }, t.M_slideImgLoad = function(a) {
            e.slideImgLoad(a, t);
        }, t.M_getCoupon = function(a) {
            e.getCoupon(a, t);
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
        }, t.appPhoneCall = getApp().phoneCall, this.setCopyrightInfo();
    },
    initCommonModules: function() {
        this.setCopyrightInfo(), this.setFloatLayerInfo();
    },
    setCopyrightInfo: function(t) {
        var e = this;
        if (!t) {
            var a = getApp();
            if (!(a.globalData && Object.keys(a.globalData.baseInfo).length > 0)) return void e.sendRequest({
                url: "/index.php?c=Front/WxApp/JsonApi&a=getBaseInfo",
                method: "POST",
                hideLoading: !0,
                success: function(t) {
                    t.success && e.setCopyrightInfoToPage(t.info.CopyrightSetting);
                }
            });
            t = a.globalData.baseInfo.CopyrightSetting;
        }
        e.setCopyrightInfoToPage(t);
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
            copyrightInfo: e
        });
    },
    setFloatLayerInfo: function(t) {
        if (!t) {
            var e = getApp();
            e.globalData && e.globalData.baseInfo && (t = e.globalData.baseInfo.FloatLayerSetting);
        }
        var a = {};
        try {
            a = JSON.parse(t) || {};
        } catch (t) {}
        a = this.adjustFloatLayer(a);
        var o = this.getCurPage(), n = this.getFloatLayerCurPageName(), i = !1;
        /productdetail/i.test(n) && /(meirong)|(peixun)|(shop)|(yunzhi)/i.test(e.globalData.baseInfo.Industry) && (i = !0);
        var r = 0;
        1 == a.EnableCustomService && r++, 1 == a.EnableTel && 1 == a.EnableNormalBtnShow && r++, 
        o.setData({
            floatLayerInfo: a,
            hasBottomBar: i,
            btnCount: r
        });
        var s = !1;
        o.setData({
            scrollTopCurrent: 0,
            scrollBottomNum: 0
        }), 1 == a.EnableNormalBtnShow && (o.onPageScroll = function(t) {
            s = !(t.scrollTop - this.data.scrollTopCurrent > 0), this.data.scrollBottomNum && this.data.scrollBottomNum < t.scrollTop && (s = !1), 
            t.scrollTop < 50 && (s = !1), this.setData({
                showTopFlag: s,
                scrollTopCurrent: t.scrollTop
            });
        }, o.scrollToTop = function(t) {
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 500
            });
        }, o.onReachBottom = function(t) {
            this.setData({
                showTopFlag: !1,
                scrollBottomNum: this.data.scrollTopCurrent - 10
            });
        });
    },
    adjustFloatLayer: function(t) {
        var e = this.getCurPage(), a = (t = t || e.data.floatLayerInfo || {}).ShowPages || "", o = this.getFloatLayerCurPageName(), n = new RegExp(o, "i").test(a);
        t.Enable = 1, t.EnableCustomService = 1 == t.EnableCustomService && n ? 1 : 0;
        var i = /(homeindex)|(productdetail)|(servicedetail)/i.test(o);
        return t.EnableNormalBtnShow = i ? 1 : 0, t;
    },
    getFloatLayerCurPageName: function() {
        var t = this.getCurPage().route, e = null;
        return /(pages\/shop\/index)|(pages\/index)|(pages\/company\/index)/i.test(t) ? e = "homeindex" : /mycenter/i.test(t) ? e = "usercenter" : /orderdetail/i.test(t) ? e = "orderdetail" : /productdetail/i.test(t) ? e = "productdetail" : /reserve-by-person/i.test(t) && (e = "servicedetail"), 
        e;
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
    getUrlByLinkType: function(e, a, o) {
        var n = {};
        n.HomeIndex = "/pages/index", n.UserCenter = "/pages/ucenter/index", n.ShopCart = "/pages/shop/shopcart", 
        n.AboutUs = "/pages/company/aboutus", n.ContactUs = "/pages/company/contact", n.ProductList = "/pages/productlist", 
        n.ProductClass = "/pages/productlist?classid=$id", n.ProductDetail = "/pages/productdetail?id=$id", 
        n.NewsList = "/pages/newslist", n.NewsClass = "/pages/newslist?classid=$id", n.NewsDetail = "/pages/newsdetail?id=$id", 
        n.CaseList = "/pages/company/caselist", n.CaseClass = "/pages/company/caselist?classid=$id", 
        n.CaseDetail = "/pages/company/casedetail?id=$id";
        var i = this.getUrlConfig();
        for (var r in i) "object" == t(i[r]) ? n[r] = i[r].url : n[r] = i[r];
        var s = n[e];
        if (s && (s = s.replace("$id", a), "object" == (void 0 === o ? "undefined" : t(o)) && o)) for (var r in o) s.indexOf("?") > -1 ? s += "&" + r + "=" + encodeURI(o[r]) : s += "?" + r + "=" + encodeURI(o[r]);
        return s;
    },
    navTo: function(t, e, a) {
        if ("OneKeyPhoneCall" != t) if ("OneKeyNav" != t) {
            "miniprogram" === t ? wx.navigateToMiniProgram({
                appId: a.appid,
                path: a.path,
                extraData: {},
                envVersion: "develop"
            }) : "h5" === t && wx.navigateTo({
                url: "/pages/webview/webview?path=" + a.h5
            });
            var o = this.getUrlByLinkType(t, e, a);
            o && ("HomeIndex" == t ? wx.reLaunch({
                url: o
            }) : this.navToUrl(o));
        } else getApp().getLocation(); else getApp().phoneCall();
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
    shareAppMessage: function(e) {
        var a = "pages/index", o = getApp().globalData.appTitle, n = getApp().globalData.appDescription;
        return "object" == (void 0 === e ? "undefined" : t(e)) ? (e.url && (a = e.url), 
        e.title && (o = e.title), e.desc && (n = e.desc)) : "string" == typeof e && e && (a = e), 
        {
            title: o,
            desc: n,
            path: a
        };
    },
    getPageUrl: function(t, e) {
        var a = getCurrentPages()[getCurrentPages().length - 1].__route__, o = [];
        for (var n in e) o.push(n + "=" + e[n]);
        return o.length > 0 && (a += "?" + o.join("&")), t.setData({
            pageurl: a
        }), a;
    },
    onCustomFormSubmit: function(t, a) {
        this.validateForm(t.detail.value) && e.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=saveCustomFormData",
            method: "POST",
            data: t.detail.value,
            success: function(t) {
                if (t.success) {
                    e.showModal({
                        title: "提示",
                        content: "提交成功"
                    });
                    var o = a.data.globaldata || {};
                    o.customformvalues = {}, a.setData({
                        globaldata: o
                    });
                } else e.showModal({
                    title: "提示",
                    content: "提交失败：" + t.msg
                });
            },
            fail: function(t) {
                e.showModal({
                    title: "提示",
                    content: "提交失败：" + t
                });
            }
        });
    },
    validateForm: function(t) {
        var a = {};
        for (var o in t) if (o.indexOf("-fieldID") > -1) {
            var n = t[o];
            a[n] = {
                fieldName: t[n + "-fieldName"],
                fieldType: t[n + "-fieldType"],
                checkType: t[n + "-fieldCheckType"],
                require: "1" == t[n + "-fieldRequire"]
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
        for (var r in t) if (a[r]) {
            if ("string" == typeof t[r] && (t[r] = t[r].replace(/(^\s*)|(\s*$)/g, "")), a[r] && a[r].require) {
                if (!t[r]) return e.showModal({
                    title: "提示",
                    content: "请输入" + a[r].fieldName
                }), !1;
                if (t[r] instanceof Array && 0 == t[r].length) return e.showModal({
                    title: "提示",
                    content: "请输入" + a[r].fieldName
                }), !1;
            }
            var s = a[r].checkType;
            if ("8" == a[r].fieldType && (s = "8"), i[s]) {
                var l = new RegExp(i[s], "i");
                if (t[r] && !l.test(t[r])) return e.showModal({
                    title: "提示",
                    content: a[r].fieldName + "格式不正确"
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
        i[o + "val"] = a, n.customformvalues = i, e.setData({
            globaldata: n
        });
    },
    doSearch: function(t, e) {
        var a = this.trim(t.detail.value);
        if (a) {
            var o = this.getUrlByLinkType("ProductList", 0);
            o = o.indexOf("?") > -1 ? o + "&keyword=" + a : o + "?keyword=" + a, wx.navigateTo({
                url: o
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
        var a = this, o = e.data.globaldata || {};
        if (o.gettingCoupon) console.log("不能重复点击领取按钮"); else {
            o.gettingCoupon = !0, e.setData({
                globaldata: o
            }), setTimeout(function() {
                o.gettingCoupon = !1, e.setData({
                    globaldata: o
                });
            }, 2e3);
            var n = function() {
                a.loadModuleData(t.currentTarget.dataset.moduleid), wx.showToast({
                    title: "领取成功",
                    icon: "success",
                    duration: 3e3
                });
            }, i = function(t, e) {
                getApp().getCoupon(t, e);
            };
            getApp().getCoupon(t.currentTarget.dataset.couponid, n, null, function() {
                a.ShopUtil.showRegUI({
                    onRegOrBindSuccess: function() {
                        e.setData({
                            showUserReg: !1
                        }), i(couponid, n);
                    }
                });
            });
        }
    },
    loadModuleData: function(t) {
        var e = this;
        e.sendRequest({
            hideLoading: !0,
            url: "/index.php?c=Front/WxApp/PageApi&a=getModuleData&moduleId=" + t + "&cachekey=" + e.CACHEKEY + "&justCache=" + e.getConfig().ModuleDataJustFromCache,
            method: "GET",
            success: function(a) {
                if (a.success) {
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
    setModuleData: function(t, e) {
        for (var a = this.getCurPage(), o = a.data.modules, n = 0; n < o.length; n++) if (parseInt(o[n].ModuleID) == parseInt(t)) for (var i in e) o[n][i] = e[i];
        a.setData({
            modules: o
        });
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
                var i = t.windowWidth, r = t.windowHeight;
                n < r / i ? (e.imageWidth = i, e.imageHeight = i * o / a) : (e.imageHeight = r, 
                e.imageWidth = r * a / o);
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
    forMatterTime: function(t) {
        var e = parseInt(t / 60 / 60 % 24, 10), a = parseInt(t / 60 % 60, 10), o = parseInt(t % 60, 10);
        return e = this.checkTime(e), a = this.checkTime(a), o = this.checkTime(o), {
            hours: e,
            minutes: a,
            seconds: o
        };
    },
    checkTime: function(t) {
        return t < 10 && (t = "0" + t), t;
    },
    getLocationByAddress: function(t, e, a, o) {
        var n = this, i = {
            url: "/index.php?c=Front/WxApp/Amap&a=geo",
            data: {
                addr: o
            },
            success: function(i) {
                i.success ? wx.openLocation({
                    name: a,
                    address: o,
                    longitude: Number(e),
                    latitude: Number(t),
                    scale: 15
                }) : n.showModal({
                    content: "" + i.msg
                });
            }
        };
        n.sendRequest(i);
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
        var e, a, o, n, i, r, s = "";
        for (e in t) if ((a = t[e]) instanceof Array) for (r = 0; r < a.length; ++r) n = a[r], 
        (i = {})[e + "[" + r + "]"] = n, s += this.modifyPostParam(i) + "&"; else if (a instanceof Object) for (o in a) n = a[o], 
        (i = {})[e + "[" + o + "]"] = n, s += this.modifyPostParam(i) + "&"; else void 0 !== a && null !== a && (s += encodeURIComponent(e) + "=" + encodeURIComponent(a) + "&");
        return s.length ? s.substr(0, s.length - 1) : s;
    },
    sendRequest: function(t, a) {
        var o, n = t.data || {}, i = t.header;
        n.app_id = this.getConfig().APPID, this.getConfig().SITEID && (n.InitSiteID = this.getConfig().SITEID), 
        this.getConfig().DATAID && (n.dataId = this.getConfig().DATAID), getApp().globalData.PSESSID && (n.PSESSID = getApp().globalData.PSESSID), 
        getApp().globalData.WebUserID && (n.WebUserID = getApp().globalData.WebUserID), 
        o = a ? a + t.url : this.getConfig().SITEBASEURL + t.url, this.getConfig().ADD_QUERYSTRING && (o.indexOf("?") > -1 ? o += "&" + this.getConfig().ADD_QUERYSTRING : o += "?" + this.getConfig().ADD_QUERYSTRING);
        var r = wx.getStorageSync("invite");
        o.toLowerCase().indexOf("regorbinduser") > -1 && r && (n.invite = r), t.method && ("post" == t.method.toLowerCase() && (n = this.modifyPostParam(n), 
        i = i || {
            "content-type": "application/x-www-form-urlencoded;"
        }), t.method = t.method.toUpperCase()), t.hideLoading || wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), wx.request({
            url: o,
            data: n,
            method: t.method || "GET",
            header: i || {
                "content-type": "application/json"
            },
            success: function(a) {
                if (a.statusCode && 200 != a.statusCode) return wx.hideToast(), void wx.showModal({
                    content: "" + a.errMsg
                });
                t.hideLoading || wx.hideToast(), !a.data || a.data.success || 1 != a.data.needAuthorized ? "function" == typeof t.success && t.success(a.data) : e.showModal({
                    title: "提示",
                    content: a.data.msg
                });
            },
            fail: function(e) {
                wx.showModal({
                    content: "请求失败 " + e.errMsg
                }), "function" == typeof t.fail && t.fail(e.data);
            },
            complete: function(e) {
                "function" == typeof t.complete && t.complete(e.data);
            }
        });
    },
    findTabBarPage: function() {
        var t = null;
        try {
            for (var e = this.getCurPage().route + "_tabbar", a = require("tabbarlist.js"), o = Object.keys(a) || [], n = 0; n < o.length; n++) if (e === o[n]) {
                t = e;
                break;
            }
        } catch (t) {}
        return t;
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

module.exports = a;