var e = getApp();

Page({
    data: {
        OrderId: "",
        SkuId: "",
        RefundType: 0,
        RefundTypeText: "请选择退款方式",
        RefundMoney: 0,
        RefundReason: 0,
        RefundReasonText: "请选择退款原因",
        Remark: "",
        BankName: "",
        BankAccountName: "",
        BankAccountNo: "",
        ShowReason: !0,
        ShowType: !0
    },
    onLoad: function(e) {
        var a = e.orderid, t = e.m;
        this.setData({
            OrderId: a,
            RefundMoney: t
        });
    },
    InputText: function(e) {
        var a = this, t = e.currentTarget.dataset.names, n = e.detail.value;
        switch (t) {
          case "BankName":
            a.setData({
                BankName: n
            });
            break;

          case "BankAccountName":
            a.setData({
                BankAccountName: n
            });
            break;

          case "BankAccountNo":
            a.setData({
                BankAccountNo: n
            });
            break;

          default:
            a.setData({
                Remark: n
            });
        }
    },
    ShowReason: function(e) {
        this.setData({
            ShowReason: !1,
            ShowType: !0
        });
    },
    ShowType: function(e) {
        this.setData({
            ShowReason: !0,
            ShowType: !1
        });
    },
    ChooseReason: function(e) {
        var a = this, t = e.currentTarget.dataset.name;
        a.setData({
            RefundReasonText: t,
            ShowType: !0,
            ShowReason: !0
        });
    },
    ChooseType: function(e) {
        var a = e.currentTarget.dataset.id, t = this, n = t.ShowRefundTypeName(a);
        t.setData({
            RefundType: a,
            RefundTypeText: n,
            ShowType: !0,
            ShowReason: !0
        });
    },
    ShowRefundTypeName: function(e) {
        var a = parseInt(e);
        return 1 == a ? "退到预付款" : 2 == a ? "退到银行卡" : 3 == a ? "原路返回" : "到店退款";
    },
    formSubmit: function(a) {
        var t = this, n = a.detail.formId, o = t.ToTrim(a.detail.value.txtBankName), s = t.ToTrim(a.detail.value.txtBankAccountName), c = t.ToTrim(a.detail.value.txtBankAccountNo), d = t.data.RefundType;
        2 == d && (o.length <= 0 || s.length <= 0 || c.length <= 0) ? wx.showModal({
            title: "提示",
            content: "银行卡信息不允许为空！",
            showCancel: !1
        }) : d <= 0 ? wx.showModal({
            title: "提示",
            content: "请选择要退款的方式",
            showCancel: !1
        }) : t.data.RefundReasonText.length <= 0 || "请选择退款原因" == t.data.RefundReasonText ? wx.showModal({
            title: "提示",
            content: "请选择要退款的原因",
            showCancel: !1
        }) : t.data.OrderId.length <= 0 ? wx.showModal({
            title: "提示",
            content: "请选择要退款的订单",
            showCancel: !1
        }) : e.getOpenId(function(a) {
            wx.request({
                url: e.getUrl("ApplyRefund"),
                data: {
                    openId: a,
                    skuId: t.data.SkuId,
                    orderId: t.data.OrderId,
                    RefundType: d,
                    RefundReason: t.data.RefundReasonText,
                    Remark: t.data.Remark,
                    BankName: o,
                    BankAccountName: s,
                    BankAccountNo: c,
                    FormId: n
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