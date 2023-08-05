// pages/idea/idea.js
var config = require("../../conf.js");

var app = getApp();

Page({
    /**
   * 页面的初始数据
   */
    data: {
        showToast: false,
        toastMessage: "",
        title: "",
        content: ""
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {},
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function onShow() {},
    titleinput: function titleinput(e) {
        this.setData({
            title: e.detail.value
        });
    },
    contentinput: function contentinput(e) {
        this.setData({
            content: e.detail.value
        });
    },
    ideasubmit: function ideasubmit(e) {
        var that = this;
        wx.request({
            url: config.baseDomain + "/img/addIdea",
            data: {
                ideaTitle: this.data.title,
                ideaContent: this.data.content
            },
            success: function success(res) {
                console.info(res.data);
                if (res.data == 1) {
                    that.showToast("提交成功");
                } else {
                    that.showToast("提交失败");
                }
            }
        });
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