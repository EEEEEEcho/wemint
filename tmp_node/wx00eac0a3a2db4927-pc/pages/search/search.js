function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../store")), e = t(require("../../utils/create")), s = require("../../utils/storage.js"), r = require("../../api/apiInstance.js"), i = getApp();

(0, e.default)(a.default, {
    properties: {},
    data: {
        cartPage: "",
        navH: i.globalData.navH,
        status: i.globalData.status,
        searchList: [],
        searchHistory: []
    },
    onLoad: function() {},
    onShow: function() {
        var t = this;
        if ("" != (0, s.getSearchHistory)()) {
            var a = JSON.parse((0, s.getSearchHistory)());
            this.setData({
                searchHistory: a
            });
        } else this.setData({
            searchHistory: this.data.searchHistory
        });
        var e = {
            accesstoken: ""
        };
        (0, r.searchKeywordQuery)(e, function(a) {
            t.setData({
                searchList: a.data
            });
        });
    },
    onSearchHistory: function(t) {
        var a = t.detail, e = this.data.searchHistory, r = e.indexOf(a);
        -1 != r && e.splice(r, 1), e.unshift(a), e.length >= 10 && e.splice(10), this.setData({
            searchHistory: e
        });
        var i = JSON.stringify(e);
        (0, s.setSearchHistory)(i);
    },
    onTabSearch: function(t) {
        var a = t.currentTarget.dataset.item;
        wx.navigateTo({
            url: "/pages/search/searchResult/searchResult?searchText=" + a
        });
    },
    clearHistory: function() {
        (0, s.setSearchHistory)(""), this.setData({
            searchHistory: []
        });
    }
});