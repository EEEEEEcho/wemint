var t = getApp();

Page({
    data: {
        focus: !0,
        hotKeyShow: !0,
        historyKeyShow: !0,
        searchValue: "",
        page: 0,
        productData: [],
        historyKeyList: [],
        hotKeyList: []
    },
    onLoad: function(a) {
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Search/index",
            method: "post",
            data: {
                uid: t.d.userId
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data.remen, s = t.data.history;
                e.setData({
                    historyKeyList: s,
                    hotKeyList: a
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    onReachBottom: function() {
        this.setData({
            page: this.data.page + 10
        }), this.searchProductData();
    },
    doKeySearch: function(t) {
        var a = t.currentTarget.dataset.key;
        this.setData({
            searchValue: a,
            hotKeyShow: !1,
            historyKeyShow: !1
        }), this.data.productData.length = 0, this.searchProductData();
    },
    doSearch: function() {
        var t = this.data.searchValue;
        t ? (this.setData({
            hotKeyShow: !1,
            historyKeyShow: !1
        }), this.data.productData.length = 0, this.searchProductData(), this.getOrSetSearchHistory(t)) : this.setData({
            focus: !0,
            hotKeyShow: !0,
            historyKeyShow: !0
        });
    },
    getOrSetSearchHistory: function(t) {
        var a = this;
        wx.getStorage({
            key: "historyKeyList",
            success: function(e) {
                console.log(e.data), e.data.indexOf(t) >= 0 || (e.data.push(t), wx.setStorage({
                    key: "historyKeyList",
                    data: e.data
                }), a.setData({
                    historyKeyList: e.data
                }));
            }
        });
    },
    searchValueInput: function(t) {
        var a = t.detail.value;
        this.setData({
            searchValue: a
        }), a || 0 != this.data.productData.length || this.setData({
            hotKeyShow: !0,
            historyKeyShow: !0
        });
    },
    searchProductData: function() {
        var a = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Search/searches",
            method: "post",
            data: {
                keyword: a.data.searchValue,
                uid: t.d.userId,
                page: a.data.page
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var e = t.data.pro;
                a.setData({
                    productData: a.data.productData.concat(e)
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    }
});