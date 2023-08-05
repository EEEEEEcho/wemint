var e = getApp(), a = require("../../common.js"), t = require("../../components/wxb.js");

Page({
    isloading: !1,
    onShareAppMessage: function() {
        return e.shareAppMessage("/pages/company/servicelist");
    },
    onLoad: function(t) {
        e.getPageUrl(this, t), e.registerGlobalFunctions(this), this.setData({
            queryparams: t
        }), this.data.queryparams.classid && this.setData({
            classid: this.data.queryparams.classid
        }), this.loadClassList(), this.loadService(!0), a.setPopupFromShare();
    },
    onPullDownRefresh: function() {
        var e = this;
        e.data.pullDownRefreshFlag && (e.isloading = !1, e.setData({
            pullDownRefreshFlag: !1
        }), e.data.pullDownRefreshFlag = !1, e.data.queryparams.refresh = !0, setTimeout(function() {
            e.onLoad(e.data.queryparams), e.setData({
                pullDownRefreshFlag: !0
            }), wx.stopPullDownRefresh();
        }, 1500));
    },
    data: {
        pagesize: 10,
        recordcount: 99,
        servicelist: [],
        classid: 0,
        sortcol: "",
        sort: "",
        protop: 0,
        offsetDis: 0,
        hasproduct: !0,
        pullDownRefreshFlag: !0,
        baseUrl: e.globalData.siteBaseUrl,
        animationData: {},
        searchLoadingComplete: !1,
        plugNavFlag: !0,
        scrollHeight: e.windowHeight * e.pixelRatio - 94 * e.pixelRatio
    },
    loadService: function(a) {
        var t = this;
        if (!t.isloading) {
            t.isloading = !0, a && (t.data.recordcount = 99, t.data.servicelist = []);
            var s = t.data.recordcount, i = t.data.servicelist.length;
            if (s > i) {
                var l = Math.ceil(i / t.data.pagesize) + 1, o = t.data.queryparams.keyword ? t.data.queryparams.keyword : "", r = "";
                t.data.sortcol && (r = "&sortcol=" + t.data.sortcol + "&sort=" + t.data.sort), e.sendRequest({
                    url: "/index.php?c=Front/WxApp/JsonApi&a=getServiceList&addcolumns=ServiceDesc&classid=" + t.data.classid + "&keyword=" + o + "&page=" + l + "&pagesize=" + t.data.pagesize + r,
                    method: "GET",
                    success: function(a) {
                        if (t.isloading = !1, a.success) {
                            for (var s = 0; s < a.servicelist.length; s++) /(\.00)$/.test(a.servicelist[s].Price) && (a.servicelist[s].Price = parseInt(a.servicelist[s].Price)), 
                            t.data.servicelist.push(a.servicelist[s]);
                            a.servicelist.forEach(function(a) {
                                for (var t = 0; t < a.ImgSmall.split("/").length; t++) /product/.test(a.ImgSmall.split("/")[t]) && (a.ImgSmall = "/comdata/" + e.globalData.siteId + "/product/" + a.ImgSmall.split("/")[a.ImgSmall.split("/").length - 1]);
                            }), t.setData({
                                servicelist: t.data.servicelist,
                                recordcount: a.recordcount,
                                hasproduct: t.data.servicelist.length > 0
                            });
                        } else console.log("getServiceList fail：" + a.msg);
                    },
                    fail: function(e) {
                        t.isloading = !1, console.log("getServiceList fail");
                    }
                });
            } else t.setData({
                searchLoadingComplete: !0
            });
        }
    },
    goProductDetail: function(a) {
        var t = this, s = wx.getStorageSync("hasMobile") || 0;
        t.setData({
            serviceid: a.currentTarget.dataset.serviceid
        });
        var i = e.globalData.getMobileNode ? e.globalData.getMobileNode.checkServiceDetails : 0;
        0 === e.globalData.hasMobile && 0 === s && 0 !== i ? t.setData({
            phonelicense: !0
        }) : t.toProductDetail();
    },
    toProductDetail: function() {
        var e = this;
        wx.navigateTo({
            url: "servicedetail?id=" + e.data.serviceid
        });
    },
    getPhoneNumber: function(a) {
        var s = this, i = e.globalData.getMobileNode ? e.globalData.getMobileNode.checkServiceDetails : 0;
        e.globalData.getMobileNode;
        if (a.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
            var l = e.globalData.appId, o = e.globalData.session_key, r = new t(l, o).decryptData(a.detail.encryptedData, a.detail.iv);
            e.loadphoneInfo(r.phoneNumber), s.toProductDetail();
        } else 2 === i ? s.setData({
            allowspopup: !0
        }) : s.toProductDetail();
    },
    turnOff: function() {
        e.turnOff();
    },
    abolish: function() {
        this.setData({
            allowspopup: !1
        });
    },
    goReserve: function(e) {
        var a = e.currentTarget.dataset.serviceid;
        wx.navigateTo({
            url: "reserve-by-service?serviceid=" + a
        });
    },
    onProductListScroll: function(e) {
        this.loadService();
    },
    loadClassList: function(a) {
        var t = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getServiceClassList",
            method: "GET",
            success: function(e) {
                e.success ? (e.list.unshift({
                    ClassID: 0,
                    Name: "全部分类"
                }), wx.getSystemInfo({
                    success: function(a) {
                        console.log(e.list.length), e.list.length > 1 ? t.setData({
                            scrollHeight: a.windowHeight - 44
                        }) : t.setData({
                            scrollHeight: a.windowHeight
                        });
                    }
                }), t.setData({
                    classlist: e.list
                })) : console.log("getServiceClassList fail：" + e.msg);
            },
            fail: function(e) {
                console.log("getServiceClassList fail");
            }
        });
    },
    onClassChange: function(e) {
        var a = this, t = e.currentTarget.dataset.index;
        if (this.data.classid == e.currentTarget.dataset.classid) return !1;
        a.setData({
            classid: e.currentTarget.dataset.classid,
            protop: 0
        }), a.isloading = !1, a.loadService(!0);
        var s;
        s = t >= 3 ? 170 * (t - 2) / 2 + 30 : 0, a.setData({
            offsetDis: s
        });
    },
    navBtnShowAndHide: function() {
        var e = !this.data.plugNavFlag;
        this.setData({
            plugNavFlag: e
        });
    }
});