var e = getApp(), t = require("../../config.js"), o = require("./ShopUtil.js"), n = require("../../components/utils/socket.js");

Page({
    data: {
        codee: 0,
        money: 0,
        buttonClicked: !1,
        moneyNum: 0,
        baseUrl: e.globalData.siteBaseUrl,
        cur_socket: {},
        processing: !0,
        processing_text: "处理中",
        markShow: !1,
        otherSuccessFlag: !1,
        isRecharge: !0
    },
    onLoad: function(t) {
        n = this;
        this.setData({
            codee: n.options.codee ? n.options.codee : 0
        });
        var n = this, a = function() {
            n.isLogin();
        }, s = function() {
            o.showRegUI({
                onClose: function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }
            });
        };
        e.globalData.WebUserID ? a() : e.login({
            success: a,
            fail: s,
            forcereg: s
        });
    },
    navigateBackFunc: function(e) {
        var t = getCurrentPages(), o = t[t.length - 2];
        o && o.setData({
            backselectFlag: e
        });
    },
    isLogin: function() {
        setTimeout(function() {
            e.globalData.WebUserID || o.showRegUI({
                onClose: function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }
            });
        }, 2e3);
    },
    moneyInput: function(e) {
        var t = this, o = e.detail.value;
        t.data.moneyNum;
        this.setData({
            moneyNum: o
        });
    },
    formSubmit: function(o) {
        var a = o.detail.value.money, s = this;
        if (s.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            s.setData({
                buttonClicked: !1
            });
        }, 500), 0 != s.data.moneyNum && s.data.moneyNum >= .01) {
            !function(a, c) {
                if ("1" != t.SKIP_WXPAY) {
                    n.listen("websocket-connected", function(t) {
                        var o = {
                            client_id: t.clientid
                        };
                        e.sendRequest({
                            url: "/index.php?c=Front/WxApp/Socket&a=bind",
                            data: o,
                            method: "POST",
                            success: function(t) {
                                t.success || e.showModal({
                                    title: "提示",
                                    content: t.msg
                                });
                            },
                            fail: function(e) {}
                        });
                    }), n.listen("websocket-finishPay", function(e) {
                        console.log(e), setTimeout(function() {
                            s.setData({
                                processing: !1,
                                processing_text: e.order_status_text
                            });
                        }, 1e3), s.data.cur_socket.remove("websocket-finishPay");
                    });
                    var i = n.run();
                    console.log("init socket"), console.log(i), s.setData({
                        cur_socket: i
                    }), e.wxPay(0, {
                        formid: o.detail.formId,
                        money: c,
                        success: function() {
                            s.navigateBackFunc(!0), s.setData({
                                otherSuccessFlag: !0,
                                orderId: a
                            });
                        },
                        fail: function(e) {
                            "{}" != JSON.stringify(s.data.cur_socket) && s.data.cur_socket.close();
                        }
                    });
                } else funcPayOrder(a);
            }(0, a);
        } else e.showModal({
            title: "提示",
            content: "请输入正确的充值金额",
            showCancel: !1
        });
    },
    goback: function() {
        this.navigateBackFunc(!0), wx.navigateBack({
            delta: 1
        });
    }
});