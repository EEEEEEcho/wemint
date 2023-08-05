var a = getApp();

Page({
    data: {
        dealList: [],
        noMore: !1
    },
    curPage: 1,
    totalPage: 1,
    onLoad: function(t) {
        var e = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: "https://www.0469ynxx.cn/api/find",
            data: {
                openId: a.globalData.openId,
                curPage: e.curPage
            },
            success: function(a) {
                e.setData({
                    dealList: a.data.value
                }), wx.hideLoading(), e.curPage++, e.totalPage = Math.ceil(a.data.totalRows / 5);
            }
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            noMore: !1
        }), t.curPage = 1, wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: "https://www.0469ynxx.cn/api/find",
            data: {
                openId: a.globalData.openId,
                curPage: t.curPage
            },
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
        t.curPage > t.totalPage ? t.setData({
            noMore: !0
        }) : (wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: "https://www.0469ynxx.cn/api/find",
            data: {
                openId: a.globalData.openId,
                curPage: t.curPage
            },
            success: function(a) {
                t.setData({
                    dealList: t.data.dealList.concat(a.data.value)
                }), t.curPage++, wx.hideLoading();
            }
        }));
    },
    checkDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/detail/index?id=" + t + "&mine=true"
        });
    },
    deleteItem: function(t) {
        var e = void 0, s = t.currentTarget.dataset.id, i = t.currentTarget.dataset.index;
        if (this.data.dealList[i].images.length) {
            var d = this.data.dealList[i];
            e = d.images[0].match(/^https:\/\/[^\/]*\/[^\/]*\/([^\/]*)/)[1];
        }
        var n = this;
        wx.showModal({
            title: "提示",
            content: "是否删除？",
            success: function(t) {
                t.confirm && (wx.showLoading({
                    title: "加载中",
                    mask: !0
                }), wx.request({
                    url: "https://www.0469ynxx.cn/api/delete",
                    method: "POST",
                    data: {
                        id: s,
                        listLength: n.data.dealList.length - 1,
                        openId: a.globalData.openId,
                        dirName: e
                    },
                    success: function(a) {
                        n.data.dealList.splice(i, 1), n.setData({
                            dealList: n.data.dealList
                        });
                    },
                    complete: function(a) {
                        wx.hideLoading(), a.data.value ? (n.data.dealList.push(a.data.value), n.setData({
                            dealList: n.data.dealList
                        })) : n.setData({
                            noMore: !0
                        });
                    }
                }));
            }
        });
    }
});