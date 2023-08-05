var t = require("../../utils/wxapp.js"), e = require("../../utils/wxcomm.js");

Page({
    data: {
        showLoading: !0,
        tag: "",
        text: "",
        benefitCircleId: "",
        imgList: [],
        subbranchList: [],
        couponsId: ""
    },
    onLoad: function(t) {
        this.setData({
            couponsId: t.couponsId
        }), this.getCouponMsg();
    },
    getCouponMsg: function() {
        var o = this, n = t.projectUrl + "/product/coupons/miniProgram/publishCouponsMsg", i = {
            smallOpenId: wx.getStorageSync("user").openId,
            couponsId: this.data.couponsId
        };
        e.reqPost(n, i, "application/x-www-form-urlencoded").then(function(t) {
            console.log(t), o.setData({
                showLoading: !1,
                subbranchList: t.data.extParams.subbranchList,
                text: "<span class='item-type'>" + t.data.extParams.benefitCircle.tag + "</span>" + t.data.extParams.benefitCircle.text,
                benefitCircleId: t.data.extParams.benefitCircle.benefitCircleId,
                imgList: t.data.extParams.benefitCircle.img ? t.data.extParams.benefitCircle.img.split(";") : ""
            });
        });
    },
    issuePush: function() {
        var o = t.projectUrl + "/product/coupons/miniProgram/edit/publishCoupons", n = {
            smallOpenId: wx.getStorageSync("user").openId,
            benefitCircleId: this.data.benefitCircleId,
            state: 1
        };
        e.reqPost(o, n, "application/x-www-form-urlencoded").then(function(t) {
            console.log(t), t.data.success ? (wx.showToast({
                title: "发布成功",
                icon: "none",
                duration: 2e3
            }), wx.setStorageSync("from", "issuePush"), setTimeout(function() {
                wx.switchTab({
                    url: "/pages/circle/circle"
                });
            }, 2001)) : wx.showToast({
                title: t.data.msg,
                icon: "none",
                duration: 2e3
            });
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