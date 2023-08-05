function e(e, o) {
    wx.requestPayment({
        timeStamp: e.data.timeStamp,
        nonceStr: e.data.nonceStr,
        package: e.data.package,
        signType: "MD5",
        paySign: e.data.paySign,
        success: function(e) {
            console.log(e), o(!0);
        },
        fail: function(e) {
            console.log("支付失败"), console.log(e), o(!1);
        },
        complete: function() {
            console.log("pay complete");
        }
    });
}

var o = require("../../../utils/main.js"), a = require("../../../utils/util.js"), t = getApp();

Page({
    data: {
        hidden: !0,
        nocancel: !1
    },
    onLoad: function(e) {
        var o = JSON.parse(e.model);
        this.setData({
            model: o
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    cancel: function() {
        this.setData({
            hidden: !1
        });
    },
    confirm: function() {
        this.setData({
            hidden: !0
        });
        var e = getCurrentPages();
        e[e.length - 2].backLoad(), wx.navigateBack();
    },
    onPay: function(a) {
        var n = this;
        wx.request({
            url: o.localUrl + "mobileXcx/orderPay",
            data: {
                catId: n.data.model.id
            },
            header: {
                "content-type": "application/json"
            },
            success: function(c) {
                "000" == c.data.succeed && wx.request({
                    url: o.localUrl + "mobileXcx/wxPay",
                    data: {
                        openid: t.globalData.openId,
                        title: n.data.model.ca.title,
                        catId: n.data.model.id
                    },
                    method: "GET",
                    success: function(o) {
                        console.log(o), e(o, function(e) {
                            e ? (n.sendMessage(a.detail.formId, t.globalData.openId, n.data.model.ca.title), 
                            n.cancel()) : wx.showToast({
                                title: "支付失败",
                                icon: "loading",
                                duration: 2e3
                            });
                        });
                    }
                });
            }
        });
    },
    sendMessage: function(e, t, n) {
        wx.request({
            url: o.localUrl + "mobileXcx/accessToken",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                var c = o.data.dataInfo.accessToken;
                console.log(c);
                var i = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + c, l = {
                    touser: t,
                    template_id: "Fs6nTh5OLSjL_F_iznhmRA5fGcYot3liXH39xeeEWNE",
                    page: "/pages/stu/myActivity/myActivity",
                    form_id: e,
                    data: {
                        keyword1: {
                            value: n,
                            color: "#172177"
                        },
                        keyword2: {
                            value: a.formatTime(new Date()),
                            color: "#9b9b9b"
                        },
                        keyword3: {
                            value: "活动购买成功,如有疑问请联系我们。",
                            color: "#9b9b9b"
                        }
                    }
                };
                wx.request({
                    url: i,
                    data: l,
                    method: "POST",
                    success: function(e) {
                        console.log("push msg"), console.log(e);
                    },
                    fail: function(e) {
                        console.log("push err"), console.log(e);
                    }
                });
            }
        });
    }
});