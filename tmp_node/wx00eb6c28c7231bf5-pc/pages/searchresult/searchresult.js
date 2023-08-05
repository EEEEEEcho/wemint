var a = getApp();

Page({
    data: {
        ProductList: null,
        SortBy: "",
        SortOrder: "asc",
        KeyWord: "",
        PageIndex: 1,
        PageSize: 10,
        Num: 0,
        SortClass: ""
    },
    onLoad: function(a) {
        var t = wx.getStorageSync("keyword");
        void 0 == t && (t = "");
        var e = this;
        e.setData({
            KeyWord: t
        }), e.loadData(e, !1);
    },
    onReady: function() {},
    onShow: function() {
        var a = wx.getStorageSync("keyword");
        if (this.data.KeyWord != a) {
            void 0 == a && (a = "");
            var t = this;
            t.setData({
                KeyWord: a
            }), t.loadData(t, !1);
        }
    },
    onHide: function() {},
    onUnload: function() {},
    onSearch: function(a) {
        var t = this;
        t.setData({
            PageIndex: 1
        }), t.loadData(t, !1);
    },
    onReachBottom: function() {
        var a = this, t = a.data.PageIndex + 1;
        a.setData({
            PageIndex: t
        }), a.loadData(a, !0);
    },
    bindKeyWordInput: function(a) {
        this.setData({
            KeyWord: a.detail.value
        });
    },
    onConfirmSearch: function(a) {
        var t = this, e = a.detail.value;
        t.setData({
            KeyWord: e,
            PageIndex: 1
        }), t.loadData(t, !1);
    },
    bindBlurInput: function(a) {
        wx.hideKeyboard();
    },
    gotoKeyWordPage: function(a) {
        wx.navigateTo({
            url: "../search/search"
        });
    },
    onSortClick: function(a) {
        var t = this, e = a.target.dataset.sortby, o = a.currentTarget.dataset.num, r = "asc", d = "shengxu";
        t.data.SortOrder == r && (r = "desc", d = "jiangxu"), t.setData({
            PageIndex: 1,
            SortBy: e,
            SortOrder: r,
            Num: o,
            SortClass: d
        }), t.loadData(t, !1);
    },
    goToProductDetail: function(a) {
        var t = a.currentTarget.dataset.productid;
        wx.navigateTo({
            url: "../productdetail/productdetail?id=" + t
        });
    },
    loadData: function(t, e) {
        wx.showNavigationBarLoading(), a.getOpenId(function(o) {
            wx.request({
                url: a.getUrl("GetProducts"),
                data: {
                    openId: o,
                    keyword: t.data.KeyWord,
                    pageIndex: t.data.PageIndex,
                    pageSize: t.data.PageSize,
                    sortBy: t.data.SortBy,
                    sortOrder: t.data.SortOrder
                },
                success: function(a) {
                    if ("OK" == a.data.Status) {
                        var o = a.data.Data;
                        if (e) {
                            var r = t.data.ProductList;
                            r.push.apply(r, o), t.setData({
                                ProductList: r
                            });
                        } else t.setData({
                            ProductList: o
                        });
                    } else "NOUser" == a.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: a.data.Message,
                        showCancel: !1,
                        success: function(a) {
                            a.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {
                    wx.hideNavigationBarLoading();
                }
            });
        });
    }
});