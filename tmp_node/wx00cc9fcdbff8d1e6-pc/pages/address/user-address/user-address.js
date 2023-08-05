var t = getApp();

Page({
    data: {
        address: [],
        radioindex: "",
        pro_id: 0,
        num: 0,
        cartId: 0
    },
    onLoad: function(e) {
        var a = this, d = e.cartId;
        console.log(t.d.userId), wx.request({
            url: t.d.ceshiUrl + "/Api/Address/index",
            data: {
                user_id: t.d.userId
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                e = t.data.adds;
                if (console.log(e), "" == e) var e = [];
                a.setData({
                    address: e,
                    cartId: d
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    onReady: function() {},
    setDefault: function(e) {
        var a = this, d = e.currentTarget.dataset.id;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Address/set_default",
            data: {
                uid: t.d.userId,
                addr_id: d
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var e = t.data.status, d = a.data.cartId;
                if (1 == e) {
                    if (d) return wx.redirectTo({
                        url: "../../order/pay?cartId=" + d
                    }), !1;
                    wx.showToast({
                        title: "操作成功！",
                        duration: 2e3
                    }), a.DataonLoad();
                } else wx.showToast({
                    title: t.data.err,
                    duration: 2e3
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    delAddress: function(e) {
        var a = this, d = e.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "你确认移除吗",
            success: function(e) {
                e.confirm && wx.request({
                    url: t.d.ceshiUrl + "/Api/Address/del_adds",
                    data: {
                        user_id: t.d.userId,
                        id_arr: d
                    },
                    method: "POST",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        1 == t.data.status ? a.DataonLoad() : wx.showToast({
                            title: t.data.err,
                            duration: 2e3
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "网络异常！",
                            duration: 2e3
                        });
                    }
                });
            }
        });
    },
    DataonLoad: function() {
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Address/index",
            data: {
                user_id: t.d.userId
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if ("" == (a = t.data.adds)) var a = [];
                e.setData({
                    address: a
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    }
});