// pages/search/search.js
Page({
    data: {
        KeyWord: "",
        KeyWordList: null,
        GoToUrl: "../searchresult/searchresult"
    },
    onLoad: function onLoad(options) {
        var that = this;
        // 页面初始化 options为页面跳转所带来的参数
                var gotoUrl = "../searchresult/searchresult";
        // if (options.SourceUrl != null && options.SourceUrl != undefined){
        //   if (options.SourceUrl == "productlist"){
        //     gotoUrl = "../productlist/productlist";
        //    }
        // }
                var value = wx.getStorageSync("keyWordList");
        if (value) {
            value.reverse();
            that.setData({
                KeyWordList: value,
                GoToUrl: gotoUrl
            });
        } else {
            that.setData({
                GoToUrl: gotoUrl
            });
        }
    },
    gotoHome: function gotoHome(e) {
        wx.navigateBack({
            delta: 1
        });
    },
    onInputKeyword: function onInputKeyword(e) {
        var keyword = e.detail.value;
        this.setData({
            KeyWord: keyword
        });
    },
    onConfirmSearch: function onConfirmSearch(e) {
        var keyword = e.detail.value;
        this.gotoSearch(keyword);
        this.setData({
            KeyWord: keyword
        });
    },
    onHistoryKeyWordClick: function onHistoryKeyWordClick(e) {
        var keyword = e.currentTarget.dataset.keyword;
        this.gotoSearch(keyword);
    },
    removeKeyWord: function removeKeyWord(e) {
        var keyword = e.currentTarget.dataset.keyword;
        var value = wx.getStorageSync("keyWordList");
        if (value) {
            value.reverse();
            this.removeByValue(value, keyword);
            wx.setStorageSync("keyWordList", value);
            this.setData({
                KeyWordList: value
            });
        }
    },
    ClearKeyWord: function ClearKeyWord(e) {
        wx.showModal({
            title: "提示",
            content: "确认要清空所有历史记录吗！",
            success: function success(res) {
                if (res.confirm) {
                    wx.removeStorageSync("keyWordList");
                    wx.redirectTo({
                        url: "../search/search"
                    });
                }
            }
        });
    },
    removeByValue: function removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    },
    btngotoSearch: function btngotoSearch() {
        this.gotoSearch(this.data.KeyWord);
    },
    gotoSearch: function gotoSearch(keyword) {
        var that = this;
        // try {
                if (keyword.length > 0) {
            wx.setStorage({
                key: "keyword",
                data: keyword
            });
            var arry = [];
            var value = wx.getStorageSync("keyWordList");
            if (value) {
                arry = value;
            }
            if (arry.join(",").indexOf(keyword) == -1) {
                arry.push(keyword);
            }
            var toUrl = that.data.GoToUrl + "?keyword=" + keyword;
            if (that.data.GoToUrl.indexOf("searchresult") > -1) {
                wx.setStorageSync("keyWordList", arry);
                wx.redirectTo({
                    url: toUrl
                });
            } else {
                wx.switchTab({
                    url: toUrl,
                    success: function success(res) {
                        wx.hideKeyboard();
                    }
                });
            }
        }
        // }
        //catch (e) {
        //   console.log(e);
        // }
        },
    onReady: function onReady() {
        // 页面渲染完成
    },
    onShow: function onShow() {
        // 页面显示
    },
    onHide: function onHide() {
        // 页面隐藏
    },
    onUnload: function onUnload() {
        // 页面关闭
    }
});