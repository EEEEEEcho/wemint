require("../../utils/main.js");

var e = getApp();

Page({
    data: {
        imagePath: "",
        maskHidden: !0,
        bgImg: "",
        avatarUrl: "",
        xcxImg: ""
    },
    onLoad: function(e) {
        var t = this;
        wx.downloadFile({
            url: "http://p7mq9gjza.bkt.clouddn.com/1524472725265.jpg",
            success: function(e) {
                200 === e.statusCode && t.setData({
                    bgImg: e.tempFilePath
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    setIcon: function(t) {
        t.save();
        t.arc(94, 1204, 32, 0, 2 * Math.PI), t.clip(), t.drawImage(e.globalData.userInfo.avatarUrl, 62, 1172, 64, 64), 
        t.restore();
    },
    setImagePic: function(e) {
        e.clearRect(0, 0, 0, 0);
        e.drawImage(this.data.bgImg, 0, 0, 750, 1134);
    },
    setLeftText: function(t) {
        t.setTextAlign("left"), t.setFontSize(28), t.setFillStyle("rgba(34,34,34,.64)"), 
        t.fillText("分享的好礼", 170, 1174), t.fillText(e.globalData.userInfo.nickName + "邀你加入Aters", 170, 1230);
    },
    createNewImg: function() {
        var e = this, t = wx.createCanvasContext("mycanvas");
        t.drawImage("../../image/poster.png", 0, 0, 750, 1344), this.setIcon(t), this.setImagePic(t), 
        this.setLeftText(t);
        t.drawImage("../../image/xcx.png", 550, 1150, 150, 150), t.draw(), setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "mycanvas",
                success: function(t) {
                    var a = t.tempFilePath;
                    console.log(a), e.setData({
                        imagePath: a,
                        canvasHidden: !0
                    }), wx.previewImage({
                        current: a,
                        urls: [ a ]
                    });
                },
                fail: function(e) {
                    console.log(e);
                }
            });
        }, 2e3);
    },
    previewImg: function(e) {
        var t = this.data.imagePath;
        wx.previewImage({
            current: t,
            urls: [ t ]
        });
    },
    formSubmit: function(t) {
        var a = this;
        t.detail.userInfo;
        e.globalData.userInfo = t.detail.userInfo, wx.showToast({
            title: "装逼中...",
            icon: "loading",
            duration: 1e3
        }), setTimeout(function() {
            wx.hideToast(), a.createNewImg(), a.setData({
                maskHidden: !0
            });
        }, 1e3);
    }
});