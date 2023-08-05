var t, o = require("../../../utils/util.js"), e = getApp(), a = e.globalData.httpUrl, s = e.globalData.tuhttpUrl;

Page({
    data: {
        clicked: 0,
        noMore: !1,
        infos: [],
        yhtjTitle: "",
        tuhttpUrl: s,
        httpUrl: a,
        monthSales: "",
        likeNum: 0,
        unlikeNum: 0,
        descriptionText: "",
        pingfen: 0,
        starurls: [],
        priceT: "",
        priceTZ: "",
        indx: ""
    },
    onLoad: function(e) {
        t = this, o.getShareInfos(t, a), o.setCompanyId(t, e), o.setStoreId(t), o.setStoreInfo(t), 
        wx.getStorage({
            key: "foodId",
            success: function(o) {
                wx.request({
                    url: a + "skfoodmodel/wxFoodInfoById",
                    data: {
                        id: o.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(o) {
                        var e = o.data.foodRatedFoodStartLevel;
                        t.setStart(e), t.setData({
                            infos: o.data,
                            starurls: t.data.starurls
                        }), t.setInitGuige();
                        var a = [], s = o.data, n = s.foodRatedList;
                        for (var i in n) a[i] = t.setStarts(n[i].foodRatedFoodStartLevel);
                        t.setData({
                            starLists: a
                        });
                        var r = [], d = !1;
                        if (s.foodRatedList.length >= 10) {
                            for (var f = 0; f < 10; f++) r[f] = n[f];
                            d = !1;
                        } else {
                            for (var c = 0; c < s.foodRatedList.length; c++) r[c] = n[c];
                            d = !0;
                        }
                        t.setData({
                            infos2: r,
                            noMore: d
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    closeTk: function() {
        t.setData({
            displa: !1
        });
    },
    onShow: function() {
        t = this, wx.onSocketMessage(function(e) {
            console.log("===========接收到服务器信息=============="), console.log(e.data), o.getTkInfos(t, e);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(t) {
                    o.conSocket(t.data);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        o.closeSock();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), t = this, setTimeout(function() {
            t.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {
        t.getMore();
    },
    onShareAppMessage: function() {
        return {
            title: t.data.shareTitle,
            desc: "",
            imageUrl: t.data.shareImgUrl,
            path: "/pages/index/index?storeId=" + t.data.storeId + "&companyId=" + t.data.companyId,
            success: function(t) {
                console.log("转发成功");
            },
            fail: function(t) {
                console.log("转发失败");
            }
        };
    },
    setInitGuige: function() {
        var o = [], e = t.data.infos;
        if (e.foodSizeList.length > 0) {
            var a = e.foodSizeList[0].priceT, s = e.foodSizeList[0].priceTZ;
            t.setData({
                priceT: a,
                priceTZ: s
            });
        }
        for (var n in t.data.infos.foodSizeList) o[n] = "#fff", o[0] = "#ffbf21";
        t.setData({
            colors: o,
            indx: 0
        });
    },
    changeSel: function(o) {
        var e = o.currentTarget.dataset.index, a = [], s = t.data.infos, n = s.foodSizeList[e].priceT, i = s.foodSizeList[e].priceTZ;
        a[e] = "#ffbf21", t.setData({
            priceT: n,
            priceTZ: i,
            colors: a,
            indx: e
        });
    },
    setStart: function(o) {
        for (var e = {}, a = 0; a < 5; a++) e[a] = a <= o - 1 ? {
            starurl: "../../../images/star.png"
        } : o - a > 0 && o - a < 1 ? {
            starurl: "../../../images/halfStar.png"
        } : {
            starurl: "../../../images/emptyStar.png"
        };
        t.setData({
            starurls: e
        });
    },
    setStarts: function(t) {
        for (var o = {}, e = 0; e < 5; e++) o[e] = e <= t - 1 ? {
            starList: "../../../images/star.png"
        } : t - e > 0 && t - e < 1 ? {
            starList: "../../../images/halfStar.png"
        } : {
            starList: "../../../images/emptyStar.png"
        };
        return o;
    },
    getMore: function() {
        if (1 != t.data.noMore) {
            var o = t.data.infos2, e = t.data.clicked, a = !1;
            if (10 + 10 * (e += 1) <= t.data.infos.foodRatedList.length) {
                for (var s = 0; s < 10 + 10 * e; s++) o[s] = t.data.infos.foodRatedList[s];
                a = !1;
            } else {
                for (var n = 0; n < t.data.infos.foodRatedList.length; n++) o[n] = t.data.infos.foodRatedList[n];
                a = !0;
            }
            t.setData({
                infos2: o,
                clicked: e,
                noMore: a
            });
        } else wx.showToast({
            title: "无更多信息",
            icon: "loading",
            duration: 1e3
        });
    }
});