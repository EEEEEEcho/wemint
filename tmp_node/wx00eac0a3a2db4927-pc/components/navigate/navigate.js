var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create")), t = require("../../api/apiInstance.js"), a = require("../../utils/qiniuImage"), i = require("../../utils/filter.js"), s = getApp();

(0, e.default)({
    properties: {
        cartLength: Boolean,
        background: {
            type: String,
            value: "rgba(255, 255, 255, 1)"
        },
        cartPage: String,
        cartLeftText: String,
        isShowDesign: Boolean,
        isShareJump: Boolean
    },
    attached: function() {
        this.setStyle();
    },
    data: {
        isShowMask: !1,
        navH: s.globalData.navH,
        status: s.globalData.status,
        inputValue: "",
        pictureUrl: ""
    },
    methods: {
        setStyle: function() {
            var e = [ "background:" + this.data.background ].join(";");
            this.setData({
                containerStyle: e
            });
        },
        onManage: function() {
            this.triggerEvent("onManage");
        },
        backToIndex: function(e) {
            this.data.isShareJump ? wx.reLaunch({
                url: "/pages/index/index"
            }) : wx.navigateBack({
                delta: 1
            });
        },
        getInputValue: function(e) {
            var t = e.detail.value, a = i.filterEmoji(t.trim()), s = i.filterSpace(a);
            this.setData({
                inputValue: s
            });
        },
        searchSomething: function(e) {
            var t = e.detail.value;
            t.match(/^[ ]*$/) ? wx.showToast({
                title: "搜索的内容不能为空",
                icon: "none",
                duration: 3e3
            }) : (t = t.trim(), wx.navigateTo({
                url: "/pages/search/searchResult/searchResult?searchText=" + t
            }), this.triggerEvent("searchHistory", t));
        },
        getPictureSource: function() {
            var e = this;
            wx.showActionSheet({
                itemList: [ "从相册中选择", "拍照" ],
                itemColor: "#99CCFF",
                success: function(t) {
                    0 == t.tapIndex ? e.chooseWxImageShop("album") : 1 == t.tapIndex && e.chooseWxImageShop("camera");
                }
            });
        },
        chooseWxImageShop: function(e) {
            var t = this;
            wx.chooseImage({
                count: 1,
                sizeType: [ "original", "compressed" ],
                sourceType: [ e ],
                success: function(e) {
                    t.uploadImages(e.tempFilePaths[0]);
                }
            });
        },
        uploadImages: function(e) {
            var i = {
                accesstoken: this.store.data.userInfo.accesstoken
            };
            (0, t.getImageToken)(i, function(t) {
                1 === t.errcode && (0, a.upTokenImage)(e, t.data.token, function(e) {
                    var t = e;
                    wx.navigateTo({
                        url: "/pages/search/searchResult/searchResult?pictureUrl=" + t
                    });
                }, function() {});
            });
        },
        showMask: function(e) {
            this.setData({
                isShowMask: !0
            });
            var t = this.data.isShowMask;
            this.triggerEvent("isShowMask", t), t && wx.getSetting({
                success: function(e) {
                    e.authSetting["scope.userLocation"];
                }
            });
        },
        toOtherPage: function() {
            this.store.data.isLogin ? wx.navigateTo({
                url: "/pages/mine/setting/setting"
            }) : wx.navigateTo({
                url: "/pages/login/loginFast/loginFast"
            });
        }
    }
});