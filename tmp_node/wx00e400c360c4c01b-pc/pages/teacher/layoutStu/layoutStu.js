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

var t = require("../../../utils/main.js");

getApp();

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
        searchLoadingComplete: !1
    },
    onLoad: function(a) {
        var t = this, e = a.noIds;
        this.setData({
            noIds: e
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
    }
});