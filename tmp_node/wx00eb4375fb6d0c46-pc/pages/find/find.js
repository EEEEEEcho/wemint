var t = getApp(), e = require("../../utils/wxapp.js"), a = require("../../utils/wxcomm.js");

require("../../utils/util.js");

Page({
    data: {
        latitude: 0,
        longitude: 0,
        isCheck: !1,
        isAuthor: !0,
        controls: [ {
            id: 1,
            iconPath: "./../../utils/imgs/map/location.png",
            position: {
                left: 0,
                top: 10,
                width: 40,
                height: 40
            },
            clickable: !0
        } ],
        smallOpenId: wx.getStorageSync("user").openId,
        markers: [],
        circles: [],
        mapCouponDetail: null,
        mapCouponDetailImg: [],
        showMapCouponDetail: !1
    },
    onLoad: function(t) {},
    getimgsrc: function(t) {
        for (var e = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim, a = [], o = []; o = e.exec(t); ) a.push(o[2]);
        return this.setData({
            mapCouponDetailImg: a.slice(0, 4)
        }), a;
    },
    toAd: function() {
        wx.navigateTo({
            url: "/pages/advertising/advertising"
        });
    },
    getLocation: function() {
        var t = this;
        wx.getLocation({
            type: "gcj02",
            success: function(e) {
                console.log(e);
                var a = e.latitude, o = e.longitude;
                t.setData({
                    circles: [ {
                        latitude: a,
                        longitude: o,
                        color: "#7cb5ec00",
                        fillColor: "#7cb5ec88",
                        radius: 1e3,
                        strokeWidth: 1
                    } ],
                    latitude: a,
                    longitude: o
                });
            }
        });
    },
    regionChange: function(t) {
        var e = this;
        "end" === t.type && setTimeout(function() {
            e.getLngLat();
        }, 300);
    },
    getLngLat: function() {
        var t = this, e = wx.createMapContext("map"), a = this.data.markers;
        e.getCenterLocation({
            success: function(e) {
                console.log(e), a.splice(0, 1, {
                    id: "abc",
                    iconPath: "./../../utils/imgs/adicon.png",
                    longitude: e.longitude,
                    latitude: e.latitude,
                    width: 40,
                    height: 40
                }), t.setData({
                    markers: a,
                    circles: [ {
                        latitude: e.latitude,
                        longitude: e.longitude,
                        color: "#7cb5ec00",
                        fillColor: "#7cb5ec88",
                        radius: 1e3,
                        strokeWidth: 2
                    } ]
                }), 0 == e.latitude && 0 == e.longitude && (e.latitude = wx.setStorageSync("adress").latitude, 
                e.longitude = wx.setStorageSync("adress").longitude), t.getMerchantList(e.latitude, e.longitude);
            }
        });
    },
    getMerchantList: function(t, o) {
        var i = this, n = e.projectUrl + "/miniProgram/locationMore?latitude=" + t + "&longitude=" + o;
        a.reqGet(n).then(function(t) {
            if (t.data.rows.length > 0) {
                wx.hideToast();
                var e = i.data.markers, a = void 0, o = void 0;
                console.log(t);
                var n = !0, s = !1, r = void 0;
                try {
                    for (var l, c = t.data.rows[Symbol.iterator](); !(n = (l = c.next()).done); n = !0) {
                        var u = l.value, p = u.id;
                        "1" == u.merchantType ? (o = "#ff8956", a = "./../../utils/imgs/map/zhengcan.png") : "2" == u.merchantType ? (o = "#b9714b", 
                        a = "./../../utils/imgs/map/dangao.png") : "3" == u.merchantType ? (o = "#6a86fc", 
                        a = "./../../utils/imgs/map/meifa.png") : "4" == u.merchantType ? (o = "#6a86fc", 
                        a = "./../../utils/imgs/map/meirong.png") : "5" == u.merchantType ? (o = "#ff8956", 
                        a = "./../../utils/imgs/map/zhengcan.png") : "6" == u.merchantType ? (o = "#fc6f6e", 
                        a = "./../../utils/imgs/map/naicha.png") : "7" == u.merchantType ? (o = "#fc6f6e", 
                        a = "./../../utils/imgs/map/jianshen.png") : "8" == u.merchantType ? (o = "#9a40ff", 
                        a = "./../../utils/imgs/map/yule.png") : "9" == u.merchantType ? (o = "#9a40ff", 
                        a = "./../../utils/imgs/map/chongwu.png") : "10" == u.merchantType ? (o = "#ff5656", 
                        a = "./../../utils/imgs/map/jiayou.png") : "11" == u.merchantType ? (o = "#ff5656", 
                        a = "./../../utils/imgs/map/car.png") : "12" == u.merchantType ? (o = "#9a40ff", 
                        a = "./../../utils/imgs/map/ktv.png") : "13" == u.merchantType ? (o = "#9a40ff", 
                        a = "./../../utils/imgs/map/jiaoyu.png") : "14" == u.merchantType ? (o = "#9a40ff", 
                        a = "./../../utils/imgs/map/jianshen.png") : "15" == u.merchantType ? (o = "#84cf00", 
                        a = "./../../utils/imgs/map/shuiguo.png") : "14" == u.merchantType ? (o = "#9a40ff", 
                        a = "./../../utils/imgs/map/jianshen.png") : (o = "#d1d1d1", a = "./../../utils/imgs/map/badshop.png"), 
                        null != u.latitude && null != u.longitude && e.push({
                            iconPath: a,
                            id: p,
                            latitude: u.latitude,
                            longitude: u.longitude,
                            width: 35,
                            height: 45,
                            zIndex: -99,
                            detail: u,
                            label: {
                                content: 3 == u.type ? Math.round(1e3 * u.amount) / 100 + "折券" : 4 == u.type ? "体验券" : u.amount + "元券",
                                color: "#ffffff",
                                anchorX: 18,
                                anchorY: -40,
                                textAlign: "center",
                                fontSize: 10,
                                bgColor: o,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: o,
                                padding: 2
                            },
                            callout: {
                                content: u.couponsTitle ? u.couponsTitle : u.name,
                                color: "#ffffff",
                                textAlign: "center",
                                bgColor: o,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: o,
                                padding: 4
                            }
                        });
                    }
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    s = !0, r = t;
                } finally {
                    try {
                        !n && c.return && c.return();
                    } finally {
                        if (s) throw r;
                    }
                }
                var g = e.filter();
                i.setData({
                    markers: g
                });
            } else wx.showToast({
                title: "附近一公里暂时没有优惠，请拖动地图到其它地方瞅瞅吧",
                icon: "none",
                duration: 3e3
            });
        });
    },
    calloutTap: function(t) {
        var o = this, i = !0, n = !1, s = void 0;
        try {
            for (var r, l = this.data.markers[Symbol.iterator](); !(i = (r = l.next()).done); i = !0) !function() {
                var i = r.value;
                t.markerId == i.id && (o.getimgsrc(i.detail.remark), 3 == i.detail.type && (i.detail.amount = Math.round(1e3 * i.detail.amount) / 100), 
                a.reqGet(e.projectUrl + "/product/coupons/secondPromote/checkLocation?couponsPromoteId=" + t.markerId).then(function(t) {
                    t.success ? o.setData({
                        isCheck: !0
                    }) : o.setData({
                        isCheck: !1
                    }), o.setData({
                        mapCouponDetail: i.detail,
                        showMapCouponDetail: !0
                    });
                }));
            }();
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            n = !0, s = t;
        } finally {
            try {
                !i && l.return && l.return();
            } finally {
                if (n) throw s;
            }
        }
    },
    toGetCoupon: function() {
        console.log(this.data.mapCouponDetail), t.globalData.merchantConfigId = this.data.mapCouponDetail.pMerchantConfigId, 
        wx.navigateTo({
            url: "/pages/getCoupon/getCoupon?merchantConfigId=" + this.data.mapCouponDetail.pMerchantConfigId + "&smallOpenId=" + this.data.smallOpenId + "&couponsConfigId=" + this.data.mapCouponDetail.id
        });
    },
    hideDetail: function() {
        this.setData({
            showMapCouponDetail: !1
        });
    },
    controltap: function(t) {
        this.setData({
            showMapCouponDetail: !1
        }), this.moveToLocation();
    },
    moveToLocation: function() {
        wx.createMapContext("map").moveToLocation();
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
                0 == e.authSetting["scope.userLocation"] ? t.setData({
                    isAuthor: !1
                }) : (t.setData({
                    isAuthor: !0
                }), t.getLocation());
            }
        });
    },
    choseAdress: function() {
        wx.openSetting({
            success: function(t) {
                console.log(t);
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "探索身边优惠",
            imageUrl: "https://imgs.52wxr.com/upload/image/201901/20190122/1548146339888061576.jpg",
            path: "/page/index/index"
        };
    }
});