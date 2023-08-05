var e = getApp(), t = (require("../../components/utils/imgutil.js"), require("../../common.js"));

Page({
    isloading: !1,
    url: !1,
    data: {
        canvasShow: !0,
        baseUrl: e.globalData.siteBaseUrl,
        isSuccess: !1,
        canSave: !0,
        language: {}
    },
    onLoad: function(a) {
        var o = this;
        o.downLoadImg(), o.url = e.getPageUrl(o, a), e.registerGlobalFunctions(o), t.initCommonModules(), 
        this.setData({
            queryparams: a,
            scrviewFlag: !1,
            productId: a.productId,
            productName: a.name,
            price: a.price,
            productImg: a.productImg,
            SiteID: a.SiteID,
            nothingHeight: wx.getSystemInfoSync().windowHeight,
            language: e.globalData.language,
            proId: a.proId ? a.proId : 0
        }), wx.getSystemInfo({
            success: function(e) {
                wx.setStorageSync("userSystemInfo", e);
            }
        }), this.getQrCode();
    },
    onShow: function() {
        var e = this;
        wx.getSetting({
            success: function(t) {
                "" != wx.getStorageSync("canSaveImg") && "false" == wx.getStorageSync("canSaveImg") && (t.authSetting["scope.writePhotosAlbum"] ? e.setData({
                    canSave: !0
                }) : e.setData({
                    canSave: !1
                }));
            }
        });
    },
    downLoadImg: function() {
        var e = this, t = e.data.baseUrl + "/images/wxapp/label_group.png", a = e.data.baseUrl + "/images/wxapp/label_seckill.png";
        wx.downloadFile({
            url: t,
            success: function(t) {
                e.setData({
                    groupImg: t.tempFilePath
                }, function() {
                    wx.downloadFile({
                        url: a,
                        success: function(t) {
                            e.setData({
                                seckilltImg: t.tempFilePath
                            });
                        }
                    });
                });
            }
        });
    },
    getQrCode: function() {
        var t = this, a = t.data.queryparams, o = "";
        0 == a.proType ? o = "/index.php?c=Front/WxApp/BaseApi&a=getProductQrCode&productid=" + t.data.productId : 1 == a.proType ? o = "/index.php?c=Front/WxApp/pintuan&a=getGroupQrCode&id=" + t.data.productId + "&proId=" + t.data.proId : 2 == a.proType && (o = "/index.php?c=Front/WxApp/SecKill&a=getSeckillQrCode&id=" + t.data.productId + "&proId=" + t.data.proId), 
        e.sendRequest({
            url: o,
            method: "GET",
            success: function(o) {
                if (o.success) {
                    wx.showLoading({
                        title: "加载中...",
                        mask: !0
                    }), t.setData({
                        canvasShow: !0
                    });
                    var i;
                    i = t.data.productImg.indexOf("comdata") < 0 ? e.globalData.siteBaseUrl + "/comdata/" + t.data.SiteID + "/product/" + t.data.productImg + "?norewrite=1" : t.data.productImg.indexOf("http") < 0 ? e.globalData.siteBaseUrl + t.data.productImg + "?norewrite=1" : t.data.productImg + "?norewrite=1", 
                    t.setData({
                        prImg: i,
                        qrimg: o.data.product_qrcode
                    }), wx.downloadFile({
                        url: i,
                        success: function(i) {
                            t.setData({
                                Imgpath: i.tempFilePath
                            }), wx.downloadFile({
                                url: o.data.product_qrcode,
                                success: function(o) {
                                    t.setData({
                                        qrcode_temp: o.tempFilePath
                                    });
                                    var i = t.data.Imgpath, n = t.data.qrcode_temp, s = t.data.price, r = wx.getStorageSync("userSystemInfo").screenWidth, d = Math.round(13 / 375 * r), c = r / 750 * 630, l = r / 750 * 1024;
                                    t.setData({
                                        canvasWidth: parseInt(c),
                                        canvasHeight: parseInt(l)
                                    });
                                    var u = "normal bold " + d + "px sans-serif", g = t.data.productName, p = e.globalData.appTitle, m = wx.createCanvasContext("myCanvas");
                                    m.setFillStyle("white"), m.fillRect(0, 0, c, l), m.drawImage(i, 0, 0, c, c);
                                    var h = .72 * r, f = .064 * r + c, w = 13 / 375 * r, x = .064 * r, I = m.measureText("一").width, S = 0, v = 0, T = 1, y = h - m.measureText("一").width;
                                    m.setFontSize(14), m.setFillStyle("#333");
                                    for (var F = 0; F < g.length; F++) {
                                        if (S += m.measureText(g[F]).width, T > 1 && (h = y), S > h) {
                                            if (m.fillText(g.substring(v, F), w, f), T > 1) {
                                                var b = w + m.measureText(g.substring(v, F)).width;
                                                m.fillText("…", b, f);
                                                break;
                                            }
                                            f += x, S = m.measureText("一").width, v = F, T++;
                                        }
                                        F == g.length - 1 && m.fillText(g.substring(v, F + 1), w, f);
                                    }
                                    if ("1" == a.proType || "2" == a.proType) {
                                        var D = "1" == a.proType ? t.data.groupImg : t.data.seckilltImg, P = .112 * r, L = .048 * r;
                                        m.drawImage(D, w, f + 11, P, L);
                                    }
                                    m.setFontSize(14), m.setFillStyle("#333"), m.setTextAlign("left"), m.font = u;
                                    var q = "1" == a.proType || "2" == a.proType ? w + 3 * I + 18 : w;
                                    m.fillText("￥" + s, q, f + x), m.beginPath(), m.setStrokeStyle("#ddd");
                                    var k = f + x + .032 * r;
                                    m.setLineWidth(.5), m.moveTo(w, k), m.lineTo(c - w, k), m.stroke();
                                    var C = k + .128 * r, A = Math.round(.04 * r);
                                    m.setFontSize(A), m.setFillStyle("#333333"), m.fillText(p, w, C);
                                    var M = C + 25 / 375 * r, U = Math.round(.032 * r);
                                    m.setFontSize(U), m.setFillStyle("#999"), m.fillText("长按识别二维码", w, M);
                                    var W = 205 / 375 * r, _ = k + 16 / 375 * r, Q = .208 * r;
                                    m.drawImage(n, W, _, Q, Q), m.draw(!1, function() {
                                        wx.canvasToTempFilePath({
                                            x: 0,
                                            y: 0,
                                            width: c,
                                            height: l,
                                            destWidth: 4 * c,
                                            destHeight: 4 * l,
                                            quality: 1,
                                            fileType: "png",
                                            canvasId: "myCanvas",
                                            success: function(e) {
                                                t.setData({
                                                    shareImage: e.tempFilePath
                                                }), setTimeout(function() {
                                                    wx.hideLoading();
                                                }, 1e3);
                                            },
                                            fail: function(e) {
                                                wx.hideLoading();
                                            }
                                        });
                                    }), setTimeout(function() {
                                        wx.hideLoading();
                                    }, 800);
                                },
                                fail: function(t) {
                                    console.log(t, "缓存二维码图片失败"), setTimeout(function() {
                                        wx.hideLoading(), e.showModal({
                                            title: "提示",
                                            content: "请检查域名配置是否正确"
                                        });
                                    }, 800);
                                }
                            });
                        },
                        fail: function(t) {
                            console.log(t, "缓存产品图片失败"), setTimeout(function() {
                                wx.hideLoading(), e.showModal({
                                    title: "提示",
                                    content: "请检查域名配置是否正确"
                                });
                            }, 800);
                        }
                    });
                } else t.failImage(o);
            },
            fail: function(e) {},
            hideLoading: !0
        });
    },
    failImage: function(e) {
        this.setData({
            canvasShow: !1
        });
    },
    saveImageToPhotosAlbum: function() {
        wx.showLoading({
            title: "保存中...",
            mask: !0
        });
        var e = this;
        wx.saveImageToPhotosAlbum({
            filePath: e.data.shareImage,
            success: function(e) {
                wx.hideLoading(), wx.setStorageSync("canSaveImg", "true"), wx.showToast({
                    title: "已保存到相册",
                    icon: "success"
                });
            },
            fail: function(t) {
                (t.errMsg.indexOf("auth deny") > -1 || t.errMsg.indexOf("auth denied") > -1) && (e.setData({
                    canSave: !1
                }), wx.setStorageSync("canSaveImg", "false")), wx.hideLoading();
            }
        });
    },
    clickImage: function(e) {
        var t = e.target.dataset.src;
        wx.previewImage({
            current: t,
            urls: [ t ],
            fail: function() {
                console.log("fail");
            },
            complete: function() {
                console.info("点击图片了");
            }
        }), wx.hideLoading();
    },
    roundRect: function(e, t, a, o, i, n) {
        return o < 2 * n && (n = o / 2), i < 2 * n && (n = i / 2), e.beginPath(), e.moveTo(t + n, a), 
        e.arcTo(t + o, a, t + o, a + i, n), e.arcTo(t + o, a + i, t, a + i, n), e.arcTo(t, a + i, t, a, n), 
        e.arcTo(t, a, t + o, a, n), e.closePath(), e;
    }
});