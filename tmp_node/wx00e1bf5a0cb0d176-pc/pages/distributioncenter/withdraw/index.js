function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = getApp(), o = require("../../shop/ShopUtil.js"), n = require("../../../components/wxb.js");

Page({
    data: (t = {
        count: 0,
        allTotal: 0,
        applyTotal: 0,
        canApplyTotal: 0,
        auditedTotal: 0,
        notAuditedTotal: 0,
        userID: "",
        userType: -1,
        baseUrl: a.globalData.siteBaseUrl,
        language: a.globalData.language,
        minConsumption: 0,
        minPrestore: 0
    }, e(t, "language", {}), e(t, "reminder", "授权提示"), e(t, "matter", "授权失败，请重新授权"), 
    e(t, "abrogate", "暂时先不"), e(t, "permission", "允许"), e(t, "shopcartStatus", !1), 
    e(t, "phonelicense", !1), e(t, "fork", !1), e(t, "authorization", 1), t),
    onLoad: function(e) {
        this.setData({
            language: a.globalData.language,
            authorization: 1
        });
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.language.TIPS_FxCenter
        });
    },
    onShow: function() {
        var e = this;
        e.checkLogin(function() {
            e.getUserInfo(), e.setData({
                userID: a.globalData.WebUserID
            });
        });
        var t = wx.getStorageSync("hasMobile") || 0, o = getCurrentPages(), n = o[o.length - 1];
        n && [ "pages/distributioncenter/withdraw/index_tabbar" ].includes(n.route) && e.setData({
            shopcartStatus: !0
        });
        var i = a.globalData.getMobileNode ? a.globalData.getMobileNode.enterDistributionCenter : 0;
        0 === a.globalData.hasMobile && e.data.userID && 1 === e.data.authorization && 0 === t && e.data.shopcartStatus && 0 !== i && 1 !== e.data.phonestatus && (1 === i ? e.setData({
            phonelicense: !0
        }) : wx.redirectTo({
            url: "/pages/phoneauthorization/index?getMobileNode=" + i + "&pageroute=" + n.route
        })), e.setData({
            authorization: 1
        });
    },
    checkLogin: function(e) {
        if (a.globalData.WebUserID) e(); else {
            var t = function() {
                wx.navigateBack({
                    delta: 1
                });
            };
            a.login({
                success: e,
                fail: t,
                forcereg: function() {
                    o.showRegUI({
                        onClose: t,
                        onRegOrBindSuccess: e
                    });
                }
            });
        }
    },
    getUserInfo: function() {
        var e = this, t = {
            url: "/index.php?c=Front/WxApp/BaseApi&a=getUserInfo",
            success: function(t) {
                if (t.success) {
                    var a = parseInt(t.info.UserType);
                    e.setData({
                        userType: a,
                        phonestatus: 0
                    }), 0 === a ? e.getFenXiaoCondition() : e.getUserFenXiaoInfo();
                }
            }
        };
        a.sendRequest(t);
    },
    getUserFenXiaoInfo: function() {
        var e = this, t = {
            url: "/index.php?c=Front/WxApp/ShopApi&a=getUserFenXiaoInfo",
            success: function(t) {
                t.success ? e.setData({
                    count: t.info.count,
                    allTotal: t.info.allTotal,
                    applyTotal: t.info.applyTotal,
                    canApplyTotal: t.info.canApplyTotal,
                    auditedTotal: t.info.auditedTotal,
                    notAuditedTotal: t.info.notAuditedTotal,
                    superiorUserInfo: t.info.superiorUserInfo
                }) : a.showModal({
                    title: "提示",
                    content: t.msg
                });
            }
        };
        a.sendRequest(t);
    },
    getFenXiaoCondition: function() {
        var e = this;
        a.sendRequest({
            url: "/index.php?c=front/WxApp/FenXiao&a=getFenXiaoCondition",
            method: "GET",
            success: function(t) {
                t.success ? e.setData({
                    minConsumption: t.data.minConsumption,
                    minPrestore: t.data.minPrestore,
                    enablePrestore: t.data.enablePrestore,
                    enableFenXiaoMinAmount: t.data.enableFenXiaoMinAmount
                }) : console.log("getFenXiaoCondition fail" + t.msg);
            }
        });
    },
    getPhoneNumber: function(e) {
        var t = this;
        t.data.getMobileNode && t.data.getMobileNode.enterDistributionCenter, a.globalData.getMobileNode && a.globalData.getMobileNode.enterMemberCenter;
        if (e.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
            var o = a.globalData.appId, i = a.globalData.session_key, s = new n(o, i).decryptData(e.detail.encryptedData, e.detail.iv);
            a.loadphoneInfo(s.phoneNumber);
        } else ;
    },
    abolish: function() {
        this.setData({
            allowspopup: !1
        });
    },
    turnOff: function() {
        a.turnOff();
    },
    preventD: function() {},
    toRecharge: function() {
        var e = this;
        wx.redirectTo({
            url: "/pages/shop/recharge?codee=" + e.data.minPrestore
        });
    }
});