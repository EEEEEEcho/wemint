var e = require("../../utils/server"), t = (require("../../config.js"), {});

Page({
    data: {
        category: [ "全部", "待付款", "待受理", "待收货", "待评价" ],
        _choose: "全部",
        orderList: [],
        isEmpty: !1,
        page: 1,
        shopTel: !1
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "我的订单"
        });
        var t = wx.getStorageSync("isAuth");
        this.setData({
            isAuth: t
        });
    },
    onShow: function() {
        var e = this, t = wx.getStorageSync("isAuth");
        if (this.setData({
            isAuth: t
        }), t) {
            var a = {
                target: {
                    dataset: {
                        category: this.data._choose
                    }
                }
            };
            this.headerPromise().then(function(t) {
                t && e.changeCategory(a);
            });
        }
    },
    onReachBottom: function() {
        if (!this.data.noMore) {
            var e = this.data.page + 1, t = {
                page: e
            };
            switch (this.data._choose) {
              case "全部":
                break;

              case "待付款":
                t.pay_status = 1;
                break;

              case "待受理":
                t.state = 2, t.pay_status = 2;
                break;

              case "待收货":
                t.state = 2;
                break;

              case "待评价":
                t.is_commented = 1;
            }
            this.getOrderList(t), this.setData({
                page: e
            });
        }
    },
    changeCategory: function(e) {
        var t = e.target.dataset.category, a = {};
        switch (t) {
          case "全部":
            break;

          case "待付款":
            a.pay_status = 1;
            break;

          case "待受理":
            a.state = 1, a.pay_status = 2;
            break;

          case "待收货":
            a.state = "2,3";
            break;

          case "待评价":
            a.is_commented = 1;
        }
        this.setData({
            _choose: t
        }), this.getOrderList(a);
    },
    refreshOrder: function(e) {
        var t = {};
        switch (this.data._choose) {
          case "全部":
            break;

          case "待付款":
            t.pay_status = 1;
            break;

          case "待受理":
            t.state = 1, t.pay_status = 2;
            break;

          case "待收货":
            t.state = "2,3";
            break;

          case "待评价":
            t.is_commented = 1;
        }
        this.getOrderList(t);
    },
    toBindTel: function(e) {
        wx.navigateTo({
            url: "../bindTel/bindTel"
        });
    },
    toIndex: function(e) {
        wx.switchTab({
            url: "../index/index"
        });
    },
    callTel: function(e) {
        var t = this;
        wx.makePhoneCall({
            phoneNumber: t.data.nowShopTel
        });
    },
    orderTap: function(a) {
        var s = a.target.dataset.pay, r = a.target.dataset.state, o = a.target.dataset.commented, i = a.target.dataset.id, n = a.target.dataset.tel, c = a.target.dataset.name, d = a.target.dataset.num;
        if (2 == s) switch (r) {
          case 1:
          case 2:
            this.setData({
                shopTel: !0,
                nowShopTel: n
            });
            break;

          case 3:
            wx.navigateTo({
                url: "../orderDetail/orderDetail?orderId=" + i
            });
            break;

          case 4:
            switch (o) {
              case 1:
                wx.navigateTo({
                    url: "../orderRemark/orderRemark?num=" + d + "&name=" + c
                });
                break;

              case 2:
                wx.navigateTo({
                    url: "../orderDetail/orderDetail?orderId=" + i
                });
            }
            break;

          case 5:
            wx.navigateTo({
                url: "../orderDetail/orderDetail?orderId=" + i
            });
        } else if (1 == s) {
            var g = {
                order_id: i,
                openid: wx.getStorageSync("openId")
            };
            e.getApiJSON("/api/mini/getOrderPayUrl", g, function(e) {
                if (1003 == e.data.code) {
                    var t = JSON.parse(e.data.data);
                    wx.requestPayment({
                        timeStamp: t.timeStamp,
                        nonceStr: t.nonceStr,
                        package: t.package,
                        signType: t.signType,
                        paySign: t.paySign,
                        success: function(e) {
                            getApp().showAndHideToast("支付成功");
                        },
                        fail: function(e) {
                            wx.showModal({
                                title: "支付失败",
                                content: ""
                            });
                        }
                    });
                } else getApp().showAndHideToast(e.data.msg);
            }, t);
        }
    },
    closeMask: function(e) {
        this.setData({
            shopTel: !1
        });
    },
    handleTap: function(e) {},
    toOrderDetail: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../orderDetail/orderDetail?orderId=" + t
        });
    },
    toShop: function(e) {
        var t = e.currentTarget.dataset.shop.shop_token, a = e.currentTarget.dataset.shop.shop_id;
        wx.navigateTo({
            url: "../shopDetail/shopDetail?shoptoken=" + t + "&shopid=" + a
        });
    },
    initData: function(e, t) {
        e.length <= 0 && 0 == t ? this.setData({
            isEmpty: !0
        }) : e.length > 0 && 0 == t ? this.setData({
            isEmpty: !1
        }) : 1 == t && this.setData({
            isEmpty: !1
        });
        for (var a in e) {
            var s = new Date(1e3 * e[a].create_time), r = s.getFullYear() + "-", o = (s.getMonth() + 1 < 10 ? "0" + (s.getMonth() + 1) : s.getMonth() + 1) + "-", i = (s.getDate() + 1 < 10 ? "0" + s.getDate() : s.getDate()) + " ", n = (s.getHours() + 1 < 10 ? "0" + s.getHours() : s.getHours()) + ":", c = (s.getMinutes() + 1 < 10 ? "0" + s.getMinutes() : s.getMinutes()) + ":", d = s.getSeconds() + 1 < 10 ? "0" + s.getSeconds() : s.getSeconds();
            if (e[a].create_time = r + o + i + n + c + d, "" == e[a].shop_info.logo_path ? e[a].shop_info.logo_path = "../../images/logo_100.png" : e[a].shop_info.logo_path = "https://up-img.0xiao.cn" + e[a].shop_info.logo_path, 
            2 == e[a].pay_status) switch (e[a].state) {
              case 1:
                e[a].stateText = "待受理", e[a].orderNote = "询问";
                break;

              case 2:
                e[a].stateText = "已受理", e[a].orderNote = "询问";
                break;

              case 3:
                e[a].stateText = "配送中", e[a].orderNote = "追踪";
                break;

              case 4:
                switch (e[a].is_commented) {
                  case 1:
                    e[a].stateText = "待评价", e[a].orderNote = "点评";
                    break;

                  case 2:
                    e[a].stateText = "已完成", e[a].orderNote = "查看";
                }
                break;

              case 5:
                e[a].stateText = "已撤销", e[a].orderNote = "查看";
            } else 5 == e[a].state ? e[a].stateText = "已撤销" : (e[a].stateText = "未支付", e[a].orderNote = "支付");
            switch (e[a].pay_method) {
              case 1:
                e[a].payWay = "货到付";
                break;

              case 2:
              case 3:
                e[a].payWay = "在线付";
                break;

              case 4:
                e[a].payWay = "会员付";
            }
        }
        return e;
    },
    getOrderList: function(a) {
        var s = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), e.getApiJSON("/api/goodsOrder/getOrderListByUser", a, function(e) {
            var t = e.data.data, a = !1;
            if (t.length < 15 && (a = !0), 1e3 == e.data.code) {
                var r = s.initData(t, 0);
                s.setData({
                    orderList: r,
                    noMore: a
                }), wx.hideLoading();
            } else wx.hideLoading(), getApp().showAndHideToast(e.data.msg);
        }, t);
    },
    headerPromise: function() {
        return new Promise(function(e, a) {
            t = {
                authorization: wx.getStorageSync("authorization")
            }, e(!0);
        });
    }
});