function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

function a(t, a, e) {
    wx.request({
        url: i.localUrl + "mobileXcx/notificationList",
        data: {
            crm_code: i.crm_code,
            account_id: c.globalData.teacher.id,
            type: 0,
            currentPage: t,
            rowCountPerPage: a
        },
        method: "GET",
        header: {
            "content-Type": "application/json"
        },
        success: function(t) {
            200 == t.statusCode && (console.log(t.data), e(t.data));
        }
    });
}

var e, i = require("../../../utils/main.js"), n = require("../../../utils/util.js"), c = getApp();

Page((e = {
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
    onLoad: function(t) {
        var a = this;
        wx.request({
            url: i.localUrl + "mobileXcx/initialization",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                c.globalData.menuList = t.data.dataInfo.menuList, c.globalData.posterList = t.data.dataInfo.posterList, 
                c.globalData.qrcode = t.data.dataInfo.qrcode, c.globalData.mobile = t.data.dataInfo.phone, 
                c.globalData.acList = t.data.dataInfo.acList;
            }
        });
        for (var e = "../../../image/kebiao@2x.png", n = "../../../image/t_banjiquan@2x.png", o = "../../../image/t_huodong@2x.png", s = "../../../image/login_student@2x.png", r = c.globalData.menuList, l = 0; l < r.length; l++) "tea_menu_01" == r[l][0] && (e = r[l][1]), 
        "tea_menu_02" == r[l][0] && (n = r[l][1]), "tea_menu_03" == r[l][0] && (o = r[l][1]), 
        "tea_menu_04" == r[l][0] && (s = r[l][1]);
        a.setData({
            tea_menu_01: e,
            tea_menu_02: n,
            tea_menu_03: o,
            tea_menu_04: s
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    scrollHeight: t.windowHeight
                });
            }
        }), this.setData({
            teacher: c.globalData.teacher
        }), this.todayClass(), this.fetchSearchList();
    },
    layout: function(t) {
        i.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../layout/layout"
        });
    },
    activity: function(t) {
        i.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../activity/activity"
        });
    },
    cpcList: function(t) {
        i.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../cpcList/cpcList"
        });
    },
    layoutDetail: function(t) {
        var a = t.currentTarget.dataset.ccm_id, e = t.currentTarget.dataset.class_time;
        wx.navigateTo({
            url: "../layoutDetail/detail?ccm_id=" + a + "&class_time=" + e
        });
    },
    layoutDetailView: function(t) {
        var a = t.currentTarget.dataset.ccm_id, e = t.currentTarget.dataset.class_time;
        wx.navigateTo({
            url: "../layoutDetailView/detailView?ccm_id=" + a + "&class_time=" + e
        });
    },
    parentCircleList: function(t) {
        i.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../parentCircleList/parentCircleList"
        });
    }
}, t(e, "activity", function() {
    wx.navigateTo({
        url: "../activity/activity"
    });
}), t(e, "contentView", function(t) {
    var a = this, e = JSON.stringify(t.currentTarget.dataset.model), n = parseInt(t.target.dataset.index);
    a.data.noticeList[n].is_look = 1, this.setData({
        noticeList: a.data.noticeList
    }), wx.request({
        url: i.localUrl + "mobileXcx/csnrAdd",
        data: {
            csn_id: t.currentTarget.dataset.id,
            account_id: c.globalData.teacher.id
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            wx.navigateTo({
                url: "../../contentView/contentView?model=" + e
            });
        }
    });
}), t(e, "myIndex", function(t) {
    i.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
    wx.navigateTo({
        url: "../myIndex/myIndex"
    });
}), t(e, "todayClass", function() {
    var t = this, a = n.formatTime(new Date());
    wx.request({
        url: i.localUrl + "mobileXcx/todayClass",
        data: {
            tId: c.globalData.teacher.id,
            dayTime: a
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
}), t(e, "backLoad", function() {
    this.todayClass();
}), t(e, "fetchSearchList", function() {
    var t = this;
    a(t.data.searchPageNum, t.data.callbackcount, function(a) {
        if (null != a.dataInfo.dataList && 0 != a.dataInfo.dataList.length) {
            var e = [];
            e = t.data.isFromSearch ? a.dataInfo.dataList : t.data.noticeList.concat(a.dataInfo.dataList), 
            t.setData({
                noticeList: e,
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
}), t(e, "searchScrollLower", function() {
    var t = this;
    t.data.searchLoading && !t.data.searchLoadingComplete && (t.setData({
        searchPageNum: t.data.searchPageNum + 1,
        isFromSearch: !1
    }), t.fetchSearchList());
}), t(e, "touchstart", function(t) {
    this.data.noticeList.forEach(function(t, a) {
        t.isTouchMove && (t.isTouchMove = !1);
    }), this.setData({
        startX: t.changedTouches[0].clientX,
        startY: t.changedTouches[0].clientY,
        noticeList: this.data.noticeList
    });
}), t(e, "touchmove", function(t) {
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
}), t(e, "angle", function(t, a) {
    var e = a.X - t.X, i = a.Y - t.Y;
    return 360 * Math.atan(i / e) / (2 * Math.PI);
}), t(e, "del", function(t) {
    var a = this, e = (t.currentTarget.dataset.index, t.currentTarget.dataset.id);
    wx.request({
        url: i.localUrl + "mobileXcx/csnDel",
        data: {
            csn_id: e,
            account_id: c.globalData.teacher.id
        },
        method: "GET",
        header: {
            "content-Type": "application/json"
        },
        success: function(e) {
            200 == e.statusCode && (a.data.noticeList.splice(t.currentTarget.dataset.index, 1), 
            a.setData({
                noticeList: a.data.noticeList
            }));
        }
    });
}), e));