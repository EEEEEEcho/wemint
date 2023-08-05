var e = require("../../utils/server"), t = (require("../../config.js"), {});

Page({
    data: {
        shopTel: !1
    },
    onLoad: function(o) {
        t = {
            authorization: wx.getStorageSync("authorization")
        }, wx.setNavigationBarTitle({
            title: "订单详情"
        });
        var s = {
            order_id: o.orderId,
            is_show_shop: 1,
            is_order_content: 1,
            is_order_item: 1
        }, r = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), e.getApiJSON("/api/goodsOrder/getOrderInfoByOrderId", s, function(e) {
            if (1e3 == e.data.code) {
                var t = e.data.data, o = r.initData(t);
                r.setData({
                    orderId: o.order_id,
                    shopName: o.shop_name,
                    orderNum: o.order_number,
                    orderTime: o.create_time,
                    userName: o.order_content.contact_name,
                    userTel: o.order_content.contact_tel,
                    nowShopTel: o.shop_tel,
                    userAddress: o.order_content.address,
                    description: o.order_content.description,
                    send_time: o.order_content.send_timeText,
                    sendWay: o.send_way,
                    order_item: o.order_item,
                    goodsSum: o.goodsSum,
                    total_price: o.total_price,
                    amount: o.amount,
                    discount: o.discount,
                    pakage: o.pakage,
                    distribution: o.distribution,
                    addition: o.addition,
                    deduction: o.deduction,
                    pay_methodText: o.pay_methodText,
                    isShowRefund: o.isShowRefund,
                    isShowAsk: o.isShowAsk,
                    isShowSure: o.isShowSure,
                    isShowUndo: o.isShowUndo,
                    isShowCommented: o.isShowCommented,
                    hadRefund: o.hadRefund,
                    _step: t._step
                }), wx.hideLoading();
            } else wx.hideLoading(), getApp().showAndHideToast(e.data.msg);
        }, t);
        var i = wx.getStorageSync("userInfo");
        this.setData({
            userName: i.userName,
            userTel: i.userTel,
            userAddress: i.userAddress
        }), wx.setNavigationBarTitle({
            title: "订单详情"
        });
    },
    callTel: function(e) {
        var t = this;
        wx.makePhoneCall({
            phoneNumber: t.data.nowShopTel
        });
    },
    handleTap: function(e) {},
    closeMask: function(e) {
        this.setData({
            shopTel: !1
        });
    },
    sureGoods: function() {
        var o = this, s = {
            order_id: this.data.orderId
        };
        wx.showLoading({
            title: "确认中",
            mask: !0
        }), e.postApiJSON("/api/goodsOrder/setOrderArrived", s, function(e) {
            1e3 == e.data.code ? (wx.hideLoading(), wx.navigateTo({
                url: "../orderRemark/orderRemark?name=" + o.data.shopName + "&num=" + o.data.orderNum
            })) : (wx.hideLoading(), getApp().showAndHideToast(e.data.msg));
        }, t);
    },
    initData: function(e) {
        e.create_time = this.stampTime(e.create_time), "" == e.order_content.description && (e.order_content.description = 0), 
        0 == e.order_content.send_time ? 3 == e.is_predict ? e.order_content.send_timeText = "尽快自提" : e.order_content.send_timeText = "尽快送达" : e.order_content.send_timeText = this.stampTime(e.order_content.send_time), 
        3 == e.is_predict ? e.send_way = "自提" : e.send_way = "送达", e.goodsSum = 0;
        for (var t in e.order_item) {
            if ("" == e.order_item[t].note) e.order_item[t].isShowGoodsNote = !1; else {
                var o = e.order_item[t].note.split("");
                for (var s in o) 1 == s ? e.order_item[t].note = o[s] : s > 1 && (e.order_item[t].note = e.order_item[t].note + o[s]);
                e.order_item[t].isShowGoodsNote = !0;
            }
            e.goodsSum = e.goodsSum + e.order_item[t].goods_num;
        }
        switch (e.isShowUndo = !1, e.hadRefund = !1, e.isShowCommented = !1, e.state) {
          case 1:
            e.isShowRefund = !0, e.isShowAsk = !0, e.isShowSure = !1, e._step = "step1";
            break;

          case 2:
            e.isShowRefund = !0, e.isShowAsk = !0, e.isShowSure = !0, e._step = "step2";
            break;

          case 3:
            e.isShowRefund = !1, e.isShowAsk = !0, e.isShowSure = !0, e._step = "step3";
            break;

          case 4:
            e.isShowRefund = !0, e.isShowAsk = !1, e.isShowSure = !1, e._step = "step4";
            break;

          case 5:
            e.isShowRefund = !1, e.isShowAsk = !1, e.isShowSure = !1, e.isShowUndo = !0, e._step = "step4";
        }
        switch (e.pay_status) {
          case 1:
            e.isShowRefund = !1, e.isShowSure = !1;
            break;

          case 2:
            e.isShowRefund = !0;
            break;

          case 3:
            e.isShowRefund = !1, e.isShowSure = !1, e.isShowAsk = !1, e.hadRefund = !0, e.isShowUndo = !1;
        }
        if (2 == e.pay_status) switch (e.pay_method) {
          case 1:
            e.pay_methodText = "线下支付", e.isShowRefund = !1;
            break;

          case 2:
            e.pay_methodText = "平台支付";
            break;

          case 3:
            e.pay_methodText = "快捷支付";
            break;

          case 4:
            e.pay_methodText = "会员支付";
        } else 1 == e.pay_status && (e.pay_methodText = "未支付");
        return 4 == e.state && 1 == e.is_commented && 2 == e.pay_status ? e.isShowCommented = !0 : e.isShowCommented = !1, 
        e;
    },
    openCallShop: function(e) {
        this.setData({
            shopTel: !0
        });
    },
    stampTime: function(e) {
        var t = new Date(1e3 * e);
        return t.getFullYear() + "-" + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-") + ((t.getDate() + 1 < 10 ? "0" + t.getDate() : t.getDate()) + " ") + ((t.getHours() + 1 < 10 ? "0" + t.getHours() : t.getHours()) + ":") + ((t.getMinutes() + 1 < 10 ? "0" + t.getMinutes() : t.getMinutes()) + ":") + (t.getSeconds() + 1 < 10 ? "0" + t.getSeconds() : t.getSeconds());
    },
    toRemark: function(e) {
        wx.navigateTo({
            url: "../orderRemark/orderRemark?name=" + e.target.dataset.name + "&num=" + e.target.dataset.num
        });
    }
});