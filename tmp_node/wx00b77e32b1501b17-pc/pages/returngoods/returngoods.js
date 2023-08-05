Page({
    data: {
        array: [ "仅退款，无需退货", "退款并向商家退货" ],
        index: 0,
        StatusStr: "",
        OrderDetails: {},
        GoodsNum: 0,
        PayAmount: 0,
        YunMoney: 0,
        OrderID: "",
        CreateTime: "",
        PayTime: "",
        ReturnReason: "",
        PhotoVoucher: "",
        AskUser: 0,
        ExpressCompany: "",
        ExpressNo: "",
        PartOrderRefundEnable: 0,
        GoodsList: [],
        pids: [],
        TempPics: []
    },
    bindPickerChange: function(t) {
        this.setData({
            index: t.detail.value
        });
    },
    onUploadPics: function(t) {
        var e = this;
        wx.chooseImage({
            count: 3,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                e.setData({
                    TempPics: t.tempFilePaths
                });
            }
        });
    },
    onDelPic: function(t) {
        var e = new Array();
        e = this.data.TempPics;
        for (var a = 0; a < e.length; a++) if (a == t.target.id) {
            e.splice(a, 1);
            break;
        }
        this.setData({
            TempPics: e
        });
    },
    onExpressCompanyInput: function(t) {
        this.setData({
            ExpressCompany: t.detail.value
        });
    },
    onExpressNoInput: function(t) {
        this.setData({
            ExpressNo: t.detail.value
        });
    },
    onReturnReasonInput: function(t) {
        this.setData({
            ReturnReason: t.detail.value
        });
    },
    checkboxChange: function(t) {
        this.setData({
            pids: t.detail.value
        });
    },
    onSubmitApply: function(t) {
        if (1 == this.data.PartOrderRefundEnable && 0 == this.data.pids.length) return wx.showToast({
            title: "请勾选退款商品",
            duration: 2e3
        }), !1;
        if (1 == this.data.index) {
            if ("" == this.data.ExpressCompany) return wx.showToast({
                title: "请填写快递名称",
                duration: 2e3
            }), !1;
            if ("" == this.data.ExpressNo) return wx.showToast({
                title: "请填写物流单号",
                duration: 2e3
            }), !1;
        }
        if ("" == this.data.ReturnReason) return wx.showToast({
            title: "请填写退款原因",
            duration: 2e3
        }), !1;
        if (this.data.TempPics.length > 3) return wx.showToast({
            title: "最多上传3张凭证",
            duration: 2e3
        }), !1;
        var e = getApp().globalData, a = e.custID, n = wx.getStorageSync("UserInfo").UserID, o = e.apiurl + "/order/api/OrderInfo/RefundOrder", s = new Object();
        if (s.CustID = a, s.ReturnNo = "", 0 == this.data.index ? s.ReturnType = 1 : s.ReturnType = 2, 
        s.RetuenMoney = this.data.PayAmount, s.ReturnReason = this.data.ReturnReason, s.ReturnRemark = "", 
        0 == this.data.TempPics.length && (s.PhotoVoucher = ""), s.AskUser = n, s.HandleStatus = 0, 
        s.HandleUser = 0, s.OrderID = this.data.OrderID, s.ExpressCompany = this.data.ExpressCompany, 
        s.ExpressNo = this.data.ExpressNo, 1 == PartEnable) {
            for (var r = new Array(), i = 0; i < this.data.GoodsList.length; i++) for (var d = 0; d < this.data.pids.length; d++) this.data.GoodsList[i].ProductID == this.data.pids[d] && r.push(this.data.GoodsList[i]);
            s.ReturnGoodsInfoList = r;
        } else s.ReturnGoodsInfoList = this.data.GoodsList;
        wx.showModal({
            title: "申请退款",
            content: "确定申请退款吗？",
            success: function(t) {
                t.confirm && wx.request({
                    url: o,
                    data: s,
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded",
                        X_ManuName: getApp().globalData.manuName
                    },
                    success: function(t) {
                        1200 == t.data.code && (wx.showToast({
                            title: "申请退款成功",
                            duration: 2e3
                        }), wx.switchTab({
                            url: "/pages/myorders/myorders"
                        }));
                    },
                    fail: function() {
                        wx.showToast({
                            title: "申请退款失败",
                            duration: 2e3
                        });
                    },
                    complete: function() {}
                });
            }
        });
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        });
        var e = this, a = getApp().globalData, n = a.custID, o = a.apiurl + "/order/api/OrderInfo/GetEnableRefundProduct";
        wx.request({
            url: o,
            data: {
                custId: n,
                orderId: t.OrderID
            },
            method: "GET",
            header: {
                "content-type": "application/json",
                X_ManuName: a.manuName
            },
            success: function(t) {
                for (var a = t.data.content, n = new Array(), o = 0; o < a.OrderDetails.length; o++) {
                    var s = new Object();
                    s.CustID = a.OrderDetails[o].CustID, s.HandleStatus = 0, s.Sort = 0, s.ProductID = a.OrderDetails[o].ProductId, 
                    s.GoodsID = a.OrderDetails[o].GoodsID, s.ReturnOrderID = 0, n.push(s);
                }
                e.setData({
                    StatusStr: a.StatusStr,
                    OrderDetails: a.OrderDetails,
                    GoodsNum: a.GoodsNum,
                    PayAmount: a.PayAmount,
                    YunMoney: a.YunMoney,
                    OrderID: a.OrderID,
                    CreateTime: a.CreateTime,
                    PayTime: a.PayTime,
                    PartOrderRefundEnable: a.OrderSet.PartOrderRefundEnable,
                    GoodsList: n
                }), wx.hideLoading();
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "获取订单详情失败",
                    duration: 2e3
                });
            },
            complete: function() {}
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