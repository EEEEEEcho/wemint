function t(t, e, n) {
    wx.request({
        url: a.localUrl + "mobileXcx/notificationList",
        data: {
            crm_code: a.crm_code,
            account_id: i.globalData.cpc.id,
            type: 1,
            currentPage: t,
            rowCountPerPage: e
        },
        method: "GET",
        header: {
            "content-Type": "application/json"
        },
        success: function(t) {
            200 == t.statusCode && n(t.data);
        }
    });
}

var a = require("../../../utils/main.js"), e = require("../../../utils/util.js"), i = getApp();

Page({
    data: {
        scrollHeight: 0,
        todayClass: [],
        noticeList: [],
        searchPageNum: 1,
        callbackcount: 15,
        totalPage: 0,
        searchLoading: !1,
        searchLoadingComplete: !1,
        startX: 0,
        startY: 0
    },
    onShow: function() {
        this.setData({
            cpc: i.globalData.cpc
        });
    },
    onShareAppMessage: function() {},
    onLoad: function(t) {
        var e = this, n = "../../../image/kebiao@2x.png", c = "../../../image/tushujieyue@2x.png", o = "../../../image/huodong@2x.png", s = "../../../image/t_banjiquan@2x.png";
        wx.request({
            url: a.localUrl + "mobileXcx/initialization",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                i.globalData.menuList = t.data.dataInfo.menuList;
            }
        });
        for (var r = i.globalData.menuList, l = 0; l < r.length; l++) "stu_menu_01" == r[l][0] && (n = r[l][1]), 
        "stu_menu_02" == r[l][0] && (c = r[l][1]), "stu_menu_03" == r[l][0] && (o = r[l][1]), 
        "stu_menu_04" == r[l][0] && (s = r[l][1]);
        e.setData({
            stu_menu_01: n,
            stu_menu_02: c,
            stu_menu_03: o,
            stu_menu_04: s
        }), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    scrollHeight: t.windowHeight
                });
            }
        }), this.setData({
            cpc: i.globalData.cpc,
            noticeList: [],
            searchPageNum: 1,
            callbackcount: 15,
            totalPage: 0,
            searchLoading: !1,
            searchLoadingComplete: !1
        }), this.todayClass(), this.fetchSearchList();
    },
    my: function(t) {
        a.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../mine/mine"
        });
    },
    layout: function(t) {
        a.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../layout/layout"
        });
    },
    book: function(t) {
        a.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../book/book"
        });
    },
    activity: function(t) {
        a.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../activity/activity"
        });
    },
    parentCircleList: function(t) {
        a.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../parentCircleList/parentCircleList"
        });
    },
    todayClass: function() {
        var t = this, n = e.formatTime(new Date());
        wx.request({
            url: a.localUrl + "mobileXcx/todayClassStu",
            data: {
                ccm_id: i.globalData.csc.ccm_id,
                dayTime: n
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                t.setData({
                    todayClass: a.data.dataInfo.classList
                });
            }
        });
    },
    backLoad: function() {
        this.todayClass();
    },
    contentView: function(t) {
        var e = this, n = JSON.stringify(t.currentTarget.dataset.model), c = parseInt(t.target.dataset.index);
        e.data.noticeList[c].is_look = 1, this.setData({
            noticeList: e.data.noticeList
        }), wx.request({
            url: a.localUrl + "mobileXcx/csnrAdd",
            data: {
                csn_id: t.currentTarget.dataset.id,
                account_id: i.globalData.cpc.id
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                wx.navigateTo({
                    url: "../../contentView/contentView?model=" + n
                });
            }
        });
    },
    fetchSearchList: function() {
        var a = this;
        t(a.data.searchPageNum, a.data.callbackcount, function(t) {
            if (null != t.dataInfo.dataList && 0 != t.dataInfo.dataList.length) {
                var e = [];
                e = a.data.isFromSearch ? t.dataInfo.dataList : a.data.noticeList.concat(t.dataInfo.dataList), 
                a.setData({
                    noticeList: e,
                    searchLoading: !0
                }), t.dataInfo.totalPage <= a.data.searchPageNum && a.setData({
                    searchLoadingComplete: !0,
                    searchLoading: !1
                });
            } else a.setData({
                searchLoadingComplete: !0,
                searchLoading: !1
            });
        });
    },
    searchScrollLower: function() {
        var t = this;
        t.data.searchLoading && !t.data.searchLoadingComplete && (t.setData({
            searchPageNum: t.data.searchPageNum + 1,
            isFromSearch: !1
        }), t.fetchSearchList());
    },
    touchstart: function(t) {
        this.data.noticeList.forEach(function(t, a) {
            t.isTouchMove && (t.isTouchMove = !1);
        }), this.setData({
            startX: t.changedTouches[0].clientX,
            startY: t.changedTouches[0].clientY,
            noticeList: this.data.noticeList
        });
    },
    touchmove: function(t) {
        var a = this, e = t.currentTarget.dataset.index, i = a.data.startX, n = a.data.startY, c = t.changedTouches[0].clientX, o = t.changedTouches[0].clientY, s = a.angle({
            X: i,
            Y: n
        }, {
            X: c,
            Y: o
        });
        a.data.noticeList.forEach(function(t, a) {
            t.isTouchMove = !1, Math.abs(s) > 30 || a == e && (t.isTouchMove = !(c > i));
        }), a.setData({
            noticeList: a.data.noticeList
        });
    },
    angle: function(t, a) {
        var e = a.X - t.X, i = a.Y - t.Y;
        return 360 * Math.atan(i / e) / (2 * Math.PI);
    },
    del: function(t) {
        var e = this, n = (t.currentTarget.dataset.index, t.currentTarget.dataset.id);
        wx.request({
            url: a.localUrl + "mobileXcx/csnDel",
            data: {
                csn_id: n,
                account_id: i.globalData.cpc.id
            },
            method: "GET",
            header: {
                "content-Type": "application/json"
            },
            success: function(a) {
                200 == a.statusCode && (e.data.noticeList.splice(t.currentTarget.dataset.index, 1), 
                e.setData({
                    noticeList: e.data.noticeList
                }));
            }
        });
    }
});