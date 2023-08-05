require("../../utils/config.js");

var t = getApp();

Page({
    data: {
        ReviewInfo: null,
        positive: 0,
        commentList: null,
        pageIndex: 1,
        pageSize: 10,
        commentType: 0,
        ProductId: null
    },
    onLoad: function(a) {
        var e = this, s = a.id;
        e.setData({
            ProductId: s
        }), wx.request({
            url: t.getUrl("StatisticsReview"),
            data: {
                ProductId: s
            },
            success: function(t) {
                if ("OK" == t.data.Status) {
                    var a = t.data.Data, s = 100 * (a.reviewNum1 / a.reviewNum).toFixed(4);
                    e.setData({
                        ReviewInfo: a,
                        positive: s
                    });
                } else "NOUser" == t.data.Message ? wx.redirectTo({
                    url: "../login/login"
                }) : wx.showModal({
                    title: "提示",
                    content: t.data.Message,
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        }), e.loadData(e, !1);
    },
    loadData: function(a, e) {
        t.getOpenId(function(s) {
            wx.request({
                url: t.getUrl("LoadReview"),
                data: {
                    openId: s,
                    PageIndex: a.data.pageIndex,
                    PageSize: a.data.pageSize,
                    type: a.data.commentType,
                    ProductId: a.data.ProductId
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var s = t.data.Data;
                        if (e) {
                            var n = a.data.commentList;
                            n.push.apply(n, s), a.setData({
                                commentList: n
                            });
                        } else a.setData({
                            Status: status,
                            commentList: s
                        });
                    } else "NOUser" == t.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            });
        });
    },
    bingComment: function(t) {
        var a = this, e = t.currentTarget.dataset.typeid;
        a.setData({
            pageIndex: 1,
            commentType: e
        }), a.loadData(a, !1);
    },
    onReachBottom: function() {
        var t = this, a = t.data.pageIndex;
        a = parseInt(a) + 1, t.setData({
            pageIndex: a
        }), t.loadData(t, !0);
    }
});