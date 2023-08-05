var e = getApp();

Page({
    data: {
        OrderId: "",
        SkuId: "",
        Name: "",
        AfterSaleType: 0,
        AfterSaleTypeText: "请选择售后类型",
        RefundType: 0,
        RefundTypeText: "请选择退款方式",
        RefundReasonText: "请选择退货原因",
        Remark: "",
        BankName: "",
        BankAccountName: "",
        BankAccountNo: "",
        UserCredentials: [ "../../images/return-img_03.jpg", "../../images/return-img_03.jpg", "../../images/return-img_03.jpg" ],
        ReturnNum: 1,
        MostMoney: 0,
        ShowReason: !0,
        ShowType: !0,
        ShowAfterType: !0,
        ApplyReturnNum: 1,
        TotalMoney: 0,
        UploadGredentials: [],
        FormId: "",
        ReturnMoney: 0,
        ImageIndex: 0
    },
    onLoad: function(e) {
        var t = e.orderid, a = e.skuId, n = e.pro, o = e.num, r = e.m;
        this.setData({
            OrderId: t,
            SkuId: a,
            Name: n,
            ReturnNum: o,
            MostMoney: r,
            TotalMoney: r
        });
    },
    uploadImg: function(e) {
        var t = this, a = t.data.UserCredentials, n = e.currentTarget.dataset.index;
        wx.chooseImage({
            success: function(e) {
                a[n] = e.tempFilePaths[0];
                var o = parseInt(t.data.ImageIndex);
                o = o >= 2 ? 2 : o++, t.setData({
                    UserCredentials: a,
                    ImageIndex: o
                });
            }
        });
    },
    ShowAfterType: function(e) {
        this.setData({
            ShowReason: !0,
            ShowType: !0,
            ShowAfterType: !1
        });
    },
    ShowResaon: function(e) {
        this.setData({
            ShowReason: !1,
            ShowType: !0,
            ShowAfterType: !0
        });
    },
    ShowRefundType: function(e) {
        this.setData({
            ShowReason: !0,
            ShowType: !1,
            ShowAfterType: !0
        });
    },
    ChooseReason: function(e) {
        var t = this, a = e.currentTarget.dataset.name;
        t.setData({
            RefundReasonText: a,
            ShowType: !0,
            ShowReason: !0,
            ShowAfterType: !0
        });
    },
    ChooseType: function(e) {
        var t = e.currentTarget.dataset.id, a = this, n = a.ShowRefundTypeName(t);
        a.setData({
            RefundType: t,
            RefundTypeText: n,
            ShowType: !0,
            ShowReason: !0,
            ShowAfterType: !0
        });
    },
    ShowRefundTypeName: function(e) {
        var t = parseInt(e);
        return 1 == t ? "退到预付款" : 2 == t ? "退到银行卡" : 3 == t ? "原路返回" : "到店退款";
    },
    ChooseAfterType: function(e) {
        var t = e.currentTarget.dataset.id, a = this, n = a.ShowAfterTypeName(t);
        a.setData({
            AfterSaleType: t,
            AfterSaleTypeText: n,
            ShowType: !0,
            ShowReason: !0,
            ShowAfterType: !0
        });
    },
    ShowAfterTypeName: function(e) {
        var t = parseInt(e);
        return 1 == t ? "退货退款" : 2 == t ? "换货" : "";
    },
    MuseNum: function(e) {
        var t = this, a = t.data.ApplyReturnNum;
        if (a <= 1) wx.showModal({
            title: "提示",
            content: "最少退1件商品",
            showCancel: !1
        }); else {
            a -= 1;
            var n = parseFloat(tempactreturnnum * t.data.MostMoney).toFixed(2);
            t.setData({
                ApplyReturnNum: a,
                TotalMoney: n
            });
        }
    },
    AddNum: function(e) {
        var t = this, a = parseInt(t.data.ApplyReturnNum), n = parseInt(t.data.ReturnNum);
        if (a >= n) wx.showModal({
            title: "提示",
            content: "最多退" + n + "件商品",
            showCancel: !1
        }); else {
            a += 1;
            var o = parseFloat(a * t.data.MostMoney).toFixed(2);
            t.setData({
                ApplyReturnNum: n,
                TotalMoney: o
            });
        }
    },
    formSubmit: function(e) {
        var t = this, a = e.detail.formId, n = t.ToTrim(e.detail.value.txtBankName), o = t.ToTrim(e.detail.value.txtBankAccountName), r = t.ToTrim(e.detail.value.txtBankAccountNo), s = e.detail.value.txtmoney, d = e.detail.value.txtnum, u = e.detail.value.txtarea, l = t.data.RefundType;
        if (2 == l && (n.length <= 0 || o.length <= 0 || r.length <= 0)) wx.showModal({
            title: "提示",
            content: "银行卡信息不允许为空！",
            showCancel: !1
        }); else if (l <= 0) wx.showModal({
            title: "提示",
            content: "请选择要退款的方式",
            showCancel: !1
        }); else if (t.data.RefundReasonText.length <= 0 || "请选择退款原因" == t.data.RefundReasonText) wx.showModal({
            title: "提示",
            content: "请选择要退款的原因",
            showCancel: !1
        }); else if (t.data.AfterSaleType <= 0 || "请选择售后类型" == t.data.AfterSaleTypeText) wx.showModal({
            title: "提示",
            content: "请选择售后类型",
            showCancel: !1
        }); else if (t.data.OrderId.length <= 0) wx.showModal({
            title: "提示",
            content: "请选择要退款的订单",
            showCancel: !1
        }); else {
            t.setData({
                formId: a,
                Remark: u,
                BankName: n,
                BankAccountName: o,
                BankAccountNo: r,
                ApplyReturnNum: d,
                ReturnMoney: s,
                UploadGredentials: []
            });
            var i = [];
            t.data.UserCredentials.find(function(e, t) {
                "../../images/return-img_03.jpg" != e && i.push(e);
            }), t.UploadBatchImages(t, i);
        }
    },
    UploadBatchImages: function(t, a) {
        var n = a.shift();
        void 0 != n && e.getOpenId(function(o) {
            wx.uploadFile({
                url: e.getUrl("UploadAppletImage"),
                filePath: n,
                name: "file",
                formData: {
                    openId: o
                },
                success: function(e) {
                    var a = JSON.parse(e.data);
                    if ("OK" == a.Status) {
                        var n = t.data.UploadGredentials;
                        n.push(a.Data[0].ImageUrl), t.setData({
                            UploadGredentials: n
                        });
                    } else "NOUser" == a.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: a.ErrorResponse.ErrorMsg,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {
                    a.length > 0 ? t.UploadBatchImages(t, a) : t.AddReturnInfo();
                }
            });
        });
    },
    AddReturnInfo: function() {
        var t = this;
        e.getOpenId(function(a) {
            wx.request({
                url: e.getUrl("ApplyReturn"),
                data: {
                    openId: a,
                    skuId: t.data.SkuId,
                    orderId: t.data.OrderId,
                    Quantity: t.data.ApplyReturnNum,
                    RefundAmount: t.data.ReturnMoney,
                    afterSaleType: t.data.AfterSaleType,
                    RefundType: t.data.RefundType,
                    RefundReason: t.data.RefundReasonText,
                    Remark: t.data.Remark,
                    BankName: t.data.BankName,
                    BankAccountName: t.data.BankAccountName,
                    BankAccountNo: t.data.BankAccountNo,
                    UserCredentials: t.data.UploadGredentials.join(","),
                    formId: t.data.formId
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
                        content: e.data.Message,
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