getApp();

var a = require("../../utils/data.js");

Page({
    data: {
        imgUrls: [ "https://www.0469ynxx.cn/images/banner/banner1.jpg", "https://www.0469ynxx.cn/images/banner/banner2.jpg", "https://www.0469ynxx.cn/images/banner/banner3.jpg" ],
        implementList: a,
        dealList: [],
        noMore: !1
    },
    curPage: 1,
    totalPage: 1,
    chooseList: function(a) {
        if (7 !== a.currentTarget.dataset.index) {
            var e = a.currentTarget.dataset.openId, t = a.currentTarget.dataset.index, n = e ? "/pages/list/index?openId=" + e : "/pages/list/index?index=" + t;
            wx.navigateTo({
                url: n
            });
        } else wx.navigateTo({
            url: "/pages/help/index"
        });
    },
    checkImg: function(a) {
        wx.previewImage({
            urls: a.currentTarget.dataset.urls,
            current: a.target.dataset.url
        });
    },
    checkDetail: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/detail/index?id=" + e
        });
    },
    checkAddress: function(a) {
        wx.openLocation({
            latitude: a.currentTarget.dataset.latitude,
            longitude: a.currentTarget.dataset.longitude
        });
    },
    takePhone: function(a) {
        var e = a.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    search: function(a) {
        a.detail.value && wx.navigateTo({
            url: "/pages/list/index?word=" + a.detail.value
        });
    },
    onShareAppMessage: function(a) {
        return {
            title: "溢农信息",
            path: this.route,
            success: function(a) {
                console.log(a);
            },
            fail: function(a) {}
        };
    },
    onPullDownRefresh: function() {
        var a = this;
        a.setData({
            noMore: !1
        }), a.curPage = 1, wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: "https://www.0469ynxx.cn/api/find",
            data: {
                curPage: 1
            },
            success: function(e) {
                a.setData({
                    dealList: e.data.value
                }), a.curPage++, a.totalPage = Math.ceil(e.data.totalRows / 5), wx.hideLoading(), 
                wx.stopPullDownRefresh();
            }
        });
    },
    onReachBottom: function() {
        var a = this;
        a.curPage > a.totalPage ? a.setData({
            noMore: !0
        }) : (wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: "https://www.0469ynxx.cn/api/find",
            data: {
                curPage: a.curPage
            },
            success: function(e) {
                a.setData({
                    dealList: a.data.dealList.concat(e.data.value)
                }), wx.hideLoading(), a.curPage++;
            }
        }));
    },
    onLoad: function() {
        var a = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: "https://www.0469ynxx.cn/api/find",
            data: {
                curPage: 1
            },
            success: function(e) {
                a.setData({
                    dealList: e.data.value
                }), wx.hideLoading(), a.curPage++, a.totalPage = Math.ceil(e.data.totalRows / 5);
            }
        });
    }
});