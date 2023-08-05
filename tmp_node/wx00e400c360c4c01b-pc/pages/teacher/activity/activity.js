function a(a, i, c) {
    wx.request({
        url: t.localUrl + "mobileXcx/teaActivityList",
        data: {
            crm_code: t.crm_code,
            account_code: e.globalData.teacher.id,
            currentPage: a,
            rowCountPerPage: i
        },
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            c(a.data);
        }
    });
}

var t = require("../../../utils/main.js"), e = getApp();

Page({
    data: {
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
    fetchSearchList: function() {
        var t = this;
        a(t.data.searchPageNum, t.data.callbackcount, function(a) {
            if (null != a.dataInfo.dataList && 0 != a.dataInfo.dataList.length) {
                var e = [];
                e = t.data.isFromSearch ? a.dataInfo.dataList : t.data.activityList.concat(a.dataInfo.dataList), 
                t.setData({
                    activityList: e,
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
    },
    activityWrite: function(a) {
        t.collectFomrId(a.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../activityWrite/activityWrite"
        });
    }
});