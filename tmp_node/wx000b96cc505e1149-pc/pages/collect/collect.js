var app = getApp();

var config = require("../../conf.js");

var util = require("../../utils/util.js");

var page = 0;

var getimg = function getimg(that) {
    wx.getSystemInfo({
        success: function success(res) {
            var phone = res.model + "-" + res.pixelRatio + "-" + res.screenWidth + "-" + res.screenHeight + "-" + res.system;
            wx.request({
                url: config.baseDomain + "img/findImgCollect",
                data: {
                    phoneName: phone,
                    apppName: config.appName,
                    pageNum: page
                },
                success: function success(res) {
                    console.info(res.data.data);
                    if (res.data.code != 0) {
                        that.showToast("加载失败...");
                        that.setData({
                            dispaly: ""
                        });
                        return;
                    }
                    if (util.isEmpty(res.data.data)) {
                        that.showToast("没有数据加载了");
                        page--;
                        return;
                    } else {
                        that.showToast("加载成功");
                    }
                    var list = that.data.imglist;
                    for (var i = 0; i < res.data.data.length; i++) {
                        list.push(res.data.data[i].imgCollect);
                    }
                    that.setData({
                        imglist: list
                    });
                }
            });
        }
    });
};

Page({
    /**
   * 页面的初始数据
   */
    data: {
        imglist: [],
        scrollHeight: 0,
        showToast: false,
        toastMessage: "",
        dispaly: "none"
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        page = 0;
        var that = this;
        //根据手机屏幕设置scroll-view的高度
                wx.getSystemInfo({
            success: function success(res) {
                console.info(res.windowHeight);
                that.setData({
                    scrollHeight: res.windowHeight
                });
            }
        });
        getimg(that);
    },
    previewImg: function previewImg(e) {
        console.log(e.currentTarget.dataset.index);
        var index = e.currentTarget.dataset.index;
        var imgArr = this.data.imglist;
        wx.previewImage({
            current: imgArr[index],
            //当前图片地址
            urls: imgArr,
            //所有要预览的图片的地址集合 数组形式
            success: function success(res) {},
            fail: function fail(res) {},
            complete: function complete(res) {}
        });
    },
    //监听下滑到底的事件
    bindDownLoad: function bindDownLoad() {
        console.info("滑动到底部");
        page++;
        var that = this;
        getimg(that);
    },
    //提示框
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