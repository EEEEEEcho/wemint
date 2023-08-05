var t = require("../../../utils/main.js"), a = require("../../../utils/qiniuUploader"), e = getApp(), c = 0, i = 0, o = wx.getSystemInfoSync().pixelRatio, r = 0, n = 0, s = 0, u = 0, h = 0, p = 0, g = 1;

Page({
    data: {
        imageSrc: "",
        returnImage: "",
        isShowImg: !1,
        cropperInitW: 750,
        cropperInitH: 750,
        cropperW: 750,
        cropperH: 750,
        cropperL: 0,
        cropperT: 0,
        scaleP: 0,
        imageW: 0,
        imageH: 0,
        cutW: 0,
        cutH: 0,
        cutL: 0,
        cutT: 0,
        qualityWidth: 1080,
        innerAspectRadio: g
    },
    onLoad: function(a) {
        t.initQiniu();
        var e = this, c = a.url;
        console.log(c), e.setData({
            imageSrc: c
        }), e.loadImage();
    },
    onReady: function() {},
    getImage: function() {
        var t = this;
        wx.chooseImage({
            success: function(a) {
                t.setData({
                    imageSrc: a.tempFilePaths[0]
                }), t.loadImage();
            }
        });
    },
    loadImage: function() {
        var t = this;
        wx.showLoading({
            title: "图片加载中..."
        }), wx.getImageInfo({
            src: t.data.imageSrc,
            success: function(a) {
                (g = a.width / a.height) >= 1 ? t.setData({
                    cropperW: 750,
                    cropperH: 750 / g,
                    cropperL: Math.ceil(0),
                    cropperT: Math.ceil((750 - 750 / g) / 2),
                    cutW: 550,
                    cutH: 750 / g - 200,
                    cutL: Math.ceil(100),
                    cutT: Math.ceil((750 / g - (750 / g - 200)) / 2),
                    scaleP: a.width * o / 750,
                    imageW: a.width * o,
                    imageH: a.height * o,
                    innerAspectRadio: g
                }) : t.setData({
                    cropperW: 750 * g,
                    cropperH: 750,
                    cropperL: Math.ceil((750 - 750 * g) / 2),
                    cropperT: Math.ceil(0),
                    cutW: 750 * g - 50,
                    cutH: 200,
                    cutL: Math.ceil((750 * g - (750 * g - 50)) / 2),
                    cutT: Math.ceil(275),
                    scaleP: a.width * o / 750,
                    imageW: a.width * o,
                    imageH: a.height * o,
                    innerAspectRadio: g
                }), t.setData({
                    isShowImg: !0
                }), wx.hideLoading();
            }
        });
    },
    contentStartMove: function(t) {
        c = t.touches[0].pageX, i = t.touches[0].pageY;
    },
    contentMoveing: function(t) {
        var a = this, e = 2 * (c - t.touches[0].pageX), o = 2 * (i - t.touches[0].pageY), r = Math.max(a.data.cutL - e, 0), n = Math.max(a.data.cutT - o, 0), s = a.data.cropperW - a.data.cutW, u = a.data.cropperH - a.data.cutH;
        this.setData({
            cutL: Math.min(s, r),
            cutT: Math.min(u, n)
        }), console.log(s + " ----- " + r), c = t.touches[0].pageX, i = t.touches[0].pageY;
    },
    getImageInfo: function() {
        var c = this;
        t.initQiniu(), wx.showLoading({
            title: "图片生成中..."
        });
        var i = wx.createCanvasContext("myCanvas");
        i.drawImage(c.data.imageSrc, 0, 0, 1080, 1080 / g), i.draw(!0, function() {
            var i = c.data.cutW / c.data.cropperW * 1080, r = c.data.cutH / c.data.cropperH * 1080 / g, n = c.data.cutL / c.data.cropperW * 1080, s = c.data.cutT / c.data.cropperH * 1080 / g;
            console.log("canvasW:" + i + " --- canvasH: " + r + " --- canvasL: " + n + " --- canvasT: " + s + " -------- _this.data.imageW: " + c.data.imageW + "  ------- _this.data.imageH: " + c.data.imageH + " ---- pixelRatio " + o), 
            wx.canvasToTempFilePath({
                x: n,
                y: s,
                width: i,
                height: r,
                destWidth: i,
                destHeight: r,
                quality: .5,
                canvasId: "myCanvas",
                success: function(c) {
                    wx.hideLoading(), console.log(c.tempFilePath), a.upload(c.tempFilePath, function(a) {
                        null != a.imageURL && "" != a.imageURL && wx.request({
                            url: t.localUrl + "mobileXcx/editBpImage",
                            data: {
                                tId: e.globalData.teacher.id,
                                bpImage: a.imageURL
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(t) {
                                e.globalData.teacher.bp_image = a.imageURL;
                                var c = getCurrentPages();
                                c[c.length - 2].setData({
                                    bpImage: a.imageURL
                                }), wx.navigateBack();
                            }
                        });
                    }, function(t) {
                        console.error("error: " + JSON.stringify(t));
                    });
                }
            });
        });
    },
    dragStart: function(t) {
        var a = this;
        r = t.touches[0].pageX, n = t.touches[0].pageY, s = a.data.cutW, u = a.data.cutL, 
        p = a.data.cutT, h = a.data.cutH;
    },
    dragMove: function(t) {
        var a = this;
        switch (t.target.dataset.drag) {
          case "right":
            e = 2 * (r - t.touches[0].pageX);
            if (!(s >= e)) return;
            if (e < 0 && a.data.cropperW > u + a.data.cutW && this.setData({
                cutW: s - e
            }), !(e > 0)) return;
            this.setData({
                cutW: s - e
            });
            break;

          case "left":
            e = 2 * (e = r - t.touches[0].pageX);
            if (!(s >= e && u > e)) return;
            if (e < 0 && Math.abs(e) >= s) return;
            this.setData({
                cutL: u - e,
                cutW: s + e
            });
            break;

          case "top":
            e = 2 * (n - t.touches[0].pageY);
            if (!(h >= e && p > e)) return;
            if (e < 0 && Math.abs(e) >= h) return;
            this.setData({
                cutT: p - e,
                cutH: h + e
            });
            break;

          case "bottom":
            var e = 2 * (n - t.touches[0].pageY);
            if (!(h >= e)) return;
            if (e < 0 && a.data.cropperH > p + a.data.cutH && this.setData({
                cutH: h - e
            }), !(e > 0)) return;
            this.setData({
                cutH: h - e
            });
            break;

          case "rightBottom":
            var c = 2 * (r - t.touches[0].pageX), i = 2 * (n - t.touches[0].pageY);
            if (!(h >= i && s >= c)) return;
            if ((i < 0 && a.data.cropperH > p + a.data.cutH || i > 0) && this.setData({
                cutH: h - i
            }), !(c < 0 && a.data.cropperW > u + a.data.cutW || c > 0)) return;
            this.setData({
                cutW: s - c
            });
        }
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});