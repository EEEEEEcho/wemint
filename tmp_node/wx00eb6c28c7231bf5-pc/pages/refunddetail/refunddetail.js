var e = getApp();

Page({
    data: {
        RefundInfo: null,
        Credentials: [],
        ProgressStatue: []
    },
    onLoad: function(t) {
        var n = this, a = t.id;
        e.getOpenId(function(t) {
            wx.request({
                url: e.getUrl("GetRefundDetail"),
                data: {
                    openId: t,
                    RefundId: a
                },
                success: function(e) {
                    if ("OK" == e.data.Status) {
                        var t = e.data.Data, a = [];
                        "".length > 0 && (a = "".split(",")), n.setData({
                            RefundInfo: t,
                            Credentials: a
                        }), n.ShowProgress(t);
                    } else "NOUser" == e.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: e.data.ErrorResponse.ErrorMsg,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {}
            });
        });
    },
    ShowProgress: function(e) {
        var t = this, n = [], a = parseInt(e.Status);
        if (a >= 0) {
            o = {
                statuename: "退款申请中",
                time: e.ApplyForTime
            };
            n.push(o);
        }
        if (1 == a) {
            o = {
                statuename: "退款完成",
                time: e.dealTime
            };
            n.push(o);
        } else {
            var o = {
                statuename: "拒绝退款",
                time: e.dealTime
            };
            n.push(o);
        }
        t.setData({
            ProgressStatue: n
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});