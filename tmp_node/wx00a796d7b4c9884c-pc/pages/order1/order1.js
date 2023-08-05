var t = getApp();

Page({
    data: {
        itemData: {},
        paytype: "weixin",
        remark: "",
        cartId: 0,
        addrId: 0,
        btnDisabled: !1,
        productData: [],
        address: {},
        total: 0,
        vprice: 0,
        vid: 0,
        addemt: 1,
        vou: [],
        yun: [],
        yid: 0,
        yprice: 0,
        userid: "",
        url: t.page.url,
        addr_info: [],
        cart_info: [],
        postmode_info: [],
        coupon: [],
        totalprice: 0,
        all_yunfei: 0,
        totalprice_all: 0,
        postIndex: "",
        postname: "",
        postId: "",
        postIndex1: "",
        postname1: "",
        postId1: "",
        couIndex: "",
        couId: "",
        couIndex1: "",
        money: "0.00",
        money1: "0.00",
        couId1: "",
        remark: "",
        default: "留言内容",
        flag: 0,
        id: "",
        offline_pay: t.globalData.offline_pay
    },
    remarkFocus: function() {
        this.setData({
            default: ""
        });
    },
    setModalStatus1: function(t) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = a, a.translateY(300).step(), this.setData({
            animationData: a.export()
        }), 1 == t.currentTarget.dataset.status && this.setData({
            showModalStatus1: !0,
            btntype: t.currentTarget.dataset.type
        }), setTimeout(function() {
            a.translateY(0).step(), this.setData({
                animationData: a
            }), 0 == t.currentTarget.dataset.status && this.setData({
                showModalStatus1: !1
            });
        }.bind(this), 200);
    },
    setModalStatus: function(t) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = a, a.translateY(300).step(), this.setData({
            animationData: a.export()
        }), 1 == t.currentTarget.dataset.status && this.setData({
            showModalStatus: !0,
            btntype: t.currentTarget.dataset.type
        }), setTimeout(function() {
            a.translateY(0).step(), this.setData({
                animationData: a
            }), 0 == t.currentTarget.dataset.status && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200);
    },
    onLoad: function(t) {
        var a = t.cartId;
        a = a.slice(0, a.length - 1), this.setData({
            cartId: a
        });
    },
    getOrder: function() {
        var a = this;
        wx.request({
            url: t.page.url + "/wx/orderinfo.php",
            method: "get",
            data: {
                id: a.data.cartId,
                userid: a.data.userid
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t), a.setData({
                    addr_info: t.data.addr_info,
                    cart_info: t.data.cart_info,
                    postmode_info: t.data.postmode_info,
                    coupon: t.data.coupon,
                    totalprice: t.data.totalprice,
                    all_yunfei: t.data.all_yunfei,
                    totalprice_all: t.data.totalprice_all
                });
            }
        });
    },
    listenerRadioGroup1: function(t) {
        console.log("点击的是第" + t.detail.value + "个radio");
        var a = t.detail.value, o = this.data.postmode_info[a].classname, e = this.data.postmode_info[a].id;
        console.log(o), this.setData({
            postIndex: a,
            postname: o,
            postId: e
        });
    },
    listenerRadioGroup2: function(t) {
        console.log("点击的是第" + t.detail.value + "个radio");
        var a = t.detail.value;
        console.log(a);
        var o = this.data.coupon[a].money, e = this.data.coupon[a].id;
        console.log(o), this.setData({
            couIndex: a,
            money: o,
            couId: e
        });
    },
    getPostType: function() {
        "" == this.data.postIndex ? wx.showToast({
            title: "请选择配送方式哦",
            icon: "loading",
            duration: 1e4
        }) : this.setData({
            postIndex1: this.data.postIndex,
            postname1: this.data.postname,
            postId1: this.data.postId,
            showModalStatus1: !1
        });
    },
    getCoupon: function() {
        if ("" == this.data.couIndex) wx.showToast({
            title: "请选择优惠券哦",
            icon: "loading",
            duration: 1e4
        }); else {
            var t = this.data.money;
            this.setData({
                couIndex1: this.data.couIndex,
                money1: t,
                couId1: this.data.couId,
                totalprice_all: parseFloat(parseFloat(this.data.totalprice) - parseFloat(t) + parseFloat(this.data.all_yunfei)),
                showModalStatus: !1
            });
        }
    },
    remarkText: function(t) {
        this.setData({
            remark: t.detail.value
        });
    },
    submit: function(a) {
        var o = this, e = a.currentTarget.dataset.flag;
        return console.log(e), console.log("submit"), "" == this.data.postIndex ? (wx.showToast({
            title: "请选择配送方式哦",
            icon: "loading",
            duration: 1e3
        }), !1) : o.data.addr_info ? (console.log(o.data.userid), void wx.request({
            url: t.page.url + "/wx/orderpost.php",
            method: "post",
            data: {
                aid: o.data.addr_info.id,
                cartids: o.data.cartId,
                userid: o.data.userid,
                totalprice: o.data.totalprice_all,
                postmode: o.data.postId1,
                buyremark: o.data.remark,
                yunfei: o.data.all_yunfei,
                quan: o.data.money1,
                couponId: o.data.couId1,
                paymode: e
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t), 0 == t.data.code && (o.setData({
                    order_sn: t.data.msg,
                    id: t.data.id
                }), 1 == e ? o.pay() : wx.redirectTo({
                    url: "../ordershow/ordershow?id=" + o.data.id
                }));
            },
            fail: function() {
                console.log("fail");
            }
        })) : (console.log(0), wx.showToast({
            title: "请选择收货地址！",
            icon: "loading",
            duration: 1e3
        }), !1);
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        wx.setNavigationBarTitle({
            title: t.globalData.title
        }), a.setData({
            offline_pay: t.globalData.offline_pay
        }), wx.getStorage({
            key: "userid",
            success: function(t) {
                console.log(t), a.setData({
                    userid: t.data
                }), a.getOrder();
            }
        });
    },
    pay: function(a) {
        var o = this;
        wx.request({
            url: t.page.url + "/wx/Wxpay.php",
            method: "post",
            data: {
                order_sn: o.data.order_sn,
                uid: o.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (console.log(t), 1 == t.data.status) {
                    var a = t.data.arr;
                    wx.requestPayment({
                        timeStamp: a.timeStamp,
                        nonceStr: a.nonceStr,
                        package: a.package,
                        signType: "MD5",
                        paySign: a.paySign,
                        success: function(t) {
                            wx.showToast({
                                title: "支付成功!",
                                duration: 2e3
                            }), setTimeout(function() {
                                wx.redirectTo({
                                    url: "../ordershow/ordershow?id=" + o.data.id
                                });
                            }, 3e3);
                        },
                        fail: function(t) {
                            wx.showToast({
                                title: 1,
                                icon: "none",
                                duration: 3e3
                            });
                        },
                        complete: function(t) {
                            console.log(t), "requestPayment:fail cancel" == t.errMsg && (wx.showToast({
                                title: "取消支付",
                                icon: "none",
                                duration: 3e3
                            }), wx.redirectTo({
                                url: "../ordershow/ordershow?id=" + o.data.id
                            }));
                        }
                    });
                } else wx.showToast({
                    title: 2,
                    icon: "none",
                    duration: 2e3
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "网络异常！",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});