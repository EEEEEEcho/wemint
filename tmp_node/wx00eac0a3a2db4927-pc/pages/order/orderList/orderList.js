function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("../../../store")), t = require("../../../utils/stringUtil"), s = e(require("../../../utils/create")), r = require("../../../api/apiInstance"), o = getApp();

(0, s.default)(a.default, {
    properties: {},
    data: {
        navH: o.globalData.navH,
        status: o.globalData.status,
        cartPage: "订单",
        orderList: [],
        userInfo: {},
        pageSize: 10,
        pageNum: 1,
        isLoad: !1,
        orderStatus: 0,
        isShowLoad: !1,
        goodType: 1
    },
    onReady: function() {},
    onLoad: function(e) {
        var a = "";
        switch (parseInt(e.orderStatus)) {
          case 0:
            a = "无效";
            break;

          case 1:
            a = "待付款";
            break;

          case 2:
            a = "支付成功";
            break;

          case 3:
            a = "待发货";
            break;

          case 4:
            a = "待收货";
            break;

          case 5:
            a = "待评价";
            break;

          case 6:
            a = "交易完成";
            break;

          case 7:
            a = "待分享";
            break;

          case 8:
            a = "待开奖";
        }
        this.setData({
            orderStatus: parseInt(e.orderStatus),
            cartPage: a,
            goodType: parseInt(e.goodType)
        }), this.getOrderQuery();
    },
    toPage: function(e) {
        var a = e.currentTarget.dataset.type, t = e.currentTarget.dataset.index, s = this.data.orderList[t].orderSubUuid, r = "";
        switch (a) {
          case "订单详情":
            r = "/pages/order/orderDetail/orderDetail?orderUuid=" + s + "&goodType=" + this.data.goodType;
        }
        wx.navigateTo({
            url: r
        });
    },
    getOrderQuery: function() {
        var e = this;
        this.setData({
            isShowLoad: !0
        });
        var a = {
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            accesstoken: this.store.data.userInfo.accesstoken,
            orderType: this.data.goodType,
            status: this.data.orderStatus
        };
        (0, r.getOrderQuery)(a, function(a) {
            if (wx.stopPullDownRefresh(), 1 === a.errcode) {
                var t = !0;
                a.pages > e.data.pageNum && (t = !1), e.setData({
                    orderList: a.data,
                    isLoad: t
                });
            }
            e.setData({
                isShowLoad: !1
            });
        });
    },
    onGrayClick: function(e) {
        var a = this, t = e.currentTarget.dataset.good, s = e.currentTarget.dataset.index, r = t.orderSubUuid;
        switch (t.status) {
          case 1:
            wx.showModal({
                title: "提示",
                content: "是否确认取消此订单?",
                success: function(e) {
                    e.confirm && a.cancelUser(r, s);
                }
            });
            break;

          case 2:
            break;

          case 3:
          case 7:
          case 8:
            this.remindShip(r);
            break;

          case 4:
          case 5:
            wx.navigateTo({
                url: "/pages/mine/messages/serviceMessage/serviceMessage?orderUuid=" + r + "&imageUrl=" + encodeURIComponent(t.goods[0].coversArray[0])
            });
            break;

          case 6:
            wx.showModal({
                title: "提示",
                content: "是否确认删除此订单?",
                success: function(e) {
                    e.confirm && a.orderDelete(r, s);
                }
            });
        }
    },
    onRedClick: function(e) {
        var a = this, t = e.currentTarget.dataset.good, s = e.currentTarget.dataset.index, r = t.orderSubUuid;
        switch (t.status) {
          case 1:
            2 == this.data.goodType && 1 == t.isFull ? wx.showModal({
                title: "提示",
                content: "您参与的免单团人数已满，是否重新开启新团购买?",
                success: function(e) {
                    e.confirm && a.onCodePay(t, s);
                }
            }) : this.onCodePay(t, s);
            break;

          case 2:
            break;

          case 3:
            1 == this.data.goodType && 2 == t.payType && 1 == t.isReceive && 1 == t.isPay && this.onCodePay(t, s);
            break;

          case 4:
            wx.showModal({
                title: "提示",
                content: "是否确认已经收到了商品?",
                success: function(e) {
                    e.confirm && a.userReceive(r, s);
                }
            });
            break;

          case 5:
            wx.navigateTo({
                url: "/pages/order/evaluation/evaluation?orderUuid=" + r
            });
            break;

          case 6:
            this.afterSale(t.shopPhone);
        }
    },
    remindShip: function(e) {
        var a = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: e
        };
        (0, r.getShopSend)(a, function(e) {
            1 === e.errcode && wx.showToast({
                title: "已经提醒商家马上发货了",
                icon: "none",
                duration: 3e3
            });
        });
    },
    userReceive: function(e, a) {
        var t = this, s = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: e
        };
        (0, r.getUserReceive)(s, function(e) {
            1 === e.errcode && (t.data.orderList.splice(a, 1), t.setData({
                orderList: t.data.orderList
            }), wx.showToast({
                title: "确定收货成功",
                icon: "none",
                duration: 3e3
            }));
        });
    },
    cancelUser: function(e, a) {
        var t = this, s = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: e
        };
        (0, r.getCancelUser)(s, function(e) {
            1 === e.errcode && (t.data.orderList.splice(a, 1), t.setData({
                orderList: t.data.orderList
            }), wx.showToast({
                title: "取消订单成功",
                icon: "none",
                duration: 3e3
            }));
        });
    },
    orderDelete: function(e, a) {
        var t = this, s = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: e
        };
        (0, r.getOrderDelete)(s, function(e) {
            1 === e.errcode && (t.data.orderList.splice(a, 1), t.setData({
                orderList: t.data.orderList
            }), wx.showToast({
                title: "删除订单成功",
                icon: "none",
                duration: 3e3
            }));
        });
    },
    onCodePay: function(e, a) {
        var t = this;
        wx.login({
            success: function(s) {
                t.toPay(e, s.code, a);
            }
        });
    },
    toPay: function(e, a, s) {
        var o = this, i = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: e.orderSubUuid,
            channel: "WX_MINI",
            code: a
        };
        if (1 === e.payType) i.payType = 3; else switch (e.isPay) {
          case 0:
            i.payType = 2;
            break;

          case 1:
            i.payType = 1;
        }
        (0, r.getOrderPay)(i, function(a) {
            1 === a.errcode && (0, t.prePay)(a.data, function() {
                o.data.orderList.splice(s, 1), o.setData({
                    orderList: o.data.orderList
                }), wx.showToast({
                    title: "支付成功",
                    icon: "none",
                    duration: 3e3
                }), wx.navigateTo({
                    url: "/pages/order/orderDetail/orderDetail?orderUuid=" + e.orderSubUuid + "&goodType=" + o.data.goodType
                });
            }, function() {});
        });
    },
    nextRefresh: function() {
        this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1
        }), this.getOrderQuery();
    },
    onReachBottom: function() {
        var e = this;
        if (!this.data.isLoad) {
            var a = this.data.pageNum + 1;
            this.setData({
                pageNum: a
            });
            var t = {
                pageSize: this.data.pageSize,
                pageNum: this.data.pageNum,
                accesstoken: this.store.data.userInfo.accesstoken,
                orderType: this.data.goodType,
                status: this.data.orderStatus
            };
            (0, r.getOrderQuery)(t, function(t) {
                if (1 === t.errcode) {
                    var s = e.data.orderList.concat(t.data), r = !0;
                    t.pages > e.data.pageNum && (r = !1), e.setData({
                        orderList: s,
                        isLoad: r
                    });
                } else e.setData({
                    isLoad: !1,
                    pageNum: a - 1
                });
            });
        }
    },
    afterSale: function(e) {
        wx.makePhoneCall({
            phoneNumber: e
        });
    }
});