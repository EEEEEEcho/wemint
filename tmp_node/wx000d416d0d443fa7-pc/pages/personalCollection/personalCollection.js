var t = require("../../utils/server"), o = (require("../../config.js"), {});

Page({
    data: {
        _hasCollect: !0,
        userCollect: []
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "我的收藏"
        }), o = {
            authorization: wx.getStorageSync("authorization")
        };
        var a = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), t.getApiJSON("/api/UserInfo/getUserCollection", {
            type: 1
        }, function(t) {
            if (1e3 == t.data.code) {
                var o = t.data.data;
                if (o.length < 1) a.setData({
                    isEmpty: !0
                }); else {
                    for (var e in o) "" == o[e].logo_path ? o[e].logo_path = "../../images/logo_100.png" : o[e].logo_path = "https://up-img.0xiao.cn" + o[e].logo_path, 
                    o[e].shopFullStar = Math.floor(o[e].star / 2), o[e].shopHarfStar = o[e].star % 2, 
                    o[e].shopNoStar = 5 - Math.ceil(o[e].star / 2);
                    a.setData({
                        isEmpty: !1,
                        userCollect: o
                    });
                }
                wx.hideLoading();
            } else wx.hideLoading(), getApp().showAndHideToast(t.data.msg);
        }, o);
    },
    changeCollect: function(e) {
        var a = e.currentTarget.dataset.id, i = this.data.userCollect, s = this;
        for (var n in i) !function(e) {
            if (a == i[e].collection_id) if (1 == i[e].collection_type) {
                var n = {
                    collection_type: 1,
                    shop_id: i[e].shop_id
                };
                wx.showLoading({
                    title: "取消中",
                    mask: !0
                }), t.postApiJSON("/api/UserInfo/delUserCollection", n, function(t) {
                    1e3 == t.data.code ? (t.data.data, i[e].collection_type = 0, s.setData({
                        userCollect: i
                    }), wx.hideLoading()) : (wx.hideLoading(), getApp().showAndHideToast(t.data.msg));
                }, o);
            } else if (0 == i[e].collection_type) {
                var l = {
                    collection_type: 1,
                    shop_id: i[e].shop_id
                };
                wx.showLoading({
                    title: "收藏中",
                    mask: !0
                }), t.postApiJSON("/api/UserInfo/saveUserCollection", l, function(t) {
                    1e3 == t.data.code ? (i[e].collection_type = 1, s.setData({
                        userCollect: i
                    }), wx.hideLoading()) : wx.hideLoading();
                }, o);
            }
        }(n);
    },
    toIndex: function(t) {
        wx.switchTab({
            url: "../index/index"
        });
    },
    toShop: function(t) {
        wx.navigateTo({
            url: "../shopDetail/shopDetail?shopid=" + t.currentTarget.dataset.shopid + "&shoptoken=" + t.currentTarget.dataset.shoptoken
        });
    }
});