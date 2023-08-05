getApp();

Page({
    data: {
        dealList: [],
        implementList: [ "买粮食", "卖粮食", "买农品", "卖农品", "商业信息", "农业机械", "溢农头条", "帮助中心" ],
        noMore: !1,
        openId: void 0,
        index: void 0,
        word: void 0
    },
    curPage: 1,
    totalPage: 1,
    onLoad: function(t) {
        var a = this, e = "", n = {
            curPage: a.curPage
        }, o = "https://www.0469ynxx.cn/api/find";
        t.openId ? (n.openId = t.openId, a.setData({
            openId: t.openId
        })) : t.index ? (e = this.data.implementList[t.index] + "-信息列表", wx.setNavigationBarTitle({
            title: e
        }), n.keyword = a.data.implementList[t.index], a.setData({
            index: t.index
        })) : (e = t.word + "-信息列表", wx.setNavigationBarTitle({
            title: e
        }), n.word = t.word, o = "https://www.0469ynxx.cn/api/search", a.setData({
            word: t.word
        })), wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: o,
            data: n,
            success: function(t) {
                a.setData({
                    dealList: t.data.value
                }), wx.hideLoading(), a.curPage++, a.totalPage = Math.ceil(t.data.totalRows / 5);
            }
        });
    },
    chooseList: function(t) {
        var a = getCurrentPages(), e = a[a.length - 1].options, n = t.currentTarget.dataset.openId, o = "/pages/list/index?openId=" + n;
        n !== e.openId && wx.navigateTo({
            url: o
        });
    },
    checkImg: function(t) {
        wx.previewImage({
            urls: t.currentTarget.dataset.urls,
            current: t.target.dataset.url
        });
    },
    takePhone: function(t) {
        var a = t.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    checkDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/detail/index?id=" + a
        });
    },
    checkAddress: function(t) {
        wx.openLocation({
            latitude: t.currentTarget.dataset.latitude,
            longitude: t.currentTarget.dataset.longitude
        });
    },
    onShareAppMessage: function(t) {
        var a = Object.keys(this.options)[0], e = this.options[a];
        return {
            title: "溢农信息",
            path: this.route + "?" + a + "=" + e,
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {}
        };
    },
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            noMore: !1
        }), t.curPage = 1;
        var a = {
            curPage: t.curPage
        }, e = "https://www.0469ynxx.cn/api/find";
        t.data.openId ? a.openId = t.data.openId : t.data.index ? a.keyword = t.data.implementList[t.data.index] : (a.word = t.data.word, 
        e = "https://www.0469ynxx.cn/api/search"), wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: e,
            data: a,
            success: function(a) {
                t.setData({
                    dealList: a.data.value
                }), wx.hideLoading(), t.curPage++, t.totalPage = Math.ceil(a.data.totalRows / 5), 
                wx.stopPullDownRefresh();
            }
        });
    },
    onReachBottom: function() {
        var t = this;
        if (t.curPage > t.totalPage) t.setData({
            noMore: !0
        }); else {
            var a = {
                curPage: t.curPage
            }, e = "https://www.0469ynxx.cn/api/find";
            t.data.openId ? a.openId = t.data.openId : t.data.index ? a.keyword = t.data.implementList[t.data.index] : (a.word = t.data.word, 
            e = "https://www.0469ynxx.cn/api/search"), wx.showLoading({
                title: "加载中",
                mask: !0
            }), wx.request({
                url: e,
                data: a,
                success: function(a) {
                    wx.hideLoading(), t.setData({
                        dealList: t.data.dealList.concat(a.data.value)
                    }), t.curPage++;
                }
            });
        }
    }
});