var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = (require("/components/utils/ald-stat.js"), require("/components/utils/qqmap-wx-jssdk.min.js")), o = require("/components/utils/jsNumber.js"), a = require("/getErrorData.js"), n = function() {
    var e = wx.getExtConfigSync();
    return e.ext ? e.ext : require("config.js");
}();

App({
    WxParse: require("/components/wxParse/wxParse.js"),
    windowWidth: 750,
    windowHeight: 600,
    pixelRatio: 2,
    denyGetUserInfo: !1,
    onLaunch: function() {
        var e = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getStoreSetting",
            method: "GET",
            success: function(o) {
                o.success ? "1" === o.StoreSetting && (wx.setStorageSync("StoreSetting", o.StoreSetting), 
                e.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=getTencentMapApiKey",
                    method: "GET",
                    success: function(a) {
                        a.success ? wx.getSetting({
                            success: function(o) {
                                if (o.authSetting["scope.userLocation"]) {
                                    if (o.authSetting["scope.userLocation"]) return;
                                    e.defaultAddress(e);
                                } else wx.getLocation({
                                    type: "wgs84",
                                    success: function(o) {
                                        new t({
                                            key: a.data.key
                                        }).reverseGeocoder({
                                            location: {
                                                latitude: Number(o.latitude),
                                                longitude: Number(o.longitude)
                                            },
                                            success: function(t) {
                                                wx.setStorageSync("resultData", t);
                                                var a = "&lng=" + o.longitude + "&lat=" + o.latitude + "&type=1&keyword=&page=1&pagesize=20";
                                                e.sendRequest({
                                                    url: "/index.php?c=Front/WxApp/ShopApi&a=getIndexStoreList" + a,
                                                    method: "GET",
                                                    success: function(e) {
                                                        if (e.success) {
                                                            var t = e.data.list[0], o = {
                                                                start_address: t.ProvinceName + t.CityName + t.DistrictName + t.Address,
                                                                city: t.CityName,
                                                                district: t.DistrictName,
                                                                lat: t.Lantitude,
                                                                lng: t.Longtitude,
                                                                Name: t.Name,
                                                                distance: t.distance,
                                                                ProvinceName: t.ProvinceName,
                                                                storeID: t.Id
                                                            };
                                                            wx.setStorageSync("options", o);
                                                        }
                                                    }
                                                }), wx.setStorageSync("isFirstIn", "1"), wx.navigateTo({
                                                    url: "/pages/storechoose/storechoose/index?start_address=" + t.result.address + "&city=" + t.result.address_component.city + "&district=" + t.result.address_component.district + "&lat=" + t.result.location.lat + "&lng=" + t.result.location.lng
                                                });
                                            }
                                        });
                                    },
                                    fail: function(t) {
                                        e.defaultAddress(e);
                                    }
                                });
                            },
                            fail: function(e) {}
                        }) : e.showModal({
                            title: "提示",
                            content: o.msg
                        });
                    }
                })) : e.showModal({
                    title: "提示",
                    content: o.msg
                });
            }
        }), o.jsNumber(), e.loadBaseInfo(), wx.setNavigationBarTitle({
            title: e.globalData.appTitle
        }), wx.getSystemInfo({
            success: function(t) {
                e.pixelRatio = t.pixelRatio, e.windowWidth = t.windowWidth, e.windowHeight = t.windowHeight;
            }
        });
    },
    jurisdictionJudge: function(e, t, o) {
        wx.getSetting({
            success: function(o) {
                t && t(o.authSetting[e], o.authSetting);
            },
            fail: function() {
                o && o();
            }
        });
    },
    commonAjax: function(e) {
        var t = !1, o = 0, s = {}, i = "";
        wx.request({
            url: e.requestUrl,
            data: e.data,
            method: e.method || "GET",
            header: e.header || {
                "content-type": "application/json"
            },
            success: function(a) {
                o = a.statusCode, s = a.header, a.data && !a.data.success && (t = !0, i = JSON.stringify(a.data)), 
                "function" == typeof e.success && e.success(a);
            },
            fail: function(o) {
                t = !0, i = o.errMsg, "function" == typeof e.fail && e.fail(o);
            },
            complete: function(r) {
                "function" == typeof e.complete && e.complete(r.data), t && a.getError({
                    appId: n.APPID,
                    appTitle: n.APPTITLE,
                    appSecret: n.APPSECRET,
                    programType: 1,
                    siteId: n.SITEID,
                    dataId: n.DATAID,
                    siteBaseUrl: n.SITEBASEURL,
                    industry: n.Industry,
                    Tpl: n.Tpl,
                    errMsgData: i,
                    userID: e.data.WebUserID || 0,
                    requestData: {
                        url: e.requestUrl || "",
                        data: JSON.stringify(e.data),
                        method: e.method || "GET",
                        header: JSON.stringify(s || {}),
                        statusCode: o
                    }
                });
            }
        });
    },
    getRpxNum: function(e) {
        var t = e.rpx, o = void 0 === t ? 0 : t, a = e.type, n = void 0 === a ? "h" : a, s = e.rateFlag, i = void 0 !== s && s, r = wx.getSystemInfoSync(), c = r.windowWidth, l = 750 / c, u = r.windowHeight * l - o, d = c * l - o;
        return n && "h" !== n ? "w" === n ? i ? {
            width: d,
            rate: l
        } : d : void 0 : i ? {
            height: u,
            rate: l
        } : u;
    },
    initWidgets: function() {
        getCurrentPages()[getCurrentPages().length - 1].setData({
            is_popus_hidden: !0,
            is_loading: !1,
            is_popus_prizeImg: "",
            is_popus_msg: "",
            is_popus_text: "",
            is_popus_status: 1
        });
    },
    onShow: function(e) {
        if (!wx.getStorageSync("invite") && e.query && e.query.invite && wx.setStorageSync("invite", e.query.invite), 
        !wx.getStorageSync("invite") && e.query && e.query.scene) {
            var t = {};
            decodeURIComponent(e.query.scene).split("&").map(function(e, o) {
                if (-1 !== e.indexOf("=")) {
                    var a = e.split("=");
                    t[a[0]] = a[1];
                }
                if (-1 !== e.indexOf("_")) {
                    var n = e.split("_");
                    t[n[0]] = n[1], wx.setStorageSync("invite", n[1]);
                }
            });
        }
        var o = new Date().getTime(), a = wx.getStorageSync("onHideTime");
        a && o - a >= 18e5 && wx.getStorageSync("otherMemberCardId") && (wx.removeStorageSync("otherMemberCardId"), 
        wx.removeStorageSync("onHideTime"));
    },
    onHide: function() {
        var e = this;
        wx.setStorageSync("onHideTime", new Date().getTime()), e.globalData.cardSocket && (e.globalData.cardSocket.close(), 
        setTimeout(function() {
            e.globalData.cardSocket = void 0;
        }, 200));
    },
    defaultAddress: function(e) {
        var o = "113.315353";
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getIndexStoreList&lng=113.315353&lat=23.086800&type=2&keyword=&page=1&pagesize=20",
            method: "GET",
            success: function(a) {
                if (a.success) {
                    var n = a.data.list[0], s = {
                        start_address: n.ProvinceName + n.CityName + n.DistrictName + n.Address,
                        city: n.CityName,
                        district: n.DistrictName,
                        lat: n.Lantitude,
                        lng: n.Longtitude,
                        Name: n.Name,
                        distance: n.distance,
                        ProvinceName: n.ProvinceName,
                        storeID: n.Id
                    };
                    if (wx.setStorageSync("options", s), wx.getStorageSync("isFirstIn") && "1" === wx.getStorageSync("isFirstIn")) return;
                    wx.setStorageSync("isFirstIn", "1"), e.sendRequest({
                        url: "/index.php?c=Front/WxApp/ShopApi&a=getTencentMapApiKey",
                        method: "GET",
                        success: function(e) {
                            e.success && new t({
                                key: e.data.key
                            }).reverseGeocoder({
                                location: {
                                    latitude: Number("23.086800"),
                                    longitude: Number(o)
                                },
                                success: function(e) {
                                    wx.setStorageSync("resultData", e), wx.navigateTo({
                                        url: "/pages/storechoose/storechoose/index?start_address=" + e.result.address + "&city=" + e.result.address_component.city + "&district=" + e.result.address_component.district + "&lat=" + e.result.location.lat + "&lng=" + e.result.location.lng
                                    });
                                }
                            });
                        }
                    });
                } else e.showModal({
                    title: "提示",
                    content: a.msg
                });
            },
            fail: function(e) {
                this.showModal({
                    title: "提示",
                    content: e.msg
                });
            }
        });
    },
    shareAppMessage: function(t) {
        var o = "pages/shop/index", a = this.globalData.appTitle, n = this.globalData.appDescription, s = "";
        "object" == (void 0 === t ? "undefined" : e(t)) ? (t.url && (o = t.url), t.title && (a = t.title), 
        t.desc && (n = t.desc), t.imageUrl && (s = t.imageUrl)) : "string" == typeof t && t && (o = t);
        var i = wx.getStorageSync("invite");
        return i && (o += (o.indexOf("?") > -1 ? "&" : "?") + "invite=" + i), o += (o.indexOf("?") > -1 ? "&" : "?") + "fromShare=1", 
        {
            title: a,
            desc: n,
            path: o,
            imageUrl: s
        };
    },
    getPageUrl: function(e, t) {
        var o = getCurrentPages()[getCurrentPages().length - 1].__route__, a = [];
        for (var n in t) a.push(n + "=" + t[n]);
        return a.length > 0 && (o += "?" + a.join("&")), e.setData({
            pageurl: o
        }), o;
    },
    showGetUserInfoSetting: function(e) {
        wx.getSetting({
            success: function(t) {
                wx.openSetting({
                    success: function(t) {
                        t.authSetting["scope.userInfo"] && e.onUserInfoAuth && e.onUserInfoAuth(), t.authSetting["scope.userInfo"] || e.onUserInfoDeny && e.onUserInfoDeny();
                    }
                });
            }
        });
    },
    getUserInfo: function(e, t) {
        var o = this;
        if (void 0 === o.denyGetUserInfo && (o.denyGetUserInfo = !1), this.globalData.userInfo) "function" == typeof e && e(this.globalData.userInfo); else {
            var a = function() {
                var a = getCurrentPages()[getCurrentPages().length - 1];
                a && (wx.getSystemInfo({
                    success: function(e) {
                        "iOS" === e.system.split(" ")[0] ? a.setData({
                            isIOS: !0
                        }) : "Android" === e.system.split(" ")[0] && a.setData({
                            isAndroid: !0
                        });
                    }
                }), a.setData({
                    showAuthGetUserInfoBtn: !0,
                    isPanelOpacity: !1,
                    siteLogo: o.globalData.baseInfo.SiteLogo,
                    appTitle: o.globalData.appTitle
                }), o.hasShowAuthGetUserInfoBtn = !0, a.getUserInfoCallback = function(n) {
                    a.setData({
                        showAuthGetUserInfoBtn: !1,
                        isIOS: !1,
                        isAndroid: !1
                    }), "getUserInfo:fail auth deny" == n.detail.errMsg ? (o.denyGetUserInfo = !0, wx.openSetting({
                        success: function(e) {}
                    }), "function" == typeof t && t(n.detail)) : "getUserInfo:ok" == n.detail.errMsg && (o.denyGetUserInfo = !1, 
                    o.globalData.userInfo = n.detail.userInfo, n.detail.iv && (o.globalData.userInfo.iv = n.detail.iv), 
                    n.detail.encryptedData && (o.globalData.userInfo.encryptedData = n.detail.encryptedData), 
                    "function" == typeof e && e(o.globalData.userInfo));
                });
            }, n = function() {
                o.globalData.completeGetUserInfoTimeout = !1;
                var a = {
                    withCredentials: !1,
                    success: function(t) {
                        o.denyGetUserInfo = !1, o.globalData.userInfo = t.userInfo, t.iv && (o.globalData.userInfo.iv = t.iv), 
                        t.encryptedData && (o.globalData.userInfo.encryptedData = t.encryptedData), "function" == typeof e && e(o.globalData.userInfo);
                    },
                    fail: function(e) {
                        "getUserInfo:fail auth deny" == e.errMsg && (o.denyGetUserInfo = !0), o.showModal({
                            title: "提示",
                            content: "获取用户信息失败：" + e.errMsg + ",可能小程序部分功能无法正常使用"
                        }), "function" == typeof t && t(e);
                    },
                    complete: function(e) {
                        o.globalData.completeGetUserInfoTimeout && clearInterval(o.globalData.completeGetUserInfoTimeout);
                    }
                };
                wx.getUserInfo(a);
            };
            wx.getSetting({
                success: function(e) {
                    e.authSetting["scope.userInfo"] ? n() : a();
                }
            });
        }
    },
    getVerifyCode: function(e, t, o, a) {
        var n = this;
        n.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getVerifyCode",
            method: "POST",
            data: {
                vtype: t || "",
                mobile: e
            },
            success: function(e) {
                e.success ? (n.showToast({
                    title: "验证码发送成功",
                    icon: "success"
                }), "function" == typeof o && o(e)) : (n.showModal({
                    title: "提示",
                    content: "获取验证码失败：" + e.msg
                }), "function" == typeof a && a(e.msg));
            },
            fail: function(e) {
                n.showModal({
                    title: "提示",
                    content: "获取验证码失败：" + e.errMsg
                }), "function" == typeof a && a(e.errMsg);
            }
        });
    },
    login: function(t) {
        var o = this, a = null, s = null, i = 0;
        "object" == (void 0 === t ? "undefined" : e(t)) ? (i = t.forcereg, a = t.success, 
        s = t.fail) : a = t, wx.login({
            success: function(e) {
                e.code && o.getUserInfo(function(t) {
                    var r = wx.getStorageSync("invite") ? wx.getStorageSync("invite") : 0;
                    o.sendRequest({
                        url: "/index.php?c=Front/WxApp/JsonApi&a=loginUser" + (n.PSESSID ? "&PSESSID=" + n.PSESSID : ""),
                        method: "POST",
                        data: {
                            code: e.code,
                            notAutoReg: 1,
                            userInfo: t,
                            invite: r
                        },
                        success: function(e) {
                            e.openid && (o.globalData.userInfo.openid = e.openid), e.success ? (o.globalData.PSESSID = e.PSESSID, 
                            o.globalData.WebUserID = e.WebUserID, o.globalData.hasMobile = e.hasMobile || 0, 
                            o.globalData.session_key = e.session_key, wx.setStorageSync("invite", e.WebUserID), 
                            wx.setStorageSync("phoneauthorization", 1), wx.setStorageSync("hasMobile", e.hasMobile), 
                            e.WebUserID && o.globalData.business_card_choice && 1 == o.globalData.business_card_choice && o.gettBusinessCardEntrance(e.WebUserID), 
                            a && a()) : i && 1 == e.needreg ? (o.globalData.PSESSID = e.PSESSID, o.globalData.session_key = e.session_key, 
                            i()) : e.needreg || (o.showModal({
                                title: "提示",
                                content: "登录失败：请确认你在发布时小程序时填写的AppID和AppSecrect是否正确；" + e.msg
                            }), o.globalData.businessCardInfo = {}, s && s());
                        },
                        fail: function(e) {
                            o.showModal({
                                title: "提示",
                                content: "登录失败：" + e
                            }), o.globalData.businessCardInfo = {}, s && s();
                        }
                    });
                }, function(e) {
                    s && s();
                });
            }
        });
    },
    gettBusinessCardEntrance: function(e) {
        var t = this, o = getCurrentPages()[getCurrentPages().length - 1];
        t.sendRequest({
            url: "/index.php?c=front/WxApp/BusinessCard/BusinessCard&a=gettBusinessCardEntrance",
            method: "GET",
            data: {
                userID: e
            },
            success: function(e) {
                t.globalData.businessCardInfo = e.info, wx.setStorageSync("businessCardInfo", e.info), 
                o.setData({
                    backselectFlag: !1
                });
            },
            fail: function(e) {
                t.globalData.businessCardInfo = {}, console.log("gettBusinessCardEntrance fail");
            }
        });
    },
    doAfterUserInfoAuth: function(e) {
        var t = this, o = getCurrentPages()[getCurrentPages().length - 1], a = void 0 === e.timesLimit || e.timesLimit;
        e.forcereg || (e.forcereg = e.success);
        var n = function() {
            var n = o.options;
            a ? t.getAfterUserInfoAuthRunTimes() < 1 ? (e.success && e.success(n), t.addAfterUserInfoAuthRunTimes()) : e.success && e.success(n) : (e.success && e.success(n), 
            t.addAfterUserInfoAuthRunTimes()), o.setData({
                showAuthGetUserInfoBtn: !1,
                isPanelOpacity: !1,
                isIOS: !1,
                isAndroid: !1
            });
        };
        this.globalData.WebUserID ? n() : this.login({
            success: n,
            fail: function() {
                var t = o.options;
                e.fail && e.fail(t);
            },
            forcereg: function() {
                var t = o.options;
                e.forcereg && e.forcereg(t);
            }
        });
    },
    addAfterUserInfoAuthRunTimes: function() {
        var e = this, t = getCurrentPages()[getCurrentPages().length - 1], o = e.getAfterUserInfoAuthRunTimes();
        t.setData({
            afterUserInfoAuthRunTimes: o + 1
        });
    },
    getAfterUserInfoAuthRunTimes: function() {
        var e = getCurrentPages()[getCurrentPages().length - 1];
        return parseInt(e.data.afterUserInfoAuthRunTimes || 0);
    },
    getAppId: function() {
        return this.globalData.appId;
    },
    showToast: function(e) {
        wx.showToast({
            title: e.title,
            icon: e.icon,
            duration: e.duration || 1500,
            success: function(t) {
                "function" == typeof e.success && e.success(t);
            },
            fail: function(t) {
                "function" == typeof e.fail && e.fail(t);
            },
            complete: function(t) {
                "function" == typeof e.complete && e.complete(t);
            }
        });
    },
    hideToast: function() {
        wx.hideToast();
    },
    modifyPostParam: function(e) {
        var t, o, a, n, s, i, r = "";
        for (t in e) if ((o = e[t]) instanceof Array) for (i = 0; i < o.length; ++i) n = o[i], 
        (s = {})[t + "[" + i + "]"] = n, r += this.modifyPostParam(s) + "&"; else if (o instanceof Object) for (a in o) n = o[a], 
        (s = {})[t + "[" + a + "]"] = n, r += this.modifyPostParam(s) + "&"; else void 0 !== o && null !== o && (r += encodeURIComponent(t) + "=" + encodeURIComponent(o) + "&");
        return r.length ? r.substr(0, r.length - 1) : r;
    },
    showModal: function(t) {
        var o = t && "object" === e(t.content) ? t.content.message || "未知错误" : t.content || "未知错误";
        wx.showModal({
            title: t.title || "提示",
            content: o,
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
    sendRequest: function(e, t, o) {
        void 0 === o && (o = 0);
        var a, s = this, i = e.data || {}, r = e.header;
        i.app_id || (i.app_id = this.getAppId()), this.globalData.siteId && (i.InitSiteID = this.globalData.siteId), 
        this.globalData.dataId && (i.dataId = this.globalData.dataId), this.globalData.PSESSID && (i.PSESSID = this.globalData.PSESSID), 
        this.globalData.WebUserID && (i.WebUserID = this.globalData.WebUserID), a = t ? t + e.url : this.globalData.siteBaseUrl + e.url, 
        n.ADD_QUERYSTRING && (a.indexOf("?") > -1 ? a += "&" + n.ADD_QUERYSTRING : a += "?" + n.ADD_QUERYSTRING), 
        n.PublishTime && (a.indexOf("?") > -1 ? a += "&PublishTime=" + n.PublishTime : a += "?PublishTime=" + n.PublishTime);
        var c = wx.getStorageSync("invite"), l = a.toLowerCase();
        (l.indexOf("regorbinduser") > -1 || l.indexOf("loginuser") > -1) && c && (i.invite = c), 
        e.method && ("post" == e.method.toLowerCase() && (i = this.modifyPostParam(i), r = r || {
            "content-type": "application/x-www-form-urlencoded;"
        }), e.method = e.method.toUpperCase()), e.hideLoading || wx.showLoading({
            title: "加载中...",
            mask: !0
        }), this.commonAjax({
            requestUrl: a,
            data: i,
            method: e.method,
            header: r,
            success: function(t) {
                t.statusCode && 200 != t.statusCode ? s.showModal({
                    content: "系统繁忙，请稍后再试！"
                }) : "function" == typeof e.success && e.success(t.data);
            },
            fail: function(a) {
                o < 3 ? setTimeout(function() {
                    s.sendRequest(e, t, ++o);
                }, 1e3) : (e.chatHiddenModal || s.showModal({
                    content: "请求失败 " + a.errMsg
                }), "function" == typeof e.fail && e.fail(a.data));
            },
            complete: function(t) {
                e.hideLoading || wx.hideLoading(), "function" == typeof e.complete && e.complete(t.data);
            }
        });
    },
    sendRequestSecOrder: function(e, t) {
        var o, a = this, s = e.data || {}, i = e.header;
        s.app_id || (s.app_id = this.getAppId()), this.globalData.siteId && (s.InitSiteID = this.globalData.siteId), 
        this.globalData.dataId && (s.dataId = this.globalData.dataId), this.globalData.PSESSID && (s.PSESSID = this.globalData.PSESSID), 
        this.globalData.WebUserID && (s.WebUserID = this.globalData.WebUserID), o = t ? t + e.url : this.globalData.siteBaseUrl + e.url, 
        n.ADD_QUERYSTRING && (o.indexOf("?") > -1 ? o += "&" + n.ADD_QUERYSTRING : o += "?" + n.ADD_QUERYSTRING);
        var r = wx.getStorageSync("invite"), c = o.toLowerCase();
        (c.indexOf("regorbinduser") > -1 || c.indexOf("loginuser") > -1) && r && (s.invite = r), 
        e.method && ("post" == e.method.toLowerCase() && (s = this.modifyPostParam(s), i = i || {
            "content-type": "application/x-www-form-urlencoded;"
        }), e.method = e.method.toUpperCase()), this.commonAjax({
            requestUrl: o,
            data: s,
            method: e.method,
            header: i,
            success: function(t) {
                if (t.statusCode && 200 != t.statusCode) return a.hideToast(), void a.showModal({
                    content: "系统繁忙，请稍后再试！"
                });
                a.hideToast(), "function" == typeof e.success && e.success(t.data);
            },
            fail: function(t) {
                a.showModal({
                    content: "请求失败 " + t.errMsg
                }), "function" == typeof e.fail && e.fail(t.data);
            },
            complete: function(t) {
                "function" == typeof e.complete && e.complete(t.data);
            }
        });
    },
    uploadRequest: function(e, t) {
        var o, a = this, s = e.formData || {}, i = e.header;
        s.app_id || (s.app_id = this.getAppId()), this.globalData.siteId && (s.InitSiteID = this.globalData.siteId), 
        this.globalData.dataId && (s.dataId = this.globalData.dataId), this.globalData.PSESSID && (s.PSESSID = this.globalData.PSESSID), 
        this.globalData.WebUserID && (s.WebUserID = this.globalData.WebUserID), o = t ? t + e.url : this.globalData.siteBaseUrl + e.url, 
        n.ADD_QUERYSTRING && (o.indexOf("?") > -1 ? o += "&" + n.ADD_QUERYSTRING : o += "?" + n.ADD_QUERYSTRING);
        var r = wx.getStorageSync("invite");
        o.toLowerCase().indexOf("regorbinduser") > -1 && r && (data.invite = r), e.method && ("post" == e.method.toLowerCase() && (data = this.modifyPostParam(data), 
        i = i || {
            "content-type": "application/x-www-form-urlencoded;"
        }), e.method = e.method.toUpperCase()), e.hideLoading || this.showToast({
            title: "加载中...",
            icon: "loading"
        }), wx.uploadFile({
            url: o,
            filePath: e.filePath,
            name: e.name,
            formData: s,
            method: e.method || "GET",
            header: i || {
                "content-type": "application/json"
            },
            success: function(t) {
                if (t.statusCode && 200 != t.statusCode) return a.hideToast(), a.showModal({
                    content: "" + t.errMsg
                }), void ("function" == typeof e.fail && e.fail(t.data));
                a.hideToast(), "function" == typeof e.success && e.success(t.data);
            },
            fail: function(t) {
                e.fail && e.fail(t.data), a.showModal({
                    content: "请求失败 " + t.errMsg
                });
            },
            complete: function(t) {
                "function" == typeof e.complete && e.complete(t.data);
            }
        });
    },
    getSessionKey: function() {
        return this.globalData.session_key;
    },
    setSessionKey: function(e) {
        this.globalData.session_key = e, wx.setStorage({
            key: "session_key",
            data: e
        });
    },
    setGlobalData: function(e, t) {
        this.globalData[e] = t;
    },
    getLocation: function() {
        var e = this, t = Number(e.globalData.locationInfo.latitude), o = Number(e.globalData.locationInfo.longitude);
        t > 0 && o > 0 && wx.openLocation({
            name: e.globalData.appTitle,
            address: e.globalData.locationInfo.address,
            longitude: Number(o),
            latitude: Number(t)
        });
    },
    phoneCall: function() {
        wx.makePhoneCall({
            phoneNumber: this.globalData.baseInfo.Tel
        });
    },
    initBaseInfo: function(e) {
        var t = this;
        e.Banners = this.replaceDomain(e.Banners), e.Images = this.replaceDomain(e.Images), 
        e.Name && (t.globalData.appTitle = e.Name), t.globalData.baseInfo = e, wx.setStorageSync("SiteID", e.SiteID), 
        t.globalData.locationInfo.latitude = e.Lat, t.globalData.locationInfo.longitude = e.Lng, 
        t.globalData.locationInfo.address = e.Address, t.globalData.socket_config = {
            SOCKET_USERNAME: e.SOCKET_USERNAME,
            SOCKET_PASSWD: e.SOCKET_PASSWD,
            SOCKET_URL: e.SOCKET_URL
        };
    },
    loadBaseInfo: function() {
        var e = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getBaseInfo",
            method: "POST",
            hideLoading: !0,
            success: function(t) {
                t.success && (e.initBaseInfo(t.info), e.globalData.business_card_choice = t.business_card_choice, 
                e.globalData.notice = t.notice, e.globalData.language = t.language, e.globalData.getMobileNode = t.getMobileNode, 
                e.globalData.info = t.info, e.globalData.subscribeFormData = t.msgformdata, e.globalData.reserveFormData = t.reserveformdata);
            },
            fail: function(e) {
                console.log("loadBaseInfo fail");
            }
        });
    },
    loadphoneInfo: function(e) {
        var t = this;
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=saveUserMobile",
            method: "POST",
            data: {
                Mobile: e,
                WebUserID: t.globalData.WebUserID
            },
            success: function(e) {
                wx.setStorageSync("hasMobile", 1);
            },
            fail: function(e) {}
        });
    },
    turnOff: function() {
        getCurrentPages()[getCurrentPages().length - 1].setData({
            phonelicense: !1,
            authorizationfailure: !1
        });
    },
    validateForm: function(e, t) {
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
        var s = {
            2: "^[0-9]+$",
            3: "^1\\d{10}$",
            4: "^\\d{3,4}\\-\\d{6,9}$",
            5: "^((1\\d{10})|(\\d{3,4}\\-\\d{6,9}))$",
            6: "^[a-z\\d]+([\\-_\\.][a-z\\d]+)*@([a-z\\d]+[\\-\\.]*)+\\.[a-z\\d]{2,5}$",
            7: "^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$",
            8: "^\\d{4}\\-\\d{1,2}\\-\\d{1,2}\\s+\\d{1,2}:\\d{1,2}$"
        };
        for (var i in t) if (o[i]) {
            if ("string" == typeof t[i] && (t[i] = t[i].replace(/(^\s*)|(\s*$)/g, "")), o[i] && o[i].require) {
                if (!t[i]) return this.showModal({
                    title: "提示",
                    content: "请输入" + o[i].fieldName
                }), !1;
                if (t[i] instanceof Array && 0 == t[i].length) return this.showModal({
                    title: "提示",
                    content: "请输入" + o[i].fieldName
                }), !1;
            }
            var r = o[i].checkType;
            if ("8" == o[i].fieldType && (r = "8"), s[r]) {
                var c = new RegExp(s[r], "i");
                if (t[i] && !c.test(t[i])) return this.showModal({
                    title: "提示",
                    content: o[i].fieldName + "格式不正确"
                }), !1;
            }
        }
        return !0;
    },
    onCustomFormSelectChange: function(e, t) {
        var o = e.currentTarget.dataset.col, a = e.currentTarget.dataset.array, n = {}, s = t.data.customformvalues;
        s || (s = {}), s[o + "val"] = a[e.detail.value], n.customformvalues = s, t.setData(n);
    },
    onCustomFormDateChange: function(e, t) {
        var o = e.currentTarget.dataset.col, a = {}, n = t.data.customformvalues;
        n || (n = {}), n[o + "val"] = e.detail.value, a.customformvalues = n, t.setData(a);
    },
    onCustomFormTimeChange: function(e, t) {
        var o = e.currentTarget.dataset.col, a = {}, n = t.data.customformvalues;
        n || (n = {}), n[o + "val"] = e.detail.value, a.customformvalues = n, t.setData(a);
    },
    onCustomFormDateTap: function(e, t) {
        var o = e.currentTarget.dataset.col;
        t.datetimePicker.setPicker(o + "val", this.onCustomFormDateTimeChange, this.onCustomFormDateTimeClear);
    },
    onCustomFormDateTimeChange: function(e, t) {
        var o = {}, a = e.data.customformvalues;
        a || (a = {});
        var n = e.data[t];
        n = n.replace("年", "-").replace("月", "-").replace("日", ""), a[t] = n, o.customformvalues = a, 
        e.setData(o);
    },
    onCustomFormDateTimeClear: function(e, t) {
        var o = {}, a = e.data.customformvalues;
        a || (a = {}), a[t] = "", o.customformvalues = a, e.setData(o);
    },
    onCustomRegionChange: function(e, t) {
        var o = e.currentTarget.dataset.col, a = new Array();
        for (var n in e.detail.value) a.push(e.detail.value[n]);
        var s = {}, i = t.data.customformvalues;
        i || (i = {}), i[o + "val"] = a.join(","), s.customformvalues = i, t.setData(s);
    },
    replaceDomain: function(e) {
        if (e instanceof Array) for (var t in e) {
            var o = e[t].replace(/http(s)?:\/\/[0-9a-z\-\.]+/gi, "");
            o = this.globalData.siteBaseUrl + o, e[t] = o;
        } else "string" == typeof e && (e = e.replace(/http(s)?:\/\/[0-9a-z\-\.]+/gi, ""), 
        e = this.globalData.siteBaseUrl + e);
        return e;
    },
    getCoupon: function(e, t, o, a) {
        var n = this;
        n.sendRequest({
            url: "/index.php?c=Front/WxApp/ServiceApi&a=getCoupon&CouponID=" + e,
            method: "POST",
            success: function(s) {
                s.success ? t ? t(s) : n.showModal({
                    title: "提示",
                    content: "领取成功，请在 会员中心->我的优惠 里查看"
                }) : 1 == s.needLogin ? n.login({
                    success: function() {
                        n.getCoupon(e, t, o);
                    },
                    forcereg: function() {
                        a && a();
                    }
                }) : o ? o() : n.showModal({
                    title: "提示",
                    content: "领取失败，" + s.msg
                });
            },
            fail: function(e) {
                console.log("getCoupon fail");
            }
        });
    },
    getCoupon2: function(e, t) {
        var o = this;
        o.sendRequest({
            url: "/index.php?c=Front/WxApp/ServiceApi&a=getCoupon&CouponID=" + e,
            method: "POST",
            success: function(e) {
                e.success ? (o.showModal({
                    title: "提示",
                    content: "领取成功，请在 会员中心->我的优惠 里查看"
                }), t && t()) : o.showModal({
                    title: "提示",
                    content: "领取失败，" + e.msg
                });
            },
            fail: function(e) {
                console.log("getCoupon2 fail");
            }
        });
    },
    analyseProductSkusPrice: function(e, t, o) {
        var a = [];
        for (var n in t) a.push(t[n]);
        var s = a.join(",");
        s = (s = s.replace(/(^,)|(,$)/g, "")).split(",").sort().join(",");
        for (var i = 0, r = 0, c = 0, l = 0, u = 0, d = 0; d < e.length; d++) if (s == e[d].Path.replace(/(^,)|(,$)/g, "").split(",").sort().join(",")) {
            r = e[d].Jf_convert, i = e[d].Price, c = e[d].SkuID, l = e[d].surplus, u = e[d].ProductQuantity;
            break;
        }
        return 1 == o ? (r = parseFloat(r).toFixed(2), l = parseFloat(l).toFixed(2)) : i = parseFloat(i), 
        {
            price: i,
            point: r,
            skuid: c,
            surplus: l,
            productQuantity: u
        };
    },
    wxPay: function(e, t) {
        var o = this, a = {};
        e && (a.OrderID = e), t.money && (a.money = t.money), t.formid && (a.form_id = t.formid), 
        this.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=wxPay",
            method: "POST",
            data: a,
            success: function(e) {
                e.success ? wx.requestPayment({
                    timeStamp: e.timeStamp,
                    nonceStr: e.nonceStr,
                    package: e.package,
                    signType: e.signType,
                    paySign: e.paySign,
                    success: function(e) {
                        t.success && t.success(e);
                    },
                    fail: function(e) {
                        t.fail ? t.fail(e) : e.errMsg && e.errMsg.indexOf("cancel") > -1 || o.showModal({
                            title: "提示",
                            content: "支付失败：" + e.errMsg
                        });
                    },
                    complete: function(e) {
                        e.errMsg && e.errMsg.indexOf("requestPayment:cancel") > -1 && t.fail && t.fail(e), 
                        t.complete && t.complete(e);
                    }
                }) : o.showModal({
                    title: "提示",
                    content: "下单失败：" + e.msg
                });
            },
            fail: function(e) {
                o.showModal({
                    title: "提示",
                    content: "支付失败：" + e
                });
            }
        });
    },
    registerGlobalFunctions: function(e) {
        e.appGetLocation = this.getLocation, e.appPhoneCall = this.phoneCall, e.onCustomFormSelectChange = function(t) {
            getApp().onCustomFormSelectChange(t, e);
        }, e.onCustomFormDateChange = function(t) {
            getApp().onCustomFormDateChange(t, e);
        }, e.onCustomFormTimeChange = function(t) {
            getApp().onCustomFormTimeChange(t, e);
        }, e.onCustomFormTextInputChange = function(t) {
            getApp().onCustomFormTimeChange(t, e);
        }, e.onCustomFormDateTap = function(t) {
            getApp().onCustomFormDateTap(t, e);
        }, e.onCustomRegionChange = function(t) {
            getApp().onCustomRegionChange(t, e);
        }, e.hideInfoBlank = function(t) {
            e.setData({
                showAuthGetUserInfoBtn: !1,
                isPanelOpacity: !0
            });
        };
    },
    cloneObj: function(t) {
        var o = t.constructor === Array ? [] : {};
        if ("object" === (void 0 === t ? "undefined" : e(t))) {
            for (var a in t) o[a] = "object" === e(t[a]) && t[a] ? this.cloneObj(t[a]) : t[a];
            return o;
        }
    },
    removeArrayItem: function(e, t) {
        if (isNaN(t) || t > e.length) return !1;
        e.splice(t, 1);
    },
    removeArrayItemByVal: function(e, t) {
        for (var o = 0; o < e.length; o++) e[o] == t && this.removeArrayItem(e, o);
    },
    saveFormID: function(e, t, o) {
        this.sendRequest({
            url: "/index.php?c=Front/Chat/Chat&a=saveFormID",
            method: "POST",
            hideLoading: !0,
            chatHiddenModal: !0,
            data: e,
            success: function(e) {
                t && t(e);
            },
            fail: function(e) {
                console.log("saveFormID fail" + e);
            }
        });
    },
    compareVersion: function(e, t) {
        e = e.split("."), t = t.split(".");
        for (var o = Math.max(e.length, t.length); e.length < o; ) e.push("0");
        for (;t.length < o; ) t.push("0");
        for (var a = 0; a < o; a++) {
            var n = parseInt(e[a]), s = parseInt(t[a]);
            if (n > s) return 1;
            if (n < s) return -1;
        }
        return 0;
    },
    buried: function(e, t, o) {
        this.sendRequest({
            url: "/index.php?c=Front/WxApp/TrackingBehavior/TrackingBehavior&a=add",
            method: "POST",
            hideLoading: !0,
            data: e,
            success: function(e) {
                t && t(e);
            },
            fail: function(e) {
                console.log("buried fail" + e);
            }
        });
    },
    globalData: {
        StoreSetting: "",
        cityName: "广州",
        geoAuthFlag: !1,
        userInfo: null,
        PSESSID: "",
        session_key: "",
        WebUserID: "",
        baseInfo: {},
        locationInfo: {
            latitude: "",
            longitude: "",
            address: ""
        },
        language: {},
        notice: {},
        siteBaseUrl: n.SITEBASEURL,
        cdnBaseUrl: n.SITEBASEURL.indexOf("//wxapp.") > -1 && n.CDNBASEURL ? n.CDNBASEURL : n.SITEBASEURL,
        appId: n.APPID,
        appTitle: n.APPTITLE,
        appDescription: n.APPDESCRIPTION,
        siteId: n.SITEID,
        dataId: n.DATAID,
        socket_config: {}
    }
});