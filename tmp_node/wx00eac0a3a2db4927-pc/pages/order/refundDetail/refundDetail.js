function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../store")), a = e(require("../../../utils/create")), n = require("../../../api/apiInstance.js"), i = getApp();

(0, a.default)(t.default, {
    properties: {},
    data: {
        navH: i.globalData.navH,
        status: i.globalData.status,
        cartPage: "退款详情",
        detailInfo: {},
        refundTip: "",
        refundCause: "",
        firstDate: "",
        secondDate: "",
        secondCircle: !1,
        lastDate: "",
        lastCircle: !1,
        amountMoney: "",
        isShowCancel: !1,
        isShowAppeal: !1,
        reason: ""
    },
    onLoad: function(e) {
        this.initDetail(e.orderUuid);
    },
    initDetail: function(e) {
        var t = this, a = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: e
        };
        (0, n.getOrderDetail)(a, function(e) {
            1 === e.errcode && (t.setData({
                detailInfo: e.data
            }), t.setDataUi());
        });
    },
    setDataUi: function() {
        var e = this.getTime(this.data.detailInfo.orderRefunds.createdAt), t = this.data.detailInfo.orderRefunds.reason, a = "", n = "", i = "", s = !1, d = !1, r = !1, o = !1;
        switch (i = 3 == this.data.detailInfo.order.status ? this.data.detailInfo.order.transactionFee / 100 : (this.data.detailInfo.order.transactionFee - this.data.detailInfo.order.deliverFee) / 100, 
        this.data.detailInfo.orderRefunds.status) {
          case -1:
            s = !0, r = !0, o = !0, this.data.refundCause = "不同意退款", this.data.refundTip = "商家已驳回，如有异议，请在48小时内发起平台申诉，48小时后未处理，平台将自动关闭申请!", 
            a = this.getTime(this.data.detailInfo.orderRefunds.dealAt);
            break;

          case 0:
            r = !0, o = !0, this.data.refundCause = "等待处理", this.data.refundTip = "退款申请中 等待商家受理...";
            break;

          case 1:
            s = !0, this.data.refundCause = "同意退款", this.data.refundTip = "商家已退款，货款请注意查收...", 
            a = this.getTime(this.data.detailInfo.orderRefunds.dealAt);
            break;

          case 2:
            1 == this.data.detailInfo.order.isRefund ? (r = !0, o = !0, this.data.refundCause = "不同意退款", 
            this.data.refundTip = "商家已驳回，如有异议，请在48小时内发起平台申诉，48小时后未处理，平台将自动关闭申请!") : 2 == this.data.detailInfo.order.isRefund && (r = !1, 
            o = !1, this.data.refundCause = "同意退款", this.data.refundTip = "商家已退款，货款请注意查收..."), 
            s = !0, d = !0, a = this.getTime(this.data.detailInfo.orderRefunds.dealAt), n = this.getTime(this.data.detailInfo.orderRefunds.refundAt);
        }
        this.setData({
            refundCause: this.data.refundCause,
            refundTip: this.data.refundTip,
            firstDate: e,
            secondDate: a,
            lastDate: n,
            amountMoney: i,
            reason: t,
            secondCircle: s,
            lastCircle: d,
            isShowCancel: r,
            isShowAppeal: o
        });
    },
    getTime: function(e) {
        10 === (e + "").length && (e = 1e3 * +e);
        var t = new Date(e), a = t.getFullYear(), n = t.getMonth() + 1;
        n = n < 10 ? "0" + n : n;
        var i = t.getDate();
        i = i < 10 ? "0" + i : i;
        var s = t.getHours();
        s = s < 10 ? "0" + s : s;
        var d = t.getMinutes();
        return d = d < 10 ? "0" + d : d, a + "-" + n + "-" + i + " " + s + ":" + d;
    },
    onCancel: function() {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "是否取消申请退款？",
            success: function(t) {
                t.confirm && e.cancelRefund();
            }
        });
    },
    cancelRefund: function() {
        var e = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: this.data.detailInfo.order.orderSubUuid
        };
        (0, n.getCancelRefund)(e, function(e) {
            if (1 === e.errcode) {
                var t = getCurrentPages(), a = t[t.length - 2];
                a.nextRefresh(), "订单详情" == a.data.cartPage && t[t.length - 3].nextRefresh(), wx.showToast({
                    title: "已经取消退款申请",
                    icon: "none",
                    duration: 3e3
                }), wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    callPhone: function(e) {
        var t = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: t
        });
    }
});