function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var e, s, i, n = t(require("../../../store")), o = t(require("../../../utils/create")), r = require("../../../api/apiInstance.js"), u = getApp();

(0, o.default)(n.default, (e = {
    properties: {
        navH: Number,
        status: Number,
        cartPage: String
    },
    data: {
        isComplex: !0,
        isPrice: !0,
        isClassify: !0,
        isFilter: !0,
        isShowCateModel: !1,
        active: 0,
        isDesign: !1,
        cartPage: "风格",
        navH: u.globalData.navH,
        status: u.globalData.status,
        dataList: [],
        userInfo: {},
        styleUuid: "",
        isShowLoad: !0,
        options: !1,
        duration: 1e3,
        interval: 3e3,
        avatars: [],
        name: ""
    },
    onLoad: function(t) {
        this.setData({
            name: t.name
        });
    },
    preventMove: function() {},
    toPage: function(t) {
        var a = t.currentTarget.dataset.type;
        if ("搜索" == a) wx.navigateTo({
            url: "/pages/search/search"
        }); else if ("案例美图" == a && this.data.dataList.length > 0) {
            var e = this.data.styleUuid;
            wx.navigateTo({
                url: "/pages/home/caseMap/caseMap?styleUuid=" + e
            });
        }
    },
    onReady: function() {
        this.getStyleQuery();
    },
    getStyleQuery: function() {
        var t = this, a = {
            pageSize: 20,
            pageNum: 1,
            isMiniApp: 1
        };
        this.store.data.userInfo.accesstoken && (a.accesstoken = this.store.data.userInfo.accesstoken), 
        (0, r.getStyleQuery)(a, function(a) {
            if (1 === a.errcode) {
                t.setData({
                    dataList: a.data
                });
                for (var e = 0; e < a.data.length; e++) a.data[e].name == t.data.name && t.setData({
                    active: e,
                    dataList: a.data,
                    avatars: a.data[e].scenes.likeAvatars,
                    styleUuid: a.data[e].styleUuid
                });
                t.swiperAvatars();
            }
            t.setData({
                isShowLoad: !1
            });
        });
    },
    onPageScroll: function(t) {
        this.selectComponent("#goodsList").onPageScroll(t.scrollTop);
    },
    showCateModel: function(t) {
        this.setData({
            isShowCateModel: !0,
            options: !0
        });
    },
    closeModel: function() {
        var t = this;
        this.setData({
            options: !1
        }), i = setTimeout(function() {
            t.setData({
                isShowCateModel: !1
            });
        }, 300);
    },
    clearTimeTools: function() {
        clearTimeout(i), clearInterval(s);
    },
    onHide: function() {
        this.clearTimeTools();
    },
    onUnload: function() {
        this.clearTimeTools();
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading();
    },
    swiperAvatars: function() {
        var t = this;
        clearInterval(s);
        var a = this.data.avatars;
        a.length >= 8 && (s = setInterval(function() {
            var e = [];
            e.push(a.splice(0, 1)), a.push(e), t.setData({
                avatars: a
            });
        }, 2e3));
    },
    chooseOne: function(t) {
        this.data.styleUuid = this.data.dataList[t.currentTarget.dataset.index].styleUuid, 
        this.data.avatars = this.data.dataList[t.currentTarget.dataset.index].scenes.likeAvatars, 
        this.setData({
            active: t.currentTarget.dataset.index,
            styleUuid: this.data.styleUuid,
            avatars: this.data.avatars
        }), this.swiperAvatars();
    }
}, a(e, "onPullDownRefresh", function() {
    this.selectComponent("#goodsList").onRefresh();
}), a(e, "onReachBottom", function() {
    this.selectComponent("#goodsList").onMore();
}), a(e, "onClassify", function(t) {
    var a = t.currentTarget.dataset.uuid, e = t.currentTarget.dataset.index;
    this.setData({
        isShowCateModel: !1,
        active: e,
        styleUuid: a
    });
}), a(e, "onLike", function(t) {
    var a = this, e = t.currentTarget.dataset.uuid;
    if (this.store.data.isLogin) {
        var s = {
            accesstoken: this.store.data.userInfo.accesstoken,
            linkUuid: e
        };
        (0, r.getStyleLike)(s, function(t) {
            1 === t.errcode && (a.data.dataList[a.data.active].scenes.isLiked = 1, a.data.dataList[a.data.active].scenes.likeCount = 1 + a.data.dataList[a.data.active].scenes.likeCount, 
            a.data.dataList[a.data.active].scenes.likeAvatars.push(a.store.data.userInfo.avatar), 
            a.setData({
                dataList: a.data.dataList
            }), wx.showToast({
                title: "点赞成功",
                icon: "none",
                duration: 3e3
            }));
        });
    } else wx.navigateTo({
        url: "/pages/login/loginFast/loginFast"
    });
}), a(e, "previewImg", function(t) {
    var a = t.currentTarget.dataset.images;
    wx.previewImage({
        urls: a,
        success: function(t) {},
        fail: function(t) {},
        complete: function(t) {}
    });
}), e));