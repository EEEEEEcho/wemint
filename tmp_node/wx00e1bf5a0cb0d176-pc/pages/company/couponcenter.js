var t = getApp(), a = require("../shop/ShopUtil.js"), e = require("../../common.js"), o = require("../../components/wxb.js");

Page({
    pageurl: "",
    url: !1,
    onShareAppMessage: function() {
        return t.shareAppMessage({
            url: this.url,
            title: this.data.productInfo.Name
        });
    },
    onLoad: function(a) {
        var e = this;
        e.url = t.getPageUrl(e, a), t.registerGlobalFunctions(e), e.setData({
            queryparams: a,
            authorization: 1
        }), this.getCircle();
    },
    navigateBackFunc: function(t) {
        var a = getCurrentPages(), e = a[a.length - 2];
        e && e.setData({
            backselectFlag: t
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        t.data.pullDownRefreshFlag && (t.setData({
            pullDownRefreshFlag: !1
        }), t.data.pullDownRefreshFlag = !1, t.data.queryparams.refresh = !0, setTimeout(function() {
            t.initData(t.data.queryparams), t.setData({
                pullDownRefreshFlag: !0
            }), wx.stopPullDownRefresh();
        }, 1500));
    },
    onShow: function() {
        t.doAfterUserInfoAuth({
            success: this.initData,
            fail: this.initData
        });
    },
    initData: function(o) {
        var n = this;
        e.setPopupFromShare(), n.setData({
            queryparams: o
        }), a.loadCouponList(!0, function(t) {
            var a = [];
            t.list.forEach(function(t) {
                0 != t.CanGet && t.Available > 0 && a.push(t);
            }), n.setData({
                list: a
            });
        });
        var i = wx.getStorageSync("invite") || 0, s = wx.getStorageSync("hasMobile") || 0, l = getCurrentPages(), r = l[l.length - 1];
        r && [ "pages/company/couponcenter_tabbar" ].includes(r.route) && n.setData({
            shopcartStatus: !0
        });
        var u = t.globalData.getMobileNode ? t.globalData.getMobileNode.enterTicketCenter : 0;
        0 === t.globalData.hasMobile && 1 === n.data.authorization && 0 !== i && 0 !== u && 0 === s && n.data.shopcartStatus && (n.setData({
            phonesStatus: 1
        }), 2 === u ? (wx.redirectTo({
            url: "/pages/phoneauthorization/index?getMobileNode=" + u + "&pageroute=" + r.route
        }), phoneStatus) : 1 === u && n.setData({
            phonelicense: !0
        })), n.setData({
            authorization: 1
        });
    },
    data: {
        pullDownRefreshFlag: !0,
        buttonClicked: !1,
        scrollHeight: t.windowHeight * t.pixelRatio + 6,
        baseUrl: t.globalData.siteBaseUrl,
        reminder: "授权提示",
        matter: "授权失败，请重新授权",
        abrogate: "暂时先不",
        permission: "允许",
        shopcartStatus: !1,
        phonesStatus: 1,
        authorization: 1
    },
    getCircle: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                for (var e = Math.floor(2 * a.windowWidth / 20), o = [], n = 0; n < e; n++) o.push("1");
                t.setData({
                    raoundArray: o
                });
            }
        });
    },
    getPhoneNumber: function(a) {
        var e = this, n = t.globalData.getMobileNode, i = n.getCoupons;
        if (i = 1 === e.data.phonesStatus ? n.enterTicketCenter : n.getCoupons, a.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
            var s = t.globalData.appId, l = t.globalData.session_key, r = new o(s, l).decryptData(a.detail.encryptedData, a.detail.iv);
            t.loadphoneInfo(r.phoneNumber), e.data.licensecouponid && e.couponCollection();
        } else e.setData({
            authorization: 2
        }), 2 === i ? e.setData({
            allowspopup: !0
        }) : e.data.licensecouponid && e.couponCollection();
    },
    fork: function() {
        var t = this;
        t.setData({
            authorizationfailure: !1
        }), t.data.licensecouponid && t.couponCollection();
    },
    turnOff: function() {
        t.turnOff();
    },
    preventD: function() {},
    M_getCoupon: function(a) {
        var e = this, o = wx.getStorageSync("hasMobile") || 0;
        e.setData({
            buttonClicked: !0,
            licensecouponid: a.currentTarget.dataset.couponid,
            idxitem: a.currentTarget.dataset.idxitem - 0
        });
        var n = t.globalData.getMobileNode ? t.globalData.getMobileNode.getCoupons : 0;
        0 === t.globalData.hasMobile && 0 === o && 0 !== n ? this.setData({
            phonelicense: !0,
            phonesStatus: 2
        }) : e.couponCollection();
    },
    couponCollection: function() {
        var t = this, e = t.data.idxitem;
        a.getCoupon(t.data.licensecouponid, function() {
            a.loadCouponList(!0, function(a) {
                if (a.success) {
                    for (var o = 0; o < a.list.length; o++) a.list[o].CouponID == t.data.licensecouponid && 0 == a.list[o].CanGet && (t.data.list[e].CanGet = 0);
                    t.data.list[e].UserCanGetNum -= 1, t.data.list[e].Available -= 1;
                    var n = [];
                    t.data.list.forEach(function(t) {
                        0 != t.CanGet && t.Available > 0 && n.push(t);
                    }), t.setData({
                        list: n
                    }), setTimeout(function() {
                        wx.showToast({
                            title: "领取成功",
                            icon: "success"
                        }), setTimeout(function() {
                            t.setData({
                                buttonClicked: !1
                            });
                        }, 300);
                    }, 500);
                } else t.setData({
                    buttonClicked: !1
                });
            });
        });
    }
});