function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

function a(t, a) {
    wx.showLoading({
        title: "加载中...",
        mask: !0
    });
    var e = getApp().globalData.apiurl + "user/goods/list";
    wx.request({
        url: e,
        data: {
            WhereData: t.data.seller_id,
            PageIndex: a,
            PageSize: t.data.PageSize
        },
        method: "POST",
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            if (console.log(e.data.content), e.data.content.DataCount < a * t.data.PageSize) return t.data.IsLastPage = !0, 
            t.setData({
                GoodsList: e.data.content.Data
            }), wx.hideLoading(), !1;
            t.setData({
                GoodsList: e.data.content.Data
            }), wx.hideLoading();
        },
        fail: function() {
            wx.hideLoading(), wx.showToast({
                title: "获取列表失败",
                duration: 2e3
            });
        },
        complete: function() {}
    });
}

function e(t) {
    wx.showLoading({
        title: "加载中...",
        mask: !0
    });
    var a = getApp().globalData.apiurl + "user/seller/get";
    wx.request({
        url: a,
        data: {
            seller_id: t.data.seller_id
        },
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            console.log(a.data.content), wx.hideLoading(), 1200 == a.data.code ? t.setData({
                name: a.data.content.name,
                remarks: a.data.content.remarks,
                mobile: a.data.content.mobile,
                province: a.data.content.province,
                city: a.data.content.city,
                area: a.data.content.area,
                address: a.data.content.address,
                img_url: a.data.content.img_url
            }) : wx.showToast({
                title: "获取商家信息失败",
                duration: 2e3
            });
        },
        fail: function() {
            wx.hideLoading(), wx.showToast({
                title: "获取商家信息失败",
                duration: 2e3
            });
        },
        complete: function() {}
    });
}

Page({
    data: {
        seller_id: 0,
        name: "",
        remarks: "",
        mobile: "",
        province: "",
        city: "",
        area: "",
        address: "",
        img_url: "",
        GoodsList: {},
        PageIndex: 1,
        PageSize: 100,
        IsLastPage: !1
    },
    onLoad: function(t) {
        this.setData({
            seller_id: t.seller_id
        }), e(this);
    },
    bindCount: function(a) {
        for (var e = a.currentTarget.id, o = this.data.GoodsList, n = o.length, i = 0; i < n; i++) if (o[i].ID == e) {
            this.setData(t({}, "GoodsList[0].count", a.detail.value));
        }
        console.log(a.detail.value);
    },
    minus: function(a) {
        if (a.currentTarget.dataset.count > 0) {
            for (var e = a.currentTarget.id, o = this.data.GoodsList, n = o.length, i = 0; i < n; i++) if (o[i].ID == e) {
                var s = "GoodsList[" + i + "].count";
                this.setData(t({}, s, a.currentTarget.dataset.count - 1));
            }
            console.log(a.currentTarget.dataset.count - 1);
        }
    },
    plus: function(a) {
        if (a.currentTarget.dataset.count < 1e3) {
            for (var e = a.currentTarget.id, o = this.data.GoodsList, n = o.length, i = 0; i < n; i++) if (o[i].ID == e) {
                var s = "GoodsList[" + i + "].count";
                this.setData(t({}, s, a.currentTarget.dataset.count + 1));
            }
            console.log(a.currentTarget.dataset.count + 1);
        }
    },
    GoBuy: function() {
        for (var t = this.data.GoodsList, a = t.length, e = [], o = 0; o < a; o++) t[o].count > 0 && e.push(t[o]);
        wx.setStorageSync("BuyGoodsInfo", e), wx.navigateTo({
            url: "/pages/submitOrder/submitOrder?seller=" + this.data.name
        });
    },
    GoToDetail: function(t) {
        var a = t.currentTarget.id;
        wx.navigateTo({
            url: "/pages/details/details?GoodsID=" + a
        });
    },
    onReady: function() {},
    onShow: function() {
        a(this, 1);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        if (1 == this.data.PageIndex) return a(this, 1), wx.showToast({
            title: "已到顶",
            duration: 2e3
        }), !1;
        this.data.IsLastPage = !1, a(this, --this.data.PageIndex);
    },
    onReachBottom: function() {
        if (this.data.IsLastPage) return wx.showToast({
            title: "已到底",
            duration: 2e3
        }), !1;
        a(this, ++this.data.PageIndex);
    },
    onShareAppMessage: function() {}
});