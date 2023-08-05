var t = require("../../../utils/main.js"), e = require("../../../utils/qiniuUploader"), a = getApp();

Page({
    data: {
        imgs: [],
        imgPath: [],
        title: "",
        content: "",
        isCheckF: !1
    },
    onLoad: function(e) {
        t.initQiniu();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    inputTitle: function(t) {
        this.setData({
            title: t.detail.value
        });
    },
    inputContent: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    chooseImg: function(t) {
        var e = this;
        if (this.data.imgs.length >= 9) return this.setData({
            lenMore: 1
        }), setTimeout(function() {
            e.setData({
                lenMore: 0
            });
        }, 2500), !1;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                for (var a = t.tempFilePaths, i = e.data.imgs, n = 0; n < a.length; n++) {
                    if (i.length >= 9) return e.setData({
                        imgs: i
                    }), !1;
                    i.push(a[n]);
                }
                e.setData({
                    imgs: i
                });
            }
        });
    },
    deleteImg: function(t) {
        var e = this.data.imgs, a = t.currentTarget.dataset.index;
        e.splice(a, 1), this.setData({
            imgs: e
        });
    },
    previewImg: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.imgs;
        wx.previewImage({
            current: a[e],
            urls: a
        });
    },
    claSelect: function(t) {
        this.setData({
            isCheckF: !this.data.isCheckF
        });
    },
    saveMail: function(i) {
        t.collectFomrId(i.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800);
        var n = this;
        if (0 == this.data.title.length || 0 == this.data.content.length) 0 == this.data.title.length ? this.setData({
            focus1: !0
        }) : 0 == this.data.content.length && this.setData({
            focus2: !0
        }); else {
            var o = 0;
            n.data.isCheckF && (o = 1), wx.showLoading({
                mask: !0
            }), t.initQiniu();
            for (var s = "", c = 0; c < n.data.imgs.length; c++) e.upload(n.data.imgs[c], function(t) {
                null != t.imageURL && "" != t.imageURL && ("" == s ? s = t.imageURL : s += "," + t.imageURL);
            }, function(t) {
                console.error("error: " + JSON.stringify(t));
            });
            setTimeout(function() {
                wx.request({
                    url: t.localUrl + "mobileXcx/saveMail",
                    data: {
                        crm_code: t.crm_code,
                        school_code: a.globalData.cpc.school_code,
                        cpc_id: a.globalData.cpc.id,
                        title: n.data.title,
                        content: n.data.content,
                        is_anonymous: o,
                        img_path: s
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(t) {
                        if ("000" == t.data.succeed) {
                            wx.hideLoading();
                            var e = getCurrentPages();
                            e[e.length - 2].backLoad(), wx.navigateBack();
                        }
                    }
                });
            }, 2500);
        }
    }
});