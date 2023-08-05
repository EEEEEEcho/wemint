var a = getApp();

Page({
    data: {
        cid: 0,
        flag: "",
        goods: [],
        url: a.page.url,
        keyword: "",
        priceImg: "../../images/c_00.jpg",
        priceFlag: 0,
        sellnumImg: "../../images/c_00.jpg",
        sellnumFlag: 0,
        ordername: "",
        ordersort: "",
        num: 4,
        page: 1,
        hidden: !0
    },
    search: function() {
        if (/([^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n])|(\s)/g.test(this.data.keyword)) return wx.showToast({
            title: "不可搜索表情",
            icon: "seccess",
            duration: 1e3
        }), this.setData({
            keyword: "",
            page: 1
        }), !1;
        this.setData({
            page: 1
        }), this.searchGoods();
    },
    searchInp: function(a) {
        this.setData({
            keyword: a.detail.value
        });
    },
    priceTap: function(a) {
        var e = a.currentTarget.dataset.status;
        0 == e ? this.setData({
            priceFlag: 1,
            priceImg: "../../images/xia.jpg",
            ordername: "price",
            ordersort: "desc",
            page: 1
        }) : 1 == e ? this.setData({
            priceFlag: 2,
            priceImg: "../../images/shang.jpg",
            ordername: "price",
            ordersort: "asc",
            page: 1
        }) : 2 == e && this.setData({
            priceFlag: 1,
            priceImg: "../../images/xia.jpg",
            ordername: "price",
            ordersort: "decs",
            page: 1
        }), this.data.keyword ? this.searchGoods() : this.getGoods();
    },
    sellnumTap: function(a) {
        var e = a.currentTarget.dataset.status;
        0 == e ? this.setData({
            sellnumFlag: 1,
            sellnumImg: "../../images/xia.jpg",
            ordername: "sellnum",
            ordersort: "desc",
            page: 1
        }) : 1 == e ? this.setData({
            sellnumFlag: 2,
            sellnumImg: "../../images/shang.jpg",
            ordername: "sellnum",
            ordersort: "asc",
            page: 1
        }) : 2 == e && this.setData({
            sellnumFlag: 1,
            sellnumImg: "../../images/xia.jpg",
            ordername: "sellnum",
            ordersort: "desc",
            page: 1
        }), this.data.keyword ? this.searchGoods() : this.getGoods();
    },
    onLoad: function(a) {
        console.log(a.keyword), a.keyword ? (this.setData({
            keyword: a.keyword
        }), this.searchGoods()) : (this.setData({
            cid: a.cid,
            flag: a.flag
        }), this.getGoods());
    },
    searchGoods: function() {
        var e = this;
        console.log(e.data.keyword), wx.request({
            url: a.page.url + "/wx/goods_list.php",
            data: {
                ordername: e.data.ordername,
                ordersort: e.data.ordersort,
                keywords: e.data.keyword,
                num: e.data.num,
                page: e.data.page
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                if (console.log(a.data), 1 == a.data) 1 == e.data.page ? e.setData({
                    goods: []
                }) : e.setData({
                    hidden: !1
                }); else {
                    if (e.data.page > 1) {
                        console.log("第" + e.data.page + "页");
                        var t = a.data.goods;
                        t.concat(), e.setData({
                            goods: e.data.goods.concat(t)
                        });
                    } else e.setData({
                        goods: a.data.goods
                    });
                    console.log(e.data.goods);
                }
            }
        });
    },
    getGoods: function() {
        var e = this;
        wx.request({
            url: a.page.url + "/wx/goods_list.php",
            data: {
                ordername: e.data.ordername,
                ordersort: e.data.ordersort,
                flag: e.data.flag,
                cid: e.data.cid,
                num: e.data.num,
                page: e.data.page
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                if (console.log(a.data), 1 == a.data) 1 == e.data.page ? e.setData({
                    goods: []
                }) : e.setData({
                    hidden: !1
                }); else {
                    if (e.data.page > 1) {
                        console.log("第" + e.data.page + "页");
                        var t = a.data.goods;
                        t.concat(), e.setData({
                            goods: e.data.goods.concat(t)
                        });
                    } else e.setData({
                        goods: a.data.goods
                    });
                    console.log(e.data.goods);
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarTitle({
            title: a.globalData.title
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        console.log("下拉"), this.setData({
            page: this.data.page + 1
        }), this.data.keyword ? this.searchGoods() : this.getGoods();
    },
    onShareAppMessage: function() {}
});