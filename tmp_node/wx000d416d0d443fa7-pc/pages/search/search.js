require("../../utils/server"), require("../../config.js"), wx.getStorageSync("authorization");

Page({
    data: {
        hot: [],
        history: [],
        inputVal: "",
        isMask: !1
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "搜索"
        }), this.getInitData();
    },
    getInitData: function(t) {
        var a = wx.getStorageSync("hotSearch").hotSearch.split(";"), e = wx.getStorageSync("hisSearch");
        e = "" == e ? e : e.hisSearch, this.setData({
            hot: a,
            history: e
        });
    },
    inputValue: function(t) {
        this.setData({
            inputVal: t.detail.value
        });
    },
    search: function(t) {
        var a = this.data.inputVal, e = wx.getStorageSync("hisSearch");
        if ("" == a) getApp().showAndHideToast("输入为空，请重新输入"); else {
            if ("" == e || "" == e.hisSearch) {
                var s = [ a ];
                wx.setStorageSync("hisSearch", {
                    hisSearch: s
                });
            } else {
                var i = e.hisSearch;
                i.push(a), wx.setStorageSync("hisSearch", {
                    hisSearch: i
                });
            }
            wx.navigateTo({
                url: "../searchRes/searchRes?word=" + a
            });
        }
    },
    delHistory: function(t) {
        this.setData({
            isMask: !0
        });
    },
    closeMask: function(t) {
        this.setData({
            isMask: !1
        });
    },
    sure: function(t) {
        wx.setStorageSync("hisSearch", {
            hisSearch: ""
        }), this.setData({
            isMask: !1,
            history: []
        });
    },
    cancel: function(t) {
        this.setData({
            isMask: !1
        });
    },
    handleTap: function(t) {}
});