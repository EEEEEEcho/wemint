function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../store")), a = require("../../../utils/stringUtil"), o = e(require("../../../utils/create")), s = require("../../../api/apiInstance.js"), r = getApp();

(0, o.default)(t.default, {
    properties: {},
    data: {
        navH: r.globalData.navH,
        status: r.globalData.status,
        cartPage: "全部订单",
        orderList: [],
        userInfo: {},
        pageSize: 10,
        pageNum: 1,
        isLoad: !1,
        goodsName: "",
        orderUuid: "",
        isShowInput: !1,
        isShowLoad: !1,
        goodType: 1
    },
    onLoad: function(e) {
        this.setData({
            goodType: parseInt(e.goodType)
        }), this.getOrderQuery();
    },
    toPage: function(e) {
        var t = e.currentTarget.dataset.type, a = e.currentTarget.dataset.index, o = this.data.orderList[a].orderSubUuid, s = "";
        switch (t) {
          case "订单详情":
            s = "/pages/order/orderDetail/orderDetail?orderUuid=" + o + "&goodType=" + this.data.goodType;
        }
        wx.navigateTo({
            url: s
        });
    },
    getOrderQuery: function() {
        var e = this;
        this.setData({
            isShowLoad: !0
        });
        var t = {
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            accesstoken: this.store.data.userInfo.accesstoken,
            orderType: this.data.goodType
        };
        "" != this.data.orderUuid && (t.orderUuid = this.data.orderUuid), "" != this.data.goodsName && (t.goodsName = this.data.goodsName), 
        (0, s.getOrderQuery)(t, function(t) {
            if (wx.stopPullDownRefresh(), 1 === t.errcode) {
                var a = !0;
                t.pages > e.data.pageNum && (a = !1), e.setData({
                    orderList: t.data,
                    isLoad: a
                });
            }
            e.setData({
                isShowLoad: !1
            });
        });
    },
    onGrayClick: function(e) {
        var t = this, a = e.currentTarget.dataset.good, o = e.currentTarget.dataset.index, s = a.orderSubUuid;
        switch (a.status) {
          case 1:
            wx.showModal({
                title: "提示",
                content: "是否确认取消此订单?",
                success: function(e) {
                    e.confirm && t.cancelUser(s, o);
                }
            });
            break;

          case 2:
            break;

          case 3:
          case 7:
          case 8:
            this.remindShip(s);
            break;

          case 4:
          case 5:
            wx.navigateTo({
                url: "/pages/mine/messages/serviceMessage/serviceMessage?orderUuid=" + s + "&imageUrl=" + encodeURIComponent(a.goods[0].coversArray[0])
            });
            break;

          case 6:
            wx.showModal({
                title: "提示",
                content: "是否确认删除此订单?",
                success: function(e) {
                    e.confirm && t.orderDelete(s, o);
                }
            });
        }
    },
    onRedClick: function(e) {
        var t = this, a = e.currentTarget.dataset.good, o = e.currentTarget.dataset.index, s = a.orderSubUuid;
        switch (a.status) {
          case 1:
            2 == this.data.goodType && 1 == a.isFull ? wx.showModal({
                title: "提示",
                content: "您参与的免单团人数已满，是否重新开启新团购买?",
                success: function(e) {
                    e.confirm && t.onCodePay(a, o);
                }
            }) : this.onCodePay(a, o);
            break;

          case 2:
            break;

          case 3:
            1 == this.data.goodType && 2 == a.payType && 1 == a.isReceive && 1 == a.isPay && this.onCodePay(a, o);
            break;

          case 4:
            wx.showModal({
                title: "提示",
                content: "是否确认已经收到了商品?",
                success: function(e) {
                    e.confirm && t.userReceive(s, o);
                }
            });
            break;

          case 5:
            wx.navigateTo({
                url: "/pages/order/evaluation/evaluation?orderUuid=" + s
            });
            break;

          case 6:
            this.afterSale(a.shopPhone);
        }
    },
    remindShip: function(e) {
        var t = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: e
        };
        (0, s.getShopSend)(t, function(e) {
            1 === e.errcode && wx.showToast({
                title: "已经提醒商家马上发货了",
                icon: "none",
                duration: 3e3
            });
        });
    },
    userReceive: function(e, t) {
        var a = this, o = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: e
        };
        (0, s.getUserReceive)(o, function(e) {
            1 === e.errcode && (a.onPullDownRefresh(), wx.showToast({
                title: "确定收货成功",
                icon: "none",
                duration: 3e3
            }));
        });
    },
    cancelUser: function(e, t) {
        var a = this, o = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: e
        };
        (0, s.getCancelUser)(o, function(e) {
            1 === e.errcode && (a.onPullDownRefresh(), wx.showToast({
                title: "取消订单成功",
                icon: "none",
                duration: 3e3
            }));
        });
    },
    orderDelete: function(e, t) {
        var a = this, o = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: e
        };
        (0, s.getOrderDelete)(o, function(e) {
            1 === e.errcode && (a.onPullDownRefresh(), wx.showToast({
                title: "删除订单成功",
                icon: "none",
                duration: 3e3
            }));
        });
    },
    onCodePay: function(e, t) {
        var a = this;
        wx.login({
            success: function(o) {
                a.toPay(e, o.code, t);
            }
        });
    },
    getFocus: function() {
        this.setData({
            isShowInput: !0
        });
    },
    onSearch: function(e) {
        /^[0-9]+$/.test(e.detail.value) ? this.setData({
            orderUuid: e.detail.value,
            goodsName: "",
            isShowInput: !1
        }) : this.setData({
            orderUuid: "",
            goodsName: e.detail.value,
            isShowInput: !1
        }), this.onPullDownRefresh();
    },
    toPay: function(e, t, o) {
        var r = this, i = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: e.orderSubUuid,
            channel: "WX_MINI",
            code: t
        };
        if (1 === e.payType) i.payType = 3; else switch (e.isPay) {
          case 0:
            i.payType = 2;
            break;

          case 1:
            i.payType = 1;
        }
        (0, s.getOrderPay)(i, function(t) {
            1 === t.errcode && (0, a.prePay)(t.data, function() {
                r.onPullDownRefresh(), wx.showToast({
                    title: "支付成功",
                    icon: "none",
                    duration: 3e3
                }), wx.navigateTo({
                    url: "/pages/order/orderDetail/orderDetail?orderUuid=" + e.orderSubUuid + "&goodType=" + r.data.goodType
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
            var t = this.data.pageNum + 1;
            this.setData({
                pageNum: t
            });
            var a = {
                pageSize: this.data.pageSize,
                pageNum: this.data.pageNum,
                accesstoken: this.store.data.userInfo.accesstoken,
                orderType: this.data.goodType
            };
            "" != this.data.orderUuid && (a.orderUuid = this.data.orderUuid), "" != this.data.goodsName && (a.goodsName = this.data.goodsName), 
            (0, s.getOrderQuery)(a, function(a) {
                if (1 === a.errcode) {
                    var o = e.data.orderList.concat(a.data), s = !0;
                    a.pages > e.data.pageNum && (s = !1), e.setData({
                        orderList: o,
                        isLoad: s
                    });
                } else e.setData({
                    isLoad: !1,
                    pageNum: t - 1
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