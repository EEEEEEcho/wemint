var e = getApp();

Page({
    data: {
        RefundInfo: null,
        ProgressStatue: [],
        Credentials: []
    },
    onLoad: function(t) {
        var a = this, n = t.id;
        e.getOpenId(function(t) {
            wx.request({
                url: e.getUrl("GetReturnDetail"),
                data: {
                    openId: t,
                    returnId: n
                },
                success: function(e) {
                    if ("OK" == e.data.Status) {
                        var t = e.data.Data;
                        a.setData({
                            RefundInfo: t,
                            Credentials: t.UserCredentials
                        }), a.ShowProgress(t);
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
                }
            });
        });
    },
    ShowProgress: function(e) {
        var t = this, a = [], n = parseInt(e.Status);
        if (n >= 0) {
            s = {
                statuename: "退货申请中",
                time: e.ApplyForTime
            };
            a.push(s);
        }
        if (n >= 3 || 1 == n) {
            s = {
                statuename: "待用户发货",
                time: e.dealTime
            };
            a.push(s);
        }
        if (n >= 4 || 1 == n) {
            s = {
                statuename: "用户已发货",
                time: e.dealTime
            };
            a.push(s);
        }
        if (n >= 5 || 1 == n) {
            s = {
                statuename: "已确认收货",
                time: e.dealTime
            };
            a.push(s);
        }
        if (1 == n) {
            s = {
                statuename: "退款完成",
                time: e.dealTime
            };
            a.push(s);
        }
        if (2 == n) {
            var s = {
                statuename: "退货拒绝",
                time: e.ApplyForTime
            };
            a.push(s);
        }
        t.setData({
            ProgressStatue: a
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