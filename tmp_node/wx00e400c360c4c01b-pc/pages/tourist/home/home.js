function a(a, e, i, c) {
    wx.request({
        url: t.localUrl + "mobileXcx/stuActivityList",
        data: {
            crm_code: t.crm_code,
            tourist: "tourist",
            is_pay: i,
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

var t = require("../../../utils/main.js"), e = (require("../../../utils/util.js"), 
getApp());

Page({
    data: {
        screenWidth: 0,
        screenHeight: 0,
        imgwidth: 0,
        imgheight: 0,
        scrollHeight: 0,
        activityList: [],
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
                    scrollHeight: a.windowHeight + 500
                });
            }
        });
        var i = a.is_pay;
        this.setData({
            userInfo: e.globalData.userInfo,
            is_pay: i
        }), this.fetchSearchList();
    },
    imageLoad: function(a) {
        var t = 230 / (a.detail.width / a.detail.height);
        this.setData({
            imgwidth: 230,
            imgheight: t
        });
    },
    myMine: function(a) {
        t.collectFomrId(a.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../mine/mine"
        });
    },
    view: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../activityView/activityView?id=" + t + "&isPay=0"
        });
    },
    shiting: function(a) {
        t.collectFomrId(a.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../shiting/shiting"
        });
    },
    fetchSearchList: function() {
        var t = this, e = t.data.is_pay;
        a(t.data.searchPageNum, t.data.callbackcount, e, function(a) {
            if (console.log(a.dataInfo.dataList), null != a.dataInfo.dataList && 0 != a.dataInfo.dataList.length) {
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
    }
});