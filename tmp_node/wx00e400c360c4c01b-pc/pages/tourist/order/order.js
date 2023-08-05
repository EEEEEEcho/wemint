function a(a, n, i, s) {
    wx.request({
        url: t.localUrl + "mobileXcx/myOrderList",
        data: {
            currentTab: a,
            openId: e.globalData.openId,
            currentPage: n,
            rowCountPerPage: i
        },
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            s(a.data);
        }
    });
}

var t = require("../../../utils/main.js"), e = getApp();

Page({
    data: {
        scrollHeight: 0,
        winWidth: 0,
        winHeight: 0,
        currentTab: 0,
        pay_state: "",
        dataList: [],
        dataListNoPay: [],
        dataListPay: [],
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
                    winWidth: a.windowWidth,
                    winHeight: a.windowHeight,
                    scrollHeight: a.windowHeight + 500
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
    bindChange: function(a) {
        this.setData({
            currentTab: a.detail.current
        }), this.backLoad();
    },
    swichNav: function(a) {
        var t = this;
        if (this.data.currentTab === a.target.dataset.current) return !1;
        t.setData({
            currentTab: a.target.dataset.current
        });
    },
    pay: function(a) {
        var t = JSON.stringify(a.currentTarget.dataset.model);
        wx.navigateTo({
            url: "../orderPay/orderPay?model=" + t
        });
    },
    fetchSearchList: function() {
        var t = this;
        a(t.data.currentTab, t.data.searchPageNum, t.data.callbackcount, function(a) {
            if (console.log(a.dataInfo.dataList), null != a.dataInfo.dataList && 0 != a.dataInfo.dataList.length) {
                var e = [];
                e = t.data.isFromSearch ? a.dataInfo.dataList : t.data.dataList.concat(a.dataInfo.dataList), 
                "0" == t.data.currentTab ? t.setData({
                    dataList: e,
                    searchLoading: !0
                }) : "1" == t.data.currentTab ? t.setData({
                    dataListNoPay: e,
                    searchLoading: !0
                }) : "2" == t.data.currentTab && t.setData({
                    dataListPay: e,
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
            dataList: [],
            dataListNoPay: [],
            dataListPay: [],
            searchPageNum: 1,
            callbackcount: 15,
            totalPage: 0,
            searchLoading: !1,
            searchLoadingComplete: !1
        }), this.fetchSearchList();
    },
    delOrder: function(a) {
        var e = this, n = a.currentTarget.dataset.id, i = a.currentTarget.dataset.index;
        wx.showModal({
            title: "提示",
            content: "请确认删除订单",
            success: function(a) {
                a.confirm && wx.request({
                    url: t.localUrl + "mobileXcx/orderPayDel",
                    data: {
                        id: n
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(a) {
                        var t = e.data.currentTab;
                        0 == t ? (e.data.dataList.splice(i, 1), e.setData({
                            dataList: e.data.dataList
                        })) : 1 == t ? (e.data.dataListNoPay.splice(i, 1), e.setData({
                            dataListNoPay: e.data.dataListNoPay
                        })) : 2 == t && (e.data.dataListPay.splice(i, 1), e.setData({
                            dataListPay: e.data.dataListPay
                        }));
                    }
                });
            }
        });
    }
});