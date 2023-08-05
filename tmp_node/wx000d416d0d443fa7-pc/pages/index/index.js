var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = require("../../utils/server.js"), t = require("../../config.js"), s = require("../../utils/utils.js"), o = "https://up-img.0xiao.cn", n = {};

Page({
    onLoad: function() {
        wx.hideTabBar({});
        var e = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), s.login().then(function(a) {
            "really" == a ? e.getIndexData().then(function(a) {
                if (a) {
                    var t = e.data.recommend[0].name;
                    e.sendSortArg(t);
                }
            }) : "hypocrisy" == a && e.getElse();
        }), "" == wx.getStorageSync("userInfo") && (getApp().showAndHideToast("您还未设置收货地址，请填写地址"), 
        wx.chooseAddress({
            success: function(a) {
                wx.setStorageSync("userInfo", {
                    userAddress: a.provinceName + a.cityName + a.countyName + a.detailInfo,
                    userName: a.userName,
                    userTel: a.telNumber,
                    nowLocal: a.cityName + a.countyName + a.detailInfo
                });
                var t = wx.getStorageSync("userInfo").nowLocal;
                void 0 != t && t.split("").length > 8 && (t = t.substring(0, 8), e.setData({
                    hasEll: !0,
                    nowLocal: t
                }));
            }
        }));
    },
    onShow: function() {
        var e = this;
        this.data.isShowReally && this.getIndexData().then(function(a) {
            if (a) {
                var t = e.data.recommend[0].name;
                e.sendSortArg(t);
            }
        });
    },
    onReachBottom: function() {
        if (this.data.isShowReally) {
            var e = this.data.nowName, a = this.data.page + 1;
            this.sendSortArg(e, a, 0);
        }
    },
    onShareAppMessage: function(e) {
        return "button" === e.from && console.log(e.target), {
            title: this.data.spreadTitle,
            path: "/pages/index/index",
            success: function(e) {},
            fail: function(e) {}
        };
    },
    data: {
        imgUrls: [],
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        advertise: [],
        category: [],
        allCategory: [],
        page: 1,
        recommend: [],
        sort: [ "综合排序", "销量最高", "评论最多", "起送最低" ],
        _sort: 1,
        nowNavPage: 0,
        isMove: 0,
        clientXOld: "",
        nowLocal: "点击设置收货地址",
        hasEll: !1,
        marquee: {
            width: 0,
            text: ""
        },
        isShowReally: !1,
        isShowHypocrisy: !1,
        elseSort: [ {
            src: "../../images/elseImages/distribution.png",
            name: "家政服务"
        }, {
            src: "../../images/elseImages/reservation.png",
            name: "美食预订"
        }, {
            src: "../../images/elseImages/Education.png",
            name: "教育培训"
        }, {
            src: "../../images/elseImages/loacl.png",
            name: "跑腿配送"
        }, {
            src: "../../images/elseImages/water.png",
            name: "上门送水"
        }, {
            src: "../../images/elseImages/food.png",
            name: "食材商贸"
        }, {
            src: "../../images/elseImages/mall.png",
            name: "商城便利"
        }, {
            src: "../../images/elseImages/moving.png",
            name: "送货搬家"
        } ]
    },
    getIndexData: function(e) {
        var s = this;
        return new Promise(function(e, r) {
            wx.showTabBar({});
            var i = s, c = {
                spread_token: t.resToken
            };
            s.headerPromise().then(function(t) {
                t && (wx.showLoading({
                    title: "加载中",
                    mask: !0
                }), a.getApiJSON("/api/spread/getAllSpreadConfig", c, function(a) {
                    if (1e3 == a.data.code) {
                        var t = a.data.data.top_notice, s = a.data.data.plat_name, n = a.data.data.navigation, c = a.data.data.banner, d = a.data.data.advertise, l = i.pictureInit(a.data.data.preferred_shop);
                        void 0 == l && (l = []);
                        var g = a.data.data.recommend.preferred_desc || "", h = a.data.data.recommend.sort_status.split('"')[0].split(","), u = a.data.data.recommend.recommend_is_on, m = a.data.data.recommend.sorting_is_on, p = a.data.data.recommend.status_is_on, f = [], v = a.data.data.recommend.preferred_sort_id || 0, w = a.data.data.recommend.recommend_sort_id, y = 1, _ = [], S = [];
                        wx.setStorageSync("hotSearch", {
                            hotSearch: a.data.data.hot_search
                        });
                        for (var b in h) switch (+h[b]) {
                          case 1:
                            f.push({
                                name: "综合排序",
                                array: [ "综合排序", "销量最高", "评论最多", "起送最低" ],
                                is_on: m,
                                is_array: 1
                            });
                            break;

                          case 2:
                            f.push({
                                name: "距离最近",
                                is_on: p,
                                is_array: 0
                            });
                            break;

                          case 3:
                            f.push({
                                name: "推荐店铺",
                                is_on: u,
                                is_array: 0
                            });
                        }
                        for (var N in n) n[N].nav_pic = o + n[N].nav_pic;
                        y = Math.ceil(n.length / 8);
                        for (var x = 0; x < y; x++) n.length > 1 ? (_ = n.splice(x, 8 * (x + 1)), S.push(_)) : S.push(n);
                        if (null == c || !c || c.length <= 0) c = [ {
                            banner_id: 0,
                            banner_pic: "../../images/banner.jpg"
                        } ]; else if (c.length > 0) for (var L in c) c[L].banner_pic = o + c[L].banner_pic;
                        wx.setStorageSync("bannerImg", {
                            imgSrc: c
                        });
                        for (var T in d) d[T].advertise_pic = o + d[T].advertise_pic;
                        var I = wx.getStorageSync("userInfo").nowLocal;
                        if (void 0 != (I = void 0 == I ? "点击设置收货地址" : I) && I.split("").length > 8 && (I = I.substring(0, 8), 
                        i.setData({
                            hasEll: !0,
                            nowLocal: I
                        })), wx.setNavigationBarTitle({
                            title: s
                        }), "" != t) {
                            var D = i.getWidth(t);
                            i.setData({
                                marquee: {
                                    width: D,
                                    text: t
                                }
                            });
                        } else i.setData({
                            noTopNotice: !0
                        });
                        S.length > 0 && i.setData({
                            category: S[0]
                        }), i.setData({
                            allCategory: S,
                            imgUrls: c,
                            advertise: d,
                            advertiseName: a.data.data.advertise_name,
                            recommend: f,
                            sortRecommend: w,
                            navigateAreaNum: y,
                            nowLocal: I,
                            nowName: "综合排序",
                            spreadTitle: s,
                            crossName: g,
                            preferred_shop: l,
                            page: 1,
                            isShowReally: !0,
                            moreId: v,
                            nowNavPage: 0
                        }), wx.hideLoading(), e(!0);
                    } else wx.hideLoading(), getApp().showAndHideToast(a.data.msg), r("failed");
                }, n));
            });
        });
    },
    toShop: function(e) {
        var a = e.currentTarget.dataset.shoptoken, t = e.currentTarget.dataset.shopid;
        wx.navigateTo({
            url: "../shopDetail/shopDetail?shoptoken=" + a + "&shopid=" + t
        });
    },
    setLocation: function(e) {
        var a = this;
        wx.chooseAddress({
            success: function(e) {
                wx.setStorageSync("userInfo", {
                    userAddress: e.provinceName + e.cityName + e.countyName + e.detailInfo,
                    userName: e.userName,
                    userTel: e.telNumber,
                    nowLocal: e.cityName + e.countyName + e.detailInfo
                });
                var t = wx.getStorageSync("userInfo").nowLocal;
                void 0 != t && t.split("").length > 8 && (t = t.substring(0, 8), a.setData({
                    hasEll: !0,
                    nowLocal: t
                }));
            }
        });
    },
    bannerLink: function(e) {
        var a = e.target.dataset.bannerid;
        wx.navigateTo({
            url: "../shopList/shopList?ListId=" + a
        });
    },
    navigationLink: function(e) {
        this.setData({
            isMove: 0
        });
        var a = e.currentTarget.dataset.navsortid;
        2 == e.currentTarget.dataset.navtype && wx.navigateTo({
            url: "../shopList/shopList?ListId=" + a
        });
    },
    moveNavigate: function(e) {
        var a = this.data.isMove;
        if ((0 == a && "touchmove" == e.type || "touchend" == e.type) && ("touchmove" == e.type && (console.log("移动中"), 
        a = 1, this.setData({
            isMove: a,
            clientXOld: e.changedTouches[0].clientX
        })), "touchend" == e.type)) {
            console.log("移动完成");
            var t = e.changedTouches[0].clientX;
            if (t - this.data.clientXOld < -30 && this.data.nowNavPage < this.data.allCategory.length) {
                var s = this.data.nowNavPage + 1;
                this.setData({
                    nowNavPage: s,
                    category: this.data.allCategory[s],
                    clientXOld: t,
                    isMove: 0
                });
            } else if (t - this.data.clientXOld > 30 && this.data.nowNavPage > 0) {
                var o = this.data.nowNavPage - 1;
                this.setData({
                    nowNavPage: o,
                    category: this.data.allCategory[o],
                    clientXOld: t,
                    isMove: 0
                });
            }
        }
    },
    pictureInit: function(e) {
        for (var a in e) {
            switch ("" == e[a].logo_path ? e[a].logo_path = "../../images/logo_100.png" : e[a].logo_path = o + e[a].logo_path, 
            e[a].status) {
              case 1:
                e[a].statusText = "营业中";
                break;

              case 2:
                e[a].statusText = "可预订";
                break;

              case 3:
                e[a].statusText = "已打烊";
                break;

              case 4:
                e[a].statusText = "休息中";
            }
            e[a].full_star = Math.floor(e[a].star / 2), e[a].half_star = +e[a].star % 2, e[a].empty_star = Math.floor((10 - e[a].star) / 2), 
            e[a].is_open = 0;
        }
        return e;
    },
    getWidth: function(e) {
        return [].reduce.call(e, function(a, t, s, o) {
            return e.charCodeAt(s) > 255 ? a++ : a += .5, a;
        }, 0);
    },
    getDuration: function(e) {
        return this.getWidth(e) / 10;
    },
    sendSortArg: function(a, t, s) {
        var o = a, n = this.data._sort;
        "object" === (void 0 === a ? "undefined" : e(a)) ? o = a.currentTarget.dataset.sorttype : (o = a, 
        n = 0), t || (t = 1), s || (s = 1);
        var r = this.data.recommend, i = 0, c = this.data.sortRecommend, d = this.data.nowName;
        if ("距离最近" != o && "推荐店铺" != o) {
            for (var l in r) 1 == r[l].is_array && (r[l].name = o);
            0 == this.data._sort && (d = o);
        } else d = o;
        var g = {
            isEnd: !1,
            recommend: r,
            page: t
        };
        switch (o) {
          case "综合排序":
            i = 1;
            break;

          case "距离最近":
            i = 2;
            break;

          case "推荐店铺":
            i = 0;
            break;

          case "评论最多":
            i = 4;
            break;

          case "起送最低":
            i = 5;
            break;

          case "销量最高":
            i = 3;
        }
        2 == i || 0 == n || 0 == i || 0 == s ? (g.nowName = d, g.sortType = d, g._sort = 1, 
        g.sortList = {
            sortTypeNum: i,
            page: t,
            sortid: c
        }, this.setData(g)) : 1 == n && this.setData({
            _sort: 0
        });
    },
    headerPromise: function() {
        return new Promise(function(e, a) {
            n = {
                authorization: wx.getStorageSync("authorization")
            }, e(!0);
        });
    },
    getElse: function() {
        this.setData({
            isShowHypocrisy: !0
        }), wx.hideLoading();
    },
    toSortList: function(e) {
        wx.navigateTo({
            url: "../elseSortList/elseSortList?num=" + e.currentTarget.dataset.num
        });
    }
});