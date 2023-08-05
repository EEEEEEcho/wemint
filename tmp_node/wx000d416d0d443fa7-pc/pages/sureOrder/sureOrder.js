var e = require("../../utils/server"), t = require("../../config.js"), a = {};

Page({
    data: {
        fee: 0,
        note: "",
        defaultNote: "备注、偏好要求等",
        goods: "",
        goodsPrice: 0,
        cosCost: 0,
        hadChooseTime: !1,
        chooseTime: "尽快送达",
        userInfo: {
            userName: "",
            userTel: "",
            userAddress: ""
        },
        preTime: 0,
        wayArray: [ "送达", "自提" ],
        wayIndex: 0,
        dayArray: [ "今天", "明天", "后天" ],
        dayIndex: 0,
        pay: "",
        errMsg: "",
        isUserInfo: 1,
        isNote: 0,
        hadOnline: !0,
        hadCash: !0,
        hadMember: !0
    },
    onLoad: function(e) {
        var t = wx.getStorageSync("isAuth");
        this.setData({
            isAuth: t,
            options: e
        }), wx.setNavigationBarTitle({
            title: e.shopname
        }), a = {
            authorization: wx.getStorageSync("authorization")
        }, this.initOrderInfo(e);
    },
    getUserInfo: function(e) {
        var t = this;
        wx.chooseAddress({
            success: function(e) {
                var a = {
                    userName: e.userName,
                    userTel: e.telNumber,
                    userAddress: e.provinceName + e.cityName + e.countyName + e.detailInfo
                };
                t.setData({
                    userInfo: a
                }), wx.setStorageSync("userInfo", a);
                var i = t.data.options;
                t.getPoint(a, i).then(function(e) {
                    e && t.changeOrderPrice();
                }), t.setData({
                    isUserInfo: 1
                });
            }
        });
    },
    chooseWay: function(e) {
        var t = +e.detail.value, a = this.data.time, i = this.data.todayTime, s = "";
        1 == t ? ("尽快送达" == a[0] && (a.shift(), i.shift()), this.setData({
            fee: 0,
            oldFee: this.data.fee,
            time: a,
            todayTime: i
        })) : 0 == t && (0 == this.data.dayIndex && (a.unshift("尽快送达"), i.unshift("尽快送达")), 
        this.setData({
            fee: this.data.oldFee,
            time: a,
            todayTime: i
        })), s = 0 == this.data.dayIndex ? i[0] : a[0], this.changeOrderPrice(), this.setData({
            wayIndex: e.detail.value,
            chooseTime: s
        });
    },
    chooseDay: function(e) {
        var t = [];
        0 != e.detail.value ? "尽快送达" == (t = this.data.time)[0] && t.shift() : t = this.data.todayTime, 
        this.setData({
            time: t,
            dayIndex: e.detail.value,
            chooseTime: t[0],
            hadChooseTime: !0
        });
    },
    chooseTime: function(e) {
        var t = [];
        t = 0 == this.data.dayIndex ? this.data.todayTime : this.data.time, this.setData({
            hadChooseTime: !0,
            chooseTime: t[e.detail.value]
        });
    },
    toInputNote: function(e) {
        this.setData({
            isNote: 1
        });
    },
    inputNote: function(e) {
        var t = e.detail.value.textarea;
        this.setData({
            note: t,
            defaultNote: t,
            isNote: 0
        });
    },
    closeNote: function(e) {
        this.setData({
            isNote: 0
        });
    },
    hanleTap: function(e) {},
    choosePayWay: function(e) {
        var t = this.data.pay, a = e.target.dataset.pay;
        t != a && (this.setData({
            pay: a
        }), this.changeOrderPrice(t, a));
    },
    showCard: function(e) {
        this.setData({
            isCard: 1
        });
    },
    closeCard: function(e) {
        this.setData({
            isCard: 0
        });
    },
    submitOrder: function(i) {
        if (wx.showLoading({
            title: "提交中",
            mask: !0
        }), 1 == this.data.isUserInfo) if (this.data.goodsPriceSum > 0) {
            var s = wx.getStorageSync("shopCar"), o = wx.getStorageSync("userInfo"), d = wx.getStorageSync("openId"), n = [], r = "", h = 0, c = this.data.pay, g = 0, m = {
                from_type: 3,
                ticket_id: this.data.useTicket.log_id,
                openid: d
            };
            switch (this.data.hadChooseTime ? (h = 2, m.send_time = this.GetDateStr(this.data.dayIndex, "-") + " " + this.data.chooseTime) : (h = 1, 
            m.send_time = 0), 0 != this.data.wayIndex && (h = 3), "尽快送达" == this.data.chooseTime ? m.send_time = 0 : m.send_time = this.GetDateStr(this.data.dayIndex, "-") + " " + this.data.chooseTime, 
            c) {
              case "货到付款":
                c = 1, m.discount = this.data.cash.discount.config_id, m.addition = this.data.cash.addition.config_id;
                break;

              case "在线支付":
                c = 2, m.discount = this.data.online.discount.config_id, m.addition = this.data.online.addition.config_id;
                break;

              case "会员支付":
                c = 4, m.discount = this.data.member.discount.config_id, m.addition = this.data.member.addition.config_id;
            }
            if (4 == c) {
                if (void 0 == this.data.card.card_id) return wx.hideLoading(), void getApp().showAndHideToast("余额不足 请选择其他支付方式");
                if (m.card_id = this.data.card.card_id, this.data.card.money < this.data.finalPrice) return wx.hideLoading(), 
                void getApp().showAndHideToast("余额不足 请选择其他支付方式");
            }
            for (var p in s) this.data.shopId == s[p].shopId && (n = s[p].goods, g = +p);
            for (var u in n) 0 == u ? void 0 != n[u].goods_spec ? (r = n[u].goods_id + "," + n[u].goods_sum + ",2," + n[u].goods_spec, 
            void 0 != n[u].goods_attr_spec_str && (r = r + "_" + n[u].goods_attr_spec_str)) : (r = n[u].goods_id + "," + n[u].goods_sum + ",2,", 
            void 0 != n[u].goods_attr_spec_str ? r += n[u].goods_attr_spec_str : r += "0") : void 0 != n[u].goods_attr_spec ? (r = r + "|" + n[u].goods_id + "," + n[u].goods_sum + ",2," + n[u].goods_spec, 
            void 0 != n[u].goods_attr_spec_str && (r += n[u].goods_attr_spec_str)) : (r = r + "|" + n[u].goods_id + "," + n[u].goods_sum + ",2,", 
            void 0 != n[u].goods_attr_spec_str ? r += n[u].goods_attr_spec_str : r += "0");
            m.position = this.data.point, m.order = r, m.is_predict = h, m.pay_method = c, "口味、偏好要求等" == this.data.note || "" == this.data.note ? m.description = "" : m.description = this.data.note, 
            m.contact_tel = o.userTel, m.address = o.userAddress, m.contact_name = o.userName, 
            m.shop_token = this.data.shopToken, m.spread_token = t.resToken, e.postApiJSON("/api/goodsOrder/createOrder", m, function(e) {
                if (1 != m.pay_method && 4 != m.pay_method || 1e3 != e.data.code) if (1007 == e.data.code) wx.hideLoading(), 
                getApp().showAndHideToast("超出配送范围,请重新选择店铺或者更改地址"); else if (2 == m.pay_method && 1003 == e.data.code) {
                    var t = JSON.parse(e.data.msg);
                    wx.hideLoading(), wx.requestPayment({
                        timeStamp: t.timeStamp,
                        nonceStr: t.nonceStr,
                        package: t.package,
                        signType: t.signType,
                        paySign: t.paySign,
                        success: function(e) {
                            s[g].goods = [], s[g].goodsPrice_sum = 0, s[g].goods_sum = 0, wx.setStorageSync("shopCar", s), 
                            wx.switchTab({
                                url: "../personalCenter/personalCenter"
                            });
                        },
                        fail: function(e) {
                            getApp().showAndHideToast("支付失败,请到订单页面重新支付"), setTimeout(function() {
                                wx.switchTab({
                                    url: "../orders/orders"
                                });
                            }, 1e3);
                        }
                    });
                } else 2 == m.pay_method && 1e3 == e.data.code ? (s[g].goods = [], s[g].goodsPrice_sum = 0, 
                wx.hideLoading(), wx.setStorageSync("shopCar", s), wx.switchTab({
                    url: "../personalCenter/personalCenter"
                })) : (wx.hideLoading(), getApp().showAndHideToast(e.data.msg)); else s[g].goods = [], 
                s[g].goodsPrice_sum = 0, s[g].goods_sum = 0, wx.hideLoading(), getApp().showAndHideToast("提交成功"), 
                wx.setStorageSync("shopCar", s), wx.switchTab({
                    url: "../personalCenter/personalCenter"
                });
            }, a);
        } else wx.hideLoading(); else wx.hideLoading(), getApp().showAndHideToast("请输入地址");
    },
    timeStamp: function(e) {
        var t = new Date(1e3 * e);
        return t.getFullYear() + "-" + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-") + (t.getDay() + 1 < 10 ? "0" + (t.getDay() + 1) : t.getDay() + 1);
    },
    handleTap: function(e) {},
    chooseTicket: function(e) {
        var t = e.currentTarget.dataset.logid, a = this.data.ticket, i = this.data.useTicket, s = this.data.finalPrice;
        if (0 == t) s = this.data.noUseTicketPrice, i = {
            log_id: 0
        }; else for (var o in a) a[o].log_id == t && void 0 != t && (s = this.data.noUseTicketPrice - a[o].ticket_money, 
        i = a[o]);
        s < 0 && (s = 0), this.setData({
            useTicket: i,
            finalPrice: getApp().moneyFilter(s),
            isCard: 0
        });
    },
    GetDateStr: function(e, t) {
        var a = new Date(), i = a.getTime(), s = 864e5 * e;
        a.setTime(parseInt(i + s));
        var o = a.getFullYear(), d = (a.getMonth() + 1).toString();
        d.length <= 1 && (d = "0" + d);
        var n = a.getDate().toString();
        return n.length <= 1 && (n = "0" + n), o + t + d + t + n;
    },
    toBindTel: function(e) {
        wx.navigateTo({
            url: "../bindTel/bindTel"
        });
    },
    changeTime: function(e, t) {
        var a = this, i = [ "尽快送达" ], s = [ "尽快送达" ], o = [], d = [], n = [], r = [], h = new Date(), c = h.getHours(), g = h.getMinutes();
        for (var m in e) for (var p = e[m].startTime, u = e[m].endTime, f = p.split(":"), l = u.split(":"), T = +f[0], y = +f[1], _ = +l[0], v = +l[1], w = Math.ceil((60 * (_ - T) + v - y) / 20) + 1, x = 0, A = 0, k = 0; k < w; k++) 0 == x && 0 == k ? (x = y + t, 
        A = T) : x += 20, x >= 60 && (x -= 60, A += 1), o.push(A), d.push(x), x > v && A >= _ && (o.pop(), 
        d.pop()), 0 == a.data.dayIndex ? A == c && x >= g ? (n.push(x), r.push(A)) : A > c && (n.push(x), 
        r.push(A)) : (n.push(x), r.push(A));
        for (var D in d) o[D] < 10 && (o[D] = "0" + o[D]), d[D] < 10 && (d[D] = "0" + d[D]), 
        i.push(o[D] + ":" + d[D]);
        for (var S in n) r[S] < 10 && (r[S] = "0" + r[S]), n[S] < 10 && (n[S] = "0" + n[S]), 
        s.push(r[S] + ":" + n[S]);
        return {
            time: i,
            todayTime: s
        };
    },
    initOrderInfo: function(e) {
        var t = this, a = 0, i = wx.getStorageSync("shopCar"), s = wx.getStorageSync("userInfo"), o = [], d = 0, n = 0, r = this.data.isUserInfo, h = [];
        r = "" == s ? 0 : 1;
        for (var c in i) if (i[c].shopId == e.shopId) {
            o = i[c].goods;
            for (var g in o) a += +o[g].pack * +o[g].goods_sum;
            d = i[c].goodsPrice_sum, d = +getApp().moneyFilter(d), n = i[c].preTime, h = i[c].businessTime, 
            this.getTimeArea(h, n);
        }
        var m = {
            preTime: n,
            businessTime: h,
            pack: +getApp().moneyFilter(a),
            fee: getApp().moneyFilter(e.fee),
            goodsPriceSum: d,
            shopToken: e.shoptoken,
            shopId: e.shopId,
            isUserInfo: r,
            userInfo: {
                userName: s.userName,
                userTel: s.userTel,
                userAddress: s.userAddress
            },
            goods: o
        };
        this.setData(m), this.getPreOrderDisAndAdd(d, e).then(function(a) {
            var i = a.market, o = a.ticket;
            t.getPoint(s, e, d).then(function(e) {
                t.changeOrderInfo(i, o);
            });
        }).catch(function(a) {
            getApp().showAndHideToast(a), t.getPoint(s, e, d);
        });
    },
    getPreOrderDisAndAdd: function(t, i) {
        var s = this;
        return new Promise(function(o, d) {
            var n = s, r = {
                amount: t,
                shop_token: i.shoptoken
            };
            wx.showLoading({
                title: "加载中",
                mask: !0
            });
            var h = {}, c = {};
            e.getApiJSON("/api/goodsOrder/getPreOrderDisAndAdd", r, function(e) {
                1e3 == e.data.code ? (h = e.data.data.marketing, c = e.data.data.ticket, n.getShopDelivery(e.data.data.delivery_type), 
                o({
                    market: h,
                    ticket: c
                })) : 1001 == e.data.code ? (n.setData({
                    hadOnline: !1,
                    hadMember: !1,
                    hadCash: !1
                }), wx.hideLoading()) : (wx.hideLoading(), d(e.data.msg));
            }, a);
        });
    },
    getPoint: function(i, s) {
        var o = this;
        return new Promise(function(d, n) {
            var r = {
                address: i.userAddress,
                shop_token: s.shoptoken,
                spread_token: t.resToken
            }, h = o, c = 0, g = s.fee;
            return e.getApiJSON("/api/goodsOrder/getPointByAddress", r, function(e) {
                c = e.data.data.point, 1e3 == e.data.code ? (g = e.data.data.distribution, wx.hideLoading()) : 1007 == e.data.code ? (wx.hideLoading(), 
                getApp().showAndHideToast("超出配送范围,请重新选择店铺或者更改地址")) : (wx.hideLoading(), getApp().showAndHideToast(e.data.msg)), 
                c || (c = "0,0"), h.setData({
                    point: c,
                    fee: g
                }), d(!0);
            }, a), {
                fee: g,
                point: c
            };
        });
    },
    changeOrderInfo: function(e, t) {
        var a = "", i = !0, s = {};
        for (var o in e) switch (o) {
          case "cash":
            e[o].name = "货到付款";
            break;

          case "member":
            e[o].name = "会员支付";
            break;

          case "online":
            e[o].name = "在线支付";
        }
        if (a = void 0 != e.online ? "在线支付" : void 0 != e.member ? "会员支付" : "货到付款", t.length > 0) {
            for (var d in t) t[d].dead_time = this.timeStamp(t[d].dead_time);
            s = t[0];
        } else i = !1, s = {};
        void 0 != e.online ? this.setData({
            online: e.online
        }) : this.setData({
            hadOnline: !1
        }), void 0 != e.member ? this.setData({
            member: e.member,
            card: e.member.card
        }) : this.setData({
            hadMember: !1
        }), void 0 != e.cash ? this.setData({
            cash: e.cash
        }) : this.setData({
            hadCash: !1
        }), this.setData({
            market: e,
            ticket: t,
            isTicket: i,
            useTicket: s,
            pay: a
        }), this.changeOrderPrice();
    },
    changeOrderPrice: function() {
        var e = +this.data.goodsPriceSum, t = +this.data.pack, a = +this.data.fee, i = this.data.pay, s = +this.data.useTicket.ticket_money || 0, o = 0, d = 0;
        "在线支付" == i && void 0 != this.data.online ? (o = +this.data.online.discount.price, 
        d = +this.data.online.addition.price) : "会员支付" == i && void 0 != this.data.member ? (o = +this.data.member.discount.price, 
        d = +this.data.member.addition.price) : "货到付款" == i && void 0 != this.data.cash && (o = +this.data.cash.discount.price, 
        d = +this.data.cash.addition.price);
        var n = e + t + a - o + d - s;
        (n = +getApp().moneyFilter(n)) < 0 && (n = 0), this.setData({
            finalPrice: n
        });
    },
    getTimeArea: function(e, t) {
        0 == e.length && e.push({
            startTime: "00:00",
            endTime: "24:00"
        });
        var a = this.changeTime(e, t).time, i = this.changeTime(e, t).todayTime;
        this.setData({
            time: a,
            todayTime: i
        });
    },
    getShopDelivery: function(e) {
        var t = {
            delivery: e
        };
        2 == e ? (t.wayIndex = 1, this.data.time.shift(), this.data.todayTime.shift(), t.time = this.data.time, 
        t.todayTime = this.data.todayTime, t.chooseTime = this.data.time[0]) : 3 == e && (t.wayIndex = 0, 
        this.data.time[0] = "尽快送达", this.data.todayTime[0] = "尽快送达", t.time = this.data.time, 
        t.todayTime = this.data.todayTime, t.chooseTime = this.data.time[0]), this.setData(t);
    }
});