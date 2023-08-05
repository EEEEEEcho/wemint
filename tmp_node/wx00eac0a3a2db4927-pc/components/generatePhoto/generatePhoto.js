var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../utils/create")), t = require("../../utils/canvasUtil"), e = require("../../utils/promisify"), s = require("../../api/apiInstance"), i = require("../../utils/storage.js"), n = require("../../utils/authorize"), o = require("../../utils/watcherUtil"), r = require("../../utils/constant");

(0, a.default)({
    properties: {
        isShow: Boolean,
        goodsInfo: Object
    },
    data: {
        canvasWidth: .8 * wx.getSystemInfoSync().windowWidth,
        canvasHeight: 1.35 * wx.getSystemInfoSync().windowWidth,
        canvasData: {},
        user: {
            avatar: "http://oss.shangmian.xin/weixin_applets_login_default_avatar.png",
            nickname: "未登录"
        },
        isShowLoad: !1,
        isDraw: !1,
        isLogin: !1,
        imageCount: 0
    },
    observers: {
        isShow: function(a) {
            a && !this.data.isDraw && this.setData({
                isShowLoad: !0
            });
        },
        goodsInfo: function(a) {
            var t = (0, i.getUser)();
            void 0 === a || "{}" == JSON.stringify(a) || this.data.isDraw || null == t || "" == t || this.initData(this.data.goodsInfo);
        },
        imageCount: function(a) {
            3 == a && this.createCanvas();
        }
    },
    ready: function() {
        var a = this;
        (0, o.setWatcher)(this.data, {
            isLogin: function(t) {
                if ("{}" != JSON.stringify(a.data.goodsInfo) && t) {
                    var e = (0, i.getUser)();
                    null != e && "" != e && (a.data.user = e), a.initData(a.data.goodsInfo);
                }
            }
        });
    },
    methods: {
        initData: function(a) {
            if ("{}" != JSON.stringify(a)) {
                var t = (0, i.getUser)();
                null != t && "" != t && (this.data.user = t), this.data.canvasData.avatar = this.replaceHost(this.data.user.avatar), 
                this.data.canvasData.cover = this.replaceHost(a.covers[0]), this.data.canvasData.nickname = this.data.user.nickname, 
                void 0 !== a.activityPrice ? this.data.canvasData.salesPrice = "¥" + (a.activityPrice / 100).toFixed(2) : this.data.canvasData.salesPrice = "¥" + (a.minSalesPrice / 100).toFixed(2), 
                this.data.canvasData.marketPrice = "¥" + (a.maxMarketPrice / 100).toFixed(2), a.title.length > 12 ? this.data.canvasData.title = a.title.substring(0, 12) + " ..." : this.data.canvasData.title = a.title, 
                this.getMaQrCode(), this.getAvatar(), this.getCover();
            }
        },
        getMaQrCode: function() {
            var a = this, t = {
                isCreateQrCode: 1,
                accesstoken: this.data.user.accesstoken,
                goodsUuid: this.data.goodsInfo.goodsUuid,
                page: "pages/goodDetail/goodDetail"
            }, e = this;
            (0, s.getMaQrCode)(t, function(t) {
                1 === t.errcode ? (a.triggerEvent("onQrCodeKey", t.data.key), a.data.canvasData.qrCode = a.replaceHost(t.data.maCode), 
                wx.getImageInfo({
                    src: e.data.canvasData.qrCode,
                    success: function(a) {
                        e.data.canvasData.qrCode = a.path, e.setImageCount();
                    },
                    fail: function(a) {
                        e.setData({
                            isShowLoad: !1
                        });
                    }
                })) : e.setData({
                    isShowLoad: !1
                });
            });
        },
        getCover: function() {
            var a = this;
            wx.getImageInfo({
                src: a.data.canvasData.cover,
                success: function(t) {
                    a.data.canvasData.cover = t.path, a.setImageCount();
                },
                fail: function(t) {
                    a.setData({
                        isShowLoad: !1
                    });
                }
            });
        },
        getAvatar: function() {
            if (-1 == this.data.canvasData.avatar.indexOf("https://")) this.setImageCount(); else {
                var a = this;
                wx.getImageInfo({
                    src: a.data.canvasData.avatar,
                    success: function(t) {
                        a.data.canvasData.avatar = t.path, a.setImageCount();
                    },
                    fail: function(t) {
                        a.setData({
                            isShowLoad: !1
                        });
                    }
                });
            }
        },
        setImageCount: function() {
            this.data.imageCount++, this.setData({
                imageCount: this.data.imageCount
            });
        },
        replaceHost: function(a) {
            return -1 != a.indexOf(r.OLD_IMAGE_HOST) ? a.replace(r.OLD_IMAGE_HOST, r.NEW_IMAGE_HOST) : a;
        },
        createCanvas: function() {
            var a = this.data.canvasData.nickname, e = this.data.canvasData.salesPrice, s = this.data.canvasData.marketPrice, i = this.data.canvasData.title, n = this.data.canvasData.avatar, o = this.data.canvasData.cover, r = this.data.canvasData.qrCode, c = this.data.canvasWidth, d = this.data.canvasHeight, l = .13 * d, h = .05 * c, f = .06 * c, u = .55 * c, v = u * (54 / 404).toFixed(4), g = .88 * c, m = g * (26 / 671).toFixed(4), x = .16 * l, p = .09 * d, D = p + f + .03 * c, w = l + h + .03 * d, S = w + .04 * d, I = D + .4 * c, C = c - 2 * f, y = C, P = p + w - .01 * d, T = y + P + .07 * d, b = parseInt((0, 
            t.rpxToPx)(122)), k = parseInt((0, t.rpxToPx)(10)), F = .08 * c, _ = T + .05 * d, q = _ + .06 * d, L = .12 * d, H = c - L - f, O = T - .03 * d, M = wx.createCanvasContext("generateCanvas", this);
            M.setFillStyle("#ffffff"), M.setLineWidth(1), M.fillRect(0, 0, c, d), M.fill(), 
            M.setFillStyle("#51515c"), M.fillRect(0, 0, c, l), M.fill(), M.drawImage("/images/icon/top_slogan.png", f, h, u, v), 
            M.drawImage("/images/icon/top_check.png", f, h + v + x, g, m), M.save(), M.beginPath(), 
            M.arc(p / 2 + f, p / 2 + h + l, p / 2, 0, 2 * Math.PI), M.setStrokeStyle("#ffffff"), 
            M.clip(), M.drawImage(n, f, h + l, p, p), M.restore(), M.font = "normal normal " + (0, 
            t.rpxToPx)(24) + "px sans-serif", M.fillText(a, D, w), M.setFillStyle("#3f3f3f"), 
            M.font = "normal bold " + (0, t.rpxToPx)(28) + "px sans-serif", M.fillText("推荐给您一个好物", D, S), 
            M.setFillStyle("#efefef"), M.font = "normal bold " + (0, t.rpxToPx)(48) + "px sans-serif", 
            M.fillText("”", I, S), M.drawImage(o, f, P, C, y), M.setFillStyle("#f44341"), M.font = "normal bold " + (0, 
            t.rpxToPx)(48) + "px sans-serif", M.fillText(e, f, T), M.setFillStyle("#9b9b9b"), 
            M.font = "normal normal " + (0, t.rpxToPx)(32) + "px sans-serif", M.fillText(s, F, _), 
            M.setStrokeStyle("#9b9b9b"), M.moveTo(F, _ - k), M.lineTo(F + b, _ - k), M.closePath(), 
            M.stroke(), M.setFillStyle("#5b5b65"), M.font = "normal normal " + (0, t.rpxToPx)(26) + "px sans-serif", 
            M.fillText(i, f, q), M.drawImage(r, H, O, L, L), M.font = "normal normal " + (0, 
            t.rpxToPx)(21) + "px sans-serif", M.fillText("长按/扫码识别", H - .02 * c, q), M.draw(), 
            this.data.isDraw = !0, this.setData({
                isShowLoad: !1
            });
        },
        onSave: function() {
            (0, e.promisify)(wx.canvasToTempFilePath)({
                canvasId: "generateCanvas",
                width: this.data.canvasWidth,
                heght: this.data.canvasHeight,
                destWidth: 4 * this.data.canvasWidth,
                destHeight: 4 * this.data.canvasHeight,
                quality: 1
            }, this).then(function(a) {
                (0, n.getPhotosAlbumPermission)(a.tempFilePath, function(a) {
                    wx.showToast({
                        title: "已保存到相册",
                        icon: "none",
                        duration: 3e3
                    });
                });
            }).catch(function(a) {});
        },
        onBottomLayout: function() {},
        onShare: function() {
            this.setData({
                isShow: !1
            });
        },
        onClose: function() {
            this.setData({
                isShow: !1
            });
        },
        preventTouchMove: function(a) {}
    }
});