function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function t(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var e = a(require("../../../store")), s = a(require("../../../utils/create")), i = require("../../../api/apiInstance"), o = getApp();

(0, s.default)(e.default, {
    properties: {
        cartPage: String,
        navH: Number,
        status: Number
    },
    data: {
        cartPage: "案例美图",
        navH: o.globalData.navH,
        status: o.globalData.status,
        pageSize: 10,
        pageNum: 1,
        dataList: [],
        styleUuid: "",
        spaceUuid: "",
        isShowLoad: !0
    },
    onLoad: function(a) {
        var t = a.styleUuid, e = a.spaceUuid;
        void 0 != t ? (this.setData({
            styleUuid: t
        }), this.getScenesQuery(t)) : (this.setData({
            spaceUuid: e
        }), this.getSpacesQuery(e));
    },
    getScenesQuery: function(a) {
        var t = this, e = {
            styleUuid: a,
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum
        };
        this.store.data.userInfo.accesstoken && (e.accesstoken = this.store.data.userInfo.accesstoken), 
        (0, i.getScenesQuery)(e, function(a) {
            if (wx.stopPullDownRefresh(), 1 === a.errcode) {
                var e = !0;
                a.pages > t.data.pageNum && (e = !1), t.setData({
                    dataList: a.data,
                    isLoad: e
                });
            }
            t.setData({
                isShowLoad: !1
            });
        });
    },
    getSpacesQuery: function(a) {
        var t = this, e = {
            spaceUuid: a,
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum
        };
        this.store.data.userInfo.accesstoken && (e.accesstoken = this.store.data.userInfo.accesstoken), 
        (0, i.getSpacesQuery)(e, function(a) {
            if (wx.stopPullDownRefresh(), 1 === a.errcode) {
                var e = !0;
                a.pages > t.data.pageNum && (e = !1), t.setData({
                    dataList: a.data,
                    isLoad: e
                });
            }
            t.setData({
                isShowLoad: !1
            });
        });
    },
    onLike: function(a) {
        var e = this, s = a.currentTarget.dataset.uuid, o = a.currentTarget.dataset.index;
        if (this.store.data.isLogin) {
            var u = {
                accesstoken: this.store.data.userInfo.accesstoken,
                linkUuid: s
            };
            void 0 != this.data.styleUuid ? (0, i.getStyleLike)(u, function(a) {
                if (1 === a.errcode) {
                    var s, i = "dataList[" + o + "].isLiked", u = "dataList[" + o + "].likeCount";
                    e.setData((s = {}, t(s, i, 1), t(s, u, 1 + e.data.dataList[o].likeCount), s)), wx.showToast({
                        title: "点赞成功",
                        icon: "none",
                        duration: 3e3
                    });
                }
            }) : (0, i.getSpaceLike)(u, function(a) {
                if (1 === a.errcode) {
                    var s, i = "dataList[" + o + "].isLiked", u = "dataList[" + o + "].likeCount";
                    e.setData((s = {}, t(s, i, 1), t(s, u, 1 + e.data.dataList[o].likeCount), s)), wx.showToast({
                        title: "点赞成功",
                        icon: "none",
                        duration: 3e3
                    });
                }
            });
        } else wx.navigateTo({
            url: "/pages/login/loginFast/loginFast"
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1,
            isLoad: !1
        }), "" != this.data.styleUuid ? this.getScenesQuery(this.data.styleUuid) : this.getSpacesQuery(this.data.spaceUuid);
    },
    onReachBottom: function() {
        var a = this;
        if (!this.data.isLoad) {
            var t = this.data.pageNum + 1;
            this.setData({
                pageNum: t,
                isLoad: !0
            });
        }
        var e = {
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum
        };
        this.store.data.userInfo.accesstoken && (e.accesstoken = this.store.data.userInfo.accesstoken), 
        "" != this.data.styleUuid ? (e.styleUuid = this.data.styleUuid, (0, i.getScenesQuery)(e, function(t) {
            if (wx.stopPullDownRefresh(), 1 === t.errcode) {
                var e = !0;
                t.pages > a.data.pageNum && (e = !1), a.setData({
                    dataList: t.data,
                    isLoad: e
                });
            }
        })) : (e.spaceUuid = this.data.spaceUuid, (0, i.getSpacesQuery)(e, function(t) {
            if (wx.stopPullDownRefresh(), 1 === t.errcode) {
                var e = !0;
                t.pages > a.data.pageNum && (e = !1), a.setData({
                    dataList: t.data,
                    isLoad: e
                });
            }
        }));
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