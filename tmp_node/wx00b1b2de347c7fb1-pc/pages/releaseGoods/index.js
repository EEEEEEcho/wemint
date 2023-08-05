function t(t, e, a) {
    wx.showLoading({
        title: "正在上传...",
        mask: !0
    }), wx.uploadFile({
        url: "https://www.0469ynxx.cn/api/uploadImg",
        filePath: e,
        name: "image",
        header: {
            "Content-Type": "multipart/form-data"
        },
        success: function(a) {
            if (200 == a.statusCode) {
                var s = JSON.parse(a.data);
                t.data.imageList.push(e), t.data.imagesAddress.push("https://www.0469ynxx.cn" + s.result), 
                t.setData({
                    imageList: t.data.imageList,
                    imagesAddress: t.data.imagesAddress
                });
            } else wx.showModal({
                title: "提示",
                content: "上传失败",
                showCancel: !1
            });
        },
        fail: function(t) {
            wx.showModal({
                title: "提示",
                content: "上传失败",
                showCancel: !1
            });
        },
        complete: a || null
    });
}

var e = getApp(), a = require("../../utils/util");

Page({
    data: {
        imageList: [],
        address: "请选择...",
        information: "",
        imagesAddress: [],
        keyword: "",
        isTop: !1,
        infoTop: !1,
        latitude: void 0,
        longitude: void 0,
        showCover: !1,
        allowRelease: !0
    },
    onLoad: function(t) {
        var e = "";
        "6" === t.release && this.setData({
            infoTop: !0
        }), e = this.implementList[t.release] + " 发布", this.setData({
            keyword: this.implementList[t.release]
        }), wx.setNavigationBarTitle({
            title: e
        });
    },
    changTop: function(t) {
        this.setData({
            isTop: t.detail.value
        });
    },
    allowProtocol: function(t) {
        this.setData({
            allowRelease: t.detail.value
        });
    },
    showProtocol: function() {
        this.setData({
            showCover: !0
        });
    },
    hideCover: function() {
        this.setData({
            showCover: !1
        });
    },
    release: function(t) {
        if (t.detail.value.infomation) if ("请选择..." !== this.data.address && void 0 !== this.data.address && this.data.latitude && this.data.longitude) {
            var s = /^1[\d]{10}$/;
            t.detail.value.phone ? s.test(t.detail.value.phone) ? e.globalData.userInfo ? this.data.allowRelease ? (wx.showLoading({
                title: "正在上传",
                mask: !0
            }), wx.request({
                url: "https://www.0469ynxx.cn/api/save",
                method: "POST",
                data: {
                    name: e.globalData.userInfo.nickName,
                    avatar: e.globalData.userInfo.avatarUrl,
                    isTop: this.data.isTop,
                    keyword: this.data.keyword,
                    description: t.detail.value.infomation,
                    images: this.data.imagesAddress,
                    address: this.data.address,
                    date: a.formatTime(new Date()),
                    openId: e.globalData.openId,
                    phone: t.detail.value.phone,
                    latitude: this.data.latitude,
                    longitude: this.data.longitude
                },
                success: function(t) {
                    wx.hideLoading(), wx.showToast({
                        title: "成功",
                        icon: "success",
                        duration: 2e3,
                        success: function() {
                            wx.switchTab({
                                url: "/pages/index/index",
                                success: function(t) {
                                    var e = getCurrentPages().pop();
                                    void 0 !== e && null !== e && e.onLoad();
                                }
                            });
                        }
                    });
                },
                fail: function(t) {
                    wx.showToast({
                        title: "服务器错误，请重试",
                        duration: 1e3,
                        success: function() {
                            wx.switchTab({
                                url: "/pages/index/index"
                            });
                        }
                    });
                },
                complete: function() {
                    wx.hideLoading();
                }
            })) : wx.showModal({
                title: "警告",
                content: "请阅读并勾选发布协议",
                showCancel: !1
            }) : wx.showModal({
                title: "用户未授权",
                content: "如需正常发布信息，请按确定并在授权管理中选中“用户信息”，然后退出，重新进入小程序，否则您将无法发布信息。",
                showCancel: !1,
                success: function(t) {
                    t.confirm && wx.openSetting();
                }
            }) : wx.showModal({
                title: "警告",
                content: "请输入正确手机号",
                showCancel: !1
            }) : wx.showModal({
                title: "警告",
                content: "请输入手机号",
                showCancel: !1
            });
        } else wx.showModal({
            title: "警告",
            content: "请选择地址",
            showCancel: !1
        }); else wx.showModal({
            title: "警告",
            content: "请输入想要发布的信息",
            showCancel: !1
        });
    },
    add: function() {
        var e = this, a = this.data.imageList;
        if (a.length >= 6) return this.setData({
            lenMore: 1
        }), setTimeout(function() {
            e.setData({
                lenMore: 0
            });
        }, 2500), !1;
        wx.chooseImage({
            count: 6 - a.length,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                for (var s = a.tempFilePaths, i = e.data.imageList, o = 0; o < s.length; o++) {
                    if (i.length >= 6) return e.setData({
                        imageList: i
                    }), !1;
                    o + 1 === s.length ? t(e, s[o], function() {
                        wx.hideLoading();
                    }) : t(e, s[o]);
                }
                e.setData({
                    imageList: i
                });
            }
        });
    },
    deleteImage: function(t) {
        var e = this.data.imageList, a = this.data.imagesAddress, s = t.currentTarget.dataset.index, i = this;
        wx.showModal({
            title: "提示",
            content: "是否删除图片",
            success: function(t) {
                t.confirm && (e.splice(s, 1), a.splice(s, 1), i.setData({
                    imageList: e,
                    imagesAddress: a
                }));
            }
        });
    },
    chooseLocation: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userLocation"] ? wx.chooseLocation({
                    success: function(e) {
                        e.address && t.setData({
                            address: e.address,
                            latitude: e.latitude,
                            longitude: e.longitude
                        });
                    }
                }) : wx.authorize({
                    scope: "scope.userLocation",
                    success: function() {
                        var t = this;
                        wx.chooseLocation({
                            success: function(e) {
                                e.address && t.setData({
                                    address: e.address,
                                    latitude: e.latitude,
                                    longitude: e.longitude
                                });
                            }
                        });
                    },
                    fail: function() {
                        wx.showModal({
                            title: "用户未授权",
                            content: "如需正常发布信息，请按确定并在授权管理中选中“地理信息”，否则您将无法发布信息。",
                            showCancel: !1,
                            success: function(t) {
                                t.confirm && wx.openSetting();
                            }
                        });
                    }
                });
            }
        });
    },
    implementList: [ "买粮食", "卖粮食", "买农品", "卖农品", "商业信息", "农业机械", "溢农头条", "帮助中心" ]
});