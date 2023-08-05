var a = getApp();

Page({
    data: {},
    onLoad: function(a) {
        this.loadBank();
    },
    loadBank: function(t) {
        var e = this;
        a.sendRequest({
            url: "/index.php?c=front/WxApp/Withdraw&a=getBanks",
            method: "GET",
            success: function(a) {
                if (a.success) {
                    var t = a.data.banks;
                    e.setData({
                        banks: t
                    });
                } else console.log("getBanks fail" + a.msg);
            },
            hideLoading: !1
        });
    },
    chooseBank: function(a) {
        var t = this;
        t.data.chooseWay;
        this.setData({
            chooseWay: a.currentTarget.dataset.idx
        });
        var e = t.data.banks[a.currentTarget.dataset.idx];
        wx.setStorageSync("orderBank", e), setTimeout(function() {
            wx.navigateBack({
                delta: 1
            });
        }, 200);
    }
});