function a(a, t, e) {
    wx.request({
        url: o.localUrl + "mobileXcx/bookLoaning",
        data: {
            cpc_id: n.globalData.cpc.id,
            currentPage: a,
            rowCountPerPage: t
        },
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            e(a.data);
        }
    });
}

function t(a, t) {
    wx.requestPayment({
        timeStamp: a.data.timeStamp,
        nonceStr: a.data.nonceStr,
        package: a.data.package,
        signType: "MD5",
        paySign: a.data.paySign,
        success: function(a) {
            console.log(a), t(!0);
        },
        fail: function(a) {
            console.log("支付失败"), console.log(a), t(!1);
        },
        complete: function() {
            console.log("pay complete");
        }
    });
}

var o = require("../../../utils/main.js"), n = (require("../../../utils/util.js"), 
getApp());

Page({
    data: {
        screenWidth: 0,
        screenHeight: 0,
        imgwidth: 0,
        imgheight: 0,
        bookLoaningList: [],
        content: "",
        searchPageNum: 1,
        callbackcount: 5,
        totalPage: 0,
        searchLoading: !1,
        searchLoadingComplete: !1,
        startX: 0,
        startY: 0
    },
    onShareAppMessage: function() {},
    onLoad: function(a) {
        this.fetchSearchList();
    },
    fetchSearchList: function() {
        var t = this;
        a(t.data.searchPageNum, t.data.callbackcount, function(a) {
            if (null != a.dataInfo.dataList && 0 != a.dataInfo.dataList.length) {
                var o = [];
                o = t.data.isFromSearch ? a.dataInfo.dataList : t.data.bookLoaningList.concat(a.dataInfo.dataList), 
                t.setData({
                    bookLoaningList: o,
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
            bookLoaningList: [],
            searchPageNum: 1,
            callbackcount: 15,
            totalPage: 0,
            searchLoading: !1,
            searchLoadingComplete: !1
        }), this.fetchSearchList();
    },
    imageLoad: function(a) {
        var t = 180 / (a.detail.width / a.detail.height);
        this.setData({
            imgwidth: 180,
            imgheight: t
        });
    },
    scanning: function() {
        wx.request({
            url: o.localUrl + "mobileXcx/bookLoan",
            data: {
                crm_code: o.crm_code
            },
            method: "GET",
            header: {
                "content-Type": "application/json"
            },
            success: function(a) {
                if (1 == a.data.dataInfo.css.book_loan_switch) {
                    var e = a.data.dataInfo.css.book_loan_money;
                    n.globalData.cpc.book_deposit_money <= 0 ? wx.showModal({
                        title: "图书借阅",
                        content: "需先缴纳图书押金 ￥" + e + " 后借阅，请点击确认进行缴纳。",
                        success: function(a) {
                            a.confirm && wx.request({
                                url: o.localUrl + "mobileXcx/wxPayBook",
                                data: {
                                    openid: n.globalData.openId,
                                    crm_code: o.crm_code,
                                    cpc_id: n.globalData.cpc.id
                                },
                                method: "GET",
                                success: function(a) {
                                    console.log(a), t(a, function(a) {
                                        console.log(a), a ? (n.globalData.cpc.book_deposit_money = e, wx.scanCode({
                                            success: function(a) {
                                                wx.navigateTo({
                                                    url: "../scanningBook/scanningBook?bookId=" + a.result + "&huan=0"
                                                });
                                            },
                                            fail: function(a) {
                                                wx.showToast({
                                                    title: "扫码失败",
                                                    icon: "success",
                                                    duration: 2e3
                                                });
                                            }
                                        })) : wx.showToast({
                                            title: "支付失败",
                                            icon: "loading",
                                            duration: 2e3
                                        });
                                    });
                                }
                            });
                        }
                    }) : wx.scanCode({
                        success: function(a) {
                            wx.navigateTo({
                                url: "../scanningBook/scanningBook?bookId=" + a.result + "&huan=0"
                            });
                        },
                        fail: function(a) {
                            wx.showToast({
                                title: "扫码失败",
                                icon: "success",
                                duration: 2e3
                            });
                        }
                    });
                } else wx.scanCode({
                    success: function(a) {
                        wx.navigateTo({
                            url: "../scanningBook/scanningBook?bookId=" + a.result + "&huan=0"
                        });
                    },
                    fail: function(a) {
                        wx.showToast({
                            title: "扫码失败",
                            icon: "success",
                            duration: 2e3
                        });
                    }
                });
            }
        });
    },
    returnBook: function() {
        wx.scanCode({
            success: function(a) {
                wx.navigateTo({
                    url: "../scanningBook/scanningBook?bookId=" + a.result + "&huan=1"
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "扫码失败",
                    icon: "success",
                    duration: 2e3
                });
            },
            complete: function(a) {}
        });
    },
    touchstart: function(a) {
        this.data.bookLoaningList.forEach(function(a, t) {
            a.isTouchMove && (a.isTouchMove = !1);
        }), this.setData({
            startX: a.changedTouches[0].clientX,
            startY: a.changedTouches[0].clientY,
            bookLoaningList: this.data.bookLoaningList
        });
    },
    touchmove: function(a) {
        var t = this, o = a.currentTarget.dataset.index, n = t.data.startX, e = t.data.startY, c = a.changedTouches[0].clientX, i = a.changedTouches[0].clientY, s = t.angle({
            X: n,
            Y: e
        }, {
            X: c,
            Y: i
        });
        t.data.bookLoaningList.forEach(function(a, t) {
            a.isTouchMove = !1, Math.abs(s) > 30 || t == o && (a.isTouchMove = !(c > n));
        }), t.setData({
            bookLoaningList: t.data.bookLoaningList
        });
    },
    angle: function(a, t) {
        var o = t.X - a.X, n = t.Y - a.Y;
        return 360 * Math.atan(n / o) / (2 * Math.PI);
    },
    del: function(a) {
        var t = this, n = (a.currentTarget.dataset.index, a.currentTarget.dataset.id);
        0 == a.currentTarget.dataset.state ? wx.showToast({
            title: "图书未还，不可删除！",
            icon: "loading",
            duration: 2e3,
            mask: !0
        }) : wx.request({
            url: o.localUrl + "mobileXcx/bookLoaningDel",
            data: {
                id: n
            },
            method: "GET",
            header: {
                "content-Type": "application/json"
            },
            success: function(o) {
                200 == o.statusCode && (t.data.bookLoaningList.splice(a.currentTarget.dataset.index, 1), 
                t.setData({
                    bookLoaningList: t.data.bookLoaningList
                }));
            }
        });
    }
});