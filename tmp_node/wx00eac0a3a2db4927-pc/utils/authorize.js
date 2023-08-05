Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getLocationPermission = function(t) {
    wx.getLocation({
        type: "gcj02",
        success: function(o) {
            t(o);
        },
        fail: function() {
            wx.getSetting({
                success: function(o) {
                    o.authSetting["scope.userLocation"] || wx.showModal({
                        title: "授权当前位置",
                        content: "需要获取您的地理位置，为您推荐最近的门店",
                        success: function(o) {
                            o.confirm && wx.openSetting({
                                success: function(o) {
                                    !0 === o.authSetting["scope.userLocation"] && wx.getLocation({
                                        type: "gcj02",
                                        success: function(o) {
                                            t(o);
                                        }
                                    });
                                }
                            });
                        }
                    });
                },
                fail: function(t) {
                    wx.showToast({
                        title: "调用授权窗口失败",
                        icon: "none",
                        duration: 3e3
                    });
                }
            });
        }
    });
}, exports.getPhotosAlbumPermission = function(t, o) {
    wx.saveImageToPhotosAlbum({
        filePath: t,
        success: function(t) {
            o(t);
        },
        fail: function() {
            wx.getSetting({
                success: function(e) {
                    e.authSetting["scope.writePhotosAlbum"] || wx.showModal({
                        title: "授权存储相册",
                        content: "需要您的存储相册权限",
                        success: function(e) {
                            e.confirm && wx.openSetting({
                                success: function(e) {
                                    !0 === e.authSetting["scope.writePhotosAlbum"] && wx.saveImageToPhotosAlbum({
                                        filePath: t,
                                        success: function(t) {
                                            o(t);
                                        }
                                    });
                                }
                            });
                        }
                    });
                },
                fail: function(t) {
                    wx.showToast({
                        title: "调用授权窗口失败",
                        icon: "none",
                        duration: 3e3
                    });
                }
            });
        }
    });
};