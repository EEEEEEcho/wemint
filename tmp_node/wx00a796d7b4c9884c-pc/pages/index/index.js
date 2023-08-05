var t = getApp();

Page({
    data: {
        width: wx.getSystemInfoSync().windowWidth,
        height: 8 * wx.getSystemInfoSync().windowWidth / 16,
        indicatorDots: !0,
        vertical: !1,
        autoplay: !0,
        circular: !0,
        interval: 2e3,
        duration: 500,
        previousMargin: 0,
        nextMargin: 0,
        goodsCategory: [],
        goods_new: [],
        url: t.page.url,
        ads: [],
        goods_type: [],
        goods1: [],
        goods2: [],
        goods3: [],
        keyword: "",
        style: "",
        openid: "",
        userInfo: [],
        currentSwiper: ""
    },
    search: function() {
        if (/([^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n])|(\s)/g.test(this.data.keyword)) return wx.showToast({
            title: "不可搜索表情",
            icon: "seccess",
            duration: 1e3
        }), this.setData({
            keyword: ""
        }), !1;
        wx.navigateTo({
            url: "../prodlist/prodlist?keyword=" + this.data.keyword
        });
    },
    searchInp: function(t) {
        this.setData({
            keyword: t.detail.value
        });
    },
    tiaozhuan: function(a) {
        console.log(1), t.globalData.cid = a.currentTarget.dataset.cid, wx.switchTab({
            url: "../prod/prod"
        });
    },
    previewImg: function(t) {
        console.log(t.currentTarget.dataset.index);
        var a = t.currentTarget.dataset.index, e = this.data.imgArr;
        wx.previewImage({
            current: e[a],
            urls: e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    swiperChange: function(t) {
        this.setData({
            currentSwiper: t.detail.current
        });
    },
    switchTab: function(t) {
        this.setData({
            currentTab: t.detail.current
        }), this.checkCor();
    },
    swichNav: function(t) {
        var a = t.target.dataset.current;
        if (this.data.currentTaB == a) return !1;
        this.setData({
            currentTab: a
        });
    },
    checkCor: function() {
        this.data.currentTab > 4 ? this.setData({
            scrollLeft: 300
        }) : this.setData({
            scrollLeft: 0
        });
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onLoad: function() {
        var a = this;
        wx.login({
            success: function(e) {
                console.log(e), wx.request({
                    url: t.page.url + "/wx/login.php?act=loginCode",
                    data: {
                        code: e.code,
                        appid: t.page.appid,
                        secret: t.page.secret
                    },
                    method: "GET",
                    success: function(t) {
                        console.log(t.data), a.setData({
                            openid: t.data.openid
                        }), wx.setStorage({
                            key: "openid",
                            data: t.data.openid
                        });
                    }
                });
            }
        }), this.getGoodsCategory();
    },
    onShow: function() {
        wx.request({
            url: t.page.url + "/wx/index.php?act=title",
            method: "post",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                console.log(a), t.globalData.title = a.data.title, console.log(t.globalData.title), 
                wx.setNavigationBarTitle({
                    title: t.globalData.title
                });
            }
        }), this.getGoodsCategory();
    },
    getGoodsCategory: function() {
        var a = this;
        wx.request({
            url: t.page.url + "/wx/index.php",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log(e.data), a.setData({
                    ads: e.data.ads,
                    goodsCategory: e.data.category,
                    goods_new: e.data.goods_new,
                    goods_type: e.data.goods_type
                }), t.globalData.is_mobile = e.data.is_mobile, t.globalData.offline_pay = e.data.offline_pay, 
                console.log(a.data.goods1);
            }
        });
    }
});