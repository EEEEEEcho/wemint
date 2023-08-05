function e(e, a) {
    wx.request({
        url: t.localUrl + "mobileXcx/stuActivityById",
        data: {
            id: e
        },
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            a(e.data.dataInfo.act);
        }
    });
}

var t = require("../../../utils/main.js"), a = require("../../../wxParse/wxParse.js"), n = getApp();

Page({
    data: {
        screenWidth: 0,
        screenHeight: 0,
        imgwidth: 0,
        imgheight: 0,
        ishb: !0,
        isPay: !0,
        actionSheetHidden2: !0
    },
    onLoad: function(t) {
        var n = this, i = t.id, o = t.isPay;
        t.scene ? (i = decodeURIComponent(t.scene), this.setData({
            ishb: !1,
            isPay: 0
        })) : this.setData({
            isPay: o
        }), null != i && "" != i ? e(i, function(e) {
            null != e.poster_url && "" != e.poster_url && (console.log(e.poster_url), wx.getImageInfo({
                src: e.poster_url,
                success: function(t) {
                    var a = t.height;
                    n.setData({
                        bgWidth: t.width,
                        bgHeight: a,
                        bgImg: e.poster_url
                    });
                }
            })), n.setData({
                model: e
            }), a.wxParse("article", "html", e.content, n, 5);
        }) : n.home();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.model.title
        };
    },
    imageLoad: function(e) {
        var t = 750 / (e.detail.width / e.detail.height);
        this.setData({
            imgwidth: 750,
            imgheight: t
        });
    },
    pay: function(e) {
        var a = this, i = e.detail.userInfo;
        n.globalData.userInfo = e.detail.userInfo, null != i && wx.login({
            success: function(e) {
                e.code && (wx.showLoading({
                    mask: !0
                }), wx.request({
                    url: t.localUrl + "mobileXcx/getOpenId",
                    data: {
                        code: e.code
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        console.log(e), wx.hideLoading(), null != e.data.openid & void 0 != e.data.openid && (console.info("登录成功返回的openId：" + e.data.openid), 
                        n.globalData.openId = e.data.openid, wx.navigateTo({
                            url: "../activityPay/activityPay?id=" + a.data.model.id
                        }));
                    }
                }));
            }
        });
    },
    telPhone: function() {
        wx.makePhoneCall({
            phoneNumber: n.globalData.mobile
        });
    },
    onGotUserInfo: function(e) {
        var a = this;
        e.detail.userInfo;
        n.globalData.userInfo = e.detail.userInfo, null != e.detail.userInfo ? (wx.downloadFile({
            url: n.globalData.userInfo.avatarUrl,
            success: function(e) {
                200 === e.statusCode && a.setData({
                    avatarUrl: e.tempFilePath
                });
            }
        }), wx.login({
            success: function(e) {
                e.code && (wx.showLoading({
                    mask: !0
                }), wx.request({
                    url: t.localUrl + "mobileXcx/getOpenId",
                    data: {
                        code: e.code
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        console.log(e), null != e.data.openid & void 0 != e.data.openid && (console.info("登录成功返回的openId：" + e.data.openid), 
                        n.globalData.openId = e.data.openid, a.actionSheetChange2()), wx.hideLoading();
                    }
                }));
            }
        })) : a.actionSheetChange2();
    },
    actionSheetChange2: function(e) {
        this.setData({
            actionSheetHidden2: !this.data.actionSheetHidden2
        });
    },
    setIcon: function(e) {
        e.save();
        e.arc(105, 100, 75, 0, 2 * Math.PI), e.clip(), e.drawImage(this.data.avatarUrl, 30, 25, 150, 150), 
        e.restore();
    },
    setImagePic: function(e) {
        var t = this;
        e.clearRect(0, 0, 0, 0);
        var a = t.data.bgWidth, n = t.data.bgHeight;
        e.drawImage(this.data.bgImg, 0, 0, a, n);
    },
    setLeftText: function(e) {
        e.setTextAlign("left"), e.setFontSize(30), e.setFillStyle("rgba(42,69,119,1)"), 
        e.fillText("我已加入", 180, 70), e.fillText("邀请你一起学习", 180, 120);
    },
    createNewImg: function() {
        var e = this, t = wx.createCanvasContext("mycanvas");
        t.drawImage("../../../image/poster.png", 0, 0, e.data.bgWidth, e.data.bgHeight), 
        this.setImagePic(t), this.setLeftText(t), this.setIcon(t);
        t.drawImage(e.data.xcxUrl, 50, e.data.bgHeight - 194, 170, 170), t.draw(), setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "mycanvas",
                success: function(t) {
                    var a = t.tempFilePath;
                    e.setData({
                        imagePath: a,
                        canvasHidden: !0
                    }), wx.hideLoading(), wx.previewImage({
                        current: a,
                        urls: [ a ]
                    }), e.actionSheetChange2();
                },
                fail: function(e) {
                    console.log(e);
                }
            });
        }, 1e3);
    },
    previewImg: function(e) {
        var t = this.data.cardInfoList[0];
        wx.previewImage({
            current: t,
            urls: [ t ]
        });
    },
    formSubmit: function(e) {
        var a = this;
        wx.showLoading({
            title: "海报生成中",
            mask: !0
        }), wx.request({
            url: t.localUrl + "mobileXcx/getminiqrQr",
            data: {
                scene: a.data.model.id
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log(e.data.imgurl), wx.downloadFile({
                    url: e.data.imgurl,
                    success: function(e) {
                        200 === e.statusCode && a.setData({
                            xcxUrl: e.tempFilePath
                        }), wx.downloadFile({
                            url: a.data.bgImg,
                            success: function(e) {
                                200 === e.statusCode && (a.setData({
                                    bgImg: e.tempFilePath
                                }), a.createNewImg());
                            }
                        });
                    }
                });
            }
        });
    },
    home: function() {
        wx.switchTab({
            url: "../../index/index"
        });
    }
});