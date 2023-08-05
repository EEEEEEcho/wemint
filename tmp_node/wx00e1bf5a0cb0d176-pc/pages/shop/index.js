var e = getApp(), t = require("../../common.js"), a = require("./ShopUtil.js"), n = 0;

Page({
    data: {
        pullDownRefreshFlag: !0,
        baseUrl: e.globalData.siteBaseUrl,
        reminder: "授权提示",
        matter: "授权失败，请重新授权",
        abrogate: "暂时先不",
        permission: "允许"
    },
    onPullDownRefresh: function() {
        var a = this;
        a.data.pullDownRefreshFlag && (a.setData({
            pullDownRefreshFlag: !1
        }), a.data.pullDownRefreshFlag = !1, a.data.optionsData.refresh = !0, e.gettBusinessCardEntrance(e.globalData.WebUserID), 
        t.initCommonModules(), setTimeout(function() {
            a.onLoad(a.data.optionsData), a.setData({
                pullDownRefreshFlag: !0
            }), wx.stopPullDownRefresh();
        }, 1500));
    },
    onLoad: function(n) {
        var o = this;
        o.getHeight(), e.registerGlobalFunctions(o), o.setData({
            optionsData: n,
            isFirst: !0
        }), e.globalData.PSESSID ? o.loadPageData() : e.login({
            success: function() {
                o.loadPageData();
            },
            fail: function() {
                o.loadPageData();
            }
        }), this.getBusinessInfo(function(t) {
            if (t && t.businessCardInfo) {
                if (t.businessCardInfo.admin) {
                    var a = {
                        tbUserID: t.userid,
                        tbType: "15",
                        tbTypeID: "",
                        tbTypeName: "",
                        tbTypeImg: "",
                        tbBusinessCardID: wx.getStorageSync("otherMemberCardId") ? wx.getStorageSync("otherMemberCardId") : 0
                    };
                    e.buried(a, function(e) {});
                } else {
                    var n = {
                        tbUserID: t.userid,
                        tbType: "15",
                        tbTypeID: "",
                        tbTypeName: "",
                        tbTypeImg: "",
                        tbBusinessCardID: wx.getStorageSync("businessCardId") ? wx.getStorageSync("businessCardId") : 0
                    };
                    e.buried(n, function(e) {});
                }
                setTimeout(function() {
                    o.setData({
                        isFirst: !1
                    });
                }, 1500);
            }
        }), wx.setStorageSync("iscatchCardCount", 1);
        t.registerGlobalVar("ShopUtil", a), t.registerGlobalFunc(), t.registerGlobalFunc(), 
        t.loadPageModules(n), o.isLogin();
    },
    onShow: function() {
        t.registerGlobalFunc();
        var a = this.data.modules;
        if (a && a.length > 0 && t.getPurchaseLimit(), 1 == wx.getStorageSync("iscatchCardCount") && e.globalData.businessCardInfo && (t.initCommonModules(), 
        wx.removeStorageSync("iscatchCardCount")), (this.data.backselectFlag || wx.getStorageSync("switchToIndex") || wx.getStorageSync("editCardSuccessOnIndex")) && (e.gettBusinessCardEntrance(e.globalData.WebUserID), 
        t.initCommonModules(), wx.removeStorageSync("switchToIndex"), wx.removeStorageSync("editCardSuccessOnIndex")), 
        wx.getStorageSync("otherMemberCardId") && !this.data.isFirst) if (wx.getStorageSync("businessCardInfo").admin) {
            var n = {
                tbUserID: e.globalData.WebUserID,
                tbType: "15",
                tbTypeID: "",
                tbTypeName: "",
                tbTypeImg: "",
                tbBusinessCardID: wx.getStorageSync("otherMemberCardId")
            };
            e.buried(n, function(e) {});
        } else {
            var o = {
                tbUserID: e.globalData.WebUserID,
                tbType: "15",
                tbTypeID: "",
                tbTypeName: "",
                tbTypeImg: "",
                tbBusinessCardID: wx.getStorageSync("businessCardId") ? wx.getStorageSync("businessCardId") : 0
            };
            e.buried(o, function(e) {});
        }
    },
    onHide: function() {
        t.clearInterval();
    },
    onPageScroll: function() {},
    onShareAppMessage: function() {
        return e.shareAppMessage(this.url);
    },
    yijiandaohhang: function(e) {
        for (var t, a, n = e.currentTarget.dataset.hi, o = n[0].Latitude, s = n[0].Longitude, i = 0; i < n.length; i++) 1 == n[i].Type && (t = n[i].Text, 
        a = n[i].Title);
        wx.openLocation({
            name: a,
            address: t,
            longitude: Number(s),
            latitude: Number(o)
        });
    },
    yijianbohao: function(e) {
        var t = e.currentTarget.dataset.iphone;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    isLogin: function() {
        setTimeout(function() {
            e.globalData.WebUserID || a.showRegUI();
        }, 2e3);
    },
    phoneConfirm: function(e) {
        var t = this, a = "";
        t.setData({
            phoneNumber: e.detail.value
        }), a = e.detail.value, /^1\d{10}$/.test(a) ? t.setData({
            tips: ""
        }) : t.setData({
            tips: "请输入正确的手机号码!"
        });
    },
    loadPageData: function() {
        var e = this, t = getApp();
        t.globalData && Object.keys(t.globalData.baseInfo).length > 0 ? (null == t.globalData.notice || t.globalData.notice.ButtonValue || (t.globalData.notice.ButtonValue = "查看详情"), 
        Math.round(new Date().getTime() / 1e3) - n > 86400 && e.setData({
            notice: t.globalData.notice
        }), n = Math.round(new Date().getTime() / 1e3)) : setTimeout(function() {
            e.loadPageData();
        }, 200);
    },
    closeNotic: function() {
        this.setData({
            notice: null
        });
    },
    onNoticeClick: function(e) {
        var t = this.data.notice, a = (t.RedirectTo, t.RedirectToID, this);
        wx.navigateTo({
            url: t.URL || "noticedetail",
            complete: function() {
                a.setData({
                    notice: null
                });
            }
        });
    },
    getHeight: function() {
        this.setData({
            height: parseInt(wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth / 750 * 100)
        });
    },
    getBusinessInfo: function(a) {
        var n = this;
        if (e.globalData.businessCardInfo) {
            var o = {
                userid: e.globalData.WebUserID,
                businessCardInfo: e.globalData.businessCardInfo
            };
            a && a(o);
        } else setTimeout(function() {
            t.initCommonModules(), n.getBusinessInfo(a);
        }, 1500);
    }
});