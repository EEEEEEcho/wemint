var t = getApp();

Page({
    data: {
        page: 1,
        productData: []
    },
    onLoad: function(t) {
        this.loadProductData();
    },
    onShow: function() {
        this.loadProductData();
    },
    removeFavorites: function(a) {
        var o = this, e = a.currentTarget.dataset.favId;
        wx.showModal({
            title: "提示",
            content: "你确认移除吗",
            success: function(a) {
                a.confirm && wx.request({
                    url: t.d.ceshiUrl + "/Api/User/collection_qu",
                    method: "post",
                    data: {
                        ccId: e
                    },
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        "ok" == t.data.result && (o.data.productData.length = 0, o.loadProductData());
                    }
                });
            }
        });
    },
    loadProductData: function() {
        var a = this;
        wx.request({
            url: t.d.hostUrl + "/Api/User/collection",
            method: "post",
            data: {
                userId: t.d.userId
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var o = t.data.sc_list;
                a.setData({
                    productData: o
                });
            }
        });
    },
    initProductData: function(a) {
        for (var o = 1; o < a.length; o++) {
            var e = a[o];
            e.Price = e.Price / 100, e.ImgUrl = t.d.hostImg + e.ImgUrl;
        }
    }
});