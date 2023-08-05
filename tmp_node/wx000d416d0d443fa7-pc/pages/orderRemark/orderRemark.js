var t = require("../../utils/server"), a = (require("../../config.js"), {});

Page({
    data: {
        five: 5,
        star: 4,
        noStar: 1,
        sendTime: "10分钟",
        cursor: 0,
        tooShort: !0,
        first: !0,
        grade: 4
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "用户评论"
        }), a = {
            authorization: wx.getStorageSync("authorization")
        };
        var e = t.name, i = t.num;
        this.setData({
            shopName: e,
            orderNum: i
        });
    },
    getGrade: function(t) {
        var a = t.currentTarget.dataset.num + 1;
        this.setData({
            grade: a,
            star: a
        });
    },
    getTime: function(t) {
        var a = t.detail.x, e = "", i = 0;
        a > 0 && a <= 40 ? (e = "20分钟", i = 20) : 40 < a && a <= 80 ? (e = "30分钟", i = 30) : 80 < a && a <= 120 ? (e = "40分钟", 
        i = 40) : 120 < a && a <= 160 ? (e = "50分钟", i = 50) : (e = "60分钟", i = 60), this.setData({
            sendTime: e,
            speed: i
        });
    },
    getInput: function(t) {
        this.setData({
            inputVal: t.detail.value,
            cursor: t.detail.cursor
        });
    },
    submitComment: function(e) {
        var i = {
            order_number: this.data.orderNum,
            speed: this.data.speed,
            taste: this.data.grade,
            comments: this.data.inputVal
        };
        wx.showLoading({
            title: "提交中",
            mask: !0
        }), t.postApiJSON("/api/UserInfo/saveShopComment", i, function(t) {
            1e3 == t.data.code ? (wx.switchTab({
                url: "../orders/orders"
            }), wx.hideLoading()) : (wx.hideLoading(), getApp().showAndHideToast(t.data.msg));
        }, a);
    }
});