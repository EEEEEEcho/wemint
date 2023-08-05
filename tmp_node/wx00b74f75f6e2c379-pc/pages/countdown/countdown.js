var app = getApp();

Page({
    data: {
        pageSize: 10,
        pageIndex: 1,
        CountDownList: null
    },
    onLoad: function onLoad(options) {
        this.loadData(this, false);
    },
    loadData: function loadData(that, isNextPage) {
        wx.showNavigationBarLoading();
        wx.request({
            url: app.getUrl(app.globalData.getLimitBuyList),
            data: {
                pageIndex: that.data.pageIndex,
                pageSize: that.data.pageSize
            },
            success: function success(result, isNextPage) {
                if (result.data.Status == "OK") {
                    var r = result.data.Data;
                    if (isNextPage) {
                        var old = that.data.CountDownList;
                        old.push.apply(old, r);
                        that.setData({
                            CountDownList: old
                        });
                    } else {
                        that.setData({
                            CountDownList: r
                        });
                    }
                } else {
                    wx.showModal({
                        title: "提示",
                        content: result.data.Message,
                        showCancel: false,
                        success: function success(res) {
                            if (res.confirm) {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        }
                    });
                }
            },
            complete: function complete() {
                wx.hideNavigationBarLoading();
            }
        });
    },
    BuyCountDown: function BuyCountDown(e) {
        var countdownId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../countdowndetail/countdowndetail?id=" + countdownId
        });
    },
    onReady: function onReady() {
        // 页面渲染完成
    },
    onShow: function onShow() {
        // 页面显示
    },
    onHide: function onHide() {
        // 页面隐藏
    },
    onUnload: function onUnload() {
        // 页面关闭
    },
    onReachBottom: function onReachBottom() {
        var that = this;
        var oldpageindex = that.data.pageIndex;
        this.setData({
            pageIndex: oldpageindex++
        });
        this.loadData(this, true);
    }
});