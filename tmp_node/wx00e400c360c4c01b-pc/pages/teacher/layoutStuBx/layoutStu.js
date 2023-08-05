function a(a, e, s, c, i) {
    wx.request({
        url: t.localUrl + "mobileXcx/cpclList",
        data: {
            crm_code: t.crm_code,
            keyword: a,
            noIds: e,
            currentPage: s,
            rowCountPerPage: c
        },
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            i(a.data);
        }
    });
}

var t = require("../../../utils/main.js"), e = getApp();

Page({
    data: {
        scrollHeight: 0,
        isAllSelect: !1,
        carts: [],
        noIds: "",
        keyword: "",
        searchPageNum: 1,
        callbackcount: 15,
        totalPage: 0,
        searchLoading: !1,
        searchLoadingComplete: !1,
        theme_name: "",
        curriculum_form: "",
        content: "",
        imgs: [],
        roomname: "",
        latitude: "",
        longitude: ""
    },
    onLoad: function(a) {
        var t = this, e = a.noIds, s = a.ccm_id, c = a.class_time, i = (a.theme_name, a.curriculum_form);
        this.setData({
            noIds: e,
            ccm_id: s,
            class_time: c,
            curriculum_form: i
        }), wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    scrollHeight: a.windowHeight + 400
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
    wxSearchInput: function(a) {
        var t = this;
        this.setData({
            keyword: a.detail.value,
            isFromSearch: !1,
            carts: [],
            searchPageNum: 1,
            callbackcount: 15,
            totalPage: 0,
            searchLoading: !1,
            searchLoadingComplete: !1
        }), setTimeout(function() {
            t.fetchSearchList();
        }, 1e3);
    },
    switchSelect: function(a) {
        var t = 0, e = (a.target.dataset.id, parseInt(a.target.dataset.index));
        this.data.carts[e].isSelect = !this.data.carts[e].isSelect;
        var s = !0;
        for (t = 0; t < this.data.carts.length; t++) this.data.carts[t].isSelect || (s = !1);
        this.setData({
            carts: this.data.carts,
            isAllSelect: s
        });
    },
    allSelect: function(a) {
        var t = 0;
        if (this.data.isAllSelect) for (t = 0; t < this.data.carts.length; t++) this.data.carts[t].isSelect = !1; else for (t = 0; t < this.data.carts.length; t++) this.data.carts[t].isSelect = !0;
        this.setData({
            carts: this.data.carts,
            isAllSelect: !this.data.isAllSelect
        });
    },
    fetchSearchList: function() {
        var t = this;
        a(t.data.keyword, t.data.noIds, t.data.searchPageNum, t.data.callbackcount, function(a) {
            if (null != a.dataInfo.dataList && 0 != a.dataInfo.dataList.length) {
                for (var e = 0; e < a.dataInfo.dataList.length; e++) a.dataInfo.dataList[e].cpcType = 1;
                var s = [];
                s = t.data.isFromSearch ? a.dataInfo.dataList : t.data.carts.concat(a.dataInfo.dataList), 
                t.setData({
                    carts: s,
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
    showModal: function() {
        for (var a = getCurrentPages(), t = a[a.length - 2], e = 0; e < this.data.carts.length; e++) this.data.carts[e].isSelect && t.data.carts.push(this.data.carts[e]);
        t.setData({
            carts: t.data.carts
        }), wx.navigateBack();
    },
    bindMinus: function(a) {
        var t = a.currentTarget.dataset.componentid, e = this.data.carts, s = e[t].count;
        if (s > 1) {
            var c = --s <= 1 ? "disabled" : "normal";
            e[t].count = s, e[t].minusStatus = c, this.setData({
                carts: e
            });
        }
    },
    bindPlus: function(a) {
        var t = a.currentTarget.dataset.componentid, e = this.data.carts, s = e[t].count, c = ++s < 1 ? "disabled" : "normal";
        e[t].count = s, e[t].minusStatus = c, this.setData({
            carts: e
        });
    },
    bindManual: function(a) {
        var t = a.detail.value, e = a.currentTarget.dataset.componentid, s = this.data.carts;
        if (t > 1) {
            var c = t < 1 ? "disabled" : "normal";
            s[e].count = t, s[e].minusStatus = c, this.setData({
                carts: s
            });
        }
    },
    primary: function() {
        for (var a = this, s = [], c = 0; c < a.data.carts.length; c++) a.data.carts[c].isSelect && (a.data.carts[c].cscState = 0, 
        s.push(a.data.carts[c]));
        s = JSON.stringify(s);
        wx.showLoading({
            mask: !0
        }), setTimeout(function() {
            wx.request({
                url: t.localUrl + "mobileXcx/fireClass",
                data: {
                    crm_code: t.crm_code,
                    tId: e.globalData.teacher.id,
                    ccm_id: a.data.ccm_id,
                    class_time: a.data.class_time,
                    theme_name: a.data.theme_name,
                    content: a.data.content,
                    imageList: "",
                    isCpc: 0,
                    isUrl: 0,
                    urlPic: "",
                    roomname: a.data.roomname,
                    latitude: a.data.latitude,
                    longitude: a.data.longitude,
                    lookType: "",
                    thisCpc: s,
                    curriculum_form: a.data.curriculum_form
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(a) {
                    "000" == a.data.succeed && (wx.hideLoading(), wx.showToast({
                        title: "消课成功",
                        icon: "success",
                        duration: 2e3,
                        mask: !0,
                        complete: function() {
                            setTimeout(function() {
                                var a = getCurrentPages();
                                a[a.length - 2].backLoad(), wx.navigateBack();
                            }, 1e3);
                        }
                    }));
                }
            });
        }, 2500);
    }
});