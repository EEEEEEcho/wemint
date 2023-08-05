var t = getApp();

Page({
    data: {
        total: [],
        category: [],
        act: 0,
        cid: "",
        url: t.page.url,
        goods: []
    },
    onReady: function() {
        console.log("onReady"), console.log(t.globalData.cid), this.getCategory();
    },
    hotcategoryTap: function(t) {
        this.setData({
            act: 0,
            cid: "",
            flag: "hot"
        }), this.getGoods();
    },
    categoryTap: function(a) {
        console.log(a.currentTarget.dataset.id), t.globalData.cid = a.currentTarget.dataset.id, 
        this.setData({
            act: a.currentTarget.dataset.index,
            cid: a.currentTarget.dataset.id,
            flag: ""
        }), this.getGoods();
    },
    onLoad: function(t) {
        console.log("onLoad"), this.getCategory();
    },
    getCategory: function() {
        var a = this;
        wx.request({
            url: t.page.url + "/wx/item_list.php",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    total: t.data.total,
                    category: t.data.category
                });
            }
        });
    },
    getGoods: function() {
        var a = this;
        wx.request({
            url: t.page.url + "/wx/item_list.php",
            data: {
                cid: a.data.cid,
                flag: a.data.flag
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    goods: t.data.goods,
                    flag: ""
                }), console.log(a.data.goods);
            }
        });
    },
    onShow: function() {
        console.log("onShow"), wx.setNavigationBarTitle({
            title: t.globalData.title
        }), console.log(t.globalData.cid), "" != t.globalData.cid || 0 != t.globalData.cid ? this.setData({
            cid: t.globalData.cid
        }) : (console.log(1), this.setData({
            cid: "",
            flag: "hot"
        })), this.getGoods();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});