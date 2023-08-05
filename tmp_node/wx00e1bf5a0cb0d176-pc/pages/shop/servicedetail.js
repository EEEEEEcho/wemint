var e = getApp(), a = require("../../components/utils/imgutil.js"), t = require("../../common.js"), i = require("../../components/wxb.js");

Page({
    isloading: !1,
    bannerLoaded: !1,
    url: !1,
    onShareAppMessage: function() {
        return e.shareAppMessage({
            url: this.url,
            title: this.data.productInfo.Name
        });
    },
    onLoad: function(a) {
        var t = this;
        if (a.scene) {
            var i = {};
            decodeURIComponent(a.scene).split("&").map(function(e, a) {
                if (-1 !== e.indexOf("=")) {
                    var t = e.split("=");
                    i[t[0]] = t[1];
                }
            }), a = i;
        }
        t.url = e.getPageUrl(t, a), e.registerGlobalFunctions(t), this.setData({
            queryparams: a,
            authorization: 1
        });
    },
    onShow: function() {
        e.doAfterUserInfoAuth({
            success: this.initData,
            fail: this.initData
        });
    },
    initData: function() {
        var a = this;
        t.initCommonModules(), this.loadService();
        var i = wx.getStorageSync("hasMobile") || 0, o = e.globalData.WebUserID || 0, n = 0, r = getCurrentPages(), s = r[r.length - 1];
        a.data.queryparams.id && (n = a.data.queryparams.id);
        var l = e.globalData.getMobileNode ? e.globalData.getMobileNode.checkServiceDetails : 0;
        0 === e.globalData.hasMobile && 0 === i && 0 !== l && 1 === a.data.authorization && 0 !== o && "1" === a.data.queryparams.fromShare && 2 === l && wx.redirectTo({
            url: "/pages/phoneauthorization/index?getMobileNode=" + l + "&pageroute=" + s.route + "&id=" + n
        }), a.setData({
            authorization: 1
        });
    },
    onPageScroll: function() {},
    data: {
        currentTab: 0,
        bannerHeight: 150,
        hasPrice: !0,
        productImgs: [],
        plugNavFlag: !0,
        videoshow: !1,
        authorization: 1
    },
    loadService: function() {
        var a = this;
        if (!a.isloading) {
            a.isloading = !0;
            var t = 0;
            a.data.queryparams.id && (t = a.data.queryparams.id), e.sendRequest({
                url: "/index.php?c=Front/WxApp/JsonApi&a=getServiceInfo&id=" + t + "&updateHits=1",
                method: "GET",
                success: function(t) {
                    if (a.isloading = !1, t.success) {
                        for (var i = "", o = t.info.BigImages.split(","), n = 0; n < o.length; n++) i = /\/product\//.test(o[n]) ? o[0] : "/comdata/" + t.info.SiteID + "/service/" + o[0];
                        var r = wx.getStorageSync("businessCardInfo");
                        if (r && r.admin) {
                            var s = {
                                tbUserID: e.globalData.WebUserID,
                                tbType: "19",
                                tbTypeID: t.info.ServiceID,
                                tbTypeName: t.info.Name,
                                tbTypeImg: i,
                                tbBusinessCardID: wx.getStorageSync("otherMemberCardId") ? wx.getStorageSync("otherMemberCardId") : 0
                            };
                            e.buried(s, function(e) {});
                        } else {
                            var l = {
                                tbUserID: e.globalData.WebUserID,
                                tbType: "19",
                                tbTypeID: t.info.ServiceID,
                                tbTypeName: t.info.Name,
                                tbTypeImg: i,
                                tbBusinessCardID: wx.getStorageSync("businessCardId") ? wx.getStorageSync("businessCardId") : 0
                            };
                            e.buried(l, function(e) {});
                        }
                        for (var d = t.info.BigImages.split(","), n = 0; n < d.length; n++) /\/product\//.test(d[n]) ? d[n] = e.globalData.siteBaseUrl + d[n] : d[n] = e.globalData.siteBaseUrl + "/comdata/" + t.info.SiteID + "/service/" + d[n];
                        0 == parseFloat(t.info.Price) && a.setData({
                            hasPrice: !1
                        }), wx.setNavigationBarTitle({
                            title: t.info.Name
                        }), 0 == parseFloat(t.info.FreightMoney) && (t.info.FreightMoney = "包邮"), e.WxParse.wxParse("DetailInfo", "html", t.info.Content, a, 5);
                        var g = e.globalData.subscribeFormData;
                        null != g && (g.SubmitText = "立即预约"), a.setData({
                            productInfo: t.info,
                            productImgs: d,
                            subscribeFormData: g
                        });
                    } else console.log("getServiceInfo fail：" + t.msg);
                },
                fail: function(e) {
                    a.isloading = !1, console.log("getServiceInfo fail");
                }
            });
        }
    },
    onBannerImgLoad: function(e) {
        var t = this;
        a.imageUtil(e);
        0 == t.bannerLoaded && (wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    bannerHeight: e.windowWidth
                });
            }
        }), t.bannerLoaded = !0);
    },
    getPhoneNumber: function(a) {
        var t = this;
        e.globalData.getMobileNode && e.globalData.getMobileNode.checkServiceDetails;
        if (a.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
            var o = e.globalData.appId, n = e.globalData.session_key, r = new i(o, n).decryptData(a.detail.encryptedData, a.detail.iv);
            e.loadphoneInfo(r.phoneNumber);
        } else t.setData({
            authorization: 2
        });
    },
    turnOff: function() {
        e.turnOff();
    },
    preventD: function() {},
    goReserve: function(e) {
        var a = e.currentTarget.dataset.serviceid;
        wx.redirectTo({
            url: "reserve-by-service?serviceid=" + a
        });
    },
    videobofang: function() {
        this.setData({
            videoshow: !0
        });
    },
    videoguanbi: function() {
        this.setData({
            videoshow: !1
        });
    },
    navBtnShowAndHide: function() {
        var e = !this.data.plugNavFlag;
        this.setData({
            plugNavFlag: e
        });
    }
});