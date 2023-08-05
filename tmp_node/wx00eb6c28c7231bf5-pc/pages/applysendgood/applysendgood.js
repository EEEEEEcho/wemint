var e = getApp();

Page({
    data: {
        ApplySendGood: null,
        ProductName: "",
        formId: "",
        express: "中通快递",
        shipOrderNumber: "",
        IsShowExpress: !0,
        ExpressList: [],
        index: 0
    },
    onLoad: function(t) {
        var n = this, s = t.id;
        t.skuId;
        e.getOpenId(function(t) {
            wx.request({
                url: e.getUrl("GetReturnDetail"),
                data: {
                    openId: t,
                    returnId: s
                },
                success: function(e) {
                    if ("OK" == e.data.Status) {
                        var t = e.data.Data;
                        n.setData({
                            ApplySendGood: t
                        });
                    } else "NOUser" == e.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: e.data.Message,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {
                    n.LoadExpress();
                }
            });
        });
    },
    bindPickerChange: function(e) {
        var t = this, n = e.detail.value, s = t.data.ExpressList;
        t.setData({
            express: s[n]
        });
    },
    ShowExpress: function(e) {
        var t = this;
        t.data.ExpressList.length > 0 ? t.setData({
            IsShowExpress: !1
        }) : wx.showModal({
            title: "提示",
            content: "物流公司加载失败",
            showCancel: !1
        });
    },
    LoadExpress: function() {
        var t = this;
        wx.request({
            url: e.getUrl("GetExpressList"),
            success: function(e) {
                if ("OK" == e.data.Status) {
                    var n = new Array();
                    e.data.Data.find(function(e, t) {
                        void 0 != e.ExpressName && n.push(e.ExpressName);
                    }), t.setData({
                        ExpressList: n
                    });
                }
            }
        });
    },
    formSubmit: function(t) {
        var n = this, s = t.detail.formId, a = n.ToTrim(t.detail.value.txtshipOrderNumber);
        null == a || "undefined" == a || a.length <= 0 ? wx.showModal({
            title: "提示",
            content: "快递单号不允许为空",
            showCancel: !1
        }) : n.data.express.length <= 0 ? wx.showModal({
            title: "提示",
            content: "请选择物流公司",
            showCancel: !1
        }) : e.getOpenId(function(t) {
            wx.request({
                url: e.getUrl("ReturnSendGoods"),
                data: {
                    openId: t,
                    skuId: n.data.ApplySendGood.SkuId,
                    orderId: n.data.ApplySendGood.OrderId,
                    ReturnsId: n.data.ApplySendGood.ReturnId,
                    express: n.data.express,
                    shipOrderNumber: a,
                    formId: s
                },
                success: function(e) {
                    "OK" == e.data.Status ? wx.showModal({
                        title: "提示",
                        content: e.data.Message,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    }) : "NOUser" == e.data.Message ? wx.redirectTo({
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
    ToTrim: function(e) {
        return e.replace(/(^\s*)|(\s*$)/g, "");
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});