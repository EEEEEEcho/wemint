function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t, e, s = a(require("../../../store")), i = a(require("../../../utils/create")), n = require("../../../api/apiInstance.js"), o = getApp();

(0, i.default)(s.default, {
    properties: {
        cartPage: String
    },
    data: {
        isComplex: !0,
        isPrice: !0,
        isClassify: !0,
        isFilter: !0,
        isShowCateModel: !1,
        active: 0,
        cartPage: "空间",
        navH: o.globalData.navH,
        status: o.globalData.status,
        dataList: [],
        spaceUuid: "",
        isShowLoad: !0,
        options: !1,
        avatars: [],
        name: ""
    },
    preventMove: function() {},
    onLoad: function(a) {
        this.setData({
            name: a.name
        });
    },
    onReady: function() {
        this.getSpaceQuery();
    },
    toPage: function(a) {
        var t = a.currentTarget.dataset.type;
        if ("搜索" == t) wx.navigateTo({
            url: "/pages/search/search"
        }); else if ("案例美图" == t) {
            var e = this.data.spaceUuid;
            wx.navigateTo({
                url: "/pages/home/caseMap/caseMap?spaceUuid=" + e
            });
        }
    },
    getSpaceQuery: function() {
        var a = this, t = {
            pageSize: 20,
            pageNum: 1,
            isMiniApp: 1
        };
        this.store.data.userInfo.accesstoken && (t.accesstoken = this.store.data.userInfo.accesstoken), 
        (0, n.getSpaceQuery)(t, function(t) {
            if (1 === t.errcode) {
                a.setData({
                    dataList: t.data
                });
                for (var e = 0; e < t.data.length; e++) t.data[e].name == a.data.name && a.setData({
                    active: e,
                    dataList: t.data,
                    avatars: t.data[e].scenes.likeAvatars,
                    spaceUuid: t.data[e].spaceUuid
                });
                a.swiperAvatars();
            }
            a.setData({
                isShowLoad: !1
            });
        });
    },
    swiperAvatars: function() {
        var a = this;
        clearInterval(t);
        var e = this.data.avatars;
        e.length >= 8 && (t = setInterval(function() {
            var t = [];
            t.push(e.splice(0, 1)), e.push(t), a.setData({
                avatars: e
            });
        }, 2e3));
    },
    chooseOne: function(a) {
        this.data.spaceUuid = this.data.dataList[a.currentTarget.dataset.index].spaceUuid, 
        this.data.avatars = this.data.dataList[a.currentTarget.dataset.index].scenes.likeAvatars, 
        this.setData({
            active: a.currentTarget.dataset.index,
            spaceUuid: this.data.spaceUuid,
            avatars: this.data.avatars
        }), this.swiperAvatars();
    },
    onPageScroll: function(a) {
        this.selectComponent("#goodsList").onPageScroll(a.scrollTop);
    },
    showCateModel: function(a) {
        this.setData({
            isShowCateModel: !0,
            options: !0
        });
    },
    onHide: function() {
        clearTimeout(e), clearInterval(t);
    },
    onUnload: function() {
        clearTimeout(e), clearInterval(t);
    },
    closeModel: function() {
        var a = this;
        this.setData({
            options: !1
        }), e = setTimeout(function() {
            a.setData({
                isShowCateModel: !1
            });
        }, 300);
    },
    onPullDownRefresh: function() {
        this.selectComponent("#goodsList").onRefresh();
    },
    onReachBottom: function() {
        this.selectComponent("#goodsList").onMore();
    },
    onClassify: function(a) {
        var t = a.currentTarget.dataset.uuid, e = a.currentTarget.dataset.index;
        this.setData({
            isShowCateModel: !1,
            active: e,
            spaceUuid: t
        });
    },
    onLike: function(a) {
        var t = this, e = a.currentTarget.dataset.uuid;
        if (this.store.data.isLogin) {
            var s = {
                accesstoken: this.store.data.userInfo.accesstoken,
                linkUuid: e
            };
            (0, n.getSpaceLike)(s, function(a) {
                1 === a.errcode && (t.data.dataList[t.data.active].scenes.isLiked = 1, t.data.dataList[t.data.active].scenes.likeCount = 1 + t.data.dataList[t.data.active].scenes.likeCount, 
                t.data.dataList[t.data.active].scenes.likeAvatars.push(t.store.data.userInfo.avatar), 
                t.setData({
                    dataList: t.data.dataList
                }), wx.showToast({
                    title: "点赞成功",
                    icon: "none",
                    duration: 3e3
                }));
            });
        } else wx.navigateTo({
            url: "/pages/login/loginFast/loginFast"
        });
    },
    previewImg: function(a) {
        var t = a.currentTarget.dataset.images;
        wx.previewImage({
            urls: t,
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    }
});