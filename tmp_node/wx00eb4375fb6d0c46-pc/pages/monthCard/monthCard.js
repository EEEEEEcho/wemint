var t = require("../../utils/wxapp.js"), e = require("../../utils/util.js"), a = require("../../utils/wxcomm.js");

Page({
    data: {
        state: !1,
        userName: wx.getStorageSync("userInfo").nickName,
        outTime: "",
        checkItem: "1"
    },
    checkLt: function() {
        wx.showToast({
            title: "敬请期待",
            icon: "none"
        });
    },
    onLoad: function(t) {},
    payMonthCard: function() {
        var e = t.projectUrl + "/miniProgram/getMemberPayParam", n = {
            smallOpenId: wx.getStorageSync("user").openId,
            appid: t.data.appid,
            days: "1" == this.data.checkItem ? 31 : "2" == this.data.checkItem ? 93 : 366,
            amount: "1" == this.data.checkItem ? 9.9 : "2" == this.data.checkItem ? 21 : 60
        };
        a.reqPost(e, n, "application/x-www-form-urlencoded").then(function(t) {
            console.log(t);
            t.data.data.orderNo, t.data.data.amount;
            wx.requestPayment({
                timeStamp: t.data.data.timeStamp,
                nonceStr: t.data.data.nonceStr,
                package: t.data.data.package,
                signType: "MD5",
                paySign: t.data.data.paySign,
                success: function(t) {
                    console.log("支付成功"), wx.switchTab({
                        url: "../monthCard/monthCard"
                    });
                },
                fail: function(t) {
                    console.log(t), console.log("支付失败"), wx.switchTab({
                        url: "../monthCard/monthCard"
                    });
                }
            });
        });
    },
    checkSetMeal: function(t) {
        this.setData({
            checkItem: t.currentTarget.dataset.check
        });
    },
    getMemberState: function() {
        var n = this;
        a.reqGet(t.projectUrl + "/miniProgram/getMemberState?smallOpenId=" + wx.getStorageSync("user").openId).then(function(t) {
            console.log(t), t.data.success && n.setData({
                state: !0,
                outTime: e.formatDatebox(t.data.msg, "yyyy-MM-dd")
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getMemberState();
    },
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