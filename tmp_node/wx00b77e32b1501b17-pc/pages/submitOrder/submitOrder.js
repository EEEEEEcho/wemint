var t = require("../../wxParse/wxParse.js"), e = getApp();

Page({
    data: {
        list: [],
        cartMoney: "0.00",
        popin: !1,
        isshow: !0,
        pcount: 0,
        seller: "",
        remarks: "",
        isgoaddr: !0
    },
    GoToDetail: function(t) {
        var e = t.currentTarget.id;
        wx.navigateTo({
            url: "/pages/details/details?GoodsID=" + e
        });
    },
    goSubmit: function(t) {
        if (this.data.isshow) return this.setData({
            popin: !0
        }), !1;
        if (this.data.isgoaddr) return wx.navigateTo({
            url: "/pages/addAddr/addAddr"
        }), !1;
        wx.showToast({
            title: "加载中...",
            icon: "loading"
        });
        var a = {
            openId: wx.getStorageSync("openId"),
            list: this.data.list,
            remarks: this.data.remarks,
            seller: this.data.seller
        };
        wx.request({
            url: e.globalData.apiurl + "/order/submit",
            data: JSON.stringify(a),
            method: "POST",
            success: function(t) {
                if (wx.hideToast(), 1200 == t.data.code) {
                    var e = t.data.content;
                    wx.removeStorageSync("BuyGoodsInfo"), wx.redirectTo({
                        url: "/pages/submitOrder2/submitOrder2?OrderID=" + e
                    });
                } else wx.showModal({
                    content: t.data.msg,
                    showCancel: !1,
                    confirmText: "确定"
                });
            }
        });
    },
    bindRemark: function(t) {
        this.setData({
            remarks: t.detail.value
        });
    },
    changePopin: function() {
        var t = this;
        wx.request({
            url: e.globalData.apiurl + "user/purchase/notice/edit",
            data: {
                openId: wx.getStorageSync("openId")
            },
            method: "GET",
            success: function(e) {
                wx.hideToast(), 1200 == e.data.code ? t.setData({
                    popin: !1,
                    isshow: !1
                }) : wx.showToast({
                    title: "同意购买须知出现错误！",
                    duration: 2e3
                });
            }
        });
    },
    onLoad: function(a) {
        var o = this;
        wx.request({
            method: "Get",
            url: e.globalData.apiurl + "user/address/get",
            data: {
                openId: wx.getStorageSync("openId")
            },
            success: function(t) {
                t.data.content.ID > 0 && o.setData({
                    isgoaddr: !1
                });
            }
        });
        var n = wx.getStorageSync("BuyGoodsInfo");
        if (console.log(n), 0 == n.length) wx.showModal({
            content: "请先选择要购买的商品",
            showCancel: !1,
            confirmText: "确定",
            complete: function() {
                wx.navigateBack();
            }
        }); else {
            for (var s = 0, r = 0, i = 0; i < n.length; i++) s += n[i].count, r += n[i].count * n[i].price * n[i].discount / 100;
            this.setData({
                pcount: s,
                cartMoney: r.toFixed(2)
            });
        }
        this.setData({
            list: n,
            seller: a.seller
        }), wx.request({
            url: e.globalData.apiurl + "user/purchase/notice/get",
            data: {
                openId: wx.getStorageSync("openId")
            },
            method: "GET",
            success: function(e) {
                wx.hideToast(), 1200 == e.data.code && e.data.content.PurchaseNotice && t.wxParse("content", "html", e.data.content.PurchaseNotice, o, 5);
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        wx.request({
            method: "Get",
            url: e.globalData.apiurl + "user/address/get",
            data: {
                openId: wx.getStorageSync("openId")
            },
            success: function(e) {
                e.data.content.ID > 0 && t.setData({
                    isgoaddr: !1
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});