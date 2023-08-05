function a(a, i, o) {
    wx.request({
        url: t.localUrl + "mobileXcx/mailboxList",
        data: {
            crm_code: t.crm_code,
            cpc_id: e.globalData.cpc.id,
            currentPage: a,
            rowCountPerPage: i
        },
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            o(a.data);
        }
    });
}

var t = require("../../../utils/main.js"), e = getApp();

Page({
    data: {
        mailList: [],
        searchPageNum: 1,
        callbackcount: 15,
        totalPage: 0,
        searchLoading: !1,
        searchLoadingComplete: !1,
        startX: 0,
        startY: 0
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
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    write: function(a) {
        t.collectFomrId(a.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../mailboxWrite/mailboxWrite"
        });
    },
    view: function(a) {
        var t = JSON.stringify(a.currentTarget.dataset.model);
        wx.navigateTo({
            url: "../mailboxView/mailboxView?model=" + t
        });
    },
    fetchSearchList: function() {
        var t = this;
        a(t.data.searchPageNum, t.data.callbackcount, function(a) {
            if (console.log(a.dataInfo.dataList), null != a.dataInfo.dataList && 0 != a.dataInfo.dataList.length) {
                var e = [];
                e = t.data.isFromSearch ? a.dataInfo.dataList : t.data.mailList.concat(a.dataInfo.dataList), 
                t.setData({
                    mailList: e,
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
            mailList: [],
            searchPageNum: 1,
            callbackcount: 15,
            totalPage: 0,
            searchLoading: !1,
            searchLoadingComplete: !1
        }), this.fetchSearchList();
    },
    touchstart: function(a) {
        this.data.mailList.forEach(function(a, t) {
            a.isTouchMove && (a.isTouchMove = !1);
        }), this.setData({
            startX: a.changedTouches[0].clientX,
            startY: a.changedTouches[0].clientY,
            mailList: this.data.mailList
        });
    },
    touchmove: function(a) {
        var t = this, e = a.currentTarget.dataset.index, i = t.data.startX, o = t.data.startY, c = a.changedTouches[0].clientX, n = a.changedTouches[0].clientY, s = t.angle({
            X: i,
            Y: o
        }, {
            X: c,
            Y: n
        });
        t.data.mailList.forEach(function(a, t) {
            a.isTouchMove = !1, Math.abs(s) > 30 || t == e && (a.isTouchMove = !(c > i));
        }), t.setData({
            mailList: t.data.mailList
        });
    },
    angle: function(a, t) {
        var e = t.X - a.X, i = t.Y - a.Y;
        return 360 * Math.atan(i / e) / (2 * Math.PI);
    },
    del: function(a) {
        var e = this, i = (a.currentTarget.dataset.index, a.currentTarget.dataset.id);
        wx.request({
            url: t.localUrl + "mobileXcx/mailboxListDel",
            data: {
                id: i
            },
            method: "GET",
            header: {
                "content-Type": "application/json"
            },
            success: function(t) {
                200 == t.statusCode && (e.data.mailList.splice(a.currentTarget.dataset.index, 1), 
                e.setData({
                    mailList: e.data.mailList
                }));
            }
        });
    }
});