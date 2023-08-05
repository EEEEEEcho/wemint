var t = getApp(), a = require("../../wxParse/wxParse.js");

Page({
    firstIndex: -1,
    data: {
        bannerApp: !0,
        winWidth: 0,
        winHeight: 0,
        currentTab: 0,
        productId: 0,
        itemData: {},
        user: {},
        bannerItem: [],
        buynum: 1,
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        firstIndex: -1,
        commodityAttr: [],
        productData: [],
        attrValueList: []
    },
    setModalStatus: function(t) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = a, a.translateY(300).step(), this.setData({
            animationData: a.export()
        }), 1 == t.currentTarget.dataset.status && this.setData({
            showModalStatus: !0
        }), setTimeout(function() {
            a.translateY(0).step(), this.setData({
                animationData: a
            }), 0 == t.currentTarget.dataset.status && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200);
    },
    changeNum: function(t) {
        0 == t.target.dataset.alphaBeta ? this.data.buynum <= 1 || this.setData({
            buynum: this.data.buynum - 1
        }) : this.setData({
            buynum: this.data.buynum + 1
        });
    },
    onLoad: function(a) {
        (e = this).setData({
            productId: a.productId
        }), t.getUserInfo(function(t) {
            e.setData({
                userinfoId: t.id
            });
        }), e.loadProductDetail();
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Index/index",
            method: "post",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data.ggtop, o = t.data.procat, s = t.data.prolist, i = t.data.brand, n = t.data.course;
                e.setData({
                    imgUrls: a,
                    proCat: o,
                    productData: s,
                    brand: i,
                    course: n
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    loadProductDetail: function() {
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Product/index",
            method: "post",
            data: {
                pro_id: e.data.productId,
                user_id: e.data.userinfoId
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var o = t.data.status, s = t.data.user;
                if (console.log(t), 1 == o) {
                    var i = t.data.pro, n = i.content;
                    a.wxParse("content", "html", n, e, 3), e.setData({
                        itemData: i,
                        bannerItem: i.img_arr,
                        user: s,
                        commodityAttr: t.data.commodityAttr,
                        attrValueList: t.data.attrValueList
                    });
                } else wx.showToast({
                    title: t.data.err,
                    duration: 2e3
                });
            },
            error: function(t) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    saveImg: function() {
        var a = this;
        wx.showToast({
            title: "正在下载",
            icon: "success",
            duration: 2e3
        }), wx.request({
            url: t.d.ceshiUrl + "/Api/Product/xiazai",
            method: "post",
            data: {
                pro_id: a.data.productId
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t.data);
            }
        }), wx.downloadFile({
            url: this.data.itemData.shipin,
            success: function(t) {
                wx.saveVideoToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        console.log(t);
                    },
                    fail: function(t) {
                        console.log(t);
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }), wx.downloadFile({
            url: this.data.bannerItem[0],
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "1/6下载成功",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }), wx.downloadFile({
            url: this.data.bannerItem[1],
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "2/6下载成功",
                            icon: "success",
                            duration: 2e3
                        }), console.log(t);
                    },
                    fail: function(t) {
                        console.log(t);
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }), wx.downloadFile({
            url: this.data.bannerItem[2],
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "3/6下载成功",
                            icon: "success",
                            duration: 2e3
                        }), console.log(t);
                    },
                    fail: function(t) {
                        console.log(t);
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }), wx.downloadFile({
            url: this.data.bannerItem[3],
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "4/6下载成功",
                            icon: "success",
                            duration: 2e3
                        }), console.log(t);
                    },
                    fail: function(t) {
                        console.log(t);
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }), wx.downloadFile({
            url: this.data.bannerItem[4],
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "5/6下载成功",
                            icon: "success",
                            duration: 2e3
                        }), console.log(t);
                    },
                    fail: function(t) {
                        console.log(t);
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }), wx.downloadFile({
            url: this.data.bannerItem[5],
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "6/6下载成功",
                            icon: "success",
                            duration: 2e3
                        }), console.log(t);
                    },
                    fail: function(t) {
                        console.log(t);
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }), wx.setClipboardData({
            data: this.data.itemData.content,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data);
                    }
                });
            }
        });
    },
    onShow: function() {
        if (this.setData({
            includeGroup: this.data.commodityAttr
        }), this.distachAttrValue(this.data.commodityAttr), 1 == this.data.commodityAttr.length) {
            for (var t = 0; t < this.data.commodityAttr[0].attrValueList.length; t++) this.data.attrValueList[t].selectedValue = this.data.commodityAttr[0].attrValueList[t].attrValue;
            this.setData({
                attrValueList: this.data.attrValueList
            });
        }
    },
    distachAttrValue: function(t) {
        for (var a = this.data.attrValueList, e = 0; e < t.length; e++) for (s = 0; s < t[e].attrValueList.length; s++) {
            var o = this.getAttrIndex(t[e].attrValueList[s].attrKey, a);
            o >= 0 ? this.isValueExist(t[e].attrValueList[s].attrValue, a[o].attrValues) || a[o].attrValues.push(t[e].attrValueList[s].attrValue) : a.push({
                attrKey: t[e].attrValueList[s].attrKey,
                attrValues: [ t[e].attrValueList[s].attrValue ]
            });
        }
        for (e = 0; e < a.length; e++) for (var s = 0; s < a[e].attrValues.length; s++) a[e].attrValueStatus ? a[e].attrValueStatus[s] = !0 : (a[e].attrValueStatus = [], 
        a[e].attrValueStatus[s] = !0);
        this.setData({
            attrValueList: a
        });
    },
    getAttrIndex: function(t, a) {
        for (var e = 0; e < a.length && t != a[e].attrKey; e++) ;
        return e < a.length ? e : -1;
    },
    isValueExist: function(t, a) {
        for (var e = 0; e < a.length && a[e] != t; e++) ;
        return e < a.length;
    },
    selectAttrValue: function(t) {
        var a = this.data.attrValueList, e = t.currentTarget.dataset.index, o = t.currentTarget.dataset.key, s = t.currentTarget.dataset.value;
        (t.currentTarget.dataset.status || e == this.data.firstIndex) && (t.currentTarget.dataset.selectedvalue == t.currentTarget.dataset.value ? this.disSelectValue(a, e, o, s) : this.selectValue(a, e, o, s));
    },
    selectValue: function(t, a, e, o, s) {
        var i = [];
        if (a != this.data.firstIndex || s) n = this.data.includeGroup; else for (var n = this.data.commodityAttr, r = 0; r < t.length; r++) for (l = 0; l < t[r].attrValues.length; l++) t[r].selectedValue = "";
        for (r = 0; r < n.length; r++) for (l = 0; l < n[r].attrValueList.length; l++) n[r].attrValueList[l].attrKey == e && n[r].attrValueList[l].attrValue == o && i.push(n[r]);
        t[a].selectedValue = o, this.setData({
            attrValueList: t,
            includeGroup: i
        });
        for (var u = 0, r = 0; r < t.length; r++) for (var l = 0; l < t[r].attrValues.length; l++) if (t[r].selectedValue) {
            u++;
            break;
        }
        u < 2 ? this.setData({
            firstIndex: a
        }) : this.setData({
            firstIndex: -1
        });
    },
    disSelectValue: function(t, a, e, o) {
        var s = this.data.commodityAttr;
        t[a].selectedValue = "";
        for (n = 0; n < t.length; n++) for (var i = 0; i < t[n].attrValues.length; i++) t[n].attrValueStatus[i] = !0;
        this.setData({
            includeGroup: s,
            attrValueList: t
        });
        for (var n = 0; n < t.length; n++) t[n].selectedValue && this.selectValue(t, n, t[n].attrKey, t[n].selectedValue, !0);
    },
    initProductData: function(a) {
        a.LunBoProductImageUrl = [];
        var e = a.LunBoProductImage.split(";"), o = !0, s = !1, i = void 0;
        try {
            for (var n, r = e[Symbol.iterator](); !(o = (n = r.next()).done); o = !0) {
                var u = n.value;
                u && a.LunBoProductImageUrl.push(t.d.hostImg + u);
            }
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            s = !0, i = t;
        } finally {
            try {
                !o && r.return && r.return();
            } finally {
                if (s) throw i;
            }
        }
        a.Price = a.Price / 100, a.VedioImagePath = t.d.hostVideo + "/" + a.VedioImagePath, 
        a.videoPath = t.d.hostVideo + "/" + a.videoPath;
    },
    addFavorites: function(a) {
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Product/col",
            method: "post",
            data: {
                uid: t.d.userId,
                pid: e.data.productId
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data;
                1 == a.status ? (wx.showToast({
                    title: "操作成功！",
                    duration: 2e3
                }), e.data.itemData.isCollect = !0) : wx.showToast({
                    title: a.err,
                    duration: 2e3
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    addShopCart: function(a) {
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Shopping/add",
            method: "post",
            data: {
                uid: t.d.userId,
                pid: e.data.productId,
                num: e.data.buynum
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var e = t.data;
                if (1 == e.status) {
                    if ("buynow" == a.currentTarget.dataset.type) return void wx.redirectTo({
                        url: "../order/pay?cartId=" + e.cart_id
                    });
                    wx.showToast({
                        title: "加入购物车成功",
                        icon: "success",
                        duration: 2e3
                    });
                } else wx.showToast({
                    title: e.err,
                    duration: 2e3
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    bindChange: function(t) {
        this.setData({
            currentTab: t.detail.current
        });
    },
    initNavHeight: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    winWidth: a.windowWidth,
                    winHeight: a.windowHeight
                });
            }
        });
    },
    bannerClosed: function() {
        this.setData({
            bannerApp: !1
        });
    },
    swichNav: function(t) {
        var a = this;
        if (a.data.currentTab === t.target.dataset.current) return !1;
        a.setData({
            currentTab: t.target.dataset.current
        });
    }
});