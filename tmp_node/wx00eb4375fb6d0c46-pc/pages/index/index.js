getApp();

var t = require("../../utils/wxapp.js"), a = require("../../utils/wxcomm.js"), e = require("../../utils/util.js");

Page({
    data: {
        motto: "Hello 探惠",
        indicatorDots: !1,
        showUnderLine: !1,
        vertical: !1,
        autoplay: !1,
        circular: !0,
        interval: 2e3,
        duration: 500,
        previousMargin: 50,
        nextMargin: 50,
        showMoreTab: !1,
        noData: !1,
        showLoading: !0,
        isLoading: !0,
        thisItem: 0,
        tabActive: 1,
        isGz: !0,
        pageNumber: 1,
        orgtype: 0,
        location: "gz",
        adress: "选择当前位置",
        tabList: [],
        _num: 0,
        userInfo: {},
        showDetail: !1,
        merchantList: [],
        couponList: [],
        couponDetail: {},
        latitude: 0,
        longitude: 0
    },
    onReachBottom: function() {
        wx.showNavigationBarLoading(), this.setData({
            pageNumber: this.data.pageNumber + 1
        }), this.getRecommend(this.data._num, this.data.longitude, this.data.latitude, this.data.orgtype);
    },
    onShareAppMessage: function() {
        return {
            title: "探索身边优惠",
            imageUrl: "https://imgs.52wxr.com/upload/image/201901/20190122/1548146339888061576.jpg",
            path: "/page/index/index"
        };
    },
    closeCouponDetail: function() {
        this.setData({
            showDetail: !1
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    toSearch: function() {
        wx.navigateTo({
            url: "/pages/search/search"
        });
    },
    toActivity: function() {
        wx.navigateTo({
            url: "/pages/activity/activity"
        });
    },
    itemChange: function(t) {
        this.setData({
            thisItem: t.detail.current
        });
    },
    toActivityDetail: function(t) {
        6 == t.currentTarget.dataset.type ? wx.navigateTo({
            url: "/pages/chinaSy/chinaSy"
        }) : wx.navigateTo({
            url: "/pages/activityDetail/activityDetail?type=" + t.currentTarget.dataset.type
        });
    },
    toMy: function() {
        wx.navigateTo({
            url: "/pages/my/my"
        });
    },
    getCouponFun: function() {
        console.log(this.data.couponDetail);
        var t = this.data.couponDetail.merchantConfigId, a = wx.getStorageSync("user").openId, e = this.data.couponDetail.couponsConfigId;
        wx.navigateTo({
            url: "/pages/getCoupon/getCoupon?merchantConfigId=" + t + "&smallOpenId=" + a + "&couponsConfigId=" + e
        });
    },
    scanCode: function() {
        wx.scanCode({
            success: function(t) {},
            fail: function(t) {}
        });
    },
    choseAdress: function() {
        wx.getSetting({
            success: function(t) {
                0 == t.authSetting["scope.userLocation"] ? wx.openSetting({
                    success: function(t) {
                        console.log(t);
                    }
                }) : wx.navigateTo({
                    url: "/pages/position/position"
                });
            }
        });
    },
    getCouponDetail: function(t) {
        this.setData({
            showDetail: !0,
            couponDetail: t.currentTarget.dataset.coupon
        });
    },
    onGetCode: function(t) {
        this.setData({
            showDetail: t.detail.val
        });
    },
    getLocation: function() {
        var t = this;
        wx.getLocation({
            type: "gcj02",
            success: function(e) {
                console.log(e), wx.setStorageSync("adress", e), t.setData({
                    latitude: e.latitude,
                    longitude: e.longitude
                }), a.reqGet("https://apis.map.qq.com/ws/geocoder/v1/?location=" + e.latitude + "," + e.longitude + "&key=ODXBZ-4QL6Q-YPZ5G-GSGBW-AJ7SQ-EIFLA&get_poi=0&poi_options=policy=5").then(function(a) {
                    t.setData({
                        adress: a.data.result.formatted_addresses.recommend
                    });
                });
                var o = Math.abs(e.longitude - 113.3710098267) + Math.abs(e.latitude - 22.9463799362), n = Math.abs(e.longitude - 115.858039856) + Math.abs(e.latitude - 28.6829828023), i = Math.abs(e.longitude - 114.41612) + Math.abs(e.latitude - 27.81443);
                console.log("gz:" + o), console.log("nc" + n), console.log("yc" + i);
                var s = Math.min(o, n, i);
                console.log("location:" + s), s == o ? t.setData({
                    location: "gz"
                }) : s == n ? t.setData({
                    location: "nc"
                }) : s == i && t.setData({
                    location: "yc"
                });
            }
        });
    },
    openLocation: function(t) {
        wx.openLocation({
            latitude: t.currentTarget.dataset.msg.latitude,
            longitude: t.currentTarget.dataset.msg.longitude,
            scale: "",
            name: t.currentTarget.dataset.msg.subbranchName,
            address: t.currentTarget.dataset.msg.address,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    checkAll: function() {
        wx.navigateTo({
            url: "/pages/allCard/allCard"
        });
    },
    showMore: function(t) {
        this.setData({
            showMoreTab: !this.data.showMoreTab,
            tabActive: 2
        });
    },
    menuClick: function(t) {
        this.setData({
            couponList: [],
            pageNumber: 1,
            _num: t.target.dataset.num,
            isLoading: !0,
            tabActive: t.target.dataset.tabactive,
            orgtype: t.target.dataset.orgtype
        }), this.data.showMoreTab && this.setData({
            showMoreTab: !1
        }), this.getRecommend(t.target.dataset.num, this.data.longitude, this.data.latitude, t.target.dataset.orgtype);
    },
    bindViewTap: function(t) {
        var a = t.currentTarget.dataset.merchant.shortName + "|" + t.currentTarget.dataset.merchant.merchantConfigId;
        wx.navigateTo({
            url: "/pages/merchant/merchant?param=" + a
        });
    },
    onLoad: function(e) {
        var o = this;
        if (wx.setStorageSync("adressMsg", ""), void 0 !== e && 1 == e.param) {
            var n = wx.getStorageSync("user").openId, i = t.projectUrl + "/miniProgram/jump", s = {
                smallOpenId: n
            };
            a.reqPost(i, s, "application/x-www-form-urlencoded").then(function(t) {
                console.log(t), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), t.data.success ? wx.reLaunch({
                    url: "/pages/hasWx/hasWx"
                }) : wx.getStorageSync("user") && wx.getStorageSync("user").openId ? o.getMerchantList() : wx.reLaunch({
                    url: "/pages/welcome/welcome"
                });
            });
        } else wx.getStorageSync("user") && wx.getStorageSync("user").openId ? this.getMerchantList() : wx.reLaunch({
            url: "/pages/welcome/welcome"
        });
    },
    onShow: function() {
        var t = this, a = wx.getStorageSync("adressMsg");
        if (a) {
            t.setData({
                adress: a.name,
                couponList: [],
                longitude: a.longitude,
                latitude: a.latitude
            });
            var e = Math.abs(a.longitude - 113.3710098267) + Math.abs(a.latitude - 22.9463799362), o = Math.abs(a.longitude - 115.858039856) + Math.abs(a.latitude - 28.6829828023), n = Math.abs(a.longitude - 114.41612) + Math.abs(a.latitude - 27.81443);
            console.log("gz:" + e), console.log("nc" + o), console.log("yc" + n);
            var i = Math.min(e, o, n);
            console.log("location:" + i), i == e ? t.setData({
                location: "gz"
            }) : i == o ? t.setData({
                location: "nc"
            }) : i == n && t.setData({
                location: "yc"
            });
        } else this.getLocation();
        t.getNavigationbar();
    },
    getRecommend: function(o, n, i, s) {
        var r = this, c = wx.getStorageSync("user").openId, l = t.projectUrl + "/miniProgram/preciseRecommend", u = {
            smallOpenId: c,
            longitude: n,
            latitude: i,
            orgType: s,
            merchantType: o,
            pageNumber: this.data.pageNumber,
            pageSize: 2,
            admAdminId: "yc" == this.data.location ? "f0132a8292324c8b87be331e7dfe62ac" : "nc" == this.data.location ? "0d34ef61c2ab4564859f90738419bf62" : ""
        };
        a.reqPost(l, u, "application/x-www-form-urlencoded").then(function(t) {
            if (wx.hideNavigationBarLoading(), r.setData({
                isLoading: !1
            }), null !== t.data.rows && t.data) if (t.data.rows.length > 0) {
                var a = !0, o = !1, n = void 0;
                try {
                    for (var i, s = t.data.rows[Symbol.iterator](); !(a = (i = s.next()).done); a = !0) {
                        var c = i.value;
                        e.couponLimit(c);
                    }
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    o = !0, n = t;
                } finally {
                    try {
                        !a && s.return && s.return();
                    } finally {
                        if (o) throw n;
                    }
                }
                var l = !0, u = !1, d = void 0;
                try {
                    for (var g, h = t.data.rows[Symbol.iterator](); !(l = (g = h.next()).done); l = !0) {
                        var p = g.value;
                        p.extraParams.indexOf("、") > 0 && (p.extraParams = p.extraParams.split("、")[0]), 
                        3 == p.type && (p.amount = Math.round(1e3 * p.amount) / 100), p.remark = p.remark.replace(/\<img/g, '<img style="max-width:100%;height:auto;"');
                    }
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    u = !0, d = t;
                } finally {
                    try {
                        !l && h.return && h.return();
                    } finally {
                        if (u) throw d;
                    }
                }
                var m = r.data.couponList.concat(t.data.rows);
                r.setData({
                    couponList: m
                });
            } else 1 == r.data.pageNumber ? r.setData({
                noData: !0
            }) : r.setData({
                showUnderLine: !0
            });
        });
    },
    getNavigationbar: function() {
        var e = this, o = this;
        a.reqGet(t.projectUrl + "/miniProgram/navigationbar").then(function(t) {
            t.data.success && (e.setData({
                tabList: t.data.rows
            }), o.getRecommend(0, o.data.longitude, o.data.latitude, 2));
        });
    },
    getMerchantList: function() {
        var o = this, n = wx.getStorageSync("user").openId, i = t.projectUrl + "/miniProgram/loadingFirst", s = {
            smallOpenId: n,
            pageNumber: 1,
            pageSize: 100
        };
        a.reqPost(i, s, "application/x-www-form-urlencoded").then(function(t) {
            if (wx.hideNavigationBarLoading(), wx.stopPullDownRefresh(), null != t.data.rows) {
                for (var a = 0; a < t.data.rows.length; a++) null != t.data.rows[a].createTime && (t.data.rows[a].createTime = e.formatDatebox(t.data.rows[a].createTime, "yyyy-MM-dd")), 
                null != t.data.rows[a].recentlyAccess ? t.data.rows[a].recentlyAccess = e.formatDatebox(t.data.rows[a].recentlyAccess, "yyyy-MM-dd") : t.data.rows[a].recentlyAccess = "未消费";
                o.setData({
                    merchantList: t.data.rows,
                    showLoading: !1
                });
            }
        });
    }
});