function e(e, n, i) {
    return n in e ? Object.defineProperty(e, n, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = i, e;
}

!function(e, n) {
    "function" == typeof define && (define.amd || define.cmd) ? define(function() {
        return n(e);
    }) : n(e, !0);
}(void 0, function(n, i) {
    function t(e, i, t) {
        n.WeixinJSBridge ? WeixinJSBridge.invoke(e, r(i), function(n) {
            s(e, n, t);
        }) : l(e, t);
    }
    function o(e, i, t) {
        n.WeixinJSBridge ? WeixinJSBridge.on(e, function(n) {
            t && t.trigger && t.trigger(n), s(e, n, i);
        }) : t ? l(e, t) : l(e, i);
    }
    function r(e) {
        return e = e || {}, e.appId = L.appId, e.verifyAppId = L.appId, e.verifySignType = "sha1", 
        e.verifyTimestamp = L.timestamp + "", e.verifyNonceStr = L.nonceStr, e.verifySignature = L.signature, 
        e;
    }
    function a(e) {
        return {
            timeStamp: e.timestamp + "",
            nonceStr: e.nonceStr,
            package: e.package,
            paySign: e.paySign,
            signType: e.signType || "SHA1"
        };
    }
    function c(e) {
        return e.postalCoFde = e.addressPostalCode, delete e.addressPostalCode, e.provinceName = e.proviceFirstStageName, 
        delete e.proviceFirstStageName, e.cityName = e.addressCitySecondStageName, delete e.addressCitySecondStageName, 
        e.countryName = e.addressCountiesThirdStageName, delete e.addressCountiesThirdStageName, 
        e.detailInfo = e.addressDetailInfo, delete e.addressDetailInfo, e;
    }
    function s(e, n, i) {
        "openEnterpriseChat" == e && (n.errCode = n.err_code), delete n.err_code, delete n.err_desc, 
        delete n.err_detail;
        var t = n.errMsg;
        t || (t = n.err_msg, delete n.err_msg, t = d(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n), 
        delete i._complete), t = n.errMsg || "", L.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
        var o = t.indexOf(":");
        switch (t.substring(o + 1)) {
          case "ok":
            i.success && i.success(n);
            break;

          case "cancel":
            i.cancel && i.cancel(n);
            break;

          default:
            i.fail && i.fail(n);
        }
        i.complete && i.complete(n);
    }
    function d(e, n) {
        var i = e, t = v[i];
        t && (i = t);
        var o = "ok";
        if (n) {
            var r = n.indexOf(":");
            "confirm" == (o = n.substring(r + 1)) && (o = "ok"), "failed" == o && (o = "fail"), 
            -1 != o.indexOf("failed_") && (o = o.substring(7)), -1 != o.indexOf("fail_") && (o = o.substring(5)), 
            "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"), 
            "config" == i && "function not exist" == o && (o = "ok"), "" == o && (o = "fail");
        }
        return n = i + ":" + o;
    }
    function u(e) {
        if (e) {
            for (var n = 0, i = e.length; n < i; ++n) {
                var t = e[n], o = S[t];
                o && (e[n] = o);
            }
            return e;
        }
    }
    function l(e, n) {
        if (!(!L.debug || n && n.isInnerInvoke)) {
            var i = v[e];
            i && (e = i), n && n._complete && delete n._complete, console.log('"' + e + '",', n || "");
        }
    }
    function p(e) {
        if (!(T || k || L.debug || V < "6.0.2" || A.systemType < 0)) {
            var n = new Image();
            A.appId = L.appId, A.initTime = P.initEndTime - P.initStartTime, A.preVerifyTime = P.preVerifyEndTime - P.preVerifyStartTime, 
            E.getNetworkType({
                isInnerInvoke: !0,
                success: function(e) {
                    A.networkType = e.networkType;
                    var i = "https://open.weixin.qq.com/sdk/report?v=" + A.version + "&o=" + A.isPreVerifyOk + "&s=" + A.systemType + "&c=" + A.clientVersion + "&a=" + A.appId + "&n=" + A.networkType + "&i=" + A.initTime + "&p=" + A.preVerifyTime + "&u=" + A.url;
                    n.src = i;
                }
            });
        }
    }
    function f() {
        return new Date().getTime();
    }
    function m(e) {
        x && (n.WeixinJSBridge ? e() : y.addEventListener && y.addEventListener("WeixinJSBridgeReady", e, !1));
    }
    function g() {
        E.invoke || (E.invoke = function(e, i, t) {
            n.WeixinJSBridge && WeixinJSBridge.invoke(e, r(i), t);
        }, E.on = function(e, i) {
            n.WeixinJSBridge && WeixinJSBridge.on(e, i);
        });
    }
    if (!n.jWeixin) {
        var h, S = {
            config: "preVerifyJSAPI",
            onMenuShareTimeline: "menu:share:timeline",
            onMenuShareAppMessage: "menu:share:appmessage",
            onMenuShareQQ: "menu:share:qq",
            onMenuShareWeibo: "menu:share:weiboApp",
            onMenuShareQZone: "menu:share:QZone",
            previewImage: "imagePreview",
            getLocation: "geoLocation",
            openProductSpecificView: "openProductViewWithPid",
            addCard: "batchAddCard",
            openCard: "batchViewCard",
            chooseWXPay: "getBrandWCPayRequest",
            openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
            startSearchBeacons: "startMonitoringBeacons",
            stopSearchBeacons: "stopMonitoringBeacons",
            onSearchBeacons: "onBeaconsInRange",
            consumeAndShareCard: "consumedShareCard",
            openAddress: "editAddress"
        }, v = function() {
            var e = {};
            for (var n in S) e[S[n]] = n;
            return e;
        }(), y = n.document, I = y.title, _ = navigator.userAgent.toLowerCase(), w = navigator.platform.toLowerCase(), T = !(!w.match("mac") && !w.match("win")), k = -1 != _.indexOf("wxdebugger"), x = -1 != _.indexOf("micromessenger"), M = -1 != _.indexOf("android"), C = -1 != _.indexOf("iphone") || -1 != _.indexOf("ipad"), V = function() {
            var e = _.match(/micromessenger\/(\d+\.\d+\.\d+)/) || _.match(/micromessenger\/(\d+\.\d+)/);
            return e ? e[1] : "";
        }(), P = {
            initStartTime: f(),
            initEndTime: 0,
            preVerifyStartTime: 0,
            preVerifyEndTime: 0
        }, A = {
            version: 1,
            appId: "",
            initTime: 0,
            preVerifyTime: 0,
            networkType: "",
            isPreVerifyOk: 1,
            systemType: C ? 1 : M ? 2 : -1,
            clientVersion: V,
            url: encodeURIComponent(location.href)
        }, L = {}, O = {
            _completes: []
        }, b = {
            state: 0,
            data: {}
        };
        m(function() {
            P.initEndTime = f();
        });
        var B = !1, N = [], E = (h = {
            config: function(e) {
                L = e, l("config", e);
                var n = !1 !== L.check;
                m(function() {
                    if (n) t(S.config, {
                        verifyJsApiList: u(L.jsApiList)
                    }, function() {
                        O._complete = function(e) {
                            P.preVerifyEndTime = f(), b.state = 1, b.data = e;
                        }, O.success = function(e) {
                            A.isPreVerifyOk = 0;
                        }, O.fail = function(e) {
                            O._fail ? O._fail(e) : b.state = -1;
                        };
                        var e = O._completes;
                        return e.push(function() {
                            p();
                        }), O.complete = function(n) {
                            for (var i = 0, t = e.length; i < t; ++i) e[i]();
                            O._completes = [];
                        }, O;
                    }()), P.preVerifyStartTime = f(); else {
                        b.state = 1;
                        for (var e = O._completes, i = 0, o = e.length; i < o; ++i) e[i]();
                        O._completes = [];
                    }
                }), L.beta && g();
            },
            ready: function(e) {
                0 != b.state ? e() : (O._completes.push(e), !x && L.debug && e());
            },
            error: function(e) {
                V < "6.0.2" || (-1 == b.state ? e(b.data) : O._fail = e);
            },
            checkJsApi: function(e) {
                var n = function(e) {
                    var n = e.checkResult;
                    for (var i in n) {
                        var t = v[i];
                        t && (n[t] = n[i], delete n[i]);
                    }
                    return e;
                };
                t("checkJsApi", {
                    jsApiList: u(e.jsApiList)
                }, (e._complete = function(e) {
                    if (M) {
                        var i = e.checkResult;
                        i && (e.checkResult = JSON.parse(i));
                    }
                    e = n(e);
                }, e));
            },
            onMenuShareTimeline: function(e) {
                o(S.onMenuShareTimeline, {
                    complete: function() {
                        t("shareTimeline", {
                            title: e.title || I,
                            desc: e.title || I,
                            img_url: e.imgUrl || "",
                            link: e.link || location.href,
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }, e);
                    }
                }, e);
            },
            onMenuShareAppMessage: function(e) {
                o(S.onMenuShareAppMessage, {
                    complete: function(n) {
                        "favorite" === n.scene ? t("sendAppMessage", {
                            title: e.title || I,
                            desc: e.desc || "",
                            link: e.link || location.href,
                            img_url: e.imgUrl || "",
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }) : t("sendAppMessage", {
                            title: e.title || I,
                            desc: e.desc || "",
                            link: e.link || location.href,
                            img_url: e.imgUrl || "",
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }, e);
                    }
                }, e);
            },
            onMenuShareQQ: function(e) {
                o(S.onMenuShareQQ, {
                    complete: function() {
                        t("shareQQ", {
                            title: e.title || I,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e);
                    }
                }, e);
            },
            onMenuShareWeibo: function(e) {
                o(S.onMenuShareWeibo, {
                    complete: function() {
                        t("shareWeiboApp", {
                            title: e.title || I,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e);
                    }
                }, e);
            },
            onMenuShareQZone: function(e) {
                o(S.onMenuShareQZone, {
                    complete: function() {
                        t("shareQZone", {
                            title: e.title || I,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e);
                    }
                }, e);
            },
            startRecord: function(e) {
                t("startRecord", {}, e);
            },
            stopRecord: function(e) {
                t("stopRecord", {}, e);
            },
            onVoiceRecordEnd: function(e) {
                o("onVoiceRecordEnd", e);
            },
            playVoice: function(e) {
                t("playVoice", {
                    localId: e.localId
                }, e);
            },
            pauseVoice: function(e) {
                t("pauseVoice", {
                    localId: e.localId
                }, e);
            },
            stopVoice: function(e) {
                t("stopVoice", {
                    localId: e.localId
                }, e);
            },
            onVoicePlayEnd: function(e) {
                o("onVoicePlayEnd", e);
            },
            uploadVoice: function(e) {
                t("uploadVoice", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e);
            },
            downloadVoice: function(e) {
                t("downloadVoice", {
                    serverId: e.serverId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e);
            },
            translateVoice: function(e) {
                t("translateVoice", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e);
            },
            chooseImage: function(e) {
                t("chooseImage", {
                    scene: "1|2",
                    count: e.count || 9,
                    sizeType: e.sizeType || [ "original", "compressed" ],
                    sourceType: e.sourceType || [ "album", "camera" ]
                }, (e._complete = function(e) {
                    if (M) {
                        var n = e.localIds;
                        n && (e.localIds = JSON.parse(n));
                    }
                }, e));
            },
            getLocation: function(e) {},
            previewImage: function(e) {
                t(S.previewImage, {
                    current: e.current,
                    urls: e.urls
                }, e);
            },
            uploadImage: function(e) {
                t("uploadImage", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e);
            },
            downloadImage: function(e) {
                t("downloadImage", {
                    serverId: e.serverId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e);
            },
            getLocalImgData: function(e) {
                !1 === B ? (B = !0, t("getLocalImgData", {
                    localId: e.localId
                }, (e._complete = function(e) {
                    if (B = !1, N.length > 0) {
                        var n = N.shift();
                        wx.getLocalImgData(n);
                    }
                }, e))) : N.push(e);
            },
            getNetworkType: function(e) {
                var n = function(e) {
                    var n = e.errMsg;
                    e.errMsg = "getNetworkType:ok";
                    var i = e.subtype;
                    if (delete e.subtype, i) e.networkType = i; else {
                        var t = n.indexOf(":"), o = n.substring(t + 1);
                        switch (o) {
                          case "wifi":
                          case "edge":
                          case "wwan":
                            e.networkType = o;
                            break;

                          default:
                            e.errMsg = "getNetworkType:fail";
                        }
                    }
                    return e;
                };
                t("getNetworkType", {}, (e._complete = function(e) {
                    e = n(e);
                }, e));
            },
            openLocation: function(e) {
                t("openLocation", {
                    latitude: e.latitude,
                    longitude: e.longitude,
                    name: e.name || "",
                    address: e.address || "",
                    scale: e.scale || 28,
                    infoUrl: e.infoUrl || ""
                }, e);
            }
        }, e(h, "getLocation", function(e) {
            e = e || {}, t(S.getLocation, {
                type: e.type || "wgs84"
            }, (e._complete = function(e) {
                delete e.type;
            }, e));
        }), e(h, "hideOptionMenu", function(e) {
            t("hideOptionMenu", {}, e);
        }), e(h, "showOptionMenu", function(e) {
            t("showOptionMenu", {}, e);
        }), e(h, "closeWindow", function(e) {
            t("closeWindow", {}, e = e || {});
        }), e(h, "hideMenuItems", function(e) {
            t("hideMenuItems", {
                menuList: e.menuList
            }, e);
        }), e(h, "showMenuItems", function(e) {
            t("showMenuItems", {
                menuList: e.menuList
            }, e);
        }), e(h, "hideAllNonBaseMenuItem", function(e) {
            t("hideAllNonBaseMenuItem", {}, e);
        }), e(h, "showAllNonBaseMenuItem", function(e) {
            t("showAllNonBaseMenuItem", {}, e);
        }), e(h, "scanQRCode", function(e) {
            t("scanQRCode", {
                needResult: (e = e || {}).needResult || 0,
                scanType: e.scanType || [ "qrCode", "barCode" ]
            }, (e._complete = function(e) {
                if (C) {
                    var n = e.resultStr;
                    if (n) {
                        var i = JSON.parse(n);
                        e.resultStr = i && i.scan_code && i.scan_code.scan_result;
                    }
                }
            }, e));
        }), e(h, "openAddress", function(e) {
            t(S.openAddress, {}, (e._complete = function(e) {
                e = c(e);
            }, e));
        }), e(h, "openProductSpecificView", function(e) {
            t(S.openProductSpecificView, {
                pid: e.productId,
                view_type: e.viewType || 0,
                ext_info: e.extInfo
            }, e);
        }), e(h, "addCard", function(e) {
            for (var n = e.cardList, i = [], o = 0, r = n.length; o < r; ++o) {
                var a = n[o], c = {
                    card_id: a.cardId,
                    card_ext: a.cardExt
                };
                i.push(c);
            }
            t(S.addCard, {
                card_list: i
            }, (e._complete = function(e) {
                var n = e.card_list;
                if (n) {
                    for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
                        var o = n[i];
                        o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, 
                        delete o.card_ext, delete o.is_succ;
                    }
                    e.cardList = n, delete e.card_list;
                }
            }, e));
        }), e(h, "chooseCard", function(e) {
            t("chooseCard", {
                app_id: L.appId,
                location_id: e.shopId || "",
                sign_type: e.signType || "SHA1",
                card_id: e.cardId || "",
                card_type: e.cardType || "",
                card_sign: e.cardSign,
                time_stamp: e.timestamp + "",
                nonce_str: e.nonceStr
            }, (e._complete = function(e) {
                e.cardList = e.choose_card_info, delete e.choose_card_info;
            }, e));
        }), e(h, "openCard", function(e) {
            for (var n = e.cardList, i = [], o = 0, r = n.length; o < r; ++o) {
                var a = n[o], c = {
                    card_id: a.cardId,
                    code: a.code
                };
                i.push(c);
            }
            t(S.openCard, {
                card_list: i
            }, e);
        }), e(h, "consumeAndShareCard", function(e) {
            t(S.consumeAndShareCard, {
                consumedCardId: e.cardId,
                consumedCode: e.code
            }, e);
        }), e(h, "chooseWXPay", function(e) {
            t(S.chooseWXPay, a(e), e);
        }), e(h, "openEnterpriseRedPacket", function(e) {
            t(S.openEnterpriseRedPacket, a(e), e);
        }), e(h, "startSearchBeacons", function(e) {
            t(S.startSearchBeacons, {
                ticket: e.ticket
            }, e);
        }), e(h, "stopSearchBeacons", function(e) {
            t(S.stopSearchBeacons, {}, e);
        }), e(h, "onSearchBeacons", function(e) {
            o(S.onSearchBeacons, e);
        }), e(h, "openEnterpriseChat", function(e) {
            t("openEnterpriseChat", {
                useridlist: e.userIds,
                chatname: e.groupName
            }, e);
        }), h), R = 1, W = {};
        return y.addEventListener("error", function(e) {
            if (!M) {
                var n = e.target, i = n.tagName, t = n.src;
                if (("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) && -1 != t.indexOf("wxlocalresource://")) {
                    e.preventDefault(), e.stopPropagation();
                    var o = n["wx-id"];
                    if (o || (o = R++, n["wx-id"] = o), W[o]) return;
                    W[o] = !0, wx.ready(function() {
                        wx.getLocalImgData({
                            localId: t,
                            success: function(e) {
                                n.src = e.localData;
                            }
                        });
                    });
                }
            }
        }, !0), y.addEventListener("load", function(e) {
            if (!M) {
                var n = e.target, i = n.tagName;
                if (n.src, "IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
                    var t = n["wx-id"];
                    t && (W[t] = !1);
                }
            }
        }, !0), i && (n.wx = n.jWeixin = E), E;
    }
});