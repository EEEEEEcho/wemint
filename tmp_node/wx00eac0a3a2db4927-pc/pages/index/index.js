function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e, i = t(require("../../store")), n = t(require("../../utils/create")), o = require("../../utils/authorize"), a = require("../../utils/distribution"), s = require("../../utils/mtaUtil.js"), d = getApp();

(0, n.default)(i.default, {
    data: {
        cartPage: "尚免·居",
        navH: d.globalData.navH,
        status: d.globalData.status,
        isShowMask: !1,
        qrCodeKey: "",
        sceneData: "",
        isShowImg: !1,
        isShowWish: !1,
        buttonTop: 0,
        buttonLeft: 0,
        windowHeight: "",
        windowWidth: "",
        wishUuid: "",
        startTime: 0,
        endTime: 0,
        myTime: null
    },
    buttonStart: function(t) {
        e = t.touches[0];
        var i = t.timeStamp;
        this.setData({
            startTime: i
        });
    },
    buttonMove: function(t) {
        var i = t.touches[t.touches.length - 1], n = i.clientX - e.clientX, o = i.clientY - e.clientY;
        e = i;
        var a = this.data.buttonTop + o, s = this.data.buttonLeft + n;
        s + 50 >= this.data.windowWidth && (s = this.data.windowWidth - 50), s <= 0 && (s = 0), 
        a <= 90 && (a = 90), a + 50 >= this.data.windowHeight && (a = this.data.windowHeight - 50), 
        this.setData({
            buttonTop: a,
            buttonLeft: s
        });
    },
    buttonEnd: function(t) {
        var e = t.timeStamp;
        this.setData({
            endTime: e
        }), this.data.endTime - this.data.startTime < 150 && this.toSearch();
    },
    toSearch: function() {
        wx.navigateTo({
            url: "/pages/search/search"
        });
    },
    onPageScroll: function(t) {
        var e = !1;
        e = t.scrollTop > 1e3, this.setData({
            isShowImg: e
        });
    },
    onPullDownRefresh: function() {
        this.selectComponent("#recommend").onRefresh();
    },
    onReachBottom: function() {
        this.selectComponent("#recommend").onMore();
    },
    hideDesign: function(t) {
        this.setData({
            isShowDesign: t.detail
        });
    },
    onShowMask: function(t) {
        var e = this, i = this.selectComponent("#modelMask");
        (0, o.getLocationPermission)(function(n) {
            i.setLocation(n.longitude, n.latitude), e.setData({
                isShowMask: t.detail
            });
        });
    },
    checkUpdateVersion: function() {
        if (wx.canIUse("getUpdateManager")) {
            var t = wx.getUpdateManager();
            t.onCheckForUpdate(function(e) {
                e.hasUpdate && (t.onUpdateReady(function() {
                    wx.showModal({
                        title: "尚免家居",
                        content: "新版本已经准备好，为您带来更好的体验",
                        success: function(e) {
                            e.confirm && t.applyUpdate();
                        }
                    });
                }), t.onUpdateFailed(function() {
                    wx.showModal({
                        title: "尚免家居",
                        content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
                    });
                }));
            });
        } else wx.showModal({
            title: "尚免家居",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    onShareAppMessage: function(t) {
        return (0, a.onSharePage)(this, "/pages/index/index", "", "", {
            title: "尚免家居",
            desc: "好家居，并不贵"
        });
    },
    getPhoneOver: function() {
        "" != this.data.wishUuid && this.setData({
            isShowWish: !0
        });
    },
    onLoad: function(t) {
        var e = this;
        if (wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    windowHeight: t.windowHeight,
                    windowWidth: t.windowWidth,
                    buttonLeft: t.windowWidth - 50,
                    buttonTop: t.windowHeight - 100
                });
            }
        }), void 0 !== t.q) {
            var i = decodeURIComponent(t.q);
            t.scene = i.split("/qrcode/")[1];
        }
        void 0 !== t.wishUuid && (this.store.data.isLogin ? this.setData({
            wishUuid: t.wishUuid,
            isShowWish: !0
        }) : this.setData({
            wishUuid: t.wishUuid
        })), (0, a.initScene)(this, t, !1, "", function() {}, function() {}, function(e) {
            var i = encodeURIComponent(JSON.stringify(t));
            wx.redirectTo({
                url: "/pages/login/loginPage/loginPage?preOptions=" + i
            });
        }), (0, a.initQrCode)(this, "pages/index/index", "", ""), this.checkUpdateVersion(), 
        (0, s.mtaPageInit)();
    }
});