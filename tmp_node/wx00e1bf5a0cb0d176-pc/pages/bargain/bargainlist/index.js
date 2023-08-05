var t = require("../../../common.js"), e = require("../../../components/utils/qqmap-wx-jssdk.min.js"), a = getApp();

Page({
    onShareAppMessage: function() {
        return a.shareAppMessage("/pages/bargain/bargainlist/index");
    },
    data: {
        actId: "",
        activityListpage: 1,
        statPage: 1,
        nomore: !1,
        baseUrl: a.globalData.siteBaseUrl,
        pullDownRefreshFlag: !0,
        bargainlist: [],
        activityTime: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        windowHeight: 0,
        selectNum: 0,
        datalist: [],
        actInfo: {},
        notEffective: !1,
        ellipsisShow: !1,
        hasBargain: !1
    },
    onPullDownRefresh: function() {
        var t = this;
        t.data.pullDownRefreshFlag && (t.setData({
            pullDownRefreshFlag: !1
        }), t.data.pullDownRefreshFlag = !1, t.data.queryparams.refresh = !0, t.isloading = !1, 
        setTimeout(function() {
            t.setData({
                selectNum: 0,
                activityListpage: 1,
                datalist: [],
                nomore: !1
            }), t.initData(t.data.queryparams), t.setData({
                pullDownRefreshFlag: !0
            }), wx.stopPullDownRefresh();
        }, 1500));
    },
    onLoad: function(t) {
        var s = this, i = this;
        if (a.doAfterUserInfoAuth({
            success: this.initData,
            fail: this.initData
        }), this.setData({
            queryparams: t
        }), "1" === wx.getStorageSync("StoreSetting")) {
            var n = "&storeId=" + wx.getStorageSync("options").storeID + "&lng=" + wx.getStorageSync("lng") + "&lat=" + wx.getStorageSync("lat");
            a.sendRequest({
                url: "/index.php?c=Front/WxApp/ShopApi&a=getIndexStoreInfo" + n,
                method: "GET",
                success: function(t) {
                    t.success && s.setData({
                        SiteLogo: t.data.SiteLogo,
                        nearbyStoreNumber: t.data.nearbyStoreNumber
                    });
                }
            }), a.sendRequest({
                url: "/index.php?c=Front/WxApp/JsonApi&a=getStoreSetting",
                method: "GET",
                success: function(t) {
                    t.success ? (s.setData({
                        StoreSetting: t.StoreSetting
                    }), "1" === t.StoreSetting && a.sendRequest({
                        url: "/index.php?c=Front/WxApp/ShopApi&a=getTencentMapApiKey",
                        method: "GET",
                        success: function(a) {
                            a.success ? (wx.setStorageSync("StoreSetting", t.StoreSetting), wx.getSetting({
                                success: function(t) {
                                    if (t.authSetting["scope.userLocation"]) {
                                        if (t.authSetting["scope.userLocation"]) return;
                                        i.defaultAddress(i);
                                    } else wx.getLocation({
                                        type: "wgs84",
                                        success: function(t) {
                                            new e({
                                                key: a.data.key
                                            }).reverseGeocoder({
                                                location: {
                                                    latitude: Number(t.latitude),
                                                    longitude: Number(t.longitude)
                                                },
                                                success: function(t) {
                                                    i.setData({
                                                        resultData: t
                                                    }), wx.navigateTo({
                                                        url: "/pages/storechoose/storechoose/index?start_address=" + t.result.address + "&city=" + t.result.address_component.city + "&district=" + t.result.address_component.district + "&lat=" + t.result.location.lat + "&lng=" + t.result.location.lng
                                                    });
                                                }
                                            });
                                        },
                                        fail: function(t) {
                                            i.defaultAddress(i);
                                        }
                                    });
                                }
                            })) : wx.showModal({
                                title: "提示",
                                content: t.msg,
                                showCancel: !1
                            });
                        }
                    })) : wx.showModal({
                        title: "提示",
                        content: t.msg,
                        showCancel: !1
                    });
                }
            });
        }
    },
    onShow: function() {},
    initData: function() {
        var t = this;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/Activity/Bargain&a=getActList",
            method: "GET",
            success: function(e) {
                if (e.success) {
                    t.isloading = !1;
                    var s = e.data.list.length > 1 ? wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth / 750 * 88 : wx.getSystemInfoSync().windowHeight;
                    t.setData({
                        windowHeight: s,
                        bargainlist: e.data.list,
                        notEffective: e.data.list.length > 0,
                        ellipsisShow: !0,
                        hasBargain: 1 == e.data.hasBargain,
                        actId: e.data.list[0].actId
                    }), t.activityList(e.data.list[0].actId);
                } else t.isloading = !1, a.showModal({
                    title: "提示",
                    content: e.msg
                });
            },
            fail: function(e) {
                t.isloading = !1, a.showModal({
                    title: "提示",
                    content: e.msg
                });
            }
        });
    },
    activityList: function(e) {
        var s = this, i = "&activityId=" + e + "&page=" + this.data.activityListpage + "&pageSize=20";
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/Activity/Bargain&a=getActInfo" + i,
            method: "GET",
            success: function(e) {
                if (e.success) {
                    s.isloading = !1;
                    var i, n = e.data, o = n.actInfo, r = n.productList;
                    o.currentTime < o.startTime ? (i = "1", t.countTdown(o.startTime - o.currentTime)) : o.currentTime > o.startTime && o.currentTime < o.endTime ? (i = "2", 
                    t.countTdown(o.endTime - o.currentTime)) : o.currentTime > o.startTime && o.currentTime > o.endTime && (i = "3", 
                    t.countTdown(0)), r.forEach(function(t) {
                        s.data.datalist.push(t);
                    }), s.setData({
                        actInfo: o,
                        datalist: s.data.datalist,
                        timestatus: i,
                        statPage: n.statPage
                    });
                } else s.isloading = !1, a.showModal({
                    title: "提示",
                    content: e.msg
                });
            },
            fail: function(t) {
                s.isloading = !1, a.showModal({
                    title: "提示",
                    content: t.msg
                });
            }
        });
    },
    loadList: function(t) {
        this.data.activityListpage < this.data.statPage ? (this.data.activityListpage += 1, 
        this.setData({
            activityListpage: this.data.activityListpage
        }), this.activityList(this.data.actId)) : this.data.activityListpage == this.data.statPage && this.setData({
            nomore: !0
        });
    },
    switchingtab: function(t) {
        if (t.target.dataset.num != this.data.selectNum) {
            this.setData({
                selectNum: t.target.dataset.num,
                actId: t.target.dataset.id,
                activityListpage: 1,
                datalist: [],
                nomore: !1
            });
            var e = t.target.dataset.id;
            this.activityList(e);
        }
    },
    tobuyFn: function(t) {
        var e = this, t = t.currentTarget.dataset;
        console.log(t, "eeeeeeeee"), "2" === e.data.timestatus && 0 != t.stock ? wx.navigateTo({
            url: "/pages/bargain/productdetail/index?id=" + t.proid + "&activityId=" + t.activid
        }) : wx.redirectTo({
            url: "/pages/shop/productdetail?id=" + t.proid
        });
    },
    tobargainman: function() {
        wx.navigateTo({
            url: "/pages/bargain/bargainmanagement/index"
        });
    },
    defaultAddress: function() {
        var t = this, s = "113.315353";
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getIndexStoreList&lng=113.315353&lat=23.086800&type=2&keyword=&page=1&pagesize=20",
            method: "GET",
            success: function(i) {
                if (i.success) {
                    var n = i.data.list[0], o = {
                        start_address: n.ProvinceName + n.CityName + n.DistrictName + n.Address,
                        city: n.CityName,
                        district: n.DistrictName,
                        lat: n.Lantitude,
                        lng: n.Longtitude,
                        Name: n.Name,
                        distance: n.distance,
                        ProvinceName: n.ProvinceName,
                        storeID: n.Id
                    };
                    if (wx.getStorageSync("isFirstIn") && "1" === wx.getStorageSync("isFirstIn")) return;
                    wx.setStorageSync("isFirstIn", "1"), wx.setStorageSync("options", o), a.sendRequest({
                        url: "/index.php?c=Front/WxApp/ShopApi&a=getTencentMapApiKey",
                        method: "GET",
                        success: function(a) {
                            a.success && new e({
                                key: a.data.key
                            }).reverseGeocoder({
                                location: {
                                    latitude: Number("23.086800"),
                                    longitude: Number(s)
                                },
                                success: function(e) {
                                    t.setData({
                                        resultData: e
                                    }), wx.navigateTo({
                                        url: "/pages/storechoose/storechoose/index?start_address=" + e.result.address + "&city=" + e.result.address_component.city + "&district=" + e.result.address_component.district + "&lat=" + e.result.location.lat + "&lng=" + e.result.location.lng
                                    });
                                }
                            });
                        }
                    });
                } else wx.showModal({
                    title: "提示",
                    content: i.msg
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "提示",
                    content: t.msg
                });
            }
        });
    }
});