function a(a, e, n) {
    wx.request({
        url: t.localUrl + "mobileXcx/circleAlbumList",
        data: {
            currentPage: a,
            rowCountPerPage: e
        },
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            n(a.data);
        }
    });
}

var t = require("../../../utils/main.js");

getApp();

Page({
    data: {
        items: [],
        searchPageNum: 1,
        callbackcount: 15,
        totalPage: 0,
        searchLoading: !1,
        searchLoadingComplete: !1
    },
    onLoad: function(a) {
        this.fetchSearchList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.searchScrollLower();
    },
    onShareAppMessage: function() {},
    fetchSearchList: function() {
        var t = this;
        a(t.data.searchPageNum, t.data.callbackcount, function(a) {
            if (console.log(a.dataInfo.dataList), null != a.dataInfo.dataList && 0 != a.dataInfo.dataList.length) {
                var e = [];
                e = t.data.isFromSearch ? a.dataInfo.dataList : t.data.items.concat(a.dataInfo.dataList), 
                t.setData({
                    items: e,
                    searchLoading: !0
                }), a.dataInfo.totalPage <= t.data.searchPageNum && t.setData({
                    searchLoadingComplete: !0,
                    searchLoading: !1
                });
            } else t.setData({
                searchLoadingComplete: !1,
                searchLoading: !1
            });
        });
    },
    searchScrollLower: function() {
        var a = this;
        a.data.searchLoading && !a.data.searchLoadingComplete && (a.setData({
            searchPageNum: a.data.searchPageNum + 1,
            isFromSearch: !1
        }), a.fetchSearchList());
    },
    previewImage: function(a) {
        var t = a.currentTarget.dataset.index, e = a.currentTarget.dataset.src;
        wx.previewImage({
            current: e[t],
            urls: e
        });
    },
    showModal: function(a) {
        var t = a.currentTarget.dataset.src;
        wx.navigateTo({
            url: "../../teacher/parentCircleListVio/parentCircleListVio?videoUrl=" + t
        });
    }
});