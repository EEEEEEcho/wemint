var n = getApp();

Page({
    data: {
        userInfo: {},
        orderInfo: {},
        projectSource: "https://wx.nytdjx.cn/",
        userListInfo: [ {
            icon: "../../images/iconfont-dingdan.png",
            text: "我的订单",
            isunread: !0,
            unreadNum: 2
        }, {
            icon: "../../images/iconfont-card.png",
            text: "我的代金券",
            isunread: !1,
            unreadNum: 2
        }, {
            icon: "../../images/iconfont-icontuan.png",
            text: "我的拼团",
            isunread: !0,
            unreadNum: 1
        }, {
            icon: "../../images/iconfont-shouhuodizhi.png",
            text: "收货地址管理"
        }, {
            icon: "../../images/iconfont-kefu.png",
            text: "联系客服"
        }, {
            icon: "../../images/iconfont-help.png",
            text: "常见问题"
        } ],
        loadingText: "加载中...",
        loadingHidden: !1
    },
    onLoad: function() {
        var t = this;
        n.getUserInfo(function(n) {
            t.setData({
                userInfo: n,
                loadingHidden: !0
            });
        }), this.loadOrderStatus();
    },
    onShow: function() {
        this.loadOrderStatus();
    },
    loadOrderStatus: function() {
        var t = this;
        wx.request({
            url: n.d.ceshiUrl + "/Api/User/getorder",
            method: "post",
            data: {
                userId: n.d.userId
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(n) {
                if (1 == n.data.status) {
                    var e = n.data.orderInfo;
                    t.setData({
                        orderInfo: e
                    });
                }
            },
            error: function(n) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: "玉伴今生",
            path: "/pages/index/index",
            success: function(n) {},
            fail: function(n) {}
        };
    }
});