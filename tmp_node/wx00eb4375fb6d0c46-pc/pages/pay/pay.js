var a = getApp(), n = require("../../utils/wxcomm.js"), o = require("../../utils/wxapp.js");

Page({
    data: {},
    onLoad: function(e) {
        console.log(e);
        var t = o.data.appid, r = wx.getStorageSync("user").openId, c = a.globalData.merchantConfigId, i = "探惠|" + c, d = e.productId, m = [ e.amount, e.payType, e.cashierId, e.couponsId, e.noDiscountMoney, e.oriConsumMoney ], p = m[0], s = m[1], l = m[2], u = m[3], g = m[4], f = m[5], h = e.couponsConfigIdListStr;
        if (1 == s) {
            var y = {
                appid: t,
                smallOpenId: r,
                merchantConfigId: c,
                consumMoney: p,
                oriConsumMoney: f,
                noDiscountMoney: g,
                couponsId: u,
                subbranchId: l,
                payType: s
            }, S = o.projectUrl + "/miniProgram/getUseCouponsPayParam";
            n.reqPost(S, y, "application/x-www-form-urlencoded").then(function(a) {
                var e = a.data.data.orderNo, t = a.data.data.amount;
                wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: a.data.data.signType,
                    paySign: a.data.data.paySign,
                    success: function(a) {
                        console.log("支付成功");
                        var r = o.projectUrl + "/miniProgram/consumeWechatCallbak";
                        n.reqGet(r + "?merchantConfigId=" + c + "&orderNo=" + e + "&amount=" + t).then(function(a) {
                            console.log(a), wx.redirectTo({
                                url: "../merchant/merchant?param=" + i
                            });
                        });
                    },
                    fail: function(a) {
                        console.log(a), console.log("支付失败"), wx.redirectTo({
                            url: "../merchant/merchant?param=" + i
                        });
                    }
                });
            });
        } else if (4 == s) {
            var w = {
                appid: t,
                smallOpenId: r,
                merchantConfigId: c,
                consumMoney: p,
                oriConsumMoney: f,
                noDiscountMoney: g,
                couponsConfigIdListStr: h,
                subbranchId: l,
                payType: s
            }, I = o.projectUrl + "/miniProgram/getSetMealPayParam";
            n.reqPost(I, w, "application/x-www-form-urlencoded").then(function(a) {
                var e = a.data.data.orderNo, t = a.data.data.amount;
                wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: a.data.data.signType,
                    paySign: a.data.data.paySign,
                    success: function(a) {
                        console.log("支付成功");
                        var r = o.projectUrl + "/miniProgram/consumeWechatCallbak";
                        n.reqGet(r + "?merchantConfigId=" + c + "&orderNo=" + e + "&amount=" + t).then(function(a) {
                            console.log(a), wx.redirectTo({
                                url: "../merchant/merchant?param=" + i
                            });
                        });
                    },
                    fail: function(a) {
                        console.log(a), console.log("支付失败"), wx.redirectTo({
                            url: "../merchant/merchant?param=" + i
                        });
                    }
                });
            });
        } else {
            var P = o.projectUrl + "/miniProgram/getOnceRechangePayParam", C = {
                appid: t,
                smallOpenId: r,
                merchantConfigId: c,
                inviteCode: "",
                productId: d
            };
            n.reqPost(P, C, "application/x-www-form-urlencoded").then(function(a) {
                var e = a.data.data.orderNo, t = a.data.data.amount;
                wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: a.data.data.signType,
                    paySign: a.data.data.paySign,
                    success: function(a) {
                        console.log("支付成功");
                        var r = o.projectUrl + "/miniProgram/oneRechargeCallbak";
                        n.reqGet(r + "?merchantConfigId=" + c + "&orderNo=" + e + "&amount=" + t).then(function(a) {
                            console.log(a), wx.redirectTo({
                                url: "../merchant/merchant?param=" + i
                            });
                        });
                    },
                    fail: function(a) {
                        console.log(a), console.log("支付失败"), wx.redirectTo({
                            url: "../merchant/merchant?param=" + i
                        });
                    }
                });
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});