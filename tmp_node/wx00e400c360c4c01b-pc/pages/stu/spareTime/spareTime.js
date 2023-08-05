function a(a, e, n) {
    wx.request({
        url: t.localUrl + "mobileXcx/findCpctrListByCpcId",
        data: {
            cpc_id: c.globalData.cpc.id,
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

var t = require("../../../utils/main.js"), c = getApp();

Page({
    data: {
        scrollHeight: 0,
        csaList: [],
        content: "",
        searchPageNum: 1,
        callbackcount: 15,
        totalPage: 0,
        searchLoading: !1,
        searchLoadingComplete: !1
    },
    onLoad: function(a) {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    scrollHeight: a.windowHeight + 300
                });
            }
        }), this.getCscByCpcId(), this.fetchSearchList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    fetchSearchList: function() {
        var t = this;
        a(t.data.searchPageNum, t.data.callbackcount, function(a) {
            if (console.log(a.dataInfo.dataList), null != a.dataInfo.dataList && 0 != a.dataInfo.dataList.length) {
                var c = [];
                c = t.data.isFromSearch ? a.dataInfo.dataList : t.data.csaList.concat(a.dataInfo.dataList), 
                t.setData({
                    csaList: c,
                    searchLoading: !0
                }), a.dataInfo.totalPage <= t.data.searchPageNum && t.setData({
                    searchLoadingComplete: !0,
                    searchLoading: !1
                });
            } else t.setData({
                searchLoadingComplete: !0,
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
    getCscByCpcId: function() {
        var a = this;
        wx.request({
            url: t.localUrl + "mobileXcx/getCscByCpcId",
            data: {
                cpc_id: c.globalData.cpc.id
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var e = 0;
                null != t.data.dataInfo.csc && (e = t.data.dataInfo.sumClass, c.globalData.csc = t.data.dataInfo.csc), 
                a.setData({
                    class_num: e
                });
            }
        });
    }
});