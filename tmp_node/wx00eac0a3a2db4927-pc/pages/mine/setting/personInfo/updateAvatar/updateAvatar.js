function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("../../../../../store")), t = e(require("../../../../../utils/create")), s = require("../../../../../api/apiInstance.js"), o = require("../../../../../utils/qiniuImage"), r = require("../../../../../utils/storage"), n = getApp();

(0, t.default)(a.default, {
    properties: {},
    data: {
        cartPage: "头像",
        navH: n.globalData.navH,
        status: n.globalData.status,
        userInfo: {},
        avatar: ""
    },
    onShow: function() {
        this.setData({
            avatar: this.store.data.userInfo.avatar
        });
    },
    changeAvatar: function() {
        var e = this;
        wx.showActionSheet({
            itemList: [ "从相册中选择", "拍照" ],
            itemColor: "#99CCFF",
            success: function(a) {
                0 == a.tapIndex ? e.chooseWxImageShop("album") : 1 == a.tapIndex && e.chooseWxImageShop("camera");
            }
        });
    },
    chooseWxImageShop: function(e) {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ e ],
            success: function(e) {
                a.uploadImages(e.tempFilePaths[0]);
            }
        });
    },
    updateUser: function(e) {
        var a = this, t = {
            accesstoken: this.store.data.userInfo.accesstoken,
            avatar: e
        };
        (0, s.updateUserInfo)(t, function(t) {
            1 == t.errcode && (a.store.data.userInfo.avatar = e, a.update(), a.setData({
                avatar: e
            }), (0, r.setUser)(a.store.data.userInfo), wx.navigateBack({
                delta: 1
            }));
        });
    },
    uploadImages: function(e) {
        var a = this, t = {
            accesstoken: this.store.data.userInfo.accesstoken
        };
        (0, s.getImageToken)(t, function(t) {
            1 === t.errcode && (0, o.upTokenImage)(e, t.data.token, function(e) {
                a.updateUser(e);
            }, function() {});
        });
    }
});