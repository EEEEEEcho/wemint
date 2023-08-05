// applylist.js
var app = getApp();

Page({
    /**
   * 页面的初始数据
   */
    data: {
        pageIndex: 1,
        pageSize: 10,
        AfterList: null
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {},
    loadData: function loadData(that, isNextPage) {
        app.getOpenId(function(openid) {
            wx.request({
                url: app.getUrl(app.globalData.getAllAfterSaleList),
                data: {
                    openId: openid,
                    pageIndex: that.data.PageIndex,
                    pageSize: that.data.PageSize
                },
                success: function success(result) {
                    if (result.data.Status == "OK") {
                        var r = result.data.Data;
                        if (isNextPage) {
                            var old = that.data.AfterList;
                            old.push.apply(old, r);
                            that.setData({
                                AfterList: old
                            });
                        } else {
                            that.setData({
                                AfterList: r
                            });
                        }
                    } else if (result.data.Message == "NOUser") {
                        wx.navigateTo({
                            url: "../login/login"
                        });
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
                }
            });
        });
    },
    applydetail: function applydetail(e) {
        var typeapply = e.currentTarget.dataset.type;
        //1代表订单退款，2代表退货，3代表退货退款
                var id = e.currentTarget.dataset.id;
        if (typeapply == 1) {
            wx.navigateTo({
                url: "../refunddetail/refunddetail?id=" + id
            });
        } else {
            wx.navigateTo({
                url: "../returndetail/returndetail?id=" + id
            });
        }
    },
    SendGood: function SendGood(e) {
        var id = e.currentTarget.dataset.id;
        var skuid = e.currentTarget.dataset.skuid;
        wx.navigateTo({
            url: "../applysendgood/applysendgood?id=" + id + "&&skuId=" + skuid
        });
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function onReady() {},
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function onShow() {
        var that = this;
        that.loadData(that, false);
    },
    /**
   * 生命周期函数--监听页面隐藏
   */
    onHide: function onHide() {},
    /**
   * 生命周期函数--监听页面卸载
   */
    onUnload: function onUnload() {},
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function onPullDownRefresh() {},
    /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom: function onReachBottom() {},
    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function onShareAppMessage() {}
});