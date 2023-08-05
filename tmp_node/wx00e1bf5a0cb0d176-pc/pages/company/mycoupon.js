var t = getApp(), a = require("../../components/wxb.js");

Page({
    isloading: !1,
    pageurl: "",
    onLoad: function(a) {
        var e = this;
        e.pageurl = t.getPageUrl(e, a), t.registerGlobalFunctions(e), e.setData({
            queryparams: a,
            enterTicketCenter: t.globalData.getMobileNode ? t.globalData.getMobileNode.enterTicketCenter : 0
        });
    },
    onShow: function() {
        t.doAfterUserInfoAuth({
            success: this.initData,
            fail: this.initData,
            timesLimit: !1
        });
    },
    initData: function() {
        this.loadMyList(!0);
    },
    data: {
        backselectFlag: !1,
        pagesize: 10,
        recordcount: 1e3,
        mylist: [],
        reminder: "授权提示",
        matter: "授权失败，请重新授权",
        abrogate: "暂时先不",
        permission: "允许",
        baseUrl: t.globalData.siteBaseUrl,
        currentTab: "1",
        sortcol: "",
        sort: "",
        scrollHeight: t.windowHeight - 40,
        use: "",
        total: 0
    },
    getCouponId: function(t) {
        wx.navigateTo({
            url: "verification?id=" + t.target.dataset.id
        });
    },
    goProductList: function(t) {
        wx.navigateTo({
            url: "/pages/shop/productlist?couponId=" + t.target.dataset.id
        });
    },
    loadMyList: function(a) {
        var e = this;
        if (a || !e.isloading) {
            e.isloading = !0;
            var o = e.data.total;
            a ? (e.data.recordcount = 500, e.data.mylist = []) : void 0 != o && (e.data.recordcount = o);
            var i = e.data.recordcount, n = e.data.mylist.length;
            if (i > n) {
                var r = Math.ceil(n / e.data.pagesize) + 1;
                e.data.queryparams.use && (e.data.use = e.data.queryparams.use), t.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=getProductCouponNew&type=" + e.data.use + "&page=" + r + "&pagesize=" + e.data.pagesize,
                    method: "GET",
                    success: function(a) {
                        if (e.isloading = !1, a.success) {
                            var o = e.data.recordcount;
                            e.setData({
                                total: a.count,
                                recordcount: o
                            }), a.data.forEach(function(t) {
                                "0" === t.Type ? t.Amount = (t.Amount / 10).toString().replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, "") : t.Amount = t.Amount.replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, "");
                            });
                            for (var i = 0; i < a.data.length; i++) e.data.mylist.push(a.data[i]);
                            e.setData({
                                mylist: e.data.mylist,
                                recordcount: a.count,
                                pagesize: a.pageSize
                            }), e.data.queryparams.use = null;
                        } else console.log("getUserCouponList fail：" + a.msg), 1 == a.needLogin && t.login(function() {
                            wx.reLaunch({
                                url: "/" + e.pageurl
                            });
                        });
                    },
                    fail: function(t) {
                        console.log("getUserCouponList fail");
                    }
                });
            }
        }
    },
    switchNavbar: function(t) {
        var a = this;
        a.data.currentTab === t.currentTarget.dataset.idx && a.data.use === t.currentTarget.dataset.use || (this.setData({
            currentTab: t.currentTarget.dataset.idx,
            use: t.currentTarget.dataset.use,
            mylist: []
        }), this.loadMyList(!0));
    },
    goTocouponCenter: function() {
        var a = wx.getStorageSync("hasMobile") || 0, e = t.globalData.getMobileNode ? t.globalData.getMobileNode.enterTicketCenter : 0;
        0 === t.globalData.hasMobile && 0 === a && 0 !== e ? this.setData({
            phonelicense: !0
        }) : wx.navigateTo({
            url: "couponcenter"
        });
    },
    getPhoneNumber: function(e) {
        var o = this, i = t.globalData.getMobileNode ? t.globalData.getMobileNode.enterTicketCenter : 0;
        if (e.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
            var n = t.globalData.appId, r = t.globalData.session_key, s = new a(n, r).decryptData(e.detail.encryptedData, e.detail.iv);
            t.loadphoneInfo(s.phoneNumber), wx.navigateTo({
                url: "couponcenter"
            });
        } else o.setData({
            authorization: 2
        }), 2 == i ? o.setData({
            allowspopup: !0
        }) : wx.navigateTo({
            url: "couponcenter"
        });
    },
    abolish: function() {
        this.setData({
            allowspopup: !1
        });
    },
    turnOff: function() {
        t.turnOff();
    },
    onProductListScroll: function(t) {
        this.loadMyList();
    }
});