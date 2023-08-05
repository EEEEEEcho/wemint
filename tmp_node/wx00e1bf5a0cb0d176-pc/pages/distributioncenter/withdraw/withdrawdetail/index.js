var a = getApp();

Page({
    data: {
        baseUrl: a.globalData.siteBaseUrl
    },
    onLoad: function(a) {
        var t = this;
        t.setData({
            queryparams: a
        }), t.getWithdrawDetail();
    },
    getWithdrawDetail: function() {
        var t = this, e = t.data.queryparams.id ? t.data.queryparams.id : 0;
        a.sendRequest({
            url: "/index.php?c=front/WxApp/Withdraw&a=getWithdrawDetails&withdrawId=" + e,
            method: "get",
            success: function(a) {
                if (a.success) {
                    var e = {
                        1: "微信提现",
                        2: "支付宝提现",
                        3: "银行卡提现"
                    }, i = {
                        0: "提现中",
                        1: "提现成功",
                        2: "提现失败"
                    };
                    t.setData({
                        withdrawalName: e[a.data.WithdrawTo],
                        withdrawalStatus: i[a.data.State],
                        withdrawal: a.data
                    });
                }
            },
            fail: function(t) {
                a.showModal({
                    title: "提示",
                    content: t
                });
            }
        });
    },
    onShow: function() {}
});