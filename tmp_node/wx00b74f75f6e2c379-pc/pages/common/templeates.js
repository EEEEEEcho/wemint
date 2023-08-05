// pages/coupon/coupon.js
var config = require("../../utils/config.js");

var app = getApp();

Page({
    data: {},
    onLoad: function onLoad(options) {},
    onReady: function onReady() {
        // Do something when page ready.
    },
    onShow: function onShow() {
        // Do something when page show.
    },
    onHide: function onHide() {
        // Do something when page hide.
    },
    onUnload: function onUnload() {
        // Do something when page close.
    },
    onPullDownRefresh: function onPullDownRefresh() {
        // Do something when pull down.
    },
    onReachBottom: function onReachBottom() {
        // Do something when page reach bottom.
    },
    onShareAppMessage: function onShareAppMessage() {
        // return custom share data when user share.
    },
    // Event handler.
    viewTap: function viewTap() {
        this.setData({
            text: "Set some data for updating view."
        });
    },
    customData: {
        hi: "MINA"
    }
});