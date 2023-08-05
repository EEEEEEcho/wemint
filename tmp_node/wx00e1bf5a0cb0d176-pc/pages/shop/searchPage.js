function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = getApp(), a = (require("../../components/utils/imgutil.js"), require("../../components/utils/util.js"));

Page({
    data: {
        searchkey: "",
        searchRecord: [],
        firstKey: "",
        keywordText: "",
        keywordTextFlag: !1
    },
    onLoad: function(e) {
        var t = this, a = /^\d*$/;
        t.data.searchkey = new Date().getTime() + "", t.navigateBackFunc(), wx.getStorageInfo({
            success: function(e) {
                for (var r = e.keys.length - 1; r >= 0; r--) {
                    var o = wx.getStorageSync(e.keys[r]);
                    1 == r && (t.data.firstKey = e.keys[r]), a.test(e.keys[r]) && t.data.searchRecord.push(o);
                }
                t.data.searchRecord.length > 20 && (wx.removeStorage({
                    key: t.data.firstKey,
                    success: function(e) {}
                }), t.data.searchRecord.pop()), t.setData({
                    searchRecord: t.data.searchRecord
                });
            }
        }), this.setData({
            keywordText: e.keyword || "",
            keywordTextFlag: Boolean(e.keyword)
        });
    },
    back: function() {
        var e = getCurrentPages(), t = "未知";
        e && e[e.length - 2] && (t = e[e.length - 2].route), "pages/shop/productlist" !== t && "pages/shop/productlist_tabbar" !== t || e[e.length - 2].setData({
            backInProDefault: !0
        }), wx.navigateBack({
            detail: 1
        });
    },
    getKeywordText: function(e) {
        e.detail.value && this.data.keywordTextFlag || this.setData({
            keywordTextFlag: Boolean(e.detail.value)
        });
    },
    onSearchSubmit: function(e) {
        var r, o = a.trim(e.detail.value.keyword);
        if (o) {
            if (o) {
                try {
                    r = this.data.searchkey, wx.setStorageSync(r, o);
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    console.log(e);
                }
                this.getShuTingData(o);
            }
        } else t.showModal({
            title: "提示",
            content: "请输入产品关键词"
        });
    },
    clearStorage: function() {
        var e = this;
        wx.clearStorageSync(), e.setData({
            searchRecord: []
        }), wx.showToast({
            title: "清除历史记录",
            icon: "succes",
            duration: 1e3,
            mask: !0
        });
    },
    getShuTingData: function(t) {
        var a = getCurrentPages(), r = "未知", o = "未知";
        a && a[a.length - 2] && (r = a[a.length - 2].route), a && a[a.length - 3] && (o = a[a.length - 3].route), 
        [ "pages/shop/categoryPage", "pages/shop/categoryPage_tabbar" ].includes(r) || [ "pages/shop/categoryPage", "pages/shop/categoryPage_tabbar" ].includes(o) ? [ "pages/shop/productlist", "pages/shop/productlist_tabbar" ].includes(r) ? (a[a.length - 2].setData(e({}, "queryparams.keyword", t)), 
        wx.navigateBack({
            detail: 1
        })) : wx.redirectTo({
            url: "productlist?keyword=" + t
        }) : (wx.redirectTo({
            url: "productlist?keyword=" + t + "&ToBySearch=1"
        }), this.navigateBackFunc(!0));
    },
    navigateBackFunc: function(e) {
        var t = getCurrentPages(), a = t[t.length - 2];
        a && [ "pages/shop/productlist_tabbar", "pages/shop/productlist" ].includes(a.route) && (e ? a.setData({
            backInProDefault: !1
        }) : a.setData({
            backInProDefault: !0
        }));
    },
    emptyInpData: function() {
        this.setData({
            keywordText: "",
            keywordTextFlag: !1
        });
    },
    onKeywordChange: function(e) {
        var r, o = a.trim(e.detail.value);
        if (o) {
            if (o) {
                try {
                    r = this.data.searchkey, wx.setStorageSync(r, o);
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    console.log(e);
                }
                this.getShuTingData(o);
            }
        } else t.showModal({
            title: "提示",
            content: "请输入产品关键词"
        });
    },
    searchAgain: function(e) {
        this.getShuTingData(e.currentTarget.dataset.value);
    }
});