//index.js
var app = getApp();

Page({
    data: {
        showToast: false,
        toastMessage: ""
    },
    onLoad: function onLoad() {},
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
    },
    //我的下载
    mydownload: function mydownload() {
        wx.navigateTo({
            url: "../download/download"
        });
    },
    //我的收藏
    clearStorage: function clearStorage(e) {
        wx.navigateTo({
            url: "../collect/collect"
        });
    },
    //意见反馈
    ideaBack: function ideaBack() {
        wx.navigateTo({
            url: "../idea/idea"
        });
    },
    //系统消息
    recommend: function recommend() {
        wx.navigateTo({
            url: "../recommend/recommend"
        });
    },
    //设置
    setting: function setting() {
        wx.navigateTo({
            url: "../setting/setting"
        });
    }
});