var t = getApp();

Page({
    data: {
        current: 0,
        shopList: [],
        ptype: "",
        title: "中华玉源国际玉文化产业集团",
        page: 2,
        catId: 0,
        brandId: 0
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
    getMore: function(a) {
        var e = this, i = e.data.page;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Bklist/get_more",
            method: "post",
            data: {
                page: i,
                ptype: e.data.ptype,
                cat_id: e.data.catId,
                brand_id: e.data.brandId
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data.pro;
                if ("" == a) return wx.showToast({
                    title: "没有更多数据！",
                    duration: 2e3
                }), !1;
                e.setData({
                    page: i + 1,
                    shopList: e.data.shopList.concat(a)
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    onLoad: function(a) {
        var e = a.title;
        wx.setNavigationBarTitle({
            title: e,
            success: function() {}
        });
        var i = a.cat_id, n = a.ptype, o = a.brandId, s = this;
        s.setData({
            ptype: n,
            catId: i,
            brandId: o
        }), wx.request({
            url: t.d.ceshiUrl + "/Api/Bklist/lists",
            method: "post",
            data: {
                cat_id: i,
                ptype: n,
                brand_id: o
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data.pro;
                s.setData({
                    shopList: a
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