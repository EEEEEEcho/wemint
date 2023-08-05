var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = getApp(), o = {
    registerGlobalVar: function(t, e) {
        this[t] = e;
    },
    loadPageModules: function(t) {
        var e = this, o = getCurrentPages()[getCurrentPages().length - 1];
        this.sendRequest({
            url: "/index.php?c=front/WxApp/PageApi&a=getPageModules&publish=1&sortcol=ShowOrder&page=HomeIndex&justCache=" + e.getConfig().ModuleDataJustFromCache,
            method: "POST",
            success: function(t) {
                t.success ? (o.setData({
                    modules: t.modules
                }), e.CACHEKEY = t.cachekey) : console.log("getPageModules fail：" + t.msg);
            },
            fail: function(t) {
                console.log("getPageModules fail");
            }
        });
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
        }, t.getPageUrl = function(t, o) {
            e.getPageUrl(t, o);
        }, t.navTo = function(o) {
            var a = o.currentTarget.dataset.linktype, n = o.currentTarget.dataset.linkid, i = o.currentTarget.dataset.linknorepeat;
            if ("string" == typeof i && "1" == i) {
                if (1 == t.data.navGoIng) return;
                t.data.navGoIng = !0, setTimeout(function() {
                    t.data.navGoIng = !1;
                }, 500);
            }
            var s = [], r = o.currentTarget.dataset.linkdata;
            if ("string" == typeof r && (r = JSON.parse(r))) for (var u in r) {
                var l = r[u];
                "string" != typeof l && "number" != typeof l || (s[u] = l);
            }
            e.navTo(a, n, s);
        }, t.M_doSearch = function(o) {
            e.doSearch(o, t);
        }, t.M_onSearchInput = function(t) {}, t.M_onSearchInputFocus = function(t) {
            var o = t.currentTarget.dataset.moduleid;
            e.setModuleData(o, {
                HidePlaceHolder: 1
            });
        }, t.M_onSearchInputBlur = function(o) {
            e.onSearchInput(o, t);
        }, t.M_slideImgLoad = function(o) {
            e.slideImgLoad(o, t);
        }, t.M_getCoupon = function(o) {
            e.getCoupon(o, t);
        }, t.onCustomFormSubmit = function(o) {
            e.onCustomFormSubmit(o, t);
        }, t.onCustomFormSelectChange = function(o) {
            e.onCustomFormSelectChange(o, t);
        }, t.onCustomFormDateChange = function(o) {
            e.onCustomFormDateChange(o, t);
        }, t.onCustomFormTimeChange = function(o) {
            e.onCustomFormTimeChange(o, t);
        }, t.onCustomFormDateTap = function(o) {
            e.onCustomFormDateTap(o, t);
        }, t.onCustomFormDateTimeChange = function(o) {
            e.onCustomFormDateTimeChange(o, t);
        }, t.onCustomFormDateTimeClear = function(o) {
            e.onCustomFormDateTimeClear(o, t);
        }, t.onCustomRegionChange = function(o) {
            e.onCustomRegionChange(o, t);
        }, t.onCustomFormTextInputChange = function(o) {
            e.onCustomFormTextInputChange(o, t);
        }, t.onCustomFormCheckboxChange = function(o) {
            e.onCustomFormCheckboxChange(o, t);
        }, t.onCustomFormRadioChange = function(o) {
            e.onCustomFormRadioChange(o, t);
        }, t.onClickMap = function(t) {
            return e.getLocation(t.currentTarget.dataset.lat, t.currentTarget.dataset.lng, t.currentTarget.dataset.title, t.currentTarget.dataset.addr), 
            !1;
        }, t.ImgchangeVideo = function(t) {
            e.setModuleData(t.currentTarget.dataset.moduleid, {
                WxappShow: !1
            });
        };
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
    getUrlByLinkType: function(e, o, a) {
        var n = {};
        n.HomeIndex = "/pages/index", n.UserCenter = "/pages/ucenter/index", n.ShopCart = "/pages/shop/shopcart", 
        n.AboutUs = "/pages/company/aboutus", n.ContactUs = "/pages/company/contact", n.ProductList = "/pages/productlist", 
        n.ProductClass = "/pages/productlist?classid=$id", n.ProductDetail = "/pages/productdetail?id=$id", 
        n.NewsList = "/pages/newslist", n.NewsClass = "/pages/newslist?classid=$id", n.NewsDetail = "/pages/newsdetail?id=$id", 
        n.CaseList = "/pages/company/caselist", n.CaseClass = "/pages/company/caselist?classid=$id", 
        n.CaseDetail = "/pages/company/casedetail?id=$id";
        var i = this.getUrlConfig();
        for (var s in i) "object" == t(i[s]) ? n[s] = i[s].url : n[s] = i[s];
        var r = n[e];
        if (r && (r = r.replace("$id", o), "object" == (void 0 === a ? "undefined" : t(a)) && a)) for (var s in a) r.indexOf("?") > -1 ? r += "&" + s + "=" + encodeURI(a[s]) : r += "?" + s + "=" + encodeURI(a[s]);
        return r;
    },
    navTo: function(t, e, o) {
        if ("OneKeyPhoneCall" != t) if ("OneKeyNav" != t) {
            var a = this.getUrlByLinkType(t, e, o);
            a && ("HomeIndex" == t ? wx.reLaunch({
                url: a
            }) : this.navToUrl(a));
        } else getApp().getLocation(); else getApp().phoneCall();
    },
    navToUrl: function(t) {
        if (t.indexOf("?") > -1) for (var e = {}, o = t.split("?")[1].split("&"), a = 0; a < o.length; a++) {
            var n = o[a].split("=");
            e[this.trim(n[0])] = this.trim(n[1]);
        }
        wx.navigateTo({
            url: t
        });
    },
    shareAppMessage: function(e) {
        var o = "pages/index", a = getApp().globalData.appTitle, n = getApp().globalData.appDescription;
        return "object" == (void 0 === e ? "undefined" : t(e)) ? (e.url && (o = e.url), 
        e.title && (a = e.title), e.desc && (n = e.desc)) : "string" == typeof e && e && (o = e), 
        {
            title: a,
            desc: n,
            path: o
        };
    },
    getPageUrl: function(t, e) {
        var o = getCurrentPages()[getCurrentPages().length - 1].__route__, a = [];
        for (var n in e) a.push(n + "=" + e[n]);
        return a.length > 0 && (o += "?" + a.join("&")), t.setData({
            pageurl: o
        }), o;
    },
    onCustomFormSubmit: function(t, o) {
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
                    var a = o.data.globaldata || {};
                    a.customformvalues = {}, o.setData({
                        globaldata: a
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
        var o = {};
        for (var a in t) if (a.indexOf("-fieldID") > -1) {
            var n = t[a];
            o[n] = {
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
        for (var s in t) if (o[s]) {
            if ("string" == typeof t[s] && (t[s] = t[s].replace(/(^\s*)|(\s*$)/g, "")), o[s] && o[s].require) {
                if (!t[s]) return e.showModal({
                    title: "提示",
                    content: "请输入" + o[s].fieldName
                }), !1;
                if (t[s] instanceof Array && 0 == t[s].length) return e.showModal({
                    title: "提示",
                    content: "请输入" + o[s].fieldName
                }), !1;
            }
            var r = o[s].checkType;
            if ("8" == o[s].fieldType && (r = "8"), i[r]) {
                var u = new RegExp(i[r], "i");
                if (t[s] && !u.test(t[s])) return e.showModal({
                    title: "提示",
                    content: o[s].fieldName + "格式不正确"
                }), !1;
            }
        }
        return !0;
    },
    onCustomFormTextInputChange: function(t, e) {
        var o = t.detail.value;
        this.setCustomFormPageData(t, e, o);
    },
    onCustomFormRadioChange: function(t, e) {
        var o = t.detail.value;
        this.setCustomFormPageData(t, e, o);
    },
    onCustomFormSelectChange: function(t, e) {
        var o = t.currentTarget.dataset.array[t.detail.value];
        this.setCustomFormPageData(t, e, o);
    },
    onCustomFormCheckboxChange: function(t, e) {
        var o = t.detail.value;
        this.setCustomFormPageData(t, e, o);
    },
    onCustomFormDateChange: function(t, e) {
        var o = t.detail.value;
        this.setCustomFormPageData(t, e, o);
    },
    onCustomFormTimeChange: function(t, e) {
        var o = t.detail.value;
        this.setCustomFormPageData(t, e, o);
    },
    onCustomRegionChange: function(t, e) {
        var o = new Array();
        for (var a in t.detail.value) o.push(t.detail.value[a]);
        var n = o.join(",");
        this.setCustomFormPageData(t, e, n);
    },
    setCustomFormPageData: function(t, e, o) {
        var a = t.currentTarget.dataset.col, n = e.data.globaldata || {}, i = n.customformvalues || {};
        i[a + "val"] = o, n.customformvalues = i, e.setData({
            globaldata: n
        });
    },
    doSearch: function(t, e) {
        var o = this.trim(t.detail.value);
        if (o) {
            var a = this.getUrlByLinkType("ProductList", 0);
            a = a.indexOf("?") > -1 ? a + "&keyword=" + o : a + "?keyword=" + o, wx.navigateTo({
                url: a
            });
        }
    },
    onSearchInput: function(t, e) {
        var o = this.trim(t.detail.value), a = t.currentTarget.dataset.moduleid;
        o ? this.setModuleData(a, {
            HidePlaceHolder: 1
        }) : this.setModuleData(a, {
            HidePlaceHolder: 0
        });
    },
    getCoupon: function(t, e) {
        var o = this, a = e.data.globaldata || {};
        if (a.gettingCoupon) console.log("不能重复点击领取按钮"); else {
            a.gettingCoupon = !0, e.setData({
                globaldata: a
            }), setTimeout(function() {
                a.gettingCoupon = !1, e.setData({
                    globaldata: a
                });
            }, 2e3);
            var n = function() {
                o.loadModuleData(t.currentTarget.dataset.moduleid), wx.showToast({
                    title: "领取成功",
                    icon: "success",
                    duration: 3e3
                });
            }, i = function(t, e) {
                getApp().getCoupon(t, e);
            };
            getApp().getCoupon(t.currentTarget.dataset.couponid, n, null, function() {
                o.ShopUtil.showRegUI({
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
            success: function(o) {
                if (o.success) {
                    for (var a = e.getCurPage(), n = a.data.modules, i = 0; i < n.length; i++) parseInt(n[i].ModuleID) == parseInt(t) && (n[i] = o.data);
                    a.setData({
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
        for (var o = this.getCurPage(), a = o.data.modules, n = 0; n < a.length; n++) if (parseInt(a[n].ModuleID) == parseInt(t)) for (var i in e) a[n][i] = e[i];
        o.setData({
            modules: a
        });
    },
    slideImgLoad: function(t, e) {
        var o = this.getImageSize(t), a = t.currentTarget.dataset.moduleid;
        e.data["slide" + a] || (e.data.globaldata.slideheight || (e.data.globaldata.slideheight = {}), 
        e.data.globaldata.slideheight[a] = o.imageHeight, e.data["slide" + a] = !0);
    },
    getImageSize: function(t) {
        var e = {}, o = t.detail.width, a = t.detail.height, n = a / o;
        return wx.getSystemInfo({
            success: function(t) {
                var i = t.windowWidth, s = t.windowHeight;
                n < s / i ? (e.imageWidth = i, e.imageHeight = i * a / o) : (e.imageHeight = s, 
                e.imageWidth = s * o / a);
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
    getLocationByAddress: function(t, e, o, a) {
        var n = this, i = {
            url: "/index.php?c=Front/WxApp/Amap&a=geo",
            data: {
                addr: a
            },
            success: function(i) {
                i.success ? wx.openLocation({
                    name: o,
                    address: a,
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
    getLocation: function(t, e, o, a) {
        t = Number(t), e = Number(e), t > 0 && e > 0 ? wx.openLocation({
            name: o,
            address: a,
            longitude: e,
            latitude: t
        }) : this.getLocationByAddress(t, e, o, a);
    },
    modifyPostParam: function(t) {
        var e, o, a, n, i, s, r = "";
        for (e in t) if ((o = t[e]) instanceof Array) for (s = 0; s < o.length; ++s) n = o[s], 
        (i = {})[e + "[" + s + "]"] = n, r += this.modifyPostParam(i) + "&"; else if (o instanceof Object) for (a in o) n = o[a], 
        (i = {})[e + "[" + a + "]"] = n, r += this.modifyPostParam(i) + "&"; else void 0 !== o && null !== o && (r += encodeURIComponent(e) + "=" + encodeURIComponent(o) + "&");
        return r.length ? r.substr(0, r.length - 1) : r;
    },
    sendRequest: function(t, e) {
        var o, a = t.data || {}, n = t.header;
        a.app_id = this.getConfig().APPID, this.getConfig().SITEID && (a.InitSiteID = this.getConfig().SITEID), 
        this.getConfig().DATAID && (a.dataId = this.getConfig().DATAID), getApp().globalData.PSESSID && (a.PSESSID = getApp().globalData.PSESSID), 
        getApp().globalData.WebUserID && (a.WebUserID = getApp().globalData.WebUserID), 
        o = e ? e + t.url : this.getConfig().SITEBASEURL + t.url, this.getConfig().ADD_QUERYSTRING && (o.indexOf("?") > -1 ? o += "&" + this.getConfig().ADD_QUERYSTRING : o += "?" + this.getConfig().ADD_QUERYSTRING);
        var i = wx.getStorageSync("invite");
        o.toLowerCase().indexOf("regorbinduser") > -1 && i && (a.invite = i), t.method && ("post" == t.method.toLowerCase() && (a = this.modifyPostParam(a), 
        n = n || {
            "content-type": "application/x-www-form-urlencoded;"
        }), t.method = t.method.toUpperCase()), t.hideLoading || wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), wx.request({
            url: o,
            data: a,
            method: t.method || "GET",
            header: n || {
                "content-type": "application/json"
            },
            success: function(e) {
                if (e.statusCode && 200 != e.statusCode) return wx.hideToast(), void wx.showModal({
                    content: "" + e.errMsg
                });
                t.hideLoading || wx.hideToast(), "function" == typeof t.success && t.success(e.data);
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
    }
};

module.exports = o;