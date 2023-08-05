function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../../store")), s = t(require("../../../../utils/create")), a = require("../../../../api/apiInstance.js"), i = require("../../../../utils/filter.js"), r = getApp(), o = new Date().getTime(), u = o - 2592e6, n = i.tsFormatTime(o, "Y-M-D"), d = i.tsFormatTime(u, "Y-M-D");

(0, s.default)(e.default, {
    properties: {},
    data: {
        navH: r.globalData.navH,
        status: r.globalData.status,
        cartPage: "推广订单",
        orderList: [],
        customerList: [],
        isChooseAll: !1,
        isShowAllCustomer: !1,
        isShowDate: !1,
        isShowOrderStatus: !1,
        isShowAllCustomerMask: !1,
        isShowDateMask: !1,
        isShowOrderStatusMask: !1,
        leftDate: d,
        rightDate: n,
        statusList: [ "无效", "待支付", "支付成功", "待发货", "待收货", "待评价", "交易完成", "待分享", "待开奖" ],
        currentStatus: -1,
        pageSize: 10,
        pageNum: 1,
        keywords: "",
        startAt: "",
        endAt: "",
        isLoad: !1,
        userUuidList: [],
        isShowInput: !1
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.setData({
            pageNum: 1,
            isLoad: !1
        });
        var t = this.data.startAt, e = this.data.endAt, s = this.data.userUuidList, a = this.data.currentStatus, i = !0;
        if ("" != t || "" != e) {
            var r = this.formatDate(t, e);
            "" != r ? (t = r.leftDatetime, e = r.rightDatetime, i = !0) : (i = !1, wx.showToast({
                title: "日期格式不对",
                icon: "none",
                duration: 2e3
            }));
        }
        if (i) {
            var o = {
                accesstoken: this.store.data.userInfo.accesstoken,
                pageSize: this.data.pageSize,
                pageNum: this.data.pageNum,
                startAt: t,
                endAt: e
            };
            -1 != a && (o.status = a), "" != s && (o.userUuidList = s), this.getUserDisOrder(o);
        }
    },
    onReachBottom: function() {
        var t = this;
        if (!this.data.isLoad) {
            var e = this.data.pageNum + 1;
            this.setData({
                pageNum: e,
                isLoad: !0
            });
            var s = this.data.startAt, i = this.data.endAt, r = this.data.userUuidList, o = this.data.currentStatus, u = !0;
            if ("" != s || "" != i) {
                var n = this.formatDate(s, i);
                "" != n ? (s = n.leftDatetime, i = n.rightDatetime, u = !0) : (u = !1, wx.showToast({
                    title: "日期格式不对",
                    icon: "none",
                    duration: 2e3
                }));
            }
            if (u) {
                var d = {
                    accesstoken: this.store.data.userInfo.accesstoken,
                    pageSize: this.data.pageSize,
                    pageNum: this.data.pageNum,
                    startAt: s,
                    endAt: i
                };
                -1 != o && (d.status = o), "" != r && (d.userUuidList = JSON.stringify(r)), (0, 
                a.getUserDisExtendOrder)(d, function(s) {
                    if (1 === s.errcode) {
                        var a = t.data.orderList.concat(s.data), i = !0;
                        s.pages > t.data.pageNum && (i = !1), t.setData({
                            isLoad: i,
                            orderList: a
                        });
                    } else t.setData({
                        isLoad: !1,
                        pageNum: e - 1
                    });
                });
            }
        }
    },
    onLoad: function(t) {
        void 0 !== t.useruuid && (this.data.userUuidFromAccount = t.useruuid);
    },
    onShow: function() {
        var t = {
            pageNum: this.data.pageNum,
            pageSize: this.data.pageSize,
            accesstoken: this.store.data.userInfo.accesstoken
        };
        this.getUserDisOrder(t);
    },
    getUserDisOrder: function(t) {
        var e = this;
        console.log(this.data.userUuidFromAccount), void 0 !== this.data.userUuidFromAccount && (t.userUuid = this.data.userUuidFromAccount), 
        (0, a.getUserDisExtendOrder)(t, function(t) {
            wx.stopPullDownRefresh(), 1 == t.errcode && e.setData({
                orderList: t.data
            });
        });
    },
    showWhat: function(t) {
        var e = !1, s = !1, a = !1, i = !1, r = !1, o = !1, u = !1, n = !1, d = !1;
        switch (t.currentTarget.dataset.type) {
          case "全部客户":
            e = !0, i = !0, u = !0;
            var h = {
                accesstoken: this.store.data.userInfo.accesstoken,
                pageSize: 500,
                pageNum: 1,
                type: JSON.stringify([ 2, 3 ])
            };
            this.getBindingUserInfo(h);
            break;

          case "时间区间":
            s = !0, r = !0, n = !0;
            break;

          case "订单状态":
            a = !0, o = !0, d = !0;
        }
        this.setData({
            isShowAllCustomer: e,
            isShowDate: s,
            isShowOrderStatus: a,
            isShowAllCustomerMask: i,
            isShowDateMask: r,
            isShowOrderStatusMask: o,
            options1: u,
            options2: n,
            options3: d
        });
    },
    chooseThis: function(t) {
        var e = t.currentTarget.dataset.customerid, s = this.data.customerList, a = this.data.userUuidList, i = this.data.isChooseAll;
        if (i) {
            for (var r = s.length - 1; r >= 0; r--) if (r == e) if (s[r].isChooseThis = !i, 
            s[r].isChooseThis) -1 == a.indexOf(s[r].userUuid) && a.push(s[r].userUuid); else if (-1 != a.indexOf(s[r].userUuid)) {
                u = a.indexOf(s[r].userUuid);
                a.splice(u, 1);
            }
            i = !i;
        } else for (var o = s.length - 1; o >= 0; o--) if (o == e) if (s[o].isChooseThis = !s[o].isChooseThis, 
        s[o].isChooseThis) -1 == a.indexOf(s[o].userUuid) && a.push(s[o].userUuid); else {
            var u = a.indexOf(s[o].userUuid);
            a.splice(u, 1);
        }
        this.setData({
            customerList: s,
            isChooseAll: i,
            userUuidList: a
        });
    },
    chooseAll: function() {
        var t = this.data.customerList, e = this.data.userUuidList, s = !this.data.isChooseAll;
        e = [];
        for (var a = 0; a < t.length; a++) t[a].isChooseThis = s, s && e.push(t[a].userUuid);
        this.setData({
            isChooseAll: s,
            customerList: t,
            userUuidList: e
        });
    },
    bindLeftDateChange: function(t) {
        var e = t.detail.value, s = this.data.rightDate;
        if ("" == this.formatDate(e, s)) {
            var a = new Date(e.replace(/-/g, "/")).getTime() + 864e5;
            s = i.tsFormatTime(a, "Y-M-D");
        }
        this.setData({
            leftDate: e,
            rightDate: s,
            startAt: e
        });
    },
    bindRightDateChange: function(t) {
        this.setData({
            rightDate: t.detail.value,
            endAt: t.detail.value
        });
    },
    formatDate: function(t, e) {
        "" == t && (t = d), "" == e && (e = n);
        var s = new Date(t.replace(/-/g, "/"));
        if (new Date(e.replace(/-/g, "/")).getTime() - s.getTime() >= 0) {
            return {
                leftDatetime: t.substring(0, 4) + t.substring(5, 7) + t.substring(8) + " 00:00:00",
                rightDatetime: e.substring(0, 4) + e.substring(5, 7) + e.substring(8) + " 23:59:59"
            };
        }
        return "";
    },
    closeDateMask: function() {
        var t = this, e = this.data.leftDate, s = this.data.rightDate, a = !0;
        if ("" != e || "" != s) {
            var i = this.formatDate(e, s);
            "" != i ? (e = i.leftDatetime, s = i.rightDatetime, a = !0) : (a = !1, wx.showToast({
                title: "日期格式不对",
                icon: "none",
                duration: 2e3
            }));
        }
        if (a) {
            var r = {
                pageNum: this.data.pageNum,
                pageSize: this.data.pageSize,
                accesstoken: this.store.data.userInfo.accesstoken,
                startAt: e,
                endAt: s
            };
            this.getUserDisOrder(r), this.setData({
                options2: !1,
                leftDate: d,
                rightDate: n
            }), setTimeout(function() {
                t.setData({
                    isShowDateMask: !1
                });
            }, 500);
        }
    },
    closeCustomerMask: function() {
        var t = this, e = this.data.userUuidList;
        if ("" != e) {
            var s = {
                accesstoken: this.store.data.userInfo.accesstoken,
                pageSize: this.data.pageSize,
                pageNum: this.data.pageNum,
                userUuidList: JSON.stringify(e)
            };
            this.getUserDisOrder(s);
        }
        this.setData({
            options1: !1
        }), setTimeout(function() {
            t.setData({
                isShowAllCustomerMask: !1,
                keywords: "",
                isShowInput: !1
            });
        }, 500);
    },
    selectThis: function(t) {
        this.setData({
            currentStatus: t.currentTarget.dataset.statusid
        });
    },
    getFocus: function() {
        this.setData({
            isShowInput: !0
        });
    },
    searchSomething: function(t) {
        this.setData({
            keywords: t.detail.value
        });
        var e = {
            accesstoken: this.store.data.userInfo.accesstoken,
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            keywords: this.data.keywords,
            type: JSON.stringify([ 2, 3 ])
        };
        this.getBindingUserInfo(e);
    },
    closeOrderStatusMask: function() {
        var t = this, e = "";
        -1 != this.data.currentStatus && (e = this.data.currentStatus), this.setData({
            options3: !1
        }), setTimeout(function() {
            t.setData({
                isShowOrderStatusMask: !1
            });
        }, 500);
        var s = {
            pageNum: this.data.pageNum,
            pageSize: this.data.pageSize,
            accesstoken: this.store.data.userInfo.accesstoken,
            status: e
        };
        this.getUserDisOrder(s);
    },
    getBindingUserInfo: function(t) {
        var e = this;
        (0, a.getBindingUserInfo)(t, function(t) {
            if (1 == t.errcode) {
                for (var s = e.data.userUuidList, a = t.data.records, i = 0; i < a.length; i++) -1 != s.indexOf(a[i].userUuid) && (a[i].isChooseThis = !0);
                e.setData({
                    customerList: a
                });
            }
        });
    },
    onHide: function() {
        this.setData({
            userUuidList: []
        });
    }
});