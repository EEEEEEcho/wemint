var e = getApp(), a = require("../../utils/data.js"), t = JSON.parse(JSON.stringify(a));

t.splice(t.length - 1, 1, {}), Page({
    data: {
        implementList: t,
        showCover: !1,
        toUrl: "/pages/releaseGoods/index?release=",
        showTop: !1
    },
    onLoad: function() {
        this.setData({
            showTop: e.globalData.admin
        });
    },
    onHide: function() {
        this.data.toUrl = "/pages/releaseGoods/index?release=";
    },
    chooseOperate: function(a) {
        var t = this, s = a.currentTarget.dataset.index;
        7 === s || 6 === s && !e.globalData.admin || wx.request({
            url: "https://www.0469ynxx.cn/api/createDir",
            method: "POST",
            success: function(e) {
                wx.navigateTo({
                    url: t.data.toUrl + s
                });
            }
        });
    }
});