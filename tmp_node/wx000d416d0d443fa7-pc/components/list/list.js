var t = require("../../utils/server"), e = require("../../config.js"), a = {};

Component({
    properties: {
        sortList: {
            type: Object,
            value: "",
            observer: function(t, e) {
                null != t && (null == e ? this._sortShop(t) : t.sortTypeNum == e.sortTypeNum && t.page != e.page ? this.data.isEnd || this._sortShop(t) : t.sortTypeNum != e.sortTypeNum && 1 == t.page ? this._sortHttp(t) : wx.hideLoading());
            }
        },
        list: Array
    },
    attached: function() {
        this._headerPromise();
    },
    data: {
        isEnd: !1
    },
    methods: {
        _toShop: function(t) {
            var e = t.currentTarget.dataset.shoptoken, a = t.currentTarget.dataset.shopid;
            wx.navigateTo({
                url: "../shopDetail/shopDetail?shoptoken=" + e + "&shopid=" + a
            });
        },
        _turnPage: function(t) {},
        _sortShop: function(t) {
            this._sortHttp(t, 1);
        },
        _sortHttp: function(s, i) {
            var o = s.sortTypeNum, r = s.page, n = s.sortid, h = this.data.list, d = this;
            if (2 == o) wx.showLoading({
                title: "加载中",
                mask: !0
            }), wx.getLocation({
                success: function(t) {
                    var e = t.longitude + "," + t.latitude;
                    d._getSort(o, r, e);
                },
                fail: function(t) {
                    wx.showModal({
                        title: "定位失败",
                        content: "是否重新定位",
                        success: function(t) {
                            if (t.confirm) d._sortHttp(s, i); else if (t.cancel) return;
                        }
                    });
                }
            }); else if (0 == o) {
                wx.showLoading({
                    title: "加载中",
                    mask: !0
                });
                var p = {
                    sort_id: n,
                    spread_token: e.resToken,
                    page: r
                };
                t.getApiJSON("/api/mini/getShopInSort", p, function(t) {
                    if (1e3 == t.data.code) {
                        if (t.data.data.data.length > 0) {
                            var e = t.data.data.data;
                            if (e = d._pictureInit(e), e = d._marketInit(e), 1 == r) h = e; else if (void 0 != e[0]) for (var a in e) h.push(e[a]);
                            var s = {
                                list: h,
                                page: r
                            };
                            e.length < 15 && (s.isEnd = !0), d.setData(s);
                        } else d.setData({
                            list: [],
                            page: 1,
                            isEnd: !0
                        });
                        wx.hideLoading();
                    } else wx.hideLoading(), getApp().showAndHideToast(t.data.msg);
                }, a);
            } else wx.showLoading({
                title: "加载中",
                mask: !0
            }), d._getSort(o, r);
        },
        _pictureInit: function(t) {
            for (var e in t) {
                switch ("" == t[e].logo_path ? t[e].logo_path = "../../images/logo_100.png" : t[e].logo_path = "https://up-img.0xiao.cn" + t[e].logo_path, 
                t[e].status) {
                  case 1:
                    t[e].statusText = "营业中";
                    break;

                  case 2:
                    t[e].statusText = "可预订";
                    break;

                  case 3:
                    t[e].statusText = "已打烊";
                    break;

                  case 4:
                    t[e].statusText = "休息中";
                }
                t[e].full_star = Math.floor(t[e].star / 2), t[e].half_star = +t[e].star % 2, t[e].empty_star = Math.floor((10 - t[e].star) / 2), 
                t[e].is_open = 0;
            }
            return t;
        },
        _marketInit: function(t) {
            var e = [];
            for (var a in t) {
                e = t[a].market;
                for (var s in e) switch (e[s].rule_id) {
                  case 1:
                    e[s].rule_name = "首";
                    break;

                  case 2:
                    e[s].rule_name = "满";
                    break;

                  case 3:
                    e[s].rule_name = "时";
                    break;

                  case 4:
                    e[s].rule_name = "全";
                }
                t[a].market.length >= 2 ? t[a].showMarket = [ t[a].market[0], t[a].market[1] ] : t[a].showMarket = t[a].market;
            }
            return t;
        },
        _showAllActive: function(t) {
            var e = t.currentTarget.dataset.id, a = this.data.list;
            for (var s in a) e == a[s].shop_id && (0 == a[s].is_open ? (a[s].is_open = 1, a[s].showMarket = a[s].market) : (a[s].is_open = 0, 
            a[s].showMarket = [ a[s].market[0], a[s].market[1] ]));
            console.log(this), this.setData({
                list: a
            });
        },
        _getSort: function(s, i, o) {
            var r = this, n = {
                spread_token: e.resToken,
                sort_type: s
            };
            1 == arguments.length && (i = 1), arguments.length >= 2 && "number" == typeof arguments[1] && (n.page = i), 
            arguments.length >= 3 && "string" == typeof arguments[2] && (n.user_tag = o), 1 == i && (r.data.isEnd = !1), 
            t.getApiJSON("/api/mini/getShopBySorting", n, function(t) {
                if (1e3 == t.data.code) {
                    var e = t.data.data.data;
                    e = r._pictureInit(e);
                    var a = e = r._marketInit(e);
                    if (2 == s) for (var o in e) e[o].distance += "km";
                    if (i > 1 && e.length > 0) {
                        a = r.data.list;
                        for (var n in e) a.push(e[n]);
                    } else e.length <= 0 && (a = r.data.list);
                    var h = {
                        list: a,
                        page: i,
                        _sort: 1
                    };
                    e.length < 15 && (h.isEnd = !0), r.setData(h), wx.hideLoading();
                } else wx.hideLoading(), getApp().showAndHideToast(t.data.msg);
            }, a);
        },
        _headerPromise: function() {
            return new Promise(function(t, e) {
                a = {
                    authorization: wx.getStorageSync("authorization")
                }, t(!0);
            });
        }
    }
});