function a(a, e) {
    wx.request({
        url: t.localUrl + "mobileXcx/bookView",
        data: {
            id: a,
            cpcId: o.globalData.cpc.id
        },
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            e(a.data.dataInfo);
        }
    });
}

var t = require("../../../utils/main.js"), o = getApp();

Page({
    data: {
        screenWidth: 0,
        screenHeight: 0,
        imgwidth: 0,
        imgheight: 0,
        loan_time: ""
    },
    onLoad: function(t) {
        var e = this, c = t.bookId, i = t.huan;
        this.setData({
            huan: i,
            cpcId: o.globalData.cpc.id
        }), a(c, function(a) {
            e.setData({
                book: a.book,
                loan_time: a.loan_time
            });
        });
    },
    imageLoad: function(a) {
        var t = 500 / (a.detail.width / a.detail.height);
        this.setData({
            imgwidth: 500,
            imgheight: t
        });
    },
    saveBookLoaning: function() {
        wx.request({
            url: t.localUrl + "mobileXcx/saveBookLoaning",
            data: {
                crm_code: t.crm_code,
                school_code: o.globalData.cpc.school_code,
                cpcId: o.globalData.cpc.id,
                bookId: this.data.book.id
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                "000" == a.data.succeed ? (wx.showToast({
                    title: "成功",
                    icon: "success",
                    duration: 2e3,
                    mask: !0
                }), setTimeout(function() {
                    var a = getCurrentPages();
                    a[a.length - 2].backLoad(), wx.navigateBack();
                }, 2e3)) : wx.showToast({
                    title: a.data.sucInfo,
                    icon: "loading",
                    duration: 2e3,
                    mask: !0
                });
            }
        });
    },
    returnBook: function() {
        wx.request({
            url: t.localUrl + "mobileXcx/returnBook",
            data: {
                cpcId: o.globalData.cpc.id,
                bookId: this.data.book.id
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                "000" == a.data.succeed && (wx.showToast({
                    title: "成功",
                    icon: "success",
                    duration: 2e3,
                    mask: !0
                }), setTimeout(function() {
                    var a = getCurrentPages();
                    a[a.length - 2].backLoad(), wx.navigateBack();
                }, 2e3));
            }
        });
    }
});