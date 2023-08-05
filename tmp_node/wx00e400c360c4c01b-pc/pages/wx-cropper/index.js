var t = require("../../utils/main.js"), a = require("../../utils/qiniuUploader"), e = getApp(), c = 0, i = 0, r = wx.getSystemInfoSync().pixelRatio, o = 0, n = 0, u = 0, s = 0, p = 0, h = 0, g = 1;

Page({
    data: {
        tp: 0,
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
        var e = this, c = a.url, i = a.tp;
        e.setData({
            imageSrc: c,
            tp: i
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
                    scaleP: a.width * r / 750,
                    imageW: a.width * r,
                    imageH: a.height * r,
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
                    scaleP: a.width * r / 750,
                    imageW: a.width * r,
                    imageH: a.height * r,
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
        var a = this, e = 2 * (c - t.touches[0].pageX), r = 2 * (i - t.touches[0].pageY), o = Math.max(a.data.cutL - e, 0), n = Math.max(a.data.cutT - r, 0), u = a.data.cropperW - a.data.cutW, s = a.data.cropperH - a.data.cutH;
        this.setData({
            cutL: Math.min(u, o),
            cutT: Math.min(s, n)
        }), c = t.touches[0].pageX, i = t.touches[0].pageY;
    },
    getImageInfo: function() {
        var c = this;
        t.initQiniu(), wx.showLoading({
            title: "图片生成中..."
        });
        var i = wx.createCanvasContext("myCanvas");
        i.drawImage(c.data.imageSrc, 0, 0, 1080, 1080 / g), i.draw(!0, function() {
            var i = c.data.cutW / c.data.cropperW * 1080, r = c.data.cutH / c.data.cropperH * 1080 / g, o = c.data.cutL / c.data.cropperW * 1080, n = c.data.cutT / c.data.cropperH * 1080 / g;
            wx.canvasToTempFilePath({
                x: o,
                y: n,
                width: i,
                height: r,
                destWidth: i,
                destHeight: r,
                quality: .5,
                canvasId: "myCanvas",
                success: function(i) {
                    wx.hideLoading(), console.log(i.tempFilePath), a.upload(i.tempFilePath, function(a) {
                        if (null != a.imageURL && "" != a.imageURL) {
                            var i = 0, r = 0;
                            1 == c.data.tp ? i = e.globalData.teacher.id : r = e.globalData.cpc.id, wx.request({
                                url: t.localUrl + "mobileXcx/editBpImage",
                                data: {
                                    tp: c.data.tp,
                                    tId: i,
                                    cId: r,
                                    bpImage: a.imageURL
                                },
                                header: {
                                    "content-type": "application/json"
                                },
                                success: function(t) {
                                    1 == c.data.tp ? e.globalData.teacher.bp_image = a.imageURL : e.globalData.cpc.bp_image = a.imageURL;
                                    var i = getCurrentPages();
                                    i[i.length - 2].setData({
                                        bpImage: a.imageURL
                                    }), wx.navigateBack();
                                }
                            });
                        }
                    }, function(t) {
                        console.error("error: " + JSON.stringify(t));
                    });
                }
            });
        });
    },
    dragStart: function(t) {
        var a = this;
        o = t.touches[0].pageX, n = t.touches[0].pageY, u = a.data.cutW, s = a.data.cutL, 
        h = a.data.cutT, p = a.data.cutH;
    },
    dragMove: function(t) {
        var a = this;
        switch (t.target.dataset.drag) {
          case "right":
            e = 2 * (o - t.touches[0].pageX);
            if (!(u >= e)) return;
            if (e < 0 && a.data.cropperW > s + a.data.cutW && this.setData({
                cutW: u - e
            }), !(e > 0)) return;
            this.setData({
                cutW: u - e
            });
            break;

          case "left":
            e = 2 * (e = o - t.touches[0].pageX);
            if (!(u >= e && s > e)) return;
            if (e < 0 && Math.abs(e) >= u) return;
            this.setData({
                cutL: s - e,
                cutW: u + e
            });
            break;

          case "top":
            e = 2 * (n - t.touches[0].pageY);
            if (!(p >= e && h > e)) return;
            if (e < 0 && Math.abs(e) >= p) return;
            this.setData({
                cutT: h - e,
                cutH: p + e
            });
            break;

          case "bottom":
            var e = 2 * (n - t.touches[0].pageY);
            if (!(p >= e)) return;
            if (e < 0 && a.data.cropperH > h + a.data.cutH && this.setData({
                cutH: p - e
            }), !(e > 0)) return;
            this.setData({
                cutH: p - e
            });
            break;

          case "rightBottom":
            var c = 2 * (o - t.touches[0].pageX), i = 2 * (n - t.touches[0].pageY);
            if (!(p >= i && u >= c)) return;
            if ((i < 0 && a.data.cropperH > h + a.data.cutH || i > 0) && this.setData({
                cutH: p - i
            }), !(c < 0 && a.data.cropperW > s + a.data.cutW || c > 0)) return;
            this.setData({
                cutW: u - c
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