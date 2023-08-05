Page({
    data: {
        KeyWord: "",
        KeyWordList: null,
        GoToUrl: "../searchresult/searchresult"
    },
    onLoad: function(e) {
        var t = this, o = "../searchresult/searchresult", r = wx.getStorageSync("keyWordList");
        r ? (r.reverse(), t.setData({
            KeyWordList: r,
            GoToUrl: o
        })) : t.setData({
            GoToUrl: o
        });
    },
    gotoHome: function(e) {
        wx.navigateBack({
            delta: 1
        });
    },
    onInputKeyword: function(e) {
        var t = e.detail.value;
        this.setData({
            KeyWord: t
        });
    },
    onConfirmSearch: function(e) {
        var t = e.detail.value;
        this.gotoSearch(t), this.setData({
            KeyWord: t
        });
    },
    onHistoryKeyWordClick: function(e) {
        var t = e.currentTarget.dataset.keyword;
        this.gotoSearch(t);
    },
    removeKeyWord: function(e) {
        var t = e.currentTarget.dataset.keyword, o = wx.getStorageSync("keyWordList");
        o && (o.reverse(), this.removeByValue(o, t), wx.setStorageSync("keyWordList", o), 
        this.setData({
            KeyWordList: o
        }));
    },
    ClearKeyWord: function(e) {
        wx.showModal({
            title: "提示",
            content: "确认要清空所有历史记录吗！",
            success: function(e) {
                e.confirm && (wx.removeStorageSync("keyWordList"), wx.redirectTo({
                    url: "../search/search"
                }));
            }
        });
    },
    removeByValue: function(e, t) {
        for (var o = 0; o < e.length; o++) if (e[o] == t) {
            e.splice(o, 1);
            break;
        }
    },
    btngotoSearch: function() {
        this.gotoSearch(this.data.KeyWord);
    },
    gotoSearch: function(e) {
        var t = this;
        if (e.length > 0) {
            wx.setStorage({
                key: "keyword",
                data: e
            });
            var o = [], r = wx.getStorageSync("keyWordList");
            r && (o = r), -1 == o.join(",").indexOf(e) && o.push(e);
            var a = t.data.GoToUrl + "?keyword=" + e;
            t.data.GoToUrl.indexOf("searchresult") > -1 ? (wx.setStorageSync("keyWordList", o), 
            wx.redirectTo({
                url: a
            })) : wx.switchTab({
                url: a,
                success: function(e) {
                    wx.hideKeyboard();
                }
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});