// pages/setting/setting.js
var app = getApp();

Page({
    /**
   * 页面的初始数据
   */
    data: {
        check: null,
        showToast: false,
        toastMessage: ""
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        var that = this;
        wx.getStorage({
            key: "key",
            success: function success(res) {
                that.setData({
                    check: res.data
                });
            }
        });
    },
    /**
  * switch开关监听
  */
    listenerSwitch: function listenerSwitch(e) {
        if (e.detail.value == true) {
            wx.setStorage({
                key: "key",
                data: true
            });
            this.showToast("开启成功");
        }
        if (e.detail.value == false) {
            wx.setStorage({
                key: "key",
                data: false
            });
            this.showToast("取消成功");
        }
    },
    showToast: function showToast(toastMessage) {
        this.setData({
            showToast: true,
            toastMessage: toastMessage
        });
    },
    hideToast: function hideToast() {
        this.setData({
            showToast: false,
            toastMessage: ""
        });
    }
});