function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../store")), e = require("../../../utils/stringUtil"), s = t(require("../../../utils/create")), i = require("../../../api/apiInstance.js"), o = require("../../../utils/distribution"), r = getApp();

(0, s.default)(a.default, {
    properties: {},
    data: {
        navH: r.globalData.navH,
        status: r.globalData.status,
        cartPage: "订单详情",
        statusTitle: "",
        statusRemark: "",
        grayText: "",
        twoGrayText: "",
        threeGrayText: "",
        yellowText: "",
        orderStatus: "",
        deliveryText: "",
        detailInfo: {},
        shareGroupUuid: "",
        isShareGroup: !1,
        isShowGray: !1,
        isTwoShowGray: !1,
        isThreeShowGray: !1,
        isShowYellow: !1,
        orderUuid: "",
        goodType: 1,
        lotteryStatus: "",
        lotteryResult: "",
        freeDay: "0",
        freeHour: "00",
        freeMinute: "00",
        freeSecond: "00",
        luckNumber: "0",
        isShowLoad: !1,
        interval: null
    },
    copyClick: function() {
        var t = "订单编号:" + this.data.detailInfo.order.orderSubUuid;
        wx.setClipboardData({
            data: t,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        wx.showToast({
                            title: "复制成功",
                            icon: "none",
                            duration: 3e3
                        });
                    }
                });
            }
        });
    },
    onLoad: function(t) {
        void 0 !== t.isShareGroup && this.setData({
            isShareGroup: t.isShareGroup
        }), this.setData({
            orderUuid: t.orderUuid,
            goodType: parseInt(t.goodType)
        }), this.initDetail(this.data.orderUuid);
    },
    initDetail: function(t) {
        var a = this;
        this.setData({
            isShowLoad: !0
        });
        var e = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: t
        };
        (0, i.getOrderDetail)(e, function(t) {
            1 === t.errcode && (a.setData({
                detailInfo: t.data
            }), void 0 !== t.data.exemptionGroup && a.setData({
                shareGroupUuid: t.data.exemptionGroup.groupUuid
            }), 2 == a.data.goodType ? (0, o.initQrCode)(a, "pages/freeGoodDetail/freeGoodDetail", "goodsUuid", a.data.detailInfo.goods[0].goodsUuid) : (0, 
            o.initQrCode)(a, "pages/goodDetail/goodDetail", "goodsUuid", a.data.detailInfo.goods[0].goodsUuid), 
            a.setLogistics(), a.setOrderStatus(), a.setGroupResult(), a.setGroupStatus()), a.setData({
                isShowLoad: !1
            });
        });
    },
    setLogistics: function() {
        1 == this.data.detailInfo.order.deliverType ? 0 == this.data.detailInfo.order.deliverFee ? this.setData({
            deliveryText: "快递 免邮"
        }) : this.setData({
            deliveryText: "快递 ¥ " + this.data.detailInfo.order.deliverFee / 100
        }) : 0 == this.data.detailInfo.order.deliverFee ? this.setData({
            deliveryText: "商家配送 费用另计"
        }) : this.setData({
            deliveryText: "商家配送 ¥ " + this.data.detailInfo.order.deliverFee / 100
        });
    },
    setOrderStatus: function() {
        switch (this.data.detailInfo.order.status) {
          case 0:
            this.data.statusTitle = "订单已失效！", this.data.statusRemark = "请重新购买下单哟、、、", this.data.orderStatus = "无效", 
            this.data.grayText = "", this.data.yellowText = "", this.data.isShowGray = !1, this.data.isTwoShowGray = !1, 
            this.data.isThreeShowGray = !1, this.data.isShowYellow = !1;
            break;

          case 1:
            var t = "去付款";
            1 == this.data.goodType ? (this.data.statusTitle = "订单还没付款哦", this.data.statusRemark = "立即付款享受预定发货、、、", 
            2 == this.data.detailInfo.order.payType && (t = "付定金")) : (this.data.statusTitle = "订单还没付款哦", 
            this.data.statusRemark = "立即付款享受预定发货、、、"), this.data.orderStatus = "等待付款", this.data.grayText = "取消订单", 
            this.data.yellowText = t, this.data.isShowGray = !0, this.data.isTwoShowGray = !1, 
            this.data.isThreeShowGray = !1, this.data.isShowYellow = !0;
            break;

          case 2:
            1 == this.data.goodType ? (this.data.statusTitle = "支付成功！", this.data.statusRemark = "请您耐心等待哟、、、") : (this.data.statusTitle = "支付成功！", 
            this.data.statusRemark = "或许您就是被上天选中的、、、"), this.data.orderStatus = "支付成功", this.data.grayText = "", 
            this.data.yellowText = "", this.data.isShowGray = !1, this.data.isTwoShowGray = !1, 
            this.data.isThreeShowGray = !1, this.data.isShowYellow = !1;
            break;

          case 3:
            var a = "申请退款", e = !1;
            if (1 == this.data.goodType) this.data.statusTitle = "商家积极配货中", this.data.statusRemark = "请您耐心等待哟、、、", 
            this.data.isTwoShowGray = !0, 0 != this.data.detailInfo.order.isRefund && (a = "查看申请"), 
            2 == this.data.detailInfo.order.payType && 1 == this.data.detailInfo.order.isReceive && 1 == this.data.detailInfo.order.isPay && (e = !0, 
            this.data.yellowText = "付尾款"); else switch (this.data.yellowText = "", this.data.detailInfo.order.groupStatus) {
              case 9:
                this.data.statusTitle = "人数不足免单失败", this.data.statusRemark = "商家正在积极配货中", this.data.isTwoShowGray = !0, 
                0 != this.data.detailInfo.order.isRefund && (a = "查看申请");
                break;

              case 10:
                this.data.isTwoShowGray = !1, 1 == this.data.detailInfo.order.isWinning ? (this.data.statusTitle = "恭喜中奖啦！", 
                2 == this.data.detailInfo.order.isRefund ? this.data.statusRemark = "货款已退还" : this.data.statusRemark = "货款将在24小时内退还！") : (this.data.statusTitle = "您的幸运数字", 
                this.data.statusRemark = "很抱歉上天没选中您、、、", this.data.luckNumber = this.data.detailInfo.order.luckNum);
            }
            this.data.orderStatus = "待发货", this.data.grayText = "提醒发货", this.data.twoGrayText = a, 
            this.data.isShowGray = !0, this.data.isThreeShowGray = !1, this.data.isShowYellow = e;
            break;

          case 4:
            a = "申请退款";
            if (1 == this.data.goodType) this.data.statusTitle = "货品已包装完成", this.data.isTwoShowGray = !0, 
            0 != this.data.detailInfo.order.isRefund && (a = "查看申请"); else switch (this.data.detailInfo.order.groupStatus) {
              case 9:
                this.data.statusTitle = "货品已包装完成", this.data.isTwoShowGray = !0, 0 != this.data.detailInfo.order.isRefund && (a = "查看申请");
                break;

              case 10:
                this.data.isTwoShowGray = !1, 1 == this.data.detailInfo.order.isWinning ? this.data.statusTitle = "恭喜中奖啦！货品已打包！" : this.data.statusTitle = "货品已包装完成";
            }
            1 == this.data.detailInfo.order.deliverType ? this.data.isThreeShowGray = !0 : this.data.isThreeShowGray = !1, 
            this.data.statusRemark = "商家正在努力为您配送中、、、", this.data.orderStatus = "待收货", this.data.grayText = "联系商家", 
            this.data.yellowText = "确认收货", this.data.twoGrayText = a, this.data.threeGrayText = "查看物流", 
            this.data.isShowGray = !0, this.data.isShowYellow = !0;
            break;

          case 5:
            a = "申请退款";
            if (1 == this.data.goodType) this.data.statusTitle = "收到宝贝的您", this.data.isTwoShowGray = !0, 
            0 != this.data.detailInfo.order.isRefund && (a = "查看申请"); else switch (this.data.detailInfo.order.groupStatus) {
              case 9:
                this.data.statusTitle = "收到宝贝的您", this.data.isTwoShowGray = !0, 0 != this.data.detailInfo.order.isRefund && (a = "查看申请");
                break;

              case 10:
                this.data.isTwoShowGray = !1, 1 == this.data.detailInfo.order.isWinning ? this.data.statusTitle = "恭喜中奖啦！收到宝贝的您" : this.data.statusTitle = "收到宝贝的您";
            }
            1 == this.data.detailInfo.order.deliverType ? this.data.isThreeShowGray = !0 : this.data.isThreeShowGray = !1, 
            this.data.statusRemark = "动动手分享您宝贵的意见、、、", this.data.orderStatus = "待评价", this.data.grayText = "联系商家", 
            this.data.yellowText = "去评价", this.data.twoGrayText = a, this.data.threeGrayText = "查看物流", 
            this.data.isShowGray = !0, this.data.isShowYellow = !0;
            break;

          case 6:
            a = "申请退款";
            1 == this.data.goodType ? (this.data.isTwoShowGray = !0, 0 != this.data.detailInfo.order.isRefund && (a = "查看申请"), 
            this.data.twoGrayText = a) : (this.data.isTwoShowGray = !1, this.data.twoGrayText = ""), 
            this.data.statusTitle = "愉快的购物体验需要分享", this.data.statusRemark = "写篇尚文分享下您的购物体验、、、", 
            this.data.orderStatus = "交易完成", this.data.grayText = "删除订单", this.data.yellowText = "联系售后", 
            this.data.threeGrayText = "", this.data.isShowGray = !0, this.data.isThreeShowGray = !1, 
            this.data.isShowYellow = !0;
            break;

          case 7:
          case 8:
            this.data.yellowText = "";
            var a = "申请退款", e = !1;
            this.data.statusTitle = "您的幸运数字", this.data.statusRemark = "或许您就是被上天选中的、、、", this.data.isTwoShowGray = !1, 
            this.data.luckNumber = this.data.detailInfo.order.luckNum, this.data.orderStatus = "待发货", 
            this.data.grayText = "提醒发货", this.data.twoGrayText = a, this.data.isShowGray = !1, 
            this.data.isThreeShowGray = !1, this.data.isShowYellow = e;
        }
        this.setData({
            statusTitle: this.data.statusTitle,
            statusRemark: this.data.statusRemark,
            orderStatus: this.data.orderStatus,
            grayText: this.data.grayText,
            yellowText: this.data.yellowText,
            twoGrayText: this.data.twoGrayText,
            threeGrayText: this.data.threeGrayText,
            isShowGray: this.data.isShowGray,
            isTwoShowGray: this.data.isTwoShowGray,
            isThreeShowGray: this.data.isThreeShowGray,
            isShowYellow: this.data.isShowYellow,
            luckNumber: this.data.luckNumber
        });
    },
    onGrayClick: function() {
        var t = this, a = this.data.detailInfo.order, e = a.orderSubUuid;
        switch (a.status) {
          case 1:
            wx.showModal({
                title: "提示",
                content: "是否确认取消此订单?",
                success: function(a) {
                    a.confirm && t.cancelUser(e);
                }
            });
            break;

          case 3:
            this.remindShip(e);
            break;

          case 4:
          case 5:
            this.afterSale(this.data.detailInfo.shop.phone);
            break;

          case 6:
            wx.showModal({
                title: "提示",
                content: "是否确认删除此订单?",
                success: function(a) {
                    a.confirm && t.orderDelete(e);
                }
            });
        }
    },
    onTwoGrayClick: function() {
        var t = this.data.detailInfo.order;
        switch (t.status) {
          case 3:
          case 4:
          case 5:
          case 6:
            0 == t.isRefund ? wx.navigateTo({
                url: "/pages/order/refund/refund?orderUuid=" + t.orderSubUuid
            }) : wx.navigateTo({
                url: "/pages/order/refundDetail/refundDetail?orderUuid=" + t.orderSubUuid
            });
        }
    },
    onThreeGrayClick: function() {
        var t = this.data.detailInfo.order;
        switch (t.status) {
          case 4:
          case 5:
            wx.navigateTo({
                url: "/pages/mine/messages/serviceMessage/serviceMessage?orderUuid=" + t.orderSubUuid + "&imageUrl=" + encodeURIComponent(this.data.detailInfo.goods[0].coversArray[0])
            });
        }
    },
    onRedClick: function() {
        var t = this, a = this.data.detailInfo.order, e = a.orderSubUuid;
        switch (a.status) {
          case 1:
            2 == this.data.goodType && void 0 !== this.data.detailInfo.exemptionGroup && 1 == this.data.detailInfo.exemptionGroup.isFull ? wx.showModal({
                title: "提示",
                content: "您参与的免单团人数已满，是否重新开启新团购买?",
                success: function(e) {
                    e.confirm && t.onCodePay(a);
                }
            }) : this.onCodePay(a);
            break;

          case 3:
            this.onCodePay(a);
            break;

          case 4:
            wx.showModal({
                title: "提示",
                content: "是否确认已经收到了商品?",
                success: function(a) {
                    a.confirm && t.userReceive(e);
                }
            });
            break;

          case 5:
            wx.navigateTo({
                url: "/pages/order/evaluation/evaluation?orderUuid=" + e
            });
            break;

          case 6:
            this.afterSale(this.data.detailInfo.shop.phone);
        }
    },
    remindShip: function(t) {
        var a = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: t
        };
        (0, i.getShopSend)(a, function(t) {
            1 === t.errcode && wx.showToast({
                title: "已经提醒商家马上发货了",
                icon: "none",
                duration: 3e3
            });
        });
    },
    userReceive: function(t) {
        var a = this, e = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: t
        };
        (0, i.getUserReceive)(e, function(e) {
            if (1 === e.errcode) {
                a.initDetail(t);
                var s = getCurrentPages();
                s[s.length - 2].nextRefresh(), wx.showToast({
                    title: "确定收货成功",
                    icon: "none",
                    duration: 3e3
                });
            }
        });
    },
    cancelUser: function(t) {
        var a = this, e = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: t
        };
        (0, i.getCancelUser)(e, function(e) {
            if (1 === e.errcode) {
                a.initDetail(t);
                var s = getCurrentPages();
                s[s.length - 2].nextRefresh(), wx.showToast({
                    title: "取消订单成功",
                    icon: "none",
                    duration: 3e3
                });
            }
        });
    },
    orderDelete: function(t) {
        var a = this, e = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: t
        };
        (0, i.getOrderDelete)(e, function(e) {
            if (1 === e.errcode) {
                a.initDetail(t);
                var s = getCurrentPages();
                s[s.length - 2].nextRefresh(), wx.showToast({
                    title: "删除订单成功",
                    icon: "none",
                    duration: 3e3
                });
            }
        });
    },
    onCodePay: function(t) {
        var a = this;
        wx.login({
            success: function(e) {
                a.toPay(t, e.code);
            }
        });
    },
    toPay: function(t, a) {
        var s = this, o = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: t.orderSubUuid,
            channel: "WX_MINI",
            code: a
        };
        if (1 === t.payType) o.payType = 3; else switch (t.isPay) {
          case 0:
            o.payType = 2;
            break;

          case 1:
            o.payType = 1;
        }
        (0, i.getOrderPay)(o, function(a) {
            1 === a.errcode && (0, e.prePay)(a.data, function() {
                wx.showToast({
                    title: "支付成功",
                    icon: "none",
                    duration: 3e3
                }), s.initDetail(t.orderSubUuid);
                var a = getCurrentPages();
                a[a.length - 2].nextRefresh();
            }, function() {});
        });
    },
    onCourierMobile: function() {
        this.afterSale(this.data.detailInfo.order.courierMobile);
    },
    setGroupResult: function() {
        if (1 != this.data.goodType) {
            switch (this.data.detailInfo.order.status) {
              case 1:
              case 7:
              case 8:
                void 0 !== this.data.detailInfo.exemptionGroup && 0 == this.data.detailInfo.exemptionGroup.isFull ? (this.data.lotteryStatus = "", 
                this.data.lotteryResult = "凑齐人数，提前开奖") : (this.data.lotteryStatus = "待开奖", this.data.lotteryResult = "人数已满，等待开奖");
            }
            switch (this.data.detailInfo.order.groupStatus) {
              case 9:
                this.data.lotteryStatus = "开奖失败", this.data.lotteryResult = "人数不足，免单失败，按原价购买商品";
                break;

              case 10:
                this.data.lotteryStatus = "已开奖", 0 == this.data.detailInfo.order.isWinning ? this.data.lotteryResult = "未中奖，按原价购买商品" : 2 == this.data.detailInfo.order.isRefund ? this.data.lotteryResult = "已中奖，货款已退还" : this.data.lotteryResult = "已中奖，货款24小时内返还";
            }
            this.setData({
                lotteryStatus: this.data.lotteryStatus,
                lotteryResult: this.data.lotteryResult
            });
        }
    },
    setGroupStatus: function() {
        var t = this;
        if (1 != this.data.goodType) switch (this.data.detailInfo.order.status) {
          case 7:
          case 8:
            void 0 !== this.data.detailInfo.exemptionGroup && 0 == this.data.detailInfo.exemptionGroup.isFull && (null == this.data.interval && (this.data.interval = setInterval(function() {
                t.setFreeDay();
            }, 1e3)), this.setFreeDay());
        }
    },
    onShareAppMessage: function(t) {
        if ("{}" != JSON.stringify(this.data.detailInfo)) {
            var a;
            if (1 == this.data.goodType) return a = "/pages/goodDetail/goodDetail", (0, o.onSharePage)(this, a, "goodsUuid", this.data.detailInfo.goods[0].goodsUuid, {
                title: this.data.detailInfo.shop.name,
                desc: this.data.detailInfo.goods[0].title,
                imageUrl: this.data.detailInfo.goods[0].coversArray[0]
            });
            a = "/pages/freeGoodDetail/freeGoodDetail";
            var e = {
                accesstoken: this.store.data.userInfo.accesstoken,
                orderUuid: this.data.orderUuid
            };
            (0, i.getExemptShare)(e, function(t) {}), this.setData({
                isShareGroup: !1
            });
            var s = (0, o.onSharePage)(this, a, "goodsUuid", this.data.detailInfo.goods[0].goodsUuid, {
                title: this.data.detailInfo.shop.name,
                desc: this.data.detailInfo.goods[0].title,
                imageUrl: this.data.detailInfo.goods[0].coversArray[0]
            });
            return void 0 !== this.data.detailInfo.exemptionGroup && (s.path = s.path + "&shareGroupUuid=" + this.data.detailInfo.exemptionGroup.groupUuid), 
            s;
        }
    },
    setFreeDay: function() {
        var t = new Date().getTime(), a = this.data.detailInfo.exemptionGroup.expirationTime - t;
        a < 0 && null == this.data.interval && clearInterval(this.data.interval);
        var e, s, i, o = a / 864e5, r = a % 864e5 / 36e5, d = a % 864e5 % 36e5 / 6e4, h = a % 864e5 % 36e5 % 6e4 / 1e3;
        e = r < 10 ? "0" + parseInt(r) : "" + parseInt(r), s = d < 10 ? "0" + parseInt(d) : "" + parseInt(d), 
        i = h < 10 ? "0" + parseInt(h) : "" + parseInt(h), this.setData({
            freeDay: parseInt(o),
            freeHour: e,
            freeMinute: s,
            freeSecond: i
        });
    },
    nextRefresh: function() {
        this.initDetail(this.data.detailInfo.order.orderSubUuid);
    },
    onUnload: function() {
        null != this.data.interval && clearInterval(this.data.interval);
    },
    afterSale: function(t) {
        wx.makePhoneCall({
            phoneNumber: t
        });
    }
});