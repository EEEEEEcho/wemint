getApp();

var e = require("../../utils/wxapp.js"), t = require("../../utils/wxcomm.js"), a = require("../../utils/util.js");

Page({
    data: {
        merchantList: [],
        showLoading: !0,
        headImg: wx.getStorageSync("userInfo").avatarUrl,
        myName: wx.getStorageSync("userInfo").nickName
    },
    onLoad: function(e) {
        this.getMerchantList();
    },
    bindViewTap: function(e) {
        var t = e.currentTarget.dataset.merchant.shortName + "|" + e.currentTarget.dataset.merchant.merchantConfigId;
        wx.navigateTo({
            url: "/pages/merchant/merchant?param=" + t
        });
    },
    getMerchantList: function() {
        var n = this, r = wx.getStorageSync("user").openId, o = e.projectUrl + "/miniProgram/loadingFirst", i = {
            smallOpenId: r,
            pageNumber: 1,
            pageSize: 100
        };
        t.reqPost(o, i, "application/x-www-form-urlencoded").then(function(e) {
            if (null != e.data.rows) {
                for (var t = 0; t < e.data.rows.length; t++) null != e.data.rows[t].createTime && (e.data.rows[t].createTime = a.formatDatebox(e.data.rows[t].createTime, "yyyy-MM-dd"));
                n.setData({
                    merchantList: e.data.rows,
                    showLoading: !1
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "探索身边优惠",
            imageUrl: "https://imgs.52wxr.com/upload/image/201901/20190122/1548146339888061576.jpg",
            path: "/page/index/index"
        };
    }
});