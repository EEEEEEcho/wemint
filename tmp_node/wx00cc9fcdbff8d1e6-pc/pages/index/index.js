var t = getApp();

Page({
    data: {
        imgUrls: [],
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        circular: !0,
        productData: [],
        proCat: [],
        page: 2,
        index: 2,
        brand: [],
        imgUrl: [],
        kbs: [],
        lastcat: [],
        course: []
    },
    listdetail: function(t) {
        wx.navigateTo({
            url: "../listdetail/listdetail?title=" + t.currentTarget.dataset.title,
            success: function(t) {},
            fail: function() {},
            complete: function() {}
        });
    },
    suo: function(t) {
        wx.navigateTo({
            url: "../search/search",
            success: function(t) {},
            fail: function() {},
            complete: function() {}
        });
    },
    jj: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../listdetail/listdetail?brandId=" + a,
            success: function(t) {},
            fail: function() {},
            complete: function() {}
        });
    },
    tian: function(t) {
        t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../works/works",
            success: function(t) {},
            fail: function() {},
            complete: function() {}
        });
    },
    getMore: function(a) {
        var e = this, i = e.data.page;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Index/getlist",
            method: "post",
            data: {
                page: i
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data.prolist;
                if ("" == a) return wx.showToast({
                    title: "没有更多数据！",
                    duration: 2e3
                }), !1;
                e.setData({
                    page: i + 1,
                    productData: e.data.productData.concat(a)
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
    changeIndicatorDots: function(t) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        });
    },
    changeAutoplay: function(t) {
        this.setData({
            autoplay: !this.data.autoplay
        });
    },
    intervalChange: function(t) {
        this.setData({
            interval: t.detail.value
        });
    },
    durationChange: function(t) {
        this.setData({
            duration: t.detail.value
        });
    },
    onLoad: function(a) {
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Index/index",
            method: "post",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data.ggtop, i = t.data.procat, n = t.data.prolist, o = t.data.brand, s = t.data.course;
                e.setData({
                    imgUrls: a,
                    proCat: i,
                    productData: n,
                    brand: o,
                    course: s
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
    onShareAppMessage: function() {
        return {
            title: "晶时珠宝",
            path: "/pages/index/index",
            success: function(t) {},
            fail: function(t) {}
        };
    }
});