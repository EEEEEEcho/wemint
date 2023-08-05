var t = getApp();

Page({
    data: {
        windowHeight: 0,
        leftDis: 0,
        bg_src: [],
        userInfo: {},
        userID: ""
    },
    onLoad: function(t) {
        this.setData({
            userID: t.userID
        }), this.getWindowInfo(), this.getQrcode();
    },
    getWindowInfo: function() {
        this.setData({
            windowHeight: wx.getSystemInfoSync().windowHeight,
            leftDis: (wx.getSystemInfoSync().windowWidth - 320) / 2
        });
    },
    getQrcode: function() {
        var e = this, s = {
            url: "/index.php?c=Front/WxApp/BaseApi&a=getWxAppQrCode",
            data: {
                userID: e.data.userID
            },
            success: function(s) {
                s.success && e.setData({
                    bg_src: t.globalData.siteBaseUrl + s.info.bg_img_url + "?v=" + Math.random()
                });
            }
        };
        t.sendRequest(s);
    },
    onShareAppMessage: function() {
        return {
            title: "推广二维码",
            path: "/pages/shop/qrcode?userID=" + this.data.userID,
            success: function(e) {
                t.showToast({
                    title: "发送成功",
                    icon: "success"
                });
            },
            fail: function(e) {
                t.showToast({
                    title: "转发失败",
                    image: "/images/error.png"
                });
            }
        };
    },
    downloadWxAppQrCode: function() {
        var t = this;
        wx.downloadFile({
            url: t.data.bg_src,
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {},
                    fail: function(t) {}
                });
            },
            fail: function() {
                console.log("fail");
            }
        });
    },
    clickImage: function(t) {
        var e = t.target.dataset.src;
        wx.previewImage({
            current: e,
            urls: [ e ],
            fail: function() {
                console.log("fail");
            },
            complete: function() {
                console.info("点击图片了");
            }
        });
    }
});