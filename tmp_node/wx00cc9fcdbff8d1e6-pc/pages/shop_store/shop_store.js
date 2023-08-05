var t = getApp(), a = require("../../wxParse/wxParse.js");

Page({
    data: {
        shopInfo: {},
        proList: [],
        tabArr: {
            curHdIndex: 0,
            curBdIndex: 0
        },
        current: 0
    },
    tabFun: function(t) {
        var a = t.target.dataset.id, n = {};
        n.curHdIndex = a, n.curBdIndex = a, this.setData({
            tabArr: n
        });
    },
    showModal: function() {
        var t = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = t, t.translateY(300).step(), this.setData({
            animationData: t.export(),
            showModalStatus: !0
        }), setTimeout(function() {
            t.translateY(0).step(), this.setData({
                animationData: t.export()
            });
        }.bind(this), 200);
    },
    hideModal: function() {
        var t = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = t, t.translateY(300).step(), this.setData({
            animationData: t.export()
        }), setTimeout(function() {
            t.translateY(0).step(), this.setData({
                animationData: t.export(),
                showModalStatus: !1
            });
        }.bind(this), 200);
    },
    onPullDownRefresh: function() {
        console.log("onPullDownRefresh");
    },
    onLoad: function(n) {
        var e = n.shopId;
        console.log(e);
        var o = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Shangchang/shop_details",
            method: "post",
            data: {
                shop_id: e
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var n = t.data.shop_info, e = t.data.shop_info.content, i = t.data.pro;
                1 == t.data.status ? (a.wxParse("content", "html", e, o, 3), o.setData({
                    shopInfo: n,
                    proList: i
                })) : wx.showToast({
                    title: t.data.err,
                    duration: 2e3
                });
            },
            error: function(t) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    lookdetail: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset;
        console.log(t.currentTarget.dataset), wx.navigateTo({
            url: "../index/detail?id=" + a.id
        });
    },
    switchSlider: function(t) {
        this.setData({
            current: t.target.dataset.index
        });
    },
    changeSlider: function(t) {
        this.setData({
            current: t.detail.current
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});