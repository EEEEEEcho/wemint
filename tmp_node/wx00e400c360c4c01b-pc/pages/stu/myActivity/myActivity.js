function a(a, e, c) {
    wx.request({
        url: t.localUrl + "mobileXcx/myActivityList",
        data: {
            cpc_id: i.globalData.cpc.id,
            currentPage: a,
            rowCountPerPage: e
        },
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            c(a.data);
        }
    });
}

var t = require("../../../utils/main.js"), i = getApp();

Page({
    data: {
        screenWidth: 0,
        screenHeight: 0,
        imgwidth: 0,
        imgheight: 0,
        activityList: [],
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
                    scrollHeight: a.windowHeight + 700
                });
            }
        }), this.fetchSearchList();
    },
    imageLoad: function(a) {
        var t = 230 / (a.detail.width / a.detail.height);
        this.setData({
            imgwidth: 230,
            imgheight: t
        });
    },
    scanning: function() {
        wx.navigateTo({
            url: "../scanningBook/scanningBook"
        });
    },
    view: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../activityView/activityView?id=" + t + "&isPay=1"
        });
    },
    fetchSearchList: function() {
        var t = this;
        a(t.data.searchPageNum, t.data.callbackcount, function(a) {
            if (console.log(a.dataInfo.dataList), null != a.dataInfo.dataList && 0 != a.dataInfo.dataList.length) {
                var i = [];
                i = t.data.isFromSearch ? a.dataInfo.dataList : t.data.activityList.concat(a.dataInfo.dataList), 
                t.setData({
                    activityList: i,
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
    backLoad: function() {
        this.setData({
            activityList: [],
            searchPageNum: 1,
            callbackcount: 15,
            totalPage: 0,
            searchLoading: !1,
            searchLoadingComplete: !1
        }), this.fetchSearchList();
    },
    activityView: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../activityView/activityView?id=" + t
        });
    }
});