getApp();

var t = require("../../utils/wxapp.js"), e = require("../../utils/wxcomm.js");

Page({
    data: {
        userName: wx.getStorageSync("userInfo").nickName,
        userImg: wx.getStorageSync("userInfo").avatarUrl,
        showCase: !1,
        showLoading: !0,
        noData: !1,
        thisItem: 1,
        isLoading: !1,
        showDetail: !1,
        couponDetail: null,
        rechargeCase: null,
        couponList: [],
        billList: [],
        cardList: [],
        messageList: [],
        checkTab: "coupon",
        state: !1
    },
    onLoad: function(t) {
        this.getCouponsList();
    },
    getMemberState: function() {
        var a = this;
        e.reqGet(t.projectUrl + "/miniProgram/getMemberState?smallOpenId=" + wx.getStorageSync("user").openId).then(function(t) {
            console.log(t), t.data.success && a.setData({
                state: !0
            });
        });
    },
    toMonthCard: function() {
        wx.switchTab({
            url: "/pages/monthCard/monthCard"
        });
    },
    toggleMemu: function(t) {
        switch (t.currentTarget.dataset.type) {
          case "coupon":
            this.getCouponsList();
            break;

          case "card":
            this.getCardList();
            break;

          case "bill":
            this.getBillList();
            break;

          case "message":
            this.getMessageList();
        }
        this.setData({
            checkTab: t.currentTarget.dataset.type,
            thisItem: t.currentTarget.dataset.item
        });
    },
    delMessage: function(a) {
        var o = this;
        console.log(a.detail.val);
        var s = t.projectUrl + "/miniProgram/cleanMessage", n = {
            messageNoticeId: a.detail.val,
            smallOpenId: wx.getStorageSync("user").openId
        };
        e.reqPost(s, n, "application/x-www-form-urlencoded").then(function(t) {
            console.log(t), wx.showToast({
                title: t.data.msg,
                icon: "none"
            }), t.data.success && o.getMessageList();
        });
    },
    hideCouponDetail: function(t) {
        this.setData({
            showDetail: t.detail.val
        });
    },
    hideRechargeCase: function(t) {
        this.setData({
            showCase: t.detail.val
        });
    },
    getDetail: function(t) {
        this.setData({
            couponDetail: t.detail.val,
            showDetail: !0
        });
    },
    getCouponsList: function() {
        var a = this;
        this.setData({
            isLoading: !0,
            noData: !1
        }), e.reqGet(t.projectUrl + "/product/coupons/miniProgram/myCoupons?smallOpenId=" + wx.getStorageSync("user").openId + "&pageNumber=1&pageSize=100").then(function(t) {
            console.log(t), wx.stopPullDownRefresh();
            var e = !0, o = !1, s = void 0;
            try {
                for (var n, i = t.data.rows[Symbol.iterator](); !(e = (n = i.next()).done); e = !0) {
                    var r = n.value;
                    3 == r.type ? r.amount = Math.round(1e3 * r.amount) / 100 + "折" : 4 == r.type ? r.amount = "体验券" : r.amount = r.amount + "元", 
                    r.remark = r.remark.replace(/\<img/g, '<img style="max-width:100%;height:auto;"');
                }
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                o = !0, s = t;
            } finally {
                try {
                    !e && i.return && i.return();
                } finally {
                    if (o) throw s;
                }
            }
            0 == t.data.rows.length && a.setData({
                noData: !0
            }), a.setData({
                couponList: t.data.rows,
                isLoading: !1,
                showLoading: !1
            });
        });
    },
    showRechargeCase: function(t) {
        console.log(t.detail.val);
    },
    getCardList: function() {
        var a = this;
        this.setData({
            isLoading: !0,
            noData: !1
        }), e.reqGet(t.projectUrl + "/miniProgram/myCard?smallOpenId=" + wx.getStorageSync("user").openId + "&pageNumber=1&pageSize=100").then(function(t) {
            console.log(t), 0 == t.data.rows.length && a.setData({
                noData: !0
            }), a.setData({
                cardList: t.data.rows,
                isLoading: !1
            });
        });
    },
    getBillList: function() {
        var a = this;
        this.setData({
            isLoading: !0,
            noData: !1
        }), e.reqGet(t.projectUrl + "/miniProgram/myBill?smallOpenId=" + wx.getStorageSync("user").openId + "&pageNumber=1&pageSize=100").then(function(t) {
            console.log(t), 0 == t.data.rows.length && a.setData({
                noData: !0
            }), a.setData({
                billList: t.data.rows,
                isLoading: !1
            });
        });
    },
    getMessageList: function() {
        var a = this;
        this.setData({
            isLoading: !0,
            noData: !1
        }), e.reqGet(t.projectUrl + "/miniProgram/myMessage?smallOpenId=" + wx.getStorageSync("user").openId + "&pageNumber=1&pageSize=100").then(function(t) {
            console.log(t), 0 == t.data.rows.length && a.setData({
                noData: !0
            }), a.setData({
                messageList: t.data.rows,
                isLoading: !1
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getMemberState();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.getCouponsList();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "探索身边优惠",
            imageUrl: "https://imgs.52wxr.com/upload/image/201901/20190122/1548146339888061576.jpg",
            path: "/page/index/index"
        };
    }
});