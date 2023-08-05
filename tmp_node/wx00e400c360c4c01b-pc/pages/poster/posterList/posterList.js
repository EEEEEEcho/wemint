var t = require("../../../utils/main.js"), a = getApp();

Page({
    data: {
        animationData: {},
        cardInfoList: [],
        actionSheetHidden2: !0,
        maskHidden: !0,
        bgWidth: 750,
        bgHeight: 1600,
        bgImg: "",
        avatarUrl: "",
        xcxImg: ""
    },
    slidethis: function(t) {
        var a = this, e = wx.createAnimation({
            duration: 300,
            timingFunction: "cubic-bezier(.8,.2,.1,0.8)"
        }), i = this;
        this.animation = e, this.animation.translateY(-420).rotate(-5).translateX(0).step(), 
        this.animation.translateY(62).translateX(25).rotate(0).step(), this.setData({
            animationData: this.animation.export()
        }), setTimeout(function() {
            i.data.cardInfoList;
            var t = i.data.cardInfoList.shift();
            i.data.cardInfoList.push(t), wx.getImageInfo({
                src: i.data.cardInfoList[0],
                success: function(t) {
                    var e = t.height;
                    a.setData({
                        bgWidth: t.width,
                        bgHeight: e,
                        bgImg: i.data.cardInfoList[0]
                    });
                }
            }), i.setData({
                cardInfoList: i.data.cardInfoList,
                animationData: {}
            });
        }, 350);
    },
    onLoad: function() {
        console.log("onLoad");
        var e = this;
        wx.request({
            url: t.localUrl + "mobileXcx/initialization",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                a.globalData.posterList = t.data.dataInfo.posterList, e.setData({
                    cardInfoList: a.globalData.posterList,
                    bgImg: a.globalData.posterList[0]
                }), wx.getImageInfo({
                    src: a.globalData.posterList[0],
                    success: function(t) {
                        var a = t.height;
                        e.setData({
                            bgWidth: t.width,
                            bgHeight: a
                        });
                    }
                });
            }
        });
    },
    onReachBottom: function() {
        this.slidethis();
    },
    onShareAppMessage: function() {
        return {
            title: "分享得好礼",
            path: "/pages/poster/posterList/posterList",
            imageUrl: this.data.cardInfoList[0],
            success: function(t) {
                console.log("转发成功", t);
            },
            fail: function(t) {
                console.log("转发失败", t);
            }
        };
    },
    onGotUserInfo: function(e) {
        var i = this;
        e.detail.userInfo;
        a.globalData.userInfo = e.detail.userInfo, null != e.detail.userInfo && (wx.downloadFile({
            url: a.globalData.userInfo.avatarUrl,
            success: function(t) {
                200 === t.statusCode && i.setData({
                    avatarUrl: t.tempFilePath
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
                    success: function(t) {
                        console.log(t), null != t.data.openid & void 0 != t.data.openid && (console.info("登录成功返回的openId：" + t.data.openid), 
                        a.globalData.openId = t.data.openid, i.actionSheetChange2()), wx.hideLoading();
                    }
                }));
            }
        }));
    },
    actionSheetChange2: function(t) {
        this.setData({
            actionSheetHidden2: !this.data.actionSheetHidden2
        });
    },
    setIcon: function(t) {
        t.save();
        t.arc(75, 70, 45, 0, 2 * Math.PI), t.clip(), t.drawImage(this.data.avatarUrl, 30, 25, 90, 90), 
        t.restore();
    },
    setImagePic: function(t) {
        var a = this;
        t.clearRect(0, 0, 0, 0);
        var e = a.data.bgWidth, i = a.data.bgHeight;
        t.drawImage(this.data.bgImg, 0, 0, e, i);
    },
    setLeftText: function(t) {
        t.setTextAlign("left"), t.setFontSize(30), t.setFillStyle("rgba(42,69,119,1)"), 
        t.fillText("我已加入", 150, 50), t.fillText("邀请你一起学习", 150, 100);
    },
    createNewImg: function() {
        var t = this, a = wx.createCanvasContext("mycanvas");
        a.drawImage("../../../image/poster.png", 0, 0, t.data.bgWidth, t.data.bgHeight), 
        this.setImagePic(a), this.setLeftText(a), this.setIcon(a), a.draw(), setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "mycanvas",
                success: function(a) {
                    var e = a.tempFilePath;
                    t.setData({
                        imagePath: e,
                        canvasHidden: !0
                    }), wx.hideLoading(), wx.previewImage({
                        current: e,
                        urls: [ e ]
                    }), t.actionSheetChange2();
                },
                fail: function(t) {
                    console.log(t);
                }
            });
        }, 1e3);
    },
    previewImg: function(t) {
        var a = this.data.cardInfoList[0];
        wx.previewImage({
            current: a,
            urls: [ a ]
        });
    },
    formSubmit: function(t) {
        console.log(t), wx.showLoading({
            title: "图片生成中...",
            mask: !0
        });
        var a = this;
        wx.downloadFile({
            url: a.data.bgImg,
            success: function(t) {
                200 === t.statusCode && (a.setData({
                    bgImg: t.tempFilePath
                }), a.createNewImg());
            }
        });
    }
});