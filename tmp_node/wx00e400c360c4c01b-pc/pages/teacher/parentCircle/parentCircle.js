var t = require("../../../utils/main.js"), e = require("../../../utils/qiniuUploader"), a = (t.formatLocation, 
[ [ "compressed" ], [ "original" ], [ "compressed", "original" ] ]), i = getApp();

Page({
    data: {
        imageList: [],
        vioUrl: "",
        tp: 0,
        imgPath: [],
        sourceTypeIndex: 2,
        sourceType: [ "拍照", "相册", "拍照或相册" ],
        sizeTypeIndex: 2,
        sizeType: [ "压缩", "原图", "压缩或原图" ],
        countIndex: 8,
        count: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
        content: "",
        roomname: "",
        latitude: "",
        longitude: "",
        isCpc: 1,
        isCheckF2: !0,
        isCheckF3: !0
    },
    onLoad: function(e) {
        t.initQiniu();
        var a = e.tp;
        if (0 == a) {
            var i = JSON.parse(e.imgmodel);
            this.setData({
                tp: a,
                imageList: i
            });
        }
        if (1 == a) {
            var n = e.vioUrl;
            this.setData({
                tp: a,
                vioUrl: n
            });
        }
    },
    addContent: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    claSelect2: function(t) {
        this.setData({
            isCheckF2: !this.data.isCheckF2
        });
    },
    claSelect3: function(t) {
        this.setData({
            isCheckF3: !this.data.isCheckF3
        });
    },
    sourceTypeChange: function(t) {
        this.setData({
            sourceTypeIndex: t.detail.value
        });
    },
    sizeTypeChange: function(t) {
        this.setData({
            sizeTypeIndex: t.detail.value
        });
    },
    countChange: function(t) {
        this.setData({
            countIndex: t.detail.value
        });
    },
    chooseImage: function() {
        var t = this;
        wx.chooseImage({
            sizeType: a[this.data.sizeTypeIndex],
            count: this.data.count[this.data.countIndex],
            success: function(e) {
                for (var a = e.tempFilePaths, i = t.data.imageList, n = 0; n < a.length; n++) {
                    if (i.length >= 9) return t.setData({
                        imgs: i
                    }), !1;
                    i.push(a[n]);
                }
                t.setData({
                    imageList: i
                });
            }
        });
    },
    previewImage: function(t) {
        var e = t.target.dataset.src;
        wx.previewImage({
            current: e,
            urls: this.data.imageList
        });
    },
    getAddress: function() {
        var t = this;
        wx.chooseLocation({
            success: function(e) {
                t.setData({
                    roomname: e.name,
                    latitude: e.latitude,
                    longitude: e.longitude
                });
            }
        });
    },
    clear: function() {
        this.setData({
            hasLocation: !1
        });
    },
    primary: function() {
        var a = this;
        t.initQiniu(), wx.showLoading({
            mask: !0
        });
        var n = "";
        a.data.isCheckF2 && (n += ",0"), a.data.isCheckF3 && (n += ",1");
        var o = "";
        if (0 == a.data.tp) for (var s = 0; s < a.data.imageList.length; s++) e.upload(a.data.imageList[s], function(t) {
            null != t.imageURL && "" != t.imageURL && ("" == o ? o = t.imageURL : o += "," + t.imageURL);
        }, function(t) {
            console.error("error: " + JSON.stringify(t));
        }); else e.upload(a.data.vioUrl, function(t) {
            null != t.imageURL && "" != t.imageURL && (o = t.imageURL);
        }, function(t) {
            console.error("error: " + JSON.stringify(t));
        });
        setTimeout(function() {
            wx.request({
                url: t.localUrl + "mobileXcx/addCircle",
                data: {
                    crm_code: t.crm_code,
                    account_type: 1,
                    account_code: i.globalData.teacher.id,
                    content: a.data.content,
                    imageList: o,
                    isUrl: a.data.tp,
                    urlPic: "",
                    roomname: a.data.roomname,
                    latitude: a.data.latitude,
                    longitude: a.data.longitude,
                    lookType: n
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    if (200 == t.statusCode) {
                        wx.hideLoading();
                        var e = getCurrentPages();
                        e[e.length - 2].backLoad(), wx.navigateBack();
                    }
                }
            });
        }, 2500);
    }
});