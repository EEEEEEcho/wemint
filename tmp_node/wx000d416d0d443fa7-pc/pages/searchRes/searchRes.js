var t = require("../../utils/server"), a = require("../../config.js"), e = "https://up-img.0xiao.cn", o = {};

Page({
    data: {
        hasFood: !1,
        hasShop: !1,
        isEmpty: !1
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "搜索结果"
        }), o = {
            authorization: wx.getStorageSync("authorization")
        }, this.getInitData(t);
    },
    getInitData: function(s) {
        var r = this, i = {
            spread_token: a.resToken,
            word: s.word
        };
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), t.getApiJSON("/api/mini/getShopAndFoodByKeyword", i, function(t) {
            if (1e3 == t.data.code) {
                var a = t.data.data.food, o = t.data.data.shop, s = !1, i = !1;
                if (0 != a.length) {
                    for (var n in a) "" == a[n].goods_path ? a[n].goods_path = "../../images/logo_100.png" : a[n].goods_path = e + a[n].goods_path;
                    s = !0;
                }
                0 != o.length && (o = r.pictureInit(o), o = r.marketInit(o), r.setData({
                    shopList: o
                }), i = !0), 0 == o.length && 0 == a.length && r.setData({
                    isEmpty: !0
                }), r.setData({
                    foodList: a,
                    shopList: o,
                    hasFood: s,
                    hasShop: i
                }), wx.hideLoading();
            } else wx.hideLoading(), getApp().showAndHideToast(t.data.msg);
        }, o);
    },
    toShop: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.token;
        wx.navigateTo({
            url: "../shopDetail/shopDetail?shoptoken=" + e + "&shopid=" + a
        });
    },
    pictureInit: function(t) {
        for (var a in t) {
            switch ("" == t[a].logo_path ? t[a].logo_path = "../../images/logo_100.png" : t[a].logo_path = e + t[a].logo_path, 
            t[a].status) {
              case 1:
                t[a].statusText = "营业中";
                break;

              case 2:
                t[a].statusText = "可预订";
                break;

              case 3:
                t[a].statusText = "已打烊";
                break;

              case 4:
                t[a].statusText = "休息中";
            }
            t[a].full_star = Math.floor(t[a].star / 2), t[a].half_star = +t[a].star % 2, t[a].empty_star = Math.floor((10 - t[a].star) / 2), 
            t[a].is_open = 0;
        }
        return t;
    },
    marketInit: function(t) {
        var a = [];
        for (var e in t) {
            a = t[e].market;
            for (var o in a) switch (a[o].rule_id) {
              case 1:
                a[o].rule_name = "首";
                break;

              case 2:
                a[o].rule_name = "满";
                break;

              case 3:
                a[o].rule_name = "时";
                break;

              case 4:
                a[o].rule_name = "全";
            }
            t[e].market.length >= 2 ? t[e].showMarket = [ t[e].market[0], t[e].market[1] ] : t[e].showMarket = t[e].market;
        }
        return t;
    }
});